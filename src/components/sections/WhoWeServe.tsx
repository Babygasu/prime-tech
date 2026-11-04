import { clientTypes } from "@/content/site";
import { clientIcons } from "@/components/brand/solutionIcons";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Photo, type PhotoAsset } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** The types of healthcare institutions Prime-Techmate serves (not named clients). */
export function WhoWeServe({
  title = "Supporting healthcare facilities of every size.",
  lead = "Our solutions and training services help healthcare providers across Ghana strengthen health information management, operational efficiency and patient care delivery.",
  photo,
  className,
}: {
  title?: string;
  lead?: string;
  /** Optional photograph shown beside the facility types on wide screens. */
  photo?: PhotoAsset;
  className?: string;
}) {
  const list = (
    <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4", photo ? "content-start" : "mx-auto mt-14 max-w-5xl lg:grid-cols-3")}>
      {clientTypes.map((c, i) => {
        const Icon = clientIcons[c.icon];
        return (
          <li key={c.label}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <div
                className={cn(
                  "group flex h-full flex-col gap-4 rounded-3xl border border-line bg-white p-5 transition-[box-shadow,transform] duration-500 ease-premium hover:-translate-y-0.5 hover:shadow-lift",
                  !photo && "sm:flex-row sm:items-center sm:p-6",
                )}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cloud text-charcoal-900 transition-colors duration-500 group-hover:bg-accent-600 group-hover:text-white">
                  <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-[17px] font-bold tracking-tight text-ink sm:text-lg">{c.label}</p>
                  {"note" in c ? <p className="mt-0.5 text-[12px] leading-snug text-muted sm:text-[13px]">{c.note}</p> : null}
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section aria-labelledby="serve-title" className={cn("py-24 sm:py-32", className)}>
      <Container>
        <Reveal>
          <SectionHeading align="center" eyebrow="Who we serve" title={<span id="serve-title">{title}</span>} lead={lead} />
        </Reveal>
        {photo ? (
          <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
            <Reveal className="flex">
              <Photo photo={photo} className="w-full" imgClassName="aspect-[4/3] lg:aspect-auto lg:h-full" />
            </Reveal>
            {list}
          </div>
        ) : (
          list
        )}
      </Container>
    </section>
  );
}
