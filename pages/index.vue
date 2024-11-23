<template>
    <div>
      <div class="content">
        <section class="recommended-playlists">
          <h2>Recommended Playlists</h2>
          <div class="playlists">
            <NuxtLink 
              v-for="playlist in recommendedPlaylists"
              :key="playlist.id" 
              :to="`/playlists/${playlist.id}`"
            >
              <PlaylistCard
                :playlist="playlist"
              />
            </NuxtLink>
          </div>
        </section>
        <section class="recommended-tracks">
          <h2>Recommended Tracks</h2>
          <div class="tracks">
            <TrackCard
              v-for="track in recommendedTracks"
              :key="track.id"
              :track="track"
              :imageUrl = "track.album.images[0]?.url"
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
  
  const fetchRecommendedPlaylists = async () => {
    const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });
    const data = await response.json();
    
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