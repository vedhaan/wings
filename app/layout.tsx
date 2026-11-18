import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import Analytics from "@/components/Analytics";
import ClickTracker from "@/components/ClickTracker";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const TITLE = "WINGS | Coding, AI and Digital Skills Academy in Bhavnagar";
const DESCRIPTION =
  "Coding, AI, web development and digital marketing classes in Bhavnagar for school students and working professionals. An initiative of Vedhaan Technology.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | WINGS" },
  description: DESCRIPTION,
  applicationName: "WINGS",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "WINGS",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#14183F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
        <JsonLd />
        <Analytics />
        <ClickTracker />
      </body>
    </html>
  );
}