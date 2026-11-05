import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { enquiryHref, navigation, product, site, solutions } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/primitives";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-mist">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:gap-12">
          {/* Brand Introduction */}
          <div className="max-w-md lg:max-w-sm">
            <Logo className="h-9 sm:h-11" />
            <p className="mt-4 text-[14px] leading-relaxed text-body sm:mt-5 sm:text-[15px]">
              A Ghana-based technology solutions company specialising in health systems development and digital
              health infrastructure, with over {site.experienceYears} years of industry experience. Serving clients
              across Ghana.
            </p>
          </div>

          {/* Navigation Columns (2 columns on mobile, individual columns on desktop) */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:contents">
            <FooterColumn title="Company">
              {navigation.map((n) => (
                <li key={n.id}>
                  <Link
                    href={n.href}
                    className="inline-block py-1 text-[14px] text-body transition-colors hover:text-ink sm:text-[15px]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Solutions">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solutions/#${s.slug}`}
                    className="inline-block py-1 text-[14px] text-body transition-colors hover:text-ink sm:text-[15px]"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${product.slug}/`}
                  className="inline-block py-1 text-[14px] text-body transition-colors hover:text-ink sm:text-[15px]"
                >
                  {product.name}
                </Link>
              </li>
            </FooterColumn>
          </div>

          {/* Contact Column */}
          <div>
            <h2 className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ink sm:text-[13px]">
              Contact
            </h2>
            <div className="mt-4 rounded-2xl border border-line bg-white/70 p-4 shadow-soft sm:mt-5 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
              <div className="flex items-start gap-2.5 text-body">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-signal-500" />
                <address className="not-italic text-[14px] sm:text-[15px]">{site.contact.address}</address>
              </div>

              {site.contact.email ? (
                <div className="mt-3">
                  <a href={`mailto:${site.contact.email}`} className="text-[14px] text-body hover:text-ink sm:text-[15px]">
                    {site.contact.email}
                  </a>
                </div>
              ) : null}

              {site.contact.phone ? (
                <div className="mt-1 text-[14px] text-body sm:text-[15px]">{site.contact.phone}</div>
              ) : null}

              <div className="mt-4 border-t border-line/60 pt-3 sm:border-0 sm:pt-4">
                <Link
                  href={enquiryHref}
                  className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-600 transition-colors hover:text-accent-700 sm:text-[15px]"
                >
                  Send us an enquiry
                  <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

              {site.social.length > 0 && (
                <div className="mt-3 flex gap-3">
                  {site.social.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-body hover:text-ink"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[12px] text-muted sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:pt-8 sm:text-[13px]">
          <p>© {year} Prime-Techmate. All rights reserved.</p>
          <p>Interface visuals on this site are illustrative concepts using fictional data.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-ink sm:text-[13px]">{title}</h2>
      <ul className="mt-3 space-y-1 sm:mt-5 sm:space-y-2">{children}</ul>
    </div>
  );
}
