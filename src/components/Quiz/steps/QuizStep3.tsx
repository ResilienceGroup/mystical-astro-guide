import { Button } from "@/components/ui/button";
import { QuizData } from "../QuizModal";

interface QuizStep3Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep3 = ({ onNext, onDataUpdate, data }: QuizStep3Props) => {
  const handleSelect = (status: string) => {
    onDataUpdate({ relationshipStatus: status });
    onNext();
  };

  const statuses = [
    { label: "In a relationship", value: "relationship" },
    { label: "Just broke up", value: "broke_up" },
    { label: "Engaged", value: "engaged" },
    { label: "Married", value: "married" },
    { label: "Looking for a soulmate", value: "looking" },
    { label: "It's complicated", value: "complicated" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">To get started, tell us about your current relationship status</h2>
      </div>

      <div className="space-y-3">
        {statuses.map((status) => (
          <Button
            key={status.value}
            variant="outline"
            className="w-full text-white border-white/20 hover:bg-white/10 justify-start text-left h-auto py-4"
            onClick={() => handleSelect(status.value)}
          >
            {status.label}
          </Button>
        ))}
      </div>
    </div>
  );
};