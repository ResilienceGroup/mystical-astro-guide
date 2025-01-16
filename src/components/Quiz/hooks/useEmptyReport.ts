import { supabase } from "@/integrations/supabase/client";
import { QuizData } from "../types/quiz";
import { toast } from "sonner";

export const useEmptyReport = () => {
  const createEmptyReport = async (quizData: QuizData) => {
    try {
      console.log('Creating empty report for profile:', quizData.profileId);
      
      // Check if report already exists
      const { data: existingReport } = await supabase
        .from('reports')
        .select()
        .eq('profile_id', quizData.profileId)
        .maybeSingle();

      if (existingReport) {
        console.log('Report already exists for this profile');
        return existingReport;
      }

      // Create empty report
      const { data: reportData, error: reportError } = await supabase
        .from('reports')
        .insert({
          profile_id: quizData.profileId,
          content: {},
          personality_analysis: "Analyse en cours de génération...",
          opportunities: "Analyse en cours de génération...",
          challenges: "Analyse en cours de génération...",
          love_insights: "Analyse en cours de génération...",
          career_guidance: "Analyse en cours de génération...",
          spiritual_growth: "Analyse en cours de génération..."
        })
        .select()
        .single();

      if (reportError) {
        console.error('Error creating empty report:', reportError);
        toast.error("Une erreur est survenue lors de la création de votre thème astral");
        throw reportError;
      }

      console.log('Empty report created:', reportData);
      toast.success("Nous commençons les calculs de votre thème astral");
      return reportData;

    } catch (error) {
      console.error('Error in createEmptyReport:', error);
      toast.error("Une erreur est survenue lors de la création de votre thème astral");
      throw error;
    }
  };

  return { createEmptyReport };
};