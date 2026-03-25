import type { Category } from "@/types/article";

const CATEGORY_RULES: Record<Category, string[]> = {
  astronomy: [
    "telescope", "galaxy", "nebula", "star", "planet", "comet", "asteroid",
    "exoplanet", "black hole", "cosmology", "astro", "cosmos", "universe",
    "hubble", "webb", "jwst", "light-year", "parsec", "quasar", "pulsar",
    "supernova", "dark matter", "dark energy", "gravitational wave",
  ],
  exploration: [
    "launch", "rocket", "spacecraft", "crew", "expedition", "lander", "rover",
    "spacewalk", "eva", "capsule", "orbital", "reentry", "splashdown",
    "spaceport", "payload", "trajectory",
  ],
  research: [
    "study", "research", "paper", "journal", "arxiv", "discovery",
    "observation", "data", "scientist", "analysis", "findings", "experiment",
    "simulation", "model", "theory", "astrophysics", "physics",
  ],
  satellites: [
    "satellite", "gps", "orbit", "iss", "space station", "cubesat",
    "constellation", "relay", "communications", "earth observation",
    "remote sensing", "geosynchronous", "polar orbit",
  ],
  missions: [
    "mission", "artemis", "apollo", "voyager", "perseverance", "ingenuity",
    "cassini", "new horizons", "juno", "parker", "lucy", "dart", "osiris",
    "europa clipper", "dragonfly", "james webb", "chandra", "kepler",
  ],
};

export function detectCategory(title: string, description?: string | null): Category {
  const text = `${title} ${description ?? ""}`.toLowerCase();

  const scores: Record<Category, number> = {
    astronomy: 0,
    exploration: 0,
    research: 0,
    satellites: 0,
    missions: 0,
  };

  for (const [category, keywords] of Object.entries(CATEGORY_RULES) as [Category, string[]][]) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        scores[category]++;
      }
    }
  }

  const best = (Object.entries(scores) as [Category, number][]).reduce(
    (a, b) => (b[1] > a[1] ? b : a)
  );

  return best[1] > 0 ? best[0] : "missions";
}
