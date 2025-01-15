import { useState } from "react";
import { QuizData } from "../types/quiz";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { EmailForm } from "../components/EmailForm";
import { ReportSection } from "../components/ReportSection";
import { ReportSection as ReportSectionType, isJsonCompatible } from "../types/report";

interface QuizFinalProps {
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizFinal = ({ onDataUpdate, data }: QuizFinalProps) => {
  const [email, setEmail] = useState("");
  const [reportData, setReportData] = useState<ReportSectionType[] | null>(null);

  const generateReportData = (name: string): ReportSectionType[] => {
    return [
      {
        title: "Ton Analyse Personnelle",
        content: `${name}, voici ton analyse astrologique basée sur ta date de naissance. Les aspects planétaires révèlent une période intéressante pour ton développement personnel et tes relations.`,
        planetPosition: "Soleil en Scorpion, Lune en Balance"
      },
      {
        title: "Opportunités à Venir",
        content: "Les prochains mois seront particulièrement favorables pour ton développement professionnel. Jupiter en transit dans ta maison des opportunités ouvre de nouvelles portes.",
        dates: [
          {
            period: "15 JAN — 22 JAN",
            focus: "Période clé",
            category: "CARRIÈRE",
            description: "Une opportunité professionnelle importante se présente. Reste attentif aux signes.",
            planetaryInfo: "Jupiter en trigone avec ton Soleil natal"
          }
        ],
        isBlurred: true
      },
      {
        title: "Amour et Relations",
        content: "Vénus influence positivement ta sphère relationnelle. C'est le moment idéal pour approfondir tes relations existantes ou faire de nouvelles rencontres significatives.",
        planetPosition: "Vénus en Taureau",
        isBlurred: true
      }
    ];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && data.profileId) {
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ email })
          .eq('id', data.profileId);

        if (profileError) throw profileError;
        
        const reportContent = generateReportData(data.name || '');
        
        if (!isJsonCompatible(reportContent)) {
          throw new Error("Report content is not JSON compatible");
        }

        const { error: reportError } = await supabase
          .from('reports')
          .insert({
            profile_id: data.profileId,
            content: reportContent
          });

        if (reportError) throw reportError;
        
        onDataUpdate({ email });
        setReportData(reportContent);
        toast.success("Rapport généré avec succès !");

      } catch (error) {
        console.error("Error updating profile or generating report:", error);
        toast.error("Une erreur est survenue lors de la génération du rapport");
      }
    }
  };

  return (
    <div className="space-y-6">
      {!reportData ? (
        <div className="space-y-6">
          <EmailForm 
            email={email}
            setEmail={setEmail}
            onSubmit={handleSubmit}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="font-display text-3xl">Ton Analyse Astrologique</h2>
            <p className="text-white/60">
              Basée sur ta date de naissance et tes réponses
            </p>
          </div>
          
          {reportData.map((section, index) => (
            <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ReportSection section={section} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};