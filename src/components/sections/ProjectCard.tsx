import { Check, ShieldCheck, MapPin } from "lucide-react";
import { deploymentCapabilities, type DeploymentCapability } from "@/content/site";

/**
 * Reusable capability & deployment card.
 * Presents verified deployment scopes across Ghana with honest institutional confidentiality.
 */
export function ProjectCard({
  category,
  capability: propCapability,
}: {
  category?: string;
  capability?: DeploymentCapability;
}) {
  // If not passed explicitly, find matching capability or fallback to first
  const capability =
    propCapability ||
    deploymentCapabilities.find(
      (c) => c.category.toLowerCase() === category?.toLowerCase() || c.title.toLowerCase().includes(category?.toLowerCase() || "")
    ) || {
      category: category || "Healthcare Technology",
      title: `${category || "Health Systems"} Deployment Scope`,
      description: "Structured deployment, configuration, and operational support tailored to healthcare facility standards.",
      highlights: ["Facility needs assessment", "Carefully phased deployment", "Local ongoing technical support"],
      status: "Active Scope",
    };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-[box-shadow,transform] duration-500 ease-premium hover:-translate-y-0.5 hover:shadow-lift">
      {/* Decorative technical pattern banner */}
      <div className="relative m-2.5 flex h-32 items-center justify-between overflow-hidden rounded-[20px] bg-navy-950 p-5 text-white sm:h-36 sm:p-6">
        <div aria-hidden className="bg-grid-dark absolute inset-0 opacity-70" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent-300 ring-1 ring-white/15">
            <ShieldCheck className="size-3 text-signal-400" />
            {capability.category}
          </span>
          <p className="mt-2 text-[14px] font-semibold text-white/90 sm:text-[15px]">{capability.title}</p>
        </div>
        <div className="relative z-10 shrink-0 text-right">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-medium text-white/90 backdrop-blur-sm">
            {capability.status}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-6 pt-3">
        <h3 className="text-xl font-bold tracking-tight text-ink sm:text-[22px]">{capability.title}</h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-body">{capability.description}</p>

        {/* Highlights */}
        <div className="mt-5 border-t border-line/70 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Core capabilities</p>
          <ul className="mt-2.5 space-y-2">
            {capability.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-[13px] font-medium text-ink">
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-700 ring-1 ring-accent-200/60">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-5 text-[12px] text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin aria-hidden className="size-3.5 text-signal-500" /> Nationwide · Ghana
          </span>
          <span className="text-[11px] text-subtle">Confidentiality observed</span>
        </div>
      </div>
    </article>
  );
}
