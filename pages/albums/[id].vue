<template>
  <div>
    <div class="content">
      <div class="album-header">
        <img :src="album?.images[0]?.url" :alt="album?.name" class="album-image" />
        <div class="album-info">
          <h1>{{ album?.name }}</h1>
          <p>By {{ album?.artists?.map(artist => artist.name).join(', ') }}</p>
          <p>Released on {{ album?.release_date }}</p>
        </div>
      </div>
      <section class="tracks">
        <h2>Tracks</h2>
        <div class="track-list">
          <TrackCard
            v-for="track in album?.tracks?.items"
            :key="track.id"
            :track="track"
            :imageUrl="album?.images[0]?.url"
            :albumId="album.id"
            :albumName="album.name"
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
const album = ref(null)

// Fetch album data
const fetchAlbum = async () => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/albums/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    album.value = await response.json()
  } catch (error) {
    console.error('Error fetching album:', error)
  }
}

// Fetch data on mount
onMounted(() => {
  fetchAlbum()
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