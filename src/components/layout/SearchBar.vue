<template>
  <div class="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm transition-all">
    <div class="max-w-[1170px] mx-auto px-4 py-3">
      <!-- Main Search Row -->
      <form @submit.prevent="handleSearch" class="flex flex-wrap items-center gap-2">
        <!-- Keyword Search Input -->
        <div class="flex-1 min-w-[200px] relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="filters.keyword"
            type="text"
            placeholder="Enter address, neighborhood, city or ZIP..."
            class="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] text-gray-800 placeholder-gray-400"
          />
        </div>

        <!-- Status Dropdown (For Rent / For Sale / All) -->
        <div class="w-28 sm:w-32">
          <select
            v-model="filters.status"
            class="w-full text-xs sm:text-sm py-2.5 px-3 rounded border border-gray-200 bg-white focus:outline-none focus:border-[#00AEEF] text-gray-700 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="for-sale">For Sale</option>
          </select>
        </div>

        <!-- Beds Dropdown -->
        <div class="w-24 sm:w-28">
          <select
            v-model="filters.beds"
            class="w-full text-xs sm:text-sm py-2.5 px-3 rounded border border-gray-200 bg-white focus:outline-none focus:border-[#00AEEF] text-gray-700 cursor-pointer"
          >
            <option value="any">Beds (Any)</option>
            <option value="1">1+ Bed</option>
            <option value="2">2+ Beds</option>
            <option value="3">3+ Beds</option>
            <option value="4">4+ Beds</option>
          </select>
        </div>

        <!-- Baths Dropdown -->
        <div class="w-24 sm:w-28">
          <select
            v-model="filters.baths"
            class="w-full text-xs sm:text-sm py-2.5 px-3 rounded border border-gray-200 bg-white focus:outline-none focus:border-[#00AEEF] text-gray-700 cursor-pointer"
          >
            <option value="any">Baths (Any)</option>
            <option value="1">1+ Bath</option>
            <option value="2">2+ Baths</option>
            <option value="3">3+ Baths</option>
          </select>
        </div>

        <!-- Price Range Popover / Dropdown button -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-1.5 text-xs sm:text-sm py-2.5 px-3 rounded border border-gray-200 bg-white text-gray-700 hover:border-gray-300 focus:outline-none"
            @click="isPriceDropdownOpen = !isPriceDropdownOpen"
          >
            <span>{{ priceLabel }}</span>
            <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Price popover -->
          <div
            v-show="isPriceDropdownOpen"
            class="absolute top-full right-0 mt-2 w-72 bg-white rounded shadow-xl border border-gray-100 p-4 z-50 text-gray-800"
          >
            <div class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Price Range ($)</div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-[10px] text-gray-500 uppercase">Min Price</label>
                <input
                  v-model.number="filters.minPrice"
                  type="number"
                  step="500"
                  placeholder="Min"
                  class="w-full text-xs p-2 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>
              <div>
                <label class="text-[10px] text-gray-500 uppercase">Max Price</label>
                <input
                  v-model.number="filters.maxPrice"
                  type="number"
                  step="500"
                  placeholder="Max"
                  class="w-full text-xs p-2 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>
            </div>
            <div class="mt-3 flex justify-between">
              <button
                type="button"
                class="text-xs text-gray-500 hover:text-gray-800"
                @click="filters.minPrice = ''; filters.maxPrice = ''; isPriceDropdownOpen = false"
              >
                Reset
              </button>
              <button
                type="button"
                class="text-xs px-3 py-1 bg-[#00AEEF] text-white font-medium rounded hover:bg-[#0098d3]"
                @click="isPriceDropdownOpen = false"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <!-- Advanced Filters Toggle Icon Button -->
        <button
          type="button"
          :class="[
            'p-2.5 rounded border transition-colors flex items-center justify-center text-gray-600',
            isAdvancedOpen ? 'bg-cyan-50 border-[#00AEEF] text-[#00AEEF]' : 'border-gray-200 hover:bg-gray-50'
          ]"
          title="Advanced Filters"
          @click="isAdvancedOpen = !isAdvancedOpen"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>

        <!-- Clear Button (visible if active filters) -->
        <button
          v-if="hasFilters"
          type="button"
          class="text-xs text-gray-500 hover:text-red-500 px-2 py-2.5 transition-colors font-medium"
          @click="clearAll"
        >
          Clear
        </button>

        <!-- Orange Search Button -->
        <button
          type="submit"
          class="px-5 py-2.5 bg-[#F26B21] hover:bg-[#d95a14] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition-colors shadow-sm flex items-center gap-1.5 focus:outline-none"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
      </form>

      <!-- Advanced Filters Expanded Panel -->
      <div
        v-show="isAdvancedOpen"
        class="mt-3 pt-3 border-t border-gray-100 transition-all duration-200"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <!-- Property Type -->
          <div>
            <label class="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Property Type</label>
            <select
              v-model="filters.type"
              class="w-full text-xs p-2 rounded border border-gray-200 bg-white focus:outline-none focus:border-[#00AEEF]"
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="single-family-home">Single Family Home</option>
              <option value="studio">Studio</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="shop">Shop</option>
            </select>
          </div>

          <!-- City -->
          <div>
            <label class="block text-[11px] font-semibold text-gray-600 uppercase mb-1">City / Metro</label>
            <select
              v-model="filters.city"
              class="w-full text-xs p-2 rounded border border-gray-200 bg-white focus:outline-none focus:border-[#00AEEF]"
            >
              <option value="all">All Cities</option>
              <option value="miami">Miami, FL</option>
              <option value="los-angeles">Los Angeles, CA</option>
              <option value="chicago">Chicago, IL</option>
              <option value="new-york">New York, NY</option>
            </select>
          </div>

          <!-- Min Area Sq Ft -->
          <div>
            <label class="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Min Area (Sq Ft)</label>
            <input
              v-model.number="filters.minArea"
              type="number"
              step="100"
              placeholder="e.g. 1000"
              class="w-full text-xs p-2 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
            />
          </div>

          <!-- Max Area Sq Ft -->
          <div>
            <label class="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Max Area (Sq Ft)</label>
            <input
              v-model.number="filters.maxArea"
              type="number"
              step="100"
              placeholder="e.g. 5000"
              class="w-full text-xs p-2 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
            />
          </div>
        </div>

        <!-- Features Checklist -->
        <div class="mt-3">
          <label class="block text-[11px] font-semibold text-gray-600 uppercase mb-2">Features & Amenities</label>
          <div class="flex flex-wrap gap-x-4 gap-y-2">
            <label
              v-for="feature in availableFeatures"
              :key="feature"
              class="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer select-none hover:text-[#00AEEF]"
            >
              <input
                type="checkbox"
                :value="feature"
                v-model="filters.features"
                class="rounded border-gray-300 text-[#00AEEF] focus:ring-[#00AEEF]"
              />
              <span>{{ feature }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePropertiesStore } from '../../stores/properties'

const router = useRouter()
const propertiesStore = usePropertiesStore()

const isAdvancedOpen = ref(false)
const isPriceDropdownOpen = ref(false)

const filters = propertiesStore.filters

const availableFeatures = [
  'Air Conditioning',
  'Swimming Pool',
  'Central Heating',
  'Laundry Room',
  'Gym',
  'Alarm System',
  'Balcony',
  'Valet Parking',
  'WiFi',
  'High Ceilings',
  'Fireplace'
]

const priceLabel = computed(() => {
  if (filters.minPrice && filters.maxPrice) {
    return `$${filters.minPrice} - $${filters.maxPrice}`
  } else if (filters.minPrice) {
    return `From $${filters.minPrice}`
  } else if (filters.maxPrice) {
    return `Up to $${filters.maxPrice}`
  }
  return 'Price Range'
})

const hasFilters = computed(() => propertiesStore.hasActiveFilters)

const clearAll = () => {
  propertiesStore.resetFilters()
  if (router.currentRoute.value.path === '/search') {
    router.push({ path: '/search' })
  }
}

const handleSearch = () => {
  const query = propertiesStore.toQueryObject()
  router.push({
    path: '/search',
    query
  })
}
</script>
