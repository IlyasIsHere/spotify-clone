<template>
    <div>
      <div class="content">
        <h1>Your Playlists</h1>
        <div class="playlists">
          <PlaylistCard
            v-for="playlist in userPlaylists"
            :key="playlist.id"
            :playlist="playlist"
            @select="goToPlaylist"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
//   import { ref, onMounted } from 'vue';
//   import { useRouter, useStore } from 'vuex';
//   import PlaylistCard from '~/components/PlaylistCard.vue';
  
  const userPlaylists = ref([]);
  const store = useStore();
  const router = useRouter();
  
  const fetchUserPlaylists = async () => {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    });
    const data = await response.json();
    userPlaylists.value = data.items;
  };
  
  const goToPlaylist = (playlist) => {
    router.push(`/playlist/${playlist.id}`);
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