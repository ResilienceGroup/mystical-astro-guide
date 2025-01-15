import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, isValid } from "date-fns";

interface BirthDateInputProps {
  birthDate: Date | null;
  onDateChange: (date: Date) => void;
}

export const BirthDateInput = ({ birthDate, onDateChange }: BirthDateInputProps) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    
    if (!isValid(newDate)) {
      console.error("Invalid date selected");
      return;
    }

    onDateChange(newDate);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="birthdate">Date de naissance</Label>
      <Input
        id="birthdate"
        type="date"
        value={birthDate && isValid(birthDate) ? format(birthDate, "yyyy-MM-dd") : ""}
        onChange={handleDateChange}
        className="bg-white/10 border-white/20 text-white"
        required
      />
    </div>
  );
};