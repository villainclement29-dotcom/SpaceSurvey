"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatDistanceToNow } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import type { ArticleData } from "@/types/article";

interface Props {
  article: ArticleData;
}

function CategoryBadge({ category }: { category: string }) {
  const t = useTranslations("categories");
  const safeCategory = ["astronomy","exploration","research","satellites","missions"].includes(category)
    ? (category as Parameters<typeof t>[0])
    : ("missions" as Parameters<typeof t>[0]);
  return (
    <span className={`badge-${category} text-xs px-2 py-0.5 rounded border font-medium`}
      style={{ display: "inline-block" }}>
      {t(safeCategory)}
    </span>
  );
}

export default function ArticleCard({ article }: Props) {
  const locale = useLocale();
  const dateLocale = locale === "fr" ? fr : enUS;
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
    locale: dateLocale,
  });

  return (
    <Link href={`/article/${article.id}`}
      className="card-glow block group"
      style={{
        background: "#0f0f2a",
        border: "1px solid #1e1e4a",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "border-color 0.2s",
        textDecoration: "none",
      }}
    >
      {article.imageUrl && (
        <div style={{ height: "160px", overflow: "hidden", background: "#0a0a1e" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.imageUrl}
            alt={article.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
            loading="lazy"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CategoryBadge category={article.category} />
          <span style={{ fontSize: "0.75rem", color: "#475569", whiteSpace: "nowrap" }}>{timeAgo}</span>
        </div>

        <h2
          style={{ color: "#e2e8f0", fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.4, marginBottom: "0.5rem" }}
          className="group-hover:text-indigo-300 transition-colors line-clamp-3"
        >
          {article.title}
        </h2>

        {article.description && (
          <p style={{ color: "#64748b", fontSize: "0.8rem", lineHeight: 1.5 }} className="line-clamp-2">
            {article.description}
          </p>
        )}

        <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "#475569", fontWeight: 500 }}>
          {article.source}
        </div>
      </div>
    </Link>
  );
}
