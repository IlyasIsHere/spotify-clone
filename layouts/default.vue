<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <header class="bg-gray-800 shadow-md">
      <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- Left: Home Link -->
        <NuxtLink to="/" class="text-xl font-bold text-green-500 hover:text-green-400 transition-colors">
          Musicify
        </NuxtLink>

        <!-- Center: Search Bar -->
        <div class="flex-1 max-w-2xl mx-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search for songs, artists, albums..."
              class="w-full px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <SearchIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Right: Profile -->
        <NuxtLink to="/profile" class="text-gray-300 hover:text-white transition-colors">
          <UserIcon class="w-6 h-6" />
        </NuxtLink>
      </nav>
    </header>

    <!-- Page Content -->
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <MusicPlayer />
  </div>
</template>

<script setup>
import { SearchIcon, UserIcon } from 'lucide-vue-next'
</script>

<style>
body {
  @apply bg-gray-900 text-white;
}
</style>

