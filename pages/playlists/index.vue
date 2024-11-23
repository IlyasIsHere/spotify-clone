<template>
  <div>
    <div class="content">
      <div class="header">
        <h1>Your Playlists</h1>
        <button @click="showCreateModal = true" class="create-btn">
          Create Playlist
        </button>
      </div>
      <div class="playlists">
        <NuxtLink 
          v-for="playlist in userPlaylists"
          :key="playlist.id"
          :to="`/playlists/${playlist.id}`"
        >
          <PlaylistCard
            :playlist="playlist"
          />
        </NuxtLink>
      </div>

      <!-- Create Playlist Modal -->
      <div v-if="showCreateModal" class="modal-overlay">
        <div class="modal">
          <h2>Create New Playlist</h2>
          <form @submit.prevent="createPlaylist">
            <div class="form-group">
              <label for="name">Playlist Name</label>
              <input
                v-model="newPlaylist.name"
                type="text"
                id="name"
                required
                placeholder="My Awesome Playlist"
              >
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                v-model="newPlaylist.description"
                id="description"
                placeholder="Add an optional description"
              ></textarea>
            </div>
            <div class="form-actions">
              <button type="button" @click="showCreateModal = false" class="cancel-btn">
                Cancel
              </button>
              <button type="submit" class="submit-btn">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const userPlaylists = ref([])
const authStore = useAuthStore()
const router = useRouter()

// New refs for create playlist
const showCreateModal = ref(false)
const newPlaylist = ref({
  name: '',
  description: ''
})

const fetchUserPlaylists = async () => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    const data = await response.json()
    userPlaylists.value = data.items
  } catch (error) {
    console.error('Error fetching playlists:', error)
  }
}

const createPlaylist = async () => {
  try {
    // First get the user's ID
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    const userData = await userResponse.json()

    // Create the playlist
    const response = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newPlaylist.value.name,
        description: newPlaylist.value.description,
        public: true
      })
    })

    if (response.ok) {
      const playlist = await response.json()
      // Refresh the playlists list
      await fetchUserPlaylists()
      // Reset form and close modal
      newPlaylist.value = { name: '', description: '' }
      showCreateModal.value = false
      // Navigate to the new playlist
      navigateTo(`/playlists/${playlist.id}`)
    } else {
      throw new Error('Failed to create playlist')
    }
  } catch (error) {
    console.error('Error creating playlist:', error)
    alert('Failed to create playlist')
  }
}

onMounted(() => {
  fetchUserPlaylists()
})
</script>

<style scoped>
.content {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 20px;
}

h1 {
  margin: 0;
}

.create-btn {
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #1db954;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-btn:hover {
  background-color: #1ed760;
}

.playlists {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal h2 {
  margin: 0 0 20px 0;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #f5f5f5;
}

.submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background: #1db954;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background: #1ed760;
}
</style>