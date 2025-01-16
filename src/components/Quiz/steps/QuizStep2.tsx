import { Button } from "@/components/ui/button";
import { QuizData } from "../types/quiz";
import { zodiac } from "@/lib/zodiac";
import { isValid } from "date-fns";
import { BirthDateInput } from "./birthdate/BirthDateInput";
import { ZodiacDisplay } from "./birthdate/ZodiacDisplay";
import { toast } from "sonner";
import { useCallback, useState } from "react";

interface QuizStep2Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep2 = ({ onNext, onDataUpdate, data }: QuizStep2Props) => {
  const [birthDate, setBirthDate] = useState<Date | null>(data.birthDate || null);
  const [zodiacSign, setZodiacSign] = useState<typeof zodiac[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getZodiacSign = useCallback((date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const getDayNumber = (m: number, d: number) => m * 100 + d;
    const dateNum = getDayNumber(month, day);

    return zodiac.find((sign) => {
      const [startDate, endDate] = sign.dates.split(" - ");
      const [startDay, startMonth] = startDate.split(" ");
      const [endDay, endMonth] = endDate.split(" ");
      
      const startNum = getDayNumber(
        ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"].indexOf(startMonth) + 1,
        parseInt(startDay)
      );
      
      const endNum = getDayNumber(
        ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"].indexOf(endMonth) + 1,
        parseInt(endDay)
      );

      if (endNum < startNum) {
        return dateNum >= startNum || dateNum <= endNum;
      }
      return dateNum >= startNum && dateNum <= endNum;
    }) || null;
  }, []);

  const handleDateChange = useCallback((newDate: Date) => {
    console.log('Date selected:', newDate);
    setBirthDate(newDate);
    setIsAnimating(true);
    
    const sign = getZodiacSign(newDate);
    setTimeout(() => {
      setZodiacSign(sign);
      setIsAnimating(false);
    }, 500);
  }, [getZodiacSign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDate || !isValid(birthDate)) {
      console.error('Invalid birth date');
      toast.error("Date de naissance invalide");
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting birth date:', birthDate);

    try {
      await onDataUpdate({ birthDate });
      console.log('Birth date updated successfully');
      toast.success("Date de naissance enregistrée avec succès");
      onNext();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('Error updating birth date:', error);
      toast.error(`Erreur lors de l'enregistrement de la date de naissance: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl">Quelle est ta date de naissance ?</h2>
        <p className="text-gray-300">Cette information nous permet de calculer ton signe astrologique</p>
      </div>

      <div className="space-y-4">
        <BirthDateInput 
          birthDate={birthDate}
          onDateChange={handleDateChange}
        />

        <ZodiacDisplay 
          zodiacSign={zodiacSign}
          isAnimating={isAnimating}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!birthDate || !isValid(birthDate) || isSubmitting}
      >
        {isSubmitting ? "Enregistrement..." : "Continuer"}
      </Button>
    </form>
  );
};