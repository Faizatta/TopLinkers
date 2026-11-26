<template>
  <div>
    <!-- Custom Featured Building / Hot Project Spotlight Popup (Popup 2) -->
    <!-- Controlled independently ON/OFF and managed dynamically from Admin Dashboard -->
    <transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="transform translate-y-10 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform translate-y-10 opacity-0 scale-95"
    >
      <div v-if="adminStore.customBuilding?.enabled && showTeaser && !isHiddenRoute && !uiStore.isWhatsAppOpen">
        <!-- Mobile: Sleek Floating Circle Badge with Building Preview (Bottom-Left, Stacked) -->
        <div
          class="sm:hidden fixed left-3 z-40 select-none"
          :style="{ bottom: `${mobileBottom}px` }"
        >
          <div class="relative">
            <span class="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-400 to-[#16B4E8] opacity-60 animate-ping"></span>
            <button
              type="button"
              @click="goToBuildingPage"
              :aria-label="building.name || 'View Featured Building'"
              :title="building.name || 'Featured Building Spotlight'"
              class="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#0F2A44] via-amber-400 to-[#16B4E8] shadow-[0_8px_20px_rgba(15,42,68,0.4)] active:scale-95 transition-transform"
            >
              <img
                :src="building.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80'"
                :alt="building.name || 'Building Thumbnail'"
                loading="lazy"
                decoding="async"
                width="44"
                height="44"
                class="w-full h-full rounded-full object-cover border border-white/30"
              />
            </button>

            <span class="pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1 py-0.5 rounded-full bg-[#0F2A44] text-amber-300 border border-amber-400/50 text-[7px] font-black uppercase tracking-wider shadow max-w-[65px] truncate">
              {{ building.tag?.split('|')[0]?.trim() || 'BUILDING' }}
            </span>

            <button
              type="button"
              @click.stop="dismissTeaser"
              aria-label="Close building teaser"
              class="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center"
            >
              <span class="w-4 h-4 rounded-full bg-[#0F2A44] text-white border border-white/40 flex items-center justify-center shadow">
                <XMarkIcon class="w-2.5 h-2.5" />
              </span>
            </button>
          </div>
        </div>

        <!-- Desktop / Tablet: Floating Architectural Glass Spotlight Card (Bottom-Left) -->
        <div
          class="hidden sm:block fixed left-6 w-[390px] z-40 cursor-pointer group select-none"
          :style="{ bottom: `${desktopBottom}px` }"
          @click="goToBuildingPage"
        >
          <!-- Outer Animated Gradient Frame -->
          <div class="relative rounded-2xl p-[2px] bg-gradient-to-r from-amber-500 via-[#16B4E8] to-[#0F2A44] shadow-[0_20px_50px_-10px_rgba(15,42,68,0.45)] group-hover:shadow-[0_25px_60px_-8px_rgba(245,158,11,0.45)] transition-all duration-300 group-hover:-translate-y-1.5">
            <!-- Floating Elevation Tag Popping Out Above Top-Left -->
            <div class="absolute -top-3 left-4 z-20 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F2A44] text-white text-[9px] font-black uppercase tracking-wider shadow-md border border-amber-400/60">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <span>{{ building.tag || 'HOT COMMERCIAL / RESIDENTIAL PROJECT' }}</span>
            </div>

            <!-- Inner Dark-to-Navy Glass Card -->
            <div class="relative rounded-[14px] bg-gradient-to-br from-[#0B1D30] via-[#0F2A44] to-[#142D42] text-white p-3.5 pt-4 overflow-hidden">
              <!-- Ambient Glow & Shimmer -->
              <div class="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-amber-400/15 blur-2xl pointer-events-none"></div>
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
                <!-- Scenic Thumbnail with Down Payment Tag -->
                <div class="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/20 shadow-lg bg-slate-900">
                  <img
                    :src="building.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80'"
                    :alt="building.title || building.name"
                    loading="lazy"
                    decoding="async"
                    width="64"
                    height="64"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
                  <span class="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black uppercase text-[#0F2A44] bg-amber-400 px-1.5 py-0.5 rounded shadow">
                    {{ building.downPayment || '20% Down' }}
                  </span>
                </div>

                <!-- Text Copy -->
                <div class="flex-1 min-w-0 pr-4">
                  <div class="flex flex-wrap items-center gap-1.5 mb-1">
                    <span
                      v-if="building.offerEnabled && building.offerBadge"
                      class="text-[9px] font-black uppercase tracking-wider text-white bg-rose-600 px-1.5 py-0.5 rounded shadow-xs"
                    >
                      {{ building.offerBadge }}
                    </span>
                    <span class="text-[9px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-400/30 px-1.5 py-0.5 rounded">
                      {{ building.badge || 'Featured Project' }}
                    </span>
                    <span v-if="building.offerEnabled && building.previousPrice" class="text-[9px] font-medium text-slate-400 line-through">
                      {{ building.previousPrice }}
                    </span>
                    <span class="text-[9px] font-bold text-cyan-300">{{ building.price || 'Market Rates' }}</span>
                  </div>

                  <h4 class="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors leading-snug truncate">
                    {{ building.title || building.name }}
                  </h4>

                  <p class="text-[11px] text-slate-300 truncate mt-0.5">
                    {{ building.subtitle || 'Click to view full specifications & floor plans' }}
                  </p>

                  <div class="flex items-center gap-1 mt-1 text-[10px] font-bold text-[#16B4E8] group-hover:translate-x-1 transition-transform">
                    <span>Explore Full Project Page &rarr;</span>
                    <ArrowRightIcon class="w-3 h-3" />
                  </div>
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
import { useAdminStore } from '../../stores/admin'
import { useFooterClearance } from '../../composables/useFooterClearance'
import { scrollTo } from '../../services/lenis'

const uiStore = useUiStore()
const adminStore = useAdminStore()
const route = useRoute()
const router = useRouter()
const showTeaser = ref(false)

const { bottomOffset, updateFooterClearance } = useFooterClearance()

let showTimer = null

const building = computed(() => {
  return adminStore.customBuilding || {}
})

// Calculate stacked position if Harsukh popup is also enabled and visible
const isHarsukhActive = computed(() => {
  return Boolean(adminStore.spotlightPopup?.enabled)
})

const mobileBottom = computed(() => {
  return isHarsukhActive.value ? 78 : 20
})

const desktopBottom = computed(() => {
  return isHarsukhActive.value ? 139 : 24
})

const isHiddenRoute = computed(() => {
  const p = (route.path || '').toLowerCase()
  return p.startsWith('/admin') || p === '/contact' || p.startsWith('/featured') || p === '/featured-building'
})

const triggerPopup = () => {
  clearTimeout(showTimer)
  if (!adminStore.customBuilding?.enabled || isHiddenRoute.value) {
    showTeaser.value = false
    return
  }
  showTeaser.value = false
  showTimer = setTimeout(() => {
    if (adminStore.customBuilding?.enabled && !isHiddenRoute.value) {
      updateFooterClearance()
      showTeaser.value = true
    }
  }, 100)
}

const goToBuildingPage = () => {
  const target = (building.value.link && building.value.link !== '/services/apartments-flats')
    ? building.value.link
    : '/featured-building'

  if (target.startsWith('http')) {
    window.open(target, '_blank')
  } else {
    router.push(target)
    scrollTo(0, { immediate: true })
  }
}

const dismissTeaser = () => {
  showTeaser.value = false
}

watch(
  () => route.fullPath,
  () => {
    triggerPopup()
  }
)

watch(
  () => adminStore.customBuilding?.enabled,
  (enabled) => {
    if (!enabled) {
      showTeaser.value = false
    } else {
      triggerPopup()
    }
  }
)

onMounted(() => {
  triggerPopup()
})

onUnmounted(() => {
  clearTimeout(showTimer)
})
</script>
