/** @type {import('tailwindcss').Config} */
const rem = (px) => `${px / 16}rem`; // Converts px to rem (base 16)

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: rem(640), // 40rem
      md: rem(768), // 48rem
      lg: rem(1024), // 64rem
      xl: rem(1280), // 80rem
      "2xl": rem(1536), // 96rems
    },
  },
  plugins: [],
};
