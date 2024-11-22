<template>
    <div>
      <NavigationBar />
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
  
  <script>
  import NavigationBar from '~/components/NavigationBar.vue';
  import PlaylistCard from '~/components/PlaylistCard.vue';
  
  export default {
    components: {
      NavigationBar,
      PlaylistCard
    },
    data() {
      return {
        userPlaylists: []
      };
    },
    async mounted() {
      await this.fetchUserPlaylists();
    },
    methods: {
      async fetchUserPlaylists() {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        });
        const data = await response.json();
        this.userPlaylists = data.items;
      },
      goToPlaylist(playlist) {
        this.$router.push(`/playlist/${playlist.id}`);
      }
    }
  };
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