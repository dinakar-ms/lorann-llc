/**
 * B2C Database sub-page hero photos
 * Covers: 1 hub + 10 category pages = 11 unique photos
 *
 * getB2CDatabaseIllustration() walks slugParts right-to-left so the deepest
 * matching slug wins (leaf beats hub).
 *
 * People photos use `crop=faces,top` + `object-top` to keep faces visible.
 * Scene/landscape photos use `crop=entropy` + `object-center` for the best
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
        quality={65}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-500/8 pointer-events-none" />
    </div>
  );
}

/* ─── Photo map ───────────────────────────────────────────────────────────── */

const PHOTOS: Record<string, { src: string; alt: string; hasPeople?: boolean }> = {

  /* ── B2C Database hub ───────────────────────────────────────────────── */
  "b2c-database": {
    src: "https://images.unsplash.com/photo-1550177977-ad69e8f3cae0",
    alt: "Diverse crowd of consumers gathering at a vibrant public space representing broad B2C market reach",
    hasPeople: true,
  },

  /* ── Category pages ─────────────────────────────────────────────────── */
  "real-estate": {
    src: "https://images.unsplash.com/photo-1758304480340-cb2c43aafd4f",
    alt: "Aerial view of a sunny suburban neighborhood with tree-lined streets and residential homes for sale",
  },
  "automotive": {
    src: "https://images.unsplash.com/flagged/photo-1559701711-8a7d94a4365e",
    alt: "Happy family posing together in front of their newly purchased car at a dealership lot",
    hasPeople: true,
  },
  "education-edtech": {
    src: "https://plus.unsplash.com/premium_photo-1661630811515-040a35ef8755",
    alt: "Female student learning online at home with a laptop and stack of books in a bright living room",
    hasPeople: true,
  },
  "healthcare-wellness": {
    src: "https://images.unsplash.com/photo-1761035190790-aa1a3472f7fc",
    alt: "Group of people practicing yoga in a bright studio space promoting health and wellness lifestyle",
    hasPeople: true,
  },
  "financial-services": {
    src: "https://images.unsplash.com/photo-1758526213756-9aecbea6bcfc",
    alt: "Woman checking mobile banking app on smartphone while holding a credit card for personal finance",
    hasPeople: true,
  },
  "retail-ecommerce": {
    src: "https://plus.unsplash.com/premium_photo-1701108264933-840b8dcbdaac",
    alt: "Young woman browsing on her smartphone while shopping inside a modern clothing retail store",
    hasPeople: true,
  },
  "dtc-cpg": {
    src: "https://images.unsplash.com/photo-1760463921956-b21cfa5cb2ac",
    alt: "Brightly lit supermarket aisle with neatly stocked shelves of packaged consumer goods and products",
  },
  "travel": {
    src: "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c",
    alt: "Iconic Santorini village with white-washed houses and windmills glowing at golden hour in Greece",
  },
  "telecommunications": {
    src: "https://images.unsplash.com/photo-1712002641088-9d76f9080889",
    alt: "Person holding a modern smartphone in hand representing mobile connectivity and telecommunications services",
    hasPeople: true,
  },
  "home-services": {
    src: "https://plus.unsplash.com/premium_photo-1726761625778-1d13ba956d13",
    alt: "Professional plumber repairing a kitchen sink performing home maintenance and repair services",
    hasPeople: true,
  },
};

/* ─── Exported helper ────────────────────────────────────────────────────── */

export function getB2CDatabaseIllustration(slugParts: string[]): ReactNode | null {
  if (!slugParts.includes("b2c-database")) return null;
  for (let i = slugParts.length - 1; i >= 0; i--) {
    const entry = PHOTOS[slugParts[i]];
    if (entry) {
      return <HeroPhoto src={entry.src} alt={entry.alt} hasPeople={entry.hasPeople} />;
    }
  }
  return null;
}
