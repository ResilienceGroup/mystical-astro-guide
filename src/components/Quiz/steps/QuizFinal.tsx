import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizData } from "../QuizModal";
import { useState } from "react";
import { toast } from "sonner";
import { Download } from "lucide-react";

interface QuizFinalProps {
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

interface ReportSection {
  title: string;
  content: string;
  dates?: {
    period: string;
    focus: string;
    category: string;
    description: string;
    planetaryInfo: string;
  }[];
  planetPosition?: string;
  isBlurred?: boolean;
}

export const QuizFinal = ({ onDataUpdate, data }: QuizFinalProps) => {
  const [email, setEmail] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [reportData, setReportData] = useState<ReportSection[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onDataUpdate({ email });
      
      try {
        // First, send data to Zapier webhook
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify({
            name: data.name,
            birthDate: data.birthDate,
            birthTime: data.birthTime,
            birthPlace: data.birthPlace,
            relationshipStatus: data.relationshipStatus,
            element: data.element,
            goals: data.goals,
            email: email,
            callbackUrl: `${window.location.origin}/api/report`
          }),
        });

        toast("Demande envoyée", {
          description: "Ton rapport est en cours de génération..."
        });

        // Simulate receiving report data
        const simulatedReportData: ReportSection[] = [
          {
            title: "La profondeur sous le masque",
            content: "En tant que Scorpion, tes expériences passées t'ont forgé un caractère fort et résilient. Tu possèdes une capacité unique à explorer les profondeurs de ton être et à transformer les défis en opportunités. Ton intuition aiguë et ton sens de la détermination t'aident à naviguer à travers les complexités de la vie.",
            planetPosition: "Basé sur ton Soleil en Scorpion, ta Lune en Scorpion et ton Ascendant inconnu."
          },
          {
            title: "Hiver - Paix intérieure et introspection",
            content: "Cet hiver, tes valeurs fondamentales seront mises à l'épreuve. Le moment est idéal pour réfléchir à ce qui est vraiment important pour toi et peut-être apporter les changements nécessaires pour te sentir aligné avec tes véritables aspirations.",
            planetPosition: "Durant cette saison, Neptune forme un trigone avec ton Soleil natal.",
            dates: [
              {
                period: "15 JAN — 22 JAN",
                focus: "Recul nécessaire",
                category: "ÉMOTIONS",
                description: "Tu pourrais sentir une certaine lourdeur émotionnelle pendant cette période. Prends le temps d'analyser cette sensation.",
                planetaryInfo: "À cette période, la Lune forme un carré à ton Saturne natal."
              }
            ],
            isBlurred: true
          },
          // ... Other seasons would follow the same pattern
        ];
        
        setReportData(simulatedReportData);

      } catch (error) {
        console.error("Error sending data to webhook:", error);
        toast("Erreur", {
          description: "Une erreur est survenue lors de l'envoi des données"
        });
      }
    }
  };

  const renderSection = (section: ReportSection) => {
    return (
      <div className={`relative space-y-4 p-6 rounded-lg bg-white/5 backdrop-blur-sm ${section.isBlurred ? 'overflow-hidden' : ''}`}>
        {section.isBlurred && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 flex flex-col items-center justify-center gap-4 p-6">
            <p className="text-center text-white/90 font-medium">
              Télécharge l'application pour accéder à l'intégralité de ton rapport personnalisé
            </p>
            <Button className="bg-[#8639F6] hover:bg-[#8639F6]/90">
              <Download className="mr-2 h-4 w-4" />
              Télécharger l'application
            </Button>
          </div>
        )}
        
        <h3 className="text-xl font-display text-white">{section.title}</h3>
        <p className="text-white/80">{section.content}</p>
        
        {section.planetPosition && (
          <div className="text-sm text-white/60 italic">
            {section.planetPosition}
          </div>
        )}

        {section.dates && (
          <div className="space-y-4 mt-4">
            {section.dates.map((date, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/90 font-medium">{date.period}</p>
                    <p className="text-sm text-white/60">{date.focus}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-[#8639F6]/20 text-[#8639F6] rounded">
                    {date.category}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/80">{date.description}</p>
                <p className="mt-1 text-xs text-white/60 italic">{date.planetaryInfo}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {!reportData ? (
        <>
          <div className="text-center space-y-4">
            <h2 className="font-display text-2xl">Ton Rapport Personnalisé est Prêt !</h2>
            <p className="text-gray-300">Entre ton email pour recevoir ton analyse astrologique détaillée</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Entre ton email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
            />
            
            <Input
              type="url"
              placeholder="URL du webhook Zapier"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
            />

            <Button
              type="submit"
              className="w-full bg-[#8639F6] hover:bg-[#8639F6]/90"
              disabled={!email || !webhookUrl}
            >
              Recevoir Mon Rapport
            </Button>
          </form>
        </>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-display text-3xl mb-2">Ton Analyse Astrologique</h2>
            <p className="text-white/60">Basée sur ta date de naissance et tes réponses</p>
          </div>
          
          {reportData.map((section, index) => (
            <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {renderSection(section)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
