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