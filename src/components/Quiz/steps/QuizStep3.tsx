import { Button } from "@/components/ui/button";
import { QuizData } from "../types/quiz";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuizStep3Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep3 = ({ onNext, onDataUpdate, data }: QuizStep3Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuizResponse = async (status: string) => {
    if (!data.profileId) {
      console.error('No profile ID available');
      toast.error("Erreur: ID de profil manquant");
      return;
    }

    console.log('Updating quiz response with relationship status:', status);
    
    const { error } = await supabase
      .from('quiz_responses')
      .update({ 
        relationship_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('profile_id', data.profileId);

    if (error) {
      console.error('Error updating quiz response:', error);
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
      throw error;
    }

    console.log('Relationship status updated successfully');
    toast.success("Statut relationnel enregistré avec succès");
  };

  const handleSelect = async (status: string) => {
    setIsSubmitting(true);
    try {
      await updateQuizResponse(status);
      await onDataUpdate({ relationshipStatus: status });
      onNext();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('Error updating relationship status:', error);
      toast.error(`Erreur lors de l'enregistrement: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const statuses = [
    { label: "En couple", value: "relationship", emoji: "💑" },
    { label: "Je viens de rompre", value: "broke_up", emoji: "💔" },
    { label: "Fiancé(e)", value: "engaged", emoji: "💍" },
    { label: "Marié(e)", value: "married", emoji: "👰" },
    { label: "À la recherche de l'âme sœur", value: "looking", emoji: "✨" },
    { label: "C'est compliqué", value: "complicated", emoji: "🤔" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">Pour commencer, parle-nous de ta situation amoureuse 💘</h2>
      </div>

      <div className="space-y-3">
        {statuses.map((status) => (
          <Button
            key={status.value}
            variant="outline"
            className="w-full text-white border-white/20 hover:bg-white/10 justify-start text-left h-auto py-4"
            onClick={() => handleSelect(status.value)}
            disabled={isSubmitting}
          >
            <span className="mr-2">{status.emoji}</span>
            {status.label}
          </Button>
        ))}
      </div>
    </div>
  );
};