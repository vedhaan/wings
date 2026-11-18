import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wing: {
          cream: "#FBF6EC",
          navy: "#14183F",
          cyan: "#2CC6E8",
          blue: "#2F5BD0",
          violet: "#8A5CE0",
          sun: "#F77B24",
          "cyan-soft": "#D5F3FA",
          "violet-soft": "#E8DDFA",
          "sun-soft": "#FFE5D1",
          rose: "#EA5580",
          "rose-soft": "#FDE1EA",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      boxShadow: {
        "pop-sm": "3px 3px 0 0 #14183F",
        pop: "5px 5px 0 0 #14183F",
        "pop-lg": "9px 9px 0 0 #14183F",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(4deg)" },
        },
      },
      "marquee-reverse": {
        "0%": { transform: "translateX(-50%)" },
        "100%": { transform: "translateX(0)" },
      },
      "ping-soft": {
        "0%": { transform: "scale(1)", opacity: "0.6" },
        "80%, 100%": { transform: "scale(1.6)", opacity: "0" },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        "ping-soft": "ping-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;