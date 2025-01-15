import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizStep1 } from "./steps/QuizStep1";
import { QuizStep2 } from "./steps/QuizStep2";
import { QuizStep3 } from "./steps/QuizStep3";
import { QuizStep4 } from "./steps/QuizStep4";
import { QuizStep5 } from "./steps/QuizStep5";
import { QuizFinal } from "./steps/QuizFinal";

export type QuizData = {
  name?: string;
  birthPlace?: string;
  birthDate?: Date;
  birthTime?: string;
  relationshipStatus?: string;
  element?: string;
  goals?: string[];
  email?: string;
}

export const QuizModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({});
  
  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const updateQuizData = (data: Partial<QuizData>) => {
    setQuizData(prev => ({ ...prev, ...data }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-[#1B2A37] text-white border-none">
        <div className="relative min-h-[600px]">
          {/* Background with stars effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#8639F6] to-black z-0">
            <div className="absolute inset-0" style={{
              background: `
                radial-gradient(1px 1px at 20px 30px, white, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 40px 70px, white, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 50px 160px, white, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 90px 40px, white, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 130px 80px, white, rgba(0,0,0,0)),
                radial-gradient(1px 1px at 160px 120px, white, rgba(0,0,0,0)),
                linear-gradient(to bottom, #8639F6, black)
              `,
              animation: 'twinkle 5s infinite',
            }} />
          </div>

          <div className="relative z-10 p-6">
            {/* Header with progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <span className="font-display text-lg">{step}/{totalSteps}</span>
              </div>
              <Progress value={progress} className="h-1 bg-white/20" />
            </div>

            {/* Quiz Steps */}
            <div className="space-y-6">
              {step === 1 && <QuizStep1 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />}
              {step === 2 && <QuizStep2 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />}
              {step === 3 && <QuizStep3 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />}
              {step === 4 && <QuizStep4 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />}
              {step === 5 && <QuizStep5 onNext={handleNext} onDataUpdate={updateQuizData} data={quizData} />}
              {step === 6 && <QuizFinal onDataUpdate={updateQuizData} data={quizData} />}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};