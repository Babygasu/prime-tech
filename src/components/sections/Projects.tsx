import { projectPlaceholders } from "@/content/site";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "./ProjectCard";

/**
 * Homepage project preview. Every card is a clearly marked placeholder
 * until verified project details are supplied.
 */
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Projects & experience"
              title={<span id="projects-title">Work that supports healthcare delivery.</span>}
              lead="Selected projects and implementations will be showcased here."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="inline-flex items-center gap-2 rounded-full border border-dashed border-charcoal-900/20 bg-cloud px-4 py-2 text-[13px] font-medium text-muted">
              Placeholder content: awaiting verified project details
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projectPlaceholders.map((p, i) => (
            <li key={p.category}>
              <Reveal delay={i * 0.08} className="h-full">
                <ProjectCard category={p.category} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href="/projects/" variant="secondary" arrow>
            View projects
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
