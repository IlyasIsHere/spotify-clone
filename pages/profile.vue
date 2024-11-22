<template>
    <div>
      <NavigationBar />
      <div class="content">
        <div class="profile-header">
          <img :src="user.images[0]?.url" alt="user.display_name" class="profile-image" />
          <div class="profile-info">
            <h2>{{ user.display_name }}</h2>
            <p>{{ user.email }}</p>
            <button @click="logout">Logout</button>
          </div>
        </div>
        <section class="top-artists">
          <h2>Your Top Artists</h2>
          <div class="artists">
            <div
              v-for="artist in topArtists"
              :key="artist.id"
              class="artist-card"
            >
              <img :src="artist.images[0]?.url" alt="artist.name" class="artist-image" />
              <div class="artist-info">
                <h3>{{ artist.name }}</h3>
              </div>
            </div>
          </div>
        </section>
        <section class="top-tracks">
          <h2>Your Top Tracks</h2>
          <div class="tracks">
            <TrackCard
              v-for="track in topTracks"
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
  import TrackCard from '~/components/TrackCard.vue';
  
  export default {
    components: {
      NavigationBar,
      TrackCard
    },
    data() {
      return {
        user: null,
        topArtists: [],
        topTracks: []
      };
    },
    async mounted() {
      await this.fetchUserProfile();
      await this.fetchTopArtists();
      await this.fetchTopTracks();
    },
    methods: {
      async fetchUserProfile() {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        });
        this.user = await response.json();
      },
      async fetchTopArtists() {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        });
        const data = await response.json();
        this.topArtists = data.items;
      },
      async fetchTopTracks() {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        });
        const data = await response.json();
        this.topTracks = data.items;
      },
      logout() {
        this.$store.commit('logout');
        this.$router.push('/');
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
  
  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .profile-info {
    text-align: left;
  }
  
  .profile-info h2 {
    margin: 0;
    font-size: 24px;
  }
  
  .profile-info p {
    margin: 0;
    color: #666;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #ddd;
  }
  
  .top-artists, .top-tracks {
    margin-bottom: 40px;
  }
  
  .artists, .tracks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .artist-card {
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
  
  .artist-card:hover {
    transform: scale(1.05);
  }
  
  .artist-image {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
  
  .artist-info {
    text-align: center;
    margin-top: 10px;
  }
  
  .artist-info h3 {
    margin: 0;
    font-size: 18px;
  }
  </style>