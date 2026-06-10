/**
 * Insights section sub-page hero photos
 * Covers: hub + industry-trends sub-hub + individual articles (generic) +
 *         case-studies + newsletter = 5 unique photos
 *
 * getInsightsIllustration() walks slugParts right-to-left so the deepest
 * matching slug wins (leaf beats hub).
 *
 * People photos use `crop=faces,top` + `object-top` to keep faces visible.
 * Scene/concept photos use `crop=entropy` + `object-center` for the best
 * auto-selected region.
 */
import Image from "next/image";
import type { ReactNode } from "react";

interface HeroPhotoProps {
  src: string;
  alt: string;
  /** Use face-detection crop for images containing people */
  hasPeople?: boolean;
}

function HeroPhoto({ src, alt, hasPeople }: HeroPhotoProps) {
  const crop = hasPeople ? "crop=faces,top&" : "crop=entropy&";
  const url = `${src}?auto=format&fit=crop&${crop}w=800&q=85`;
  return (
    <div className="relative w-full aspect-[4/3]">
      <Image
        src={url}
        alt={alt}
        fill
        className={`object-cover ${hasPeople ? "object-top" : "object-center"}`}
        sizes="(max-width: 1024px) 0px, 44vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-500/8 pointer-events-none" />
    </div>
  );
}

/* ─── Photo map ───────────────────────────────────────────────────────────── */

const PHOTOS: Record<string, { src: string; alt: string; hasPeople?: boolean }> = {

  /* ── Insights hub ───────────────────────────────────────────────────── */
  /* A data/analytics dashboard on screen — directly represents
     "data-driven insights & strategic perspectives" content hub           */
  "insights": {
    src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    alt: "Business data analytics dashboard with charts and KPI metrics on a laptop screen representing marketing insights and strategic reporting",
  },

  /* ── Industry Trends sub-hub ────────────────────────────────────────── */
  /* Upward-trending market/stock chart lines — directly represents
     "industry trend analysis" and rising market data                      */
  "industry-trends": {
    src: "https://images.unsplash.com/photo-1543286386-2e659306cd6c",
    alt: "Stock market trend chart with rising data lines on a screen representing industry performance trends and market intelligence analysis",
  },

  /* ── Individual article pages (generic fallback) ────────────────────── */
  /* Person focused on reading content on laptop — represents
     actively consuming a data strategy article                            */
  "article": {
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
    alt: "Professional reading a data strategy article on a laptop at a clean modern desk representing focused digital content consumption",
    hasPeople: true,
  },

  /* ── Case Studies ───────────────────────────────────────────────────── */
  /* Team presenting campaign results on screen — directly represents
     "how data performs in real campaigns" with measurable outcomes        */
  "case-studies": {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
    alt: "Business team in a boardroom reviewing campaign performance results and ROI data on a presentation screen for case study outcomes",
    hasPeople: true,
  },

  /* ── Newsletter ─────────────────────────────────────────────────────── */
  /* Laptop with email/inbox interface open — directly represents
     "periodic insights delivered to your inbox" newsletter subscription   */
  "newsletter": {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    alt: "Laptop screen showing an open email inbox with newsletter messages representing curated marketing insights delivered to subscribers",
  },
};

/* ─── Exported helper ────────────────────────────────────────────────────── */

export function getInsightsIllustration(slugParts: string[]): ReactNode | null {
  if (!slugParts.includes("insights")) return null;
  for (let i = slugParts.length - 1; i >= 0; i--) {
    const entry = PHOTOS[slugParts[i]];
    if (entry) {
      return <HeroPhoto src={entry.src} alt={entry.alt} hasPeople={entry.hasPeople} />;
    }
  }
  return null;
}
