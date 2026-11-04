import { enquiryHref, finalCta } from "@/content/site";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

/** Compact closing call to action used at the end of inner pages. */
export function CtaBand({
  title = finalCta.title,
  lead = finalCta.lead,
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section aria-labelledby="cta-band-title" className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-navy-950 px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_85%_50%,black,transparent_80%)]" />
              <div className="absolute -right-32 -top-40 size-[480px] rounded-full bg-[radial-gradient(closest-side,rgb(237_28_36/0.16),transparent)] motion-safe:animate-drift" />
            </div>
            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow tone="dark">{finalCta.eyebrow}</Eyebrow>
                <h2 id="cta-band-title" className="mt-5 text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
                  {title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-navy-300">{lead}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <ButtonLink href={enquiryHref} variant="light" arrow>
                  {finalCta.cta}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
