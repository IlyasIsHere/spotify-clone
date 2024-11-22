export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      spotifyClientId: '85757fb36be04e9194cfcf2b0093edb8',
      spotifyClientSecret: '606a633a49b745edb8d73a0f6fbf53ca',
      spotifyRedirectUri: 'http://localhost:3000/callback'
    }
  }
})
