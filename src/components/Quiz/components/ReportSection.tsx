import { ReportSection as ReportSectionType } from "../types/report";
import { Button } from "@/components/ui/button";
import { Apple, Download } from "lucide-react";

interface ReportSectionProps {
  section: ReportSectionType;
}

export const ReportSection = ({ section }: ReportSectionProps) => {
  return (
    <div className={`relative space-y-4 p-6 rounded-lg bg-white/5 backdrop-blur-sm ${section.isBlurred ? 'overflow-hidden' : ''}`}>
      {section.isBlurred && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 flex flex-col items-center justify-center gap-4 p-6">
          <p className="text-center text-white/90 font-medium">
            Télécharge l'application pour accéder à l'intégralité de ton rapport personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-[#8639F6] hover:bg-[#8639F6]/90">
              <Apple className="mr-2 h-4 w-4" />
              App Store
            </Button>
            <Button 
              className="bg-[#8639F6] hover:bg-[#8639F6]/90"
              onClick={() => window.open("https://play.google.com/store/apps/details?id=com.moonastro.app", "_blank")}
            >
              <Download className="mr-2 h-4 w-4" />
              Google Play
            </Button>
          </div>
        </div>
      )}
      
      <h3 className="text-xl font-display text-white">{section.title}</h3>
      <p className="text-white/80">{section.content}</p>
      
      {section.planetPosition && (
        <div className="text-sm text-white/60 italic">
          {section.planetPosition}
        </div>
      )}

      {section.dates && (
        <div className="space-y-4 mt-4">
          {section.dates.map((date, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/90 font-medium">{date.period}</p>
                  <p className="text-sm text-white/60">{date.focus}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-[#8639F6]/20 text-[#8639F6] rounded">
                  {date.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/80">{date.description}</p>
              <p className="mt-1 text-xs text-white/60 italic">{date.planetaryInfo}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};