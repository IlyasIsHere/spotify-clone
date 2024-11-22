<template>
  <div class="music-player">
    <div class="track-info" v-if="currentTrack">
      <img
        :src="currentTrack.album.images[0]?.url"
        :alt="currentTrack.name"
        class="track-image"
      />
      <div class="track-details">
        <h3>{{ currentTrack.name }}</h3>
        <p>{{ artistNames }}</p>
        <p>{{ currentTrack.album.name }}</p>
      </div>
    </div>
    <div class="controls">
      <button @click="prevTrack">Prev</button>
      <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
      <button @click="nextTrack">Next</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentTrack: {
    type: Object,
    required: true,
  },
  isPlaying: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['toggle-play', 'prev-track', 'next-track']);

const togglePlay = () => {
  emit('toggle-play');
};

const prevTrack = () => {
  emit('prev-track');
};

const nextTrack = () => {
  emit('next-track');
};

const artistNames = computed(() =>
  props.currentTrack.artists.map((artist) => artist.name).join(', ')
);
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
</style>
