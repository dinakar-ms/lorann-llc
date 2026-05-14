import { ActivityIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const ctaFields = [
  defineField({ name: "label", type: "string" }),
  defineField({ name: "href", type: "string" }),
];

export const signalExchangePageType = defineType({
  name: "signalExchangePage",
  title: "Signal eXchange™ Page",
  type: "document",
  icon: ActivityIcon,
  fieldsets: [
    { name: "hero", title: "1 · Hero", options: { collapsible: true, collapsed: false } },
    { name: "capabilities", title: "2 · Capabilities", options: { collapsible: true, collapsed: true } },
    { name: "results", title: "3 · Typical Results", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "SEO", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // Hero
    defineField({ name: "heroKicker", title: "Kicker", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleStart", title: "Title (start)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroDescription", title: "Description", type: "richText", fieldset: "hero" }),

    // Capabilities
    defineField({ name: "capabilitiesKicker", title: "Kicker", type: "string", fieldset: "capabilities" }),
    defineField({ name: "capabilitiesTitleStart", title: "Title (start)", type: "string", fieldset: "capabilities" }),
    defineField({ name: "capabilitiesTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "capabilities" }),
    defineField({ name: "capabilitiesSubtitle", title: "Subtitle", type: "string", fieldset: "capabilities" }),
    defineField({
      name: "capabilitiesCards",
      title: "Capability cards (6 recommended)",
      type: "array",
      fieldset: "capabilities",
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

    // Typical Results
    defineField({ name: "resultsKicker", title: "Kicker", type: "string", fieldset: "results" }),
    defineField({ name: "resultsTitleStart", title: "Title (start)", type: "string", fieldset: "results" }),
    defineField({ name: "resultsTitleHighlight", title: "Title (gradient highlight)", type: "string", fieldset: "results" }),
    defineField({ name: "resultsDescription", title: "Description", type: "richText", fieldset: "results" }),
    defineField({ name: "resultsCta", title: "CTA", type: "object", fieldset: "results", fields: ctaFields }),
    defineField({
      name: "resultsStats",
      title: "Result metrics (4 recommended)",
      type: "array",
      fieldset: "results",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "num", title: "Number/value", type: "string" }),
          defineField({ name: "label", title: "Label", type: "string" }),
        ],
        preview: { select: { title: "num", subtitle: "label" } },
      }],
    }),

    // SEO
    defineField({ name: "metaTitle", title: "Meta Title", type: "string", fieldset: "seo" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3, fieldset: "seo" }),
    defineField({ name: "noIndex", title: "Hide from Search Engines", type: "boolean", fieldset: "seo", initialValue: false }),
  ],
  preview: { prepare: () => ({ title: "Signal eXchange™" }) },
});
