import { defineStore } from '@pinia/nuxt'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentTrack: null,
    isPlaying: false,
    accessToken: null
  }),
  actions: {
    setCurrentTrack(track) {
      this.currentTrack = track
    },
    setIsPlaying(status) {
      this.isPlaying = status
    },
    setAccessToken(token) {
      this.accessToken = token
    }
  }
})
