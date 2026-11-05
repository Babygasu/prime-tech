"use client";

import { motion } from "motion/react";
import { LifeBuoy, PenTool, Rocket, Search, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { approach } from "@/content/site";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

const icons: ComponentType<LucideProps>[] = [Search, PenTool, Rocket, LifeBuoy];

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our approach"
            title={<span id="approach-title">A clear path from idea to working system.</span>}
            lead="Every engagement follows four simple stages, so you always know where your project stands."
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Connecting line (desktop) */}
          <div aria-hidden className="absolute left-6 right-[calc(25%-3rem)] top-6 hidden h-px bg-line lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-signal-500 to-accent-600"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {approach.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step.title} className="relative">
                {/* Mobile vertical timeline connector */}
                {i < approach.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-6 top-12 -bottom-8 w-px -translate-x-1/2 bg-line lg:hidden"
                  />
                )}
                <Reveal delay={0.15 + i * 0.12}>
                  <div className="relative flex items-center gap-4 lg:block">
                    <span className="relative z-10 grid size-12 place-items-center rounded-2xl border border-line bg-white text-charcoal-900 shadow-soft">
                      <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-[13px] font-medium text-accent-600 lg:mt-7 lg:block">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl lg:mt-3">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-body sm:mt-3 sm:text-[15px]">{step.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
