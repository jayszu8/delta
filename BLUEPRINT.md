# Delta — Technical Blueprint

## Quick Start

```bash
# 1. Install Node.js (https://nodejs.org — download the LTS version)
# 2. Open terminal, navigate to the delta folder
cd delta

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

# 5. Open http://localhost:3000
```

The site hot-reloads — save a file and the browser updates instantly.

**Routes that work right now:**
- `localhost:3000` — Home page
- `localhost:3000/football` — Football section (pitch + formation)
- `localhost:3000/f1` — F1 section (starting grid)
- `localhost:3000/articles/the-new-ground-effect` — Sample article

---

## Project Structure

```
delta/
├── package.json                    # Dependencies and scripts
├── next.config.mjs                 # Next.js + MDX configuration
├── BLUEPRINT.md                    # This file
│
├── src/
│   ├── app/                        # Pages (folder = URL)
│   │   ├── layout.jsx              # Root wrapper
│   │   ├── globals.css             # Fonts, resets
│   │   ├── page.jsx                # / (home)
│   │   ├── football/page.jsx       # /football
│   │   ├── f1/page.jsx             # /f1
│   │   └── articles/[slug]/page.jsx # /articles/any-article-slug
│   │
│   ├── components/
│   │   ├── shared.jsx              # GapScore, SportPill, ShirtIcon, etc.
│   │   └── pages/
│   │       ├── Home.jsx            # Full home page component
│   │       ├── Football.jsx        # Full football section component
│   │       └── F1.jsx              # Full F1 section component
│   │
│   ├── lib/
│   │   └── colors.js               # Every color in the project
│   │
│   └── data/
│       ├── articles.js             # Article registry (metadata for all content)
│       └── generated/              # JSON from data pipeline (gitignored)
│
├── content/
│   └── articles/                   # MDX files (your written articles)
│       └── the-new-ground-effect.mdx
│
├── data-pipeline/
│   └── scripts/
│       └── process_data.py         # Python scripts for data processing
│
└── public/                         # Static assets (images, fonts)
```

---

## Phases

### Phase 1: Launch (do this now)

All you need is the site running with the three pages and a few articles.

1. Install Node.js, run `npm install`, run `npm run dev`
2. The three pages (home, football, F1) already work from the components
3. Write articles as MDX files in `content/articles/`
4. Add each article's metadata to `src/data/articles.js`
5. Deploy to Vercel (see Deployment section below)

**Data analysis for articles happens manually.** Use whatever tool you want
(Python, Excel, Google Sheets) to do the analysis, then write up the findings
in MDX. The Gap Score is just a number you assign based on your analysis.

### Phase 2: Automation (when you have 10+ articles)

Automate repetitive data pulls with Python:

```bash
pip install fastf1 pandas requests
python data-pipeline/scripts/process_data.py
```

This pulls data from FBref, FastF1, etc., calculates Gap Scores, and outputs
JSON that the website reads. You still write the articles — the pipeline just
handles the number-crunching.

### Phase 3: Interactivity (when you want embedded charts)

Add interactive visualizations inside articles using Recharts:

```jsx
// In your MDX file:
import { ScatterChart, Scatter, XAxis, YAxis } from "recharts";

<ScatterChart width={600} height={300}>
  <XAxis dataKey="capacity" />
  <YAxis dataKey="points_normalized" />
  <Scatter data={stadiumData} fill="#6ec4d6" />
</ScatterChart>
```

---

## How to Publish an Article

### Step 1: Add metadata

Open `src/data/articles.js` and add an entry:

```js
{
  slug: "your-article-slug",
  sport: "FOOTBALL",         // or "F1" or "CROSS-SPORT"
  type: "DATA ESSAY",        // or "PROFILE", "RECAP", "SIMULATION"
  title: "Your article title",
  subtitle: "One-sentence description.",
  date: "2026-04-01",
  readTime: 10,
  gap: 8.5,                  // your Gap Score assessment

  // For football articles — which formation position:
  formation: { pos: "AMC", role: "Pick", line: "attack" },

  // For F1 articles — which grid slot:
  grid: { position: 3, sector: "S2" },
}
```

### Step 2: Write the article

Create `content/articles/your-article-slug.mdx`:

```mdx
# Your article title

Your intro paragraph. This is just Markdown — write normally.

## A section heading

More text. You can use **bold**, *italic*, [links](https://example.com),
and all standard Markdown formatting.

## The data

When you want to embed a chart or interactive element (Phase 3),
you'll import a React component here.

---

*Data sources: FBref, Transfermarkt.*
```

### Step 3: Push and deploy

```bash
git add .
git commit -m "new article: your article title"
git push
```

Vercel rebuilds in ~30 seconds. Your article is live.

---

## Football Formation Positions

| Line     | Positions        | Content type                          |
|----------|-----------------|---------------------------------------|
| Attack   | ST              | Lead data essay (boldest claim)       |
| Attack   | AML, AMR        | Profiles (about individuals, wide)    |
| Attack   | AMC             | Creative data essay (central, connective) |
| Midfield | DML, DMR        | Simulations, deep dives (structural)  |
| Defence  | DL, DCL, DCR, DR | Recaps, archive, evergreen (foundation) |

The formation label (4-2-3-1, 4-3-3, etc.) updates based on how many
articles are on the pitch. 6 articles = 1-2-3. 10 articles = 4-2-3-1.

## F1 Grid Positions

| Grid slot | Visual weight | Typical content              |
|-----------|--------------|------------------------------|
| P1-P2     | Front row (largest cards) | Boldest data essays  |
| P3-P4     | Second row    | Data essays, strong profiles |
| P5-P6     | Third row     | Profiles, simulations        |
| P7+       | Back of grid  | Recaps, coverage pieces      |

Sectors: S1 (purple) = data essays, S2 (green) = profiles, S3 (yellow) = recaps/sims.

---

## Deployment

### First time

1. Create a GitHub account (github.com)
2. Create a new repository called "delta"
3. Push your code:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/delta.git
   git push -u origin main
   ```
4. Go to vercel.com, sign in with GitHub
5. Import the "delta" repository
6. Vercel auto-detects Next.js and deploys
7. Site is live at delta-YOUR_USERNAME.vercel.app

### Custom domain

1. Buy a domain (~$12/year from Namecheap, Porkbun, etc.)
2. In Vercel: Settings > Domains > Add domain
3. Update DNS as instructed (takes 10-30 min)

### Every update after that

```bash
git add .
git commit -m "describe your change"
git push
```

Vercel rebuilds automatically.

---

## Design System Reference

### Typography

| Role       | Font              | Style         | Usage                          |
|------------|-------------------|---------------|--------------------------------|
| Headlines  | Instrument Serif  | 400 italic    | Article titles, section names  |
| Body       | Instrument Serif  | 400 regular   | Article text, subtitles        |
| Data       | IBM Plex Mono     | 400, 500      | Dates, tags, Gap Scores, stats |
| Notes      | Caveat            | 400           | Editor's notes section ONLY    |

### Page backgrounds

| Page     | Background          | Accent color     | Metaphor               |
|----------|--------------------|-----------------|-----------------------|
| Home     | #0a1628 (navy)     | #6ec4d6 (teal)  | Editorial grid         |
| Football | #0e2818 (pitch)    | #6ec4d6 (teal)  | FM tactics board       |
| F1       | #0e0e12 (carbon)   | #b48af0 (purple)| Starting grid          |

### Sport colors (consistent everywhere)

| Sport       | Color  | Hex     |
|-------------|--------|---------|
| Football    | Teal   | #4a9aad |
| Formula 1   | Pink   | #d4a0c4 |
| Cross-sport | Amber  | #d4a44e |

---

## Data Sources

| Source       | URL                              | Sport    | Data                     |
|-------------|----------------------------------|----------|--------------------------|
| FBref       | fbref.com                        | Football | Advanced stats, match logs|
| FotMob      | fotmob.com                       | Football | Ratings, player stats    |
| Transfermarkt| transfermarkt.com               | Football | Values, transfers        |
| Understat   | understat.com                    | Football | xG, shot maps            |
| FastF1      | github.com/theOehrly/Fast-F1     | F1       | Telemetry, lap times     |
| Ergast      | ergast.com/mrd                   | F1       | Historical results       |

### Python setup for data pipeline

```bash
pip install fastf1 pandas requests beautifulsoup4
```

```python
# F1 telemetry
import fastf1
session = fastf1.get_session(2026, 1, "R")
session.load()

# Football stats (web scraping)
import pandas as pd
tables = pd.read_html("https://fbref.com/en/comps/9/stats")
```

---

## Getting Help

- Next.js docs: nextjs.org/docs
- MDX docs: mdxjs.com
- React docs: react.dev
- FastF1 docs: docs.fastf1.dev
- Or ask me — paste error messages and I'll debug with you
