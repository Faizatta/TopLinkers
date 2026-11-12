<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-show="showButton"
      type="button"
      class="fixed right-4 sm:right-6 z-40 w-11 h-11 bg-[#0F2A44] hover:bg-[#16B4E8] text-white flex items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none border border-white/20"
      :style="{ bottom: `${bottomOffset + 68}px` }"
      aria-label="Back to top"
      title="Back to top"
      @click="scrollToTop"
    >
      <ArrowUpIcon class="w-5 h-5" />
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUpIcon } from '@heroicons/vue/24/outline'
import { scrollTo } from '../../services/lenis'

const showButton = ref(false)
const bottomOffset = ref(24)

const updateFooterClearance = () => {
  const footer = document.getElementById('site-footer')
  if (!footer) {
    bottomOffset.value = 24
    return
  }
  const rect = footer.getBoundingClientRect()
  const docHeight = document.documentElement.scrollHeight
  const isScrolledNearBottom = (window.scrollY + window.innerHeight) >= (docHeight - 600)

  if (isScrolledNearBottom && rect.top < window.innerHeight && rect.top > 0) {
    const overlap = window.innerHeight - rect.top
    bottomOffset.value = Math.max(24, overlap + 24)
  } else {
    bottomOffset.value = 24
  }
}

const handleScroll = () => {
  showButton.value = window.scrollY > 350
  updateFooterClearance()
}

const scrollToTop = () => {
  scrollTo(0, { duration: 1.2 })
}

onMounted(() => {
  updateFooterClearance()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateFooterClearance, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateFooterClearance)
})
</script>
