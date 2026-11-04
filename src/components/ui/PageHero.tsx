import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** Opening block shared by every inner page: eyebrow, large headline, lead. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby="page-title" className={cn("relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_15%_0%,black,transparent_75%)]" />
        <div className="absolute -left-40 -top-56 h-[520px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgb(237_28_36/0.06),transparent)] motion-safe:animate-drift" />
      </div>
      <Container className="relative">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1
              id="page-title"
              className="mt-5 text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[4.25rem]"
            >
              {title}
            </h1>
          </Reveal>
          {lead ? (
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body sm:text-xl sm:leading-relaxed">{lead}</p>
            </Reveal>
          ) : null}
        </div>
        {children ? <Reveal delay={0.18}>{children}</Reveal> : null}
      </Container>
    </section>
  );
}
