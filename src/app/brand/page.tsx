import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { ButtonLink, Container, DemoBadge, Eyebrow, SectionHeading } from "@/components/ui/primitives";
import { Logo } from "@/components/brand/Logo";

/**
 * Internal reference: Prime-Techmate colour system and how it is applied.
 * Not linked from navigation and excluded from search engines.
 */
export const metadata: Metadata = {
  title: "Brand colour system",
  robots: { index: false, follow: false },
};

type Swatch = { name: string; token: string; hex: string; role: string; dark?: boolean };

const groups: { title: string; note: string; swatches: Swatch[] }[] = [
  {
    title: "Primary · Charcoal",
    note: "From the black in the logo. Headlines, dark sections, primary data series.",
    swatches: [
      { name: "Charcoal 950", token: "charcoal-950", hex: "#0E0F11", role: "Dark sections", dark: true },
      { name: "Charcoal 900", token: "charcoal-900", hex: "#17181B", role: "Primary brand colour", dark: true },
      { name: "Charcoal 700", token: "charcoal-700", hex: "#2D2F33", role: "Hover on dark", dark: true },
      { name: "Charcoal 500", token: "charcoal-500", hex: "#5D6067", role: "Secondary data", dark: true },
      { name: "Charcoal 400", token: "charcoal-400", hex: "#8D9097", role: "Text on dark" },
      { name: "Charcoal 300", token: "charcoal-300", hex: "#B8BAC0", role: "Labels on dark" },
    ],
  },
  {
    title: "Accent · Signature red",
    note: "From the logo. Used sparingly: calls to action, active states, highlights, one key data point.",
    swatches: [
      { name: "Brand 500", token: "brand-500", hex: "#ED1C24", role: "Logo red · graphics & large type", dark: true },
      { name: "Brand 600", token: "brand-600", hex: "#C8161D", role: "Buttons · small red text", dark: true },
      { name: "Brand 700", token: "brand-700", hex: "#A11218", role: "Button hover", dark: true },
      { name: "Brand 400", token: "brand-400", hex: "#F2585D", role: "Red on dark surfaces", dark: true },
      { name: "Brand 50", token: "brand-50", hex: "#FEF4F3", role: "Selected row tint" },
    ],
  },
  {
    title: "Backgrounds & neutrals",
    note: "Warm whites and greys that keep the site calm and premium.",
    swatches: [
      { name: "Paper", token: "paper", hex: "#FCFBF9", role: "Page background" },
      { name: "White", token: "white", hex: "#FFFFFF", role: "Cards & panels" },
      { name: "Mist", token: "mist", hex: "#F7F6F3", role: "Alternate sections" },
      { name: "Cloud", token: "cloud", hex: "#F0EEEA", role: "Icon tiles, inputs" },
      { name: "Line", token: "line", hex: "#E7E5E1", role: "Borders & dividers" },
    ],
  },
  {
    title: "Text",
    note: "A clear hierarchy with strong contrast.",
    swatches: [
      { name: "Ink", token: "ink", hex: "#141416", role: "Headings", dark: true },
      { name: "Body", token: "body", hex: "#4B4B52", role: "Paragraphs", dark: true },
      { name: "Muted", token: "muted", hex: "#6A6A71", role: "Secondary text", dark: true },
      { name: "Subtle", token: "subtle", hex: "#9C9CA2", role: "Decorative only" },
    ],
  },
  {
    title: "Status (dashboard only)",
    note: "Muted tones so states never compete with the brand red.",
    swatches: [
      { name: "Success", token: "success", hex: "#2F7A58", role: "Online, approved, positive change", dark: true },
      { name: "Success soft", token: "success-soft", hex: "#EAF4EE", role: "Success chip background" },
      { name: "Warning", token: "warning", hex: "#94600A", role: "Pending, under review", dark: true },
      { name: "Warning soft", token: "warning-soft", hex: "#FBF1DF", role: "Warning chip background" },
    ],
  },
];

const contrast: [string, string, string, string][] = [
  ["White on Brand 600 (buttons)", "#FFFFFF", "#C8161D", "5.85 : 1 · AA"],
  ["Brand 600 on white (links)", "#C8161D", "#FFFFFF", "5.85 : 1 · AA"],
  ["Brand 500 on white (large type only)", "#ED1C24", "#FFFFFF", "4.38 : 1 · AA large"],
  ["Body on white", "#4B4B52", "#FFFFFF", "8.65 : 1 · AAA"],
  ["Muted on paper", "#6A6A71", "#FCFBF9", "5.19 : 1 · AA"],
  ["Charcoal 300 on Charcoal 950", "#B8BAC0", "#0E0F11", "9.88 : 1 · AAA"],
  ["Brand 400 on Charcoal 950", "#F2585D", "#0E0F11", "5.78 : 1 · AA"],
];

const redDo = [
  "Primary call-to-action buttons",
  "Active navigation and selected tabs",
  "One highlighted word in a page headline",
  "The small rule beside section labels",
  "A single key data point in a chart (today, below target, missed)",
  "Notification and live indicators",
];
const redDont = [
  "Large background areas or full sections",
  "Every chart series or every icon",
  "Body text or long passages",
  "Decorative gradients",
  "Success or neutral states",
];

export default function BrandPage() {
  return (
    <div className="pb-24 pt-32 sm:pb-32 sm:pt-40">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Design system · internal"
            title="Prime-Techmate colour system"
            lead="Built from the official logo: charcoal as the primary brand colour, the signature red as a controlled accent, and warm neutrals for calm, premium backgrounds."
          />
          <div className="rounded-3xl border border-line bg-white p-6">
            <Logo className="h-14" />
            <p className="mt-3 text-[12px] text-muted">Official logo · unaltered artwork and colours</p>
          </div>
        </div>

        {groups.map((g) => (
          <section key={g.title} className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-ink">{g.title}</h2>
            <p className="mt-1 text-[15px] text-body">{g.note}</p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {g.swatches.map((s) => (
                <li key={s.token} className="overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="flex h-24 items-end p-3" style={{ background: s.hex }}>
                    <span className={s.dark ? "font-mono text-[11px] text-white/90" : "font-mono text-[11px] text-ink/70"}>{s.hex}</span>
                  </div>
                  <div className="p-3">
                    <p className="text-[13px] font-semibold text-ink">{s.name}</p>
                    <p className="font-mono text-[11px] text-muted">{s.token}</p>
                    <p className="mt-1.5 text-[12px] leading-snug text-body">{s.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mt-20 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-8">
            <h2 className="text-xl font-bold tracking-tight text-ink">Where red is used</h2>
            <ul className="mt-5 space-y-3">
              {redDo.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-ink">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-8">
            <h2 className="text-xl font-bold tracking-tight text-ink">Where red is avoided</h2>
            <ul className="mt-5 space-y-3">
              {redDont.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-body">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cloud text-charcoal-600">
                    <X className="size-3" strokeWidth={3} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Components</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-8">
              <Eyebrow>Section label</Eyebrow>
              <p className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em] text-ink">
                Powering Healthcare Through <span className="text-brand-500">Technology.</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/brand/" arrow>Primary</ButtonLink>
                <ButtonLink href="/brand/" variant="dark">Dark</ButtonLink>
                <ButtonLink href="/brand/" variant="secondary">Secondary</ButtonLink>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <DemoBadge />
                <span className="rounded-full bg-success-soft px-2.5 py-1 text-[12px] font-medium text-success">Online</span>
                <span className="rounded-full bg-warning-soft px-2.5 py-1 text-[12px] font-medium text-warning">Under review</span>
                <span className="rounded-full bg-cloud px-2.5 py-1 text-[12px] font-medium text-muted">Discharged</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-charcoal-950 p-8 text-white">
              <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(237_28_36/0.18),transparent)]" />
              <div className="relative">
                <Eyebrow tone="dark">On dark</Eyebrow>
                <p className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em]">
                  14<span className="text-brand-500">+</span> years
                </p>
                <p className="mt-3 max-w-sm text-[15px] text-charcoal-400">Secondary text on charcoal uses Charcoal 400 for comfortable contrast.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/brand/" arrow>Primary</ButtonLink>
                  <ButtonLink href="/brand/" variant="ghostDark">Ghost</ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Data colours</h2>
          <p className="mt-1 text-[15px] text-body">Charcoal leads, greys support, red marks only what needs attention.</p>
          <div className="mt-6 rounded-3xl border border-line bg-white p-8">
            <div className="flex h-40 items-end gap-3">
              {[54, 62, 58, 70, 66, 78, 74, 88].map((h, i) => (
                <div key={i} className="flex flex-1 items-end gap-1">
                  <span className="flex-1 rounded-t-md bg-charcoal-900" style={{ height: `${h}%` }} />
                  <span className="flex-1 rounded-t-md bg-[#c9c7c2]" style={{ height: `${h * 0.6}%` }} />
                </div>
              ))}
              <div className="flex flex-1 items-end gap-1">
                <span className="flex-1 rounded-t-md bg-brand-500" style={{ height: "96%" }} />
                <span className="flex-1 rounded-t-md bg-[#c9c7c2]" style={{ height: "58%" }} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-[12px] text-muted">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-charcoal-900" />Primary series · #17181B</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#8d9097]" />Secondary · #8D9097</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#c9c7c2]" />Tertiary · #C9C7C2</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-brand-500" />Highlight · #ED1C24</span>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Contrast checks</h2>
          <p className="mt-1 text-[15px] text-body">Measured against WCAG 2.1. The logo red is kept for graphics and large type; buttons use Brand 600.</p>
          <ul className="mt-6 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
            {contrast.map(([label, fg, bg, ratio]) => (
              <li key={label} className="flex items-center gap-4 px-6 py-4">
                <span className="grid h-10 w-16 shrink-0 place-items-center rounded-lg text-[15px] font-semibold ring-1 ring-line" style={{ color: fg, background: bg }}>
                  Aa
                </span>
                <span className="flex-1 text-[14px] text-ink">{label}</span>
                <span className="font-mono text-[13px] text-body">{ratio}</span>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
