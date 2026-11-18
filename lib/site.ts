type Timing = { label: string; value: string };

export const SITE: {
  name: string;
  city: string;
  parent: string;
  whatsapp: string;
  address: string | null;
  mapQuery: string | null;
  timings: Timing[] | null;
} = {
  name: "WINGS",
  city: "Bhavnagar",
  parent: "Vedhaan Technology",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919773291162",

  // Fill these in when you have them.
  // address: "103, Example Complex, Ring Road, Bhavnagar"
  address: "103, First Floor, Krushnakunj Complex, Opp. New Malhar Dhosa, Ring Road, Bhavnagar - 364001",
  // Optional: what Google Maps should search. Falls back to the address.
  mapQuery: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.9951337836046!2d72.1602622628455!3d21.741714351547998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f5b8c89e884fb%3A0x6c46275d4c0fc58f!2sVedhaan%20Technology!5e0!3m2!1sen!2sin!4v1794980771231!5m2!1sen!2sin",
  // timings: [{ label: "Kids batches", value: "Mon to Fri, 4 pm to 7 pm" }]
  timings: null,
};

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const IS_DEV = process.env.NODE_ENV !== "production";

export const SHOW_FIND_US = IS_DEV || Boolean(SITE.address || SITE.timings);

function mapQuery() {
  return SITE.mapQuery ?? SITE.address;
}

export function mapEmbedUrl() {
  const q = mapQuery();
  if (!q) return null;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
}

export function directionsUrl() {
  const q = mapQuery();
  if (!q) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
}

export type Audience = "general" | "kids" | "professionals";

const MESSAGES: Record<Audience, string> = {
  general: "Hi WINGS, I'd like to know more about your courses.",
  kids: "Hi WINGS, I'm a parent and I'd like to know about the kids courses.",
  professionals:
    "Hi WINGS, I'm a working professional and I'd like to know about your courses.",
};

export function waLink(audience: Audience = "general", extra?: string) {
  const text = extra ? `${MESSAGES[audience]} ${extra}` : MESSAGES[audience];
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}