import type { Metadata } from "next";
import { Clock, MessagesSquare, Route, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Prime-Techmate about health information systems, ICT infrastructure, systems integration and digital health projects.",
  alternates: { canonical: "/contact/" },
};

const steps: { icon: ComponentType<LucideProps>; title: string; text: string }[] = [
  { icon: MessagesSquare, title: "Tell us about your project", text: "Share a few details about your organisation and what you need." },
  { icon: Clock, title: "We get back to you", text: "A member of our team will contact you to understand your needs." },
  { icon: Route, title: "We agree the next steps", text: "Together we decide the right approach for your organisation." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <span className="text-teal-600">your project.</span>
          </>
        }
        lead="Whether you have a clear brief or are still exploring ideas, we are happy to start the conversation."
      >
        <ol className="mt-12 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700">
                <s.icon aria-hidden className="size-[18px]" strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-mono text-[12px] font-medium text-teal-700">0{i + 1}</p>
                <p className="mt-1 font-semibold text-ink">{s.title}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-body">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </PageHero>
      <Contact />
    </>
  );
}
