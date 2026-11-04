import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { product, solutions } from "@/content/site";
import { solutionIcons } from "@/components/brand/solutionIcons";
import { Container } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SolutionVisual } from "@/components/visuals/SolutionVisual";
import { TechInAction } from "@/components/sections/TechInAction";
import { CtaBand } from "@/components/sections/CtaBand";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Electronic Medical Records, Health Management Information Systems, network infrastructure and health insurance claims support and training from Prime-Techmate.",
  alternates: { canonical: "/solutions/" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our solutions"
        title={
          <>
            Technology for every part of <span className="text-brand-500">healthcare.</span>
          </>
        }
        lead="We design, implement and support advanced digital systems that power modern healthcare environments, for hospitals, clinics and health institutions across Ghana."
      >
        <nav aria-label="Solutions on this page" className="no-scrollbar -mx-4 mt-10 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {solutions.map((s) => {
              const Icon = solutionIcons[s.icon];
              return (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-[14px] font-medium text-body transition-colors duration-300 hover:border-charcoal-900/20 hover:text-ink"
                  >
                    <Icon aria-hidden className="size-4 text-charcoal-600" />
                    {s.shortTitle}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageHero>

      <div className="pb-12 sm:pb-20">
        {solutions.map((s, i) => {
          const Icon = solutionIcons[s.icon];
          const flip = i % 2 === 1;
          return (
            <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="py-14 sm:py-20">
              <Container>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                  <Reveal className={cn(flip && "lg:order-2")}>
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-2xl bg-charcoal-900 text-white">
                        <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[13px] font-medium text-brand-600">0{i + 1}</span>
                    </div>
                    <h2
                      id={`${s.slug}-title`}
                      className="mt-6 text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]"
                    >
                      {s.title}
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-body">{s.description}</p>
                    <ul className="mt-8 space-y-3 border-t border-line pt-8">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-[15px] text-ink">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cloud text-charcoal-900">
                            <Check aria-hidden className="size-3" strokeWidth={2.5} />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    {s.icon === "emr" ? (
                      <Link
                        href={`/${product.slug}/`}
                        className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-brand-600 hover:text-brand-700"
                      >
                        Discover {product.name}, our own EMR system
                        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    ) : null}
                  </Reveal>
                  <Reveal delay={0.1} className={cn(flip && "lg:order-1")}>
                    <SolutionVisual kind={s.icon} />
                  </Reveal>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <TechInAction />
      <div className="pt-24 sm:pt-32">
        <CtaBand
          title="Not sure which solution fits?"
          lead="Tell us about your organisation and the challenges you face. We will help you find the right place to start."
        />
      </div>
    </>
  );
}
