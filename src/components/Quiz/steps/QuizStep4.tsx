import { Button } from "@/components/ui/button";
import { QuizData } from "../types/quiz";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuizStep4Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep4 = ({ onNext, onDataUpdate, data }: QuizStep4Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuizResponse = async (element: string) => {
    if (!data.profileId) {
      console.error('No profile ID available');
      toast.error("Erreur: ID de profil manquant");
      return;
    }

    console.log('Updating quiz response with element:', element);
    
    const { error } = await supabase
      .from('quiz_responses')
      .update({ 
        element: element,
        updated_at: new Date().toISOString()
      })
      .eq('profile_id', data.profileId);

    if (error) {
      console.error('Error updating quiz response:', error);
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
      throw error;
    }

    console.log('Element updated successfully');
    toast.success("Élément naturel enregistré avec succès");
  };

  const handleSelect = async (element: string) => {
    setIsSubmitting(true);
    try {
      await updateQuizResponse(element);
      await onDataUpdate({ element });
      onNext();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('Error updating element:', error);
      toast.error(`Erreur lors de l'enregistrement: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const elements = [
    { label: "Terre", value: "earth", emoji: "🌍" },
    { label: "Eau", value: "water", emoji: "💧" },
    { label: "Feu", value: "fire", emoji: "🔥" },
    { label: "Air", value: "air", emoji: "💨" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">Quel élément de la nature te correspond le plus ?</h2>
        <p className="text-gray-300">L'élément naturel est important pour une meilleure personnalisation</p>
      </div>

      <div className="space-y-3">
        {elements.map((element) => (
          <Button
            key={element.value}
            variant="outline"
            className="w-full text-white border-white/20 hover:bg-white/10 justify-start text-left h-auto py-4"
            onClick={() => handleSelect(element.value)}
            disabled={isSubmitting}
          >
            <span className="mr-2 text-xl">{element.emoji}</span>
            {element.label}
          </Button>
        ))}
      </div>
    </div>
  );
};