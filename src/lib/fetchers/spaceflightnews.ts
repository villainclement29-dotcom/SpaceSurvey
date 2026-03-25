import { detectCategory } from "@/lib/categories";

interface SpaceflightArticle {
  id: number;
  title: string;
  url: string;
  image_url: string | null;
  news_site: string;
  summary: string;
  published_at: string;
}

interface SpaceflightResponse {
  results: SpaceflightArticle[];
}

export async function fetchSpaceflightNews() {
  const results: {
    title: string;
    description: string | null;
    url: string;
    imageUrl: string | null;
    publishedAt: Date;
    source: string;
    sourceFeed: string;
    category: string;
    lang: string;
  }[] = [];

  try {
    const res = await fetch(
      "https://api.spaceflightnewsapi.net/v4/articles/?limit=50&ordering=-published_at",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: SpaceflightResponse = await res.json();

    for (const article of data.results ?? []) {
      results.push({
        title: article.title,
        description: article.summary ? article.summary.slice(0, 500) : null,
        url: article.url,
        imageUrl: article.image_url,
        publishedAt: new Date(article.published_at),
        source: article.news_site,
        sourceFeed: "https://api.spaceflightnewsapi.net/v4/articles/",
        category: detectCategory(article.title, article.summary),
        lang: "en",
      });
    }
  } catch (err) {
    console.error("[SpaceflightNews] Fetch failed:", err);
  }

  return results;
}
