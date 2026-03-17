// =============================================================================
// DELTA — Color System (Monochrome Purple)
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

  // Sport accent colors (monochrome purple family)
  sportFootball: "#6B5CA5",
  sportF1: "#9B8BD5",
  sportCross: "#4A3D7A",

  // Sport light tint backgrounds
  footballLight: "#F2F0F8",
  f1Light: "#F4F2FA",
  crossLight: "#EEEAF4",

  // Content type colors
  typeEssay: "#6B5CA5",
  typeProfile: "#9B8BD5",
  typeRecap: "#4A3D7A",
  typeSimulation: "#7A6CB5",
  typeRating: "#6B5CA5",

  // Brand accent
  accent: "#6B5CA5",

  // Borders
  border: "#E4E2EA",
};

// Home page
export const home = {
  bg: "#f8f9fb",
  surface: "#f0f2f5",
  border: "#E4E2EA",
  headline: "#141618",
  body: "#3a3e44",
  caption: "#6a7078",
  muted: "#9aa0a8",
  faint: "#c0c4ca",
  accent: "#6B5CA5",
};

// Football section
export const football = {
  bg: "#F7F6FA",
  surface: "#F0EEF6",
  border: "#D8D4E4",
  headline: "#141618",
  body: "#3a3e44",
  muted: "#6a7078",
  accent: "#6B5CA5",
  pitchLine: "#D8D4E4",

  posAttack: "#6B5CA5",
  posMidfield: "#8A7CC0",
  posDefence: "#A89CD0",
};

// F1 section
export const f1 = {
  bg: "#F9F8FC",
  surface: "#F2F0F8",
  border: "#E0DCF0",
  headline: "#141618",
  body: "#3a3e44",
  muted: "#6a7078",
  accent: "#9B8BD5",

  sectorS1: "#6B5CA5",
  sectorS2: "#9B8BD5",
  sectorS3: "#4A3D7A",

  posFront: "#9B8BD5",
  posBack: "#a0a0b0",
};

// Cross-sport section
export const crossSport = {
  bg: "#F5F4F8",
  surface: "#EEEAF4",
  border: "#D0CCE0",
  headline: "#141618",
  body: "#3a3e44",
  muted: "#6a7078",
  accent: "#4A3D7A",
  football: "#6B5CA5",
  f1: "#9B8BD5",
};
