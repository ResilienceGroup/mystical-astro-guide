import { supabase } from "@/integrations/supabase/client";
import { QuizData } from "../types/quiz";
import { toast } from "sonner";

export const useQuizResponses = () => {
  const createQuizResponse = async (profileId: string) => {
    try {
      console.log('Creating quiz response for profile:', profileId);
      
      // First check if a response already exists
      const { data: existingResponse, error: fetchError } = await supabase
        .from('quiz_responses')
        .select()
        .eq('profile_id', profileId)
        .maybeSingle();

      if (fetchError) {
        console.error('Error checking existing quiz response:', fetchError);
        toast.error(`Erreur lors de la vérification du profil: ${fetchError.message}`);
        throw fetchError;
      }

      if (existingResponse) {
        console.log('Quiz response already exists for profile:', profileId);
        return existingResponse;
      }

      // If no response exists, create a new one
      const { data: response, error: insertError } = await supabase
        .from('quiz_responses')
        .insert([{ 
          profile_id: profileId,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (insertError) {
        console.error('Error creating quiz response:', insertError);
        toast.error(`Erreur lors de la création du profil: ${insertError.message}`);
        throw insertError;
      }

      console.log('Quiz response created successfully:', response);
      toast.success("Profil créé avec succès");
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
        email: data.email,
        updated_at: new Date().toISOString()
      };

      // Use upsert instead of insert to handle both creation and update
      const { error: updateError } = await supabase
        .from('quiz_responses')
        .upsert([quizResponseData], {
          onConflict: 'profile_id',
          ignoreDuplicates: false
        });

      if (updateError) {
        console.error('Error updating quiz response:', updateError);
        toast.error(`Erreur lors de l'enregistrement: ${updateError.message}`);
        throw updateError;
      }
      
      console.log('Quiz response updated successfully with data:', quizResponseData);
      
      // Show specific success messages based on which field was updated
      if (data.birthPlace) {
        toast.success("Lieu de naissance enregistré avec succès");
      }
      if (data.birthDate) {
        toast.success("Date de naissance enregistrée avec succès");
      }
      if (data.birthTime) {
        toast.success("Heure de naissance enregistrée avec succès");
      }
      if (data.relationshipStatus) {
        toast.success("Statut relationnel enregistré avec succès");
      }
      if (data.element) {
        toast.success("Élément naturel enregistré avec succès");
      }
      if (data.goals) {
        toast.success("Objectifs enregistrés avec succès");
      }
      if (data.email) {
        toast.success("Email enregistré avec succès");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('Error in updateQuizResponse:', error);
      toast.error(`Une erreur est survenue lors de l'enregistrement: ${errorMessage}`);
      throw error;
    }
  };

  return {
    createQuizResponse,
    updateQuizResponse
  };
};