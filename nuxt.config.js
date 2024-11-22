export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      spotifyClientId: process.env.NUXT_PUBLIC_SPOTIFY_CLIENT_ID,
      spotifyClientSecret: process.env.NUXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      spotifyRedirectUri: process.env.NUXT_PUBLIC_SPOTIFY_REDIRECT_URI
    }
  }
})
