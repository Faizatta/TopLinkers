<template>
  <div v-if="parsedVideo" class="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md">
    <!-- Header strip with badge -->
    <div class="px-3.5 py-2 bg-gradient-to-r from-[#0F2A44] to-slate-800 text-white flex items-center justify-between text-xs border-b border-white/10">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] animate-pulse">
          ▶
        </span>
        <span class="font-bold text-[11px] sm:text-xs tracking-wide">
          {{ title || 'Site Land & Development Walkthrough' }}
        </span>
      </div>
      <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-semibold uppercase tracking-wider">
        Drone / Site Tour
      </span>
    </div>

    <!-- Video Viewport (16:9 ratio) -->
    <div class="relative w-full aspect-video bg-black flex items-center justify-center">
      <!-- Direct MP4/WebM Video -->
      <video
        v-if="parsedVideo.type === 'direct'"
        :src="parsedVideo.src"
        :poster="poster || '/images/hero-harsukh.webp'"
        controls
        playsinline
        preload="none"
        class="w-full h-full object-contain"
      ></video>

      <!-- Embedded Iframe (YouTube / Vimeo / Generic) -->
      <iframe
        v-else
        :src="parsedVideo.embedUrl"
        :title="title || 'Site Land Walkthrough Video'"
        class="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>

    <!-- Footer caption bar -->
    <div v-if="caption" class="px-3.5 py-2 bg-slate-950/80 text-slate-300 text-[11px] flex items-center justify-between border-t border-white/5">
      <span class="truncate">{{ caption }}</span>
      <span class="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">Verified Ground Progress</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { parseVideoUrl } from '../../utils/video'

const props = defineProps({
  videoUrl: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: 'Official ground layout, demarcated plots & infrastructure walkthrough'
  }
})

const parsedVideo = computed(() => parseVideoUrl(props.videoUrl))
</script>
