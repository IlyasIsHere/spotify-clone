<template>
    <div>
      <NavigationBar />
      <div class="content">
        <div class="playlist-header">
          <img :src="playlist.images[0]?.url" alt="playlist.name" class="playlist-image" />
          <div class="playlist-info">
            <h1>{{ playlist.name }}</h1>
            <p>{{ playlist.description }}</p>
            <p>By {{ playlist.owner.display_name }}</p>
          </div>
        </div>
        <section class="tracks">
          <h2>Tracks</h2>
          <div class="track-list">
            <TrackCard
              v-for="track in playlist.tracks.items"
              :key="track.track.id"
              :track="track.track"
              @select="playTrack"
            />
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import NavigationBar from '~/components/NavigationBar.vue';
  import TrackCard from '~/components/TrackCard.vue';
  
  export default {
    components: {
      NavigationBar,
      TrackCard
    },
    data() {
      return {
        playlist: null
      };
    },
    async asyncData({ params, $store }) {
      const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${params.id}`, {
        headers: {
          Authorization: `Bearer ${$store.state.accessToken}`
        }
      });
      const playlist = await playlistResponse.json();
      return { playlist };
    },
    methods: {
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
  
  .playlist-header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }
  
  .playlist-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 20px;
  }
  
  .playlist-info {
    text-align: left;
  }
  
  .playlist-info h1 {
    margin: 0;
    font-size: 24px;
  }
  
  .playlist-info p {
    margin: 0;
    color: #666;
  }
  
  .tracks {
    margin-bottom: 40px;
  }
  
  .track-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  </style>