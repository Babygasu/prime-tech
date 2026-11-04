import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { MotionProvider } from "@/components/motion/Reveal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const title = "Prime-Techmate | Healthcare Technology & ICT Solutions in Ghana";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | Prime-Techmate" },
  description: site.description,
  keywords: [
    "electronic medical records Ghana",
    "EMR system Ghana",
    "Applify EMR",
    "HMIS Ghana",
    "health insurance claims training",
    "healthcare network infrastructure",
    "digital health infrastructure",
    "Accra",
  ],
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  description: site.description,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Spintex Road",
    addressLocality: "Accra",
    addressCountry: "GH",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GH" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
