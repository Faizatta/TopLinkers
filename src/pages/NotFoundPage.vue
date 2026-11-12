<template>
  <div class="not-found-page py-24 text-center">
    <div class="max-w-md mx-auto px-4">
      <div class="text-7xl font-extralight text-[#00AEEF] mb-4">404</div>
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p class="text-sm text-gray-500 mb-8 leading-relaxed font-light">
        The real estate listing, page, or resource you requested could not be located or may have been relocated.
      </p>
      <div class="flex items-center justify-center gap-4">
        <router-link
          to="/"
          class="px-5 py-3 bg-[#0B3B66] hover:bg-[#082a4a] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
        >
          Return Home
        </router-link>
        <router-link
          to="/search"
          class="px-5 py-3 bg-[#00AEEF] hover:bg-[#0098d3] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
        >
          Browse Listings
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '404 - Page Not Found | TopLinkers'
  let metaRobots = document.querySelector('meta[name="robots"]')
  if (metaRobots) metaRobots.setAttribute('content', 'noindex, nofollow')
})
</script>
