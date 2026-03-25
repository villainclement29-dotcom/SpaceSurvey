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
      <input
        type="text"
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        suppressHydrationWarning
        style={{
          width: "100%",
          padding: "10px 16px",
          background: "#000000",
          border: "1px solid #333333",
          borderRadius: "8px",
          color: "#ffffff",
          fontSize: "0.9rem",
          outline: "none",
        }}
      />
    </div>
  );
}
