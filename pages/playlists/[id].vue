<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row items-start md:items-center mb-8">
        <img :src="playlist?.images[0]?.url" :alt="playlist?.name" class="w-48 h-48 object-cover rounded-lg shadow-lg mb-4 md:mb-0 md:mr-8" />
        <div class="flex-1">
          <h1 class="text-4xl font-bold mb-2">{{ playlist?.name }}</h1>
          <p class="text-gray-400 mb-2">{{ playlist?.description }}</p>
          <p class="text-gray-400 mb-4">By {{ playlist?.owner?.display_name }}</p>
          <div class="flex space-x-4">
            <button @click="handlePlayPause" class="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full transition duration-300">
              {{ isPlaying ? 'Pause' : 'Play' }}
            </button>
            <button @click="handleDelete" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
              Delete
            </button>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Add Tracks</h2>
        <TrackSearch @add-track="addTrackToPlaylist" />
      </div>
      
      <div>
        <h2 class="text-2xl font-bold mb-4">Tracks</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <TrackCard
            v-for="track in playlist?.tracks?.items"
            :key="track.track.id"
            :track="track.track"
            @delete-track="deleteTrackFromPlaylist"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const authStore = useAuthStore()
const audioStore = useAudioStore()

const playlist = ref(null)
const isPlaying = computed(() => 
  audioStore.isPlaying && audioStore.currentPlaylist?.id === playlist.value?.id
)

const fetchPlaylist = async () => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    playlist.value = await response.json()
  } catch (error) {
    console.error('Error fetching playlist:', error)
  }
}

const handlePlayPause = () => {
  if (isPlaying.value) {
    audioStore.pauseTrack()
  } else {
    audioStore.playPlaylist(playlist.value)
  }
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this playlist?')) return

  try {
    await fetch(`https://api.spotify.com/v1/playlists/${route.params.id}/followers`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    navigateTo('/playlists')
  } catch (error) {
    console.error('Error deleting playlist:', error)
  }
}

const addTrackToPlaylist = async (track) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${route.params.id}/tracks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: [`spotify:track:${track.id}`]
        })
      }
    )

    if (response.ok) {
      await fetchPlaylist()
      alert('Track added successfully!')
    } else {
      throw new Error('Failed to add track')
    }
  } catch (error) {
    console.error('Error adding track:', error)
    alert('Failed to add track to playlist')
  }
}

const deleteTrackFromPlaylist = async (track) => {
  if (!confirm('Are you sure you want to remove this track from the playlist?')) return

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${route.params.id}/tracks`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tracks: [{ uri: `spotify:track:${track.id}` }]
        })
      }
    )

    if (response.ok) {
      await fetchPlaylist()
      alert('Track removed successfully!')
    } else {
      throw new Error('Failed to remove track')
    }
  } catch (error) {
    console.error('Error removing track:', error)
    alert('Failed to remove track from playlist')
  }
}

onMounted(() => {
  fetchPlaylist()
})

onUnmounted(() => {
  audioStore.$reset()
})

</script>