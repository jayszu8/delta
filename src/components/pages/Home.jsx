import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const P = {
  bg: "#f8f9fb",
  border: "#e2e5ea",
  headline: "#141618",
  body: "#3a3e44",
  caption: "#6a7078",
  muted: "#9aa0a8",
  faint: "#c0c4ca",
  accent: "#2a6a9a",
  football: "#1a7a5a",
  f1: "#5a4a9a",
  cross: "#8a6a20",
  footballHoverBg: "#e6f4ee",
  footballHoverBorder: "#b8dcc8",
  f1HoverBg: "#eee8f8",
  f1HoverBorder: "#d0c4e8",
  crossHoverBg: "#f8f0dc",
  crossHoverBorder: "#e0d4b0",
};

const articles = [
  { slug: "the-new-ground-effect", sport: "FOOTBALL", type: "DATA ESSAY", title: "The new ground effect", subtitle: "Do bigger stadiums actually produce better results — or just bigger expectations?", date: "14 Mar", gap: 9.2, featured: true },
  { slug: "street-circuits", sport: "F1", type: "DATA ESSAY", title: "Street circuits don't produce better racing", subtitle: "DRS overtakes on street vs. permanent venues, adjusted for track length and era.", date: "10 Mar", gap: 9.4 },
  { slug: "budget-caps", sport: "CROSS-SPORT", type: "DATA ESSAY", title: "Budget caps vs. salary caps", subtitle: "F1's cost cap and football's FFP both fail at competitive balance — differently.", date: "06 Mar", gap: 8.8 },
  { slug: "richarlison", sport: "FOOTBALL", type: "PROFILE", title: "Richarlison: Anfield's anomaly", subtitle: "Why Spurs' striker defies his own season stats every time he visits L4.", date: "15 Mar", gap: 7.1 },
  { slug: "russell", sport: "F1", type: "RECAP", title: "Australia 2026: Russell finds clear air", subtitle: "Race recap, driver ratings, and the strategy calls that shaped Round 1.", date: "09 Mar", gap: 6.8 },
  { slug: "boleyn", sport: "FOOTBALL", type: "DATA ESSAY", title: "The Boleyn curse", subtitle: "London Stadium was supposed to be a launchpad. The data says anchor.", date: "02 Mar", gap: 8.4 },
];

const sportColor = (s) => s === "F1" ? P.f1 : s === "CROSS-SPORT" ? P.cross : P.football;

function GapScore({ score }) {
  const val = parseFloat(score);
  const color = val >= 8.5 ? "#1a6a3a" : val >= 7.0 ? "#3a7a4a" : "#6a8a70";
  return (
    <span style={{
      fontFamily: "'Instrument Serif', Georgia, serif",
      fontStyle: "italic",
      fontSize: "14px",
      color,
    }}>
      {score}
    </span>
  );
}

function PolarBear({ size = 18, opacity = 0.6 }) {
  const s = size / 8;
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" style={{ opacity }}>
      {/* Ears */}
      <rect x="1" y="0" width="1" height="1" fill="#e0e8f0" />
      <rect x="5" y="0" width="1" height="1" fill="#e0e8f0" />
      {/* Head */}
      <rect x="1" y="1" width="5" height="3" fill="#e0e8f0" />
      {/* Head shading */}
      <rect x="5" y="1" width="1" height="3" fill="#a8b8c8" />
      <rect x="1" y="3" width="5" height="1" fill="#a8b8c8" />
      {/* Eyes */}
      <rect x="2" y="2" width="1" height="1" fill="#4a5a6a" />
      <rect x="4" y="2" width="1" height="1" fill="#4a5a6a" />
      {/* Nose */}
      <rect x="3" y="3" width="1" height="1" fill="#4a5a6a" />
      {/* Body */}
      <rect x="1" y="4" width="5" height="3" fill="#e0e8f0" />
      {/* Body shading */}
      <rect x="5" y="4" width="1" height="3" fill="#a8b8c8" />
      <rect x="1" y="6" width="5" height="1" fill="#a8b8c8" />
      {/* Feet */}
      <rect x="1" y="7" width="2" height="1" fill="#a8b8c8" />
      <rect x="4" y="7" width="2" height="1" fill="#a8b8c8" />
    </svg>
  );
}

function WireframeSphere() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const animRef = useRef(null);

  const buildGeometry = useCallback(() => {
    const verts = [];
    const edges = [];
    const faces = [];
    const latSteps = 12;
    const lonSteps = 18;
    const radius = 1;

    // Generate vertices on a sphere
    verts.push([0, radius, 0]); // north pole
    for (let lat = 1; lat < latSteps; lat++) {
      const theta = (Math.PI * lat) / latSteps;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);
      for (let lon = 0; lon < lonSteps; lon++) {
        const phi = (2 * Math.PI * lon) / lonSteps;
        verts.push([radius * sinT * Math.cos(phi), radius * cosT, radius * sinT * Math.sin(phi)]);
      }
    }
    verts.push([0, -radius, 0]); // south pole

    const edgeSet = new Set();
    const addEdge = (a, b) => {
      const key = Math.min(a, b) + "," + Math.max(a, b);
      if (!edgeSet.has(key)) { edgeSet.add(key); edges.push([a, b]); }
    };

    // North pole triangles
    for (let lon = 0; lon < lonSteps; lon++) {
      const a = 1 + lon;
      const b = 1 + ((lon + 1) % lonSteps);
      faces.push([0, a, b]);
      addEdge(0, a); addEdge(0, b); addEdge(a, b);
    }

    // Middle bands — triangulated quads
    for (let lat = 0; lat < latSteps - 2; lat++) {
      for (let lon = 0; lon < lonSteps; lon++) {
        const cur = 1 + lat * lonSteps + lon;
        const next = 1 + lat * lonSteps + ((lon + 1) % lonSteps);
        const below = 1 + (lat + 1) * lonSteps + lon;
        const belowNext = 1 + (lat + 1) * lonSteps + ((lon + 1) % lonSteps);
        faces.push([cur, below, next]);
        faces.push([next, below, belowNext]);
        addEdge(cur, next); addEdge(cur, below); addEdge(next, below);
        addEdge(next, belowNext); addEdge(below, belowNext);
      }
    }

    // South pole triangles
    const southIdx = verts.length - 1;
    const lastRingStart = 1 + (latSteps - 2) * lonSteps;
    for (let lon = 0; lon < lonSteps; lon++) {
      const a = lastRingStart + lon;
      const b = lastRingStart + ((lon + 1) % lonSteps);
      faces.push([southIdx, a, b]);
      addEdge(southIdx, a); addEdge(southIdx, b); addEdge(a, b);
    }

    return { verts, edges };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { verts, edges } = buildGeometry();
    const sportColors = ["#1a7a5a", "#5a4a9a", "#8a6a20"];
    const brandBlue = "#2a6a9a";

    let highlightEdges = [];
    let highlightDecay = 0;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.clearRect(0, 0, w, h);

      const frame = frameRef.current;
      const rotY = frame * 0.004;
      const rotX = frame * 0.0015;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      const scale = Math.min(w, h) * 0.38;
      const cx = w / 2;
      const cy = h / 2;

      // Project vertices
      const projected = verts.map(([x, y, z]) => {
        // Rotate Y
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;
        // Rotate X
        let y1 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;
        return [cx + x1 * scale, cy + y1 * scale, z2];
      });

      // Highlight pulse
      if (frame % 60 === 0) {
        const count = 3 + Math.floor(Math.random() * 5);
        highlightEdges = [];
        for (let i = 0; i < count; i++) {
          highlightEdges.push(Math.floor(Math.random() * edges.length));
        }
        highlightDecay = 30;
      }
      if (highlightDecay > 0) highlightDecay--;

      // Draw edges
      ctx.lineWidth = 0.5;
      edges.forEach(([a, b], idx) => {
        const [x1, y1] = projected[a];
        const [x2, y2] = projected[b];
        const avgZ = (projected[a][2] + projected[b][2]) / 2;

        // Cycle sport color based on edge index
        const colorIdx = idx % 3;
        let color = sportColors[colorIdx];
        let alpha = 0.08 + (avgZ + 1) * 0.035; // 0.08–0.15 based on depth

        // Highlight check
        if (highlightDecay > 0 && highlightEdges.includes(idx)) {
          color = brandBlue;
          alpha = 0.30 * (highlightDecay / 30);
        }

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      frameRef.current++;
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [buildGeometry]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}

export default function DeltaHome() {
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const featured = articles[0];
  const rest = articles.slice(1);

  const sections = [
    { label: "Football", desc: "Premier League, European cups", color: P.football, href: "/football", hoverBg: P.footballHoverBg, hoverBorder: P.footballHoverBorder },
    { label: "Formula 1", desc: "Races, drivers, constructors", color: P.f1, href: "/f1", hoverBg: P.f1HoverBg, hoverBorder: P.f1HoverBorder },
    { label: "Cross-sport", desc: "Where both worlds collide", color: P.cross, href: "/cross-sport", hoverBg: P.crossHoverBg, hoverBorder: P.crossHoverBorder },
  ];

  return (
    <div style={{
      background: P.bg, minHeight: "100vh",
      fontFamily: "'Instrument Serif', Georgia, serif",
      color: P.body,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Caveat:wght@400&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <polygon points="16,3 29,27 3,27" fill="none" stroke={P.accent} strokeWidth="1.8" />
          </svg>
          <span style={{ fontStyle: "italic", fontSize: "22px", color: P.headline }}>
            Delta
          </span>
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
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
            onMouseEnter={(e) => e.target.style.color = P.headline}
            onMouseLeave={(e) => e.target.style.color = P.muted}
            >
              {item.label}
            </Link>
          ))}
          <PolarBear size={18} opacity={0.6} />
        </nav>
      </header>

      {/* Hero */}
      <section style={{
        display: "flex",
        alignItems: "center",
        padding: "120px 40px 100px",
      }}>
        <div style={{ maxWidth: "480px", flexShrink: 0 }}>
          <p style={{
            fontStyle: "italic",
            fontSize: "52px",
            color: P.headline,
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
            color: P.caption,
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
        </div>
        <div className="hero-sphere" style={{
          flex: 1,
          minWidth: 0,
          height: "360px",
          marginLeft: "40px",
        }}>
          <WireframeSphere />
        </div>
        <style>{`
          @media (max-width: 768px) {
            .hero-sphere { display: none !important; }
          }
        `}</style>
      </section>

      {/* Featured */}
      <section style={{
        padding: "0 40px 80px",
        maxWidth: "900px",
      }}>
        <div style={{
          fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
          color: P.muted, letterSpacing: "0.08em",
          marginBottom: "32px",
        }}>
          FEATURED
        </div>

        <Link
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
            <span style={{ color: P.faint, fontSize: "11px" }}>
              {featured.type}
            </span>
          </div>

          <h2 style={{
            fontStyle: "italic", fontSize: "38px", color: P.headline,
            lineHeight: 1.15, marginBottom: "12px",
            transition: "color 0.2s",
            ...(hovered === featured.slug ? { color: sportColor(featured.sport) } : {}),
          }}>
            {featured.title}
          </h2>

          <p style={{
            fontSize: "17px", color: P.caption, lineHeight: 1.6,
            maxWidth: "560px",
          }}>
            {featured.subtitle}
          </p>

          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            marginTop: "16px",
          }}>
            <GapScore score={featured.gap} />
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: P.faint }} />
            <span style={{ fontSize: "12px", color: P.muted, fontFamily: "'IBM Plex Mono', monospace" }}>
              {featured.date}
            </span>
          </div>
        </Link>
      </section>

      {/* Divider */}
      <div style={{
        width: "40px", height: "0.5px", background: P.border,
        margin: "0 40px 60px",
      }} />

      {/* Recent list */}
      <section style={{
        padding: "0 40px 100px",
        maxWidth: "900px",
      }}>
        <div style={{
          fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
          color: P.muted, letterSpacing: "0.08em",
          marginBottom: "40px",
        }}>
          RECENT
        </div>

        {rest.map((article, i) => (
          <Link
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
                    color: P.faint,
                  }}>
                    {article.type}
                  </span>
                </div>
                <h3 style={{
                  fontStyle: "italic", fontSize: "24px", color: P.headline,
                  lineHeight: 1.25, marginBottom: "6px",
                  transition: "color 0.2s",
                  ...(hovered === article.slug ? { color: sportColor(article.sport) } : {}),
                }}>
                  {article.title}
                </h3>
                <p style={{
                  fontSize: "14px", color: P.caption, lineHeight: 1.55,
                }}>
                  {article.subtitle}
                </p>
              </div>

              <div style={{
                display: "flex", flexDirection: "column", alignItems: "flex-end",
                gap: "6px", marginLeft: "40px", flexShrink: 0, paddingTop: "24px",
              }}>
                <GapScore score={article.gap} />
                <span style={{
                  fontSize: "11px", fontFamily: "'IBM Plex Mono', monospace",
                  color: P.muted,
                }}>
                  {article.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Section links */}
      <section style={{
        padding: "0 40px 60px",
        display: "flex", gap: "40px",
      }}>
        {sections.map((section) => (
          <Link
            key={section.label}
            href={section.href}
            style={{
              textDecoration: "none",
              cursor: "pointer",
              flex: 1,
              padding: "20px",
              borderRadius: "10px",
              border: `0.5px solid ${P.border}`,
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = section.hoverBg;
              e.currentTarget.style.borderColor = section.hoverBorder;
              e.currentTarget.querySelector("h4").style.color = section.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = P.border;
              e.currentTarget.querySelector("h4").style.color = P.headline;
            }}
          >
            <div style={{
              width: "24px", height: "2px", background: section.color,
              marginBottom: "14px", borderRadius: "1px",
              opacity: 0.6,
            }} />
            <h4 style={{
              fontStyle: "italic", fontSize: "18px", color: P.headline,
              marginBottom: "4px", transition: "color 0.2s",
            }}>
              {section.label}
            </h4>
            <p style={{ fontSize: "13px", color: P.muted }}>
              {section.desc}
            </p>
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: "24px 40px",
        borderTop: `0.5px solid ${P.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/" style={{ fontSize: "12px", color: P.muted, fontStyle: "italic", textDecoration: "none" }}>
            Delta
          </Link>
          <PolarBear size={14} opacity={0.6} />
        </div>
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
