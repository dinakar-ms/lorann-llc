import { defineField, defineType } from "sanity";

export const dataCardSubmissionType = defineType({
  name: "dataCardSubmission",
  title: "Data Card Submission",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Display name for this data card (e.g. 'US Auto Enthusiasts').",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Public data-card category. Kept in sync with lib/dataCardCategories.ts — the Upload form and Review & Publish form use the same list.",
      options: {
        list: [
          "Technology",
          "Healthcare",
          "Business",
          "Consumer",
          "Financial",
          "Education",
          "Marketing",
          "Insurance",
          "Automotive",
          "Construction",
          "Hospitality",
          "Real Estate",
          "Legal",
          "Energy",
          "Government",
          "Manufacturing",
          "Non-Profit",
          "Retail",
          "Travel",
          "Agriculture",
        ],
      },
    }),
    defineField({
      name: "universe",
      title: "Universe (Record Count)",
      type: "number",
      description: "Approximate number of records in this data card.",
    }),
    defineField({
      name: "file",
      title: "Uploaded File",
      type: "file",
      description: "Excel (.xlsx, .xls, .csv), Word (.docx, .doc), PDF, or RTF.",
      options: { accept: ".xlsx,.xls,.csv,.docx,.doc,.pdf,.rtf" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fileType",
      title: "File Type",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "uploader",
      title: "Uploaded By",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "uploaderEmail",
      title: "Uploader Email (snapshot)",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending Review", value: "pending" },
          { title: "Approved & Published", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),
    defineField({
      name: "reviewNotes",
      title: "Review Notes",
      type: "text",
      rows: 3,
      description: "Admin notes shown to the uploader if rejected.",
    }),
    defineField({
      name: "reviewedBy",
      title: "Reviewed By",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "reviewedAt",
      title: "Reviewed At",
      type: "datetime",
    }),
    defineField({
      name: "publishedDataCard",
      title: "Published Data Card",
      type: "reference",
      to: [{ type: "dataCard" }],
      weak: true,
      description: "Set when this submission has been promoted to a live data card. Weak reference — deleting the data card in Studio leaves this pointer dangling until cleared via Unpublish.",
    }),
    defineField({
      name: "parsedFields",
      title: "Parsed Fields (from uploaded file)",
      type: "object",
      description: "Auto-extracted from the uploaded Excel. Used to build the dataCard on approve.",
      readOnly: true,
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "description", title: "Description", type: "text" },
        { name: "universe", title: "Universe", type: "number" },
        { name: "category", title: "Category", type: "string" },
        { name: "market", title: "Market", type: "string" },
        { name: "dataType", title: "Data Type", type: "string" },
        { name: "source", title: "Source", type: "string" },
        { name: "geo", title: "Geo", type: "string" },
        { name: "postalRecords", title: "Postal Records", type: "number" },
        { name: "phoneNumbers", title: "Phone Numbers", type: "number" },
        { name: "emailAddresses", title: "Email Addresses", type: "number" },
        { name: "postalCpm", title: "Postal CPM", type: "number" },
        { name: "phoneCpm", title: "Phone CPM", type: "number" },
        { name: "emailCpm", title: "Email CPM", type: "number" },
        { name: "popularity", title: "Popularity", type: "number" },
        { name: "cardQuality", title: "Card Quality", type: "string" },
        { name: "genderMale", title: "Gender % Male", type: "number" },
        { name: "genderFemale", title: "Gender % Female", type: "number" },
        { name: "minimumOrder", title: "Minimum Order", type: "number" },
        { name: "minimumPrice", title: "Minimum Price", type: "number" },
        { name: "netNamePercent", title: "Net Name %", type: "number" },
        { name: "brokerCommission", title: "Broker Commission", type: "number" },
        { name: "agencyCommission", title: "Agency Commission", type: "number" },
        { name: "exchangeAvailable", title: "Exchange Available", type: "boolean" },
        { name: "reuseAvailable", title: "Reuse Available", type: "boolean" },
        { name: "emailDeliveryFee", title: "Email Delivery Fee", type: "number" },
        { name: "ftpDeliveryFee", title: "FTP Delivery Fee", type: "number" },
        { name: "marketEntryDate", title: "Market Entry Date", type: "date" },
        { name: "nextUpdateDate", title: "Next Update Date", type: "date" },
        { name: "frequency", title: "Frequency", type: "string" },
        { name: "lastUpdated", title: "Last Updated", type: "date" },
        { name: "selects", title: "Selects", type: "array", of: [{ type: "string" }] },
        {
          name: "segments",
          title: "Segments",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "count", title: "Count", type: "number" },
                { name: "rate", title: "Rate ($/M)", type: "number" },
              ],
            },
          ],
        },
        {
          name: "extraFields",
          title: "Additional Fields",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "value", title: "Value", type: "string" },
              ],
            },
          ],
        },
        {
          name: "fileSections",
          title: "Original File Sections",
          description:
            "Every section header the parser found in the uploaded file, with its rows verbatim. Rendered on the public data-card page so it mirrors the source document.",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", title: "Section Title", type: "string" },
                {
                  name: "rows",
                  title: "Rows",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        { name: "label", title: "Label", type: "string" },
                        { name: "value", title: "Value", type: "string" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "tags",
          title: "Tags / SEO Keywords",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "parseWarnings",
      title: "Parse Warnings",
      type: "array",
      of: [{ type: "string" }],
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Pending first",
      name: "pendingFirst",
      by: [
        { field: "status", direction: "asc" },
        { field: "submittedAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      uploader: "uploaderEmail",
      date: "submittedAt",
    },
    prepare({ title, status, uploader, date }) {
      const when = date ? new Date(date).toLocaleDateString() : "";
      const badge =
        status === "approved" ? "✅" : status === "rejected" ? "❌" : "⏳";
      return {
        title: `${badge} ${title || "(untitled)"}`,
        subtitle: `${uploader || ""} · ${when}`,
      };
    },
  },
});
