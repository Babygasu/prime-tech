import type { Metadata } from "next";
import { Compass, Eye, ShieldCheck, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { principles, site } from "@/content/site";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { NetworkIllustration } from "@/components/visuals/NetworkIllustration";
import { WhyUs } from "@/components/sections/WhyUs";
import { Approach } from "@/components/sections/Approach";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description: `Prime-Techmate is a Ghanaian healthcare technology and ICT solutions company with over ${site.experienceYears} years of industry experience, headquartered on Spintex Road, Accra.`,
  alternates: { canonical: "/about/" },
};

const principleIcons: ComponentType<LucideProps>[] = [Compass, Eye, ShieldCheck];

export default function AboutPage() {
  const facts = [
    { value: `${site.experienceYears}+`, label: "Years of industry experience" },
    { value: "Accra", label: "Headquartered on Spintex Road" },
    { value: "Ghana", label: "Serving organisations nationwide" },
  ];

  return (
    <>
      <PageHero
        eyebrow="About Prime-Techmate"
        title={
          <>
            A Ghanaian healthcare <br className="hidden sm:block" />
            technology <span className="text-teal-600">company.</span>
          </>
        }
        lead="We specialise in health systems development and digital health infrastructure, helping healthcare organisations deliver care, manage information and run administration more efficiently."
      />

      <section aria-labelledby="story-title" className="bg-mist py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Who we are"
                  title={<span id="story-title">Technology that works for the people delivering care.</span>}
                />
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 text-lg leading-relaxed text-body">
                  For more than {site.experienceYears} years, Prime-Techmate has designed, implemented and supported ICT
                  solutions for healthcare. Our work spans the systems that capture and share health information, the
                  infrastructure that keeps them running, and the data that helps organisations plan.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-body">
                  We are a technology company, not a healthcare provider. Our role is to give hospitals, clinics and
                  health administrators dependable tools, and to stay alongside them as their needs grow.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <dl className="mt-10 grid grid-cols-3 divide-x divide-line border-y border-line">
                  {facts.map((f) => (
                    <div key={f.label} className="px-3 py-5 first:pl-0 sm:px-5">
                      <dt className="sr-only">{f.label}</dt>
                      <dd className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">{f.value}</dd>
                      <dd className="mt-1 text-[12px] leading-snug text-muted sm:text-[13px]">{f.label}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <figure className="relative rounded-[28px] border border-line bg-white p-4 sm:p-8">
                <NetworkIllustration />
                <figcaption className="mt-4 text-center text-[12px] text-muted">
                  Connected care: information moving securely between facilities.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-title" className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Our principles"
              title={<span id="principles-title">What guides our work.</span>}
            />
          </Reveal>
          <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-5">
            {principles.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <li key={p.label}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-shadow duration-500 hover:shadow-lift">
                      <span className="grid size-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
                        <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="mt-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-teal-700">{p.label}</h3>
                      <p className="mt-3 text-lg leading-relaxed text-ink">{p.text}</p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <WhyUs />
      <Approach />
      <CtaBand />
    </>
  );
}
