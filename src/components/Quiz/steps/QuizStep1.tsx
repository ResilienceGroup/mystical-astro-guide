import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { QuizData } from "@/pages/Quiz";

interface QuizStep1Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep1 = ({ onNext, onDataUpdate, data }: QuizStep1Props) => {
  const [name, setName] = useState(data.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onDataUpdate({ name });
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl text-white">Comment t'appelles-tu ?</h2>
        <p className="text-gray-400">Pour une expérience personnalisée</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-300">Ton prénom</p>
        <Input
          placeholder="Entre ton prénom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={!name.trim()}
        >
          Continuer
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full text-gray-400 hover:text-white hover:bg-white/10"
          onClick={onNext}
        >
          Passer cette étape
        </Button>
      </div>
    </form>
  );
};