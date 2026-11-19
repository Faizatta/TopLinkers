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

    <!-- Hero Header -->
    <header class="bg-[#0F2A44] text-white py-14 md:py-20 relative overflow-hidden">
      <div class="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#16B4E8]/10 pointer-events-none"></div>
      <div class="max-w-[1280px] mx-auto px-4 text-center relative z-10">
        <span class="text-xs font-black uppercase tracking-widest text-[#16B4E8] bg-[#16B4E8]/10 px-3 py-1 rounded-full inline-block mb-3">
          TOPLINKERS RESIDENTIAL ADVISORY
        </span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          PHA Apartments &amp; Luxury Flats Islamabad
        </h1>
        <p class="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
          Authorized deals in Pakistan Housing Authority (PHA) Sector I-12, Sector I-16 &amp; Sector G-11 apartments, alongside prestigious luxury vacation suites and urban residences.
        </p>

        <!-- Quick 2 Option Jump Pills -->
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            @click="activeMainTab = 'pha'"
            class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
            :class="activeMainTab === 'pha' ? 'bg-[#16B4E8] text-white ring-2 ring-white/30' : 'bg-white/10 hover:bg-white/20 text-white'"
          >
            <span>🏢 Option 1: PHA Government Flats</span>
            <span class="text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-black">I-12, I-16 &amp; G-11</span>
          </button>

          <button
            type="button"
            @click="activeMainTab = 'luxury'"
            class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
            :class="activeMainTab === 'luxury' ? 'bg-amber-500 text-white ring-2 ring-white/30' : 'bg-white/10 hover:bg-white/20 text-white'"
          >
            <span>⭐ Option 2: Luxury Flats &amp; Suites</span>
            <span class="text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-black">Banu Hafeez &amp; Harsukh</span>
          </button>

          <button
            type="button"
            @click="activeMainTab = 'all'"
            class="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-slate-300 hover:text-white"
            :class="{ 'underline font-black text-white': activeMainTab === 'all' }"
          >
            View All
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-[1280px] mx-auto px-4 py-12 sm:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article class="lg:col-span-2 space-y-12">

          <!-- ======================================================== -->
          <!-- OPTION 1: PHA GOVERNMENT FLATS DIVISION                 -->
          <!-- ======================================================== -->
          <div v-if="activeMainTab === 'all' || activeMainTab === 'pha'" class="space-y-10">
            
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
                Option 1: PHA Government Flats
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
                <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div>
                    <div class="h-36 w-full overflow-hidden relative bg-slate-100">
                      <picture>
                        <source srcset="/images/pha/pha-i12-ext-1.webp" type="image/webp" />
                        <img src="/images/pha/pha-i12-ext-1.jpg" alt="Sector I-12 PHA Flats" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </picture>
                      <span class="absolute top-2 left-2 bg-[#16B4E8] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Sector I-12/1
                      </span>
                    </div>
                    <div class="p-4">
                      <h4 class="font-extrabold text-[#0F2A44] text-sm">Sector I-12/1 Apartments</h4>
                      <p class="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        3,200 units project featuring Type D (~870 sq. ft.) and Type E (~710 sq. ft.) 2-bed &amp; 3-bed configurations with dual elevators.
                      </p>
                      <div class="mt-3 pt-2 border-t border-gray-100 text-[11px] font-bold text-[#16B4E8] flex justify-between">
                        <span>Rate: 95 Lac - 1.25 Cr</span>
                        <span>Near Completion</span>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 pt-0">
                    <router-link to="/listings?search=I-12" class="block w-full text-center py-2 bg-slate-100 hover:bg-[#0F2A44] hover:text-white text-[#0F2A44] font-bold text-xs rounded-lg transition-colors">
                      View I-12 Deals &rarr;
                    </router-link>
                  </div>
                </div>

                <!-- 2. Sector I-16/3 -->
                <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div>
                    <div class="h-36 w-full overflow-hidden relative bg-slate-100">
                      <picture>
                        <source srcset="/images/pha/pha-i16-ext-1.webp" type="image/webp" />
                        <img src="/images/pha/pha-i16-ext-1.jpg" alt="Sector I-16 PHA Flats" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </picture>
                      <span class="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Sector I-16/3
                      </span>
                    </div>
                    <div class="p-4">
                      <h4 class="font-extrabold text-[#0F2A44] text-sm">Sector I-16/3 Apartments</h4>
                      <p class="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        G+6 completed apartment blocks with Type E (2-bed, ~912 sq. ft.) and Type B (3-bed, ~1,496 sq. ft.). Ready for immediate possession.
                      </p>
                      <div class="mt-3 pt-2 border-t border-gray-100 text-[11px] font-bold text-emerald-600 flex justify-between">
                        <span>Rate: 85 Lac - 1.35 Cr</span>
                        <span>100% Ready</span>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 pt-0">
                    <router-link to="/listings?search=I-16" class="block w-full text-center py-2 bg-slate-100 hover:bg-[#0F2A44] hover:text-white text-[#0F2A44] font-bold text-xs rounded-lg transition-colors">
                      View I-16 Deals &rarr;
                    </router-link>
                  </div>
                </div>

                <!-- 3. Sector G-11/3 & G-11/4 -->
                <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                  <div>
                    <div class="h-36 w-full overflow-hidden relative bg-slate-100">
                      <picture>
                        <source srcset="/images/hero-real-estate.webp" type="image/webp" />
                        <img src="/images/hero-real-estate.jpg" alt="Sector G-11 PHA Flats" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </picture>
                      <span class="absolute top-2 left-2 bg-indigo-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Sector G-11 Markaz
                      </span>
                    </div>
                    <div class="p-4">
                      <h4 class="font-extrabold text-[#0F2A44] text-sm">Sector G-11 Apartments</h4>
                      <p class="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        Established PHA apartments in G-11/3 &amp; G-11/4 (Type C &amp; E). High rental demand, walking distance to courts, metro, and G-11 Markaz.
                      </p>
                      <div class="mt-3 pt-2 border-t border-gray-100 text-[11px] font-bold text-indigo-600 flex justify-between">
                        <span>Rate: 1.15 Cr - 1.75 Cr</span>
                        <span>Prime Location</span>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 pt-0">
                    <router-link to="/listings?search=G-11" class="block w-full text-center py-2 bg-slate-100 hover:bg-[#0F2A44] hover:text-white text-[#0F2A44] font-bold text-xs rounded-lg transition-colors">
                      View G-11 Deals &rarr;
                    </router-link>
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

            <!-- Verified Photo Gallery for I-12 & I-16 -->
            <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-sm">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                <div>
                  <span class="text-[10px] font-black uppercase tracking-widest text-[#16B4E8] bg-sky-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Authentic On-Ground Gallery
                  </span>
                  <h3 class="text-xl sm:text-2xl font-extrabold text-[#0F2A44]">
                    Sector I-12 &amp; I-16 Apartment Photos
                  </h3>
                  <p class="text-xs text-gray-500 mt-0.5">
                    Real, verified on-ground photos of towers, street access, building elevations, and apartment interior finishes.
                  </p>
                </div>

                <!-- Filter Tabs -->
                <div class="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
                  <button
                    type="button"
                    @click="activeGalleryTab = 'all'"
                    :class="[
                      'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                      activeGalleryTab === 'all'
                        ? 'bg-[#0F2A44] text-white shadow-xs'
                        : 'text-gray-600 hover:text-[#0F2A44]'
                    ]"
                  >
                    All (16)
                  </button>
                  <button
                    type="button"
                    @click="activeGalleryTab = 'i12'"
                    :class="[
                      'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                      activeGalleryTab === 'i12'
                        ? 'bg-[#0F2A44] text-white shadow-xs'
                        : 'text-gray-600 hover:text-[#0F2A44]'
                    ]"
                  >
                    Sector I-12 (8)
                  </button>
                  <button
                    type="button"
                    @click="activeGalleryTab = 'i16'"
                    :class="[
                      'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                      activeGalleryTab === 'i16'
                        ? 'bg-[#0F2A44] text-white shadow-xs'
                        : 'text-gray-600 hover:text-[#0F2A44]'
                    ]"
                  >
                    Sector I-16 (8)
                  </button>
                </div>
              </div>

              <!-- Photos Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                <div
                  v-for="photo in filteredPhotos"
                  :key="photo.id"
                  class="group relative rounded-xl overflow-hidden border border-gray-200 bg-slate-50 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                  @click="openLightbox(photo)"
                >
                  <div class="aspect-[4/3] w-full overflow-hidden bg-slate-200">
                    <picture>
                      <source :srcset="photo.webp" type="image/webp" />
                      <img
                        :src="photo.jpg"
                        :alt="photo.title"
                        loading="lazy"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </picture>
                  </div>

                  <div class="absolute top-2 left-2">
                    <span
                      :class="[
                        'text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm text-white',
                        photo.sector === 'Sector I-12' ? 'bg-[#16B4E8]' : 'bg-emerald-600'
                      ]"
                    >
                      {{ photo.sector }}
                    </span>
                  </div>

                  <div class="p-2.5 bg-white">
                    <div class="text-[11px] font-bold text-[#0F2A44] truncate group-hover:text-[#16B4E8] transition-colors">
                      {{ photo.title }}
                    </div>
                    <div class="text-[9px] text-gray-500 truncate mt-0.5">
                      {{ photo.tag }}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- ======================================================== -->
          <!-- OPTION 2: LUXURY FLATS DIVISION                         -->
          <!-- ======================================================== -->
          <div v-if="activeMainTab === 'all' || activeMainTab === 'luxury'" class="space-y-10">
            
            <section class="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full pointer-events-none"></div>

              <div class="flex items-center gap-2 mb-3">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span class="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Executive Living &bull; High Rental Yields
                </span>
              </div>

              <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0F2A44] mb-3">
                Option 2: Luxury Flats &amp; Mountain Suites
              </h2>
              <p class="text-sm text-slate-600 leading-relaxed max-w-2xl">
                Premium urban executive residences in prime Islamabad sectors along with scenic alpine holiday suites in Nathia Gali delivering up to 20%+ managed tourism rental returns.
              </p>
            </section>

            <!-- Luxury Projects Cards -->
            <section class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Harsukh Residencies Nathia Gali -->
              <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div class="h-48 w-full overflow-hidden relative bg-slate-100">
                    <picture>
                      <source srcset="/images/hero-harsukh.webp" type="image/webp" />
                      <img src="/images/hero-harsukh.jpg" alt="Harsukh Residencies Nathia Gali" class="w-full h-full object-cover" />
                    </picture>
                    <span class="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow">
                      Alpine Luxury &bull; 8,200 Ft Elevation
                    </span>
                  </div>
                  <div class="p-6">
                    <h3 class="font-bold text-[#0F2A44] text-lg mb-2">Harsukh Residencies Nathia Gali</h3>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4">
                      Luxury alpine holiday suites at 8,200 ft elevation. Fully furnished 1 &amp; 2-bed chalets with central heating, infinity balconies overlooking the pine valley, and flexible 3-year installment plans.
                    </p>
                    <div class="bg-amber-50/70 p-3 rounded-xl border border-amber-100 text-xs text-amber-900 mb-4">
                      <strong>Tourism Rental Yield:</strong> Optional managed rental pool delivering guaranteed seasonal returns credited directly to your bank account.
                    </div>
                  </div>
                </div>
                <div class="p-6 pt-0">
                  <router-link
                    to="/hr-sukh"
                    class="block w-full text-center py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase rounded-xl transition shadow-sm"
                  >
                    Explore Harsukh Suites &rarr;
                  </router-link>
                </div>
              </div>

              <!-- Banu Hafeez Luxury Suites -->
              <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div class="h-48 w-full overflow-hidden relative bg-slate-100">
                    <picture>
                      <source srcset="/images/hero-pha-flats.webp" type="image/webp" />
                      <img src="/images/hero-pha-flats.jpg" alt="Banu Hafeez Luxury Suites" class="w-full h-full object-cover" />
                    </picture>
                    <span class="absolute top-3 left-3 bg-[#0F2A44] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow">
                      100% Cash &bull; Flexible Installments
                    </span>
                  </div>
                  <div class="p-6">
                    <h3 class="font-bold text-[#0F2A44] text-lg mb-2">Banu Hafeez Luxury Suites</h3>
                    <p class="text-xs text-gray-600 leading-relaxed mb-4">
                      High-end modern apartments in central urban locations with subterranean parking, gymnasiums, and round-the-clock facility maintenance.
                    </p>
                    <div class="space-y-2 text-xs mb-4">
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">2-Bed Executive Suite</span>
                        <span class="text-[#16B4E8] font-black">PKR 85 - 98 Lac</span>
                      </div>
                      <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span class="font-bold text-[#0F2A44]">3-Bed Family Unit</span>
                        <span class="text-[#16B4E8] font-black">PKR 1.25 - 1.55 Cr</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-6 pt-0">
                  <router-link
                    to="/listings?search=Banu"
                    class="block w-full text-center py-3 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs uppercase rounded-xl transition shadow-sm"
                  >
                    View Banu Hafeez Units &rarr;
                  </router-link>
                </div>
              </div>
            </section>
          </div>

          <!-- FAQs Section -->
          <section class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs">
            <h2 class="text-xl font-bold text-[#0F2A44] mb-6">Frequently Asked Questions</h2>
            <div class="space-y-4">
              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">What is the transfer process for PHA flats in I-12, I-16, and G-11?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Transfer takes place directly at the Ministry of Housing &amp; Works / PHA Foundation headquarters in Islamabad following biometric clearance, verification of original allotment letters, and NDC issuance.
                </p>
              </div>
              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">Are PHA flats in Sector I-16 and G-11 ready for immediate living?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Yes, PHA Sector I-16/3 and Sector G-11 flats are fully constructed with active families residing, functional utilities, elevators, and dedicated parking.
                </p>
              </div>
              <div>
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">Can I generate rental income from Harsukh alpine suites?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Yes, Harsukh offers an optional managed rental pool where your suite is leased to vacation travelers, delivering guaranteed seasonal returns credited directly to your bank account.
                </p>
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

    <!-- Lightbox Modal for Full View -->
    <div
      v-if="selectedPhoto"
      class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="selectedPhoto = null"
    >
      <div class="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <button
          type="button"
          class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition"
          @click="selectedPhoto = null"
          aria-label="Close photo"
        >
          ✕
        </button>
        <div class="w-full max-h-[75vh] flex items-center justify-center bg-black">
          <picture>
            <source :srcset="selectedPhoto.webp" type="image/webp" />
            <img
              :src="selectedPhoto.jpg"
              :alt="selectedPhoto.title"
              class="max-h-[75vh] w-auto object-contain mx-auto"
            />
          </picture>
        </div>
        <div class="p-4 bg-slate-900 text-white flex items-center justify-between border-t border-white/10">
          <div>
            <div class="text-sm font-bold">{{ selectedPhoto.title }}</div>
            <div class="text-xs text-gray-400 mt-0.5">{{ selectedPhoto.sector }} &bull; {{ selectedPhoto.tag }}</div>
          </div>
          <a
            :href="selectedPhoto.jpg"
            target="_blank"
            class="text-xs text-[#16B4E8] hover:underline font-bold"
          >
            Open Full Size ↗
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMainTab = ref('all') // 'all' | 'pha' | 'luxury'
const activeGalleryTab = ref('all')
const selectedPhoto = ref(null)

const applyRouteTab = () => {
  if (route.query.option === 'pha' || route.hash === '#pha') {
    activeMainTab.value = 'pha'
  } else if (route.query.option === 'luxury' || route.hash === '#luxury') {
    activeMainTab.value = 'luxury'
  }
}

onMounted(() => {
  applyRouteTab()
})

watch(
  () => [route.query.option, route.hash],
  () => {
    applyRouteTab()
  }
)

const photos = [
  // Sector I-12
  {
    id: 'i12-1',
    sector: 'Sector I-12',
    title: 'PHA Multi-Story Towers Elevation',
    tag: 'Exterior & Main Gate',
    webp: '/images/pha/pha-i12-ext-1.webp',
    jpg: '/images/pha/pha-i12-ext-1.jpg'
  },
  {
    id: 'i12-2',
    sector: 'Sector I-12',
    title: 'Tower Complex View',
    tag: 'Building Facade & Balconies',
    webp: '/images/pha/pha-i12-ext-2.webp',
    jpg: '/images/pha/pha-i12-ext-2.jpg'
  },
  {
    id: 'i12-3',
    sector: 'Sector I-12',
    title: 'Central Street Corridor',
    tag: 'Access Roadway',
    webp: '/images/pha/pha-i12-street.webp',
    jpg: '/images/pha/pha-i12-street.jpg'
  },
  {
    id: 'i12-4',
    sector: 'Sector I-12',
    title: 'Direct Tower Elevation',
    tag: 'Facade & Architecture',
    webp: '/images/pha/pha-i12-elevation.webp',
    jpg: '/images/pha/pha-i12-elevation.jpg'
  },
  {
    id: 'i12-5',
    sector: 'Sector I-12',
    title: 'Apartment Blocks Perspective',
    tag: 'Residential Towers',
    webp: '/images/pha/pha-i12-ext-3.webp',
    jpg: '/images/pha/pha-i12-ext-3.jpg'
  },
  {
    id: 'i12-6',
    sector: 'Sector I-12',
    title: 'Living Lounge & Tiled Flooring',
    tag: 'Interior Finishes',
    webp: '/images/pha/pha-i12-int-2.webp',
    jpg: '/images/pha/pha-i12-int-2.jpg'
  },
  {
    id: 'i12-7',
    sector: 'Sector I-12',
    title: 'Bedrooms & Woodwork',
    tag: 'Interior Bedroom Layout',
    webp: '/images/pha/pha-i12-int-1.webp',
    jpg: '/images/pha/pha-i12-int-1.jpg'
  },
  {
    id: 'i12-8',
    sector: 'Sector I-12',
    title: 'Room Space & Natural Light',
    tag: 'Family Bedroom',
    webp: '/images/pha/pha-i12-int-3.webp',
    jpg: '/images/pha/pha-i12-int-3.jpg'
  },

  // Sector I-16
  {
    id: 'i16-1',
    sector: 'Sector I-16',
    title: 'Sector I-16 Apartment Building',
    tag: 'G+6 Tower Complex',
    webp: '/images/pha/pha-i16-ext-1.webp',
    jpg: '/images/pha/pha-i16-ext-1.jpg'
  },
  {
    id: 'i16-2',
    sector: 'Sector I-16',
    title: 'Completed Block Elevation',
    tag: 'Ready Possession Towers',
    webp: '/images/pha/pha-i16-elevation.webp',
    jpg: '/images/pha/pha-i16-elevation.jpg'
  },
  {
    id: 'i16-3',
    sector: 'Sector I-16',
    title: 'Apartment Blocks Cluster',
    tag: 'Sector I-16/3 Gated Society',
    webp: '/images/pha/pha-i16-blocks.webp',
    jpg: '/images/pha/pha-i16-blocks.jpg'
  },
  {
    id: 'i16-4',
    sector: 'Sector I-16',
    title: 'Main Living Room & Dining',
    tag: 'Tile Finish & Ceiling Fans',
    webp: '/images/pha/pha-i16-int-1.webp',
    jpg: '/images/pha/pha-i16-int-1.jpg'
  },
  {
    id: 'i16-5',
    sector: 'Sector I-16',
    title: 'Spacious Family Lounge',
    tag: 'Interior Architecture',
    webp: '/images/pha/pha-i16-int-2.webp',
    jpg: '/images/pha/pha-i16-int-2.jpg'
  },
  {
    id: 'i16-6',
    sector: 'Sector I-16',
    title: 'Bedroom with Window Daylight',
    tag: 'Executive Bedroom',
    webp: '/images/pha/pha-i16-int-3.webp',
    jpg: '/images/pha/pha-i16-int-3.jpg'
  },
  {
    id: 'i16-7',
    sector: 'Sector I-16',
    title: 'Private Balcony View',
    tag: 'Outdoor Safety Railing',
    webp: '/images/pha/pha-i16-balcony.webp',
    jpg: '/images/pha/pha-i16-balcony.jpg'
  },
  {
    id: 'i16-8',
    sector: 'Sector I-16',
    title: 'Building Exterior Corner',
    tag: 'Street & Parking Grounds',
    webp: '/images/pha/pha-i16-ext-2.webp',
    jpg: '/images/pha/pha-i16-ext-2.jpg'
  }
]

const filteredPhotos = computed(() => {
  if (activeGalleryTab.value === 'i12') {
    return photos.filter(p => p.sector === 'Sector I-12')
  }
  if (activeGalleryTab.value === 'i16') {
    return photos.filter(p => p.sector === 'Sector I-16')
  }
  return photos
})

const openLightbox = (photo) => {
  selectedPhoto.value = photo
}
</script>
