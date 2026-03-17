import { useState, useEffect } from "react";
import Link from "next/link";

const P = {
  bg: "#F9F8FC",
  surface: "#F2F0F8",
  border: "#E0DCF0",
  headline: "#141618",
  body: "#3a3e44",
  muted: "#6a7078",
  violet: "#9B8BD5",
  sectorS1: "#6B5CA5",
  sectorS2: "#9B8BD5",
  sectorS3: "#4A3D7A",
};

const sectorColor = { S1: P.sectorS1, S2: P.sectorS2, S3: P.sectorS3 };
const sectorLabel = { S1: "Data essays", S2: "Profiles", S3: "Recaps + sims" };

const gridPosColor = (pos) =>
  pos <= 2 ? "#9B8BD5" : pos <= 4 ? "rgba(155,139,213,0.7)" : pos <= 6 ? "rgba(155,139,213,0.4)" : "#a0a0b0";

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

// GapScore rendered inline with P.violet color

export default function DeltaF1() {
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div style={{
      background: P.bg, minHeight: "100vh",
      fontFamily: "'Instrument Serif', Georgia, serif",
      color: P.body,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Caveat:wght@400&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <polygon points="16,3 29,27 3,27" fill="#6B5CA5" fillOpacity="0.12" stroke="#6B5CA5" strokeWidth="1.8" />
            <polygon points="16,12 22,23 10,23" fill="#F9F8FC" stroke="#9B8BD5" strokeWidth="0.8" />
          </svg>
          <span style={{ fontStyle: "italic", fontSize: "22px", color: P.headline }}>Delta</span>
          <span style={{ fontSize: "12px", color: P.muted, marginLeft: "4px" }}>/</span>
          <span style={{ fontSize: "12px", color: P.body }}>formula 1</span>
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
              fontSize: "13px", color: P.muted, cursor: "pointer",
              textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = "#6B5CA5"}
            onMouseLeave={(e) => e.target.style.color = P.muted}
            >
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
              background: loaded && i <= 3 ? "#d8b0b0" : "#e0d0d0",
              opacity: loaded ? (i <= 3 ? 0.9 : 0.4) : 0.3,
              transition: `all 0.4s ease ${i * 0.12}s`,
            }} />
          ))}
        </div>

        <h1 style={{
          fontStyle: "italic", fontSize: "44px", color: P.headline,
          lineHeight: 1.15, marginBottom: "16px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(12px)",
          transition: "all 0.7s ease-out 0.05s",
        }}>
          Formula 1
        </h1>
        <p style={{
          fontSize: "17px", color: P.muted, lineHeight: 1.6,
          maxWidth: "440px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(8px)",
          transition: "all 0.7s ease-out 0.1s",
        }}>
          Races, drivers, and constructors — analyzed through data.
          Articles ordered by grid position: P1 is the boldest claim,
          the back of the grid is race coverage.
        </p>

        {/* Sector key */}
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
              <span style={{ fontSize: "11px", color: P.muted }}>
                {sectorLabel[s]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Grid list */}
      <section style={{
        padding: "0 40px 100px",
        maxWidth: "900px",
      }}>
        <div style={{
          fontSize: "11px", fontFamily: "'Instrument Serif', Georgia, serif",
          color: P.muted, letterSpacing: "0.06em",
          marginBottom: "28px",
        }}>
          STARTING GRID
        </div>

        {articles.map((article) => (
          <Link
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
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "18px", fontWeight: 500,
                color: gridPosColor(article.pos),
              }}>
                P{article.pos}
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
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: sectorColor[article.sector], flexShrink: 0 }} />
                <span style={{
                  fontSize: "10px", letterSpacing: "0.04em",
                  color: sectorColor[article.sector],
                }}>
                  {article.sector}
                </span>
                <span style={{
                  fontSize: "11px", fontStyle: "italic",
                  color: P.muted,
                }}>
                  {article.type}
                </span>
              </div>
              <h3 style={{
                fontStyle: "italic", fontSize: "24px", color: P.headline,
                lineHeight: 1.25, marginBottom: "6px",
                transition: "color 0.2s",
                ...(hovered === article.slug ? { color: P.violet } : {}),
              }}>
                {article.title}
              </h3>
              <p style={{ fontSize: "14px", color: P.muted, lineHeight: 1.5 }}>
                {article.subtitle}
              </p>
            </div>

            {/* Gap + date */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end",
              gap: "6px", flexShrink: 0, paddingTop: "20px", marginLeft: "20px",
            }}>
              <span style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "20px",
                color: P.violet,
              }}>
                {article.gap}
              </span>
              <span style={{
                fontSize: "11px",
                color: P.muted,
              }}>
                {article.date}
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: "24px 40px",
        borderTop: `0.5px solid ${P.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" style={{ fontSize: "12px", color: P.muted, fontStyle: "italic", textDecoration: "none" }}>Delta</Link>
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "methodology", href: "/methodology" },
            { label: "about", href: "/about" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{ fontSize: "12px", color: P.muted, textDecoration: "none" }}>{item.label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
