import { readFileSync } from "fs";
import path from "path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoBuffer = readFileSync(path.join(process.cwd(), "public/images/brand/logo-mark.png"));
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b2545 0%, #16365f 55%, #1c4a6b 100%)",
        }}
      >
        <img alt="Akem Health" height={220} src={logoBase64} width={220} />
        <div style={{ marginTop: 28, fontSize: 60, fontWeight: 700, color: "#ffffff" }}>
          Akem Health
        </div>
        <div style={{ marginTop: 10, fontSize: 26, color: "#8fd3c0", letterSpacing: 2 }}>
          INTERNATIONAL HEALTH TOURISM
        </div>
      </div>
    ),
    size,
  );
}
