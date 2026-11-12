<template>
  <span
    class="inline-flex items-center whitespace-pre"
    @mouseenter="triggerSwap"
  >
    <span
      v-for="(ch, i) in displayChars"
      :key="i"
      class="inline-block transition-transform duration-150"
      :class="swappingIndices.has(i) ? '-translate-y-[1px] text-[#16B4E8]' : 'translate-y-0'"
    >{{ ch }}</span>
  </span>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const displayChars = ref(props.text.split(''))
const swappingIndices = ref(new Set())
let animTimers = []

const clearAllTimers = () => {
  animTimers.forEach(id => clearTimeout(id))
  animTimers = []
  swappingIndices.value = new Set()
}

const triggerSwap = () => {
  clearAllTimers()
  const targetChars = props.text.split('')
  const steps = 4
  const stepMs = 38

  targetChars.forEach((finalChar, idx) => {
    if (finalChar === ' ') return

    const startDelay = idx * 22

    for (let s = 0; s < steps; s++) {
      const t = setTimeout(() => {
        const nextSet = new Set(swappingIndices.value)
        nextSet.add(idx)
        swappingIndices.value = nextSet

        const updated = [...displayChars.value]
        updated[idx] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        displayChars.value = updated
      }, startDelay + s * stepMs)
      animTimers.push(t)
    }

    const settleTimer = setTimeout(() => {
      const updated = [...displayChars.value]
      updated[idx] = finalChar
      displayChars.value = updated

      const nextSet = new Set(swappingIndices.value)
      nextSet.delete(idx)
      swappingIndices.value = nextSet
    }, startDelay + steps * stepMs)
    animTimers.push(settleTimer)
  })
}

watch(
  () => props.text,
  (val) => {
    clearAllTimers()
    displayChars.value = val.split('')
  }
)

onUnmounted(() => {
  clearAllTimers()
})
</script>
