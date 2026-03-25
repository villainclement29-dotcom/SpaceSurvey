"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header style={{ background: "rgba(13,12,29,0.97)", borderBottom: "1px solid #333333", backdropFilter: "blur(10px)" }}
      className="sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
            Space Veille
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/"
            style={{ color: pathname === "/" ? "#ffffff" : "#94a3b8", fontSize: "0.9rem" }}
            className="transition-colors hover:opacity-80">
            {t("home")}
          </Link>
          <Link href="/archive"
            style={{ color: "#94a3b8", fontSize: "0.9rem" }}
            className="transition-colors hover:opacity-80">
            {t("archive")}
          </Link>
          <Link href="/about"
            style={{ color: "#94a3b8", fontSize: "0.9rem" }}
            className="transition-colors hover:opacity-80">
            {t("about")}
          </Link>

          <div style={{ width: "1px", height: "20px", background: "#333333" }} />

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
        background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
        color: isActive ? "#ffffff" : "#94a3b8",
        border: isActive ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
      className="transition-all"
    >
      {locale}
    </Link>
  );
}
