<template>
  <div class="hero-swiper-container relative w-full h-[600px] sm:h-[660px] md:h-[740px] bg-gray-950 overflow-hidden select-none group">
    <!-- Swiper Container with Horizontal Slide Animation (Houzez demo02 style) -->
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      :speed="750"
      :autoplay="{
        delay: 2800,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      }"
      class="w-full h-full"
    >
      <swiper-slide
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="hero-slide relative w-full h-full cursor-pointer"
        @click="goToSlideLink(slide.link)"
      >
        <!-- Background Image with Soft Ken Burns Zoom -->
        <div class="absolute inset-0 w-full h-full overflow-hidden">
          <img
            :src="slide.image"
            :alt="`${slide.title} - TopLinkers Islamabad`"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetchpriority="index === 0 ? 'high' : 'low'"
            decoding="async"
            width="1920"
            height="1080"
            class="slide-bg-image w-full h-full object-cover object-center"
          />

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
                <svg class="arrow-icon w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

const modules = [Autoplay]
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

const goToSlideLink = (link) => {
  if (link) {
    router.push(link)
  }
}
</script>

<style>
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
</style>
