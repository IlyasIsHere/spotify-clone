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
  
  const recommendedPlaylists = ref([]);
  const recommendedTracks = ref([]);
  const authStore = useAuthStore()
  const router = useRouter();
  
  const fetchRecommendedPlaylists = async () => {
    const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });
    const data = await response.json();
    console.log(authStore);
    
    recommendedPlaylists.value = data.playlists.items;
  };
  
  const fetchRecommendedTracks = async () => {
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
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