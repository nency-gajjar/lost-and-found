export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'lost-and-found-new',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [{ src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBQjLdAdHmmA6Noz2HY5UuWWrORp38vblI&libraries=places "}],
  },

  loading: { color: 'orange', height: '3px' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/base-components',
    '~/plugins/vee-validate',
    "~/plugins/vue-tel-input",
    "~/plugins/vue-cropper",
    "~/plugins/font-awesome"
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
    '@nuxtjs/auth',
    '@nuxtjs/toast',
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

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
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
