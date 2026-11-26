<template>
  <div
    class="bg-white rounded-xl p-4 sm:p-5 border shadow-2xs transition-colors flex items-start justify-between gap-3"
    :class="borderClass"
  >
    <div class="min-w-0">
      <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-500 truncate">
        {{ label }}
      </p>
      <p class="text-2xl font-bold tracking-tight mt-1" :class="valueClass">
        {{ value }}
      </p>
      <p v-if="hint" class="text-[11px] mt-1 truncate" :class="hintClass">
        {{ hint }}
      </p>
    </div>

    <div
      v-if="icon"
      class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
      :class="iconBgClass"
    >
      <component :is="icon" class="w-5 h-5" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  hint: { type: String, default: '' },
  tone: {
    type: String,
    default: 'slate', // slate | sky | emerald | amber | rose
  },
  icon: { type: [Object, Function], default: null }
})

const borderClass = computed(() => {
  const map = {
    emerald: 'border-emerald-200/80',
    amber: 'border-amber-200/80',
    rose: 'border-rose-200/80',
    sky: 'border-sky-200/80',
    slate: 'border-slate-200/90'
  }
  return map[props.tone] || map.slate
})

const valueClass = computed(() => {
  const map = {
    emerald: 'text-emerald-700',
    amber: 'text-amber-700',
    rose: 'text-rose-700',
    sky: 'text-[#0F2A44]',
    slate: 'text-[#0F2A44]'
  }
  return map[props.tone] || map.slate
})

const hintClass = computed(() => {
  const map = {
    emerald: 'text-emerald-600 font-medium',
    amber: 'text-amber-700 font-medium',
    rose: 'text-rose-600 font-medium',
    sky: 'text-[#16B4E8] font-medium',
    slate: 'text-slate-500'
  }
  return map[props.tone] || map.slate
})

const iconBgClass = computed(() => {
  const map = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    sky: 'bg-sky-50 text-[#16B4E8] border-sky-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-200/80'
  }
  return map[props.tone] || map.slate
})
</script>
