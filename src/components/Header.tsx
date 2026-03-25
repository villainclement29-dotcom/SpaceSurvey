"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header style={{ background: "rgba(8,8,24,0.95)", borderBottom: "1px solid #1e1e4a", backdropFilter: "blur(10px)" }}
      className="sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span style={{ fontSize: "1.5rem" }}>🌌</span>
          <span style={{ color: "#818cf8", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
            Space Veille
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/"
            style={{ color: pathname === "/" ? "#818cf8" : "#94a3b8", fontSize: "0.9rem" }}
            className="hover:text-indigo-400 transition-colors">
            {t("home")}
          </Link>
          <Link href="/archive"
            style={{ color: "#94a3b8", fontSize: "0.9rem" }}
            className="hover:text-indigo-400 transition-colors">
            {t("archive")}
          </Link>
          <Link href="/about"
            style={{ color: "#94a3b8", fontSize: "0.9rem" }}
            className="hover:text-indigo-400 transition-colors">
            {t("about")}
          </Link>

          <div style={{ width: "1px", height: "20px", background: "#1e1e4a" }} />

          <div className="flex gap-2">
            <LocaleLink locale="fr" current={locale} />
            <LocaleLink locale="en" current={locale} />
          </div>
        </nav>
      </div>
    </header>
  );
}

function LocaleLink({ locale, current }: { locale: string; current: string }) {
  const pathname = usePathname();
  const isActive = locale === current;
  return (
    <Link
      href={pathname}
      locale={locale as "fr" | "en"}
      style={{
        fontSize: "0.8rem",
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: "4px",
        background: isActive ? "rgba(99,102,241,0.2)" : "transparent",
        color: isActive ? "#818cf8" : "#64748b",
        border: isActive ? "1px solid rgba(99,102,241,0.4)" : "1px solid transparent",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
      className="transition-all hover:border-indigo-500/40"
    >
      {locale}
    </Link>
  );
}
