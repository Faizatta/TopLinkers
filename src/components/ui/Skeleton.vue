<template>
  <div
    :class="[
      'animate-pulse bg-gray-200 rounded',
      className
    ]"
    :style="customStyle"
  ></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '1rem'
  },
  className: {
    type: String,
    default: ''
  },
  circle: {
    type: Boolean,
    default: false
  }
})

const customStyle = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.circle ? '9999px' : undefined
}))
</script>
