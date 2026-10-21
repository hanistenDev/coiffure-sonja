import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./salons/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--background)",
        surface: "var(--surface)",
        ink: "var(--foreground)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-foreground)",
        muted: "var(--muted)",
        "muted-dim": "var(--muted-dim)",
        line: "var(--border)",
      },
      fontFamily: {
        sans: [
          "var(--body-font)",
          "var(--font-outfit)",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--display-font)",
          "var(--font-cormorant)",
          "Georgia",
          "serif",
        ],
      },
      maxWidth: {
        page: "1160px",
        measure: "36rem",
      },
    },
  },
  plugins: [],
};

export default config;
