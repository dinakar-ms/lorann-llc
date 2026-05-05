"use client";

import { useRouter } from "next/navigation";

export default function DisableDraftMode() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/draft-mode/disable");
        router.refresh();
      }}
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
        padding: "8px 14px",
        borderRadius: 8,
        background: "#111",
        color: "#fff",
        fontSize: 13,
        fontFamily: "system-ui, sans-serif",
        border: 0,
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      Disable draft mode
    </button>
  );
}
