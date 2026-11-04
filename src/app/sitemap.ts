import type { MetadataRoute } from "next";
import { navigation, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map((n) => ({
    url: `${site.url}${n.href}`,
    changeFrequency: "monthly",
    priority: n.href === "/" ? 1 : 0.7,
  }));
}
