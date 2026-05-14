import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  // Stega is OFF by default — only enabled in sanityFetch when in
  // preview / presentation mode.  Keeping it on here caused every
  // production query to request resultSourceMap, which requires a
  // token and fails with 401 on public/tokenless requests.
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});
