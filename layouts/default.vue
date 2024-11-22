<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between items-center">
        <!-- Left: Home Link -->
        <div>
          <NuxtLink to="/" class="font-bold text-lg text-gray-800 hover:text-green-500">
            Home
          </NuxtLink>
        </div>

        <!-- Center: Search Bar -->
        <div class="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for songs, artists, albums..."
            class="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <!-- Right: Account -->
        <div>
          <NuxtLink to="/account" class="text-gray-800 hover:text-green-500">
            Account
          </NuxtLink>
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <div class="container mx-auto p-4">
      <NuxtPage />
    </div>

    <MusicPlayer />
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
