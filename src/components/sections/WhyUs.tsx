import { GraduationCap, Headphones, Network, ShieldCheck, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { site, strengths } from "@/content/site";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

const icons: ComponentType<LucideProps>[] = [ShieldCheck, GraduationCap, Network, Headphones];

export function WhyUs() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-mist py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Prime-Techmate"
            title={<span id="why-title">Why healthcare institutions choose Prime-Techmate.</span>}
            lead="Healthcare technology requires more than software installation—it demands deep local regulatory alignment, reliable hardware infrastructure, and hands-on staff adoption."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto] lg:gap-5">
          {/* 14+ Years Experience Anchor */}
          <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <article className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl bg-navy-900 p-6 text-white sm:min-h-[340px] sm:p-10">
              <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />
              <div aria-hidden className="absolute -bottom-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(237_28_36/0.28),transparent)]" />
              <p className="relative text-[13px] font-semibold uppercase tracking-[0.18em] text-navy-300">Heritage</p>
              <div className="relative">
                <p className="font-display text-[5.25rem] font-extrabold leading-none tracking-[-0.06em] min-[360px]:text-[6rem] sm:text-[7.5rem]">
                  {site.experienceYears}
                  <span className="text-signal-400">+</span>
                </p>
                <p className="mt-3 text-lg font-semibold tracking-tight sm:text-xl">Years of industry experience</p>
                <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-navy-300 sm:mt-3 sm:text-[15px]">
                  Over {site.experienceYears} years dedicated to developing and implementing dependable healthcare technology systems across Ghana.
                </p>
              </div>
            </article>
          </Reveal>

          {/* 4 Institutional Advantage Pillars */}
          {strengths.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.title} delay={0.08 + i * 0.08}>
                <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-[box-shadow,transform] duration-500 ease-premium hover:-translate-y-0.5 hover:shadow-lift sm:p-8">
                  <span className="grid size-11 place-items-center rounded-xl bg-cloud text-charcoal-900 transition-colors group-hover:bg-accent-600 group-hover:text-white">
                    <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-[-0.02em] text-ink sm:text-xl">{s.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-body sm:text-[15px]">{s.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
