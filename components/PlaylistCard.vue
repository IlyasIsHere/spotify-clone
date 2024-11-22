<template>
  <div class="playlist-card" @click="selectPlaylist">
    <img :src="playlist.images[0]?.url" alt="playlist.name" class="playlist-image" />
    <div class="playlist-info">
      <h3>{{ playlist.name }}</h3>
      <p>{{ playlist.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaylistCard',
  props: {
    playlist: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectPlaylist() {
      this.$emit('select', this.playlist);
    }
  }
};
</script>

<style scoped>
.playlist-card {
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

.playlist-card:hover {
  transform: scale(1.05);
}

.playlist-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.playlist-info {
  text-align: center;
  margin-top: 10px;
}

.playlist-info h3 {
  margin: 0;
  font-size: 18px;
}

.playlist-info p {
  margin: 0;
  color: #666;
}
</style>