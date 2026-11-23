<template>
  <div class="service-detail-page pt-20 bg-[#F6F8FA] min-h-screen">
    <!-- Breadcrumb Bar -->
    <nav aria-label="Breadcrumb" class="bg-white border-b border-gray-200 py-3">
      <div class="max-w-[1280px] mx-auto px-4 flex items-center gap-2 text-xs text-gray-500">
        <router-link to="/" class="hover:text-[#16B4E8] font-medium">Home</router-link>
        <span>/</span>
        <router-link to="/services" class="hover:text-[#16B4E8] font-medium">Services</router-link>
        <span>/</span>
        <span class="text-[#0F2A44] font-bold">Apartments &amp; Flats</span>
      </div>
    </nav>

    <!-- 1. Hero Cover Banner with Atmospheric Backdrop (Harsukh-Style) -->
    <div class="relative min-h-[500px] sm:h-[540px] md:h-[600px] bg-gray-900 overflow-hidden flex items-end">
      <!-- Background Image 1: PHA Flats (Active when PHA selected) -->
      <img
        src="/images/hero-pha-flats.webp"
        alt="PHA Apartments Islamabad"
        class="absolute inset-0 block w-full h-full object-cover transform scale-105 transition-opacity duration-700 ease-in-out"
        :class="activeMainTab === 'luxury' ? 'opacity-0 pointer-events-none' : 'opacity-100'"
        loading="eager"
        fetchpriority="high"
        width="1920"
        height="1080"
        decoding="async"
      />
      <!-- Background Image 2: Luxury Mountain Suites (Active when Luxury selected) -->
      <img
        src="/images/hero-harsukh.webp"
        alt="Luxury Vacation Suites Nathia Gali"
        class="absolute inset-0 block w-full h-full object-cover transform scale-105 transition-opacity duration-700 ease-in-out"
        :class="activeMainTab === 'luxury' ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        loading="lazy"
        width="1920"
        height="1080"
        decoding="async"
      />

      <!-- Dramatic Atmospheric Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/75 to-[#0F2A44]/35"></div>

      <!-- Hero Header Content -->
      <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-10 sm:pb-16 w-full text-white z-10">
        <div class="max-w-3xl space-y-3.5">
          <!-- Dynamic Hero Badges -->
          <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap transition-all duration-300">
            <template v-if="activeMainTab === 'luxury'">
              <span class="bg-amber-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                PRESTIGIOUS VACATION RESIDENCES
              </span>
              <span class="bg-[#16B4E8] text-[#0F2A44] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
                NATHIA GALI &bull; KUZA GALI
              </span>
              <span class="bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                20%+ ANNUAL RENTAL YIELD
              </span>
            </template>
            <template v-else>
              <span class="bg-[#10B981] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                SECP REGISTERED PHA MANDATE
              </span>
              <span class="bg-[#16B4E8] text-[#0F2A44] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
                SECTOR I-12, I-16 &amp; G-11
              </span>
              <span class="bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                100% READY CASH TRANSFERS
              </span>
            </template>
          </div>

          <!-- Dynamic Hero Title -->
          <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight transition-all duration-300">
            <span v-if="activeMainTab === 'luxury'">Luxury Vacation Suites &amp; Mountain Residences</span>
            <span v-else>PHA Government Flats &amp; Luxury Vacation Suites</span>
          </h1>

          <!-- Dynamic Hero Subtitle -->
          <p class="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl font-medium transition-all duration-300">
            <span v-if="activeMainTab === 'luxury'">
              Explore prestigious mountain-view vacation lofts at <strong class="text-white">Harsukh Kuza Gali (Nathia Gali)</strong> and executive residences at <strong class="text-white">Banu Hafeez &amp; Faisal Heights</strong>. Fully managed hotel services with guaranteed 20%+ annual tourist rental yield.
            </span>
            <span v-else>
              Authorized deals in <strong class="text-white">Pakistan Housing Authority (PHA)</strong> Sector I-12, Sector I-16 &amp; Sector G-11 apartments, alongside prestigious luxury vacation suites and mountain residences in Nathia Gali.
            </span>
          </p>

          <!-- Direct Actions -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <a
              :href="activeMainTab === 'luxury'
                ? 'https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20Luxury%20Vacation%20Suites%20in%20Harsukh%20Nathia%20Gali%20and%20Executive%20Residences.'
                : 'https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20PHA%20Government%20Flats%20in%20Sector%20I-12,%20I-16%20or%20G-11.'"
              target="_blank"
              class="px-6 sm:px-8 py-3.5 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              :class="activeMainTab === 'luxury' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-[#25D366] hover:bg-[#20ba59]'"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>{{ activeMainTab === 'luxury' ? 'Inquire Luxury Suites' : 'Instant WhatsApp Booking' }}</span>
            </a>

            <!-- Sleek Compact Category Switcher Tabs -->
            <div class="w-full sm:w-auto grid grid-cols-2 sm:inline-flex items-stretch p-1 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 shadow-lg gap-1 sm:h-[48px]">
              <button
                type="button"
                @click="switchTab('pha')"
                class="w-full sm:w-auto h-full py-2.5 sm:py-0 px-3 sm:px-5 rounded-lg text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                :class="activeMainTab === 'pha'
                  ? 'bg-[#16B4E8] text-[#071E33] shadow-md ring-1 ring-white/60'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'"
              >
                <span v-if="activeMainTab === 'pha'" class="w-2 h-2 rounded-full bg-[#071E33] animate-pulse"></span>
                <span>PHA Govt Flats</span>
              </button>

              <button
                type="button"
                @click="switchTab('luxury')"
                class="w-full sm:w-auto h-full py-2.5 sm:py-0 px-3 sm:px-5 rounded-lg text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                :class="activeMainTab === 'luxury'
                  ? 'bg-amber-500 text-white shadow-md ring-1 ring-white/60'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'"
              >
                <span v-if="activeMainTab === 'luxury'" class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>Luxury &amp; Suites</span>
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
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">{{ activeMainTab === 'luxury' ? 'Rental Yield' : 'PHA Units' }}</span>
          <span class="text-base sm:text-2xl font-black text-[#16B4E8] block mt-0.5">{{ activeMainTab === 'luxury' ? '20%+ Annual ROI' : '3,200+ Units' }}</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">{{ activeMainTab === 'luxury' ? 'Guaranteed Tourist Rental' : 'Sector I-12 & I-16' }}</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">{{ activeMainTab === 'luxury' ? 'Furnishing' : 'Payment Structure' }}</span>
          <span class="text-base sm:text-2xl font-black text-emerald-600 block mt-0.5">{{ activeMainTab === 'luxury' ? '100% Furnished' : '100% Cash' }}</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">{{ activeMainTab === 'luxury' ? 'Designer Turnkey Interiors' : 'Instant Allotment Transfer' }}</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">{{ activeMainTab === 'luxury' ? 'Prime Heights' : 'Primary Sectors' }}</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">{{ activeMainTab === 'luxury' ? 'Kuza Gali' : 'I-12, I-16, G-11' }}</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">{{ activeMainTab === 'luxury' ? 'Nathia Gali Scenic Valley' : 'CDA Approved Sectors' }}</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">{{ activeMainTab === 'luxury' ? 'Hospitality' : 'Vacation Suites' }}</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">{{ activeMainTab === 'luxury' ? '4-Star Serviced' : '20%+ ROI' }}</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">{{ activeMainTab === 'luxury' ? 'Concierge & Room Service' : 'Harsukh Kuza Gali' }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-[1280px] mx-auto px-4 pb-12 sm:pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article class="lg:col-span-2 space-y-12">

          <!-- ======================================================== -->
          <!-- OPTION 1: PHA GOVERNMENT FLATS DIVISION                 -->
          <!-- ======================================================== -->
          <div id="pha-section" v-if="activeMainTab === 'all' || activeMainTab === 'pha'" class="space-y-10 scroll-mt-24">
            
            <!-- PHA Foundation Official Header & About Box -->
            <section class="bg-white rounded-3xl border border-blue-100 p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full pointer-events-none"></div>
              
              <div class="flex items-center gap-2 mb-3">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Official Implementing Arm &bull; Ministry of Housing &amp; Works
                </span>
              </div>

              <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F2A44] mb-3">
                PHA Government Flats
              </h2>

              <!-- Official Mandate Description (Word-for-Word as mandated by SECP & Ministry) -->
              <div class="p-4 sm:p-5 bg-gradient-to-r from-blue-50/70 via-slate-50 to-emerald-50/40 rounded-2xl border border-blue-100/80 mb-6">
                <h3 class="text-xs font-black uppercase tracking-wider text-[#0F2A44] mb-2 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-[#16B4E8]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  <span>About Pakistan Housing Authority Foundation (PHA-F)</span>
                </h3>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <strong>PHA Foundation is a Public Company registered with Securities and Exchange Commission of Pakistan under Section 42 of the Companies Ordinance, 1984. Being one of the implementing arms of Ministry of Housing &amp; Works, PHA Foundation is consistently striving to eliminate shelterlessness and to reduce the housing shortfall in Pakistan.</strong>
                </p>
              </div>

              <!-- TopLinkers Specialization Banner -->
              <div class="p-4 rounded-2xl bg-[#0F2A44] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8]">
                    Authorized Advisory &bull; Transfer Services
                  </div>
                  <div class="text-sm sm:text-base font-extrabold mt-0.5">
                    We Deal Exclusively in: Sector I-12, Sector I-16 &amp; Sector G-11
                  </div>
                  <p class="text-[11px] text-slate-300 mt-1">
                    Complete legal title diligence, NDC processing, biometric clearances, and allotment transfers at PHA Foundation HQ.
                  </p>
                </div>
                <a
                  href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20PHA%20Flats%20deals%20in%20Sector%20I-12,%20I-16%20or%20G-11."
                  target="_blank"
                  class="px-4 py-2 bg-[#16B4E8] hover:bg-[#1199c7] text-[#0F2A44] font-black text-xs rounded-xl transition shadow-sm whitespace-nowrap self-start sm:self-auto"
                >
                  Contact Desk &rarr;
                </a>
              </div>
            </section>

            <!-- TopLinkers Dealing Sectors (I-12, I-16, G-11 Cards) -->
            <section class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-[#0F2A44]">
                    TopLinkers Core Dealing Sectors
                  </h3>
                  <p class="text-xs text-gray-500">
                    Live inventory, on-ground units, and confirmed allotments in our primary transaction sectors.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <!-- 1. Sector I-12/1 -->
                <div
                  @click="openPhaSector('i12')"
                  class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#16B4E8] transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div class="h-44 w-full overflow-hidden relative bg-slate-900">
                      <img
                        :src="phaSectors.i12.image"
                        alt="Sector I-12 PHA Flats"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span class="absolute top-2.5 left-2.5 bg-[#16B4E8] text-[#0F2A44] text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Sector I-12/1 &bull; 3,200 Units
                      </span>
                      <span class="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                        <span>📸</span>
                        <span>{{ phaSectors.i12.gallery.length }} Photos</span>
                      </span>
                    </div>

                    <!-- Few Images Preview Thumbnails Row -->
                    <div class="p-2 bg-slate-50 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto">
                      <div
                        v-for="(img, idx) in phaSectors.i12.gallery.slice(0, 4)"
                        :key="idx"
                        class="w-12 h-9 rounded overflow-hidden flex-shrink-0 border border-slate-200"
                      >
                        <img :src="img.src" :alt="img.caption" class="w-full h-full object-cover" />
                      </div>
                      <span class="text-[9px] text-[#16B4E8] font-bold px-1 whitespace-nowrap">
                        +{{ phaSectors.i12.gallery.length - 4 }} More
                      </span>
                    </div>

                    <div class="p-4">
                      <h4 class="font-extrabold text-[#0F2A44] text-sm group-hover:text-[#16B4E8] transition-colors">
                        Sector I-12/1 Apartments
                      </h4>
                      <p class="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        3,200 units project featuring Type D (~870 sq. ft.) and Type E (~710 sq. ft.) with dual high-speed elevators &amp; CDA computerized transfer.
                      </p>
                      <div class="mt-3 pt-2 border-t border-gray-100 text-[11px] font-bold text-[#16B4E8] flex justify-between">
                        <span>Demand: 75 Lac – 1.35 Cr</span>
                        <span class="text-emerald-600">Near Handover</span>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 pt-0">
                    <button
                      type="button"
                      @click.stop="openPhaSector('i12')"
                      class="block w-full text-center py-2.5 bg-[#0F2A44] group-hover:bg-[#16B4E8] group-hover:text-[#0F2A44] text-white font-extrabold text-xs rounded-xl transition-all shadow-xs"
                    >
                      Explore Details &amp; Photos &rarr;
                    </button>
                  </div>
                </div>

                <!-- 2. Sector I-16/3 -->
                <div
                  @click="openPhaSector('i16')"
                  class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-500 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div class="h-44 w-full overflow-hidden relative bg-slate-900">
                      <img
                        :src="phaSectors.i16.image"
                        alt="Sector I-16 PHA Flats"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span class="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Sector I-16/3 &bull; 100% Ready
                      </span>
                      <span class="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                        <span>📸</span>
                        <span>{{ phaSectors.i16.gallery.length }} Photos</span>
                      </span>
                    </div>

                    <!-- Few Images Preview Thumbnails Row -->
                    <div class="p-2 bg-slate-50 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto">
                      <div
                        v-for="(img, idx) in phaSectors.i16.gallery.slice(0, 4)"
                        :key="idx"
                        class="w-12 h-9 rounded overflow-hidden flex-shrink-0 border border-slate-200"
                      >
                        <img :src="img.src" :alt="img.caption" class="w-full h-full object-cover" />
                      </div>
                      <span class="text-[9px] text-emerald-600 font-bold px-1 whitespace-nowrap">
                        +{{ phaSectors.i16.gallery.length - 4 }} More
                      </span>
                    </div>

                    <div class="p-4">
                      <h4 class="font-extrabold text-[#0F2A44] text-sm group-hover:text-emerald-700 transition-colors">
                        Sector I-16/3 Apartments
                      </h4>
                      <p class="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        G+6 completed apartment blocks with Type E (2-bed, ~912 sq. ft.) and Type B (3-bed, ~1,496 sq. ft.). Ready for immediate possession.
                      </p>
                      <div class="mt-3 pt-2 border-t border-gray-100 text-[11px] font-bold text-emerald-600 flex justify-between">
                        <span>Demand: 85 Lac – 1.45 Cr</span>
                        <span class="text-emerald-700 font-black">100% Ready</span>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 pt-0">
                    <button
                      type="button"
                      @click.stop="openPhaSector('i16')"
                      class="block w-full text-center py-2.5 bg-[#0F2A44] group-hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl transition-all shadow-xs"
                    >
                      Explore Details &amp; Photos &rarr;
                    </button>
                  </div>
                </div>

                <!-- 3. Sector G-11/3 & G-11/4 -->
                <div
                  @click="openPhaSector('g11')"
                  class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-indigo-500 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div class="h-44 w-full overflow-hidden relative bg-slate-900">
                      <img
                        :src="phaSectors.g11.image"
                        alt="Sector G-11 PHA Flats"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span class="absolute top-2.5 left-2.5 bg-indigo-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Sector G-11 Markaz
                      </span>
                      <span class="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                        <span>📸</span>
                        <span>{{ phaSectors.g11.gallery.length }} Photos</span>
                      </span>
                    </div>

                    <!-- Few Images Preview Thumbnails Row -->
                    <div class="p-2 bg-slate-50 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto">
                      <div
                        v-for="(img, idx) in phaSectors.g11.gallery"
                        :key="idx"
                        class="w-12 h-9 rounded overflow-hidden flex-shrink-0 border border-slate-200"
                      >
                        <img :src="img.src" :alt="img.caption" class="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div class="p-4">
                      <h4 class="font-extrabold text-[#0F2A44] text-sm group-hover:text-indigo-600 transition-colors">
                        Sector G-11 Apartments
                      </h4>
                      <p class="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        Established PHA apartments in G-11/3 &amp; G-11/4 (Type C &amp; E). High rental demand, walking distance to courts, metro, and G-11 Markaz.
                      </p>
                      <div class="mt-3 pt-2 border-t border-gray-100 text-[11px] font-bold text-indigo-600 flex justify-between">
                        <span>Demand: 1.15 – 1.95 Cr</span>
                        <span class="text-indigo-700">Prime Location</span>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 pt-0">
                    <button
                      type="button"
                      @click.stop="openPhaSector('g11')"
                      class="block w-full text-center py-2.5 bg-[#0F2A44] group-hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl transition-all shadow-xs"
                    >
                      Explore Details &amp; Photos &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- All Completed Projects of PHA in Islamabad Sectors (From Official pha.gov.pk Records) -->
            <section class="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
                <div>
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700">
                    Official Records &bull; pha.gov.pk
                  </div>
                  <h3 class="text-xl font-extrabold text-[#0F2A44] mt-1">
                    Completed PHA Projects in Islamabad Sectors
                  </h3>
                  <p class="text-xs text-gray-500 mt-0.5">
                    Official sector allocations delivered and implemented by Pakistan Housing Authority Foundation.
                  </p>
                </div>
                <div class="text-xs font-bold text-gray-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span>Ministry of Housing &amp; Works</span>
                </div>
              </div>

              <!-- Projects Table -->
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-gray-200 bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-600">
                      <th class="py-3 px-4">Sector / Scheme</th>
                      <th class="py-3 px-4">Categories &amp; Scope</th>
                      <th class="py-3 px-4">Official Status</th>
                      <th class="py-3 px-4 text-right">TopLinkers Dealing</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 text-slate-700">
                    <!-- 1. I-16/3 -->
                    <tr class="hover:bg-slate-50/70 transition-colors">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">
                        Sector I-16/3 Apartments
                      </td>
                      <td class="py-3.5 px-4">
                        Multi-story G+6 residential blocks (Type B 3-Bed &amp; Type E 2-Bed) with commercial shops
                      </td>
                      <td class="py-3.5 px-4">
                        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Completed &amp; Handed Over
                        </span>
                      </td>
                      <td class="py-3.5 px-4 text-right">
                        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#16B4E8]/10 text-[#16B4E8]">
                          Active Primary Deals
                        </span>
                      </td>
                    </tr>

                    <!-- 2. I-12/1 -->
                    <tr class="hover:bg-slate-50/70 transition-colors">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">
                        Sector I-12/1 PHA Project
                      </td>
                      <td class="py-3.5 px-4">
                        3,200 multi-story apartment units (Type D 2-bed &amp; Type E 2-bed, elevator towers)
                      </td>
                      <td class="py-3.5 px-4">
                        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          Nearing Completion / Handover
                        </span>
                      </td>
                      <td class="py-3.5 px-4 text-right">
                        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#16B4E8]/10 text-[#16B4E8]">
                          Active Primary Deals
                        </span>
                      </td>
                    </tr>

                    <!-- 3. G-11/3 & G-11/4 -->
                    <tr class="hover:bg-slate-50/70 transition-colors">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">
                        Sector G-11/3 &amp; G-11/4
                      </td>
                      <td class="py-3.5 px-4">
                        Multi-story C &amp; E Type apartments, adjacent to G-11 Markaz commercial hub
                      </td>
                      <td class="py-3.5 px-4">
                        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Completed &amp; Delivered
                        </span>
                      </td>
                      <td class="py-3.5 px-4 text-right">
                        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#16B4E8]/10 text-[#16B4E8]">
                          Active Primary Deals
                        </span>
                      </td>
                    </tr>

                    <!-- 4. G-10/2 -->
                    <tr class="hover:bg-slate-50/70 transition-colors">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">
                        Sector G-10/2 Apartments
                      </td>
                      <td class="py-3.5 px-4">
                        D-Type multi-story residential blocks, fully inhabited community
                      </td>
                      <td class="py-3.5 px-4">
                        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Completed &amp; Delivered
                        </span>
                      </td>
                      <td class="py-3.5 px-4 text-right">
                        <span class="text-xs text-gray-400">Secondary Advisory</span>
                      </td>
                    </tr>

                    <!-- 5. Kurri Road -->
                    <tr class="hover:bg-slate-50/70 transition-colors">
                      <td class="py-3.5 px-4 font-bold text-[#0F2A44]">
                        PHA Officers Residencia, Kurri Road
                      </td>
                      <td class="py-3.5 px-4">
                        Residential houses (Category-III lanes), officers apartments &amp; commercial hub
                      </td>
                      <td class="py-3.5 px-4">
                        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Completed &amp; Handed Over
                        </span>
                      </td>
                      <td class="py-3.5 px-4 text-right">
                        <span class="text-xs text-gray-400">Secondary Advisory</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <!-- ======================================================== -->
          <!-- OPTION 2: LUXURY FLATS DIVISION                         -->
          <!-- ======================================================== -->
          <div id="luxury-section" v-if="activeMainTab === 'all' || activeMainTab === 'luxury'" class="space-y-10 scroll-mt-24">
            
            <section class="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full pointer-events-none"></div>

              <div class="flex items-center gap-2 mb-3">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span class="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Executive Living &bull; High Rental Yields
                </span>
              </div>

              <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F2A44] mb-3">
                Luxury Flats &amp; Mountain Suites
              </h2>
              <p class="text-sm text-slate-600 leading-relaxed max-w-2xl">
                Premium urban executive residences in prime Islamabad sectors along with scenic alpine holiday suites in Nathia Gali delivering up to 20%+ managed tourism rental returns.
              </p>
            </section>

            <!-- Luxury Projects Cards -->
            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Card 1: Harsukh Residencies Nathia Gali -->
              <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <router-link to="/hr-sukh" class="block h-52 w-full overflow-hidden relative bg-slate-900 group cursor-pointer">
                    <picture>
                      <source srcset="/images/hero-harsukh.webp" type="image/webp" />
                      <img src="/images/hero-harsukh.webp" alt="Harsukh Residencies Nathia Gali" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="600" height="208" />
                    </picture>
                    <div class="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 flex-wrap pointer-events-none">
                      <span class="bg-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-md">
                        Alpine Luxury &bull; 8,200 Ft
                      </span>
                      <span class="bg-[#0F2A44]/90 backdrop-blur-xs text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-md">
                        Kuza Gali &bull; Nathia Gali
                      </span>
                    </div>
                  </router-link>
                  <div class="p-6">
                    <h3 class="font-extrabold text-[#0F2A44] text-lg mb-2">
                      <router-link to="/hr-sukh" class="hover:text-amber-600 transition-colors">
                        Harsukh Residencies Nathia Gali
                      </router-link>
                    </h3>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4">
                      Luxury alpine holiday suites at 8,200 ft elevation. Fully furnished 1 &amp; 2-bed chalets with central heating, infinity balconies overlooking the pine valley, and flexible 3-year installment plans.
                    </p>

                    <div class="space-y-2 text-xs mb-4">
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">Studio Vacation Suites</span>
                        <span class="text-amber-700 font-black">PKR 75 Lac <span class="text-[9px] text-slate-400 font-normal">(15% Down)</span></span>
                      </div>
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">1-Bed Family Chalet</span>
                        <span class="text-amber-700 font-black">PKR 1.25 Cr <span class="text-[9px] text-slate-400 font-normal">(36 Monthly)</span></span>
                      </div>
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">2-Bed Valley Penthouse</span>
                        <span class="text-amber-700 font-black">PKR 1.95 Cr <span class="text-[9px] text-slate-400 font-normal">(Rental Pool)</span></span>
                      </div>
                    </div>

                    <div class="bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 text-[11px] text-amber-900 mb-2 flex items-start gap-1.5">
                      <span class="text-amber-600 font-black text-xs">★</span>
                      <span><strong>Tourism Rental Yield:</strong> Optional managed rental pool delivering guaranteed seasonal returns credited directly to your bank account.</span>
                    </div>
                  </div>
                </div>
                <div class="p-5 pt-0 flex items-center gap-2">
                  <router-link
                    to="/hr-sukh"
                    class="flex-1 text-center py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition shadow-xs whitespace-nowrap"
                  >
                    View Details &rarr;
                  </router-link>
                  <a
                    href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20Harsukh%20Residencies%20Nathia%20Gali%20Flats"
                    target="_blank"
                    class="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg text-center transition flex items-center gap-1.5 whitespace-nowrap border border-emerald-200/60"
                    title="Chat on WhatsApp"
                  >
                    <svg class="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <!-- Card 2: Banu Hafeez Luxury Suites -->
              <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <router-link to="/featured-building" class="block h-52 w-full overflow-hidden relative bg-slate-900 group cursor-pointer">
                    <img src="/images/banu-hafeez/bh-hero.webp" alt="Banu Hafeez Luxury Apartments TopCity-1" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="600" height="208" />
                    <div class="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 flex-wrap pointer-events-none">
                      <span class="bg-[#0F2A44]/95 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-md backdrop-blur-xs">
                        15% Booking &bull; 3-Yr Plan
                      </span>
                      <span class="bg-amber-400 text-[#0F2A44] text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-md">
                        17-Storey Tower
                      </span>
                    </div>
                  </router-link>
                  <div class="p-6">
                    <h3 class="font-extrabold text-[#0F2A44] text-lg mb-2">
                      <router-link to="/featured-building" class="hover:text-[#16B4E8] transition-colors">
                        Banu Hafeez Luxury Apartments
                      </router-link>
                    </h3>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4">
                      Approved 17-storey landmark by Waheed Group of Companies in TopCity-1 (15 mins to Airport). Featuring swimming pool, gym, 2 basements parking (281 cars), servant quarters, and 2-year possession.
                    </p>
                    <div class="space-y-2 text-xs mb-4">
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">1-Bed Suite (546 sq.ft.)</span>
                        <span class="text-[#16B4E8] font-black">PKR 9.83M <span class="text-[9px] text-slate-400 font-normal">(1.47M down)</span></span>
                      </div>
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">2-Bed Suite (1,089–1,215 sq.ft.)</span>
                        <span class="text-[#16B4E8] font-black">PKR 19.60M <span class="text-[9px] text-slate-400 font-normal">(2.94M down)</span></span>
                      </div>
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">3-Bed Suite (1,881–2,010 sq.ft.)</span>
                        <span class="text-[#16B4E8] font-black">PKR 33.86M <span class="text-[9px] text-slate-400 font-normal">(5.07M down)</span></span>
                      </div>
                    </div>
                    <div class="bg-blue-50/70 p-2.5 rounded-xl border border-blue-100 text-[11px] text-[#0F2A44] mb-2 flex items-start gap-1.5">
                      <span class="text-[#16B4E8] font-black text-xs">★</span>
                      <span><strong>Executive Amenities:</strong> 2-Level Basement Parking, Dedicated High-Speed Lifts, Gym &amp; Swimming Pool.</span>
                    </div>
                  </div>
                </div>
                <div class="p-5 pt-0 flex items-center gap-2">
                  <router-link
                    to="/featured-building"
                    class="flex-1 text-center py-2 px-3 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs rounded-lg transition shadow-xs whitespace-nowrap"
                  >
                    View Details &rarr;
                  </router-link>
                  <a
                    href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20interested%20in%20Banu%20Hafeez%20Flats%20Cash%20and%20Installments"
                    target="_blank"
                    class="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg text-center transition flex items-center gap-1.5 whitespace-nowrap border border-emerald-200/60"
                    title="Chat on WhatsApp"
                  >
                    <svg class="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <!-- Card 3: Faisal Heights Luxury Apartments (Zedem International) -->
              <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <router-link to="/property/faisal-heights-luxury-executive-apartment" class="block h-52 w-full overflow-hidden relative bg-slate-900 group cursor-pointer">
                    <img src="/images/faisal-heights/fh-building.webp" alt="Faisal Heights Luxury Apartments" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="600" height="208" />
                    <div class="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 flex-wrap pointer-events-none">
                      <span class="bg-[#0F2A44]/95 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-md backdrop-blur-xs">
                        NOC Approved &bull; 1M Sq.Ft
                      </span>
                      <span class="bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-md">
                        Pure Luxury Flats
                      </span>
                    </div>
                  </router-link>
                  <div class="p-6">
                    <h3 class="font-extrabold text-[#0F2A44] text-lg mb-2">
                      <router-link to="/property/faisal-heights-luxury-executive-apartment" class="hover:text-emerald-600 transition-colors">
                        Faisal Heights Luxury Apartments
                      </router-link>
                    </h3>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4">
                      Purely luxury residential tower project spanning over 1 Million Sq.Ft by Zedem / Faisal Town. Featuring Studio to 4-Bed lofts with private theater, resident pool, gym, café, rooftop sky garden, and dedicated multi-level parking.
                    </p>
                    <div class="space-y-2 text-xs mb-4">
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">Studio Apartments</span>
                        <span class="text-emerald-700 font-black">495 – 537 Sq.Ft</span>
                      </div>
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">1 &amp; 2-Bed Luxury Suites</span>
                        <span class="text-emerald-700 font-black">880 – 1,905 Sq.Ft</span>
                      </div>
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">3-Bed &amp; 4-Bed Executive Lofts</span>
                        <span class="text-emerald-700 font-black">1,815 – 2,654+ Sq.Ft</span>
                      </div>
                    </div>
                    <div class="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 mb-2 flex items-start gap-1.5">
                      <span class="text-emerald-600 font-black text-xs">★</span>
                      <span><strong>Zedem Luxury Signature:</strong> Soundproof Double-Glazed Glass, Private Cinema &amp; Rooftop Sky Garden.</span>
                    </div>
                  </div>
                </div>
                <div class="p-5 pt-0 flex items-center gap-2">
                  <router-link
                    to="/property/faisal-heights-luxury-executive-apartment"
                    class="flex-1 text-center py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition shadow-xs whitespace-nowrap"
                  >
                    View Details &rarr;
                  </router-link>
                  <a
                    href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20Faisal%20Heights%20Luxury%20Apartments"
                    target="_blank"
                    class="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg text-center transition flex items-center gap-1.5 whitespace-nowrap border border-emerald-200/60"
                    title="Chat on WhatsApp"
                  >
                    <svg class="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </section>
          </div>

          <!-- FAQs Section -->
          <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
            <h2 class="text-xl font-bold text-[#0F2A44] mb-6">Frequently Asked Questions</h2>
            <div class="space-y-4">
              <div
                v-for="faq in faqs"
                :key="faq.id"
                class="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">{{ faq.question }}</h3>
                <p class="text-xs text-gray-600 leading-relaxed">{{ faq.answer }}</p>
              </div>
            </div>
          </section>
        </article>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="bg-[#0F2A44] text-white p-6 rounded-2xl shadow-md sticky top-28">
            <h3 class="font-extrabold text-lg text-white mb-2">Apartment Advisory Desk</h3>
            <p class="text-xs text-gray-300 mb-6 leading-relaxed">
              Contact our certified property advisors for latest PHA file allotments in I-12, I-16, G-11, or luxury suite brochures.
            </p>
            <div class="space-y-3.5 text-xs mb-6">
              <div class="flex items-start gap-2.5">
                <span class="text-[#16B4E8]">🏢</span>
                <span><strong>TopLinkers Head Office:</strong> Al Hameed Plaza, G-11 Markaz, Islamabad</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="text-[#16B4E8]">📞</span>
                <a href="tel:+923349522157" class="hover:text-[#16B4E8] font-bold">+92-334-9522157</a>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="text-[#16B4E8]">💬</span>
                <a href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20PHA%20and%20Luxury%20Flats." target="_blank" class="hover:text-emerald-400 font-bold">
                  WhatsApp Direct Desk &rarr;
                </a>
              </div>
            </div>

            <div class="space-y-2 pt-2 border-t border-white/10">
              <a
                href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20want%20to%20verify%20a%20PHA%20Flat%20in%20I-12%20or%20I-16%20or%20G-11."
                target="_blank"
                class="w-full block text-center bg-[#16B4E8] hover:bg-[#1199c7] text-[#0F2A44] font-black py-3 rounded-xl transition text-xs shadow-sm"
              >
                Inquire on WhatsApp
              </a>
              <router-link
                to="/contact"
                class="w-full block text-center bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-xl transition text-xs"
              >
                Book Office Meeting
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- Standalone PHA Sector Details Modal with Photo Gallery & Specs -->
    <PhaDetailsModal
      :is-open="isPhaModalOpen"
      :sector="selectedPhaSector"
      @close="isPhaModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { phaSectors } from '../../data/phaData'
import PhaDetailsModal from '../../components/flats/PhaDetailsModal.vue'

const adminStore = useAdminStore()
const faqs = computed(() => adminStore.getFaqsByService('flats'))

const route = useRoute()
const activeMainTab = ref('pha') // 'pha' | 'luxury' | 'all'

const switchTab = (tab) => {
  activeMainTab.value = tab
  const targetId = tab === 'pha' ? 'pha-section' : 'luxury-section'
  if (typeof window !== 'undefined' && window.scrollY > 350) {
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// PHA Details Modal State
const selectedPhaSectorKey = ref(null)
const isPhaModalOpen = ref(false)

const selectedPhaSector = computed(() => {
  if (!selectedPhaSectorKey.value) return null
  return phaSectors[selectedPhaSectorKey.value] || null
})

const openPhaSector = (key) => {
  if (!phaSectors[key]) return
  selectedPhaSectorKey.value = key
  isPhaModalOpen.value = true
}

const applyRouteTab = () => {
  if (route.query.option === 'luxury' || route.hash === '#luxury') {
    activeMainTab.value = 'luxury'
  } else if (route.query.option === 'all' || route.hash === '#all') {
    activeMainTab.value = 'all'
  } else {
    activeMainTab.value = 'pha'
  }

  // Handle direct open query e.g. /services/flats?open=i12 or ?open=pha
  const openParam = (route.query.open || route.query.sector || '').toLowerCase()
  if (openParam === 'i12' || openParam === 'pha') {
    activeMainTab.value = 'pha'
    openPhaSector('i12')
  } else if (openParam === 'i16') {
    activeMainTab.value = 'pha'
    openPhaSector('i16')
  } else if (openParam === 'g11') {
    activeMainTab.value = 'pha'
    openPhaSector('g11')
  }
}

onMounted(() => {
  applyRouteTab()
})

watch(
  () => [route.query.option, route.query.open, route.hash],
  () => {
    applyRouteTab()
  }
)
</script>
