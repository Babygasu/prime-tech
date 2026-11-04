import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/content/site";
import { solutionIcons } from "@/components/brand/solutionIcons";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Our solutions"
            title={<span id="solutions-title">Technology that strengthens every part of healthcare.</span>}
            lead="From the systems clinicians use every day to the infrastructure behind them, we deliver solutions shaped around how your organisation works."
          />
        </Reveal>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {solutions.map((s, i) => {
            const Icon = solutionIcons[s.icon];
            return (
              <li key={s.slug}>
                <Reveal delay={(i % 3) * 0.07} className="h-full">
                  <Link
                    href={`/solutions/#${s.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-lift sm:p-8"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-teal-400/0 blur-2xl transition-colors duration-700 group-hover:bg-teal-400/15"
                    />
                    <span className="flex items-start justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-teal-50 text-teal-700 transition-colors duration-500 group-hover:bg-navy-900 group-hover:text-teal-300">
                        <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 text-subtle opacity-0 transition-[opacity,transform,color] duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-600 group-hover:opacity-100"
                      />
                    </span>
                    <h3 className="mt-7 text-xl font-bold tracking-[-0.02em] text-ink">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-body">{s.description}</p>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href="/solutions/" variant="secondary" arrow>
            View all solutions
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
