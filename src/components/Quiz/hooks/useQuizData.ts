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
        await createQuizResponse(data.profileId);
      }

      if (quizData.profileId) {
        await updateQuizResponse(quizData.profileId, newData);
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