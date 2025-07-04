import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // fontFamily: {
        //   sans: [
        //     'system-ui',
        //     '-apple-system',
        //     'BlinkMacSystemFont',
        //     '"Segoe UI"',
        //     'Roboto',
        //     '"Helvetica Neue"',
        //     'Arial',
        //     'sans-serif',
        //   ],
        // },
        // colors: {
        //   primary: {
        //     50: '#f0f9ff',
        //     100: '#e0f2fe',
        //     200: '#bae6fd',
        //     300: '#7dd3fc',
        //     400: '#38bdf8',
        //     500: '#0ea5e9',
        //     600: '#0284c7',
        //     700: '#0369a1',
        //     800: '#075985',
        //     900: '#0c4a6e',
        //   },
        //   secondary: {
        //     50: '#fdf2f8',
        //     100: '#fce7f3',
        //     200: '#fbcfe8',
        //     300: '#f9a8d4',
        //     400: '#f472b6',
        //     500: '#ec4899',
        //     600: '#db2777',
        //     700: '#be185d',
        //     800: '#9d174d',
        //     900: '#831843',
        //   },
        //   accent: {
        //     50: '#f0fdf4',
        //     100: '#dcfce7',
        //     200: '#bbf7d0',
        //     300: '#86efac',
        //     400: '#4ade80',
        //     500: '#22c55e',
        //     600: '#16a34a',
        //     700: '#15803d',
        //     800: '#166534',
        //     900: '#14532d',
        //   },
        // },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
