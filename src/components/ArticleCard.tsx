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
    <span className={`badge-${category} text-xs px-2 py-0.5 border font-medium`}
      style={{ display: "inline-block", borderRadius: "4px" }}>
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
        background: "#000000",
        border: "1px solid #474973",
        borderRadius: "6px",
        overflow: "hidden",
        transition: "border-color 0.2s",
        textDecoration: "none",
      }}
    >
      <div style={{ height: "160px", overflow: "hidden", background: "#0d0c1d", flexShrink: 0 }}>
        {article.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.imageUrl}
            alt={article.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
            loading="lazy"
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #0d0c1d 0%, #161b33 40%, #2f004f 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            opacity: 0.6,
          }}>
            🔭
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <CategoryBadge category={article.category} />
          <span style={{ fontSize: "0.75rem", color: "#474973", whiteSpace: "nowrap" }}>{timeAgo}</span>
        </div>

        <h2
          style={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.45, marginBottom: "0.6rem" }}
          className="group-hover:opacity-75 transition-opacity line-clamp-3"
        >
          {article.title}
        </h2>

        {article.description && (
          <p style={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.55 }} className="line-clamp-2">
            {article.description}
          </p>
        )}

        <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#474973", fontWeight: 500, letterSpacing: "0.03em" }}>
          {article.source}
        </div>
      </div>
    </Link>
  );
}
