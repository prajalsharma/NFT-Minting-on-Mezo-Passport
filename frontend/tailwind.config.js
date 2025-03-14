/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: {
          orange: "#f2a900",
          gray: "#4d4d4e",
        },
      },
    },
  },
  plugins: [],
};
