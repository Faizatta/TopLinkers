<template>
  <!-- Background Image with Soft Ken Burns Zoom -->
  <div class="absolute inset-0 w-full h-full overflow-hidden">
    <!--
      Art-directed, modern-format hero image:
      - phones (< 640px) get a centre crop that matches exactly what object-cover shows there
      - AVIF first, WebP as fallback
    -->
    <picture class="block w-full h-full">
      <source media="(max-width: 639px)" type="image/avif" :srcset="`${base}-m.avif`" />
      <source media="(max-width: 639px)" type="image/webp" :srcset="`${base}-m.webp`" />
      <source type="image/avif" :srcset="`${base}.avif`" />
      <img
        :src="`${base}.webp`"
        :alt="`${slide.title} - TopLinkers Islamabad`"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'low'"
        :decoding="priority ? 'sync' : 'async'"
        width="1440"
        height="960"
        class="slide-bg-image w-full h-full object-cover object-center"
      />
    </picture>

    <!-- Gradient Overlay: Rich subtle dark vignette on left & bottom for crisp Houzez-style typography -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:w-4/5 md:w-3/5 pointer-events-none"></div>
    <div class="absolute inset-0 bg-black/40 sm:hidden pointer-events-none"></div>
    <div class="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none"></div>
  </div>

  <!-- Overlaid Content (Max 1280px Container, Left-Aligned Houzez Layout) -->
  <div class="relative max-w-[1280px] mx-auto h-full px-4 sm:px-6 md:px-8 flex flex-col justify-center pb-32 sm:pb-40 md:pb-48 z-10 pointer-events-none">
    <div class="max-w-xl text-left select-none pointer-events-auto">
      <!-- 1. Specs Line (Animated entry: white specs with small cyan accent) -->
      <div class="slide-specs mb-2 sm:mb-3">
        <span class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-white/95 uppercase drop-shadow">
          <span class="w-2 h-2 rounded-full bg-[#16B4E8] shadow-sm"></span>
          <span>{{ slide.specs }}</span>
        </span>
      </div>

      <!-- 2. Main Title (Animated entry: large clean Houzez typography) -->
      <h1 class="slide-title text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight text-white leading-[1.12] mb-2 sm:mb-3 drop-shadow-md">
        {{ slide.title }}
      </h1>

      <!-- 3. Short Description / Excerpt (Animated entry) -->
      <p class="slide-desc text-xs sm:text-sm md:text-base text-gray-200/90 font-normal leading-relaxed line-clamp-2 max-w-lg mb-4 sm:mb-6 drop-shadow">
        {{ slide.description }}
      </p>

      <!-- 4. Action CTA (Animated entry) -->
      <div class="slide-price-cta flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
        <router-link
          :to="slide.link"
          class="btn-arrow-slide px-5 sm:px-6 py-2.5 sm:py-3 bg-[#16B4E8] hover:bg-[#119ecf] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-[4px] shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center group flex-shrink-0"
          @click.stop
        >
          <span>{{ slide.ctaText || 'View Details' }}</span>
          <svg class="arrow-icon w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

// '/images/hero-real-estate.webp' -> '/images/hero-real-estate'
const base = computed(() => props.slide.image.replace(/\.(webp|jpe?g|png|avif)$/i, ''))
</script>
