import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentTextIcon,
  fieldsets: [
    {
      name: "seo",
      title: "SEO",
      description:
        "Search-engine and social metadata for this page. Click to expand.",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "h1",
      title: "H1 Tag (Main Heading)",
      type: "string",
      description: "The single H1 used as the page's main heading.",
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
      name: "originalRoute",
      title: "Original site route",
      type: "string",
      readOnly: true,
      description:
        "The path of this page on the static site (informational — preview lives at /p/{slug}).",
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
      title: "Content (Core Section)",
      type: "contentBlock",
      description:
        "Main body. Use H2/H3 styles for subheadings. Insert images with alt text inline.",
    }),

    // SEO fields surfaced inline (each in the SEO fieldset) so they're visible
    // alongside content rather than hidden behind a tab.
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
        subtitle: subtitle ? `/p/${subtitle}` : "No slug",
        media,
      };
    },
  },
});
