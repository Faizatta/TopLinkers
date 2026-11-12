<template>
  <div class="listing-page py-10">
    <div class="max-w-[1170px] mx-auto px-4">
      <!-- Page Header Banner / Breadcrumb -->
      <div class="mb-8 pb-6 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <nav class="flex items-center text-xs text-gray-500 gap-2 mb-2">
            <router-link to="/" class="hover:text-[#00AEEF]">Home</router-link>
            <span>/</span>
            <span class="text-gray-900 font-medium">{{ pageHeading }}</span>
          </nav>
          <h1 class="text-2xl md:text-3xl font-light text-gray-900">
            {{ pageHeading }}
          </h1>
          <p class="text-xs text-gray-500 mt-1">
            Displaying {{ propertiesStore.total }} active listings matching your criteria
          </p>
        </div>

        <!-- View Toggle & Sort Controls -->
        <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <!-- Sort select -->
          <div class="flex items-center gap-2">
            <label class="text-xs text-gray-500 whitespace-nowrap">Sort By:</label>
            <select
              v-model="sortValue"
              @change="handleSortChange"
              class="text-xs py-2 px-3 rounded border border-gray-200 bg-white focus:outline-none focus:border-[#00AEEF]"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>

          <!-- Grid / List View Toggle -->
          <div class="flex items-center border border-gray-200 rounded overflow-hidden">
            <button
              type="button"
              :class="[
                'p-2 transition-colors',
                viewMode === 'grid' ? 'bg-[#00AEEF] text-white' : 'bg-white text-gray-500 hover:text-gray-900'
              ]"
              aria-label="Grid View"
              @click="viewMode = 'grid'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              type="button"
              :class="[
                'p-2 transition-colors',
                viewMode === 'list' ? 'bg-[#00AEEF] text-white' : 'bg-white text-gray-500 hover:text-gray-900'
              ]"
              aria-label="List View"
              @click="viewMode = 'list'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Layout: 2-column cards grid on left (8 cols) + Right Sidebar (4 cols) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Main Listing Column -->
        <div class="lg:col-span-8">
          <!-- Loading skeleton state -->
          <div v-if="propertiesStore.loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="n in 4" :key="n" class="bg-white p-4 rounded shadow-sm space-y-4">
              <Skeleton height="200px" />
              <Skeleton height="24px" width="70%" />
              <Skeleton height="16px" width="50%" />
              <Skeleton height="20px" width="30%" />
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-else-if="propertiesStore.properties.length === 0"
            class="bg-white rounded-lg p-12 text-center border border-gray-100 shadow-subtle"
          >
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 text-[#00AEEF] flex items-center justify-center">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">No Properties Match Your Query</h3>
            <p class="text-xs text-gray-500 max-w-sm mx-auto mb-6">
              Try adjusting your search filters, price ranges, or selected cities to discover more available homes.
            </p>
            <button
              type="button"
              class="px-5 py-2.5 bg-[#00AEEF] text-white text-xs font-bold uppercase tracking-wider rounded"
              @click="resetAndBrowseAll"
            >
              Reset Filters & Show All
            </button>
          </div>

          <!-- Properties List (2-column grid or list view) -->
          <div
            v-else
            :class="[
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                : 'flex flex-col space-y-6'
            ]"
          >
            <PropertyCard
              v-for="prop in propertiesStore.paginatedProperties"
              :key="prop.id"
              :property="prop"
              :layout="viewMode"
            />
          </div>

          <!-- Pagination -->
          <div
            v-if="propertiesStore.totalPages > 1"
            class="mt-10 flex items-center justify-center gap-2"
          >
            <!-- Prev -->
            <button
              type="button"
              :disabled="propertiesStore.page === 1"
              :class="[
                'px-3 py-2 text-xs font-semibold rounded border transition-colors',
                propertiesStore.page === 1
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:border-[#00AEEF] hover:text-[#00AEEF] bg-white'
              ]"
              @click="goToPage(propertiesStore.page - 1)"
            >
              &larr; Prev
            </button>

            <!-- Page numbers -->
            <button
              v-for="p in propertiesStore.totalPages"
              :key="p"
              type="button"
              :class="[
                'w-9 h-9 text-xs font-bold rounded transition-colors',
                propertiesStore.page === p
                  ? 'bg-[#00AEEF] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#00AEEF] hover:text-[#00AEEF]'
              ]"
              @click="goToPage(p)"
            >
              {{ p }}
            </button>

            <!-- Next -->
            <button
              type="button"
              :disabled="propertiesStore.page === propertiesStore.totalPages"
              :class="[
                'px-3 py-2 text-xs font-semibold rounded border transition-colors',
                propertiesStore.page === propertiesStore.totalPages
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:border-[#00AEEF] hover:text-[#00AEEF] bg-white'
              ]"
              @click="goToPage(propertiesStore.page + 1)"
            >
              Next &rarr;
            </button>
          </div>
        </div>

        <!-- Right Sidebar (4 cols) -->
        <aside class="lg:col-span-4 space-y-8">
          <!-- Widget 1: Featured Listings Mini Carousel -->
          <div class="bg-white rounded-lg p-5 shadow-subtle border border-gray-100">
            <h3 class="text-sm font-bold uppercase tracking-wider text-[#0B3B66] pb-3 mb-4 border-b border-gray-100 flex items-center justify-between">
              <span>Featured Listings</span>
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  class="featured-prev-btn p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-[#00AEEF]"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  class="featured-next-btn p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-[#00AEEF]"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </h3>

            <swiper
              :modules="swiperModules"
              :slides-per-view="1"
              :loop="true"
              :navigation="{
                prevEl: '.featured-prev-btn',
                nextEl: '.featured-next-btn'
              }"
              class="w-full"
            >
              <swiper-slide v-for="feat in featuredItems" :key="feat.id">
                <div class="group cursor-pointer" @click="goToListing(feat.slug)">
                  <div class="relative h-44 rounded overflow-hidden mb-3">
                    <img :src="feat.images[0]" :alt="feat.title" class="w-full h-full object-cover card-hover-zoom" />
                    <!-- Price Overlay -->
                    <div class="absolute bottom-2 left-2 bg-[#00AEEF] text-white text-xs font-bold px-2 py-0.5 rounded shadow">
                      ${{ feat.price.toLocaleString() }} {{ feat.pricePostfix }}
                    </div>
                    <!-- Type Badge -->
                    <div class="absolute top-2 right-2 bg-black/60 text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                      {{ feat.typeName }}
                    </div>
                  </div>
                  <h4 class="text-sm font-semibold text-gray-900 group-hover:text-[#00AEEF] line-clamp-1 leading-snug">
                    {{ feat.title }}
                  </h4>
                  <p class="text-[11px] text-gray-400 mt-0.5 truncate">{{ feat.address }}</p>
                  <div class="flex items-center gap-3 text-[11px] text-gray-500 mt-2">
                    <span v-if="feat.beds > 0">{{ feat.beds }} Beds</span>
                    <span v-if="feat.baths > 0">&bull; {{ feat.baths }} Baths</span>
                    <span>&bull; {{ feat.sqft }} SqFt</span>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>

          <!-- Widget 2: Property Type Tree -->
          <div class="bg-white rounded-lg p-5 shadow-subtle border border-gray-100">
            <h3 class="text-sm font-bold uppercase tracking-wider text-[#0B3B66] pb-3 mb-4 border-b border-gray-100">
              Property Types
            </h3>
            <div class="space-y-4 text-xs">
              <!-- Residential Group -->
              <div>
                <span class="font-bold text-gray-400 uppercase tracking-wider text-[10px] block mb-2">Residential</span>
                <ul class="space-y-2 pl-2">
                  <li>
                    <router-link
                      to="/property-type/apartment"
                      class="text-[#00AEEF] hover:underline flex items-center justify-between"
                    >
                      <span class="flex items-center gap-1.5">
                        <svg class="w-3 h-3 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        Apartment
                      </span>
                      <span class="text-gray-400 text-[11px]">(28)</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/property-type/single-family-home"
                      class="text-[#00AEEF] hover:underline flex items-center justify-between"
                    >
                      <span class="flex items-center gap-1.5">
                        <svg class="w-3 h-3 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        Single Family Home
                      </span>
                      <span class="text-gray-400 text-[11px]">(22)</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/property-type/studio"
                      class="text-[#00AEEF] hover:underline flex items-center justify-between"
                    >
                      <span class="flex items-center gap-1.5">
                        <svg class="w-3 h-3 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        Studio
                      </span>
                      <span class="text-gray-400 text-[11px]">(14)</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/property-type/villa"
                      class="text-[#00AEEF] hover:underline flex items-center justify-between"
                    >
                      <span class="flex items-center gap-1.5">
                        <svg class="w-3 h-3 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        Villa
                      </span>
                      <span class="text-gray-400 text-[11px]">(19)</span>
                    </router-link>
                  </li>
                </ul>
              </div>

              <!-- Commercial Group -->
              <div class="pt-2 border-t border-gray-100">
                <span class="font-bold text-gray-400 uppercase tracking-wider text-[10px] block mb-2">Commercial</span>
                <ul class="space-y-2 pl-2">
                  <li>
                    <router-link
                      to="/property-type/office"
                      class="text-[#00AEEF] hover:underline flex items-center justify-between"
                    >
                      <span class="flex items-center gap-1.5">
                        <svg class="w-3 h-3 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        Office
                      </span>
                      <span class="text-gray-400 text-[11px]">(12)</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/property-type/shop"
                      class="text-[#00AEEF] hover:underline flex items-center justify-between"
                    >
                      <span class="flex items-center gap-1.5">
                        <svg class="w-3 h-3 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        Shop
                      </span>
                      <span class="text-gray-400 text-[11px]">(9)</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Widget 3: Cities List -->
          <div class="bg-white rounded-lg p-5 shadow-subtle border border-gray-100">
            <h3 class="text-sm font-bold uppercase tracking-wider text-[#0B3B66] pb-3 mb-4 border-b border-gray-100">
              Popular Cities
            </h3>
            <ul class="space-y-2 text-xs">
              <li>
                <router-link
                  to="/search?city=miami"
                  class="text-[#00AEEF] hover:underline flex items-center justify-between"
                >
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3 h-3 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    Miami, Florida
                  </span>
                  <span class="text-gray-400">(18)</span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/search?city=los-angeles"
                  class="text-[#00AEEF] hover:underline flex items-center justify-between"
                >
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3 h-3 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    Los Angeles, California
                  </span>
                  <span class="text-gray-400">(24)</span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/search?city=chicago"
                  class="text-[#00AEEF] hover:underline flex items-center justify-between"
                >
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3 h-3 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    Chicago, Illinois
                  </span>
                  <span class="text-gray-400">(15)</span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/search?city=new-york"
                  class="text-[#00AEEF] hover:underline flex items-center justify-between"
                >
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3 h-3 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    New York, New York
                  </span>
                  <span class="text-gray-400">(31)</span>
                </router-link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { scrollTo } from '../services/lenis'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import PropertyCard from '../components/property/PropertyCard.vue'
import Skeleton from '../components/ui/Skeleton.vue'
import { usePropertiesStore } from '../stores/properties'
import { api } from '../services/api'

const swiperModules = [Navigation]
const route = useRoute()
const router = useRouter()
const propertiesStore = usePropertiesStore()

const viewMode = ref('grid')
const sortValue = ref('newest')
const featuredItems = ref([])

const pageHeading = computed(() => {
  if (route.params.slug) {
    const slug = route.params.slug
    const formatName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
    return `${formatName} Listings`
  }
  if (route.query.status === 'for-sale') return 'Properties For Sale'
  if (route.query.status === 'for-rent') return 'Properties For Rent'
  if (route.query.city) {
    const cityName = route.query.city.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
    return `Properties in ${cityName}`
  }
  return 'Search Real Estate Listings'
})

const handleSortChange = () => {
  propertiesStore.setFilter('sort', sortValue.value)
  propertiesStore.fetchProperties()
}

const goToPage = (page) => {
  propertiesStore.page = page
  scrollTo(120, { duration: 1.0 })
}

const resetAndBrowseAll = () => {
  propertiesStore.resetFilters()
  router.push('/search')
}

const goToListing = (slug) => {
  router.push(`/property/${slug}`)
}

const syncAndLoad = () => {
  // If route is property-type
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

onMounted(async () => {
  syncAndLoad()
  featuredItems.value = await api.getFeaturedProperties(4)
})

watch(() => route.fullPath, () => {
  syncAndLoad()
})
</script>
