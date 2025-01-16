import { useState } from "react";
import { QuizData } from "../types/quiz";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { EmailForm } from "../components/EmailForm";
import { ReportSection } from "../components/ReportSection";
import { ReportSection as ReportSectionType } from "../types/report";

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
        // Mettre à jour le profil avec l'email
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ email })
          .eq('id', data.profileId);

        if (profileError) throw profileError;

        // Récupérer le rapport existant
        const { data: reportData, error: reportError } = await supabase
          .from('reports')
          .select('*')
          .eq('profile_id', data.profileId)
          .maybeSingle();

        if (reportError) throw reportError;

        if (!reportData) {
          throw new Error("Aucun rapport trouvé");
        }

        // Transformer les données du rapport en sections
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
        console.error("Erreur lors de la mise à jour du profil ou de la récupération du rapport:", error);
        toast.error("Une erreur est survenue lors de la génération du rapport");
      }
    }
  };

  return (
    <div className="space-y-6">
      {!reportData ? (
        <EmailForm 
          email={email}
          setEmail={setEmail}
          onSubmit={handleSubmit}
        />
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