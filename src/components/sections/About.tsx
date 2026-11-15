import { about } from "@/content/site";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { NetworkIllustration } from "@/components/visuals/NetworkIllustration";
import { MapPin, ShieldCheck, Zap } from "lucide-react";

export function About() {
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
              <div className="mt-4 max-w-[34rem] space-y-3.5 sm:mt-5">
                {about.paragraphs.map((p, i) => (
                  <p key={i} className="text-[16.5px] leading-relaxed text-body sm:text-[17.5px] sm:leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Nationwide commitment and healthcare mission callouts */}
            <Reveal delay={0.14}>
              <div className="mt-6 max-w-[34rem] rounded-2xl border border-line bg-white/80 p-4.5 shadow-soft backdrop-blur-sm sm:mt-8 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-200/60">
                    <MapPin className="size-4.5" />
                  </span>
                  <div>
                    <h3 className="text-[14px] font-bold text-ink sm:text-[15px]">Nationwide Deployment & Support</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-body sm:text-[13.5px]">
                      {about.reach}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line/70 pt-3.5">
                  <div className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
                    <ShieldCheck className="size-4 text-signal-500 shrink-0" />
                    <span>GHS & NHIS Aligned</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
                    <Zap className="size-4 text-accent-600 shrink-0" />
                    <span>24/7 Local Support</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure className="relative rounded-[28px] border border-line bg-white p-4 shadow-soft sm:p-7">
              <NetworkIllustration />
              <figcaption className="mt-3.5 text-center text-[12px] text-muted">
                Connected care: information moving securely between facilities across Ghana.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
