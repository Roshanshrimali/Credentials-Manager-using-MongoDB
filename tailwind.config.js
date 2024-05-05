/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      laptop: "1025px",
      tab: "500px",
      phone: "300px"
    }
  },
  plugins: [],
}