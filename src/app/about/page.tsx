import type { Metadata } from "next";
import { Eye, MapPin, Target } from "lucide-react";
import { about, mission, site, vision } from "@/content/site";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { NetworkIllustration } from "@/components/visuals/NetworkIllustration";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { WhyUs } from "@/components/sections/WhyUs";
import { Approach } from "@/components/sections/Approach";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description: `Prime-Techmate is a Ghana-based health technology company with over ${site.experienceYears} years of experience, headquartered on Spintex Road, Accra, and serving healthcare institutions nationwide.`,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  const facts = [
    { value: `${site.experienceYears}+`, label: "Years of industry experience" },
    { value: "Accra", label: "Headquartered on Spintex Road" },
    { value: "Ghana", label: "Nationwide service delivery" },
  ];
  const statements = [
    { label: "Our mission", text: mission, icon: Target },
    { label: "Our vision", text: vision, icon: Eye },
  ];

  return (
    <>
      <PageHero
        eyebrow="About Prime-Techmate"
        title={
          <>
            Health technology, <br className="hidden sm:block" />
            made in <span className="text-signal-500">Ghana.</span>
          </>
        }
        lead="We specialise in health systems development and digital health infrastructure, providing reliable ICT solutions that strengthen healthcare delivery, improve data management and support efficient health administration."
      />

      <section aria-labelledby="story-title" className="bg-mist py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Who we are"
                  title={<span id="story-title">{about.title}</span>}
                />
              </Reveal>
              <Reveal delay={0.08}>
                {about.paragraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "mt-6 text-lg leading-relaxed text-body" : "mt-4 text-lg leading-relaxed text-body"}>
                    {p}
                  </p>
                ))}
                <p className="mt-4 text-lg leading-relaxed text-body">
                  We design, implement and support the digital systems that power modern healthcare environments,
                  helping healthcare institutions, organisations and agencies improve operational efficiency and
                  patient care.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <dl className="mt-10 grid grid-cols-3 divide-x divide-line border-y border-line">
                  {facts.map((f) => (
                    <div key={f.label} className="px-3 py-5 first:pl-0 sm:px-5">
                      <dt className="sr-only">{f.label}</dt>
                      <dd className="font-display text-2xl font-bold tracking-tight text-charcoal-900 sm:text-3xl">{f.value}</dd>
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

      <section aria-labelledby="purpose-title" className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Mission & vision"
              title={<span id="purpose-title">What drives our work.</span>}
            />
          </Reveal>
          <ul className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2 lg:gap-5">
            {statements.map((s, i) => (
              <li key={s.label}>
                <Reveal delay={i * 0.08} className="h-full">
                  <article
                    className={
                      i === 0
                        ? "relative flex h-full flex-col overflow-hidden rounded-3xl bg-navy-900 p-8 text-white sm:p-10"
                        : "flex h-full flex-col rounded-3xl border border-line bg-white p-8 sm:p-10"
                    }
                  >
                    <span
                      className={
                        i === 0
                          ? "grid size-11 place-items-center rounded-xl bg-white/[0.08] text-signal-400"
                          : "grid size-11 place-items-center rounded-xl bg-cloud text-charcoal-900"
                      }
                    >
                      <s.icon aria-hidden className="size-5" strokeWidth={1.8} />
                    </span>
                    <h3 className={i === 0 ? "mt-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-300" : "mt-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-muted"}>
                      {s.label}
                    </h3>
                    <p className={i === 0 ? "mt-3 font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl" : "mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl"}>
                      {s.text}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-5 flex max-w-5xl flex-col gap-4 rounded-3xl border border-line bg-mist p-8 sm:flex-row sm:items-center sm:gap-6 sm:p-10">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-signal-500 ring-1 ring-line">
                <MapPin aria-hidden className="size-5" strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-muted">Our reach</h3>
                <p className="mt-2 text-lg leading-relaxed text-ink">{about.reach}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <WhoWeServe className="bg-mist" />
      <WhyUs />
      <Approach />
      <CtaBand />
    </>
  );
}
