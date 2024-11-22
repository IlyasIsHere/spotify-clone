import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    audio: null,
    currentTrack: null,
    isPlaying: false,
    volume: 1,
    progress: 0
  }),

  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['currentTrack', 'volume', 'progress']
  },

  actions: {
    initAudio() {
      if (!this.audio) {
        this.audio = new Audio()
        this.audio.volume = this.volume

        // Add event listeners
        this.audio.addEventListener('timeupdate', this.updateProgress)
        this.audio.addEventListener('ended', this.handleTrackEnd)

        // If there was a track playing before refresh, reload it
        if (this.currentTrack?.preview_url) {
          this.audio.src = this.currentTrack.preview_url
        }
      }
    },

    async playTrack(track) {
      if (!track?.preview_url) {
        console.error('No preview URL available for this track')
        return
      }

      this.initAudio()

      // If it's a different track, load and play it
      if (!this.currentTrack || this.currentTrack.id !== track.id) {
        this.currentTrack = track
        this.audio.src = track.preview_url
      }

      try {
        await this.audio.play()
        this.isPlaying = true
      } catch (error) {
        console.error('Error playing track:', error)
      }
    },

    pauseTrack() {
      if (this.audio && this.isPlaying) {
        this.audio.pause()
        this.isPlaying = false
      }
    },

    togglePlay() {
      if (this.isPlaying) {
        this.pauseTrack()
      } else if (this.currentTrack) {
        this.playTrack(this.currentTrack)
      }
    },

    updateProgress() {
      if (this.audio) {
        this.progress = (this.audio.currentTime / this.audio.duration) * 100
      }
    },

    handleTrackEnd() {
      this.isPlaying = false
      this.progress = 0
    },

    setVolume(value) {
      this.volume = value
      if (this.audio) {
        this.audio.volume = value
      }
    }
  }
})