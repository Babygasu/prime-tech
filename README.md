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
    about/              About Us: story, principles, why us, approach
    solutions/          the four core services with illustrative visuals + demo dashboard
    applify-emr/        Applify EMR product page
    projects/           placeholder project cards + case-study format
    team/               team page (placeholder profiles)
    contact/            contact page with enquiry form
    not-found.tsx       404 page
  content/site.ts       ALL copy and company facts — edit text here
  components/
    layout/             Navbar, Footer
    sections/           Hero, About, Solutions, TechInAction, Approach, WhyUs, Projects, Contact, CtaBand
    visuals/            DemoDashboard (4 views), HeroVisual, NetworkIllustration, SolutionVisual, frames
    ui/                 shared primitives (Container, SectionHeading, ButtonLink, DemoBadge, PageHero)
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

## Contact form

The enquiry form posts to `public/contact.php`, a small PHP script that runs on Hostinger and emails each
enquiry to **info@centreghana.com** (change `RECIPIENT` at the top of the file). `npm run build` copies it into
`out/`, so it is uploaded together with the site.

- The visitor's address is set as **Reply-To**, so replying in your inbox answers them directly.
- Spam protection: a hidden honeypot field, a same-site check, and a limit of 5 enquiries per visitor per 10 minutes.
- On `localhost` the form only simulates sending (PHP does not run on the Next.js dev server).
- Messages are sent from `noreply@<your domain>`. Once the site is on its final domain, create that mailbox
  (or an alias) in Hostinger's email settings, which helps the messages avoid spam folders.

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
- [x] **Company content** — services, Applify EMR, mission, vision, "why choose us" and client types now come
      from the company profile supplied by Prime-Techmate.
- [ ] **Applify EMR screenshots** — the product page uses clearly labelled illustrative mockups; replace them with
      real Applify EMR screenshots when available.
- [ ] **Projects** — three clearly marked placeholder cards; replace with verified projects only.
- [ ] **Team profiles** — `/team` shows placeholders.
- [ ] **Contact form — first live test** — see "Contact form" below. Send one enquiry from the live site and
      check it arrives (including the spam folder).
- [ ] **Production domain** — `site.url` currently uses the Hostinger preview URL (affects SEO metadata).

Removed from the old site because they were unverifiable template content: insurer logos (Humana, Aetna,
Cigna, etc.), adoption/security percentages, the third-party testimonial and lorem-ipsum copy.
