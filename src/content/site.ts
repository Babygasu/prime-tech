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
  title: "Smarter Healthcare. Better Patient Outcomes.",
  lead: "Connecting patient registration, clinical documentation, laboratory diagnostics, and health insurance claims into one dependable digital ecosystem for healthcare facilities across Ghana.",
  primaryCta: { label: "Explore Our Solutions", href: "/#solutions" },
  secondaryCta: { label: "Talk to Our Team", href: "/#contact" },
};

export const about = {
  title: "14+ years of building reliable healthcare technology.",
  paragraphs: [
    "Prime-Techmate is a Ghana-based technology solutions company dedicated to strengthening healthcare delivery through purpose-built digital health systems and infrastructure.",
    "From solving paper folder bottlenecks and improving patient record security to streamlining health insurance claims and interconnecting departments, we empower healthcare institutions with dependable technology designed for Ghanaian clinical environments.",
  ],
  reach:
    "Headquartered on Spintex Road in Accra, we deploy and support digital health systems nationwide, partnering with hospitals, clinics, maternity homes, and community healthcare facilities across Ghana.",
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
  /** Concise operational outcome tag. */
  impactTag: string;
};

export const solutions: Solution[] = [
  {
    slug: "electronic-medical-records",
    icon: "emr",
    title: "Electronic Medical Records (EMR)",
    shortTitle: "Electronic Medical Records",
    impactTag: "Zero Lost Folders · Real-Time Vitals",
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
    impactTag: "Facility-Wide Department Sync",
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
    impactTag: "99.9% Uptime for Critical Care",
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
    impactTag: "Faster NHIS Reconciliations",
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
    title: "Clinical Workflow & Infrastructure Audit",
    description: "We assess your outpatient flow, existing records, and local network without interrupting daily clinical consultations.",
  },
  {
    title: "System Tailoring & Tariff Setup",
    description: "We configure departmental templates, NHIS claim tariff schedules, and role-based permissions to match your facility's protocols.",
  },
  {
    title: "Phased Go-Live & On-Floor Coaching",
    description: "We conduct hands-on, department-by-department rollout with shoulder-to-shoulder coaching for doctors, nurses, and administrative staff.",
  },
  {
    title: "Continuous Maintenance & Local Support",
    description: "We provide automated routine backups, proactive system updates, and rapid Accra-based support for uninterrupted 24/7 hospital uptime.",
  },
];

/** 4 Institutional Advantage pillars of operational reliability. */
export const strengths = [
  {
    title: "Ghana Healthcare Standards & NHIS Compliance",
    description: "Software and workflows configured specifically around Ghana Health Service (GHS) protocols and national health insurance tariff schedules.",
  },
  {
    title: "On-Site Implementation & Staff Coaching",
    description: "Shoulder-to-shoulder training for doctors, nurses, records officers, and claims staff to ensure high adoption with zero clinical disruption.",
  },
  {
    title: "End-to-End Infrastructure Reliability",
    description: "Enterprise local network cabling, secure dedicated servers, and power backup solutions engineered for continuous hospital uptime.",
  },
  {
    title: "Immediate In-Country Technical Support",
    description: "Dedicated Accra-based technical team providing rapid on-site and remote assistance without offshore delays or timezone lag.",
  },
];

export type ClientType = {
  icon: "hospital" | "chps" | "maternity" | "clinic" | "private" | "organisation";
  label: string;
  note?: string;
  tags: string[];
};

/** Types of healthcare institutions Prime-Techmate serves with tier-specific capabilities. */
export const clientTypes: ClientType[] = [
  {
    icon: "hospital",
    label: "Hospitals",
    note: "District & regional hospitals",
    tags: ["Multi-Ward HMIS", "Automated GHS Reporting"],
  },
  {
    icon: "chps",
    label: "CHPS Compounds",
    note: "Community-based Health Planning & Services",
    tags: ["Offline-Resilient", "Solar-Friendly"],
  },
  {
    icon: "maternity",
    label: "Maternity Homes",
    note: "Maternal & reproductive care",
    tags: ["Antenatal Registers", "Delivery Tracking"],
  },
  {
    icon: "clinic",
    label: "Clinics",
    note: "Primary outpatient centres",
    tags: ["NHIS Electronic Claims", "Fast OPD Triage"],
  },
  {
    icon: "private",
    label: "Private Medical Centres",
    note: "Specialist & diagnostic practices",
    tags: ["Specialist Scheduling", "Direct Billing"],
  },
  {
    icon: "organisation",
    label: "Healthcare Organisations",
    note: "Health directorates & NGOs",
    tags: ["Aggregated Analytics", "System Integration"],
  },
];

export type ClientIcon = ClientType["icon"];

export type DeploymentCapability = {
  category: string;
  title: string;
  description: string;
  highlights: string[];
  status: string;
};

/** Verified deployment capability profiles across healthcare centres in Ghana. */
export const deploymentCapabilities: DeploymentCapability[] = [
  {
    category: "Electronic Medical Records",
    title: "Comprehensive EMR Facility Rollout",
    description:
      "Full-facility digitisation connecting patient registration, OPD triage, clinical documentation, laboratory orders, and pharmacy dispensing into one unified workflow.",
    highlights: ["Paper folder elimination", "Instant departmental handoffs", "Role-based clinician access"],
    status: "Active Capability",
  },
  {
    category: "Health Infrastructure",
    title: "Hospital Network & Server Infrastructure",
    description:
      "Turnkey deployment of structured enterprise LAN cabling, secure on-premise records servers, and power-resilient backup setups designed for continuous care environments.",
    highlights: ["High-speed LAN cabling", "Dedicated local server setup", "Power-backup resilience"],
    status: "Active Capability",
  },
  {
    category: "Health Administration",
    title: "NHIS Electronic Claims & Staff Coaching",
    description:
      "Structured training and operational setup for hospital billing teams to compile, audit, and reconcile electronic insurance claims in compliance with national tariffs.",
    highlights: ["GHS/NHIS tariff compliance", "On-site claims officer coaching", "Reduced claim rejections"],
    status: "Active Capability",
  },
];

// Preserved alias for backwards compatibility
export const projectPlaceholders = deploymentCapabilities;

export const finalCta = {
  eyebrow: "Get in touch",
  title: "Let's Build Better Healthcare Systems Together.",
  lead: "Whether you are looking to implement a new digital health solution, modernise existing infrastructure or integrate your systems, Prime-Techmate is ready to help.",
  cta: "Discuss Your Project",
};
