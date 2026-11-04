import { hero } from "@/content/site";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      {/* Backdrop: faint grid + slowly drifting navy glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent_75%)]" />
        <div className="absolute left-1/2 top-[-12%] h-[620px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(36_66_158/0.07),transparent)] motion-safe:animate-drift" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent to-mist" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow centered className="max-w-[18rem] justify-center leading-relaxed sm:max-w-none">
              {hero.eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1
              id="hero-title"
              className="mt-6 text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink sm:text-7xl lg:text-[5.5rem]"
            >
              Powering Healthcare <br className="hidden sm:block" />
              Through <span className="text-signal-500">Technology.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-body sm:text-xl sm:leading-relaxed">
              {hero.lead}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={hero.primaryCta.href} arrow>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>

      <HeroVisual />
    </section>
  );
}
