// ============================================================
// Gallery Data — Edit this file to add/remove images & filters
// ============================================================

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  year: string;
  event: string;
  /** "tall" = 2-row span, "wide" = 2-col span, "featured" = 2×2, "normal" = 1×1 */
  size: "normal" | "tall" | "wide" | "featured";
}

// ──── Filter options ────────────────────────────────────────
export const YEARS = [
  "2025-2026",
  "2024-2025",
  "2023-2024",
  "2022-2023",
  "2021-2022",
] as const;

export const EVENTS = [
  "Speaker Sessions",
  "Pitch Boxing",
  "Hackathon",
  "Workshop",
  "E-Summit",
  "Startup Expo",
  "Ideathon",
  "Panel Discussion",
] as const;

// ──── Gallery images ────────────────────────────────────────
// To add a new image: copy a block below and change the fields.
// The "size" field controls layout: normal (1×1), tall (1×2), wide (2×1), featured (2×2)
// The grid auto-adapts — just add entries and it handles the rest.

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://picsum.photos/seed/ecell1/600/800",
    alt: "Team collaboration during Speaker Sessions",
    year: "2024-2025",
    event: "Speaker Sessions",
    size: "tall",
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/ecell2/800/600",
    alt: "Award ceremony at E-Summit",
    year: "2024-2025",
    event: "E-Summit",
    size: "wide",
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/ecell3/600/600",
    alt: "Workshop hands-on session",
    year: "2024-2025",
    event: "Workshop",
    size: "normal",
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/ecell4/600/600",
    alt: "Pitch Boxing competition",
    year: "2023-2024",
    event: "Pitch Boxing",
    size: "normal",
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/ecell5/800/800",
    alt: "Speaker Sessions keynote",
    year: "2023-2024",
    event: "Speaker Sessions",
    size: "featured",
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/ecell6/600/800",
    alt: "Hackathon coding in progress",
    year: "2023-2024",
    event: "Hackathon",
    size: "tall",
  },
  {
    id: 7,
    src: "https://picsum.photos/seed/ecell7/600/600",
    alt: "Students at Startup Expo",
    year: "2023-2024",
    event: "Startup Expo",
    size: "normal",
  },
  {
    id: 8,
    src: "https://picsum.photos/seed/ecell8/800/600",
    alt: "Panel Discussion with industry experts",
    year: "2022-2023",
    event: "Panel Discussion",
    size: "wide",
  },
  {
    id: 9,
    src: "https://picsum.photos/seed/ecell9/600/600",
    alt: "E-Summit networking session",
    year: "2022-2023",
    event: "E-Summit",
    size: "normal",
  },
  {
    id: 10,
    src: "https://picsum.photos/seed/ecell10/600/800",
    alt: "Ideathon brainstorming session",
    year: "2022-2023",
    event: "Ideathon",
    size: "tall",
  },
  {
    id: 11,
    src: "https://picsum.photos/seed/ecell11/600/600",
    alt: "Workshop presentation",
    year: "2022-2023",
    event: "Workshop",
    size: "normal",
  },
  {
    id: 12,
    src: "https://picsum.photos/seed/ecell12/800/600",
    alt: "Hackathon team presentation",
    year: "2024-2025",
    event: "Hackathon",
    size: "wide",
  },
  {
    id: 13,
    src: "https://picsum.photos/seed/ecell13/600/600",
    alt: "Startup pitch event",
    year: "2024-2025",
    event: "Pitch Boxing",
    size: "normal",
  },
  {
    id: 14,
    src: "https://picsum.photos/seed/ecell14/600/800",
    alt: "E-Summit opening ceremony",
    year: "2021-2022",
    event: "E-Summit",
    size: "tall",
  },
  {
    id: 15,
    src: "https://picsum.photos/seed/ecell15/600/600",
    alt: "Ideathon finalist pitch",
    year: "2021-2022",
    event: "Ideathon",
    size: "normal",
  },
  {
    id: 16,
    src: "https://picsum.photos/seed/ecell16/800/800",
    alt: "Speaker Sessions group photo",
    year: "2025-2026",
    event: "Speaker Sessions",
    size: "featured",
  },
  {
    id: 17,
    src: "https://picsum.photos/seed/ecell17/600/600",
    alt: "Startup Expo stalls",
    year: "2025-2026",
    event: "Startup Expo",
    size: "normal",
  },
  {
    id: 18,
    src: "https://picsum.photos/seed/ecell18/800/600",
    alt: "Hackathon winners announcement",
    year: "2025-2026",
    event: "Hackathon",
    size: "wide",
  },
  {
    id: 19,
    src: "https://picsum.photos/seed/ecell19/600/600",
    alt: "Workshop interactive session",
    year: "2025-2026",
    event: "Workshop",
    size: "normal",
  },
  {
    id: 20,
    src: "https://picsum.photos/seed/ecell20/600/600",
    alt: "Panel Discussion audience",
    year: "2021-2022",
    event: "Panel Discussion",
    size: "normal",
  },
];
