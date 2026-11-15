"use client";

import { motion } from "motion/react";
import { ScaledCanvas } from "./Frame";
import { DASHBOARD_HEIGHT, DASHBOARD_WIDTH, DemoDashboard } from "./dashboard/DemoDashboard";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero product shot: the illustrative dashboard presented like a modern SaaS app
 * window — soft bezel, rounded corners, subtle depth — positioned closer to the CTAs
 * on mobile so the interface is visible early in the viewport.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto mt-6 w-full max-w-[1240px] px-3 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
      {/* Soft pale-blue halo that separates the window from the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[3%] -top-6 bottom-4 -z-10 rounded-[48px] bg-[radial-gradient(closest-side,rgb(184_211_247/0.95),rgb(210_230_252/0.5)_65%,transparent)] blur-2xl sm:-inset-x-[2%] sm:-top-8 sm:rounded-[64px] sm:blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.32 }}
      >
        {/* Bezel */}
        <div className="rounded-t-[20px] rounded-b-[14px] border border-charcoal-900/[0.12] bg-white/80 p-1 shadow-lift ring-1 ring-white/80 backdrop-blur-sm sm:rounded-t-[26px] sm:rounded-b-[16px] sm:p-2 sm:shadow-frame sm:ring-white/70">
          <div className="overflow-hidden rounded-t-[15px] rounded-b-[10px] border border-line bg-white sm:rounded-t-[20px]">
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
    </div>
  );
}

/** App window top bar with single elegant illustrative badge. */
function WindowBar() {
  return (
    <div className="flex h-8 items-center gap-2 border-b border-line bg-mist/80 px-2.5 sm:h-11 sm:px-4">
      <span aria-hidden className="flex gap-1.5">
        <span className="size-2 rounded-full bg-charcoal-300/70 sm:size-2.5" />
        <span className="size-2 rounded-full bg-charcoal-300/70 sm:size-2.5" />
        <span className="size-2 rounded-full bg-charcoal-300/70 sm:size-2.5" />
      </span>
      <span className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-0.5 text-[10px] font-medium text-muted shadow-xs sm:px-3.5 sm:text-[11.5px]">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-signal-500 animate-pulse" />
        <span>Executive Facility Pulse</span>
        <span className="text-subtle hidden sm:inline">· Illustrative concept</span>
      </span>
      <span aria-hidden="true" className="w-[36px] sm:w-[54px]" />
    </div>
  );
}
