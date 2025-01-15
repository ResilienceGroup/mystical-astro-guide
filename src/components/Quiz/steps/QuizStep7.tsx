import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizData } from "../QuizModal";
import { useState } from "react";

interface QuizStep7Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep7 = ({ onNext, onDataUpdate, data }: QuizStep7Props) => {
  const [birthPlace, setBirthPlace] = useState(data.birthPlace || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthPlace) {
      onDataUpdate({ birthPlace });
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">Où es-tu né(e) ? 🌍</h2>
        <p className="text-gray-300">Le lieu de naissance influence ton thème astral</p>
      </div>

      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Ex: Paris, France"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          className="bg-white/10 border-white/20 text-white"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!birthPlace}
      >
        Continuer
      </Button>
    </form>
  );
};