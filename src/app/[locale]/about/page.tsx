import { getTranslations } from "next-intl/server";

export const revalidate = 86400;

interface Props {
  params: Promise<{ locale: string }>;
}

const SOURCES = [
  { name: "NASA", desc: "National Aeronautics and Space Administration", url: "https://www.nasa.gov", category: "Missions / Exploration" },
  { name: "ESA", desc: "European Space Agency", url: "https://www.esa.int", category: "Exploration / Satellites" },
  { name: "SpaceNews", desc: "Independent space industry news", url: "https://spacenews.com", category: "All" },
  { name: "ArXiv (astro-ph)", desc: "Open-access research papers in astrophysics", url: "https://arxiv.org", category: "Research" },
  { name: "Sky & Telescope", desc: "Astronomy news and observing guides", url: "https://www.skyandtelescope.com", category: "Astronomy" },
  { name: "Spaceflight News API", desc: "Aggregated spaceflight news (free)", url: "https://api.spaceflightnewsapi.net", category: "All" },
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 style={{ color: "#818cf8", fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>{t("title")}</h1>
      <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: "3rem", fontSize: "1.05rem" }}>
        {t("description")}
      </p>

      <h2 style={{ color: "#e2e8f0", fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.25rem" }}>
        {t("sources")}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {SOURCES.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
            style={{
              background: "#0f0f2a",
              border: "1px solid #1e1e4a",
              borderRadius: "10px",
              padding: "1rem 1.25rem",
              textDecoration: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
            className="hover:border-indigo-500/40 transition-colors group">
            <div>
              <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.95rem" }} className="group-hover:text-indigo-300 transition-colors">
                {s.name}
              </div>
              <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "2px" }}>{s.desc}</div>
            </div>
            <span style={{ fontSize: "0.75rem", color: "#475569", whiteSpace: "nowrap" }}>{s.category}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
