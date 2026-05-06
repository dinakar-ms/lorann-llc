import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  fieldsets: [
    { name: "hero", title: "Hero", options: { collapsible: true, collapsed: false } },
    { name: "info", title: "Reach us directly", options: { collapsible: true, collapsed: false } },
    { name: "responseCard", title: "Response time card", options: { collapsible: true, collapsed: true } },
    { name: "form", title: "Form labels", options: { collapsible: true, collapsed: true } },
    { name: "success", title: "Form success message", options: { collapsible: true, collapsed: true } },
    { name: "seo", title: "SEO", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // ----- Hero -----
    defineField({ name: "heroKicker", title: "Hero kicker", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleStart", title: "Hero title — start", type: "string", fieldset: "hero" }),
    defineField({ name: "heroTitleHighlight", title: "Hero title — gradient highlight", type: "string", fieldset: "hero" }),
    defineField({ name: "heroDescription", title: "Hero description", type: "text", rows: 3, fieldset: "hero" }),

    // ----- Reach us directly -----
    defineField({ name: "infoTitle", title: "Section title", type: "string", fieldset: "info" }),
    defineField({ name: "infoDescription", title: "Section description", type: "text", rows: 3, fieldset: "info" }),
    defineField({ name: "infoEmailLabel", title: "Email label", type: "string", fieldset: "info" }),
    defineField({ name: "infoEmailValue", title: "Email address", type: "string", fieldset: "info" }),
    defineField({ name: "infoPhoneLabel", title: "Phone label", type: "string", fieldset: "info" }),
    defineField({ name: "infoPhoneValue", title: "Phone number", type: "string", fieldset: "info" }),
    defineField({ name: "infoPhoneHref", title: "Phone link (tel:…)", type: "string", fieldset: "info" }),
    defineField({ name: "infoAddressLabel", title: "Address label", type: "string", fieldset: "info" }),
    defineField({ name: "infoAddressLine1", title: "Address line 1", type: "string", fieldset: "info" }),
    defineField({ name: "infoAddressLine2", title: "Address line 2", type: "string", fieldset: "info" }),

    // ----- Response time card -----
    defineField({ name: "responseTitle", title: "Card title", type: "string", fieldset: "responseCard" }),
    defineField({ name: "responseBody", title: "Card body", type: "text", rows: 2, fieldset: "responseCard" }),

    // ----- Form labels -----
    defineField({ name: "formNameLabel", title: "Name label", type: "string", fieldset: "form" }),
    defineField({ name: "formCompanyLabel", title: "Company label", type: "string", fieldset: "form" }),
    defineField({ name: "formEmailLabel", title: "Email label", type: "string", fieldset: "form" }),
    defineField({ name: "formPhoneLabel", title: "Phone label", type: "string", fieldset: "form" }),
    defineField({ name: "formInterestLabel", title: "Interest label", type: "string", fieldset: "form" }),
    defineField({ name: "formInterestPlaceholder", title: "Interest placeholder", type: "string", fieldset: "form" }),
    defineField({
      name: "formInterestOptions",
      title: "Interest dropdown options",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "form",
    }),
    defineField({ name: "formMessageLabel", title: "Message label", type: "string", fieldset: "form" }),
    defineField({ name: "formMessagePlaceholder", title: "Message placeholder", type: "string", fieldset: "form" }),
    defineField({ name: "formSubmitLabel", title: "Submit button label", type: "string", fieldset: "form" }),
    defineField({ name: "formPrivacyNote", title: "Privacy note (below submit)", type: "text", rows: 2, fieldset: "form" }),

    // ----- Success state -----
    defineField({ name: "successTitle", title: "Success title", type: "string", fieldset: "success" }),
    defineField({ name: "successBody", title: "Success body (HTML allowed)", type: "text", rows: 3, fieldset: "success" }),

    // ----- SEO -----
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
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false, fieldset: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
