import { useState } from "react";
import { QuizData } from "../types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useQuizData = () => {
  const [quizData, setQuizData] = useState<QuizData>({});

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

      let result;
      if (existingResponse) {
        console.log('Updating existing response');
        result = await supabase
          .from('quiz_responses')
          .update(quizResponseData)
          .eq('profile_id', profileId);
      } else {
        console.log('Creating new response');
        result = await supabase
          .from('quiz_responses')
          .insert([quizResponseData]);
      }

      if (result.error) {
        console.error('Error updating quiz response:', result.error);
        toast.error("Une erreur est survenue lors de l'enregistrement des réponses");
        throw result.error;
      }
      
      console.log('Quiz response updated successfully');
    } catch (error) {
      console.error('Error in updateQuizResponse:', error);
      toast.error("Une erreur est survenue lors de l'enregistrement des réponses");
    }
  };

  const updateQuizData = async (data: Partial<QuizData>) => {
    console.log('Updating quiz data with:', data);
    
    try {
      if (data.profileId) {
        const newData = { ...quizData, ...data };
        setQuizData(newData);
        await updateQuizResponse(data.profileId, newData);
        toast.success("Réponses enregistrées");
      } else {
        setQuizData(prev => ({ ...prev, ...data }));
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