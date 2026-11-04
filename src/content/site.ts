/**
 * Single source of truth for site copy and company facts.
 *
 * Content is based on the Prime-Techmate company profile supplied by the
 * company. Anything marked `TODO(confirm)` is still unverified.
 * See README.md → "Needs confirmation".
 */

export const site = {
  name: "Prime-Techmate",
  // TODO(confirm): production domain. Currently the Hostinger preview URL.
  url: "https://indigo-alligator-395177.hostingersite.com",
  tagline: "Health systems development and digital health infrastructure",
  description:
    "Prime-Techmate is a Ghana-based technology solutions company specialising in health systems development and digital health infrastructure, with over 14 years of industry experience.",
  experienceYears: 14,
  contact: {
    address: "Spintex Road, Accra, Ghana",
    // Enquiries are emailed to the inbox set in public/contact.php.
    // TODO(confirm): set these to show an email/phone publicly on the site.
    email: null as string | null,
    phone: null as string | null,
  },
  // TODO(confirm): add verified social profile URLs (existing LinkedIn link points to "#").
  social: [] as { label: string; href: string }[],
};

export type NavItem = { label: string; href: string; id: string };

/** `id` matches the first URL segment of the page ("" = home). */
export const navigation: NavItem[] = [
  { label: "Home", href: "/", id: "" },
  { label: "About Us", href: "/about/", id: "about" },
  { label: "Solutions", href: "/solutions/", id: "solutions" },
  { label: "Applify EMR", href: "/applify-emr/", id: "applify-emr" },
  { label: "Projects", href: "/projects/", id: "projects" },
  { label: "Our Team", href: "/team/", id: "team" },
  { label: "Contact", href: "/contact/", id: "contact" },
];

export const enquiryHref = "/contact/";

export const hero = {
  eyebrow: "Health systems · Digital health infrastructure · Ghana",
  title: "Powering Healthcare Through Technology.",
  lead: "We develop innovative digital health solutions that strengthen healthcare delivery, streamline operations and improve the management of health information.",
  primaryCta: { label: "Explore Our Solutions", href: "/#solutions" },
  secondaryCta: { label: "Talk to Our Team", href: "/#contact" },
};

export const about = {
  title: "Reliable health technology, built on more than 14 years of experience.",
  paragraphs: [
    "Prime-Techmate is a Ghana-based technology solutions company specialising in health systems development and digital health infrastructure.",
    "We provide innovative and reliable ICT solutions that strengthen healthcare delivery, improve data management and support efficient health administration across Ghana.",
  ],
  reach:
    "Although we are based in Accra, we provide services nationwide, supporting hospitals, clinics, health organisations and institutions across Ghana with scalable digital health solutions.",
};

export type SolutionIcon = "emr" | "hmis" | "network" | "claims";

export type Solution = {
  slug: string;
  icon: SolutionIcon;
  title: string;
  /** Shorter title for chips and compact lists. */
  shortTitle: string;
  description: string;
  highlights: string[];
};

export const solutions: Solution[] = [
  {
    slug: "electronic-medical-records",
    icon: "emr",
    title: "Electronic Medical Records (EMR)",
    shortTitle: "Electronic Medical Records",
    description:
      "We design and deploy robust digital patient record systems that streamline clinical workflows and improve access to healthcare data.",
    highlights: [
      "EMR systems development and implementation",
      "Digital patient records that replace paper files",
      "Smoother clinical workflows and faster access to information",
    ],
  },
  {
    slug: "health-management-information-systems",
    icon: "hmis",
    title: "Health Management Information Systems (HMIS)",
    shortTitle: "Health Management Information Systems",
    description:
      "We develop, integrate and optimise HMIS platforms that help health facilities collect, manage and analyse health data for better decision-making.",
    highlights: [
      "HMIS development, integration and optimisation",
      "Structured collection and management of health data",
      "Analysis and reporting that supports decision-making",
    ],
  },
  {
    slug: "network-infrastructure",
    icon: "network",
    title: "Network Infrastructure & Configuration",
    shortTitle: "Network Infrastructure",
    description:
      "We install and configure secure, reliable networks that support healthcare systems, data exchange and day-to-day facility operations.",
    highlights: [
      "Network installation and configuration",
      "Secure connectivity for healthcare systems and data exchange",
      "Dependable networks for everyday facility operations",
    ],
  },
  {
    slug: "health-insurance-claims",
    icon: "claims",
    title: "Health Insurance Claims Systems Support & Training",
    shortTitle: "Insurance Claims Support & Training",
    description:
      "We train claims officers and healthcare staff to process and manage health insurance claims efficiently using digital systems and best practices.",
    highlights: [
      "Training for claims officers and healthcare staff",
      "Processing claims efficiently with digital systems",
      "Best practices for managing health insurance claims",
    ],
  },
];

export const product = {
  name: "Applify EMR",
  slug: "applify-emr",
  tagline: "Electronic Medical Records, developed and owned by Prime-Techmate.",
  summary:
    "Applify EMR is a powerful Electronic Medical Records system that helps healthcare facilities manage patient information efficiently while improving clinical workflows and service delivery.",
  detail:
    "It enables healthcare providers to securely capture, store and retrieve patient records in a fully digital environment, reducing paperwork and improving access to critical medical information.",
  scalability:
    "Applify EMR is scalable and adaptable, making it suitable for different levels of healthcare facilities across Ghana.",
  capabilities: [
    { icon: "registration", title: "Patient registration & records", text: "Register patients and manage their records digitally." },
    { icon: "consultation", title: "Clinical documentation", text: "Document consultations and treatment in one place." },
    { icon: "lab", title: "Laboratory & diagnostics", text: "Integrate laboratory and diagnostic records with the patient file." },
    { icon: "pharmacy", title: "Pharmacy & medication", text: "Manage prescriptions, dispensing and medication records." },
    { icon: "billing", title: "Billing & insurance claims", text: "Support billing and health insurance claims processing." },
    { icon: "reports", title: "Reporting & analytics", text: "Generate reports and analyse health data." },
    { icon: "security", title: "Secure access", text: "Protect data with secure, role-based user access." },
  ] as const,
};

export type CapabilityIcon = (typeof product.capabilities)[number]["icon"];

export const mission =
  "To empower healthcare institutions with reliable, innovative technology solutions that improve health service delivery, data management and operational efficiency.";

export const vision =
  "To become a leading digital health technology partner in Ghana and across Africa, driving transformation in healthcare systems through innovation and expertise.";

export const approach = [
  {
    title: "Understand",
    description: "We learn how your facility works, the challenges you face and what success looks like.",
  },
  {
    title: "Design",
    description: "We plan a solution that fits your workflows, your people and your existing infrastructure.",
  },
  {
    title: "Implement",
    description: "We install, configure and deploy carefully, and train your team to use the system with confidence.",
  },
  {
    title: "Support",
    description: "We stay on hand to maintain, improve and support your systems as your needs evolve.",
  },
];

/** "Why choose Prime-Techmate" points, alongside the 14+ years highlight. */
export const strengths = [
  {
    title: "EMR and HMIS expertise",
    description: "Strong, hands-on expertise in Electronic Medical Records and Health Management Information Systems.",
  },
  {
    title: "Claims management training",
    description: "Proven experience training claims officers and healthcare staff in health insurance claims management.",
  },
  {
    title: "Reliable network infrastructure",
    description: "Secure, dependable networks installed and configured to keep healthcare systems connected.",
  },
  {
    title: "Nationwide service delivery",
    description: "Based in Accra and serving hospitals, clinics and health institutions across Ghana.",
  },
];

/** Types of healthcare institutions Prime-Techmate serves. */
export const clientTypes = [
  { icon: "hospital", label: "Hospitals" },
  { icon: "chps", label: "CHPS Compounds", note: "Community-based Health Planning and Services" },
  { icon: "maternity", label: "Maternity Homes" },
  { icon: "clinic", label: "Clinics" },
  { icon: "private", label: "Private Medical Centres" },
  { icon: "organisation", label: "Healthcare Organisations" },
] as const;

export type ClientIcon = (typeof clientTypes)[number]["icon"];

// Placeholder project cards. Replace with verified projects only.
export const projectPlaceholders = [
  { category: "Electronic Medical Records" },
  { category: "Health Management Information Systems" },
  { category: "Network Infrastructure" },
];

export const finalCta = {
  eyebrow: "Get in touch",
  title: "Let's Build Better Healthcare Systems Together.",
  lead: "Whether you are looking to implement a new digital health solution, modernise existing infrastructure or integrate your systems, Prime-Techmate is ready to help.",
  cta: "Discuss Your Project",
};
