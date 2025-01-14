import { Button } from "@/components/ui/button";

export const AISection = () => {
  return (
    <div className="bg-gradient-to-b from-black/90 to-black py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-8">
          Intelligence Artificielle & Astrologie
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          Notre IA analyse plus de 3 milliards de données astronomiques fournies par la NASA pour vous offrir des réponses précises et personnalisées.
        </p>
        <Button
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full"
          onClick={() => window.location.href = "https://app.moon-astral.com"}
        >
          Poser ma question maintenant
        </Button>
      </div>
    </div>
  );
};