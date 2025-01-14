import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display mb-10 text-center">Questions fréquentes</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-white/10 rounded-lg px-4">
            <AccordionTrigger className="text-left">Comment fonctionne Moon Astral ?</AccordionTrigger>
            <AccordionContent>
              Moon Astral utilise les positions planétaires précises de votre naissance pour créer votre thème astral personnalisé. Notre IA analyse plus de 3 milliards de données astronomiques pour vous fournir des prédictions précises.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border border-white/10 rounded-lg px-4">
            <AccordionTrigger className="text-left">Les prédictions sont-elles vraiment personnalisées ?</AccordionTrigger>
            <AccordionContent>
              Oui, chaque prédiction est unique et basée sur votre thème astral personnel, calculé à partir de votre date, heure et lieu de naissance exacts.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border border-white/10 rounded-lg px-4">
            <AccordionTrigger className="text-left">Comment sont protégées mes données personnelles ?</AccordionTrigger>
            <AccordionContent>
              Vos données sont cryptées et stockées de manière sécurisée. Nous respectons strictement le RGPD et vous pouvez demander la suppression de vos données à tout moment via notre page dédiée.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};