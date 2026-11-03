"use client";

import { Lock } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Renders fixed-size interface artwork (e.g. a 1200×720 dashboard) and scales
 * it down proportionally to fit its container, so mockups keep pixel-perfect
 * composition on every screen size.
 */
export function ScaledCanvas({
  width,
  height,
  label,
  children,
}: {
  width: number;
  height: number;
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className="relative mx-auto w-full overflow-hidden"
      style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
    >
      <div
        aria-hidden
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale ?? 1})`, visibility: scale === null ? "hidden" : "visible" }}
      >
        {children}
      </div>
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
