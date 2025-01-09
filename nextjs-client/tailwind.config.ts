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
        primary: "#27df2d",
        layout: "#121825",
        second: "#262c37",
        typography: "#a6b2c9",
        yellow: "#d4dd29",
        facebook: "#3b5999",
        youtube: "#cd201f",
        instagram: "#e4405f",
        "social-x": "#55acee",
        "gray-place": "#989faa",
        warning: "#FFA70B",
        success: "#219653",
      },
      width: {
        "header-menu": "8.75rem",
      },
      height: {
        header: "5rem",
        "header-menu": "4.375rem",
        "movie-card": "25rem",
      },
      spacing: {
        header: "5rem", // Đây là giá trị margin-top của bạn
      },
      padding: {
        header: "0.875rem", // Padding tùy chỉnh 5/6
      },
      borderRadius: {
        "circle-md": "0.625rem",
        "circle-lg": "1.125rem",
      },
      keyframes: {
        "back-pulse": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(8px)" },
        },
        bounceUpDown: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
      animation: {
        "back-pulse": "back-pulse 2s ease-in-out infinite",
        "bounce-up-down": "bounceUpDown 1.5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
