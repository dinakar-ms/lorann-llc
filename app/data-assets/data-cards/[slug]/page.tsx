import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import DataCardDetail from "@/components/sections/DataCardDetail";
import type { FullDataCard } from "@/components/sections/DataCardDetail";

/* ── Helpers ───────────────────────────────────────────── */
function nameToSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const allFieldsQuery = groq`*[_type == "dataCard"] | order(name asc) {
  name, universe, lastUpdated, category,
  description,
  postalRecords, phoneNumbers, emailAddresses,
  postalCpm, phoneCpm, emailCpm,
  popularity, cardQuality, market, dataType, source,
  geo, genderMale, genderFemale,
  selects,
  minimumOrder, minimumPrice, netNamePercent,
  brokerCommission, agencyCommission,
  exchangeAvailable, reuseAvailable,
  emailDeliveryFee, ftpDeliveryFee,
  marketEntryDate, nextUpdateDate, frequency
}`;

/* ── Static params ─────────────────────────────────────── */
export async function generateStaticParams() {
  const cards = await sanityFetch<{ name: string }[] | null>({
    query: groq`*[_type == "dataCard"]{ name }`,
    tags: ["dataCard"],
  });
  if (!cards) return [];
  return cards.map((c) => ({ slug: nameToSlug(c.name) }));
}

/* ── Metadata ──────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cards = await sanityFetch<{ name: string; universe: number }[] | null>({
    query: groq`*[_type == "dataCard"]{ name, universe }`,
    tags: ["dataCard"],
  });
  const card = cards?.find((c) => nameToSlug(c.name) === params.slug);
  if (!card) return { title: "Data Card Not Found" };
  return {
    title: `${card.name} Data Card · Lorann LLC`,
    description: `Access ${new Intl.NumberFormat("en-US").format(card.universe)}+ verified ${card.name.toLowerCase()} contacts. Explore universe size, selects, and activation channels.`,
  };
}

/* ── Page ──────────────────────────────────────────────── */
export default async function DataCardPage({ params }: { params: { slug: string } }) {
  const allCards = await sanityFetch<FullDataCard[] | null>({
    query: allFieldsQuery,
    tags: ["dataCard"],
  });

  if (!allCards) notFound();

  const card = allCards.find((c) => nameToSlug(c.name) === params.slug);
  if (!card) notFound();

  const fmtDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    } catch { return d; }
  };

  // Format dates
  const formattedCard = {
    ...card,
    lastUpdated: fmtDate(card.lastUpdated),
    marketEntryDate: card.marketEntryDate ? fmtDate(card.marketEntryDate) : undefined,
    nextUpdateDate: card.nextUpdateDate ? fmtDate(card.nextUpdateDate) : undefined,
  };

  const related = allCards
    .filter((c) => c.category === card.category && c.name !== card.name)
    .slice(0, 6)
    .map((c) => ({
      name: c.name,
      universe: c.universe,
      lastUpdated: fmtDate(c.lastUpdated),
      category: c.category,
      slug: nameToSlug(c.name),
    }));

  return (
    <DataCardDetail
      card={formattedCard}
      relatedCards={related}
      totalCards={allCards.length}
    />
  );
}
