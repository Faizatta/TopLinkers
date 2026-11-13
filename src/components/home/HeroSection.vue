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
    title: 'Executive Modern Villa',
    specs: '5 Beds - 6 Baths - 1 Kanal (500 Sq Yds)',
    description: 'Architectural masterpiece in Gulberg Greens with designer Italian kitchen, private landscaped lawn, 20kW solar net metering, and servant quarters.',
    price: 'PKR 7.50 Crore',
    postfix: '',
    ctaText: 'View Property',
    link: '/property/executive-designer-villa-gulberg',
    image: '/images/hero-real-estate.webp'
  },
  {
    id: 2,
    title: 'Renovated PHA Luxury Flats',
    specs: '3 Beds - 2 Baths - 1,450 Sq Ft',
    description: 'Ready possession PHA executive apartments in Sector I-12 & I-16 with dual elevators, standby power, 24/7 security, and clean CDA registry.',
    price: 'PKR 95 Lac',
    postfix: '',
    ctaText: 'Browse Flats',
    link: '/listings?category=pha-flats',
    image: '/images/hero-pha-flats.webp'
  },
  {
    id: 3,
    title: 'Prime Moqa Ka Plot',
    specs: '10 Marla - Ready Possession - CDA Clean',
    description: '100% cash ready possession plot in TopCity-1 Block B. Clean registry, ready for immediate house construction with all underground utilities.',
    price: 'PKR 1.25 Crore',
    postfix: '',
    ctaText: 'View Plot',
    link: '/property/corner-plot-topcity',
    image: '/images/hero-moqa-plot.webp'
  },
  {
    id: 4,
    title: 'Harsukh Hilltop Luxury Suites',
    specs: '2 Beds - 2 Baths - 1,150 Sq Ft',
    description: 'Wake up above the clouds in serene Nathia Gali pine forests. Prime vacation retreat with 15% booking and 20%+ annual tourist rental yield.',
    price: 'PKR 1.65 Crore',
    postfix: '',
    ctaText: 'Explore Harsukh',
    link: '/hr-sukh',
    image: '/images/hero-harsukh.webp'
  },
  {
    id: 5,
    title: 'Turnkey Solar Smart Villa',
    specs: '4 Beds - 4 Baths - 10kW On-Grid Solar',
    description: 'Turnkey A+ construction with IESCO bi-directional green meter net metering, cutting monthly electricity bills to zero with Grade-60 steel.',
    price: 'PKR 4.80 Crore',
    postfix: '',
    ctaText: 'Solar & Turnkey',
    link: '/services#solar',
    image: '/images/hero-solar.webp'
  }
]

const staticSlideEl = ref(null)
const staticVisible = ref(true)
const staticActive = ref(false)
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

let cancelIdle = null
let rafId = null

// index.html paints a static copy of this hero (#lcp-shell) before JavaScript runs.
// It sits behind the app, so it is already covered; drop it once our own image is decoded.
const removeLcpShell = () => {
  const shell = document.getElementById('lcp-shell')
  if (shell) shell.remove()
}

onMounted(() => {
  const img = staticSlideEl.value && staticSlideEl.value.querySelector('img')
  const decoded = img && typeof img.decode === 'function' ? img.decode() : Promise.resolve()
  decoded.catch(() => {}).then(() => requestAnimationFrame(removeLcpShell))

  // Start the entrance animation (text slide-up + Ken Burns zoom) after the first
  // paint, exactly like the carousel does when a slide becomes active.
  rafId = requestAnimationFrame(() => {
    rafId = requestAnimationFrame(() => {
      staticActive.value = true
    })
  })
  cancelIdle = whenIdle(requestCarousel)
})

onUnmounted(() => {
  removeLcpShell()
  if (cancelIdle) cancelIdle()
  if (rafId) cancelAnimationFrame(rafId)
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

/* Houzez demo02 Signature Horizontal Slider Animations */

/* 1. Inactive slide text initial state */
.hero-swiper-container .hero-slide .slide-specs {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.hero-swiper-container .hero-slide .slide-title {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.hero-swiper-container .hero-slide .slide-desc {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.hero-swiper-container .hero-slide .slide-price-cta {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* 2. Active slide staggered entrance animation (Cascading slide-up + fade-in) */
.hero-swiper-container .swiper-slide-active .slide-specs {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease 0.15s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
}

.hero-swiper-container .swiper-slide-active .slide-title {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
}

.hero-swiper-container .swiper-slide-active .slide-desc {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease 0.45s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.45s;
}

.hero-swiper-container .swiper-slide-active .slide-price-cta {
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
