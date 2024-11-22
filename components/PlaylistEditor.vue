<template>
  <div class="playlist-editor">
    <h2>{{ isEditing ? 'Edit Playlist' : 'Create Playlist' }}</h2>
    <input
      type="text"
      v-model="playlistName"
      placeholder="Playlist Name"
    />
    <textarea
      v-model="playlistDescription"
      placeholder="Playlist Description"
    ></textarea>
    <div class="track-list">
      <div
        v-for="track in tracks"
        :key="track.id"
        class="track-item"
      >
        <img :src="track.album.images[0]?.url" alt="track.name" class="track-image" />
        <div class="track-info">
          <h3>{{ track.name }}</h3>
          <p>{{ track.artists.map(artist => artist.name).join(', ') }}</p>
        </div>
        <button @click="removeTrack(track.id)">Remove</button>
      </div>
    </div>
    <button @click="savePlaylist">{{ isEditing ? 'Save Changes' : 'Create Playlist' }}</button>
  </div>
</template>

<script>
export default {
  name: 'PlaylistEditor',
  props: {
    playlist: {
      type: Object,
      default: () => ({
        name: '',
        description: '',
        tracks: []
      })
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      playlistName: this.playlist.name,
      playlistDescription: this.playlist.description,
      tracks: this.playlist.tracks
    };
  },
  methods: {
    removeTrack(trackId) {
      this.tracks = this.tracks.filter(track => track.id !== trackId);
    },
    savePlaylist() {
      const updatedPlaylist = {
        name: this.playlistName,
        description: this.playlistDescription,
        tracks: this.tracks
      };
      this.$emit('save', updatedPlaylist);
    }
  }
};
</script>

<style scoped>
.playlist-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input, textarea {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.track-list {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.track-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.track-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
}

.track-info {
  flex-grow: 1;
}

.track-info h3 {
  margin: 0;
  font-size: 16px;
}

.track-info p {
  margin: 0;
  color: #666;
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