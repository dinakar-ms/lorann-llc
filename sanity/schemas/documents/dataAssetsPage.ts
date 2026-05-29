import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const ctaFields = [
  defineField({ name: "label", type: "string" }),
  defineField({ name: "href", type: "string" }),
];

const featureFields = [
  defineField({
    name: "icon",
    title: "Icon",
    type: "string",
    description:
      "Icon name from lucide-react (e.g. Briefcase, Activity, Sparkles, Users, CreditCard).",
  }),
  defineField({ name: "title", type: "string" }),
  defineField({ name: "desc", title: "Description", type: "richText" }),
  defineField({ name: "href", type: "string" }),
  defineField({
    name: "badge",
    title: "Badge (e.g. Flagship)",
    type: "string",
  }),
];

export const dataAssetsPageType = defineType({
  name: "dataAssetsPage",
  title: "Data Assets Page",
  type: "document",
  icon: CaseIcon,
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true, collapsed: false } },
    { name: "section", title: "Asset classes section", options: { collapsible: true, collapsed: false } },
    { name: "seo", title: "SEO", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // Hero
    defineField({ name: "heroKicker", title: "Hero kicker", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleStart", title: "Hero title — start", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleHighlight", title: "Hero title — gradient highlight", type: "string", fieldset: "hero" }),
    defineField({ name: "heroDescription", title: "Hero description", type: "richText", fieldset: "hero" }),
    defineField({ name: "heroPrimaryCta", title: "Primary CTA", type: "object", fields: ctaFields, fieldset: "hero" }),
    defineField({ name: "heroSecondaryCta", title: "Secondary CTA", type: "object", fields: ctaFields, fieldset: "hero" }),

    // Section
    defineField({ name: "sectionKicker", title: "Section kicker", type: "string", fieldset: "section" }),
    defineField({ name: "sectionTitleStart", title: "Section title — start", type: "string", fieldset: "section" }),
    defineField({ name: "sectionTitleHighlight", title: "Section title — gradient highlight", type: "string", fieldset: "section" }),
    defineField({ name: "sectionDescription", title: "Section description", type: "richText", fieldset: "section" }),
    defineField({
      name: "features",
      title: "Asset cards",
      type: "array",
      of: [{ type: "object", fields: featureFields }],
      fieldset: "section",
    }),

    // SEO
    defineField({ name: "focusKeyphrase", title: "Focus Keyphrase", type: "string", fieldset: "seo" }),
    defineField({ name: "metaTitle", title: "Meta Title", type: "string", fieldset: "seo" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3, fieldset: "seo" }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      fieldset: "seo",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"], allowRelative: false }),
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
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false, fieldset: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Data Assets Page" }) },
});
