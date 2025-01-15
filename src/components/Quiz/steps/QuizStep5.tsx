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
    { label: "Family harmony", value: "family" },
    { label: "Career", value: "career" },
    { label: "Health", value: "health" },
    { label: "Getting married", value: "marriage" },
    { label: "Traveling the world", value: "travel" },
    { label: "Education", value: "education" },
    { label: "Friends", value: "friends" },
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
        <h2 className="font-display text-2xl">What are your goals for the future?</h2>
        <p className="text-gray-300">Selected: {selectedGoals.length}/3</p>
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
            {goal.label}
          </Button>
        ))}
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90"
        onClick={handleNext}
        disabled={selectedGoals.length === 0}
      >
        Continue
      </Button>
    </div>
  );
};