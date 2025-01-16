import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useProfile = () => {
  const createProfile = async (name: string) => {
    try {
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
    } catch (error) {
      console.error('Error in createProfile:', error);
      toast.error("Une erreur est survenue lors de la création du profil");
      throw error;
    }
  };

  return { createProfile };
};