import { QuizStep1 } from "../steps/QuizStep1";
import { QuizStep2 } from "../steps/QuizStep2";
import { QuizStep6 } from "../steps/QuizStep6";
import { QuizStep7 } from "../steps/QuizStep7";
import { QuizStep3 } from "../steps/QuizStep3";
import { QuizStep4 } from "../steps/QuizStep4";
import { QuizStep5 } from "../steps/QuizStep5";
import { QuizFinal } from "../steps/QuizFinal";
import { LoadingStep } from "../steps/LoadingStep";
import { QuizData } from "../types/quiz";

interface QuizContentProps {
  step: number;
  showLoader: boolean;
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  onLoaderComplete: () => void;
  data: QuizData;
}

export const QuizContent = ({ 
  step, 
  showLoader, 
  onNext, 
  onDataUpdate, 
  onLoaderComplete,
  data 
}: QuizContentProps) => {
  if (showLoader) {
    return <LoadingStep onComplete={onLoaderComplete} />;
  }

  switch (step) {
    case 1:
      return <QuizStep1 onNext={onNext} onDataUpdate={onDataUpdate} data={data} />;
    case 2:
      return <QuizStep2 onNext={onNext} onDataUpdate={onDataUpdate} data={data} />;
    case 3:
      return <QuizStep6 onNext={onNext} onDataUpdate={onDataUpdate} data={data} />;
    case 4:
      return <QuizStep7 onNext={onNext} onDataUpdate={onDataUpdate} data={data} />;
    case 5:
      return <QuizStep3 onNext={onNext} onDataUpdate={onDataUpdate} data={data} />;
    case 6:
      return <QuizStep4 onNext={onNext} onDataUpdate={onDataUpdate} data={data} />;
    case 7:
      return <QuizStep5 onNext={onNext} onDataUpdate={onDataUpdate} data={data} />;
    case 8:
      return <QuizFinal onDataUpdate={onDataUpdate} data={data} />;
    default:
      return null;
  }
};