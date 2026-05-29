import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: "hero",
      title: "Hero Section",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "intro",
      title: "Intro Section",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "leaf",
      title: "Leaf Page Fields",
      description: "Only used when Template Type = leaf",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "hub",
      title: "Hub Page Fields",
      description: "Only used when Template Type = hub",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "custom",
      title: "Custom Page Fields",
      description: "Only used when Template Type = custom",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "seo",
      title: "SEO",
      description:
        "Search-engine and social metadata for this page. Click to expand.",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ─── Core ────────────────────────────────────────────
    defineField({
      name: "h1",
      title: "Page Name",
      type: "string",
      description:
        "Short page name used for breadcrumbs, navigation, and internal references. The visual H1 heading is built from the Title fields in the Hero Section below.",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "URL Path",
      type: "slug",
      description:
        'Full URL path without leading slash. Use slashes for nesting, e.g. "about" or "why-lorann/precision-targeting".',
      options: {
        source: "h1",
        maxLength: 200,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-\/]/g, "")
            .replace(/-+/g, "-"),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "templateType",
      title: "Template Type",
      type: "string",
      description: "Which template to render this page with.",
      options: {
        list: [
          { title: "Leaf Page (product/list pages)", value: "leaf" },
          { title: "Hub Page (category landings)", value: "hub" },
          { title: "Custom (section-based)", value: "custom" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "originalRoute",
      title: "Original site route",
      type: "string",
      readOnly: true,
      description:
        "The path of this page on the static site (informational).",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Alt text is required."),
        }),
      ],
    }),
    defineField({
      name: "content",
      title: "Content (Portable Text)",
      type: "contentBlock",
      description:
        "Rich text body — used when no template is selected.",
    }),

    // ─── Hero Section ────────────────────────────────────
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "string",
      fieldset: "hero",
      description: "Small uppercase label above the hero title.",
    }),
    defineField({
      name: "titlePlain",
      title: "H1 — first part",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "titleAccent",
      title: "H1 — gradient highlight",
      type: "string",
      fieldset: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "richText",
      fieldset: "hero",
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "ctaLink",
      fieldset: "hero",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaLink",
      fieldset: "hero",
    }),

    // ─── Intro Section ───────────────────────────────────
    defineField({
      name: "introKicker",
      title: "Intro Kicker",
      type: "string",
      fieldset: "intro",
    }),
    defineField({
      name: "introHeadlinePlain",
      title: "Intro Headline (plain)",
      type: "string",
      fieldset: "intro",
    }),
    defineField({
      name: "introHeadlineAccent",
      title: "Intro Headline (gradient)",
      type: "string",
      fieldset: "intro",
    }),
    defineField({
      name: "introParagraphs",
      title: "Intro Paragraphs",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule: any) =>
                      Rule.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
                  }),
                  defineField({ name: "openInNewTab", type: "boolean", title: "Open in new tab", initialValue: false }),
                  defineField({ name: "noFollow", type: "boolean", title: 'Add rel="nofollow"', initialValue: false }),
                ],
              },
            ],
          },
        },
      ],
      fieldset: "intro",
      description: "Intro paragraph blocks with Bold, Italic, Underline, and Link formatting.",
    }),

    // ─── Leaf Page Fields ────────────────────────────────
    defineField({
      name: "stats",
      title: "Stats Strip",
      type: "array",
      of: [{ type: "stat" }],
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
    }),
    defineField({
      name: "attributesSectionKicker",
      title: "Attributes Section Kicker",
      type: "string",
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
      description: 'Override the default "What\'s Included" kicker.',
    }),
    defineField({
      name: "attributesSectionTitle",
      title: "Attributes Section Title",
      type: "string",
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
      description: 'Override the default "Every record carries the data points marketers need." title.',
    }),
    defineField({
      name: "attributesSectionAccent",
      title: "Attributes Section Title (gradient)",
      type: "string",
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
    }),
    defineField({
      name: "attributes",
      title: "Attributes (What's Included)",
      type: "array",
      of: [{ type: "featureItem" }],
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
    }),
    defineField({
      name: "useCasesSectionKicker",
      title: "Use Cases Section Kicker",
      type: "string",
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
      description: 'Override the default "Use Cases" kicker.',
    }),
    defineField({
      name: "useCasesSectionTitle",
      title: "Use Cases Section Title",
      type: "string",
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
      description: 'Override the default "Built for the campaigns marketers run every day." title.',
    }),
    defineField({
      name: "useCasesSectionAccent",
      title: "Use Cases Section Title (gradient)",
      type: "string",
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
    }),
    defineField({
      name: "useCases",
      title: "Use Cases",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "richText" }),
          ],
          preview: {
            select: { title: "title", subtitle: "desc" },
          },
        },
      ],
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
    }),
    defineField({
      name: "complianceHeadline",
      title: "Compliance Headline",
      type: "string",
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
    }),
    defineField({
      name: "complianceBody",
      title: "Compliance Body",
      type: "richText",
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
    }),
    defineField({
      name: "backLink",
      title: "Back Link",
      type: "ctaLink",
      fieldset: "leaf",
      hidden: ({ document }) => document?.templateType !== "leaf",
    }),

    // ─── Hub Page Fields ─────────────────────────────────
    defineField({
      name: "childrenSectionKicker",
      title: "Children Section Kicker",
      type: "string",
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "childrenSectionTitlePlain",
      title: "Children Section Title (plain)",
      type: "string",
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "childrenSectionTitleAccent",
      title: "Children Section Title (gradient)",
      type: "string",
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "childrenSectionDescription",
      title: "Children Section Description",
      type: "richText",
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "childrenSectionColumns",
      title: "Children Section Columns",
      type: "number",
      options: { list: [2, 3, 4] },
      initialValue: 3,
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "childrenItems",
      title: "Children Items",
      type: "array",
      of: [{ type: "featureItem" }],
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "hubAttributesSectionKicker",
      title: "Attributes Section Kicker",
      type: "string",
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "hubAttributesSectionTitlePlain",
      title: "Attributes Section Title (plain)",
      type: "string",
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "hubAttributesSectionTitleAccent",
      title: "Attributes Section Title (gradient)",
      type: "string",
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "hubAttributesSectionDescription",
      title: "Attributes Section Description",
      type: "richText",
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "hubAttributesSectionColumns",
      title: "Attributes Section Columns",
      type: "number",
      options: { list: [2, 3, 4] },
      initialValue: 4,
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),
    defineField({
      name: "hubAttributesItems",
      title: "Attributes Items",
      type: "array",
      of: [{ type: "featureItem" }],
      fieldset: "hub",
      hidden: ({ document }) => document?.templateType !== "hub",
    }),

    // ─── Extra Content Sections (all templates) ─────────
    defineField({
      name: "featureGridSections",
      title: "Feature Grid Sections",
      description: "Additional content sections — rendered after the main template sections on any page type.",
      type: "array",
      of: [{ type: "featureGridSection" }],
    }),
    defineField({
      name: "proseSections",
      title: "Prose Sections",
      description: "Paragraph-style content sections (e.g. 'Why Choose', 'Who Can Use') rendered as rich prose with optional highlight callouts.",
      type: "array",
      of: [{ type: "proseSection" }],
    }),
    defineField({
      name: "faqItems",
      title: "FAQ Section",
      description: "Frequently asked questions displayed at the bottom of the page.",
      type: "array",
      of: [{ type: "faqItem" }],
    }),

    // ─── Custom Page Fields ──────────────────────────────
    defineField({
      name: "ctaBannerData",
      title: "CTA Banner",
      type: "ctaBanner",
      fieldset: "custom",
      hidden: ({ document }) => document?.templateType !== "custom",
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [{ type: "teamMember" }],
      fieldset: "custom",
      hidden: ({ document }) => document?.templateType !== "custom",
    }),
    defineField({
      name: "caseStudies",
      title: "Case Studies",
      type: "array",
      of: [{ type: "caseStudy" }],
      fieldset: "custom",
      hidden: ({ document }) => document?.templateType !== "custom",
    }),
    defineField({
      name: "newsletterHeadlinePlain",
      title: "Newsletter Headline (plain)",
      type: "string",
      fieldset: "custom",
      hidden: ({ document }) => document?.templateType !== "custom",
    }),
    defineField({
      name: "newsletterHeadlineAccent",
      title: "Newsletter Headline (gradient)",
      type: "string",
      fieldset: "custom",
      hidden: ({ document }) => document?.templateType !== "custom",
    }),
    defineField({
      name: "newsletterBody",
      title: "Newsletter Body",
      type: "richText",
      fieldset: "custom",
      hidden: ({ document }) => document?.templateType !== "custom",
    }),
    defineField({
      name: "newsletterBullets",
      title: "Newsletter Bullets",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "custom",
      hidden: ({ document }) => document?.templateType !== "custom",
    }),

    // ─── SEO ─────────────────────────────────────────────
    defineField({
      name: "focusKeyphrase",
      title: "Focus Keyphrase",
      type: "string",
      fieldset: "seo",
      description: "Single primary keyword/phrase this page targets in search.",
      validation: (Rule) =>
        Rule.max(80).warning("Keep focus keyphrase concise."),
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      fieldset: "seo",
      description: "Shown in browser tab & SERP. 50–60 chars recommended.",
      validation: (Rule) =>
        Rule.max(70).warning("Meta titles over 70 chars get truncated."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      fieldset: "seo",
      description: "Shown in SERP. 140–160 chars recommended.",
      validation: (Rule) =>
        Rule.max(180).warning(
          "Meta descriptions over 180 chars get truncated."
        ),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical Link",
      type: "url",
      fieldset: "seo",
      description:
        "Absolute URL of the canonical version (leave blank to default to this page's URL).",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "schemaMarkup",
      title: "Schema Markup (JSON-LD)",
      type: "text",
      rows: 8,
      fieldset: "seo",
      description:
        "Optional JSON-LD structured data. Leave blank to auto-generate.",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          try {
            JSON.parse(value as string);
            return true;
          } catch {
            return "Schema markup must be valid JSON.";
          }
        }),
    }),
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
    defineField({
      name: "noIndex",
      title: "Hide from Search Engines",
      type: "boolean",
      fieldset: "seo",
      description: "Adds noindex,nofollow meta tag.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "h1",
      subtitle: "slug.current",
      media: "heroImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled page",
        subtitle: subtitle ? `/${subtitle}` : "No slug",
        media,
      };
    },
  },
});
