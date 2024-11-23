<template>
  <div>
    <div class="content">
      <div class="artist-header">
        <img :src="artist?.images[0]?.url" :alt="artist?.name" class="artist-image" />
        <div class="artist-info">
          <h1>{{ artist?.name }}</h1>
          <p>{{ artist?.followers?.total }} followers</p>
        </div>
      </div>
      <section class="top-tracks">
        <h2>Top Tracks</h2>
        <div class="tracks">
          <TrackCard
            v-for="track in topTracks"
            :key="track.id"
            :track="track"
            :imageUrl = "track.album.images[0]?.url"
          />
        </div>
      </section>
      <section class="albums">
        <h2>Albums</h2>
        <div class="results">
          <NuxtLink
            v-for="album in albums"
            :key="album.id"
            :to="`/albums/${album.id}`"
            class="result-card"
          >
            <img :src="album.images[0]?.url" :alt="album.name" class="result-image" />
            <div class="result-info">
              <h3>{{ album.name }}</h3>
              <p>{{ album.release_date }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const authStore = useAuthStore()

// State
const artist = ref(null)
const topTracks = ref([])
const albums = ref([])

// Fetch artist data
const fetchArtistData = async () => {
  try {
    const [artistResponse, topTracksResponse, albumsResponse] = await Promise.all([
      fetch(`https://api.spotify.com/v1/artists/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }),
      fetch(`https://api.spotify.com/v1/artists/${route.params.id}/top-tracks?market=US`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }),
      fetch(`https://api.spotify.com/v1/artists/${route.params.id}/albums`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      })
    ])

    const [artistData, topTracksData, albumsData] = await Promise.all([
      artistResponse.json(),
      topTracksResponse.json(),
      albumsResponse.json()
    ])

    artist.value = artistData
    topTracks.value = topTracksData.tracks
    albums.value = albumsData.items
  } catch (error) {
    console.error('Error fetching artist data:', error)
  }
}

// Fetch data on mount
onMounted(() => {
  fetchArtistData()
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

.artist-header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.artist-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.artist-info {
  text-align: left;
}

.artist-info h1 {
  margin: 0;
  font-size: 24px;
}

.artist-info p {
  margin: 0;
  color: #666;
}

.top-tracks, .albums {
  margin-bottom: 40px;
}

.tracks, .results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.result-card {
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

.result-card:hover {
  transform: scale(1.05);
}

.result-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.result-info {
  text-align: center;
  margin-top: 10px;
}

.result-info h3 {
  margin: 0;
  font-size: 18px;
}

.result-info p {
  margin: 0;
  color: #666;
}
</style>