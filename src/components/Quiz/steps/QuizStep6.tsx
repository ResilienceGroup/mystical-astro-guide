import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizData } from "../types/quiz";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuizStep6Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep6 = ({ onNext, onDataUpdate, data }: QuizStep6Props) => {
  const [birthTime, setBirthTime] = useState(data.birthTime || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuizResponse = async (birthTime: string) => {
    if (!data.profileId) {
      console.error('No profile ID available');
      toast.error("Erreur: ID de profil manquant");
      return;
    }

    console.log('Updating quiz response with birth time:', birthTime);
    
    const { error } = await supabase
      .from('quiz_responses')
      .update({ 
        birth_time: birthTime,
        updated_at: new Date().toISOString()
      })
      .eq('profile_id', data.profileId);

    if (error) {
      console.error('Error updating quiz response:', error);
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
      throw error;
    }

    console.log('Birth time updated successfully');
    toast.success("Heure de naissance enregistrée avec succès");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthTime) return;

    setIsSubmitting(true);
    try {
      await updateQuizResponse(birthTime);
      await onDataUpdate({ birthTime });
      onNext();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('Error updating birth time:', error);
      toast.error(`Erreur lors de l'enregistrement: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">À quelle heure es-tu né(e) ? ⏰</h2>
        <p className="text-gray-300">Cette information est importante pour calculer ton thème astral</p>
      </div>

      <div className="space-y-4">
        <Input
          type="time"
          step="60"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
          className="bg-white/10 border-white/20 text-white"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!birthTime || isSubmitting}
      >
        {isSubmitting ? "Enregistrement..." : "Continuer"}
      </Button>
    </form>
  );
};