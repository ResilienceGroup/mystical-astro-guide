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
          >
            <span className="mr-2">{status.emoji}</span>
            {status.label}
          </Button>
        ))}
      </div>
    </div>
  );
};