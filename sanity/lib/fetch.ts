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
        // Don't override useCdn — base client uses false for stega support.
        // Don't override stega — base client has it enabled with studioUrl.
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
