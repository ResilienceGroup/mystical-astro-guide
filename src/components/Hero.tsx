import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with stars effect */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 50px 160px, white, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 90px 40px, white, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 160px 120px, white, rgba(0,0,0,0))
        `,
        animation: 'twinkle 5s infinite',
      }} />

      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display mb-8 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            L'Astrologie pour prendre la bonne décision, au bon moment
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Découvre ton avenir grâce à notre intelligence artificielle qui combine astrologie, numérologie et tarot pour des prédictions ultra-personnalisées.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full w-full sm:w-auto"
              onClick={() => window.open('https://app.moon-astral.com', '_blank')}
            >
              Obtenir ta prédiction personnalisée
            </Button>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => navigate('/quiz')}
              >
                <img src="/lovable-uploads/92b44766-c067-4bbb-8387-a9835a556b6c.png" alt="App Store" className="h-8" />
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => navigate('/quiz')}
              >
                <img src="/lovable-uploads/f5cb438d-71c3-4e83-a37b-5b0256c3a2dd.png" alt="Play Store" className="h-8" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center gap-8 text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold">100K+</div>
              <div>Utilisateurs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.8/5</div>
              <div>Note moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50K+</div>
              <div>Prédictions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};