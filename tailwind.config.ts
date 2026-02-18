import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class", "html"],
  content: [
    "./pages/**/*.{ts,tsx}",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{ts,tsx}",
  ],
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
        // Maintain existing raiders color palette
        raiders: {
          black: '#000000',
          silver: '#A5ACAF',
          orange: '#FD5A1E',
          whitesmoke: '#F5F5F5',
          darkGray: '#4d4d4d',
        },
        // Add extended orange color palette
        orange: {
          DEFAULT: '#FD5A1E',
          '50': '#FFF0EC',
          '100': '#FFE1D9',
          '200': '#FFC3B2',
          '300': '#FFA58C',
          '400': '#FF8865',
          '500': '#FD5A1E', // Primary orange
          '600': '#E74A10',
          '700': '#D13A00',
          '800': '#AB3000',
          '900': '#862500',
        },
        // Add named colors for easier reference
        'primary-black': '#000000',
        'silver': '#A5ACAF',
        'whitesmoke': '#F5F5F5',
        'dark-gray': '#4d4d4d',
        'edward-gray': '#a4acac',
        'santas-gray': '#a4a4ac',
        // Keep existing shadcn colors
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
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero-pattern.svg')",
        'dots-orange': "url(\"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='1.5' fill='%23FD5A1E' fill-opacity='0.2'/%3E%3C/svg%3E\")",
        'dots-silver': "url(\"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='1.5' fill='%23A5ACAF' fill-opacity='0.2'/%3E%3C/svg%3E\")",
        'grid': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H20V20H0V0Z' fill='none' stroke='%23A5ACAF' stroke-width='0.2'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'dots-pattern': '30px 30px',
        'grid-pattern': '20px 20px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Add additional border radius values
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'highlight': '0 0 15px 5px rgba(253, 90, 30, 0.15)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Add new keyframes for comparison components
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glare: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Add new animations
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideInFromBottom 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s infinite',
        'glare': 'glare 2s ease-in-out infinite',
      },
      // Add specific timing configurations to avoid dynamic class warnings
      transitionDelay: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionDuration: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  // Minimal safelist - only classes actually used dynamically
  safelist: [
    // Only animation delays/durations that are used
    'delay-150', 'delay-200', 'delay-300',
    'duration-500', 'duration-700',
  ],
} satisfies Config;

export default config;