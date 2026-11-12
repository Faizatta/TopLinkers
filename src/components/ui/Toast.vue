<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <TransitionGroup
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-for="toast in ui.toasts"
          :key="toast.id"
          :class="[
            'pointer-events-auto w-full p-4 rounded shadow-lg border-l-4 bg-white flex items-start gap-3 transition-all',
            borderClass(toast.type)
          ]"
        >
          <!-- Icon -->
          <div :class="iconColorClass(toast.type)" class="flex-shrink-0 mt-0.5">
            <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else-if="toast.type === 'warning'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <svg v-else-if="toast.type === 'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h4 v-if="toast.title" class="text-sm font-semibold text-gray-900 leading-tight">{{ toast.title }}</h4>
            <p class="text-xs text-gray-600 mt-0.5 leading-relaxed">{{ toast.message }}</p>
          </div>

          <!-- Close -->
          <button
            type="button"
            class="text-gray-400 hover:text-gray-600 flex-shrink-0"
            @click="ui.removeToast(toast.id)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useUiStore } from '../../stores/ui'

const ui = useUiStore()

const borderClass = (type) => {
  switch (type) {
    case 'success':
      return 'border-[#77C720]'
    case 'warning':
      return 'border-[#F26B21]'
    case 'error':
      return 'border-red-500'
    case 'info':
    default:
      return 'border-[#00AEEF]'
  }
}

const iconColorClass = (type) => {
  switch (type) {
    case 'success':
      return 'text-[#77C720]'
    case 'warning':
      return 'text-[#F26B21]'
    case 'error':
      return 'text-red-500'
    case 'info':
    default:
      return 'text-[#00AEEF]'
  }
}
</script>
