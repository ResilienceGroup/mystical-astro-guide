import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizData } from "../types/quiz";
import { useState } from "react";

interface QuizStep6Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep6 = ({ onNext, onDataUpdate, data }: QuizStep6Props) => {
  const [birthTime, setBirthTime] = useState(data.birthTime || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthTime) {
      onDataUpdate({ birthTime });
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">À quelle heure es-tu né(e) ? ⏰</h2>
        <p className="text-gray-300">Cette information est importante pour calculer ton thème astral</p>
      </div>

      <div className="space-y-4">
        <Input
          type="time"
          step="60"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
          className="bg-white/10 border-white/20 text-white"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!birthTime}
      >
        Continuer
      </Button>
    </form>
  );
};