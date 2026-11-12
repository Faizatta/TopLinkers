<template>
  <div class="home-page">
    <!-- Top Customizable Limited-Time Offer Strip (Backend Controlled) -->
    <TopOfferStrip />

    <!-- 1. Hero Section (Full screen villa sunset with left soft gradient) -->
    <HeroSection />

    <!-- 2. ONE Proper Unified Property Hub (Search + Handpicked Portfolio in One Flow, Not in Chunks) -->
    <section class="bg-[#F6F8FA] pb-12 sm:pb-16 border-b border-gray-200/60">
      <HeroSearch />
      <FeaturedCarousel v-if="showBelowFold" />
    </section>

    <!--
      Everything below is outside the first viewport. Each section is its own chunk
      and is rendered once the page is idle (or as soon as the visitor scrolls or
      taps), so it never delays the hero. All sections still render on every visit.
    -->
    <template v-if="showBelowFold">
      <!-- 3. Top Spotlight Section: Harsukh Nathia Gali -->
      <TopSpotlightBar />

      <!-- 4. Feature Highlights Row (4 items with small rounded images) -->
      <FeatureHighlights />

      <!-- 5. About Section ("Making Real Estate Simpler" + checklist + 1,000+ happy customers) -->
      <AboutSection />

      <!-- 6. Stats Band (Full-width navy bar with 4 animated count-up numbers) -->
      <StatsBand />

      <!-- 7. "Trusted By Thousands" (eyebrow WHAT OUR CLIENTS SAY, 3 testimonial cards) -->
      <Testimonials />

      <!-- 8. "Find A Home That Fits Your Lifestyle" (eyebrow EXPLORE BY LIFESTYLE, horizontal cards) -->
      <LifestyleCarousel />

      <!-- 9. "Everything You Need To Run A Real Estate Business" (eyebrow WHY CHOOSE TOPLINKERS) -->
      <WhyChoose />

      <!-- 10. "Explore Properties In Top Locations" (eyebrow FEATURED LOCATIONS, 4 city/sector cards) -->
      <TopLocations />

      <!-- 11. Latest Market Insights & Real Estate Blog -->
      <LatestBlogSection />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import TopOfferStrip from '../components/home/TopOfferStrip.vue'
import HeroSection from '../components/home/HeroSection.vue'
import HeroSearch from '../components/home/HeroSearch.vue'
import { scrollTo } from '../services/lenis'
import { whenIdleOrInteraction } from '../utils/idle'

// Below-the-fold sections: code-split so the homepage's critical JS stays small.
const FeaturedCarousel = defineAsyncComponent(() => import('../components/home/FeaturedCarousel.vue'))
const TopSpotlightBar = defineAsyncComponent(() => import('../components/home/TopSpotlightBar.vue'))
const FeatureHighlights = defineAsyncComponent(() => import('../components/home/FeatureHighlights.vue'))
const AboutSection = defineAsyncComponent(() => import('../components/home/AboutSection.vue'))
const StatsBand = defineAsyncComponent(() => import('../components/home/StatsBand.vue'))
const Testimonials = defineAsyncComponent(() => import('../components/home/Testimonials.vue'))
const LifestyleCarousel = defineAsyncComponent(() => import('../components/home/LifestyleCarousel.vue'))
const WhyChoose = defineAsyncComponent(() => import('../components/home/WhyChoose.vue'))
const TopLocations = defineAsyncComponent(() => import('../components/home/TopLocations.vue'))
const LatestBlogSection = defineAsyncComponent(() => import('../components/home/LatestBlogSection.vue'))

const showBelowFold = ref(false)
let cancelDeferred = null

onMounted(() => {
  document.title = 'TopLinkers | Premier Real Estate, Turnkey Construction & Solar | Islamabad'
  scrollTo(0, { immediate: true })
  cancelDeferred = whenIdleOrInteraction(() => { showBelowFold.value = true })
})

onUnmounted(() => {
  if (cancelDeferred) cancelDeferred()
})
</script>
