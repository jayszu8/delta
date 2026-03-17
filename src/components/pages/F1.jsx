import { useState, useEffect } from "react";
import Link from "next/link";

const P = {
  bg: "#0c0c10",
  surface: "#121216",
  border: "#222230",
  borderHover: "#33334a",
  purple: "#9a6adc",
  purpleLight: "#b48af0",
  purpleBright: "#c8a4ff",
  pink: "#dc6ab0",
  pinkLight: "#f08ad0",
  teal: "#4acad4",
  tealLight: "#6ae0ea",
  sectorPurple: "#a060e0",
  sectorGreen: "#40c060",
  sectorYellow: "#d4c040",
  kerbRed: "#d44040",
  white: "#f4f6f8",
  offWhite: "#d0d0d8",
  slate: "#8080a0",
  slateMuted: "#505068",
};

const sectorColor = { S1: P.sectorPurple, S2: P.sectorGreen, S3: P.sectorYellow };
const sectorLabel = { S1: "Data essays", S2: "Profiles", S3: "Recaps + sims" };

const articles = [
  { slug: "street-circuits", pos: 1, sector: "S1", type: "DATA ESSAY", title: "Street circuits don't produce better racing", subtitle: "DRS overtakes on street vs. permanent venues, adjusted for track length, era, and field spread.", date: "10 Mar", gap: 9.4 },
  { slug: "car-vs-driver", pos: 2, sector: "S1", type: "DATA ESSAY", title: "The car vs. the driver: quantified", subtitle: "How much of a race result is car and how much is driver? A regression model using teammate deltas.", date: "08 Mar", gap: 8.9 },
  { slug: "russell", pos: 3, sector: "S2", type: "PROFILE", title: "Russell finds clear air", subtitle: "Australia 2026 winner profile — how qualifying pace finally translated to race craft.", date: "09 Mar", gap: 6.8 },
  { slug: "pit-stop", pos: 4, sector: "S1", type: "DATA ESSAY", title: "Pit stop strategy is less decisive than you think", subtitle: "Undercut vs. overcut success rates across the turbo-hybrid era.", date: "05 Mar", gap: 8.2 },
  { slug: "antonelli", pos: 5, sector: "S2", type: "PROFILE", title: "Antonelli: the real deal?", subtitle: "Junior career data mapped against historical benchmarks for elite F1 rookies.", date: "03 Mar", gap: 7.1 },
  { slug: "drs", pos: 6, sector: "S3", type: "SIMULATION", title: "What if DRS never existed?", subtitle: "Re-simulating 10 seasons of overtaking data without DRS zones.", date: "01 Mar", gap: 8.6 },
  { slug: "australia-race", pos: 7, sector: "S3", type: "RECAP", title: "Australia 2026: Race debrief", subtitle: "Strategy calls, driver ratings, and the Piastri DNF.", date: "09 Mar", gap: 5.4 },
  { slug: "australia-quali", pos: 8, sector: "S3", type: "RECAP", title: "Australia 2026: Qualifying report", subtitle: "Sector-by-sector analysis of Russell's pole lap.", date: "08 Mar", gap: 4.8 },
];

export default function DeltaF1V2() {
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div style={{
      background: P.bg, minHeight: "100vh",
      fontFamily: "'Instrument Serif', Georgia, serif",
      color: P.offWhite,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Caveat:wght@400&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <polygon points="16,3 29,27 3,27" fill="none" stroke={P.purpleLight} strokeWidth="1.8" />
          </svg>
          <span style={{ fontStyle: "italic", fontSize: "22px", color: P.white }}>Delta</span>
          <span style={{ fontSize: "12px", color: P.slateMuted, marginLeft: "4px" }}>/</span>
          <span style={{ fontSize: "12px", color: P.slate }}>formula 1</span>
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
      }}>
        {/* Start lights */}
        <div style={{
          display: "flex", gap: "6px", marginBottom: "20px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease-out",
        }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: P.kerbRed,
              opacity: loaded ? (i <= 3 ? 0.8 : 0.15) : 0.1,
              transition: `opacity 0.4s ease ${i * 0.12}s`,
            }} />
          ))}
        </div>

        <h1 style={{
          fontStyle: "italic", fontSize: "44px", color: P.white,
          lineHeight: 1.15, marginBottom: "16px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(12px)",
          transition: "all 0.7s ease-out 0.05s",
        }}>
          Formula 1
        </h1>
        <p style={{
          fontSize: "17px", color: P.slate, lineHeight: 1.6,
          maxWidth: "440px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(8px)",
          transition: "all 0.7s ease-out 0.1s",
        }}>
          Races, drivers, and constructors — analyzed through data.
          Articles ordered by grid position: P1 is the boldest claim,
          the back of the grid is race coverage.
        </p>

        {/* Sector key — quiet */}
        <div style={{
          display: "flex", gap: "20px", marginTop: "24px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.7s ease-out 0.2s",
        }}>
          {["S1", "S2", "S3"].map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{
                width: "8px", height: "3px", borderRadius: "1px",
                background: sectorColor[s], opacity: 0.7,
              }} />
              <span style={{ fontSize: "11px", color: P.slateMuted }}>
                {sectorLabel[s]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Grid — clean list with position numbers */}
      <section style={{
        padding: "0 40px 100px",
        maxWidth: "900px",
      }}>
        <div style={{
          fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
          color: P.slateMuted, letterSpacing: "0.08em",
          marginBottom: "28px",
        }}>
          STARTING GRID
        </div>

        {articles.map((article, i) => (
          <a
            key={article.slug}
            href={`/articles/${article.slug}`}
            onMouseEnter={() => setHovered(article.slug)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex", alignItems: "flex-start", gap: "24px",
              padding: "24px 0",
              borderBottom: `0.5px solid ${P.border}`,
              textDecoration: "none", cursor: "pointer",
            }}
          >
            {/* Grid position */}
            <div style={{
              width: "36px", flexShrink: 0,
              textAlign: "right", paddingTop: "4px",
            }}>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "18px", fontWeight: 500,
                color: article.pos <= 2 ? P.purpleBright
                  : article.pos <= 4 ? P.pinkLight
                  : article.pos <= 6 ? P.tealLight
                  : P.slate,
                opacity: 0.8,
              }}>
                {article.pos}
              </span>
            </div>

            {/* Sector indicator */}
            <div style={{
              width: "3px", borderRadius: "1.5px", alignSelf: "stretch",
              background: sectorColor[article.sector],
              opacity: 0.5, flexShrink: 0, marginTop: "4px",
            }} />

            {/* Content */}
            <div style={{ flex: 1, maxWidth: "560px" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                marginBottom: "6px",
              }}>
                <span style={{
                  fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace",
                  color: sectorColor[article.sector],
                }}>
                  {article.sector}
                </span>
                <span style={{
                  fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace",
                  color: P.slateMuted,
                }}>
                  {article.type}
                </span>
              </div>
              <h3 style={{
                fontStyle: "italic", fontSize: "22px", color: P.white,
                lineHeight: 1.25, marginBottom: "6px",
                transition: "color 0.2s",
                ...(hovered === article.slug ? { color: P.purpleLight } : {}),
              }}>
                {article.title}
              </h3>
              <p style={{ fontSize: "14px", color: P.slate, lineHeight: 1.5 }}>
                {article.subtitle}
              </p>
            </div>

            {/* Gap + date */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end",
              gap: "6px", flexShrink: 0, paddingTop: "24px", marginLeft: "20px",
            }}>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 500,
                color: parseFloat(article.gap) >= 8.5 ? P.purpleBright
                  : parseFloat(article.gap) >= 7.0 ? P.purpleLight : P.slate,
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
          </a>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: "24px 40px",
        borderTop: `0.5px solid ${P.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
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
