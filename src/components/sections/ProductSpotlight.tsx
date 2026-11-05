import { product } from "@/content/site";
import { capabilityIcons } from "@/components/brand/solutionIcons";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { VisualFrame, WorkflowVisual } from "@/components/visuals/SolutionVisual";

/**
 * Homepage feature for Prime-Techmate's flagship product, Applify EMR.
 * Presents a cohesive two-column product showcase with balanced typography,
 * compact feature list, and an interactive patient journey demonstration.
 */
export function ProductSpotlight() {
  return (
    <section id="applify-emr" aria-labelledby="product-title" className="bg-mist py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Left Column: Product Information */}
          <div>
            <Reveal>
              <Eyebrow tone="light">Our product</Eyebrow>
              <h2
                id="product-title"
                className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink min-[360px]:text-[38px] sm:text-5xl lg:text-[56px]"
              >
                {product.name}
              </h2>
              <p className="mt-2.5 font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                <span>Smarter patient records.</span>{" "}
                <span className="text-accent-600">Simpler healthcare management.</span>
              </p>
              <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-body sm:text-base sm:leading-relaxed">
                Developed by Prime-Techmate, Applify EMR helps healthcare facilities manage patient information, streamline clinical workflows, and improve everyday operations.
              </p>
            </Reveal>

            {/* Compact Feature List */}
            <Reveal delay={0.08}>
              <ul className="mt-6 grid gap-x-5 gap-y-2.5 sm:grid-cols-2" role="list">
                {product.capabilities.map((c) => {
                  const Icon = capabilityIcons[c.icon];
                  return (
                    <li key={c.title} className="flex items-center gap-2.5 text-[13.5px] font-medium text-ink sm:text-[14px]">
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-700 ring-1 ring-accent-200/60">
                        <Icon aria-hidden="true" className="size-3.5" />
                      </span>
                      <span>{c.title}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.14}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={`/${product.slug}/`} arrow size="sm">
                  Discover {product.name}
                </ButtonLink>
                <ButtonLink href="/contact/" variant="secondary" size="sm">
                  Ask about {product.name}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Patient Journey Demonstration */}
          <Reveal delay={0.1}>
            <VisualFrame badge="Illustrative concept · not an Applify EMR screenshot">
              <WorkflowVisual />
            </VisualFrame>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
