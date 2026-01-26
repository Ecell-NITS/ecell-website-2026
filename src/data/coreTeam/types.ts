export interface CoreMember {
  id: number;
  name: string;
  rank: string;
  image?: string;
  fb?: string;
  linkedln?: string;
  insta?: string;
  git?: string;
}

export type CoreYear =
  | "2025-2026"
  | "2024-2025"
  | "2023-2024"
  | "2022-2023"
  | "2021-2022";
