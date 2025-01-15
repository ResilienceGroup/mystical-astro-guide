import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { QuizData } from "../QuizModal";

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
        <h2 className="font-display text-2xl">What is Your Name</h2>
        <p className="text-gray-400">First Step</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-300">For a better experience</p>
        <Input
          placeholder="Enter Your Name"
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
          Go On
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full text-gray-400 hover:text-white hover:bg-white/10"
          onClick={onNext}
        >
          Skip This Step
        </Button>
      </div>
    </form>
  );
};