import { Users, Trophy, Award } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Compatibilité amoureuse",
      description: "Analysez votre compatibilité et découvrez le potentiel de vos relations.",
      image: "/lovable-uploads/337921d3-802a-4a13-8844-92799ccef1bd.png"
    },
    {
      title: "Prédictions personnalisées",
      description: "Recevez des prédictions détaillées pour chaque saison de votre vie.",
      image: "/lovable-uploads/dfb0e451-5da5-408b-8428-a9dcafaeaabb.png"
    },
    {
      title: "Questions & Réponses IA",
      description: "Posez vos questions et obtenez des réponses basées sur votre thème astral.",
      image: "/lovable-uploads/dacff616-e520-4573-953d-33891a39bac9.png"
    }
  ];

  return (
    <div className="bg-black/95 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-16">
          Votre guide personnel vers l'épanouissement
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-auto rounded-lg mb-6 shadow-lg"
              />
              <h3 className="font-display text-xl text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Achievement badges */}
        <div className="flex justify-center gap-8 flex-wrap mt-20">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">2 millions d'utilisateurs</span>
          </div>
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Meilleure application du jour</span>
          </div>
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Ergonomie primée</span>
          </div>
        </div>
      </div>
    </div>
  );
};