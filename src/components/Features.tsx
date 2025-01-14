export const Features = () => {
  const features = [
    {
      title: "Astrologie tout en un",
      description: "Astrologie personnalisée, tarot, numérologie : tout ce dont vous avez besoin pour éclairer votre chemin.",
      image: "/lovable-uploads/92b44766-c067-4bbb-8387-a9835a556b6c.png"
    },
    {
      title: "Rapports personnalisés",
      description: "De l'astro bébé aux prévisions annuelles, découvrez ce que les astres vous réservent.",
      image: "/lovable-uploads/b0dfa52f-f201-4841-bf5c-c57629ebd9cf.png"
    },
    {
      title: "Compatibilité amoureuse",
      description: "Analysez votre compatibilité et découvrez le potentiel de vos relations.",
      image: "/lovable-uploads/2e1222e4-0765-453d-a9ab-5d09aa0c2260.png"
    }
  ];

  return (
    <div className="bg-black/95 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-16">
          Votre guide personnel vers l'illumination
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
      </div>
    </div>
  );
};