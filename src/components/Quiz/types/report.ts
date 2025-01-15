export interface ReportDate {
  period: string;
  focus: string;
  category: string;
  description: string;
  planetaryInfo: string;
}

export interface ReportSection {
  title: string;
  content: string;
  dates?: ReportDate[];
  planetPosition?: string;
  isBlurred?: boolean;
}

// Type guard to ensure JSON compatibility
export const isJsonCompatible = (value: unknown): value is Json => {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
};

// Type for our database
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];