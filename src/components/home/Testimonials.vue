<template>
  <section class="py-20 md:py-24 bg-[#F6F8FA] overflow-hidden select-none">
    <div class="max-w-[1280px] mx-auto px-4 mb-10 sm:mb-14">
      <SectionHeading
        eyebrow="WHAT OUR CLIENTS SAY"
        title="Trusted By Thousands of Property Owners"
        highlight="Thousands"
        subtitle="Genuine feedback from property buyers, commercial landlords, and overseas Pakistani investors."
        align="center"
      />
    </div>

    <!-- Infinite Scrolling Marquee Container with Gradient Edge Fades (Pause on Hover) -->
    <div class="relative w-full overflow-hidden pause-on-hover space-y-5">
      <!-- Left & Right Gradient Edge Fades (Smooth fade in and out) -->
      <div class="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-44 bg-gradient-to-r from-[#F6F8FA] to-transparent z-20 hidden sm:block"></div>
      <div class="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-44 bg-gradient-to-l from-[#F6F8FA] to-transparent z-20 hidden sm:block"></div>

      <!-- Marquee Row 1 (Slides Left) -->
      <div class="flex items-center gap-5 sm:gap-6 animate-marquee [--duration:45s]">
        <!-- Duplicated array to create a completely seamless infinite loop -->
        <div
          v-for="(t, idx) in [...testimonials, ...testimonials]"
          :key="`row1-${t.id}-${idx}`"
          class="w-[300px] sm:w-[380px] flex-shrink-0 bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#16B4E8] flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5"
        >
          <div>
            <!-- Top Row: 5 Stars + Verified Badge -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-1 text-amber-400">
                <StarIcon v-for="s in (t.rating || 5)" :key="s" class="w-4 h-4" />
              </div>

              <span class="inline-flex items-center gap-1 text-[9px] font-black uppercase text-[#16B4E8] bg-[#16B4E8]/10 px-2.5 py-0.5 rounded-full">
                <CheckBadgeIcon class="w-3.5 h-3.5 text-[#16B4E8]" />
                <span>Verified Client</span>
              </span>
            </div>

            <!-- Quote Text -->
            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-5 line-clamp-4">
              "{{ t.quote }}"
            </p>
          </div>

          <!-- Author Info & Project Chip -->
          <div class="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div
                class="w-11 h-11 rounded-full bg-gradient-to-br from-[#0F2A44] to-[#16B4E8] text-white font-black text-base flex items-center justify-center border-2 border-[#16B4E8]/30 group-hover:border-[#16B4E8] transition-colors flex-shrink-0 shadow-xs"
                :aria-label="t.name"
              >
                {{ getFirstLetter(t.name) }}
              </div>
              <div class="min-w-0">
                <h3 class="text-xs sm:text-sm font-extrabold text-[#0F2A44] leading-tight truncate group-hover:text-[#16B4E8] transition-colors">
                  {{ t.name }}
                </h3>
                <p class="text-[10px] text-gray-400 font-semibold truncate mt-0.5">
                  {{ t.role }}
                </p>
              </div>
            </div>

            <!-- Project Chip -->
            <span v-if="t.project" class="text-[9px] font-extrabold text-[#0F2A44] bg-gray-100 px-2 py-1 rounded-md flex-shrink-0 max-w-[120px] truncate hidden sm:inline-block">
              {{ t.project }}
            </span>
          </div>
        </div>
      </div>

      <!-- Marquee Row 2 (Slides Right - Reverse) -->
      <div class="flex items-center gap-5 sm:gap-6 animate-marquee-reverse [--duration:50s]">
        <div
          v-for="(t, idx) in [...reverseTestimonials, ...reverseTestimonials]"
          :key="`row2-${t.id}-${idx}`"
          class="w-[300px] sm:w-[380px] flex-shrink-0 bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#16B4E8] flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5"
        >
          <div>
            <!-- Top Row: 5 Stars + Verified Badge -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-1 text-amber-400">
                <StarIcon v-for="s in (t.rating || 5)" :key="s" class="w-4 h-4" />
              </div>

              <span class="inline-flex items-center gap-1 text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <CheckBadgeIcon class="w-3.5 h-3.5 text-emerald-600" />
                <span>5-Star Verified</span>
              </span>
            </div>

            <!-- Quote Text -->
            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-5 line-clamp-4">
              "{{ t.quote }}"
            </p>
          </div>

          <!-- Author Info & Project Chip -->
          <div class="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div
                class="w-11 h-11 rounded-full bg-gradient-to-br from-[#0F2A44] to-[#16B4E8] text-white font-black text-base flex items-center justify-center border-2 border-[#16B4E8]/30 group-hover:border-[#16B4E8] transition-colors flex-shrink-0 shadow-xs"
                :aria-label="t.name"
              >
                {{ getFirstLetter(t.name) }}
              </div>
              <div class="min-w-0">
                <h3 class="text-xs sm:text-sm font-extrabold text-[#0F2A44] leading-tight truncate group-hover:text-[#16B4E8] transition-colors">
                  {{ t.name }}
                </h3>
                <p class="text-[10px] text-gray-400 font-semibold truncate mt-0.5">
                  {{ t.location || t.role }}
                </p>
              </div>
            </div>

            <!-- Project Chip -->
            <span v-if="t.project" class="text-[9px] font-extrabold text-[#0F2A44] bg-gray-100 px-2 py-1 rounded-md flex-shrink-0 max-w-[120px] truncate hidden sm:inline-block">
              {{ t.project }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { StarIcon, CheckBadgeIcon } from '@heroicons/vue/24/solid'
import SectionHeading from '../ui/SectionHeading.vue'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()

const testimonials = computed(() => adminStore.reviews || [])

const reverseTestimonials = computed(() => {
  return [...testimonials.value].reverse()
})

const getFirstLetter = (name) => {
  if (!name) return 'T'
  const match = String(name).trim().match(/[a-zA-Z]/)
  return match ? match[0].toUpperCase() : String(name).trim().charAt(0).toUpperCase()
}

onMounted(() => {
  adminStore.syncFromBackend()
})
</script>
