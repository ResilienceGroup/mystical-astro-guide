import { supabase } from "@/integrations/supabase/client";
import { QuizData } from "../types/quiz";
import { toast } from "sonner";

export const useQuizResponses = () => {
  const createQuizResponse = async (profileId: string) => {
    try {
      console.log('Creating quiz response for profile:', profileId);
      
      const { data: response, error } = await supabase
        .from('quiz_responses')
        .insert([{ 
          profile_id: profileId,
          updated_at: new Date().toISOString()
        }])
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
        .upsert([quizResponseData]);

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

  return {
    createQuizResponse,
    updateQuizResponse
  };
};