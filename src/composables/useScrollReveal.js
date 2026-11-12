import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollReveal(options = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) {
  const targetRef = ref(null)
  const isVisible = ref(false)
  let observer = null

  onMounted(() => {
    if (!targetRef.value) return

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (observer && targetRef.value) {
            observer.unobserve(targetRef.value)
          }
        }
      }, options)
      observer.observe(targetRef.value)
    } else {
      isVisible.value = true
    }
  })

  onUnmounted(() => {
    if (observer && targetRef.value) {
      observer.unobserve(targetRef.value)
      observer.disconnect()
    }
  })

  return {
    targetRef,
    isVisible
  }
}
