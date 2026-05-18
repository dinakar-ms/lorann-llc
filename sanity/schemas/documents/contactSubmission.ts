import { defineField, defineType } from "sanity";

export const contactSubmissionType = defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    defineField({ name: "referenceId", title: "Reference ID", type: "string", readOnly: true }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "interest", title: "Interest / Subject", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "countryCode", title: "Country Code", type: "string" }),
    defineField({ name: "state", title: "State / Region", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "ipAddress", title: "IP Address", type: "string" }),
    defineField({ name: "sourceUrl", title: "Source URL", type: "url" }),
    defineField({ name: "userAgent", title: "User Agent", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["unread", "read", "archived"] },
      initialValue: "unread",
    }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", readOnly: true }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "email", status: "status", date: "submittedAt" },
    prepare({ title, subtitle, status, date }) {
      const when = date ? new Date(date).toLocaleString() : "";
      return {
        title: title || "(no name)",
        subtitle: `${subtitle || ""} · ${status || ""} · ${when}`,
      };
    },
  },
});
