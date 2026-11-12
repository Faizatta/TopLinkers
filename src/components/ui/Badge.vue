<template>
  <span
    :class="[
      'inline-flex items-center font-extrabold tracking-wider uppercase rounded-full select-none whitespace-nowrap',
      sizeClasses,
      variantClasses
    ]"
  >
    <slot name="icon" />
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'dark',
    validator: (v) => ['featured', 'rent', 'sale', 'dark', 'hot', 'cyan', 'verified'].includes(v)
  },
  size: {
    type: String,
    default: 'sm',
    validator: (v) => ['xs', 'sm', 'md'].includes(v)
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'text-[9px] px-2 py-0.5'
    case 'md':
      return 'text-xs px-3.5 py-1'
    case 'sm':
    default:
      return 'text-[10px] px-2.5 py-0.5'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'featured':
      return 'bg-emerald-600/95 text-white shadow-sm backdrop-blur-md border border-emerald-400/25'
    case 'hot':
      return 'bg-rose-600/95 text-white shadow-sm backdrop-blur-md border border-rose-400/25 font-black'
    case 'rent':
      return 'bg-sky-600/90 text-white shadow-sm backdrop-blur-md border border-sky-400/25'
    case 'sale':
      return 'bg-[#0F2A44]/90 text-white shadow-sm backdrop-blur-md border border-white/20'
    case 'dark':
      return 'bg-black/65 text-white shadow-sm backdrop-blur-md border border-white/15'
    case 'cyan':
      return 'bg-[#16B4E8]/95 text-white shadow-sm backdrop-blur-md border border-white/25'
    case 'verified':
      return 'bg-emerald-600/95 text-white shadow-sm backdrop-blur-md border border-emerald-400/25'
    default:
      return 'bg-black/65 text-white shadow-sm backdrop-blur-md border border-white/15'
  }
})
</script>
