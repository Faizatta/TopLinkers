<template>
  <div
    class="fixed right-4 sm:right-6 z-50 select-none transition-[bottom] duration-200 ease-out"
    :style="{ bottom: `${bottomOffset}px` }"
  >
    <!-- WhatsApp Floating Action Button -->
    <div class="relative">
      <!-- Pulsing Radar Rings -->
      <span class="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
      <span class="absolute -inset-2 rounded-full bg-[#25D366] opacity-20 animate-pulse"></span>

      <!-- Main Trigger Button -->
      <button
        type="button"
        @click="isOpen = !isOpen"
        class="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
        aria-label="Chat on WhatsApp with TopLinkers"
        title="Chat with TopLinkers Advisory Desk"
      >
        <!-- WhatsApp Icon (when closed) -->
        <svg
          v-if="!isOpen"
          class="w-6 h-6 sm:w-7 sm:h-7 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>

        <!-- Close "X" Icon (when open) -->
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>

        <!-- Unread Message Notification Dot -->
        <span
          v-if="!isOpen"
          class="absolute -top-1 -right-1 w-4 h-4 bg-[#E53935] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow"
        >
          1
        </span>
      </button>

      <!-- Small floating speech bubble helper (shown if closed) -->
      <div
        v-if="!isOpen"
        class="hidden sm:flex items-center gap-1.5 absolute right-16 top-1/2 -translate-y-1/2 bg-white text-[#0F2A44] px-3.5 py-1.5 rounded-full shadow-lg border border-gray-100 text-xs font-bold whitespace-nowrap animate-bounce"
        style="animation-duration: 2.5s;"
      >
        <span class="w-2 h-2 rounded-full bg-[#25D366]"></span>
        <span>Need Help? Chat on WhatsApp</span>
      </div>
    </div>

    <!-- Interactive WhatsApp Popup Chat Card -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-90 opacity-0 translate-y-4"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-90 opacity-0 translate-y-4"
    >
      <div
        v-if="isOpen"
        class="absolute bottom-16 sm:bottom-18 right-0 w-[calc(100vw-2rem)] max-w-[340px] sm:max-w-none sm:w-96 bg-white rounded-3xl shadow-[0_25px_60px_rgba(15,42,68,0.25)] border border-gray-100 overflow-hidden flex flex-col z-50 text-gray-800"
      >
        <!-- Chat Header -->
        <div class="bg-gradient-to-r from-[#0F2A44] to-[#128C7E] p-4 text-white relative">
          <div class="flex items-center gap-3">
            <div class="relative w-11 h-11 bg-white/95 rounded p-1 flex items-center justify-center flex-shrink-0">
              <img src="/toplinkers-logo-sm.png" alt="Top Linkers" class="w-full h-full object-contain" />
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-white rounded-full"></span>
            </div>

            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-bold flex items-center gap-1.5">
                <span><span class="text-[#E53935]">Top</span><span class="text-white">Linkers</span> Advisory</span>
                <span class="text-[9px] bg-[#25D366]/20 text-[#25D366] px-1.5 py-0.2 rounded font-black">OFFICIAL</span>
              </h4>
              <p class="text-[11px] text-gray-200 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                <span>Online &bull; Replies within 2 mins</span>
              </p>
            </div>

            <button
              type="button"
              class="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              @click="isOpen = false"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <!-- Chat Body with WhatsApp Pattern BG -->
        <div class="p-4 bg-[#EFEAE2] space-y-3 max-h-72 overflow-y-auto text-xs">
          <!-- Incoming Agent Bubble -->
          <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] space-y-1.5 text-gray-700 leading-relaxed border border-black/5">
            <span class="text-[10px] font-black uppercase text-[#128C7E] block">TopLinkers Desk</span>
            <p>
              Assalam-o-Alaikum! Welcome to TopLinkers Real Estate & Marketing.
            </p>
            <p class="text-gray-600">
              Looking for verified plots in TopCity/PECHS, PHA flats in I-12 & I-16, or Solar Net Metering? Tap a topic below to chat instantly:
            </p>
            <span class="text-[9px] text-gray-400 block text-right">Just now &bull; Read &check;&check;</span>
          </div>

            <!-- Quick Topic Buttons -->
            <div class="space-y-1.5 pt-1">
              <button
                v-for="topic in topics"
                :key="topic.label"
                type="button"
                @click="openWhatsApp(topic.message, topic.phone)"
                class="w-full text-left p-2.5 rounded-xl bg-white/90 hover:bg-white hover:border-[#25D366] border border-gray-200 shadow-sm transition-all duration-200 flex items-center justify-between text-xs font-semibold text-[#0F2A44] group"
              >
                <span class="truncate">{{ topic.label }}</span>
                <span class="text-[#25D366] text-sm group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
        </div>

        <!-- Chat Footer with Direct Message Input -->
        <div class="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <input
            v-model="customMessage"
            @keyup.enter="sendCustom"
            type="text"
            placeholder="Type your message..."
            class="flex-1 text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#25D366] text-gray-800"
          />
          <button
            type="button"
            @click="sendCustom"
            class="p-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl shadow transition-colors flex-shrink-0"
            title="Send on WhatsApp"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
const isOpen = ref(false)
const customMessage = ref('')
const primaryWhatsApp = '923349522157' // Land, Plots & Real Estate
const engineeringWhatsApp = '923324004884' // Construction & Solar
const bottomOffset = ref(24)

watch(isOpen, (val) => {
  uiStore.isWhatsAppOpen = val
})

const updateFooterClearance = () => {
  const footer = document.getElementById('site-footer')
  if (!footer) {
    bottomOffset.value = 24
    return
  }
  const rect = footer.getBoundingClientRect()
  const docHeight = document.documentElement.scrollHeight
  const isScrolledNearBottom = (window.scrollY + window.innerHeight) >= (docHeight - 600)

  if (isScrolledNearBottom && rect.top < window.innerHeight && rect.top > 0) {
    const overlap = window.innerHeight - rect.top
    bottomOffset.value = Math.max(24, overlap + 24)
  } else {
    bottomOffset.value = 24
  }
}

onMounted(() => {
  updateFooterClearance()
  window.addEventListener('scroll', updateFooterClearance, { passive: true })
  window.addEventListener('resize', updateFooterClearance, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateFooterClearance)
  window.removeEventListener('resize', updateFooterClearance)
})

const topics = [
  {
    label: '🏡 Inquire on Plots (TopCity / PECHS / FT-II)',
    message: 'Hello TopLinkers, I am looking for verified residential/commercial plots in Islamabad.',
    phone: primaryWhatsApp
  },
  {
    label: '🏢 PHA Flats Schedule (I-12 & I-16)',
    message: 'Hello TopLinkers, please share available PHA Sector I-12 and I-16 flat allotments and prices.',
    phone: primaryWhatsApp
  },
  {
    label: '☀️ Solar Net Metering (10kW, 20kW, 50kW)',
    message: 'Hello TopLinkers, I want a quote for turnkey on-grid solar net metering installation.',
    phone: engineeringWhatsApp
  },
  {
    label: '🏗️ Turnkey Construction & Grey Structure',
    message: 'Hello TopLinkers, I want an estimate for turnkey house construction in Islamabad.',
    phone: engineeringWhatsApp
  },
  {
    label: '💼 Connect with CEO & Management Desk',
    message: 'Hello CEO TopLinkers, I would like to schedule a confidential property consultation.',
    phone: primaryWhatsApp
  }
]

const openWhatsApp = (msg, phone = primaryWhatsApp) => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  window.open(url, '_blank')
}

const sendCustom = () => {
  const text = customMessage.value.trim() || 'Hello TopLinkers, I would like to inquire about properties.'
  openWhatsApp(text, primaryWhatsApp)
  customMessage.value = ''
  isOpen.value = false
}
</script>