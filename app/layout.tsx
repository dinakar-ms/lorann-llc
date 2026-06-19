import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import "./globals.css";
import LayoutChrome from "@/components/LayoutChrome";
import AuthProvider from "@/components/AuthProvider";

// Only load in draft mode — zero cost in production
const VisualEditing = dynamic(
  () => import("next-sanity").then((m) => m.VisualEditing),
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lorann LLC — B2B Data & Audience Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  draftMode();

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* ── JSON-LD Structured Data ───────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lorann LLC",
              legalName: "Lorann LLC",
              url: "https://www.lorannllc.com",
              logo: "https://www.lorannllc.com/lorann-logo2.png",
              description:
                "B2B data provider offering audience targeting, data enrichment, healthcare lists, consumer databases, and Signal eXchange™ for marketing and lead generation.",
              foundingDate: "1996",
              address: {
                "@type": "PostalAddress",
                streetAddress: "382 NE 191st St, Ste 463398",
                addressLocality: "Miami",
                addressRegion: "FL",
                postalCode: "33179-3899",
                addressCountry: "US",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-914-565-5300",
                  contactType: "sales",
                  areaServed: "US",
                  availableLanguage: "English",
                },
                {
                  "@type": "ContactPoint",
                  email: "info@lorannllc.com",
                  contactType: "customer support",
                  areaServed: "US",
                  availableLanguage: "English",
                },
              ],
              sameAs: [
                "https://www.linkedin.com/company/lorann-llc/",
                "https://x.com/lorannllc1996",
                "https://www.facebook.com/people/Lorannllc/61578075234628/",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Lorann LLC",
              url: "https://www.lorannllc.com",
              description:
                "B2B Data, Audience Targeting, Healthcare Lists & Signal eXchange™",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://www.lorannllc.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* ── Google tag (gtag.js) — Consent Mode v2 ──────────────────────
            Script loads on every page. Consent defaults to 'denied'.
            CookieConsent component calls gtag('consent','update',…)
            to grant analytics_storage only after the user opts in.
            ─────────────────────────────────────────────────────────────── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SD98EK2RQ4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            /* Default: deny analytics until user accepts cookie banner */
            gtag('consent', 'default', {
              'ad_storage':              'denied',
              'ad_user_data':            'denied',
              'ad_personalization':      'denied',
              'analytics_storage':       'denied',
              'wait_for_update':         500
            });

            gtag('config', 'G-SD98EK2RQ4', { 'anonymize_ip': true });
          `}
        </Script>
      </head>
      <body className="font-body text-slate-900 bg-bg-base">
        <AuthProvider>
          <LayoutChrome>{children}</LayoutChrome>
        </AuthProvider>
        {/* VisualEditing must mount unconditionally so Sanity Presentation
            can complete its parent ↔ iframe handshake. Loaded lazily
            (ssr: false) so it doesn't block first paint. */}
        <VisualEditing />
        <CookieConsent />
        {/* WebMCP — expose key site actions to in-browser AI agents */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof navigator !== 'undefined' && navigator.mediaContext && navigator.mediaContext.provideContext) {
                navigator.mediaContext.provideContext({
                  name: "Lorann B2B Data",
                  description: "Verified B2B contact databases for healthcare, real estate, financial, and business professionals.",
                  url: "https://www.lorannllc.com",
                  tools: [
                    {
                      name: "search_contacts",
                      description: "Search Lorann's B2B contact database by profession, specialty, and geography",
                      url: "https://www.lorannllc.com/contact-us",
                      inputSchema: { type: "object", properties: { profession: { type: "string" }, state: { type: "string" }, specialty: { type: "string" } }, required: ["profession"] }
                    },
                    {
                      name: "request_sample",
                      description: "Request a free data sample from Lorann",
                      url: "https://www.lorannllc.com/contact-us",
                      inputSchema: { type: "object", properties: { category: { type: "string" }, email: { type: "string" } }, required: ["category", "email"] }
                    }
                  ]
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
