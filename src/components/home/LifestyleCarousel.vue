<template>
  <section class="py-20 md:py-24 bg-white select-none">
    <div class="max-w-[1280px] mx-auto px-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
        <SectionHeading
          eyebrow="EXPLORE BY LIFESTYLE"
          title="Find A Home That Fits Your Lifestyle"
          highlight="Lifestyle"
          subtitle="Whether you seek a high-yield commercial plaza, a luxury Margalla-view villa, or a ready PHA flat."
          align="left"
        />

        <!-- Live Auto-sliding Pulse Badge -->
        <!-- <div class="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-[#F8FAFC] rounded-full border border-gray-200/90 shadow-xs text-xs font-bold text-[#0F2A44]">
          <span class="w-2 h-2 rounded-full bg-[#16B4E8] animate-ping"></span>
          <span class="text-[11px] font-extrabold text-[#16B4E8]">Curated Categories</span>
        </div> -->
      </div>

      <!-- Carousel of horizontal property-type cards (Auto-sliding) -->
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="24"
        :loop="true"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :pagination="{
          clickable: true,
          el: '.lifestyle-pagination',
          bulletClass: 'toplinkers-bullet',
          bulletActiveClass: 'toplinkers-bullet-active'
        }"
        :breakpoints="{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 }
        }"
        class="w-full pb-4"
      >
        <swiper-slide v-for="t in types" :key="t.id">
          <router-link
            :to="`/listings?type=${t.slug}`"
            class="group flex items-center bg-[#F8FAFC] hover:bg-white p-5 rounded-2xl border border-gray-200/90 hover:border-[#16B4E8] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Square image on left (enlarged for prominence) -->
            <div class="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 mr-4 border border-gray-200 bg-gray-100 shadow-xs">
              <img
                :src="t.image"
                :srcset="responsiveSrcset(t.image, [200, 300])"
                sizes="96px"
                :alt="t.name"
                loading="lazy"
                decoding="async"
                width="96"
                height="96"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <!-- Type name plus property count on right -->
            <div class="flex-1 min-w-0">
              <h4 class="text-base sm:text-lg font-black text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors truncate">
                {{ t.name }}
              </h4>
              <span class="inline-block text-xs font-extrabold text-[#16B4E8] mt-0.5">
                {{ t.count }} Properties Available
              </span>
              <p class="text-xs text-gray-500 line-clamp-2 mt-1 font-normal leading-relaxed">
                {{ t.description }}
              </p>
            </div>

            <!-- Arrow icon -->
            <div class="text-[#16B4E8] ml-2 transform group-hover:translate-x-1.5 transition-transform flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>

      <div class="lifestyle-pagination flex justify-center items-center gap-2 mt-8"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { responsiveSrcset } from '../../utils/images'
import 'swiper/css'
import 'swiper/css/pagination'
import SectionHeading from '../ui/SectionHeading.vue'
import { api } from '../../services/api'

const modules = [Autoplay, Pagination]
const types = ref([])

onMounted(async () => {
  types.value = await api.getTypes()
})
</script>
