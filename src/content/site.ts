/**
 * Single source of truth for site copy and company facts.
 *
 * Anything marked `TODO(confirm)` is unverified and must be confirmed
 * by Prime-Techmate before launch. See README.md → "Needs confirmation".
 */

export const site = {
  name: "Prime-Techmate",
  // TODO(confirm): production domain. Currently the Hostinger preview URL.
  url: "https://indigo-alligator-395177.hostingersite.com",
  tagline: "Healthcare technology and ICT solutions",
  description:
    "Prime-Techmate is a Ghanaian technology company specialising in health systems development and digital health infrastructure, with over 14 years of industry experience.",
  experienceYears: 14,
  contact: {
    address: "Spintex Road, Accra, Ghana",
    // TODO(confirm): the existing site lists conflicting email/phone
    // details (centreghana.com, a US address). Left empty until verified.
    email: null as string | null,
    phone: null as string | null,
  },
  // TODO(confirm): add verified social profile URLs (existing LinkedIn link points to "#").
  social: [] as { label: string; href: string }[],
};

export type NavItem = { label: string; href: string; id: string };

export const navigation: NavItem[] = [
  { label: "Home", href: "/", id: "top" },
  { label: "About Us", href: "/#about", id: "about" },
  { label: "Solutions", href: "/#solutions", id: "solutions" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Our Team", href: "/team/", id: "team" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export const hero = {
  eyebrow: "Healthcare technology · ICT solutions · Ghana",
  title: "Powering Healthcare Through Technology.",
  lead: "We develop innovative digital health solutions that strengthen healthcare delivery, streamline operations and improve the management of health information.",
  primaryCta: { label: "Explore Our Solutions", href: "/#solutions" },
  secondaryCta: { label: "Talk to Our Team", href: "/#contact" },
};

export type SolutionIcon =
  | "his"
  | "hospital"
  | "integration"
  | "infrastructure"
  | "analytics"
  | "digital";

// TODO(confirm): service descriptions are drafts aligned with the brief.
export const solutions: { icon: SolutionIcon; title: string; description: string }[] = [
  {
    icon: "his",
    title: "Health Information Systems",
    description:
      "Systems that capture, store and share health information securely, so the right data is available to the right people when it is needed.",
  },
  {
    icon: "hospital",
    title: "Hospital Management Systems",
    description:
      "Registration, records, appointments, billing and administration brought together in one coordinated workflow.",
  },
  {
    icon: "integration",
    title: "Systems Integration",
    description:
      "Connecting existing applications and facilities so information moves reliably between them, without duplicate data entry.",
  },
  {
    icon: "infrastructure",
    title: "ICT Infrastructure",
    description:
      "Networks, hardware and hosting environments designed, installed and maintained to keep critical systems running.",
  },
  {
    icon: "analytics",
    title: "Data Management & Analytics",
    description:
      "Turning routine health data into clear dashboards and reports that support planning and better decisions.",
  },
  {
    icon: "digital",
    title: "Digital Health Solutions",
    description:
      "Practical digital tools that extend healthcare services and make information easier to reach for staff and patients.",
  },
];

export const approach = [
  {
    title: "Understand",
    description: "We learn how your organisation works, the challenges you face and what success looks like.",
  },
  {
    title: "Design",
    description: "We plan a solution that fits your workflows, your people and your existing infrastructure.",
  },
  {
    title: "Implement",
    description: "We build, configure and deploy carefully, and train your team to use the system with confidence.",
  },
  {
    title: "Support",
    description: "We stay on hand to maintain, improve and support your systems as your needs evolve.",
  },
];

export const strengths = [
  {
    title: "Healthcare technology expertise",
    description:
      "We focus on health systems and digital health infrastructure, so we understand the realities of clinical and administrative work.",
  },
  {
    title: "Client-focused solutions",
    description:
      "Every engagement starts with your needs. We tailor solutions to your organisation rather than forcing a one-size-fits-all product.",
  },
  {
    title: "Implementation and technical support",
    description:
      "From installation and training to ongoing maintenance, we support the systems we deliver long after go-live.",
  },
];

// Placeholder project cards. Replace with verified projects only.
export const projectPlaceholders = [
  { category: "Health Information Systems" },
  { category: "Systems Integration" },
  { category: "ICT Infrastructure" },
];

export const finalCta = {
  eyebrow: "Get in touch",
  title: "Let's Build Better Healthcare Systems Together.",
  lead: "Whether you are looking to implement a new digital health solution, modernise existing infrastructure or integrate your systems, Prime-Techmate is ready to help.",
  cta: "Discuss Your Project",
};
