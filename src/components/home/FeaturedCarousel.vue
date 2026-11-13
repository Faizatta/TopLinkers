<template>
  <div class="pt-10 sm:pt-14 pb-8 select-none">
    <div class="max-w-[1280px] mx-auto px-4">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
        <SectionHeading
          eyebrow="FEATURED PROPERTIES"
          title="Handpicked Properties For You"
          highlight="Properties"
          subtitle="Explore our top featured residential plots, PHA apartments, and luxury villas across Islamabad & Rawalpindi."
          align="left"
        />
      </div>

      <!-- Swiper Carousel (Prominent 3-card layout on desktop with smooth Autoplay animation) -->
      <!-- Created once the cards are available, so Swiper initialises (and builds its loop) only once -->
      <swiper
        v-if="featuredProperties.length"
        :modules="modules"
        :slides-per-view="1"
        :space-between="28"
        :speed="550"
        :loop="true"
        :prevent-clicks="false"
        :prevent-clicks-propagation="false"
        :touch-start-prevent-default="false"
        :threshold="10"
        :autoplay="{
          delay: 2200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :pagination="{
          clickable: true,
          el: '.featured-pagination',
          bulletClass: 'toplinkers-bullet',
          bulletActiveClass: 'toplinkers-bullet-active'
        }"
        :breakpoints="{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 }
        }"
        class="featured-swiper w-full pb-4"
        @swiper="onSwiper"
        @click="onSwiperClick"
      >
        <swiper-slide v-for="prop in featuredProperties" :key="prop.id" class="!h-auto flex">
          <PropertyCard :property="prop" class="w-full h-full" />
        </swiper-slide>
      </swiper>

      <!-- Dot pagination below -->
      <div class="featured-pagination flex justify-center items-center gap-2 mt-8"></div>

      <!-- Centered Cyan "View All Properties ->" button below carousel -->
      <div class="mt-12 text-center">
        <router-link
          to="/listings"
          class="btn-arrow-slide inline-flex items-center justify-center px-8 py-4 bg-[#16B4E8] hover:bg-[#0F2A44] text-white text-xs font-black uppercase tracking-wider rounded-[4px] transition-all shadow-md group"
        >
          <span>View All Properties (40+)</span>
          <ArrowRightIcon class="arrow-icon w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import SectionHeading from '../ui/SectionHeading.vue'
import PropertyCard from '../property/PropertyCard.vue'
import { api } from '../../services/api'
import { useAutoplayWhenVisible } from '../../composables/useAutoplayWhenVisible'

const router = useRouter()
const modules = [Autoplay, Pagination]
// Autoplay only while the carousel is on screen (same behaviour when visible)
const { onSwiper } = useAutoplayWhenVisible()
const featuredProperties = ref([])

const onSwiperClick = (swiper, event) => {
  const target = event?.target
  if (target && target.closest('button')) return

  const card = target?.closest('[data-slug]') || swiper?.clickedSlide?.querySelector('[data-slug]')
  if (card) {
    const slug = card.getAttribute('data-slug')
    if (slug) {
      router.push(`/property/${slug}`)
    }
  }
}

onMounted(async () => {
  featuredProperties.value = await api.getFeaturedProperties(12)
})
</script>

<style>
.featured-swiper .swiper-wrapper {
  align-items: stretch;
}

.toplinkers-bullet {
  width: 8px;
  height: 8px;
  background-color: #cbd5e1;
  border-radius: 9999px;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toplinkers-bullet-active {
  background-color: #16B4E8;
  width: 24px;
}
</style>
