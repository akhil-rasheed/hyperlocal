/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      raisin: "#45310c",
      "rich-black": "#0b090a",
      "ultra-violet": "#E3F4F4",
      quartz: "#E09F3E",
      "mint-green": "#F8F6F4",
      "honey-yellow": "#55917F",
      "oxford-blue": "#161B33",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
