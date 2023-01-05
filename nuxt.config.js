export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Found Shelf',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
    ],
    script: [{ src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&libraries=places` }],
  },

  loading: { color: '#153f5ed9', height: '3px' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/base-components',
    '~/plugins/vee-validate',
    "~/plugins/vue-tel-input",
    "~/plugins/font-awesome",
    { src: "~/plugins/html2pdf", mode: 'client' },
    { src: "~/plugins/persistedState", mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'nuxt-stripe-module',
  ],

  // Toast notifications Configuration
  toast: {
    position: 'top-right',
    iconPack: 'fontawesome',
    duration: 5000,
    keepOnHover: true,
    closeOnSwipe: true,
    containerClass: 'sm:!right-8 sm:!top-8',
    className: '!py-2 !px-4 sm:!rounded sm:!shadow cursor-pointer',
    action: {
      icon: 'xmark',
      // text : 'Cancel',
      class: '!fill-current !text-white',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      },
    },
  },

  // i18n Configuration
  i18n: {
    locales: [{ code: 'en', file: 'en.js', iso: 'en-US' }],
    defaultLocale: 'en',
    vueI18nLoader: true,
    langDir: 'lang/',
    lazy: true,
    vueI18n: {
      fallbackLocale: 'en',
      silentFallbackWarn: true,
      silentTranslationWarn: true,
    },
  },

  // env vars
  env: {
    GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/loginAdmin', method: 'post', propertyName: 'token' },
          logout: true,
          user: false
        }
      }
    }
  }
}
