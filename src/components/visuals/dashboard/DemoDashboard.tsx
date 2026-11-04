"use client";

/**
 * ILLUSTRATIVE DASHBOARD MOCKUP — not a real Prime-Techmate product.
 * Rendered at a fixed 1200×720 design size; wrap in <ScaledCanvas>.
 */

import { createContext, useContext, useEffect, useId, useRef, type ComponentType, type CSSProperties, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ReferenceDot,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  BedDouble,
  Bell,
  Building,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  ClipboardList,
  Download,
  FileChartColumn,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Pill,
  RefreshCw,
  Search,
  Settings,
  Stethoscope,
  UserPlus,
  Users,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  appointments,
  attendance,
  clinicians,
  departments,
  facilities,
  facilityMix,
  indicators,
  monthly,
  patients,
  recentRegistrations,
  visits14,
} from "./data";

export type DashboardView = "overview" | "records" | "appointments" | "reports";

export const DASHBOARD_WIDTH = 1200;
export const DASHBOARD_HEIGHT = 720;

/* Data colours: navy carries the primary series, greys support it, and the
   signature red marks only the single point that deserves attention. */
const PRIMARY = "#1e3a8a";
const SECONDARY = "#8d9097";
const TERTIARY = "#c9c7c2";
const ACCENT = "#ed1c24";
const GRID = "#efede9";
const AXIS = { fontSize: 11, fill: "#8d9097" };

type Icon = ComponentType<LucideProps>;

/* --------------------------------------------------------------- motion
   When `animated` is on (hero only), cards reveal in a gentle stagger, KPI
   figures count up and bars grow into place once the dashboard is in view.
   Everything is static for reduced-motion visitors and in other showcases. */

const EASE = [0.22, 1, 0.36, 1] as const;
const AnimatedCtx = createContext(false);

function useAnimated() {
  const animated = useContext(AnimatedCtx);
  const reduce = useReducedMotion();
  return animated && !reduce;
}

/** Container that staggers its <Reveal> children once it scrolls into view. */
function Stagger({ className, children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  const on = useAnimated();
  if (!on) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  const on = useAnimated();
  if (!on) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
    >
      {children}
    </motion.div>
  );
}

/** Counts a figure such as "128", "76%" or "99.4%" up from zero when visible. */
function CountUp({ value }: { value: string }) {
  const on = useAnimated();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^([\d.]+)(.*)$/);
    if (!on || !el || !m) return;
    const target = parseFloat(m[1]);
    const decimals = (m[1].split(".")[1] ?? "").length;
    el.textContent = (0).toFixed(decimals) + m[2];
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      delay: 0.3,
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals) + m[2];
      },
    });
    return () => controls.stop();
  }, [on, inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

/** Progress bar that grows to its width when visible. */
function GrowBar({ width, className, style }: { width: number; className?: string; style?: CSSProperties }) {
  const on = useAnimated();
  if (!on) return <div className={className} style={{ ...style, width: `${width}%` }} />;
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ width: 0 }}
      whileInView={{ width: `${width}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
    />
  );
}

export function DemoDashboard({ view = "overview", animated = false }: { view?: DashboardView; animated?: boolean }) {
  const titles: Record<DashboardView, string> = {
    overview: "Facility overview",
    records: "Patient records",
    appointments: "Appointments",
    reports: "Reports & analytics",
  };
  return (
    <AnimatedCtx.Provider value={animated}>
    <div className="flex h-[720px] w-[1200px] bg-mist font-sans text-[13px] text-ink">
      <Sidebar view={view} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={titles[view]} />
        <div className="min-h-0 flex-1 overflow-hidden p-6">
          {view === "overview" && <OverviewView />}
          {view === "records" && <RecordsView />}
          {view === "appointments" && <AppointmentsView />}
          {view === "reports" && <ReportsView />}
        </div>
      </div>
    </div>
    </AnimatedCtx.Provider>
  );
}

/* ---------------------------------------------------------------- chrome */

function Sidebar({ view }: { view: DashboardView }) {
  const items: { label: string; icon: Icon; key?: DashboardView }[] = [
    { label: "Overview", icon: LayoutDashboard, key: "overview" },
    { label: "Patients", icon: Users, key: "records" },
    { label: "Appointments", icon: CalendarDays, key: "appointments" },
    { label: "Facilities", icon: Building },
    { label: "Reports", icon: FileChartColumn, key: "reports" },
    { label: "Settings", icon: Settings },
  ];
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-line bg-white px-4 py-5">
      <div className="flex items-center gap-2.5 px-2">
        <span className="grid size-8 place-items-center rounded-lg bg-accent-600">
          <Activity className="size-4 text-signal-400" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-[14px] font-bold tracking-tight">Health HIS</p>
          <p className="text-[11px] text-muted">Demo environment</p>
        </div>
      </div>
      <p className="mt-7 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-subtle">Workspace</p>
      <ul className="mt-2 space-y-0.5">
        {items.map((it) => {
          const active = it.key === view;
          return (
            <li
              key={it.label}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium",
                active ? "bg-cloud font-semibold text-ink" : "text-body",
              )}
            >
              {active && <span className="absolute -left-4 top-2 h-5 w-[3px] rounded-r bg-accent-500" />}
              <it.icon className="size-[16px]" />
              {it.label}
            </li>
          );
        })}
      </ul>
      <div className="mt-auto rounded-xl border border-dashed border-line bg-mist p-3.5">
        <p className="text-[12px] font-semibold">Sample data only</p>
        <p className="mt-1 text-[11px] leading-snug text-muted">All names, IDs and figures in this interface are fictional.</p>
      </div>
    </aside>
  );
}

function Topbar({ title }: { title: string }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-line bg-white px-6">
      <div>
        <p className="text-[11px] text-muted">Demo District Hospital</p>
        <h3 className="font-display text-[17px] font-bold tracking-tight">{title}</h3>
      </div>
      <div className="ml-auto flex h-9 w-[300px] items-center gap-2 rounded-lg border border-line bg-mist px-3 text-[12px] text-subtle">
        <Search className="size-3.5" /> Search patients, records, reports…
      </div>
      <div className="flex h-9 items-center gap-2 rounded-lg border border-line px-3 text-[12px] text-body">
        <CalendarDays className="size-3.5" /> Today <ChevronDown className="size-3.5" />
      </div>
      <span className="relative grid size-9 place-items-center rounded-lg border border-line text-body">
        <Bell className="size-4" />
        <span className="absolute right-2 top-2 size-1.5 rounded-full bg-signal-500" />
      </span>
      <span className="grid size-9 place-items-center rounded-full bg-accent-600 text-[12px] font-semibold text-white">DA</span>
    </header>
  );
}

function Card({ title, action, className, children }: { title?: string; action?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <section className={cn("rounded-xl border border-line bg-white p-4 transition-[box-shadow,transform,border-color] duration-300 ease-out hover:-translate-y-px hover:border-charcoal-900/10 hover:shadow-soft", className)}>
      {title && (
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-sans text-[13px] font-semibold">{title}</h4>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-muted">
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-1.5">
          <span className="size-2 rounded-full" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}

function Kpi({ label, value, delta, icon: I }: { label: string; value: string; delta?: string; icon: Icon }) {
  return (
    <div className="h-full rounded-xl border border-line bg-white p-4 transition-[box-shadow,transform,border-color] duration-300 ease-out hover:-translate-y-px hover:border-charcoal-900/10 hover:shadow-soft">
      <div className="flex items-center justify-between text-[12px] text-muted">
        {label}
        <span className="grid size-7 place-items-center rounded-lg bg-cloud text-charcoal-700">
          <I className="size-3.5" />
        </span>
      </div>
      <div className="mt-2 flex items-end justify-between">
        <span className="font-display text-[26px] font-bold leading-none tracking-tight"><CountUp value={value} /></span>
        {delta && <span className="rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success">{delta}</span>}
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const tone =
    status === "In consultation" || status === "Online"
      ? "bg-success-soft text-success"
      : status === "Awaiting lab" || status === "Syncing" || status === "Follow-up due"
        ? "bg-warning-soft text-warning"
        : "bg-cloud text-muted";
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", tone)}>{status}</span>;
}

/* ---------------------------------------------------------------- views */

function OverviewView() {
  const gid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const animatedIn = useAnimated();
  const maxDept = Math.max(...departments.map((d) => d.value));
  return (
    <Stagger className="grid h-full grid-rows-[auto_1fr_auto] gap-4" delay={0.5}>
      <div className="grid grid-cols-4 gap-4">
        <Reveal><Kpi label="Registrations today" value="128" delta="+8%" icon={UserPlus} /></Reveal>
        <Reveal><Kpi label="Appointments" value="342" delta="+3%" icon={CalendarDays} /></Reveal>
        <Reveal><Kpi label="Bed occupancy" value="76%" icon={BedDouble} /></Reveal>
        <Reveal><Kpi label="Records synchronised" value="99.4%" icon={RefreshCw} /></Reveal>
      </div>

      <div className="grid min-h-0 grid-cols-[1.75fr_1fr] gap-4">
        <Reveal className="min-h-0">
        <Card
          className="h-full"
          title="Patient visits · last 14 days"
          action={<Legend items={[{ label: "Outpatient", color: PRIMARY }, { label: "Follow-up", color: SECONDARY }]} />}
        >
          <AreaChart width={580} height={196} data={visits14} margin={{ top: 6, right: 6, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id={`opd-${gid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.14} />
                <stop offset="100%" stopColor={PRIMARY} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={GRID} />
            <XAxis dataKey="d" tickLine={false} axisLine={false} tick={AXIS} />
            <YAxis tickLine={false} axisLine={false} tick={AXIS} width={44} />
            <Area type="monotone" dataKey="opd" stroke={PRIMARY} strokeWidth={2.2} fill={`url(#opd-${gid})`} isAnimationActive={!reduce} animationBegin={animatedIn ? 900 : 0} animationDuration={1400} />
            <Area type="monotone" dataKey="fu" stroke={SECONDARY} strokeWidth={2} strokeDasharray="4 4" fill="transparent" isAnimationActive={!reduce} animationBegin={animatedIn ? 1000 : 0} animationDuration={1400} />
            <ReferenceDot x="14" y={254} r={4.5} fill={ACCENT} stroke="#fff" strokeWidth={2} ifOverflow="visible" />
          </AreaChart>
        </Card>
        </Reveal>

        <Reveal className="min-h-0">
        <Card className="h-full" title="Visits by department" action={<span className="text-[11px] text-muted">This week</span>}>
          <ul className="space-y-3.5 pt-1">
            {departments.map((d, i) => (
              <li key={d.name}>
                <div className="flex justify-between text-[12px]">
                  <span className="text-body">{d.name}</span>
                  <span className="font-semibold tabular-nums">{d.value}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cloud">
                  <GrowBar
                    width={(d.value / maxDept) * 100}
                    className="h-full rounded-full"
                    style={{ background: i === 0 ? PRIMARY : i === 1 ? SECONDARY : TERTIARY }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Reveal>
        <Card className="h-full" title="Recent registrations" action={<span className="text-[11px] font-medium text-accent-600">View all</span>}>
          <ul className="divide-y divide-line">
            {recentRegistrations.slice(0, 3).map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-2">
                <span className="grid size-8 place-items-center rounded-full bg-cloud text-[11px] font-semibold text-charcoal-700">{r.name.replace(/\. ?/g, "")}</span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="text-[12.5px] font-medium">{r.name} · {r.sex}, {r.age}</p>
                  <p className="text-[11px] text-muted">{r.id} · {r.unit}</p>
                </div>
                <span className="text-[11px] tabular-nums text-muted">{r.time}</span>
              </li>
            ))}
          </ul>
        </Card>
        </Reveal>
        <Reveal>
        <Card className="h-full" title="Facility activity" action={<span className="flex items-center gap-1.5 text-[11px] font-medium text-muted"><span className="size-1.5 rounded-full bg-signal-500 motion-safe:animate-pulse" />Live</span>}>
          <ul className="space-y-2.5">
            {facilities.slice(0, 3).map((f) => (
              <li key={f.name} className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-mist text-charcoal-700"><Building className="size-3.5" /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-medium">{f.name}</span>
                    <StatusChip status={f.status} />
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-cloud">
                    <GrowBar width={f.load} className="h-full rounded-full bg-accent-600" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        </Reveal>
      </div>
    </Stagger>
  );
}

function RecordsView() {
  const selected = patients[0];
  const timeline: { label: string; meta: string; icon: Icon; done: boolean }[] = [
    { label: "Registered at OPD", meta: "08:52", icon: UserPlus, done: true },
    { label: "Vitals recorded", meta: "09:05", icon: Activity, done: true },
    { label: "Consultation started", meta: "09:40", icon: Stethoscope, done: true },
    { label: "Lab request · Full blood count", meta: "Pending", icon: FlaskConical, done: false },
    { label: "Prescription", meta: "Pending", icon: Pill, done: false },
  ];
  return (
    <div className="grid h-full grid-cols-[1fr_300px] gap-4">
      <Card
        title="All patients"
        className="min-h-0"
        action={
          <div className="flex gap-2">
            <span className="rounded-lg border border-line px-2.5 py-1 text-[11px] text-body">All facilities ▾</span>
            <span className="rounded-lg bg-accent-600 px-2.5 py-1 text-[11px] font-medium text-white">+ New patient</span>
          </div>
        }
      >
        <table className="w-full text-left text-[12px]">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wide text-subtle">
              <th className="py-2 font-medium">Patient ID</th>
              <th className="py-2 font-medium">Name</th>
              <th className="py-2 font-medium">Age / Sex</th>
              <th className="py-2 font-medium">Facility</th>
              <th className="py-2 font-medium">Last visit</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => (
              <tr key={p.id} className={cn("border-b border-line/70", i === 0 && "bg-accent-50/70 shadow-[inset_3px_0_0_var(--color-accent-500)]")}>
                <td className="py-[11px] pl-1 font-mono text-[11.5px] text-muted">{p.id}</td>
                <td className="py-[11px] font-medium">{p.name}</td>
                <td className="py-[11px] text-body">{p.age} · {p.sex}</td>
                <td className="py-[11px] text-body">{p.facility}</td>
                <td className="py-[11px] text-body">{p.last}</td>
                <td className="py-[11px]"><StatusChip status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex min-h-0 flex-col gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-accent-600 font-display text-[14px] font-bold text-white">AM</span>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-bold">{selected.name}</p>
              <p className="whitespace-nowrap text-[11px] text-muted">{selected.id} · {selected.sex}, {selected.age}</p>
            </div>
          </div>
          <div className="mt-3"><StatusChip status={selected.status} /></div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              ["Blood pressure", "118/76"],
              ["Temperature", "36.7 °C"],
              ["Pulse", "72 bpm"],
              ["SpO₂", "98%"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-mist px-3 py-2">
                <p className="text-[10.5px] text-muted">{k}</p>
                <p className="font-display text-[15px] font-bold tabular-nums">{v}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Today's visit" className="flex-1">
          <ol className="relative space-y-3.5 pl-1">
            <span className="absolute bottom-2 left-[14px] top-2 w-px bg-line" />
            {timeline.map((t) => (
              <li key={t.label} className="relative flex items-center gap-3">
                <span className={cn("relative grid size-[22px] place-items-center rounded-full ring-4 ring-white", t.done ? "bg-accent-600 text-white" : "bg-cloud text-subtle")}>
                  <t.icon className="size-3" />
                </span>
                <span className={cn("flex-1 text-[12px]", t.done ? "font-medium" : "text-muted")}>{t.label}</span>
                <span className="text-[11px] text-muted">{t.meta}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}

function AppointmentsView() {
  const reduce = useReducedMotion();
  const hours = [8, 9, 10, 11, 12, 13, 14];
  const rowH = 64;
  const toneClass: Record<string, string> = {
    primary: "border-accent-600 bg-accent-50 text-accent-700",
    secondary: "border-charcoal-400 bg-white text-ink ring-1 ring-inset ring-line",
    muted: "border-line bg-mist text-muted",
  };
  const total = attendance.reduce((s, a) => s + a.value, 0);
  return (
    <div className="grid h-full grid-cols-[1fr_280px] gap-4">
      <Card
        title="Thursday schedule"
        className="min-h-0 overflow-hidden"
        action={
          <div className="flex gap-1 rounded-lg bg-mist p-0.5 text-[11px]">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
              <span key={d} className={cn("rounded-md px-2.5 py-1", d === "Thu" ? "bg-white font-semibold shadow-sm" : "text-muted")}>{d}</span>
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-[48px_1fr_1fr_1fr] border-b border-line pb-2 text-[11px] font-semibold text-body">
          <span />
          {clinicians.map((c) => <span key={c} className="px-2">{c}</span>)}
        </div>
        <div className="relative grid grid-cols-[48px_1fr_1fr_1fr]" style={{ height: hours.length * rowH }}>
          <div>
            {hours.map((h) => (
              <div key={h} className="text-[10.5px] tabular-nums text-subtle" style={{ height: rowH }}>{String(h).padStart(2, "0")}:00</div>
            ))}
          </div>
          {clinicians.map((c, col) => (
            <div key={c} className="relative border-l border-line">
              {hours.map((h) => <div key={h} className="border-b border-dashed border-line/80" style={{ height: rowH }} />)}
              {appointments
                .filter((a) => a.col === col)
                .map((a) => (
                  <div
                    key={`${a.who}-${a.start}`}
                    className={cn("absolute inset-x-1.5 rounded-md border-l-[3px] px-2 py-1 leading-tight", toneClass[a.tone])}
                    style={{ top: (a.start - 8) * rowH + 2, height: a.dur * rowH - 4 }}
                  >
                    <p className="text-[11.5px] font-semibold">{a.who}</p>
                    <p className="text-[10.5px] opacity-80">{a.type}</p>
                  </div>
                ))}
            </div>
          ))}
          <div className="pointer-events-none absolute left-[44px] right-0 flex items-center" style={{ top: 2.6 * rowH }}>
            <span className="size-2 rounded-full bg-signal-500" />
            <span className="h-px flex-1 bg-signal-500" />
          </div>
        </div>
      </Card>

      <div className="flex min-h-0 flex-col gap-4">
        <Card title="Attendance this week">
          <div className="relative mx-auto" style={{ width: 160, height: 160 }}>
            <PieChart width={160} height={160}>
              <Pie data={attendance} dataKey="value" innerRadius={52} outerRadius={74} paddingAngle={2} stroke="none" isAnimationActive={!reduce} animationDuration={1200}>
                {attendance.map((a) => <Cell key={a.name} fill={a.color} />)}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 grid place-items-center text-center leading-tight">
              <div>
                <p className="font-display text-[22px] font-bold">{Math.round((attendance[0].value / total) * 100)}%</p>
                <p className="text-[10.5px] text-muted">attended</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <Legend items={attendance.map((a) => ({ label: a.name, color: a.color }))} />
          </div>
        </Card>
        <Card title="Up next" className="flex-1">
          <ul className="space-y-2.5">
            {[
              ["10:15", "J. K.", "Follow-up · Room 1"],
              ["10:30", "G. F.", "Postnatal · Maternal"],
              ["11:00", "Y. B.", "Child welfare · Room 2"],
            ].map(([t, n, d]) => (
              <li key={t} className="flex items-center gap-3 rounded-lg bg-mist px-3 py-2">
                <span className="font-mono text-[11.5px] font-semibold text-charcoal-700">{t}</span>
                <div className="leading-tight">
                  <p className="text-[12px] font-medium">{n}</p>
                  <p className="text-[11px] text-muted">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function ReportsView() {
  const reduce = useReducedMotion();
  const reports = [
    { title: "Outpatient summary", meta: "June · PDF, Excel", state: "Ready" },
    { title: "Facility performance", meta: "Q2 · 4 facilities", state: "Ready" },
    { title: "Surveillance export", meta: "Weekly · CSV", state: "Generating" },
  ];
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-4">
      <div className="grid grid-cols-3 gap-4">
        {reports.map((r) => (
          <div key={r.title} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4">
            <span className="grid size-10 place-items-center rounded-lg bg-mist text-charcoal-700"><FileText className="size-4" /></span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[12.5px] font-semibold">{r.title}</p>
              <p className="mt-0.5 text-[11px] text-muted">{r.meta}</p>
              {r.state === "Generating" && (
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-cloud"><div className="h-full w-2/3 rounded-full bg-accent-500" /></div>
              )}
            </div>
            {r.state === "Ready" ? (
              <span className="grid size-8 place-items-center rounded-lg border border-line text-body"><Download className="size-3.5" /></span>
            ) : (
              <RefreshCw className="size-4 text-accent-500 motion-safe:animate-spin [animation-duration:3s]" />
            )}
          </div>
        ))}
      </div>

      <div className="grid min-h-0 grid-cols-[1.5fr_1fr] gap-4">
        <Card title="Visits and admissions · Jan – Jun" action={<Legend items={[{ label: "Visits", color: PRIMARY }, { label: "Admissions ×5", color: TERTIARY }]} />}>
          <BarChart width={520} height={250} data={monthly.map((m) => ({ ...m, adm: m.admissions * 5 }))} margin={{ top: 6, right: 0, left: -10, bottom: 0 }} barGap={4}>
            <CartesianGrid vertical={false} stroke={GRID} />
            <XAxis dataKey="m" tickLine={false} axisLine={false} tick={AXIS} />
            <YAxis tickLine={false} axisLine={false} tick={AXIS} width={48} />
            <Bar dataKey="visits" fill={PRIMARY} radius={[5, 5, 0, 0]} barSize={20} isAnimationActive={!reduce} animationDuration={1100} />
            <Bar dataKey="adm" fill={TERTIARY} radius={[5, 5, 0, 0]} barSize={20} isAnimationActive={!reduce} animationDuration={1100} />
          </BarChart>
          <div className="mt-3 border-t border-line pt-3">
            <p className="mb-2 text-[12px] font-semibold">Key indicators</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {indicators.map((ind) => (
                <div key={ind.name}>
                  <div className="flex justify-between text-[11.5px]">
                    <span className="text-body">{ind.name}</span>
                    <span className="font-semibold tabular-nums">{ind.value}%</span>
                  </div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-cloud"><div className={cn("h-full rounded-full", ind.value < ind.target ? "bg-warning" : "bg-accent-600")} style={{ width: `${ind.value}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Visits by facility type">
          <div className="flex items-center gap-4">
            <PieChart width={170} height={170}>
              <Pie data={facilityMix} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2} stroke="none" isAnimationActive={!reduce} animationDuration={1200}>
                {facilityMix.map((f) => <Cell key={f.name} fill={f.color} />)}
              </Pie>
            </PieChart>
            <ul className="flex-1 space-y-2.5">
              {facilityMix.map((f) => (
                <li key={f.name} className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-2 text-body"><span className="size-2 rounded-full" style={{ background: f.color }} />{f.name}</span>
                  <span className="font-semibold tabular-nums">{f.value}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 rounded-lg border border-line bg-mist p-3">
            <div className="flex items-center gap-2 text-[12px] font-semibold"><ClipboardList className="size-3.5 text-charcoal-600" />Scheduled reporting</div>
            <ul className="mt-2 space-y-1.5 text-[11.5px] text-body">
              {["Weekly surveillance · every Monday", "Monthly summary · 1st of month", "Quarterly review · end of quarter"].map((s) => (
                <li key={s} className="flex items-center gap-2"><CircleCheck className="size-3.5 text-success" />{s}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
