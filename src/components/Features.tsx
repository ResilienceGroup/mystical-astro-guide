import { Users, Trophy, Award } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Analyse Entrepreneuriale",
      description: "Découvrez les meilleurs moments pour lancer vos projets et prendre des décisions stratégiques.",
      image: "/lovable-uploads/337921d3-802a-4a13-8844-92799ccef1bd.png"
    },
    {
      title: "Cycles Économiques",
      description: "Anticipez les cycles économiques grâce à l'astrologie financière et optimisez vos investissements.",
      image: "/lovable-uploads/dfb0e451-5da5-408b-8428-a9dcafaeaabb.png"
    },
    {
      title: "Conseils Stratégiques IA",
      description: "Obtenez des conseils personnalisés basés sur votre thème astral d'entreprise et les cycles planétaires.",
      image: "/lovable-uploads/dacff616-e520-4573-953d-33891a39bac9.png"
    }
  ];

  return (
    <div className="bg-black/95 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-16">
          L'astrologie au service de votre réussite entrepreneuriale
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

        <div className="flex justify-center gap-8 flex-wrap mt-20">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">500+ entrepreneurs accompagnés</span>
          </div>
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">95% de satisfaction client</span>
          </div>
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Expertise reconnue</span>
          </div>
        </div>
      </div>
    </div>
  );
};