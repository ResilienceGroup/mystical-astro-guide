import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizData } from "../QuizModal";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface QuizStep7Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep7 = ({ onNext, onDataUpdate, data }: QuizStep7Props) => {
  const [birthPlace, setBirthPlace] = useState(data.birthPlace || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthPlace) return;

    setIsLoading(true);
    
    try {
      const response = await fetch("https://hooks.zapier.com/hooks/catch/20720574/2kofa3u/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          birthDate: data.birthDate?.toISOString(),
          birthTime: data.birthTime,
          birthPlace: birthPlace,
          // Add any other collected fields here
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to Zapier");
      }

      onDataUpdate({ birthPlace });
      onNext();
    } catch (error) {
      console.error("Error sending data to Zapier:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi des données. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
        disabled={!birthPlace || isLoading}
      >
        {isLoading ? "Chargement..." : "Continuer"}
      </Button>
    </form>
  );
};