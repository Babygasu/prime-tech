import type { NextConfig } from "next";

/**
 * For Vercel / server deployment, API routes (/api/chat, /api/lead) run as serverless functions.
 * When building for purely static hosting (e.g. Hostinger HTML files), set STATIC_EXPORT=true.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
