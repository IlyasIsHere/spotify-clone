<template>
  <div class="track-card" @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <img :src="track.album.images[0].url" :alt="track.name" class="track-image" />
    <div class="track-info">
      <h3>{{ track.name }}</h3>
      <p>{{ track.artists[0].name }}</p>
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
const props = defineProps(['track'])
const isHovered = ref(false)
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
}

.track-card:hover {
  transform: scale(1.05);
}

.track-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
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
