<template>
  <div ref="rootEl" class="lazy-section-wrapper">
    <slot v-if="shouldRender" />
    <div v-else :style="{ minHeight }" class="w-full transition-opacity" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  minHeight: {
    type: String,
    default: '320px'
  },
  rootMargin: {
    type: String,
    default: '400px'
  }
})

const rootEl = ref(null)
const shouldRender = ref(false)

onMounted(() => {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    shouldRender.value = true
    return
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      shouldRender.value = true
      observer.disconnect()
    }
  }, { rootMargin: props.rootMargin })

  if (rootEl.value) {
    observer.observe(rootEl.value)
  }
})
</script>
