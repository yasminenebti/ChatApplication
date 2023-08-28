/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors : {
      primary : "#272829",
      secondary: "#61677A",
      grey : "#cacbcc",
      silver : "#D8D9DA",
      yellow : "#FFF6E0",
      white: "#EEEDED",
      blue : "#DDE6ED",
      sky:"#ECF2FF",
      fog : "#9DB2BF"

    }
  },
  plugins: [],
}

