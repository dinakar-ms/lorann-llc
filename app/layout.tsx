import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lorann — List Smarter · Data-Driven Audience Intelligence",
  description:
    "Build, enrich, and activate high-performing audiences across B2B, consumer, and healthcare datasets. Powered by Signal eXchange™.",
  keywords: [
    "B2B data",
    "audience intelligence",
    "Signal eXchange",
    "data enrichment",
    "healthcare data",
    "consumer data",
    "lead generation",
    "Lorann",
  ],
  authors: [{ name: "Lorann LLC" }],
  openGraph: {
    title: "Lorann — List Smarter",
    description:
      "Build, enrich, and activate high-performing audiences. Powered by Signal eXchange™.",
    url: "https://lorannllc.com",
    siteName: "Lorann LLC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="font-body text-slate-900 bg-bg-base">
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
