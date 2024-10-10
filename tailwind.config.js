/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#edcf5d",
        secondaryColor: "#f2f0ea",
        borderColor: "#eeeeee",
      },
      fontSize: {
        my14: "14px",
      },
    },
  },
  plugins: [],
};
