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
        quality={65}
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
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
    alt: "CIO and senior IT executive leading enterprise technology strategy in modern corporate setting representing IT decision-makers and technology leadership",
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
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    alt: "Elite professional athlete competing at peak performance representing the global sports industry business and events ecosystem",
  },
  "banking-finance-email-lists": {
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
    alt: "Financial analyst reviewing live stock market trading data and banking analytics on multiple screens",
  },
  "hotels-email-lists": {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    alt: "Pristine luxury hotel infinity pool overlooking tropical landscape representing premium hotel and hospitality industry professionals",
  },
  "insurance-contact-lists": {
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    alt: "Insurance professional reviewing policyholder coverage documents representing insurance agents, brokers, and underwriters",
    hasPeople: true,
  },
  "travel-data-lists": {
    src: "https://images.unsplash.com/photo-1504150558240-0b4fd8946624",
    alt: "Traveler with luggage in busy airport terminal departure lounge",
    hasPeople: true,
  },
  "real-estate-data-list": {
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    alt: "Premium residential property with manicured landscaping representing real estate agents, brokers, and property professionals contact data",
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
