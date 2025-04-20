/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#F5F5F5",
        primary: {
          DEFAULT: "#4639B3",
          foreground: "#F5F5F5",
        },
        secondary: {
          DEFAULT: "#33AAA4",
          foreground: "#0A0A0A",
        },
        destructive: {
          DEFAULT: "#A83339",
          foreground: "#F5F5F5",
        },
        muted: {
          DEFAULT: "#1A1A1A",
          foreground: "#F5F5F5",
        },
        accent: {
          DEFAULT: "#272727",
          foreground: "#F5F5F5",
        },
        input: "#343434",
        ring: "#4639B3",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
