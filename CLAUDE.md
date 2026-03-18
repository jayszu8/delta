# Delta

Sports data analytics website built with Next.js 14 (App Router) and MDX.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
```

## Tech Stack

- **Framework:** Next.js 14 (App Router, `src/app/`)
- **Content:** MDX articles in `content/articles/`
- **Styling:** CSS (`src/app/globals.css`), no CSS framework
- **Charts:** Recharts (interactive visualizations in articles)
- **Data pipeline:** Python scripts in `data-pipeline/scripts/`

## Design System — Dark Navy Gallery

Dark-mode design with a gallery-style article layout.

### Core Palette

| Token         | Hex                | Usage                            |
|---------------|--------------------|----------------------------------|
| Background    | `#091527`          | Page background (dark navy)      |
| Card BG       | `#0d1a30`          | Article cards, surfaces          |
| Card border   | `#A59FC418`        | Lavender-tinted card borders     |
| Headlines     | `#e8eaf2`          | Headings, titles                 |
| Subtitles     | `#5a6484`          | Subtitles, descriptions          |
| Secondary     | `#3a4464`          | Muted text, metadata             |
| Accent        | `#A59FC4` (lavender) | Gap Scores, logo, section labels, card borders |

### Logo

Nested triangle: outer stroke `#A59FC4`, inner stroke `#A59FC466` (lavender at 40%). The layered form echoes the "delta" (change) concept.

### Typography

Instrument Serif is the **only** font used across the site. No IBM Plex Mono, no Geist.

| Role            | Font             | Weight/Style              | Usage                                    |
|-----------------|------------------|---------------------------|------------------------------------------|
| Headlines       | Instrument Serif | 400 italic                | Article titles, section headings         |
| Body            | Instrument Serif | 400 regular               | Article text, subtitles                  |
| Labels/Tags     | Instrument Serif | 400, varied size/spacing  | "FOOTBALL", "DATA ESSAY", dates          |
| Gap Scores      | Instrument Serif | 400 italic                | Always in `#A59FC4` lavender             |
| Notes           | Caveat           | 400                       | Handwritten-style notes ONLY             |

### Sport Colors

Sport colors appear ONLY on tiny 5px dots and sport label text — nowhere else.

- **Football:** `#4a9a6a` (muted green)
- **F1:** `#B777CC` (muted purple-pink)
- **Cross-sport:** `#d4956a` (muted amber)

### Navigation

Pill-shaped nav buttons (solid backgrounds to block hero animation behind nav):
- **Active page:** white background `#ffffff` with orange text `#FD8B10`
- **Inactive pages:** solid dark navy `#0d1a30` with lavender text `#ccc4e0`, border `1px solid #A59FC420`

### Home Page Hero

The hero features a Stripe-inspired canvas animation: multiple bands of colorful gradient strands (pinks, purples, oranges) flowing diagonally across the right side of the hero behind the headline text. The animation uses vivid Stripe palette colors (NOT the monochrome purple site palette). The headline text sits on top at z-index 2.

### Article Listings

Articles are displayed as **large gallery cards** (`#0d1a30` background, `#A59FC418` border), not a vertical text list. Featured card has a visual placeholder area on the right (`#0a1220` bg). Recent articles use a 2-column CSS grid. Each card shows the article title, subtitle, Gap Score in `#A59FC4`, sport dot (5px), and metadata. Cards should feel like a curated gallery.

### Mascot — "Pip"

Pip is a pixel-art polar bear (blocky 8x8 grid, body `#e0e8f0`, shading `#a8b8c8`, eyes `#4a5a6a`). Pip appears:
- On the **home page** as "Pip's pick" next to a recommended article
- In the **footer** on every page

Pip does NOT appear in the header nav.

## Project Structure

- `src/app/` — Route pages (folder = URL): home, football, f1, cross-sport, articles, about, methodology
- `src/components/pages/` — Full page components (Home.jsx, Football.jsx, F1.jsx)
- `src/components/shared.jsx` — Shared components (GapScore, SportPill, ShirtIcon, etc.)
- `src/lib/colors.js` — All project colors (single source of truth)
- `src/data/articles.js` — Article registry with all metadata (single source of truth for article data)
- `src/data/generated/` — JSON output from data pipeline (gitignored)
- `content/articles/` — MDX article files
- `data-pipeline/` — Python data processing scripts (FastF1, pandas, BeautifulSoup)

## Content Workflow

1. Add article metadata to `src/data/articles.js`
2. Write MDX file in `content/articles/<slug>.mdx`
3. Articles route via `src/app/articles/[slug]/page.jsx`

## Key Concept: Gap Score

A manually assigned score representing the data insight gap in each article. Displayed in `#A59FC4` lavender, Instrument Serif italic.
