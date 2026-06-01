import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import "./globals.css";
import LayoutChrome from "@/components/LayoutChrome";

// Only load in draft mode — zero cost in production
const VisualEditing = dynamic(
  () => import("next-sanity").then((m) => m.VisualEditing),
  { ssr: false }
);
const DisableDraftMode = dynamic(
  () => import("@/components/DisableDraftMode"),
  { ssr: false }
);

// Non-critical — load after first paint
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), {
  ssr: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mailing List | B2B Data | Email Marketing List | LorannLLC",
  description:
    "Enhance your B2B Email Marketing Lists with Lorann LLC's targeted solutions for better lead generation and customer engagement.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  metadataBase: new URL("https://www.lorannllc.com"),
  keywords: [
    "mailing list",
    "B2B data",
    "email marketing list",
    "audience intelligence",
    "Signal eXchange",
    "data enrichment",
    "healthcare data",
    "consumer data",
    "lead generation",
    "Lorann",
  ],
  authors: [{ name: "Lorann LLC" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as any,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  verification: {
    google: "emGsSyokNXarO2PjBA5pFtPhPktAEmPSMp-Ha5OkmNo",
  },
  openGraph: {
    title: "Mailing List | B2B Data | Email Marketing List | LorannLLC",
    description:
      "Enhance your B2B Email Marketing Lists with Lorann LLC's targeted solutions for better lead generation and customer engagement.",
    url: "https://www.lorannllc.com/",
    siteName: "lorannllc",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDraft = draftMode().isEnabled;

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="font-body text-slate-900 bg-bg-base">
        <LayoutChrome>{children}</LayoutChrome>
        {/* Sanity editing tools — ONLY loaded when draft mode is active */}
        {isDraft && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        <CookieConsent />
      </body>
    </html>
  );
}
