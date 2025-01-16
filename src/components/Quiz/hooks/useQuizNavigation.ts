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
    console.log('Handling next step:', step, 'with quiz data:', quizData);

    // Create empty report at step 4
    if (step === 4) {
      try {
        console.log('Step 4: Creating empty report');
        const report = await createEmptyReport(quizData);
        if (report) {
          console.log('Report created, initiating content generation');
          await generateReportContent(quizData, report.id);
        }
      } catch (error) {
        console.error('Error in report creation process:', error);
      }
    }

    if (step === 7) {
      moveToNextStep(step);
      return;
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