<template>
    <div>
      <NavigationBar />
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
  
  <script>
  import NavigationBar from '~/components/NavigationBar.vue';
  import PlaylistCard from '~/components/PlaylistCard.vue';
  import TrackCard from '~/components/TrackCard.vue';
  
  export default {
    components: {
      NavigationBar,
      PlaylistCard,
      TrackCard
    },
    data() {
      return {
        recommendedPlaylists: [],
        recommendedTracks: []
      };
    },
    async mounted() {
      await this.fetchRecommendedPlaylists();
      await this.fetchRecommendedTracks();
    },
    methods: {
      async fetchRecommendedPlaylists() {
        const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        });
        const data = await response.json();
        this.recommendedPlaylists = data.playlists.items;
      },
      async fetchRecommendedTracks() {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        });
        const data = await response.json();
        this.recommendedTracks = data.items;
      },
      goToPlaylist(playlist) {
        this.$router.push(`/playlist/${playlist.id}`);
      },
      playTrack(track) {
        this.$store.commit('setCurrentTrack', track);
        this.$store.commit('setIsPlaying', true);
      }
    }
  };
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