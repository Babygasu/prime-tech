"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export type ServiceSlide = {
  id: string;
  category: string;
  heading: string;
  description: string;
  image: string;
  alt: string;
  href: string;
};

export const services: ServiceSlide[] = [
  {
    id: "emr",
    category: "DIGITAL HEALTH",
    heading: "Electronic Medical Records",
    description: "Smarter patient records and streamlined clinical workflows.",
    image: "/images/image-1.jpg",
    alt: "Healthcare professionals working with modern electronic medical records in a Ghanaian clinic.",
    href: "/solutions/#electronic-medical-records",
  },
  {
    id: "hmis",
    category: "HEALTH DATA & MANAGEMENT",
    heading: "Health Management Information Systems",
    description: "Connected healthcare data for more informed decisions.",
    image: "/images/image-12.jpg",
    alt: "Healthcare administrators analyzing data and health management information systems in a hospital.",
    href: "/solutions/#health-management-information-systems",
  },
  {
    id: "network",
    category: "HEALTHCARE INFRASTRUCTURE",
    heading: "Network Infrastructure & Configuration",
    description: "Reliable, secure connectivity for modern healthcare facilities.",
    image: "/images/image-123.jpg",
    alt: "Healthcare IT specialist configuring reliable network infrastructure and communications hardware.",
    href: "/solutions/#network-infrastructure",
  },
  {
    id: "claims",
    category: "TRAINING & SUPPORT",
    heading: "Claims Systems Support & Training",
    description: "Helping healthcare teams manage digital insurance claims efficiently.",
    image: "/images/image-1234.jpg",
    alt: "Healthcare staff participating in computer-based health insurance claims training.",
    href: "/solutions/#health-insurance-claims",
  },
];

/**
 * Editorial photography-led horizontal carousel for Prime-Techmate's services.
 * Features full-bleed authentic photography, dark gradient text overlays,
 * responsive aspect ratios, and smooth touch and button navigation.
 */
export function Solutions() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse drag-to-scroll state
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const cards = el.querySelectorAll<HTMLElement>("[data-card-index]");
    const trackPaddingLeft = parseFloat(window.getComputedStyle(el).paddingLeft) || 0;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardPosition = card.offsetLeft - trackPaddingLeft;
      const distance = Math.abs(cardPosition - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scrollToSlide = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card-index]");
    const target = cards[index];
    if (target) {
      const trackPaddingLeft = parseFloat(window.getComputedStyle(el).paddingLeft) || 0;
      const targetLeft = target.offsetLeft - trackPaddingLeft;
      el.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    scrollToSlide(Math.max(0, activeIndex - 1));
  };

  const scrollNext = () => {
    scrollToSlide(Math.min(services.length - 1, activeIndex + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    const el = trackRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.35;
    if (Math.abs(walk) > 6) {
      hasDragged.current = true;
    }
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32">
      {/* Section Header */}
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow tone="light">Our solutions</Eyebrow>
              <h2
                id="solutions-title"
                className="mt-4 text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[2.75rem] lg:text-[3.25rem]"
              >
                Technology that powers better healthcare.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">
                Explore our digital healthcare solutions designed to improve clinical workflows, strengthen operations, and support connected care.
              </p>
            </div>
            <div className="hidden shrink-0 md:block">
              <ButtonLink href="/solutions/" variant="secondary" arrow size="sm">
                View all solutions
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Editorial Horizontal Carousel Track */}
      <div className="relative mt-10 sm:mt-14 lg:mt-16">
        <div
          ref={trackRef}
          onScroll={checkScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={cn(
            "no-scrollbar flex gap-4 overflow-x-auto scroll-smooth py-3 sm:gap-6",
            "snap-x snap-mandatory",
            "cursor-grab active:cursor-grabbing select-none",
            "pl-4 sm:pl-6 lg:pl-[calc(max(2rem,(100vw-1200px)/2+2rem))]",
            "pr-6 sm:pr-8 lg:pr-[calc(max(2rem,(100vw-1200px)/2+2rem))]"
          )}
          role="region"
          aria-label="Services carousel"
          tabIndex={0}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              data-card-index={index}
              className="shrink-0 snap-start snap-always"
            >
              <Link
                href={service.href}
                onClickCapture={handleClickCapture}
                className="group relative block h-full w-[86vw] max-w-[380px] overflow-hidden rounded-[24px] border border-charcoal-900/[0.08] bg-charcoal-950 shadow-soft transition-all duration-500 ease-premium hover:shadow-lift sm:w-[680px] sm:max-w-none sm:rounded-[32px] lg:w-[820px] xl:w-[920px]"
              >
                {/* Full-bleed Photo with Aspect Ratio */}
                <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[1.8/1] lg:aspect-[1.85/1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    className="size-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                  />

                  {/* Dark gradient overlay for text legibility */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 via-45% to-transparent transition-opacity duration-300 group-hover:from-charcoal-950 group-hover:via-charcoal-950/60"
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-9 lg:p-11">
                    <div className="flex items-end justify-between gap-4">
                      {/* Left side: Category, Heading, Description */}
                      <div className="max-w-2xl">
                        <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-300 drop-shadow-sm sm:text-xs">
                          {service.category}
                        </span>
                        <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-3xl lg:text-[2.25rem] lg:leading-[1.12]">
                          {service.heading}
                        </h3>
                        <p className="mt-2.5 max-w-xl text-[13.5px] leading-relaxed text-white/85 drop-shadow-sm sm:mt-3 sm:text-base sm:leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Right side: Circular Arrow Button */}
                      <div
                        aria-hidden="true"
                        className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white transition-all duration-300 group-hover:scale-105 group-hover:border-accent-500 group-hover:bg-accent-600 sm:size-12"
                      >
                        <ArrowRight className="size-5 transition-transform duration-300 ease-premium group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls (Dots + Circular Navigation Buttons) */}
      <Container className="mt-8 flex items-center justify-between sm:mt-10">
        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
          {services.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`Go to slide ${idx + 1}: ${s.heading}`}
              onClick={() => scrollToSlide(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-premium",
                activeIndex === idx ? "w-8 bg-accent-600" : "w-2 bg-charcoal-300/60 hover:bg-charcoal-400"
              )}
            />
          ))}
        </div>

        {/* Minimal Circular Previous and Next Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            aria-label="Previous slide"
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink shadow-soft transition-all duration-300 hover:border-charcoal-900/30 hover:bg-mist active:scale-95 disabled:pointer-events-none disabled:opacity-30 sm:size-12"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollRight}
            aria-label="Next slide"
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink shadow-soft transition-all duration-300 hover:border-charcoal-900/30 hover:bg-mist active:scale-95 disabled:pointer-events-none disabled:opacity-30 sm:size-12"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </Container>

      {/* Mobile view all link */}
      <div className="mt-8 flex justify-center px-4 md:hidden">
        <ButtonLink href="/solutions/" variant="secondary" arrow size="sm" className="w-full max-w-sm">
          View all solutions
        </ButtonLink>
      </div>
    </section>
  );
}
