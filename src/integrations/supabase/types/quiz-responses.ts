export interface QuizResponsesTable {
  Row: {
    birth_date: string | null
    birth_place: string | null
    birth_time: string | null
    created_at: string
    element: string | null
    goals: string[] | null
    id: string
    profile_id: string | null
    relationship_status: string | null
    updated_at: string
    email: string | null
  }
  Insert: {
    birth_date?: string | null
    birth_place?: string | null
    birth_time?: string | null
    created_at?: string
    element?: string | null
    goals?: string[] | null
    id?: string
    profile_id?: string | null
    relationship_status?: string | null
    updated_at?: string
    email?: string | null
  }
  Update: {
    birth_date?: string | null
    birth_place?: string | null
    birth_time?: string | null
    created_at?: string
    element?: string | null
    goals?: string[] | null
    id?: string
    profile_id?: string | null
    relationship_status?: string | null
    updated_at?: string
    email?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "quiz_responses_profile_id_fkey"
      columns: ["profile_id"]
      isOneToOne: true
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    }
  ]
}