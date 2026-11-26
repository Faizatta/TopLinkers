<template>
  <div
    class="hero-swiper-container relative w-full h-[600px] sm:h-[660px] md:h-[740px] bg-gray-950 overflow-hidden select-none group"
    @pointerdown.capture="requestCarousel"
  >
    <!--
      The full Swiper carousel (all 5 slides) is loaded once the page is idle and
      sits underneath the static first slide until it starts moving.
    -->
    <HeroCarousel
      v-if="carouselRequested"
      class="absolute inset-0 z-[1]"
      :slides="slides"
      @ready="carouselReady = true"
      @handoff="staticVisible = false"
      @slide-click="goToSlideLink"
    />

    <!--
      Static first slide: identical markup to the carousel's first slide, rendered
      immediately so the hero (the page's LCP element) never waits for the carousel
      library or the other slides' images.
    -->
    <div
      v-if="staticVisible"
      ref="staticSlideEl"
      class="hero-slide hero-static absolute inset-0 z-[2] w-full h-full cursor-pointer"
      :class="{ 'swiper-slide-active': staticActive, 'pointer-events-none': carouselReady }"
      :inert="carouselReady || undefined"
      @click="goToSlideLink(slides[0].link)"
    >
      <HeroSlide :slide="slides[0]" :priority="true" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import HeroSlide from './HeroSlide.vue'
import { whenIdle } from '../../utils/idle'

const HeroCarousel = defineAsyncComponent(() => import('./HeroCarousel.vue'))

const router = useRouter()

const slides = [
  {
    id: 1,
    title: 'Prime Moqa Ka Plot in TopCity-1',
    specs: '10 Marla • Immediate Physical Possession • RDA Approved',
    badge: 'Cash Moqa Ready',
    description: 'Direct on-ground demarcated plot adjoining New Islamabad Airport gate & Srinagar Highway. Immediate physical possession with swift registry transfer.',
    ctaText: 'Explore Plot',
    link: '/property/corner-plot-topcity',
    image: '/images/hero-moqa-plot.webp'
  },
  {
    id: 2,
    title: 'PHA Apartments (Sector I-12 & I-16)',
    specs: '2 & 3 Bed Apartments • Ready Possession & Installments',
    badge: 'Government Housing',
    description: 'Authorized government-allocated PHA flats in Islamabad with fast CDA transfer, dual elevators, 24/7 security, and verified allotment files.',
    ctaText: 'Explore PHA Flats',
    link: '/services/apartments-flats?open=i12',
    image: '/images/hero-pha-flats.webp'
  },
  {
    id: 3,
    title: 'Harsukh Residencies — Nathia Gali Suites',
    specs: 'Furnished Mountain Suites & Penthouses • 8,200 Ft',
    badge: '20%+ Rental ROI',
    description: 'Wake up above the clouds in serene Nathia Gali pine forests. Timber-and-stone luxury suites with thermal terrace pools and hands-off rental management.',
    ctaText: 'Explore Harsukh',
    link: '/hr-sukh',
    image: '/images/hero-harsukh.webp'
  },
  {
    id: 5,
    title: 'Faisal Town Phase 2 (FT-II) Installment Plots',
    specs: '5.56, 8, 10 Marla & 1 Kanal • 42 Monthly Installments',
    badge: '4.5-Year Plots Plan',
    description: 'Zedem International premier master-planned community by Chaudhry Abdul Majeed with direct M-2 Motorway interchange and 15% lump-sum discount.',
    ctaText: 'Explore Faisal Town Plots',
    link: '/property/faisal-town-phase-2-installment-plot',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80'
  }
]

const staticSlideEl = ref(null)
const staticVisible = ref(true)
const staticActive = ref(true)
const carouselRequested = ref(false)
const carouselReady = ref(false)

const requestCarousel = () => {
  carouselRequested.value = true
}

const goToSlideLink = (link) => {
  if (link) {
    router.push(link)
  }
}

let cleanupHeroListeners = null

onMounted(() => {
  const activateCarousel = () => {
    if (carouselRequested.value) return
    carouselRequested.value = true
    if (cleanupHeroListeners) cleanupHeroListeners()
  }
  const events = ['pointerdown', 'touchstart', 'mousedown', 'keydown']
  cleanupHeroListeners = () => {
    events.forEach(e => window.removeEventListener(e, activateCarousel))
    if (heroIdleTimer) clearTimeout(heroIdleTimer)
  }
  events.forEach(e => window.addEventListener(e, activateCarousel, { once: true, passive: true }))
  const heroIdleTimer = setTimeout(activateCarousel, 5000)
})

onUnmounted(() => {
  if (cleanupHeroListeners) cleanupHeroListeners()
})
</script>

<style>
/*
  The hero has an explicit height at every breakpoint and already clips its content,
  so full containment is visually a no-op. It stops each carousel step (slide
  re-ordering + class changes) from invalidating layout for the rest of the page.
*/
.hero-swiper-container {
  contain: strict;
}

/* Static LCP hero slide: MUST BE IMMEDIATELY VISIBLE with zero opacity/transform delays */
.hero-swiper-container .hero-static .slide-specs,
.hero-swiper-container .hero-static .slide-title,
.hero-swiper-container .hero-static .slide-desc,
.hero-swiper-container .hero-static .slide-price-cta {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

.hero-swiper-container .hero-static .slide-bg-image {
  transform: none !important;
  animation: none !important;
}

/* Houzez demo02 Signature Horizontal Slider Animations (for dynamic swiper slides only) */

/* 1. Inactive slide text initial state */
.hero-swiper-container .swiper-slide:not(.swiper-slide-active) .slide-specs {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.hero-swiper-container .swiper-slide:not(.swiper-slide-active) .slide-title {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.hero-swiper-container .swiper-slide:not(.swiper-slide-active) .slide-desc {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.hero-swiper-container .swiper-slide:not(.swiper-slide-active) .slide-price-cta {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* 2. Active slide staggered entrance animation (Cascading slide-up + fade-in) */
.hero-swiper-container .swiper-slide-active:not(.hero-static) .slide-specs {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease 0.15s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
}

.hero-swiper-container .swiper-slide-active:not(.hero-static) .slide-title {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
}

.hero-swiper-container .swiper-slide-active:not(.hero-static) .slide-desc {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease 0.45s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.45s;
}

.hero-swiper-container .swiper-slide-active:not(.hero-static) .slide-price-cta {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.7s ease 0.6s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s;
}

/* 3. Active slide subtle Ken Burns zoom on image */
.hero-swiper-container .hero-slide .slide-bg-image {
  transform: scale(1);
  transition: transform 6s cubic-bezier(0.25, 1, 0.5, 1);
}

.hero-swiper-container .swiper-slide-active .slide-bg-image {
  transform: scale(1.06);
}

@media (prefers-reduced-motion: reduce) {
  .hero-swiper-container .hero-slide .slide-specs,
  .hero-swiper-container .hero-slide .slide-title,
  .hero-swiper-container .hero-slide .slide-desc,
  .hero-swiper-container .hero-slide .slide-price-cta,
  .hero-swiper-container .hero-slide .slide-bg-image {
    transition: none;
  }
}
</style>
