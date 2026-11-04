import { Building, Database, FlaskConical, Landmark, Pill, Smartphone, Stethoscope, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";

/**
 * Illustration: healthcare facilities exchanging information through a
 * central, secure data platform. Pure SVG + HTML, animated with SMIL
 * (hidden when the visitor prefers reduced motion).
 */

const W = 560;
const H = 440;
const HUB = { x: 280, y: 220 };

const nodes: { label: string; x: number; y: number; icon: ComponentType<LucideProps>; c: [number, number]; reverse?: boolean }[] = [
  { label: "Hospital", x: 104, y: 78, icon: Building, c: [150, 190] },
  { label: "Laboratory", x: 456, y: 78, icon: FlaskConical, c: [410, 190], reverse: true },
  { label: "Pharmacy", x: 492, y: 262, icon: Pill, c: [380, 280] },
  { label: "Clinic", x: 70, y: 254, icon: Stethoscope, c: [180, 280], reverse: true },
  { label: "Health directorate", x: 160, y: 384, icon: Landmark, c: [220, 360] },
  { label: "Mobile access", x: 420, y: 384, icon: Smartphone, c: [340, 360], reverse: true },
];

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

export function NetworkIllustration() {
  return (
    <div
      role="img"
      aria-label="Illustration: hospitals, clinics, laboratories, pharmacies and health administrators connected through a central secure data platform."
      className="relative w-full select-none"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#24429e" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#24429e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={HUB.x} cy={HUB.y} r="150" fill="url(#hub-glow)" />
        <circle cx={HUB.x} cy={HUB.y} r="118" fill="none" stroke="#17181b" strokeOpacity="0.07" />
        <circle cx={HUB.x} cy={HUB.y} r="182" fill="none" stroke="#17181b" strokeOpacity="0.06" strokeDasharray="2 6" />
        {nodes.map((n, i) => {
          const d = `M ${n.x} ${n.y} Q ${n.c[0]} ${n.c[1]} ${HUB.x} ${HUB.y}`;
          return (
            <g key={n.label}>
              <path d={d} fill="none" stroke="#17181b" strokeOpacity="0.16" strokeWidth="1.5" strokeDasharray="4 5" />
              <circle r="3.5" fill="#ed1c24" className="motion-dot">
                <animateMotion
                  dur={`${3.6 + (i % 3) * 0.6}s`}
                  begin={`${i * 0.55}s`}
                  repeatCount="indefinite"
                  path={d}
                  keyPoints={n.reverse ? "1;0" : "0;1"}
                  keyTimes="0;1"
                  calcMode="linear"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Central platform */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pct(HUB.x, W), top: pct(HUB.y, H) }}>
        <div className="relative grid place-items-center">
          <span aria-hidden className="absolute size-full animate-pulse-ring rounded-2xl bg-accent-500/20 sm:rounded-3xl" />
          <div className="relative grid size-16 place-items-center rounded-2xl bg-accent-600 shadow-lift sm:size-20 sm:rounded-3xl">
            <Database aria-hidden className="size-6 text-white sm:size-8" />
          </div>
        </div>
        <p className="absolute left-1/2 top-full mt-2 hidden w-max -translate-x-1/2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-charcoal-900 ring-1 ring-line sm:block">
          Secure data platform
        </p>
      </div>

      {nodes.map((n, i) => (
        <div
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pct(n.x, W), top: pct(n.y, H) }}
        >
          <div
            className="flex items-center gap-1.5 rounded-xl border border-line bg-white py-1.5 pl-1.5 pr-2.5 shadow-soft motion-safe:animate-float sm:gap-2 sm:py-2 sm:pl-2 sm:pr-3.5"
            style={{ animationDelay: `${i * -1.3}s` }}
          >
            <span className="grid size-6 place-items-center rounded-lg bg-cloud text-charcoal-900 sm:size-8">
              <n.icon aria-hidden className="size-3.5 sm:size-4" />
            </span>
            <span className="whitespace-nowrap text-[10px] font-semibold text-charcoal-900 sm:text-[13px]">{n.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
