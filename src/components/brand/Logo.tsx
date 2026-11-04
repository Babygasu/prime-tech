import { cn } from "@/lib/cn";

/**
 * Official Prime-Techmate logo.
 *
 * Source: public/logo.svg (supplied by Prime-Techmate). The copy in
 * public/brand/prime-techmate-logo.svg is identical except for a tighter
 * viewBox that trims the empty artboard, so the artwork, proportions and
 * colours are unchanged. Do not recolour or redraw without approval.
 *
 * Intrinsic aspect ratio: 927 × 208.
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; SVG needs no optimisation
    <img
      src="/brand/prime-techmate-logo.svg"
      alt="Prime-Techmate"
      width={927}
      height={208}
      fetchPriority={priority ? "high" : undefined}
      className={cn("h-9 w-auto select-none", className)}
      draggable={false}
    />
  );
}
