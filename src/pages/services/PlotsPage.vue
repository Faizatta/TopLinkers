<template>
  <div class="service-detail-page pt-20 bg-[#F6F8FA] min-h-screen">
    <!-- Breadcrumb Bar -->
    <nav aria-label="Breadcrumb" class="bg-white border-b border-gray-200 py-3">
      <div class="max-w-[1280px] mx-auto px-4 flex items-center gap-2 text-xs text-gray-500">
        <router-link to="/" class="hover:text-[#16B4E8] font-medium">Home</router-link>
        <span>/</span>
        <router-link to="/services" class="hover:text-[#16B4E8] font-medium">Services</router-link>
        <span>/</span>
        <span class="text-[#0F2A44] font-bold">Residential &amp; Commercial Plots</span>
      </div>
    </nav>

    <!-- Hero Header -->
    <header class="bg-[#0F2A44] text-white py-14 md:py-20 relative overflow-hidden">
      <div class="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#16B4E8]/10 pointer-events-none"></div>
      <div class="max-w-[1280px] mx-auto px-4 text-center relative z-10">
        <span class="text-xs font-black uppercase tracking-widest text-[#16B4E8] bg-[#16B4E8]/10 px-3 py-1 rounded-full inline-block mb-3">
          VERIFIED AIRPORT CORRIDOR LAND
        </span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Plots Near Islamabad Airport: Cash vs. Installments
        </h1>
        <p class="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
          Direct inventory in prime societies adjoining Islamabad International Airport: immediate cash possession plots in TopCity-1, AGG &amp; PECHS, alongside flexible installment plots in Faisal Town Phase 2.
        </p>

        <!-- Quick 2 Section Toggle Bar -->
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            @click="activePlotFilter = 'cash'"
            class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
            :class="activePlotFilter === 'cash' ? 'bg-[#16B4E8] text-white ring-2 ring-white/30' : 'bg-white/10 hover:bg-white/20 text-white'"
          >
            <span>💰 Cash Possession (Moqa Ka Plot)</span>
            <span class="text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-black">TopCity, AGG, PECHS</span>
          </button>

          <button
            type="button"
            @click="activePlotFilter = 'installments'"
            class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
            :class="activePlotFilter === 'installments' ? 'bg-emerald-600 text-white ring-2 ring-white/30' : 'bg-white/10 hover:bg-white/20 text-white'"
          >
            <span>📅 Installment Plots</span>
            <span class="text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-black">Faisal Town Phase 2</span>
          </button>

          <button
            type="button"
            @click="activePlotFilter = 'all'"
            class="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-slate-300 hover:text-white"
            :class="{ 'underline font-black text-white': activePlotFilter === 'all' }"
          >
            View All
          </button>
        </div>
      </div>
    </header>

    <!-- Content Section -->
    <main class="max-w-[1280px] mx-auto px-4 py-12 sm:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article class="lg:col-span-2 space-y-12">

          <!-- Overview Callout -->
          <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
            <h2 class="text-xl sm:text-2xl font-bold text-[#0F2A44] mb-3">
              Strategic Airport Corridor Plot Advisory
            </h2>
            <p class="text-gray-600 leading-relaxed text-sm mb-4">
              Top Linkers operates a dedicated desk for lands near the New Islamabad International Airport, CPEC Hakla-D.I. Khan Interchange, and Srinagar Highway. Whether you require immediate on-ground physical possession to begin construction or seek high-yield capital gains through quarterly installment files, our inventory is physically demarcated and legally verified.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div class="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
                <span class="text-xs font-black uppercase text-[#16B4E8] block mb-1">100% Cash Ready</span>
                <strong class="text-sm font-extrabold text-[#0F2A44] block">Immediate "Moqa Ka Plot"</strong>
                <p class="text-xs text-slate-600 mt-1">Direct physical possession, boundary pillars, utility lines active in <strong>TopCity-1, AGG &amp; PECHS</strong>.</p>
              </div>
              <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span class="text-xs font-black uppercase text-emerald-600 block mb-1">Flexible Installment Plan</span>
                <strong class="text-sm font-extrabold text-[#0F2A44] block">Easy Installment Files</strong>
                <p class="text-xs text-slate-600 mt-1">4.5-year structured quarterly plans with confirmed computerized confirmation letters in <strong>Faisal Town Phase 2</strong>.</p>
              </div>
            </div>
          </section>

          <!-- ======================================================== -->
          <!-- SECTION 1: CASH POSSESSION PLOTS (TOPCITY, AGG, PECHS)   -->
          <!-- ======================================================== -->
          <div v-if="activePlotFilter === 'all' || activePlotFilter === 'cash'" class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200">
              <div>
                <span class="text-[10px] font-black uppercase tracking-widest text-[#16B4E8] bg-sky-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Section 01 &bull; 100% Cash Ready
                </span>
                <h3 class="text-xl sm:text-2xl font-black text-[#0F2A44]">
                  Cash Possession Plots (TopCity-1, AGG &amp; PECHS)
                </h3>
              </div>
              <span class="text-xs text-slate-400 font-medium">Ready for Immediate House Construction</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <!-- Card 1: TopCity-1 -->
              <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div class="h-40 w-full overflow-hidden relative bg-slate-100">
                    <picture>
                      <source srcset="/images/hero-moqa-plot.webp" type="image/webp" />
                      <img src="/images/hero-moqa-plot.jpg" alt="TopCity-1 Cash Possession Plots" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </picture>
                    <span class="absolute top-2.5 left-2.5 bg-[#0F2A44] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                      Srinagar Highway &bull; RDA Approved
                    </span>
                  </div>
                  <div class="p-4">
                    <h4 class="font-extrabold text-[#0F2A44] text-base mb-1">TopCity-1 Islamabad</h4>
                    <p class="text-xs text-slate-600 leading-relaxed mb-3">
                      Premium gated community at Airport Junction. Direct possession in Blocks B, C &amp; D. Underground electricity, fiber internet, gas network, and lush parks.
                    </p>
                    <div class="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <div class="flex justify-between font-bold text-[#0F2A44]">
                        <span>5 &amp; 10 Marla Cash:</span>
                        <span class="text-[#16B4E8] font-black">PKR 75 Lac - 1.65 Cr</span>
                      </div>
                      <div class="flex justify-between font-bold text-[#0F2A44]">
                        <span>1 Kanal Executive:</span>
                        <span class="text-[#16B4E8] font-black">PKR 2.25 - 3.40 Cr</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-4 pt-0">
                  <router-link
                    to="/listings?search=TopCity"
                    class="block w-full text-center py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    View TopCity Plots &rarr;
                  </router-link>
                </div>
              </div>

              <!-- Card 2: Airport Green Garden (AGG) -->
              <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div class="h-40 w-full overflow-hidden relative bg-slate-100">
                    <picture>
                      <source srcset="/images/hero-real-estate.webp" type="image/webp" />
                      <img src="/images/hero-real-estate.jpg" alt="Airport Green Garden Plots" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </picture>
                    <span class="absolute top-2.5 left-2.5 bg-[#16B4E8] text-[#0F2A44] text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                      Adjacent Airport &bull; RDA Approved
                    </span>
                  </div>
                  <div class="p-4">
                    <h4 class="font-extrabold text-[#0F2A44] text-base mb-1">Airport Green Garden (AGG)</h4>
                    <p class="text-xs text-slate-600 leading-relaxed mb-3">
                      Directly adjoining the New Islamabad International Airport cargo boundary. Fully demarcated on-ground "Moqa Ka Plot" inventory with zero litigation.
                    </p>
                    <div class="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <div class="flex justify-between font-bold text-[#0F2A44]">
                        <span>5 Marla Cash Moqa:</span>
                        <span class="text-[#16B4E8] font-black">PKR 48 - 55 Lac</span>
                      </div>
                      <div class="flex justify-between font-bold text-[#0F2A44]">
                        <span>10 Marla On-Ground:</span>
                        <span class="text-[#16B4E8] font-black">PKR 88 - 1.05 Cr</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-4 pt-0">
                  <router-link
                    to="/listings?search=Airport"
                    class="block w-full text-center py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    View AGG Plots &rarr;
                  </router-link>
                </div>
              </div>

              <!-- Card 3: PECHS Islamabad -->
              <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div class="h-40 w-full overflow-hidden relative bg-slate-100">
                    <picture>
                      <source srcset="/images/hero-construction.webp" type="image/webp" />
                      <img src="/images/hero-construction.jpg" alt="PECHS Islamabad Plots" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </picture>
                    <span class="absolute top-2.5 left-2.5 bg-indigo-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                      Airport Runway &bull; CPEC Hakla
                    </span>
                  </div>
                  <div class="p-4">
                    <h4 class="font-extrabold text-[#0F2A44] text-base mb-1">PECHS Islamabad</h4>
                    <p class="text-xs text-slate-600 leading-relaxed mb-3">
                      High-appreciation budget residential plots near Airport runway and CPEC interchange. Genuine boundary demarcation with swift registry transfer.
                    </p>
                    <div class="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <div class="flex justify-between font-bold text-[#0F2A44]">
                        <span>5 Marla Cash Plot:</span>
                        <span class="text-indigo-600 font-black">PKR 25 - 35 Lac</span>
                      </div>
                      <div class="flex justify-between font-bold text-[#0F2A44]">
                        <span>7 &amp; 10 Marla Cash:</span>
                        <span class="text-indigo-600 font-black">PKR 45 - 68 Lac</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-4 pt-0">
                  <router-link
                    to="/listings?search=PECHS"
                    class="block w-full text-center py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    View PECHS Plots &rarr;
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- SECTION 2: INSTALLMENT PLOTS (FAISAL TOWN PHASE 2)       -->
          <!-- ======================================================== -->
          <div v-if="activePlotFilter === 'all' || activePlotFilter === 'installments'" class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200">
              <div>
                <span class="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Section 02 &bull; 4.5-Year Flexible Plan
                </span>
                <h3 class="text-xl sm:text-2xl font-black text-[#0F2A44]">
                  Installment Plots (Faisal Town Phase 2 - FT-II)
                </h3>
              </div>
              <span class="text-xs text-emerald-600 font-bold">By Zedem International (Ch. Abdul Majeed)</span>
            </div>

            <!-- Faisal Town Phase 2 Featured Showcase Card -->
            <div class="bg-white rounded-3xl border border-emerald-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
              <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div class="md:col-span-5 h-56 rounded-2xl overflow-hidden bg-slate-100 relative">
                  <picture>
                    <source srcset="/images/hero-moqa-plot.webp" type="image/webp" />
                    <img src="/images/hero-moqa-plot.jpg" alt="Faisal Town Phase 2 Installments" class="w-full h-full object-cover" />
                  </picture>
                  <span class="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow">
                    Direct M-2 &bull; Airport Motorway Access
                  </span>
                </div>

                <div class="md:col-span-7 space-y-4">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800">
                    4.5-Year Installment Plan &bull; 18 Quarterly Installments
                  </div>
                  <h4 class="text-xl sm:text-2xl font-extrabold text-[#0F2A44]">
                    Faisal Town Phase 2 (Zedem International)
                  </h4>
                  <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Strategically located directly between the Thalian Interchange and the New Islamabad Airport link corridor. Backed by the unmatched development track record of Chaudhry Abdul Majeed.
                  </p>

                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="text-[10px] text-gray-500 block">5.56 Marla (25x50)</span>
                      <strong class="font-bold text-[#0F2A44]">PKR 27.95 Lac Total</strong>
                      <span class="text-[10px] text-emerald-600 block mt-0.5">Booking: ~5.95 Lac</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="text-[10px] text-gray-500 block">8 Marla (30x60)</span>
                      <strong class="font-bold text-[#0F2A44]">PKR 38.25 Lac Total</strong>
                      <span class="text-[10px] text-emerald-600 block mt-0.5">Booking: ~7.25 Lac</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="text-[10px] text-gray-500 block">10 Marla (35x70)</span>
                      <strong class="font-bold text-[#0F2A44]">PKR 49.25 Lac Total</strong>
                      <span class="text-[10px] text-emerald-600 block mt-0.5">Booking: ~8.45 Lac</span>
                    </div>
                  </div>

                  <div class="pt-2 flex flex-wrap items-center gap-3">
                    <router-link
                      to="/listings?search=Faisal"
                      class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                    >
                      View Faisal Town Phase 2 Files &rarr;
                    </router-link>
                    <a
                      href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20Faisal%20Town%20Phase%202%20Installment%20Payment%20Schedule."
                      target="_blank"
                      class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0F2A44] font-bold text-xs rounded-xl transition"
                    >
                      Get 4.5-Year Schedule
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Comparison Matrix between Cash and Installments -->
          <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
            <h3 class="text-lg sm:text-xl font-bold text-[#0F2A44] mb-3">
              Near Airport Plots: Direct Decision Comparison
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-gray-200 bg-slate-50 text-[11px] font-black uppercase text-slate-700">
                    <th class="py-3 px-4">Evaluation Factor</th>
                    <th class="py-3 px-4">Cash Moqa (TopCity / AGG / PECHS)</th>
                    <th class="py-3 px-4">Installments (Faisal Town Phase 2)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-slate-700">
                  <tr>
                    <td class="py-3 px-4 font-bold text-[#0F2A44]">Possession Status</td>
                    <td class="py-3 px-4 text-emerald-700 font-bold">100% Immediate Physical On-Ground</td>
                    <td class="py-3 px-4 text-gray-600">Balloting &bull; Phased Possession</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-bold text-[#0F2A44]">Payment Structure</td>
                    <td class="py-3 px-4">100% Cash / Swift Registry Transfer</td>
                    <td class="py-3 px-4 text-emerald-700 font-bold">20% Down &bull; 18 Easy Quarterly Installments</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-bold text-[#0F2A44]">Construction Timeline</td>
                    <td class="py-3 px-4 text-emerald-700 font-bold">Immediate House Construction Permitted</td>
                    <td class="py-3 px-4">Long-term Investment &bull; Future Residence</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-bold text-[#0F2A44]">Capital Growth Driver</td>
                    <td class="py-3 px-4">High Occupancy &bull; Established Families</td>
                    <td class="py-3 px-4 text-emerald-700 font-bold">Rapid Land Value Escalation by Zedem</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- FAQs -->
          <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
            <h3 class="text-xl font-bold text-[#0F2A44] mb-4">Frequently Asked Questions</h3>
            <div class="space-y-4">
              <div class="border-b border-gray-100 pb-3">
                <h4 class="font-bold text-sm text-[#0F2A44] mb-1">What is the difference between TopCity-1 and AGG?</h4>
                <p class="text-xs text-gray-600 leading-relaxed">
                  TopCity-1 is an ultra-modern master-planned community with underground cabling directly on Srinagar Highway. Airport Green Garden (AGG) offers lower entry ticket prices directly adjacent to the airport boundary.
                </p>
              </div>
              <div>
                <h4 class="font-bold text-sm text-[#0F2A44] mb-1">Can overseas Pakistanis book Faisal Town Phase 2?</h4>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Yes, booking can be completed via online bank wire transfer or Roshan Digital Account with immediate computerized confirmation letters issued by Zedem International.
                </p>
              </div>
            </div>
          </section>
        </article>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="bg-[#0F2A44] text-white p-6 rounded-2xl shadow-md sticky top-28">
            <h3 class="font-extrabold text-lg text-white mb-2">Airport Land Advisory Desk</h3>
            <p class="text-xs text-gray-300 mb-6 leading-relaxed">
              Contact our sales directors for on-ground plot visits, boundary demarcations, or Faisal Town Phase 2 allotment bookings.
            </p>
            <div class="space-y-3.5 text-xs mb-6">
              <div class="flex items-start gap-2">
                <span class="text-[#16B4E8]">🏢</span>
                <span>Al Hameed Plaza, G-11 Markaz, Islamabad</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#16B4E8]">📞</span>
                <a href="tel:+923349522157" class="hover:text-[#16B4E8] font-bold">+92-334-9522157</a>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#16B4E8]">💬</span>
                <a href="https://wa.me/923349522157" target="_blank" class="hover:text-emerald-400 font-bold">WhatsApp Direct Desk</a>
              </div>
            </div>
            <router-link
              to="/contact"
              class="w-full block text-center bg-[#16B4E8] hover:bg-[#1199c7] text-[#0F2A44] font-black py-3 rounded-xl transition text-xs shadow-sm"
            >
              Request On-Ground Demarcation
            </router-link>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activePlotFilter = ref('all') // 'all' | 'cash' | 'installments'

const applyRouteFilter = () => {
  if (route.query.filter === 'cash' || route.hash === '#cash') {
    activePlotFilter.value = 'cash'
  } else if (route.query.filter === 'installments' || route.hash === '#installments') {
    activePlotFilter.value = 'installments'
  }
}

onMounted(() => {
  applyRouteFilter()
})

watch(
  () => [route.query.filter, route.hash],
  () => {
    applyRouteFilter()
  }
)
</script>
