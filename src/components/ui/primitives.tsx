import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "light" | "dark";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "light",
  className,
  centered = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  centered?: boolean;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs",
        tone === "light" ? "text-charcoal-600" : "text-navy-300",
        className,
      )}
    >
      {/* Red signature rule (from the logo): a small, consistent brand detail on every section label. */}
      <span
        aria-hidden
        className={cn(
          "h-[2px] w-6 shrink-0 rounded-full",
          tone === "light" ? "bg-signal-500" : "bg-signal-400",
          centered && "hidden sm:block",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-5 text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.75rem] lg:text-5xl",
          tone === "light" ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-body" : "text-navy-400",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-premium active:scale-[0.98]";

/** md is the default; sm is a quieter size for places like the hero. */
const buttonSizes = {
  md: "h-12 px-6 text-[15px]",
  sm: "h-10 px-[1.125rem] text-[13px]",
} as const;

/**
 * primary   navy call to action (white on accent-600 is 10.4:1)
 * light     white call to action on dark sections, where navy would disappear
 * dark      charcoal button for secondary emphasis on light backgrounds
 * secondary quiet outline button
 * ghostDark outline button on dark surfaces
 */
const buttonVariants = {
  primary: "bg-accent-600 text-white hover:bg-accent-700 shadow-[0_1px_0_rgb(255_255_255/0.12)_inset]",
  light: "bg-white text-navy-950 hover:bg-accent-100",
  dark: "bg-charcoal-900 text-white hover:bg-charcoal-700",
  secondary: "border border-line bg-white text-ink hover:border-charcoal-900/25 hover:bg-mist",
  ghostDark: "border border-white/15 text-white hover:border-white/35 hover:bg-white/5",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(buttonBase, buttonSizes[size], buttonVariants[variant], className)}>
      {children}
      {arrow ? (
        <ArrowRight
          aria-hidden
          className={cn(size === "sm" ? "size-3.5" : "size-4", "transition-transform duration-300 ease-premium group-hover:translate-x-0.5")}
        />
      ) : null}
    </Link>
  );
}

export function buttonClass(variant: keyof typeof buttonVariants = "primary", className?: string) {
  return cn(buttonBase, buttonSizes.md, buttonVariants[variant], className);
}

/** Small label used on every illustrative interface and placeholder. */
export function DemoBadge({ children = "Illustrative concept · fictional data", tone = "light" }: { children?: ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide",
        tone === "light" ? "bg-cloud text-muted" : "bg-white/[0.06] text-navy-300 ring-1 ring-white/10",
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-signal-500" />
      {children}
    </span>
  );
}
