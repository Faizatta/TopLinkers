<template>
  <Teleport to="body">
    <div
      v-if="ui.isFlyerModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      @click.self="ui.closeFlyerModal"
      data-lenis-prevent
    >
      <div class="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        <!-- Top bar -->
        <div class="flex items-center justify-between px-6 py-4 bg-[#0F2A44] text-white">
          <div class="flex items-center gap-3">
            <img src="/toplinkers-logo-sm.png" alt="Top Linkers" class="w-8 h-8 object-contain" />
            <div>
              <h3 class="text-sm sm:text-base font-bold"><span class="text-[#E53935]">Top</span><span class="text-white">Linkers</span> Exclusive Project Portfolio</h3>
              <p class="text-[11px] text-[#16B4E8]">H&R Suites &bull; PHA Flats &bull; Faisal Town-II &bull; TopCity-1</p>
            </div>
          </div>

          <button
            type="button"
            class="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            @click="ui.closeFlyerModal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-200 bg-gray-50 px-6 pt-3 gap-4">
          <button
            type="button"
            :class="[
              'pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative',
              activeTab === 'flyer' ? 'text-[#0F2A44]' : 'text-gray-400 hover:text-gray-600'
            ]"
            @click="activeTab = 'flyer'"
          >
            Executive Flyer & Services Breakdown
            <span v-if="activeTab === 'flyer'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#16B4E8]"></span>
          </button>
          <button
            type="button"
            :class="[
              'pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative',
              activeTab === 'pha' ? 'text-[#0F2A44]' : 'text-gray-400 hover:text-gray-600'
            ]"
            @click="activeTab = 'pha'"
          >
            PHA Flats Floor Plans (I-12 & I-16)
            <span v-if="activeTab === 'pha'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#16B4E8]"></span>
          </button>
        </div>

        <!-- Body content with image view -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <div v-if="activeTab === 'flyer'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div class="md:col-span-7 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex justify-center p-2">
                <img
                  src="/toplinkers-flyer-plan.webp"
                  alt="TopLinkers Official Portfolio Plan"
                  class="max-h-[500px] w-auto object-contain rounded"
                />
              </div>

              <div class="md:col-span-5 space-y-4 text-xs text-gray-700">
                <div class="p-4 bg-[#F6F8FA] rounded-lg border-l-4 border-[#16B4E8]">
                  <h4 class="font-bold text-[#0F2A44] text-sm mb-1">Featured Pop-Up: H&R Suites</h4>
                  <p class="text-gray-600">Serviced luxury hotel apartments in Gulberg Islamabad with guaranteed rental yields.</p>
                </div>

                <div class="space-y-2">
                  <h5 class="font-bold text-[#0F2A44] uppercase tracking-wider text-[11px]">Key Sectors & Plot Files:</h5>
                  <ul class="space-y-1.5 text-gray-600 pl-3 list-disc">
                    <li><strong class="text-[#0F2A44]">FT-II:</strong> Faisal Town Phase 2 on Motorway Interchange</li>
                    <li><strong class="text-[#0F2A44]">TopCity-1:</strong> 10 Marla (PKR 2.5 Crore / 75 Lac)</li>
                    <li><strong class="text-[#0F2A44]">PECHS:</strong> 5 Marla (PKR 25 Lac budget entry)</li>
                    <li><strong class="text-[#0F2A44]">PHA Flats:</strong> 60 Lac cash & easy installments</li>
                    <li><strong class="text-[#0F2A44]">Bano Qadeer:</strong> 100 Million corporate hub</li>
                  </ul>
                </div>

                <div class="space-y-2 pt-2 border-t border-gray-100">
                  <h5 class="font-bold text-[#0F2A44] uppercase tracking-wider text-[11px]">Turnkey Services:</h5>
                  <div class="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div class="p-2 bg-blue-50 text-[#0F2A44] rounded font-bold">1. Real Estate Marketing</div>
                    <div class="p-2 bg-emerald-50 text-[#0F2A44] rounded font-bold">2. Turnkey Construction</div>
                    <div class="p-2 bg-amber-50 text-[#0F2A44] rounded font-bold">3. Solar (10, 20, 50 kW)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div class="md:col-span-7 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex justify-center p-2">
                <img
                  src="/toplinkers-pha-floorplans.webp"
                  alt="PHA Flats Sector I-12 and I-16 Floor Plans"
                  class="max-h-[500px] w-auto object-contain rounded"
                />
              </div>

              <div class="md:col-span-5 space-y-4 text-xs text-gray-700">
                <div class="p-4 bg-emerald-50 rounded-lg border-l-4 border-[#6CC24A]">
                  <h4 class="font-bold text-[#0F2A44] text-sm mb-1">Official PHA Government Flats</h4>
                  <p class="text-gray-600">CDA developed sectors with high security and immediate utility access.</p>
                </div>

                <div class="space-y-2.5">
                  <div class="p-3 bg-white rounded border border-gray-200">
                    <strong class="text-[#0F2A44] block text-xs">Sector I-12 Flats (2 Bed Units):</strong>
                    <div class="mt-1 flex justify-between text-gray-600">
                      <span>C-Type: 1,100 Sq.Ft</span>
                      <span class="font-bold text-[#16B4E8]">PKR 60 Lac</span>
                    </div>
                    <div class="mt-0.5 flex justify-between text-gray-600">
                      <span>D-Type: 870 Sq.Ft</span>
                      <span class="font-bold text-[#16B4E8]">PKR 48 Lac</span>
                    </div>
                  </div>

                  <div class="p-3 bg-white rounded border border-gray-200">
                    <strong class="text-[#0F2A44] block text-xs">Sector I-16 Flats (2 & 3 Bed Units):</strong>
                    <div class="mt-1 flex justify-between text-gray-600">
                      <span>C-Type: 912 Sq.Ft (2 Bed)</span>
                      <span class="font-bold text-[#16B4E8]">PKR 52 Lac</span>
                    </div>
                    <div class="mt-0.5 flex justify-between text-gray-600">
                      <span>B-Type: 1,496 Sq.Ft (3 Bed with Washroom)</span>
                      <span class="font-bold text-[#16B4E8]">PKR 85 Lac</span>
                    </div>
                  </div>
                </div>

                <div class="pt-2">
                  <a
                    href="https://wa.me/923235963375?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20PHA%20Flats%20Sector%20I-12%20and%20I-16."
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded flex items-center justify-center gap-1.5 shadow"
                  >
                    Direct WhatsApp for PHA Booking & Files
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <span>TopLinkers Office: 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad (4004884)</span>
          <button
            type="button"
            class="px-4 py-1.5 bg-[#0F2A44] text-white font-semibold rounded hover:bg-[#173f67]"
            @click="ui.closeFlyerModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUiStore } from '../../stores/ui'
import { stopLenis, startLenis } from '../../services/lenis'

const ui = useUiStore()
const activeTab = ref('flyer')

watch(() => ui.isFlyerModalOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    stopLenis()
  } else {
    document.body.style.overflow = ''
    startLenis()
  }
})
</script>
