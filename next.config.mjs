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
  },
};

export default nextConfig;
