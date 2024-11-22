<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="query"
        @input="onSearch"
        placeholder="Search for artists, albums, playlists, or tracks"
      />
      <div class="search-results" v-if="results.length">
        <div
          v-for="result in results"
          :key="result.id"
          class="result-card"
          @click="selectResult(result)"
        >
          <img :src="result.image" alt="result.name" />
          <div class="result-info">
            <h3>{{ result.name }}</h3>
            <p>{{ result.type }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBar',
    data() {
      return {
        query: '',
        results: []
      };
    },
    methods: {
      async onSearch() {
        if (this.query.length > 2) {
          const response = await fetch(`https://api.spotify.com/v1/search?q=${this.query}&type=artist,album,playlist,track`, {
            headers: {
              Authorization: `Bearer ${this.$store.state.accessToken}`
            }
          });
          const data = await response.json();
          this.results = [
            ...data.artists.items.map(item => ({ ...item, type: 'Artist' })),
            ...data.albums.items.map(item => ({ ...item, type: 'Album' })),
            ...data.playlists.items.map(item => ({ ...item, type: 'Playlist' })),
            ...data.tracks.items.map(item => ({ ...item, type: 'Track' }))
          ];
        } else {
          this.results = [];
        }
      },
      selectResult(result) {
        this.$emit('select', result);
      }
    }
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
  
  input {
    width: 100%;
    max-width: 600px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-results {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  
  .result-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .result-card:hover {
    transform: scale(1.05);
  }
  
  .result-card img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .result-info {
    text-align: center;
    margin-top: 10px;
  }
  
  .result-info h3 {
    margin: 0;
    font-size: 18px;
  }
  
  .result-info p {
    margin: 0;
    color: #666;
  }
  </style>