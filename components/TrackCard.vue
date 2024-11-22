<template>
  <div class="track-card" @click="selectTrack">
    <img
      :src="track.album.images[0]?.url"
      :alt="track.name"
      class="track-image"
    />
    <div class="track-info">
      <h3>{{ track.name }}</h3>
      <p>{{ artistNames }}</p>
      <p>{{ track.album.name }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['select']);

const selectTrack = () => {
  emit('select', props.track);
};

const artistNames = computed(() =>
  props.track.artists.map((artist) => artist.name).join(', ')
);
</script>

<style scoped>
.track-card {
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
</style>
