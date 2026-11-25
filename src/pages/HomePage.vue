<template>
  <div class="home-page pt-[66px] sm:pt-[80px]">
    <h1 class="sr-only">TopLinkers | Premier Real Estate, Turnkey Construction &amp; Solar in Islamabad</h1>
    <!-- Top Customizable Limited-Time Offer Strip (Backend Controlled, loaded only when active) -->
    <TopOfferStrip v-if="showOfferStrip" />

    <!-- 1. Hero Section (Full screen villa sunset with left soft gradient) -->
    <HeroSection />

    <!-- 2. ONE Proper Unified Property Hub (Search + Handpicked Portfolio in One Flow, Not in Chunks) -->
    <section class="bg-[#F6F8FA] pb-12 sm:pb-16 border-b border-gray-200/60">
      <HeroSearch />
      <LazySection v-if="belowFoldReady" min-height="450px" root-margin="0px">
        <FeaturedCarousel />
      </LazySection>
    </section>

    <template v-if="belowFoldReady">
      <!-- 3. Top Spotlight Section: Harsukh Nathia Gali -->
      <LazySection min-height="260px">
        <TopSpotlightBar />
      </LazySection>

      <!-- 4. Feature Highlights Row (4 items with small rounded images) -->
      <LazySection min-height="160px">
        <FeatureHighlights />
      </LazySection>

      <!-- 5. About Section ("Making Real Estate Simpler" + checklist + 1,000+ happy customers) -->
      <LazySection min-height="500px">
        <AboutSection />
      </LazySection>

      <!-- 6. Stats Band (Full-width navy bar with 4 animated count-up numbers) -->
      <LazySection min-height="140px">
        <StatsBand />
      </LazySection>

      <!-- 7. "Trusted By Thousands" (eyebrow WHAT OUR CLIENTS SAY, 3 testimonial cards) -->
      <LazySection min-height="450px">
        <Testimonials />
      </LazySection>

      <!-- 8. "Find A Home That Fits Your Lifestyle" (eyebrow EXPLORE BY LIFESTYLE, horizontal cards) -->
      <LazySection min-height="450px">
        <LifestyleCarousel />
      </LazySection>

      <!-- 9. "Everything You Need To Run A Real Estate Business" (eyebrow WHY CHOOSE TOPLINKERS) -->
      <LazySection min-height="500px">
        <WhyChoose />
      </LazySection>

      <!-- 10. "Explore Properties In Top Locations" (eyebrow FEATURED LOCATIONS, 4 city/sector cards) -->
      <LazySection min-height="450px">
        <TopLocations />
      </LazySection>

      <!-- 11. Latest Market Insights & Real Estate Blog -->
      <LazySection min-height="500px">
        <LatestBlogSection />
      </LazySection>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import LazySection from '../components/ui/LazySection.vue'
import HeroSection from '../components/home/HeroSection.vue'
import HeroSearch from '../components/home/HeroSearch.vue'

const TopOfferStrip = defineAsyncComponent(() => import('../components/home/TopOfferStrip.vue'))
const showOfferStrip = ref(false)
try {
  const raw = typeof localStorage !== 'undefined' && localStorage.getItem('toplinkers_promo_strip')
  if (raw && JSON.parse(raw)?.enabled === true) showOfferStrip.value = true
} catch (e) {}

// Below-the-fold sections are code-split and lazy-loaded so initial main-thread
// execution focuses exclusively on the hero, delivering sub-second LCP and Speed Index.
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
import { scrollTo } from '../services/lenis'

const belowFoldReady = ref(false)

onMounted(() => {
  document.title = 'TopLinkers | Premier Real Estate, Turnkey Construction & Solar | Islamabad'
  if (typeof window !== 'undefined' && window.scrollY > 0) {
    scrollTo(0, { immediate: true })
  }
  // Yield one frame so the hero paints immediately before initializing below-fold observers
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => {
      setTimeout(() => { belowFoldReady.value = true }, 0)
    })
  } else {
    belowFoldReady.value = true
  }
})
</script>
