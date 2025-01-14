import { Button } from "@/components/ui/button";
import { Apple, Store } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white py-20 px-4">
      <div className="absolute inset-0 bg-black z-0" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="w-[200px] h-[200px] mx-auto mb-8 relative">
          <img
            src="/lovable-uploads/d2b5a1fa-0ba1-415e-a3e0-529f797b02df.png"
            alt="Moon Astral"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="font-display text-4xl md:text-6xl mb-6 leading-tight">
          L'Astrologie pour prendre la bonne décision,
          <br />
          au bon moment
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Amour, bien-être, carrière, grandes étapes de vie : chaque question trouve une réponse personnalisée, basée sur votre thème astral.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full w-full sm:w-auto"
            onClick={() => window.location.href = "https://app.moon-astral.com"}
          >
            Obtenir ma prédiction personnalisée
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10 gap-2 w-full sm:w-auto"
            onClick={() => window.open("https://apps.apple.com/app/moon-astral", "_blank")}
          >
            <Apple className="w-5 h-5" />
            Télécharger sur l'App Store
          </Button>
          <Button
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10 gap-2 w-full sm:w-auto"
            onClick={() => window.open("https://play.google.com/store/apps/details?id=com.moonastral", "_blank")}
          >
            <Store className="w-5 h-5" />
            Télécharger sur Google Play
          </Button>
        </div>
      </div>
    </div>
  );
};