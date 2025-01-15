import { useState } from "react";
import { QuizData } from "../types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useQuizNavigation = () => {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  
  const totalSteps = 8;

  const triggerZapierWebhook = async (quizData: QuizData) => {
    if (step === 4) {
      try {
        const { data: reportData, error: reportError } = await supabase
          .from('reports')
          .insert({
            profile_id: quizData.profileId,
            content: {}
          })
          .select()
          .single();

        if (reportError) throw reportError;
        console.log('Empty report created:', reportData);

        const webhookUrl = "https://hooks.zapier.com/hooks/catch/20720574/2kofa3u/";
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: quizData.name,
            birthDate: quizData.birthDate,
            birthPlace: quizData.birthPlace,
            birthTime: quizData.birthTime,
            profileId: quizData.profileId,
            reportId: reportData.id
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to trigger Zapier webhook');
        }

        console.log("Zapier webhook triggered successfully");
      } catch (error) {
        console.error('Error triggering Zapier webhook:', error);
        toast.error("Une erreur est survenue lors de la génération du rapport");
      }
    }
  };

  const handleNext = async (quizData: QuizData) => {
    if (step === 7) {
      setShowLoader(true);
      return;
    }
    
    const nextStep = Math.min(step + 1, totalSteps);
    setStep(nextStep);
    
    if (step === 4) {
      await triggerZapierWebhook(quizData);
    }
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
    setStep(8);
  };

  return {
    step,
    showLoader,
    totalSteps,
    handleNext,
    handleBack,
    handleLoaderComplete
  };
};