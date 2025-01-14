export const Testimonials = () => {
  const testimonials = [
    {
      text: "Moon Astral m'a aidé à prendre des décisions importantes dans ma carrière. Les prédictions étaient étonnamment précises !",
      author: "Marie L.",
      role: "Entrepreneure"
    },
    {
      text: "L'analyse de compatibilité amoureuse a été révélatrice. Je comprends tellement mieux ma relation maintenant.",
      author: "Sophie D.",
      role: "Coach de vie"
    },
    {
      text: "Les conseils quotidiens sont devenus une partie essentielle de ma routine. C'est comme avoir un guide personnel.",
      author: "Thomas B.",
      role: "Directeur Marketing"
    }
  ];

  return (
    <div className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-16">
          Ce que disent nos utilisateurs
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