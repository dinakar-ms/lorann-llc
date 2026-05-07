import "server-only";

import { draftMode } from "next/headers";
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

  if (isDraftMode && !token) {
    throw new Error(
      "Missing SANITY_API_READ_TOKEN — required for draft-mode previews."
    );
  }

  try {
    return await client
      .withConfig({
        token: isDraftMode ? token : undefined,
        perspective: isDraftMode ? "previewDrafts" : "published",
        // Stega encoding makes strings clickable in Sanity Presentation.
        // Inside Studio we need the FULL stega config (with studioUrl),
        // otherwise VisualEditing can't construct the jump-to-field
        // target on click. On the public site we turn stega off so the
        // "Open in Studio" tooltip doesn't leak to visitors.
        stega: isDraftMode
          ? { enabled: true, studioUrl: "/studio" }
          : false,
      })
      .fetch<QueryResponse>(query, params, {
        next: {
          revalidate: isDraftMode ? 0 : 60,
          tags,
        },
      });
  } catch (err) {
    console.error("[sanityFetch] failed", { query, params, err });
    return null as QueryResponse;
  }
}
