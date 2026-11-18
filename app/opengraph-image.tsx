import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "WINGS | Coding, AI and digital skills academy in Bhavnagar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadLogo() {
  try {
    const buf = await readFile(
      join(process.cwd(), "public/images/wings-logo.png")
    );
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

// Optional: drop BricolageGrotesque-ExtraBold.ttf into app/fonts/ to match the site.
async function loadFonts() {
  try {
    const data = await readFile(
      join(process.cwd(), "app/fonts/BricolageGrotesque-ExtraBold.ttf")
    );
    return [
      { name: "Display", data, weight: 800 as const, style: "normal" as const },
    ];
  } catch {
    return undefined;
  }
}

export default async function OpengraphImage() {
  const [logo, fonts] = await Promise.all([loadLogo(), loadFonts()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "56px 72px",
          background: "#FBF6EC",
          color: "#14183F",
          fontFamily: "Display, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -70,
            top: -70,
            width: 340,
            height: 340,
            display: "flex",
            borderRadius: 9999,
            background: "#2CC6E8",
            border: "6px solid #14183F",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 170,
            bottom: -110,
            width: 250,
            height: 250,
            display: "flex",
            borderRadius: 9999,
            background: "#8A5CE0",
            border: "6px solid #14183F",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 330,
            width: 70,
            height: 70,
            display: "flex",
            borderRadius: 9999,
            background: "#F77B24",
            border: "6px solid #14183F",
          }}
        />

        <div style={{ display: "flex" }}>
          {logo ? (
            <img
              src={logo}
              width={300}
              height={109}
              style={{ width: 300, height: 109, objectFit: "contain" }}
            />
          ) : (
            <div style={{ display: "flex", fontSize: 72, fontWeight: 800 }}>
              WINGS
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            Take your skills to the
          </div>
          <div style={{ display: "flex", marginTop: 12 }}>
            <div
              style={{
                display: "flex",
                padding: "4px 28px 10px",
                background: "#F77B24",
                color: "#FFFFFF",
                border: "6px solid #14183F",
                borderRadius: 28,
                fontSize: 84,
                fontWeight: 800,
                lineHeight: 1.05,
                transform: "rotate(-2deg)",
              }}
            >
              next level.
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              padding: "10px 26px",
              background: "#2CC6E8",
              border: "4px solid #14183F",
              borderRadius: 9999,
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            For kids
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 16,
              padding: "10px 26px",
              background: "#8A5CE0",
              color: "#FFFFFF",
              border: "4px solid #14183F",
              borderRadius: 9999,
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            For professionals
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 16,
              padding: "10px 26px",
              background: "#FFFFFF",
              border: "4px solid #14183F",
              borderRadius: 9999,
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            Offline in Bhavnagar
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}