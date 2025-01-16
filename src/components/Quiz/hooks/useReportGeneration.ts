import { QuizData } from "../types/quiz";
import { toast } from "sonner";

export const useReportGeneration = () => {
  const generateReportContent = async (quizData: QuizData, reportId: string) => {
    try {
      console.log('Calling generate-report function with data:', {
        name: quizData.name,
        birthDate: quizData.birthDate,
        birthPlace: quizData.birthPlace,
        birthTime: quizData.birthTime,
        profileId: quizData.profileId,
        reportId: reportId
      });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            name: quizData.name,
            birthDate: quizData.birthDate,
            birthPlace: quizData.birthPlace,
            birthTime: quizData.birthTime,
            profileId: quizData.profileId,
            reportId: reportId
          }),
        }
      );

      if (!response.ok) {
        const responseText = await response.text();
        console.error('Generate report function failed:', response.status, responseText);
        throw new Error(`Failed to generate report: ${response.status} ${responseText}`);
      }

      console.log("Report generation initiated successfully");

    } catch (error) {
      console.error('Error in generateReportContent:', error);
      toast.error("Une erreur est survenue lors de la génération du rapport");
    }
  };

  return { generateReportContent };
};