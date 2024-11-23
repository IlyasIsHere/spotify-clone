import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    currentTrack: null,
    isPlaying: false,
    isEnded: false,
    audio: null
  }),

  actions: {
    playTrack(track) {
      if (!track?.preview_url) return

      // If there's already audio playing, stop it
      if (this.audio) {
        this.audio.pause()
        this.audio = null
      }

      // Create new audio instance
      this.audio = new Audio(track.preview_url)
      this.currentTrack = track
      this.isPlaying = true
      this.isEnded = false

      // Add event listeners
      this.audio.addEventListener('ended', () => {
        this.isEnded = true
        this.isPlaying = false
      })

      this.audio.addEventListener('error', (e) => {
        console.error('Audio playback error:', e)
        this.isPlaying = false
      })

      // Start playing
      this.audio.play()
    },

    pause() {
      if (this.audio) {
        this.audio.pause()
        this.isPlaying = false
      }
    },

    resume() {
      if (this.audio) {
        this.audio.play()
        this.isPlaying = true
      }
    },

    $reset() {
      if (this.audio) {
        this.audio.pause()
        this.audio = null
      }
      this.currentTrack = null
      this.isPlaying = false
      this.isEnded = false
    }
  }
})