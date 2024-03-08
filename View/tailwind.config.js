/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        primaryPurple: "#7f007f",
        spaceBlack: "#0d1117",
      },
      backgroundImage: {
        TodoBg: "url(/backgrounds/todobg.svg)",
      },
    },
  },
  plugins: [typography],
};
