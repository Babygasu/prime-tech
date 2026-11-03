import { cn } from "@/lib/cn";

/**
 * Temporary wordmark. TODO(confirm): replace with the official
 * Prime-Techmate logo files once supplied.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} />
      <span
        className={cn(
          "font-display text-[17px] font-bold tracking-[-0.02em]",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        Prime<span className="text-teal-500">-</span>Techmate
      </span>
    </span>
  );
}

export function LogoMark({ tone = "dark", size = 30 }: { tone?: "dark" | "light"; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden focusable="false">
      <rect width="32" height="32" rx="9" fill={tone === "dark" ? "#0b1a33" : "rgba(255,255,255,0.08)"} />
      <path
        d="M6.5 17h4.2l2.6-6.2 4.4 11.4 2.6-5.2h5.2"
        fill="none"
        stroke="#3ccbb8"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
