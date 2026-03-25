"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

const LANGS = [
  { slug: "fr", labelKey: "langFr" as const },
  { slug: "en", labelKey: "langEn" as const },
];

export default function LangFilter() {
  const t = useTranslations("home");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("lang") ?? "all";

  function handleClick(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("lang");
    } else {
      params.set("lang", slug);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const all = [{ slug: "all", label: t("allLangs") }, ...LANGS.map((l) => ({ slug: l.slug, label: t(l.labelKey) }))];

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
              background: "#000000",
              color: isActive ? "#ffffff" : "#94a3b8",
              borderColor: isActive ? "#ffffff" : "#333333",
            }}
          >
            {slug === "fr" && <span style={{ marginRight: "6px" }}>🇫🇷</span>}
            {slug === "en" && <span style={{ marginRight: "6px" }}>🇬🇧</span>}
            {label}
          </button>
        );
      })}
    </div>
  );
}
