/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    // Serve modern image formats for smaller file sizes
    formats: ["image/avif", "image/webp"],
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
