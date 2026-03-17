"use client";

import Link from "next/link";
import { DeltaLogo } from "@/components/shared";

export default function AboutPage() {
  return (
    <div style={{ background: "#0a1628", minHeight: "100vh", fontFamily: "'Instrument Serif', Georgia, serif", color: "#e8ecf0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 32px", borderBottom: "0.5px solid #1a2d4e",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <DeltaLogo color="#6ec4d6" size={20} />
          <span style={{ fontStyle: "italic", fontSize: "22px", color: "#f4f6f8" }}>Delta</span>
          <span style={{ fontSize: "11px", color: "#5a6a7e", fontFamily: "'IBM Plex Mono', monospace", marginLeft: "4px" }}>/ about</span>
        </Link>
        <nav style={{ display: "flex", gap: "16px" }}>
          {[
            { label: "home", href: "/" },
            { label: "football", href: "/football" },
            { label: "formula 1", href: "/f1" },
            { label: "cross-sport", href: "/cross-sport" },
            { label: "methodology", href: "/methodology" },
            { label: "about", href: "/about" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{ fontSize: "11px", color: "#8494a8", textDecoration: "none" }}>{item.label}</Link>
          ))}
        </nav>
      </header>

      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "60px 32px" }}>
        <h1 style={{ fontStyle: "italic", fontSize: "42px", color: "#f4f6f8", marginBottom: "24px" }}>
          About Delta
        </h1>

        <div style={{ fontSize: "16px", color: "#8494a8", lineHeight: 1.75 }}>
          <p style={{ marginBottom: "16px", fontSize: "18px", color: "#c0c8d0" }}>
            Sports narratives are built on repetition, not evidence. Delta takes the claims everyone repeats — about teams, drivers, tactics, and transfers — and tests them against what the data actually shows.
          </p>

          <p style={{ marginBottom: "16px" }}>
            The project grew out of a simple question asked during an intro statistics class at Yale: do bigger stadiums correlate with better results in the Premier League? The answer was more interesting than the question — and the gap between what everyone assumed and what the data showed became the thesis for everything that followed.
          </p>

          <p style={{ marginBottom: "16px" }}>
            Delta covers football (with the Premier League and European competition as the core focus) and Formula 1 (a newer interest, approached with fresh analytical eyes). The cross-sport section explores the structural parallels between the two — competitive balance, venue economics, dynasty mechanics.
          </p>

          <p style={{ marginBottom: "16px" }}>
            Every piece is data-driven, every claim is sourced, and every methodology is transparent. If the data contradicts a popular narrative, the data wins. If the data supports it, that's worth knowing too.
          </p>

          <div style={{
            marginTop: "40px", paddingTop: "24px",
            borderTop: "0.5px solid #1a2d4e",
          }}>
            <p style={{ fontSize: "14px", color: "#5a6a7e" }}>
              Built with Next.js. Data processed in Python. Hosted on Vercel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
