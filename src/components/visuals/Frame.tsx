"use client";

import { Lock } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Region = { x: number; y: number; w: number; h: number };

/**
 * Renders fixed-size interface artwork (e.g. a 1200×720 dashboard) and scales
 * it down proportionally to fit its container, so mockups keep pixel-perfect
 * composition on every screen size.
 *
 * `compactRegion` (optional) shows only part of the artwork, larger, when the
 * container is narrower than `compactBelow` — used on phones so the interface
 * stays readable instead of shrinking to a tiny thumbnail.
 */
export function ScaledCanvas({
  width,
  height,
  label,
  children,
  compactRegion,
  compactBelow = 640,
}: {
  width: number;
  height: number;
  label: string;
  children: ReactNode;
  compactRegion?: Region;
  compactBelow?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const compact = Boolean(compactRegion && containerWidth !== null && containerWidth < compactBelow);
  const region: Region = compact && compactRegion ? compactRegion : { x: 0, y: 0, w: width, h: height };
  const scale = containerWidth === null ? 1 : containerWidth / region.w;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className="relative mx-auto w-full overflow-hidden"
      style={{ maxWidth: compact ? undefined : width, aspectRatio: `${region.w} / ${region.h}` }}
    >
      <div
        aria-hidden
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width,
          height,
          transform: `scale(${scale}) translate(${-region.x}px, ${-region.y}px)`,
          visibility: containerWidth === null ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
      {compact ? (
        // Soft edge to show the interface continues beyond the crop.
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-mist to-transparent" />
      ) : null}
    </div>
  );
}

export function BrowserFrame({
  children,
  url = "demo.health-system.example",
  className,
}: {
  children: ReactNode;
  url?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-white shadow-frame sm:rounded-2xl", className)}>
      <div className="flex h-7 items-center gap-1.5 border-b border-line bg-[#f8fafc] px-3 sm:h-10 sm:gap-2 sm:px-4">
        <span className="size-2 rounded-full bg-[#e2e8f0] sm:size-2.5" />
        <span className="size-2 rounded-full bg-[#e2e8f0] sm:size-2.5" />
        <span className="size-2 rounded-full bg-[#e2e8f0] sm:size-2.5" />
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-0.5 text-[9px] text-muted sm:px-3 sm:text-[11px]">
          <Lock aria-hidden className="size-2.5" />
          {url}
        </div>
        <span className="w-6 sm:w-10" />
      </div>
      {children}
    </div>
  );
}
