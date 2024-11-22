<template>
  <div>
    <div class="content">
      <div class="playlist-header">
        <img :src="playlist?.images[0]?.url" :alt="playlist?.name" class="playlist-image" />
        <div class="playlist-info">
          <h1>{{ playlist?.name }}</h1>
          <p>{{ playlist?.description }}</p>
          <p>By {{ playlist?.owner?.display_name }}</p>
        </div>
      </div>
      <section class="tracks">
        <h2>Tracks</h2>
        <div class="track-list">
          <TrackCard
            v-for="track in playlist?.tracks?.items"
            :key="track.track.id"
            :track="track.track"
            @select="playTrack"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Nuxt-specific imports
const route = useRoute()
const auth = useAuth()

// State
const playlist = ref(null)
const playerStore = usePlayerStore()

// Fetch playlist data
const fetchPlaylist = async () => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${auth.token.value}`
      }
    })
    playlist.value = await response.json()
  } catch (error) {
    console.error('Error fetching playlist:', error)
  }
}

// Play track handler
const playTrack = (track) => {
  playerStore.setCurrentTrack(track)
  playerStore.setIsPlaying(true)
}

// Fetch data on mount
onMounted(() => {
  fetchPlaylist()
})

// Define page meta
definePageMeta({
  middleware: 'auth'
})
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