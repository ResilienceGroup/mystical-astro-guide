import { useState } from "react";
import { QuizData } from "../types/quiz";
import { useQuizResponses } from "./useQuizResponses";
import { toast } from "sonner";

export const useQuizData = () => {
  const [quizData, setQuizData] = useState<QuizData>({});
  const { createQuizResponse, updateQuizResponse } = useQuizResponses();

  const updateQuizData = async (data: Partial<QuizData>) => {
    console.log('Updating quiz data with:', data);
    
    try {
      const newData = { ...quizData, ...data };
      setQuizData(newData);
      
      if (data.profileId) {
        console.log('Creating initial quiz response for profile:', data.profileId);
        try {
          await createQuizResponse(data.profileId);
        } catch (error) {
          console.error('Failed to create quiz response:', error);
          toast.error("Échec de la création du questionnaire. Veuillez réessayer.");
          throw error;
        }
      }

      if (quizData.profileId) {
        try {
          await updateQuizResponse(quizData.profileId, newData);
        } catch (error) {
          console.error('Failed to update quiz response:', error);
          toast.error("Échec de la mise à jour du questionnaire. Veuillez réessayer.");
          throw error;
        }
      } else {
        console.error('No profile ID available for updating quiz response');
        toast.error("Impossible de sauvegarder : ID de profil manquant");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('Error in updateQuizData:', error);
      toast.error(`Erreur lors de la mise à jour des données: ${errorMessage}`);
      throw error;
    }
  };

  return {
    quizData,
    updateQuizData
  };
};