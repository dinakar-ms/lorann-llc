import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn must be false for stega encoding to flow through. Next.js
  // still caches at the route level via the `revalidate` option in
  // sanityFetch, so this isn't a real performance hit.
  useCdn: false,
  perspective: "published",
  stega: {
    enabled: true,
    studioUrl: "/studio",
  },
});
