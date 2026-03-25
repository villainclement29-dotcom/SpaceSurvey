"use client";

import { useRef } from "react";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleData } from "@/types/article";

interface Props {
  articles: ArticleData[];
}

export default function TodaySlider({ articles }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "prev" | "next") {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector("a")?.offsetWidth ?? 300;
    trackRef.current.scrollBy({ left: dir === "next" ? cardWidth + 32 : -(cardWidth + 32), behavior: "smooth" });
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Slider track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "2rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          paddingBottom: "4px",
        }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            style={{
              flexShrink: 0,
              width: "clamp(280px, 80vw, 340px)",
              scrollSnapAlign: "start",
            }}
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {/* Nav buttons — hidden on mobile if only 1 card fits */}
      {articles.length > 1 && (
        <div
          className="hidden sm:flex"
          style={{
            justifyContent: "flex-end",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <button onClick={() => scroll("prev")} aria-label="Précédent" style={btnStyle}>
            ←
          </button>
          <button onClick={() => scroll("next")} aria-label="Suivant" style={btnStyle}>
            →
          </button>
        </div>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: "#000000",
  border: "1px solid #333333",
  color: "#ffffff",
  borderRadius: "6px",
  width: "36px",
  height: "36px",
  cursor: "pointer",
  fontSize: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
