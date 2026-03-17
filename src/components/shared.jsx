// =============================================================================
// DELTA — Shared Components
// =============================================================================
// These components are used across all pages. Import individually:
//   import { GapScore, SportPill } from "@/components/shared"
// =============================================================================

import { shared } from "@/lib/colors";

// ---------------------------------------------------------------------------
// Gap Score — the signature metric
// Shows how far the popular narrative diverges from what the data shows
// ---------------------------------------------------------------------------
export function GapScore({ score, size = "default", palette = "green" }) {
  const val = parseFloat(score);

  const palettes = {
    green: {
      high: { bg: "#1a5a34", border: "#3a9a5a", text: "#a0f0b0" },
      mid: { bg: "#1a4a2e", border: "#2a7a44", text: "#80d890" },
      low: { bg: "#2a6a7a", border: "#4a9aad66", text: "#6ec4d6" },
    },
    purple: {
      high: { bg: "#4a2a7a", border: "#9a6adc", text: "#c8a4ff" },
      mid: { bg: "#4a2a7a88", border: "#6a4a9a", text: "#b48af0" },
      low: { bg: "#1c1c22", border: "#2a2a34", text: "#8888a0" },
    },
  };

  const p = palettes[palette] || palettes.green;
  const tier = val >= 8.5 ? p.high : val >= 7.0 ? p.mid : p.low;
  const lg = size === "large";

  return (
    <span
      style={{
        fontSize: lg ? "14px" : "11px",
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 500,
        color: tier.text,
        background: tier.bg,
        border: `0.5px solid ${tier.border}`,
        borderRadius: "8px",
        padding: lg ? "4px 10px" : "3px 8px",
        lineHeight: 1,
        display: "inline-block",
        minWidth: lg ? "40px" : "32px",
        textAlign: "center",
      }}
    >
      {score}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Sport Pill — colored tag indicating Football, F1, or Cross-Sport
// ---------------------------------------------------------------------------
export function SportPill({ sport }) {
  const colorMap = {
    FOOTBALL: shared.sportFootball,
    F1: shared.sportF1,
    "CROSS-SPORT": shared.sportCross,
  };
  const color = colorMap[sport] || shared.slate;

  return (
    <span
      style={{
        fontSize: "9px",
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: "0.05em",
        color,
        background: color + "14",
        border: `0.5px solid ${color}28`,
        borderRadius: "10px",
        padding: "3px 10px",
      }}
    >
      {sport}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Type Pill — content type indicator
// ---------------------------------------------------------------------------
export function TypePill({ type, color }) {
  const c = color || shared.slateMuted;
  return (
    <span
      style={{
        fontSize: "9px",
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: "0.03em",
        color: c,
        background: c + "12",
        border: `0.5px solid ${c}22`,
        borderRadius: "10px",
        padding: "3px 10px",
      }}
    >
      {type}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Shirt Icon — FM-style kit silhouette (used in football section)
// ---------------------------------------------------------------------------
export function ShirtIcon({ color, size = 28, number }) {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 44 44">
        <path
          d="M14 8 L9 11 L4 18 L11 20 L11 38 L33 38 L33 20 L40 18 L35 11 L30 8 Q26 13 22 13 Q18 13 14 8Z"
          fill={color}
          stroke={color}
          strokeWidth="0.3"
          strokeLinejoin="round"
        />
        <path
          d="M14 8 Q18 13 22 13 Q26 13 30 8"
          fill="none"
          stroke="#00000033"
          strokeWidth="0.8"
        />
      </svg>
      {number && (
        <span
          style={{
            position: "absolute",
            fontSize: Math.round(size * 0.35) + "px",
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 500,
            color: "#0a0a0a",
            top: "52%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {number}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Delta Logo — the triangle
// ---------------------------------------------------------------------------
export function DeltaLogo({ color = "#6ec4d6", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <polygon
        points="16,3 29,27 3,27"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
      />
    </svg>
  );
}
