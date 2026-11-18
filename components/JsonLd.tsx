import { SITE, SITE_URL } from "@/lib/site";
import { ABOUT } from "@/lib/about";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE.name,
    url: SITE_URL,
    description:
      "Coding, AI, web development and digital marketing classes for school students and working professionals.",
    areaServed: SITE.city,
    parentOrganization: {
      "@type": "Organization",
      name: ABOUT.company,
      url: ABOUT.url,
    },
    ...(SITE.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: SITE.address,
            addressLocality: SITE.city,
            addressCountry: "IN",
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}