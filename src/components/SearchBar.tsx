"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";

export default function SearchBar() {
  const t = useTranslations("home");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("q", value);
        } else {
          params.delete("q");
        }
        params.delete("page");
        router.push(`${pathname}?${params.toString()}`);
      }, 400);
    },
    [router, pathname, searchParams]
  );

  return (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#475569", fontSize: "1rem" }}>
        🔍
      </span>
      <input
        type="text"
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        style={{
          width: "100%",
          padding: "10px 16px 10px 38px",
          background: "#0f0f2a",
          border: "1px solid #1e1e4a",
          borderRadius: "8px",
          color: "#e2e8f0",
          fontSize: "0.9rem",
          outline: "none",
        }}
      />
    </div>
  );
}
