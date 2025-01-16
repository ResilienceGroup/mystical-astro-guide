import { QuizData } from "../types/quiz";
import { useEmptyReport } from "./useEmptyReport";
import { useReportGeneration } from "./useReportGeneration";

export const useReportCreation = () => {
  const { createEmptyReport } = useEmptyReport();
  const { generateReportContent } = useReportGeneration();

  return {
    createEmptyReport,
    generateReportContent
  };
};