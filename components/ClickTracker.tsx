"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

function audienceOf(text: string) {
  const t = text.toLowerCase();
  if (t.includes("woman entrepreneur")) return "women";
  if (t.includes("i'm a parent")) return "kids";
  if (t.includes("working professional")) return "professionals";
  return "general";
}

export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.(
        'a[href^="https://wa.me/"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;

      let text = "";
      try {
        text = new URL(a.href).searchParams.get("text") ?? "";
      } catch {
        // ignore malformed URLs
      }

      const host = a.closest("header, footer, section");
      const location =
        host?.tagName === "HEADER"
          ? "nav"
          : host?.tagName === "FOOTER"
          ? "footer"
          : host?.id || "unknown";

      const course = text.match(/I'm interested in (.+?)\.?$/);

      track("whatsapp_click", {
        audience: audienceOf(text),
        course: course ? course[1] : "none",
        location,
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}