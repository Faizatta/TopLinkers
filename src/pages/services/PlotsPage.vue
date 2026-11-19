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

    <!-- Hero Header with Authentic Aerial Master-Plan Land Background -->
    <header class="relative text-white py-16 md:py-24 overflow-hidden bg-[#071626]">
      <!-- Background Hero Image with atmospheric gradients -->
      <div class="absolute inset-0 pointer-events-none">
        <img
          src="/images/hero-moqa-plot.webp"
          alt="Islamabad Airport Corridor Plots"
          class="w-full h-full object-cover object-center opacity-30 transform scale-105"
          loading="eager"
          fetchpriority="high"
        />
        <!-- Multi-layer depth overlays -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#071626]/80 via-[#071626]/90 to-[#071626]"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#071626]/95 via-transparent to-[#071626]/95"></div>
        <div class="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#16B4E8]/15 blur-3xl"></div>
        <div class="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
      </div>

      <div class="max-w-[1280px] mx-auto px-4 text-center relative z-10">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-4 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#16B4E8] animate-pulse"></span>
          <span class="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#16B4E8]">
            VERIFIED AIRPORT CORRIDOR LAND
          </span>
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Plots Near Islamabad Airport: Cash vs. Installments
        </h1>

        <p class="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
          Direct inventory in prime societies adjoining Islamabad International Airport: immediate cash possession plots in TopCity-1, AGG &amp; PECHS, alongside flexible installment plots in Faisal Town Phase 2.
        </p>

        <!-- Professional Segmented Option Selector (No Icons, High Contrast, Easy to Select) -->
        <div class="mt-8 max-w-xl mx-auto p-1.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/15 shadow-2xl flex flex-col sm:flex-row gap-2">
          <!-- Option 1: Cash Possession -->
          <button
            type="button"
            @click="activePlotFilter = 'cash'"
            class="flex-1 py-3 px-4 rounded-xl text-left transition-all duration-200 select-none group"
            :class="activePlotFilter === 'cash'
              ? 'bg-gradient-to-r from-[#16B4E8] to-[#119ecf] text-[#0F2A44] shadow-lg ring-2 ring-white/30'
              : 'hover:bg-white/10 text-white/90 hover:text-white'"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-xs sm:text-sm font-black uppercase tracking-tight">
                Cash Possession
              </span>
              <span
                class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider"
                :class="activePlotFilter === 'cash' ? 'bg-[#0F2A44] text-white' : 'bg-white/20 text-white'"
              >
                Moqa Ka Plot
              </span>
            </div>
            <span
              class="text-[11px] block mt-0.5 font-medium truncate"
              :class="activePlotFilter === 'cash' ? 'text-[#0F2A44]/80 font-bold' : 'text-slate-300'"
            >
              TopCity-1 &bull; AGG &bull; PECHS
            </span>
          </button>

          <!-- Option 2: Easy Installments -->
          <button
            type="button"
            @click="activePlotFilter = 'installments'"
            class="flex-1 py-3 px-4 rounded-xl text-left transition-all duration-200 select-none group"
            :class="activePlotFilter === 'installments'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg ring-2 ring-white/30'
              : 'hover:bg-white/10 text-white/90 hover:text-white'"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-xs sm:text-sm font-black uppercase tracking-tight">
                Easy Installments
              </span>
              <span
                class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider"
                :class="activePlotFilter === 'installments' ? 'bg-[#0F2A44] text-white' : 'bg-white/20 text-white'"
              >
                4.5-Yr Plan
              </span>
            </div>
            <span
              class="text-[11px] block mt-0.5 font-medium truncate"
              :class="activePlotFilter === 'installments' ? 'text-white/90 font-bold' : 'text-slate-300'"
            >
              Faisal Town Phase 2
            </span>
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
              <!-- Card 1: TopCity-1 (Clickable to show details) -->
              <div
                @click="openPlotDetails('topcity')"
                class="bg-white rounded-2xl border border-gray-200 hover:border-[#16B4E8] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div class="h-40 w-full overflow-hidden relative bg-slate-100">
                    <picture>
                      <source srcset="/images/hero-moqa-plot.webp" type="image/webp" />
                      <img src="/images/hero-moqa-plot.jpg" alt="TopCity-1 Cash Possession Plots" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </picture>
                    <span class="absolute top-2.5 left-2.5 bg-[#0F2A44] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                      Srinagar Highway &bull; RDA Approved
                    </span>
                    <span class="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      Click for Details &bull; Rates &rarr;
                    </span>
                  </div>
                  <div class="p-4">
                    <h4 class="font-extrabold text-[#0F2A44] text-base mb-1 group-hover:text-[#16B4E8] transition-colors">TopCity-1 Islamabad</h4>
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
                  <button
                    type="button"
                    class="block w-full text-center py-2.5 bg-[#0F2A44] group-hover:bg-[#16B4E8] text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                  >
                    View Details &amp; Rates &rarr;
                  </button>
                </div>
              </div>

              <!-- Card 2: Airport Green Garden (AGG) (Clickable to show details) -->
              <div
                @click="openPlotDetails('agg')"
                class="bg-white rounded-2xl border border-gray-200 hover:border-[#16B4E8] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div class="h-40 w-full overflow-hidden relative bg-slate-100">
                    <picture>
                      <source srcset="/images/hero-real-estate.webp" type="image/webp" />
                      <img src="/images/hero-real-estate.jpg" alt="Airport Green Garden Plots" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </picture>
                    <span class="absolute top-2.5 left-2.5 bg-[#16B4E8] text-[#0F2A44] text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                      Adjacent Airport &bull; RDA Approved
                    </span>
                    <span class="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      Click for Details &bull; Rates &rarr;
                    </span>
                  </div>
                  <div class="p-4">
                    <h4 class="font-extrabold text-[#0F2A44] text-base mb-1 group-hover:text-[#16B4E8] transition-colors">Airport Green Garden (AGG)</h4>
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
                  <button
                    type="button"
                    class="block w-full text-center py-2.5 bg-[#0F2A44] group-hover:bg-[#16B4E8] text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                  >
                    View Details &amp; Rates &rarr;
                  </button>
                </div>
              </div>

              <!-- Card 3: PECHS Islamabad (Clickable to show details) -->
              <div
                @click="openPlotDetails('pechs')"
                class="bg-white rounded-2xl border border-gray-200 hover:border-[#16B4E8] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div class="h-40 w-full overflow-hidden relative bg-slate-100">
                    <picture>
                      <source srcset="/images/hero-construction.webp" type="image/webp" />
                      <img src="/images/hero-construction.jpg" alt="PECHS Islamabad Plots" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </picture>
                    <span class="absolute top-2.5 left-2.5 bg-indigo-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                      Airport Runway &bull; CPEC Hakla
                    </span>
                    <span class="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      Click for Details &bull; Rates &rarr;
                    </span>
                  </div>
                  <div class="p-4">
                    <h4 class="font-extrabold text-[#0F2A44] text-base mb-1 group-hover:text-[#16B4E8] transition-colors">PECHS Islamabad</h4>
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
                  <button
                    type="button"
                    class="block w-full text-center py-2.5 bg-[#0F2A44] group-hover:bg-[#16B4E8] text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                  >
                    View Details &amp; Rates &rarr;
                  </button>
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
                    <button
                      type="button"
                      @click="openPlotDetails('faisal-town')"
                      class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                    >
                      View Full Details &amp; Schedule &rarr;
                    </button>
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
              <div class="flex items-start gap-2.5">
                <MapPinIcon class="w-4 h-4 text-[#16B4E8] flex-shrink-0 mt-0.5" />
                <span>Al Hameed Plaza, G-11 Markaz, Islamabad</span>
              </div>
              <div class="flex items-center gap-2.5">
                <PhoneIcon class="w-4 h-4 text-[#16B4E8] flex-shrink-0" />
                <a href="tel:+923349522157" class="hover:text-[#16B4E8] font-bold">+92-334-9522157</a>
              </div>
              <div class="flex items-center gap-2.5">
                <ChatBubbleLeftRightIcon class="w-4 h-4 text-emerald-400 flex-shrink-0" />
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

    <!-- ================================================================= -->
    <!-- INTERACTIVE PLOT DETAILS MODAL (FULL SOCIETY & INVENTORY BREAKDOWN) -->
    <!-- ================================================================= -->
    <div
      v-if="selectedPlot"
      class="fixed inset-0 z-50 bg-[#07111D]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      @click.self="selectedPlot = null"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-scale-up">
        <!-- Modal Top Image Banner -->
        <div class="relative h-48 sm:h-56 w-full bg-slate-900 flex-shrink-0">
          <img :src="selectedPlot.image" :alt="selectedPlot.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-md" :class="selectedPlot.badgeClass || 'bg-[#16B4E8] text-[#0F2A44]'">
            {{ selectedPlot.badge }}
          </span>

          <button
            type="button"
            @click="selectedPlot = null"
            class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-md z-10"
            aria-label="Close details"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>

          <div class="absolute bottom-4 left-4 right-4 text-white">
            <span class="text-[10px] font-bold text-[#16B4E8] uppercase tracking-wider block mb-0.5">
              {{ selectedPlot.tag }}
            </span>
            <h3 class="text-xl sm:text-2xl font-black text-white leading-tight">
              {{ selectedPlot.title }}
            </h3>
            <p class="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
              <MapPinIcon class="w-3.5 h-3.5 text-[#16B4E8] flex-shrink-0" />
              <span>{{ selectedPlot.location }}</span>
            </p>
          </div>
        </div>

        <!-- Scrollable Modal Body -->
        <div class="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          <!-- Overview Description -->
          <div>
            <h4 class="font-extrabold text-[#0F2A44] text-sm uppercase tracking-wide mb-1.5">Society Overview</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              {{ selectedPlot.description }}
            </p>
          </div>

          <!-- Cutting Sizes & Live Rates Table -->
          <div>
            <h4 class="font-extrabold text-[#0F2A44] text-sm uppercase tracking-wide mb-2">Verified Sizes &amp; Price Breakdown</h4>
            <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b border-slate-200">
                    <th class="py-2.5 px-3.5">Plot Size</th>
                    <th class="py-2.5 px-3.5">Payment Terms</th>
                    <th class="py-2.5 px-3.5 text-right">Demand / Rate</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  <tr v-for="(rate, rIdx) in selectedPlot.rates" :key="rIdx" class="hover:bg-slate-50/60">
                    <td class="py-2.5 px-3.5 font-bold text-[#0F2A44]">{{ rate.size }}</td>
                    <td class="py-2.5 px-3.5 text-slate-500">{{ rate.terms }}</td>
                    <td class="py-2.5 px-3.5 font-black text-[#16B4E8] text-right">{{ rate.price }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Infrastructure & Features Grid -->
          <div>
            <h4 class="font-extrabold text-[#0F2A44] text-sm uppercase tracking-wide mb-2">Approved Infrastructure &amp; Amenities</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div v-for="(feat, fIdx) in selectedPlot.features" :key="fIdx" class="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircleIcon class="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span class="text-[11px] font-bold text-slate-700">{{ feat }}</span>
              </div>
            </div>
          </div>

          <!-- Legal & Verification Notice -->
          <div class="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
            <ShieldCheckIcon class="w-5 h-5 text-[#16B4E8] flex-shrink-0 mt-0.5" />
            <div>
              <span class="font-black text-[#0F2A44] block text-xs">TopLinkers Ownership &amp; Title Verification</span>
              <p class="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                Every plot is physically inspected with boundary pillars demarcated. We coordinate societal transfer, CVT, stamp duty, and computer transfer slips directly with official management.
              </p>
            </div>
          </div>
        </div>

        <!-- Sticky Modal Footer Actions -->
        <div class="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div class="text-[11px] text-slate-500 text-center sm:text-left">
            <span>Direct Advisory:</span> <strong class="text-[#0F2A44]">0334-9522157</strong>
          </div>

          <div class="flex items-center gap-2.5 w-full sm:w-auto">
            <router-link
              :to="selectedPlot.listingsLink"
              @click="selectedPlot = null"
              class="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 hover:border-[#0F2A44] bg-white text-[#0F2A44] text-xs font-bold text-center transition-all"
            >
              Browse in Listings &rarr;
            </router-link>

            <a
              :href="`https://wa.me/923349522157?text=${encodeURIComponent(selectedPlot.whatsappMsg)}`"
              target="_blank"
              class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-black uppercase tracking-wider text-center transition-all shadow"
            >
              WhatsApp Inquire
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  MapPinIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  CheckCircleIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const activePlotFilter = ref('all') // 'all' | 'cash' | 'installments'
const selectedPlot = ref(null)

const plotsData = {
  topcity: {
    title: 'TopCity-1 Islamabad (Cash Possession Plots)',
    tag: 'Srinagar Highway • RDA Approved • 100% Cash Ready',
    location: 'Airport Junction, Srinagar Highway, Islamabad',
    badge: 'Immediate Demarcation',
    badgeClass: 'bg-[#0F2A44] text-white',
    image: '/images/hero-moqa-plot.webp',
    description: 'TopCity-1 is an ultra-modern gated community situated directly on Srinagar Highway opposite New Islamabad Airport. Direct physical possession is actively available in Blocks B, C & D with on-ground boundary demarcation, paved carpeted roads, underground electricity, and operational Sui Gas network. Ideal for buyers ready to begin construction immediately.',
    rates: [
      { size: '5 Marla (25x50)', terms: '100% Upfront Cash Possession', price: 'PKR 75 - 95 Lac' },
      { size: '10 Marla (35x70)', terms: 'Immediate Demarcation & Transfer', price: 'PKR 1.35 - 1.65 Cr' },
      { size: '1 Kanal (50x90)', terms: 'Executive / Main Boulevard', price: 'PKR 2.25 - 3.40 Cr' }
    ],
    features: [
      'Underground Electricity & Gas Pipeline Active',
      'Direct Srinagar Highway & M-1/M-2 Motorway Interchange',
      'Immediate House Construction Permitted',
      '24/7 Gated Security & Rapid Societal Transfer',
      'Lush Community Parks & Commercial Business Hub'
    ],
    whatsappMsg: 'Hello TopLinkers, I am inquiring about TopCity-1 Cash Possession plots (5 Marla, 10 Marla, 1 Kanal) and would like an on-ground site visit.',
    listingsLink: '/listings?search=TopCity'
  },
  agg: {
    title: 'Airport Green Garden (AGG) Islamabad',
    tag: 'Direct Airport Boundary • RDA Approved • Solid Land',
    location: 'Adjacent New Islamabad Airport Cargo Access Road',
    badge: 'Adjacent Airport Cargo',
    badgeClass: 'bg-[#16B4E8] text-[#0F2A44]',
    image: '/images/hero-real-estate.webp',
    description: 'Airport Green Garden (AGG) directly adjoins the cargo and staff boundary of New Islamabad International Airport. AGG offers the most competitive per-Marla ticket price on the airport corridor with solid, naturally elevated ground, active utility poles, and zero legal disputes.',
    rates: [
      { size: '5 Marla (25x50)', terms: '100% Upfront Cash Possession', price: 'PKR 48 - 55 Lac' },
      { size: '10 Marla (35x70)', terms: 'On-Ground Demarcated Cash', price: 'PKR 88 Lac - 1.05 Cr' },
      { size: '1 Kanal (50x90)', terms: 'Boulevard & Prime Locations', price: 'PKR 1.65 - 2.10 Cr' }
    ],
    features: [
      'Adjoining Airport Boundary Wall with Direct Approach',
      'Ready On-Ground Physical Possession (Moqa Ka Plot)',
      'Electricity Network Installed with Wide Paved Streets',
      'Lowest Entry Budget in the Airport Sector Belt',
      'Swift Registry Transfer and Direct Demarcation Slips'
    ],
    whatsappMsg: 'Hello TopLinkers, I want details and current rate sheet for Airport Green Garden (AGG) cash plots.',
    listingsLink: '/listings?search=Airport'
  },
  pechs: {
    title: 'PECHS Islamabad (Airport Runway Plots)',
    tag: 'CPEC Hakla Interchange • RDA / TMA Approved • Established Society',
    location: 'Next to Airport Runway & CPEC Motorway Interchange, Islamabad',
    badge: 'CPEC Hakla & Airport Runway',
    badgeClass: 'bg-indigo-600 text-white',
    image: '/images/hero-construction.webp',
    description: 'Pakistan Employees Cooperative Housing Society (PECHS) offers budget-friendly on-ground residential land adjacent to the airport runway and the CPEC Hakla-D.I. Khan Motorway interchange. An established community with existing families, operational schools, and active commercial markets.',
    rates: [
      { size: '5 Marla (25x50)', terms: '100% Cash Ready Plot', price: 'PKR 25 - 35 Lac' },
      { size: '7 Marla (30x60)', terms: 'Demarcated Sector Plot', price: 'PKR 35 - 48 Lac' },
      { size: '10 Marla (35x70)', terms: 'Prime Developed Blocks', price: 'PKR 45 - 68 Lac' },
      { size: '1 Kanal (50x90)', terms: 'Boulevard & General Plots', price: 'PKR 85 Lac - 1.25 Cr' }
    ],
    features: [
      'Closest Society to CPEC Hakla-D.I. Khan Interchange',
      'Established Gated Community with Active Residents',
      'Electricity, Water Supply & Local Commercial Hubs',
      'High Future Capital Gain ROI Potential',
      'Registered Cooperative Society with Clean Record'
    ],
    whatsappMsg: 'Hello TopLinkers, I am inquiring about PECHS Islamabad cash plots and on-ground demarcation.',
    listingsLink: '/listings?search=PECHS'
  },
  'faisal-town': {
    title: 'Faisal Town Phase 2 (FT-II) — Installments',
    tag: 'Zedem International • Direct M-2 Motorway Interchange • 4.5-Year Schedule',
    location: 'Between Thalian Interchange & Islamabad Airport, M-2 Motorway',
    badge: '4.5-Year Installment Plan',
    badgeClass: 'bg-emerald-600 text-white',
    image: '/images/hero-moqa-plot.webp',
    description: 'Faisal Town Phase 2 is Zedem International flagship mega project led by Chaudhry Abdul Majeed. Featuring approved dedicated interchange access directly on the M-2 Motorway, rapid on-ground earth-moving machinery, and easy quarterly installments spread over 4.5 years with computerized confirmation letters.',
    rates: [
      { size: '5.56 Marla (25x50)', terms: 'Booking: PKR 595,000 | 18 Quarters of PKR 120,000', price: 'PKR 27.95 Lac Total' },
      { size: '8 Marla (30x60)', terms: 'Booking: PKR 725,000 | 18 Quarters of PKR 170,000', price: 'PKR 38.25 Lac Total' },
      { size: '10.89 Marla (35x70)', terms: 'Booking: PKR 845,000 | 18 Quarters of PKR 225,000', price: 'PKR 49.25 Lac Total' },
      { size: '1 Kanal (50x90)', terms: 'Booking: PKR 1,265,000 | 18 Quarters of PKR 375,000', price: 'PKR 80.95 Lac Total' }
    ],
    features: [
      'Direct Approved M-2 Motorway Interchange Access',
      'Backed by Zedem International Track Record (Faisal Town, B-17, Faisal Hills)',
      '18 Easy Quarterly Installments over 4.5 Years',
      'Heavy On-Ground Machinery & Round-The-Clock Development',
      'Computerized Online Verification for Overseas Pakistanis'
    ],
    whatsappMsg: 'Hello TopLinkers, I want to book a plot file in Faisal Town Phase 2 (FT-II) on 4.5-year installments.',
    listingsLink: '/listings?search=Faisal'
  }
}

const openPlotDetails = (key) => {
  selectedPlot.value = plotsData[key] || null
}

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

<style scoped>
@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-scale-up {
  animation: scaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
