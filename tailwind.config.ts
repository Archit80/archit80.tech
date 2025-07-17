import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-background': "#0f0f0f",
        'dark-card': "#1a1a1a",
        'dark-text': "#f5f5f5",
        'dark-text-secondary': "#a3a3a3",
        'light-background': "#fafafa",
        'light-card': "#ffffff",
        'light-text': "#171717",
        'accent-neutral': "#525252",
        'accent-light': "#737373",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
      }
    },
  },
};
export default config;