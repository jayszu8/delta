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

## Design System — "Arctic Light" Palette

Light-mode design. No dark backgrounds.

### Core Palette

| Token       | Hex         | Usage                          |
|-------------|-------------|--------------------------------|
| Background  | `#f8f9fb`   | Default page background        |
| Headlines   | `#141618`   | Headings, titles               |
| Body text   | `#3a3e44`   | Paragraph text                 |
| Muted text  | `#9aa0a8`   | Captions, secondary labels     |
| Borders     | `#e2e5ea`   | Dividers, card borders         |
| Brand accent| `#2a6a9a`   | Links, brand highlights        |

### Typography

| Role       | Font             | Weight/Style | Usage                              |
|------------|------------------|--------------|------------------------------------|
| Headlines  | Instrument Serif | 400 italic   | Article titles, section headings   |
| Body       | Instrument Serif | 400 regular  | Article text, subtitles            |
| Data       | IBM Plex Mono    | 400, 500     | Dates, tags, stats                 |
| Notes      | Caveat           | 400          | Handwritten-style notes ONLY       |

### Sport Colors (use consistently everywhere)

- **Football:** green `#1a7a5a`
- **F1:** purple `#5a4a9a`
- **Cross-sport:** gold `#8a6a20`

### Page Backgrounds

| Page        | Background            | Layout metaphor              |
|-------------|-----------------------|------------------------------|
| Home        | `#f8f9fb`             | Editorial grid               |
| Football    | `#f4f8f5` (green tint)| FM-style 4-2-3-1 formation  |
| F1          | `#f5f4f8` (purple tint)| Starting grid               |
| Cross-sport | `#f8f6f2` (warm tint) | Split field                  |
| Articles    | `#fafaf8` (off-white) | Reading layout               |

### Mascot

A tiny pixel-art polar bear appears in the header and footer on every page.

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

A manually assigned score representing the data insight gap in each article. Displayed as green italic numbers (Instrument Serif), not monospace badges.
