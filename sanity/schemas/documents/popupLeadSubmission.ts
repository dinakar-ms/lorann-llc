import { defineField, defineType } from "sanity";

// Submissions from the site-wide LeadPopup (components/LeadPopup.tsx —
// fires 12s after page load on public pages). Kept as its own document
// type so it doesn't mingle with the /contact form's contactSubmission
// entries; both live under Sanity Studio for admins to review.
export const popupLeadSubmissionType = defineType({
  name: "popupLeadSubmission",
  title: "Popup Lead Submission",
  type: "document",
  fields: [
    defineField({ name: "referenceId", title: "Reference ID", type: "string", readOnly: true }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "sourceUrl", title: "Source URL", type: "url", description: "Page the popup fired on." }),
    defineField({ name: "referer", title: "Referer", type: "string" }),
    defineField({ name: "ipAddress", title: "IP Address", type: "string" }),
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
