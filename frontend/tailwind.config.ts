import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#1a1a1a",
          800: "#2d2d2d",
          700: "#404040",
          400: "#a1a1aa",
          500: "#71717a",
        },
        purple: {
          600: "#9333ea",
        },
      },
    },
  },
  plugins: [],
}

export default config
