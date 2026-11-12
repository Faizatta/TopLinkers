<template>
  <div class="relative w-full h-full min-h-[500px] bg-slate-100 overflow-hidden select-none">
    <!-- Leaflet map DOM element -->
    <div ref="mapContainer" class="w-full h-full z-0"></div>

    <!-- Top Bar Navigation & Controls -->
    <div class="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
      <!-- Jumper Controls & Counter -->
      <div class="flex items-center gap-2 pointer-events-auto">
        <div class="flex items-center bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden text-xs">
          <button
            type="button"
            class="px-3 py-2 font-bold text-[#0F2A44] hover:bg-[#16B4E8] hover:text-white transition-colors flex items-center gap-1 border-r border-gray-200"
            @click="jumpPrev"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
            <span>Prev Pin</span>
          </button>
          <button
            type="button"
            class="px-3 py-2 font-bold text-[#0F2A44] hover:bg-[#16B4E8] hover:text-white transition-colors flex items-center gap-1"
            @click="jumpNext"
          >
            <span>Next Pin</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <div class="hidden sm:flex items-center gap-2 bg-[#0F2A44]/95 backdrop-blur-sm text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg border border-white/10">
          <span class="w-2 h-2 rounded-full bg-[#16B4E8] animate-pulse"></span>
          <span>{{ properties.length }} Listings</span>
        </div>
      </div>

      <!-- Right Action Buttons (Fit All & Fullscreen) -->
      <div class="flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          class="bg-white/95 hover:bg-white text-[#0F2A44] px-3 py-2 rounded-xl text-xs font-bold shadow-lg border border-gray-200 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          @click="fitAllMarkers"
          title="Reset map view"
        >
          <svg class="w-3.5 h-3.5 text-[#16B4E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
          <span>Fit All</span>
        </button>

        <button
          type="button"
          class="bg-white/95 hover:bg-white text-[#0F2A44] p-2 rounded-xl text-xs font-bold shadow-lg border border-gray-200 transition-all hover:scale-105 active:scale-95"
          @click="toggleFullscreen"
          title="Toggle Fullscreen"
        >
          <svg class="w-4 h-4 text-[#0F2A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from '../../utils/leaflet'

const props = defineProps({
  properties: {
    type: Array,
    default: () => []
  },
  hoveredId: {
    type: String,
    default: null
  }
})

const mapContainer = ref(null)
let map = null
let markersMap = new Map()
let currentIndex = 0

const initMap = () => {
  if (!mapContainer.value || map) return

  // Center on Islamabad / Rawalpindi
  map = L.map(mapContainer.value, {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView([33.6015, 73.0180], 11)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  renderMarkers()
}

const formatMarkerPrice = (p) => {
  if (p.priceFormatted) return p.priceFormatted
  if (p.price >= 10000000) return `PKR ${(p.price / 10000000).toFixed(1)} Cr`
  if (p.price >= 100000) return `PKR ${Math.round(p.price / 100000)} Lac`
  return `PKR ${p.price.toLocaleString()}`
}

const renderMarkers = () => {
  if (!map) return

  // Clear existing
  markersMap.forEach(m => map.removeLayer(m))
  markersMap.clear()

  const bounds = []

  props.properties.forEach((p, idx) => {
    if (!p.lat || !p.lng) return

    const priceLabel = formatMarkerPrice(p)

    // White rounded pill marker icon
    const icon = L.divIcon({
      className: 'custom-pill-icon',
      html: `<div id="marker-${p.id}" class="leaflet-pill-marker">
        <span>${priceLabel}</span>
      </div>`,
      iconSize: [85, 26],
      iconAnchor: [42, 13]
    })

    const marker = L.marker([p.lat, p.lng], { icon }).addTo(map)

    // Interactive popup card
    const popupContent = `
      <div style="width: 230px; font-family: 'Plus Jakarta Sans', sans-serif;">
        <div style="height: 120px; width: 100%; overflow: hidden; position: relative;">
          <img src="${p.images[0]}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; top: 6px; left: 6px; background: #6CC24A; color: white; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 2px;">
            ${p.badge || 'FOR SALE'}
          </div>
        </div>
        <div style="padding: 10px 12px;">
          <div style="color: #16B4E8; font-size: 13px; font-weight: 800;">${priceLabel}</div>
          <div style="color: #0F2A44; font-size: 12px; font-weight: 700; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${p.title}
          </div>
          <div style="color: #64748b; font-size: 10px; margin-top: 2px;">${p.address}</div>
          <div style="display: flex; gap: 8px; font-size: 10px; color: #475569; margin-top: 6px; border-top: 1px solid #f1f5f9; padding-top: 6px;">
            ${p.beds > 0 ? `<span><b>${p.beds}</b> Beds</span>` : ''}
            ${p.baths > 0 ? `<span>&bull; <b>${p.baths}</b> Baths</span>` : ''}
            <span>&bull; ${p.sqft} SqFt</span>
          </div>
          <a href="/property/${p.slug}" style="display: block; margin-top: 8px; background: #0F2A44; color: white; text-align: center; padding: 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; border-radius: 3px; text-decoration: none;">
            View Property &rarr;
          </a>
        </div>
      </div>
    `

    marker.bindPopup(popupContent, { maxWidth: 260, minWidth: 230 })

    marker.on('click', () => {
      currentIndex = idx
    })

    markersMap.set(p.id, marker)
    bounds.push([p.lat, p.lng])
  })

  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
  }
}

const fitAllMarkers = () => {
  if (!map) return
  const bounds = []
  props.properties.forEach(p => {
    if (p.lat && p.lng) bounds.push([p.lat, p.lng])
  })
  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [40, 40] })
  }
}

const jumpNext = () => {
  if (props.properties.length === 0 || !map) return
  currentIndex = (currentIndex + 1) % props.properties.length
  const target = props.properties[currentIndex]
  const m = markersMap.get(target.id)
  if (m) {
    map.flyTo([target.lat, target.lng], 14, { duration: 0.8 })
    m.openPopup()
  }
}

const jumpPrev = () => {
  if (props.properties.length === 0 || !map) return
  currentIndex = (currentIndex - 1 + props.properties.length) % props.properties.length
  const target = props.properties[currentIndex]
  const m = markersMap.get(target.id)
  if (m) {
    map.flyTo([target.lat, target.lng], 14, { duration: 0.8 })
    m.openPopup()
  }
}

const toggleFullscreen = () => {
  if (!mapContainer.value) return
  if (!document.fullscreenElement) {
    mapContainer.value.requestFullscreen().catch(err => console.warn(err))
  } else {
    document.exitFullscreen()
  }
}

watch(() => props.properties, () => {
  renderMarkers()
}, { deep: true })

watch(() => props.hoveredId, (newId) => {
  if (!newId) return
  const m = markersMap.get(newId)
  if (m) {
    const el = document.getElementById(`marker-${newId}`)
    if (el) el.classList.add('active')
  }
})

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>
