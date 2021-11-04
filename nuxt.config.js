export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pillgood-admin',
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
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/eslint-module',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  auth: {
    strategies: {
      apollo: {
        scheme: '~/plugins/apollo-auth.js',
        token: {
          type: ''
        }
      }
    },
    redirect: {
      login: '/auth/login',
      callback: '/callback',
      logout: '/auth/login',
      home: '/'
    },
    // cookie: false,
    resetOnError: true
  },

  apollo: {
    tokenName: 'auth._token.apollo',
    authenticationType: '',
    cookieAttributes: null,
    clientConfigs: {
      default: {
        tokenName: 'auth._token.apollo',
        httpEndpoint: 'https://dev-api.richcrews.com/graphql',

        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        wsEndpoint: null,

        // Enable Automatic Query persisting with Apollo Engine
        persisting: false,

        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    port: 5000
  }
}
