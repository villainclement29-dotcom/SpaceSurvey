import { detectCategory } from "@/lib/categories";

interface NewsApiArticle {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
}

interface NewsApiResponse {
  articles: NewsApiArticle[];
  status: string;
}

export async function fetchNewsApi() {
  const apiKey = process.env.NEWSAPI_KEY;
  if (!apiKey) {
    console.warn("[NewsAPI] NEWSAPI_KEY not set, skipping.");
    return [];
  }

  const results: {
    title: string;
    description: string | null;
    url: string;
    imageUrl: string | null;
    publishedAt: Date;
    source: string;
    sourceFeed: string;
    category: string;
  }[] = [];

  try {
    const query = encodeURIComponent(
      'astronomy OR "space exploration" OR NASA OR ESA OR astrophysics'
    );
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${apiKey}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: NewsApiResponse = await res.json();
    if (data.status !== "ok") throw new Error(`NewsAPI status: ${data.status}`);

    for (const article of data.articles ?? []) {
      if (!article.url || article.title === "[Removed]") continue;
      results.push({
        title: article.title,
        description: article.description ? article.description.slice(0, 500) : null,
        url: article.url,
        imageUrl: article.urlToImage,
        publishedAt: new Date(article.publishedAt),
        source: article.source.name,
        sourceFeed: "https://newsapi.org",
        category: detectCategory(article.title, article.description),
      });
    }
  } catch (err) {
    console.error("[NewsAPI] Fetch failed:", err);
  }

  return results;
}
