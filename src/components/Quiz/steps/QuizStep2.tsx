import { Button } from "@/components/ui/button";
import { QuizData } from "../QuizModal";
import { zodiac } from "@/lib/zodiac";

interface QuizStep2Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep2 = ({ onNext, onDataUpdate, data }: QuizStep2Props) => {
  const handleDateSelect = (date: Date) => {
    onDataUpdate({ birthDate: date });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">Own Sign</h2>
        <p className="text-gray-400">Step 2</p>
      </div>

      <div className="relative">
        <img
          src="/lovable-uploads/262311bb-fdc7-48a5-9a00-2a22ebc3f33b.png"
          alt="Zodiac Wheel"
          className="w-full h-auto"
        />
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-300">Own Birthday</p>
        <div className="grid grid-cols-3 gap-2">
          {/* This is a simplified version. You'll need to implement a proper date picker */}
          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
            onClick={() => handleDateSelect(new Date())}
          >
            Select Date
          </Button>
        </div>
      </div>
    </div>
  );
};