<template>
  <div class="playlist-card" @click="handleClick" role="button" tabindex="0">
    <div class="playlist-image-container">
      <img
        :src="playlistImage"
        :alt="`Cover art for playlist: ${playlist.name}`"
        class="playlist-image"
        @error="handleImageError"
      />
      <button 
        class="play-button"
        @click.stop="handlePlayPause"
      >
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
    </div>
    <div class="playlist-info">
      <h3 class="playlist-title">{{ truncateText(playlist.name, 25) }}</h3>
      <p v-if="playlist.description" class="playlist-description">
        {{ truncateText(playlist.description, 50) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  playlist: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.name && typeof value.name === 'string';
    }
  },
});

const router = useRouter();
const audioStore = useAudioStore();


// Computed properties
const playlistImage = computed(() => {
  return props.playlist.images?.[0]?.url;
});

const isPlaying = computed(() => {
  return audioStore.isPlaying && audioStore.currentPlaylist?.id === props.playlist.id;
});

// Methods
const handleImageError = (event) => {
  event.target.src = '';
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength 
    ? `${text.substring(0, maxLength)}...` 
    : text;
};

const handleClick = () => {
  router.push(`/playlists/${props.playlist.id}`);
};

const handlePlayPause = () => {
  if (isPlaying.value) {
    audioStore.pauseTrack();
  } else {
    audioStore.playPlaylist(props.playlist);
  }
};
</script>

<style scoped>
.playlist-card {
  display: flex;
  flex-direction: column;
  width: 200px;
  min-height: 280px;
  margin: 16px;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.playlist-card:hover,
.playlist-card:focus {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.playlist-card:focus {
  outline: 2px solid #1DB954;
  outline-offset: 2px;
}

.playlist-image-container {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 4px;
  background-color: #f0f0f0;
  position: relative;
}

.playlist-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.playlist-info {
  margin-top: 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.playlist-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #181818;
  line-height: 1.2;
}

.playlist-description {
  margin: 0;
  font-size: 14px;
  color: #6c6c6c;
  line-height: 1.4;
  overflow-wrap: break-word;
}

/* Ensure consistent spacing on different screen sizes */
@media (max-width: 768px) {
  .playlist-card {
    width: 160px;
    min-height: 240px;
    margin: 12px;
    padding: 12px;
  }

  .playlist-title {
    font-size: 14px;
  }

  .playlist-description {
    font-size: 12px;
  }
}

.play-button {
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 8px 16px;
  background-color: #1DB954;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.playlist-card:hover .play-button {
  opacity: 1;
}
</style>
