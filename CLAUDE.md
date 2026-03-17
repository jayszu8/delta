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

## Design System

### Typography

| Role       | Font             | Weight/Style | Usage                              |
|------------|------------------|--------------|------------------------------------|
| Headlines  | Instrument Serif | 400 italic   | Article titles, section headings   |
| Body       | Instrument Serif | 400 regular  | Article text, subtitles            |
| Data       | IBM Plex Mono    | 400, 500     | Dates, tags, Gap Scores, stats     |
| Notes      | Caveat           | 400          | Handwritten-style notes ONLY       |

### Sport Colors (use consistently everywhere)

- **Football:** teal `#4a9aad`
- **F1:** pink `#d4a0c4`
- **Cross-sport:** amber `#d4a44e`

### Page Backgrounds

| Page        | Background            | Accent          | Layout metaphor          |
|-------------|-----------------------|-----------------|--------------------------|
| Home        | `#0a1628` (navy)      | `#6ec4d6` teal  | Editorial grid           |
| Football    | `#0e2818` (green)     | `#6ec4d6` teal  | FM-style 4-2-3-1 formation |
| F1          | `#0e0e12` (carbon)    | `#b48af0` purple | Starting grid, purple/pink timing colors |
| Cross-sport | amber-toned           | `#d4a44e` amber | Split field              |
| Articles    | light off-white       | varies by sport | Reading layout           |

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

A manually assigned score representing the data insight gap in each article. Displayed using the GapScore component from `src/components/shared.jsx`.
