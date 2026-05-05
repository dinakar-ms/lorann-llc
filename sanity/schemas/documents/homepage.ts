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

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  fieldsets: [
    {
      name: "hero",
      title: "Hero",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // ----- Hero -----
    defineField({
      name: "heroBadgeLabel",
      title: "Hero badge label",
      type: "string",
      fieldset: "hero",
      description: 'Small pill text, e.g. "Live"',
    }),
    defineField({
      name: "heroBadgeText",
      title: "Hero badge text",
      type: "string",
      fieldset: "hero",
      description: 'Text after the pill, e.g. "95M+ verified contacts · ..."',
    }),
    defineField({
      name: "heroLine1",
      title: "Hero H1 — line 1",
      type: "string",
      fieldset: "hero",
      description: 'e.g. "List smarter."',
    }),
    defineField({
      name: "heroLine2Start",
      title: "Hero H1 — line 2 (start)",
      type: "string",
      fieldset: "hero",
      description: 'e.g. "Target"',
    }),
    defineField({
      name: "heroLine2Highlight",
      title: "Hero H1 — line 2 (gradient highlight)",
      type: "string",
      fieldset: "hero",
      description: 'e.g. "sharper."',
    }),
    defineField({
      name: "heroLine3Start",
      title: "Hero H1 — line 3 (start)",
      type: "string",
      fieldset: "hero",
      description: 'e.g. "Grow"',
    }),
    defineField({
      name: "heroLine3Highlight",
      title: "Hero H1 — line 3 (gradient highlight)",
      type: "string",
      fieldset: "hero",
      description: 'e.g. "faster."',
    }),
    defineField({
      name: "heroDescription",
      title: "Hero description",
      type: "text",
      rows: 3,
      fieldset: "hero",
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Primary CTA",
      type: "object",
      fieldset: "hero",
      fields: ctaFields,
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Secondary CTA",
      type: "object",
      fieldset: "hero",
      fields: ctaFields,
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
    prepare: () => ({ title: "Homepage" }),
  },
});
