/**
 * Solutions sub-page hero photos
 * Covers: 1 hub + 5 leaf pages = 6 unique photos
 *
 * getSolutionsIllustration() walks slugParts right-to-left so the deepest
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
        quality={65}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-500/8 pointer-events-none" />
    </div>
  );
}

/* ─── Photo map ───────────────────────────────────────────────────────────── */

const PHOTOS: Record<string, { src: string; alt: string; hasPeople?: boolean }> = {

  /* ── Solutions hub ──────────────────────────────────────────────────── */
  "solutions": {
    src: "https://plus.unsplash.com/premium_photo-1661693870771-dbbd8b95b2b1",
    alt: "Business team reviews analytics charts and graphs on a tablet during a strategic marketing planning session",
    hasPeople: true,
  },

  /* ── Solution leaf pages ────────────────────────────────────────────── */
  "audience-targeting": {
    src: "https://plus.unsplash.com/premium_photo-1682126196145-d23f2022a8dd",
    alt: "Business analyst studies key performance indicator dashboard on computer screen in a modern office for audience data analysis",
    hasPeople: true,
  },
  "data-enrichment": {
    src: "https://plus.unsplash.com/premium_photo-1671461774955-7aab3ab41b90",
    alt: "Hand pointing at a spreadsheet with detailed data columns on a computer screen representing contact record enrichment",
    hasPeople: true,
  },
  "signal-exchange": {
    src: "https://plus.unsplash.com/premium_photo-1681399975135-252eab5fd2db",
    alt: "Abstract 3D network of glowing nodes and connecting lines representing digital data exchange and intent signal transmission across platforms",
  },
  "data-activation": {
    src: "https://plus.unsplash.com/premium_photo-1733306503329-7a8c701fa9ad",
    alt: "Marketing professional works on laptop with email campaign and marketing automation workflow interface for multichannel data activation",
    hasPeople: true,
  },
  "cost-per-lead": {
    src: "https://images.unsplash.com/photo-1762330464824-21e95b769038",
    alt: "LinkedIn ads campaign manager interface on laptop showing ad performance metrics and lead generation results for cost-per-lead optimization",
  },
};

/* ─── Exported helper ────────────────────────────────────────────────────── */

export function getSolutionsIllustration(slugParts: string[]): ReactNode | null {
  if (!slugParts.includes("solutions")) return null;
  for (let i = slugParts.length - 1; i >= 0; i--) {
    const entry = PHOTOS[slugParts[i]];
    if (entry) {
      return <HeroPhoto src={entry.src} alt={entry.alt} hasPeople={entry.hasPeople} />;
    }
  }
  return null;
}
