export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;

  // lets you verify events locally without GA
  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics]", event, params);
  }

  window.gtag?.("event", event, params);
}