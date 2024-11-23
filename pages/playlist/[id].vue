<template>
  <div>
    <div class="content">
      <div class="playlist-header">
        <img :src="playlist?.images[0]?.url" :alt="playlist?.name" class="playlist-image" />
        <div class="playlist-info">
          <h1>{{ playlist?.name }}</h1>
          <p>{{ playlist?.description }}</p>
          <p>By {{ playlist?.owner?.display_name }}</p>
          <div class="playlist-controls">
            <button @click="handlePlayPause" class="control-btn">
              {{ isPlaying ? 'Pause' : 'Play' }}
            </button>
            <button @click="handleDelete" class="control-btn delete-btn">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div class="add-tracks-section">
        <h2>Add Tracks</h2>
        <TrackSearch @add-track="addTrackToPlaylist" />
      </div>
      <section class="tracks">
        <h2>Tracks</h2>
        <div class="track-list">
          <TrackCard
            v-for="track in playlist?.tracks?.items"
            :key="track.track.id"
            :track="track.track"
            @delete-track="deleteTrackFromPlaylist"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Nuxt-specific imports
const route = useRoute()
const authStore = useAuthStore()
const audioStore = useAudioStore()

// State
const playlist = ref(null)
const isPlaying = ref(false)
const currentTrackIndex = ref(0)

// Fetch playlist data
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

// Play track handler
const playTrack = (track) => {
  audioStore.playTrack(track)
}

// Modify existing functions and add new ones
const handlePlayPause = () => {
  if (isPlaying.value) {
    audioStore.pause()
  } else {
    playPlaylist()
  }
  isPlaying.value = !isPlaying.value
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
    // Navigate back after successful deletion
    navigateTo('/playlists')
  } catch (error) {
    console.error('Error deleting playlist:', error)
  }
}

// New function to play the playlist
const playPlaylist = () => {
  const tracks = playlist.value?.tracks?.items
  if (!tracks?.length) return
  
  // Start playing from current track index
  const currentTrack = tracks[currentTrackIndex.value]?.track
  if (currentTrack) {
    audioStore.playTrack(currentTrack)
    
    // Listen for track end and play next
    audioStore.$subscribe((mutation, state) => {
      if (state.isEnded) {
        playNextTrack()
      }
    })
  }
}

// Function to play next track
const playNextTrack = () => {
  const tracks = playlist.value?.tracks?.items
  if (!tracks?.length) return

  // Increment track index, loop back to start if at end
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.length
  
  // Play the next track
  const nextTrack = tracks[currentTrackIndex.value]?.track
  if (nextTrack) {
    audioStore.playTrack(nextTrack)
  }
}

// Watch audio store state to update local playing state
watch(() => audioStore.isPlaying, (newValue) => {
  isPlaying.value = newValue
})

// Clean up subscription when component unmounts
onUnmounted(() => {
  audioStore.$reset()
})

// Fetch data on mount
onMounted(() => {
  fetchPlaylist()
})

// Define page meta
definePageMeta({
  middleware: 'auth'
})

// Add track to playlist function
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
      // Refresh playlist data to show new track
      await fetchPlaylist()
      // Show success message (you can implement your own notification system)
      alert('Track added successfully!')
    } else {
      throw new Error('Failed to add track')
    }
  } catch (error) {
    console.error('Error adding track:', error)
    alert('Failed to add track to playlist')
  }
}

// Add delete track function
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
      // Refresh playlist data to update the track list
      await fetchPlaylist()
      // Show success message
      alert('Track removed successfully!')
    } else {
      throw new Error('Failed to remove track')
    }
  } catch (error) {
    console.error('Error removing track:', error)
    alert('Failed to remove track from playlist')
  }
}
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

.playlist-controls {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.control-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: #1db954;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.control-btn:hover {
  background-color: #1ed760;
}

.delete-btn {
  background-color: #ff4444;
}

.delete-btn:hover {
  background-color: #ff6666;
}

.add-tracks-section {
  margin: 40px auto;
  padding: 0 20px;
  max-width: 1200px;
}

.add-tracks-section h2 {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  padding-left: 20px;
}
</style>