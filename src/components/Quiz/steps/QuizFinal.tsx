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
        <h2 className="font-display text-2xl">Your Personalized Report is Ready!</h2>
        <p className="text-gray-300">Enter your email to receive your detailed astrological analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
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
          Get My Report
        </Button>
      </form>

      <div className="relative">
        {/* Blurred preview of the report */}
        <div className="absolute inset-0 backdrop-blur-md" />
      </div>
    </div>
  );
};