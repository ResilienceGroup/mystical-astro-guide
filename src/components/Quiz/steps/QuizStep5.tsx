import { Button } from "@/components/ui/button";
import { QuizData } from "../QuizModal";
import { useState } from "react";

interface QuizStep5Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep5 = ({ onNext, onDataUpdate, data }: QuizStep5Props) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals || []);

  const goals = [
    { label: "Harmonie familiale", value: "family", emoji: "👨‍👩‍👧‍👦" },
    { label: "Carrière", value: "career", emoji: "💼" },
    { label: "Santé", value: "health", emoji: "🧘‍♀️" },
    { label: "Mariage", value: "marriage", emoji: "💍" },
    { label: "Voyages", value: "travel", emoji: "✈️" },
    { label: "Éducation", value: "education", emoji: "📚" },
    { label: "Amitié", value: "friends", emoji: "🤝" },
  ];

  const toggleGoal = (value: string) => {
    setSelectedGoals(prev => {
      const newGoals = prev.includes(value)
        ? prev.filter(g => g !== value)
        : [...prev, value];
      return newGoals;
    });
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      onDataUpdate({ goals: selectedGoals });
      onNext();
    }
  };

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
            disabled={selectedGoals.length >= 3 && !selectedGoals.includes(goal.value)}
          >
            <span className="mr-2 text-xl">{goal.emoji}</span>
            {goal.label}
          </Button>
        ))}
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90"
        onClick={handleNext}
        disabled={selectedGoals.length === 0}
      >
        Continuer
      </Button>
    </div>
  );
};