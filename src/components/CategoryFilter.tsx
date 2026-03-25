"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/types/article";

export default function CategoryFilter() {
  const t = useTranslations("categories");
  const tHome = useTranslations("home");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "all";

  function handleClick(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const all = [{ slug: "all" as const, label: tHome("allCategories") }, ...CATEGORIES.map((c) => ({ slug: c.slug, label: t(c.slug) }))];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map(({ slug, label }) => {
        const isActive = slug === current;
        return (
          <button
            key={slug}
            onClick={() => handleClick(slug)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: 500,
              border: "1px solid",
              cursor: "pointer",
              transition: "all 0.15s",
              background: isActive ? "rgba(99,102,241,0.2)" : "transparent",
              color: isActive ? "#818cf8" : "#64748b",
              borderColor: isActive ? "rgba(99,102,241,0.5)" : "#1e1e4a",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
