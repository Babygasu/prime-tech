"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CircleCheck, Info, RefreshCw, UserPlus } from "lucide-react";
import { BrowserFrame, ScaledCanvas } from "./Frame";
import { DASHBOARD_HEIGHT, DASHBOARD_WIDTH, DemoDashboard } from "./dashboard/DemoDashboard";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero composition: an illustrative dashboard that tilts into place as the
 * visitor scrolls, with floating interface cards layered in front for depth.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0.1, 0.5], [12, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.94, 1]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [40, -60]);

  return (
    <div ref={ref} className="relative mx-auto mt-14 w-full max-w-[1200px] px-4 sm:mt-20 sm:px-6 lg:px-8">
      <div style={{ perspective: 1800 }}>
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.25 }}
        >
          <motion.div style={reduce ? undefined : { rotateX, scale, transformOrigin: "50% 0%" }}>
            <BrowserFrame>
              <ScaledCanvas
                width={DASHBOARD_WIDTH}
                height={DASHBOARD_HEIGHT}
                label="Illustrative healthcare facility dashboard with patient visit trends, departmental activity, recent registrations and facility status. Fictional sample data."
              >
                <DemoDashboard view="overview" />
              </ScaledCanvas>
            </BrowserFrame>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating cards (desktop) */}
      <motion.div aria-hidden style={reduce ? undefined : { y: cardsY }} className="pointer-events-none absolute inset-0 hidden lg:block">
        <FloatCard className="-left-6 top-[34%] xl:-left-16" delay={0.9} floatDelay="0s">
          <IconTile><UserPlus className="size-4" /></IconTile>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-ink">New patient registered</p>
            <p className="mt-0.5 text-[12px] text-muted">A. M. · General OPD · just now</p>
          </div>
        </FloatCard>

        <FloatCard className="-right-4 top-[10%] xl:-right-14" delay={1.1} floatDelay="-3s">
          <IconTile><RefreshCw className="size-4" /></IconTile>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-ink">Lab results synchronised</p>
            <p className="mt-0.5 flex items-center gap-1 text-[12px] text-muted">
              <CircleCheck className="size-3.5 text-teal-600" /> Added to patient record
            </p>
          </div>
        </FloatCard>

        <FloatCard className="-right-4 bottom-[14%] w-[230px] xl:-right-14" delay={1.3} floatDelay="-6s" stacked>
          <div className="flex w-full items-center justify-between">
            <p className="text-[12px] font-semibold text-ink">Appointments this week</p>
            <span className="text-[11px] font-semibold text-teal-700">+12%</span>
          </div>
          <div className="mt-3 flex h-12 w-full items-end gap-1.5">
            {[40, 62, 48, 75, 66, 88, 58].map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-t-[3px]"
                style={{ background: i === 5 ? "#14b3a0" : "#d3f1ec" }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.9, ease, delay: 1.5 + i * 0.06 }}
              />
            ))}
          </div>
        </FloatCard>
      </motion.div>

      <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12px] text-muted">
        <Info aria-hidden className="size-3.5 shrink-0" />
        Illustrative concept with fictional data. Not a representation of a deployed product.
      </p>
    </div>
  );
}

function IconTile({ children }: { children: ReactNode }) {
  return <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700">{children}</span>;
}

function FloatCard({
  children,
  className,
  delay,
  floatDelay,
  stacked = false,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  floatDelay: string;
  stacked?: boolean;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      <div
        className={cn(
          "flex gap-3 rounded-2xl border border-white/60 bg-white/90 p-3.5 pr-5 shadow-lift backdrop-blur-md motion-safe:animate-float",
          stacked ? "flex-col" : "items-center",
        )}
        style={{ animationDelay: floatDelay }}
      >
        {children}
      </div>
    </motion.div>
  );
}
