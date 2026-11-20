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
      @click="goToSlideLink(slides[0].listingLink || slides[0].link)"
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
    title: 'Prime Moqa Ka Plot in TopCity-1 (Block B)',
    specs: '10 Marla • Immediate Physical Possession • RDA Approved',
    badge: 'Cash Moqa Ready',
    description: 'Direct on-ground demarcated plot adjoining New Islamabad Airport gate & Srinagar Highway. Immediate physical possession with swift registry transfer.',
    price: 'PKR 1.25 Crore',
    ctaText: 'View Plot in Listings',
    listingLink: '/listings?keyword=TopCity&type=plot',
    link: '/property/corner-plot-topcity',
    image: '/images/hero-moqa-plot.webp'
  },
  {
    id: 2,
    title: 'PHA Official Apartments (Sector I-12 & I-16)',
    specs: '2 & 3 Bed Apartments • Ready Possession & Installments',
    badge: 'Government Housing',
    description: 'Authorized government-allocated PHA flats in Islamabad with fast CDA transfer, dual elevators, 24/7 security, and verified allotment files.',
    price: 'PKR 55 Lac – 1.45 Crore',
    ctaText: 'View Flats in Listings',
    listingLink: '/listings?keyword=PHA&type=apartment',
    link: '/property/pha-flats-sector-i12-furnished-apartment',
    image: '/images/hero-pha-flats.webp'
  },
  {
    id: 3,
    title: 'Harsukh Residencies — Nathia Gali Suites',
    specs: 'Furnished Mountain Suites & Penthouses • 8,200 Ft',
    badge: '20%+ Rental ROI',
    description: 'Wake up above the clouds in serene Nathia Gali pine forests. Timber-and-stone luxury suites with thermal terrace pools and hands-off rental management.',
    price: 'PKR 1.65 Crore (3-Yr Plan)',
    ctaText: 'View in Listings',
    listingLink: '/listings?keyword=Harsukh',
    link: '/hr-sukh',
    image: '/images/hero-harsukh.webp'
  },
  {
    id: 4,
    title: 'Banu Hafeez Luxury Apartments (TopCity-1)',
    specs: '1, 2 & 3 Bed Residences • 15% Booking • 3-Year Plan',
    badge: '17-Storey Landmark Tower',
    description: 'Approved 17-storey luxury landmark by Waheed Group in TopCity-1, Islamabad. Resident swimming pool, gym, 2 basements parking (281 cars), 2-year possession.',
    price: 'PKR 98.3 Lac – 3.38 Cr',
    ctaText: 'View Banu Hafeez Details',
    listingLink: '/featured-building',
    link: '/featured-building',
    image: '/images/banu-hafeez-hero.webp'
  },
  {
    id: 5,
    title: 'Spanish Architecture Luxury Villa (Gulberg Greens)',
    specs: '1 Kanal (500 Sq Yds) • 5 Beds • 20kW Tier-1 Solar Net Metering',
    badge: 'Turnkey Ready',
    description: 'Custom turnkey designer residence with Italian kitchen, landscaped private lawn, Grade-60 steel seismic structure, and zero electricity bills via solar.',
    price: 'PKR 7.50 Crore',
    ctaText: 'View Villa in Listings',
    listingLink: '/listings?keyword=Gulberg',
    link: '/property/spanish-luxury-villa-gulberg-greens',
    image: '/images/hero-real-estate.webp'
  },
  {
    id: 6,
    title: 'Airport Green Garden (AGG) Moqa Plots',
    specs: '5, 8, 10 Marla & 1 Kanal • 3,700 Plots Possession • RDA Approved',
    badge: '7 KM to Airport • Kashmir Highway',
    description: 'RDA-approved master-planned community adjoining New Islamabad Airport & Kashmir Highway. 1,500 plots possession delivered with 2,200 more in Dec 2026. Wide carpeted boulevards & underground utilities.',
    price: 'PKR 35 Lac – 1.85 Crore',
    ctaText: 'View AGG Plots in Listings',
    listingLink: '/listings?keyword=AGG&type=plot',
    link: '/property/agg-airport-green-garden-5-marla-moqa-ka-plot',
    image: '/images/agg/agg-plots-hero.webp'
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

onMounted(() => {
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
