import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizData } from "../types/quiz";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuizStep7Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep7 = ({ onNext, onDataUpdate, data }: QuizStep7Props) => {
  const [birthPlace, setBirthPlace] = useState(data.birthPlace || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuizResponse = async (birthPlace: string) => {
    if (!data.profileId) {
      console.error('No profile ID available');
      toast.error("Erreur: ID de profil manquant");
      return;
    }

    console.log('Updating quiz response with birth place:', birthPlace);
    
    const { error } = await supabase
      .from('quiz_responses')
      .update({ 
        birth_place: birthPlace,
        updated_at: new Date().toISOString()
      })
      .eq('profile_id', data.profileId);

    if (error) {
      console.error('Error updating quiz response:', error);
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
      throw error;
    }

    console.log('Birth place updated successfully');
    toast.success("Lieu de naissance enregistré avec succès");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthPlace) return;

    setIsSubmitting(true);
    try {
      await updateQuizResponse(birthPlace);
      await onDataUpdate({ birthPlace });
      onNext();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('Error updating birth place:', error);
      toast.error(`Erreur lors de l'enregistrement: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">Où es-tu né(e) ? 🌍</h2>
        <p className="text-gray-300">Le lieu de naissance influence ton thème astral</p>
      </div>

      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Ex: Paris, France"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          className="bg-white/10 border-white/20 text-white"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!birthPlace || isSubmitting}
      >
        {isSubmitting ? "Enregistrement..." : "Continuer"}
      </Button>
    </form>
  );
};