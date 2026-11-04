"use client";

import { motion, useReducedMotion } from "motion/react";
import { Info } from "lucide-react";
import { ScaledCanvas } from "./Frame";
import { DASHBOARD_HEIGHT, DASHBOARD_WIDTH, DemoDashboard } from "./dashboard/DemoDashboard";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero product shot: the illustrative dashboard presented like a SaaS app
 * window — soft bezel, rounded top corners, subtle border — rising gently
 * into place. Its cards, figures and charts animate in once it is visible.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto mt-10 w-full max-w-[1240px] px-4 sm:mt-9 sm:px-6 lg:px-8">
      {/* Soft pale-blue halo that separates the window from the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[2%] -top-8 bottom-4 -z-10 rounded-[64px] bg-[radial-gradient(closest-side,rgb(184_211_247/0.85),rgb(206_226_250/0.45)_60%,transparent)] blur-3xl"
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.35 }}
      >
        {/* Bezel */}
        <div className="rounded-t-[22px] rounded-b-[16px] border border-charcoal-900/[0.08] bg-white/60 p-1.5 shadow-frame ring-1 ring-white/70 backdrop-blur-sm sm:rounded-t-[26px] sm:p-2">
          <div className="overflow-hidden rounded-t-[16px] rounded-b-[10px] border border-line bg-white sm:rounded-t-[20px]">
            <WindowBar />
            <ScaledCanvas
              width={DASHBOARD_WIDTH}
              height={DASHBOARD_HEIGHT}
              compactRegion={{ x: 236, y: 0, w: 470, h: 430 }}
              label="Illustrative healthcare facility dashboard with patient visit trends, departmental activity, recent registrations and facility status. Fictional sample data, not a deployed product."
            >
              <DemoDashboard view="overview" animated />
            </ScaledCanvas>
          </div>
        </div>
      </motion.div>

      <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12px] text-muted">
        <Info aria-hidden className="size-3.5 shrink-0" />
        Illustrative demo with fictional data. Not a representation of a deployed product.
      </p>
    </div>
  );
}

/** App window top bar. The demo label sits here so it is visible at first glance. */
function WindowBar() {
  return (
    <div className="flex h-9 items-center gap-2 border-b border-line bg-mist/70 px-3 sm:h-11 sm:px-4">
      <span aria-hidden className="flex gap-1.5">
        <span className="size-2 rounded-full bg-charcoal-300/60 sm:size-2.5" />
        <span className="size-2 rounded-full bg-charcoal-300/60 sm:size-2.5" />
        <span className="size-2 rounded-full bg-charcoal-300/60 sm:size-2.5" />
      </span>
      <span className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-0.5 text-[10px] font-medium text-muted sm:px-3 sm:text-[11px]">
        <span aria-hidden className="size-1.5 rounded-full bg-signal-500" />
        Illustrative demo<span className="hidden sm:inline"> · fictional data</span>
      </span>
      <span aria-hidden className="w-[42px] sm:w-[54px]" />
    </div>
  );
}
