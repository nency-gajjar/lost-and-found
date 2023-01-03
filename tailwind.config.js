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
    fontFamily: {
      display: ['Rubik']
    },
    extend: {
      colors: {
        emerald: colors.emerald,
        gray: colors.gray,
        primary: {
          200: '#35d87a', // we use this on hover secondary button
          100: '#35d87a',
          80: '#35d87ac2',
          60: '#35d87a7a',
        },
        accent: {
          200: '#153f5e', // we use this on hover primary button
          100: '#153f5ed9',
          80: '#153f5ec4',
          60: '#153f5eab',
          20: '#153f5e24',
        },
        orange: {
          200: '#35d87a'
        },
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/line-clamp')]
};