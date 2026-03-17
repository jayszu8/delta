import { useState, useEffect } from "react";
import Link from "next/link";

const P = {
  bg: "#0a1228",
  surface: "#0e1830",
  border: "#182440",
  borderHover: "#243456",
  teal: "#4a9aad",
  tealLight: "#6ec4d6",
  pink: "#d4a0c4",
  pinkLight: "#e8bcd8",
  amber: "#d4a44e",
  amberLight: "#ecc06a",
  white: "#f4f6f8",
  offWhite: "#d0d4da",
  slate: "#7a8494",
  slateMuted: "#4e5868",
  green: "#5aaa6e",
  greenDark: "#2a7a42",
  purple: "#8a7ac4",
  coral: "#d4786a",
};

const articles = [
  { slug: "the-new-ground-effect", sport: "FOOTBALL", type: "DATA ESSAY", title: "The new ground effect", subtitle: "Do bigger stadiums actually produce better results — or just bigger expectations?", date: "14 Mar", gap: 9.2, featured: true },
  { slug: "street-circuits", sport: "F1", type: "DATA ESSAY", title: "Street circuits don't produce better racing", subtitle: "DRS overtakes on street vs. permanent venues, adjusted for track length and era.", date: "10 Mar", gap: 9.4 },
  { slug: "budget-caps", sport: "CROSS-SPORT", type: "DATA ESSAY", title: "Budget caps vs. salary caps", subtitle: "F1's cost cap and football's FFP both fail at competitive balance — differently.", date: "06 Mar", gap: 8.8 },
  { slug: "richarlison", sport: "FOOTBALL", type: "PROFILE", title: "Richarlison: Anfield's anomaly", subtitle: "Why Spurs' striker defies his own season stats every time he visits L4.", date: "15 Mar", gap: 7.1 },
  { slug: "russell", sport: "F1", type: "RECAP", title: "Australia 2026: Russell finds clear air", subtitle: "Race recap, driver ratings, and the strategy calls that shaped Round 1.", date: "09 Mar", gap: 6.8 },
  { slug: "boleyn", sport: "FOOTBALL", type: "DATA ESSAY", title: "The Boleyn curse", subtitle: "London Stadium was supposed to be a launchpad. The data says anchor.", date: "02 Mar", gap: 8.4 },
];

const sportColor = (s) => s === "F1" ? P.pink : s === "CROSS-SPORT" ? P.amber : P.teal;

function GapBadge({ score }) {
  const val = parseFloat(score);
  const color = val >= 8.5 ? "#80e8a0" : val >= 7.0 ? "#60c880" : P.tealLight;
  return (
    <span style={{
      fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", fontWeight: 500,
      color, opacity: 0.9,
    }}>
      {score}
    </span>
  );
}

export default function DeltaHomeV2() {
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div style={{
      background: P.bg, minHeight: "100vh",
      fontFamily: "'Instrument Serif', Georgia, serif",
      color: P.offWhite,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Caveat:wght@400&display=swap" rel="stylesheet" />

      {/* Header — minimal */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <polygon points="16,3 29,27 3,27" fill="none" stroke={P.tealLight} strokeWidth="1.8" />
          </svg>
          <span style={{ fontStyle: "italic", fontSize: "22px", color: P.white }}>
            Delta
          </span>
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
              fontSize: "13px", color: P.slate, cursor: "pointer",
              textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = P.offWhite}
            onMouseLeave={(e) => e.target.style.color = P.slate}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero — one statement, nothing else */}
      <section style={{
        padding: "120px 40px 100px",
        maxWidth: "800px",
      }}>
        <p style={{
          fontStyle: "italic",
          fontSize: "52px",
          color: P.white,
          lineHeight: 1.15,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(16px)",
          transition: "all 0.8s ease-out",
        }}>
          Data vs. the story{" "}
          <br />
          they tell you.
        </p>
        <p style={{
          fontSize: "18px",
          color: P.slate,
          lineHeight: 1.65,
          marginTop: "24px",
          maxWidth: "480px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(10px)",
          transition: "all 0.8s ease-out 0.15s",
        }}>
          Sports narratives are built on repetition, not evidence.
          Delta tests the claims everyone repeats against what
          the data actually shows.
        </p>
      </section>

      {/* Featured piece — full width, generous space */}
      <section style={{
        padding: "0 40px 80px",
        maxWidth: "900px",
      }}>
        <div style={{
          fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
          color: P.slateMuted, letterSpacing: "0.08em",
          marginBottom: "32px",
        }}>
          FEATURED
        </div>

        <a
          href={`/articles/${featured.slug}`}
          onMouseEnter={() => setHovered(featured.slug)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "block", textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            marginBottom: "14px",
          }}>
            <span style={{
              fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
              color: sportColor(featured.sport), letterSpacing: "0.04em",
            }}>
              {featured.sport}
            </span>
            <span style={{ color: P.slateMuted, fontSize: "11px" }}>
              {featured.type}
            </span>
          </div>

          <h2 style={{
            fontStyle: "italic", fontSize: "38px", color: P.white,
            lineHeight: 1.15, marginBottom: "12px",
            transition: "color 0.2s",
            ...(hovered === featured.slug ? { color: P.tealLight } : {}),
          }}>
            {featured.title}
          </h2>

          <p style={{
            fontSize: "17px", color: P.slate, lineHeight: 1.6,
            maxWidth: "560px",
          }}>
            {featured.subtitle}
          </p>

          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            marginTop: "16px",
          }}>
            <GapBadge score={featured.gap} />
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: P.slateMuted }} />
            <span style={{ fontSize: "12px", color: P.slateMuted, fontFamily: "'IBM Plex Mono', monospace" }}>
              {featured.date}
            </span>
          </div>
        </a>
      </section>

      {/* Divider */}
      <div style={{
        width: "40px", height: "0.5px", background: P.border,
        margin: "0 40px 60px",
      }} />

      {/* Article list — clean, spacious, one at a time */}
      <section style={{
        padding: "0 40px 100px",
        maxWidth: "900px",
      }}>
        <div style={{
          fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
          color: P.slateMuted, letterSpacing: "0.08em",
          marginBottom: "40px",
        }}>
          RECENT
        </div>

        {rest.map((article, i) => (
          <a
            key={article.slug}
            href={`/articles/${article.slug}`}
            onMouseEnter={() => setHovered(article.slug)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "block",
              padding: "28px 0",
              borderTop: i === 0 ? `0.5px solid ${P.border}` : "none",
              borderBottom: `0.5px solid ${P.border}`,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            }}>
              <div style={{ flex: 1, maxWidth: "600px" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  marginBottom: "8px",
                }}>
                  <span style={{
                    fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace",
                    color: sportColor(article.sport), letterSpacing: "0.04em",
                  }}>
                    {article.sport}
                  </span>
                  <span style={{
                    fontSize: "10px", fontFamily: "'IBM Plex Mono', monospace",
                    color: P.slateMuted,
                  }}>
                    {article.type}
                  </span>
                </div>
                <h3 style={{
                  fontStyle: "italic", fontSize: "24px", color: P.white,
                  lineHeight: 1.25, marginBottom: "6px",
                  transition: "color 0.2s",
                  ...(hovered === article.slug ? { color: sportColor(article.sport) } : {}),
                }}>
                  {article.title}
                </h3>
                <p style={{
                  fontSize: "14px", color: P.slate, lineHeight: 1.55,
                }}>
                  {article.subtitle}
                </p>
              </div>

              <div style={{
                display: "flex", flexDirection: "column", alignItems: "flex-end",
                gap: "6px", marginLeft: "40px", flexShrink: 0, paddingTop: "24px",
              }}>
                <GapBadge score={article.gap} />
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

      {/* Section links — quiet, at the bottom */}
      <section style={{
        padding: "0 40px 60px",
        display: "flex", gap: "40px",
      }}>
        {[
          { label: "Football", desc: "Premier League, European cups", color: P.teal, href: "/football" },
          { label: "Formula 1", desc: "Races, drivers, constructors", color: P.pink, href: "/f1" },
          { label: "Cross-sport", desc: "Where both worlds collide", color: P.amber, href: "/cross-sport" },
        ].map((section) => (
          <Link
            key={section.label}
            href={section.href}
            style={{
              textDecoration: "none",
              cursor: "pointer",
              flex: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector("h4").style.color = section.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector("h4").style.color = P.offWhite;
            }}
          >
            <div style={{
              width: "24px", height: "2px", background: section.color,
              marginBottom: "14px", borderRadius: "1px",
              opacity: 0.6,
            }} />
            <h4 style={{
              fontStyle: "italic", fontSize: "18px", color: P.offWhite,
              marginBottom: "4px", transition: "color 0.2s",
            }}>
              {section.label}
            </h4>
            <p style={{ fontSize: "13px", color: P.slateMuted }}>
              {section.desc}
            </p>
          </Link>
        ))}
      </section>

      {/* Footer — barely there */}
      <footer style={{
        padding: "24px 40px",
        borderTop: `0.5px solid ${P.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" style={{ fontSize: "12px", color: P.slateMuted, fontStyle: "italic", textDecoration: "none" }}>
          Delta
        </Link>
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "methodology", href: "/methodology" },
            { label: "about", href: "/about" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{
              fontSize: "12px", color: P.slateMuted, textDecoration: "none",
            }}>
              {item.label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
