<template>
  <div>
    <!-- Unique Floating Alpine Curiosity Spotlight (Bottom Right) -->
    <!-- Pops up cleanly on every page visit & route navigation (hidden only while already on /hr-sukh) -->
    <transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="transform translate-y-10 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform translate-y-10 opacity-0 scale-95"
    >
      <div v-if="showTeaser && !isOnNathiaGaliPage && !uiStore.isWhatsAppOpen">
        <!-- Mobile: Compact Floating Circle Badge (Bottom-Left) -->
        <div
          class="sm:hidden fixed left-4 z-40 select-none transition-[bottom] duration-200 ease-out"
          :style="{ bottom: `${bottomOffset}px` }"
        >
          <div class="relative">
            <span class="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#16B4E8] to-emerald-400 opacity-60 animate-ping"></span>
            <button
              type="button"
              @click="goToNathiaGaliPage"
              aria-label="Explore Harsukh Nathia Gali"
              title="Harsukh • Nathia Gali"
              class="relative w-14 h-14 rounded-full p-[2.5px] bg-gradient-to-tr from-[#0F2A44] via-[#16B4E8] to-emerald-400 shadow-[0_10px_25px_rgba(15,42,68,0.45)] active:scale-95 transition-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80"
                alt="Harsukh Nathia Gali"
                class="w-full h-full rounded-full object-cover border border-white/30"
              />
            </button>

            <span class="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded-full bg-[#0F2A44] text-[#16B4E8] border border-[#16B4E8]/50 text-[8px] font-black uppercase tracking-wider shadow">
              Harsukh
            </span>

            <button
              type="button"
              @click.stop="dismissTeaser"
              aria-label="Close Harsukh shortcut"
              class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0F2A44] text-white border border-white/40 flex items-center justify-center shadow"
            >
              <XMarkIcon class="w-3 h-3" />
            </button>
          </div>
        </div>

        <!-- Desktop / Tablet: Floating Alpine Curiosity Spotlight Card (Bottom-Left) -->
        <div
          class="hidden sm:block fixed left-6 w-[390px] z-40 cursor-pointer group select-none transition-[bottom] duration-200 ease-out"
          :style="{ bottom: `${bottomOffset}px` }"
          @click="goToNathiaGaliPage"
        >
          <!-- Outer Animated Gradient Halo Frame -->
          <div class="relative rounded-2xl p-[2px] bg-gradient-to-r from-[#0F2A44] via-[#16B4E8] to-emerald-400 shadow-[0_20px_50px_-10px_rgba(15,42,68,0.45)] group-hover:shadow-[0_25px_60px_-8px_rgba(22,180,232,0.55)] transition-all duration-300 group-hover:-translate-y-1.5">
            <!-- Floating Elevation Tag Popping Out Above Top-Left -->
            <div class="absolute -top-3 left-4 z-20 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F2A44] text-white text-[9px] font-black uppercase tracking-wider shadow-md border border-[#16B4E8]/60">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Harsukh • Nathia Gali</span>
            </div>

            <!-- Inner Dark-to-Navy Glass Card -->
            <div class="relative rounded-[14px] bg-gradient-to-br from-[#0B1D30] via-[#0F2A44] to-[#13385B] text-white p-3.5 pt-4 overflow-hidden">
              <!-- Ambient Radial Glow & Hover Shimmer -->
              <div class="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#16B4E8]/20 blur-2xl pointer-events-none"></div>
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>

              <!-- Dismiss Close Button -->
              <button
                type="button"
                class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 hover:bg-rose-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors z-20"
                title="Close for now"
                @click.stop="dismissTeaser"
              >
                <XMarkIcon class="w-3.5 h-3.5" />
              </button>

              <div class="flex items-center gap-3.5 relative z-10">
                <!-- Scenic Thumbnail with Live Booking Tag -->
                <div class="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/20 shadow-lg bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80"
                    alt="Harsukh Nathia Gali"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
                  <span class="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black uppercase text-[#0F2A44] bg-[#16B4E8] px-1.5 py-0.5 rounded shadow">
                    15% Down
                  </span>
                </div>

                <!-- Dynamic Rotating Curiosity Copy -->
                <div class="flex-1 min-w-0 pr-4">
                  <div class="flex items-center gap-1.5 mb-1">
                    <span class="text-[9px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-1.5 py-0.5 rounded">
                      20%+ Rental ROI
                    </span>
                    <span class="text-[9px] font-bold text-cyan-300">3-Yr Plan</span>
                  </div>

                  <transition name="fade-slide" mode="out-in">
                    <h4
                      :key="activeHookIndex"
                      class="text-xs sm:text-sm font-black text-white group-hover:text-[#16B4E8] transition-colors leading-snug truncate"
                    >
                      {{ curiosityHooks[activeHookIndex].title }}
                    </h4>
                  </transition>

                  <p class="text-[11px] text-slate-300 line-clamp-1 mt-0.5 leading-tight">
                    {{ curiosityHooks[activeHookIndex].subtitle }}
                  </p>
                </div>

                <!-- Magnetic Action Arrow Button -->
                <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#16B4E8] to-cyan-300 text-[#0F2A44] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all shadow-lg shadow-[#16B4E8]/30">
                  <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { XMarkIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useUiStore } from '../../stores/ui'
import { scrollTo } from '../../services/lenis'

const uiStore = useUiStore()
const route = useRoute()
const router = useRouter()
const showTeaser = ref(false)
const activeHookIndex = ref(0)
const bottomOffset = ref(24)

const updateFooterClearance = () => {
  const footer = document.getElementById('site-footer')
  if (!footer) {
    bottomOffset.value = 24
    return
  }
  const rect = footer.getBoundingClientRect()
  const docHeight = document.documentElement.scrollHeight
  const isScrolledNearBottom = (window.scrollY + window.innerHeight) >= (docHeight - 600)

  if (isScrolledNearBottom && rect.top < window.innerHeight && rect.top > 0) {
    const overlap = window.innerHeight - rect.top
    bottomOffset.value = Math.max(24, overlap + 24)
  } else {
    bottomOffset.value = 24
  }
}

let showTimer = null
let rotateTimer = null

const curiosityHooks = [
  {
    title: 'Wake Up Above The Clouds?',
    subtitle: 'Luxury pine-valley suites at 8,200 ft. Tap to explore →'
  },
  {
    title: 'Earn PKR 25k–40k / Night Airbnb',
    subtitle: 'Managed holiday suites in Nathia Gali • 15% Booking →'
  },
  {
    title: 'Limited Hillside Suites Remaining',
    subtitle: 'Studio, 1-Bed & 2-Bed on 3-Yr Installments →'
  }
]

const isOnNathiaGaliPage = computed(() => {
  return route.path === '/hr-sukh' || route.path === '/nathiagali'
})

const triggerPopup = () => {
  clearTimeout(showTimer)
  if (isOnNathiaGaliPage.value) {
    showTeaser.value = false
    return
  }
  showTeaser.value = false
  showTimer = setTimeout(() => {
    if (!isOnNathiaGaliPage.value) {
      updateFooterClearance()
      showTeaser.value = true
    }
  }, 700)
}

const goToNathiaGaliPage = () => {
  router.push('/hr-sukh')
  scrollTo(0, { immediate: true })
}

const dismissTeaser = () => {
  showTeaser.value = false
}

// Re-trigger cleanly every time user visits a page
watch(
  () => route.fullPath,
  () => {
    triggerPopup()
  }
)

onMounted(() => {
  triggerPopup()
  updateFooterClearance()
  window.addEventListener('scroll', updateFooterClearance, { passive: true })
  window.addEventListener('resize', updateFooterClearance, { passive: true })
  rotateTimer = setInterval(() => {
    activeHookIndex.value = (activeHookIndex.value + 1) % curiosityHooks.length
  }, 4000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateFooterClearance)
  window.removeEventListener('resize', updateFooterClearance)
  clearTimeout(showTimer)
  clearInterval(rotateTimer)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
