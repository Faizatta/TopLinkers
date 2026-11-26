<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        @click.self="handleCloseAttempt"
        class="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-slate-900/55 backdrop-blur-xs"
      >
        <div
          class="bg-white rounded-2xl w-full shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden"
          :class="sizeClass"
          role="dialog"
          aria-modal="true"
        >
          <!-- Modal Header -->
          <div class="flex items-start justify-between gap-3 px-5 py-4 border-b border-slate-200/80 flex-shrink-0 bg-white">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="text-base font-bold text-[#0F2A44] truncate">{{ title }}</h3>
                <span
                  v-if="dirty"
                  class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200"
                >
                  Unsaved changes
                </span>
              </div>
              <p v-if="subtitle" class="text-xs text-slate-500 mt-0.5">{{ subtitle }}</p>
            </div>
            <button
              type="button"
              @click="handleCloseAttempt"
              class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="flex-1 overflow-y-auto px-5 py-4 overscroll-contain">
            <slot />
          </div>

          <!-- Modal Footer (optional) -->
          <div
            v-if="$slots.footer"
            class="px-5 py-3.5 border-t border-slate-200/80 bg-slate-50/70 flex items-center justify-end gap-2.5 flex-shrink-0"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  size: { type: String, default: 'lg' }, // sm | md | lg | xl | 2xl
  dirty: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'close'])
const adminStore = useAdminStore()

const sizeClass = computed(() => {
  const map = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-5xl'
  }
  return map[props.size] || map.lg
})

const handleCloseAttempt = async () => {
  if (props.dirty) {
    const ok = await adminStore.requestConfirm({
      title: 'Discard Unsaved Changes?',
      message: 'You have unsaved edits in this form. Closing now will discard them.',
      confirmText: 'Discard Changes'
    })
    if (!ok) return
  }
  emit('update:modelValue', false)
  emit('close')
}

const onKeyDown = (e) => {
  if (e.key === 'Escape' && props.modelValue) {
    handleCloseAttempt()
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
</script>
