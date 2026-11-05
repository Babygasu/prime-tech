"use client";

import {
  CircleCheck,
  CreditCard,
  FlaskConical,
  GraduationCap,
  HardDrive,
  Lock,
  Pill,
  Router,
  Stethoscope,
  UserRound,
  Wifi,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SolutionIcon } from "@/content/site";
import { DemoBadge } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * Small illustrative interface compositions for the Solutions page and homepage.
 * Includes interactive patient journey demonstration.
 */
export function SolutionVisual({ kind }: { kind: SolutionIcon }) {
  const Visual = visuals[kind];
  return (
    <VisualFrame>
      <Visual />
    </VisualFrame>
  );
}

export function VisualFrame({ children, badge }: { children: ReactNode; badge?: ReactNode }) {
  return (
    <figure className="relative overflow-hidden rounded-[28px] border border-line bg-mist p-5 sm:p-8">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent_85%)]" />
      <div className="relative grid min-h-[280px] place-items-center sm:min-h-[320px]">
        {children}
      </div>
      <figcaption className="relative mt-5 flex justify-center">
        <DemoBadge>{badge}</DemoBadge>
      </figcaption>
    </figure>
  );
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-2xl border border-line bg-white shadow-soft", className)}>{children}</div>;
}

function Bar({ w, className }: { w: string; className?: string }) {
  return <span className={cn("block h-2 rounded-full bg-cloud", className)} style={{ width: w }} />;
}

function RecordVisual() {
  return (
    <div className="relative w-full max-w-[360px]">
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-accent-600 font-display text-sm font-bold text-white">AK</span>
          <div>
            <p className="text-[14px] font-semibold text-ink">Patient A. K.</p>
            <p className="font-mono text-[11px] text-muted">DEMO-10482</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-cloud px-2 py-0.5 text-[11px] font-medium text-charcoal-700">
            <Lock className="size-3" /> Secure
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {["Allergies", "Visits", "Results"].map((l) => (
            <div key={l} className="rounded-xl bg-mist p-2.5">
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted">{l}</p>
              <Bar w="70%" className="mt-2" />
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <Bar w="92%" />
          <Bar w="78%" />
          <Bar w="64%" />
        </div>
      </Card>
      <Card className="absolute -bottom-6 -right-2 flex items-center gap-2 px-3 py-2 motion-safe:animate-float sm:-right-8">
        <FlaskConical className="size-4 text-signal-500" />
        <span className="text-[12px] font-medium text-ink">Lab result added</span>
      </Card>
    </div>
  );
}

const workflowSteps = [
  {
    icon: UserRound,
    label: "Registration",
    desc: "Digital patient intake, demographic capture, and identification record created.",
  },
  {
    icon: Stethoscope,
    label: "Consultation",
    desc: "Doctor documents vitals, clinical examination, and treatment plan.",
  },
  {
    icon: FlaskConical,
    label: "Laboratory",
    desc: "Diagnostic lab requests ordered and test results linked directly to file.",
  },
  {
    icon: Pill,
    label: "Pharmacy",
    desc: "Prescriptions dispensed, dosage tracked, and medication stock updated.",
  },
  {
    icon: CreditCard,
    label: "Billing & claims",
    desc: "Services reconciled with automated NHIS and private insurance claims processing.",
  },
];

/**
 * Animated and interactive patient journey demonstration.
 * Animates through clinical stages sequentially upon entering viewport,
 * and allows visitors to click/tap stages to inspect individual steps.
 */
export function WorkflowVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 = reg active, 1 = consult, 2 = lab, 3 = pharm, 4 = billing
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!inView || isUserInteracted || hasAnimated) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setCurrentStep(4);
      setHasAnimated(true);
      return;
    }

    const t1 = setTimeout(() => setCurrentStep(1), 650);
    const t2 = setTimeout(() => setCurrentStep(2), 1300);
    const t3 = setTimeout(() => setCurrentStep(3), 1950);
    const t4 = setTimeout(() => {
      setCurrentStep(4);
      setHasAnimated(true);
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [inView, isUserInteracted, hasAnimated]);

  const handleStepClick = (index: number) => {
    setIsUserInteracted(true);
    setSelectedStep(index);
  };

  const activeIdx = selectedStep !== null ? selectedStep : currentStep;
  const activeDetail = workflowSteps[activeIdx] ?? workflowSteps[4];

  return (
    <div ref={containerRef} className="w-full max-w-[400px]">
      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Patient journey</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 border border-accent-200/60 px-2 py-0.5 text-[10.5px] font-semibold text-accent-700">
            <span className="size-1.5 rounded-full bg-accent-600 animate-pulse" />
            Interactive
          </span>
        </div>

        <ol className="mt-3.5 space-y-2" role="list">
          {workflowSteps.map((s, i) => {
            const isCompleted = i < currentStep || (currentStep === 4 && i < 4);
            const isActive = activeIdx === i;

            return (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => handleStepClick(i)}
                  aria-label={`${s.label}: ${isCompleted ? "Completed" : isActive ? "Active step" : "Pending step"}`}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-all duration-300",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500",
                    isActive
                      ? "border border-accent-200 bg-accent-50/90 shadow-sm"
                      : isCompleted
                        ? "border border-transparent bg-mist/70 hover:bg-cloud/60"
                        : "border border-transparent bg-white/40 opacity-70 hover:opacity-100"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-lg transition-all duration-300",
                      isActive
                        ? "bg-accent-600 text-white shadow-sm"
                        : isCompleted
                          ? "bg-accent-50 text-accent-700 ring-1 ring-accent-200/60"
                          : "bg-cloud text-charcoal-400"
                    )}
                  >
                    <s.icon aria-hidden="true" className="size-4" />
                  </span>

                  <span
                    className={cn(
                      "text-[13.5px] transition-colors duration-300",
                      isActive
                        ? "font-semibold text-ink"
                        : isCompleted
                          ? "font-medium text-ink"
                          : "text-muted"
                    )}
                  >
                    {s.label}
                  </span>

                  <span className="ml-auto shrink-0">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success">
                        <CircleCheck className="size-4" />
                        <span className="hidden sm:inline">Done</span>
                      </span>
                    ) : isActive ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100/90 px-2 py-0.5 text-[10.5px] font-semibold text-accent-700">
                        <span className="size-1.5 rounded-full bg-accent-600 animate-pulse" />
                        Active
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted">Pending</span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Step details context note */}
        <div className="mt-3.5 rounded-xl border border-line bg-mist/60 p-3 transition-all duration-300">
          <p className="text-[12px] leading-relaxed text-body">
            <strong className="font-semibold text-ink">{activeDetail.label}: </strong>
            {activeDetail.desc}
          </p>
        </div>
      </Card>
    </div>
  );
}

function NetworkVisual() {
  return (
    <div className="relative w-full max-w-[340px]">
      <Card className="space-y-2.5 p-4">
        {[
          { label: "Core network switch", icon: Router },
          { label: "Records server", icon: HardDrive },
          { label: "Backup storage", icon: HardDrive },
        ].map((d, i) => (
          <div key={d.label} className="flex items-center gap-3 rounded-xl bg-navy-950 px-3.5 py-3">
            <d.icon className="size-4 text-navy-400" />
            <span className="text-[13px] font-medium text-white">{d.label}</span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-white motion-safe:animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
              <span className="size-1.5 rounded-full bg-charcoal-600" />
              <span className="size-1.5 rounded-full bg-charcoal-600" />
            </span>
          </div>
        ))}
      </Card>
      <Card className="absolute -left-3 -top-5 flex items-center gap-2 px-3 py-2 motion-safe:animate-float sm:-left-8">
        <Wifi className="size-4 text-signal-500" />
        <span className="text-[12px] font-medium text-ink">Network online</span>
      </Card>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [42, 58, 50, 72, 64, 86, 78];
  return (
    <Card className="w-full max-w-[400px] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] font-medium text-muted">Monthly outpatient attendance</p>
          <p className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">Sample data</p>
        </div>
        <span className="rounded-full bg-cloud px-2 py-0.5 text-[11px] font-medium text-muted">Demo</span>
      </div>
      <div className="mt-6 flex h-32 items-end gap-2.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-t-md", i === bars.length - 2 ? "bg-signal-500" : "bg-accent-600")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle">
        {["J", "F", "M", "A", "M", "J", "J"].map((m, i) => (
          <span key={i} className="flex-1 text-center">
            {m}
          </span>
        ))}
      </div>
    </Card>
  );
}

function ClaimsVisual() {
  const claims = [
    { id: "DEMO-C-2041", status: "Submitted", tone: "bg-cloud text-muted" },
    { id: "DEMO-C-2042", status: "Under review", tone: "bg-warning-soft text-warning" },
    { id: "DEMO-C-2043", status: "Approved", tone: "bg-success-soft text-success" },
  ];
  return (
    <div className="relative w-full max-w-[380px]">
      <Card className="p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Insurance claims</p>
        <ul className="mt-4 space-y-2.5">
          {claims.map((c) => (
            <li key={c.id} className="flex items-center gap-3 rounded-xl bg-mist px-3 py-3">
              <span className="font-mono text-[12px] text-ink">{c.id}</span>
              <Bar w="22%" className="bg-white" />
              <span className={cn("ml-auto rounded-full px-2 py-0.5 text-[11px] font-medium", c.tone)}>{c.status}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="absolute -right-2 -top-6 flex items-center gap-2 px-3 py-2 motion-safe:animate-float sm:-right-8">
        <GraduationCap className="size-4 text-signal-500" />
        <span className="text-[12px] font-medium text-ink">Staff training session</span>
      </Card>
    </div>
  );
}

const visuals: Record<SolutionIcon, () => ReactNode> = {
  emr: RecordVisual,
  hmis: AnalyticsVisual,
  network: NetworkVisual,
  claims: ClaimsVisual,
};
