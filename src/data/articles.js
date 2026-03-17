// =============================================================================
// DELTA — Article Registry
// =============================================================================

export const articles = [
  // === FOOTBALL ===

  // Attack
  { slug: "the-new-ground-effect", sport: "FOOTBALL", type: "DATA ESSAY",
    title: "The new ground effect",
    subtitle: "Do bigger stadiums actually produce better results — or just bigger expectations?",
    date: "2026-03-14", readTime: 12, gap: 9.2,
    formation: { pos: "ST", role: "Lead", line: "attack" }, featured: true },

  { slug: "richarlison-anfields-anomaly", sport: "FOOTBALL", type: "PROFILE",
    title: "Richarlison: Anfield's anomaly",
    subtitle: "Why Spurs' striker defies his own season stats every time he visits L4.",
    date: "2026-03-15", readTime: 6, gap: 7.1,
    formation: { pos: "AML", role: "Trending", line: "attack" } },

  { slug: "pressing-intensity-vs-points", sport: "FOOTBALL", type: "DATA ESSAY",
    title: "Pressing intensity vs. points",
    subtitle: "Does running more actually win you more games? The relationship between PPDA and points-per-game is weaker than you think.",
    date: "2026-03-12", readTime: 10, gap: 8.5,
    formation: { pos: "AMC", role: "Pick", line: "attack" } },

  { slug: "wirtz-through-the-lens", sport: "FOOTBALL", type: "PROFILE",
    title: "Wirtz through the lens",
    subtitle: "Liverpool's marquee signing rated in context — what the numbers miss about his impact.",
    date: "2026-03-11", readTime: 7, gap: 6.8,
    formation: { pos: "AMR", role: "Latest", line: "attack" } },

  // Midfield
  { slug: "what-if-spurs-kept-pochettino", sport: "FOOTBALL", type: "SIMULATION",
    title: "What if Spurs kept Pochettino?",
    subtitle: "A counterfactual simulation using squad trajectories and tactical modeling from 2019 to 2026.",
    date: "2026-03-08", readTime: 14, gap: 7.9,
    formation: { pos: "DML", role: "Analysis", line: "midfield" } },

  { slug: "the-boleyn-curse", sport: "FOOTBALL", type: "DATA ESSAY",
    title: "The Boleyn curse",
    subtitle: "London Stadium was supposed to be West Ham's launchpad. Six years of data says it's been an anchor.",
    date: "2026-03-02", readTime: 10, gap: 8.4,
    formation: { pos: "DMR", role: "Deep dive", line: "midfield" } },

  // Defence
  { slug: "liverpool-1-1-spurs-matchweek-30", sport: "FOOTBALL", type: "RECAP",
    title: "Liverpool 1-1 Spurs: The Richarlison effect",
    subtitle: "Matchweek 30 recap — how Spurs stole a point in the 90th minute at Anfield.",
    date: "2026-03-15", readTime: 5, gap: 5.8,
    formation: { pos: "DL", role: "Recap", line: "defence" } },

  { slug: "home-advantage-is-shrinking", sport: "FOOTBALL", type: "DATA ESSAY",
    title: "Home advantage is shrinking",
    subtitle: "Post-COVID home win rates haven't recovered — and that changes the economics of stadium investment.",
    date: "2026-02-28", readTime: 9, gap: 7.4,
    formation: { pos: "DCL", role: "Foundation", line: "defence" } },

  { slug: "arsenal-2-0-everton-matchweek-30", sport: "FOOTBALL", type: "RECAP",
    title: "Arsenal 2-0 Everton: Expected dominance",
    subtitle: "Matchweek 30 recap — when the xG and the actual scoreline align perfectly.",
    date: "2026-03-15", readTime: 4, gap: 4.2,
    formation: { pos: "DCR", role: "Recap", line: "defence" } },

  { slug: "van-dijk-at-34", sport: "FOOTBALL", type: "PROFILE",
    title: "Van Dijk at 34: still elite?",
    subtitle: "Aerial duel rates, progressive carries, and the age curve question for Liverpool's captain.",
    date: "2026-02-25", readTime: 6, gap: 6.1,
    formation: { pos: "DR", role: "Archive", line: "defence" } },

  // === FORMULA 1 ===

  { slug: "street-circuits-dont-produce-better-racing", sport: "F1", type: "DATA ESSAY",
    title: "Street circuits don't produce better racing",
    subtitle: "DRS overtakes on street circuits vs. permanent venues — adjusted for track length, era, and field spread.",
    date: "2026-03-10", readTime: 12, gap: 9.4,
    grid: { position: 1, sector: "S1" } },

  { slug: "the-car-vs-the-driver-quantified", sport: "F1", type: "DATA ESSAY",
    title: "The car vs. the driver: quantified",
    subtitle: "How much of a race result is car and how much is driver? A regression model using teammate deltas across 15 seasons.",
    date: "2026-03-08", readTime: 15, gap: 8.9,
    grid: { position: 2, sector: "S1" } },

  { slug: "russell-finds-clear-air", sport: "F1", type: "PROFILE",
    title: "Russell finds clear air",
    subtitle: "Australia 2026 winner profile — how George Russell's qualifying pace finally translated to race craft.",
    date: "2026-03-09", readTime: 7, gap: 6.8,
    grid: { position: 3, sector: "S2" } },

  { slug: "pit-stop-strategy-less-decisive", sport: "F1", type: "DATA ESSAY",
    title: "Pit stop strategy is less decisive than you think",
    subtitle: "Undercut vs. overcut success rates across the turbo-hybrid era.",
    date: "2026-03-05", readTime: 10, gap: 8.2,
    grid: { position: 4, sector: "S1" } },

  { slug: "antonelli-the-real-deal", sport: "F1", type: "PROFILE",
    title: "Antonelli: the real deal?",
    subtitle: "Kimi Antonelli's junior career data mapped against historical benchmarks for elite F1 rookies.",
    date: "2026-03-03", readTime: 8, gap: 7.1,
    grid: { position: 5, sector: "S2" } },

  { slug: "what-if-drs-never-existed", sport: "F1", type: "SIMULATION",
    title: "What if DRS never existed?",
    subtitle: "Re-simulating 10 seasons of overtaking data without DRS zones.",
    date: "2026-03-01", readTime: 14, gap: 8.6,
    grid: { position: 6, sector: "S3" } },

  { slug: "australia-2026-race-debrief", sport: "F1", type: "RECAP",
    title: "Australia 2026: Race debrief",
    subtitle: "Full race breakdown — strategy calls, driver ratings, and the Piastri DNF.",
    date: "2026-03-09", readTime: 6, gap: 5.4,
    grid: { position: 7, sector: "S3" } },

  { slug: "australia-2026-qualifying-report", sport: "F1", type: "RECAP",
    title: "Australia 2026: Qualifying report",
    subtitle: "Sector-by-sector analysis of Russell's pole lap and the Q2 eliminations.",
    date: "2026-03-08", readTime: 5, gap: 4.8,
    grid: { position: 8, sector: "S3" } },

  { slug: "verstappen-recovery-drive-data", sport: "F1", type: "DATA ESSAY",
    title: "Verstappen's recovery drives, ranked",
    subtitle: "P20 to P6 in Australia. How does it compare to his other charges through the field?",
    date: "2026-03-09", readTime: 7, gap: 5.9,
    grid: { position: 9, sector: "S1" } },

  { slug: "mercedes-have-two-rocketships", sport: "F1", type: "DATA ESSAY",
    title: "Mercedes have two rocketships",
    subtitle: "Pace delta analysis: why Mercedes' straight-line speed advantage could define the 2026 season.",
    date: "2026-03-10", readTime: 9, gap: 7.2,
    grid: { position: 10, sector: "S1" } },

  // === CROSS-SPORT ===

  { slug: "budget-caps-vs-salary-caps", sport: "CROSS-SPORT", type: "DATA ESSAY",
    title: "Budget caps vs. salary caps",
    subtitle: "F1's cost cap and football's FFP both aim for competitive balance. Both fail — but in completely different ways.",
    date: "2026-03-06", readTime: 15, gap: 8.8 },

  { slug: "the-venue-effect-across-sports", sport: "CROSS-SPORT", type: "DATA ESSAY",
    title: "The venue effect across sports",
    subtitle: "From new stadiums to new circuits — does changing the stage change the performance?",
    date: "2026-02-20", readTime: 18, gap: 8.0 },

  { slug: "relegation-vs-elimination", sport: "CROSS-SPORT", type: "DATA ESSAY",
    title: "Relegation vs. elimination",
    subtitle: "Football punishes failure with demotion. F1 has no equivalent. Which produces better competition?",
    date: "2026-02-14", readTime: 12, gap: 7.5 },

  { slug: "dynasty-decay-rates", sport: "CROSS-SPORT", type: "SIMULATION",
    title: "Dynasty decay rates",
    subtitle: "How long do dominant eras last? Modeling the half-life of sporting dynasties from Man City to Red Bull.",
    date: "2026-02-08", readTime: 16, gap: 7.8 },
];

// Helpers
export const getArticlesBySport = (sport) => articles.filter((a) => a.sport === sport);
export const getFootballArticles = () => getArticlesBySport("FOOTBALL");
export const getF1Articles = () => getArticlesBySport("F1").sort((a, b) => (a.grid?.position || 99) - (b.grid?.position || 99));
export const getCrossSportArticles = () => getArticlesBySport("CROSS-SPORT");
export const getRecentArticles = (n = 6) => [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, n);
export const getFeatured = () => articles.find((a) => a.featured) || articles[0];
export const getArticleBySlug = (slug) => articles.find((a) => a.slug === slug);
