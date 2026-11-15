"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, FileChartColumn, LayoutDashboard, Users, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { Container, DemoBadge, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { BrowserFrame, ScaledCanvas } from "@/components/visuals/Frame";
import {
  DASHBOARD_HEIGHT,
  DASHBOARD_WIDTH,
  DemoDashboard,
  type DashboardView,
} from "@/components/visuals/dashboard/DemoDashboard";
import { cn } from "@/lib/cn";

const tabs: { id: DashboardView; label: string; icon: ComponentType<LucideProps>; description: string }[] = [
  {
    id: "overview",
    label: "Facility overview",
    icon: LayoutDashboard,
    description: "A single view of daily activity: registrations, appointments, bed occupancy and the status of connected facilities.",
  },
  {
    id: "records",
    label: "Patient records",
    icon: Users,
    description: "Digital records that follow the patient, with vitals, visit history and pending lab requests in one place.",
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: CalendarDays,
    description: "Clear schedules for every clinic and room, helping staff manage patient flow and reduce missed visits.",
  },
  {
    id: "reports",
    label: "Reporting & analytics",
    icon: FileChartColumn,
    description: "Routine reports and key indicators generated automatically, ready for management and health authorities.",
  },
];

export function TechInAction() {
  const [active, setActive] = useState<DashboardView>("overview");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = tabs.find((t) => t.id === active)!;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = tabs.findIndex((t) => t.id === active);
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="technology" aria-labelledby="technology-title" className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_70%_40%,black,transparent_80%)]" />
        <div className="absolute right-[-10%] top-[10%] h-[560px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgb(123_150_214/0.14),transparent)] motion-safe:animate-drift" />
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Technology in action"
              title={<span id="technology-title">See how connected systems simplify healthcare work.</span>}
              lead="An illustrative look at the kind of health information systems we design, from patient registration to management reporting."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <DemoBadge tone="dark">Demonstration concept · fictional data</DemoBadge>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-10">
          <Reveal>
            <div
              role="tablist"
              aria-label="Dashboard demonstrations"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
            >
              {tabs.map((t, i) => {
                const selected = t.id === active;
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`tab-${t.id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="tech-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(t.id)}
                    className={cn(
                      "group relative shrink-0 rounded-2xl text-left transition-colors duration-300 lg:w-full",
                      selected ? "bg-white/[0.07]" : "hover:bg-white/[0.04]",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="tech-tab-indicator"
                        aria-hidden
                        className="absolute inset-0 rounded-2xl ring-1 ring-white/15"
                        transition={{ type: "spring", stiffness: 360, damping: 34 }}
                      />
                    )}
                    <span className="relative flex items-center gap-3 px-4 py-3 lg:px-5 lg:py-4">
                      <span
                        className={cn(
                          "grid size-9 place-items-center rounded-xl transition-colors duration-300",
                          selected ? "bg-white text-navy-950" : "bg-white/[0.06] text-navy-400 group-hover:text-white",
                        )}
                      >
                        <t.icon aria-hidden className="size-[18px]" />
                      </span>
                      <span className={cn("whitespace-nowrap text-[15px] font-semibold", selected ? "text-white" : "text-navy-400 group-hover:text-white")}>
                        {t.label}
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {selected && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="relative hidden overflow-hidden px-5 text-[14px] leading-relaxed text-navy-300 lg:block"
                        >
                          <span className="block pb-5 pl-12">{t.description}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-navy-300 lg:hidden">{current.description}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div id="tech-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="relative">
              {/* Desktop view: Scaled full dashboard canvas */}
              <div className="hidden lg:block">
                <BrowserFrame className="border-white/10">
                  <ScaledCanvas
                    width={DASHBOARD_WIDTH}
                    height={DASHBOARD_HEIGHT}
                    label={`Illustrative ${current.label.toLowerCase()} screen with fictional sample data.`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <DemoDashboard view={active} />
                      </motion.div>
                    </AnimatePresence>
                  </ScaledCanvas>
                </BrowserFrame>
              </div>

              {/* Mobile-native responsive view: Clean, high-legibility interface card */}
              <div className="block lg:hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <MobileDashboardView view={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function MobileDashboardView({ view }: { view: DashboardView }) {
  if (view === "overview") {
    return (
      <div className="space-y-3 rounded-2xl border border-white/10 bg-navy-900/95 p-4.5 text-white shadow-soft">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="text-[12px] font-bold uppercase tracking-wider text-accent-300">Executive Facility Pulse</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Sync
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-white/[0.05] p-3 border border-white/5">
            <p className="text-[11px] text-navy-300">Active Visits Today</p>
            <p className="mt-1 text-xl font-bold text-white">142</p>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3 border border-white/5">
            <p className="text-[11px] text-navy-300">Bed Occupancy</p>
            <p className="mt-1 text-xl font-bold text-white">78%</p>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3 border border-white/5">
            <p className="text-[11px] text-navy-300">Claims Verified</p>
            <p className="mt-1 text-xl font-bold text-emerald-400">98.4%</p>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3 border border-white/5">
            <p className="text-[11px] text-navy-300">Connected Units</p>
            <p className="mt-1 text-xl font-bold text-white">6 Online</p>
          </div>
        </div>
        <p className="text-[11px] text-navy-300 pt-1">
          * Illustrative demonstration data simulating multi-department hospital sync.
        </p>
      </div>
    );
  }
  if (view === "records") {
    return (
      <div className="space-y-3 rounded-2xl border border-white/10 bg-navy-900/95 p-4.5 text-white shadow-soft">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-accent-600 text-xs font-bold">KO</span>
            <div>
              <p className="text-[13px] font-bold text-white">Kwame Osei</p>
              <p className="text-[10px] text-navy-300">NHIS #1092-4410 · Male, 41y</p>
            </div>
          </div>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-accent-300">OPD Encounter</span>
        </div>
        <div className="space-y-2 text-[12px]">
          <div className="flex justify-between rounded-lg bg-white/[0.04] p-2.5">
            <span className="text-navy-300">Latest Vitals:</span>
            <span className="font-semibold text-white">BP 124/82 · Temp 37.1°C</span>
          </div>
          <div className="flex justify-between rounded-lg bg-white/[0.04] p-2.5">
            <span className="text-navy-300">Clinical Diagnosis:</span>
            <span className="font-semibold text-white">Hypertension (Under Review)</span>
          </div>
          <div className="flex justify-between rounded-lg bg-white/[0.04] p-2.5">
            <span className="text-navy-300">Medication Order:</span>
            <span className="font-semibold text-accent-300">Amlodipine 5mg Daily</span>
          </div>
        </div>
      </div>
    );
  }
  if (view === "appointments") {
    return (
      <div className="space-y-3 rounded-2xl border border-white/10 bg-navy-900/95 p-4.5 text-white shadow-soft">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="text-[12px] font-bold uppercase tracking-wider text-accent-300">Today's Clinic Roster</span>
          <span className="text-[11px] text-navy-300">Morning Session</span>
        </div>
        <div className="space-y-2">
          {[
            { doctor: "Dr. K. Asante", clinic: "General OPD", queue: "18 Patients", room: "Room 1" },
            { doctor: "Dr. A. Mensah", clinic: "Antenatal Care", queue: "12 Patients", room: "Maternity" },
            { doctor: "Dr. E. Boateng", clinic: "Child Welfare", queue: "15 Patients", room: "Room 4" },
          ].map((d) => (
            <div key={d.doctor} className="flex items-center justify-between rounded-xl bg-white/[0.04] p-2.5">
              <div>
                <p className="text-[12.5px] font-bold text-white">{d.doctor}</p>
                <p className="text-[11px] text-navy-300">{d.clinic} · {d.room}</p>
              </div>
              <span className="rounded-md bg-accent-600/30 px-2 py-0.5 text-[11px] font-semibold text-accent-200">
                {d.queue}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-navy-900/95 p-4.5 text-white shadow-soft">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <span className="text-[12px] font-bold uppercase tracking-wider text-accent-300">Reporting & Indicators</span>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">GHS Format</span>
      </div>
      <div className="space-y-2 text-[12px]">
        <div className="flex justify-between rounded-lg bg-white/[0.04] p-2.5">
          <span className="text-navy-300">Monthly OPD Volume:</span>
          <span className="font-bold text-white">3,420 Visits</span>
        </div>
        <div className="flex justify-between rounded-lg bg-white/[0.04] p-2.5">
          <span className="text-navy-300">Electronic Claims Rate:</span>
          <span className="font-bold text-emerald-400">99.1% Reconciled</span>
        </div>
        <div className="flex justify-between rounded-lg bg-white/[0.04] p-2.5">
          <span className="text-navy-300">Avg. Consultation Time:</span>
          <span className="font-bold text-accent-300">14.2 minutes</span>
        </div>
      </div>
    </div>
  );
}
