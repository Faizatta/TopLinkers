<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        <!-- Header -->
        <div class="px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <h3 class="text-sm sm:text-base font-bold text-[#0F2A44]">{{ title }}</h3>
            <p class="text-[11px] text-slate-500">Drag image to position, zoom, or rotate to fit the frame.</p>
          </div>
          <button
            type="button"
            @click="$emit('update:modelValue', false)"
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close image adjuster"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Interactive Crop Viewport -->
        <div class="p-4 sm:p-5 bg-slate-900 flex flex-col items-center justify-center gap-3 overflow-hidden">
          <div
            ref="frameEl"
            class="relative w-full max-w-[420px] bg-slate-950 rounded-xl overflow-hidden border border-white/20 shadow-inner cursor-grab active:cursor-grabbing select-none touch-none"
            :style="{ aspectRatio: cssAspectRatio }"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
          >
            <img
              v-if="src"
              ref="imgEl"
              :src="src"
              :crossorigin="isExternalUrl ? 'anonymous' : undefined"
              alt="Adjust preview"
              draggable="false"
              @load="onImageLoad"
              class="absolute left-1/2 top-1/2 max-w-none pointer-events-none select-none"
              :style="imageStyle"
            />

            <!-- Rule of Thirds Grid Overlay -->
            <div class="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3">
              <div class="border-r border-b border-white/20"></div>
              <div class="border-r border-b border-white/20"></div>
              <div class="border-b border-white/20"></div>
              <div class="border-r border-b border-white/20"></div>
              <div class="border-r border-b border-white/20"></div>
              <div class="border-b border-white/20"></div>
              <div class="border-r border-white/20"></div>
              <div class="border-r border-white/20"></div>
              <div></div>
            </div>
          </div>

          <p class="text-[11px] text-slate-400">Drag inside the frame to reposition</p>
        </div>

        <!-- Controls -->
        <div class="p-4 sm:p-5 space-y-4 bg-white border-t border-slate-100">
          <!-- Zoom Slider -->
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold text-slate-600 w-12">Zoom</span>
            <button
              type="button"
              @click="zoom = Math.max(1, Number((zoom - 0.1).toFixed(2)))"
              class="w-7 h-7 rounded-lg border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
            >
              -
            </button>
            <input
              v-model.number="zoom"
              type="range"
              min="1"
              max="3"
              step="0.05"
              class="flex-1 accent-[#0F2A44] cursor-pointer"
            />
            <button
              type="button"
              @click="zoom = Math.min(3, Number((zoom + 0.1).toFixed(2)))"
              class="w-7 h-7 rounded-lg border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
            >
              +
            </button>
            <span class="text-xs font-mono text-slate-500 w-10 text-right">{{ zoom.toFixed(1) }}x</span>
          </div>

          <!-- Aspect Ratio & Rotate -->
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-semibold text-slate-600 mr-1">Frame:</span>
              <button
                v-for="ratio in ['1:1', '4:3', '16:9']"
                :key="ratio"
                type="button"
                @click="currentAspect = ratio"
                class="px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors"
                :class="currentAspect === ratio ? 'bg-[#0F2A44] text-white border-[#0F2A44]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'"
              >
                {{ ratio }}
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="rotation = (rotation + 90) % 360"
                class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                Rotate 90&deg;
              </button>
              <button
                type="button"
                @click="resetControls"
                class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600"
              >
                Reset
              </button>
            </div>
          </div>

          <p v-if="errorMsg" class="text-xs text-rose-600 font-medium">{{ errorMsg }}</p>

          <!-- Footer Actions -->
          <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
            <button
              type="button"
              @click="$emit('update:modelValue', false)"
              class="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="applying"
              @click="applyCrop"
              class="px-5 py-2 rounded-lg text-xs font-semibold bg-[#0F2A44] hover:bg-slate-800 text-white shadow-2xs disabled:opacity-50"
            >
              {{ applying ? 'Applying...' : 'Apply & Use Photo' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  src: { type: String, default: '' },
  aspectRatio: { type: String, default: '4:3' },
  outputWidth: { type: Number, default: 1000 },
  title: { type: String, default: 'Adjust & Crop Photo' }
})

const emit = defineEmits(['update:modelValue', 'apply'])

const frameEl = ref(null)
const imgEl = ref(null)

const currentAspect = ref(props.aspectRatio)
const zoom = ref(1)
const rotation = ref(0)
const offsetX = ref(0)
const offsetY = ref(0)
const naturalWidth = ref(0)
const naturalHeight = ref(0)
const applying = ref(false)
const errorMsg = ref('')

let dragging = false
let startX = 0
let startY = 0
let startOffsetX = 0
let startOffsetY = 0

const isExternalUrl = computed(() =>
  typeof props.src === 'string' && /^https?:\/\//i.test(props.src) && !props.src.startsWith(window?.location?.origin || '')
)

const cssAspectRatio = computed(() => {
  if (currentAspect.value === '1:1') return '1 / 1'
  if (currentAspect.value === '16:9') return '16 / 9'
  return '4 / 3'
})

const resetControls = () => {
  zoom.value = 1
  rotation.value = 0
  offsetX.value = 0
  offsetY.value = 0
  errorMsg.value = ''
}

watch(() => props.modelValue, (open) => {
  if (open) {
    currentAspect.value = props.aspectRatio
    resetControls()
  }
})

const onImageLoad = () => {
  if (!imgEl.value) return
  naturalWidth.value = imgEl.value.naturalWidth || 1000
  naturalHeight.value = imgEl.value.naturalHeight || 750
}

const baseCoverScale = computed(() => {
  if (!frameEl.value || !naturalWidth.value || !naturalHeight.value) return 1
  const fw = frameEl.value.clientWidth || 380
  const fh = frameEl.value.clientHeight || 285
  const rotated = rotation.value === 90 || rotation.value === 270
  const iw = rotated ? naturalHeight.value : naturalWidth.value
  const ih = rotated ? naturalWidth.value : naturalHeight.value
  return Math.max(fw / iw, fh / ih)
})

const imageStyle = computed(() => {
  const scale = baseCoverScale.value * zoom.value
  return {
    width: `${naturalWidth.value}px`,
    height: `${naturalHeight.value}px`,
    transform: `translate(-50%, -50%) translate(${offsetX.value}px, ${offsetY.value}px) scale(${scale}) rotate(${rotation.value}deg)`,
    transformOrigin: 'center center'
  }
})

const onPointerDown = (e) => {
  dragging = true
  startX = e.clientX
  startY = e.clientY
  startOffsetX = offsetX.value
  startOffsetY = offsetY.value
  e.currentTarget?.setPointerCapture?.(e.pointerId)
}

const onPointerMove = (e) => {
  if (!dragging) return
  offsetX.value = startOffsetX + (e.clientX - startX)
  offsetY.value = startOffsetY + (e.clientY - startY)
}

const onPointerUp = () => {
  dragging = false
}

const applyCrop = async () => {
  if (!imgEl.value || !frameEl.value) return
  applying.value = true
  errorMsg.value = ''
  try {
    const fw = frameEl.value.clientWidth || 380
    const fh = frameEl.value.clientHeight || 285

    const ratio = currentAspect.value === '1:1' ? 1 : currentAspect.value === '16:9' ? 16 / 9 : 4 / 3
    const outW = props.outputWidth
    const outH = Math.round(outW / ratio)

    const canvas = document.createElement('canvas')
    canvas.width = outW
    canvas.height = outH
    const ctx = canvas.getContext('2d')

    const exportScale = outW / fw
    const drawScale = baseCoverScale.value * zoom.value * exportScale

    ctx.fillStyle = '#0F2A44'
    ctx.fillRect(0, 0, outW, outH)
    ctx.save()
    ctx.translate(outW / 2 + offsetX.value * exportScale, outH / 2 + offsetY.value * exportScale)
    ctx.rotate((rotation.value * Math.PI) / 180)
    ctx.scale(drawScale, drawScale)
    ctx.drawImage(imgEl.value, -naturalWidth.value / 2, -naturalHeight.value / 2)
    ctx.restore()

    const dataUrl = canvas.toDataURL('image/jpeg', 0.88)
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.88))
    const file = blob ? new File([blob], `adjusted-${Date.now()}.jpg`, { type: 'image/jpeg' }) : null

    emit('apply', { dataUrl, blob, file })
    emit('update:modelValue', false)
  } catch (err) {
    errorMsg.value = 'Unable to export this external image due to browser CORS restrictions. Please upload the file from your device.'
  } finally {
    applying.value = false
  }
}
</script>
