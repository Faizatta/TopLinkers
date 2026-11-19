<template>
  <div
    v-if="isOpen && parsedVideo"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
    @click.self="close"
  >
    <div
      class="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-scale-up"
    >
      <!-- Modal Top Bar -->
      <div class="px-5 py-3.5 bg-gradient-to-r from-[#0F2A44] to-slate-800 text-white flex items-center justify-between border-b border-white/10 flex-shrink-0">
        <div class="flex items-center gap-2.5 min-w-0 pr-3">
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-600 text-white text-xs flex-shrink-0">
            ▶
          </span>
          <div class="truncate">
            <h3 class="text-sm sm:text-base font-extrabold text-white truncate">
              {{ title || 'Society Site Land & Ground Tour' }}
            </h3>
            <p class="text-[11px] text-cyan-300 font-medium truncate">
              {{ subtitle || 'Verified on-ground drone walkthrough & plot demarcation' }}
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="close"
          class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors flex-shrink-0"
          aria-label="Close video tour"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 16:9 Video Player Viewport -->
      <div class="relative w-full aspect-video bg-black flex items-center justify-center">
        <!-- Direct MP4 -->
        <video
          v-if="parsedVideo.type === 'direct'"
          :src="parsedVideo.src"
          controls
          autoplay
          playsinline
          class="w-full h-full object-contain"
        ></video>

        <!-- YouTube / Vimeo / Iframe -->
        <iframe
          v-else
          :src="parsedVideo.embedUrl"
          :title="title || 'Site Land Walkthrough Video'"
          class="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      <!-- Modal Footer Strip -->
      <div class="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
        <div class="text-xs text-slate-400 text-center sm:text-left">
          <span>Need on-ground inspection? Our team organizes physical site visits.</span>
        </div>

        <div class="flex items-center gap-2.5 w-full sm:w-auto">
          <a
            :href="whatsappUrl"
            target="_blank"
            class="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-black uppercase tracking-wider text-center transition-all shadow"
          >
            WhatsApp For Site Visit
          </a>
          <button
            type="button"
            @click="close"
            class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            Close Video
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { parseVideoUrl } from '../../utils/video'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  videoUrl: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const parsedVideo = computed(() => parseVideoUrl(props.videoUrl))

const whatsappUrl = computed(() => {
  const msg = `Hello TopLinkers, I watched the video for ${props.title || 'this society'} and would like to arrange an on-ground site visit / inquire about available plots.`
  return `https://wa.me/923349522157?text=${encodeURIComponent(msg)}`
})

const close = () => {
  emit('close')
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}
.animate-scale-up {
  animation: scaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
