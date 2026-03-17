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

export default function AboutPage() {
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
          <span style={{ fontSize: "12px", color: P.body }}>about</span>
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
          About Delta
        </h1>

        <div style={{ fontSize: "16px", color: P.body, lineHeight: 1.75 }}>
          <p style={{ marginBottom: "16px", fontSize: "18px", color: P.section }}>
            Sports narratives are built on repetition, not evidence. Delta takes the claims everyone repeats — about teams, drivers, tactics, and transfers — and tests them against what the data actually shows.
          </p>

          <p style={{ marginBottom: "16px" }}>
            The project grew out of a simple question asked during an intro statistics class at Yale: do bigger stadiums correlate with better results in the Premier League? The answer was more interesting than the question — and the gap between what everyone assumed and what the data showed became the thesis for everything that followed.
          </p>

          <p style={{ marginBottom: "16px" }}>
            Delta covers football (with the Premier League and European competition as the core focus) and Formula 1 (a newer interest, approached with fresh analytical eyes). The cross-sport section explores the structural parallels between the two — competitive balance, venue economics, dynasty mechanics.
          </p>

          <p style={{ marginBottom: "16px" }}>
            Every piece is data-driven, every claim is sourced, and every methodology is transparent. If the data contradicts a popular narrative, the data wins. If the data supports it, that's worth knowing too.
          </p>

          <div style={{
            marginTop: "40px", paddingTop: "24px",
            borderTop: `0.5px solid ${P.border}`,
          }}>
            <p style={{ fontSize: "14px", color: P.muted }}>
              Built with Next.js. Data processed in Python. Hosted on Vercel.
            </p>
          </div>
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
