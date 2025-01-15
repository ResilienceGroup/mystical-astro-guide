import { useState } from "react";
import { QuizData } from "../types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useQuizData = () => {
  const [quizData, setQuizData] = useState<QuizData>({});

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
      
      const { data: existingResponse, error: fetchError } = await supabase
        .from('quiz_responses')
        .select()
        .eq('profile_id', profileId)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching existing response:', fetchError);
        throw fetchError;
      }

      let result;
      if (existingResponse) {
        console.log('Updating existing response');
        result = await supabase
          .from('quiz_responses')
          .update({
            birth_place: data.birthPlace,
            birth_date: data.birthDate?.toISOString(),
            birth_time: data.birthTime,
            relationship_status: data.relationshipStatus,
            element: data.element,
            goals: data.goals,
            updated_at: new Date().toISOString()
          })
          .eq('profile_id', profileId);
      } else {
        console.log('Creating new response');
        result = await supabase
          .from('quiz_responses')
          .insert({
            profile_id: profileId,
            birth_place: data.birthPlace,
            birth_date: data.birthDate?.toISOString(),
            birth_time: data.birthTime,
            relationship_status: data.relationshipStatus,
            element: data.element,
            goals: data.goals
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
      toast.error("Une erreur est survenue lors de l'enregistrement des réponses");
    }
  };

  const updateQuizData = async (data: Partial<QuizData>) => {
    console.log('Updating quiz data with:', data);
    
    try {
      if (data.name && !quizData.profileId) {
        console.log('Creating new profile for name:', data.name);
        const profileId = await createProfile(data.name);
        
        if (profileId) {
          console.log('Created profile with ID:', profileId);
          const newData = { ...quizData, ...data, profileId };
          setQuizData(newData);
          await updateQuizResponse(profileId, newData);
          toast.success("Profil créé avec succès");
        } else {
          console.error('Failed to create profile');
          toast.error("Échec de la création du profil");
          return;
        }
      } else if (quizData.profileId) {
        console.log('Updating existing profile:', quizData.profileId);
        const newData = { ...quizData, ...data };
        setQuizData(newData);
        await updateQuizResponse(quizData.profileId, newData);
        toast.success("Réponses enregistrées");
      } else {
        console.log('Updating local state only');
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