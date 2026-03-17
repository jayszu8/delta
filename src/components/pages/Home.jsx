import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const P = {
  bg: "#f8f9fb",
  border: "#E4E2EA",
  headline: "#141618",
  body: "#3a3e44",
  caption: "#6a7078",
  muted: "#9aa0a8",
  faint: "#c0c4ca",
  accent: "#6B5CA5",
  football: "#6B5CA5",
  f1: "#9B8BD5",
  cross: "#4A3D7A",
  footballHoverBg: "#F2F0F8",
  footballHoverBorder: "#D8D4E4",
  f1HoverBg: "#F4F2FA",
  f1HoverBorder: "#E0DCF0",
  crossHoverBg: "#EEEAF4",
  crossHoverBorder: "#D0CCE0",
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

// GapScore no longer used on Home — sport color applied directly inline

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

export default function DeltaHome() {
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const heroCanvasRef = useRef(null);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas || typeof window === "undefined") return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const stripeColors = [
      "rgb(254,135,230)",
      "rgb(191,200,252)",
      "rgb(253,139,16)",
      "rgb(129,93,245)",
      "rgb(253,131,144)",
      "rgb(252,129,226)",
    ];
    const asRgba = (rgb, alpha) => rgb.replace("rgb", "rgba").replace(")", `, ${alpha})`);

    const bands = [
      {
        strands: 36,
        spread: 265,
        baseThickness: 2.05,
        glowWidth: 9.8,
        alphaCore: 0.22,
        alphaGlow: 0.065,
        laneInfluence: -0.7,
        swayScale: 0.62,
        rotationOffset: -0.1,
        colorStart: stripeColors[1],
        colorMid: stripeColors[3],
        colorEnd: stripeColors[5],
      },
      {
        // Orange centerline band.
        strands: 32,
        spread: 148,
        baseThickness: 2.6,
        glowWidth: 12.4,
        alphaCore: 0.31,
        alphaGlow: 0.095,
        laneInfluence: 0.86,
        swayScale: 0.5,
        rotationOffset: 0.03,
        colorStart: stripeColors[2],
        colorMid: stripeColors[2],
        colorEnd: stripeColors[4],
      },
      {
        // Narrow, denser fold that reads as an inner tucked layer.
        strands: 24,
        spread: 92,
        baseThickness: 1.9,
        glowWidth: 8.4,
        alphaCore: 0.28,
        alphaGlow: 0.09,
        laneInfluence: 0.92,
        swayScale: 0.42,
        rotationOffset: 0.16,
        colorStart: stripeColors[4],
        colorMid: stripeColors[2],
        colorEnd: stripeColors[2],
      },
      {
        strands: 34,
        spread: 250,
        baseThickness: 2,
        glowWidth: 9.6,
        alphaCore: 0.21,
        alphaGlow: 0.062,
        laneInfluence: 0.72,
        swayScale: 0.58,
        rotationOffset: 0.22,
        colorStart: stripeColors[0],
        colorMid: stripeColors[5],
        colorEnd: stripeColors[3],
      },
    ];

    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawBand = (t, band, bandIndex, anchorX, anchorY, rotation) => {
      const rotatePoint = (x, y) => {
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        return {
          x: anchorX + x * cos - y * sin,
          y: anchorY + x * sin + y * cos,
        };
      };

      for (let i = 0; i < band.strands; i += 1) {
        const v = band.strands > 1 ? i / (band.strands - 1) : 0.5;
        const lane = (v - 0.5) * 2;
        const laneOffset = lane * band.spread;
        const pinch = 0.34 + Math.abs(lane) * 0.66;
        const pinchedLaneOffset = laneOffset * pinch;
        const sway =
          Math.sin(t * 0.00016 * band.swayScale + i * 0.36 + bandIndex * 1.2) * 6 +
          Math.sin(t * 0.00034 * band.swayScale + i * 0.17) * 2.2;

        const sX = -width * 0.78 + laneOffset * 0.18;
        const sY = -height * 0.9 + laneOffset * 0.58;
        const c1X = -width * 0.2 + pinchedLaneOffset * (0.55 * band.laneInfluence) + sway;
        const c1Y = -height * 0.5 + pinchedLaneOffset * 0.12;
        const c2X = width * 0.23 - pinchedLaneOffset * (0.48 * band.laneInfluence) - sway * 0.75;
        const c2Y = height * 0.14 + pinchedLaneOffset * 0.82;
        const eX = width * 0.58 - laneOffset * 0.21;
        const eY = height * 1.03 + laneOffset * 0.64;

        const p0 = rotatePoint(sX, sY);
        const p1 = rotatePoint(c1X, c1Y);
        const p2 = rotatePoint(c2X, c2Y);
        const p3 = rotatePoint(eX, eY);

        const colorA = band.colorStart;
        const colorB = band.colorMid;
        const colorC = band.colorEnd;

        const glow = ctx.createLinearGradient(p0.x, p0.y, p3.x, p3.y);
        glow.addColorStop(0, asRgba(colorA, band.alphaGlow * 0.6));
        glow.addColorStop(0.5, asRgba(colorB, band.alphaGlow * 1.12));
        glow.addColorStop(1, asRgba(colorC, band.alphaGlow * 0.72));

        const core = ctx.createLinearGradient(p0.x, p0.y, p3.x, p3.y);
        core.addColorStop(0, asRgba(colorA, band.alphaCore * 0.72));
        core.addColorStop(0.42, asRgba(colorB, band.alphaCore * 1.15));
        core.addColorStop(0.72, asRgba(colorC, band.alphaCore * 0.82));
        core.addColorStop(1, asRgba(colorC, band.alphaCore * 0.74));

        const strandThickness = band.baseThickness + (1 - Math.abs(lane)) * 0.72;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalCompositeOperation = "source-over";

        ctx.strokeStyle = glow;
        ctx.lineWidth = band.glowWidth + (1 - Math.abs(lane)) * 2;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.stroke();

        ctx.strokeStyle = core;
        ctx.lineWidth = strandThickness;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.stroke();
      }
    };

    const render = (now) => {
      ctx.clearRect(0, 0, width, height);

      const t = now;
      const anchorX =
        width * 0.69 +
        Math.sin(t * 0.00012) * width * 0.007 +
        Math.sin(t * 0.00028) * width * 0.0025;
      const anchorY =
        height * 0.58 +
        Math.cos(t * 0.00011) * height * 0.006 +
        Math.sin(t * 0.00025) * height * 0.0022;

      // Slow clockwise drift with tiny vibration to mimic Stripe's anchored motion.
      const baseRotation =
        0.21 +
        t * 0.000007 +
        Math.sin(t * 0.0001) * 0.024 +
        Math.sin(t * 0.0002) * 0.007;

      for (let i = 0; i < bands.length; i += 1) {
        const bandRotation =
          baseRotation +
          bands[i].rotationOffset +
          Math.sin(t * 0.00008 + i * 0.9) * 0.007;
        drawBand(t, bands[i], i, anchorX, anchorY, bandRotation);
      }

      rafId = window.requestAnimationFrame(render);
    };

    resize();
    rafId = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const featured = articles[0];
  const rest = articles.slice(1);

  const sections = [
    { label: "Football", desc: "Premier League, European cups", count: "10 articles", color: P.football, href: "/football", hoverBg: P.footballHoverBg, hoverBorder: P.footballHoverBorder },
    { label: "Formula 1", desc: "Races, drivers, constructors", count: "10 articles", color: P.f1, href: "/f1", hoverBg: P.f1HoverBg, hoverBorder: P.f1HoverBorder },
    { label: "Cross-sport", desc: "Where both worlds collide", count: "4 articles", color: P.cross, href: "/cross-sport", hoverBg: P.crossHoverBg, hoverBorder: P.crossHoverBorder },
  ];

  return (
    <div style={{
      background: P.bg, minHeight: "100vh",
      fontFamily: "'Instrument Serif', Georgia, serif",
      color: P.body,
      position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Caveat:wght@400&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{
        position: "relative",
        zIndex: 6,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px",
        borderBottom: `0.5px solid ${P.border}`,
        background: "linear-gradient(90deg, rgba(248,249,251,0.98) 0%, rgba(248,249,251,0.98) 62%, rgba(191,200,252,0.24) 74%, rgba(253,139,16,0.28) 86%, rgba(252,129,226,0.22) 100%)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <polygon points="16,3 29,27 3,27" fill="#6B5CA5" fillOpacity="0.12" stroke="#6B5CA5" strokeWidth="1.8" />
            <polygon points="16,12 22,23 10,23" fill="#f8f9fb" stroke="#9B8BD5" strokeWidth="0.8" />
          </svg>
          <span style={{ fontStyle: "italic", fontSize: "22px", color: P.headline }}>
            Delta
          </span>
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {[
            { label: "Home", href: "/", variant: "light" },
            { label: "Football", href: "/football", variant: "purple" },
            { label: "Formula 1", href: "/f1", variant: "purple" },
            { label: "Cross-Sport", href: "/cross-sport", variant: "purple" },
            { label: "Methodology", href: "/methodology", variant: "purple" },
            { label: "About", href: "/about", variant: "purple" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{
              fontSize: "13px",
              color: item.variant === "purple" ? "#ffffff" : "rgb(253,139,16)",
              cursor: "pointer",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
              background: item.variant === "purple" ? "rgb(129,93,245)" : "#ffffff",
              borderRadius: "8px",
              padding: "7px 14px",
              boxShadow:
                item.variant === "purple"
                  ? "0 0 0 1px rgba(129,93,245,0.92) inset"
                  : "0 0 0 1px rgba(253,139,16,0.24) inset",
            }}
            onMouseEnter={(e) => {
              if (item.variant === "purple") {
                e.currentTarget.style.background = "rgb(129,93,245)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(129,93,245,0.96) inset";
              } else {
                e.currentTarget.style.background = "rgba(253,139,16,0.12)";
                e.currentTarget.style.color = "rgb(253,139,16)";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(253,139,16,0.38) inset";
              }
            }}
            onMouseLeave={(e) => {
              if (item.variant === "purple") {
                e.currentTarget.style.background = "rgb(129,93,245)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(129,93,245,0.92) inset";
              } else {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = "rgb(253,139,16)";
                e.currentTarget.style.boxShadow = "0 0 0 1px rgba(253,139,16,0.24) inset";
              }
            }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section style={{
        position: "relative",
        minHeight: "620px",
        overflow: "visible",
      }}>
        <div className="hero-canvas-wrap" style={{
          position: "absolute",
          right: "-16%",
          top: "-20%",
          width: "86%",
          height: "116%",
          zIndex: 1,
          pointerEvents: "none",
          clipPath: "polygon(34% 0%, 100% 0%, 100% 100%, 22% 100%)",
        }}>
          <canvas
            ref={heroCanvasRef}
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
        </div>

        {/* Headline text */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "120px 40px 100px",
          maxWidth: "480px",
        }}>
          <p style={{
            fontStyle: "italic",
            fontSize: "56px",
            color: P.headline,
            lineHeight: 1.1,
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

        <style>{`
          @media (max-width: 768px) {
            .hero-canvas-wrap { display: none !important; }
          }
        `}</style>
      </section>

      {/* Featured */}
      <section style={{
        padding: "0 40px 80px",
        maxWidth: "900px",
      }}>
        <div style={{
          fontSize: "11px", fontFamily: "'Instrument Serif', Georgia, serif",
          color: P.muted, letterSpacing: "0.06em",
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
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: sportColor(featured.sport), flexShrink: 0 }} />
            <span style={{
              fontSize: "11px",
              color: sportColor(featured.sport), letterSpacing: "0.04em",
            }}>
              {featured.sport}
            </span>
            <span style={{ color: P.faint, fontSize: "11px", fontStyle: "italic" }}>
              {featured.type}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
            <span style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontSize: "36px",
              color: sportColor(featured.sport),
              lineHeight: 1,
              flexShrink: 0,
              paddingTop: "4px",
            }}>
              {featured.gap}
            </span>
            <div>
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

              {/* Gap bar */}
              <div style={{
                marginTop: "16px",
                width: "200px", height: "3px",
                background: P.border, borderRadius: "1.5px",
                overflow: "hidden",
              }}>
                <div style={{
                  width: `${(parseFloat(featured.gap) / 10) * 100}%`,
                  height: "100%",
                  background: sportColor(featured.sport),
                  borderRadius: "1.5px",
                }} />
              </div>

              <span style={{ fontSize: "11px", color: P.muted, marginTop: "12px", display: "inline-block" }}>
                {featured.date}
              </span>
            </div>
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
          fontSize: "11px", fontFamily: "'Instrument Serif', Georgia, serif",
          color: P.muted, letterSpacing: "0.06em",
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
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: sportColor(article.sport), flexShrink: 0 }} />
                  <span style={{
                    fontSize: "11px",
                    color: sportColor(article.sport), letterSpacing: "0.04em",
                  }}>
                    {article.sport}
                  </span>
                  <span style={{
                    fontSize: "11px", fontStyle: "italic",
                    color: P.faint,
                  }}>
                    {article.type}
                  </span>
                  {i === 2 && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginLeft: "4px" }}>
                      <svg width="14" height="14" viewBox="0 0 8 8" style={{ opacity: 0.7 }}>
                        <rect x="1" y="0" width="1" height="1" fill="#e0e8f0" stroke="#a8b8c8" strokeWidth="0.2" />
                        <rect x="5" y="0" width="1" height="1" fill="#e0e8f0" stroke="#a8b8c8" strokeWidth="0.2" />
                        <rect x="1" y="1" width="6" height="4.5" fill="#e0e8f0" stroke="#a8b8c8" strokeWidth="0.2" rx="0.3" />
                        <rect x="2.5" y="2.8" width="0.8" height="0.8" fill="#4a5a6a" />
                        <rect x="4.7" y="2.8" width="0.8" height="0.8" fill="#4a5a6a" />
                        <rect x="1.5" y="5.5" width="1.2" height="1.5" fill="#e0e8f0" stroke="#a8b8c8" strokeWidth="0.2" />
                        <rect x="4.7" y="5.5" width="1.2" height="1.5" fill="#e0e8f0" stroke="#a8b8c8" strokeWidth="0.2" />
                      </svg>
                      <span style={{ fontSize: "10px", fontStyle: "italic", color: "#9aa0a8" }}>
                        {"Pip's pick"}
                      </span>
                    </span>
                  )}
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
                gap: "6px", marginLeft: "40px", flexShrink: 0, paddingTop: "20px",
              }}>
                <span style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "20px",
                  color: sportColor(article.sport),
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
              borderLeft: "2px solid transparent",
              transition: "background 0.2s, border-color 0.2s, border-left-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = section.hoverBg;
              e.currentTarget.style.borderColor = section.hoverBorder;
              e.currentTarget.style.borderLeftColor = section.color;
              e.currentTarget.querySelector(".section-arrow").style.opacity = "1";
              e.currentTarget.querySelector("h4").style.color = section.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = P.border;
              e.currentTarget.style.borderLeftColor = "transparent";
              e.currentTarget.querySelector(".section-arrow").style.opacity = "0";
              e.currentTarget.querySelector("h4").style.color = P.headline;
            }}
          >
            <div style={{
              width: "28px", height: "3px", background: section.color,
              marginBottom: "14px", borderRadius: "1.5px",
              opacity: 0.6,
            }} />
            <h4 style={{
              fontStyle: "italic", fontSize: "18px", color: P.headline,
              marginBottom: "4px", transition: "color 0.2s",
            }}>
              {section.label}
              <span className="section-arrow" style={{
                marginLeft: "8px",
                opacity: 0,
                transition: "opacity 0.2s",
                fontSize: "16px",
              }}>→</span>
            </h4>
            <p style={{ fontSize: "13px", color: P.muted }}>
              {section.desc}
            </p>
            <p style={{
              fontSize: "11px", fontStyle: "italic",
              color: section.color,
              opacity: 0.6,
              marginTop: "8px",
            }}>
              {section.count}
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
