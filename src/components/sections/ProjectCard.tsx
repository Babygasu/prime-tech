import { ImagePlus, MapPin } from "lucide-react";

/** Reusable project card. Shows clearly marked placeholder content until verified details exist. */
export function ProjectCard({ category }: { category: string }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-500 hover:shadow-lift">
      <div className="relative m-2 grid aspect-[16/10] place-items-center overflow-hidden rounded-[20px] border border-dashed border-line bg-mist">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
        <div className="relative flex flex-col items-center gap-2 text-subtle transition-transform duration-500 group-hover:scale-105">
          <ImagePlus aria-hidden className="size-7" strokeWidth={1.5} />
          <span className="text-[12px] font-medium">Project image</span>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted ring-1 ring-line">
          Placeholder
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">{category}</p>
        <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-ink">[Project title to be confirmed]</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          Short summary of the client sector, scope of work and outcome. Replace with verified project details.
        </p>
        <p className="mt-auto flex items-center gap-1.5 pt-6 text-[13px] text-muted">
          <MapPin aria-hidden className="size-3.5" /> Location · Year
        </p>
      </div>
    </article>
  );
}
