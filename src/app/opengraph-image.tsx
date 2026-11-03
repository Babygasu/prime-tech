import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Prime-Techmate: Powering Healthcare Through Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#071122",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "#14b3a0" }} />
          Prime-Techmate
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>Powering Healthcare</div>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, color: "#7fe0d3" }}>
            Through Technology.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#7d8fae" }}>
            Health systems and digital health infrastructure · Accra, Ghana
          </div>
        </div>
      </div>
    ),
    size,
  );
}
