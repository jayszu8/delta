import { useState, useEffect } from "react";
import Link from "next/link";

const P = {
  pageBg: "#fafaf8",
  cardBg: "#ffffff",
  surfaceBg: "#f4f3f0",
  borderLight: "#e8e6e0",
  borderMid: "#d8d6d0",
  // Light header
  headerBg: "#f8f9fb",
  headerBorder: "#E4E2EA",
  navText: "#6a7078",
  // Sport accents
  football: { primary: "#6B5CA5", light: "#F2F0F8", border: "#D8D4E4", dark: "#4A3D7A" },
  f1: { primary: "#9B8BD5", light: "#F4F2FA", border: "#E0DCF0", dark: "#6B5CA5" },
  crossSport: { primary: "#4A3D7A", light: "#EEEAF4", border: "#D0CCE0", dark: "#3A2D6A" },
  // Text
  black: "#1a1a18",
  darkGray: "#2a2a28",
  bodyText: "#3a3e44",
  caption: "#6a7078",
  muted: "#9aa0a8",
};

// Sample article data (would come from articles.js in real app)
const article = {
  slug: "the-new-ground-effect",
  sport: "FOOTBALL",
  type: "DATA ESSAY",
  title: "The new ground effect",
  subtitle: "Do bigger stadiums actually produce better results — or just bigger expectations? A deep dive into every Premier League stadium move since 2000.",
  date: "14 March 2026",
  readTime: 12,
  gap: 9.2,
  author: "Delta",
};

const sportAccent = (sport) => {
  if (sport === "F1") return P.f1;
  if (sport === "CROSS-SPORT") return P.crossSport;
  return P.football;
};

function GapScoreBlock({ score, sport }) {
  const val = parseFloat(score);
  const accent = sportAccent(sport);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      padding: "14px 18px",
      background: accent.light,
      border: `0.5px solid ${accent.border}`,
      borderRadius: "12px",
    }}>
      <div style={{
        width: "48px", height: "48px", borderRadius: "12px",
        background: P.cardBg, border: `0.5px solid ${accent.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontStyle: "italic",
        fontSize: "20px", color: accent.primary,
      }}>
        {score}
      </div>
      <div>
        <div style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: "11px", fontWeight: 500, color: P.darkGray,
          letterSpacing: "0.04em", marginBottom: "2px",
        }}>
          Gap Score
        </div>
        <div style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: "13px", color: P.caption,
        }}>
          {val >= 8.5 ? "High divergence — the popular narrative is significantly wrong"
            : val >= 7.0 ? "Moderate divergence — the narrative misses important nuances"
            : "Low divergence — the narrative is mostly right with caveats"}
        </div>
      </div>
    </div>
  );
}

function DataTable() {
  const rows = [
    { club: "Arsenal", old: "Highbury", new: "Emirates", year: 2006, capChange: "+58%", winDelta: "-10.0pp", ppgDelta: "-0.12" },
    { club: "West Ham", old: "Boleyn Ground", new: "London Stadium", year: 2016, capChange: "+71%", winDelta: "-7.0pp", ppgDelta: "-0.13" },
    { club: "Tottenham", old: "White Hart Lane", new: "Spurs Stadium", year: 2019, capChange: "+73%", winDelta: "-7.0pp", ppgDelta: "-0.13" },
    { club: "Brighton", old: "Withdean", new: "Amex Stadium", year: 2011, capChange: "+247%", winDelta: "+5.0pp", ppgDelta: "+0.17" },
    { club: "Leicester", old: "Filbert Street", new: "King Power", year: 2002, capChange: "+47%", winDelta: "+5.0pp", ppgDelta: "+0.15" },
  ];

  return (
    <div style={{
      margin: "32px 0",
      borderRadius: "12px",
      border: `0.5px solid ${P.borderLight}`,
      overflow: "hidden",
    }}>
      <table style={{
        width: "100%", borderCollapse: "collapse",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px",
      }}>
        <thead>
          <tr style={{ background: P.surfaceBg }}>
            {["Club", "Old ground", "New ground", "Year", "Cap. change", "Home win delta", "PPG delta"].map((h) => (
              <th key={h} style={{
                padding: "10px 14px", textAlign: "left",
                fontWeight: 500, fontSize: "10px", letterSpacing: "0.06em",
                color: P.caption, borderBottom: `0.5px solid ${P.borderLight}`,
                textTransform: "uppercase",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{
              background: i % 2 === 0 ? P.cardBg : P.surfaceBg + "88",
            }}>
              <td style={{ padding: "10px 14px", fontWeight: 500, color: P.darkGray, fontSize: "13px", fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>{row.club}</td>
              <td style={{ padding: "10px 14px", color: P.caption }}>{row.old}</td>
              <td style={{ padding: "10px 14px", color: P.caption }}>{row.new}</td>
              <td style={{ padding: "10px 14px", color: P.caption }}>{row.year}</td>
              <td style={{ padding: "10px 14px", color: P.bodyText }}>{row.capChange}</td>
              <td style={{
                padding: "10px 14px",
                color: row.winDelta.startsWith("-") ? "#aa3a3a" : "#2a7a42",
                fontWeight: 500,
              }}>
                {row.winDelta}
              </td>
              <td style={{
                padding: "10px 14px",
                color: row.ppgDelta.startsWith("-") ? "#aa3a3a" : "#2a7a42",
                fontWeight: 500,
              }}>
                {row.ppgDelta}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChartPlaceholder({ accent }) {
  return (
    <div style={{
      margin: "32px 0", padding: "40px 32px",
      background: P.surfaceBg,
      border: `0.5px solid ${P.borderLight}`,
      borderRadius: "12px",
      textAlign: "center",
    }}>
      <svg width="280" height="280" viewBox="0 0 280 280" style={{ margin: "0 auto", display: "block" }}>
        {[120, 90, 60, 30].map((r) => (
          <circle key={r} cx="140" cy="140" r={r} fill="none" stroke={P.borderLight} strokeWidth="0.5" />
        ))}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line key={angle}
              x1="140" y1="140"
              x2={140 + Math.cos(rad) * 120} y2={140 + Math.sin(rad) * 120}
              stroke={P.borderLight} strokeWidth="0.5"
            />
          );
        })}
        <polygon
          points={[
            [140, 30], [228, 68], [248, 140], [210, 220],
            [140, 240], [80, 210], [40, 140], [78, 62],
          ].map((p) => p.join(",")).join(" ")}
          fill={accent.primary + "20"}
          stroke={accent.primary}
          strokeWidth="1.5"
        />
        {[
          [140, 30], [228, 68], [248, 140], [210, 220],
          [140, 240], [80, 210], [40, 140], [78, 62],
        ].map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="4"
            fill={accent.primary} stroke={P.cardBg} strokeWidth="1.5"
          />
        ))}
      </svg>
      <div style={{
        marginTop: "16px",
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: "10px", color: P.caption, letterSpacing: "0.04em",
      }}>
        HOME PERFORMANCE PROFILE — PRE VS. POST STADIUM MOVE
      </div>
      <div style={{
        marginTop: "4px",
        fontFamily: "'Instrument Serif', serif",
        fontSize: "13px", color: P.muted, fontStyle: "italic",
      }}>
        Interactive chart — hover segments for detail (placeholder)
      </div>
    </div>
  );
}

function PullQuote({ text, accent }) {
  return (
    <div style={{
      margin: "36px 0",
      padding: "24px 0 24px 24px",
      borderLeft: `3px solid ${accent.primary}`,
    }}>
      <p style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: "22px",
        fontStyle: "italic",
        color: P.darkGray,
        lineHeight: 1.45,
      }}>
        {text}
      </p>
    </div>
  );
}

function Callout({ label, text, accent }) {
  return (
    <div style={{
      margin: "28px 0",
      padding: "16px 20px",
      background: accent.light,
      border: `0.5px solid ${accent.border}`,
      borderRadius: "10px",
    }}>
      <div style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: "10px", fontWeight: 500,
        color: accent.primary, letterSpacing: "0.06em",
        marginBottom: "6px", textTransform: "uppercase",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: "14px", color: accent.dark, lineHeight: 1.6,
      }}>
        {text}
      </div>
    </div>
  );
}

export default function DeltaArticle() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const accent = sportAccent(article.sport);

  return (
    <div style={{
      background: P.pageBg,
      minHeight: "100vh",
      fontFamily: "'Instrument Serif', Georgia, serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Caveat:wght@400&display=swap" rel="stylesheet" />

      {/* Light header bar */}
      <header style={{
        background: P.headerBg,
        borderBottom: `2px solid ${accent.primary}`,
        padding: "12px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <polygon points="16,3 29,27 3,27" fill="#6B5CA5" fillOpacity="0.12" stroke="#6B5CA5" strokeWidth="1.8" />
            <polygon points="16,12 22,23 10,23" fill="#fafaf8" stroke="#9B8BD5" strokeWidth="0.8" />
          </svg>
          <span style={{
            fontStyle: "italic", fontSize: "20px", color: P.black, lineHeight: 1,
          }}>
            Delta
          </span>
        </Link>
        <nav style={{ display: "flex", gap: "18px" }}>
          {[
            { label: "home", href: "/" },
            { label: "football", href: "/football" },
            { label: "formula 1", href: "/f1" },
            { label: "cross-sport", href: "/cross-sport" },
            { label: "methodology", href: "/methodology" },
            { label: "about", href: "/about" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{
              fontSize: "11px", color: P.navText, textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = "#6B5CA5"}
            onMouseLeave={(e) => e.target.style.color = P.navText}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Article header */}
      <div style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "56px 24px 0",
      }}>
        {/* Category + type */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          marginBottom: "20px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(6px)",
          transition: "all 0.5s ease-out",
        }}>
          <span style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "11px", letterSpacing: "0.06em", fontWeight: 500,
            color: accent.primary,
          }}>
            {article.sport}
          </span>
          <span style={{ color: P.muted }}>|</span>
          <span style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "11px", letterSpacing: "0.04em",
            color: P.caption,
          }}>
            {article.type}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "48px",
          fontWeight: 400,
          fontStyle: "italic",
          color: P.black,
          lineHeight: 1.1,
          marginBottom: "16px",
          maxWidth: "640px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(10px)",
          transition: "all 0.6s ease-out 0.05s",
        }}>
          {article.title}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "19px",
          color: P.caption,
          lineHeight: 1.55,
          marginBottom: "28px",
          maxWidth: "600px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(8px)",
          transition: "all 0.6s ease-out 0.1s",
        }}>
          {article.subtitle}
        </p>

        {/* Author + meta bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingBottom: "20px",
          borderBottom: `0.5px solid ${P.borderLight}`,
          marginBottom: "12px",
          opacity: loaded ? 1 : 0,
          transition: "all 0.6s ease-out 0.15s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: P.black, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="16" height="16" viewBox="0 0 32 32">
                <polygon points="16,6 26,24 6,24" fill="none" stroke="#f4f6f8" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <span style={{
                fontSize: "14px", fontWeight: 400, color: P.black, fontStyle: "italic",
              }}>
                {article.author}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "12px", color: P.muted,
            }}>
              {article.date}
            </span>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: P.muted }} />
            <span style={{ fontSize: "12px", color: P.muted }}>
              {article.readTime} min read
            </span>
          </div>
        </div>

        {/* Gap Score block */}
        <div style={{
          marginBottom: "36px",
          opacity: loaded ? 1 : 0,
          transition: "all 0.6s ease-out 0.2s",
        }}>
          <GapScoreBlock score={article.gap} sport={article.sport} />
        </div>
      </div>

      {/* Article body */}
      <article style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "0 24px 80px",
      }}>
        <p style={{
          fontSize: "18px", color: P.bodyText, lineHeight: 1.8,
          marginBottom: "20px",
        }}>
          The conventional wisdom is simple: build a bigger stadium, attract bigger crowds, generate more revenue, buy better players, win more games. It's the virtuous cycle that every club chasing a new ground believes in. Pundits repeat it. Owners stake hundreds of millions on it. Fans trust it.
        </p>

        <p style={{
          fontSize: "18px", color: P.bodyText, lineHeight: 1.8,
          marginBottom: "20px",
        }}>
          But what does the data actually say?
        </p>

        <h2 style={{
          fontSize: "28px", fontStyle: "italic", color: P.black,
          marginTop: "40px", marginBottom: "16px", lineHeight: 1.2,
        }}>
          The data
        </h2>

        <p style={{
          fontSize: "18px", color: P.bodyText, lineHeight: 1.8,
          marginBottom: "20px",
        }}>
          I pulled every Premier League club that moved stadiums since 2000 and tracked their league position, points-per-game, and home win percentage for three seasons before and three seasons after the move. To control for squad quality, I normalized results against each club's wage bill relative to the league average.
        </p>

        <DataTable />

        <p style={{
          fontSize: "18px", color: P.bodyText, lineHeight: 1.8,
          marginBottom: "20px",
        }}>
          The pattern is striking. In the first two seasons after a stadium move, home win percentage drops by an average of 8.3 percentage points — even after controlling for squad spend.
        </p>

        <PullQuote
          text="The new ground doesn't produce better results. It produces bigger expectations that take years to grow into."
          accent={accent}
        />

        <h2 style={{
          fontSize: "28px", fontStyle: "italic", color: P.black,
          marginTop: "40px", marginBottom: "16px", lineHeight: 1.2,
        }}>
          Why bigger isn't better (at first)
        </h2>

        <p style={{
          fontSize: "18px", color: P.bodyText, lineHeight: 1.8,
          marginBottom: "20px",
        }}>
          Three factors emerge from the data. The familiarity deficit — teams lose the accumulated tactical knowledge of their old ground. The revenue lag — increased matchday income takes 2-3 seasons to translate into squad improvement. And expectation inflation — fans, media, and boards expect the new stadium to produce immediate results.
        </p>

        <ChartPlaceholder accent={accent} />

        <Callout
          label="Key finding"
          text="Arsenal, West Ham, and Tottenham all experienced a home win percentage drop of 7-10 percentage points in the first two seasons after moving. Brighton and Leicester — who moved from significantly smaller grounds — are the exceptions that prove the rule."
          accent={accent}
        />

        <p style={{
          fontSize: "18px", color: P.bodyText, lineHeight: 1.8,
          marginBottom: "20px",
        }}>
          Arsenal's early Emirates years are the textbook case. Highbury's 38,419 seats gave way to 60,704 — but for three seasons, the team played visibly more cautiously at home. The expansive pitch, the distant crowd, the corporate atmosphere: all cited by players and pundits at the time. The data confirms the instinct.
        </p>

        <h2 style={{
          fontSize: "28px", fontStyle: "italic", color: P.black,
          marginTop: "40px", marginBottom: "16px", lineHeight: 1.2,
        }}>
          The Spurs case
        </h2>

        <p style={{
          fontSize: "18px", color: P.bodyText, lineHeight: 1.8,
          marginBottom: "20px",
        }}>
          Tottenham Hotspur Stadium is the most expensive club ground ever built in the UK. The 62,850-seat arena was supposed to cement Spurs as a top-four fixture. Instead, the club has cycled through four permanent managers since moving in, and their home record — while improved from the initial drop — has never matched the final White Hart Lane years.
        </p>

        <p style={{
          fontSize: "18px", color: P.bodyText, lineHeight: 1.8,
          marginBottom: "20px",
        }}>
          The long-term picture, five years and beyond, is more nuanced. Revenue growth does eventually compound. But the short-term gap between expectation and reality — the ground effect — is real, measurable, and consistently underestimated.
        </p>

        {/* Sources */}
        <div style={{
          marginTop: "48px", paddingTop: "24px",
          borderTop: `0.5px solid ${P.borderLight}`,
        }}>
          <div style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "10px", letterSpacing: "0.06em",
            color: P.muted, marginBottom: "8px", textTransform: "uppercase",
          }}>
            Data sources
          </div>
          <p style={{ fontSize: "14px", color: P.caption, lineHeight: 1.6 }}>
            FBref (match-level statistics), Transfermarkt (squad market values and wage estimates), Premier League official records (attendance data). Full methodology available on the methodology page.
          </p>
        </div>

        {/* Author sign-off */}
        <div style={{
          marginTop: "32px", paddingTop: "24px",
          borderTop: `0.5px solid ${P.borderLight}`,
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            background: P.black, display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 32 32">
              <polygon points="16,6 26,24 6,24" fill="none" stroke="#f4f6f8" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <div style={{
              fontSize: "15px", fontStyle: "italic", color: P.black, marginBottom: "2px",
            }}>
              Delta
            </div>
            <div style={{ fontSize: "13px", color: P.caption }}>
              Data vs. the story they tell you.
            </div>
          </div>
        </div>

        {/* Related articles */}
        <div style={{
          marginTop: "48px", paddingTop: "24px",
          borderTop: `0.5px solid ${P.borderLight}`,
        }}>
          <div style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "10px", letterSpacing: "0.06em",
            color: P.muted, marginBottom: "16px", textTransform: "uppercase",
          }}>
            Related
          </div>
          {[
            { title: "The Boleyn curse", sport: "FOOTBALL", gap: "8.4", readTime: "10" },
            { title: "Home advantage is shrinking", sport: "FOOTBALL", gap: "7.4", readTime: "9" },
            { title: "The venue effect across sports", sport: "CROSS-SPORT", gap: "8.0", readTime: "18" },
          ].map((related, i) => {
            const relAccent = sportAccent(related.sport);
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "12px 0",
                borderBottom: i < 2 ? `0.5px solid ${P.borderLight}` : "none",
                cursor: "pointer",
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  background: relAccent.light, border: `0.5px solid ${relAccent.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "12px", color: relAccent.primary,
                  flexShrink: 0,
                }}>
                  {related.gap}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "16px", fontStyle: "italic", color: P.darkGray, lineHeight: 1.3,
                  }}>
                    {related.title}
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
                    <span style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "10px", color: relAccent.primary,
                    }}>
                      {related.sport}
                    </span>
                    <span style={{ fontSize: "10px", color: P.muted }}>
                      {related.readTime} min
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </div>
  );
}
