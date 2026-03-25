import { prisma } from "@/lib/db";
import { fetchRSSArticles } from "./rss";
import { fetchSpaceflightNews } from "./spaceflightnews";
import { fetchNewsApi } from "./newsapi";

export async function fetchAndStoreArticles() {
  console.log("[Fetcher] Starting article fetch...");

  const [rssResult, spaceflightResult, newsApiResult] = await Promise.allSettled([
    fetchRSSArticles(),
    fetchSpaceflightNews(),
    fetchNewsApi(),
  ]);

  const allArticles = [
    ...(rssResult.status === "fulfilled" ? rssResult.value : []),
    ...(spaceflightResult.status === "fulfilled" ? spaceflightResult.value : []),
    ...(newsApiResult.status === "fulfilled" ? newsApiResult.value : []),
  ];

  console.log(`[Fetcher] Fetched ${allArticles.length} articles total.`);

  if (allArticles.length === 0) return { inserted: 0, total: 0 };

  const deduped = deduplicateByUrl(allArticles);

  const existingUrls = await prisma.article.findMany({
    where: { url: { in: deduped.map((a) => a.url) } },
    select: { url: true },
  });
  const existingSet = new Set(existingUrls.map((a) => a.url));
  const newArticles = deduped.filter((a) => !existingSet.has(a.url));

  if (newArticles.length === 0) {
    console.log("[Fetcher] No new articles.");
    return { inserted: 0, total: allArticles.length };
  }

  const result = await prisma.article.createMany({ data: newArticles });

  console.log(`[Fetcher] Inserted ${result.count} new articles.`);
  return { inserted: result.count, total: allArticles.length };
}

function deduplicateByUrl<T extends { url: string }>(articles: T[]): T[] {
  const seen = new Set<string>();
  return articles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
}
