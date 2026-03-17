// =============================================================================
// DELTA — Color System (Arctic Light Palette)
// =============================================================================
// Every color in the project lives here. Import what you need:
//   import { home, football, f1, shared } from "@/lib/colors"
// =============================================================================

// Shared across all pages
export const shared = {
  white: "#f8f9fb",
  offWhite: "#f0f2f5",
  slate: "#6a7078",
  slateMuted: "#9aa0a8",
  slateDark: "#c0c4ca",

  // Sport accent colors (used in pills, tags, hover states)
  sportFootball: "#1a7a5a",
  sportF1: "#5a4a9a",
  sportCross: "#8a6a20",

  // Content type colors
  typeEssay: "#1a7a5a",
  typeProfile: "#5a4a9a",
  typeRecap: "#8a5a7a",
  typeSimulation: "#9a5a3a",
  typeRating: "#8a6a20",

  // Gap Score colors (green Instrument Serif italic)
  gapHigh: "#1a6a3a",
  gapMid: "#3a7a4a",
  gapLow: "#6a8a70",

  // Brand accent
  accent: "#2a6a9a",
};

// Home page
export const home = {
  bg: "#f8f9fb",
  surface: "#f0f2f5",
  border: "#e2e5ea",
  headline: "#141618",
  body: "#3a3e44",
  caption: "#6a7078",
  muted: "#9aa0a8",
  faint: "#c0c4ca",
  accent: "#2a6a9a",
};

// Football section
export const football = {
  bg: "#f4f8f5",
  surface: "#e8f0ea",
  border: "#d4e4d8",
  headline: "#142a1e",
  body: "#3a5a44",
  muted: "#5a7a64",
  accent: "#1a7a5a",
  pitchLine: "#d4e4d8",

  // Position badge colors by formation line
  posAttack: "#c8956a",
  posMidfield: "#58a06a",
  posDefence: "#8aaa90",
};

// F1 section
export const f1 = {
  bg: "#f5f4f8",
  surface: "#eae8f2",
  border: "#dcd8ea",
  headline: "#1a1830",
  body: "#3a3450",
  muted: "#6a6480",
  accent: "#5a4a9a",

  // Sector colors
  sectorPurple: "#7a5ac0",
  sectorGreen: "#3a9a5a",
  sectorYellow: "#b09030",

  // Grid position colors
  posFront: "#5a4a9a",
  posSecond: "#7a6aaa",
  posThird: "#9a8aba",
  posBack: "#a0a0b0",

  // Gap Score (purple spectrum)
  gapHigh: "#4a2a8a",
  gapMid: "#6a4aaa",
  gapLow: "#8a80a0",
};

// Cross-sport section
export const crossSport = {
  bg: "#f8f6f2",
  surface: "#f0ece2",
  border: "#e4dcc8",
  headline: "#2a2418",
  body: "#4a4030",
  muted: "#8a7a58",
  accent: "#8a6a20",
  football: "#1a7a5a",
  f1: "#5a4a9a",
};
