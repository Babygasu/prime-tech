import type { Metadata } from "next";
import { solutions } from "@/content/site";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects and implementations delivered by Prime-Techmate across healthcare technology and ICT.",
  alternates: { canonical: "/projects/" },
};

// Structure each verified case study will follow once details are supplied.
const caseStudyParts = [
  { label: "The challenge", text: "[What the client needed and why. To be confirmed.]" },
  { label: "What we delivered", text: "[Scope of work, systems and services provided. To be confirmed.]" },
  { label: "The result", text: "[Verified outcome, in the client's own terms. To be confirmed.]" },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects & experience"
        title={
          <>
            Work that supports <span className="text-signal-500">healthcare delivery.</span>
          </>
        }
        lead="A selection of the projects and implementations behind our experience. Verified project details are being prepared and will be published here."
      >
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-dashed border-charcoal-900/20 bg-cloud px-4 py-2 text-[13px] font-medium text-muted">
          Placeholder content: awaiting verified project details
        </p>
      </PageHero>

      <section aria-label="Project list" className="pb-24 sm:pb-32">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {solutions.map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={(i % 2) * 0.08} className="h-full">
                  <ProjectCard category={s.shortTitle} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="case-title" className="bg-mist py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Case study format"
                title={<span id="case-title">How each project will be presented.</span>}
                lead="Every published project will follow the same simple structure, so visitors can quickly see the problem, the work and the result."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <article className="rounded-3xl border border-dashed border-line bg-white p-6 sm:p-10">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Example layout</p>
                <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-ink">[Project title to be confirmed]</h3>
                <p className="mt-2 text-[14px] text-muted">[Client sector] · [Location] · [Year]</p>
                <ol className="mt-8 space-y-6 border-t border-line pt-8">
                  {caseStudyParts.map((part, i) => (
                    <li key={part.label} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="font-mono text-[13px] font-medium text-accent-600">0{i + 1}</span>
                      <div>
                        <p className="font-semibold text-ink">{part.label}</p>
                        <p className="mt-1 text-[15px] leading-relaxed text-muted">{part.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="pt-24 sm:pt-32">
        <CtaBand
          title="Planning a healthcare technology project?"
          lead="We would be glad to hear about it. Tell us what you are working towards and we will get back to you."
        />
      </div>
    </>
  );
}
