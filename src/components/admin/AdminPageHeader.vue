<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-1">
    <div class="min-w-0">
      <div class="flex items-center gap-2.5 flex-wrap">
        <h1 class="text-lg sm:text-xl font-bold text-[#0F2A44] tracking-tight truncate">
          {{ title }}
        </h1>
        <span
          v-if="badge"
          class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
        >
          {{ badge }}
        </span>
        <span
          v-if="loading"
          class="inline-block w-3.5 h-3.5 border-2 border-[#16B4E8] border-t-transparent rounded-full animate-spin"
          title="Syncing..."
        ></span>
      </div>
      <p v-if="subtitle" class="text-xs text-slate-500 mt-0.5 leading-relaxed">
        {{ subtitle }}
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-2 flex-shrink-0">
      <a
        v-if="liveUrl"
        :href="liveUrl"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs"
      >
        <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5 text-slate-400" />
        <span>{{ liveLabel || 'View Live' }}</span>
      </a>
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  liveLabel: { type: String, default: 'View Live' },
  loading: { type: Boolean, default: false }
})
</script>
