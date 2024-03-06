/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
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
  plugins: [],
};
