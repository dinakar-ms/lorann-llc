import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const ctaFields = [
  defineField({
    name: "label",
    type: "string",
    validation: (Rule) => Rule.required().max(60),
  }),
  defineField({
    name: "href",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
];

// Reusable inline shapes
const iconNameField = defineField({
  name: "iconName",
  title: "Icon name",
  type: "string",
  description:
    'Lucide icon name (e.g. "Users", "CheckCircle", "Briefcase", "TrendingUp", "Heart", "Car", "Shield", "Building2", "BarChart3", "Activity", "ShieldCheck", "Target", "Zap", "GitMerge", "Lock", "Crosshair", "Database").',
});

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  fieldsets: [
    { name: "hero", title: "1 · Hero", options: { collapsible: true, collapsed: false } },
    { name: "stats1", title: "2 · Stats Strip + Trust Band", options: { collapsible: true, collapsed: true } },
    { name: "value", title: "3 · Value Props (Why Lorann)", options: { collapsible: true, collapsed: true } },
    { name: "signal", title: "4 · Signal eXchange", options: { collapsible: true, collapsed: true } },
    { name: "how", title: "5 · How It Works", options: { collapsible: true, collapsed: true } },
    { name: "stats2", title: "6 · Stats (Numbers)", options: { collapsible: true, collapsed: true } },
    { name: "solutions", title: "7 · Solutions", options: { collapsible: true, collapsed: true } },
    { name: "industries", title: "8 · Industries", options: { collapsible: true, collapsed: true } },
    { name: "finalCta", title: "9 · Final CTA", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "SEO", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // ----- 1. Hero -----
    defineField({ name: "heroBadgeLabel", title: "Hero badge label", type: "string", fieldset: "hero" }),
    defineField({ name: "heroBadgeText", title: "Hero badge text", type: "string", fieldset: "hero" }),
    defineField({ name: "heroLine1", title: "Hero H1 — line 1", type: "string", fieldset: "hero" }),
    defineField({ name: "heroLine2Start", title: "Hero H1 — line 2 (start)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroLine2Highlight", title: "Hero H1 — line 2 (gradient highlight)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroLine3Start", title: "Hero H1 — line 3 (start)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroLine3Highlight", title: "Hero H1 — line 3 (gradient highlight)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroDescription", title: "Hero description", type: "richText", fieldset: "hero" }),
    defineField({ name: "heroPrimaryCta", title: "Primary CTA", type: "object", fieldset: "hero", fields: ctaFields }),
    defineField({ name: "heroSecondaryCta", title: "Secondary CTA", type: "object", fieldset: "hero", fields: ctaFields }),

    // ----- 2. Stats Strip + Trust -----
    defineField({
      name: "statsStrip",
      title: "Stats strip cells (4 recommended)",
      type: "array",
      fieldset: "stats1",
      of: [
        {
          type: "object",
          fields: [
            iconNameField,
            defineField({ name: "num", title: "Number/value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "num", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "trustHeading",
      title: "Trust band heading",
      type: "string",
      fieldset: "stats1",
    }),
    defineField({
      name: "trustBrands",
      title: "Trust marquee brand names",
      type: "array",
      fieldset: "stats1",
      of: [{ type: "string" }],
    }),

    // ----- 3. Value Props -----
    defineField({ name: "valueKicker", title: "Kicker", type: "string", fieldset: "value" }),
    defineField({ name: "valueTitleStart", title: "Title (start)", type: "string", fieldset: "value" }),
    defineField({ name: "valueTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "value" }),
    defineField({ name: "valueDescription", title: "Description", type: "richText", fieldset: "value" }),
    defineField({
      name: "valueCards",
      title: "Cards (6 recommended)",
      type: "array",
      fieldset: "value",
      of: [
        {
          type: "object",
          fields: [
            iconNameField,
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "richText" }),
            defineField({ name: "backTitle", title: "Back face title", type: "string" }),
            defineField({
              name: "backList",
              title: "Back face bullets",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({ name: "link", title: "Learn-more link", type: "string" }),
            defineField({ name: "accent", title: "Front gradient (CSS)", type: "string" }),
            defineField({ name: "accentBg", title: "Back gradient (CSS)", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "backTitle" } },
        },
      ],
    }),

    // ----- 4. Signal eXchange -----
    defineField({ name: "signalKicker", title: "Kicker", type: "string", fieldset: "signal" }),
    defineField({ name: "signalTitle", title: "Title (plain text, line breaks allowed)", type: "text", rows: 3, fieldset: "signal" }),
    defineField({ name: "signalDescription", title: "Description", type: "richText", fieldset: "signal" }),
    defineField({
      name: "signalFeatures",
      title: "Feature chips",
      type: "array",
      fieldset: "signal",
      of: [{ type: "string" }],
    }),
    defineField({ name: "signalCta", title: "CTA", type: "object", fieldset: "signal", fields: ctaFields }),

    // ----- 5. How It Works -----
    defineField({ name: "howKicker", title: "Kicker", type: "string", fieldset: "how" }),
    defineField({ name: "howTitleStart", title: "Title (start)", type: "string", fieldset: "how" }),
    defineField({ name: "howTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "how" }),
    defineField({ name: "howTitleEnd", title: "Title (end after highlight)", type: "string", fieldset: "how" }),
    defineField({ name: "howDescription", title: "Description", type: "richText", fieldset: "how" }),
    defineField({
      name: "howSteps",
      title: "Steps (4 recommended)",
      type: "array",
      fieldset: "how",
      of: [
        {
          type: "object",
          fields: [
            iconNameField,
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "richText" }),
          ],
          preview: { select: { title: "title", subtitle: "desc" } },
        },
      ],
    }),

    // ----- 6. Stats (Numbers) -----
    defineField({ name: "numbersKicker", title: "Kicker", type: "string", fieldset: "stats2" }),
    defineField({ name: "numbersTitleStart", title: "Title (start)", type: "string", fieldset: "stats2" }),
    defineField({ name: "numbersTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "stats2" }),
    defineField({ name: "numbersDescription", title: "Description", type: "richText", fieldset: "stats2" }),
    defineField({
      name: "numbersStats",
      title: "Stats (4 recommended)",
      type: "array",
      fieldset: "stats2",
      of: [
        {
          type: "object",
          fields: [
            iconNameField,
            defineField({ name: "count", title: "Numeric value (counts up)", type: "number" }),
            defineField({ name: "suffix", title: "Suffix (e.g. M+, %, K+)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "offset",
              title: "Ring stroke offset (377 = 0%, 0 = 100%)",
              type: "number",
              description: "Lower number = more of the ring is filled. Default ~40.",
            }),
          ],
          preview: { select: { title: "label", subtitle: "count" } },
        },
      ],
    }),

    // ----- 7. Solutions -----
    defineField({ name: "solutionsKicker", title: "Kicker", type: "string", fieldset: "solutions" }),
    defineField({ name: "solutionsTitleStart", title: "Title (start)", type: "string", fieldset: "solutions" }),
    defineField({ name: "solutionsTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "solutions" }),
    defineField({ name: "solutionsDescription", title: "Description", type: "richText", fieldset: "solutions" }),
    defineField({
      name: "solutionsRows",
      title: "Solution rows",
      type: "array",
      fieldset: "solutions",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "Anchor ID", type: "string" }),
            defineField({ name: "kicker", title: "Kicker", type: "string" }),
            defineField({ name: "title", title: "Title (start)", type: "string" }),
            defineField({ name: "titleAccent", title: "Title (gradient highlight)", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "richText" }),
            defineField({
              name: "feats",
              title: "Feature bullets",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({ name: "cta", title: "CTA label", type: "string" }),
            defineField({ name: "ctaHref", title: "CTA href", type: "string" }),
            defineField({
              name: "vizVariant",
              title: "Visual variant",
              type: "string",
              options: {
                list: [
                  { title: "Hub / network", value: "A" },
                  { title: "Bar chart / trendline", value: "B" },
                ],
              },
            }),
            defineField({ name: "reverse", title: "Reverse layout", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "title", subtitle: "kicker" } },
        },
      ],
    }),

    // ----- 8. Industries -----
    defineField({ name: "industriesKicker", title: "Kicker", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesTitleStart", title: "Title (start)", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "industries" }),
    defineField({ name: "industriesDescription", title: "Description", type: "richText", fieldset: "industries" }),
    defineField({
      name: "industriesItems",
      title: "Industries",
      type: "array",
      fieldset: "industries",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "Anchor ID", type: "string" }),
            iconNameField,
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "richText" }),
            defineField({ name: "href", title: "Link URL", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "desc" } },
        },
      ],
    }),

    // ----- 9. Final CTA -----
    defineField({ name: "finalCtaKicker", title: "Kicker", type: "string", fieldset: "finalCta" }),
    defineField({ name: "finalCtaTitleStart", title: "Title (start, line breaks allowed)", type: "text", rows: 2, fieldset: "finalCta" }),
    defineField({ name: "finalCtaTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "finalCta" }),
    defineField({ name: "finalCtaDescription", title: "Description", type: "richText", fieldset: "finalCta" }),
    defineField({ name: "finalCtaPrimary", title: "Primary CTA", type: "object", fieldset: "finalCta", fields: ctaFields }),
    defineField({ name: "finalCtaSecondary", title: "Secondary CTA", type: "object", fieldset: "finalCta", fields: ctaFields }),
    defineField({
      name: "finalCtaTrust",
      title: "Trust chips (e.g. compliance bullets)",
      type: "array",
      fieldset: "finalCta",
      of: [{ type: "string" }],
    }),

    // ----- SEO -----
    defineField({ name: "focusKeyphrase", title: "Focus Keyphrase", type: "string", fieldset: "seo" }),
    defineField({ name: "metaTitle", title: "Meta Title", type: "string", fieldset: "seo" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3, fieldset: "seo" }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical Link",
      type: "url",
      fieldset: "seo",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({ name: "schemaMarkup", title: "Schema Markup (JSON-LD)", type: "text", rows: 6, fieldset: "seo" }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      fieldset: "seo",
      description:
        "Override for Facebook/LinkedIn share. Falls back to meta title.",
      validation: (Rule) =>
        Rule.max(90).warning("OG titles over 90 chars may be truncated."),
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      rows: 3,
      fieldset: "seo",
      description:
        "Override for share previews. Falls back to meta description.",
      validation: (Rule) =>
        Rule.max(200).warning(
          "OG descriptions over 200 chars may be truncated."
        ),
    }),
    defineField({ name: "noIndex", title: "Hide from Search Engines", type: "boolean", fieldset: "seo", initialValue: false }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
