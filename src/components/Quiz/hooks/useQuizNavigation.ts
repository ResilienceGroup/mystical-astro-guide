import { QuizData } from "../types/quiz";
import { useQuizSteps } from "./useQuizSteps";
import { useReportCreation } from "./useReportCreation";

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
    if (step === 7) {
      moveToNextStep(step);
      return;
    }
    
    // Create empty report and start generation at step 4
    if (step === 4) {
      try {
        const report = await createEmptyReport(quizData);
        if (report) {
          await generateReportContent(quizData, report.id);
        }
      } catch (error) {
        console.error('Error in report creation process:', error);
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