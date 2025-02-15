import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        black: {
          50: "#F0F0F0",
          100: "#E0E0E0",
          200: "#BFBFBF",
          300: "#A1A1A1",
          400: "#808080",
          500: "#616161",
          600: "#424242",
          700: "#212121",
          800: "#020202",
          900: "#000000",
          950: "#000000",
        },
        white: {
          50: "#FFFFFF",
          100: "#F2F2F2",
          200: "#D9D9D9",
          300: "#BFBFBF",
          400: "#A6A6A6",
          500: "#8C8C8C",
          600: "#737373",
          700: "#595959",
          800: "#404040",
          900: "#262626",
          950: "#1A1A1A",
        },
        green: {
          50: "#EFF6F1",
          100: "#E1EFE5",
          200: "#C4DECC",
          300: "#A6CEB2",
          400: "#89BE99",
          500: "#6AAD7E",
          600: "#509163",
          700: "#3C6D4A",
          800: "#284832",
          900: "#142419",
          950: "#09100B",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        }, 
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
