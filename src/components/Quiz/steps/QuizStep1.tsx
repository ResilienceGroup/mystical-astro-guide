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
      toast.error(`Erreur lors de la création du profil: ${error.message}`);
      throw error;
    }
    
    console.log('Profile created successfully:', profile);
    toast.success("Profil créé avec succès");
    return profile.id;
  };

  const createQuizResponse = async (profileId: string) => {
    console.log('Creating quiz response for profile:', profileId);
    
    const { data: response, error } = await supabase
      .from('quiz_responses')
      .insert([{ 
        profile_id: profileId,
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating quiz response:', error);
      toast.error(`Erreur lors de la création du questionnaire: ${error.message}`);
      throw error;
    }

    console.log('Quiz response created successfully:', response);
    toast.success("Questionnaire créé avec succès");
    return response;
  };

  const createEmptyReport = async (profileId: string) => {
    console.log('Creating empty report for profile:', profileId);
    
    const { data: report, error } = await supabase
      .from('reports')
      .insert([{
        profile_id: profileId,
        content: {},
        personality_analysis: "Analyse en cours de génération...",
        opportunities: "Analyse en cours de génération...",
        challenges: "Analyse en cours de génération...",
        love_insights: "Analyse en cours de génération...",
        career_guidance: "Analyse en cours de génération...",
        spiritual_growth: "Analyse en cours de génération..."
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating empty report:', error);
      toast.error(`Erreur lors de la création du rapport: ${error.message}`);
      throw error;
    }

    console.log('Empty report created successfully:', report);
    toast.success("Rapport initial créé avec succès");
    return report;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      console.log('QuizStep1: Submitting name:', name);
      const profileId = await createProfile(name);
      
      if (profileId) {
        // Create quiz response
        await createQuizResponse(profileId);
        
        // Create empty report
        await createEmptyReport(profileId);

        // Update quiz data with profile ID and name
        await onDataUpdate({ name, profileId });
        onNext();
      } else {
        console.error('No profile ID returned from createProfile');
        toast.error("Échec de la création du profil");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('Error in handleSubmit:', error);
      toast.error(`Une erreur est survenue: ${errorMessage}`);
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