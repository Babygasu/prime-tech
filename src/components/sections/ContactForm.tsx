"use client";

import { useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, CircleCheck, LoaderCircle } from "lucide-react";
import { finalCta, product, solutions } from "@/content/site";
import { cn } from "@/lib/cn";

type Fields = { name: string; organisation: string; email: string; phone: string; interest: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", organisation: "", email: "", phone: "", interest: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!f.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Please enter a valid email address.";
  if (f.message.trim().length < 10) e.message = "Please tell us a little about your project.";
  return e;
}

/** Mail handler deployed with the site on Hostinger (see public/contact.php). */
const ENDPOINT = "/contact.php";

/** PHP does not run on the local dev server, so submissions are simulated there. */
function isLocalPreview() {
  return ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
}

/**
 * Enquiry form with client-side validation. On the live site it posts to
 * public/contact.php, which emails the enquiry to the company inbox.
 */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [sendError, setSendError] = useState<string | null>(null);
  const [simulated, setSimulated] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendError(null);
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setState("sending");

    if (isLocalPreview()) {
      window.setTimeout(() => {
        setSimulated(true);
        setState("done");
      }, 700);
      return;
    }

    try {
      const body = new FormData();
      (Object.keys(fields) as (keyof Fields)[]).forEach((k) => body.append(k, fields[k]));
      body.append("website", honeypot);
      const res = await fetch(ENDPOINT, { method: "POST", body, headers: { Accept: "application/json" } });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; fields?: Errors } | null;
      if (res.ok && data?.ok) {
        setSimulated(false);
        setState("done");
        return;
      }
      if (data?.fields) setErrors(data.fields);
      setSendError(data?.error ?? "Your message could not be sent. Please try again later.");
    } catch {
      setSendError("Your message could not be sent. Please check your connection and try again.");
    }
    setState("idle");
  };

  return (
    <div className="relative rounded-3xl bg-white p-6 text-ink shadow-lift sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {state === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid size-14 place-items-center rounded-full bg-success-soft text-success">
              <CircleCheck className="size-7" />
            </span>
            <h3 className="mt-5 text-2xl font-bold tracking-tight">Thank you, {fields.name.split(" ")[0]}.</h3>
            {simulated ? (
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-body">
                <strong className="font-semibold text-ink">Local preview:</strong> no message was sent. Enquiries are
                only emailed from the live website.
              </p>
            ) : (
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-body">
                Your enquiry has been sent. A member of our team will be in touch with you soon.
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                setFields(empty);
                setSimulated(false);
                setState("idle");
              }}
              className="mt-6 text-[14px] font-semibold text-accent-600 hover:text-accent-700"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} initial={false} exit={{ opacity: 0 }} className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Full name" required value={fields.name} onChange={set("name")} error={errors.name} autoComplete="name" />
            <Field id="organisation" label="Organisation" value={fields.organisation} onChange={set("organisation")} autoComplete="organization" />
            <Field id="email" label="Email address" type="email" required value={fields.email} onChange={set("email")} error={errors.email} autoComplete="email" />
            <Field id="phone" label="Phone (optional)" type="tel" value={fields.phone} onChange={set("phone")} autoComplete="tel" />

            <div className="sm:col-span-2">
              <label htmlFor="cf-interest" className="text-[13px] font-medium text-ink">
                What can we help with?
              </label>
              <div className="relative">
                <select
                  id="cf-interest"
                  name="interest"
                  value={fields.interest}
                  onChange={set("interest")}
                  className={cn(inputClass, "appearance-none pr-10")}
                >
                  <option value="">Select an area (optional)</option>
                  <option>{product.name}</option>
                  {solutions.map((s) => (
                    <option key={s.slug}>{s.title}</option>
                  ))}
                  <option>Something else</option>
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 mt-[3px] size-4 -translate-y-1/2 text-muted" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="cf-message" className="text-[13px] font-medium text-ink">
                Tell us about your project <span className="text-accent-600">*</span>
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                value={fields.message}
                onChange={set("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "cf-message-error" : undefined}
                className={cn(inputClass, "h-auto resize-none py-3", errors.message && errorClass)}
              />
              {errors.message ? <ErrorText id="cf-message-error">{errors.message}</ErrorText> : null}
            </div>

            {/* Honeypot for spam bots: hidden from people and assistive technology. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="cf-website">Website</label>
              <input
                id="cf-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {sendError ? (
              <p role="alert" className="rounded-xl bg-[#fef3f2] px-4 py-3 text-[14px] text-[#b42318] sm:col-span-2">
                {sendError}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12px] text-muted">* Required fields</p>
              <button
                type="submit"
                disabled={state === "sending"}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-600 px-7 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-accent-700 disabled:opacity-70"
              >
                {state === "sending" ? <LoaderCircle className="size-4 animate-spin" /> : null}
                {finalCta.cta}
                {state !== "sending" ? (
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                ) : null}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "mt-1.5 h-12 w-full rounded-xl border border-line bg-mist px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-subtle focus:border-charcoal-900 focus:bg-white";
const errorClass = "border-[#d92d20] bg-white";

function Field({
  id,
  label,
  error,
  required,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={`cf-${id}`} className="text-[13px] font-medium text-ink">
        {label} {required ? <span className="text-accent-600">*</span> : null}
      </label>
      <input
        id={`cf-${id}`}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `cf-${id}-error` : undefined}
        className={cn(inputClass, error && errorClass)}
        {...props}
      />
      {error ? <ErrorText id={`cf-${id}-error`}>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[13px] text-[#b42318]">
      {children}
    </p>
  );
}
