<template>
  <!-- Background Image with Soft Ken Burns Zoom (Clickable to single project page) -->
  <div
    class="absolute inset-0 w-full h-full overflow-hidden cursor-pointer"
    @click="$router.push(slide.link)"
  >
    <!-- Art-directed responsive local image OR direct high-res photo -->
    <picture v-if="isLocalArtDirected" class="block w-full h-full">
      <source media="(max-width: 639px)" type="image/webp" :srcset="`${base}-m.webp`" width="768" height="512" />
      <source media="(max-width: 639px)" type="image/avif" :srcset="`${base}-m.avif`" width="768" height="512" />
      <source type="image/avif" :srcset="`${base}.avif`" width="1440" height="960" />
      <img
        :src="`${base}-m.webp`"
        :srcset="`${base}-m.webp 768w, ${base}.webp 1440w`"
        sizes="(max-width: 639px) 100vw, 1440px"
        :alt="`${slide.title} - TopLinkers Islamabad`"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'low'"
        decoding="async"
        width="768"
        height="512"
        class="slide-bg-image w-full h-full object-cover object-center"
      />
    </picture>
    <img
      v-else
      :src="slide.image"
      :alt="`${slide.title} - TopLinkers Islamabad`"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'low'"
      decoding="async"
      width="1440"
      height="960"
      class="slide-bg-image w-full h-full object-cover object-center"
    />

    <!-- Gradient Overlay: Rich subtle dark vignette on left & bottom for crisp Houzez-style typography -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent sm:w-4/5 md:w-3/5 pointer-events-none"></div>
    <div class="absolute inset-0 bg-black/45 sm:hidden pointer-events-none"></div>
    <div class="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>
  </div>

  <!-- Overlaid Content (Max 1280px Container, Left-Aligned Houzez Layout) -->
  <div class="relative max-w-[1280px] mx-auto h-full px-4 sm:px-6 md:px-8 flex flex-col justify-center pb-32 sm:pb-40 md:pb-48 z-10 pointer-events-none">
    <div class="max-w-xl text-left select-none pointer-events-auto">
      <!-- 1. Specs Line & Category Badge (Animated entry) -->
      <div class="slide-specs mb-2 sm:mb-3 flex flex-wrap items-center gap-2">
        <span class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-white/95 uppercase drop-shadow">
          <span class="w-2 h-2 rounded-full bg-[#16B4E8] shadow-sm animate-pulse"></span>
          <span>{{ slide.specs }}</span>
        </span>
        <span v-if="slide.badge" class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#16B4E8] text-[#0F2A44] shadow-md">
          {{ slide.badge }}
        </span>
      </div>

      <!-- 2. Main Title (Animated entry: large clean Houzez typography, clickable to single page) -->
      <h2
        class="slide-title text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight text-white leading-[1.12] mb-2 sm:mb-3 drop-shadow-md cursor-pointer hover:text-[#16B4E8] transition-colors"
        @click="$router.push(slide.link)"
      >
        {{ slide.title }}
      </h2>

      <!-- 3. Short Description / Excerpt (Animated entry) -->
      <p class="slide-desc text-xs sm:text-sm md:text-base text-gray-200/90 font-normal leading-relaxed line-clamp-2 max-w-lg mb-4 sm:mb-5 drop-shadow">
        {{ slide.description }}
      </p>

      <!-- 4. Action CTA: Explore Button (Direct to Single Project Page) -->
      <div class="slide-price-cta flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
        <router-link
          :to="slide.link"
          class="btn-arrow-slide px-6 sm:px-8 py-3 sm:py-3.5 bg-[#16B4E8] hover:bg-[#119ecf] text-[#0F2A44] text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center group flex-shrink-0"
          @click.stop
        >
          <span>{{ slide.ctaText || 'Explore Project' }}</span>
          <svg class="arrow-icon w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  slide: { type: Object, required: true },
  // The first slide is the page's LCP element: load it eagerly at high priority.
  priority: { type: Boolean, default: false }
})

// Check if image is an existing art-directed local hero asset in /images/hero-*
const isLocalArtDirected = computed(() => {
  return typeof props.slide.image === 'string' &&
    props.slide.image.startsWith('/images/hero-') &&
    props.slide.image.endsWith('.webp')
})

// '/images/hero-real-estate.webp' -> '/images/hero-real-estate'
const base = computed(() => {
  if (typeof props.slide.image !== 'string') return ''
  return props.slide.image.replace(/\.(webp|jpe?g|png|avif)$/i, '')
})
</script>
