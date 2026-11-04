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
            title={<span id="solutions-title">Technology that strengthens healthcare delivery.</span>}
            lead="We design, implement and support the digital systems that power modern healthcare environments, from patient records to the networks behind them."
          />
        </Reveal>

        <ul className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-2 lg:gap-5">
          {solutions.map((s, i) => {
            const Icon = solutionIcons[s.icon];
            return (
              <li key={s.slug}>
                <Reveal delay={(i % 2) * 0.07} className="h-full">
                  <Link
                    href={`/solutions/#${s.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-charcoal-900/15 hover:shadow-lift sm:p-8"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent-500/0 blur-2xl transition-colors duration-700 group-hover:bg-accent-500/[0.07]"
                    />
                    <span className="flex items-start justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-cloud text-charcoal-900 transition-colors duration-500 group-hover:bg-charcoal-900 group-hover:text-accent-400">
                        <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 text-subtle opacity-0 transition-[opacity,transform,color] duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-600 group-hover:opacity-100"
                      />
                    </span>
                    <h3 className="mt-7 text-xl font-bold tracking-[-0.02em] text-ink sm:text-[22px]">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-body sm:text-base">{s.description}</p>
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
