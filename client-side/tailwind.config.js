/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M100 0H0V100' fill='none' stroke='%23FFFFFF10' stroke-width='0.5'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow': '0 0 20px rgba(52, 211, 153, 0.2)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#312e81",
          "primary-content": "#8189f5",
          "primary-focus": "#1e3a8a",
          secondary: "#10b981",
          accent: "#34d399",
          neutral: "#2A3342",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#f87171",
        },
        dark: {
          primary: "#1e3a8a",
          "primary-focus": "#1e40af",
          secondary: "#059669",
          accent: "#10b981",
          neutral: "#D1D5DB",
          "base-100": "#1F2937",
          "base-content": "#F3F4F6",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#f87171",
        },
      },
    ],
  },
};
