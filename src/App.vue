<template>
  <div class="min-h-screen flex flex-col bg-[#F6F8FA] text-gray-800 font-sans w-full overflow-x-hidden">
    <!-- 1. Sticky Global Header (Dual-state glassmorphism, responsive mobile drawer) -->
    <AppHeader v-if="!isAdminRoute" />

    <!-- Main Dynamic Route View with Fade Transitions -->
    <main class="flex-1 min-h-screen">
      <router-view v-slot="{ Component }">
        <transition :name="pageTransition" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 2. Floating On-Screen WhatsApp Popup Interactive Widget (Bottom Left) -->
    <FloatingWhatsApp v-if="!isAdminRoute && deferredUiReady" />

    <!-- 2b. Hot Selling Harsukh Nathia Gali Curiosity Popup & Teaser (Popup 1) -->
    <HRSukhPopup v-if="!isAdminRoute && deferredUiReady" />

    <!-- 2c. Custom Building / Project Spotlight Floating Popup (Popup 2) -->
    <BuildingSpotlightPopup v-if="!isAdminRoute && deferredUiReady" />

    <!-- 3. Back To Top Button (Navy/Cyan Square, bottom right) -->
    <BackToTop v-if="!isAdminRoute && deferredUiReady" />

    <!-- 4. Global Footer (Navy) - Shown on all standard pages -->
    <AppFooter v-if="!isAdminRoute" />

    <!-- 5. Global Modal Overlays (mounted once idle, or immediately if opened earlier) -->
    <AuthModal v-if="!isAdminRoute && (deferredUiReady || ui.isAuthModalOpen)" />
    <LightboxModal v-if="deferredUiReady || ui.isLightboxOpen" />
    <ShareModal v-if="deferredUiReady || ui.isShareModalOpen" />
    <FlyerModal v-if="deferredUiReady || ui.isFlyerModalOpen" />
    <BuildingDetailsModal
      v-if="deferredUiReady || ui.isBuildingModalOpen"
      :is-open="ui.isBuildingModalOpen"
      :building="adminStore.customBuilding"
      @close="ui.closeBuildingModal"
    />

    <!-- Global Toast Notifications -->
    <Toast />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import Toast from './components/ui/Toast.vue'
import { useUiStore } from './stores/ui'
import { useAdminStore } from './stores/admin'
import { whenIdle } from './utils/idle'
import { initLenis, destroyLenis } from './services/lenis'

// Floating widgets and modals are not needed for the first paint. They are loaded
// after the page has finished loading, so they never compete with the hero.
const FloatingWhatsApp = defineAsyncComponent(() => import('./components/ui/FloatingWhatsApp.vue'))
const HRSukhPopup = defineAsyncComponent(() => import('./components/ui/HRSukhPopup.vue'))
const BuildingSpotlightPopup = defineAsyncComponent(() => import('./components/ui/BuildingSpotlightPopup.vue'))
const BackToTop = defineAsyncComponent(() => import('./components/layout/BackToTop.vue'))
const AuthModal = defineAsyncComponent(() => import('./components/layout/AuthModal.vue'))
const LightboxModal = defineAsyncComponent(() => import('./components/layout/LightboxModal.vue'))
const ShareModal = defineAsyncComponent(() => import('./components/layout/ShareModal.vue'))
const FlyerModal = defineAsyncComponent(() => import('./components/layout/FlyerModal.vue'))
const BuildingDetailsModal = defineAsyncComponent(() => import('./components/ui/BuildingDetailsModal.vue'))

const route = useRoute()
const router = useRouter()
const ui = useUiStore()
const adminStore = useAdminStore()

// The router renders nothing until the first navigation resolves, so the first page
// would otherwise "enter" with the fade (opacity 0 + 6px slide), delaying the very
// first paint of the hero. Show the first page instantly; fade between pages after.
// ('page-initial' has no CSS rules, so Vue completes it immediately.)
const pageTransition = ref('page-initial')
router.isReady().then(() => {
  setTimeout(() => { pageTransition.value = 'fade' }, 0)
})
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

const deferredUiReady = ref(false)
let cancelIdle = null

onMounted(() => {
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'auto'
  }
  initLenis()
  // Use a small fixed delay (200ms) so floating widgets appear promptly after
  // first paint, without blocking the hero or waiting for a full idle callback.
  cancelIdle = whenIdle(() => { deferredUiReady.value = true })
  setTimeout(() => { deferredUiReady.value = true }, 200)
})

onUnmounted(() => {
  if (cancelIdle) cancelIdle()
  destroyLenis()
})
</script>
