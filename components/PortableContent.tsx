import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-3xl font-semibold tracking-tight text-slate-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-slate-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-xl font-semibold text-slate-900">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-slate-300 pl-4 italic text-slate-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed text-slate-700">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = value?.openInNewTab ? "_blank" : undefined;
      const rel = target ? "noopener noreferrer" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value).width(1600).url();
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt || ""}
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-slate-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableContent({ value }: { value: any }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
