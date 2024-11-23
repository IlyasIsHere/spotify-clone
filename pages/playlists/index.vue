<template>
    <div>
      <div class="content">
        <h1>Your Playlists</h1>
        <div class="playlists">
          <NuxtLink
            v-for="playlist in userPlaylists" 
            :key="playlist.id"
            :to="`/playlists/${playlist.id}`"
          >
            <PlaylistCard
              :playlist="playlist"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
  const userPlaylists = ref([]);
  const authStore = useAuthStore();
  
  const fetchUserPlaylists = async () => {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });
    const data = await response.json();
    userPlaylists.value = data.items;
  };
  
  onMounted(() => {
    fetchUserPlaylists();
  });
  </script>
  
  <style scoped>
  .content {
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .playlists {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  </style>