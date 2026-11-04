import type { Metadata } from "next";
import { product } from "@/content/site";
import { capabilityIcons } from "@/components/brand/solutionIcons";
import { ButtonLink, Container, DemoBadge, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { BrowserFrame, ScaledCanvas } from "@/components/visuals/Frame";
import { DASHBOARD_HEIGHT, DASHBOARD_WIDTH, DemoDashboard } from "@/components/visuals/dashboard/DemoDashboard";
import { Photo, photos } from "@/components/ui/Photo";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Applify EMR",
  description:
    "Applify EMR is an Electronic Medical Records system developed and owned by Prime-Techmate, helping healthcare facilities in Ghana manage patient information and improve clinical workflows.",
  alternates: { canonical: "/applify-emr/" },
};

export default function ApplifyPage() {
  return (
    <>
      <PageHero
        eyebrow="Our product"
        title={
          <>
            Applify <span className="text-signal-500">EMR.</span>
          </>
        }
        lead={product.summary}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact/" arrow>
            Ask about Applify EMR
          </ButtonLink>
          <ButtonLink href="#capabilities" variant="secondary">
            See capabilities
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-label="Interface concept" className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <figure>
              <BrowserFrame>
                <ScaledCanvas
                  width={DASHBOARD_WIDTH}
                  height={DASHBOARD_HEIGHT}
                  label="Illustrative patient records screen with fictional sample data. Not an actual Applify EMR screenshot."
                >
                  <DemoDashboard view="records" />
                </ScaledCanvas>
              </BrowserFrame>
              <figcaption className="mt-5 flex justify-center">
                <DemoBadge>Illustrative concept with fictional data · not an actual Applify EMR screenshot</DemoBadge>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="digital-title" className="bg-mist py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Fully digital records"
                title={<span id="digital-title">Less paperwork. Faster access to what matters.</span>}
              />
              <p className="mt-6 text-lg leading-relaxed text-body">{product.detail}</p>
              <p className="mt-4 text-lg leading-relaxed text-body">
                From registration to billing, every step of the patient&apos;s visit is recorded in one connected system.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Photo photo={photos.cliniciansDashboard} imgClassName="aspect-[3/2]" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="capabilities" aria-labelledby="capabilities-title" className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Key capabilities"
              title={<span id="capabilities-title">Everything a facility needs in one system.</span>}
            />
          </Reveal>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {product.capabilities.map((c, i) => {
              const Icon = capabilityIcons[c.icon];
              return (
                <li key={c.title} className={i === product.capabilities.length - 1 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                  <Reveal delay={(i % 4) * 0.06} className="h-full">
                    <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-charcoal-900/15 hover:shadow-lift">
                      <span className="grid size-11 place-items-center rounded-xl bg-cloud text-charcoal-900 transition-colors duration-500 group-hover:bg-accent-600 group-hover:text-white">
                        <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="mt-6 text-lg font-bold tracking-[-0.02em] text-ink">{c.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-body">{c.text}</p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <WhoWeServe className="bg-mist" title="Built for every level of care." lead={product.scalability} />

      <div className="pt-24 sm:pt-32">
        <CtaBand
          title="Interested in Applify EMR?"
          lead="Tell us about your facility and we will show you how Applify EMR can support your team."
        />
      </div>
    </>
  );
}
