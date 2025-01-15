import { QuizData } from "../QuizModal";

interface ReportPreviewProps {
  data: QuizData;
}

export const ReportPreview = ({ data }: ReportPreviewProps) => {
  return (
    <div className="space-y-4 opacity-50 pointer-events-none">
      <div className="p-6 rounded-lg bg-white/5 space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <h3 className="relative z-10 text-xl font-display text-white">Ton Analyse Personnelle</h3>
        <p className="relative z-10 text-white/80">
          {data.name}, voici ton analyse astrologique basée sur ta date de naissance...
        </p>
        <div className="relative z-10 p-4 bg-white/5 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90 font-medium">15 JAN — 22 JAN</p>
              <p className="text-sm text-white/60">Période clé</p>
            </div>
            <span className="text-xs px-2 py-1 bg-[#8639F6]/20 text-[#8639F6] rounded">
              AMOUR
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-white/5 space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <h3 className="relative z-10 text-xl font-display text-white">Tes Opportunités</h3>
        <p className="relative z-10 text-white/80">
          Les aspects planétaires indiquent une période favorable pour...
        </p>
      </div>
    </div>
  );
};