import { PortableText, type PortableTextComponents } from "next-sanity";

/**
 * Renders a "richText" Portable-Text field as inline HTML.
 * Supports bold, italic, underline, and SEO hyperlinks (with nofollow).
 *
 * Falls back gracefully:
 *   - If the value is a plain string (legacy data), renders it inside a <span>.
 *   - If undefined/null, renders nothing.
 */

// Render every block style as a plain fragment so the parent component
// controls the wrapper element.  Without this catch-all, PortableText's
// defaults would emit <h1>, <h2>, <p> etc. which breaks the markup when
// the RichText component is already nested inside a <p> or <h1>.
const inlineBlock = ({ children }: any) => <>{children}</>;

const richTextComponents: PortableTextComponents = {
  block: {
    normal: inlineBlock,
    h1: inlineBlock,
    h2: inlineBlock,
    h3: inlineBlock,
    h4: inlineBlock,
    h5: inlineBlock,
    h6: inlineBlock,
    blockquote: inlineBlock,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => {
      const external = value?.openInNewTab;
      const noFollow = value?.noFollow;
      const relParts: string[] = [];
      if (external) relParts.push("noopener", "noreferrer");
      if (noFollow) relParts.push("nofollow");
      return (
        <a
          href={value?.href}
          target={external ? "_blank" : undefined}
          rel={relParts.length ? relParts.join(" ") : undefined}
          className="text-blue-600 underline decoration-blue-300 hover:text-blue-800 hover:decoration-blue-600 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

export default function RichText({ value }: { value: any }) {
  if (!value) return null;

  // Legacy fallback: if someone hasn't migrated a field yet
  // and it's still a plain string, render it directly.
  if (typeof value === "string") return <>{value}</>;

  return <PortableText value={value} components={richTextComponents} />;
}
