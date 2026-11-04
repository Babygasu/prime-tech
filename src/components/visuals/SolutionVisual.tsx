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
import type { ReactNode } from "react";
import type { SolutionIcon } from "@/content/site";
import { DemoBadge } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * Small illustrative interface compositions for the Solutions page.
 * Fictional content only; purely presentational (no client JS).
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
      <div aria-hidden className="relative grid min-h-[280px] place-items-center sm:min-h-[320px]">
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

/** Patient journey through a facility. Also used on the Applify EMR page. */
export function WorkflowVisual() {
  const steps = [
    { icon: UserRound, label: "Registration" },
    { icon: Stethoscope, label: "Consultation" },
    { icon: FlaskConical, label: "Laboratory" },
    { icon: Pill, label: "Pharmacy" },
    { icon: CreditCard, label: "Billing & claims" },
  ];
  return (
    <Card className="w-full max-w-[380px] p-5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Patient journey</p>
      <ol className="mt-4 space-y-2.5">
        {steps.map((s, i) => (
          <li key={s.label} className="flex items-center gap-3 rounded-xl bg-mist px-3 py-2.5">
            <span className={cn("grid size-8 place-items-center rounded-lg", i < 4 ? "bg-cloud text-charcoal-900" : "bg-white text-subtle ring-1 ring-line")}>
              <s.icon className="size-4" />
            </span>
            <span className="text-[14px] font-medium text-ink">{s.label}</span>
            {i < 4 ? (
              <CircleCheck className="ml-auto size-4 text-success" />
            ) : (
              <span className="ml-auto text-[11px] font-medium text-muted">In progress</span>
            )}
          </li>
        ))}
      </ol>
    </Card>
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
