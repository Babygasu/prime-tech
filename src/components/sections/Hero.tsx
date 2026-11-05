"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { hero } from "@/content/site";
import { Container } from "@/components/ui/primitives";
import { HeroVisual } from "@/components/visuals/HeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Product-led hero: an optimised, conversion-focused mobile and desktop message
 * with the illustrative dashboard rising directly beneath it, so the interface is
 * visible early in the first viewport.
 */
export function Hero() {
  // Restrained fade-and-slide entrance on load.
  const enter = (delay: number, y = 14) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  });

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-10 pt-20 sm:pb-24 sm:pt-36 lg:pt-40">
      {/*
        Atmospheric backdrop: predominantly white page with a soft pale-blue
        pool behind the dashboard.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white via-40% to-paper">
        {/* Subtle warm glow, top right */}
        <div className="absolute -right-[10%] -top-[10%] h-[400px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgb(251_236_214/0.55),transparent)] blur-3xl sm:h-[620px] sm:w-[780px]" />
        {/* Faint pale blue drift, top left */}
        <div className="absolute -left-[10%] top-[3%] h-[400px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgb(204_225_249/0.65),transparent)] blur-3xl sm:h-[680px] sm:w-[860px]" />
        {/* Concentrated blue pool behind the dashboard preview */}
        <div className="absolute left-1/2 top-[38%] h-[750px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(194_219_248/0.9),rgb(214_232_252/0.4)_55%,transparent)] blur-3xl sm:top-[30%] sm:h-[1100px] sm:w-[1700px]" />
        {/* Gentle fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-mist" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Main Headline */}
          <motion.h1
            id="hero-title"
            {...enter(0.08, 12)}
            className="text-[30px] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink min-[360px]:text-[34px] sm:text-5xl sm:leading-[1.08] lg:text-[3.5rem]"
          >
            <span className="block sm:inline">Smarter Healthcare.</span>{" "}
            <span className="text-accent-500 block sm:inline">Better Patient Outcomes.</span>
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            {...enter(0.16, 10)}
            className="mx-auto mt-3 max-w-[42rem] text-[15px] leading-relaxed text-body sm:mt-5 sm:text-base sm:leading-relaxed"
          >
            {hero.lead}
          </motion.p>

          {/* CTA Actions */}
          <motion.div
            {...enter(0.24, 10)}
            className="mt-5 flex flex-col items-center justify-center gap-2 sm:mt-8 sm:flex-row sm:gap-3"
          >
            <Link
              href={hero.primaryCta.href}
              className="group inline-flex h-[50px] w-full max-w-sm items-center justify-center gap-2 rounded-full bg-accent-600 px-6 text-[15px] font-semibold text-white shadow-soft transition-all duration-300 ease-premium hover:bg-accent-700 active:scale-[0.98] sm:h-11 sm:w-auto sm:px-5 sm:text-[14px]"
            >
              {hero.primaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="group inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-4 text-[14px] font-semibold text-charcoal-700 transition-colors duration-300 hover:text-accent-600 sm:border sm:border-line sm:bg-white sm:text-ink sm:hover:border-charcoal-900/25 sm:hover:bg-mist"
            >
              {hero.secondaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Dashboard Preview */}
      <HeroVisual />

      {/* Positioning credibility statement */}
      <Container className="relative mt-8 sm:mt-12">
        <div className="mx-auto max-w-2xl border-t border-line/60 pt-5 text-center sm:pt-7">
          <p className="flex items-center justify-center gap-2 text-[12px] font-medium text-muted sm:text-[13px]">
            <span aria-hidden="true" className="inline-block size-1.5 shrink-0 rounded-full bg-signal-500" />
            <span>Built for hospitals, clinics, maternity homes and community healthcare facilities.</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
