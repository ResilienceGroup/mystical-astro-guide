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
            <AccordionTrigger className="text-left">Comment fonctionne Moon Astral pour ton entreprise ?</AccordionTrigger>
            <AccordionContent>
              Moon Astral utilise les positions planétaires précises de ta naissance et de la création de ton entreprise pour créer un thème astral personnalisé. Notre IA analyse plus de 3 milliards de données astronomiques pour te fournir des prédictions précises sur les cycles économiques et les opportunités à saisir.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border border-white/10 rounded-lg px-4">
            <AccordionTrigger className="text-left">Les prédictions sont-elles vraiment fiables pour tes décisions business ?</AccordionTrigger>
            <AccordionContent>
              Oui, chaque prédiction est unique et basée sur ton thème astral personnel et celui de ton entreprise. Nos algorithmes ont été entraînés sur des milliers de cas de réussite entrepreneuriale pour t'offrir les insights les plus pertinents.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border border-white/10 rounded-lg px-4">
            <AccordionTrigger className="text-left">Comment sont protégées tes données stratégiques ?</AccordionTrigger>
            <AccordionContent>
              Tes données sont cryptées et stockées de manière sécurisée. Nous respectons strictement le RGPD et tu peux demander la suppression de tes données à tout moment via notre page dédiée. La confidentialité de tes informations business est notre priorité absolue.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};