import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14183F",
          borderRadius: 16,
          color: "#F77B24",
          fontSize: 46,
          fontWeight: 900,
        }}
      >
        W
      </div>
    ),
    { ...size }
  );
}