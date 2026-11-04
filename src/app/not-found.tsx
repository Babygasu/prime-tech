import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-28 pt-40 sm:pb-36 sm:pt-52">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent_75%)]" />
      <Container className="relative text-center">
        <Eyebrow centered className="justify-center">
          Error 404
        </Eyebrow>
        <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-6xl">
          This page could not be found.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-body">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact/" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
