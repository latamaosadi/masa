/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "SS14C": ["'DSEG14 Classic'", "monospace"],
        "SS7C": ["'DSEG7 Classic'", "monospace"]
      }
    },
  },
  plugins: [],
}

