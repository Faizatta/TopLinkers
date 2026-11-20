<template>
  <div
    v-if="isOpen && sector"
    class="fixed inset-0 z-50 bg-[#07111D]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    @click.self="emit('close')"
  >
    <div
      class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-scale-up"
      role="dialog"
      aria-modal="true"
    >
      <!-- 1. Modal Top Image & Gallery Banner -->
      <div class="relative bg-slate-900 flex-shrink-0">
        <!-- Main Active Image -->
        <div class="relative h-56 sm:h-64 w-full overflow-hidden">
          <img
            :src="activeImage"
            :alt="sector.title"
            class="w-full h-full object-cover transition-all duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

          <!-- Sector Badge -->
          <span
            class="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-md"
            :class="sector.badgeClass || 'bg-[#16B4E8] text-[#0F2A44]'"
          >
            {{ sector.badge }}
          </span>

          <!-- Close Button -->
          <button
            type="button"
            @click="emit('close')"
            class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md z-10 cursor-pointer"
            aria-label="Close details"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>

          <!-- Image Caption & Counter -->
          <div class="absolute bottom-3 left-4 right-4 text-white flex items-end justify-between gap-2">
            <div>
              <span class="text-[10px] font-bold text-[#16B4E8] uppercase tracking-wider block mb-0.5">
                {{ sector.tag }}
              </span>
              <h3 class="text-lg sm:text-xl font-black text-white leading-tight">
                {{ sector.name }}
              </h3>
              <p class="text-[11px] text-slate-300 flex items-center gap-1.5 mt-0.5">
                <MapPinIcon class="w-3.5 h-3.5 text-[#16B4E8] flex-shrink-0" />
                <span>{{ sector.location }}</span>
              </p>
            </div>
            <span v-if="activeCaption" class="hidden sm:inline-block text-[10px] bg-black/60 px-2.5 py-1 rounded-md text-slate-200 border border-white/20">
              {{ activeCaption }}
            </span>
          </div>
        </div>

        <!-- 2. Few Images Thumbnails Gallery Strip -->
        <div
          v-if="sector.gallery && sector.gallery.length > 1"
          class="bg-slate-950 p-2.5 flex items-center gap-2 overflow-x-auto border-t border-slate-800"
        >
          <button
            v-for="(img, idx) in sector.gallery"
            :key="idx"
            type="button"
            @click="selectImage(img.src, img.caption)"
            class="relative w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer group"
            :class="activeImage === img.src ? 'border-[#16B4E8] ring-2 ring-[#16B4E8]/40 scale-105' : 'border-transparent opacity-60 hover:opacity-100'"
          >
            <img :src="img.src" :alt="img.caption || 'Thumbnail'" class="w-full h-full object-cover" />
            <span class="absolute inset-0 bg-black/20 group-hover:bg-transparent"></span>
          </button>
          <span class="text-[10px] text-slate-400 font-semibold px-2 whitespace-nowrap">
            {{ sector.gallery.length }} Authentic On-Ground Photos
          </span>
        </div>
      </div>

      <!-- 3. Scrollable Modal Body -->
      <div class="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
        <!-- Overview Description -->
        <div>
          <h4 class="font-extrabold text-[#0F2A44] text-sm uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[#16B4E8]"></span>
            <span>Sector Overview &amp; Mandate</span>
          </h4>
          <p class="text-xs text-slate-600 leading-relaxed font-normal">
            {{ sector.description }}
          </p>
        </div>

        <!-- Apartment Types & Price Breakdown Table -->
        <div>
          <h4 class="font-extrabold text-[#0F2A44] text-sm uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Apartment Categories &amp; Live Demand Rates</span>
          </h4>
          <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b border-slate-200">
                  <th class="py-2.5 px-3.5">Apartment Type</th>
                  <th class="py-2.5 px-3.5">Area &amp; Specs</th>
                  <th class="py-2.5 px-3.5 text-right">Cash Demand</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium">
                <tr v-for="(t, tIdx) in sector.types" :key="tIdx" class="hover:bg-slate-50/60">
                  <td class="py-2.5 px-3.5 font-bold text-[#0F2A44]">{{ t.type }}</td>
                  <td class="py-2.5 px-3.5 text-slate-600">
                    <span class="font-semibold text-slate-800">{{ t.area }}</span>
                    <span class="block text-[10px] text-slate-400">{{ t.specs }}</span>
                  </td>
                  <td class="py-2.5 px-3.5 font-black text-[#16B4E8] text-right whitespace-nowrap">{{ t.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Amenities & Infrastructure Grid -->
        <div>
          <h4 class="font-extrabold text-[#0F2A44] text-sm uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[#0F2A44]"></span>
            <span>Approved Facilities &amp; Infrastructure</span>
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div
              v-for="(feat, fIdx) in sector.features"
              :key="fIdx"
              class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
            >
              <CheckCircleIcon class="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span class="text-[11px] font-bold text-slate-700">{{ feat }}</span>
            </div>
          </div>
        </div>

        <!-- Legal CDA Biometric Transfer Notice -->
        <div class="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-start gap-3">
          <ShieldCheckIcon class="w-5 h-5 text-[#16B4E8] flex-shrink-0 mt-0.5" />
          <div>
            <span class="font-black text-[#0F2A44] block text-xs">100% CDA Biometric Title Transfer</span>
            <p class="text-[11px] text-slate-600 leading-relaxed mt-0.5">
              TopLinkers executes direct file verification, legal NDC clearance, and biometric transfer at Pakistan Housing Authority Foundation Headquarters. Complete peace of mind with 100% genuine allotment files.
            </p>
          </div>
        </div>

        <!-- On-Ground Video Walkthrough (Positioned at End of Card) -->
        <div v-if="sector.videoUrl" class="pt-2">
          <SiteVideoPlayer
            :video-url="sector.videoUrl"
            :title="`${sector.name} — On-Ground Video Tour`"
            caption="Verified PHA tower elevation, road access, and completed interiors."
          />
        </div>
      </div>

      <!-- 4. Sticky Modal Footer Actions -->
      <div class="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
        <div class="text-[11px] text-slate-500 text-center sm:text-left">
          <span>PHA Direct Desk:</span> <strong class="text-[#0F2A44]">0334-9522157</strong>
        </div>

        <div class="flex items-center gap-2.5 w-full sm:w-auto">
          <router-link
            :to="sector.listingsLink || '/listings?search=PHA'"
            @click="emit('close')"
            class="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 hover:border-[#0F2A44] bg-white text-[#0F2A44] text-xs font-bold text-center transition-all shadow-xs"
          >
            View in Listings &rarr;
          </router-link>

          <a
            :href="`https://wa.me/923349522157?text=${encodeURIComponent(sector.whatsappMsg || `Hello TopLinkers, I am inquiring about ${sector.name}`)}`"
            target="_blank"
            class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-black uppercase tracking-wider text-center transition-all shadow flex items-center justify-center gap-1.5"
          >
            <span>WhatsApp Inquire</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { XMarkIcon, CheckCircleIcon, ShieldCheckIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import SiteVideoPlayer from '../common/SiteVideoPlayer.vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  sector: { type: Object, default: null }
})

const emit = defineEmits(['close'])

const activeImage = ref('')
const activeCaption = ref('')

watch(
  () => props.sector,
  (newSec) => {
    if (newSec) {
      activeImage.value = newSec.image || (newSec.gallery?.[0]?.src ?? '')
      activeCaption.value = newSec.gallery?.[0]?.caption || ''
    }
  },
  { immediate: true }
)

const selectImage = (src, caption) => {
  activeImage.value = src
  activeCaption.value = caption || ''
}
</script>
