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
          200: '#2e9705', // we use this on hover secondary button
          100: '#2e9705eb',
          80: '#2e9705db2',
          60: '#2e9705c9',
        },
        accent: {
          200: '#153f5e', // we use this on hover primary button
          100: '#153f5ed9',
          80: '#153f5ec4',
          60: '#153f5eab',
          20: '#153f5e24',
        },
        orange: {
          200: '#153f5ed9'
        },
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/line-clamp')]
};