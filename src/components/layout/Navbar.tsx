"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { enquiryHref, navigation } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  // Highlight the nav item for the current page (first URL segment; "" = home).
  const active = pathname.split("/")[1] ?? "";
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
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Prime-Techmate home" className="rounded-lg" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
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
                  />
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={enquiryHref}
            className="group hidden h-10 items-center gap-1.5 rounded-full bg-navy-900 px-5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-navy-700 sm:inline-flex"
          >
            Make an Enquiry
            <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cloud lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <ul className="flex flex-col px-4 pt-4 sm:px-6">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-line py-4 font-display text-2xl font-semibold tracking-tight",
                      active === item.id ? "text-teal-700" : "text-ink",
                    )}
                  >
                    {item.label}
                    <ArrowRight aria-hidden className="size-5 text-subtle" />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="px-4 pt-8 sm:px-6">
              <Link
                href={enquiryHref}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center rounded-full bg-navy-900 text-[15px] font-semibold text-white"
              >
                Make an Enquiry
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
