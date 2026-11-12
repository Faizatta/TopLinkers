<template>
  <div class="favorites-page pt-28 sm:pt-32 md:pt-36 pb-16 bg-[#F6F8FA] min-h-screen">
    <div class="max-w-[1280px] mx-auto px-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
        <div>
          <nav class="flex items-center text-xs text-gray-500 gap-2 mb-2" aria-label="Breadcrumb">
            <router-link to="/" class="hover:text-[#16B4E8]">Home</router-link>
            <span>/</span>
            <span class="text-gray-900 font-medium">Favorites</span>
          </nav>
          <h1 class="text-2xl md:text-3xl font-extrabold text-[#0F2A44]">
            My Shortlisted Properties ({{ favoriteProperties.length }})
          </h1>
          <p class="text-xs text-gray-500 mt-1">
            Review your shortlisted properties anytime. Saved directly to your device storage.
          </p>
        </div>

        <button
          v-if="favoriteProperties.length"
          type="button"
          class="text-xs text-[#E53935] hover:underline font-bold self-start sm:self-center"
          @click="clearAllFavorites"
        >
          Clear All Favorites
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-if="favoriteProperties.length === 0"
        class="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-card max-w-xl mx-auto"
      >
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 text-[#E53935] flex items-center justify-center">
          <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-[#0F2A44] mb-2">No Saved Properties Yet</h3>
        <p class="text-xs text-gray-500 mb-6 leading-relaxed">
          Click the heart icon on any listing card or property detail page to save your favorite villas, plots, or apartments.
        </p>
        <router-link
          to="/listings"
          class="inline-block px-6 py-3 bg-[#16B4E8] hover:bg-[#0F2A44] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow"
        >
          Browse All Properties
        </router-link>
      </div>

      <!-- Grid of Saved Properties -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PropertyCard
          v-for="prop in favoriteProperties"
          :key="prop.id"
          :property="prop"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePropertiesStore } from '../stores/properties'
import { useUiStore } from '../stores/ui'
import PropertyCard from '../components/property/PropertyCard.vue'

const propertiesStore = usePropertiesStore()
const ui = useUiStore()

const favoriteProperties = computed(() => {
  return propertiesStore.properties.filter(p => ui.favorites.includes(p.id))
})

const clearAllFavorites = () => {
  if (confirm('Are you sure you want to clear all saved favorites?')) {
    ui.favorites = []
    try {
      localStorage.removeItem('toplinkers_favorites')
    } catch (e) {
      // ignore
    }
  }
}

onMounted(() => {
  document.title = 'My Saved Properties & Portfolios | TopLinkers'
  if (propertiesStore.properties.length === 0) {
    propertiesStore.fetchProperties()
  }
})
</script>