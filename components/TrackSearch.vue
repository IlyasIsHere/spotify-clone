<template>
  <div class="track-search">
    <div class="search-input">
      <div class="search-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
        </svg>
      </div>
      <input 
        v-model="searchQuery" 
        @input="handleSearch"
        placeholder="Search for tracks to add..."
        type="text"
      />
    </div>
    <div v-if="searchResults.length" class="search-results">
      <div v-for="track in searchResults" 
           :key="track.id" 
           class="search-result-item"
           @mouseover="hoveredTrack = track.id"
           @mouseleave="hoveredTrack = null">
        <div class="track-info">
          <img :src="track.album.images[2]?.url" :alt="track.name" class="track-thumb" />
          <div class="track-details">
            <div class="track-name">{{ track.name }}</div>
            <div class="track-artist">{{ track.artists[0].name }} • {{ track.album.name }}</div>
          </div>
        </div>
        <button 
          @click="$emit('add-track', track)" 
          class="add-btn"
          :class="{ 'hovered': hoveredTrack === track.id }">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const searchQuery = ref('')
const searchResults = ref([])
const searchTimeout = ref(null)
const hoveredTrack = ref(null)

const handleSearch = async () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value)
  
  searchTimeout.value = setTimeout(async () => {
    if (!searchQuery.value) {
      searchResults.value = []
      return
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery.value)}&type=track&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        }
      )
      const data = await response.json()
      searchResults.value = data.tracks.items
    } catch (error) {
      console.error('Error searching tracks:', error)
    }
  }, 300)
}
</script>

<style scoped>
.track-search {
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.search-input {
  position: relative;
  margin-bottom: 20px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-input input {
  width: 100%;
  padding: 14px 14px 14px 44px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  transition: all 0.2s ease;
}

.search-input input:focus {
  outline: none;
  border-color: #1db954;
  box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.1);
}

.search-input input::placeholder {
  color: #999;
}

.search-results {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  overflow: hidden;
}

.search-result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #eee;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: #f8f8f8;
}

.track-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.track-thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.track-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.track-name {
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.track-artist {
  font-size: 14px;
  color: #666;
}

.add-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: #1db954;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  min-width: 76px;
}

.add-btn:hover {
  background-color: #1ed760;
  transform: scale(1.04);
}

/* Custom scrollbar */
.search-results {
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
}

.search-results::-webkit-scrollbar {
  width: 8px;
}

.search-results::-webkit-scrollbar-track {
  background: transparent;
}

.search-results::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 4px;
}

.search-results::-webkit-scrollbar-thumb:hover {
  background-color: #ccc;
}
</style> 