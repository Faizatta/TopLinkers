<template>
  <div class="min-h-screen bg-[#F6F8FA]">
    <!-- Top Breadcrumbs -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 text-xs text-slate-500 flex items-center gap-2">
        <router-link to="/" class="hover:text-[#0F2A44] transition-colors">Home</router-link>
        <span>/</span>
        <router-link to="/services" class="hover:text-[#0F2A44] transition-colors">Services</router-link>
        <span>/</span>
        <span class="font-bold text-[#0F2A44] truncate">{{ building.name || building.title }}</span>
      </div>
    </div>

    <!-- Cinematic Hero Section with Dynamic Background Cover -->
    <section class="relative bg-gradient-to-br from-[#07111D] via-[#0F2A44] to-[#142D42] text-white pt-16 pb-28 sm:pb-32 overflow-hidden">
      <!-- Background Image with Dark Vignette Overlay -->
      <div class="absolute inset-0 z-0">
        <img
          :src="building.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80'"
          :alt="building.title || building.name"
          class="w-full h-full object-cover opacity-25 filter blur-[1px] scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#07111D] via-[#0F2A44]/80 to-transparent"></div>
        <div class="absolute inset-0 bg-radial-vignette opacity-70"></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <!-- Top Pill Badges -->
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
          <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E53935] text-white shadow-md">
            HOT FEATURED PROJECT
          </span>
          <span v-if="building.badge" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#16B4E8] text-[#0F2A44] shadow-md">
            {{ building.badge }}
          </span>
          <span v-if="building.downPayment" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white shadow-md">
            {{ building.downPayment }}
          </span>
        </div>

        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl">
          {{ building.title || building.name }}
        </h1>

        <p class="mt-4 text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed font-normal">
          {{ building.subtitle || building.description }}
        </p>

        <!-- CTA Action Buttons -->
        <div class="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <a
            :href="whatsappUrl"
            target="_blank"
            class="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span>Book Via WhatsApp</span>
          </a>

          <a
            :href="`tel:${building.phone?.replace(/[^0-9]/g, '') || '+923349522157'}`"
            class="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
          >
            <svg class="w-4 h-4 text-[#16B4E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span>Call {{ building.phone || '0334-9522157' }}</span>
          </a>

          <button
            type="button"
            @click="uiStore.openBuildingModal()"
            class="px-6 py-3.5 rounded-xl bg-[#16B4E8] hover:bg-[#129bc7] text-[#0F2A44] font-black text-sm uppercase tracking-wider shadow-lg transition-all"
          >
            Open Interactive Modal
          </button>
        </div>
      </div>
    </section>

    <!-- Floating 4-Metric Fast Facts Dock -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
      <div class="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(15,42,68,0.12)] border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        <div class="text-center pt-2 sm:pt-0">
          <span class="text-[11px] font-black uppercase tracking-wider text-slate-400 block">Down Payment</span>
          <span class="text-xl sm:text-2xl font-black text-emerald-600 block mt-1">{{ building.downPayment || '20% Down' }}</span>
          <span class="text-[11px] text-slate-500 block mt-0.5">Flexible Installments</span>
        </div>
        <div class="text-center pt-2 sm:pt-0 sm:pl-4">
          <span class="text-[11px] font-black uppercase tracking-wider text-slate-400 block">Price Range</span>
          <span class="text-xl sm:text-2xl font-black text-[#0F2A44] block mt-1">{{ building.price || 'Market Rates' }}</span>
          <span class="text-[11px] text-slate-500 block mt-0.5">Commercial &amp; Residential</span>
        </div>
        <div class="text-center pt-2 sm:pt-0 sm:pl-4">
          <span class="text-[11px] font-black uppercase tracking-wider text-slate-400 block">Location</span>
          <span class="text-base sm:text-lg font-black text-[#16B4E8] block mt-1 truncate">{{ building.location || 'Islamabad' }}</span>
          <span class="text-[11px] text-slate-500 block mt-0.5">Prime Road Frontage</span>
        </div>
        <div class="text-center pt-2 sm:pt-0 sm:pl-4">
          <span class="text-[11px] font-black uppercase tracking-wider text-slate-400 block">Legal Status</span>
          <span class="text-xl sm:text-2xl font-black text-emerald-600 block mt-1">100% Verified</span>
          <span class="text-[11px] text-slate-500 block mt-0.5">CDA / RDA Clear Title</span>
        </div>
      </div>
    </div>

    <!-- Main Content Body -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <!-- Image Gallery & Architecture Showcase -->
      <section class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl sm:text-2xl font-black text-[#0F2A44]">Project Architecture &amp; Visuals</h2>
            <p class="text-xs text-slate-500 mt-1">High-resolution building elevations and interior suites</p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-[#16B4E8] border border-sky-100">
            {{ allImages.length }} Photos
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="md:col-span-2 rounded-2xl overflow-hidden h-72 sm:h-96 bg-slate-900 border border-slate-100 shadow-inner">
            <img
              :src="currentImage"
              :alt="building.title || building.name"
              class="w-full h-full object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
          <div class="flex flex-col gap-3 justify-between">
            <div
              v-for="(img, idx) in allImages.slice(0, 3)"
              :key="idx"
              @click="activeImageIndex = idx"
              class="h-24 sm:h-28 rounded-xl overflow-hidden cursor-pointer border-2 transition-all relative group"
              :class="activeImageIndex === idx ? 'border-[#16B4E8] shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'"
            >
              <img :src="img" :alt="`View ${idx+1}`" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>

      <!-- Overview and Detailed Narrative -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div class="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 class="text-xl sm:text-2xl font-black text-[#0F2A44]">Comprehensive Project Description</h2>
            <div class="h-1 w-16 bg-[#16B4E8] rounded-full mt-2"></div>
          </div>
          <p class="text-sm text-slate-600 leading-relaxed font-normal">
            {{ building.description }}
          </p>

          <!-- Specifications Table -->
          <div class="pt-4">
            <h3 class="text-base font-bold text-[#0F2A44] mb-3">Unit Specifications &amp; Payment Breakdown</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div
                v-for="(spec, sIdx) in (building.specs || defaultSpecs)"
                :key="sIdx"
                class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center"
              >
                <span class="text-[10px] uppercase font-bold text-slate-400 block">{{ spec.label }}</span>
                <span class="text-sm font-black text-[#0F2A44] block mt-1">{{ spec.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Features Checklist & Direct Contact -->
        <div class="space-y-6">
          <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 class="text-base font-bold text-[#0F2A44] mb-4">Features &amp; Amenities</h3>
            <ul class="space-y-2.5 text-xs text-slate-700">
              <li
                v-for="(feat, fIdx) in (building.features || defaultFeatures)"
                :key="fIdx"
                class="flex items-start gap-2.5"
              >
                <svg class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>

          <!-- Direct Advisory Card -->
          <div class="bg-gradient-to-br from-[#0B1D30] via-[#0F2A44] to-[#142D42] rounded-3xl p-6 text-white text-center shadow-lg">
            <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8] block mb-1">TopLinkers Priority Desk</span>
            <h4 class="text-lg font-black text-white">Book Your Unit Now</h4>
            <p class="text-xs text-slate-300 mt-2 leading-relaxed">
              Contact our sales engineers directly for live inventory reservation and on-site visits.
            </p>
            <a
              :href="whatsappUrl"
              target="_blank"
              class="mt-4 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-black text-xs uppercase tracking-wider block transition-all shadow"
            >
              WhatsApp Priority Booking
            </a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '../stores/admin'
import { useUiStore } from '../stores/ui'
import { updateSEOMeta } from '../services/seo'

const adminStore = useAdminStore()
const uiStore = useUiStore()

const activeImageIndex = ref(0)

const building = computed(() => {
  return adminStore.customBuilding || adminStore.defaultCustomBuilding
})

const allImages = computed(() => {
  const list = []
  if (building.value.image) list.push(building.value.image)
  if (Array.isArray(building.value.gallery)) {
    building.value.gallery.forEach(img => {
      if (img && !list.includes(img)) list.push(img)
    })
  }
  return list.length > 0 ? list : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80']
})

const currentImage = computed(() => {
  return allImages.value[activeImageIndex.value] || allImages.value[0]
})

const whatsappUrl = computed(() => {
  const msg = building.value.whatsappMsg || `Hello TopLinkers, I am inquiring about the featured building project: ${building.value.name || building.value.title}.`
  return `https://wa.me/923349522157?text=${encodeURIComponent(msg)}`
})

const defaultSpecs = [
  { label: 'Units', value: '1, 2 & 3 Bed' },
  { label: 'Down Payment', value: '20% Down' },
  { label: 'Installments', value: '2.5 Years' },
  { label: 'Possession', value: 'Dec 2027' }
]

const defaultFeatures = [
  'Prime Markaz commercial proximity',
  'Earthquake resistant seismic structure',
  'Double basement dedicated reserved parking',
  'Dual high-speed passenger & cargo elevators',
  '24/7 CCTV surveillance & armed security',
  'Dedicated power backup generator'
]

onMounted(() => {
  updateSEOMeta({
    title: `${building.value.title || building.value.name} | TopLinkers Featured Project`,
    description: building.value.subtitle || building.value.description,
    keywords: 'building project Islamabad, luxury apartments, commercial plaza, Banu Hafeez, TopLinkers'
  })
})
</script>
