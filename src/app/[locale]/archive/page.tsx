import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";

export const revalidate = 86400;

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ArchivePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "archive" });

  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 200,
    select: { id: true, title: true, source: true, category: true, publishedAt: true, fetchedAt: true, description: true, url: true, imageUrl: true, sourceFeed: true },
  });

  const dateLocale = locale === "fr" ? fr : enUS;

  const grouped = groupArticlesByDay(articles, dateLocale);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 style={{ color: "#818cf8", fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{t("title")}</h1>
      <p style={{ color: "#64748b", marginBottom: "3rem" }}>{t("subtitle")}</p>

      {grouped.length === 0 ? (
        <p style={{ color: "#475569" }}>{t("noArticles")}</p>
      ) : (
        <div className="flex flex-col gap-10">
          {grouped.map(({ day, articles: dayArticles }) => (
            <div key={day}>
              <div style={{
                color: "#818cf8",
                fontSize: "0.85rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.75rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid #1e1e4a",
              }}>
                {day}
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {dayArticles.map((article) => (
                  <li key={article.id}>
                    <Link href={`/article/${article.id}`}
                      style={{ display: "flex", gap: "1rem", alignItems: "baseline", textDecoration: "none", padding: "6px 0" }}
                      className="group">
                      <span style={{ fontSize: "0.75rem", color: "#475569", whiteSpace: "nowrap" }}>
                        {format(new Date((article as { publishedAt: Date }).publishedAt), "HH:mm")}
                      </span>
                      <span style={{ color: "#e2e8f0", fontSize: "0.9rem", lineHeight: 1.4 }}
                        className="group-hover:text-indigo-300 transition-colors">
                        {article.title}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#475569", whiteSpace: "nowrap", marginLeft: "auto" }}>
                        {article.source}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function groupArticlesByDay(
  articles: { id: string; title: string; source: string; category: string; publishedAt: Date; fetchedAt: Date; description: string | null; url: string; imageUrl: string | null; sourceFeed: string }[],
  dateLocale: typeof fr
) {
  const map = new Map<string, typeof articles>();

  for (const article of articles) {
    const key = format(article.publishedAt, "d MMMM yyyy", { locale: dateLocale });
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(article);
  }

  return Array.from(map.entries()).map(([day, articles]) => ({ day, articles }));
}
