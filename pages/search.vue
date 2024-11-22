<template>
    <div>
      <div class="content">
        <SearchBar @select="handleSelect" />
        <div v-if="searchResults.length" class="search-results">
          <section v-if="artists.length">
            <h2>Artists</h2>
            <div class="results">
              <div
                v-for="artist in artists"
                :key="artist.id"
                class="result-card"
                @click="goToArtist(artist)"
              >
                <img :src="artist.images[0]?.url" alt="artist.name" class="result-image" />
                <div class="result-info">
                  <h3>{{ artist.name }}</h3>
                </div>
              </div>
            </div>
          </section>
          <section v-if="albums.length">
            <h2>Albums</h2>
            <div class="results">
              <div
                v-for="album in albums"
                :key="album.id"
                class="result-card"
                @click="goToAlbum(album)"
              >
                <img :src="album.images[0]?.url" alt="album.name" class="result-image" />
                <div class="result-info">
                  <h3>{{ album.name }}</h3>
                  <p>{{ album.artists.map(artist => artist.name).join(', ') }}</p>
                </div>
              </div>
            </div>
          </section>
          <section v-if="playlists.length">
            <h2>Playlists</h2>
            <div class="results">
              <PlaylistCard
                v-for="playlist in playlists"
                :key="playlist.id"
                :playlist="playlist"
                @select="goToPlaylist"
              />
            </div>
          </section>
          <section v-if="tracks.length">
            <h2>Tracks</h2>
            <div class="results">
              <TrackCard
                v-for="track in tracks"
                :key="track.id"
                :track="track"
                @select="playTrack"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
//   import { ref } from 'vue';
//   import { useRouter, useStore } from 'vuex';
//   import SearchBar from '~/components/SearchBar.vue';
//   import PlaylistCard from '~/components/PlaylistCard.vue';
//   import TrackCard from '~/components/TrackCard.vue';
  
  const searchResults = ref([]);
  const artists = ref([]);
  const albums = ref([]);
  const playlists = ref([]);
  const tracks = ref([]);
  const auth = useAuth();
  const router = useRouter();
  
  const handleSelect = (result) => {
    searchResults.value = result;
    artists.value = result.filter(item => item.type === 'artist');
    albums.value = result.filter(item => item.type === 'album');
    playlists.value = result.filter(item => item.type === 'playlist');
    tracks.value = result.filter(item => item.type === 'track');
  };
  
  const goToArtist = (artist) => {
    router.push(`/artist/${artist.id}`);
  };
  
  const goToAlbum = (album) => {
    router.push(`/album/${album.id}`);
  };
  
  const goToPlaylist = (playlist) => {
    router.push(`/playlist/${playlist.id}`);
  };
  
  const playTrack = (track) => {
    store.commit('setCurrentTrack', track);
    store.commit('setIsPlaying', true);
  };
  </script>
  
  <style scoped>
  .content {
    padding: 20px;
  }
  
  .search-results {
    margin-top: 20px;
  }
  
  section {
    margin-bottom: 40px;
  }
  
  .results {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
    max-width: 200px;
  }
  
  .result-card:hover {
    transform: scale(1.05);
  }
  
  .result-image {
    width: 100%;
    height: auto;
    border-radius: 4px;
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