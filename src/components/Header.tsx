"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: "rgba(13,12,29,0.97)",
        borderBottom: "1px solid #333333",
        backdropFilter: "blur(10px)",
      }}
      className="sticky top-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
            Space Veille
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{
            display: "block", width: "22px", height: "2px", background: "#ffffff",
            transition: "transform 0.2s, opacity 0.2s",
            transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: "22px", height: "2px", background: "#ffffff",
            opacity: menuOpen ? 0 : 1,
            transition: "opacity 0.2s",
          }} />
          <span style={{
            display: "block", width: "22px", height: "2px", background: "#ffffff",
            transition: "transform 0.2s, opacity 0.2s",
            transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
          }} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(13,12,29,0.98)",
            borderBottom: "1px solid #333333",
            backdropFilter: "blur(10px)",
            padding: "1.5rem 1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <Link href="/"
            style={{ color: pathname === "/" ? "#ffffff" : "#94a3b8", fontSize: "1rem" }}
            onClick={() => setMenuOpen(false)}>
            {t("home")}
          </Link>
          <Link href="/archive"
            style={{ color: "#94a3b8", fontSize: "1rem" }}
            onClick={() => setMenuOpen(false)}>
            {t("archive")}
          </Link>
          <Link href="/about"
            style={{ color: "#94a3b8", fontSize: "1rem" }}
            onClick={() => setMenuOpen(false)}>
            {t("about")}
          </Link>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <LocaleLink locale="fr" current={locale} />
            <LocaleLink locale="en" current={locale} />
          </div>
        </div>
      )}
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
