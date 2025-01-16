import { ReportSection as ReportSectionType } from "../types/report";
import { ReportSection } from "./ReportSection";

interface ReportDisplayProps {
  reportData: ReportSectionType[];
}

export const ReportDisplay = ({ reportData }: ReportDisplayProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-3xl">Ton Analyse Astrologique</h2>
        <p className="text-white/60">
          Basée sur ta date de naissance et tes réponses
        </p>
      </div>
      
      {reportData.map((section, index) => (
        <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <ReportSection section={section} />
        </div>
      ))}
    </div>
  );
};