import { Button } from "@/components/ui/button";
import { Apple, Store, Award, Users, Trophy } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#8639F6] to-black z-0">
        {/* Animated stars background */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 160px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 160px 120px, white, rgba(0,0,0,0)),
            linear-gradient(to bottom, #8639F6, black)
          `,
          animation: 'twinkle 5s infinite',
        }} />
        
        {/* Animated overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
        
        {/* Nebula effect */}
        <div className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(134, 57, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(134, 57, 246, 0.3) 0%, transparent 40%)
            `
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
          Amour, bien-être, carrière, grandes étapes de vie : chaque question trouve une réponse personnalisée, basée sur ton thème astral.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full w-full sm:w-auto"
            onClick={() => window.location.href = "https://app.moon-astral.com"}
          >
            Obtenir ta prédiction personnalisée
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
            onClick={() => window.open("https://play.google.com/store/apps/details?id=com.MoonAstral.android", "_blank")}
          >
            <Store className="w-5 h-5" />
            Télécharger sur Google Play
          </Button>
        </div>
      </div>
    </div>
  );
};
