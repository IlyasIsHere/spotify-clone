<template>
  <div class="search-page">
    <h1>Search Results for "{{ route.query.q }}"</h1>
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
    <p v-else>No results found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const results = ref([]);

/**
 * Fetch the search results when the page is mounted or the query changes.
 */
const fetchResults = async () => {
  const query = route.query.q;

  if (!query || query.length < 3) {
    results.value = [];
    return;
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=artist,album,playlist,track`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();

    results.value = [
      ...data.artists?.items.map((item) => ({
        ...item,
        type: 'Artist',
        image: item.images?.[0]?.url || 'default_artist_image.jpg',
      })) || [],
      ...data.albums?.items.map((item) => ({
        ...item,
        type: 'Album',
        image: item.images?.[0]?.url || 'default_album_image.jpg',
      })) || [],
      ...data.playlists?.items.map((item) => ({
        ...item,
        type: 'Playlist',
        image: item.images?.[0]?.url || 'default_playlist_image.jpg',
      })) || [],
      ...data.tracks?.items.map((item) => ({
        ...item,
        type: 'Track',
        image: item.album?.images?.[0]?.url || 'default_track_image.jpg',
      })) || [],
    ];
  } catch (error) {
    console.error('Error fetching search results:', error.message);
  }
};

/**
 * Navigate to the detail page for the selected result.
 */
const selectResult = (result) => {
  const typeToRoute = {
    Artist: 'artists',
    Album: 'albums',
    Playlist: 'playlists',
    Track: 'tracks',
  };

  const route = typeToRoute[result.type];
  if (route) {
    router.push(`/${route}/${result.id}`);
  } else {
    console.error('Unknown result type:', result.type);
  }
};

// Fetch results when the component is mounted or the query changes
onMounted(fetchResults);
watch(() => route.query.q, fetchResults);
</script>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
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
