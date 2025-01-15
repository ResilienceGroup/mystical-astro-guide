import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QuizStep1 } from "./steps/QuizStep1";
import { QuizStep2 } from "./steps/QuizStep2";
import { QuizStep6 } from "./steps/QuizStep6";
import { QuizStep7 } from "./steps/QuizStep7";
import { QuizStep3 } from "./steps/QuizStep3";
import { QuizStep4 } from "./steps/QuizStep4";
import { QuizStep5 } from "./steps/QuizStep5";
import { QuizFinal } from "./steps/QuizFinal";
import { LoadingStep } from "./steps/LoadingStep";
import { QuizHeader } from "./components/QuizHeader";
import { QuizBackground } from "./components/QuizBackground";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type QuizData = {
  name?: string;
  birthPlace?: string;
  birthDate?: Date;
  birthTime?: string;
  relationshipStatus?: string;
  element?: string;
  goals?: string[];
  email?: string;
  profileId?: string;
}

export const QuizModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({});
  const [showLoader, setShowLoader] = useState(false);
  
  const totalSteps = 8;

  const createProfile = async (name: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ name }])
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error("Une erreur est survenue lors de la création du profil");
      return null;
    }
  };

  const updateQuizResponse = async (profileId: string, data: Partial<QuizData>) => {
    try {
      const { error } = await supabase
        .from('quiz_responses')
        .upsert({
          profile_id: profileId,
          birth_place: data.birthPlace,
          birth_date: data.birthDate?.toISOString(),
          birth_time: data.birthTime,
          relationship_status: data.relationshipStatus,
          element: data.element,
          goals: data.goals,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating quiz response:', error);
      toast.error("Une erreur est survenue lors de l'enregistrement des réponses");
    }
  };

  const triggerZapierWebhook = async () => {
    if (step === 4) {
      try {
        // Créer un rapport vide pour obtenir un ID
        const { data: reportData, error: reportError } = await supabase
          .from('reports')
          .insert({
            profile_id: quizData.profileId,
            content: {} // Contenu vide initial
          })
          .select()
          .single();

        if (reportError) throw reportError;

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
            reportId: reportData.id // Inclure l'ID du rapport
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

  const handleNext = async () => {
    if (step === 7) {
      setShowLoader(true);
      return;
    }
    
    const nextStep = Math.min(step + 1, totalSteps);
    setStep(nextStep);
    
    // Trigger Zapier webhook after step 4
    if (step === 4) {
      await triggerZapierWebhook();
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

  const updateQuizData = async (data: Partial<QuizData>) => {
    const updatedData = { ...quizData, ...data };
    setQuizData(updatedData);

    // If name is being set, create a new profile
    if (data.name && !quizData.profileId) {
      const profileId = await createProfile(data.name);
      if (profileId) {
        setQuizData(prev => ({ ...prev, profileId }));
        await updateQuizResponse(profileId, updatedData);
      }
    } 
    // Update quiz responses for existing profile
    else if (quizData.profileId) {
      await updateQuizResponse(quizData.profileId, updatedData);
    }
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
        return <QuizStep6 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 4:
        return <QuizStep7 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 5:
        return <QuizStep3 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 6:
        return <QuizStep4 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
      case 7:
        return <QuizStep5 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />;
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