<template>
  <div class="home-page">
    <!-- Top Customizable Limited-Time Offer Strip (Backend Controlled) -->
    <TopOfferStrip />

    <!-- 1. Hero Section (Full screen villa sunset with left soft gradient) -->
    <HeroSection />

    <!-- 2. ONE Proper Unified Property Hub (Search + Handpicked Portfolio in One Flow, Not in Chunks) -->
    <section class="bg-[#F6F8FA] pb-12 sm:pb-16 border-b border-gray-200/60">
      <HeroSearch />
      <FeaturedCarousel v-if="mounted > 0" />
    </section>

    <!--
      Everything below is outside the first viewport. Each section is its own chunk.
      Once the page is idle they are fetched in parallel and mounted top-to-bottom,
      one per task, so they never delay the hero or block the main thread for long.
      As soon as the visitor scrolls or taps, all remaining sections mount at once.
    -->
    <!-- 3. Top Spotlight Section: Harsukh Nathia Gali -->
    <TopSpotlightBar v-if="mounted > 1" />

    <!-- 4. Feature Highlights Row (4 items with small rounded images) -->
    <FeatureHighlights v-if="mounted > 2" />

    <!-- 5. About Section ("Making Real Estate Simpler" + checklist + 1,000+ happy customers) -->
    <AboutSection v-if="mounted > 3" />

    <!-- 6. Stats Band (Full-width navy bar with 4 animated count-up numbers) -->
    <StatsBand v-if="mounted > 4" />

    <!-- 7. "Trusted By Thousands" (eyebrow WHAT OUR CLIENTS SAY, 3 testimonial cards) -->
    <Testimonials v-if="mounted > 5" />

    <!-- 8. "Find A Home That Fits Your Lifestyle" (eyebrow EXPLORE BY LIFESTYLE, horizontal cards) -->
    <LifestyleCarousel v-if="mounted > 6" />

    <!-- 9. "Everything You Need To Run A Real Estate Business" (eyebrow WHY CHOOSE TOPLINKERS) -->
    <WhyChoose v-if="mounted > 7" />

    <!-- 10. "Explore Properties In Top Locations" (eyebrow FEATURED LOCATIONS, 4 city/sector cards) -->
    <TopLocations v-if="mounted > 8" />

    <!-- 11. Latest Market Insights & Real Estate Blog -->
    <LatestBlogSection v-if="mounted > 9" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import TopOfferStrip from '../components/home/TopOfferStrip.vue'
import HeroSection from '../components/home/HeroSection.vue'
import HeroSearch from '../components/home/HeroSearch.vue'
import { scrollTo } from '../services/lenis'
import { whenIdle, onFirstInteraction, nextIdleTask } from '../utils/idle'

// Below-the-fold sections, in page order: code-split so the homepage's critical JS stays small.
const sectionLoaders = [
  () => import('../components/home/FeaturedCarousel.vue'),
  () => import('../components/home/TopSpotlightBar.vue'),
  () => import('../components/home/FeatureHighlights.vue'),
  () => import('../components/home/AboutSection.vue'),
  () => import('../components/home/StatsBand.vue'),
  () => import('../components/home/Testimonials.vue'),
  () => import('../components/home/LifestyleCarousel.vue'),
  () => import('../components/home/WhyChoose.vue'),
  () => import('../components/home/TopLocations.vue'),
  () => import('../components/home/LatestBlogSection.vue')
]
const [
  FeaturedCarousel,
  TopSpotlightBar,
  FeatureHighlights,
  AboutSection,
  StatsBand,
  Testimonials,
  LifestyleCarousel,
  WhyChoose,
  TopLocations,
  LatestBlogSection
] = sectionLoaders.map(loader => defineAsyncComponent(loader))

const TOTAL_SECTIONS = sectionLoaders.length
const mounted = ref(0)

let cancelIdle = null
let cancelInteraction = null
let cancelStep = null
let prefetched = false

const prefetchSections = () => {
  if (prefetched) return
  prefetched = true
  sectionLoaders.forEach(load => load().catch(() => {}))
}

const mountAll = () => {
  prefetchSections()
  if (cancelStep) cancelStep()
  mounted.value = TOTAL_SECTIONS
}

const mountNext = () => {
  if (mounted.value >= TOTAL_SECTIONS) return
  mounted.value++
  cancelStep = nextIdleTask(mountNext)
}

onMounted(() => {
  document.title = 'TopLinkers | Premier Real Estate, Turnkey Construction & Solar | Islamabad'
  scrollTo(0, { immediate: true })

  cancelIdle = whenIdle(() => {
    prefetchSections()
    mountNext()
  })
  cancelInteraction = onFirstInteraction(mountAll)
})

onUnmounted(() => {
  if (cancelIdle) cancelIdle()
  if (cancelInteraction) cancelInteraction()
  if (cancelStep) cancelStep()
})
</script>
