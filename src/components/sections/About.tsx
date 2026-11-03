import { site } from "@/content/site";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { NetworkIllustration } from "@/components/visuals/NetworkIllustration";

export function About() {
  const facts = [
    { value: `${site.experienceYears}+`, label: "Years of industry experience" },
    { value: "Accra", label: "Headquartered on Spintex Road" },
    { value: "Ghana", label: "Serving organisations nationwide" },
  ];
  return (
    <section id="about" aria-labelledby="about-title" className="bg-mist py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>About Prime-Techmate</Eyebrow>
              <h2 id="about-title" className="mt-5 text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.75rem] lg:text-5xl">
                Healthcare technology, built on more than {site.experienceYears} years of experience.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-lg leading-relaxed text-body">
                Prime-Techmate is a Ghanaian technology solutions company specialising in health systems development
                and digital health infrastructure.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-body">
                We design, implement and support ICT solutions that help healthcare organisations deliver care,
                manage information and run administration more efficiently.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <dl className="mt-10 grid grid-cols-3 divide-x divide-line border-y border-line">
                {facts.map((f) => (
                  <div key={f.label} className="px-3 py-5 first:pl-0 sm:px-5">
                    <dt className="sr-only">{f.label}</dt>
                    <dd className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">{f.value}</dd>
                    <dd className="mt-1 text-[12px] leading-snug text-muted sm:text-[13px]">{f.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure className="relative rounded-[28px] border border-line bg-white p-4 sm:p-8">
              <NetworkIllustration />
              <figcaption className="mt-4 text-center text-[12px] text-muted">
                Connected care: information moving securely between facilities.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
