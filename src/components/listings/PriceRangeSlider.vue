<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between text-xs font-semibold text-[#0F2A44]">
      <span>Min: {{ formatPkr(minVal) }}</span>
      <span>Max: {{ formatPkr(maxVal) }}</span>
    </div>

    <!-- Dual Slider Controls -->
    <div class="relative py-2 flex items-center">
      <input
        type="range"
        :min="minLimit"
        :max="maxLimit"
        :step="step"
        v-model.number="minVal"
        @input="onMinChange"
        class="w-full accent-[#16B4E8] cursor-pointer"
      />
    </div>
    <div class="relative flex items-center">
      <input
        type="range"
        :min="minLimit"
        :max="maxLimit"
        :step="step"
        v-model.number="maxVal"
        @input="onMaxChange"
        class="w-full accent-[#0F2A44] cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelMin: {
    type: [Number, String],
    default: 500000
  },
  modelMax: {
    type: [Number, String],
    default: 150000000
  },
  minLimit: {
    type: Number,
    default: 500000
  },
  maxLimit: {
    type: Number,
    default: 150000000
  },
  step: {
    type: Number,
    default: 500000
  }
})

const emit = defineEmits(['update:modelMin', 'update:modelMax', 'change'])

const minVal = ref(Number(props.modelMin) || props.minLimit)
const maxVal = ref(Number(props.modelMax) || props.maxLimit)

watch(() => props.modelMin, (v) => {
  minVal.value = Number(v) || props.minLimit
})
watch(() => props.modelMax, (v) => {
  maxVal.value = Number(v) || props.maxLimit
})

const onMinChange = () => {
  if (minVal.value > maxVal.value) {
    minVal.value = maxVal.value
  }
  emit('update:modelMin', minVal.value)
  emit('change', { min: minVal.value, max: maxVal.value })
}

const onMaxChange = () => {
  if (maxVal.value < minVal.value) {
    maxVal.value = minVal.value
  }
  emit('update:modelMax', maxVal.value)
  emit('change', { min: minVal.value, max: maxVal.value })
}

const formatPkr = (val) => {
  if (!val) return 'PKR 0'
  if (val >= 10000000) {
    return `PKR ${(val / 10000000).toFixed(1)} Crore`
  }
  if (val >= 100000) {
    return `PKR ${Math.round(val / 100000)} Lac`
  }
  return `PKR ${val.toLocaleString()}`
}
</script>
