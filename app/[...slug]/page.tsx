import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { pageBySlugQuery, allPageSlugsQuery } from "@/sanity/lib/queries";
import PortableContent from "@/components/PortableContent";

type PageDoc = {
  _id: string;
  h1: string;
  slug: string;
  heroImage?: { asset?: any; alt?: string } | null;
  content?: any;
  focusKeyphrase?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  schemaMarkup?: string;
  noIndex?: boolean;
};

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(allPageSlugsQuery);
    return slugs.map((slug) => ({ slug: slug.split("/") }));
  } catch {
    return [];
  }
}

function paramsToPath(slug: string[] | undefined): string {
  return (slug || []).join("/");
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const path = paramsToPath(params.slug);
  const page = await sanityFetch<PageDoc | null>({
    query: pageBySlugQuery,
    params: { slug: path },
    tags: [`page:${path}`],
  });

  if (!page) return {};

  const title = page.metaTitle || page.h1;
  const description = page.metaDescription;

  return {
    title,
    description,
    keywords: page.focusKeyphrase ? [page.focusKeyphrase] : undefined,
    alternates: page.canonicalUrl ? { canonical: page.canonicalUrl } : undefined,
    robots: page.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description: description || undefined,
      type: "article",
      url: page.canonicalUrl,
    },
  };
}

function buildJsonLd(page: PageDoc) {
  if (page.schemaMarkup) {
    try {
      return JSON.parse(page.schemaMarkup);
    } catch {
      // fall through
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.metaDescription,
    keywords: page.focusKeyphrase,
    image: page.heroImage?.asset
      ? urlForImage(page.heroImage).width(1600).url()
      : undefined,
    mainEntityOfPage: page.canonicalUrl,
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string[] };
}) {
  const path = paramsToPath(params.slug);
  const page = await sanityFetch<PageDoc | null>({
    query: pageBySlugQuery,
    params: { slug: path },
    tags: [`page:${path}`],
  });

  if (!page) notFound();

  const jsonLd = buildJsonLd(page);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8">
        {page.h1}
      </h1>
      {page.heroImage?.asset && (
        <div className="mb-10">
          <Image
            src={urlForImage(page.heroImage).width(1600).url()}
            alt={page.heroImage.alt || ""}
            width={1600}
            height={900}
            priority
            className="rounded-xl w-full h-auto"
          />
        </div>
      )}
      <PortableContent value={page.content} />
    </article>
  );
}
