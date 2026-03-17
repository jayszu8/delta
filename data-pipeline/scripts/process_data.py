"""
DELTA — Data Pipeline
=====================
Processes raw data and outputs JSON for the website.
Run from project root: python data-pipeline/scripts/process_data.py

Phase 1 (now):  Manual data analysis, hardcoded in articles.js
Phase 2 (later): This script automates data pulls and Gap Score calculations
"""

import json
import os
from pathlib import Path
from datetime import date

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

OUTPUT_DIR = Path("src/data/generated")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ---------------------------------------------------------------------------
# Gap Score calculation
# ---------------------------------------------------------------------------

def calculate_gap_score(
    predicted_direction: str,
    actual_effect_size: float,
    actual_direction: str,
) -> float:
    """
    Calculate how far a popular narrative diverges from the data.

    Args:
        predicted_direction: What the narrative claims ("positive" or "negative")
        actual_effect_size: Magnitude of the real effect (0 to 1 scale)
        actual_direction: What the data shows ("positive" or "negative")

    Returns:
        Gap Score from 0 (narrative is accurate) to 10 (narrative is completely wrong)
    """
    # Base score from effect size (0-5 scale)
    base = min(abs(actual_effect_size) * 10, 5)

    # Direction multiplier: opposite direction = much higher gap
    direction_mult = 1.8 if predicted_direction != actual_direction else 1.0

    return round(min(base * direction_mult, 10), 1)


# ---------------------------------------------------------------------------
# Example: Stadium move analysis
# ---------------------------------------------------------------------------

stadium_moves = [
    {
        "club": "Arsenal",
        "old_stadium": "Highbury",
        "new_stadium": "Emirates",
        "move_year": 2006,
        "old_capacity": 38419,
        "new_capacity": 60704,
        "home_win_pct_before": 0.68,
        "home_win_pct_after": 0.58,
    },
    {
        "club": "West Ham",
        "old_stadium": "Boleyn Ground",
        "new_stadium": "London Stadium",
        "move_year": 2016,
        "old_capacity": 35016,
        "new_capacity": 60000,
        "home_win_pct_before": 0.42,
        "home_win_pct_after": 0.35,
    },
    {
        "club": "Tottenham",
        "old_stadium": "White Hart Lane",
        "new_stadium": "Tottenham Hotspur Stadium",
        "move_year": 2019,
        "old_capacity": 36284,
        "new_capacity": 62850,
        "home_win_pct_before": 0.55,
        "home_win_pct_after": 0.48,
    },
]

# Enrich with calculated fields
for club in stadium_moves:
    club["capacity_increase_pct"] = round(
        (club["new_capacity"] - club["old_capacity"]) / club["old_capacity"] * 100, 1
    )
    club["home_win_delta"] = round(
        club["home_win_pct_after"] - club["home_win_pct_before"], 3
    )

# Export
with open(OUTPUT_DIR / "stadium_moves.json", "w") as f:
    json.dump(stadium_moves, f, indent=2)
print(f"  stadium data -> {OUTPUT_DIR / 'stadium_moves.json'}")


# ---------------------------------------------------------------------------
# Example: Gap Scores for all articles
# ---------------------------------------------------------------------------

article_scores = [
    {
        "slug": "the-new-ground-effect",
        "gap_score": calculate_gap_score("positive", -0.083, "negative"),
        "last_updated": str(date.today()),
    },
    {
        "slug": "street-circuits-dont-produce-better-racing",
        "gap_score": calculate_gap_score("positive", -0.12, "negative"),
        "last_updated": str(date.today()),
    },
    {
        "slug": "the-boleyn-curse",
        "gap_score": calculate_gap_score("positive", -0.07, "negative"),
        "last_updated": str(date.today()),
    },
]

with open(OUTPUT_DIR / "gap_scores.json", "w") as f:
    json.dump(article_scores, f, indent=2)
print(f"  gap scores   -> {OUTPUT_DIR / 'gap_scores.json'}")


# ---------------------------------------------------------------------------
# Phase 2: F1 data via FastF1 (uncomment when ready)
# ---------------------------------------------------------------------------

# import fastf1
#
# def fetch_race_data(year: int, round_num: int):
#     """Pull timing data for a specific race."""
#     session = fastf1.get_session(year, round_num, "R")
#     session.load()
#
#     results = session.results[["Abbreviation", "Position", "GridPosition", "Time", "Status"]]
#     laps = session.laps[["Driver", "LapNumber", "LapTime", "Sector1Time", "Sector2Time", "Sector3Time"]]
#
#     return {
#         "results": results.to_dict(orient="records"),
#         "laps": laps.to_dict(orient="records"),
#     }


# ---------------------------------------------------------------------------
# Phase 2: Football data via web sources (uncomment when ready)
# ---------------------------------------------------------------------------

# import pandas as pd
# import requests
#
# def fetch_fbref_team_stats(season: str = "2025-2026"):
#     """Pull team-level stats from FBref."""
#     url = f"https://fbref.com/en/comps/9/{season}/stats"
#     tables = pd.read_html(url)
#     return tables[0]  # First table is usually the main stats table


print("\n  pipeline complete")
