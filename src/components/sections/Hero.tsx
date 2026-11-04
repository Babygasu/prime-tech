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
      {/* Backdrop: faint grid, a soft navy glow, and a fade into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,black,transparent_75%)]" />
        <div className="absolute left-1/2 top-[-10%] h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(36_66_158/0.08),transparent)] motion-safe:animate-drift" />
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-transparent to-mist" />
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
