import { groq } from "next-sanity";

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    h1,
    "slug": slug.current,
    heroImage{
      ...,
      alt
    },
    content,
    focusKeyphrase,
    metaTitle,
    metaDescription,
    canonicalUrl,
    schemaMarkup,
    noIndex
  }
`;

export const allPageSlugsQuery = groq`*[_type == "page" && defined(slug.current)][].slug.current`;
