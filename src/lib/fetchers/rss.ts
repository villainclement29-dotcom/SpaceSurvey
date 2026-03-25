import Parser from "rss-parser";
import { detectCategory } from "@/lib/categories";
import type { FeedSource } from "@/types/article";

export const RSS_SOURCES: FeedSource[] = [
  { name: "NASA", url: "https://www.nasa.gov/news-release/feed/", defaultCategory: "missions" },
  { name: "ESA", url: "https://www.esa.int/rssfeed/TopNews", defaultCategory: "exploration" },
  { name: "SpaceNews", url: "https://spacenews.com/feed/", defaultCategory: "missions" },
  { name: "ArXiv Astrophysics", url: "https://rss.arxiv.org/rss/astro-ph", defaultCategory: "research" },
  { name: "Sky & Telescope", url: "https://www.skyandtelescope.com/astronomy-news/feed/", defaultCategory: "astronomy" },
];

type CustomItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  "media:content"?: { $?: { url?: string } };
  enclosure?: { url?: string };
};

const parser = new Parser<object, CustomItem>({
  customFields: {
    item: [["media:content", "media:content"], "enclosure"],
  },
});

export async function fetchRSSArticles() {
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

  await Promise.allSettled(
    RSS_SOURCES.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.url);
        for (const item of feed.items ?? []) {
          if (!item.title || !item.link) continue;
          const description = item.contentSnippet ?? null;
          const imageUrl =
            item["media:content"]?.["$"]?.url ?? item.enclosure?.url ?? null;
          const publishedAt = item.pubDate
            ? new Date(item.pubDate)
            : new Date();

          results.push({
            title: item.title.trim(),
            description: description ? description.slice(0, 500) : null,
            url: item.link,
            imageUrl,
            publishedAt,
            source: source.name,
            sourceFeed: source.url,
            category: detectCategory(item.title, description) ?? source.defaultCategory,
          });
        }
      } catch (err) {
        console.error(`[RSS] Failed to fetch ${source.name}:`, err);
      }
    })
  );

  return results;
}
