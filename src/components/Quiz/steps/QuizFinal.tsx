import { useState } from "react";
import { QuizData } from "../QuizModal";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { EmailForm } from "../components/EmailForm";
import { ReportPreview } from "../components/ReportPreview";
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
        title: "La profondeur sous le masque",
        content: `${name}, en tant que Scorpion, tes expériences passées t'ont forgé un caractère fort et résilient. Tu possèdes une capacité unique à explorer les profondeurs de ton être et à transformer les défis en opportunités. Ton intuition aiguë et ton sens de la détermination t'aident à naviguer à travers les complexités de la vie.`,
        planetPosition: "Basé sur ton Soleil en Scorpion, ta Lune en Scorpion et ton Ascendant inconnu."
      },
      {
        title: "Hiver - Paix intérieure et introspection",
        content: `${name}, cet hiver, tes valeurs fondamentales seront mises à l'épreuve. Le moment est idéal pour réfléchir à ce qui est vraiment important pour toi et peut-être apporter les changements nécessaires pour te sentir aligné avec tes véritables aspirations.`,
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
    ];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && data.profileId) {
      try {
        // Update profile with email
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ email })
          .eq('id', data.profileId);

        if (profileError) throw profileError;
        
        // Generate and store report
        const reportContent = generateReportData(data.name || '');
        
        // Validate that the content is JSON compatible
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
          <ReportPreview data={data} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-display text-3xl mb-2">Ton Analyse Astrologique</h2>
            <p className="text-white/60">Basée sur ta date de naissance et tes réponses</p>
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