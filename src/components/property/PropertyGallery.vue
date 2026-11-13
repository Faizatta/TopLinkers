<template>
  <div class="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg select-none">
    <!-- View Switcher Tabs (Photos, Map) -->
    <div class="absolute top-4 right-4 z-20 flex items-center bg-black/60 backdrop-blur-md rounded-md p-1 gap-1 border border-white/10">
      <button
        type="button"
        :class="[
          'px-3 py-1.5 text-xs font-semibold rounded transition-all flex items-center gap-1.5',
          activeView === 'photos' ? 'bg-[#16B4E8] text-white shadow' : 'text-gray-300 hover:text-white'
        ]"
        @click="activeView = 'photos'"
      >
        <PhotoIcon class="w-3.5 h-3.5" />
        <span>Photos ({{ images.length }})</span>
      </button>

      <button
        type="button"
        :class="[
          'px-3 py-1.5 text-xs font-semibold rounded transition-all flex items-center gap-1.5',
          activeView === 'map' ? 'bg-[#16B4E8] text-white shadow' : 'text-gray-300 hover:text-white'
        ]"
        @click="activeView = 'map'"
      >
        <MapIcon class="w-3.5 h-3.5" />
        <span>Map View</span>
      </button>
    </div>

    <!-- VIEW 1: PHOTOS -->
    <div v-show="activeView === 'photos'" class="relative h-[260px] sm:h-[380px] md:h-[500px] w-full bg-black">
      <img
        :src="currentImage"
        :srcset="responsiveSrcset(currentImage, [600, 900, 1200])"
        sizes="(max-width: 1023px) 100vw, 840px"
        :alt="`${title} - TopLinkers Real Estate Gallery`"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="w-full h-full object-cover transition-opacity duration-300"
      />

      <!-- Left Arrow -->
      <button
        type="button"
        class="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-[#00AEEF] text-white flex items-center justify-center transition-colors"
        aria-label="Previous photo"
        @click="prev"
      >
        <ChevronLeftIcon class="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <!-- Right Arrow -->
      <button
        type="button"
        class="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-[#00AEEF] text-white flex items-center justify-center transition-colors"
        aria-label="Next photo"
        @click="next"
      >
        <ChevronRightIcon class="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <!-- Bottom Thumbnail Bar & Fullscreen Button -->
      <div class="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 flex items-center justify-between gap-2 z-10">
        <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 max-w-[66%] sm:max-w-[80%]">
          <button
            v-for="(img, idx) in images"
            :key="idx"
            type="button"
            :class="[
              'w-12 h-9 sm:w-16 sm:h-12 rounded overflow-hidden border-2 transition-all flex-shrink-0',
              activeIdx === idx ? 'border-[#00AEEF] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
            ]"
            @click="activeIdx = idx"
          >
            <img
              :src="img"
              :srcset="responsiveSrcset(img, [120, 240])"
              sizes="64px"
              class="w-full h-full object-cover"
              alt="Thumb"
              decoding="async"
            />
          </button>
        </div>

        <button
          type="button"
          class="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-black/60 hover:bg-[#00AEEF] text-white text-[11px] sm:text-xs font-semibold rounded flex items-center gap-1.5 transition-colors flex-shrink-0"
          @click="openFullscreen"
        >
          <ArrowsPointingOutIcon class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Enlarge</span>
        </button>
      </div>
    </div>

    <!-- VIEW 2: MAP (Leaflet) -->
    <div v-show="activeView === 'map'" class="relative h-[260px] sm:h-[380px] md:h-[500px] w-full bg-gray-200">
      <div ref="mapContainer" class="w-full h-full"></div>
    </div>


  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import {
  PhotoIcon,
  MapIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsPointingOutIcon
} from '@heroicons/vue/24/outline'
import { useUiStore } from '../../stores/ui'
import { responsiveSrcset } from '../../utils/images'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  lat: {
    type: Number,
    default: 33.6844
  },
  lng: {
    type: Number,
    default: 73.0479
  }
})

const ui = useUiStore()

const activeView = ref('photos')
const activeIdx = ref(0)
const mapContainer = ref(null)
let leafletMap = null
let marker = null

const currentImage = computed(() => {
  return props.images[activeIdx.value] || props.images[0] || ''
})

const prev = () => {
  if (props.images.length === 0) return
  activeIdx.value = (activeIdx.value - 1 + props.images.length) % props.images.length
}

const next = () => {
  if (props.images.length === 0) return
  activeIdx.value = (activeIdx.value + 1) % props.images.length
}

const openFullscreen = () => {
  ui.openLightbox(props.images, activeIdx.value)
}

const initMap = async () => {
  if (!mapContainer.value || leafletMap) return

  // Leaflet (JS + CSS) is only fetched when the visitor opens the Map tab,
  // so it no longer delays the property page's first render.
  const { default: L } = await import('../../utils/leaflet')
  if (!mapContainer.value || leafletMap || activeView.value !== 'map') return

  leafletMap = L.map(mapContainer.value).setView([props.lat, props.lng], 14)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(leafletMap)

  // Custom marker icon
  const customIcon = L.divIcon({
    className: 'custom-leaflet-pin',
    html: `<div style="background-color: #0B3B66; border: 3px solid #00AEEF; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); color: white;">
      <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  })

  marker = L.marker([props.lat, props.lng], { icon: customIcon }).addTo(leafletMap)
  marker.bindPopup(`<b>${props.title}</b><br>${props.address}`).openPopup()
}

watch(activeView, async (newView) => {
  if (newView === 'map') {
    await nextTick()
    if (!leafletMap) {
      await initMap()
    } else {
      leafletMap.invalidateSize()
    }
  }
})
</script>
