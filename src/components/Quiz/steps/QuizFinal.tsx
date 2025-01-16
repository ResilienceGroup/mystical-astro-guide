import { useState } from "react";
import { QuizData } from "../types/quiz";
import { EmailForm } from "../components/EmailForm";
import { ReportPreview } from "../components/ReportPreview";
import { ReportDisplay } from "../components/ReportDisplay";
import { useEmailSubmission } from "../hooks/useEmailSubmission";

interface QuizFinalProps {
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizFinal = ({ onDataUpdate, data }: QuizFinalProps) => {
  const [email, setEmail] = useState("");
  const { isLoading, reportData, handleEmailSubmit } = useEmailSubmission(data.profileId, onDataUpdate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleEmailSubmit(email);
  };

  if (!reportData) {
    return (
      <EmailForm 
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
      />
    );
  }

  if (reportData.length === 0) {
    return <ReportPreview data={data} isLoading={true} />;
  }

  return <ReportDisplay reportData={reportData} />;
};