import "server-only";

import { draftMode, headers } from "next/headers";
import type { QueryParams } from "next-sanity";
import { client } from "./client";
import { token } from "../env";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled;
  const isPresentation = headers().get("x-sanity-preview") === "true";
  const needsPreview = isDraftMode || isPresentation;

  if (isDraftMode && !token) {
    throw new Error(
      "Missing SANITY_API_READ_TOKEN — required for draft-mode previews."
    );
  }

  try {
    return await client
      .withConfig({
        token: needsPreview ? token : undefined,
        perspective: isDraftMode ? "previewDrafts" : "published",
        stega: needsPreview
          ? { enabled: true, studioUrl: "/studio" }
          : false,
      })
      .fetch<QueryResponse>(query, params, {
        next: {
          revalidate: needsPreview ? 0 : 60,
          tags,
        },
      });
  } catch (err) {
    console.error("[sanityFetch] failed", { query, params, err });
    return null as QueryResponse;
  }
}
