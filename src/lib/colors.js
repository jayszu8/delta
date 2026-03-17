// =============================================================================
// DELTA — Color System
// =============================================================================
// Every color in the project lives here. Import what you need:
//   import { home, football, f1, shared } from "@/lib/colors"
// =============================================================================

// Shared across all pages
export const shared = {
  white: "#f4f6f8",
  offWhite: "#e8ecf0",
  slate: "#8494a8",
  slateMuted: "#5a6a7e",
  slateDark: "#3e4e62",

  // Sport accent colors (used in pills, tags, hover states)
  sportFootball: "#4a9aad",
  sportF1: "#d4a0c4",
  sportCross: "#d4a44e",

  // Content type colors
  typeEssay: "#6ec4d6",
  typeProfile: "#8a7ac4",
  typeRecap: "#d4a0c4",
  typeSimulation: "#d4786a",
  typeRating: "#d4a44e",

  // Gap Score colors
  gapHigh: "#5aaa6e",
  gapMid: "#2a7a42",
  gapLow: "#2a6a7a",
};

// Home page
export const home = {
  bg: "#0a1628",
  bgMid: "#111f3a",
  bgLight: "#1a2d4e",
  card: "#0f1d34",
  border: "#1a2d4e",
  accent: "#6ec4d6", // teal — neutral brand color
};

// Football section
export const football = {
  bg: "#0e2818",
  bgMid: "#133420",
  bgLight: "#1a4028",
  card: "#0c2418",
  cardHover: "#122e1e",
  border: "#1e4a30",
  borderHover: "#2a6a40",
  pitchLine: "#2a6040",
  pitchLineBright: "#3a7a50",
  accent: "#6ec4d6",

  // Shirt colors by formation line
  shirtST: "#ecc06a",      // gold — lead story
  shirtAM: "#6ec4d6",      // teal — attacking mid
  shirtDM: "#72cc88",      // bright green — holding
  shirtDEF: "#8ac0a0",     // muted green — foundation

  // Text
  offWhite: "#d8e0d4",
  slate: "#8a9c8e",
  slateMuted: "#5a7060",
};

// F1 section
export const f1 = {
  bg: "#0e0e12",
  bgMid: "#151518",
  bgLight: "#1c1c22",
  card: "#151518",
  border: "#2a2a34",
  accent: "#b48af0",

  // Timing colors
  purple: "#9a6adc",
  purpleLight: "#b48af0",
  purpleBright: "#c8a4ff",
  purpleDark: "#4a2a7a",
  pink: "#dc6ab0",
  pinkLight: "#f08ad0",
  teal: "#4acad4",
  tealLight: "#6ae0ea",

  // Sector colors (authentic F1 timing)
  sectorPurple: "#a060e0",  // personal best
  sectorGreen: "#40c060",   // overall fastest
  sectorYellow: "#d4c040",  // slower

  // Grid position colors
  posFront: "#c8a4ff",      // P1-P2
  posSecond: "#f08ad0",     // P3-P4
  posThird: "#6ae0ea",      // P5-P6
  posBack: "#8888a0",       // P7+

  // Track elements
  kerbRed: "#d44040",
  trackWhite: "#d0d0d8",

  // Text
  offWhite: "#d4d4dc",
  slate: "#8888a0",
  slateMuted: "#5a5a70",
};
