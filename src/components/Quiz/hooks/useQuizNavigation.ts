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
        console.log('Creating empty report for profile:', quizData.profileId);
        const { data: reportData, error: reportError } = await supabase
          .from('reports')
          .insert({
            profile_id: quizData.profileId,
            content: {}
          })
          .select()
          .single();

        if (reportError) {
          console.error('Error creating empty report:', reportError);
          throw reportError;
        }
        console.log('Empty report created:', reportData);

        const webhookUrl = "https://hooks.zapier.com/hooks/catch/20720574/2kofa3u";
        console.log('Triggering Zapier webhook with data:', {
          name: quizData.name,
          birthDate: quizData.birthDate,
          birthPlace: quizData.birthPlace,
          birthTime: quizData.birthTime,
          profileId: quizData.profileId,
          reportId: reportData.id
        });

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
          console.error('Zapier webhook failed with status:', response.status);
          const responseText = await response.text();
          console.error('Response text:', responseText);
          throw new Error(`Failed to trigger Zapier webhook: ${response.status} ${responseText}`);
        }

        console.log("Zapier webhook triggered successfully");
      } catch (error) {
        console.error('Error in triggerZapierWebhook:', error);
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