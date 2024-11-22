<template>
  <div class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center mb-4" v-if="audioStore.currentTrack">
        <img
          :src="audioStore.currentTrack.album.images[0]?.url"
          :alt="audioStore.currentTrack.name"
          class="w-16 h-16 rounded-md object-cover mr-4"
        />
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold truncate">{{ audioStore.currentTrack.name }}</h3>
          <p class="text-sm text-gray-400 truncate">{{ artistNames }}</p>
        </div>
      </div>
      
      <div class="mb-4">
        <div class="relative h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            class="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300 ease-in-out"
            :style="{ width: `${audioStore.progress}%` }"
          ></div>
        </div>
      </div>
      
      <div class="flex items-center justify-between">
        <button 
          @click="audioStore.togglePlay"
          class="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
        >
          <PlayIcon v-if="!audioStore.isPlaying" class="w-6 h-6" />
          <PauseIcon v-else class="w-6 h-6" />
        </button>
        
        <div class="flex items-center flex-1 max-w-xs mx-4">
          <VolumeIcon class="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            v-model="volume"
            @input="audioStore.setVolume(parseFloat($event.target.value))"
            class="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlayIcon, PauseIcon, VolumeIcon } from 'lucide-vue-next'

const audioStore = useAudioStore()

const volume = ref(audioStore.volume)

const artistNames = computed(() => {
  if (!audioStore.currentTrack) return ''
  return audioStore.currentTrack.artists.map(artist => artist.name).join(', ')
})
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  background: transparent;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: #ffffff;
  cursor: pointer;
  border-radius: 50%;
  margin-top: -4px;
}

input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #ffffff;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: #4a5568;
  border-radius: 2px;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: #4a5568;
  border-radius: 2px;
}
</style>