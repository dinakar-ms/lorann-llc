/**
 * Other-Industry sub-page hero photos
 * Covers: 1 hub + 10 leaf pages = 11 unique photos
 *
 * getOtherIndustryIllustration() walks slugParts right-to-left so the
 * deepest matching slug wins.
 */
import Image from "next/image";
import type { ReactNode } from "react";

interface HeroPhotoProps {
  src: string;
  alt: string;
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

  /* ── Other-Industry hub ─────────────────────────────────────────────── */
  "other-industry": {
    src: "https://images.unsplash.com/photo-1493134799591-2c9eed26201a",
    alt: "Chicago city skyline representing diverse industry business sectors",
  },

  /* ── Leaf pages ─────────────────────────────────────────────────────── */
  "it-decision-makers-mailing-list": {
    src: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
    alt: "IT decision maker working on Surface laptop for strategic technology decisions",
    hasPeople: true,
  },
  "construction-industry-email-list": {
    src: "https://plus.unsplash.com/premium_photo-1681691912442-68c4179c530c",
    alt: "Construction project team reviewing plans on active building site",
    hasPeople: true,
  },
  "agriculture-industry-email-lists": {
    src: "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814",
    alt: "Green corn and maize crops on expansive agricultural farming field",
  },
  "sports-industry-email-lists": {
    src: "https://images.unsplash.com/photo-1629217855633-79a6925d6c47",
    alt: "Packed soccer stadium at kickoff representing the professional sports industry",
  },
  "banking-finance-email-lists": {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    alt: "Financial district city skyscrapers representing banking and finance sector",
  },
  "hotels-email-lists": {
    src: "https://images.unsplash.com/photo-1621293954908-907159247fc8",
    alt: "Modern luxury hotel lobby with designer furniture and premium wood walls",
  },
  "insurance-contact-lists": {
    src: "https://plus.unsplash.com/premium_photo-1661776260388-f5d1b14ce8a2",
    alt: "Estate agent handing over house model representing property insurance protection",
    hasPeople: true,
  },
  "travel-data-lists": {
    src: "https://images.unsplash.com/photo-1504150558240-0b4fd8946624",
    alt: "Traveler with luggage in busy airport terminal departure lounge",
    hasPeople: true,
  },
  "real-estate-data-list": {
    src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
    alt: "Glass-walled modern high-rise commercial real estate building exterior",
  },
  "manufacturing-industry-email-lists": {
    src: "https://plus.unsplash.com/premium_photo-1682144748274-add3d8ed04ea",
    alt: "Automobile production line with robotic welding at modern manufacturing plant",
  },
};

/* ─── Exported helper ────────────────────────────────────────────────────── */

export function getOtherIndustryIllustration(slugParts: string[]): ReactNode | null {
  if (!slugParts.includes("other-industry")) return null;
  for (let i = slugParts.length - 1; i >= 0; i--) {
    const entry = PHOTOS[slugParts[i]];
    if (entry) {
      return <HeroPhoto src={entry.src} alt={entry.alt} hasPeople={entry.hasPeople} />;
    }
  }
  return null;
}
