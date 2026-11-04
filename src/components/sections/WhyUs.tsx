import { FileHeart, GraduationCap, MapPinned, Network, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { site, strengths } from "@/content/site";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

const icons: ComponentType<LucideProps>[] = [FileHeart, GraduationCap, Network, MapPinned];

export function WhyUs() {
  return (
    <section id="why" aria-labelledby="why-title" className="bg-mist py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Prime-Techmate"
            title={<span id="why-title">Why healthcare institutions choose Prime-Techmate.</span>}
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto] lg:gap-5">
          <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <article className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-charcoal-900 p-8 text-white sm:p-10">
              <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />
              <div aria-hidden className="absolute -bottom-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(123_150_214/0.3),transparent)]" />
              <p className="relative text-[13px] font-semibold uppercase tracking-[0.18em] text-charcoal-300">Experience</p>
              <div className="relative">
                <p className="font-display text-[6.5rem] font-extrabold leading-none tracking-[-0.06em] sm:text-[8rem]">
                  {site.experienceYears}
                  <span className="text-accent-400">+</span>
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight">Years of industry experience</p>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-charcoal-400">
                  Over {site.experienceYears} years of experience delivering health technology solutions in Ghana.
                </p>
              </div>
            </article>
          </Reveal>

          {strengths.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.title} delay={0.08 + i * 0.08}>
                <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-[box-shadow,transform] duration-500 ease-premium hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="grid size-11 place-items-center rounded-xl bg-cloud text-charcoal-900">
                    <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-6 text-xl font-bold tracking-[-0.02em] text-ink">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">{s.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
