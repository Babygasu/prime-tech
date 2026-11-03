import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the people behind Prime-Techmate's healthcare technology and ICT solutions.",
  alternates: { canonical: "/team/" },
};

export default function TeamPage() {
  return (
    <section className="pb-24 pt-36 sm:pb-32 sm:pt-44">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Our team</Eyebrow>
            <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-6xl">
              The people behind Prime-Techmate.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-body">
              Team profiles are being prepared and will be added in a future version of this website.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <li key={i}>
              <Reveal delay={i * 0.06}>
                <div className="rounded-3xl border border-dashed border-line bg-mist p-6">
                  <div className="grid aspect-square place-items-center rounded-2xl bg-white text-subtle ring-1 ring-line">
                    <UserRound aria-hidden className="size-10" strokeWidth={1.4} />
                  </div>
                  <p className="mt-5 font-display text-lg font-bold text-ink">[Name to be confirmed]</p>
                  <p className="mt-1 text-[14px] text-muted">[Role to be confirmed]</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/#contact" arrow>
            Talk to Our Team
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
