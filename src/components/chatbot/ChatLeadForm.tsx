"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { product, solutions } from "@/content/site";

export function ChatLeadForm({
  onClose,
  onSubmitted,
}: {
  onClose: () => void;
  onSubmitted: (summary: string) => void;
}) {
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(product.name);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please check the consent box to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          organisation,
          email,
          phone,
          interest,
          message: message || "Enquiry submitted via AI Assistant lead workflow.",
          consent,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setSubmitted(true);
        onSubmitted(`Enquiry for ${interest} from ${name} (${organisation || "Healthcare Facility"})`);
      } else {
        setError(data?.error || "Unable to send enquiry. Please contact us directly at /contact/.");
      }
    } catch {
      setError("Network error. Please try again or visit our Contact page.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="grid size-12 place-items-center rounded-full bg-success-soft text-success">
          <CheckCircle2 className="size-6" />
        </div>
        <h4 className="mt-3 font-display text-lg font-bold text-ink">Thank you, {name.split(" ")[0]}!</h4>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-body">
          Your enquiry has been received. Our team will review your requirements and reach out to you shortly.
        </p>
        <div className="mt-5 flex w-full flex-col gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-accent-600 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-accent-700"
          >
            Return to Conversation
          </button>
          <Link
            href="/contact/"
            onClick={onClose}
            className="text-[12.5px] font-medium text-muted hover:text-ink underline underline-offset-2"
          >
            Or view full contact details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div>
          <h4 className="font-display text-[15px] font-bold text-ink">Request a Demo or Consultation</h4>
          <p className="text-[12px] text-muted">Speak with our technical team about your facility</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid size-7 place-items-center rounded-lg text-muted hover:bg-cloud hover:text-ink"
          aria-label="Cancel enquiry"
        >
          <X className="size-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-3.5 space-y-3">
        {error && (
          <p role="alert" className="rounded-lg bg-signal-50 p-2.5 text-[12px] text-signal-600">
            {error}
          </p>
        )}

        <div>
          <label className="block text-[12px] font-medium text-ink">
            Your name <span className="text-accent-600">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr. / Mr. / Ms. Full Name"
            className="mt-1 w-full rounded-lg border border-line bg-mist px-3 py-2 text-[14px] text-ink outline-none transition-colors focus:border-charcoal-900 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-[12px] font-medium text-ink">Hospital / Clinic / Organisation</label>
          <input
            type="text"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            placeholder="e.g. Ridge Medical Clinic"
            className="mt-1 w-full rounded-lg border border-line bg-mist px-3 py-2 text-[14px] text-ink outline-none transition-colors focus:border-charcoal-900 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            <label className="block text-[12px] font-medium text-ink">
              Email address <span className="text-accent-600">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hospital.org"
              className="mt-1 w-full rounded-lg border border-line bg-mist px-3 py-2 text-[14px] text-ink outline-none transition-colors focus:border-charcoal-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ink">Phone (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+233 ..."
              className="mt-1 w-full rounded-lg border border-line bg-mist px-3 py-2 text-[14px] text-ink outline-none transition-colors focus:border-charcoal-900 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-medium text-ink">Solution of interest</label>
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line bg-mist px-3 py-2 text-[13.5px] text-ink outline-none transition-colors focus:border-charcoal-900 focus:bg-white"
          >
            <option value={product.name}>{product.name} (EMR)</option>
            {solutions.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.shortTitle}
              </option>
            ))}
            <option value="General Consultation">General Healthcare ICT Consultation</option>
          </select>
        </div>

        <div>
          <label className="block text-[12px] font-medium text-ink">Brief details / requirements</label>
          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your facility size, timeline, or specific needs..."
            className="mt-1 w-full resize-none rounded-lg border border-line bg-mist px-3 py-2 text-[13.5px] text-ink outline-none transition-colors focus:border-charcoal-900 focus:bg-white"
          />
        </div>

        {/* Consent checkbox */}
        <label className="flex items-start gap-2 pt-1 text-[11.5px] text-body cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 size-3.5 rounded border-line text-accent-600 focus:ring-accent-500"
          />
          <span>
            I agree to have Prime-Techmate contact me regarding this enquiry. We protect your privacy and never share your details.
          </span>
        </label>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent-600 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:bg-accent-700 active:scale-[0.99] disabled:opacity-60"
          >
            {isSubmitting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <>
                Submit Enquiry
                <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-line px-3.5 py-2.5 text-[13px] font-medium text-body hover:bg-cloud hover:text-ink"
          >
            Cancel
          </button>
        </div>

        <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[10.5px] text-muted">
          <ShieldCheck className="size-3 text-success" />
          Business enquiries only. Please do not submit patient records.
        </p>
      </form>
    </div>
  );
}

