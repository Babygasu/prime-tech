import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Prime-Techmate: Powering Healthcare Through Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Official logo, unaltered (see components/brand/Logo.tsx).
  const logo = await readFile(join(process.cwd(), "public/brand/prime-techmate-logo.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#fcfbf9",
          color: "#141416",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={312} height={70} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 48, height: 4, borderRadius: 4, background: "#ed1c24", marginBottom: 32 }} />
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>Powering Healthcare</div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>
            Through&nbsp;<span style={{ color: "#ed1c24" }}>Technology.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#6a6a71" }}>
            Health systems and digital health infrastructure · Accra, Ghana
          </div>
        </div>
      </div>
    ),
    size,
  );
}
