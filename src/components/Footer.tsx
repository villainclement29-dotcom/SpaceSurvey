"use client";

import { useTranslations } from "next-intl";

const SOURCES = [
  { name: "NASA", url: "https://www.nasa.gov" },
  { name: "ESA", url: "https://www.esa.int" },
  { name: "SpaceNews", url: "https://spacenews.com" },
  { name: "ArXiv", url: "https://arxiv.org" },
  { name: "Sky & Telescope", url: "https://www.skyandtelescope.com" },
  { name: "Spaceflight News API", url: "https://api.spaceflightnewsapi.net" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tAbout = useTranslations("about");

  return (
    <footer style={{ background: "#0d0c1d", borderTop: "1px solid #474973", color: "#474973" }}
      className="px-6 py-10 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div style={{ color: "#f1dac4", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              🌌 Space Veille
            </div>
            <p style={{ fontSize: "0.85rem" }}>{t("tagline")}</p>
          </div>

          <div>
            <p style={{ color: "#f1dac4", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.5 }}>
              {tAbout("sources")}
            </p>
            <div className="flex flex-wrap gap-3">
              {SOURCES.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "0.8rem", color: "#474973", textDecoration: "none" }}
                  className="hover:opacity-80 transition-opacity">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #474973", marginTop: "2rem", paddingTop: "1.5rem", fontSize: "0.75rem", textAlign: "center" }}>
          © {new Date().getFullYear()} Space Veille — {t("rights")}
        </div>
      </div>
    </footer>
  );
}
