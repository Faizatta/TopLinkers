<template>
  <div class="home-page">
    <!-- Top Customizable Limited-Time Offer Strip (Backend Controlled) -->
    <TopOfferStrip />

    <!-- 1. Hero Section (Full screen villa sunset with left soft gradient) -->
    <HeroSection />

    <!-- 2. ONE Proper Unified Property Hub (Search + Handpicked Portfolio in One Flow, Not in Chunks) -->
    <section class="bg-[#F6F8FA] pb-12 sm:pb-16 border-b border-gray-200/60">
      <HeroSearch />
      <FeaturedCarousel />
    </section>

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
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import TopOfferStrip from '../components/home/TopOfferStrip.vue'
import HeroSection from '../components/home/HeroSection.vue'
import HeroSearch from '../components/home/HeroSearch.vue'
import TopSpotlightBar from '../components/home/TopSpotlightBar.vue'
import FeatureHighlights from '../components/home/FeatureHighlights.vue'
import FeaturedCarousel from '../components/home/FeaturedCarousel.vue'
import AboutSection from '../components/home/AboutSection.vue'
import StatsBand from '../components/home/StatsBand.vue'
import Testimonials from '../components/home/Testimonials.vue'
import LifestyleCarousel from '../components/home/LifestyleCarousel.vue'
import WhyChoose from '../components/home/WhyChoose.vue'
import TopLocations from '../components/home/TopLocations.vue'
import LatestBlogSection from '../components/home/LatestBlogSection.vue'
import { scrollTo } from '../services/lenis'

onMounted(() => {
  document.title = 'TopLinkers | Premier Real Estate, Turnkey Construction & Solar | Islamabad'
  scrollTo(0, { immediate: true })
})
</script>
