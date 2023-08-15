// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-icon'
  ],
  googleFonts: {
    families: {
      Roboto: true,
      Oswald: true,
    }
  },
  app: {
    baseURL: '/Nuxt_FakeStore/',
    buildAssetsDir: 'assets'
  },
  experimental: {
    payloadExtraction: true
  }
})
