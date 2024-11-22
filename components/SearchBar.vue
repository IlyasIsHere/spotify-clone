<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="query"
      @input="onSearch"
      placeholder="Search for artists, albums, playlists, or tracks"
    />
    <div class="search-results" v-if="results.length">
      <div
        v-for="result in results"
        :key="result.id"
        class="result-card"
        @click="selectResult(result)"
      >
        <img :src="result.image" :alt="result.name" />
        <div class="result-info">
          <h3>{{ result.name }}</h3>
          <p>{{ result.type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['select']);

const query = ref('');
const results = ref([]);

/**
 * Access the access token from the Nuxt state.
 * Adjust this according to how you manage your authentication.
 * For example, you might use useState or useAuth composables.
 */
const auth = useAuth();

/**
 * Debounce the search input to prevent excessive API calls.
 */
const debounceTimeout = ref(null);

const onSearch = () => {
  // Clear the previous debounce timeout
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }

  // Set a new debounce timeout
  debounceTimeout.value = setTimeout(async () => {
    if (query.value.length > 2) {
      await fetchResults();
    } else {
      results.value = [];
    }
  }, 300); // Adjust the debounce delay as needed
};

const fetchResults = async () => {
  try {
    const response = await useFetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query.value
      )}&type=artist,album,playlist,track`,
      {
        headers: {
          Authorization: `Bearer ${auth.token.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();

    results.value = [
      ...data.artists.items.map((item) => ({
        ...item,
        type: 'Artist',
        image: item.images[0]?.url || 'default_artist_image.jpg',
      })),
      ...data.albums.items.map((item) => ({
        ...item,
        type: 'Album',
        image: item.images[0]?.url || 'default_album_image.jpg',
      })),
      ...data.playlists.items.map((item) => ({
        ...item,
        type: 'Playlist',
        image: item.images[0]?.url || 'default_playlist_image.jpg',
      })),
      ...data.tracks.items.map((item) => ({
        ...item,
        type: 'Track',
        image: item.album.images[0]?.url || 'default_track_image.jpg',
      })),
    ];
  } catch (error) {
    console.error(error);
    // Handle errors appropriately in your application
  }
};

const selectResult = (result) => {
  emit('select', result);
};
</script>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

input {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-results {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
}

.result-card:hover {
  transform: scale(1.05);
}

.result-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
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
