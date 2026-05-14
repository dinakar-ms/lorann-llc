import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Lightweight inline rich text — designed for description / paragraph fields
 * where editors need to hyperlink keywords for SEO but don't need headings,
 * images, or block-level elements.
 *
 * Supported:
 *   • Bold / italic / underline decorators
 *   • Inline hyperlinks with SEO attributes (nofollow, open-in-new-tab)
 *
 * NOT supported (by design):
 *   • Headings, blockquotes, lists, images
 */
export const richTextType = defineType({
  name: "richText",
  title: "Rich Text (inline links)",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // Only allow normal paragraph — no headings or blockquotes
      styles: [{ title: "Normal", value: "normal" }],
      // No lists — keep it focused on inline formatting
      lists: [],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Underline", value: "underline" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
                description:
                  'Absolute URL (https://…) or relative path (/solutions). Use "mailto:" or "tel:" for email/phone.',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }),
              }),
              defineField({
                name: "openInNewTab",
                type: "boolean",
                title: "Open in new tab",
                description: "Turn on for external links.",
                initialValue: false,
              }),
              defineField({
                name: "noFollow",
                type: "boolean",
                title: 'Add rel="nofollow"',
                description:
                  "Turn on if you don't want to pass SEO link equity to the target.",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
  ],
});
