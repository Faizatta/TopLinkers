<template>
  <section class="py-20 md:py-24 bg-white">
    <div class="max-w-[1280px] mx-auto px-4">
      <SectionHeading
        eyebrow="FEATURED LOCATIONS"
        title="Explore Properties In Top Locations"
        highlight="Top Locations"
        subtitle="The highest capital-gain corridors and premium residential zones in Islamabad & Rawalpindi."
        align="center"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        <router-link
          v-for="loc in locations"
          :key="loc.id"
          :to="loc.featuredLink || `/listings?city=${encodeURIComponent(loc.name.split(' ')[0])}`"
          class="group block bg-[#F6F8FA] rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 border border-gray-100"
        >
          <!-- Tall city/society photo on top -->
          <div class="relative h-64 overflow-hidden bg-gray-100">
            <img
              :src="loc.image"
              :alt="loc.name"
              loading="lazy"
              decoding="async"
              width="400"
              height="256"
              class="w-full h-full object-cover card-hover-zoom"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
            <div class="absolute bottom-3 left-3 text-white">
              <span class="text-[10px] font-bold uppercase tracking-wider bg-[#16B4E8] px-2 py-0.5 rounded">
                {{ loc.city }}
              </span>
            </div>
          </div>

          <!-- Underneath: city/area name in bold + "12 Properties" -->
          <div class="p-5 text-center">
            <h3 class="text-base font-extrabold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors leading-snug">
              {{ loc.name }}
            </h3>
            <span class="text-xs text-gray-500 font-semibold block mt-1">
              {{ loc.count }} Properties Listed
            </span>
            <p class="text-[11px] text-gray-400 mt-1 line-clamp-1">
              {{ loc.tagline }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SectionHeading from '../ui/SectionHeading.vue'
import { api } from '../../services/api'

const locations = ref([])

onMounted(async () => {
  locations.value = await api.getLocations()
})
</script>
