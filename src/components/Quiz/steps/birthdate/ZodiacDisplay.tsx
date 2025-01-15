import { zodiac } from "@/lib/zodiac";

interface ZodiacDisplayProps {
  zodiacSign: typeof zodiac[0] | null;
  isAnimating: boolean;
}

export const ZodiacDisplay = ({ zodiacSign, isAnimating }: ZodiacDisplayProps) => {
  if (!zodiacSign) return null;

  return (
    <div className={`text-center space-y-4 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-6xl">{zodiacSign.symbol}</div>
      <div className="space-y-1">
        <h3 className="font-display text-xl">{zodiacSign.name}</h3>
        <p className="text-sm text-gray-300">{zodiacSign.dates}</p>
        <p className="text-sm text-gray-300">Élément: {zodiacSign.element}</p>
      </div>
    </div>
  );
};