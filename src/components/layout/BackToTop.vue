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
import { useFooterClearance } from '../../composables/useFooterClearance'

const showButton = ref(false)
// Shared, frame-throttled footer clearance (one measurement for all floating widgets)
const { bottomOffset } = useFooterClearance()


// Reading scrollY does not force a layout, so this stays cheap on every scroll event
const handleScroll = () => {
  showButton.value = window.scrollY > 350
}

const scrollToTop = () => {
  scrollTo(0, { duration: 1.2 })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
