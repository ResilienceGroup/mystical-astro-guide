export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

import { ProfilesTable } from './profiles';
import { QuizResponsesTable } from './quiz-responses';
import { ReportsTable } from './reports';

export type Database = {
  public: {
    Tables: {
      profiles: ProfilesTable
      quiz_responses: QuizResponsesTable
      reports: ReportsTable
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type PublicSchema = Database[Extract<keyof Database, "public">]