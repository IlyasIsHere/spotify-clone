<template>
  <div class="music-player">
    <div class="track-info" v-if="audioStore.currentTrack">
      <img
        :src="audioStore.currentTrack.album.images[0]?.url"
        :alt="audioStore.currentTrack.name"
        class="track-image"
      />
      <div class="track-details">
        <h3>{{ audioStore.currentTrack.name }}</h3>
        <p>{{ artistNames }}</p>
        <p>{{ audioStore.currentTrack.album.name }}</p>
      </div>
    </div>
    <div class="controls">
      <div class="progress-bar">
        <div 
          class="progress" 
          :style="{ width: `${audioStore.progress}%` }"
        ></div>
      </div>
      <button @click="audioStore.togglePlay">
        {{ audioStore.isPlaying ? 'Pause' : 'Play' }}
      </button>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.1" 
        v-model="volume"
        @input="audioStore.setVolume(parseFloat($event.target.value))"
      />
    </div>
  </div>
</template>

<script setup>
const audioStore = useAudioStore()

const volume = ref(audioStore.volume)

const artistNames = computed(() => {
  if (!audioStore.currentTrack) return ''
  return audioStore.currentTrack.artists.map(artist => artist.name).join(', ')
})
</script>

<style scoped>
.music-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.track-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.track-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
}

.track-details {
  text-align: left;
}

.track-details h3 {
  margin: 0;
  font-size: 18px;
}

.track-details p {
  margin: 0;
  color: #666;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #ddd;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: #ddd;
  border-radius: 2px;
  margin: 10px 0;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #1DB954;
  transition: width 0.1s linear;
}
</style>
