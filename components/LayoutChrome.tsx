"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Lazy-load non-critical floating UI — not needed for first paint
const SocialRail = dynamic(() => import("@/components/SocialRail"), { ssr: false });
const ContactDial = dynamic(() => import("@/components/ContactDial"), { ssr: false });

export default function LayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <SocialRail />
      <ContactDial />
    </>
  );
}
