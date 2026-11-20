<template>
  <div class="service-detail-page pt-20 bg-[#F6F8FA]">
    <!-- Breadcrumb Bar -->
    <nav aria-label="Breadcrumb" class="bg-white border-b border-gray-200 py-3">
      <div class="max-w-[1280px] mx-auto px-4 flex items-center gap-2 text-xs text-gray-500">
        <router-link to="/" class="hover:text-[#16B4E8] font-medium">Home</router-link>
        <span>/</span>
        <router-link to="/services" class="hover:text-[#16B4E8] font-medium">Services</router-link>
        <span>/</span>
        <span class="text-[#0F2A44] font-bold">Solar Solutions &amp; Net Metering</span>
      </div>
    </nav>

    <!-- 1. Hero Cover Banner with Atmospheric Backdrop -->
    <div class="relative min-h-[520px] sm:h-[560px] md:h-[620px] bg-gray-900 overflow-hidden flex items-end">
      <img
        src="/images/hero-solar.webp"
        alt="Tier-1 Solar Net Metering & Energy Systems Islamabad"
        class="absolute inset-0 block w-full h-full object-cover transform scale-105"
        loading="eager"
        fetchpriority="high"
        width="1920"
        height="1080"
        decoding="async"
      />
      <!-- Dramatic Atmospheric Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#071E33] via-[#0F2A44]/80 to-[#0F2A44]/40"></div>

      <!-- Hero Header Content -->
      <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-10 sm:pb-16 w-full text-white z-10">
        <div class="max-w-3xl space-y-3.5">
          <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span class="bg-[#6CC24A] text-[#071E33] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#071E33] animate-pulse"></span>
              AEDB &amp; PEC LICENSED EPC
            </span>
            <span class="bg-[#16B4E8] text-[#071E33] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              TIER-1 N-TYPE BIFACIAL
            </span>
            <span class="bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              IESCO GREEN NET METERING
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Turnkey Solar EPC &amp; IESCO Net-Metering Solutions in Islamabad
          </h1>

          <p class="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl font-medium">
            Engineered on-grid, hybrid energy storage (BESS), and commercial rooftop solar installations (5kW to 500kW+) with <strong class="text-white">Tier-1 N-Type TOPCon bifacial modules</strong>, European smart inverters, and guaranteed <strong class="text-white">IESCO bidirectional green meter</strong> commissioning to slash electricity bills by up to 90%.
          </p>

          <!-- Direct Actions & Full-Width Tab Controls -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <a
              href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20a%20Turnkey%20Solar%20System%20and%20IESCO%20Net%20Metering."
              target="_blank"
              class="px-6 sm:px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Instant WhatsApp Solar Quote</span>
            </a>

            <!-- Sleek Compact Category Switcher Tabs -->
            <div class="w-full sm:w-auto grid grid-cols-2 sm:inline-flex items-stretch p-1 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 shadow-lg gap-1 sm:h-[48px]">
              <button
                type="button"
                @click="switchSolarTab('ongrid')"
                class="w-full sm:w-auto h-full py-2.5 sm:py-0 px-3 sm:px-5 rounded-lg text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                :class="activeSolarTab === 'ongrid'
                  ? 'bg-[#16B4E8] text-[#071E33] shadow-md ring-1 ring-white/60'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'"
              >
                <span v-if="activeSolarTab === 'ongrid'" class="w-2 h-2 rounded-full bg-[#071E33] animate-pulse"></span>
                <span>On-Grid Net Meter</span>
              </button>

              <button
                type="button"
                @click="switchSolarTab('hybrid')"
                class="w-full sm:w-auto h-full py-2.5 sm:py-0 px-3 sm:px-5 rounded-lg text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                :class="activeSolarTab === 'hybrid'
                  ? 'bg-emerald-500 text-white shadow-md ring-1 ring-white/60'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'"
              >
                <span v-if="activeSolarTab === 'hybrid'" class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>Hybrid + Storage</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Floating 4-Metric Fast-Facts Highlights Dock -->
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 bg-white rounded-2xl p-3.5 sm:p-6 shadow-xl border border-gray-100 mb-8 sm:mb-12">
        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">System Capacities</span>
          <span class="text-base sm:text-2xl font-black text-[#16B4E8] block mt-0.5">5kW to 500kW+</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Residential, Commercial &amp; Industrial</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Capital Payback</span>
          <span class="text-base sm:text-2xl font-black text-emerald-600 block mt-0.5">2.2 – 3.2 Yrs</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Rapid ROI with Rising Tariffs</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Module Warranty</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">30-Yr Linear Power</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Tier-1 N-Type TOPCon Bifacial</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">IESCO Net-Metering</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">100% Turnkey</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">AEDB &bull; NEPRA &bull; Green Meter</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <main class="max-w-[1280px] mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article class="lg:col-span-2 space-y-12">

          <!-- Core Architecture Section: On-Grid vs Hybrid vs Commercial -->
          <section id="solar-solutions-section" class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6 scroll-mt-24">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8] bg-sky-50 px-2.5 py-1 rounded-md">
                  SOLAR ENGINEERING DIVISIONS
                </span>
                <h2 class="text-2xl sm:text-3xl font-black text-[#0F2A44] mt-2">
                  Tailored Solar Power Architectures
                </h2>
                <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                  Choose the optimal configuration engineered for your facility's power demand, daytime load, and backup requirements.
                </p>
              </div>
            </div>

            <!-- 3 Architectural Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <!-- Card 1: On-Grid System -->
              <div
                class="p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4"
                :class="activeSolarTab === 'ongrid' ? 'border-[#16B4E8] bg-sky-50/30 ring-2 ring-[#16B4E8]/20' : 'border-gray-200 bg-white hover:border-gray-300'"
              >
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="w-10 h-10 rounded-xl bg-sky-100 text-[#16B4E8] flex items-center justify-center font-black">
                      <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm6 14.5l-6 3.75-6-3.75V8.5l6-3.75 6 3.75v8z"/></svg>
                    </span>
                    <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8] bg-sky-50 px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                  <h3 class="font-extrabold text-[#0F2A44] text-base mb-1">On-Grid (Net-Metered)</h3>
                  <p class="text-xs text-slate-600 leading-relaxed mb-3">
                    Seamless synchronization with the WAPDA/IESCO grid. Surplus daytime units export through a bi-directional green meter to offset nighttime usage.
                  </p>
                  <ul class="text-xs text-slate-600 space-y-1.5 border-t border-gray-100 pt-3">
                    <li class="flex items-start gap-1.5">
                      <span class="text-emerald-500 font-bold">&check;</span>
                      <span>Zero battery capital or replacement costs</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-emerald-500 font-bold">&check;</span>
                      <span>Fastest payback: 2.2 – 3 years</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-emerald-500 font-bold">&check;</span>
                      <span>Smart anti-islanding &amp; zero-export capability</span>
                    </li>
                  </ul>
                </div>
                <div class="pt-3 border-t border-gray-100">
                  <span class="text-[11px] font-bold text-[#0F2A44] block">Best for: Homes &amp; Offices with reliable grid</span>
                </div>
              </div>

              <!-- Card 2: Hybrid + Battery Storage -->
              <div
                class="p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4"
                :class="activeSolarTab === 'hybrid' ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20' : 'border-gray-200 bg-white hover:border-gray-300'"
              >
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">
                      <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15-5.9 10.34z"/></svg>
                    </span>
                    <span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      24/7 Resilience
                    </span>
                  </div>
                  <h3 class="font-extrabold text-[#0F2A44] text-base mb-1">Hybrid + Storage (BESS)</h3>
                  <p class="text-xs text-slate-600 leading-relaxed mb-3">
                    Combines solar generation, grid net metering, and advanced High-Voltage Lithium (LiFePO4) battery storage for zero blackout interruptions.
                  </p>
                  <ul class="text-xs text-slate-600 space-y-1.5 border-t border-gray-100 pt-3">
                    <li class="flex items-start gap-1.5">
                      <span class="text-emerald-500 font-bold">&check;</span>
                      <span>Peak shaving: Avoids expensive PKR 75+/unit peak rates</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-emerald-500 font-bold">&check;</span>
                      <span>Instant 10ms UPS switchover during load shedding</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-emerald-500 font-bold">&check;</span>
                      <span>10-year warranty High-Voltage LFP Batteries</span>
                    </li>
                  </ul>
                </div>
                <div class="pt-3 border-t border-gray-100">
                  <span class="text-[11px] font-bold text-[#0F2A44] block">Best for: Executive villas, critical clinics, data nodes</span>
                </div>
              </div>

              <!-- Card 3: Commercial & Industrial Solar -->
              <div class="p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200 flex flex-col justify-between space-y-4">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="w-10 h-10 rounded-xl bg-slate-100 text-[#0F2A44] flex items-center justify-center font-black">
                      <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                    </span>
                    <span class="text-[10px] font-black uppercase tracking-wider text-[#0F2A44] bg-slate-100 px-2 py-0.5 rounded-full">
                      High Return
                    </span>
                  </div>
                  <h3 class="font-extrabold text-[#0F2A44] text-base mb-1">Commercial &amp; Industrial</h3>
                  <p class="text-xs text-slate-600 leading-relaxed mb-3">
                    Turnkey EPC engineering for plazas, factories, schools, and hospitals (50kW to 1MW+). Offsets high commercial tariffs and protects operational margins.
                  </p>
                  <ul class="text-xs text-slate-600 space-y-1.5 border-t border-gray-100 pt-3">
                    <li class="flex items-start gap-1.5">
                      <span class="text-emerald-500 font-bold">&check;</span>
                      <span>High-voltage HT interconnection &amp; transformer coordination</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-emerald-500 font-bold">&check;</span>
                      <span>Substantial corporate tax depreciation write-offs</span>
                    </li>
                    <li class="flex items-start gap-1.5">
                      <span class="text-emerald-500 font-bold">&check;</span>
                      <span>PPA / Bank Green Refinancing facilitation</span>
                    </li>
                  </ul>
                </div>
                <div class="pt-3 border-t border-gray-100">
                  <span class="text-[11px] font-bold text-[#0F2A44] block">Best for: Plazas, factories, colleges, warehouses</span>
                </div>
              </div>
            </div>

            <!-- Zero Export Feature Callout -->
            <div class="p-4 bg-gradient-to-r from-sky-50 to-blue-50/60 rounded-2xl border border-blue-100 flex items-start gap-3">
              <span class="text-xl">⚡</span>
              <div>
                <h4 class="text-xs font-black text-[#0F2A44] uppercase tracking-wider">
                  Fast-Track Activation: Zero-Export Smart Metering
                </h4>
                <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Never wait weeks for WAPDA paperwork to enjoy solar power. Our smart inverters feature built-in dynamic export limiters so you can power your entire premises with solar immediately upon commissioning without sending back to the grid before the green meter arrives.
                </p>
              </div>
            </div>
          </section>

          <!-- Interactive Solar Savings & System Sizing Calculator -->
          <section id="solar-calculator-section" class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden scroll-mt-24">
            <div class="relative z-10 space-y-6">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    FINANCIAL RETURN ESTIMATOR
                  </span>
                  <h2 class="text-xl sm:text-2xl font-black text-[#0F2A44] mt-2">
                    Interactive Solar Savings &amp; Capacity Calculator
                  </h2>
                  <p class="text-xs sm:text-sm text-slate-500 mt-1">
                    Select your average monthly WAPDA electricity bill to calculate the recommended system size and estimated annual returns.
                  </p>
                </div>
              </div>

              <!-- Bill Selector Presets -->
              <div>
                <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
                  Select Your Average Monthly Electricity Bill:
                </label>
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <button
                    v-for="tier in billTiers"
                    :key="tier.id"
                    type="button"
                    @click="selectedBillTier = tier"
                    class="py-2.5 px-3 rounded-xl text-xs font-bold transition-all border text-center"
                    :class="selectedBillTier.id === tier.id
                      ? 'bg-[#16B4E8] text-[#071E33] border-[#16B4E8] shadow-md font-black scale-[1.02]'
                      : 'bg-gray-50 hover:bg-gray-100 text-slate-700 border-gray-200'"
                  >
                    {{ tier.label }}
                  </button>
                </div>
              </div>

              <!-- Calculation Result Cards -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div class="p-3 bg-white rounded-xl border border-gray-200 text-center shadow-xs">
                  <span class="text-[10px] text-slate-400 font-bold uppercase block">Recommended Capacity</span>
                  <span class="text-lg sm:text-2xl font-black text-[#16B4E8] block mt-1">
                    {{ selectedBillTier.capacity }}
                  </span>
                  <span class="text-[10px] text-slate-500 block mt-0.5">{{ selectedBillTier.panels }} Panels</span>
                </div>

                <div class="p-3 bg-white rounded-xl border border-gray-200 text-center shadow-xs">
                  <span class="text-[10px] text-slate-400 font-bold uppercase block">Monthly Output</span>
                  <span class="text-lg sm:text-2xl font-black text-emerald-600 block mt-1">
                    ~{{ selectedBillTier.monthlyUnits }} Units
                  </span>
                  <span class="text-[10px] text-slate-500 block mt-0.5">IESCO Net-Metered</span>
                </div>

                <div class="p-3 bg-white rounded-xl border border-gray-200 text-center shadow-xs">
                  <span class="text-[10px] text-slate-400 font-bold uppercase block">Monthly Bill Savings</span>
                  <span class="text-lg sm:text-2xl font-black text-amber-600 block mt-1">
                    {{ selectedBillTier.monthlySavings }}
                  </span>
                  <span class="text-[10px] text-slate-500 block mt-0.5">{{ selectedBillTier.annualSavings }} / Year</span>
                </div>

                <div class="p-3 bg-white rounded-xl border border-gray-200 text-center shadow-xs">
                  <span class="text-[10px] text-slate-400 font-bold uppercase block">Payback Period</span>
                  <span class="text-lg sm:text-2xl font-black text-[#0F2A44] block mt-1">
                    {{ selectedBillTier.payback }}
                  </span>
                  <span class="text-[10px] text-slate-500 block mt-0.5">25+ Yrs Free Energy</span>
                </div>
              </div>

              <!-- Action Link -->
              <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <p class="text-xs text-slate-500">
                  Calculated based on average NEPRA peak/off-peak protected and unprotected residential tariffs in Islamabad.
                </p>
                <a
                  :href="`https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20used%20the%20Solar%20Calculator%20for%20bill%20${encodeURIComponent(selectedBillTier.label)}.%20Please%20provide%20a%20detailed%20quotation%20for%20a%20${encodeURIComponent(selectedBillTier.capacity)}%20system.`"
                  target="_blank"
                  class="px-5 py-3 bg-[#6CC24A] hover:bg-[#5db23c] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md flex-shrink-0"
                >
                  <span>Book {{ selectedBillTier.capacity }} Quote</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </section>

          <!-- Core Standard Turnkey Packages (5kW, 10kW, 15kW, 20kW, 50kW) -->
          <section class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
              <div>
                <span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  ENGINEERED SYSTEM PACKAGES
                </span>
                <h3 class="text-xl sm:text-2xl font-black text-[#0F2A44]">
                  Standard Turnkey Solar Capacity Packages
                </h3>
              </div>
            </div>

            <!-- Packages Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- 5kW Residential Package -->
              <div class="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#16B4E8] transition-all shadow-xs space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-[#16B4E8] uppercase tracking-wider">5 Marla / 7 Marla Home</span>
                  <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Single / 3-Phase</span>
                </div>
                <h4 class="text-lg font-black text-[#0F2A44]">5kW Turnkey On-Grid System</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Engineered for compact homes to run essential heavy loads including a 1.5-ton inverter AC, refrigerator, water pump, and lights.
                </p>
                <div class="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-gray-100">
                  <div class="flex justify-between"><span>Modules:</span><strong class="text-[#0F2A44]">8x 600W Tier-1 Bifacial</strong></div>
                  <div class="flex justify-between"><span>Inverter:</span><strong class="text-[#0F2A44]">5kW Three-Phase Smart Inverter</strong></div>
                  <div class="flex justify-between"><span>Generation:</span><strong class="text-emerald-600">600 – 720 Units/Month</strong></div>
                  <div class="flex justify-between"><span>IESCO Net Meter:</span><strong class="text-[#0F2A44]">Complete Documentation Included</strong></div>
                </div>
                <div class="flex items-center justify-between pt-2">
                  <div>
                    <span class="text-[10px] text-slate-400 block uppercase font-bold">Est. Monthly Savings</span>
                    <strong class="text-sm font-black text-[#0F2A44]">PKR 35,000 – 45,000</strong>
                  </div>
                  <a
                    href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20the%205kW%20Solar%20System%20Package."
                    target="_blank"
                    class="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs rounded-lg transition-colors"
                  >
                    Inquire 5kW &rarr;
                  </a>
                </div>
              </div>

              <!-- 10kW Executive Package -->
              <div class="bg-white p-6 rounded-2xl border-2 border-[#16B4E8] shadow-md space-y-4 relative">
                <div class="absolute -top-3 right-6 bg-[#16B4E8] text-[#071E33] text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  Top Recommended
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-[#16B4E8] uppercase tracking-wider">10 Marla / 1 Kanal Home</span>
                  <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">3-Phase IESCO</span>
                </div>
                <h4 class="text-lg font-black text-[#0F2A44]">10kW Turnkey On-Grid / Hybrid</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                  The gold standard for standard Pakistani family homes. Effortlessly powers 2–3 inverter ACs, deep freezer, washing machines, and electronic appliances.
                </p>
                <div class="p-3 bg-sky-50/50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-sky-100">
                  <div class="flex justify-between"><span>Modules:</span><strong class="text-[#0F2A44]">16x 600W Tier-1 N-Type Bifacial</strong></div>
                  <div class="flex justify-between"><span>Inverter:</span><strong class="text-[#0F2A44]">10kW European/Global Smart Inverter</strong></div>
                  <div class="flex justify-between"><span>Generation:</span><strong class="text-emerald-600">1,250 – 1,450 Units/Month</strong></div>
                  <div class="flex justify-between"><span>Net Metering:</span><strong class="text-[#0F2A44]">Turnkey Green Meter Commissioning</strong></div>
                </div>
                <div class="flex items-center justify-between pt-2">
                  <div>
                    <span class="text-[10px] text-slate-400 block uppercase font-bold">Est. Monthly Savings</span>
                    <strong class="text-sm font-black text-[#16B4E8]">PKR 80,000 – 105,000</strong>
                  </div>
                  <a
                    href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20the%2010kW%20Solar%20System%20Package."
                    target="_blank"
                    class="px-4 py-2 bg-[#16B4E8] text-[#071E33] hover:bg-[#0ea0d1] font-black text-xs rounded-lg transition-colors"
                  >
                    Inquire 10kW &rarr;
                  </a>
                </div>
              </div>

              <!-- 15kW to 20kW Luxury Villa Package -->
              <div class="bg-white p-6 rounded-2xl border border-gray-200 hover:border-emerald-500 transition-all shadow-xs space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-emerald-600 uppercase tracking-wider">1 Kanal / 2 Kanal Villa</span>
                  <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">High Load Capacity</span>
                </div>
                <h4 class="text-lg font-black text-[#0F2A44]">15kW – 20kW Executive System</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Designed for luxury multi-story residences with 4–6 inverter ACs, EV vehicle chargers, heated water systems, and outdoor illumination.
                </p>
                <div class="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-gray-100">
                  <div class="flex justify-between"><span>Modules:</span><strong class="text-[#0F2A44]">26 – 34x 600W Tier-1 Panels</strong></div>
                  <div class="flex justify-between"><span>Inverter:</span><strong class="text-[#0F2A44]">15kW/20kW Dual MPPT Smart Inverter</strong></div>
                  <div class="flex justify-between"><span>Generation:</span><strong class="text-emerald-600">1,900 – 2,700 Units/Month</strong></div>
                  <div class="flex justify-between"><span>Storage:</span><strong class="text-[#0F2A44]">Optional LiFePO4 High-Voltage Battery</strong></div>
                </div>
                <div class="flex items-center justify-between pt-2">
                  <div>
                    <span class="text-[10px] text-slate-400 block uppercase font-bold">Est. Monthly Savings</span>
                    <strong class="text-sm font-black text-emerald-600">PKR 140,000 – 195,000</strong>
                  </div>
                  <a
                    href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20the%2015kW-20kW%20Solar%20System."
                    target="_blank"
                    class="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs rounded-lg transition-colors"
                  >
                    Inquire 20kW &rarr;
                  </a>
                </div>
              </div>

              <!-- 50kW+ Commercial & Plaza Package -->
              <div class="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#0F2A44] transition-all shadow-xs space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-[#0F2A44] uppercase tracking-wider">Commercial Plaza / Factory</span>
                  <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Three-Phase HT/LT</span>
                </div>
                <h4 class="text-lg font-black text-[#0F2A44]">50kW+ Commercial EPC Solar</h4>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Corporate-grade rooftop or ground-mount solar power plant tailored for office plazas, private hospitals, fuel stations, and manufacturing units.
                </p>
                <div class="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-gray-100">
                  <div class="flex justify-between"><span>Modules:</span><strong class="text-[#0F2A44]">84+ High-Yield Bifacial Modules</strong></div>
                  <div class="flex justify-between"><span>Inverter:</span><strong class="text-[#0F2A44]">50kW Industrial Multi-MPPT Inverter</strong></div>
                  <div class="flex justify-between"><span>Generation:</span><strong class="text-emerald-600">6,000 – 7,200 Units/Month</strong></div>
                  <div class="flex justify-between"><span>Interconnection:</span><strong class="text-[#0F2A44]">IESCO Sub-Station Coordination</strong></div>
                </div>
                <div class="flex items-center justify-between pt-2">
                  <div>
                    <span class="text-[10px] text-slate-400 block uppercase font-bold">Corporate Tariff Offset</span>
                    <strong class="text-sm font-black text-[#0F2A44]">PKR 450,000 – 580,000/mo</strong>
                  </div>
                  <a
                    href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20a%20Commercial%2050kW%2B%20Solar%20Project."
                    target="_blank"
                    class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F2A44] font-bold text-xs rounded-lg transition-colors"
                  >
                    Commercial Audit &rarr;
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- Engineering Standards & Tier-1 Equipment Selection -->
          <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8] bg-sky-50 px-2.5 py-1 rounded-md">
                HARDWARE RIGOR
              </span>
              <h3 class="text-2xl font-black text-[#0F2A44] mt-2">
                Tier-1 Equipment &amp; Engineering Standards
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                We never compromise on component longevity. Every TopLinkers installation exclusively features globally certified tier-1 components.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <!-- Spec 1: Modules -->
              <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="text-lg">☀️</span>
                  <strong class="text-sm text-[#0F2A44]">N-Type TOPCon &amp; Bifacial Modules</strong>
                </div>
                <p class="text-slate-600 leading-relaxed">
                  BloombergNEF (BNEF) Tier-1 certified modules (Longi Hi-MO, Jinko Tiger Neo, JA Solar). 22.5%+ cell efficiency with dual-glass rear generation capturing up to 25% extra reflected ground light.
                </p>
                <span class="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  30-Year Linear Power Warranty
                </span>
              </div>

              <!-- Spec 2: Inverters -->
              <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="text-lg">🔌</span>
                  <strong class="text-sm text-[#0F2A44]">European &amp; Global Smart Inverters</strong>
                </div>
                <p class="text-slate-600 leading-relaxed">
                  Huawei FusionSolar, Sungrow, Growatt, and GoodWe. Incorporates AI-powered Arc Fault Circuit Interruption (AFCI), 98.6% max efficiency, and dual MPPT trackers.
                </p>
                <span class="inline-block text-[10px] font-bold text-[#16B4E8] bg-sky-50 px-2 py-0.5 rounded">
                  5 to 10-Year Replacement Warranty
                </span>
              </div>

              <!-- Spec 3: Mounting Structure -->
              <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="text-lg">🏗️</span>
                  <strong class="text-sm text-[#0F2A44]">Hot-Dipped Galvanized Elevated Structure</strong>
                </div>
                <p class="text-slate-600 leading-relaxed">
                  Heavy-gauge hot-dipped galvanized steel (GI) or anodized structural aluminum (6063-T6). Custom elevated P1/P2/P3/P4 structures preserve full rooftop usability and resist 150 km/h wind loads.
                </p>
                <span class="inline-block text-[10px] font-bold text-[#0F2A44] bg-slate-100 px-2 py-0.5 rounded">
                  Rust-Proof 25-Year Guarantee
                </span>
              </div>

              <!-- Spec 4: Switchgear & Safety -->
              <div class="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="text-lg">🛡️</span>
                  <strong class="text-sm text-[#0F2A44]">Surge Protection &amp; Dedicated Earthing</strong>
                </div>
                <p class="text-slate-600 leading-relaxed">
                  ABB/Schneider AC &amp; DC circuit breakers, Type-II surge protection devices (SPDs), UV-resistant tinned copper solar cabling, and dedicated chemical earthing bore (&lt; 5 Ohms).
                </p>
                <span class="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Full Electrical Fire &amp; Lightning Safety
                </span>
              </div>
            </div>
          </section>

          <!-- 7-Stage Turnkey Net-Metering Process Roadmap -->
          <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                IESCO / WAPDA WORKFLOW
              </span>
              <h3 class="text-2xl font-black text-[#0F2A44] mt-2">
                Our 7-Step Turnkey Net-Metering Execution
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                We handle 100% of the bureaucratic and technical coordination from initial load sanction to green meter installation.
              </p>
            </div>

            <!-- Steps -->
            <div class="space-y-3">
              <div
                v-for="(step, idx) in netMeteringSteps"
                :key="idx"
                class="flex items-start gap-4 p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 bg-gray-50/50 transition-colors"
              >
                <span class="w-8 h-8 rounded-full bg-[#0F2A44] text-[#16B4E8] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  0{{ idx + 1 }}
                </span>
                <div class="min-w-0 flex-1">
                  <h4 class="text-sm font-bold text-[#0F2A44]">{{ step.title }}</h4>
                  <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Certified Engineering Leadership -->
          <section class="bg-white p-7 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <span class="text-[10px] font-black uppercase tracking-wider text-[#6CC24A] bg-emerald-50 px-2.5 py-1 rounded-md">
                  PEC REGISTERED TECHNICAL DIVISION
                </span>
                <h2 class="text-xl sm:text-2xl font-black text-[#0F2A44] mt-2">
                  Certified Solar &amp; Net-Metering Engineers
                </h2>
                <p class="text-xs text-slate-500 mt-1">
                  Direct engineering oversight for 3D load calculations, structural stress certifications, and IESCO green meter approvals.
                </p>
              </div>
              <router-link
                to="/team"
                class="text-xs font-bold text-[#16B4E8] hover:text-[#0F2A44] transition-colors flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Full Engineering Directory</span>
                <span>&rarr;</span>
              </router-link>
            </div>

            <!-- Engineers Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Engr. Asad Ur Rehman -->
              <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 border border-slate-200/90 hover:border-[#16B4E8] transition-all flex flex-col justify-between space-y-4 group">
                <div class="flex items-start gap-4">
                  <div class="relative flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                      alt="Engr. Asad Ur Rehman - Solar Engineer TopLinkers"
                      class="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                      width="64"
                      height="64"
                      loading="lazy"
                      decoding="async"
                    />
                    <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center text-white" title="PEC Active">
                      <svg class="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    </span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <span class="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded inline-block mb-1">
                      PEC Registered Solar Eng.
                    </span>
                    <h3 class="text-base font-black text-[#0F2A44] leading-tight">
                      Engr. Asad Ur Rehman
                    </h3>
                    <p class="text-xs font-bold text-[#16B4E8] mt-0.5 leading-snug">
                      Lead Solar Energy &amp; Photovoltaic Systems Engineer
                    </p>
                    <span class="text-[11px] font-semibold text-slate-500 block mt-0.5">
                      9+ Years Experience &bull; Energy Storage Specialist
                    </span>
                  </div>
                </div>

                <p class="text-xs text-slate-600 leading-relaxed font-normal">
                  Leads solar PV plant electrical architecture, rooftop structural stress testing, battery storage synchronizations, and utility-scale IESCO net-metering grid clearances.
                </p>

                <!-- Actions -->
                <div class="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <a
                    href="https://wa.me/923324004884?text=Hello%20Engr.%20Asad%20Ur%20Rehman,%20I%20need%20solar%20net%20metering%20engineering%20consultation"
                    target="_blank"
                    class="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>WhatsApp Engr. Asad</span>
                  </a>
                  <a
                    href="tel:+923324004884"
                    class="px-3 py-2 rounded-xl border border-slate-300 hover:border-[#0F2A44] text-[#0F2A44] text-xs font-bold transition-colors"
                  >
                    Call
                  </a>
                </div>
              </div>

              <!-- Engr. Salman Qureshi -->
              <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 border border-slate-200/90 hover:border-[#16B4E8] transition-all flex flex-col justify-between space-y-4 group">
                <div class="flex items-start gap-4">
                  <div class="relative flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                      alt="Engr. Salman Qureshi - Solar Engineer TopLinkers"
                      class="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                      width="64"
                      height="64"
                      loading="lazy"
                      decoding="async"
                    />
                    <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center text-white" title="PEC Active">
                      <svg class="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    </span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <span class="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded inline-block mb-1">
                      PEC &amp; AEDB Certified
                    </span>
                    <h3 class="text-base font-black text-[#0F2A44] leading-tight">
                      Engr. Salman Qureshi
                    </h3>
                    <p class="text-xs font-bold text-[#16B4E8] mt-0.5 leading-snug">
                      Lead Solar &amp; IESCO Net-Metering Engineer
                    </p>
                    <span class="text-[11px] font-semibold text-slate-500 block mt-0.5">
                      10+ Years Experience &bull; IESCO Liaison
                    </span>
                  </div>
                </div>

                <p class="text-xs text-slate-600 leading-relaxed font-normal">
                  Expert in 10kW to 50kW on-grid inverter commissioning (Huawei, Sungrow, Growatt), bi-directional green meter documentation, and sub-station approvals.
                </p>

                <!-- Actions -->
                <div class="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <a
                    href="https://wa.me/923324004884?text=Hello%20Engr.%20Salman%20Qureshi,%20I%20am%20inquiring%20about%20IESCO%20solar%20net%20metering"
                    target="_blank"
                    class="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>WhatsApp Engr. Salman</span>
                  </a>
                  <a
                    href="tel:+923324004884"
                    class="px-3 py-2 rounded-xl border border-slate-300 hover:border-[#0F2A44] text-[#0F2A44] text-xs font-bold transition-colors"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- Operations & Maintenance (O&M) + Warranties -->
          <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                LONG-TERM ASSURANCE
              </span>
              <h3 class="text-2xl font-black text-[#0F2A44] mt-2">
                Operations, Maintenance &amp; Comprehensive Warranties
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                A solar system is a 25+ year capital asset. We provide end-to-end Operations and Maintenance (O&amp;M) to preserve peak generation yield.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span class="text-base block mb-1">🧼</span>
                <strong class="text-[#0F2A44] font-bold block mb-1">Scheduled Panel Washing</strong>
                <p class="text-slate-600 leading-relaxed">
                  Regular de-ionized panel cleaning eliminates Islamabad dust and smog residue, restoring up to 15% lost generation.
                </p>
              </div>

              <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span class="text-base block mb-1">🔍</span>
                <strong class="text-[#0F2A44] font-bold block mb-1">Thermal Drone Audits</strong>
                <p class="text-slate-600 leading-relaxed">
                  Infrared thermographic scans detect micro-cracks, module hot spots, and diode failures before performance degrades.
                </p>
              </div>

              <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span class="text-base block mb-1">⚙️</span>
                <strong class="text-[#0F2A44] font-bold block mb-1">Electrical Health Checks</strong>
                <p class="text-slate-600 leading-relaxed">
                  Annual tightening of DC/AC isolators, inverter firmware upgrades, and earthing resistance re-verification (&lt; 5 Ohms).
                </p>
              </div>
            </div>
          </section>

          <!-- Comprehensive FAQs on Solar Net-Metering -->
          <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8] bg-sky-50 px-2.5 py-1 rounded-md">
                KNOWLEDGE BASE
              </span>
              <h2 class="text-xl sm:text-2xl font-black text-[#0F2A44] mt-2">
                Frequently Asked Questions on Solar Net-Metering in Pakistan
              </h2>
            </div>

            <div class="space-y-4">
              <div
                v-for="faq in solarFaqs"
                :key="faq.id"
                class="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1.5 flex items-start gap-2">
                  <span class="text-[#16B4E8] font-black">Q.</span>
                  <span>{{ faq.question }}</span>
                </h3>
                <p class="text-xs text-gray-600 leading-relaxed pl-5">{{ faq.answer }}</p>
              </div>
            </div>
          </section>
        </article>

        <!-- Right Sticky Sidebar: Quick Audit & Bank Financing -->
        <aside class="space-y-6">
          <!-- Request Audit Card -->
          <div class="bg-gradient-to-b from-[#0F2A44] to-[#081B2E] text-white p-6 rounded-3xl shadow-xl sticky top-28 border border-white/10">
            <span class="text-[10px] font-black uppercase tracking-wider text-[#6CC24A] bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full inline-block mb-3">
              ZERO-OBLIGATION CONSULTATION
            </span>
            <h3 class="font-black text-xl text-white mb-2">Request Free Solar Feasibility</h3>
            <p class="text-xs text-slate-300 mb-6 leading-relaxed">
              Send us a photo of your latest WAPDA/IESCO electricity bill. Our engineers will perform a computerized rooftop load and shadow study within 24 hours.
            </p>

            <div class="space-y-3 text-xs mb-6 pb-6 border-b border-white/10">
              <div class="flex items-center gap-2.5">
                <MapPinIcon class="w-4 h-4 text-[#6CC24A] flex-shrink-0" />
                <span class="text-slate-200">Al Hameed Plaza, G-11 Markaz, Islamabad</span>
              </div>
              <div class="flex items-center gap-2.5">
                <PhoneIcon class="w-4 h-4 text-[#6CC24A] flex-shrink-0" />
                <a href="tel:+923349522157" class="hover:text-[#6CC24A] font-bold text-white">+92-334-9522157</a>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="text-emerald-400 font-bold">⚡</span>
                <span class="text-slate-200">Direct Engineering Desk: <a href="tel:+923324004884" class="underline hover:text-[#16B4E8]">+92-332-4004884</a></span>
              </div>
            </div>

            <!-- WhatsApp Action -->
            <a
              href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20would%20like%20to%20send%20my%20electricity%20bill%20for%20a%20Free%20Solar%20Audit."
              target="_blank"
              class="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-black uppercase tracking-wider rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-lg mb-3"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Send Bill on WhatsApp</span>
            </a>

            <!-- Bank Green Financing Card -->
            <div class="mt-4 pt-4 border-t border-white/10 text-xs space-y-2">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Bank Solar Financing Options
              </span>
              <p class="text-slate-300 leading-relaxed text-[11px]">
                Low-markup green financing available via State Bank of Pakistan (SBP) refinancing schemes through Meezan Bank, Bank Alfalah, and Faysal Bank (3 to 5-year easy installments).
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline'

// Active tab switcher state: 'ongrid' | 'hybrid' | 'all'
const activeSolarTab = ref('ongrid')

const switchSolarTab = (tab) => {
  activeSolarTab.value = tab
  if (typeof window !== 'undefined' && window.scrollY > 350) {
    const el = document.getElementById('solar-solutions-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Interactive Solar Savings Calculator Data
const billTiers = [
  {
    id: 'tier-35k',
    label: 'PKR 35,000 – 50,000',
    capacity: '5 kW System',
    panels: 8,
    monthlyUnits: '600 – 720',
    monthlySavings: 'PKR 35,000+',
    annualSavings: 'PKR 420,000',
    payback: '~2.8 Years'
  },
  {
    id: 'tier-75k',
    label: 'PKR 70,000 – 95,000',
    capacity: '10 kW System',
    panels: 16,
    monthlyUnits: '1,250 – 1,450',
    monthlySavings: 'PKR 80,000+',
    annualSavings: 'PKR 960,000',
    payback: '~2.4 Years'
  },
  {
    id: 'tier-120k',
    label: 'PKR 110,000 – 150,000',
    capacity: '15 kW System',
    panels: 24,
    monthlyUnits: '1,850 – 2,150',
    monthlySavings: 'PKR 125,000+',
    annualSavings: 'PKR 1.5 Million',
    payback: '~2.3 Years'
  },
  {
    id: 'tier-180k',
    label: 'PKR 160,000 – 220,000',
    capacity: '20 kW System',
    panels: 32,
    monthlyUnits: '2,500 – 2,850',
    monthlySavings: 'PKR 175,000+',
    annualSavings: 'PKR 2.1 Million',
    payback: '~2.2 Years'
  },
  {
    id: 'tier-commercial',
    label: 'PKR 350,000+ (Commercial)',
    capacity: '50 kW+ Commercial',
    panels: 84,
    monthlyUnits: '6,200 – 7,500',
    monthlySavings: 'PKR 480,000+',
    annualSavings: 'PKR 5.7 Million',
    payback: '~2.1 Years'
  }
]

const selectedBillTier = ref(billTiers[1]) // Default to 10kW tier

// 7-Stage Turnkey Net-Metering Steps
const netMeteringSteps = [
  {
    title: 'Digital 3D Rooftop Survey & Helioscope Shadow Simulation',
    description: 'Our PEC engineers assess your roof load capacity, azimuth orientation, and perform 3D shadow analysis to guarantee maximum solar exposure year-round.'
  },
  {
    title: 'System Design & Electrical Single Line Diagram (SLD)',
    description: 'Engineering design of panel array strings, DC cable routing, inverter sizing, and load distribution with approved PEC certification stamps.'
  },
  {
    title: 'IESCO Sub-Division Application & NOC Verification',
    description: 'Preparation and submission of the official net-metering application with the relevant IESCO sub-division, ensuring all property title and bill verifications are seamless.'
  },
  {
    title: 'AEDB Certified Equipment Procurement & Testing',
    description: 'Procurement of BloombergNEF Tier-1 N-Type TOPCon bifacial modules, smart inverters, and switchgear with authentic manufacturer serials and warranties.'
  },
  {
    title: 'On-Site Precision Installation & Chemical Earthing',
    description: 'Mounting of hot-dipped galvanized elevated structures, panel fixation with stainless-steel hardware, inverter wall mounting, and chemical earthing pits (< 5 Ohms).'
  },
  {
    title: 'IESCO Laboratory Meter Testing & Inspection',
    description: 'Coordination with IESCO surveillance teams for inspection of the installed solar array, anti-islanding relay test, and lab calibration of the bidirectional meter.'
  },
  {
    title: 'Green Bidirectional Meter Installation & Billing Offset',
    description: 'Physical installation of the IESCO bidirectional green meter and activation of your net-metering contract, allowing surplus daytime power to officially offset your bills.'
  }
]

// Comprehensive Knowledge Base FAQs
const solarFaqs = [
  {
    id: 1,
    question: 'How does IESCO Net Metering actually work in Islamabad & Rawalpindi?',
    answer: 'Net metering is an authorized billing mechanism governed by NEPRA that allows you to connect your solar system to the national grid. During the day, your solar panels power your home and automatically export any surplus units through a bi-directional green meter into the IESCO grid. At night, you consume electricity from the grid. At the end of the billing cycle, exported units are subtracted from imported units. If you export more than you import, your bill is zero and you receive negative credits carried forward or paid by IESCO.'
  },
  {
    id: 2,
    question: 'What is the difference between On-Grid and Hybrid Solar Systems?',
    answer: 'An On-Grid system operates in sync with the utility grid and exports surplus energy through a net meter; it does not use batteries, making it the most cost-effective solution with the fastest payback (2.2–3 years), but it shuts down during grid blackouts for safety reasons (anti-islanding). A Hybrid system connects to both the grid (for net metering) and high-voltage Lithium (LiFePO4) battery banks, providing instantaneous backup during load shedding while also allowing intelligent peak shaving during high-tariff evening hours.'
  },
  {
    id: 3,
    question: 'What is the expected capital payback period for a 10kW or 20kW system?',
    answer: 'With electricity unit rates in Pakistan exceeding PKR 65 to PKR 85 per unit (including taxes and surcharges), an engineered 10kW system generates approximately PKR 80,000 to PKR 105,000 in monthly bill savings, recovering your entire initial investment in just 2.2 to 2.8 years. After payback, your solar power is essentially free for the remaining 25+ years of the modules’ lifespan.'
  },
  {
    id: 4,
    question: 'How long does the complete IESCO Net Metering approval process take?',
    answer: 'The complete process typically takes 4 to 6 weeks from application submission to physical green meter commissioning. However, with our Fast-Track Zero-Export technology, we configure your inverter with dynamic limiters on the day of physical installation so you can start powering your home immediately without waiting for the green meter.'
  },
  {
    id: 5,
    question: 'What warranties and guarantees are provided with TopLinkers Solar installations?',
    answer: 'We provide a 30-Year Linear Power Output Warranty and 12-Year Product Warranty on Tier-1 N-Type TOPCon bifacial modules, a 5 to 10-Year Replacement Warranty on smart inverters (Huawei, Sungrow, Growatt), a 10-Year Warranty on Lithium-Ion (LiFePO4) battery banks, and a 5-Year Structural Integrity Guarantee on all hot-dipped galvanized elevated mounting structures.'
  },
  {
    id: 6,
    question: 'Can solar panels run heavy loads like Inverter ACs, water pumps, and EV chargers?',
    answer: 'Yes, absolutely. A 10kW system easily powers up to three 1.5-ton inverter air conditioners simultaneously during the day along with refrigerators, water motors, and home appliances. A 15kW to 20kW system can comfortably handle four to six inverter ACs plus dedicated electric vehicle (EV) charging stations.'
  },
  {
    id: 7,
    question: 'What kind of roof space is required for a 10kW solar system?',
    answer: 'A standard 10kW system utilizes approximately 16 high-efficiency 600W Tier-1 bifacial panels, requiring roughly 600 to 750 square feet of unshaded roof space. With our custom elevated hot-dipped galvanized structures, the panels are raised 8 to 10 feet above roof level, leaving your entire rooftop terrace completely accessible and usable for family recreation.'
  },
  {
    id: 8,
    question: 'Is bank financing or easy installment plans available for solar installations?',
    answer: 'Yes. We facilitate low-markup green solar financing under the State Bank of Pakistan (SBP) Renewable Energy Refinancing Scheme through leading partner banks (Meezan Bank, Bank Alfalah, and Faysal Bank) with flexible repayment terms spanning 3 to 5 years.'
  }
]
</script>

<style scoped>
.service-detail-page {
  min-height: 100vh;
}
</style>
