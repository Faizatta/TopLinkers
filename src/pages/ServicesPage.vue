<template>
  <div class="services-page pt-28 sm:pt-32 md:pt-36 pb-16 bg-[#F8FAFC] min-h-screen">
    <div class="max-w-[1280px] mx-auto px-4">
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center text-xs text-gray-500 gap-2 mb-6" aria-label="Breadcrumb">
        <router-link to="/" class="hover:text-[#16B4E8]">Home</router-link>
        <span>/</span>
        <span class="text-[#0F2A44] font-bold">Services &amp; Advisory Divisions</span>
      </nav>

      <!-- Page Header -->
      <div class="mb-8 text-center max-w-3xl mx-auto">
        <span class="text-xs font-black uppercase tracking-widest text-[#16B4E8] bg-[#16B4E8]/10 px-3 py-1 rounded-full inline-block mb-2">
          Integrated Property Solutions
        </span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2A44] tracking-tight">
          TopLinkers Advisory &amp; Services
        </h1>
        <p class="text-xs sm:text-sm text-gray-600 mt-2.5 max-w-2xl mx-auto leading-relaxed">
          From verified on-ground plots and installment files to PHA cash flats, turnkey construction, and IESCO Tier-1 solar net metering across Islamabad &amp; Rawalpindi.
        </p>
      </div>

      <!-- Compact & User-Friendly Division Selector -->
      <div class="mb-10 sm:mb-12">
        <!-- Mobile Dropdown Selector (Compact, Intuitive & Clean) -->
        <div class="sm:hidden max-w-sm mx-auto">
          <label class="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1.5 text-center">
            Select Core Division:
          </label>
          <div class="relative">
            <select
              v-model="activeTab"
              class="w-full text-xs font-black text-[#0F2A44] py-3 pl-4 pr-10 rounded-xl border-2 border-[#16B4E8] bg-white shadow-sm focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Core Divisions (Plots, Flats, Construction, Solar)</option>
              <option value="plot">1. Plots (Moqa Ka Plot &amp; Installments)</option>
              <option value="flats">2. Flats (PHA Cash &amp; Banu Hafeez)</option>
              <option value="construction">3. Turnkey Construction Services</option>
              <option value="solar">4. Solar Services (10kW, 20kW, 50kW)</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#16B4E8]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>
        </div>

        <!-- Desktop Segmented Control Bar (Compact, Unified Pill Container with Crisp Heroicons) -->
        <div class="hidden sm:flex items-center justify-center p-1.5 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-4xl mx-auto gap-1">
          <!-- 1. All Divisions -->
          <button
            type="button"
            :class="[
              'px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2',
              activeTab === 'all'
                ? 'bg-[#0F2A44] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#0F2A44] hover:bg-gray-50'
            ]"
            @click="activeTab = 'all'"
          >
            <Squares2X2Icon class="w-4 h-4 transition-colors" :class="activeTab === 'all' ? 'text-[#16B4E8]' : 'text-gray-400'" />
            <span>All Divisions</span>
          </button>

          <!-- 2. Plots -->
          <button
            type="button"
            :class="[
              'px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2',
              activeTab === 'plot'
                ? 'bg-[#0F2A44] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#0F2A44] hover:bg-gray-50'
            ]"
            @click="activeTab = 'plot'"
          >
            <MapIcon class="w-4 h-4 transition-colors" :class="activeTab === 'plot' ? 'text-[#16B4E8]' : 'text-[#0F2A44]'" />
            <span>1. Plots (Moqa &amp; Installments)</span>
          </button>

          <!-- 3. PHA & Flats -->
          <button
            type="button"
            :class="[
              'px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2',
              activeTab === 'flats'
                ? 'bg-[#0F2A44] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#0F2A44] hover:bg-gray-50'
            ]"
            @click="activeTab = 'flats'"
          >
            <BuildingOffice2Icon class="w-4 h-4 transition-colors" :class="activeTab === 'flats' ? 'text-[#16B4E8]' : 'text-[#0F2A44]'" />
            <span>2. PHA &amp; Flats</span>
          </button>

          <!-- 4. Construction -->
          <button
            type="button"
            :class="[
              'px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2',
              activeTab === 'construction'
                ? 'bg-[#0F2A44] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#0F2A44] hover:bg-gray-50'
            ]"
            @click="activeTab = 'construction'"
          >
            <WrenchScrewdriverIcon class="w-4 h-4 transition-colors" :class="activeTab === 'construction' ? 'text-[#16B4E8]' : 'text-[#0F2A44]'" />
            <span>3. Construction</span>
          </button>

          <!-- 5. Solar Net Metering -->
          <button
            type="button"
            :class="[
              'px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2',
              activeTab === 'solar'
                ? 'bg-[#0F2A44] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#0F2A44] hover:bg-gray-50'
            ]"
            @click="activeTab = 'solar'"
          >
            <SunIcon class="w-4 h-4 transition-colors" :class="activeTab === 'solar' ? 'text-[#16B4E8]' : 'text-[#0F2A44]'" />
            <span>4. Solar Net Metering</span>
          </button>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- FEATURED SPOTLIGHT: HARSUKH NATHIA GALI    -->
      <!-- (Shown on Property/Construction/All tabs)  -->
      <!-- ========================================== -->
      <div
        v-if="activeTab !== 'solar'"
        class="mb-14 bg-gradient-to-r from-[#0F2A44] via-[#143452] to-[#0F2A44] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
      >
        <div class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#16B4E8]/10 pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div class="lg:col-span-4 h-56 sm:h-64 rounded-2xl overflow-hidden bg-gray-900 border border-white/10 shadow-lg">
            <img
              src="/images/hero-harsukh.webp"
              alt="Harsukh Nathia Gali"
              loading="lazy"
              decoding="async"
              width="800"
              height="500"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div class="lg:col-span-8 space-y-3.5">
            <div class="flex items-center gap-2">
              <span class="bg-[#16B4E8] text-[#0F2A44] text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow">
                HOT SELLING PROJECT
              </span>
              <span class="text-xs text-[#16B4E8] font-bold">Kuza Gali • Nathia Gali</span>
            </div>

            <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Harsukh Residencies — Luxury Vacation &amp; Investment Flats
            </h2>

            <p class="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
              Prime scenic location in Nathia Gali for memorable family holidays and high-yield tourist rental investment. Executive Studio, 1-Bed, and 2-Bed suites with panoramic pine-valley views.
            </p>

            <div class="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20Harsukh%20luxury%20flats%20in%20Nathia%20Gali"
                target="_blank"
                class="px-6 py-3 bg-[#16B4E8] hover:bg-[#119ecf] text-[#0F2A44] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow flex items-center gap-2"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>Inquire Harsukh Booking</span>
              </a>

              <button
                type="button"
                @click="openInstallmentModal('hrsukh')"
                class="px-5 py-3 bg-white/10 hover:bg-white hover:text-[#0F2A44] text-white text-xs font-bold uppercase rounded-xl transition-colors flex items-center gap-1.5"
              >
                <svg class="w-4 h-4 text-[#16B4E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>View 3-Year Payment Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- 1. PLOT SERVICE & CATEGORIES (SEGREGATED CASH VS INSTALLMENTS) -->
      <!-- ========================================== -->
      <section
        v-if="activeTab === 'all' || activeTab === 'plot'"
        id="plot"
        class="mb-16 scroll-mt-28"
      >
        <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-gray-200">
          <div>
            <span class="text-[10px] font-black uppercase tracking-widest text-[#16B4E8]">Division 01 &bull; Verified Land Portfolios</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F2A44] mt-1">
              Plots: 100% Cash Ready vs. Easy Installments
            </h2>
            <p class="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
              Clearly segregated land options: choose between immediate on-ground physical possession or flexible 3 to 4-year installment files.
            </p>
          </div>

          <!-- Segregation Quick Switcher (Typography-only, No Icons) -->
          <div class="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 flex-shrink-0 self-start md:self-auto">
            <button
              type="button"
              @click="plotPaymentFilter = 'all'"
              :class="[
                'px-3.5 py-2 rounded-lg text-xs font-black transition-all',
                plotPaymentFilter === 'all'
                  ? 'bg-[#0F2A44] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#0F2A44]'
              ]"
            >
              All Plots
            </button>
            <button
              type="button"
              @click="plotPaymentFilter = 'cash'"
              :class="[
                'px-3.5 py-2 rounded-lg text-xs font-black transition-all',
                plotPaymentFilter === 'cash'
                  ? 'bg-[#16B4E8] text-[#0F2A44] shadow-xs'
                  : 'text-gray-600 hover:text-[#0F2A44]'
              ]"
            >
              100% Cash Ready (Moqa)
            </button>
            <button
              type="button"
              @click="plotPaymentFilter = 'installments'"
              :class="[
                'px-3.5 py-2 rounded-lg text-xs font-black transition-all',
                plotPaymentFilter === 'installments'
                  ? 'bg-[#16B4E8] text-[#0F2A44] shadow-xs'
                  : 'text-gray-600 hover:text-[#0F2A44]'
              ]"
            >
              Installment Plans
            </button>
          </div>
        </div>

        <!-- 1A: 100% CASH POSSESSION (MOQA KA PLOTS) CONTAINER -->
        <div
          v-if="plotPaymentFilter === 'all' || plotPaymentFilter === 'cash'"
          class="mb-12 p-6 sm:p-8 rounded-3xl bg-slate-50/70 border border-slate-200"
        >
          <!-- Section Banner (Typography-focused, No Icons) -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80">
            <div>
              <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                <span class="px-2.5 py-1 bg-[#0F2A44] text-white text-[10px] font-black uppercase tracking-wider rounded-md">
                  100% Cash Payment &bull; Ready On-Ground
                </span>
                <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Immediate Demarcation &bull; Direct Registry
                </span>
              </div>
              <h3 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
                Moqa Ka Plots — Ready Physical Possession
              </h3>
              <p class="text-xs text-gray-500 mt-1 leading-relaxed max-w-3xl">
                Demarcated on-ground plots with instant title clearance. 100% upfront settlement with zero monthly debt or future liabilities. Available in 5 Marla, 10 Marla, and 1 Kanal for buyers ready to start construction immediately.
              </p>
            </div>

            <router-link
              to="/listings?type=plot"
              class="text-xs font-bold text-[#16B4E8] hover:underline flex-shrink-0"
            >
              Browse Cash Plots in Listings &rarr;
            </router-link>
          </div>

          <!-- Moqa Ka Plot Cards (PECHS, TopCity, AGG, Top Residencia) - No Icons -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div
              v-for="(society, key) in adminStore.liveRates.moqaPlots"
              :key="key"
              class="bg-white rounded-2xl border border-gray-200 hover:border-[#16B4E8] p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-[11px] font-extrabold uppercase text-[#0F2A44] bg-[#0F2A44]/5 px-2 py-0.5 rounded border border-[#0F2A44]/10">100% Cash</span>
                  <span class="text-[10px] font-bold text-gray-500">{{ society.tag }}</span>
                </div>
                <h4 class="text-base font-extrabold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">{{ society.name }}</h4>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                  {{ society.description || 'Verified gated community with immediate demarcation and cash possession.' }}
                </p>

                <div class="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs">
                  <div class="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 rounded-lg">
                    <span class="font-bold text-gray-700">5 Marla</span>
                    <span class="font-black text-[#16B4E8]">{{ society.m5 }}</span>
                  </div>
                  <div class="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 rounded-lg">
                    <span class="font-bold text-gray-700">10 Marla</span>
                    <span class="font-black text-[#16B4E8]">{{ society.m10 }}</span>
                  </div>
                  <div class="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 rounded-lg">
                    <span class="font-bold text-gray-700">1 Kanal</span>
                    <span class="font-black text-[#16B4E8]">{{ society.k1 }}</span>
                  </div>
                </div>
              </div>

              <a
                :href="`https://wa.me/923349522157?text=${encodeURIComponent(`Hello TopLinkers, I am inquiring about ${society.name} Moqa Ka Plot rates (100% Cash)`)}`"
                target="_blank"
                class="mt-4 w-full py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-bold uppercase rounded-xl text-center transition-all shadow-xs"
              >
                Inquire {{ society.name }} Rates
              </a>
            </div>
          </div>
        </div>

        <!-- 1B: EASY INSTALLMENT PLOTS & FILES CONTAINER -->
        <div
          v-if="plotPaymentFilter === 'all' || plotPaymentFilter === 'installments'"
          class="p-6 sm:p-8 rounded-3xl bg-sky-50/40 border border-sky-200/80"
        >
          <!-- Section Banner (Typography-focused, No Icons) -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-sky-200/80">
            <div>
              <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                <span class="px-2.5 py-1 bg-[#16B4E8] text-[#0F2A44] text-[10px] font-black uppercase tracking-wider rounded-md">
                  Easy Installments &bull; Low Down Payment
                </span>
                <span class="text-xs font-bold text-sky-800 bg-sky-100/70 px-2.5 py-0.5 rounded border border-sky-200">
                  Certified Booking Files &bull; Multi-Year Plans
                </span>
              </div>
              <h3 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
                Installment Plots &amp; Booking Files (3 to 4-Year Schedules)
              </h3>
              <p class="text-xs text-gray-500 mt-1 leading-relaxed max-w-3xl">
                Flexible installment booking starting from convenient initial down payment followed by scheduled quarterly or monthly installments in Faisal Town Phase-II and Blue World City.
              </p>
            </div>

            <!-- Interactive Modal Trigger (No Icon, Crisp Typography) -->
            <button
              type="button"
              @click="openInstallmentModal('faisal-town')"
              class="inline-flex items-center justify-center px-4 py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xs flex-shrink-0"
            >
              Open Interactive Plan Schedules
            </button>
          </div>

          <!-- Installment Cards - No Icons -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(plan, key) in adminStore.liveRates.installmentPlans"
              :key="key"
              class="bg-white rounded-2xl border border-sky-100 hover:border-[#16B4E8] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[10px] font-black uppercase text-[#0F2A44] bg-sky-100/60 px-2 py-0.5 rounded border border-sky-200">Installment Plan</span>
                  <span class="text-xs font-bold text-[#16B4E8]">
                    {{ plan.duration }}
                  </span>
                </div>
                <h4 class="text-lg font-extrabold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">{{ plan.name }}</h4>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                  Flexible installment booking and easy quarterly or monthly payment options.
                </p>

                <div class="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div v-if="plan.m5" class="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span class="text-[10px] text-gray-400 uppercase font-black block">5 Marla</span>
                    <span class="font-bold text-[#0F2A44]">Down: {{ plan.m5.down }}</span>
                    <span class="text-[10px] text-gray-500 block">Total: ~{{ plan.m5.total }}</span>
                  </div>
                  <div v-if="plan.m7" class="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span class="text-[10px] text-gray-400 uppercase font-black block">7 Marla</span>
                    <span class="font-bold text-[#0F2A44]">Down: {{ plan.m7.down }}</span>
                    <span class="text-[10px] text-gray-500 block">Total: ~{{ plan.m7.total }}</span>
                  </div>
                  <div v-if="plan.m8" class="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span class="text-[10px] text-gray-400 uppercase font-black block">8 Marla</span>
                    <span class="font-bold text-[#0F2A44]">Down: {{ plan.m8.down }}</span>
                    <span class="text-[10px] text-gray-500 block">Total: ~{{ plan.m8.total }}</span>
                  </div>
                  <div v-if="plan.m10" class="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span class="text-[10px] text-gray-400 uppercase font-black block">10 Marla</span>
                    <span class="font-bold text-[#0F2A44]">Down: {{ plan.m10.down }}</span>
                    <span class="text-[10px] text-gray-500 block">Total: ~{{ plan.m10.total }}</span>
                  </div>
                  <div v-if="plan.k1" class="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <span class="text-[10px] text-gray-400 uppercase font-black block">1 Kanal</span>
                    <span class="font-bold text-[#0F2A44]">Down: {{ plan.k1.down }}</span>
                    <span class="text-[10px] text-gray-500 block">Total: ~{{ plan.k1.total }}</span>
                  </div>
                </div>
              </div>

              <div class="mt-5 pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  @click="openInstallmentModal(key === 'blueWorld' ? 'blue-world' : 'faisal-town')"
                  class="w-full sm:flex-1 py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-black uppercase tracking-wider rounded-xl text-center transition-all shadow-xs"
                >
                  View Detailed Schedule
                </button>
                <a
                  :href="`https://wa.me/923349522157?text=${encodeURIComponent(`Hello TopLinkers, I want to get the ${plan.name} Installment Plan`)}`"
                  target="_blank"
                  class="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-100 text-[#0F2A44] border border-slate-200 text-xs font-bold uppercase rounded-xl text-center transition-all"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 2. FLATS & APARTMENTS (PHA CASH & BANU HAFEEZ) -->
      <!-- ========================================== -->
      <section
        v-if="activeTab === 'all' || activeTab === 'flats'"
        id="flats"
        class="mb-16 scroll-mt-28"
      >
        <div class="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <span class="text-[10px] font-black uppercase tracking-widest text-[#16B4E8]">Division 02</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F2A44] mt-1">
              Flats &amp; Apartments — PHA (100% Cash) &amp; Banu Hafeez
            </h2>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">
              Verified apartments in Sector I-12, Sector I-16, Banu Hafeez &amp; scenic suites in Nathia Gali (Harsukh Residencies).
            </p>
          </div>
          <router-link
            to="/listings?type=apartment"
            class="text-xs font-bold text-[#16B4E8] hover:underline flex items-center gap-1 flex-shrink-0"
          >
            <span>Browse All Flats In Listings</span>
            <span>&rarr;</span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Card 1: PHA Flats (100% Cash Ready) -->
          <div class="bg-white rounded-2xl border border-gray-200/90 hover:border-[#16B4E8] shadow-sm hover:shadow-lg transition-all p-6 flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="bg-[#0F2A44] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded">
                  100% Cash &bull; Ready
                </span>
                <span class="text-xs font-bold text-gray-400">Sector I-16/3, I-12/1 &amp; Kurri Road</span>
              </div>

              <h3 class="text-lg font-extrabold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">PHA Official Apartments</h3>
              <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                Pakistan Housing Authority government-allocated flats with verified allotment files, fast CDA transfer, and immediate possession.
              </p>

              <!-- Dynamic Sub-types breakdown -->
              <div class="mt-5 space-y-2.5 text-xs">
                <div
                  v-for="(flat, key) in adminStore.liveRates.phaFlats"
                  :key="key"
                  class="bg-gray-50 p-3 rounded-xl border border-gray-100"
                >
                  <div class="flex items-center justify-between font-bold text-[#0F2A44]">
                    <span>{{ flat.name }}</span>
                    <span class="text-[#16B4E8] font-black">{{ flat.rate }}</span>
                  </div>
                  <p class="text-[11px] text-gray-500 mt-0.5">{{ flat.specs }}</p>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-100">
              <a
                href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20PHA%20Flats%20(Sector%20I-16/3,%20I-12/1,%20Kurri%20Road)%20on%20Cash"
                target="_blank"
                class="w-full py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs uppercase rounded-xl text-center transition-all flex items-center justify-center gap-1 shadow-sm"
              >
                Inquire PHA Cash Flats
              </a>
            </div>
          </div>

          <!-- Card 2: Banu Hafeez Apartments (Cash & Installments) -->
          <div class="bg-white rounded-2xl border border-gray-200/90 hover:border-[#16B4E8] shadow-sm hover:shadow-lg transition-all p-6 flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="bg-[#16B4E8] text-[#0F2A44] text-[9px] font-black uppercase px-2.5 py-0.5 rounded">
                  Cash &amp; Installments
                </span>
                <span class="text-xs font-bold text-gray-400">Marla &amp; Kanal Share</span>
              </div>

              <h3 class="text-lg font-extrabold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">Banu Hafeez Residences</h3>
              <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                Available on both 100% Cash payment and easy flexible installment schedules. Differentiated by unit size, floor heights, and land share categories.
              </p>

              <div class="mt-5 space-y-2.5 text-xs">
                <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div class="flex items-center justify-between font-bold text-[#0F2A44]">
                    <span>2-Bed Executive Suite</span>
                    <span class="text-[#16B4E8] font-black">PKR 85 - 98 Lac</span>
                  </div>
                  <p class="text-[11px] text-gray-500 mt-0.5">2 Attached Bathrooms &bull; Kitchen &bull; Available on Cash &amp; 3-Yr Plan</p>
                </div>

                <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div class="flex items-center justify-between font-bold text-[#0F2A44]">
                    <span>3-Bed Luxury Family Unit</span>
                    <span class="text-[#16B4E8] font-black">PKR 1.25 - 1.55 Cr</span>
                  </div>
                  <p class="text-[11px] text-gray-500 mt-0.5">3 Washrooms &bull; Drawing Room &bull; Balcony with open panoramic views</p>
                </div>

                <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div class="flex items-center justify-between font-bold text-[#0F2A44]">
                    <span>Installment Plan Terms</span>
                    <span class="text-[#16B4E8] font-black">25% Booking</span>
                  </div>
                  <p class="text-[11px] text-gray-500 mt-0.5">36 Monthly or 12 Quarterly installments with fast possession</p>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
              <button
                type="button"
                @click="openInstallmentModal('banu-hafeez')"
                class="flex-1 py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs uppercase rounded-xl text-center transition-all shadow-sm"
              >
                View Schedule
              </button>
              <a
                href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20Banu%20Hafeez%20Flats%20Cash%20and%20Installments"
                target="_blank"
                class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#0F2A44] font-bold text-xs uppercase rounded-xl text-center transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <!-- Card 3: Harsukh Residencies Nathia Gali -->
          <div class="bg-[#0F2A44] text-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 flex flex-col justify-between relative overflow-hidden group">
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <span class="bg-[#16B4E8] text-[#0F2A44] text-[9px] font-black uppercase px-2.5 py-0.5 rounded shadow">
                  HOT SELLING
                </span>
                <span class="text-xs font-bold text-[#16B4E8]">Kuza Gali • Nathia Gali</span>
              </div>

              <h3 class="text-lg font-extrabold text-white group-hover:text-[#16B4E8] transition-colors">Harsukh Residencies</h3>
              <p class="text-xs text-gray-300 mt-1 leading-relaxed">
                Hot selling holiday flats at the highest elevation in Nathia Gali. Designed for family vacations and high-yield tourist rental income.
              </p>

              <div class="mt-5 space-y-2.5 text-xs">
                <div class="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div class="flex items-center justify-between font-bold text-white">
                    <span>Studio Vacation Suites</span>
                    <span class="text-[#16B4E8] font-extrabold">PKR 75 Lac</span>
                  </div>
                  <p class="text-[11px] text-gray-300 mt-0.5">Kitchenette &bull; Attached Bath &bull; Pine Valley Balcony</p>
                </div>

                <div class="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div class="flex items-center justify-between font-bold text-white">
                    <span>1-Bed &amp; 2-Bed Family Flats</span>
                    <span class="text-[#16B4E8] font-extrabold">PKR 1.25 - 1.95 Cr</span>
                  </div>
                  <p class="text-[11px] text-gray-300 mt-0.5">Central heating &bull; High tourist occupancy in summer &amp; snow season</p>
                </div>

                <div class="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div class="flex items-center justify-between font-bold text-white">
                    <span>Payment Terms</span>
                    <span class="text-[#16B4E8] font-extrabold">15% Booking</span>
                  </div>
                  <p class="text-[11px] text-gray-300 mt-0.5">36 easy monthly installments with guaranteed rental management</p>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 relative z-10">
              <button
                type="button"
                @click="openInstallmentModal('hrsukh')"
                class="flex-1 py-2.5 bg-[#16B4E8] hover:bg-[#119ecf] text-[#0F2A44] font-black text-xs uppercase rounded-xl text-center transition-all shadow"
              >
                View 3-Year Plan
              </button>
              <router-link
                to="/hr-sukh"
                class="px-4 py-2.5 bg-white/10 hover:bg-white hover:text-[#0F2A44] text-white font-bold text-xs uppercase rounded-xl transition-colors"
              >
                Details &rarr;
              </router-link>
            </div>
          </div>
        </div>

        <!-- 2b. Major Islamabad Projects & Categories Specification Matrix -->
        <div class="mt-10 bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden">
          <div class="p-5 sm:p-7 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-white to-blue-50/30">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#16B4E8]/10 text-[#0F2A44]">
                <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8] animate-pulse"></span>
                Official Government Allocations &bull; CDA Transfer
              </div>
              <h3 class="text-xl sm:text-2xl font-black text-[#0F2A44] mt-1.5">
                Major Islamabad Projects &amp; Categories
              </h3>
              <p class="text-xs text-gray-500 mt-1 max-w-2xl">
                Comprehensive layout specifications, apartment types, and active market status for official Pakistan Housing Authority (PHA) apartments in Islamabad.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <a
                href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20want%20to%20verify%20a%20PHA%20Flat%20file%20and%20CDA%20title"
                target="_blank"
                class="px-4 py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Verify PHA Title / File</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          <!-- Desktop Table (Matching User Screenshot Layout) -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50/80 text-[11px] font-black uppercase tracking-wider text-gray-600">
                  <th class="py-4 px-6 w-1/4">Project Location</th>
                  <th class="py-4 px-6 w-1/4">Apartment Categories</th>
                  <th class="py-4 px-6 w-1/2">Key Specifications &amp; Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-xs">
                <!-- Row 1: Sector I-16/3 -->
                <tr class="hover:bg-slate-50/70 transition-colors group">
                  <td class="py-5 px-6 align-top">
                    <div class="font-bold text-[#0F2A44] text-sm group-hover:text-[#16B4E8] transition-colors flex items-center gap-1.5">
                      <span>Sector I-16/3</span>
                    </div>
                    <span class="inline-block mt-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      G+6 Blocks &bull; Ready
                    </span>
                  </td>
                  <td class="py-5 px-6 align-top">
                    <div class="font-extrabold text-[#0F2A44] text-xs">
                      Type E (2-Bed) &amp; Type B (3-Bed)
                    </div>
                    <div class="text-[11px] text-gray-500 mt-1">
                      Ready Possession &bull; Active Resale
                    </div>
                  </td>
                  <td class="py-5 px-6 align-top">
                    <p class="text-gray-700 text-xs leading-relaxed font-normal">
                      <strong class="font-bold text-[#0F2A44]">Type E</strong> is ~912 sq. ft. (2 beds, 2 baths). <strong class="font-bold text-[#0F2A44]">Type B</strong> is ~1,496 sq. ft. (3 beds, servant quarter). G+6 blocks with completed/active resale market.
                    </p>
                    <div class="mt-3 flex items-center gap-3">
                      <router-link
                        to="/listings?search=I-16"
                        class="text-[11px] font-bold text-[#16B4E8] hover:underline flex items-center gap-1"
                      >
                        View Sector I-16 Listings &rarr;
                      </router-link>
                      <span class="text-gray-300">&bull;</span>
                      <a
                        href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20Sector%20I-16/3%20PHA%20Flats%20(Type%20E%20or%20Type%20B)"
                        target="_blank"
                        class="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Inquire on WhatsApp
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Row 2: Sector I-12/1 -->
                <tr class="hover:bg-slate-50/70 transition-colors group">
                  <td class="py-5 px-6 align-top">
                    <div class="font-bold text-[#0F2A44] text-sm group-hover:text-[#16B4E8] transition-colors flex items-center gap-1.5">
                      <span>Sector I-12/1</span>
                    </div>
                    <span class="inline-block mt-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      3,200 Units Project
                    </span>
                  </td>
                  <td class="py-5 px-6 align-top">
                    <div class="font-extrabold text-[#0F2A44] text-xs">
                      Type D &amp; Type E
                    </div>
                    <div class="text-[11px] text-gray-500 mt-1">
                      Nearing Completion &bull; Re-balloted
                    </div>
                  </td>
                  <td class="py-5 px-6 align-top">
                    <p class="text-gray-700 text-xs leading-relaxed font-normal">
                      Roughly 700–900+ sq. ft. layouts (2-bed/2-bath and slightly larger configurations). Comprises 3,200 units nearing completion, with limited re-balloted units.
                    </p>
                    <div class="mt-3 flex items-center gap-3">
                      <router-link
                        to="/listings?search=I-12"
                        class="text-[11px] font-bold text-[#16B4E8] hover:underline flex items-center gap-1"
                      >
                        View Sector I-12 Listings &rarr;
                      </router-link>
                      <span class="text-gray-300">&bull;</span>
                      <a
                        href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20Sector%20I-12/1%20PHA%20Flats%20(Type%20D%20or%20Type%20E)"
                        target="_blank"
                        class="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Inquire on WhatsApp
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Row 3: G-11 / Kurri Road -->
                <tr class="hover:bg-slate-50/70 transition-colors group">
                  <td class="py-5 px-6 align-top">
                    <div class="font-bold text-[#0F2A44] text-sm group-hover:text-[#16B4E8] transition-colors flex items-center gap-1.5">
                      <span>G-11 / Kurri Road</span>
                    </div>
                    <span class="inline-block mt-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                      Officers Residencia
                    </span>
                  </td>
                  <td class="py-5 px-6 align-top">
                    <div class="font-extrabold text-[#0F2A44] text-xs">
                      Executive / Officers Residencia
                    </div>
                    <div class="text-[11px] text-gray-500 mt-1">
                      BPS 20–22 &bull; Select Public Quota
                    </div>
                  </td>
                  <td class="py-5 px-6 align-top">
                    <p class="text-gray-700 text-xs leading-relaxed font-normal">
                      Larger multi-bedroom apartments. Primarily targeted at senior officers (BPS 20–22) and select general public quotas.
                    </p>
                    <div class="mt-3 flex items-center gap-3">
                      <router-link
                        to="/listings?type=apartment"
                        class="text-[11px] font-bold text-[#16B4E8] hover:underline flex items-center gap-1"
                      >
                        View Executive Apartments &rarr;
                      </router-link>
                      <span class="text-gray-300">&bull;</span>
                      <a
                        href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20G-11%20/%20Kurri%20Road%20Executive%20Officers%20Residencia"
                        target="_blank"
                        class="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        Inquire on WhatsApp
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards View -->
          <div class="md:hidden divide-y divide-gray-100 p-4 space-y-4">
            <!-- Row 1 Mobile -->
            <div class="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-sm text-[#0F2A44]">Sector I-16/3</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100/70 text-emerald-800">G+6 Resale</span>
              </div>
              <div class="text-xs font-bold text-[#16B4E8]">
                Type E (2-Bed) &amp; Type B (3-Bed)
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                <strong class="font-bold text-[#0F2A44]">Type E:</strong> ~912 sq. ft. (2 beds, 2 baths).<br />
                <strong class="font-bold text-[#0F2A44]">Type B:</strong> ~1,496 sq. ft. (3 beds, servant quarter).<br />
                G+6 blocks with completed/active resale market.
              </p>
              <div class="pt-2 flex items-center justify-between text-xs border-t border-gray-200/50">
                <router-link to="/listings?search=I-16" class="font-bold text-[#16B4E8]">View I-16 &rarr;</router-link>
                <a href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20Sector%20I-16/3%20PHA%20Flats" target="_blank" class="font-bold text-emerald-600">WhatsApp &rarr;</a>
              </div>
            </div>

            <!-- Row 2 Mobile -->
            <div class="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-sm text-[#0F2A44]">Sector I-12/1</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100/70 text-blue-800">3,200 Units</span>
              </div>
              <div class="text-xs font-bold text-[#16B4E8]">
                Type D &amp; Type E
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Roughly 700–900+ sq. ft. layouts (2-bed/2-bath and slightly larger configurations). Comprises 3,200 units nearing completion, with limited re-balloted units.
              </p>
              <div class="pt-2 flex items-center justify-between text-xs border-t border-gray-200/50">
                <router-link to="/listings?search=I-12" class="font-bold text-[#16B4E8]">View I-12 &rarr;</router-link>
                <a href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20Sector%20I-12/1%20PHA%20Flats" target="_blank" class="font-bold text-emerald-600">WhatsApp &rarr;</a>
              </div>
            </div>

            <!-- Row 3 Mobile -->
            <div class="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-sm text-[#0F2A44]">G-11 / Kurri Road</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100/70 text-amber-800">Officers Residencia</span>
              </div>
              <div class="text-xs font-bold text-[#16B4E8]">
                Executive / Officers Residencia
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Larger multi-bedroom apartments. Primarily targeted at senior officers (BPS 20–22) and select general public quotas.
              </p>
              <div class="pt-2 flex items-center justify-between text-xs border-t border-gray-200/50">
                <router-link to="/listings?type=apartment" class="font-bold text-[#16B4E8]">View Listings &rarr;</router-link>
                <a href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20G-11%20/%20Kurri%20Road%20Officers%20Residencia" target="_blank" class="font-bold text-emerald-600">WhatsApp &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 3. CONSTRUCTION SERVICE & CATEGORIES       -->
      <!-- ========================================== -->
      <section
        v-if="activeTab === 'all' || activeTab === 'construction'"
        id="construction"
        class="mb-16 scroll-mt-28"
      >
        <div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <span class="text-[10px] font-black uppercase tracking-widest text-[#16B4E8]">Division 03</span>
            <h2 class="text-2xl font-extrabold text-[#0F2A44] mt-1">Turnkey Architectural &amp; Civil Construction</h2>
            <p class="text-xs text-gray-500 mt-1">Complete design, grey structure, luxury finishing, and commercial plazas.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Card 1: Turnkey Luxury Villa -->
          <div class="bg-white rounded-2xl border border-gray-200/90 hover:border-[#16B4E8] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div>
              <div class="h-44 w-full relative overflow-hidden bg-gray-900">
                <img
                  src="/images/hero-construction.webp"
                  alt="Turnkey Luxury Construction"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="352"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span class="absolute top-3 left-3 bg-[#0F2A44]/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                  A+ Turnkey
                </span>
              </div>

              <div class="p-5">
                <h3 class="text-base font-bold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">
                  Turnkey Villa Construction
                </h3>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                  End-to-end luxury house execution with imported tiles, sanitary fittings, and woodwork.
                </p>

                <ul class="text-xs text-gray-600 mt-4 space-y-2 border-t border-gray-100 pt-3">
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>10 Marla &amp; 1 Kanal Designer Villas</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Mughal/Amreli 60-Grade Steel</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>1-Year Complete Warranty</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="p-5 pt-0">
              <a
                href="https://wa.me/923324004884?text=Hello%20TopLinkers,%20I%20want%20to%20inquire%20about%20Turnkey%20Villa%20Construction"
                target="_blank"
                class="w-full py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs uppercase rounded-xl text-center transition-all flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Get Turnkey Quote</span>
              </a>
            </div>
          </div>

          <!-- Card 2: Grey Structure -->
          <div class="bg-white rounded-2xl border border-gray-200/90 hover:border-[#16B4E8] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div>
              <div class="h-44 w-full relative overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
                  alt="Grey Structure Construction"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="352"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span class="absolute top-3 left-3 bg-[#0F2A44]/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                  Grey Structure
                </span>
              </div>

              <div class="p-5">
                <h3 class="text-base font-bold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">
                  Grey Structure Only
                </h3>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                  Solid foundation, brickwork, slab casting, and plumbing conduit layout.
                </p>

                <ul class="text-xs text-gray-600 mt-4 space-y-2 border-t border-gray-100 pt-3">
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Bestway/Fauji OPC Cement</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>PPRC &amp; PVC Approved Piping</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Stage-by-Stage Milestone Payments</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="p-5 pt-0">
              <a
                href="https://wa.me/923324004884?text=Hello%20TopLinkers,%20I%20want%20to%20inquire%20about%20Grey%20Structure%20Construction"
                target="_blank"
                class="w-full py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs uppercase rounded-xl text-center transition-all flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Inquire Grey Structure</span>
              </a>
            </div>
          </div>

          <!-- Card 3: Commercial Plaza -->
          <div class="bg-white rounded-2xl border border-gray-200/90 hover:border-[#16B4E8] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div>
              <div class="h-44 w-full relative overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80"
                  alt="Commercial Plaza Construction"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="352"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span class="absolute top-3 left-3 bg-[#0F2A44]/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                  Plazas
                </span>
              </div>

              <div class="p-5">
                <h3 class="text-base font-bold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">
                  Commercial Plaza Building
                </h3>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                  Multi-storey shopping malls, corporate towers, and office buildings.
                </p>

                <ul class="text-xs text-gray-600 mt-4 space-y-2 border-t border-gray-100 pt-3">
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Basement + Ground + 5 Floors</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Commercial Passenger Elevators</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>CDA / RDA Safety By-laws</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="p-5 pt-0">
              <a
                href="https://wa.me/923324004884?text=Hello%20TopLinkers,%20I%20want%20to%20inquire%20about%20Commercial%20Plaza%20Construction"
                target="_blank"
                class="w-full py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs uppercase rounded-xl text-center transition-all flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Consult Commercial</span>
              </a>
            </div>
          </div>

          <!-- Card 4: 3D Design -->
          <div class="bg-white rounded-2xl border border-gray-200/90 hover:border-[#16B4E8] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div>
              <div class="h-44 w-full relative overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80"
                  alt="Architectural & 3D Design"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="352"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span class="absolute top-3 left-3 bg-[#0F2A44]/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                  3D Architecture
                </span>
              </div>

              <div class="p-5">
                <h3 class="text-base font-bold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">
                  Architectural &amp; 3D Design
                </h3>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                  Contemporary front elevations, floor planning, and municipal vetting.
                </p>

                <ul class="text-xs text-gray-600 mt-4 space-y-2 border-t border-gray-100 pt-3">
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>3D Photorealistic Exterior</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>MEP &amp; Structural Soil Testing</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Complete Map Approvals</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="p-5 pt-0">
              <a
                href="https://wa.me/923324004884?text=Hello%20TopLinkers,%20I%20want%20to%20inquire%20about%20Architectural%20and%203D%20Design"
                target="_blank"
                class="w-full py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs uppercase rounded-xl text-center transition-all flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Request 3D Plans</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 4. SOLAR SERVICE & CATEGORIES              -->
      <!-- ========================================== -->
      <section
        v-if="activeTab === 'all' || activeTab === 'solar'"
        id="solar"
        class="mb-16 scroll-mt-28"
      >
        <!-- Unique Solar Executive Spotlight Banner ("Earn From The Sun") -->
        <div class="mb-10 bg-gradient-to-br from-[#071320] via-[#0F2A44] to-[#0B2239] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-400/20 relative overflow-hidden">
          <!-- Warm Solar + Cyan Ambient Horizon Glows -->
          <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-[#16B4E8]/15 blur-3xl pointer-events-none"></div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <!-- Left Visual Card -->
            <div class="lg:col-span-5 relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 border border-white/15 shadow-xl group">
              <img
                src="/images/hero-solar.webp"
                alt="Earn From The Sun — TopLinkers Tier-1 Solar Systems"
                loading="lazy"
                decoding="async"
                width="900"
                height="500"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#071320]/90 via-transparent to-transparent"></div>
              <div class="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/95 text-[#0F2A44] text-[10px] font-black uppercase tracking-wider shadow">
                <SunIcon class="w-3.5 h-3.5" />
                <span>Tier-1 Green Energy</span>
              </div>
              <div class="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs">
                <span class="font-bold text-white/95">Bi-Directional IESCO Net Metering</span>
                <span class="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-[10px]">
                  Zero Bills
                </span>
              </div>
            </div>

            <!-- Right Copy, Catchy Headline & ROI Metrics -->
            <div class="lg:col-span-7 space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-widest">
                <BoltIcon class="w-3.5 h-3.5" />
                <span>Earn From The Sun &bull; Energy Independence</span>
              </div>

              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white">
                <span class="bg-gradient-to-r from-amber-300 via-yellow-200 to-[#16B4E8] bg-clip-text text-transparent">
                  Earn From The Sun
                </span>
                — Turn Your Rooftop Into a Tax-Free Income Asset
              </h2>

              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Stop paying inflated WAPDA/IESCO peak tariffs. Generate clean Tier-1 solar electricity by day, offset your utility bill to <strong class="text-white">PKR 0</strong>, and automatically sell surplus units back to the national grid.
              </p>

              <!-- 3 Executive Solar Value Metrics -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    <ArrowTrendingUpIcon class="w-3.5 h-3.5" />
                    <span>Grid Export Income</span>
                  </div>
                  <div class="text-sm font-black text-white mt-1">Sell Extra Units</div>
                  <p class="text-[11px] text-slate-400 mt-0.5">Green Meter buyback credits</p>
                </div>

                <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#16B4E8]">
                    <BoltIcon class="w-3.5 h-3.5" />
                    <span>Monthly Savings</span>
                  </div>
                  <div class="text-sm font-black text-white mt-1">Up to PKR 550k/mo</div>
                  <p class="text-[11px] text-slate-400 mt-0.5">10kW to 50kW+ capacities</p>
                </div>

                <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    <SunIcon class="w-3.5 h-3.5" />
                    <span>Capital Payback</span>
                  </div>
                  <div class="text-sm font-black text-white mt-1">~24–36 Months</div>
                  <p class="text-[11px] text-slate-400 mt-0.5">25-year panel performance</p>
                </div>
              </div>

              <!-- CTA Row -->
              <div class="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  @click="openSolarModal('10kw')"
                  class="px-5 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-[#0F2A44] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-400/20 inline-flex items-center gap-2"
                >
                  <ClipboardDocumentCheckIcon class="w-4 h-4" />
                  <span>Calculate Roof ROI &amp; Quote</span>
                </button>

                <a
                  href="https://wa.me/923324004884?text=Hello%20TopLinkers%20Solar%20Desk,%20I%20want%20to%20earn%20from%20solar%20and%20reduce%20my%20bill%20to%20zero%20with%20IESCO%20Net%20Metering."
                  target="_blank"
                  class="px-5 py-3 bg-white/10 hover:bg-white hover:text-[#0F2A44] text-white border border-white/15 text-xs font-bold uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2"
                >
                  <span>WhatsApp Solar Engineer</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <span class="text-[10px] font-black uppercase tracking-widest text-[#16B4E8]">Division 04</span>
            <h2 class="text-2xl font-extrabold text-[#0F2A44] mt-1">Solar Systems &amp; IESCO Net Metering</h2>
            <p class="text-xs text-gray-500 mt-1">Tier-1 On-Grid &amp; Hybrid systems from 10kW to 50kW with Green Metering.</p>
          </div>

          <!-- Quick Action: Fill Query Form Modal -->
          <button
            type="button"
            @click="openSolarModal('10kw')"
            class="inline-flex items-center gap-2 px-4 py-2 bg-[#16B4E8] hover:bg-[#119ecf] text-[#0F2A44] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Fill Solar Inquiry Form</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Dynamic Solar Packages (Synced from Admin Live Rates) -->
          <div
            v-for="(pkg, key) in adminStore.liveRates.solarPackages"
            :key="key"
            class="bg-white rounded-2xl border border-gray-200/90 hover:border-[#16B4E8] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            <div>
              <div class="h-44 w-full relative overflow-hidden bg-gray-900">
                <img
                  :src="key === 'kw20' ? 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80' : key === 'kw50' ? 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=600&q=80' : 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80'"
                  :alt="pkg.name"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="352"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span class="absolute top-3 left-3 bg-[#0F2A44]/90 backdrop-blur-md text-[#16B4E8] text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-[#16B4E8]/20">
                  {{ pkg.quote || 'Tier-1 Solar' }}
                </span>
              </div>

              <div class="p-5">
                <h3 class="text-base font-bold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">
                  {{ pkg.name }}
                </h3>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                  {{ key === 'kw10' ? 'Ideal for 1 Kanal & 10 Marla houses (Runs 2 to 3 Inverter ACs + Full Home Load).' : key === 'kw20' ? 'Heavy-duty power for 2 Kanal mansions, dual-unit houses & farmhouses.' : key === 'kw50' ? 'Tailored for corporate plazas, hospitals, schools & factories.' : 'Turnkey Tier-1 hybrid & on-grid solar solution with IESCO Green Net Metering.' }}
                </p>

                <div class="mt-3 py-1.5 px-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between text-xs">
                  <span class="text-gray-500 font-bold">Estimated Savings:</span>
                  <span class="text-[#16B4E8] font-black">{{ pkg.savings }}</span>
                </div>

                <ul class="text-xs text-gray-600 mt-3 space-y-1.5 border-t border-gray-100 pt-3">
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Tier-1 Longi/JA Bi-Facial Panels</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Three-Phase Hybrid / On-Grid Inverter</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>IESCO Bi-Directional Net Meter</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="p-5 pt-0 space-y-2">
              <a
                :href="`https://wa.me/923324004884?text=${encodeURIComponent(`Hello TopLinkers Solar Desk, I am inquiring about ${pkg.name} (${pkg.quote}) with IESCO Net Metering`)}`"
                target="_blank"
                class="w-full py-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase rounded-xl text-center transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>Direct Msg via WhatsApp</span>
              </a>

              <button
                type="button"
                @click="openSolarModal(key === 'kw20' ? '20kw' : key === 'kw50' ? '50kw' : '10kw')"
                class="w-full py-2 bg-gray-50 hover:bg-[#0F2A44] hover:text-white text-[#0F2A44] border border-gray-200 font-bold text-xs uppercase rounded-xl text-center transition-all"
              >
                Set Query / Fill Form
              </button>
            </div>
          </div>

          <!-- Card 4: IESCO Net Metering -->
          <div class="bg-white rounded-2xl border border-gray-200/90 hover:border-[#16B4E8] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            <div>
              <div class="h-44 w-full relative overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80"
                  alt="IESCO Net Metering"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="352"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span class="absolute top-3 left-3 bg-[#0F2A44]/90 backdrop-blur-md text-[#16B4E8] text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-[#16B4E8]/20">
                  Green Meter Desk
                </span>
              </div>

              <div class="p-5">
                <h3 class="text-base font-bold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">
                  IESCO Net Metering
                </h3>
                <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                  Sell excess units back to the national grid and eliminate electricity bills.
                </p>

                <div class="mt-3 py-1.5 px-2.5 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between text-xs">
                  <span class="text-gray-500 font-bold">Turnaround Time:</span>
                  <span class="text-[#16B4E8] font-black">2 to 3 Weeks</span>
                </div>

                <ul class="text-xs text-gray-600 mt-3 space-y-1.5 border-t border-gray-100 pt-3">
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Complete IESCO File Processing</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Bi-Directional Green Meter</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
                    <span>Zero Grid Unit Reversal Guarantee</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="p-5 pt-0 space-y-2">
              <a
                href="https://wa.me/923324004884?text=Hello%20TopLinkers%20Solar%20Desk,%20I%20want%20to%20apply%20for%20IESCO%20Green%20Meter%20Net%20Metering"
                target="_blank"
                class="w-full py-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase rounded-xl text-center transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>WhatsApp Net Metering Desk</span>
              </a>

              <button
                type="button"
                @click="openSolarModal('netmetering')"
                class="w-full py-2 bg-gray-50 hover:bg-[#0F2A44] hover:text-white text-[#0F2A44] border border-gray-200 font-bold text-xs uppercase rounded-xl text-center transition-all"
              >
                Apply Via Online Form
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL 1: INTERACTIVE INSTALLMENT SCHEDULE PLANS VIEWER   -->
    <!-- ======================================================== -->
    <Teleport to="body">
      <div
        v-if="isInstallmentModalOpen"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
        @click.self="isInstallmentModalOpen = false"
      >
        <div class="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
          <!-- Modal Header -->
          <div class="bg-[#0F2A44] text-white p-5 sm:p-6 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#16B4E8]/20 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-black tracking-tight">Verified Installment Schedules</h3>
                <p class="text-xs text-gray-300">Official monthly &amp; quarterly schedules with transparent booking rates.</p>
              </div>
            </div>

            <button
              type="button"
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg"
              @click="isInstallmentModalOpen = false"
            >
              &times;
            </button>
          </div>

          <!-- Project Selector Tabs -->
          <div class="p-4 sm:p-6 pb-2 border-b border-gray-100 bg-gray-50/70">
            <span class="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">Select Project / Society:</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                v-for="p in installmentProjects"
                :key="p.id"
                type="button"
                :class="[
                  'py-2 px-3 rounded-xl text-xs font-black transition-all text-center border',
                  selectedInstallmentProject === p.id
                    ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#16B4E8]'
                ]"
                @click="setInstallmentProject(p.id)"
              >
                {{ p.name }}
              </button>
            </div>
          </div>

          <!-- Unit / Plot Size Pills -->
          <div class="p-4 sm:p-6 pb-2">
            <span class="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">Choose Category / Marla Size:</span>
            <div class="flex items-center gap-2 flex-wrap">
              <button
                v-for="size in currentInstallmentProjectData.sizes"
                :key="size.label"
                type="button"
                :class="[
                  'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border',
                  selectedInstallmentSize === size.label
                    ? 'bg-[#16B4E8] text-[#0F2A44] border-[#16B4E8] font-black'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#16B4E8]'
                ]"
                @click="selectedInstallmentSize = size.label"
              >
                {{ size.label }}
              </button>
            </div>
          </div>

          <!-- Schedule Details Card & Table -->
          <div class="p-4 sm:p-6 pt-2">
            <div class="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-gray-200/80 mb-5">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
                <div>
                  <span class="text-[10px] font-black uppercase text-[#16B4E8]">Plan Breakdown</span>
                  <h4 class="text-base font-black text-[#0F2A44]">
                    {{ currentInstallmentProjectData.name }} — {{ selectedInstallmentSizeData.label }}
                  </h4>
                  <span class="text-xs text-gray-500">{{ currentInstallmentProjectData.duration }}</span>
                </div>

                <div class="sm:text-right">
                  <span class="text-[10px] font-bold text-gray-400 uppercase block">Total Plot / Unit Cost</span>
                  <span class="text-lg font-black text-[#0F2A44]">{{ selectedInstallmentSizeData.totalPrice }}</span>
                </div>
              </div>

              <!-- Payment Table Breakdown -->
              <div class="mt-4 space-y-2.5 text-xs">
                <div class="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span class="font-bold text-gray-600">Booking / Down Payment:</span>
                  <span class="font-black text-[#16B4E8]">{{ selectedInstallmentSizeData.downPayment }}</span>
                </div>
                <div class="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span class="font-bold text-gray-600">Installment Schedule:</span>
                  <span class="font-bold text-[#0F2A44]">{{ selectedInstallmentSizeData.installmentRate }}</span>
                </div>
                <div v-if="selectedInstallmentSizeData.halfYearly" class="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span class="font-bold text-gray-600">Semi-Annual / Balloon Payment:</span>
                  <span class="font-bold text-[#0F2A44]">{{ selectedInstallmentSizeData.halfYearly }}</span>
                </div>
                <div class="flex items-center justify-between py-1.5">
                  <span class="font-bold text-gray-600">Balloting / Possession Payment:</span>
                  <span class="font-bold text-[#0F2A44]">{{ selectedInstallmentSizeData.possession }}</span>
                </div>
              </div>
            </div>

            <!-- Modal Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <a
                :href="generateInstallmentWhatsAppUrl()"
                target="_blank"
                class="w-full sm:flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black uppercase tracking-wider rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>Send This Schedule on WhatsApp</span>
              </a>

              <a
                href="tel:03349522157"
                class="w-full sm:w-auto px-5 py-3 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-black uppercase tracking-wider rounded-xl text-center transition-all flex items-center justify-center gap-1.5"
              >
                <svg class="w-4 h-4 text-[#16B4E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>Call Consultant</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ======================================================== -->
    <!-- MODAL 2: SOLAR INQUIRY & DIRECT WHATSAPP SYSTEM          -->
    <!-- ======================================================== -->
    <Teleport to="body">
      <div
        v-if="isSolarModalOpen"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
        @click.self="isSolarModalOpen = false"
      >
        <div class="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
          <!-- Modal Header -->
          <div class="bg-[#0F2A44] text-white p-5 sm:p-6 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#16B4E8]/20 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-black tracking-tight">Solar Net Metering Inquiry Desk</h3>
                <p class="text-xs text-gray-300">Fast-track turnkey quotes with IESCO Green Meter processing.</p>
              </div>
            </div>

            <button
              type="button"
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg"
              @click="isSolarModalOpen = false"
            >
              &times;
            </button>
          </div>

          <!-- Form Area -->
          <div class="p-5 sm:p-6 space-y-4">
            <!-- Success Notification -->
            <div
              v-if="solarFormSubmitted"
              class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs space-y-2"
            >
              <div class="flex items-center gap-2 font-bold text-emerald-900">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                <span>Inquiry Registered Successfully!</span>
              </div>
              <p>TopLinkers Solar Engineering Desk will contact you within 15 minutes with complete quotation.</p>
            </div>

            <!-- System Size Selector Pills -->
            <div>
              <label class="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-2">
                Select Desired Solar System:
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  v-for="s in [
                    { id: '10kw', label: '10kW Home' },
                    { id: '20kw', label: '20kW Villa' },
                    { id: '50kw', label: '50kW Com' },
                    { id: 'netmetering', label: 'Green Meter' }
                  ]"
                  :key="s.id"
                  type="button"
                  :class="[
                    'py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center border',
                    solarForm.systemSize === s.id
                      ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#16B4E8]'
                  ]"
                  @click="solarForm.systemSize = s.id"
                >
                  {{ s.label }}
                </button>
              </div>
            </div>

            <!-- Savings Snapshot Banner -->
            <div class="p-3 bg-slate-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
              <span class="text-gray-500 font-bold">Approx. Monthly Bill Relief:</span>
              <span class="text-[#16B4E8] font-black text-sm">
                {{ solarForm.systemSize === '10kw' ? 'Approx. PKR 70,000–90,000 / mo' : solarForm.systemSize === '20kw' ? 'Approx. PKR 160,000–200,000 / mo' : solarForm.systemSize === '50kw' ? 'Approx. PKR 400,000–550,000 / mo' : 'Approx. Zero Grid Bills' }}
              </span>
            </div>

            <!-- User Inputs -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-1">Your Name *</label>
                <input
                  v-model="solarForm.name"
                  type="text"
                  placeholder="e.g. Tariq Mehmood"
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8]"
                />
              </div>

              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-1">WhatsApp / Phone *</label>
                <input
                  v-model="solarForm.phone"
                  type="tel"
                  placeholder="e.g. 0334-9522157"
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8]"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-1">City / Sector</label>
                <input
                  v-model="solarForm.city"
                  type="text"
                  placeholder="e.g. G-11, Islamabad"
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8]"
                />
              </div>

              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-1">Current Monthly Bill (PKR)</label>
                <input
                  v-model="solarForm.monthlyBill"
                  type="text"
                  placeholder="e.g. PKR 85,000"
                  class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8]"
                />
              </div>
            </div>

            <!-- Notes / Description Field -->
            <div>
              <label class="block text-[11px] font-bold text-gray-600 mb-1">Description / Project Notes (Optional)</label>
              <textarea
                v-model="solarForm.notes"
                rows="2"
                placeholder="e.g. Roof area available, preferred panel brand, net metering requirement, or site inspection time..."
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8]"
              ></textarea>
            </div>

            <!-- Dual Submission Buttons: Direct WhatsApp vs Instant Form -->
            <div class="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <!-- Direct WhatsApp Button -->
              <a
                :href="generateSolarWhatsAppUrl()"
                target="_blank"
                class="w-full sm:flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black uppercase tracking-wider rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>Direct Msg via WhatsApp</span>
              </a>

              <!-- Submit Form Button -->
              <button
                type="button"
                @click="submitSolarForm"
                class="w-full sm:w-auto px-6 py-3 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-xs"
              >
                Submit Inquiry Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { scrollTo } from '../services/lenis'
import {
  Squares2X2Icon,
  MapIcon,
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  SunIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../stores/admin'

const route = useRoute()
const adminStore = useAdminStore()
const activeTab = ref('all')
const plotPaymentFilter = ref('all') // 'all' | 'cash' | 'installments'

// ==========================================
// INSTALLMENT MODAL & SCHEDULE DATA
// ==========================================
const isInstallmentModalOpen = ref(false)
const selectedInstallmentProject = ref('faisal-town')
const selectedInstallmentSize = ref('5.56 Marla')

const installmentProjects = [
  {
    id: 'faisal-town',
    name: 'Faisal Town Phase 2',
    duration: '4.5-Year (18 Quarterly Installments Plan)',
    sizes: [
      {
        label: '5.56 Marla',
        totalPrice: 'PKR 3,450,000',
        downPayment: 'PKR 595,000 (Booking)',
        installmentRate: 'PKR 130,000 (18 Quarterly)',
        halfYearly: null,
        possession: 'PKR 515,000'
      },
      {
        label: '8 Marla',
        totalPrice: 'PKR 4,650,000',
        downPayment: 'PKR 825,000 (Booking)',
        installmentRate: 'PKR 175,000 (18 Quarterly)',
        halfYearly: null,
        possession: 'PKR 675,000'
      },
      {
        label: '10 Marla',
        totalPrice: 'PKR 5,550,000',
        downPayment: 'PKR 995,000 (Booking)',
        installmentRate: 'PKR 215,000 (18 Quarterly)',
        halfYearly: null,
        possession: 'PKR 685,000'
      },
      {
        label: '1 Kanal (20 Marla)',
        totalPrice: 'PKR 9,850,000',
        downPayment: 'PKR 1,455,000 (Booking)',
        installmentRate: 'PKR 395,000 (18 Quarterly)',
        halfYearly: null,
        possession: 'PKR 1,285,000'
      }
    ]
  },
  {
    id: 'blue-world',
    name: 'Blue World City',
    duration: '3 & 4-Year (Monthly & Semi-Annual Plan)',
    sizes: [
      {
        label: '5 Marla General',
        totalPrice: 'PKR 1,490,000',
        downPayment: 'PKR 149,000 (10% Booking)',
        installmentRate: 'PKR 14,900 / month (40 Months)',
        halfYearly: 'PKR 74,500 (8 Half-Yearly)',
        possession: 'PKR 149,000'
      },
      {
        label: '7 Marla Overseas',
        totalPrice: 'PKR 2,450,000',
        downPayment: 'PKR 245,000 (10% Booking)',
        installmentRate: 'PKR 24,500 / month (40 Months)',
        halfYearly: 'PKR 122,500 (8 Half-Yearly)',
        possession: 'PKR 245,000'
      },
      {
        label: '10 Marla Executive',
        totalPrice: 'PKR 3,250,000',
        downPayment: 'PKR 325,000 (10% Booking)',
        installmentRate: 'PKR 32,500 / month (40 Months)',
        halfYearly: 'PKR 162,500 (8 Half-Yearly)',
        possession: 'PKR 325,000'
      },
      {
        label: '1 Kanal Waterfront',
        totalPrice: 'PKR 5,800,000',
        downPayment: 'PKR 580,000 (10% Booking)',
        installmentRate: 'PKR 58,000 / month (40 Months)',
        halfYearly: 'PKR 290,000 (8 Half-Yearly)',
        possession: 'PKR 580,000'
      }
    ]
  },
  {
    id: 'banu-hafeez',
    name: 'Banu Hafeez Flats',
    duration: '3-Year Flexible Apartment Installment Plan',
    sizes: [
      {
        label: '2-Bed (1,100 Sq Ft)',
        totalPrice: 'PKR 8,500,000',
        downPayment: 'PKR 2,125,000 (25% Booking)',
        installmentRate: 'PKR 125,000 / month (36 Months)',
        halfYearly: 'PKR 150,000 (6 Semi-Annual)',
        possession: 'PKR 975,000'
      },
      {
        label: '3-Bed (1,500 Sq Ft)',
        totalPrice: 'PKR 12,500,000',
        downPayment: 'PKR 3,125,000 (25% Booking)',
        installmentRate: 'PKR 185,000 / month (36 Months)',
        halfYearly: 'PKR 220,000 (6 Semi-Annual)',
        possession: 'PKR 1,395,000'
      }
    ]
  },
  {
    id: 'hrsukh',
    name: 'Harsukh Residencies (Nathia Gali)',
    duration: '3-Year Luxury Hillside Vacation Suites Plan',
    sizes: [
      {
        label: 'Studio Suite (450 Sq Ft)',
        totalPrice: 'PKR 7,500,000',
        downPayment: 'PKR 1,125,000 (15% Booking)',
        installmentRate: 'PKR 125,000 / month (36 Months)',
        halfYearly: 'PKR 150,000 (6 Balloon Payments)',
        possession: 'PKR 975,000'
      },
      {
        label: '1-Bed Pine View (650 Sq Ft)',
        totalPrice: 'PKR 8,500,000',
        downPayment: 'PKR 1,275,000 (15% Booking)',
        installmentRate: 'PKR 145,000 / month (36 Months)',
        halfYearly: 'PKR 180,000 (6 Balloon Payments)',
        possession: 'PKR 1,005,000'
      },
      {
        label: '2-Bed Hillside Luxury (850 Sq Ft)',
        totalPrice: 'PKR 14,500,000',
        downPayment: 'PKR 2,175,000 (15% Booking)',
        installmentRate: 'PKR 245,000 / month (36 Months)',
        halfYearly: 'PKR 290,000 (6 Balloon Payments)',
        possession: 'PKR 1,765,000'
      }
    ]
  }
]

const currentInstallmentProjectData = computed(() => {
  return installmentProjects.find(p => p.id === selectedInstallmentProject.value) || installmentProjects[0]
})

const selectedInstallmentSizeData = computed(() => {
  const list = currentInstallmentProjectData.value.sizes || []
  return list.find(s => s.label === selectedInstallmentSize.value) || list[0] || {}
})

const openInstallmentModal = (projectId) => {
  selectedInstallmentProject.value = projectId
  const proj = installmentProjects.find(p => p.id === projectId)
  if (proj && proj.sizes.length > 0) {
    selectedInstallmentSize.value = proj.sizes[0].label
  }
  isInstallmentModalOpen.value = true
}

const setInstallmentProject = (projectId) => {
  selectedInstallmentProject.value = projectId
  const proj = installmentProjects.find(p => p.id === projectId)
  if (proj && proj.sizes.length > 0) {
    selectedInstallmentSize.value = proj.sizes[0].label
  }
}

const generateInstallmentWhatsAppUrl = () => {
  const p = currentInstallmentProjectData.value.name
  const s = selectedInstallmentSizeData.value.label
  const price = selectedInstallmentSizeData.value.totalPrice
  const down = selectedInstallmentSizeData.value.downPayment
  const text = `Hello TopLinkers, I am inquiring about the official installment schedule for ${p} (${s}). Total Price: ${price}, Down Payment: ${down}. Please send me the complete booking details.`
  return `https://wa.me/923349522157?text=${encodeURIComponent(text)}`
}

// ==========================================
// SOLAR INQUIRY MODAL & FORM STATE
// ==========================================
const isSolarModalOpen = ref(false)
const solarFormSubmitted = ref(false)
const solarForm = ref({
  systemSize: '10kw',
  name: '',
  phone: '',
  city: 'Islamabad',
  monthlyBill: '',
  notes: ''
})

const openSolarModal = (systemSize = '10kw') => {
  solarForm.value.systemSize = systemSize
  solarFormSubmitted.value = false
  isSolarModalOpen.value = true
}

const generateSolarWhatsAppUrl = () => {
  const size = solarForm.value.systemSize === '10kw' ? '10kW Residential Home System' : solarForm.value.systemSize === '20kw' ? '20kW Villa System' : solarForm.value.systemSize === '50kw' ? '50kW Commercial System' : 'IESCO Green Meter Net Metering'
  const name = solarForm.value.name.trim() ? ` My name is ${solarForm.value.name.trim()}.` : ''
  const bill = solarForm.value.monthlyBill.trim() ? ` Current monthly electricity bill: ${solarForm.value.monthlyBill.trim()}.` : ''
  const city = solarForm.value.city.trim() ? ` Location: ${solarForm.value.city.trim()}.` : ''
  const notes = solarForm.value.notes?.trim() ? ` Requirements / Notes: ${solarForm.value.notes.trim()}.` : ''
  const text = `Hello TopLinkers Solar Desk,${name} I am requesting a turnkey quote and IESCO Net Metering feasibility for the ${size}.${city}${bill}${notes}`
  return `https://wa.me/923324004884?text=${encodeURIComponent(text)}`
}

const submitSolarForm = () => {
  const sizeText = solarForm.value.systemSize === '10kw' ? '10kW Residential Home System' : solarForm.value.systemSize === '20kw' ? '20kW Villa System' : solarForm.value.systemSize === '50kw' ? '50kW Commercial System' : 'IESCO Green Meter Net Metering'
  const noteDetails = solarForm.value.notes?.trim() ? ` | Client Note: ${solarForm.value.notes.trim()}` : ''
  adminStore.addLead({
    name: solarForm.value.name || 'Solar Inquiry Client',
    phone: solarForm.value.phone || 'Not specified',
    city: solarForm.value.city || 'Islamabad',
    division: 'Solar',
    project: sizeText,
    budget: solarForm.value.monthlyBill ? `Bill: ${solarForm.value.monthlyBill}` : 'Requesting Quote',
    priority: 'High',
    source: 'Services Solar Feasibility Form',
    notes: `Solar capacity requested: ${sizeText}. Monthly bill: ${solarForm.value.monthlyBill || 'N/A'}.${noteDetails}`
  })
  solarFormSubmitted.value = true
}

onMounted(() => {
  document.title = 'Our Services: Plots, PHA Flats, Turnkey Construction & Solar | TopLinkers'
  if (route.hash) {
    const section = route.hash.replace('#', '')
    if (['plot', 'flats', 'construction', 'solar'].includes(section)) {
      activeTab.value = section
      setTimeout(() => {
        scrollTo(`#${section}`, { offset: -90, duration: 1.2 })
      }, 200)
    }
  }
})
</script>
