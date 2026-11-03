# Prime-Techmate Website — Version 0

Corporate website redesign for Prime-Techmate, a Ghanaian healthcare technology and ICT solutions company.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide · Recharts

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

The site is configured as a **static export** (`next.config.ts`), so the contents of `out/` can be uploaded
directly to the existing Hostinger static hosting.

## Project structure

```
src/
  app/                  routes, metadata, OG image, sitemap, robots
    page.tsx            homepage (composes sections)
    team/page.tsx       team page (placeholder profiles)
  content/site.ts       ALL copy and company facts — edit text here
  components/
    layout/             Navbar, Footer
    sections/           Hero, About, Solutions, TechInAction, Approach, WhyUs, Projects, Contact
    visuals/            DemoDashboard (4 views), HeroVisual, NetworkIllustration, frames
    ui/                 shared primitives (Container, SectionHeading, ButtonLink, DemoBadge)
    motion/             Reveal + reduced-motion provider
```

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `navy-900` / `navy-950` | `#0b1a33` / `#071122` | Corporate primary, dark sections |
| `teal-500` / `teal-700` | `#14b3a0` / `#0b766b` | Technology accent / accessible teal text |
| `mist` / `cloud` / `line` | `#f6f8fb` / `#eef2f6` / `#e4e9f0` | Backgrounds and borders |
| `ink` / `body` / `muted` | `#0b1220` / `#475467` / `#667085` | Text hierarchy |

Typography: **Manrope** (headlines) + **Inter** (body), loaded via `next/font`.

## Illustrative content

All dashboard and interface visuals are **demonstration concepts with fictional data** (see
`src/components/visuals/dashboard/data.ts`). They are labelled as such on the page and must not be presented
as deployed Prime-Techmate products until real screenshots are supplied.

## Needs confirmation before launch

- [ ] **Official logo** — current wordmark/icon is a temporary placeholder (`components/brand/Logo.tsx`).
- [ ] **Email and phone** — the old site lists conflicting details (`info@centreghana.com`, a Sakumono
      address, and a US address on the contact page). These are intentionally **not shown** until verified.
- [ ] **Full street address** — only "Spintex Road, Accra" is shown.
- [ ] **Social media URLs** — the old LinkedIn link pointed to `#`.
- [ ] **Service descriptions** in `content/site.ts` — drafted from the brief; confirm they match real capabilities.
- [ ] **Projects** — three clearly marked placeholder cards; replace with verified projects only.
- [ ] **Team profiles** — `/team` shows placeholders.
- [ ] **APPLIFY EMR** — mentioned on the old Solutions page; confirm whether it is a real product before featuring it.
- [ ] **Contact form delivery** — validates input but does not send yet (shows a "preview mode" notice).
      Connect to an email/form service once the enquiry address is confirmed.
- [ ] **Production domain** — `site.url` currently uses the Hostinger preview URL (affects SEO metadata).

Removed from the old site because they were unverifiable template content: insurer logos (Humana, Aetna,
Cigna, etc.), adoption/security percentages, the third-party testimonial and lorem-ipsum copy.
