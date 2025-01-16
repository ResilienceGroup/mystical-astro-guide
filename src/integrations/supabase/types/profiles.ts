export interface ProfilesTable {
  Row: {
    created_at: string
    email: string | null
    id: string
    name: string
    updated_at: string | null
  }
  Insert: {
    created_at?: string
    email?: string | null
    id?: string
    name: string
    updated_at?: string | null
  }
  Update: {
    created_at?: string
    email?: string | null
    id?: string
    name?: string
    updated_at?: string | null
  }
  Relationships: []
}