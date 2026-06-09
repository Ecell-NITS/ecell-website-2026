import { coreTeam2026_2027 } from "./2026-2027";
import { coreTeam2025_2026 } from "./2025-2026";
import { coreTeam2024_2025 } from "./2024-2025";
import { coreTeam2023_2024 } from "./2023-2024";
import { coreTeam2022_2023 } from "./2022-2023";
import { coreTeam2021_2022 } from "./2021-2022";
import type { CoreMember } from "./types";

export type CoreYear =
  | "2026-2027"
  | "2025-2026"
  | "2024-2025"
  | "2023-2024"
  | "2022-2023"
  | "2021-2022";

export const coreTeams: Record<CoreYear, CoreMember[]> = {
  "2026-2027": coreTeam2026_2027,
  "2025-2026": coreTeam2025_2026,
  "2024-2025": coreTeam2024_2025,
  "2023-2024": coreTeam2023_2024,
  "2022-2023": coreTeam2022_2023,
  "2021-2022": coreTeam2021_2022,
};

export * from "./types";
