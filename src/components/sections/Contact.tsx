import { MapPin } from "lucide-react";
import { finalCta, site } from "@/content/site";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-charcoal-950 px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_20%_30%,black,transparent_80%)]" />
              <div className="absolute -left-40 -top-40 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(123_150_214/0.18),transparent)] motion-safe:animate-drift" />
            </div>

            <div className="relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div className="flex flex-col">
                <Eyebrow tone="dark">{finalCta.eyebrow}</Eyebrow>
                <h2 id="contact-title" className="mt-5 text-[2.25rem] font-bold leading-[1.06] tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]">
                  {finalCta.title}
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal-400">{finalCta.lead}</p>

                <div className="mt-10 flex items-start gap-3 lg:mt-auto lg:pt-10">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-accent-400 ring-1 ring-white/10">
                    <MapPin aria-hidden className="size-[18px]" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-charcoal-400">Head office</p>
                    <address className="mt-1 not-italic text-white">{site.contact.address}</address>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
