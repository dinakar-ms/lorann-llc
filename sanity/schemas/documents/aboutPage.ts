import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const ctaFields = [
  defineField({ name: "label", type: "string" }),
  defineField({ name: "href", type: "string" }),
];

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: UsersIcon,
  fieldsets: [
    { name: "hero", title: "1 · Hero", options: { collapsible: true, collapsed: false } },
    { name: "mission", title: "2 · Mission", options: { collapsible: true, collapsed: true } },
    { name: "values", title: "3 · Values", options: { collapsible: true, collapsed: true } },
    { name: "scale", title: "4 · Scale / Stats", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "SEO", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // Hero
    defineField({ name: "heroKicker", title: "Kicker", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleStart", title: "Title (start)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroDescription", title: "Description", type: "richText", fieldset: "hero" }),

    // Mission
    defineField({ name: "missionKicker", title: "Kicker", type: "string", fieldset: "mission" }),
    defineField({ name: "missionTitleStart", title: "Title (start)", type: "string", fieldset: "mission" }),
    defineField({ name: "missionTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "mission" }),
    defineField({ name: "missionParagraph1", title: "Paragraph 1", type: "richText", fieldset: "mission" }),
    defineField({ name: "missionParagraph2", title: "Paragraph 2", type: "richText", fieldset: "mission" }),
    defineField({ name: "missionParagraph3", title: "Paragraph 3", type: "richText", fieldset: "mission" }),

    // Values
    defineField({ name: "valuesKicker", title: "Kicker", type: "string", fieldset: "values" }),
    defineField({ name: "valuesTitleStart", title: "Title (start)", type: "string", fieldset: "values" }),
    defineField({ name: "valuesTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "values" }),
    defineField({ name: "valuesSubtitle", title: "Subtitle", type: "string", fieldset: "values" }),
    defineField({
      name: "valuesCards",
      title: "Value cards (6 recommended)",
      type: "array",
      fieldset: "values",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "iconName", title: "Icon name", type: "string" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "desc", title: "Description", type: "richText" }),
        ],
        preview: { select: { title: "title", subtitle: "desc" } },
      }],
    }),

    // Scale
    defineField({ name: "scaleKicker", title: "Kicker", type: "string", fieldset: "scale" }),
    defineField({ name: "scaleTitleStart", title: "Title (start)", type: "string", fieldset: "scale" }),
    defineField({ name: "scaleTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "scale" }),
    defineField({
      name: "scaleStats",
      title: "Stats (4 recommended)",
      type: "array",
      fieldset: "scale",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "num", title: "Number/value", type: "string" }),
          defineField({ name: "label", title: "Label", type: "string" }),
        ],
        preview: { select: { title: "num", subtitle: "label" } },
      }],
    }),
    defineField({ name: "scaleCtaLabel", title: "CTA label", type: "string", fieldset: "scale" }),
    defineField({ name: "scaleCtaHref", title: "CTA href", type: "string", fieldset: "scale" }),

    // SEO
    defineField({ name: "metaTitle", title: "Meta Title", type: "string", fieldset: "seo" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3, fieldset: "seo" }),
    defineField({ name: "canonicalUrl", title: "Canonical Link", type: "url", fieldset: "seo", description: "Absolute URL of the canonical version (leave blank to default to this page's URL).", validation: (Rule) => Rule.uri({ scheme: ["http", "https"], allowRelative: false }) }),
    defineField({ name: "noIndex", title: "Hide from Search Engines", type: "boolean", fieldset: "seo", initialValue: false }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
