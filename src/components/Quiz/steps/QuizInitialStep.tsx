import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn } from "lucide-react";

interface QuizInitialStepProps {
  onNext: () => void;
}

export const QuizInitialStep = ({ onNext }: QuizInitialStepProps) => {
  return (
    <div className="relative space-y-6 text-center">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src="/lovable-uploads/f5cb438d-71c3-4e83-a37b-5b0256c3a2dd.png"
          alt="Rapport astrologique"
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-2xl md:text-3xl font-display">
        Découvrez votre avenir avec Moon Astral
      </h1>
      
      <div className="space-y-4">
        {/* New User Option - Highlighted */}
        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 transform hover:scale-105 transition-transform">
          <h2 className="text-xl font-display mb-2">Nouveau sur Moon Astral ?</h2>
          <p className="text-gray-300 mb-4">
            Obtenez votre première prédiction personnalisée gratuitement
          </p>
          <Button 
            onClick={onNext}
            className="w-full bg-primary hover:bg-primary/90 text-white gap-2"
          >
            Commencer mon voyage astral
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Existing User Option */}
        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20">
          <h2 className="text-xl font-display mb-2">Déjà utilisateur ?</h2>
          <p className="text-gray-300 mb-4">
            Connectez-vous pour accéder à votre espace personnel
          </p>
          <Button 
            variant="outline"
            className="w-full text-white border-white/20 hover:bg-white/10 gap-2"
            onClick={() => window.location.href = 'https://app.moon-astral.com'}
          >
            Se connecter à mon compte
            <LogIn className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
