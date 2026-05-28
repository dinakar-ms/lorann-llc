import { defineType, defineField } from "sanity";

export const dataCardType = defineType({
  name: "dataCard",
  title: "Data Card",
  type: "document",
  icon: () => "📊",
  fields: [
    /* ── Core ──────────────────────────────────────────── */
    defineField({
      name: "name",
      title: "Media Name",
      type: "string",
      validation: (r) => r.required().min(2),
    }),
    defineField({
      name: "universe",
      title: "Universe (total count)",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
      options: { dateFormat: "MM/DD/YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Technology", "Healthcare", "Business", "Consumer", "Financial",
          "Education", "Marketing", "Insurance", "Automotive", "Construction",
          "Hospitality", "Real Estate", "Legal", "Energy", "Government",
          "Manufacturing", "Non-Profit", "Retail", "Travel", "Agriculture",
        ],
      },
      validation: (r) => r.required(),
    }),

    /* ── Description ──────────────────────────────────── */
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      description: "Detailed description of this data card audience.",
    }),

    /* ── Segment Counts ───────────────────────────────── */
    defineField({
      name: "postalRecords",
      title: "Postal Records",
      type: "number",
    }),
    defineField({
      name: "phoneNumbers",
      title: "Phone Numbers",
      type: "number",
    }),
    defineField({
      name: "emailAddresses",
      title: "Email Addresses",
      type: "number",
    }),

    /* ── Pricing ──────────────────────────────────────── */
    defineField({
      name: "postalCpm",
      title: "Postal CPM ($)",
      type: "number",
      description: "Cost per thousand for postal records.",
    }),
    defineField({
      name: "phoneCpm",
      title: "Phone CPM ($)",
      type: "number",
      description: "Cost per thousand for phone numbers.",
    }),
    defineField({
      name: "emailCpm",
      title: "Email CPM ($)",
      type: "number",
      description: "Cost per thousand for email addresses.",
    }),

    /* ── Card Metadata ────────────────────────────────── */
    defineField({
      name: "popularity",
      title: "Popularity Score (1–100)",
      type: "number",
      validation: (r) => r.min(1).max(100),
    }),
    defineField({
      name: "cardQuality",
      title: "Card Quality Grade",
      type: "string",
      options: { list: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"] },
    }),
    defineField({
      name: "market",
      title: "Market",
      type: "string",
      options: { list: ["Business", "Consumer", "Healthcare", "B2B/B2C"] },
    }),
    defineField({
      name: "dataType",
      title: "Type",
      type: "string",
      options: { list: ["Email, Postal, Phone", "Email Only", "Postal, Phone", "Email, Phone", "Multi-Channel"] },
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: { list: ["Multi Sourced, Compiled Lists", "Self-Reported", "Compiled Lists", "Survey Based", "Registration Data"] },
    }),
    defineField({
      name: "geo",
      title: "Geography",
      type: "string",
      initialValue: "USA",
    }),
    defineField({
      name: "genderMale",
      title: "Gender % Male",
      type: "number",
    }),
    defineField({
      name: "genderFemale",
      title: "Gender % Female",
      type: "number",
    }),

    /* ── Selects ──────────────────────────────────────── */
    defineField({
      name: "selects",
      title: "Available Selects",
      type: "array",
      of: [{ type: "string" }],
      description: "List of available selects/filters for this data card.",
    }),

    /* ── Ordering ─────────────────────────────────────── */
    defineField({
      name: "minimumOrder",
      title: "Minimum Order Quantity",
      type: "number",
    }),
    defineField({
      name: "minimumPrice",
      title: "Minimum Price ($)",
      type: "number",
    }),
    defineField({
      name: "netNamePercent",
      title: "Net Name Percentage",
      type: "number",
      description: "e.g. 85 for 85%",
    }),
    defineField({
      name: "brokerCommission",
      title: "Broker Commission (%)",
      type: "number",
    }),
    defineField({
      name: "agencyCommission",
      title: "Agency Commission (%)",
      type: "number",
    }),
    defineField({
      name: "exchangeAvailable",
      title: "Exchange Available",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "reuseAvailable",
      title: "Reuse Available",
      type: "boolean",
      initialValue: true,
    }),

    /* ── Addressing ───────────────────────────────────── */
    defineField({
      name: "emailDeliveryFee",
      title: "Email Delivery Fee ($/F)",
      type: "number",
    }),
    defineField({
      name: "ftpDeliveryFee",
      title: "FTP Delivery Fee ($/F)",
      type: "number",
    }),

    /* ── Dates / IDs ──────────────────────────────────── */
    defineField({
      name: "marketEntryDate",
      title: "Market Entry Date",
      type: "date",
    }),
    defineField({
      name: "nextUpdateDate",
      title: "Next Update Date",
      type: "date",
    }),
    defineField({
      name: "frequency",
      title: "Update Frequency",
      type: "string",
      options: { list: ["Monthly", "Quarterly", "Semi-Annually", "Annually", "Daily", "Weekly"] },
      initialValue: "Monthly",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
  },
  orderings: [
    { title: "Name A→Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
    { title: "Universe ↓", name: "universeDesc", by: [{ field: "universe", direction: "desc" }] },
    { title: "Recently Updated", name: "updatedDesc", by: [{ field: "lastUpdated", direction: "desc" }] },
  ],
});
