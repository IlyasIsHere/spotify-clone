<template>
    <div>
      <div class="content">
        <button class="create-playlist-btn" @click="showCreateModal = true">
          Create New Playlist
        </button>

        <div v-if="showCreateModal" class="modal">
          <div class="modal-content">
            <h3>Create New Playlist</h3>
            <input
              v-model="newPlaylist.name"
              placeholder="Playlist name"
              type="text"
            />
            <textarea
              v-model="newPlaylist.description"
              placeholder="Playlist description (optional)"
            ></textarea>
            <div class="modal-actions">
              <button @click="createPlaylist">Create</button>
              <button @click="showCreateModal = false">Cancel</button>
            </div>
          </div>
        </div>

        <section class="your-playlists">
          <h2>Your Playlists</h2>
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
        </section>

        <section class="recommended-playlists">
          <h2>Recommended Playlists</h2>
          <div class="playlists">
            <NuxtLink
              v-for="playlist in recommendedPlaylists"
              :key="playlist.id"
              :to="`/playlists/${playlist.id}`"
            >
              <PlaylistCard
                :playlist="playlist"
              />
            </NuxtLink>
          </div>
        </section>
        <section class="recommended-tracks">
          <h2>Recommended Tracks</h2>
          <div class="tracks">
            <TrackCard
              v-for="track in recommendedTracks"
              :key="track.id"
              :track="track"
            />
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  
  const recommendedPlaylists = ref([]);
  const recommendedTracks = ref([]);
  const authStore = useAuthStore()

  const showCreateModal = ref(false);
  const newPlaylist = ref({
    name: '',
    description: ''
  });
  const userPlaylists = ref([]);
  const fetchRecommendedPlaylists = async () => {
    const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });
    const data = await response.json();
    
    recommendedPlaylists.value = data.playlists.items;
  };
  
  const fetchRecommendedTracks = async () => {
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });
    const data = await response.json();
    recommendedTracks.value = data.items;
  };
  
  const fetchUserPlaylists = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      });
      const data = await response.json();
      userPlaylists.value = data.items;
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  };

  const createPlaylist = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${authStore.user.id}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newPlaylist.value.name,
          description: newPlaylist.value.description,
          public: true
        })
      });

      const data = await response.json();

      if (response.ok) {
        await Promise.all([
          fetchRecommendedPlaylists(),
          fetchUserPlaylists()
        ]);
        showCreateModal.value = false;
        newPlaylist.value = { name: '', description: '' };
      } else {
        console.error('Failed to create playlist:', data);
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };
  
  onMounted(() => {
    Promise.all([
      fetchRecommendedPlaylists(),
      fetchRecommendedTracks(),
      fetchUserPlaylists()
    ]);
  });
  </script>
  
  <style scoped>
  .content {
    padding: 20px;
  }
  
  section {
    margin-bottom: 40px;
  }
  
  .playlists, .tracks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .create-playlist-btn {
    display: block;
    margin: 0 auto 20px;
    padding: 10px 20px;
    background-color: #1DB954;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
  }

  .modal-content input,
  .modal-content textarea {
    width: 100%;
    margin: 10px 0;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .modal-content textarea {
    height: 100px;
    resize: vertical;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }

  .modal-actions button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .modal-actions button:first-child {
    background-color: #1DB954;
    color: white;
  }

  .modal-actions button:last-child {
    background-color: #ddd;
  }
  </style>