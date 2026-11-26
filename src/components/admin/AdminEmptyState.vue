<template>
  <div class="bg-white rounded-xl border border-slate-200/90 p-10 sm:p-12 text-center shadow-2xs">
    <div class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-400 flex items-center justify-center mx-auto mb-3">
      <component :is="icon || InboxIcon" class="w-6 h-6" />
    </div>
    <h3 class="text-sm font-bold text-[#0F2A44]">{{ title }}</h3>
    <p v-if="description" class="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
      {{ description }}
    </p>
    <div v-if="$slots.action" class="mt-4 flex items-center justify-center gap-2">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup>
import { InboxIcon } from '@heroicons/vue/24/outline'

defineProps({
  title: { type: String, default: 'No records found' },
  description: { type: String, default: 'Try adjusting your search or filter criteria, or create a new item.' },
  icon: { type: [Object, Function], default: null }
})
</script>
