import { useState, useEffect } from "react";
import Link from "next/link";

const P = {
  bg: "#0e0c08",
  surface: "#141208",
  border: "#242016",
  borderHover: "#3a3420",
  amber: "#d4a44e",
  amberLight: "#ecc06a",
  teal: "#4a9aad",
  tealLight: "#6ec4d6",
  pink: "#d4a0c4",
  pinkLight: "#e8bcd8",
  white: "#f4f6f8",
  offWhite: "#d8d4cc",
  slate: "#908880",
  slateMuted: "#5a5448",
};

const articles = [
  {
    slug: "budget-caps-vs-salary-caps",
    type: "DATA ESSAY",
    title: "Budget caps vs. salary caps",
    subtitle: "F1's cost cap and football's FFP both aim for competitive balance. Both fail — but in completely different ways.",
    date: "06 Mar", gap: 8.8,
    left: "FFP + wage limits", right: "F1 cost cap",
  },
  {
    slug: "the-venue-effect",
    type: "DATA ESSAY",
    title: "The venue effect across sports",
    subtitle: "From new stadiums to new circuits — does changing the stage change the performance?",
    date: "20 Feb", gap: 8.0,
    left: "Stadium moves", right: "Circuit redesigns",
  },
  {
    slug: "relegation-vs-elimination",
    type: "DATA ESSAY",
    title: "Relegation vs. elimination",
    subtitle: "Football punishes failure with demotion. F1 has no equivalent. Which system produces better competition?",
    date: "14 Feb", gap: 7.5,
    left: "Relegation", right: "No relegation",
  },
  {
    slug: "dynasty-decay-rates",
    type: "SIMULATION",
    title: "Dynasty decay rates",
    subtitle: "How long do dominant eras last? Modeling the half-life of sporting dynasties from Man City to Red Bull.",
    date: "08 Feb", gap: 7.8,
    left: "Man City, Chelsea", right: "Red Bull, Mercedes",
  },
];

export default function DeltaCrossSportV2() {
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div style={{
      background: P.bg, minHeight: "100vh",
      fontFamily: "'Instrument Serif', Georgia, serif",
      color: P.offWhite,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <polygon points="16,3 29,27 3,27" fill="none" stroke={P.amberLight} strokeWidth="1.8" />
          </svg>
          <span style={{ fontStyle: "italic", fontSize: "22px", color: P.white }}>Delta</span>
          <span style={{ fontSize: "12px", color: P.slateMuted, marginLeft: "4px" }}>/</span>
          <span style={{ fontSize: "12px", color: P.slate }}>cross-sport</span>
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
            <Link key={item.label} href={item.href} style={{ fontSize: "13px", color: P.slate, cursor: "pointer", textDecoration: "none" }}>{item.label}</Link>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section style={{
        padding: "100px 40px 80px",
        maxWidth: "700px",
      }}>
        {/* Two converging dots */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          marginBottom: "20px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: P.tealLight, opacity: 0.6 }} />
          <div style={{ width: "24px", height: "0.5px", background: P.border }} />
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: P.pinkLight, opacity: 0.6 }} />
        </div>

        <h1 style={{
          fontStyle: "italic", fontSize: "44px", color: P.white,
          lineHeight: 1.15, marginBottom: "16px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(12px)",
          transition: "all 0.7s ease-out 0.05s",
        }}>
          Cross-sport
        </h1>
        <p style={{
          fontSize: "17px", color: P.slate, lineHeight: 1.6,
          maxWidth: "460px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(8px)",
          transition: "all 0.7s ease-out 0.1s",
        }}>
          The structural parallels between football and Formula 1 —
          competitive balance, venue economics, dynasty mechanics,
          and the systems that shape both sports.
        </p>
      </section>

      {/* Articles */}
      <section style={{
        padding: "0 40px 100px",
        maxWidth: "900px",
      }}>
        {articles.map((article, i) => (
          <a
            key={article.slug}
            href={`/articles/${article.slug}`}
            onMouseEnter={() => setHovered(article.slug)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "block",
              padding: "32px 0",
              borderTop: i === 0 ? `0.5px solid ${P.border}` : "none",
              borderBottom: `0.5px solid ${P.border}`,
              textDecoration: "none", cursor: "pointer",
            }}
          >
            {/* Comparison line — the split, minimal */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "16px",
            }}>
              <span style={{
                fontSize: "12px", fontStyle: "italic",
                color: P.tealLight, opacity: 0.7,
              }}>
                {article.left}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "16px", height: "0.5px", background: P.tealLight, opacity: 0.3 }} />
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "9px", color: P.amber, letterSpacing: "0.06em",
                }}>
                  VS
                </span>
                <div style={{ width: "16px", height: "0.5px", background: P.pinkLight, opacity: 0.3 }} />
              </div>
              <span style={{
                fontSize: "12px", fontStyle: "italic",
                color: P.pinkLight, opacity: 0.7,
              }}>
                {article.right}
              </span>
            </div>

            {/* Article content */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            }}>
              <div style={{ flex: 1, maxWidth: "580px" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  marginBottom: "6px",
                }}>
                  <span style={{
                    fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace",
                    color: P.amber, letterSpacing: "0.04em",
                  }}>
                    CROSS-SPORT
                  </span>
                  <span style={{
                    fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace",
                    color: P.slateMuted,
                  }}>
                    {article.type}
                  </span>
                </div>
                <h3 style={{
                  fontStyle: "italic", fontSize: "26px", color: P.white,
                  lineHeight: 1.2, marginBottom: "8px",
                  transition: "color 0.2s",
                  ...(hovered === article.slug ? { color: P.amberLight } : {}),
                }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: "15px", color: P.slate, lineHeight: 1.55 }}>
                  {article.subtitle}
                </p>
              </div>

              <div style={{
                display: "flex", flexDirection: "column", alignItems: "flex-end",
                gap: "6px", marginLeft: "40px", flexShrink: 0, paddingTop: "28px",
              }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 500,
                  color: parseFloat(article.gap) >= 8.5 ? P.amberLight : P.amber,
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
