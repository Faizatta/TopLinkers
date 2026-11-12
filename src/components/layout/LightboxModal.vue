<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="ui.isLightboxOpen"
        class="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between p-4 select-none"
        @keydown.esc="ui.closeLightbox"
        @keydown.left="prev"
        @keydown.right="next"
        tabindex="0"
        data-lenis-prevent
      >
        <!-- Top Controls -->
        <div class="flex items-center justify-between text-white py-2 px-4">
          <div class="text-sm font-medium tracking-wide">
            {{ ui.lightboxActiveIndex + 1 }} / {{ ui.lightboxImages.length }}
          </div>
          <button
            type="button"
            class="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            @click="ui.closeLightbox"
            aria-label="Close lightbox"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Center Image Stage -->
        <div class="relative flex-1 flex items-center justify-center p-2">
          <!-- Left Arrow -->
          <button
            v-if="ui.lightboxImages.length > 1"
            type="button"
            class="absolute left-4 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white transition-colors"
            @click.stop="prev"
            aria-label="Previous image"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Current Image -->
          <img
            :src="currentImage"
            alt="Property preview"
            class="max-h-[80vh] max-w-[90vw] object-contain rounded shadow-2xl transition-all duration-300"
          />

          <!-- Right Arrow -->
          <button
            v-if="ui.lightboxImages.length > 1"
            type="button"
            class="absolute right-4 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white transition-colors"
            @click.stop="next"
            aria-label="Next image"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Thumbnail Strip -->
        <div class="flex items-center justify-center gap-2 overflow-x-auto py-2">
          <button
            v-for="(img, idx) in ui.lightboxImages"
            :key="idx"
            type="button"
            :class="[
              'w-16 h-12 rounded overflow-hidden border-2 transition-all flex-shrink-0',
              ui.lightboxActiveIndex === idx ? 'border-[#00AEEF] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
            ]"
            @click="ui.setLightboxIndex(idx)"
          >
            <img :src="img" class="w-full h-full object-cover" alt="Thumbnail" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useUiStore } from '../../stores/ui'
import { stopLenis, startLenis } from '../../services/lenis'

const ui = useUiStore()

watch(() => ui.isLightboxOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    stopLenis()
  } else {
    document.body.style.overflow = ''
    startLenis()
  }
})

const currentImage = computed(() => {
  return ui.lightboxImages[ui.lightboxActiveIndex] || ''
})

const prev = () => {
  if (ui.lightboxImages.length === 0) return
  const nextIdx = (ui.lightboxActiveIndex - 1 + ui.lightboxImages.length) % ui.lightboxImages.length
  ui.setLightboxIndex(nextIdx)
}

const next = () => {
  if (ui.lightboxImages.length === 0) return
  const nextIdx = (ui.lightboxActiveIndex + 1) % ui.lightboxImages.length
  ui.setLightboxIndex(nextIdx)
}
</script>
