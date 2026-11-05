"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { enquiryHref, navigation } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  // Highlight the nav item for the current page (first URL segment; "" = home).
  const active = pathname.split("/")[1] ?? "";
  const navItems = navigation.filter((item) => item.id !== "contact");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-premium",
        scrolled || open
          ? "border-b border-line/80 bg-white/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Link href="/" aria-label="Prime-Techmate home" className="rounded-lg" onClick={() => setOpen(false)}>
          <Logo priority className="h-8 sm:h-10" />
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-300",
                    isActive ? "text-ink" : "text-body hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-cloud"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  >
                    {/* Red signature marker travels with the pill. */}
                    <span className="absolute bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-signal-500" />
                  </motion.span>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={enquiryHref}
            className="group hidden h-10 items-center gap-1.5 rounded-full bg-accent-600 px-5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-accent-700 sm:inline-flex"
          >
            Make an Enquiry
            <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            className="relative inline-flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-ink transition-colors hover:bg-cloud active:scale-95 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative flex h-3.5 w-[18px] flex-col justify-between" aria-hidden="true">
              <span
                className={cn(
                  "block h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-premium",
                  open && "translate-y-[6px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full rounded-full bg-current transition-all duration-200 ease-premium",
                  open && "opacity-0 scale-x-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-premium",
                  open && "-translate-y-[6px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col overflow-y-auto overscroll-contain bg-white px-4 pb-12 pt-2 sm:px-6 xl:hidden"
          >
            <ul className="flex flex-col divide-y divide-line">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 + i * 0.03, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "page" : undefined}
                    className={cn(
                      "flex min-h-[52px] items-center justify-between py-3.5 font-display text-[19px] font-semibold tracking-tight transition-colors sm:text-2xl",
                      active === item.id ? "text-accent-600" : "text-ink hover:text-accent-600",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      {active === item.id && (
                        <span className="size-1.5 rounded-full bg-signal-500" aria-hidden="true" />
                      )}
                      {item.label}
                    </span>
                    <ArrowRight aria-hidden className="size-4 text-subtle" />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 shrink-0 pb-6">
              <Link
                href={enquiryHref}
                onClick={() => setOpen(false)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent-600 text-[15px] font-semibold text-white shadow-soft transition-colors hover:bg-accent-700 active:scale-[0.99]"
              >
                Make an Enquiry
                <ArrowRight aria-hidden className="size-4" />
              </Link>
              <p className="mt-4 text-center text-xs text-muted">
                Reliable healthcare technology & ICT solutions across Ghana
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
