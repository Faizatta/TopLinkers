<template>
  <div
    v-if="totalItems > 0"
    class="px-4 py-3 border-t border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
  >
    <div class="flex items-center gap-3 text-slate-500">
      <span>
        Showing <strong class="text-slate-800">{{ startItem }}</strong>–<strong class="text-slate-800">{{ endItem }}</strong> of
        <strong class="text-slate-800">{{ totalItems }}</strong>
      </span>
      <select
        v-if="showPageSize"
        :value="pageSize"
        @change="$emit('update:pageSize', Number($event.target.value)); $emit('update:page', 1)"
        class="px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:border-[#0F2A44]"
        aria-label="Items per page"
      >
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }} / page</option>
      </select>
    </div>

    <div v-if="totalPages > 1" class="flex items-center gap-1">
      <button
        type="button"
        :disabled="page <= 1"
        @click="$emit('update:page', page - 1)"
        class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>

      <button
        v-for="p in visiblePages"
        :key="p"
        type="button"
        @click="$emit('update:page', p)"
        class="min-w-[30px] px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors"
        :class="p === page ? 'bg-[#0F2A44] text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'"
      >
        {{ p }}
      </button>

      <button
        type="button"
        :disabled="page >= totalPages"
        @click="$emit('update:page', page + 1)"
        class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  totalItems: { type: Number, required: true },
  showPageSize: { type: Boolean, default: true },
  pageSizes: { type: Array, default: () => [10, 20, 50] }
})

defineEmits(['update:page', 'update:pageSize'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.pageSize)))
const startItem = computed(() => ((props.page - 1) * props.pageSize) + 1)
const endItem = computed(() => Math.min(props.totalItems, props.page * props.pageSize))

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = props.page
  const pages = []
  const start = Math.max(1, current - 2)
  const end = Math.min(total, start + 4)
  for (let i = Math.max(1, end - 4); i <= end; i++) {
    pages.push(i)
  }
  return pages
})
</script>
