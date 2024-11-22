<template>
    <div>
      <div class="content">
        <section class="recommended-playlists">
          <h2>Recommended Playlists</h2>
          <div class="playlists">
            <PlaylistCard
              v-for="playlist in recommendedPlaylists"
              :key="playlist.id"
              :playlist="playlist"
              @select="goToPlaylist"
            />
          </div>
        </section>
        <section class="recommended-tracks">
          <h2>Recommended Tracks</h2>
          <div class="tracks">
            <TrackCard
              v-for="track in recommendedTracks"
              :key="track.id"
              :track="track"
              @select="playTrack"
            />
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
//   import { ref, onMounted } from 'vue';
//   import { useRouter, useStore } from 'vuex';
//   import PlaylistCard from '~/components/PlaylistCard.vue';
//   import TrackCard from '~/components/TrackCard.vue';
  
  const recommendedPlaylists = ref([]);
  const recommendedTracks = ref([]);
  const auth = useAuth()
  const router = useRouter();
  
  const fetchRecommendedPlaylists = async () => {
    const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        Authorization: `Bearer ${auth.token.value}`
      }
    });
    const data = await response.json();
    recommendedPlaylists.value = data.playlists.items;
  };
  
  const fetchRecommendedTracks = async () => {
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${auth.token.value}`
      }
    });
    const data = await response.json();
    recommendedTracks.value = data.items;
  };
  
  const goToPlaylist = (playlist) => {
    router.push(`/playlist/${playlist.id}`);
  };
  
  const playTrack = (track) => {
    store.commit('setCurrentTrack', track);
    store.commit('setIsPlaying', true);
  };
  
  onMounted(() => {
    fetchRecommendedPlaylists();
    fetchRecommendedTracks();
  });
  </script>
  
  <style scoped>
  .content {
    padding: 20px;
  }
  
  section {
    margin-bottom: 40px;
  }
  
  .playlists, .tracks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>