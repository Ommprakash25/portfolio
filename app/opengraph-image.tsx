import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12110f",
          color: "#ece6dc",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", opacity: 0.7 }}>
          {site.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 32, marginTop: 16, opacity: 0.8 }}>{site.role}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
