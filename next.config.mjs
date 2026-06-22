/** @type {import('next').NextConfig} */

import { legacyPaths } from "./lib/legacy-redirects.mjs";

const securityHeaders = [
  // Prevent browsers from MIME-sniffing a response away from the declared content-type.
  // Stops certain XSS attacks where an uploaded file is served as text/html.
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // X-Frame-Options intentionally omitted — CSP frame-ancestors below is the modern
  // equivalent and is what browsers honour. Setting DENY here would break the Sanity
  // Presentation tool, which embeds the site in an iframe for visual editing.
  // Force HTTPS for 2 years; include subdomains; allow preload submission.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Stop the full URL from leaking in the Referer header when navigating to external sites.
  // Origin is still sent on same-origin requests (analytics still works).
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Opt out of browser features that the site doesn't use.
  // Prevents rogue third-party scripts from silently accessing camera/mic/location.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Content Security Policy — controls which origins can load scripts, styles, images, etc.
  // 'unsafe-inline' for styles is required by Tailwind's runtime; nonce-based CSP would be
  // stricter but needs server-side nonce injection across every page.
  // Google Tag Manager / gtag.js requires script-src *.google-analytics.com *.googletagmanager.com.
  // Sanity Studio (visual editing) requires frame-ancestors *.sanity.io for the Presentation tool.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + GTM / GA + Sanity visual editing
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.sanity.io",
      // Styles: self + inline (Tailwind)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + CDN + GA pixel + Sanity image CDN
      "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://plus.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com",
      // Fetch / XHR: self + Sanity API + GA
      "connect-src 'self' https://*.sanity.io https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com",
      // Frames: only Sanity Presentation tool embeds this site
      "frame-ancestors 'self' https://*.sanity.io",
      // No plugins (Flash etc.)
      "object-src 'none'",
      // Force all requests to HTTPS
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
    // Cap device sizes at 1920px (Full HD) — removes the 2048/3840 breakpoints
    // that Next.js includes by default, preventing 4K images from being generated.
    // 1920px is sufficient for all screen sizes on a marketing site.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Serve modern image formats for smaller file sizes
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/(.*)",
        headers: [
          ...securityHeaders,
          // Agent discovery link headers (RFC 8288 / isitagentready.com)
          {
            key: "Link",
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</.well-known/mcp>; rel="mcp"',
              '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
              '</.well-known/agent-skills/index.json>; rel="agent-skills-index"',
              '</llms.txt>; rel="describedby"; type="text/plain"',
            ].join(", "),
          },
          // Content negotiation — signal that text/markdown is supported
          {
            key: "Vary",
            value: "Accept",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // Map /.well-known/* agent discovery paths to API route handlers
      { source: "/.well-known/api-catalog",               destination: "/api/agent/api-catalog" },
      { source: "/.well-known/mcp",                       destination: "/api/agent/mcp" },
      { source: "/.well-known/mcp/server-card.json",      destination: "/api/agent/mcp" },
      { source: "/.well-known/agent-skills/index.json",   destination: "/api/agent/skills" },
      { source: "/.well-known/openid-configuration",      destination: "/api/agent/openid-configuration" },
      { source: "/.well-known/oauth-protected-resource",  destination: "/api/agent/oauth-protected-resource" },
      // RFC 7591 — OAuth Dynamic Client Registration
      { source: "/oauth/register",                        destination: "/api/agent/oauth-register" },
      // RFC 8414 — OAuth Authorization Server Metadata + agent_auth block
      { source: "/.well-known/oauth-authorization-server", destination: "/api/agent/oauth-authorization-server" },
    ];
  },
  async redirects() {
    // 301 every legacy WordPress URL to the homepage so old inbound links and
    // search-engine results don't dead-end on a 404. Permanent: true → 308 for
    // POST/PUT, 301 for GET (which is what Google honors for SEO).
    return legacyPaths.map((path) => ({
      source: path,
      destination: "/",
      permanent: true,
    }));
  },
  experimental: {
    // Tree-shake icon libraries — only include the icons actually imported
    optimizePackageImports: ["lucide-react", "@sanity/icons"],
    // Don't bundle these into Server Components / API routes. They register
    // global polyfills that break under webpack's module rewriting
    // (manifests as "Object.defineProperty called on non-object").
    serverComponentsExternalPackages: ["pdf-parse", "pdfjs-dist", "mammoth"],
  },
};

export default nextConfig;
