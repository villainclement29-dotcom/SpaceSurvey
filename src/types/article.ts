export type Category =
  | "astronomy"
  | "exploration"
  | "research"
  | "satellites"
  | "missions";

export interface ArticleData {
  id: string;
  title: string;
  description: string | null;
  url: string;
  imageUrl: string | null;
  publishedAt: string;
  source: string;
  sourceFeed: string;
  category: string;
  lang: string;
  fetchedAt: string;
}

export interface FeedSource {
  name: string;
  url: string;
  defaultCategory: Category;
  lang: "fr" | "en";
}

export const CATEGORIES: { slug: Category; labelEn: string; labelFr: string }[] = [
  { slug: "astronomy", labelEn: "Astronomy", labelFr: "Astronomie" },
  { slug: "exploration", labelEn: "Space Exploration", labelFr: "Exploration spatiale" },
  { slug: "research", labelEn: "Research", labelFr: "Recherche" },
  { slug: "satellites", labelEn: "Satellites", labelFr: "Satellites" },
  { slug: "missions", labelEn: "Missions", labelFr: "Missions" },
];
