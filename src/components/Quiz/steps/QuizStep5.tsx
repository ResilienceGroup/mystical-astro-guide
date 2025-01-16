import { Button } from "@/components/ui/button";
import { QuizData } from "../types/quiz";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuizStep5Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep5 = ({ onNext, onDataUpdate, data }: QuizStep5Props) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuizResponse = async (goals: string[]) => {
    if (!data.profileId) {
      console.error('No profile ID available');
      toast.error("Erreur: ID de profil manquant");
      return;
    }

    console.log('Updating quiz response with goals:', goals);
    
    const { error } = await supabase
      .from('quiz_responses')
      .update({ 
        goals: goals,
        updated_at: new Date().toISOString()
      })
      .eq('profile_id', data.profileId);

    if (error) {
      console.error('Error updating quiz response:', error);
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
      throw error;
    }

    console.log('Goals updated successfully');
    toast.success("Objectifs enregistrés avec succès");
  };

  const toggleGoal = (value: string) => {
    setSelectedGoals(prev => {
      const newGoals = prev.includes(value)
        ? prev.filter(g => g !== value)
        : [...prev, value];
      return newGoals;
    });
  };

  const handleNext = async () => {
    if (selectedGoals.length === 0) return;

    setIsSubmitting(true);
    try {
      await updateQuizResponse(selectedGoals);
      await onDataUpdate({ goals: selectedGoals });
      onNext();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('Error updating goals:', error);
      toast.error(`Erreur lors de l'enregistrement: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goals = [
    { label: "Harmonie familiale", value: "family", emoji: "👨‍👩‍👧‍👦" },
    { label: "Carrière", value: "career", emoji: "💼" },
    { label: "Santé", value: "health", emoji: "🧘‍♀️" },
    { label: "Mariage", value: "marriage", emoji: "💍" },
    { label: "Voyages", value: "travel", emoji: "✈️" },
    { label: "Éducation", value: "education", emoji: "📚" },
    { label: "Amitié", value: "friends", emoji: "🤝" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">Quels sont tes objectifs pour l'avenir ?</h2>
        <p className="text-gray-300">Sélectionnés : {selectedGoals.length}/3</p>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <Button
            key={goal.value}
            variant={selectedGoals.includes(goal.value) ? "default" : "outline"}
            className={`w-full justify-start text-left h-auto py-4 ${
              selectedGoals.includes(goal.value)
                ? "bg-primary hover:bg-primary/90"
                : "text-white border-white/20 hover:bg-white/10"
            }`}
            onClick={() => toggleGoal(goal.value)}
            disabled={selectedGoals.length >= 3 && !selectedGoals.includes(goal.value) || isSubmitting}
          >
            <span className="mr-2 text-xl">{goal.emoji}</span>
            {goal.label}
          </Button>
        ))}
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90"
        onClick={handleNext}
        disabled={selectedGoals.length === 0 || isSubmitting}
      >
        {isSubmitting ? "Enregistrement..." : "Continuer"}
      </Button>
    </div>
  );
};