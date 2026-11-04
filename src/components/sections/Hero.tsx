"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/content/site";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { HeroVisual } from "@/components/visuals/HeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Product-led hero: a compact, centred message with the illustrative
 * dashboard rising directly beneath it, so roughly half of the interface is
 * visible in the first desktop viewport.
 */
export function Hero() {
  const reduce = useReducedMotion();
  // Fade-and-slide entrance on load (motion is skipped for reduced-motion visitors).
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease, delay },
        };

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pt-[6.75rem]">
      {/*
        Atmospheric backdrop: a predominantly white page with a soft pale-blue
        haze pooled behind the dashboard, a faint blue drift top-left and a
        barely-there warm white glow top-right. Large blurred radial layers keep
        every transition smooth, with no visible edges or banding.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white to-paper">
        {/* Warm white glow, top right */}
        <div className="absolute -right-[12%] -top-[14%] h-[620px] w-[780px] rounded-full bg-[radial-gradient(closest-side,rgb(251_236_214/0.85),rgb(251_238_220/0.35)_55%,transparent)] blur-3xl" />
        {/* Faint pale blue drift, top left */}
        <div className="absolute -left-[14%] top-[2%] h-[680px] w-[860px] rounded-full bg-[radial-gradient(closest-side,rgb(204_225_249/0.9),rgb(214_231_250/0.4)_55%,transparent)] blur-3xl motion-safe:animate-drift" />
        {/* Main pale blue pool behind the dashboard */}
        <div className="absolute left-1/2 top-[26%] h-[1100px] w-[1700px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(194_219_248/1),rgb(210_229_250/0.65)_45%,rgb(230_240_252/0.25)_72%,transparent)] blur-3xl" />
        {/* Gentle fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-transparent to-mist" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            id="hero-title"
            {...enter(0.05)}
            className="text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-6xl sm:leading-[1.04] lg:text-[4.5rem]"
          >
            Powering Healthcare <br className="hidden sm:block" />
            Through <span className="text-accent-500">Technology.</span>
          </motion.h1>
          <motion.p
            {...enter(0.15)}
            className="mx-auto mt-4 max-w-[46rem] text-[16px] leading-relaxed text-body sm:text-lg sm:leading-relaxed"
          >
            {hero.lead}
          </motion.p>
          <motion.div
            {...enter(0.25)}
            className="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center"
          >
            <ButtonLink href={hero.primaryCta.href} arrow className="h-11 px-5 text-[14px]">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" className="h-11 px-5 text-[14px]">
              {hero.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </div>
      </Container>

      <HeroVisual />
    </section>
  );
}
