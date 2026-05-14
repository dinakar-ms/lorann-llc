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
  // Wrap dynamic API calls in try-catch — they throw
  // DYNAMIC_SERVER_USAGE during ISR revalidation of static pages.
  let isDraftMode = false;
  let isPresentation = false;
  try {
    isDraftMode = draftMode().isEnabled;
    isPresentation = headers().get("x-sanity-preview") === "true";
  } catch {
    // Static rendering or ISR context — safe to default to published
  }
  const needsPreview = isDraftMode || isPresentation;

  if (isDraftMode && !token) {
    throw new Error(
      "Missing SANITY_API_READ_TOKEN — required for draft-mode previews."
    );
  }

  try {
    return await client
      .withConfig({
        // Always pass the token — the dataset is private and requires
        // authentication even for published reads.
        token: token || undefined,
        perspective: isDraftMode ? "previewDrafts" : "published",
        stega: needsPreview
          ? { enabled: true, studioUrl: "/studio" }
          : { enabled: false },
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
