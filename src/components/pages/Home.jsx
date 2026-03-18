import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import articles from "@/data/articles";

const sportColor = (s) => {
  const sl = (s || "").toLowerCase();
  return sl === "f1" ? "#B777CC" : sl === "cross-sport" ? "#d4956a" : "#4a9a6a";
};

export default function DeltaHome() {
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const heroCanvasRef = useRef(null);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  // === HERO ANIMATION (preserved exactly) ===
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
        strands: 36, spread: 265, baseThickness: 2.05, glowWidth: 9.8,
        alphaCore: 0.22, alphaGlow: 0.065, laneInfluence: -0.7, swayScale: 0.62,
        rotationOffset: -0.1, colorStart: stripeColors[1], colorMid: stripeColors[3], colorEnd: stripeColors[5],
      },
      {
        strands: 32, spread: 148, baseThickness: 2.6, glowWidth: 12.4,
        alphaCore: 0.31, alphaGlow: 0.095, laneInfluence: 0.86, swayScale: 0.5,
        rotationOffset: 0.03, colorStart: stripeColors[2], colorMid: stripeColors[2], colorEnd: stripeColors[4],
      },
      {
        strands: 24, spread: 92, baseThickness: 1.9, glowWidth: 8.4,
        alphaCore: 0.28, alphaGlow: 0.09, laneInfluence: 0.92, swayScale: 0.42,
        rotationOffset: 0.16, colorStart: stripeColors[4], colorMid: stripeColors[2], colorEnd: stripeColors[2],
      },
      {
        strands: 34, spread: 250, baseThickness: 2, glowWidth: 9.6,
        alphaCore: 0.21, alphaGlow: 0.062, laneInfluence: 0.72, swayScale: 0.58,
        rotationOffset: 0.22, colorStart: stripeColors[0], colorMid: stripeColors[5], colorEnd: stripeColors[3],
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
        return { x: anchorX + x * cos - y * sin, y: anchorY + x * sin + y * cos };
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

        const glow = ctx.createLinearGradient(p0.x, p0.y, p3.x, p3.y);
        glow.addColorStop(0, asRgba(band.colorStart, band.alphaGlow * 0.6));
        glow.addColorStop(0.5, asRgba(band.colorMid, band.alphaGlow * 1.12));
        glow.addColorStop(1, asRgba(band.colorEnd, band.alphaGlow * 0.72));

        const core = ctx.createLinearGradient(p0.x, p0.y, p3.x, p3.y);
        core.addColorStop(0, asRgba(band.colorStart, band.alphaCore * 0.72));
        core.addColorStop(0.42, asRgba(band.colorMid, band.alphaCore * 1.15));
        core.addColorStop(0.72, asRgba(band.colorEnd, band.alphaCore * 0.82));
        core.addColorStop(1, asRgba(band.colorEnd, band.alphaCore * 0.74));

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
  // === END HERO ANIMATION ===

  const featured = articles.find((a) => a.featured) || articles[0];
  const recent = articles.filter((a) => !a.featured);

  const sections = [
    { label: "Football", desc: "Premier League, European cups", color: "#4a9a6a", href: "/football" },
    { label: "Formula 1", desc: "Races, drivers, constructors", color: "#B777CC", href: "/f1" },
    { label: "Cross-sport", desc: "Where both worlds collide", color: "#d4956a", href: "/cross-sport" },
  ];

  const navItems = [
    { label: "Home", href: "/", active: true },
    { label: "Football", href: "/football" },
    { label: "Formula 1", href: "/f1" },
    { label: "Cross-Sport", href: "/cross-sport" },
    { label: "Methodology", href: "/methodology" },
    { label: "About", href: "/about" },
  ];

  return (
    <div style={{
      background: "#091527", minHeight: "100vh",
      fontFamily: "'Instrument Serif', Georgia, serif",
      color: "#5a6484",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Caveat:wght@400&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{
        position: "relative", zIndex: 6,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 28px",
        borderBottom: "1px solid #A59FC415",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <svg width="16" height="16" viewBox="0 0 32 32">
            <polygon points="16,3 29,27 3,27" fill="#A59FC4" fillOpacity="0.12" stroke="#A59FC4" strokeWidth="1.8" />
            <polygon points="16,12 22,23 10,23" fill="#091527" stroke="#A59FC466" strokeWidth="0.8" />
          </svg>
          <span style={{ fontStyle: "italic", fontSize: "18px", color: "#e8eaf0" }}>Delta</span>
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} style={{
              fontSize: "10px",
              color: item.active ? "#FD8B10" : "#ccc4e0",
              textDecoration: "none",
              background: item.active ? "#ffffff" : "#0d1a30",
              border: item.active ? "1px solid #ffffff" : "1px solid #A59FC420",
              borderRadius: "14px",
              padding: "5px 14px",
            }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section style={{ position: "relative", minHeight: "620px", overflow: "visible" }}>
        <div className="hero-canvas-wrap" style={{
          position: "absolute", right: "-16%", top: "-20%",
          width: "86%", height: "116%",
          zIndex: 1, pointerEvents: "none",
          clipPath: "polygon(34% 0%, 100% 0%, 100% 100%, 22% 100%)",
        }}>
          <canvas ref={heroCanvasRef} aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, padding: "100px 28px 48px", maxWidth: "480px" }}>
          <h1 style={{
            fontStyle: "italic", fontSize: "38px", color: "#f0f0f6", lineHeight: 1.08,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)",
            transition: "all 0.8s ease-out",
          }}>
            Data vs. the story<br />they tell you.
          </h1>
          <p style={{
            fontSize: "13px", color: "#5a6484", lineHeight: 1.6,
            marginTop: "20px", maxWidth: "380px",
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(10px)",
            transition: "all 0.8s ease-out 0.15s",
          }}>
            Sports narratives are built on repetition, not evidence.
            Delta tests the claims everyone repeats against what the data actually shows.
          </p>
        </div>
        <style>{`@media (max-width: 768px) { .hero-canvas-wrap { display: none !important; } }`}</style>
      </section>

      {/* Featured */}
      <section style={{ padding: "0 28px 48px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#A59FC466", marginBottom: "16px" }}>FEATURED</div>
        <Link
          href={`/articles/${featured.slug}`}
          onMouseEnter={() => setHovered(featured.slug)}
          onMouseLeave={() => setHovered(null)}
          style={{ display: "block", textDecoration: "none" }}
        >
          <div style={{
            background: hovered === featured.slug ? "#101e36" : "#0d1a30",
            border: `1px solid ${hovered === featured.slug ? "#A59FC433" : "#A59FC418"}`,
            borderRadius: "12px", overflow: "hidden", minHeight: "260px",
            display: "flex", transition: "background 0.2s, border-color 0.2s",
          }}>
            <div style={{ flex: 1, padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: sportColor(featured.sport) }} />
                <span style={{ fontSize: "9px", color: "#5a6484" }}>{(featured.sport || "").toUpperCase()}</span>
                <span style={{ fontSize: "9px", fontStyle: "italic", color: "#3a4464" }}>{featured.type}</span>
                <span style={{
                  background: "#cc3a3a", color: "#ffffff", fontSize: "7px",
                  fontFamily: "sans-serif", fontWeight: 500,
                  padding: "2px 6px", borderRadius: "3px", marginLeft: "6px",
                }}>NEW</span>
              </div>
              <h2 style={{ fontStyle: "italic", fontSize: "28px", color: "#e8eaf2", lineHeight: 1.15, marginBottom: "10px" }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: "12px", color: "#5a6484", lineHeight: 1.5, maxWidth: "360px" }}>
                {featured.subtitle}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "18px" }}>
                <span style={{ fontStyle: "italic", fontSize: "22px", color: "#A59FC4" }}>{featured.gap}</span>
                <span style={{ fontSize: "10px", color: "#3a4464" }}>{featured.date}</span>
              </div>
            </div>
            {featured.visual === "photo" && featured.image && (
              <div style={{ flex: "0 0 45%" }}>
                <img src={featured.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderLeft: "1px solid #A59FC410", display: "block" }} />
              </div>
            )}
            {featured.visual === "typo" && (
              <div style={{
                flex: "0 0 45%", background: "#0a1220",
                borderLeft: "1px solid #A59FC410",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontStyle: "italic", fontSize: "48px", color: "#A59FC412" }}>{featured.typoText}</span>
              </div>
            )}
          </div>
        </Link>
      </section>

      {/* Recent */}
      <section style={{ padding: "0 28px 48px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#A59FC466", marginBottom: "16px" }}>RECENT</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          {recent.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              onMouseEnter={() => setHovered(article.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{ display: "block", textDecoration: "none" }}
            >
              <div style={{
                background: hovered === article.slug ? "#101e36" : "#0d1a30",
                border: `1px solid ${hovered === article.slug ? "#A59FC433" : "#A59FC418"}`,
                borderRadius: "12px", overflow: "hidden",
                display: "flex", flexDirection: "column", cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s",
              }}>
                <div style={{ height: "140px", overflow: "hidden" }}>
                  {article.visual === "photo" && article.image ? (
                    <img src={article.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <div style={{
                      width: "100%", height: "100%", background: "#0a1220",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontStyle: "italic", fontSize: "48px", color: "#A59FC412" }}>
                        {article.typoText || ""}
                      </span>
                    </div>
                  )}
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: sportColor(article.sport) }} />
                    <span style={{ fontSize: "9px", color: "#5a6484" }}>{(article.sport || "").toUpperCase()}</span>
                    <span style={{ fontSize: "9px", fontStyle: "italic", color: "#3a4464" }}>{article.type}</span>
                  </div>
                  <h3 style={{ fontStyle: "italic", fontSize: "17px", color: "#dde0ec", lineHeight: 1.25, marginBottom: "6px" }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: "11px", color: "#5a6484", lineHeight: 1.5, marginBottom: "12px" }}>
                    {article.subtitle}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontStyle: "italic", fontSize: "17px", color: "#A59FC4" }}>{article.gap}</span>
                    <span style={{ fontSize: "10px", color: "#3a4464" }}>{article.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section cards */}
      <section style={{ padding: "0 28px 48px", display: "flex", gap: "10px" }}>
        {sections.map((s) => (
          <Link key={s.label} href={s.href} style={{
            textDecoration: "none", flex: 1,
            background: "#0d1a30", border: "1px solid #A59FC418",
            borderRadius: "10px", padding: "12px",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#A59FC433"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#A59FC418"; }}
          >
            <div style={{ width: "18px", height: "2px", background: s.color, marginBottom: "10px", borderRadius: "1px" }} />
            <h4 style={{ fontStyle: "italic", fontSize: "13px", color: "#dde0ec", marginBottom: "4px" }}>{s.label}</h4>
            <p style={{ fontSize: "9px", color: "#3a4464" }}>{s.desc}</p>
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: "14px 28px",
        borderTop: "1px solid #A59FC415",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" style={{ fontSize: "9px", color: "#2a3454", fontStyle: "italic", textDecoration: "none" }}>Delta</Link>
        <div style={{ display: "flex", gap: "16px" }}>
          {[{ label: "methodology", href: "/methodology" }, { label: "about", href: "/about" }].map((item) => (
            <Link key={item.label} href={item.href} style={{ fontSize: "9px", color: "#2a3454", textDecoration: "none" }}>{item.label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
