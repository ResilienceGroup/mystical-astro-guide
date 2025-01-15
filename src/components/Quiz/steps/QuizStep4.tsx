import { Button } from "@/components/ui/button";
import { QuizData } from "../types/quiz";

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
          >
            <span className="mr-2 text-xl">{element.emoji}</span>
            {element.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
