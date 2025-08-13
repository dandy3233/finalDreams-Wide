import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        // Ethiopian-inspired colors
        ethiopian: {
          green: {
            50: "hsl(120, 40%, 95%)",
            100: "hsl(120, 40%, 85%)",
            200: "hsl(120, 40%, 75%)",
            300: "hsl(120, 40%, 65%)",
            400: "hsl(120, 40%, 55%)",
            500: "hsl(120, 60%, 35%)", // Main Ethiopian green
            600: "hsl(120, 70%, 25%)",
            700: "hsl(120, 80%, 20%)",
            800: "hsl(120, 90%, 15%)",
            900: "hsl(120, 100%, 10%)",
          },
          yellow: {
            50: "hsl(45, 100%, 95%)",
            100: "hsl(45, 100%, 85%)",
            200: "hsl(45, 100%, 75%)",
            300: "hsl(45, 100%, 65%)",
            400: "hsl(45, 100%, 55%)",
            500: "hsl(45, 100%, 50%)", // Main Ethiopian yellow
            600: "hsl(45, 90%, 45%)",
            700: "hsl(45, 80%, 40%)",
            800: "hsl(45, 70%, 35%)",
            900: "hsl(45, 60%, 30%)",
          },
          red: {
            50: "hsl(0, 70%, 95%)",
            100: "hsl(0, 70%, 85%)",
            200: "hsl(0, 70%, 75%)",
            300: "hsl(0, 70%, 65%)",
            400: "hsl(0, 70%, 55%)",
            500: "hsl(0, 85%, 45%)", // Main Ethiopian red
            600: "hsl(0, 90%, 40%)",
            700: "hsl(0, 95%, 35%)",
            800: "hsl(0, 100%, 30%)",
            900: "hsl(0, 100%, 25%)",
          },
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
