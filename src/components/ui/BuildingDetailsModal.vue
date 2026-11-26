<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-[#07111D]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        @click.self="close"
      >
        <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-scale-up">
          <!-- Top Hero Image Banner -->
          <div class="relative h-56 sm:h-64 w-full bg-slate-900 flex-shrink-0">
            <img
              :src="currentImage"
              :alt="building.title || building.name"
              class="w-full h-full object-cover transition-all duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/40 to-black/20"></div>

            <!-- Top Pills -->
            <div class="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E53935] text-white shadow-md">
                FEATURED BUILDING
              </span>
              <span v-if="building.badge" class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#16B4E8] text-[#0F2A44] shadow-md">
                {{ building.badge }}
              </span>
            </div>

            <button
              type="button"
              @click="close"
              class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md z-10"
              aria-label="Close modal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <!-- Bottom Title in Cover Image -->
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <span class="text-[10px] font-bold text-[#16B4E8] uppercase tracking-wider block mb-0.5">
                {{ building.tag || building.location || 'Islamabad' }}
              </span>
              <h3 class="text-xl sm:text-2xl font-black text-white leading-tight">
                {{ building.title || building.name }}
              </h3>
              <p class="text-xs text-slate-200 flex items-center gap-1.5 mt-1 font-medium">
                <svg class="w-3.5 h-3.5 text-[#16B4E8] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                <span>{{ building.location || 'Islamabad' }}</span>
              </p>
            </div>
          </div>

          <!-- Thumbnail Gallery Bar (if multiple photos) -->
          <div v-if="allImages.length > 1" class="px-5 py-2.5 bg-slate-900/90 flex items-center gap-2 overflow-x-auto flex-shrink-0 border-b border-white/10">
            <button
              v-for="(img, idx) in allImages"
              :key="idx"
              type="button"
              @click="activeImageIndex = idx"
              class="w-14 h-10 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0"
              :class="activeImageIndex === idx ? 'border-[#16B4E8] scale-105' : 'border-white/20 opacity-60 hover:opacity-100'"
            >
              <img :src="img" :alt="`Photo ${idx+1}`" class="w-full h-full object-cover" />
            </button>
          </div>

          <!-- Scrollable Body Content -->
          <div class="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
            <!-- 4 Key Fast Facts Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span class="text-[10px] text-slate-400 font-bold uppercase block">Down Payment</span>
                <span class="text-sm sm:text-base font-black text-emerald-600 block mt-0.5">{{ building.downPayment || '20% Down' }}</span>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span class="text-[10px] text-slate-400 font-bold uppercase block">
                  {{ building.offerEnabled && building.offerBadge ? building.offerBadge : 'Price Range' }}
                </span>
                <span v-if="building.offerEnabled && building.previousPrice" class="text-[11px] font-medium text-slate-400 line-through block mt-0.5">
                  {{ building.previousPrice }}
                </span>
                <span class="text-sm sm:text-base font-black text-[#0F2A44] block mt-0.5">{{ building.price || 'Market Rates' }}</span>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span class="text-[10px] text-slate-400 font-bold uppercase block">Highlight ROI</span>
                <span class="text-sm sm:text-base font-black text-[#16B4E8] block mt-0.5">{{ building.badge || 'High Yield' }}</span>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span class="text-[10px] text-slate-400 font-bold uppercase block">Registry Title</span>
                <span class="text-sm sm:text-base font-black text-[#0F2A44] block mt-0.5">100% Verified</span>
              </div>
            </div>

            <!-- Overview Description -->
            <div>
              <h4 class="font-extrabold text-[#0F2A44] text-sm uppercase tracking-wide mb-1.5">Project Overview &amp; Architecture</h4>
              <p class="text-xs text-slate-600 leading-relaxed font-normal">
                {{ building.description }}
              </p>
            </div>

            <!-- Key Features / Amenities -->
            <div v-if="building.features && building.features.length > 0">
              <h4 class="font-extrabold text-[#0F2A44] text-sm uppercase tracking-wide mb-2.5">Building Features &amp; Infrastructure</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div
                  v-for="(feat, fIdx) in building.features"
                  :key="fIdx"
                  class="flex items-center gap-2 p-2 rounded-lg bg-sky-50/50 border border-sky-100/60 text-slate-700"
                >
                  <svg class="w-4 h-4 text-[#16B4E8] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  <span>{{ feat }}</span>
                </div>
              </div>
              <p v-if="building.structuralDisclaimer" class="text-[10px] text-slate-400 italic pt-2 leading-normal">
                {{ building.structuralDisclaimer }}
              </p>
            </div>

            <!-- Custom Sections added from Admin -->
            <div v-if="Array.isArray(building.customSections) && building.customSections.length > 0" class="space-y-3 pt-1">
              <div
                v-for="(sec, sIdx) in building.customSections"
                :key="sIdx"
                class="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
              >
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-extrabold text-[#0F2A44] text-xs uppercase tracking-wide">{{ sec.title }}</h4>
                  <span v-if="sec.badge" class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#16B4E8]/15 text-[#0F2A44]">
                    {{ sec.badge }}
                  </span>
                </div>
                <p class="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{{ sec.content }}</p>
              </div>
            </div>
          </div>

          <!-- Sticky Footer Actions -->
          <div class="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
            <div class="text-[11px] text-slate-500 text-center sm:text-left flex items-center gap-2">
              <router-link
                to="/featured-building"
                @click="close"
                class="inline-flex items-center gap-1 font-bold text-[#16B4E8] hover:text-[#0F2A44] transition-colors underline underline-offset-2"
              >
                <span>Full Project Page &rarr;</span>
              </router-link>
              <span class="text-slate-300">&bull;</span>
              <span>Direct Advisory:</span> <strong class="text-[#0F2A44]">{{ building.phone || '0334-9522157' }}</strong>
            </div>

            <div class="flex items-center gap-2.5 w-full sm:w-auto">
              <router-link
                to="/featured-building"
                @click="close"
                class="hidden sm:inline-flex px-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-[#0F2A44] bg-white text-[#0F2A44] text-xs font-bold text-center transition-all items-center justify-center gap-1.5"
              >
                <span>Full Page View</span>
              </router-link>

              <a
                :href="`tel:${building.phone?.replace(/[^0-9]/g, '') || '+923349522157'}`"
                class="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 hover:border-[#0F2A44] bg-white text-[#0F2A44] text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
              >
                <span>Call Engineer</span>
              </a>

              <a
                :href="whatsappUrl"
                target="_blank"
                class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-black uppercase tracking-wider text-center transition-all shadow flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>WhatsApp Booking</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '../../stores/admin'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  building: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const DEFAULT_BUILDING_GALLERY = [
  '/images/faisal-heights/fh-main.webp',
  '/images/faisal-heights/fh-building.webp',
  '/images/faisal-heights/fh-1bed.webp',
  '/images/faisal-heights/fh-2bed.webp',
  '/images/faisal-heights/fh-3bed.webp'
]

const adminStore = useAdminStore()
const building = computed(() => (props.building && Object.keys(props.building).length > 0) ? props.building : (adminStore.customBuilding || {}))

const activeImageIndex = ref(0)

const allImages = computed(() => {
  const list = []
  const b = building.value
  if (b?.image && !b.image.includes('banu-hafeez')) list.push(b.image)
  if (Array.isArray(b?.gallery)) {
    b.gallery.forEach(img => {
      if (img && !img.includes('banu-hafeez') && !list.includes(img)) list.push(img)
    })
  }
  const cleanList = list.filter(img => typeof img === 'string' && !img.includes('unsplash.com'))
  return cleanList.length > 0 ? cleanList : DEFAULT_BUILDING_GALLERY
})

const currentImage = computed(() => {
  return allImages.value[activeImageIndex.value] || allImages.value[0] || DEFAULT_BUILDING_GALLERY[0]
})

const whatsappUrl = computed(() => {
  const b = building.value
  const msg = b.whatsappMsg || `Hello TopLinkers, I am inquiring about the featured building project: ${b.name || b.title}.`
  return `https://wa.me/923349522157?text=${encodeURIComponent(msg)}`
})

const close = () => {
  emit('close')
}
</script>
