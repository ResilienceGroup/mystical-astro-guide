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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && data.profileId) {
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ email })
          .eq('id', data.profileId);

        if (profileError) throw profileError;

        // Fetch the existing report for this profile
        const { data: reportData, error: reportError } = await supabase
          .from('reports')
          .select('*')
          .eq('profile_id', data.profileId)
          .maybeSingle();

        if (reportError) throw reportError;

        if (!reportData) {
          throw new Error("No report found");
        }

        // Transform the report data into sections
        const sections: ReportSectionType[] = [
          {
            title: "Ton Analyse Personnelle",
            content: reportData.personality_analysis || "Analyse en cours de génération...",
          },
          {
            title: "Opportunités à Venir",
            content: reportData.opportunities || "Analyse en cours de génération...",
            isBlurred: true
          },
          {
            title: "Défis et Croissance",
            content: reportData.challenges || "Analyse en cours de génération...",
            isBlurred: true
          },
          {
            title: "Amour et Relations",
            content: reportData.love_insights || "Analyse en cours de génération...",
            isBlurred: true
          },
          {
            title: "Orientation Professionnelle",
            content: reportData.career_guidance || "Analyse en cours de génération...",
            isBlurred: true
          },
          {
            title: "Développement Spirituel",
            content: reportData.spiritual_growth || "Analyse en cours de génération...",
            isBlurred: true
          }
        ];
        
        onDataUpdate({ email });
        setReportData(sections);
        toast.success("Rapport généré avec succès !");

      } catch (error) {
        console.error("Error updating profile or fetching report:", error);
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