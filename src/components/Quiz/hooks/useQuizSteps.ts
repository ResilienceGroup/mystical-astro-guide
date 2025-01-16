import { useState } from "react";

export const useQuizSteps = () => {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  
  const totalSteps = 8;

  const moveToNextStep = (currentStep: number) => {
    if (currentStep === 7) {
      setShowLoader(true);
      return;
    }
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const moveToPreviousStep = () => {
    if (showLoader) {
      setShowLoader(false);
      return;
    }
    setStep(prev => Math.max(prev - 1, 1));
  };

  const completeLoader = () => {
    setShowLoader(false);
    setStep(8);
  };

  return {
    step,
    showLoader,
    totalSteps,
    moveToNextStep,
    moveToPreviousStep,
    completeLoader
  };
};