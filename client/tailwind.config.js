/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
        base_color_brand: "#5131E7",
        base_color_error: "#EB2013",
        base_color_success: "#0CBB52",
        content_color_primary: "#212121",
        content_color_secondary: "#6B6B6B",
        content_color_tertiary: "#A6A6A6",
        content_color_brand: "#D23F0E",
        content_color_info: "#0053B8",
        content_color_error: "#8E1A10",
        content_color_warning: "#AD7A03",
        content_color_success: "#007F31",
        content_color_constant: "#FFFFFF",
        content_color_link: "#0265D2",
        background_color_primary: '#FFFFFF',
        background_color_secondary: "#F9F9F9",
        background_color_tertiary: "#F2F2F2",
        background_color_brand: "#FFF1EB",
        background_color_info: "#E7F0FF",
        background_color_error: "#FFEBE7",
        background_color_warning: "#FFF9E0",
        background_color_success: "#E5FFF1",
        border_color_subdued: "#F2F2F2",
        border_color_default: "#EDEDED",
        border_color_strong: "#E6E6E6",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}