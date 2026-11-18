import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          background: "#14183F",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#F77B24",
            fontSize: 118,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          W
        </div>
        <div
          style={{
            display: "flex",
            width: 86,
            height: 9,
            marginTop: 8,
            borderRadius: 9,
            background: "linear-gradient(90deg, #2CC6E8, #8A5CE0)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}