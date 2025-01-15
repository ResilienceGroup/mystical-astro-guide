import { Button } from "@/components/ui/button";
import { QuizData } from "../QuizModal";
import { zodiac } from "@/lib/zodiac";
import { useState } from "react";
import { isValid } from "date-fns";
import { BirthDateInput } from "./birthdate/BirthDateInput";
import { ZodiacDisplay } from "./birthdate/ZodiacDisplay";

interface QuizStep2Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep2 = ({ onNext, onDataUpdate, data }: QuizStep2Props) => {
  const [birthDate, setBirthDate] = useState<Date | null>(data.birthDate || null);
  const [zodiacSign, setZodiacSign] = useState<typeof zodiac[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getZodiacSign = (date: Date) => {
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
  };

  const handleDateChange = (newDate: Date) => {
    setBirthDate(newDate);
    setIsAnimating(true);
    
    const sign = getZodiacSign(newDate);
    setTimeout(() => {
      setZodiacSign(sign);
      setIsAnimating(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate && isValid(birthDate)) {
      onDataUpdate({ birthDate });
      onNext();
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
        disabled={!birthDate || !isValid(birthDate)}
      >
        Continuer
      </Button>
    </form>
  );
};