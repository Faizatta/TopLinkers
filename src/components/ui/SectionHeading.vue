<template>
  <div :class="['mb-10', align === 'center' ? 'text-center' : 'text-left']">
    <!-- Small uppercase cyan eyebrow label -->
    <div v-if="eyebrow" class="text-xs font-extrabold tracking-widest uppercase text-[#16B4E8] mb-2 inline-flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
      <span>{{ eyebrow }}</span>
    </div>

    <!-- Bold Navy Title (36px, with highlight words in cyan) -->
    <component
      :is="tag || 'h2'"
      class="text-2xl sm:text-3xl md:text-[36px] font-extrabold text-[#0F2A44] leading-tight tracking-tight"
    >
      <slot name="title">
        <span v-html="formattedTitle"></span>
      </slot>
    </component>

    <!-- Subtitle if provided -->
    <p v-if="subtitle" :class="['text-sm text-gray-500 mt-2.5 max-w-2xl font-normal leading-relaxed', align === 'center' ? 'mx-auto' : '']">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  highlight: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: 'h2'
  },
  align: {
    type: String,
    default: 'center', // 'center' | 'left'
    validator: (v) => ['center', 'left'].includes(v)
  }
})

const formattedTitle = computed(() => {
  if (!props.highlight || !props.title) return props.title
  const regex = new RegExp(`(${props.highlight})`, 'gi')
  return props.title.replace(regex, '<span class="text-[#16B4E8] font-black">$1</span>')
})
</script>
