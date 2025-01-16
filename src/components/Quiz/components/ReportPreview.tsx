import { QuizData } from "../types/quiz";
import { Loader2 } from "lucide-react";

interface ReportPreviewProps {
  data: QuizData;
  isLoading?: boolean;
}

export const ReportPreview = ({ data, isLoading = false }: ReportPreviewProps) => {
  return (
    <div className="space-y-4">
      <div className="p-6 rounded-lg bg-white/5 space-y-4 relative">
        <h3 className="text-xl font-display text-white">Ton Analyse Personnelle</h3>
        <div className="relative">
          {isLoading ? (
            <div className="flex items-center space-x-2 text-white/80">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Génération de ton analyse en cours...</span>
            </div>
          ) : (
            <p className="text-white/80">
              {data.name}, voici ton analyse astrologique basée sur ta date de naissance...
            </p>
          )}
        </div>
      </div>

      <div className="p-6 rounded-lg bg-white/5 space-y-4 relative">
        <h3 className="text-xl font-display text-white">Tes Opportunités</h3>
        <div className="relative">
          {isLoading ? (
            <div className="flex items-center space-x-2 text-white/80">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyse de tes opportunités en cours...</span>
            </div>
          ) : (
            <p className="text-white/80">
              Les aspects planétaires indiquent une période favorable pour...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};