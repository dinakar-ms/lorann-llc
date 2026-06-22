/**
 * About section sub-page hero photos
 * Covers: 1 hub + 4 leaf pages = 5 unique photos
 *
 * getAboutIllustration() walks slugParts right-to-left so the deepest
 * matching slug wins (leaf beats hub).
 *
 * People photos use `crop=faces,top` + `object-top` to keep faces visible.
 * Architecture/scene photos use `crop=entropy` + `object-center` for the
 * best auto-selected region.
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

  /* ── About hub ──────────────────────────────────────────────────────── */
  "about": {
    src: "https://plus.unsplash.com/premium_photo-1661494398704-684e8a436a26",
    alt: "Business professionals analyzing marketing data reports together at a modern corporate office conference table",
    hasPeople: true,
  },

  /* ── Leaf pages ─────────────────────────────────────────────────────── */
  "company-overview": {
    src: "https://images.unsplash.com/photo-1757954694963-ea693d2cb1dc",
    alt: "Modern glass office building exterior showcasing contemporary corporate architecture and reflective facade panels",
  },
  "our-approach": {
    src: "https://images.unsplash.com/photo-1758873268998-2f77c2d38862",
    alt: "Business team collaborating around a whiteboard during a strategic planning and methodology session in a bright modern office",
    hasPeople: true,
  },
  "meet-the-team": {
    src: "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5",
    alt: "Diverse group of business professionals discussing a project together at a conference table in a modern office",
    hasPeople: true,
  },
  "industries-served": {
    src: "https://plus.unsplash.com/premium_photo-1754211603894-547072c84a43",
    alt: "Panoramic Chicago business district skyline representing a diverse multi-sector corporate and metropolitan economy",
  },
};

/* ─── Exported helper ────────────────────────────────────────────────────── */

export function getAboutIllustration(slugParts: string[]): ReactNode | null {
  if (!slugParts.includes("about")) return null;
  for (let i = slugParts.length - 1; i >= 0; i--) {
    const entry = PHOTOS[slugParts[i]];
    if (entry) {
      return <HeroPhoto src={entry.src} alt={entry.alt} hasPeople={entry.hasPeople} />;
    }
  }
  return null;
}
