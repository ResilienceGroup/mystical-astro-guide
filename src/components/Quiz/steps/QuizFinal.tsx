import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizData } from "../QuizModal";
import { useState } from "react";

interface QuizFinalProps {
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizFinal = ({ onDataUpdate, data }: QuizFinalProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onDataUpdate({ email });
      // Here we'll later add the webhook call
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">Ton Rapport Personnalisé est Prêt !</h2>
        <p className="text-gray-300">Entre ton email pour recevoir ton analyse astrologique détaillée</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Entre ton email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          required
        />
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={!email}
        >
          Recevoir Mon Rapport
        </Button>
      </form>

      <div className="relative mt-8 p-6 bg-white/5 rounded-lg">
        <div className="absolute inset-0 backdrop-blur-md bg-black/30 rounded-lg" />
        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl">Analyse Astrale Personnalisée</h3>
            <span className="text-primary">✨</span>
          </div>
          
          <div className="space-y-3">
            <div className="h-4 bg-white/20 rounded w-3/4" />
            <div className="h-4 bg-white/20 rounded w-1/2" />
            <div className="h-4 bg-white/20 rounded w-5/6" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="space-y-2">
              <div className="h-8 bg-white/20 rounded" />
              <div className="h-4 bg-white/20 rounded w-2/3" />
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-white/20 rounded" />
              <div className="h-4 bg-white/20 rounded w-2/3" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <div className="h-4 bg-white/20 rounded w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
};