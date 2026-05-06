// Public Sanity config. These values appear in every API URL
// (e.g. https://<projectId>.api.sanity.io/...) and are not secrets,
// so we ship safe built-in defaults. Vercel env vars override when set.
// This avoids the Vercel "Sensitive flag blocks NEXT_PUBLIC_ inlining" trap.
const DEFAULT_PROJECT_ID = "a694bsry";
const DEFAULT_DATASET = "production";
const DEFAULT_API_VERSION = "2024-10-01";

function publicEnv(value: string | undefined, fallback: string): string {
  if (!value || value === "placeholder") return fallback;
  return value;
}

export const apiVersion = publicEnv(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  DEFAULT_API_VERSION
);

export const dataset = publicEnv(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  DEFAULT_DATASET
);

export const projectId = publicEnv(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  DEFAULT_PROJECT_ID
);

export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3000/studio";

// Server-only secret. Required for draft-mode previews; not used at build time.
export const token = process.env.SANITY_API_READ_TOKEN;
