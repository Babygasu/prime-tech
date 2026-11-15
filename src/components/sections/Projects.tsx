import { deploymentCapabilities } from "@/content/site";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "./ProjectCard";

/**
 * Homepage deployment capabilities showcase.
 * Replaces wireframe placeholders with verified deployment capability profiles.
 */
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Projects & experience"
              title={<span id="projects-title">Work that supports healthcare delivery across Ghana.</span>}
              lead="Proven deployment scopes across primary clinics, maternity homes, and hospital environments."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-cloud px-4 py-2 text-[12.5px] font-semibold text-charcoal-800 shadow-xs sm:text-[13px]">
              <span className="size-2 rounded-full bg-success" />
              Verified Deployment Scopes across Ghana
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {deploymentCapabilities.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <ProjectCard capability={p} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href="/projects/" variant="secondary" arrow>
            Explore all capabilities & case studies
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
