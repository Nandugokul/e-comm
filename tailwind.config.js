/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#15803D",
        secondaryColor: "#f2f0ea",
        borderColor: "#eeeeee",
        selectBG: "#f5f5f5",
      },
      fontSize: {
        my14: "14px",
      },
      keyframes: {
        swap: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "5%": { opacity: "1", transform: "translateY(0)" },
          "33%": { opacity: "1" },
          "38%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        swap: "swap 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
