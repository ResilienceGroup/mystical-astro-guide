import { useState } from "react";
import { QuizData } from "../types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useQuizData = () => {
  const [quizData, setQuizData] = useState<QuizData>({});

  const createQuizResponse = async (profileId: string) => {
    try {
      console.log('Creating initial quiz response for profile:', profileId);
      
      const { data: response, error } = await supabase
        .from('quiz_responses')
        .insert([{ profile_id: profileId }])
        .select()
        .single();

      if (error) {
        console.error('Error creating quiz response:', error);
        toast.error("Une erreur est survenue lors de la création de votre profil");
        throw error;
      }

      console.log('Quiz response created successfully:', response);
      return response;
    } catch (error) {
      console.error('Error in createQuizResponse:', error);
      toast.error("Une erreur est survenue lors de la création de votre profil");
      throw error;
    }
  };

  const updateQuizResponse = async (profileId: string, data: Partial<QuizData>) => {
    try {
      console.log('Updating quiz response for profile:', profileId, 'with data:', data);
      
      const { data: existingResponse, error: fetchError } = await supabase
        .from('quiz_responses')
        .select()
        .eq('profile_id', profileId)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching existing response:', fetchError);
        throw fetchError;
      }

      if (!existingResponse) {
        console.log('No existing response found, creating new one');
        await createQuizResponse(profileId);
      }

      const quizResponseData = {
        profile_id: profileId,
        birth_place: data.birthPlace,
        birth_date: data.birthDate?.toISOString(),
        birth_time: data.birthTime,
        relationship_status: data.relationshipStatus,
        element: data.element,
        goals: data.goals,
        updated_at: new Date().toISOString()
      };

      const { error: updateError } = await supabase
        .from('quiz_responses')
        .update(quizResponseData)
        .eq('profile_id', profileId);

      if (updateError) {
        console.error('Error updating quiz response:', updateError);
        toast.error("Une erreur est survenue lors de l'enregistrement des réponses");
        throw updateError;
      }
      
      console.log('Quiz response updated successfully');
      toast.success("Réponses enregistrées");
    } catch (error) {
      console.error('Error in updateQuizResponse:', error);
      toast.error("Une erreur est survenue lors de l'enregistrement des réponses");
    }
  };

  const updateQuizData = async (data: Partial<QuizData>) => {
    console.log('Updating quiz data with:', data);
    
    try {
      const newData = { ...quizData, ...data };
      setQuizData(newData);
      
      if (data.profileId) {
        if (Object.keys(quizData).length === 0) {
          // This is the first update (step 1), create initial quiz response
          await createQuizResponse(data.profileId);
        }
        await updateQuizResponse(data.profileId, newData);
      }
    } catch (error) {
      console.error('Error in updateQuizData:', error);
      toast.error("Une erreur est survenue lors de la mise à jour des données");
    }
  };

  return {
    quizData,
    updateQuizData
  };
};