<template>
  <div 
    class="track-card" 
    :class="{ 'playing': isPlaying }"
    @click="navigateToTrack"
    @mouseover="isHovered = true" 
    @mouseleave="isHovered = false"
  >
    <div class="track-image-container">
      <img
        :src="track.album ? track.album.images[0].url : imageUrl"
        :alt="track.name"
        class="track-image"
      />
      <button 
        class="play-button"
        :class="{ 'playing': isPlaying }"
        @click="handlePlayClick"
      >
        <span v-if="isPlaying">⏸</span>
        <span v-else>▶</span>
      </button>
    </div>
    <div class="track-info">
      <h3>{{ track.name }}</h3>
      <p>
        <span v-for="(artist, index) in track.artists" :key="artist.id">
          <NuxtLink 
            :to="`/artists/${artist.id}`"
            class="artist-link"
            @click.stop
          >
            {{ artist.name }}
          </NuxtLink>
          <span v-if="index < track.artists.length - 1">, </span>
        </span>
      </p>
      <p>
        <NuxtLink 
          :to="`/albums/${track.album ? track.album.id : albumId}`"
          class="album-link"
          @click.stop
        >
          {{ track.album ? track.album.name : albumName}}
        </NuxtLink>
      </p>
    </div>
    <button 
      v-if="isHovered" 
      @click.stop="$emit('delete-track', track)" 
      class="delete-track-btn"
      title="Remove from playlist"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
  imageUrl: null,
  albumId: null,
  albumName: null,
});

const isHovered = ref(false)

const audioStore = useAudioStore()
const router = useRouter()

const isPlaying = computed(() => {
  return audioStore.isPlaying && audioStore.currentTrack?.id === props.track.id
})

const handlePlayClick = (event) => {
  event.stopPropagation()
  if (isPlaying.value) {
    audioStore.pauseTrack()
  } else {
    audioStore.playTrack(props.track)
  }
}

const navigateToTrack = () => {
  router.push(`/tracks/${props.track.id}`)
}

</script>

<style scoped>
.track-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
  max-width: 200px;
  position: relative;
  overflow: hidden;
}

.track-card:hover {
  transform: scale(1.05);
}

.track-image-container {
  position: relative;
  width: 100%;
}

.track-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(29, 185, 84, 0.9);
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.track-image-container:hover .play-button {
  opacity: 1;
}

.play-button.playing {
  opacity: 1;
  background-color: #1DB954;
  box-shadow: 0 2px 8px rgba(29, 185, 84, 0.4);
}

.track-info {
  text-align: center;
  margin-top: 10px;
}

.track-info h3 {
  margin: 0;
  font-size: 18px;
}

.track-info p {
  margin: 0;
  color: #666;
}

.track-card.playing {
  border-color: #1DB954;
  background: linear-gradient(to right, rgba(29, 185, 84, 0.1), transparent);
  box-shadow: 0 2px 8px rgba(29, 185, 84, 0.2);
}

.track-card.playing::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #1DB954;
}

.track-card.playing .track-info h3 {
  color: #1DB954;
}

.artist-link,
.album-link {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.artist-link:hover,
.album-link:hover {
  color: #1DB954;
}
.delete-track-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.delete-track-btn:hover {
  background-color: #ff4444;
  color: white;
  transform: scale(1.1);
}
</style>
