<template>
  <div class="space-y-2.5">
    <div v-if="label" class="flex items-center justify-between">
      <label class="block text-xs font-semibold text-slate-700">{{ label }}</label>
      <span class="text-[11px] text-slate-400">JPG, PNG, WebP (max {{ maxSizeMb }}MB)</span>
    </div>

    <!-- Dropzone / Preview -->
    <div
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      :class="[
        'relative rounded-xl border-2 border-dashed transition-colors p-3 bg-slate-50/70',
        isDragging ? 'border-[#16B4E8] bg-sky-50/60' : 'border-slate-200 hover:border-slate-300'
      ]"
    >
      <div class="flex flex-col sm:flex-row items-center gap-3.5">
        <!-- Preview Thumbnail -->
        <div class="w-24 h-20 rounded-lg bg-white border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
          <img
            v-if="modelValue"
            :src="modelValue"
            alt="Preview"
            class="w-full h-full object-cover"
          />
          <PhotoIcon v-else class="w-7 h-7 text-slate-300" />
        </div>

        <!-- Upload Controls -->
        <div class="flex-1 min-w-0 w-full space-y-2 text-center sm:text-left">
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <label
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-colors"
              :class="{ 'opacity-60 pointer-events-none': uploading }"
            >
              <ArrowUpTrayIcon class="w-3.5 h-3.5" />
              <span>{{ uploading ? 'Uploading...' : (modelValue ? 'Replace Image' : 'Upload Image') }}</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                class="hidden"
                :disabled="uploading"
                @change="handleFileSelect"
              />
            </label>

            <button
              v-if="modelValue"
              type="button"
              @click="$emit('update:modelValue', '')"
              class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-xs font-medium text-slate-600 transition-colors"
            >
              <TrashIcon class="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>

          <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            type="text"
            placeholder="Or paste image URL (/uploads/... or https://...)"
            class="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0F2A44]"
          />

          <p v-if="errorMsg" class="text-[11px] text-rose-600 font-medium">{{ errorMsg }}</p>
          <p v-else class="text-[11px] text-slate-400">Drag &amp; drop an image here, upload from device, or paste a URL.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PhotoIcon, ArrowUpTrayIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Image' },
  maxSizeMb: { type: Number, default: 5 }
})

const emit = defineEmits(['update:modelValue', 'uploaded'])
const adminStore = useAdminStore()

const isDragging = ref(false)
const uploading = ref(false)
const errorMsg = ref('')

const processFile = async (file) => {
  errorMsg.value = ''
  if (!file) return

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!validTypes.includes(file.type)) {
    errorMsg.value = 'Unsupported file type. Please upload JPG, PNG, WebP, or GIF.'
    return
  }
  if (file.size > props.maxSizeMb * 1024 * 1024) {
    errorMsg.value = `File is too large. Maximum allowed size is ${props.maxSizeMb}MB.`
    return
  }

  uploading.value = true
  try {
    const res = await adminStore.uploadImage(file)
    const url = typeof res === 'string' ? res : (res?.url || '')
    if (url) {
      emit('update:modelValue', url)
      emit('uploaded', url)
    } else {
      errorMsg.value = 'Upload failed. Please try again.'
    }
  } catch (err) {
    errorMsg.value = err?.message || 'Upload failed.'
  } finally {
    uploading.value = false
  }
}

const handleFileSelect = (e) => {
  const file = e.target.files?.[0]
  if (file) processFile(file)
  e.target.value = ''
}

const handleDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) processFile(file)
}
</script>
