<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'btn-arrow-slide inline-flex items-center justify-center font-bold tracking-wide rounded transition-all duration-200 select-none group focus:outline-none focus:ring-2 focus:ring-offset-1',
      sizeClasses,
      variantClasses,
      (disabled || loading) ? 'opacity-60 cursor-not-allowed' : 'active:scale-[0.98]'
    ]"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
    <slot name="icon-left" />
    <slot />
    <!-- Sliding arrow icon on the right -->
    <svg
      v-if="arrow && !loading"
      class="arrow-icon w-4 h-4 ml-2 transition-transform duration-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
    <slot name="icon-right" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'cyan', // 'cyan' | 'navy' | 'outline' | 'white' | 'ghost'
    validator: (v) => ['cyan', 'navy', 'outline', 'outline-cyan', 'white', 'ghost'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  arrow: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-xs px-3.5 py-2'
    case 'lg':
      return 'text-base px-7 py-4 font-extrabold'
    case 'md':
    default:
      return 'text-sm px-5 py-3'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'navy':
      return 'bg-[#0F2A44] hover:bg-[#173f67] text-white focus:ring-[#0F2A44]'
    case 'outline':
      return 'border border-gray-300 text-[#0F2A44] bg-white hover:bg-gray-50 focus:ring-gray-300'
    case 'outline-cyan':
      return 'border-2 border-[#16B4E8] text-[#16B4E8] hover:bg-[#16B4E8] hover:text-white focus:ring-[#16B4E8]'
    case 'white':
      return 'bg-white text-[#0F2A44] hover:bg-gray-100 shadow-sm focus:ring-white'
    case 'ghost':
      return 'bg-transparent text-gray-600 hover:text-[#0F2A44] hover:bg-gray-100'
    case 'cyan':
    default:
      return 'bg-[#16B4E8] hover:bg-[#119ecf] text-white focus:ring-[#16B4E8]'
  }
})
</script>
