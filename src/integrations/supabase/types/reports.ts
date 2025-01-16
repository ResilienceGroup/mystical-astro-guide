import { Json } from './base';

export interface ReportsTable {
  Row: {
    career_guidance: string | null
    challenges: string | null
    content: Json
    created_at: string
    id: string
    love_insights: string | null
    opportunities: string | null
    personality_analysis: string | null
    profile_id: string | null
    spiritual_growth: string | null
  }
  Insert: {
    career_guidance?: string | null
    challenges?: string | null
    content: Json
    created_at?: string
    id?: string
    love_insights?: string | null
    opportunities?: string | null
    personality_analysis?: string | null
    profile_id?: string | null
    spiritual_growth?: string | null
  }
  Update: {
    career_guidance?: string | null
    challenges?: string | null
    content?: Json
    created_at?: string
    id?: string
    love_insights?: string | null
    opportunities?: string | null
    personality_analysis?: string | null
    profile_id?: string | null
    spiritual_growth?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "reports_profile_id_fkey"
      columns: ["profile_id"]
      isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    }
  ]
}