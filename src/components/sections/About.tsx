import { about, site } from "@/content/site";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { NetworkIllustration } from "@/components/visuals/NetworkIllustration";

export function About() {
  const facts = [
    { value: `${site.experienceYears}+`, label: "Years of industry experience" },
    { value: "Accra", label: "Headquartered on Spintex Road" },
    { value: "Ghana", label: "Nationwide service delivery" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="bg-mist py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div>
            <Reveal>
              <h2
                id="about-title"
                className="max-w-[32rem] text-[28px] font-bold leading-[1.15] tracking-[-0.03em] text-ink min-[360px]:text-[32px] sm:text-4xl sm:leading-[1.14] lg:text-[40px] lg:leading-[1.16]"
              >
                {about.title}
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-4 max-w-[34rem] space-y-3 sm:mt-5">
                {about.paragraphs.map((p, i) => (
                  <p key={i} className="text-[17px] leading-relaxed text-body sm:text-[18px] sm:leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-6 grid max-w-[34rem] grid-cols-3 divide-x divide-line border-y border-line py-1 sm:mt-8">
                {facts.map((f) => (
                  <div key={f.label} className="py-3.5 px-3 first:pl-0 sm:px-4 sm:py-4">
                    <dt className="sr-only">{f.label}</dt>
                    <dd className="font-display text-2xl font-bold tracking-tight text-charcoal-900 sm:text-3xl">{f.value}</dd>
                    <dd className="mt-1 text-[12px] leading-snug text-muted sm:text-[13px]">{f.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure className="relative rounded-[28px] border border-line bg-white p-4 shadow-soft sm:p-7">
              <NetworkIllustration />
              <figcaption className="mt-3.5 text-center text-[12px] text-muted">
                Connected care: information moving securely between facilities.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
