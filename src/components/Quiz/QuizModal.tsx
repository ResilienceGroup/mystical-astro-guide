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
      console.log('Creating profile with name:', name);
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ name }])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        toast.error("Une erreur est survenue lors de la création du profil");
        throw error;
      }
      
      console.log('Profile created successfully:', data);
      return data.id;
    } catch (error) {
      console.error('Error in createProfile:', error);
      return null;
    }
  };

  const updateQuizResponse = async (profileId: string, data: Partial<QuizData>) => {
    try {
      console.log('Updating quiz response for profile:', profileId, 'with data:', data);
      
      const { data: existingResponse } = await supabase
        .from('quiz_responses')
        .select()
        .eq('profile_id', profileId)
        .single();

      let result;
      if (existingResponse) {
        result = await supabase
          .from('quiz_responses')
          .update({
            birth_place: data.birthPlace,
            birth_date: data.birthDate?.toISOString(),
            birth_time: data.birthTime,
            relationship_status: data.relationshipStatus,
            element: data.element,
            goals: data.goals,
          })
          .eq('profile_id', profileId);
      } else {
        result = await supabase
          .from('quiz_responses')
          .insert({
            profile_id: profileId,
            birth_place: data.birthPlace,
            birth_date: data.birthDate?.toISOString(),
            birth_time: data.birthTime,
            relationship_status: data.relationshipStatus,
            element: data.element,
            goals: data.goals,
          });
      }

      if (result.error) {
        console.error('Error updating quiz response:', result.error);
        toast.error("Une erreur est survenue lors de l'enregistrement des réponses");
        throw result.error;
      }
      
      console.log('Quiz response updated successfully');
    } catch (error) {
      console.error('Error in updateQuizResponse:', error);
    }
  };

  const triggerZapierWebhook = async () => {
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

  const handleNext = async () => {
    if (step === 7) {
      setShowLoader(true);
      return;
    }
    
    const nextStep = Math.min(step + 1, totalSteps);
    setStep(nextStep);
    
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
    console.log('Updating quiz data with:', data);
    
    // If name is being set (first step), create a new profile
    if (data.name && !quizData.profileId) {
      console.log('Creating new profile for name:', data.name);
      const profileId = await createProfile(data.name);
      
      if (profileId) {
        console.log('Created profile with ID:', profileId);
        const newData = { ...quizData, ...data, profileId };
        setQuizData(newData);
        await updateQuizResponse(profileId, newData);
      } else {
        console.error('Failed to create profile');
        return;
      }
    } 
    // For subsequent steps, update quiz response if we have a profile
    else if (quizData.profileId) {
      console.log('Updating existing profile:', quizData.profileId);
      const newData = { ...quizData, ...data };
      setQuizData(newData);
      await updateQuizResponse(quizData.profileId, newData);
    }
    // Just update local state if we don't have a profile yet (shouldn't happen)
    else {
      console.log('Updating local state only');
      setQuizData(prev => ({ ...prev, ...data }));
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