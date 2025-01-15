import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuizData } from "@/pages/Quiz";
import { zodiac } from "@/lib/zodiac";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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

    // Convert date strings to day numbers for comparison
    const getDayNumber = (m: number, d: number) => m * 100 + d;
    const dateNum = getDayNumber(month, day);

    return zodiac.find((sign, index) => {
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
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
    if (birthDate) {
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
        <div className="space-y-2">
          <Label htmlFor="birthdate">Date de naissance</Label>
          <Input
            id="birthdate"
            type="date"
            value={birthDate ? format(birthDate, "yyyy-MM-dd") : ""}
            onChange={handleDateChange}
            className="bg-white/10 border-white/20 text-white"
            required
          />
        </div>

        {zodiacSign && (
          <div className={`text-center space-y-4 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-6xl">{zodiacSign.symbol}</div>
            <div className="space-y-1">
              <h3 className="font-display text-xl">{zodiacSign.name}</h3>
              <p className="text-sm text-gray-300">{zodiacSign.dates}</p>
              <p className="text-sm text-gray-300">Élément: {zodiacSign.element}</p>
            </div>
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!birthDate}
      >
        Continuer
      </Button>
    </form>
  );
};