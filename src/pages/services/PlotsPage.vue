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

    <!-- 1. Hero Cover Banner with Airport Master-Plan Land Background (Harsukh-Style) -->
    <div class="relative min-h-[500px] sm:h-[540px] md:h-[600px] bg-gray-900 overflow-hidden flex items-end">
      <img
        src="/images/hero-moqa-plot.webp"
        alt="Plots Near Islamabad Airport — TopCity, AGG, PECHS & Faisal Town Phase 2"
        class="absolute inset-0 block w-full h-full object-cover transform scale-105"
        loading="eager"
        fetchpriority="high"
      />
      <!-- Dramatic Atmospheric Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/75 to-[#0F2A44]/35"></div>

      <!-- Hero Header Content -->
      <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-10 sm:pb-16 w-full text-white z-10">
        <div class="max-w-3xl space-y-3.5">
          <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span class="bg-[#E53935] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              AIRPORT CORRIDOR LAND
            </span>
            <span class="bg-[#16B4E8] text-[#0F2A44] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              100% Cash Ready &bull; Moqa Ka Plot
            </span>
            <span class="bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              4.5-Year Installment Files
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Plots Near Islamabad Airport: TopCity-1, AGG &amp; Faisal Town Phase 2
          </h1>

          <p class="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl font-medium">
            Direct on-ground inventory adjoining Islamabad International Airport: immediate physical possession plots in <strong class="text-white">TopCity-1, AGG &amp; PECHS</strong> alongside flexible 4.5-year installment files in <strong class="text-white">Faisal Town Phase 2</strong>.
          </p>

          <!-- Direct Actions (Harsukh-Style: WhatsApp & Comparison trigger) -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <a
              href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20Plots%20near%20Islamabad%20Airport%20(TopCity,%20AGG,%20PECHS,%20Faisal%20Town)."
              target="_blank"
              class="px-6 sm:px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Instant WhatsApp Inquiry</span>
            </a>

            <!-- Sleek Compact Category Switcher Tabs -->
            <div class="w-full sm:w-auto grid grid-cols-2 sm:inline-flex items-stretch p-1 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 shadow-lg gap-1 sm:h-[48px]">
              <button
                type="button"
                @click="switchPlotTab('cash')"
                class="w-full sm:w-auto h-full py-2.5 sm:py-0 px-3 sm:px-5 rounded-lg text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                :class="activePlotFilter === 'cash'
                  ? 'bg-[#16B4E8] text-[#071E33] shadow-md ring-1 ring-white/60'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'"
              >
                <span v-if="activePlotFilter === 'cash'" class="w-2 h-2 rounded-full bg-[#071E33] animate-pulse"></span>
                <span>Cash Plots</span>
              </button>

              <button
                type="button"
                @click="switchPlotTab('installments')"
                class="w-full sm:w-auto h-full py-2.5 sm:py-0 px-3 sm:px-5 rounded-lg text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                :class="activePlotFilter === 'installments'
                  ? 'bg-emerald-500 text-white shadow-md ring-1 ring-white/60'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'"
              >
                <span v-if="activePlotFilter === 'installments'" class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>Installment Plans</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Floating 4-Metric Fast-Facts Highlights Dock (Harsukh-Style Overlapping Bar) -->
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 bg-white rounded-2xl p-3.5 sm:p-6 shadow-xl border border-gray-100 mb-8 sm:mb-12">
        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Cash Demarcation</span>
          <span class="text-base sm:text-2xl font-black text-[#16B4E8] block mt-0.5">Moqa Ka Plot</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">TopCity, AGG &bull; Ready</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Easy Installments</span>
          <span class="text-base sm:text-2xl font-black text-emerald-600 block mt-0.5">4.5-Year Plan</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Faisal Town Phase 2</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Entry Rates</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">PKR 25 Lac+</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">5, 7, 10 Marla &amp; 1 Kanal</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Airport Proximity</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">1–3 Mins</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Srinagar Hwy &amp; Motorway</span>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <main class="max-w-[1280px] mx-auto px-4 pb-28 sm:pb-24">
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
          <div id="cash-plots-section" v-if="activePlotFilter === 'all' || activePlotFilter === 'cash'" class="space-y-6 scroll-mt-24">
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
                    <div class="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 flex-wrap pointer-events-none">
                      <span class="pointer-events-auto bg-[#0F2A44] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Srinagar Highway &bull; RDA Approved
                      </span>
                      <!-- Video Badge (Optional: shown only when video is added in backend) -->
                      <button
                        v-if="getSocietyVideo('topcity')"
                        type="button"
                        @click.stop="openVideoModal('topcity')"
                        class="pointer-events-auto bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 transition-transform hover:scale-105 z-10"
                        title="Watch TopCity-1 Site Video"
                      >
                        <span class="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        <span>▶ Watch Video</span>
                      </button>
                    </div>
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
                <div class="p-4 pt-0 flex items-center gap-2">
                  <button
                    type="button"
                    class="flex-1 text-center py-2.5 bg-[#0F2A44] group-hover:bg-[#16B4E8] text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                  >
                    View Details &amp; Rates &rarr;
                  </button>
                  <button
                    v-if="getSocietyVideo('topcity')"
                    type="button"
                    @click.stop="openVideoModal('topcity')"
                    class="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1 flex-shrink-0"
                    title="Watch Land Video"
                  >
                    <span>▶</span>
                    <span class="hidden sm:inline">Video</span>
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
                      <source srcset="/images/agg/agg-plots-hero.webp" type="image/webp" />
                      <img src="/images/agg/agg-plots-hero.webp" alt="Airport Green Garden Plots" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </picture>
                    <div class="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 flex-wrap pointer-events-none">
                      <span class="pointer-events-auto bg-[#16B4E8] text-[#0F2A44] text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Adjacent Airport &bull; RDA Approved
                      </span>
                      <!-- Video Badge (Optional: shown only when video is added in backend) -->
                      <button
                        v-if="getSocietyVideo('agg')"
                        type="button"
                        @click.stop="openVideoModal('agg')"
                        class="pointer-events-auto bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 transition-transform hover:scale-105 z-10"
                        title="Watch AGG Site Video"
                      >
                        <span class="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        <span>▶ Watch Video</span>
                      </button>
                    </div>
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
                <div class="p-4 pt-0 flex items-center gap-2">
                  <button
                    type="button"
                    class="flex-1 text-center py-2.5 bg-[#0F2A44] group-hover:bg-[#16B4E8] text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                  >
                    View Details &amp; Rates &rarr;
                  </button>
                  <button
                    v-if="getSocietyVideo('agg')"
                    type="button"
                    @click.stop="openVideoModal('agg')"
                    class="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1 flex-shrink-0"
                    title="Watch Land Video"
                  >
                    <span>▶</span>
                    <span class="hidden sm:inline">Video</span>
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
                    <div class="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 flex-wrap pointer-events-none">
                      <span class="pointer-events-auto bg-indigo-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Airport Runway &bull; CPEC Hakla
                      </span>
                      <!-- Video Badge (Optional: shown only when video is added in backend) -->
                      <button
                        v-if="getSocietyVideo('pechs')"
                        type="button"
                        @click.stop="openVideoModal('pechs')"
                        class="pointer-events-auto bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 transition-transform hover:scale-105 z-10"
                        title="Watch PECHS Site Video"
                      >
                        <span class="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        <span>▶ Watch Video</span>
                      </button>
                    </div>
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
                <div class="p-4 pt-0 flex items-center gap-2">
                  <button
                    type="button"
                    class="flex-1 text-center py-2.5 bg-[#0F2A44] group-hover:bg-[#16B4E8] text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                  >
                    View Details &amp; Rates &rarr;
                  </button>
                  <button
                    v-if="getSocietyVideo('pechs')"
                    type="button"
                    @click.stop="openVideoModal('pechs')"
                    class="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1 flex-shrink-0"
                    title="Watch Land Video"
                  >
                    <span>▶</span>
                    <span class="hidden sm:inline">Video</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- SECTION 2: INSTALLMENT PLOTS (FAISAL TOWN PHASE 2)       -->
          <!-- ======================================================== -->
          <div id="installment-plots-section" v-if="activePlotFilter === 'all' || activePlotFilter === 'installments'" class="space-y-6 scroll-mt-24">
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
                    <source srcset="/images/faisal-town-2/ft2-sector-w-plan.webp" type="image/webp" />
                    <img src="/images/faisal-town-2/ft2-sector-w-plan.webp" alt="Faisal Town Phase 2 Master Plan & Installments" class="w-full h-full object-cover" />
                  </picture>
                  <div class="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 flex-wrap pointer-events-none">
                    <span class="pointer-events-auto bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-md">
                      Direct M-2 &bull; Airport Motorway Access
                    </span>
                    <!-- Video Badge (Optional: shown only when video is added in backend) -->
                    <button
                      v-if="getSocietyVideo('faisal-town')"
                      type="button"
                      @click.stop="openVideoModal('faisal-town')"
                      class="pointer-events-auto bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 transition-transform hover:scale-105 z-10"
                      title="Watch Faisal Town Phase 2 Earthwork Video"
                    >
                      <span class="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      <span>▶ Watch Earthwork Video</span>
                    </button>
                  </div>
                </div>

                <div class="md:col-span-7 space-y-4">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800">
                    4.5-Year Installment Plan &bull; 42 Monthly Installments
                  </div>
                  <h4 class="text-xl sm:text-2xl font-extrabold text-[#0F2A44]">
                    Faisal Town Phase 2 (Zedem International)
                  </h4>
                  <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Strategically located directly between the Thalian Interchange and the New Islamabad Airport link corridor. Purely residential &amp; commercial plots backed by Chaudhry Abdul Majeed.
                  </p>

                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                      <span class="text-[10px] text-gray-500 font-bold block">5.56 Marla (25x50)</span>
                      <strong class="font-extrabold text-[#0F2A44] block text-xs my-0.5">PKR 39.95 Lac</strong>
                      <span class="text-[10px] text-emerald-600 block font-medium">Down: PKR 14.75 Lac</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                      <span class="text-[10px] text-gray-500 font-bold block">8 Marla (30x60)</span>
                      <strong class="font-extrabold text-[#0F2A44] block text-xs my-0.5">PKR 54.90 Lac</strong>
                      <span class="text-[10px] text-emerald-600 block font-medium">Down: PKR 19.20 Lac</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                      <span class="text-[10px] text-gray-500 font-bold block">10.89 Marla (35x70)</span>
                      <strong class="font-extrabold text-[#0F2A44] block text-xs my-0.5">PKR 72.50 Lac</strong>
                      <span class="text-[10px] text-emerald-600 block font-medium">Down: PKR 26.30 Lac</span>
                    </div>
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                      <span class="text-[10px] text-gray-500 font-bold block">1 Kanal (50x90)</span>
                      <strong class="font-extrabold text-[#0F2A44] block text-xs my-0.5">PKR 1.229 Cr</strong>
                      <span class="text-[10px] text-emerald-600 block font-medium">Down: PKR 43.10 Lac</span>
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
                    <button
                      v-if="getSocietyVideo('faisal-town')"
                      type="button"
                      @click="openVideoModal('faisal-town')"
                      class="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition shadow-xs flex items-center gap-1.5"
                    >
                      <span>▶</span>
                      <span>Watch Earthwork Tour</span>
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

          <!-- Dedicated Head-to-Head Comparison: TopCity-1 vs Airport Green Garden (AGG) -->
          <section class="bg-white p-5 sm:p-8 rounded-3xl border border-gray-200/90 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-gray-100">
              <div>
                <span class="text-[10px] font-black uppercase tracking-widest text-[#16B4E8] bg-sky-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Airport Corridor Head-to-Head
                </span>
                <h3 class="text-xl sm:text-2xl font-black text-[#0F2A44]">
                  TopCity-1 vs. Airport Green Garden (AGG) Comparison
                </h3>
                <p class="text-xs text-slate-500 mt-0.5">
                  Side-by-side evaluation of 5 &amp; 10 Marla cash rates, exact location, utilities, and title status.
                </p>
              </div>
            </div>

            <!-- 1. MOBILE USER-FRIENDLY COMPARISON CARDS (md:hidden) -->
            <div class="md:hidden space-y-3.5">
              <!-- Society Identity Headers -->
              <div class="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                <div class="bg-white p-2.5 rounded-xl border border-sky-200 text-center shadow-xs">
                  <span class="inline-block px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-[#0F2A44] text-white mb-1">
                    RDA Approved
                  </span>
                  <h4 class="font-black text-[#0F2A44] text-xs leading-tight">TopCity-1</h4>
                  <span class="text-[9px] text-slate-500 block">KMKC Smart City</span>
                </div>

                <div class="bg-white p-2.5 rounded-xl border border-emerald-200 text-center shadow-xs">
                  <span class="inline-block px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-700 text-white mb-1">
                    RDA Approved
                  </span>
                  <h4 class="font-black text-emerald-900 text-xs leading-tight">Airport Green Garden</h4>
                  <span class="text-[9px] text-slate-500 block">AGG Pvt Ltd</span>
                </div>
              </div>

              <!-- Feature: 5 Marla Cash Moqa Rate -->
              <div class="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span class="text-[11px] font-extrabold text-[#0F2A44] uppercase tracking-wide">
                    💰 5 Marla Cash Moqa Rate
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="bg-sky-50/70 p-2.5 rounded-xl border border-sky-100 flex flex-col justify-between">
                    <span class="text-[9px] font-black uppercase text-[#0F2A44] tracking-wider mb-0.5">TopCity-1</span>
                    <strong class="text-xs font-black text-[#16B4E8]">PKR 55 &ndash; 85 Lac</strong>
                    <span class="text-[10px] text-slate-500 mt-1 leading-tight">Demarcated in Blocks C, D &amp; E</span>
                  </div>
                  <div class="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 flex flex-col justify-between">
                    <span class="text-[9px] font-black uppercase text-emerald-800 tracking-wider mb-0.5">AGG</span>
                    <strong class="text-xs font-black text-emerald-700">PKR 48 &ndash; 55 Lac</strong>
                    <span class="text-[10px] text-slate-500 mt-1 leading-tight">Budget entry ticket on airport belt</span>
                  </div>
                </div>
              </div>

              <!-- Feature: 10 Marla Cash Moqa Rate -->
              <div class="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span class="text-[11px] font-extrabold text-[#0F2A44] uppercase tracking-wide">
                    💎 10 Marla Cash Moqa Rate
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="bg-sky-50/70 p-2.5 rounded-xl border border-sky-100 flex flex-col justify-between">
                    <span class="text-[9px] font-black uppercase text-[#0F2A44] tracking-wider mb-0.5">TopCity-1</span>
                    <strong class="text-xs font-black text-[#16B4E8]">PKR 85 Lac &ndash; 2.75 Cr</strong>
                    <span class="text-[10px] text-slate-500 mt-1 leading-tight">Prime Block B &amp; C avenues, 100% on-ground</span>
                  </div>
                  <div class="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 flex flex-col justify-between">
                    <span class="text-[9px] font-black uppercase text-emerald-800 tracking-wider mb-0.5">AGG</span>
                    <strong class="text-xs font-black text-emerald-700">PKR 88 Lac &ndash; 1.05 Cr</strong>
                    <span class="text-[10px] text-slate-500 mt-1 leading-tight">Solid demarcated land &amp; pillars</span>
                  </div>
                </div>
              </div>

              <!-- Feature: 1 Kanal Executive Rate -->
              <div class="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span class="text-[11px] font-extrabold text-[#0F2A44] uppercase tracking-wide">
                    🏡 1 Kanal Executive Rate
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col justify-between">
                    <span class="text-[9px] font-black uppercase text-[#0F2A44] tracking-wider mb-0.5">TopCity-1</span>
                    <strong class="text-xs font-black text-slate-800">PKR 1.80 &ndash; 4.00 Cr</strong>
                    <span class="text-[10px] text-slate-500 mt-1 leading-tight">Inhabited villas &amp; Lake District</span>
                  </div>
                  <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col justify-between">
                    <span class="text-[9px] font-black uppercase text-emerald-800 tracking-wider mb-0.5">AGG</span>
                    <strong class="text-xs font-black text-slate-800">PKR 1.65 &ndash; 2.10 Cr</strong>
                    <span class="text-[10px] text-slate-500 mt-1 leading-tight">Scenic wide avenue plots</span>
                  </div>
                </div>
              </div>

              <!-- Feature: Location & Access -->
              <div class="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span class="text-[11px] font-extrabold text-[#0F2A44] uppercase tracking-wide">
                    📍 Location &amp; Access
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-[11px]">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 leading-snug">
                    <span class="text-[9px] font-black uppercase text-[#0F2A44] block mb-1">TopCity-1</span>
                    Directly on Srinagar Highway &amp; M-1/M-2 Interchange (1 km / 3 mins to Airport Gate &amp; Metro Bus).
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 leading-snug">
                    <span class="text-[9px] font-black uppercase text-emerald-800 block mb-1">AGG</span>
                    Adjoining Airport Cargo boundary wall via Link Road / Fateh Jang (3 mins to Airport).
                  </div>
                </div>
              </div>

              <!-- Feature: Utilities & Grid -->
              <div class="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span class="text-[11px] font-extrabold text-[#0F2A44] uppercase tracking-wide">
                    ⚡ Utilities &amp; Grid
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-[11px]">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 leading-snug">
                    <span class="text-[9px] font-black uppercase text-[#0F2A44] block mb-1">TopCity-1</span>
                    100% Underground electricity, Sui Gas active, smart city waste management &amp; fiber internet.
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 leading-snug">
                    <span class="text-[9px] font-black uppercase text-emerald-800 block mb-1">AGG</span>
                    Overhead electricity poles installed, groundwater boring available, wide paved roads.
                  </div>
                </div>
              </div>

              <!-- Feature: Title & Possession -->
              <div class="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span class="text-[11px] font-extrabold text-[#0F2A44] uppercase tracking-wide">
                    📜 Title &amp; Possession
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-[11px]">
                  <div class="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-950 leading-snug font-medium">
                    <span class="text-[9px] font-black uppercase text-[#0F2A44] block mb-1">TopCity-1</span>
                    RDA Approved (9,081 Kanals) &bull; CAA &amp; NHA Clear &bull; Immediate Registry &amp; Transfer
                  </div>
                  <div class="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-950 leading-snug font-medium">
                    <span class="text-[9px] font-black uppercase text-emerald-800 block mb-1">AGG</span>
                    Immediate Physical Possession (1,500 delivered + 2,200 coming) &bull; Clear Title Letter
                  </div>
                </div>
              </div>

              <!-- Feature: Best Fit For -->
              <div class="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-2">
                <div class="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span class="text-[11px] font-extrabold text-[#0F2A44] uppercase tracking-wide">
                    🎯 Best Fit For
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-[11px]">
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 leading-snug">
                    <span class="text-[9px] font-black uppercase text-[#0F2A44] block mb-1">TopCity-1</span>
                    Luxury residence seekers, airport executives, immediate construction with upscale amenities.
                  </div>
                  <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 leading-snug">
                    <span class="text-[9px] font-black uppercase text-emerald-800 block mb-1">AGG</span>
                    High-ROI investors and budget homebuilders seeking maximum capital growth.
                  </div>
                </div>
              </div>

              <!-- Mobile Direct Action Buttons -->
              <div class="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  @click="openPlotDetails('topcity')"
                  class="w-full py-2.5 rounded-xl bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs text-center transition-colors shadow-xs"
                >
                  TopCity-1 Rates &rarr;
                </button>
                <button
                  type="button"
                  @click="openPlotDetails('agg')"
                  class="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs text-center transition-colors shadow-xs"
                >
                  AGG Rates &rarr;
                </button>
              </div>
            </div>

            <!-- 2. DESKTOP / TABLET DETAILED MATRIX (hidden md:block) -->
            <div class="hidden md:block space-y-4">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse min-w-[680px]">
                  <thead>
                    <tr class="border-b border-slate-200 bg-slate-50 text-[11px] font-black uppercase text-slate-700">
                      <th class="py-3 px-4 w-1/4">Feature / Factor</th>
                      <th class="py-3 px-4 w-3/8 bg-sky-50/50 text-[#0F2A44] border-l border-slate-200">
                        <div class="flex items-center justify-between">
                          <span>TopCity-1 Islamabad</span>
                          <span class="text-[9px] font-black px-1.5 py-0.2 rounded bg-[#0F2A44] text-white">RDA Approved</span>
                        </div>
                      </th>
                      <th class="py-3 px-4 w-3/8 bg-emerald-50/40 text-[#0F2A44] border-l border-slate-200">
                        <div class="flex items-center justify-between">
                          <span>Airport Green Garden (AGG)</span>
                          <span class="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-700 text-white">RDA Approved</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y border-slate-100 text-slate-700">
                    <!-- Location -->
                    <tr class="hover:bg-slate-50/60">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">Location &amp; Access</td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-semibold text-[#0F2A44]">
                        Directly on Srinagar Highway &amp; M-1/M-2 Interchange (1 km / 3 mins to Airport Gate &amp; Metro Bus).
                      </td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-semibold text-[#0F2A44]">
                        Adjoining Airport Cargo boundary wall via Link Road / Fateh Jang (3 mins to Airport).
                      </td>
                    </tr>

                    <!-- 5 Marla Rates -->
                    <tr class="hover:bg-slate-50/60 bg-sky-50/20">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">5 Marla Cash Moqa Rate</td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-black text-[#16B4E8] text-sm">
                        PKR 55 Lac &ndash; 85 Lac
                        <span class="block text-[10px] font-normal text-slate-500 mt-0.5">Demarcated possession in Blocks C, D &amp; E</span>
                      </td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-black text-emerald-700 text-sm">
                        PKR 48 Lac &ndash; 55 Lac
                        <span class="block text-[10px] font-normal text-slate-500 mt-0.5">Budget entry ticket on airport belt</span>
                      </td>
                    </tr>

                    <!-- 10 Marla Rates -->
                    <tr class="hover:bg-slate-50/60 bg-sky-50/20">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">10 Marla Cash Moqa Rate</td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-black text-[#16B4E8] text-sm">
                        PKR 85 Lac &ndash; 2.75 Cr
                        <span class="block text-[10px] font-normal text-slate-500 mt-0.5">Prime Block B &amp; C avenues, 100% on-ground</span>
                      </td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-black text-emerald-700 text-sm">
                        PKR 88 Lac &ndash; 1.05 Cr
                        <span class="block text-[10px] font-normal text-slate-500 mt-0.5">Solid demarcated land &amp; pillars</span>
                      </td>
                    </tr>

                    <!-- 1 Kanal Rates -->
                    <tr class="hover:bg-slate-50/60">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">1 Kanal Executive Rate</td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-bold text-slate-800">
                        PKR 1.80 Cr &ndash; 4.00 Cr
                        <span class="block text-[10px] font-normal text-slate-500 mt-0.5">Inhabited luxury villas &amp; Lake District waterfront</span>
                      </td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-bold text-slate-800">
                        PKR 1.65 Cr &ndash; 2.10 Cr
                      </td>
                    </tr>

                    <!-- Infrastructure & Utilities -->
                    <tr class="hover:bg-slate-50/60">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">Utilities &amp; Grid</td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-medium text-slate-700">
                        100% Underground electricity cabling, Sui Gas pipeline active, smart city waste management &amp; high-speed fiber internet.
                      </td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-medium text-slate-700">
                        Overhead electricity poles installed, groundwater boring available, wide paved roads.
                      </td>
                    </tr>

                    <!-- Legal & Demarcation -->
                    <tr class="hover:bg-slate-50/60">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">Possession &amp; Title</td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-semibold text-emerald-700">
                        RDA Approved (9,081 Kanals) &bull; CAA &amp; NHA Clearances &bull; Immediate Registry &amp; Transfer
                      </td>
                      <td class="py-3.5 px-4 border-l border-slate-200 font-semibold text-emerald-700">
                        Immediate Physical Possession &bull; Clear Title Letter
                      </td>
                    </tr>

                    <!-- Lifestyle & Buyer Profile -->
                    <tr class="hover:bg-slate-50/60">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">Best Fit For</td>
                      <td class="py-3.5 px-4 border-l border-slate-200 text-slate-600">
                        Luxury residence seekers, airport executives, and immediate construction with all upscale amenities.
                      </td>
                      <td class="py-3.5 px-4 border-l border-slate-200 text-slate-600">
                        High-ROI investors and budget homebuilders looking for maximum capital growth with lower entry capital.
                      </td>
                    </tr>

                    <!-- Site Land & Drone Video Comparison Row -->
                    <tr v-if="getSocietyVideo('topcity') || getSocietyVideo('agg')" class="hover:bg-slate-50/60 bg-rose-50/30">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44] flex items-center gap-1.5">
                        <span class="text-rose-600 font-black">▶</span>
                        <span>Site Land Video</span>
                      </td>
                      <td class="py-3.5 px-4 border-l border-slate-200">
                        <button
                          v-if="getSocietyVideo('topcity')"
                          type="button"
                          @click="openVideoModal('topcity')"
                          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] uppercase shadow-xs transition-colors"
                        >
                          <span>▶</span>
                          <span>Watch TopCity-1 Drone Tour</span>
                        </button>
                        <span v-else class="text-slate-400 text-[11px]">Physical on-ground visit available</span>
                      </td>
                      <td class="py-3.5 px-4 border-l border-slate-200">
                        <button
                          v-if="getSocietyVideo('agg')"
                          type="button"
                          @click="openVideoModal('agg')"
                          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] uppercase shadow-xs transition-colors"
                        >
                          <span>▶</span>
                          <span>Watch AGG Site Tour</span>
                        </button>
                        <span v-else class="text-slate-400 text-[11px]">Physical on-ground visit available</span>
                      </td>
                    </tr>

                    <!-- Direct Card Actions -->
                    <tr class="bg-slate-50/70">
                      <td class="py-3 px-4 font-bold text-[#0F2A44]">Direct Society Actions</td>
                      <td class="py-3 px-4 border-l border-slate-200">
                        <button
                          type="button"
                          @click="openPlotDetails('topcity')"
                          class="px-3.5 py-1.5 rounded-lg bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-[11px] transition-colors shadow-xs"
                        >
                          View TopCity-1 Details &rarr;
                        </button>
                      </td>
                      <td class="py-3 px-4 border-l border-slate-200">
                        <button
                          type="button"
                          @click="openPlotDetails('agg')"
                          class="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] transition-colors shadow-xs"
                        >
                          View AGG Details &rarr;
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- FAQs -->
          <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
            <h3 class="text-xl font-bold text-[#0F2A44] mb-4">Frequently Asked Questions</h3>
            <div class="space-y-4">
              <div
                v-for="faq in faqs"
                :key="faq.id"
                class="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
              >
                <h4 class="font-bold text-sm text-[#0F2A44] mb-1">{{ faq.question }}</h4>
                <p class="text-xs text-gray-600 leading-relaxed">{{ faq.answer }}</p>
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

          <!-- Reference Site & Drone Video Walkthrough (Positioned at End of Card) -->
          <div v-if="selectedPlotVideo" class="pt-2">
            <SiteVideoPlayer
              :video-url="selectedPlotVideo"
              :title="`${selectedPlot.title} — On-Ground Site &amp; Drone Tour`"
              caption="Live demarcated land, access boulevards, and development progress."
            />
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

    <!-- Standalone Video Tour Modal for Quick Society Walkthrough -->
    <SiteVideoModal
      :is-open="videoModalOpen"
      :video-url="activeVideo.url"
      :title="activeVideo.title"
      :subtitle="activeVideo.subtitle"
      @close="videoModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import SiteVideoPlayer from '../../components/common/SiteVideoPlayer.vue'
import SiteVideoModal from '../../components/common/SiteVideoModal.vue'
import {
  MapPinIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  CheckCircleIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

const adminStore = useAdminStore()
const faqs = computed(() => adminStore.getFaqsByService('plots'))

const route = useRoute()
const activePlotFilter = ref('cash') // 'cash' | 'installments' | 'all'
const selectedPlot = ref(null)
const selectedPlotKey = ref('')
const activeCompareView = ref('topcity-agg') // 'topcity-agg' | 'cash-installments'

const switchPlotTab = (tab) => {
  activePlotFilter.value = tab
  const targetId = tab === 'cash' ? 'cash-plots-section' : 'installment-plots-section'
  if (typeof window !== 'undefined' && window.scrollY > 350) {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Dedicated Video Modal State for Quick Play
const videoModalOpen = ref(false)
const activeVideo = ref({ url: '', title: '', subtitle: '' })

const getSocietyVideo = (key) => {
  if (key === 'topcity') {
    const entry = adminStore.liveRates?.moqaPlots?.topCity
    if (entry && entry.showVideo === false) return ''
    return entry?.videoUrl ?? plotsData.topcity?.videoUrl ?? ''
  }
  if (key === 'agg') {
    const entry = adminStore.liveRates?.moqaPlots?.agg
    if (entry && entry.showVideo === false) return ''
    return entry?.videoUrl ?? plotsData.agg?.videoUrl ?? ''
  }
  if (key === 'pechs') {
    const entry = adminStore.liveRates?.moqaPlots?.pechs
    if (entry && entry.showVideo === false) return ''
    return entry?.videoUrl ?? plotsData.pechs?.videoUrl ?? ''
  }
  if (key === 'faisal-town') {
    const entry = adminStore.liveRates?.installmentPlans?.faisalTown
    if (entry && entry.showVideo === false) return ''
    return entry?.videoUrl ?? plotsData['faisal-town']?.videoUrl ?? ''
  }
  return plotsData[key]?.videoUrl ?? ''
}

const selectedPlotVideo = computed(() => {
  if (!selectedPlot.value || !selectedPlotKey.value) return ''
  return getSocietyVideo(selectedPlotKey.value)
})

const openVideoModal = (key) => {
  const plot = plotsData[key]
  const url = getSocietyVideo(key)
  if (!url) return
  activeVideo.value = {
    url,
    title: `${plot?.title || 'Society'} — On-Ground Site Walkthrough`,
    subtitle: plot?.location || 'Verified land demarcation & aerial view'
  }
  videoModalOpen.value = true
}

const plotsData = {
  topcity: {
    title: 'TopCity-1 Islamabad (Official KMKC Smart City)',
    tag: 'Srinagar Highway • 9,081 Kanals • RDA Approved (NOC Clear)',
    location: 'AAA-Grade Intersection, Srinagar Highway & M-1/M-2 Interchange, Islamabad Airport',
    badge: 'Immediate Demarcation',
    badgeClass: 'bg-[#0F2A44] text-white',
    image: '/images/hero-moqa-plot.webp',
    videoUrl: '',
    description: 'TopCity-1 is an RDA-approved master-planned smart community spanning over 9,081 kanals, developed by Kunwar Moeez Khan Constructions (KMKC) and Dynasty Associates. Strategically positioned at the primary junction of Srinagar Highway, M-1 & M-2 Motorways, and the Green Line Metro Bus corridor (1 km / 3 mins from Islamabad Airport Gate). Features 100% operational underground utilities, smart traffic control, automated waste systems, the landmark Masjid Khulfa-e-Rashideen, Lake District waterfront, and ready on-ground possession across Blocks A, B, C, D, E, F & H for immediate construction.',
    rates: [
      { size: '5 Marla (25x50)', terms: 'Ready Construction (Blocks C, D, E)', price: 'PKR 55 - 85 Lac' },
      { size: '10 Marla (35x65)', terms: 'On-Ground Possession & Main Avenue', price: 'PKR 85 Lac - 2.75 Cr' },
      { size: '1 Kanal (50x90)', terms: 'Inhabited Block B Luxury & Lake District', price: 'PKR 1.80 - 4.00 Cr' },
      { size: '2 Kanal (75x120)', terms: 'Signature Executive Mansions', price: 'PKR 3.80 - 7.50 Cr' },
      { size: '5 Marla Commercial', terms: 'Central Business Hub & Main Blvd', price: 'PKR 3.50 - 6.50 Cr' }
    ],
    features: [
      'Approved by RDA (NOC No. RDA/MP&TE/F-PHS-TAX-07/145), CAA, NHA & ICT',
      '100% Underground Electricity, Sui Gas Active & High-Speed Fiber Internet',
      'Masjid Khulfa-e-Rashideen, Lake District Waterfront & Themed Parks',
      'Direct Srinagar Highway, M-1/M-2 Interchange & Metro Bus Terminal',
      '24/7 Block-Level Maintenance Offices & Rapid Verified Computerized Transfer'
    ],
    whatsappMsg: 'Hello TopLinkers, I am inquiring about TopCity-1 plots (5 Marla, 10 Marla, 1 Kanal, 2 Kanal or Commercial) based on the latest 2026 rates.',
    listingsLink: '/listings?search=TopCity'
  },
  agg: {
    title: 'Airport Green Garden (AGG) Islamabad',
    tag: 'RDA Approved • 3,700 Plots Possession • Near Airport & CPEC',
    location: 'Adjacent New Islamabad Airport (7 KM) & Kashmir Highway',
    badge: '1,500 Delivered • 2,200 Dec 2026',
    badgeClass: 'bg-emerald-600 text-white',
    image: '/images/agg/agg-plots-hero.webp',
    videoUrl: '',
    description: 'Airport Green Garden (AGG) is an RDA-approved master-planned gated housing community by Airport Green Garden Pvt. Ltd., located adjacent to New Islamabad International Airport with direct access via Kashmir Highway (Srinagar Highway) and CPEC Cargo Road. 1,500 plots have already been handed over possession, with an additional 2,200 plots possession in December 2026. Featuring Jamia Mosque Abu Bakar Siddique, 24/7 underground electrification (zero load shedding), gated security with CCTV, and wide winding boulevards.',
    rates: [
      { size: '5 Marla (25x50)', terms: 'Non-Possession: PKR 35 - 40 Lac | Ready Moqa: PKR 55 - 65 Lac', price: 'PKR 35 - 65 Lac' },
      { size: '8 Marla (30x60)', terms: 'Non-Possession: PKR 50 - 60 Lac | On-Ground: PKR 68 - 82 Lac', price: 'PKR 50 - 82 Lac' },
      { size: '10 Marla (35x80)', terms: 'Non-Possession: PKR 55 - 68 Lac | On-Ground: PKR 75 Lac - 1.05 Cr', price: 'PKR 55 Lac - 1.05 Cr' },
      { size: '1 Kanal (50x90)', terms: 'Non-Possession: PKR 1.10 - 1.35 Cr | Prime Boulevard: PKR 1.45 - 1.85 Cr', price: 'PKR 1.10 - 1.85 Cr' }
    ],
    features: [
      '1,500 Plots Possession Delivered + 2,200 More Coming Dec 2026',
      '7 KM Drive to New Islamabad International Airport via Srinagar Highway',
      'Direct Link to CPEC Cargo Road & Thalian Interchange (M-2 Motorway)',
      'Dedicated Metro Bus Service Stop for Seamless Daily Transit',
      '24/7 Underground Electricity Network with Zero Load Shedding',
      'On-Ground Operational Jamia Mosque Abu Bakar Siddique & Green Parks',
      'RDA Approved Layout Plan with Transparent Biometric Transfer'
    ],
    whatsappMsg: 'Hello TopLinkers, I want details and current rate sheet for Airport Green Garden (AGG) plots.',
    listingsLink: '/listings?keyword=AGG&type=plot'
  },
  pechs: {
    title: 'PECHS Islamabad (Airport Runway Plots)',
    tag: 'CPEC Hakla Interchange • RDA / TMA Approved • Established Society',
    location: 'Next to Airport Runway & CPEC Motorway Interchange, Islamabad',
    badge: 'CPEC Hakla & Airport Runway',
    badgeClass: 'bg-indigo-600 text-white',
    image: '/images/hero-construction.webp',
    videoUrl: '',
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
    title: 'Faisal Town Phase 2 (FT-II) — Plots on Installments',
    tag: 'Zedem International • Direct M-2 Motorway Interchange • 42 Monthly Installments',
    location: 'Between Thalian Interchange & Rawalpindi Ring Road, M-2 Motorway',
    badge: '4.5-Year Plots Plan • 15% Cash Discount',
    badgeClass: 'bg-emerald-600 text-white',
    image: '/images/faisal-town-2/ft2-sector-w-plan.webp',
    videoUrl: '',
    description: 'Faisal Town Phase 2 is Zedem International premier master-planned PLOTS community by Chaudhry Abdul Majeed, located along the M-2 Motorway near the Rawalpindi Ring Road and Chakri Road interchange. Offering purely residential & commercial plots on an affordable 4.5-year schedule (42 monthly installments) with 15% discount on lump-sum payments and all development charges included in plot cost.',
    rates: [
      { size: '5.56 Marla (25x50)', terms: 'Down Payment: PKR 14.75 Lac | 42 Monthly: PKR 60,000 | 15% Cash Disc: PKR 33.80 Lac', price: 'PKR 39.95 Lac Total' },
      { size: '8 Marla (30x60)', terms: 'Down Payment: PKR 19.20 Lac | 42 Monthly: PKR 85,000 | 15% Cash Disc: PKR 46.50 Lac', price: 'PKR 54.90 Lac Total' },
      { size: '10.89 Marla (35x70)', terms: 'Down Payment: PKR 26.30 Lac | 42 Monthly: PKR 110,000 | 15% Cash Disc: PKR 61.50 Lac', price: 'PKR 72.50 Lac Total' },
      { size: '14.22 Marla (40x80)', terms: 'Down Payment: PKR 32.10 Lac | 42 Monthly: PKR 140,000 | 15% Cash Disc: PKR 76.90 Lac', price: 'PKR 90.90 Lac Total' },
      { size: '1 Kanal (50x90)', terms: 'Down Payment: PKR 43.10 Lac | 42 Monthly: PKR 190,000 | 15% Cash Disc: PKR 1.039 Cr', price: 'PKR 1.229 Cr Total' },
      { size: '2 Kanal (75x120)', terms: 'Down Payment: PKR 88.10 Lac | 42 Monthly: PKR 385,000 | 15% Cash Disc: PKR 2.119 Cr', price: 'PKR 2.498 Cr Total' }
    ],
    features: [
      'Purely Master-Planned Residential & Commercial Plots (No Flats)',
      'Direct Approved M-2 Motorway & Ring Road Interchange Access',
      'Backed by Zedem International Proven Track Record (Chaudhry Abdul Majeed)',
      '42 Easy Monthly Installments over 4.5 Years with 15% Lump Sum Discount',
      'All Development Charges Included in Total Plot Price',
      'Round-The-Clock On-Ground Heavy Development & Online Biometric Verification'
    ],
    whatsappMsg: 'Hello TopLinkers, I want to book a residential plot file in Faisal Town Phase 2 (FT-II) on 42-month installments.',
    listingsLink: '/listings?keyword=Faisal&type=plot'
  }
}

const openPlotDetails = (key) => {
  selectedPlotKey.value = key
  selectedPlot.value = plotsData[key] || null
}

const applyRouteFilter = () => {
  if (route.query.filter === 'installments' || route.hash === '#installments') {
    activePlotFilter.value = 'installments'
  } else if (route.query.filter === 'all' || route.hash === '#all') {
    activePlotFilter.value = 'all'
  } else {
    activePlotFilter.value = 'cash'
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
