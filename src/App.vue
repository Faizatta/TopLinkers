<template>
  <div class="min-h-screen flex flex-col bg-[#F6F8FA] text-gray-800 font-sans w-full overflow-x-hidden">
    <!-- 1. Sticky Global Header (Dual-state glassmorphism, responsive mobile drawer) -->
    <AppHeader v-if="!isAdminRoute" />

    <!-- Main Dynamic Route View with Fade Transitions -->
    <main class="flex-1 min-h-screen">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 2. Floating On-Screen WhatsApp Popup Interactive Widget (Bottom Left) -->
    <FloatingWhatsApp v-if="!isAdminRoute" />

    <!-- 2b. Hot Selling Harsukh Nathia Gali Curiosity Popup & Teaser -->
    <HRSukhPopup v-if="!isAdminRoute" />

    <!-- 3. Back To Top Button (Navy/Cyan Square, bottom right) -->
    <BackToTop v-if="!isAdminRoute" />

    <!-- 4. Global Footer (Navy) - Shown on all standard pages -->
    <AppFooter v-if="!isAdminRoute" />

    <!-- 5. Global Modal Overlays -->
    <AuthModal v-if="!isAdminRoute" />
    <LightboxModal />
    <ShareModal />
    <FlyerModal />

    <!-- Global Toast Notifications -->
    <Toast />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import BackToTop from './components/layout/BackToTop.vue'
import FloatingWhatsApp from './components/ui/FloatingWhatsApp.vue'
import HRSukhPopup from './components/ui/HRSukhPopup.vue'
import Toast from './components/ui/Toast.vue'

// Lazy-load non-critical global modals on demand to keep initial bundle ultra-light
const AuthModal = defineAsyncComponent(() => import('./components/layout/AuthModal.vue'))
const LightboxModal = defineAsyncComponent(() => import('./components/layout/LightboxModal.vue'))
const ShareModal = defineAsyncComponent(() => import('./components/layout/ShareModal.vue'))
const FlyerModal = defineAsyncComponent(() => import('./components/layout/FlyerModal.vue'))

import { initLenis, destroyLenis, scrollTo } from './services/lenis'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

onMounted(() => {
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'auto'
  }
  initLenis()
})

onUnmounted(() => {
  destroyLenis()
})
</script>