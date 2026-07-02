// Single source of truth for public data-card categories.
// Used by the Upload form (dashboard/upload), the Review & Publish form
// (dashboard/submissions/[id]), the Sanity submission schema, and the
// listing/filter page (/data-assets/data-cards). Changing this list here
// changes every dropdown in the app at once.
export const DATA_CARD_CATEGORIES = [
  "Technology",
  "Healthcare",
  "Business",
  "Consumer",
  "Financial",
  "Education",
  "Marketing",
  "Insurance",
  "Automotive",
  "Construction",
  "Hospitality",
  "Real Estate",
  "Legal",
  "Energy",
  "Government",
  "Manufacturing",
  "Non-Profit",
  "Retail",
  "Travel",
  "Agriculture",
] as const;

export type DataCardCategory = (typeof DATA_CARD_CATEGORIES)[number];

// Default category when the uploader doesn't pick one. Business is a
// safe catch-all — the admin can change it on the Review page.
export const DEFAULT_CATEGORY: DataCardCategory = "Business";
