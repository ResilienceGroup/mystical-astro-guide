import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QuizHeader } from "./components/QuizHeader";
import { QuizBackground } from "./components/QuizBackground";
import { QuizContent } from "./components/QuizContent";
import { useQuizData } from "./hooks/useQuizData";
import { useQuizNavigation } from "./hooks/useQuizNavigation";

export const QuizModal = ({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void 
}) => {
  const { quizData, updateQuizData } = useQuizData();
  const { 
    step, 
    showLoader, 
    totalSteps, 
    handleNext, 
    handleBack, 
    handleLoaderComplete 
  } = useQuizNavigation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-[#1B2A37] text-white border-none">
        <QuizBackground>
          <QuizHeader 
            step={step} 
            totalSteps={totalSteps} 
            onBack={handleBack} 
          />
          <div className="space-y-6">
            <QuizContent
              step={step}
              showLoader={showLoader}
              onNext={() => handleNext(quizData)}
              onDataUpdate={updateQuizData}
              onLoaderComplete={handleLoaderComplete}
              data={quizData}
            />
          </div>
        </QuizBackground>
      </DialogContent>
    </Dialog>
  );
};