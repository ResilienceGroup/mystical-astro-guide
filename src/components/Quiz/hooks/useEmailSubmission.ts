import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { QuizData } from "../types/quiz";
import { ReportSection } from "../types/report";

export const useEmailSubmission = (profileId: string | undefined, onDataUpdate: (data: Partial<QuizData>) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportSection[] | null>(null);

  const handleEmailSubmit = async (email: string) => {
    setIsLoading(true);
    console.log("Submitting email:", email, "for profile:", profileId);
    
    if (email && profileId) {
      try {
        console.log("Updating profile with email");
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            email,
            updated_at: new Date().toISOString()
          })
          .eq('id', profileId);

        if (profileError) {
          console.error("Error updating profile:", profileError);
          toast.error("Une erreur est survenue lors de la mise à jour de votre profil");
          throw profileError;
        }
        console.log("Profile updated successfully");
        toast.success("Email enregistré avec succès");

        console.log("Fetching report for profile:", profileId);
        const { data: reportData, error: reportError } = await supabase
          .from('reports')
          .select('*')
          .eq('profile_id', profileId)
          .maybeSingle();

        if (reportError) {
          console.error("Error fetching report:", reportError);
          throw reportError;
        }

        console.log("Report data received:", reportData);
        if (!reportData) {
          console.error("No report found for profile:", profileId);
          onDataUpdate({ email });
          setReportData([]);
          return;
        }

        const sections: ReportSection[] = transformReportData(reportData);
        console.log("Setting report data state with sections:", sections);
        onDataUpdate({ email });
        setReportData(sections);
        toast.success("Rapport généré avec succès !");

      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil ou de la récupération du rapport:", error);
        toast.error("Une erreur est survenue lors de la génération du rapport");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Missing email or profileId", { email, profileId });
      toast.error("Email ou profil manquant");
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    reportData,
    handleEmailSubmit
  };
};

const transformReportData = (reportData: any): ReportSection[] => {
  return [
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
};