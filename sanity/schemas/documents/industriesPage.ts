import { EarthGlobeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const industriesPageType = defineType({
  name: "industriesPage",
  title: "Industries Page",
  type: "document",
  icon: EarthGlobeIcon,
  fieldsets: [
    { name: "hero", title: "1 · Hero", options: { collapsible: true, collapsed: false } },
    { name: "deepDives", title: "2 · Deep Dives", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "SEO", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // Hero
    defineField({ name: "heroKicker", title: "Kicker", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleStart", title: "Title (start)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroDescription", title: "Description", type: "richText", fieldset: "hero" }),

    // Deep dives
    defineField({ name: "deepDivesKicker", title: "Kicker", type: "string", fieldset: "deepDives" }),
    defineField({ name: "deepDivesTitleStart", title: "Title (start)", type: "string", fieldset: "deepDives" }),
    defineField({ name: "deepDivesTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "deepDives" }),
    defineField({ name: "deepDivesSubtitle", title: "Subtitle", type: "string", fieldset: "deepDives" }),
    defineField({
      name: "deepDivesItems",
      title: "Industry deep-dive cards",
      type: "array",
      fieldset: "deepDives",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "id", title: "Anchor ID", type: "string" }),
          defineField({ name: "iconName", title: "Icon name", type: "string" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "lede", title: "Description", type: "richText" }),
          defineField({ name: "features", title: "Feature tags", type: "array", of: [{ type: "string" }] }),
        ],
        preview: { select: { title: "title", subtitle: "lede" } },
      }],
    }),

    // SEO
    defineField({ name: "metaTitle", title: "Meta Title", type: "string", fieldset: "seo" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3, fieldset: "seo" }),
    defineField({ name: "canonicalUrl", title: "Canonical Link", type: "url", fieldset: "seo", description: "Absolute URL of the canonical version (leave blank to default to this page's URL).", validation: (Rule) => Rule.uri({ scheme: ["http", "https"], allowRelative: false }) }),
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
  preview: { prepare: () => ({ title: "Industries Page" }) },
});
