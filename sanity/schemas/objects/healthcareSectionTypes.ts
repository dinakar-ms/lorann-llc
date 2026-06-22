import { defineField, defineType } from "sanity";

const FEATURE_ICON_OPTIONS = [
  "Activity", "Award", "BadgeCheck", "Brain", "Building2",
  "ClipboardList", "Cpu", "Eye", "FileText", "Heart",
  "Layers", "PawPrint", "Pill", "RefreshCw", "ShieldCheck",
  "SlidersHorizontal", "Smile", "Star", "Stethoscope", "Users", "Zap",
].map((v) => ({ title: v, value: v }));

export const healthcareFeaturesSectionType = defineType({
  name: "healthcareFeaturesSection",
  title: "Healthcare Features Section",
  type: "object",
  fields: [
    defineField({
      name: "heroImageUrl",
      title: "Hero Image URL",
      type: "url",
      description: "Unsplash or CDN URL for the large background image card.",
    }),
    defineField({ name: "kicker", title: "Kicker", type: "string" }),
    defineField({ name: "headlinePlain", title: "Headline (plain part)", type: "string" }),
    defineField({ name: "headlineAccent", title: "Headline (gradient/accent part)", type: "string" }),
    defineField({
      name: "cards",
      title: "Feature Cards",
      type: "array",
      description: "Exactly 6 cards. First card is the large hero card.",
      of: [
        defineField({
          name: "featureCard",
          title: "Feature Card",
          type: "object",
          fields: [
            defineField({
              name: "iconName",
              title: "Icon",
              type: "string",
              options: { list: FEATURE_ICON_OPTIONS },
            }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "iconName" },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    select: { title: "kicker", subtitle: "headlinePlain" },
  },
});

export const healthcareComplianceSectionType = defineType({
  name: "healthcareComplianceSection",
  title: "Healthcare Compliance Section",
  type: "object",
  fields: [
    defineField({
      name: "photoUrl",
      title: "Section Photo URL",
      type: "url",
      description: "Unsplash or CDN URL for the compliance section photo.",
    }),
    defineField({
      name: "intro",
      title: "Intro Text",
      type: "text",
      rows: 3,
      description: "Opening paragraph explaining the compliance posture for this page.",
    }),
    defineField({
      name: "items",
      title: "Compliance Items",
      type: "array",
      description: "Typically 5 items: HIPAA, CCPA, CAN-SPAM, FCRA, DNC.",
      of: [
        defineField({
          name: "complianceItem",
          title: "Compliance Item",
          type: "object",
          fields: [
            defineField({
              name: "badge",
              title: "Badge",
              type: "string",
              options: {
                list: [
                  { title: "HIPAA", value: "HIPAA" },
                  { title: "CCPA", value: "CCPA" },
                  { title: "CAN-SPAM", value: "CAN-SPAM" },
                  { title: "FCRA", value: "FCRA" },
                  { title: "DNC", value: "DNC" },
                ],
              },
            }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 4 }),
          ],
          preview: {
            select: { title: "badge", subtitle: "title" },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
  preview: {
    select: { title: "intro" },
    prepare({ title }) {
      return { title: title?.slice(0, 60) || "Compliance Section" };
    },
  },
});
