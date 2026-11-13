<template>
  <div class="listings-page pt-[66px] sm:pt-20 bg-[#F8FAFC] min-h-screen select-none">
    <!-- Mobile Toggle Pill Bar: Switch between Map and Properties List -->
    <div class="lg:hidden sticky top-[66px] sm:top-20 z-30 bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
      <span class="text-xs font-bold text-[#0F2A44]">
        {{ propertiesStore.total }} Properties Available
      </span>
      <div class="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          :class="[
            'px-3 py-1 rounded text-xs font-bold transition-all',
            !mobileShowMap ? 'bg-white shadow text-[#0F2A44]' : 'text-gray-500'
          ]"
          @click="mobileShowMap = false"
        >
          List View
        </button>
        <button
          type="button"
          :class="[
            'px-3 py-1 rounded text-xs font-bold transition-all',
            mobileShowMap ? 'bg-[#16B4E8] text-white shadow' : 'text-gray-500'
          ]"
          @click="mobileShowMap = true"
        >
          Map View
        </button>
      </div>
    </div>

    <!-- Main Container: Sticky Map (Left 50%) + Listings & Filters (Right 50%) -->
    <div class="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] relative">
      <!-- Left Half: Sticky Interactive Map (Desktop 50%, Mobile toggled) -->
      <div
        :class="[
          'lg:w-1/2 w-full lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] h-[calc(100vh-125px)] z-10 lg:border-r border-gray-200 self-start',
          mobileShowMap ? 'block' : 'hidden lg:block'
        ]"
      >
        <ListingsMap
          :properties="propertiesStore.properties"
          :hoveredPropertyId="hoveredPropertyId"
          @select-property="hoveredPropertyId = $event"
        />
      </div>

      <!-- Right Half: User-Friendly Quick Filters & Direct Listings Grid -->
      <div
        :class="[
          'lg:w-1/2 w-full p-4 sm:p-6 lg:p-7 pb-16',
          mobileShowMap ? 'hidden lg:block' : 'block'
        ]"
      >
        <div class="max-w-2xl mx-auto space-y-5">
          <!-- SEO Page Header & Intro -->
          <header class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-xs">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#16B4E8]/10 text-[#16B4E8]">
                <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8] animate-pulse"></span>
                Verified Islamabad &amp; Galyat Portfolios
              </span>
            </div>
            <h1 class="text-xl sm:text-2xl font-black text-[#0F2A44] tracking-tight">
              Properties for Sale &amp; Rent in Islamabad &amp; Rawalpindi
            </h1>
            <p class="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Explore verified on-ground CDA plots in TopCity-1 &amp; PECHS, cash possession Moqa Ka Plots, ready PHA apartments in I-12 &amp; I-16, and hillside suites in Harsukh Nathia Gali with instant live map search.
            </p>
          </header>

          <!-- 1. COMPACT QUICK-FILTER BAR (User-Friendly, Modern, Clean & Fast) -->
          <div class="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(15,42,68,0.06)] border border-gray-200/90 space-y-4">
            <!-- Row 1: Search Keyword Input + More Filters Button -->
            <div class="flex items-center gap-2.5">
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#16B4E8]">
                  <MagnifyingGlassIcon class="w-4 h-4" />
                </div>
                <input
                  v-model="propertiesStore.filters.keyword"
                  type="text"
                  placeholder="Search sector, society (e.g. PECHS, TopCity, I-12, Gulberg)..."
                  class="w-full text-xs sm:text-sm py-2.5 sm:py-3 pl-10 pr-9 rounded-xl border border-gray-200 bg-gray-50/70 focus:bg-white focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/10 transition-all font-medium text-[#0F2A44] placeholder-gray-400"
                  @input="handleQuickChange"
                />
                <button
                  v-if="propertiesStore.filters.keyword"
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#0F2A44]"
                  title="Clear search"
                  @click="clearKeyword"
                >
                  <XMarkIcon class="w-4 h-4" />
                </button>
              </div>

              <!-- More Filters Trigger Button -->
              <button
                type="button"
                :class="[
                  'px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 flex-shrink-0 border shadow-xs',
                  activeFilterCount > 0
                    ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow'
                    : 'bg-white hover:bg-gray-50 text-[#0F2A44] border-gray-200 hover:border-[#16B4E8]'
                ]"
                @click="isFilterDrawerOpen = true"
              >
                <AdjustmentsHorizontalIcon class="w-4 h-4 text-[#16B4E8]" />
                <span class="hidden sm:inline">Advanced</span>
                <span>Filters</span>
                <span
                  v-if="activeFilterCount > 0"
                  class="w-5 h-5 rounded-full bg-[#16B4E8] text-white text-[10px] font-black flex items-center justify-center"
                >
                  {{ activeFilterCount }}
                </span>
              </button>
            </div>

            <!-- Row 2: Popular Hot Locations (1-Tap Quick Filters) -->
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] font-black uppercase tracking-wider text-gray-400 mr-1 flex items-center gap-1">
                <span>Top Areas:</span>
              </span>
              <button
                v-for="loc in hotLocations"
                :key="loc.name"
                type="button"
                :class="[
                  'px-3 py-1 rounded-full text-[11px] font-bold transition-all border',
                  propertiesStore.filters.keyword.toLowerCase().includes(loc.keyword.toLowerCase())
                    ? 'bg-[#0F2A44] text-white border-[#0F2A44]'
                    : 'bg-gray-100/80 hover:bg-white text-gray-600 border-gray-200 hover:border-[#16B4E8]'
                ]"
                @click="setQuickLocation(loc.keyword)"
              >
                {{ loc.name }}
              </button>
            </div>

            <!-- Row 3: Purpose Segmented Bar + Dropdown Filters -->
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
              <!-- Purpose Tabs (All / For Sale / For Rent) -->
              <div class="sm:col-span-5 bg-gray-100 p-1 rounded-xl flex items-center">
                <button
                  v-for="s in [
                    { id: 'all', label: 'All' },
                    { id: 'for-sale', label: 'For Sale' }
                  ]"
                  :key="s.id"
                  type="button"
                  :class="[
                    'flex-1 py-1.5 rounded-lg text-xs font-extrabold transition-all text-center',
                    propertiesStore.filters.status === s.id
                      ? 'bg-white text-[#0F2A44] shadow-xs'
                      : 'text-gray-500 hover:text-[#0F2A44]'
                  ]"
                  @click="setQuickStatus(s.id)"
                >
                  {{ s.label }}
                </button>
              </div>

              <!-- Quick Price Range Select -->
              <div class="sm:col-span-4 relative">
                <select
                  v-model="quickPriceSelection"
                  aria-label="Price range"
                  class="w-full h-full text-xs font-bold text-[#0F2A44] px-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8] cursor-pointer appearance-none pr-8"
                  @change="handleQuickPriceChange"
                >
                  <option value="all">Any Price</option>
                  <option value="under-50l">Under PKR 50 Lac</option>
                  <option value="50l-1cr">PKR 50 Lac – 1 Crore</option>
                  <option value="1cr-2.5cr">PKR 1 Crore – 2.5 Crore</option>
                  <option value="above-2.5cr">Above PKR 2.5 Crore</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>

              <!-- Quick City Select -->
              <div class="sm:col-span-3 relative">
                <select
                  v-model="propertiesStore.filters.city"
                  aria-label="City or area"
                  class="w-full h-full text-xs font-bold text-[#0F2A44] px-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8] cursor-pointer appearance-none pr-8"
                  @change="handleQuickChange"
                >
                  <option value="all">All Cities</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Murree">Nathia Gali</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            <!-- Row 4: Property Category Chips (Typography-only, Zero Icon Clutter) -->
            <div class="pt-1 flex items-center gap-1.5 flex-wrap">
              <button
                v-for="t in quickTypes"
                :key="t.value"
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-xl font-bold text-xs transition-all border',
                  isQuickTypeActive(t.value)
                    ? 'bg-[#16B4E8] text-white border-[#16B4E8] shadow-xs'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200/90 hover:border-[#16B4E8]'
                ]"
                @click="setQuickType(t.value)"
              >
                <span>{{ t.label }}</span>
              </button>
            </div>

            <!-- Row 5: Active Applied Filter Pills (Instant Feedback with 1-Click Clear) -->
            <div
              v-if="activeFilterCount > 0"
              class="pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap"
            >
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-[10px] font-black uppercase text-gray-400">Active:</span>

                <span
                  v-if="propertiesStore.filters.keyword"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#16B4E8]/10 text-[#0F2A44] text-[11px] font-bold"
                >
                  "{{ propertiesStore.filters.keyword }}"
                  <button type="button" @click="clearKeyword" class="hover:text-red-500 font-bold">&times;</button>
                </span>

                <span
                  v-if="propertiesStore.filters.status !== 'all'"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#16B4E8]/10 text-[#0F2A44] text-[11px] font-bold"
                >
                  {{ propertiesStore.filters.status === 'for-sale' ? 'For Sale' : 'For Rent' }}
                  <button type="button" @click="setQuickStatus('all')" class="hover:text-red-500 font-bold">&times;</button>
                </span>

                <span
                  v-if="activeQuickType !== 'all'"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#16B4E8]/10 text-[#0F2A44] text-[11px] font-bold"
                >
                  {{ quickTypes.find(x => x.value === activeQuickType)?.label }}
                  <button type="button" @click="setQuickType('all')" class="hover:text-red-500 font-bold">&times;</button>
                </span>

                <span
                  v-if="quickPriceSelection !== 'all'"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#16B4E8]/10 text-[#0F2A44] text-[11px] font-bold"
                >
                  Price Filter
                  <button type="button" @click="resetQuickPrice" class="hover:text-red-500 font-bold">&times;</button>
                </span>

                <span
                  v-if="propertiesStore.filters.city !== 'all'"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#16B4E8]/10 text-[#0F2A44] text-[11px] font-bold"
                >
                  {{ propertiesStore.filters.city }}
                  <button type="button" @click="setQuickCity('all')" class="hover:text-red-500 font-bold">&times;</button>
                </span>
              </div>

              <!-- Reset All button -->
              <button
                type="button"
                class="text-xs font-bold text-[#E53935] hover:underline"
                @click="resetAndFetch"
              >
                Clear All ({{ activeFilterCount }})
              </button>
            </div>
          </div>

          <!-- 2. RESULTS HEADER (Count & Sort) -->
          <div id="results-anchor" class="pt-1">
            <ResultsHeader
              :total="propertiesStore.total"
              v-model="sortValue"
              @update:modelValue="handleSort"
            />
          </div>

          <!-- 3. Loading Skeletons -->
          <div v-if="propertiesStore.loading" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="n in 4" :key="n" class="bg-white p-4 rounded-xl shadow-sm space-y-3">
              <Skeleton height="180px" />
              <Skeleton height="20px" width="70%" />
              <Skeleton height="14px" width="40%" />
            </div>
          </div>

          <!-- 4. Empty State -->
          <div
            v-else-if="propertiesStore.properties.length === 0"
            class="bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-sm"
          >
            <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-blue-50 text-[#16B4E8] flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <h3 class="text-base font-bold text-[#0F2A44] mb-1">No Matching Properties Found</h3>
            <p class="text-xs text-gray-500 mb-4">Try clearing some of your search filters to see all available properties.</p>
            <button
              type="button"
              class="px-5 py-2.5 bg-[#16B4E8] text-white text-xs font-bold uppercase rounded-xl transition-colors shadow-sm"
              @click="resetAndFetch"
            >
              Reset All Filters
            </button>
          </div>

          <!-- 5. 2-Column Results Grid (Directly visible!) -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PropertyCard
              v-for="prop in propertiesStore.paginatedProperties"
              :key="prop.id"
              :property="prop"
              @hover-property="hoveredPropertyId = $event"
            />
          </div>

          <!-- 6. Pagination -->
          <div
            v-if="propertiesStore.totalPages > 1"
            class="pt-6 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              :disabled="propertiesStore.page === 1"
              :class="[
                'px-3.5 py-2 flex-shrink-0 text-xs font-bold rounded-lg border transition-colors',
                propertiesStore.page === 1
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                  : 'border-gray-300 text-[#0F2A44] hover:border-[#16B4E8] hover:text-[#16B4E8] bg-white'
              ]"
              @click="changePage(propertiesStore.page - 1)"
            >
              &larr; Prev
            </button>

            <button
              v-for="p in propertiesStore.totalPages"
              :key="p"
              type="button"
              :class="[
                'w-9 h-9 flex-shrink-0 text-xs font-black rounded-lg transition-colors',
                propertiesStore.page === p
                  ? 'bg-[#16B4E8] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-[#0F2A44] hover:border-[#16B4E8]'
              ]"
              @click="changePage(p)"
            >
              {{ p }}
            </button>

            <button
              type="button"
              :disabled="propertiesStore.page === propertiesStore.totalPages"
              :class="[
                'px-3.5 py-2 flex-shrink-0 text-xs font-bold rounded-lg border transition-colors',
                propertiesStore.page === propertiesStore.totalPages
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                  : 'border-gray-300 text-[#0F2A44] hover:border-[#16B4E8] hover:text-[#16B4E8] bg-white'
              ]"
              @click="changePage(propertiesStore.page + 1)"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 7. SLIDE-IN ADVANCED FILTERS MODAL DRAWER (With Sticky Confirmation Bar) -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isFilterDrawerOpen"
          class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-end"
          @click.self="isFilterDrawerOpen = false"
        >
          <div class="w-full max-w-lg bg-white min-h-screen shadow-2xl p-6 overflow-y-auto relative">
            <FilterPanel
              :filters="propertiesStore.filters"
              :showClose="true"
              @close="isFilterDrawerOpen = false"
              @apply-search="handleDrawerApply"
              @reset-search="handleDrawerReset"
            />
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { scrollTo } from '../services/lenis'
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import ListingsMap from '../components/listings/ListingsMap.vue'
import FilterPanel from '../components/listings/FilterPanel.vue'
import ResultsHeader from '../components/listings/ResultsHeader.vue'
import PropertyCard from '../components/property/PropertyCard.vue'
import Skeleton from '../components/ui/Skeleton.vue'
import { usePropertiesStore } from '../stores/properties'

const route = useRoute()
const router = useRouter()
const propertiesStore = usePropertiesStore()

const mobileShowMap = ref(false)
const isFilterDrawerOpen = ref(false)
const hoveredPropertyId = ref(null)
const sortValue = ref('newest')

const hotLocations = [
  { name: 'PECHS', keyword: 'PECHS', icon: '⚡' },
  { name: 'TopCity-1', keyword: 'TopCity', icon: '📍' },
  { name: 'PHA I-12', keyword: 'I-12', icon: '🏢' },
  { name: 'PHA I-16', keyword: 'I-16', icon: '🏢' },
  { name: 'Faisal Town II', keyword: 'Faisal', icon: '📈' },
  { name: 'Nathia Gali', keyword: 'Nathia', icon: '🌲' },
  { name: 'Gulberg', keyword: 'Gulberg', icon: '🏡' }
]

const quickPriceSelection = ref('all')

const quickTypes = [
  { value: 'all', label: 'All' },
  { value: 'moqa', label: 'Moqa Ka Plot (100% Cash)' },
  { value: 'installment', label: 'Installment Plots' },
  { value: 'pha', label: 'PHA Cash Flats' },
  { value: 'banu-hafeez', label: 'Banu Hafeez (Cash/Plan)' },
  { value: 'hrsukh', label: 'Harsukh Suites' },
  { value: 'plot', label: 'Plots' },
  { value: 'apartment', label: 'Flats' },
  { value: 'villa', label: 'Villas' },
  { value: 'commercial', label: 'Commercial' }
]

const activeFilterCount = computed(() => {
  let count = 0
  const f = propertiesStore.filters
  if (f.keyword && f.keyword.trim()) count++
  if (f.status && f.status !== 'all') count++
  if (f.type && f.type !== 'all') count++
  if (f.city && f.city !== 'all') count++
  if (f.beds && f.beds !== 'any') count++
  if (f.minPrice || f.maxPrice) count++
  if (f.minArea || f.maxArea) count++
  if (f.features && f.features.length) count += f.features.length
  return count
})

const handleQuickChange = () => {
  propertiesStore.page = 1
  propertiesStore.fetchProperties()
}

const clearKeyword = () => {
  propertiesStore.filters.keyword = ''
  handleQuickChange()
}

const setQuickLocation = (loc) => {
  if (propertiesStore.filters.keyword.toLowerCase().includes(loc.toLowerCase())) {
    propertiesStore.filters.keyword = ''
  } else {
    propertiesStore.filters.keyword = loc
  }
  handleQuickChange()
}

const setQuickStatus = (status) => {
  propertiesStore.filters.status = status
  handleQuickChange()
}

const activeQuickType = ref('all')

const isQuickTypeActive = (val) => {
  return activeQuickType.value === val
}

const setQuickType = (val) => {
  activeQuickType.value = val
  if (val === 'all') {
    propertiesStore.filters.type = 'all'
    propertiesStore.filters.keyword = ''
  } else if (val === 'moqa') {
    propertiesStore.filters.type = 'plot'
    propertiesStore.filters.keyword = 'Moqa'
  } else if (val === 'installment') {
    propertiesStore.filters.type = 'plot'
    propertiesStore.filters.keyword = 'Installment'
  } else if (val === 'pha') {
    propertiesStore.filters.type = 'apartment'
    propertiesStore.filters.keyword = 'PHA'
  } else if (val === 'banu-hafeez') {
    propertiesStore.filters.type = 'apartment'
    propertiesStore.filters.keyword = 'Banu Hafeez'
  } else if (val === 'hrsukh') {
    propertiesStore.filters.type = 'apartment'
    propertiesStore.filters.keyword = 'Sukh'
  } else {
    propertiesStore.filters.type = val
    propertiesStore.filters.keyword = ''
  }
  handleQuickChange()
}

const handleQuickPriceChange = () => {
  const val = quickPriceSelection.value
  if (val === 'under-50l') {
    propertiesStore.filters.minPrice = null
    propertiesStore.filters.maxPrice = 5000000
  } else if (val === '50l-1cr') {
    propertiesStore.filters.minPrice = 5000000
    propertiesStore.filters.maxPrice = 10000000
  } else if (val === '1cr-2.5cr') {
    propertiesStore.filters.minPrice = 10000000
    propertiesStore.filters.maxPrice = 25000000
  } else if (val === 'above-2.5cr') {
    propertiesStore.filters.minPrice = 25000000
    propertiesStore.filters.maxPrice = null
  } else {
    propertiesStore.filters.minPrice = null
    propertiesStore.filters.maxPrice = null
  }
  handleQuickChange()
}

const resetQuickPrice = () => {
  quickPriceSelection.value = 'all'
  propertiesStore.filters.minPrice = null
  propertiesStore.filters.maxPrice = null
  handleQuickChange()
}

const setQuickCity = (cityVal) => {
  propertiesStore.filters.city = cityVal
  handleQuickChange()
}

const handleSort = (val) => {
  sortValue.value = val
  propertiesStore.setFilter('sort', val)
  propertiesStore.fetchProperties()
}

const handleDrawerApply = () => {
  isFilterDrawerOpen.value = false
  propertiesStore.page = 1
  propertiesStore.fetchProperties()
  const query = propertiesStore.toQueryObject()
  router.push({ path: '/listings', query })
}

const handleDrawerReset = () => {
  propertiesStore.resetFilters()
  propertiesStore.fetchProperties()
  router.push({ path: '/listings' })
}

const resetAndFetch = () => {
  activeQuickType.value = 'all'
  quickPriceSelection.value = 'all'
  propertiesStore.resetFilters()
  router.push({ path: '/listings' })
  propertiesStore.fetchProperties()
}

const changePage = (p) => {
  propertiesStore.page = p
  scrollTo('#results-anchor', { offset: -90, duration: 1.0 })
}

const syncAndLoad = () => {
  document.title = 'Verified Properties for Sale & Rent in Islamabad | TopLinkers'
  if (route.params.slug) {
    propertiesStore.syncFromQuery({
      ...route.query,
      type: route.params.slug
    })
  } else {
    propertiesStore.syncFromQuery(route.query)
  }
  propertiesStore.fetchProperties()
}

onMounted(() => {
  syncAndLoad()
})

watch(() => route.fullPath, () => {
  syncAndLoad()
})
</script>
