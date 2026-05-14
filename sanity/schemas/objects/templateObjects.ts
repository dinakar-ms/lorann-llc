import { defineField, defineType } from "sanity";

export const ctaLinkType = defineType({
  name: "ctaLink",
  title: "CTA Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href", title: "URL", type: "string" }),
  ],
});

export const statType = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "value", title: "Value", type: "string" }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});

const ICON_OPTIONS = [
  "Activity","AlertTriangle","ArrowRight","Award","Briefcase","Building2",
  "Car","Check","CheckCircle2","ChevronRight","Circle","Cross","Database",
  "Filter","HeartPulse","Layers","LineChart","Linkedin","Mail","MapPin",
  "Phone","Pill","Radio","RefreshCw","Search","ShieldCheck","SlidersHorizontal",
  "Sparkles","Stethoscope","Target","Truck","UserCheck","Users","Wrench","Zap",
].map((v) => ({ title: v, value: v }));

export const featureItemType = defineType({
  name: "featureItem",
  title: "Feature Item",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "desc", title: "Description", type: "richText" }),
    defineField({ name: "href", title: "Link URL", type: "string" }),
    defineField({ name: "badge", title: "Badge", type: "string" }),
  ],
  preview: {
    select: { title: "title", subtitle: "desc" },
  },
});

export const featureGridSectionType = defineType({
  name: "featureGridSection",
  title: "Feature Grid Section",
  type: "object",
  fields: [
    defineField({ name: "kicker", title: "Kicker", type: "string" }),
    defineField({ name: "titlePlain", title: "Title (plain)", type: "string" }),
    defineField({ name: "titleAccent", title: "Title (gradient)", type: "string" }),
    defineField({ name: "description", title: "Description", type: "richText" }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: { list: [2, 3, 4] },
      initialValue: 3,
    }),
    defineField({
      name: "style",
      title: "Card Style",
      type: "string",
      options: { list: ["card", "check", "numbered"] },
      initialValue: "card",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "featureItem" }],
    }),
  ],
  preview: {
    select: { title: "titlePlain", subtitle: "kicker" },
  },
});

export const ctaBannerType = defineType({
  name: "ctaBanner",
  title: "CTA Banner",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Visual Style",
      type: "string",
      options: { list: [
        { title: "Dark gradient", value: "dark" },
        { title: "Light card", value: "light" },
      ] },
      initialValue: "dark",
      description: "Dark gradient for why-lorann/solutions style, light card for callout style.",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_OPTIONS },
    }),
    defineField({ name: "kicker", title: "Kicker", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "richText" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA URL", type: "string" }),
  ],
});

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "title", title: "Job Title", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "richText" }),
    defineField({ name: "initials", title: "Initials", type: "string" }),
    defineField({ name: "photo", title: "Photo Path", type: "string" }),
    defineField({ name: "objectPosition", title: "Photo Position", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
  ],
  preview: {
    select: { title: "name", subtitle: "title" },
  },
});

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "object",
  fields: [
    defineField({ name: "industry", title: "Industry", type: "string" }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "challenge", title: "Challenge", type: "richText" }),
    defineField({ name: "approach", title: "Approach", type: "richText" }),
    defineField({ name: "outcome", title: "Outcome", type: "richText" }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [{ type: "stat" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "industry" },
  },
});
