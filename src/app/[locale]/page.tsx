import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import type { ArticleData } from "@/types/article";
import { Suspense } from "react";

export const revalidate = 3600;

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}

const PAGE_SIZE = 24;

export default async function HomePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q, category, page } = await searchParams;
  const t = await getTranslations({ locale, namespace: "home" });

  const currentPage = page ? parseInt(page) : 1;
  const skip = (currentPage - 1) * PAGE_SIZE;

  const where = {
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
          ],
        }
      : {}),
    ...(category && category !== "all" ? { category } : {}),
  };

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: PAGE_SIZE,
      skip,
    }),
    prisma.article.count({ where }),
  ]);

  const serialized: ArticleData[] = articles.map((a) => ({
    ...a,
    publishedAt: a.publishedAt.toISOString(),
    fetchedAt: a.fetchedAt.toISOString(),
  }));

  const hasMore = skip + articles.length < total;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 style={{ color: "#818cf8", fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
          {t("title")}
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.05rem" }}>{t("subtitle")}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      <div className="mb-6">
        <Suspense>
          <CategoryFilter />
        </Suspense>
      </div>

      {serialized.length === 0 ? (
        <div style={{ textAlign: "center", color: "#475569", padding: "4rem 0" }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔭</p>
          <p style={{ fontSize: "1.1rem" }}>{t("noResults")}</p>
        </div>
      ) : (
        <>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}
          >
            {serialized.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {hasMore && (
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <a
                href={`?${new URLSearchParams({
                  ...(q ? { q } : {}),
                  ...(category ? { category } : {}),
                  page: String(currentPage + 1),
                }).toString()}`}
                style={{
                  display: "inline-block",
                  padding: "10px 28px",
                  background: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.4)",
                  borderRadius: "8px",
                  color: "#818cf8",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                {t("loadMore")}
              </a>
            </div>
          )}
        </>
      )}

      <div style={{ color: "#475569", fontSize: "0.8rem", marginTop: "2rem", textAlign: "right" }}>
        {total} articles
      </div>
    </div>
  );
}
