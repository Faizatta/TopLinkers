<template>
  <section
    class="py-20 md:py-24 bg-[#F6F8FA] select-none overflow-hidden"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <div class="max-w-[1280px] mx-auto px-4">
      <!-- Luxury Dark-Navy Animated Executive Bento Showcase -->
      <div class="rounded-[2rem] bg-gradient-to-br from-[#081523] via-[#0F2A44] to-[#0B2036] p-7 sm:p-10 md:p-14 shadow-[0_25px_70px_-15px_rgba(15,42,68,0.45)] border border-slate-800 relative overflow-hidden text-white">
        <!-- Animated Ambient Glows -->
        <div class="absolute -top-28 -left-28 w-96 h-96 rounded-full bg-[#16B4E8]/15 blur-3xl animate-pulse-slow pointer-events-none"></div>
        <div class="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl animate-pulse-slow pointer-events-none" style="animation-delay: 1.5s"></div>

        <!-- Subtle Architectural Grid Texture -->
        <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: radial-gradient(#16B4E8 1px, transparent 1px); background-size: 24px 24px;"></div>

        <!-- Top Animated Progress Accent Line -->
        <div class="absolute top-0 inset-x-0 h-1 bg-white/10">
          <div
            class="h-full bg-gradient-to-r from-[#16B4E8] via-cyan-300 to-emerald-400 transition-all duration-500 ease-out"
            :style="{ width: `${((activeIndex + 1) / pillars.length) * 100}%` }"
          ></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          <!-- LEFT COLUMN: Dynamic Auto-Animated Spotlight & Core Narrative -->
          <div class="lg:col-span-5 space-y-6">
            <div class="flex items-center justify-between">
              <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-[#16B4E8]/15 border border-[#16B4E8]/30 text-[#16B4E8] text-[10px] font-black uppercase tracking-widest rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8] animate-ping"></span>
                <span>Why Choose Top Linkers</span>
              </div>

              <!-- Auto-Cycle Pill Indicators -->
              <div class="flex items-center gap-1.5">
                <button
                  v-for="(item, idx) in pillars"
                  :key="item.id"
                  type="button"
                  @click="setActive(idx)"
                  :aria-label="`Highlight ${item.title}`"
                  class="h-1.5 rounded-full transition-all duration-300"
                  :class="activeIndex === idx ? 'w-7 bg-[#16B4E8]' : 'w-2 bg-white/20 hover:bg-white/40'"
                ></button>
              </div>
            </div>

            <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-[1.15] tracking-tight">
              Everything You Need in
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#16B4E8] to-cyan-300">
                Real Estate, Construction &amp; Solar
              </span>
            </h2>

            <!-- Live Animated Feature Spotlight Card (Cycles Automatically Every 3.5s) -->
            <div class="rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/15 p-5 relative overflow-hidden">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                  0{{ activeIndex + 1 }} / 0{{ pillars.length }} &bull; Active Division Spotlight
                </span>
                <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/20">
                  {{ currentPillar.metric }}
                </span>
              </div>

              <transition name="spotlight-swap" mode="out-in">
                <div :key="currentPillar.id" class="space-y-2">
                  <h3 class="text-lg font-extrabold text-white">
                    {{ currentPillar.title }}
                  </h3>
                  <p class="text-xs text-slate-300 leading-relaxed">
                    {{ currentPillar.spotlightText }}
                  </p>
                </div>
              </transition>
            </div>

            <!-- 3 Trust Guarantee Checks -->
            <div class="space-y-2.5 text-xs font-semibold text-slate-200">
              <div class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
                  <CheckIcon class="w-3 h-3" />
                </span>
                <span>Direct Owner Transfers Without Middlemen Inflation</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-[#16B4E8]/20 text-[#16B4E8] border border-[#16B4E8]/30 flex items-center justify-center flex-shrink-0">
                  <CheckIcon class="w-3 h-3" />
                </span>
                <span>PEC-Supervised Grade-60 Steel Turnkey Construction</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                  <CheckIcon class="w-3 h-3" />
                </span>
                <span>Authorized IESCO Green Net-Metering Execution</span>
              </div>
            </div>

            <div class="pt-2 flex flex-wrap items-center gap-3">
              <router-link
                :to="currentPillar.route"
                class="px-7 py-3.5 bg-gradient-to-r from-[#16B4E8] to-cyan-400 hover:to-white text-[#081523] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#16B4E8]/25 inline-flex items-center gap-2 group"
              >
                <span>Explore {{ currentPillar.shortName }}</span>
                <ArrowRightIcon class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </router-link>

              <router-link
                to="/contact"
                class="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/15 transition-all"
              >
                Book Desk Visit
              </router-link>
            </div>
          </div>

          <!-- RIGHT COLUMN: 2x2 Auto-Synced Animated Bento Cards -->
          <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div
              v-for="(item, idx) in pillars"
              :key="item.id"
              @mouseenter="setActive(idx)"
              @click="goToPillar(item, idx)"
              class="p-6 rounded-2xl border transition-all duration-500 cursor-pointer relative overflow-hidden group"
              :class="activeIndex === idx
                ? 'bg-white text-[#0F2A44] border-[#16B4E8] shadow-[0_20px_45px_rgba(22,180,232,0.3)] -translate-y-1.5 scale-[1.02]'
                : 'bg-white/[0.06] text-white border-white/10 hover:bg-white/[0.11] hover:border-white/25'"
            >
              <!-- Active Card Shimmer Sweep -->
              <div
                v-if="activeIndex === idx"
                class="absolute inset-0 bg-gradient-to-r from-transparent via-[#16B4E8]/10 to-transparent animate-shimmer-sweep pointer-events-none"
              ></div>

              <div class="flex items-center justify-between mb-4 relative z-10">
                <!-- Animated Heroicon Container -->
                <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm"
                  :class="activeIndex === idx
                    ? 'bg-[#0F2A44] text-[#16B4E8] scale-110'
                    : 'bg-white/10 text-cyan-300 group-hover:bg-[#16B4E8] group-hover:text-white'"
                >
                  <BuildingOffice2Icon v-if="item.icon === 'plot'" class="w-6 h-6" />
                  <WrenchScrewdriverIcon v-else-if="item.icon === 'build'" class="w-6 h-6" />
                  <SunIcon v-else-if="item.icon === 'solar'" class="w-6 h-6" />
                  <ShieldCheckIcon v-else class="w-6 h-6" />
                </div>

                <!-- Badge Tag -->
                <span
                  class="text-[9px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider transition-colors"
                  :class="activeIndex === idx
                    ? 'bg-[#16B4E8]/15 text-[#0F2A44]'
                    : 'bg-white/10 text-cyan-300'"
                >
                  {{ item.badge }}
                </span>
              </div>

              <h4
                class="text-base font-extrabold mb-1.5 transition-colors relative z-10"
                :class="activeIndex === idx ? 'text-[#0F2A44]' : 'text-white'"
              >
                {{ item.title }}
              </h4>

              <p
                class="text-xs leading-relaxed relative z-10"
                :class="activeIndex === idx ? 'text-gray-600' : 'text-slate-300'"
              >
                {{ item.description }}
              </p>

              <div
                class="mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-bold relative z-10 transition-colors"
                :class="activeIndex === idx ? 'border-gray-100 text-[#16B4E8]' : 'border-white/10 text-slate-300'"
              >
                <span>{{ item.footerLabel }}</span>
                <ArrowRightIcon class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  SunIcon,
  ShieldCheckIcon,
  CheckIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const activeIndex = ref(0)
const isPaused = ref(false)
let cycleTimer = null

const pillars = [
  {
    id: 'plots',
    shortName: 'Moqa Plots',
    icon: 'plot',
    badge: 'Moqa Ka Plot',
    metric: '3-Day Transfer',
    title: 'Direct Land & File Trading',
    description: 'Direct owner transfers in Faisal Town-II, TopCity-1, PECHS, and AGG without broker inflation.',
    spotlightText: 'Verified registry & on-ground demarcation across Islamabad’s highest-yielding airport & motorway corridors.',
    footerLabel: 'Immediate Transfer',
    route: '/services#plot'
  },
  {
    id: 'construction',
    shortName: 'Construction',
    icon: 'build',
    badge: 'Turnkey A+',
    metric: '1-Yr Warranty',
    title: 'Engineered House Building',
    description: 'Grade-60 steel foundation to bespoke luxury Spanish finishings backed by structural guarantees.',
    spotlightText: 'Complete architectural 3D design, transparent BOQ grey structure, and turnkey luxury execution supervised by PEC engineers.',
    footerLabel: 'PEC Supervised',
    route: '/services#construction'
  },
  {
    id: 'solar',
    shortName: 'Solar Systems',
    icon: 'solar',
    badge: '10kW – 50kW',
    metric: 'PKR 0 Bills',
    title: 'Solar Net Metering',
    description: 'Complete IESCO Green Meter file processing, Tier-1 inverters, and battery storage for zero electric bills.',
    spotlightText: 'Tier-1 N-Type bifacial solar arrays with rapid ROI and guaranteed IESCO bi-directional green meter commissioning.',
    footerLabel: 'PKR 0 Monthly Bills',
    route: '/services#solar'
  },
  {
    id: 'pha',
    shortName: 'PHA Flats',
    icon: 'shield',
    badge: '100% Cash',
    metric: 'Verified Files',
    title: 'PHA Flats Verification',
    description: 'Authorized file processing for Sector I-12 and I-16 with installment confirmation and allotment letters.',
    spotlightText: 'Direct cash trading of C-Type, D-Type, and Executive PHA apartments with official CDA/PHA clearance desk.',
    footerLabel: 'Fast Handover',
    route: '/services#flats'
  }
]

const currentPillar = computed(() => pillars[activeIndex.value] || pillars[0])

const setActive = (idx) => {
  activeIndex.value = idx
}

const goToPillar = (item, idx) => {
  activeIndex.value = idx
  router.push(item.route)
}

onMounted(() => {
  cycleTimer = setInterval(() => {
    if (!isPaused.value) {
      activeIndex.value = (activeIndex.value + 1) % pillars.length
    }
  }, 3500)
})

onUnmounted(() => {
  clearInterval(cycleTimer)
})
</script>

<style scoped>
@keyframes pulseSlow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.12);
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}

@keyframes shimmerSweep {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer-sweep {
  animation: shimmerSweep 2.4s ease-in-out infinite;
}

.spotlight-swap-enter-active,
.spotlight-swap-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.spotlight-swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.spotlight-swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
