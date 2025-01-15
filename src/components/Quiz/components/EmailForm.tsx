import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const EmailForm = ({ email, setEmail, onSubmit }: EmailFormProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 -mt-12 opacity-20 pointer-events-none blur-sm">
        <div className="space-y-4 p-6">
          <div className="h-32 bg-white/10 rounded-lg"></div>
          <div className="h-48 bg-white/10 rounded-lg"></div>
          <div className="h-24 bg-white/10 rounded-lg"></div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-black/80 to-black/95 rounded-lg p-6 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="font-display text-2xl">Ton Rapport Personnalisé est Prêt !</h2>
          <p className="text-gray-300">
            Comme 2M d'utilisateurs, rentre ton email pour recevoir ton analyse astrologique détaillée
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Entre ton email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            required
          />

          <Button
            type="submit"
            className="w-full bg-[#8639F6] hover:bg-[#8639F6]/90"
            disabled={!email}
          >
            Recevoir Mon Rapport
          </Button>
        </form>
      </div>
    </div>
  );
};