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
          200: '#2e9705', // we use this on hover secondary button
          100: '#2e9705eb',
          80: '#2e9705db2',
          60: '#2e9705c9',
        },
        accent: {
          200: '#970584', // we use this on hover primary button
          100: '#970584ba',
          80: '#97058482',
          60: '#97058482',
          20: '#97058429',
        },
        orange: {
          200: '#970584ba'
        },
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/line-clamp')]
};