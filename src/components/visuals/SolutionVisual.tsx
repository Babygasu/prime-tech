import {
  Activity,
  ArrowRight,
  Bell,
  CalendarCheck,
  CircleCheck,
  CreditCard,
  Database,
  FlaskConical,
  HardDrive,
  Lock,
  Pill,
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
    <figure className="relative overflow-hidden rounded-[28px] border border-line bg-mist p-5 sm:p-8">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent_85%)]" />
      <div aria-hidden className="relative grid min-h-[280px] place-items-center sm:min-h-[320px]">
        <Visual />
      </div>
      <figcaption className="relative mt-5 flex justify-center">
        <DemoBadge />
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
          <span className="grid size-11 place-items-center rounded-full bg-navy-900 font-display text-sm font-bold text-teal-300">AK</span>
          <div>
            <p className="text-[14px] font-semibold text-ink">Patient A. K.</p>
            <p className="font-mono text-[11px] text-muted">DEMO-10482</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-700">
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
        <FlaskConical className="size-4 text-teal-600" />
        <span className="text-[12px] font-medium text-ink">Shared with Laboratory</span>
      </Card>
    </div>
  );
}

function WorkflowVisual() {
  const steps = [
    { icon: UserRound, label: "Registration" },
    { icon: Stethoscope, label: "Consultation" },
    { icon: Pill, label: "Pharmacy" },
    { icon: CreditCard, label: "Billing" },
  ];
  return (
    <Card className="w-full max-w-[380px] p-5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Patient journey</p>
      <ol className="mt-4 space-y-2.5">
        {steps.map((s, i) => (
          <li key={s.label} className="flex items-center gap-3 rounded-xl bg-mist px-3 py-2.5">
            <span className={cn("grid size-8 place-items-center rounded-lg", i < 3 ? "bg-teal-50 text-teal-700" : "bg-white text-subtle ring-1 ring-line")}>
              <s.icon className="size-4" />
            </span>
            <span className="text-[14px] font-medium text-ink">{s.label}</span>
            {i < 3 ? (
              <CircleCheck className="ml-auto size-4 text-teal-600" />
            ) : (
              <span className="ml-auto text-[11px] font-medium text-muted">In progress</span>
            )}
          </li>
        ))}
      </ol>
    </Card>
  );
}

function IntegrationVisual() {
  const path = "M 70 60 C 160 60, 160 140, 250 140";
  return (
    <div className="relative w-full max-w-[400px]">
      <svg viewBox="0 0 320 200" className="w-full">
        {[path, "M 70 140 C 160 140, 160 60, 250 60"].map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" stroke="#0b1a33" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="4 5" />
            <circle r="3.5" fill="#14b3a0" className="motion-dot">
              <animateMotion dur="2.8s" begin={`${i * 1.4}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
      </svg>
      {[
        { label: "Records system", icon: Database, cls: "left-0 top-[18%]" },
        { label: "Lab system", icon: FlaskConical, cls: "left-0 top-[58%]" },
        { label: "Pharmacy", icon: Pill, cls: "right-0 top-[18%]" },
        { label: "Reporting", icon: Activity, cls: "right-0 top-[58%]" },
      ].map((n) => (
        <Card key={n.label} className={cn("absolute flex items-center gap-2 px-2.5 py-2", n.cls)}>
          <n.icon className="size-4 text-teal-600" />
          <span className="whitespace-nowrap text-[11px] font-semibold text-ink sm:text-[12px]">{n.label}</span>
        </Card>
      ))}
    </div>
  );
}

function InfrastructureVisual() {
  return (
    <div className="relative w-full max-w-[340px]">
      <Card className="space-y-2.5 p-4">
        {["Application server", "Database server", "Backup storage"].map((l, i) => (
          <div key={l} className="flex items-center gap-3 rounded-xl bg-navy-950 px-3.5 py-3">
            <HardDrive className="size-4 text-navy-400" />
            <span className="text-[13px] font-medium text-white">{l}</span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-teal-400 motion-safe:animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
              <span className="size-1.5 rounded-full bg-navy-600" />
              <span className="size-1.5 rounded-full bg-navy-600" />
            </span>
          </div>
        ))}
      </Card>
      <Card className="absolute -left-3 -top-5 flex items-center gap-2 px-3 py-2 motion-safe:animate-float sm:-left-8">
        <Wifi className="size-4 text-teal-600" />
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
          <p className="text-[12px] font-medium text-muted">Monthly outpatient visits</p>
          <p className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">Sample data</p>
        </div>
        <span className="rounded-full bg-cloud px-2 py-0.5 text-[11px] font-medium text-muted">Demo</span>
      </div>
      <div className="mt-6 flex h-32 items-end gap-2.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-t-md", i === bars.length - 2 ? "bg-teal-500" : "bg-navy-900/80")}
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

function DigitalVisual() {
  return (
    <div className="relative">
      <div className="w-[200px] rounded-[30px] border-[6px] border-navy-950 bg-white p-3 shadow-lift">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-cloud" />
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Today</p>
        <div className="mt-2 rounded-xl bg-navy-900 p-3 text-white">
          <CalendarCheck className="size-4 text-teal-300" />
          <p className="mt-2 text-[13px] font-semibold">Clinic appointment</p>
          <p className="text-[11px] text-navy-400">10:30 · Demo Health Centre</p>
        </div>
        <div className="mt-2 space-y-2 rounded-xl bg-mist p-3">
          <Bar w="80%" className="bg-white" />
          <Bar w="60%" className="bg-white" />
        </div>
        <div className="mt-2 space-y-2 rounded-xl bg-mist p-3">
          <Bar w="70%" className="bg-white" />
          <Bar w="45%" className="bg-white" />
        </div>
      </div>
      <Card className="absolute -right-10 top-16 flex items-center gap-2 px-3 py-2 motion-safe:animate-float sm:-right-28">
        <Bell className="size-4 text-teal-600" />
        <span className="whitespace-nowrap text-[12px] font-medium text-ink">Reminder sent</span>
      </Card>
      <Card className="absolute -left-10 bottom-12 flex items-center gap-2 px-3 py-2 motion-safe:animate-float-slow sm:-left-24">
        <ArrowRight className="size-4 text-teal-600" />
        <span className="whitespace-nowrap text-[12px] font-medium text-ink">Results ready</span>
      </Card>
    </div>
  );
}

const visuals: Record<SolutionIcon, () => ReactNode> = {
  his: RecordVisual,
  hospital: WorkflowVisual,
  integration: IntegrationVisual,
  infrastructure: InfrastructureVisual,
  analytics: AnalyticsVisual,
  digital: DigitalVisual,
};
