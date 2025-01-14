import { Button } from "@/components/ui/button";
import { Apple, Store } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#8639F6] to-black z-0">
        {/* Animated stars effect */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%), url("data:image/svg+xml,%3Csvg width=\'400\' height=\'400\' viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%23FFFFFF\' opacity=\'0.3\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px'
        }} />
        
        {/* Purple wave effect */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-30"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(134, 57, 246, 0.2) 100%)',
            clipPath: 'polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)'
          }}
        />
      </div>
      
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