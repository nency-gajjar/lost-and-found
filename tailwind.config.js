const colors = require("tailwindcss/colors");
module.exports = {
  purge: {
    mode: "layers",
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
      "nuxt.config.js",
      "plugins/**/*.ts",
      "nuxt.config.ts"
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        emerald: colors.emerald,
        gray: colors.gray,
        primary: {
          200: '#4a326d', // we use this on hover secondary button
          100: '#361C5D',
          80: '#E7E4EF',
          60: '#FBFAFF',
        },
        accent: {
          200: '#f1791d', // we use this on hover primary button
          100: '#F06B04',
          80: '#F7B17A',
          60: '#FFE4CC',
          20: '#FDF0E5',
        },
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/line-clamp')]
};