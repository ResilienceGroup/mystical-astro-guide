import { Button } from "@/components/ui/button";
import { QuizData } from "../QuizModal";

interface QuizStep4Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep4 = ({ onNext, onDataUpdate, data }: QuizStep4Props) => {
  const handleSelect = (element: string) => {
    onDataUpdate({ element });
    onNext();
  };

  const elements = [
    { label: "Earth", value: "earth" },
    { label: "Water", value: "water" },
    { label: "Fire", value: "fire" },
    { label: "Air", value: "air" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">Which element of nature do you like the best?</h2>
        <p className="text-gray-300">The element of nature is important for better personalization</p>
      </div>

      <div className="space-y-3">
        {elements.map((element) => (
          <Button
            key={element.value}
            variant="outline"
            className="w-full text-white border-white/20 hover:bg-white/10 justify-start text-left h-auto py-4"
            onClick={() => handleSelect(element.value)}
          >
            {element.label}
          </Button>
        ))}
      </div>
    </div>
  );
};