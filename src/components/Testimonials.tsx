export const Testimonials = () => {
  const testimonials = [
    {
      text: "Moon Astral m'a aidé à identifier le meilleur moment pour lever des fonds. Les prédictions étaient étonnamment précises et m'ont permis de sécuriser 2M€ !",
      author: "Thomas B.",
      role: "CEO & Fondateur"
    },
    {
      text: "L'analyse des cycles économiques m'a permis d'anticiper les tendances du marché. J'ai pu adapter ma stratégie et doubler mon chiffre d'affaires en 6 mois.",
      author: "Marie L.",
      role: "Directrice Commerciale"
    },
    {
      text: "Les conseils quotidiens sont devenus essentiels dans ma prise de décision. C'est comme avoir un conseiller stratégique personnel disponible 24/7.",
      author: "Alexandre D.",
      role: "Serial Entrepreneur"
    }
  ];

  return (
    <div className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-16">
          Ce qu'en disent les entrepreneurs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-black/50 p-6 rounded-lg border border-primary/20 animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
              <div className="text-primary font-semibold">{testimonial.author}</div>
              <div className="text-gray-400 text-sm">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};