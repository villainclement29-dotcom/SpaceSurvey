import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";

export const revalidate = 86400;

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "article" });
  const tCategories = await getTranslations({ locale, namespace: "categories" });

  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  const dateLocale = locale === "fr" ? fr : enUS;
  const formattedDate = format(article.publishedAt, "d MMMM yyyy", { locale: dateLocale });

  const categoryKeys = ["astronomy","exploration","research","satellites","missions"];
  const safeCategory = categoryKeys.includes(article.category)
    ? (article.category as Parameters<typeof tCategories>[0])
    : ("missions" as Parameters<typeof tCategories>[0]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link href="/"
        style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "0.875rem", textDecoration: "none", marginBottom: "2rem" }}
        className="hover:text-indigo-400 transition-colors">
        ← {t("back")}
      </Link>

      <div className="mb-4 flex items-center gap-3">
        <span className={`badge-${article.category} text-xs px-3 py-1 rounded border font-medium`}>
          {tCategories(safeCategory)}
        </span>
        <span style={{ color: "#475569", fontSize: "0.8rem" }}>{article.source}</span>
      </div>

      <h1 style={{ color: "#e2e8f0", fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "1rem" }}>
        {article.title}
      </h1>

      <div style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "2rem" }}>
        {t("publishedOn")} {formattedDate}
      </div>

      {article.imageUrl && (
        <div style={{ borderRadius: "12px", overflow: "hidden", marginBottom: "2rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.imageUrl} alt={article.title}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} />
        </div>
      )}

      {article.description && (
        <div style={{
          background: "#0f0f2a",
          border: "1px solid #1e1e4a",
          borderRadius: "12px",
          padding: "1.5rem",
          color: "#94a3b8",
          lineHeight: 1.7,
          fontSize: "1rem",
          marginBottom: "2rem",
        }}>
          {article.description}
        </div>
      )}

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 24px",
          background: "rgba(99,102,241,0.15)",
          border: "1px solid rgba(99,102,241,0.4)",
          borderRadius: "8px",
          color: "#818cf8",
          fontWeight: 500,
          textDecoration: "none",
          fontSize: "0.95rem",
        }}
      >
        {t("readOriginal")} ↗
      </a>
    </div>
  );
}
