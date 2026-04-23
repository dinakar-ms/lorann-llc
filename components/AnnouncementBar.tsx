"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("lorann-announce-dismissed");
    if (dismissed === "true") setVisible(false);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--announce-height",
      visible ? "36px" : "0px"
    );
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[101] flex items-center justify-center gap-3 px-4 py-2.5 text-white text-xs sm:text-[13px] font-medium"
      style={{
        background:
          "linear-gradient(90deg, #1736B3 0%, #1D45D9 50%, #008AC7 100%)",
        backgroundSize: "200% 100%",
        animation: "announce-slide 8s ease infinite",
      }}
    >
      <span className="hidden sm:inline-flex items-center bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
        New
      </span>
      <span className="truncate">
        Signal eXchange™ — live intent intelligence is now available
      </span>
      <Link
        href="/signal-exchange"
        className="hidden md:inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-100 opacity-95"
      >
        Learn more
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
      <button
        onClick={() => {
          setVisible(false);
          localStorage.setItem("lorann-announce-dismissed", "true");
        }}
        aria-label="Dismiss announcement"
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <style jsx>{`
        @keyframes announce-slide {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
