<template>
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
    @swiper="onSwiper"
    @touch-start="emitHandoff"
    @slider-first-move="emitHandoff"
    @slide-change-transition-start="emitHandoff"
  >
    <swiper-slide
      v-for="(slide, index) in slides"
      :key="slide.id"
      class="hero-slide relative w-full h-full cursor-pointer"
      @click="$emit('slide-click', slide.link)"
    >
      <HeroSlide :slide="slide" :priority="index === 0" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import HeroSlide from './HeroSlide.vue'

defineProps({
  slides: { type: Array, required: true }
})

const emit = defineEmits(['ready', 'handoff', 'slide-click'])
const modules = [Autoplay]

// The parent keeps an identical static first slide on top of this carousel until
// the carousel actually starts moving (first autoplay transition or a user swipe).
// Events fired while Swiper is still initialising are ignored.
let isReady = false
let handedOff = false
const emitHandoff = () => {
  if (!isReady || handedOff) return
  handedOff = true
  emit('handoff')
}

const onSwiper = () => {
  // Let Swiper apply its active classes before telling the parent we're ready.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    isReady = true
    emit('ready')
  }))
}
</script>
