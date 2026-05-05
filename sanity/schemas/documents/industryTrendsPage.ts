import { TrendUpwardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const ctaFields = [
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (Rule) => Rule.required().max(60),
  }),
  defineField({
    name: "href",
    title: "Link",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
];

export const industryTrendsPageType = defineType({
  name: "industryTrendsPage",
  title: "Industry Trends Page",
  type: "document",
  icon: TrendUpwardIcon,
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true, collapsed: false } },
    { name: "featured", title: "Featured Post", options: { collapsible: true, collapsed: false } },
    { name: "section", title: "Posts Section", options: { collapsible: true, collapsed: false } },
    { name: "seo", title: "SEO", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // ----- Hero -----
    defineField({
      name: "kicker",
      title: "Kicker (badge text)",
      type: "string",
      fieldset: "hero",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "titleStart",
      title: "H1 — first part",
      type: "string",
      fieldset: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleHighlight",
      title: "H1 — gradient highlight",
      type: "string",
      fieldset: "hero",
      description: "Rendered with the gradient effect.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description (sub-headline)",
      type: "text",
      rows: 3,
      fieldset: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "object",
      fieldset: "hero",
      fields: ctaFields,
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "object",
      fieldset: "hero",
      fields: ctaFields,
    }),

    // ----- Featured -----
    defineField({
      name: "featuredPost",
      title: "Featured Post",
      type: "object",
      fieldset: "featured",
      fields: [
        defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "excerpt", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
        defineField({ name: "category", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "readingTime", title: "Reading time", type: "string" }),
        defineField({ name: "date", type: "string" }),
        defineField({ name: "slug", title: "Link", type: "string", initialValue: "#" }),
      ],
    }),

    // ----- Section header for "Recent commentary" -----
    defineField({
      name: "sectionKicker",
      title: "Section kicker",
      type: "string",
      fieldset: "section",
    }),
    defineField({
      name: "sectionTitleStart",
      title: "Section title — first part",
      type: "string",
      fieldset: "section",
    }),
    defineField({
      name: "sectionTitleHighlight",
      title: "Section title — gradient highlight",
      type: "string",
      fieldset: "section",
    }),
    defineField({
      name: "sectionDescription",
      title: "Section description",
      type: "text",
      rows: 2,
      fieldset: "section",
    }),

    // ----- Posts list -----
    defineField({
      name: "posts",
      title: "Posts",
      type: "array",
      fieldset: "section",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "excerpt", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: "category", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "readingTime", title: "Reading time", type: "string" }),
            defineField({ name: "date", type: "string" }),
            defineField({ name: "slug", title: "Link", type: "string", initialValue: "#" }),
          ],
          preview: {
            select: { title: "title", subtitle: "category" },
          },
        },
      ],
    }),

    // ----- SEO -----
    defineField({
      name: "focusKeyphrase",
      title: "Focus Keyphrase",
      type: "string",
      fieldset: "seo",
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      fieldset: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      fieldset: "seo",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical Link",
      type: "url",
      fieldset: "seo",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "schemaMarkup",
      title: "Schema Markup (JSON-LD)",
      type: "text",
      rows: 6,
      fieldset: "seo",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from Search Engines",
      type: "boolean",
      fieldset: "seo",
      initialValue: false,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Industry Trends Page" }),
  },
});
