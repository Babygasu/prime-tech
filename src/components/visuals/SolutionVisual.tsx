"use client";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleCheck,
  CreditCard,
  FileText,
  FlaskConical,
  GraduationCap,
  HardDrive,
  Lock,
  Pill,
  Play,
  RotateCcw,
  Router,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  UserRound,
  Wifi,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SolutionIcon } from "@/content/site";
import { DemoBadge } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * Small illustrative interface compositions for the Solutions page and homepage.
 * Includes interactive connected patient journey demonstration.
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
    <figure className="relative overflow-hidden rounded-[28px] border border-line bg-mist p-4 sm:p-7">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent_85%)]" />
      <div className="relative w-full">
        {children}
      </div>
      <figcaption className="relative mt-4 flex justify-center">
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
    <div className="relative mx-auto w-full max-w-[360px]">
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

export type PatientStage = {
  id: string;
  shortLabel: string;
  department: string;
  icon: typeof UserCheck;
  highlight: string;
  dataSnippet: {
    title: string;
    metrics: { label: string; val: string; status?: "normal" | "alert" | "verified" }[];
    clinicalNote: string;
    handoff: string;
  };
};

export const PATIENT_STAGES: PatientStage[] = [
  {
    id: "triage",
    shortLabel: "1. Triage",
    department: "OPD Triage & Registration",
    icon: UserCheck,
    highlight: "Digital patient intake & instant vitals capture",
    dataSnippet: {
      title: "Vitals & Intake Summary",
      metrics: [
        { label: "Blood Pressure", val: "120/80 mmHg", status: "normal" },
        { label: "Temperature", val: "38.2°C", status: "alert" },
        { label: "Pulse", val: "84 bpm", status: "normal" },
        { label: "NHIS Status", val: "Active (Verified)", status: "verified" },
      ],
      clinicalNote: "Electronic folder created. Patient presenting with fever & chills. Assigned to Room 2.",
      handoff: "Vitals instantly routed to Doctor's clinical dashboard. Zero paper folder transit delay.",
    },
  },
  {
    id: "consultation",
    shortLabel: "2. Doctor",
    department: "Clinical Consultation",
    icon: Stethoscope,
    highlight: "Prescriber charting with pre-populated OPD vitals",
    dataSnippet: {
      title: "Doctor SOAP Charting",
      metrics: [
        { label: "Clinician", val: "Dr. K. Asante", status: "normal" },
        { label: "Presumptive Dx", val: "Suspected Malaria", status: "alert" },
        { label: "Ordered Test", val: "Malaria RDT", status: "normal" },
        { label: "ICD-10 Code", val: "B54 (Unspecified)", status: "normal" },
      ],
      clinicalNote: "Patient has 3-day history of febrile illness. Ordered immediate rapid diagnostic test before prescribing.",
      handoff: "Diagnostic lab requisition dispatched electronically to bench in real-time.",
    },
  },
  {
    id: "lab",
    shortLabel: "3. Lab",
    department: "Diagnostic Laboratory",
    icon: FlaskConical,
    highlight: "Electronic bench queue & auto-updating results",
    dataSnippet: {
      title: "Laboratory Results",
      metrics: [
        { label: "Specimen", val: "Capillary Blood", status: "normal" },
        { label: "Test Type", val: "Malaria RDT", status: "normal" },
        { label: "Result", val: "POSITIVE (+)", status: "alert" },
        { label: "Turnaround", val: "14 minutes", status: "verified" },
      ],
      clinicalNote: "Plasmodium falciparum antigen detected. Result validated by Senior Biomedical Scientist.",
      handoff: "Result auto-populated into patient folder; Doctor notified immediately for treatment confirmation.",
    },
  },
  {
    id: "pharmacy",
    shortLabel: "4. Pharmacy",
    department: "Pharmacy & Dispensing",
    icon: Pill,
    highlight: "E-Prescription dispensing & automated stock decrement",
    dataSnippet: {
      title: "Dispensary & Inventory",
      metrics: [
        { label: "Medication", val: "Artemether-Lumefantrine", status: "normal" },
        { label: "Dosage", val: "20/120mg x 3 days", status: "normal" },
        { label: "Stock Batch", val: "#ACT-9021", status: "verified" },
        { label: "Inventory Log", val: "-1 Unit Deducted", status: "verified" },
      ],
      clinicalNote: "Medication verified against patient allergy records. Dosing instructions explained in Twi & English.",
      handoff: "Pharmacy dispensing logged; items automatically batched into insurance claim queue.",
    },
  },
  {
    id: "billing",
    shortLabel: "5. Claims",
    department: "NHIS Claims & Billing",
    icon: CreditCard,
    highlight: "Automated tariff compilation & zero paper vetting",
    dataSnippet: {
      title: "Electronic Claim Reconciliation",
      metrics: [
        { label: "Claim ID", val: "CLM-GH-2409-18", status: "normal" },
        { label: "Consultation", val: "GHS 25.00", status: "verified" },
        { label: "Lab Diagnostic", val: "GHS 18.00", status: "verified" },
        { label: "Medication ACT", val: "GHS 32.50", status: "verified" },
      ],
      clinicalNote: "GHS & NHIA tariff codes matched 100%. Encounter validated and queued for electronic batch submission.",
      handoff: "Clean claim generated with complete audit trail. Rejection risk reduced to near zero.",
    },
  },
];

/**
 * Interactive 5-Stage Patient Journey Simulator (Elation Health & Linear inspiration).
 * Demonstrates real-time clinical continuity across departments in a Ghanaian health facility.
 */
export function WorkflowVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  // Sequential progression when in view, unless paused by user interaction
  useEffect(() => {
    if (!inView || isPaused) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PATIENT_STAGES.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [inView, isPaused]);

  const handleStageSelect = (idx: number) => {
    setIsPaused(true);
    setActiveStep(idx);
  };

  const stage = PATIENT_STAGES[activeStep];
  const StageIcon = stage.icon;

  return (
    <div ref={containerRef} className="w-full">
      <Card className="overflow-hidden border-charcoal-900/[0.12] shadow-lift">
        {/* Patient Encounter Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-mist/90 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-accent-600 font-display text-[12px] font-bold text-white shadow-xs">
              AM
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-bold text-ink sm:text-[14px]">Akua Mensah</span>
                <span className="text-[11px] text-muted">· 32y F</span>
              </div>
              <p className="font-mono text-[10.5px] text-muted">NHIS #2409-1834 · Outpatient Care</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[10.5px] font-semibold text-success">
              <ShieldCheck className="size-3" /> NHIS Verified
            </span>
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              title={isPaused ? "Auto-play journey" : "Pause simulation"}
              className="rounded-lg p-1 text-muted hover:bg-white hover:text-ink transition-colors"
            >
              {isPaused ? <Play className="size-3.5" /> : <RotateCcw className="size-3.5" />}
            </button>
          </div>
        </div>

        {/* 5 Departmental Stage Tabs */}
        <div className="no-scrollbar flex overflow-x-auto border-b border-line bg-cloud/50 p-1.5 gap-1">
          {PATIENT_STAGES.map((s, idx) => {
            const isCurrent = activeStep === idx;
            const isCompleted = idx < activeStep;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleStageSelect(idx)}
                className={cn(
                  "flex-1 min-w-[70px] whitespace-nowrap rounded-xl py-1.5 px-2 text-center transition-all duration-200",
                  isCurrent
                    ? "bg-white font-bold text-accent-700 shadow-soft ring-1 ring-accent-200"
                    : isCompleted
                      ? "text-ink/80 hover:bg-white/60 font-medium"
                      : "text-muted hover:text-ink font-medium"
                )}
              >
                <div className="flex items-center justify-center gap-1">
                  {isCompleted ? (
                    <CheckCircle2 className="size-3 text-success shrink-0" />
                  ) : (
                    <span
                      className={cn(
                        "size-1.5 rounded-full shrink-0",
                        isCurrent ? "bg-accent-600 animate-pulse" : "bg-charcoal-300"
                      )}
                    />
                  )}
                  <span className="text-[11px] sm:text-[12px]">{s.shortLabel}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Content & Live Continuity View */}
        <div className="p-4 sm:p-5">
          {/* Active Department Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-200/60 shadow-xs">
                <StageIcon className="size-4.5" />
              </span>
              <div>
                <h4 className="text-[14px] font-bold text-ink sm:text-[15px]">{stage.department}</h4>
                <p className="text-[11.5px] text-muted">{stage.highlight}</p>
              </div>
            </div>

            <span className="rounded-full bg-accent-100/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-800">
              Stage {activeStep + 1} of 5
            </span>
          </div>

          {/* Departmental Clinical Record Snippet */}
          <div className="mt-3.5 rounded-xl border border-line bg-mist/60 p-3 sm:p-3.5">
            <div className="flex items-center justify-between border-b border-line/70 pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-700">
                {stage.dataSnippet.title}
              </span>
              <span className="flex items-center gap-1 text-[10.5px] font-semibold text-accent-700">
                <Activity className="size-3" /> Live Encounters
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {stage.dataSnippet.metrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-white p-2 border border-line/60">
                  <p className="text-[9.5px] font-medium text-muted uppercase tracking-wider">{m.label}</p>
                  <p
                    className={cn(
                      "mt-0.5 text-[12px] font-bold tracking-tight sm:text-[13px]",
                      m.status === "alert"
                        ? "text-signal-600"
                        : m.status === "verified"
                          ? "text-success"
                          : "text-ink"
                    )}
                  >
                    {m.val}
                  </p>
                </div>
              ))}
            </div>

            {/* Clinical Note Snippet */}
            <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-white/70 p-2 text-[11.5px] leading-relaxed text-body border border-line/50">
              <FileText className="size-3.5 text-muted shrink-0 mt-0.5" />
              <p>{stage.dataSnippet.clinicalNote}</p>
            </div>
          </div>

          {/* Connected Data Handoff (The Core Advantage) */}
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-accent-50/90 border border-accent-200/70 p-2.5 sm:p-3 text-[12px] text-accent-900">
            <ArrowRight className="size-3.5 text-accent-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-accent-800">Connected Data Continuity: </strong>
              <span>{stage.dataSnippet.handoff}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function NetworkVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
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
    <Card className="mx-auto w-full max-w-[400px] p-5">
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
    <div className="relative mx-auto w-full max-w-[380px]">
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
