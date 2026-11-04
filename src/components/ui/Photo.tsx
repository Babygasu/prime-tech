import { cn } from "@/lib/cn";

export type PhotoAsset = { src: string; width: number; height: number; alt: string; caption?: string };

/**
 * Photographs used across the site. Images in /public/images are already
 * web-sized (1280px wide), so a plain <img> is used (static export).
 */
export const photos = {
  nurseDesktop: {
    src: "/images/nurse-health-records-desktop.jpg",
    width: 1280,
    height: 960,
    alt: "A nurse in a Ghanaian clinic reviewing a health information dashboard on a desktop computer.",
    caption: "Illustrative image. The on-screen interface is a demonstration concept with fictional data.",
  },
  cliniciansTablet: {
    src: "/images/clinicians-reviewing-tablet.jpg",
    width: 1280,
    height: 853,
    alt: "A doctor and a nurse reviewing patient information together on a tablet.",
    caption: "Illustrative image.",
  },
  cliniciansDashboard: {
    src: "/images/clinicians-dashboard-consultation.jpg",
    width: 1280,
    height: 853,
    alt: "Two clinicians at a desk reviewing a facility dashboard on a tablet.",
    caption: "Illustrative image. The on-screen interface is a demonstration concept, not an Applify EMR screenshot.",
  },
} satisfies Record<string, PhotoAsset>;

export function Photo({
  photo,
  className,
  imgClassName,
  priority = false,
}: {
  photo: PhotoAsset;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn("flex flex-col", className)}>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[28px] border border-line bg-cloud">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export; images are pre-sized */}
        <img
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn("size-full object-cover", imgClassName)}
        />
      </div>
      {photo.caption ? <figcaption className="mt-3 text-center text-[12px] text-muted">{photo.caption}</figcaption> : null}
    </figure>
  );
}
