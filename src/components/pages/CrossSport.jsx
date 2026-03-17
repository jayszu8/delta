import { useState, useEffect } from "react";
import Link from "next/link";

const P = {
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

// GapScore rendered inline with P.accent color

export default function DeltaCrossSport() {
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
            <polygon points="16,12 22,23 10,23" fill="#F5F4F8" stroke="#9B8BD5" strokeWidth="0.8" />
          </svg>
          <span style={{ fontStyle: "italic", fontSize: "22px", color: P.headline }}>Delta</span>
          <span style={{ fontSize: "12px", color: P.muted, marginLeft: "4px" }}>/</span>
          <span style={{ fontSize: "12px", color: P.body }}>cross-sport</span>
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
        {/* Two converging dots */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          marginBottom: "20px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: P.football, opacity: 0.6 }} />
          <div style={{ width: "24px", height: "0.5px", background: P.border }} />
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: P.f1, opacity: 0.6 }} />
        </div>

        <h1 style={{
          fontStyle: "italic", fontSize: "44px", color: P.headline,
          lineHeight: 1.15, marginBottom: "16px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(12px)",
          transition: "all 0.7s ease-out 0.05s",
        }}>
          Cross-sport
        </h1>
        <p style={{
          fontSize: "17px", color: P.muted, lineHeight: 1.6,
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
          <Link
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
            {/* Comparison line */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "16px",
            }}>
              <span style={{
                fontSize: "12px", fontStyle: "italic",
                color: P.football, opacity: 0.8,
              }}>
                {article.left}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "16px", height: "0.5px", background: P.football, opacity: 0.25 }} />
                <span style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "9px", color: P.accent, letterSpacing: "0.06em",
                }}>
                  VS
                </span>
                <div style={{ width: "16px", height: "0.5px", background: P.f1, opacity: 0.25 }} />
              </div>
              <span style={{
                fontSize: "12px", fontStyle: "italic",
                color: P.f1, opacity: 0.8,
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
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: P.accent, flexShrink: 0 }} />
                  <span style={{
                    fontSize: "11px",
                    color: P.accent, letterSpacing: "0.04em",
                  }}>
                    CROSS-SPORT
                  </span>
                  <span style={{
                    fontSize: "11px", fontStyle: "italic",
                    color: P.muted,
                  }}>
                    {article.type}
                  </span>
                </div>
                <h3 style={{
                  fontStyle: "italic", fontSize: "26px", color: P.headline,
                  lineHeight: 1.2, marginBottom: "8px",
                  transition: "color 0.2s",
                  ...(hovered === article.slug ? { color: P.accent } : {}),
                }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: "15px", color: P.muted, lineHeight: 1.55 }}>
                  {article.subtitle}
                </p>
              </div>

              <div style={{
                display: "flex", flexDirection: "column", alignItems: "flex-end",
                gap: "6px", marginLeft: "40px", flexShrink: 0, paddingTop: "20px",
              }}>
                <span style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "20px",
                  color: P.accent,
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
