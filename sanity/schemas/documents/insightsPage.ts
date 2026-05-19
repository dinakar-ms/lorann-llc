import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const ctaFields = [
  defineField({ name: "label", type: "string" }),
  defineField({ name: "href", type: "string" }),
];

export const insightsPageType = defineType({
  name: "insightsPage",
  title: "Insights Page",
  type: "document",
  icon: DocumentsIcon,
  fieldsets: [
    { name: "hero", title: "1 · Hero", options: { collapsible: true, collapsed: false } },
    { name: "browse", title: "2 · Browse by Type", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "SEO", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // Hero
    defineField({ name: "heroKicker", title: "Kicker", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleStart", title: "Title (start)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleEnd", title: "Title (end after highlight)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroDescription", title: "Description", type: "richText", fieldset: "hero" }),
    defineField({ name: "heroPrimaryCta", title: "Primary CTA", type: "object", fieldset: "hero", fields: ctaFields }),
    defineField({ name: "heroSecondaryCta", title: "Secondary CTA", type: "object", fieldset: "hero", fields: ctaFields }),

    // Browse by Type
    defineField({ name: "browseKicker", title: "Kicker", type: "string", fieldset: "browse" }),
    defineField({ name: "browseTitleStart", title: "Title (start)", type: "string", fieldset: "browse" }),
    defineField({ name: "browseTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "browse" }),
    defineField({ name: "browseDescription", title: "Description", type: "string", fieldset: "browse" }),
    defineField({
      name: "browseCards",
      title: "Feature cards (3 recommended)",
      type: "array",
      fieldset: "browse",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "iconName", title: "Icon name", type: "string" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "desc", title: "Description", type: "richText" }),
          defineField({ name: "href", title: "Link URL", type: "string" }),
        ],
        preview: { select: { title: "title", subtitle: "desc" } },
      }],
    }),

    // SEO
    defineField({ name: "metaTitle", title: "Meta Title", type: "string", fieldset: "seo" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3, fieldset: "seo" }),
    defineField({ name: "canonicalUrl", title: "Canonical Link", type: "url", fieldset: "seo", description: "Absolute URL of the canonical version (leave blank to default to this page's URL).", validation: (Rule) => Rule.uri({ scheme: ["http", "https"], allowRelative: false }) }),
    defineField({ name: "noIndex", title: "Hide from Search Engines", type: "boolean", fieldset: "seo", initialValue: false }),
  ],
  preview: { prepare: () => ({ title: "Insights Page" }) },
});
