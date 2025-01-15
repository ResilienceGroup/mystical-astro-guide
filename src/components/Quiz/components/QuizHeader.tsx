import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";

interface QuizHeaderProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
}

export const QuizHeader = ({ step, totalSteps, onBack }: QuizHeaderProps) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={onBack}
          disabled={step === 1}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <span className="font-display text-lg">{step}/{totalSteps}</span>
      </div>
      <Progress value={progress} className="h-1 bg-white/20" />
    </div>
  );
};