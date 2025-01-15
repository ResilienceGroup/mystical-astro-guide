import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QuizStep1 } from "./steps/QuizStep1";
import { QuizStep2 } from "./steps/QuizStep2";
import { QuizStep3 } from "./steps/QuizStep3";
import { QuizStep4 } from "./steps/QuizStep4";
import { QuizStep5 } from "./steps/QuizStep5";
import { QuizStep6 } from "./steps/QuizStep6";
import { QuizStep7 } from "./steps/QuizStep7";
import { QuizFinal } from "./steps/QuizFinal";
import { LoadingStep } from "./steps/LoadingStep";
import { QuizHeader } from "./components/QuizHeader";
import { QuizBackground } from "./components/QuizBackground";

export type QuizData = {
  name?: string;
  birthPlace?: string;
  birthDate?: Date;
  birthTime?: string;
  relationshipStatus?: string;
  element?: string;
  goals?: string[];
  email?: string;
}

export const QuizModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({});
  const [showLoader, setShowLoader] = useState(false);
  
  const totalSteps = 8;

  const handleNext = () => {
    if (step === 5) {
      setShowLoader(true);
      return;
    }
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    if (showLoader) {
      setShowLoader(false);
      return;
    }
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setStep(6);
  };

  const updateQuizData = (data: Partial<QuizData>) => {
    setQuizData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    if (showLoader) {
      return <LoadingStep onComplete={handleLoaderComplete} />;
    }

    switch (step) {
      case 1:
        return <QuizStep1 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 2:
        return <QuizStep2 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 3:
        return <QuizStep3 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 4:
        return <QuizStep4 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 5:
        return <QuizStep5 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 6:
        return <QuizStep6 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 7:
        return <QuizStep7 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 8:
        return <QuizFinal onDataUpdate={updateQuizData} data={quizData} />;
      default:
        return null;
    }
  };

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
            {renderStep()}
          </div>
        </QuizBackground>
      </DialogContent>
    </Dialog>
  );
};