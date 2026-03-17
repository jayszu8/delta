"use client";

import Link from "next/link";

const P = {
  bg: "#f8f9fb",
  headline: "#141618",
  body: "#3a3e44",
  section: "#2a2e34",
  muted: "#6a7078",
  border: "#e2e5ea",
  accent: "#2a6a9a",
  faint: "#9aa0a8",
};

export default function MethodologyPage() {
  return (
    <div style={{ background: P.bg, minHeight: "100vh", fontFamily: "'Instrument Serif', Georgia, serif", color: P.body }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <polygon points="16,3 29,27 3,27" fill="none" stroke={P.accent} strokeWidth="1.8" />
          </svg>
          <span style={{ fontStyle: "italic", fontSize: "22px", color: P.headline }}>Delta</span>
          <span style={{ fontSize: "12px", color: P.muted, marginLeft: "4px" }}>/</span>
          <span style={{ fontSize: "12px", color: P.body }}>methodology</span>
        </Link>
        <nav style={{ display: "flex", gap: "28px" }}>
          {[
            { label: "home", href: "/" },
            { label: "football", href: "/football" },
            { label: "formula 1", href: "/f1" },
            { label: "cross-sport", href: "/cross-sport" },
            { label: "methodology", href: "/methodology" },
            { label: "about", href: "/about" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{
              fontSize: "13px", color: P.muted, textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = P.accent}
            onMouseLeave={(e) => e.target.style.color = P.muted}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "60px 32px" }}>
        <h1 style={{ fontStyle: "italic", fontSize: "42px", color: P.headline, marginBottom: "24px" }}>
          Methodology
        </h1>

        <div style={{ fontSize: "16px", color: P.body, lineHeight: 1.75 }}>
          <h2 style={{ fontStyle: "italic", fontSize: "24px", color: P.section, marginTop: "40px", marginBottom: "12px" }}>
            The Gap Score
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Every piece on Delta carries a Gap Score — a number from 0 to 10 that measures how far the popular narrative diverges from what the data shows. A score of 9.2 means the conventional wisdom is almost entirely wrong. A 4.0 means the narrative is mostly right with important nuances.
          </p>
          <p style={{ marginBottom: "16px" }}>
            The score is derived from three inputs: the predicted direction of the narrative's claim, the actual effect size measured in the data, and whether the real direction matches or opposes the claim. Opposite-direction findings receive a multiplier, because a narrative that's not just wrong but backwards is a bigger gap than one that's merely exaggerated.
          </p>

          <h2 style={{ fontStyle: "italic", fontSize: "24px", color: P.section, marginTop: "40px", marginBottom: "12px" }}>
            Data sources
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Football analysis draws primarily from FBref (advanced statistics), FotMob (match ratings), Transfermarkt (market values and squad data), and Understat (expected goals models). F1 analysis uses FastF1 for telemetry and timing data, supplemented by official FIA results.
          </p>
          <p style={{ marginBottom: "16px" }}>
            Every article cites its specific sources, and where possible, the underlying data and methodology are made available for scrutiny. Transparency is not optional — it's what separates analysis from opinion.
          </p>

          <h2 style={{ fontStyle: "italic", fontSize: "24px", color: P.section, marginTop: "40px", marginBottom: "12px" }}>
            Limitations
          </h2>
          <p>
            All models are wrong, some are useful. The Gap Score is a heuristic, not a universal truth — it depends on how the narrative claim is operationalized and which data sources are used. Reasonable people can disagree on both. Where uncertainty exists, it's flagged in the article.
          </p>
        </div>
      </section>

      <footer style={{
        padding: "24px 40px",
        borderTop: `0.5px solid ${P.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" style={{ fontSize: "12px", color: P.muted, fontStyle: "italic", textDecoration: "none" }}>
          Delta
        </Link>
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "methodology", href: "/methodology" },
            { label: "about", href: "/about" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{
              fontSize: "12px", color: P.muted, textDecoration: "none",
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
