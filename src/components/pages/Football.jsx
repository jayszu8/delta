import { useState, useEffect } from "react";
import Link from "next/link";

const P = {
  bg: "#0c1e10",
  surface: "#101f14",
  border: "#1a3420",
  borderHover: "#2a4a30",
  pitchLine: "#1e4028",
  teal: "#4a9aad",
  tealLight: "#6ec4d6",
  amber: "#d4a44e",
  amberLight: "#ecc06a",
  green: "#5aaa6e",
  greenBright: "#72cc88",
  white: "#f4f6f8",
  offWhite: "#d0d8d2",
  slate: "#7a8e80",
  slateMuted: "#4e6454",
};

const typeColor = {
  "DATA ESSAY": P.tealLight,
  PROFILE: "#b0a0d8",
  RECAP: "#d4a0c4",
  SIMULATION: "#d4786a",
};

const articles = [
  { slug: "the-new-ground-effect", pos: "ST", type: "DATA ESSAY", title: "The new ground effect", subtitle: "Do bigger stadiums actually produce better results — or just bigger expectations?", date: "14 Mar", gap: 9.2, line: "attack" },
  { slug: "richarlison", pos: "AML", type: "PROFILE", title: "Richarlison: Anfield's anomaly", subtitle: "Why Spurs' striker defies his own season stats every time he visits L4.", date: "15 Mar", gap: 7.1, line: "attack" },
  { slug: "pressing-intensity", pos: "AMC", type: "DATA ESSAY", title: "Pressing intensity vs. points", subtitle: "Does running more actually win you more games?", date: "12 Mar", gap: 8.5, line: "attack" },
  { slug: "wirtz", pos: "AMR", type: "PROFILE", title: "Wirtz through the lens", subtitle: "Liverpool's marquee signing rated in context.", date: "11 Mar", gap: 6.8, line: "attack" },
  { slug: "pochettino", pos: "DML", type: "SIMULATION", title: "What if Spurs kept Pochettino?", subtitle: "A counterfactual simulation using squad trajectories and tactical modeling.", date: "08 Mar", gap: 7.9, line: "midfield" },
  { slug: "boleyn", pos: "DMR", type: "DATA ESSAY", title: "The Boleyn curse", subtitle: "London Stadium was supposed to be a launchpad. The data says anchor.", date: "02 Mar", gap: 8.4, line: "midfield" },
  { slug: "liverpool-spurs", pos: "DL", type: "RECAP", title: "Liverpool 1-1 Spurs", subtitle: "How Spurs stole a point in the 90th minute at Anfield.", date: "15 Mar", gap: 5.8, line: "defence" },
  { slug: "home-advantage", pos: "DCL", type: "DATA ESSAY", title: "Home advantage is shrinking", subtitle: "Post-COVID home win rates haven't recovered.", date: "28 Feb", gap: 7.4, line: "defence" },
];

const lines = { attack: [], midfield: [], defence: [] };
articles.forEach((a) => lines[a.line].push(a));

const lineLabels = {
  attack: { label: "Attack", desc: "Lead essays, profiles" },
  midfield: { label: "Midfield", desc: "Simulations, deep dives" },
  defence: { label: "Defence", desc: "Recaps, archive" },
};

export default function DeltaFootballV2() {
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div style={{
      background: P.bg, minHeight: "100vh",
      fontFamily: "'Instrument Serif', Georgia, serif",
      color: P.offWhite, position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Caveat:wght@400&display=swap" rel="stylesheet" />

      {/* Pitch markings — barely there */}
      <svg style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.08,
      }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 1400">
        <rect x="50" y="50" width="900" height="1300" rx="8" fill="none" stroke={P.pitchLine} strokeWidth="1" />
        <line x1="50" y1="700" x2="950" y2="700" stroke={P.pitchLine} strokeWidth="0.8" />
        <circle cx="500" cy="700" r="80" fill="none" stroke={P.pitchLine} strokeWidth="0.8" />
        <circle cx="500" cy="700" r="3" fill={P.pitchLine} />
      </svg>

      {/* Header */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px", position: "relative", zIndex: 10,
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <polygon points="16,3 29,27 3,27" fill="none" stroke={P.tealLight} strokeWidth="1.8" />
          </svg>
          <span style={{ fontStyle: "italic", fontSize: "22px", color: P.white }}>Delta</span>
          <span style={{ fontSize: "12px", color: P.slateMuted, marginLeft: "4px" }}>/</span>
          <span style={{ fontSize: "12px", color: P.slate }}>football</span>
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
            <Link key={item.label} href={item.href} style={{ fontSize: "13px", color: P.slate, cursor: "pointer", textDecoration: "none" }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section style={{
        padding: "100px 40px 80px",
        maxWidth: "700px",
        position: "relative", zIndex: 5,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "11px", color: P.greenBright, letterSpacing: "0.06em",
          marginBottom: "16px",
          opacity: loaded ? 0.7 : 0,
          transition: "opacity 0.6s ease-out",
        }}>
          4-2-3-1
        </div>
        <h1 style={{
          fontStyle: "italic", fontSize: "44px", color: P.white,
          lineHeight: 1.15, marginBottom: "16px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(12px)",
          transition: "all 0.7s ease-out 0.05s",
        }}>
          Football
        </h1>
        <p style={{
          fontSize: "17px", color: P.slate, lineHeight: 1.6,
          maxWidth: "440px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(8px)",
          transition: "all 0.7s ease-out 0.1s",
        }}>
          Premier League and European football, analyzed through data.
          Articles positioned by editorial ambition — strikers are the boldest
          claims, defenders are the foundation.
        </p>
      </section>

      {/* Formation lines */}
      <section style={{
        padding: "0 40px 100px",
        maxWidth: "900px",
        position: "relative", zIndex: 5,
      }}>
        {["attack", "midfield", "defence"].map((line, lineIdx) => (
          <div key={line} style={{ marginBottom: lineIdx < 2 ? "64px" : "0" }}>
            {/* Line label */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "28px",
            }}>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "10px", color: P.slateMuted, letterSpacing: "0.08em",
              }}>
                {lineLabels[line].label.toUpperCase()}
              </span>
              <div style={{ flex: 1, height: "0.5px", background: P.border }} />
              <span style={{ fontSize: "12px", color: P.slateMuted, fontStyle: "italic" }}>
                {lineLabels[line].desc}
              </span>
            </div>

            {/* Articles in this line */}
            {lines[line].map((article, i) => (
              <a
                key={article.slug}
                href={`/articles/${article.slug}`}
                onMouseEnter={() => setHovered(article.slug)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "block",
                  padding: "24px 0",
                  borderBottom: i < lines[line].length - 1 ? `0.5px solid ${P.border}` : "none",
                  textDecoration: "none", cursor: "pointer",
                }}
              >
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                }}>
                  <div style={{ flex: 1, maxWidth: "580px" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      marginBottom: "8px",
                    }}>
                      <span style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "10px", fontWeight: 500,
                        color: P.bg,
                        background: line === "attack" ? P.amberLight : line === "midfield" ? P.greenBright : P.slate,
                        padding: "1px 6px", borderRadius: "3px",
                      }}>
                        {article.pos}
                      </span>
                      <span style={{
                        fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace",
                        color: typeColor[article.type] || P.slate,
                      }}>
                        {article.type}
                      </span>
                    </div>
                    <h3 style={{
                      fontStyle: "italic", fontSize: "24px", color: P.white,
                      lineHeight: 1.25, marginBottom: "6px",
                      transition: "color 0.2s",
                      ...(hovered === article.slug ? { color: P.tealLight } : {}),
                    }}>
                      {article.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: P.slate, lineHeight: 1.55 }}>
                      {article.subtitle}
                    </p>
                  </div>

                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-end",
                    gap: "6px", marginLeft: "40px", flexShrink: 0, paddingTop: "24px",
                  }}>
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 500,
                      color: parseFloat(article.gap) >= 8.5 ? "#80e8a0" : parseFloat(article.gap) >= 7.0 ? "#60c880" : P.tealLight,
                    }}>
                      {article.gap}
                    </span>
                    <span style={{
                      fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
                      color: P.slateMuted,
                    }}>
                      {article.date}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: "24px 40px",
        borderTop: `0.5px solid ${P.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative", zIndex: 5,
      }}>
        <Link href="/" style={{ fontSize: "12px", color: P.slateMuted, fontStyle: "italic", textDecoration: "none" }}>Delta</Link>
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "methodology", href: "/methodology" },
            { label: "about", href: "/about" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{ fontSize: "12px", color: P.slateMuted, textDecoration: "none" }}>{item.label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
