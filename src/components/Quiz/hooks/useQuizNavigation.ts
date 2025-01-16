import { QuizData } from "../types/quiz";
import { useQuizSteps } from "./useQuizSteps";
import { useReportCreation } from "./useReportCreation";
import { toast } from "sonner";

export const useQuizNavigation = () => {
  const { 
    step, 
    showLoader, 
    totalSteps, 
    moveToNextStep, 
    moveToPreviousStep, 
    completeLoader 
  } = useQuizSteps();

  const { createEmptyReport, generateReportContent } = useReportCreation();

  const handleNext = async (quizData: QuizData) => {
    console.log('Handling next step:', step, 'with quiz data:', quizData);

    // Create empty report at step 4
    if (step === 4) {
      try {
        if (!quizData.profileId) {
          console.error('No profile ID available for report creation');
          toast.error("Une erreur est survenue lors de la création de votre thème astral");
          return;
        }

        console.log('Step 4: Creating empty report for profile:', quizData.profileId);
        const report = await createEmptyReport(quizData);
        
        if (report) {
          console.log('Report created successfully:', report.id);
          console.log('Initiating content generation for report:', report.id);
          await generateReportContent(quizData, report.id);
          toast.success("Votre thème astral est en cours de génération");
        } else {
          console.error('Report creation failed - no report returned');
          toast.error("Une erreur est survenue lors de la création de votre thème astral");
          return;
        }
      } catch (error) {
        console.error('Error in report creation process:', error);
        toast.error("Une erreur est survenue lors de la création de votre thème astral");
        return;
      }
    }

    moveToNextStep(step);
  };

  return {
    step,
    showLoader,
    totalSteps,
    handleNext,
    handleBack: moveToPreviousStep,
    handleLoaderComplete: completeLoader
  };
};