<template>
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-gray-200 gap-3">
    <div>
      <h2 class="text-lg md:text-xl font-extrabold text-[#0F2A44]">
        {{ total }} Results Found
      </h2>
      <p class="text-xs text-gray-400">
        Verified real estate in Islamabad & Rawalpindi, Pakistan
      </p>
    </div>

    <!-- Sort by select -->
    <div class="flex items-center gap-2 self-end sm:self-center">
      <label for="results-sort" class="text-xs font-bold text-gray-500 whitespace-nowrap">Sort by:</label>
      <select
        id="results-sort"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        class="text-xs font-semibold py-2 px-3 rounded-[4px] border border-gray-200 bg-white text-[#0F2A44] focus:outline-none focus:border-[#16B4E8]"
      >
        <option value="newest">Default Order / Newest</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  total: {
    type: Number,
    default: 0
  },
  modelValue: {
    type: String,
    default: 'newest'
  }
})

defineEmits(['update:modelValue'])
</script>
