import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { QuizData } from "../types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuizStep1Props {
  onNext: () => void;
  onDataUpdate: (data: Partial<QuizData>) => void;
  data: QuizData;
}

export const QuizStep1 = ({ onNext, onDataUpdate, data }: QuizStep1Props) => {
  const [name, setName] = useState(data.name || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createProfile = async (name: string) => {
    console.log('Creating profile with name:', name);
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .insert([{ name }])
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      toast.error("Une erreur est survenue lors de la création du profil");
      throw error;
    }
    
    console.log('Profile created successfully:', profile);
    return profile.id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      console.log('QuizStep1: Submitting name:', name);
      const profileId = await createProfile(name);
      
      if (profileId) {
        await onDataUpdate({ name, profileId });
        toast.success("Profil créé avec succès");
        onNext();
      } else {
        toast.error("Échec de la création du profil");
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="font-display text-2xl text-white">Comment t'appelles-tu ?</h2>
        <p className="text-gray-400">Pour une expérience personnalisée</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-300">Ton prénom</p>
        <Input
          placeholder="Entre ton prénom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          disabled={isSubmitting}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={!name.trim() || isSubmitting}
      >
        {isSubmitting ? "Création..." : "Continuer"}
      </Button>
    </form>
  );
};