import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        muted: "#737373",
        line: "#E5E5E5",
        sidebar: "#FAFAFA",
        danger: "#EF4444",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,.05), 0 8px 24px rgba(0,0,0,.05)",
      },
    },
  },
  plugins: [],
};

export default config;
