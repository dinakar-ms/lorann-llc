interface KickerProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
}

export default function Kicker({ children, variant = "light" }: KickerProps) {
  const classes =
    variant === "dark"
      ? "bg-cyan-400/15 border border-cyan-400/30 text-cyan-300"
      : "bg-blue-50 border border-blue-100 text-blue-700";

  const dotColor = variant === "dark" ? "bg-cyan-400" : "bg-blue-600";
  const dotShadow =
    variant === "dark"
      ? "shadow-[0_0_8px_#22BFFF]"
      : "shadow-[0_0_8px_#2F5DEC]";

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full ${classes}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotColor} ${dotShadow} animate-pulse-dot`}
      />
      {children}
    </span>
  );
}
