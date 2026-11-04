import { product } from "@/content/site";
import { capabilityIcons } from "@/components/brand/solutionIcons";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { VisualFrame, WorkflowVisual } from "@/components/visuals/SolutionVisual";

/** Homepage feature for Prime-Techmate's own product, Applify EMR. */
export function ProductSpotlight() {
  return (
    <section id="applify-emr" aria-labelledby="product-title" className="bg-mist py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Our product</Eyebrow>
              <h2 id="product-title" className="mt-5 text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink sm:text-6xl">
                {product.name}
              </h2>
              <p className="mt-3 font-display text-lg font-semibold tracking-tight text-charcoal-600 sm:text-xl">{product.tagline}</p>
              <p className="mt-6 text-lg leading-relaxed text-body">{product.summary}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {product.capabilities.map((c) => {
                  const Icon = capabilityIcons[c.icon];
                  return (
                    <li key={c.title} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-charcoal-900 ring-1 ring-line">
                        <Icon aria-hidden className="size-4" />
                      </span>
                      {c.title}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/${product.slug}/`} arrow>
                  Discover {product.name}
                </ButtonLink>
                <ButtonLink href="/contact/" variant="secondary">
                  Ask about {product.name}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
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
