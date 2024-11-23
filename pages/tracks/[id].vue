<template>
  <div>
    <div class="content">
      <div class="track-header">
        <TrackCard :track="track" v-if="track" />
      </div>
      
      <section class="track-details" v-if="track">
        <h2>Track Details</h2>
        <div class="details-grid">
          <div class="detail-item">
            <h3>Duration</h3>
            <p>{{ formatDuration(track.duration_ms) }}</p>
          </div>
          <div class="detail-item">
            <h3>Album</h3>
            <p>{{ track.album.name }}</p>
          </div>
          <div class="detail-item">
            <h3>Release Date</h3>
            <p>{{ track.album.release_date }}</p>
          </div>
          <div class="detail-item">
            <h3>Popularity</h3>
            <p>{{ track.popularity }}/100</p>
          </div>
        </div>
      </section>

      <section class="album-tracks" v-if="albumTracks.length">
        <h2>More from {{ track?.album.name }}</h2>
        <div class="track-list">
          <TrackCard
            v-for="albumTrack in albumTracks"
            :key="albumTrack.id"
            :track="albumTrack"
            :imageUrl="track.album.images[0]?.url"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const authStore = useAuthStore()

// State
const track = ref(null)
const albumTracks = ref([])

// Methods
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return `${minutes}:${seconds.padStart(2, '0')}`
}

// Fetch track data
const fetchTrack = async () => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    track.value = await response.json()

    // After getting track, fetch album tracks
    if (track.value?.album?.id) {
      const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${track.value.album.id}/tracks`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      })
      const data = await albumResponse.json()
      // Filter out the current track and limit to 5 tracks
      albumTracks.value = data.items
        .filter(t => t.id !== track.value.id)
        .slice(0, 5)
    }
  } catch (error) {
    console.error('Error fetching track:', error)
  }
}

// Fetch data on mount
onMounted(() => {
  fetchTrack()
})

// Define page meta
definePageMeta({
  middleware: 'auth'
})
</script>

<style scoped>
.content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.track-header {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.track-details {
  margin-bottom: 40px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.detail-item {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
}

.detail-item h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #666;
}

.detail-item p {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.track-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.album-tracks {
  margin-top: 40px;
}
</style> 