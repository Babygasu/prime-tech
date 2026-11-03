import type { NextConfig } from "next";

/**
 * Static export keeps the site deployable on the existing Hostinger
 * static hosting: `npm run build` writes plain HTML/CSS/JS to `out/`.
 * Remove `output: "export"` later if server features (API routes,
 * client portals) are introduced.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
