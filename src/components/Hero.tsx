import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white py-20 px-4">
      <div className="absolute inset-0 bg-black z-0" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <img
          src="/lovable-uploads/d2b5a1fa-0ba1-415e-a3e0-529f797b02df.png"
          alt="Moon Astral"
          className="w-16 h-16 mx-auto mb-8"
        />
        <h1 className="font-display text-4xl md:text-6xl mb-6 leading-tight">
          L'Astrologie pour prendre la bonne décision,
          <br />
          au bon moment
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Amour, bien-être, carrière, grandes étapes de vie : chaque question trouve une réponse personnalisée, basée sur votre thème astral.
        </p>
        <Button
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full"
          onClick={() => window.location.href = "https://app.moon-astral.com"}
        >
          Obtenir ma prédiction personnalisée
        </Button>
      </div>
    </div>
  );
};