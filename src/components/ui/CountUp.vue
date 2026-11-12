<template>
  <span ref="el" class="inline-block">
    {{ prefix }}{{ displayValue.toLocaleString() }}{{ suffix }}
  </span>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  end: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 1800
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  }
})

const el = ref(null)
const displayValue = ref(0)
let observer = null

const startCount = () => {
  const startTime = performance.now()
  const startVal = 0
  const endVal = props.end

  const update = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    // Ease out quart
    const ease = 1 - Math.pow(1 - progress, 4)
    displayValue.value = Math.floor(startVal + (endVal - startVal) * ease)

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      displayValue.value = endVal
    }
  }

  requestAnimationFrame(update)
}

onMounted(() => {
  if ('IntersectionObserver' in window && el.value) {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startCount()
        observer.unobserve(el.value)
      }
    }, { threshold: 0.2 })
    observer.observe(el.value)
  } else {
    displayValue.value = props.end
  }
})

onUnmounted(() => {
  if (observer && el.value) {
    observer.unobserve(el.value)
    observer.disconnect()
  }
})
</script>
