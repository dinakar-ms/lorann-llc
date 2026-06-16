// app/robots.ts
// Next.js automatically serves this as /robots.txt

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/", "/_next/"],
      },
    ],
    sitemap: "https://www.lorannllc.com/sitemap.xml",
  };
}
