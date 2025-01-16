import { QuizData } from "../types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useReportCreation = () => {
  const createEmptyReport = async (quizData: QuizData) => {
    try {
      if (!quizData.profileId) {
        throw new Error('No profile ID provided');
      }

      console.log('Creating empty report for profile:', quizData.profileId);
      
      const { data: existingReport } = await supabase
        .from('reports')
        .select()
        .eq('profile_id', quizData.profileId)
        .maybeSingle();

      if (existingReport) {
        console.log('Report already exists for this profile');
        return existingReport;
      }

      const { data: reportData, error: reportError } = await supabase
        .from('reports')
        .insert([{
          profile_id: quizData.profileId,
          content: {},
          personality_analysis: "Analyse en cours de génération...",
          opportunities: "Analyse en cours de génération...",
          challenges: "Analyse en cours de génération...",
          love_insights: "Analyse en cours de génération...",
          career_guidance: "Analyse en cours de génération...",
          spiritual_growth: "Analyse en cours de génération..."
        }])
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

  const generateReportContent = async (quizData: QuizData, reportId: string) => {
    try {
      if (!quizData.profileId || !reportId) {
        console.error('Missing required data:', { profileId: quizData.profileId, reportId });
        throw new Error('Missing required data for report generation');
      }

      console.log('Calling generate-report function with data:', {
        name: quizData.name,
        birthDate: quizData.birthDate,
        birthPlace: quizData.birthPlace,
        birthTime: quizData.birthTime,
        profileId: quizData.profileId,
        reportId: reportId
      });

      const { data, error } = await supabase.functions.invoke('generate-report', {
        body: {
          name: quizData.name,
          birthDate: quizData.birthDate?.toISOString(),
          birthPlace: quizData.birthPlace,
          birthTime: quizData.birthTime,
          profileId: quizData.profileId,
          reportId: reportId
        }
      });

      if (error) {
        console.error('Generate report function failed:', error);
        throw error;
      }

      console.log("Report generation initiated successfully:", data);
      toast.success("Génération de votre thème astral en cours");

    } catch (error) {
      console.error('Error in generateReportContent:', error);
      toast.error("Une erreur est survenue lors de la génération du rapport");
      throw error;
    }
  };

  return {
    createEmptyReport,
    generateReportContent
  };
};