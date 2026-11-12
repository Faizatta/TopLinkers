<template>
  <div class="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 items-end select-none">
    <!-- Favorites Button -->
    <router-link
      to="/favorites"
      class="group flex items-center bg-white text-gray-700 hover:text-[#00AEEF] px-3 py-2.5 rounded-l-md shadow-lg border border-r-0 border-gray-200 transition-all duration-200 hover:-translate-x-1"
      title="Saved Properties"
    >
      <div class="relative flex items-center gap-2">
        <svg class="w-5 h-5 text-[#F26B21] transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span class="text-xs font-semibold hidden md:inline">Favorites</span>
        <span
          v-if="ui.favoritesCount > 0"
          class="bg-[#00AEEF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
        >
          {{ ui.favoritesCount }}
        </span>
      </div>
    </router-link>

    <!-- Compare Button -->
    <router-link
      to="/compare"
      class="group flex items-center bg-white text-gray-700 hover:text-[#00AEEF] px-3 py-2.5 rounded-l-md shadow-lg border border-r-0 border-gray-200 transition-all duration-200 hover:-translate-x-1"
      title="Compare Properties"
    >
      <div class="relative flex items-center gap-2">
        <svg class="w-5 h-5 text-[#00AEEF] transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span class="text-xs font-semibold hidden md:inline">Compare</span>
        <span
          v-if="ui.compareCount > 0"
          class="bg-[#F26B21] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
        >
          {{ ui.compareCount }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { useUiStore } from '../../stores/ui'

const ui = useUiStore()
</script>
