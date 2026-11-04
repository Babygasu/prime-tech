import type { ReactNode } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { enquiryHref, navigation, product, site, solutions } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/primitives";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-mist">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div className="max-w-sm">
            <Logo className="h-11" />
            <p className="mt-5 text-[15px] leading-relaxed text-body">
              A Ghana-based technology solutions company specialising in health systems development and digital
              health infrastructure, with over {site.experienceYears} years of industry experience. Serving clients
              across Ghana.
            </p>
          </div>

          <FooterColumn title="Company">
            {navigation.map((n) => (
              <li key={n.id}>
                <Link href={n.href} className="text-body transition-colors hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Solutions">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/#${s.slug}`} className="text-body transition-colors hover:text-ink">
                  {s.shortTitle}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${product.slug}/`} className="text-body transition-colors hover:text-ink">
                {product.name}
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Contact">
            <li className="flex gap-2.5 text-body">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-500" />
              <address className="not-italic">{site.contact.address}</address>
            </li>
            {site.contact.email ? (
              <li>
                <a href={`mailto:${site.contact.email}`} className="text-body hover:text-ink">
                  {site.contact.email}
                </a>
              </li>
            ) : null}
            {site.contact.phone ? <li className="text-body">{site.contact.phone}</li> : null}
            <li>
              <Link href={enquiryHref} className="font-semibold text-brand-600 hover:text-brand-700">
                Send us an enquiry →
              </Link>
            </li>
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-body hover:text-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
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
      <h2 className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">{title}</h2>
      <ul className="mt-5 space-y-3 text-[15px]">{children}</ul>
    </div>
  );
}
