<template>
    <div>
      <NavigationBar />
      <div class="content">
        <div class="album-header">
          <img :src="album.images[0]?.url" alt="album.name" class="album-image" />
          <div class="album-info">
            <h1>{{ album.name }}</h1>
            <p>By {{ album.artists.map(artist => artist.name).join(', ') }}</p>
            <p>Released on {{ album.release_date }}</p>
          </div>
        </div>
        <section class="tracks">
          <h2>Tracks</h2>
          <div class="track-list">
            <TrackCard
              v-for="track in album.tracks.items"
              :key="track.id"
              :track="track"
            />
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
//   import NavigationBar from '~/components/NavigationBar.vue';
//   import TrackCard from '~/components/TrackCard.vue';
  
  export default {
    components: {
      NavigationBar,
      TrackCard
    },
    data() {
      return {
        album: null
      };
    },
    async asyncData({ params, $store }) {
      const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${params.id}`, {
        headers: {
          Authorization: `Bearer ${$store.state.accessToken}`
        }
      });
      const album = await albumResponse.json();
      return { album };
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
  
  .album-header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }
  
  .album-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 20px;
  }
  
  .album-info {
    text-align: left;
  }
  
  .album-info h1 {
    margin: 0;
    font-size: 24px;
  }
  
  .album-info p {
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