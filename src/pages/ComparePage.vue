<template>
  <div class="compare-page pt-28 sm:pt-32 md:pt-36 pb-20 bg-[#F6F8FA] min-h-screen">
    <div class="max-w-[1280px] mx-auto px-4">
      <!-- 1. Breadcrumb & Top Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-200 gap-4">
        <div>
          <nav class="flex items-center text-xs text-gray-500 gap-2 mb-2" aria-label="Breadcrumb">
            <router-link to="/" class="hover:text-[#16B4E8] transition-colors">Home</router-link>
            <span>/</span>
            <span class="text-gray-900 font-semibold">Compare Flats &amp; Plots</span>
          </nav>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl sm:text-3xl font-black text-[#0F2A44] tracking-tight">
              Compare Flats, Apartments &amp; Plots
            </h1>
          </div>
          <p class="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
            Side-by-side technical evaluation of covered areas, CDA/RDA title status, installment schedules, and actual market rates across Islamabad and Galyat.
          </p>
        </div>

        <!-- Top Quick Actions -->
        <div class="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            @click="openPropertySelector()"
            class="text-xs px-4 py-2.5 bg-[#16B4E8] hover:bg-[#119fcb] text-white rounded-xl font-bold transition-all shadow-sm"
          >
            + Add Properties
          </button>

          <button
            v-if="compareProperties.length"
            type="button"
            @click="queryModalOpen = true"
            class="text-xs px-4 py-2.5 bg-[#0F2A44] hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-sm"
          >
            Inquire on Comparison
          </button>

          <button
            v-if="compareProperties.length"
            type="button"
            @click="clearAll"
            class="text-xs px-3.5 py-2.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-xl font-bold transition-all shadow-xs"
            title="Clear all selected properties"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- 2. Instant Comparison Presets Bar (Clean, Zero Emojis/Icons) -->
      <div class="bg-white rounded-2xl p-3 sm:p-4 border border-gray-200/90 shadow-sm mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-nowrap sm:flex-wrap">
          <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1 flex-shrink-0">
            Presets:
          </span>

          <button
            type="button"
            @click="loadPreset('flats')"
            class="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all border flex-shrink-0 whitespace-nowrap"
            :class="activePresetMode === 'flats' ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-[#0F2A44] border-slate-200'"
          >
            PHA Flats
          </button>

          <button
            type="button"
            @click="loadPreset('plots')"
            class="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all border flex-shrink-0 whitespace-nowrap"
            :class="activePresetMode === 'plots' ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-[#0F2A44] border-slate-200'"
          >
            Moqa Plots
          </button>

          <button
            type="button"
            @click="loadPreset('harsukh')"
            class="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all border flex-shrink-0 whitespace-nowrap"
            :class="activePresetMode === 'harsukh' ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-[#0F2A44] border-slate-200'"
          >
            Harsukh Suites
          </button>

          <button
            type="button"
            @click="loadPreset('villas')"
            class="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all border flex-shrink-0 whitespace-nowrap"
            :class="activePresetMode === 'villas' ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-[#0F2A44] border-slate-200'"
          >
            Designer Villas
          </button>
        </div>

        <!-- Quick Visual Catalog Trigger -->
        <button
          type="button"
          @click="openPropertySelector()"
          class="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-[#16B4E8]/40 hover:border-[#16B4E8] bg-[#16B4E8]/5 hover:bg-[#16B4E8]/10 text-[11px] sm:text-xs font-extrabold text-[#0F2A44] hover:text-[#16B4E8] transition-all flex-shrink-0"
        >
          Browse All ({{ allAvailableProperties.length }})
        </button>
      </div>

      <!-- 3. VISUAL COMPARISON SLOTS (Desktop Deck) -->
      <div class="hidden sm:block mb-8">
        <div class="flex items-center justify-between mb-3 px-1">
          <div class="flex items-center gap-2">
            <span class="text-xs font-extrabold uppercase tracking-wider text-slate-500">Comparison Slots:</span>
            <span class="px-2 py-0.5 rounded-full text-[11px] font-black" :class="compareProperties.length === 4 ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'">
              {{ compareProperties.length }} / 4 Selected
            </span>
          </div>
          <span class="text-xs text-slate-400">Compare up to 4 flats, apartments, or plots side-by-side</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Filled Slots -->
          <div
            v-for="(prop, index) in compareProperties"
            :key="prop.id"
            class="bg-white rounded-2xl border-2 border-slate-200/90 shadow-sm hover:shadow-md transition-all p-3.5 flex flex-col justify-between relative group"
          >
            <!-- Slot number badge -->
            <div class="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-[#0F2A44] text-white text-[10px] font-black flex items-center justify-center shadow">
              {{ index + 1 }}
            </div>

            <!-- Remove Button -->
            <button
              type="button"
              @click="remove(prop.id)"
              class="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow"
              title="Remove from comparison"
              aria-label="Remove property"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>

            <!-- Card Top Image & Category Tag -->
            <div>
              <div class="relative h-32 rounded-xl overflow-hidden bg-slate-100 mb-3">
                <img
                  :src="getPropertyImage(prop)"
                  :alt="prop.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                <span class="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#0F2A44]/90 backdrop-blur-xs text-white shadow">
                  {{ prop.typeName || (prop.type === 'apartment' ? 'Apartment' : prop.type === 'plot' ? 'Plot' : 'Property') }}
                </span>
              </div>

              <h4 class="font-extrabold text-xs text-[#0F2A44] line-clamp-2 leading-snug mb-1 group-hover:text-[#16B4E8] transition-colors">
                {{ prop.title }}
              </h4>
              <p class="text-[11px] text-slate-500 truncate mb-2">
                {{ prop.society || prop.address || prop.city }}
              </p>
            </div>

            <!-- Price & Actions -->
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <span class="text-[10px] font-bold uppercase text-slate-400 block">Rate / Price</span>
                <span class="text-xs font-black text-[#16B4E8]">
                  {{ prop.priceFormatted || `PKR ${prop.price?.toLocaleString()}` }}
                </span>
              </div>

              <button
                type="button"
                @click="openPropertySelector(prop.id)"
                class="text-[11px] font-bold text-slate-600 hover:text-[#16B4E8] px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors"
                title="Change or swap this property"
              >
                Swap
              </button>
            </div>
          </div>

          <!-- Empty Slots (Invite User to Add Property) -->
          <div
            v-for="emptyIdx in (4 - compareProperties.length)"
            :key="`empty-slot-${emptyIdx}`"
            @click="openPropertySelector()"
            class="border-2 border-dashed border-slate-300 hover:border-[#16B4E8] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/60 hover:bg-sky-50/40 transition-all duration-200 group min-h-[190px]"
          >
            <div class="w-11 h-11 rounded-full bg-white shadow-xs text-slate-400 group-hover:text-[#16B4E8] group-hover:scale-110 flex items-center justify-center mb-2.5 transition-all border border-slate-200 group-hover:border-[#16B4E8]">
              <PlusIcon class="w-5 h-5 stroke-[2.5]" />
            </div>
            <p class="font-extrabold text-xs text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors">
              + Add Flat or Plot
            </p>
            <p class="text-[11px] text-slate-400 mt-0.5">
              Click to select from catalog
            </p>
          </div>
        </div>
      </div>

      <!-- 4. COMPARISON CONTAINER (Mobile Zero-Scroll + Desktop Table) -->
      <template v-if="compareProperties.length > 0">
        <!-- 4A. MOBILE ZERO-SCROLL HEAD-TO-HEAD COMPARISON (md:hidden) -->
        <div class="md:hidden space-y-3.5 mb-8">
          <!-- Interactive Slot Tabs (when 2+ properties in comparison) -->
          <div class="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-[#0F2A44]">
                Comparing ({{ compareProperties.length }}/4 Slots)
              </span>
              <button
                v-if="compareProperties.length < 4"
                type="button"
                @click="openPropertySelector()"
                class="text-xs font-bold text-[#16B4E8]"
              >
                + Add Property
              </button>
            </div>

            <!-- Tab strip: Switch Column B with 1 tap -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-nowrap">
              <button
                v-for="(prop, pIdx) in compareProperties"
                :key="'tab-' + prop.id"
                type="button"
                @click="pIdx === mobileItemAIdx ? null : mobileItemBIdx = pIdx"
                :class="[
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap flex-shrink-0 flex items-center gap-1.5',
                  mobileItemAIdx === pIdx
                    ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-xs'
                    : mobileItemBIdx === pIdx
                      ? 'bg-[#16B4E8] text-white border-[#16B4E8] shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                ]"
              >
                <span class="w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center" :class="mobileItemAIdx === pIdx || mobileItemBIdx === pIdx ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'">
                  {{ pIdx === mobileItemAIdx ? 'A' : pIdx === mobileItemBIdx ? 'B' : pIdx + 1 }}
                </span>
                <span class="max-w-[110px] truncate">{{ prop.title }}</span>
              </button>

              <button
                v-if="compareProperties.length < 4"
                type="button"
                @click="openPropertySelector()"
                class="px-2.5 py-1.5 rounded-xl border border-dashed border-[#16B4E8] text-[#16B4E8] bg-sky-50/50 text-xs font-bold whitespace-nowrap flex-shrink-0"
              >
                + Add Slot
              </button>
            </div>
          </div>

          <!-- Side-by-Side Property Header Cards (50% / 50%) -->
          <div class="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm">
            <div class="grid grid-cols-2 gap-2.5">
              <!-- Property A Card -->
              <div v-if="mobilePropA" class="flex flex-col justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <div class="flex items-center justify-between gap-1 mb-1.5">
                    <span class="w-5 h-5 rounded-full bg-[#0F2A44] text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">
                      A
                    </span>
                    <select
                      v-model="mobileItemAIdx"
                      class="w-full text-[10px] font-bold bg-white text-slate-700 border border-slate-200 rounded-md px-1.5 py-1 focus:outline-none focus:border-[#16B4E8] truncate"
                    >
                      <option v-for="(p, i) in compareProperties" :key="'optA-' + p.id" :value="i">
                        #{{ i + 1 }}: {{ p.title }}
                      </option>
                    </select>
                  </div>

                  <div class="relative h-24 rounded-lg overflow-hidden bg-slate-200 mb-1.5">
                    <img :src="getPropertyImage(mobilePropA)" :alt="mobilePropA.title" class="w-full h-full object-cover" />
                    <span class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-[#0F2A44]/90 text-white">
                      {{ mobilePropA.typeName || (mobilePropA.type === 'apartment' ? 'Flat' : 'Plot') }}
                    </span>
                  </div>

                  <h4 class="font-extrabold text-xs text-[#0F2A44] line-clamp-2 leading-tight">
                    {{ mobilePropA.title }}
                  </h4>
                  <p class="text-[10px] text-slate-500 truncate mt-0.5">
                    {{ mobilePropA.society || mobilePropA.city }}
                  </p>
                </div>

                <div class="mt-2.5 pt-1.5 border-t border-slate-200 flex items-center justify-between">
                  <span class="text-xs font-black text-[#16B4E8]">
                    {{ mobilePropA.priceFormatted || `PKR ${mobilePropA.price?.toLocaleString()}` }}
                  </span>
                  <button
                    type="button"
                    @click="remove(mobilePropA.id)"
                    class="text-[10px] font-bold text-red-500 hover:text-red-700 px-1 py-0.5 rounded hover:bg-red-50"
                    title="Remove"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <!-- Property B Card -->
              <div v-if="mobilePropB" class="flex flex-col justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <div class="flex items-center justify-between gap-1 mb-1.5">
                    <span class="w-5 h-5 rounded-full bg-[#16B4E8] text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">
                      B
                    </span>
                    <select
                      v-model="mobileItemBIdx"
                      class="w-full text-[10px] font-bold bg-white text-slate-700 border border-slate-200 rounded-md px-1.5 py-1 focus:outline-none focus:border-[#16B4E8] truncate"
                    >
                      <option v-for="(p, i) in compareProperties" :key="'optB-' + p.id" :value="i">
                        #{{ i + 1 }}: {{ p.title }}
                      </option>
                    </select>
                  </div>

                  <div class="relative h-24 rounded-lg overflow-hidden bg-slate-200 mb-1.5">
                    <img :src="getPropertyImage(mobilePropB)" :alt="mobilePropB.title" class="w-full h-full object-cover" />
                    <span class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-[#16B4E8]/90 text-white">
                      {{ mobilePropB.typeName || (mobilePropB.type === 'apartment' ? 'Flat' : 'Plot') }}
                    </span>
                  </div>

                  <h4 class="font-extrabold text-xs text-[#0F2A44] line-clamp-2 leading-tight">
                    {{ mobilePropB.title }}
                  </h4>
                  <p class="text-[10px] text-slate-500 truncate mt-0.5">
                    {{ mobilePropB.society || mobilePropB.city }}
                  </p>
                </div>

                <div class="mt-2.5 pt-1.5 border-t border-slate-200 flex items-center justify-between">
                  <span class="text-xs font-black text-[#16B4E8]">
                    {{ mobilePropB.priceFormatted || `PKR ${mobilePropB.price?.toLocaleString()}` }}
                  </span>
                  <button
                    type="button"
                    @click="remove(mobilePropB.id)"
                    class="text-[10px] font-bold text-red-500 hover:text-red-700 px-1 py-0.5 rounded hover:bg-red-50"
                    title="Remove"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <!-- Single Property empty slot invitation -->
              <div
                v-else
                @click="openPropertySelector()"
                class="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-dashed border-[#16B4E8]/50 bg-sky-50/40 text-center cursor-pointer min-h-[140px]"
              >
                <span class="text-xs font-bold text-[#0F2A44]">+ Add 2nd Property</span>
                <span class="text-[10px] text-slate-400 mt-0.5">Compare side-by-side</span>
              </div>
            </div>
          </div>

          <!-- Unified Side-by-Side Comparison Matrix -->
          <div v-if="mobilePropA && mobilePropB" class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <!-- SECTION 1: PRICE & PAYMENT -->
            <div class="bg-[#0F2A44] px-3.5 py-2">
              <span class="text-[11px] font-black uppercase tracking-wider text-white">Price &amp; Payment Mode</span>
            </div>
            <div class="divide-y divide-slate-100 text-xs">
              <div class="p-2.5">
                <div class="text-[10px] font-bold uppercase text-slate-400 text-center mb-1">Total Demand / Price</div>
                <div class="grid grid-cols-2 gap-2 text-center">
                  <div class="font-black text-xs text-[#16B4E8] bg-sky-50/70 p-2 rounded-lg border border-sky-100">
                    {{ mobilePropA.priceFormatted || ('PKR ' + mobilePropA.price?.toLocaleString()) }}
                  </div>
                  <div class="font-black text-xs text-[#16B4E8] bg-sky-50/70 p-2 rounded-lg border border-sky-100">
                    {{ mobilePropB.priceFormatted || ('PKR ' + mobilePropB.price?.toLocaleString()) }}
                  </div>
                </div>
              </div>

              <div class="p-2.5">
                <div class="text-[10px] font-bold uppercase text-slate-400 text-center mb-1">Payment Basis / Rate</div>
                <div class="grid grid-cols-2 gap-2 text-center">
                  <div class="text-[11px] font-bold text-slate-700 bg-slate-50 p-2 rounded-lg">
                    {{ mobilePropA.pricePerSqft || (mobilePropA.type === 'plot' ? '100% Cash Registry' : 'Standard Rate') }}
                  </div>
                  <div class="text-[11px] font-bold text-slate-700 bg-slate-50 p-2 rounded-lg">
                    {{ mobilePropB.pricePerSqft || (mobilePropB.type === 'plot' ? '100% Cash Registry' : 'Standard Rate') }}
                  </div>
                </div>
              </div>

              <div class="p-2.5">
                <div class="text-[10px] font-bold uppercase text-slate-400 text-center mb-1">Installment / Booking Plan</div>
                <div class="grid grid-cols-2 gap-2 text-center">
                  <div class="text-[10px] font-bold p-2 rounded-lg" :class="mobilePropA.pricePostfix?.includes('Booking') || /installment/i.test(mobilePropA.title) ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'">
                    {{ mobilePropA.pricePostfix || (mobilePropA.type === 'plot' ? 'Cash Demarcated' : 'Ready Possession') }}
                  </div>
                  <div class="text-[10px] font-bold p-2 rounded-lg" :class="mobilePropB.pricePostfix?.includes('Booking') || /installment/i.test(mobilePropB.title) ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'">
                    {{ mobilePropB.pricePostfix || (mobilePropB.type === 'plot' ? 'Cash Demarcated' : 'Ready Possession') }}
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 2: LOCATION & LEGAL STATUS -->
            <div class="bg-[#0F2A44] px-3.5 py-2">
              <span class="text-[11px] font-black uppercase tracking-wider text-white">Location &amp; Legal Status</span>
            </div>
            <div class="divide-y divide-slate-100 text-xs">
              <div class="p-2.5">
                <div class="text-[10px] font-bold uppercase text-slate-400 text-center mb-1">Society / Sector</div>
                <div class="grid grid-cols-2 gap-2 text-center">
                  <div class="font-bold text-xs text-[#0F2A44] bg-slate-50 p-2 rounded-lg">
                    {{ mobilePropA.society || mobilePropA.areaName || mobilePropA.city }}
                  </div>
                  <div class="font-bold text-xs text-[#0F2A44] bg-slate-50 p-2 rounded-lg">
                    {{ mobilePropB.society || mobilePropB.areaName || mobilePropB.city }}
                  </div>
                </div>
              </div>

              <div class="p-2.5">
                <div class="text-[10px] font-bold uppercase text-slate-400 text-center mb-1">Legal &amp; NOC Status</div>
                <div class="grid grid-cols-2 gap-2 text-center">
                  <div class="text-[10px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                    {{ mobilePropA.type === 'plot' ? 'Moqa Demarcated' : 'CDA / RDA Verified' }}
                  </div>
                  <div class="text-[10px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                    {{ mobilePropB.type === 'plot' ? 'Moqa Demarcated' : 'CDA / RDA Verified' }}
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 3: SPACE & SPECIFICATIONS -->
            <div class="bg-[#0F2A44] px-3.5 py-2">
              <span class="text-[11px] font-black uppercase tracking-wider text-white">Space &amp; Dimensions</span>
            </div>
            <div class="divide-y divide-slate-100 text-xs">
              <div class="p-2.5">
                <div class="text-[10px] font-bold uppercase text-slate-400 text-center mb-1">Covered Area / Plot Size</div>
                <div class="grid grid-cols-2 gap-2 text-center">
                  <div class="font-black text-xs text-[#0F2A44] bg-slate-50 p-2 rounded-lg">
                    {{ mobilePropA.areaText || ((mobilePropA.sqft ?? mobilePropA.area) ? `${(mobilePropA.sqft ?? mobilePropA.area).toLocaleString()} Sq Ft` : 'Standard') }}
                    <span v-if="mobilePropA.marla" class="text-slate-500 font-normal block text-[10px]">({{ mobilePropA.marla }})</span>
                  </div>
                  <div class="font-black text-xs text-[#0F2A44] bg-slate-50 p-2 rounded-lg">
                    {{ mobilePropB.areaText || ((mobilePropB.sqft ?? mobilePropB.area) ? `${(mobilePropB.sqft ?? mobilePropB.area).toLocaleString()} Sq Ft` : 'Standard') }}
                    <span v-if="mobilePropB.marla" class="text-slate-500 font-normal block text-[10px]">({{ mobilePropB.marla }})</span>
                  </div>
                </div>
              </div>

              <div class="p-2.5">
                <div class="text-[10px] font-bold uppercase text-slate-400 text-center mb-1">Bedrooms &amp; Baths</div>
                <div class="grid grid-cols-2 gap-2 text-center">
                  <div class="text-[11px] font-bold text-slate-800 bg-slate-50 p-2 rounded-lg">
                    <span v-if="mobilePropA.beds || mobilePropA.bedrooms">{{ mobilePropA.beds || mobilePropA.bedrooms }} Beds ({{ mobilePropA.baths || mobilePropA.bathrooms || 1 }} Baths)</span>
                    <span v-else class="text-slate-500">Plot Land / File</span>
                  </div>
                  <div class="text-[11px] font-bold text-slate-800 bg-slate-50 p-2 rounded-lg">
                    <span v-if="mobilePropB.beds || mobilePropB.bedrooms">{{ mobilePropB.beds || mobilePropB.bedrooms }} Beds ({{ mobilePropB.baths || mobilePropB.bathrooms || 1 }} Baths)</span>
                    <span v-else class="text-slate-500">Plot Land / File</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 4: ACTIONS -->
            <div class="p-3 bg-slate-50 border-t border-slate-200">
              <div class="text-[10px] font-bold uppercase text-slate-400 text-center mb-2">Direct Inquiries</div>
              <div class="grid grid-cols-2 gap-2.5">
                <div class="space-y-1.5">
                  <router-link
                    :to="`/property/${mobilePropA.slug}`"
                    class="block text-center py-2 px-1 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-[11px] rounded-xl transition-all shadow-xs"
                  >
                    View Details &rarr;
                  </router-link>
                  <a
                    :href="`https://wa.me/923349522157?text=${encodeURIComponent('Hello TopLinkers, I am inquiring about ' + mobilePropA.title + ' from the comparison tool.')}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-center py-2 px-1 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-[11px] rounded-xl transition-colors shadow-xs"
                  >
                    WhatsApp
                  </a>
                </div>

                <div class="space-y-1.5">
                  <router-link
                    :to="`/property/${mobilePropB.slug}`"
                    class="block text-center py-2 px-1 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-[11px] rounded-xl transition-all shadow-xs"
                  >
                    View Details &rarr;
                  </router-link>
                  <a
                    :href="`https://wa.me/923349522157?text=${encodeURIComponent('Hello TopLinkers, I am inquiring about ' + mobilePropB.title + ' from the comparison tool.')}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block text-center py-2 px-1 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-[11px] rounded-xl transition-colors shadow-xs"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4B. DESKTOP 4-COLUMN COMPARISON TABLE (hidden md:block) -->
        <div class="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <!-- Table Header Row -->
            <thead>
              <tr class="border-b border-gray-200 bg-slate-50/90">
                <th class="p-4 w-44 text-slate-400 font-extrabold uppercase text-[11px] align-top">
                  Comparison Metrics
                </th>
                <th
                  v-for="prop in compareProperties"
                  :key="`header-${prop.id}`"
                  class="p-4 min-w-[240px] max-w-[280px] align-top relative border-l border-gray-200"
                >
                  <div class="flex items-center justify-between gap-2 mb-1.5">
                    <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#0F2A44]/10 text-[#0F2A44]">
                      {{ prop.typeName || (prop.type === 'apartment' ? 'Apartment' : prop.type === 'plot' ? 'Plot' : 'Property') }}
                    </span>
                    <button
                      type="button"
                      @click="remove(prop.id)"
                      class="text-red-500 hover:text-red-700 text-xs font-bold inline-flex items-center gap-1"
                    >
                      <XMarkIcon class="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <h4 class="font-extrabold text-sm text-[#0F2A44] line-clamp-1 leading-snug">
                    {{ prop.title }}
                  </h4>
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <!-- SECTION 1: PRICE & TERMS -->
              <tr class="bg-slate-100/60 font-black text-slate-700 text-[11px] uppercase tracking-wider">
                <td :colspan="compareProperties.length + 1" class="py-2.5 px-4 bg-slate-100 text-[#0F2A44]">
                  Pricing, Installments &amp; Payment Mode
                </td>
              </tr>

              <!-- Demand Rate -->
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4 font-bold text-gray-600 uppercase text-[11px]">Total Demand / Price</td>
                <td
                  v-for="prop in compareProperties"
                  :key="'price-' + prop.id"
                  class="p-4 font-extrabold text-base text-[#16B4E8] border-l border-gray-200"
                >
                  {{ prop.priceFormatted || ('PKR ' + prop.price?.toLocaleString()) }}
                </td>
              </tr>

              <!-- Price Per Sq Ft / Rate Basis -->
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4 font-bold text-gray-600 uppercase text-[11px]">Payment Basis</td>
                <td
                  v-for="prop in compareProperties"
                  :key="'rate-basis-' + prop.id"
                  class="p-4 border-l border-gray-200 font-semibold text-slate-700"
                >
                  {{ prop.pricePerSqft || (prop.type === 'plot' ? '100% Cash Registry Demarcation' : 'Standard Rate') }}
                </td>
              </tr>

              <!-- Payment Schedule & Down Payment -->
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4 font-bold text-gray-600 uppercase text-[11px]">Installment / Booking</td>
                <td
                  v-for="prop in compareProperties"
                  :key="'installment-' + prop.id"
                  class="p-4 border-l border-gray-200 font-bold"
                >
                  <span
                    class="px-2.5 py-1 rounded-full text-[11px] font-bold border inline-flex items-center gap-1"
                    :class="prop.pricePostfix?.includes('Booking') || /installment/i.test(prop.title)
                      ? 'bg-amber-50 text-amber-800 border-amber-200' 
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'"
                  >
                    <span>{{ prop.pricePostfix || (prop.type === 'plot' ? '100% Cash Demarcated' : 'Ready Possession Cash Transfer') }}</span>
                  </span>
                </td>
              </tr>

              <!-- SECTION 2: LOCATION & LEGAL -->
              <tr class="bg-slate-100/60 font-black text-slate-700 text-[11px] uppercase tracking-wider">
                <td :colspan="compareProperties.length + 1" class="py-2.5 px-4 bg-slate-100 text-[#0F2A44]">
                  Location, Society &amp; Verification
                </td>
              </tr>

              <!-- City / Region -->
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4 font-bold text-gray-600 uppercase text-[11px]">City / Region</td>
                <td
                  v-for="prop in compareProperties"
                  :key="'city-' + prop.id"
                  class="p-4 border-l border-gray-200 text-slate-800 font-bold"
                >
                  {{ prop.city }}
                </td>
              </tr>

              <!-- Sector / Society -->
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4 font-bold text-gray-600 uppercase text-[11px]">Society / Allotment</td>
                <td
                  v-for="prop in compareProperties"
                  :key="'soc-' + prop.id"
                  class="p-4 border-l border-gray-200 text-[#0F2A44] font-extrabold"
                >
                  {{ prop.society || prop.areaName || 'CDA Verified Sector' }}
                </td>
              </tr>

              <!-- Legal / Title Verification Status -->
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4 font-bold text-gray-600 uppercase text-[11px]">Legal &amp; NOC Status</td>
                <td
                  v-for="prop in compareProperties"
                  :key="'noc-' + prop.id"
                  class="p-4 border-l border-gray-200 font-bold text-emerald-700"
                >
                  <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[11px]">
                    {{ prop.type === 'plot' ? 'Moqa Ka Demarcated & Clean Title' : 'Allotment Letter / CDA Verified' }}
                  </span>
                </td>
              </tr>

              <!-- SECTION 3: LAYOUT & DIMENSIONS -->
              <tr class="bg-slate-100/60 font-black text-slate-700 text-[11px] uppercase tracking-wider">
                <td :colspan="compareProperties.length + 1" class="py-2.5 px-4 bg-slate-100 text-[#0F2A44]">
                  Space, Dimensions &amp; Architecture
                </td>
              </tr>

              <!-- Covered Area / Plot Size -->
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4 font-bold text-gray-600 uppercase text-[11px]">Covered / Plot Area</td>
                <td
                  v-for="prop in compareProperties"
                  :key="'area-' + prop.id"
                  class="p-4 border-l border-gray-200 text-[#0F2A44] font-black text-xs"
                >
                  {{ prop.areaText || ((prop.sqft ?? prop.area) ? `${(prop.sqft ?? prop.area).toLocaleString()} Sq Ft` : '') }}
                  <span v-if="prop.marla" class="text-slate-500 font-normal ml-1">({{ prop.marla }})</span>
                </td>
              </tr>

              <!-- Bedrooms -->
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4 font-bold text-gray-600 uppercase text-[11px]">Bedrooms</td>
                <td
                  v-for="prop in compareProperties"
                  :key="'beds-' + prop.id"
                  class="p-4 border-l border-gray-200 font-bold text-slate-800"
                >
                  {{ (prop.beds ?? prop.bedrooms) ? `${prop.beds ?? prop.bedrooms} Bedrooms` : 'Plot File / Open Land' }}
                </td>
              </tr>

              <!-- Bathrooms -->
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="p-4 font-bold text-gray-600 uppercase text-[11px]">Bathrooms</td>
                <td
                  v-for="prop in compareProperties"
                  :key="'baths-' + prop.id"
                  class="p-4 border-l border-gray-200 text-slate-700 font-medium"
                >
                  {{ (prop.baths ?? prop.bathrooms) ? `${prop.baths ?? prop.bathrooms} Attached Baths` : 'N/A' }}
                </td>
              </tr>

              <!-- SECTION 4: ACTIONS & CONSULTATION -->
              <tr class="bg-slate-50/90">
                <td class="p-4 font-bold text-gray-600 uppercase text-[11px] align-middle">
                  Direct Inquiries
                </td>
                <td
                  v-for="prop in compareProperties"
                  :key="'action-' + prop.id"
                  class="p-4 border-l border-gray-200"
                >
                  <div class="space-y-2">
                    <router-link
                      :to="`/property/${prop.slug}`"
                      class="block text-center py-2.5 px-3 bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs"
                    >
                      View Details &rarr;
                    </router-link>

                    <a
                      :href="`https://wa.me/923349522157?text=${encodeURIComponent('Hello TopLinkers, I am comparing ' + prop.title + ' on your website comparison tool and would like title verification and the latest price breakdown.')}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="block text-center py-2 px-3 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                    >
                      WhatsApp Inquire
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </template>

      <!-- 5. Empty State (When no properties selected) -->
      <div
        v-else
        class="bg-white rounded-3xl p-12 sm:p-16 text-center border border-gray-200 shadow-sm max-w-xl mx-auto"
      >
        <div class="inline-block px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-black uppercase tracking-wider mb-4 border border-slate-200">
          Comparison Queue Empty
        </div>
        <h3 class="text-xl font-black text-[#0F2A44] mb-2">No Properties Selected for Comparison</h3>
        <p class="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
          Easily pick flats, apartments, or plots from our visual catalog or choose one of the instant comparison presets above.
        </p>
        <div class="flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            @click="openPropertySelector()"
            class="px-6 py-3 bg-[#16B4E8] hover:bg-[#119fcb] text-white text-xs font-bold rounded-xl transition-all shadow"
          >
            <span>+ Open Visual Property Picker</span>
          </button>
          <button
            type="button"
            @click="loadPreset('flats')"
            class="px-5 py-3 bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Load Flats Preset
          </button>
        </div>
      </div>

      <!-- 6. Bottom Advisory Consultation Banner -->
      <div v-if="compareProperties.length" class="mt-8 bg-gradient-to-r from-[#0F2A44] to-[#12395d] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span class="inline-block text-[10px] font-black uppercase tracking-wider text-[#16B4E8] bg-[#16B4E8]/10 px-2.5 py-1 rounded-md mb-2">
            TopLinkers Advisory Service
          </span>
          <h3 class="text-xl sm:text-2xl font-black tracking-tight">Need expert guidance on this comparison?</h3>
          <p class="text-xs text-slate-300 mt-1 max-w-xl">
            Our Senior Property Consultants at Al Hameed Plaza G-11 Markaz will verify allotment transfer records, CDA NOC, and market capital appreciation for you.
          </p>
        </div>

        <div class="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            @click="queryModalOpen = true"
            class="px-5 py-3 rounded-xl bg-[#16B4E8] hover:bg-white hover:text-[#0F2A44] text-white font-bold text-xs uppercase tracking-wider transition-all shadow"
          >
            Send Online Query
          </button>
          <a
            href="tel:03349522157"
            class="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
          >
            Call: 0334-9522157
          </a>
        </div>
      </div>
    </div>

    <!-- ====================================================================== -->
    <!-- 7. VISUAL PROPERTY SELECTOR MODAL (MAKES SELECTING FLATS & PLOTS EASY) -->
    <!-- ====================================================================== -->
    <div
      v-if="isSelectorOpen"
      class="fixed inset-0 z-50 bg-[#07111D]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      @click.self="isSelectorOpen = false"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-scale-up">
        <!-- Modal Top Header -->
        <div class="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#16B4E8]/15 text-[#0F2A44] border border-[#16B4E8]/30">
                Visual Property Picker
              </span>
              <span class="text-xs font-bold text-slate-500">
                {{ ui.compareList.length }} / 4 Selected
              </span>
            </div>
            <h3 class="text-xl sm:text-2xl font-black text-[#0F2A44] tracking-tight">
              Select Apartments, Flats &amp; Plots
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">
              Click any property card to instantly add or remove it from your comparison.
            </p>
          </div>

          <button
            type="button"
            @click="isSelectorOpen = false"
            class="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center shadow-xs transition-colors"
            aria-label="Close property selector"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Filter & Search Controls Strip -->
        <div class="p-4 sm:p-5 border-b border-slate-100 bg-white space-y-3">
          <!-- Search Input -->
          <div class="relative">
            <MagnifyingGlassIcon class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              v-model="selectorSearch"
              type="text"
              placeholder="Search by title, sector, society (e.g. PHA, I-12, TopCity, Harsukh, Banu Hafeez)..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#16B4E8] bg-slate-50 focus:bg-white transition-colors"
            />
            <button
              v-if="selectorSearch"
              @click="selectorSearch = ''"
              class="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          </div>

          <!-- Category Filter Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              type="button"
              @click="selectorCategory = 'all'"
              class="px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap border"
              :class="selectorCategory === 'all' ? 'bg-[#0F2A44] text-white border-[#0F2A44]' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'"
            >
              All ({{ allAvailableProperties.length }})
            </button>

            <button
              type="button"
              @click="selectorCategory = 'flats'"
              class="px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap border flex items-center gap-1.5"
              :class="selectorCategory === 'flats' ? 'bg-[#0F2A44] text-white border-[#0F2A44]' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'"
            >
              <span>Flats &amp; Apartments</span>
              <span class="px-1.5 py-0.2 rounded text-[10px]" :class="selectorCategory === 'flats' ? 'bg-white/20' : 'bg-slate-200'">
                {{ countByCategory('flats') }}
              </span>
            </button>

            <button
              type="button"
              @click="selectorCategory = 'plots'"
              class="px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap border flex items-center gap-1.5"
              :class="selectorCategory === 'plots' ? 'bg-[#0F2A44] text-white border-[#0F2A44]' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'"
            >
              <span>Plots &amp; Land</span>
              <span class="px-1.5 py-0.2 rounded text-[10px]" :class="selectorCategory === 'plots' ? 'bg-white/20' : 'bg-slate-200'">
                {{ countByCategory('plots') }}
              </span>
            </button>

            <button
              type="button"
              @click="selectorCategory = 'villas'"
              class="px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap border flex items-center gap-1.5"
              :class="selectorCategory === 'villas' ? 'bg-[#0F2A44] text-white border-[#0F2A44]' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'"
            >
              <span>Houses &amp; Villas</span>
              <span class="px-1.5 py-0.2 rounded text-[10px]" :class="selectorCategory === 'villas' ? 'bg-white/20' : 'bg-slate-200'">
                {{ countByCategory('villas') }}
              </span>
            </button>
          </div>
        </div>

        <!-- Scrollable Properties Grid -->
        <div class="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50">
          <div v-if="filteredSelectorProperties.length === 0" class="text-center py-12 text-slate-400">
            <p class="text-sm font-bold">No properties matched your search.</p>
            <button @click="selectorSearch = ''; selectorCategory = 'all'" class="text-xs text-[#16B4E8] font-bold mt-1">
              Reset Filters
            </button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="item in filteredSelectorProperties"
              :key="item.id"
              @click="toggleSelection(item)"
              class="bg-white rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden p-3.5 flex flex-col justify-between group relative"
              :class="isSelected(item.id) 
                ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20 bg-emerald-50/10' 
                : 'border-slate-200 hover:border-[#16B4E8] hover:shadow-md'"
            >
              <!-- Selected Overlay Badge -->
              <div
                v-if="isSelected(item.id)"
                class="absolute top-2.5 right-2.5 z-10 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md"
              >
                Selected
              </div>

              <div>
                <!-- Property Image -->
                <div class="relative h-32 rounded-xl overflow-hidden bg-slate-100 mb-2.5">
                  <img
                    :src="getPropertyImage(item)"
                    :alt="item.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                  <span class="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#0F2A44]/90 backdrop-blur-xs text-white shadow">
                    {{ item.typeName || (item.type === 'apartment' ? 'Apartment' : item.type === 'plot' ? 'Plot' : 'Property') }}
                  </span>
                </div>

                <!-- Title & Location -->
                <h4 class="font-extrabold text-xs text-[#0F2A44] line-clamp-2 leading-snug mb-1 group-hover:text-[#16B4E8] transition-colors">
                  {{ item.title }}
                </h4>
                <p class="text-[11px] text-slate-500 truncate mb-2">
                  {{ item.society || item.address || item.city }}
                </p>

                <!-- Specs Tags -->
                <div class="flex items-center gap-1.5 text-[10px] text-slate-600 font-bold mb-3 flex-wrap">
                  <span v-if="item.sqft || item.area" class="px-1.5 py-0.5 rounded bg-slate-100">
                    {{ (item.sqft || item.area).toLocaleString() }} Sq Ft
                  </span>
                  <span v-if="item.beds" class="px-1.5 py-0.5 rounded bg-slate-100">
                    {{ item.beds }} Beds
                  </span>
                  <span v-if="item.marla" class="px-1.5 py-0.5 rounded bg-slate-100">
                    {{ item.marla }}
                  </span>
                </div>
              </div>

              <!-- Price & Toggle Button -->
              <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span class="text-xs font-black text-[#16B4E8]">
                  {{ item.priceFormatted || `PKR ${item.price?.toLocaleString()}` }}
                </span>

                <button
                  type="button"
                  @click.stop="toggleSelection(item)"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                  :class="isSelected(item.id)
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-[#0F2A44] hover:bg-[#16B4E8] text-white'"
                >
                  <span v-if="isSelected(item.id)">Remove</span>
                  <span v-else>+ Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Bottom Sticky Dock -->
        <div class="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-slate-700">Currently Comparing:</span>
            <span class="font-black text-sm text-[#0F2A44]">
              {{ ui.compareList.length }} of 4 Selected
            </span>
          </div>

          <div class="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              v-if="ui.compareList.length"
              type="button"
              @click="clearAll"
              class="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Clear All
            </button>

            <button
              type="button"
              @click="isSelectorOpen = false"
              class="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-black uppercase tracking-wider transition-all shadow"
            >
              View Comparison Matrix &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 8. Inquiry Query Modal -->
    <div
      v-if="queryModalOpen"
      class="fixed inset-0 z-50 bg-[#07111D]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      @click.self="queryModalOpen = false"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 animate-scale-up">
        <div class="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 class="text-lg font-black text-[#0F2A44]">Inquire on Comparison</h3>
            <p class="text-xs text-gray-500 mt-0.5">We will send full breakdown and demarcation details</p>
          </div>
          <button
            type="button"
            @click="queryModalOpen = false"
            class="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="submitComparisonQuery" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Your Full Name *</label>
            <input
              v-model="queryForm.name"
              type="text"
              required
              placeholder="e.g. Malik Jahangir"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8]"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone / WhatsApp *</label>
            <input
              v-model="queryForm.phone"
              type="tel"
              required
              placeholder="0334-9522157 or 0332-4004884"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8]"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email (Optional)</label>
            <input
              v-model="queryForm.email"
              type="email"
              placeholder="name@gmail.com"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8]"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Notes / Requirements</label>
            <textarea
              v-model="queryForm.message"
              rows="3"
              placeholder="e.g. Any special questions regarding installment schedule, down payment, or title check..."
              class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8]"
            ></textarea>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              @click="queryModalOpen = false"
              class="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="querySubmitting"
              class="px-6 py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow"
            >
              {{ querySubmitting ? 'Sending Query...' : 'Submit Inquiry' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {
  PlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'
import { usePropertiesStore } from '../stores/properties'
import { useUiStore } from '../stores/ui'
import { useAdminStore } from '../stores/admin'

const propertiesStore = usePropertiesStore()
const ui = useUiStore()
const adminStore = useAdminStore()

const activePresetMode = ref('flats')

// Visual Property Selector State
const isSelectorOpen = ref(false)
const selectorCategory = ref('flats')
const selectorSearch = ref('')
const swapTargetId = ref(null)

// Inquiry modal state
const queryModalOpen = ref(false)
const querySubmitting = ref(false)
const queryForm = ref({
  name: '',
  phone: '',
  email: '',
  message: ''
})

const allAvailableProperties = computed(() => {
  return propertiesStore.properties || []
})

const getPropertyImage = (prop) => {
  if (Array.isArray(prop?.images) && prop.images.length > 0 && prop.images[0]) return prop.images[0]
  if (prop?.image) return prop.image
  if (prop?.photo) return prop.photo
  return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
}

const compareProperties = computed(() => {
  return allAvailableProperties.value.filter(p => ui.compareList.includes(p.id))
})

// Mobile Side-by-Side Comparison Pair state (fits 100% on mobile without horizontal scroll)
const mobileItemAIdx = ref(0)
const mobileItemBIdx = ref(1)

const mobilePropA = computed(() => {
  if (!compareProperties.value.length) return null
  return compareProperties.value[mobileItemAIdx.value] || compareProperties.value[0] || null
})

const mobilePropB = computed(() => {
  if (compareProperties.value.length <= 1) return null
  const idx = mobileItemBIdx.value >= compareProperties.value.length ? 1 : mobileItemBIdx.value
  return compareProperties.value[idx] || compareProperties.value[1] || null
})

const setMobilePair = (idxA, idxB) => {
  mobileItemAIdx.value = idxA
  mobileItemBIdx.value = idxB
}

const mobileAvailablePairs = computed(() => {
  const list = compareProperties.value
  if (list.length < 2) return []
  const pairs = []
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      pairs.push({
        idxA: i,
        idxB: j,
        label: `#${i + 1} vs #${j + 1}`
      })
    }
  }
  return pairs
})

watch(compareProperties, (newProps) => {
  if (newProps.length === 0) return
  if (mobileItemAIdx.value >= newProps.length) mobileItemAIdx.value = 0
  if (mobileItemBIdx.value >= newProps.length) mobileItemBIdx.value = Math.min(1, newProps.length - 1)
  if (mobileItemAIdx.value === mobileItemBIdx.value && newProps.length > 1) {
    mobileItemBIdx.value = (mobileItemAIdx.value + 1) % newProps.length
  }
})

const isSelected = (id) => {
  return ui.compareList.includes(id)
}

const countByCategory = (cat) => {
  if (cat === 'flats') {
    return allAvailableProperties.value.filter(p => ['apartment', 'penthouse', 'suite'].includes(p.type) || /flat|suite|apartment/i.test(`${p.title} ${p.typeName}`)).length
  }
  if (cat === 'plots') {
    return allAvailableProperties.value.filter(p => p.type === 'plot' || /plot|marla|kanal/i.test(`${p.title} ${p.typeName}`)).length
  }
  if (cat === 'villas') {
    return allAvailableProperties.value.filter(p => ['house', 'villa'].includes(p.type) || /villa|house|turnkey/i.test(`${p.title} ${p.typeName}`)).length
  }
  return allAvailableProperties.value.length
}

const filteredSelectorProperties = computed(() => {
  let list = allAvailableProperties.value

  // Category filter
  if (selectorCategory.value === 'flats') {
    list = list.filter(p => ['apartment', 'penthouse', 'suite'].includes(p.type) || /flat|suite|apartment/i.test(`${p.title} ${p.typeName}`))
  } else if (selectorCategory.value === 'plots') {
    list = list.filter(p => p.type === 'plot' || /plot|marla|kanal/i.test(`${p.title} ${p.typeName}`))
  } else if (selectorCategory.value === 'villas') {
    list = list.filter(p => ['house', 'villa'].includes(p.type) || /villa|house|turnkey/i.test(`${p.title} ${p.typeName}`))
  }

  // Search keyword filter
  if (selectorSearch.value && selectorSearch.value.trim()) {
    const q = selectorSearch.value.toLowerCase().trim()
    list = list.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.address?.toLowerCase().includes(q) ||
      p.society?.toLowerCase().includes(q) ||
      p.city?.toLowerCase().includes(q) ||
      p.typeName?.toLowerCase().includes(q)
    )
  }

  return list
})

const openPropertySelector = (targetId = null) => {
  swapTargetId.value = targetId
  // Auto-set the category tab based on current preset or target
  if (activePresetMode.value === 'plots') {
    selectorCategory.value = 'plots'
  } else {
    selectorCategory.value = 'flats'
  }
  selectorSearch.value = ''
  isSelectorOpen.value = true
}

const toggleSelection = (property) => {
  if (swapTargetId.value) {
    // Swap operation: replace target with new selection
    const targetIdx = ui.compareList.indexOf(swapTargetId.value)
    if (targetIdx > -1) {
      ui.compareList[targetIdx] = property.id
      swapTargetId.value = null
      isSelectorOpen.value = false
      return
    }
  }

  ui.toggleCompare(property)
}

const loadPreset = (mode) => {
  activePresetMode.value = mode
  let pool = []
  if (mode === 'flats') {
    pool = allAvailableProperties.value.filter(p => ['apartment', 'penthouse', 'suite'].includes(p.type) || /flat|suite|apartment/i.test(`${p.title} ${p.typeName}`))
  } else if (mode === 'plots') {
    pool = allAvailableProperties.value.filter(p => p.type === 'plot' || /plot|marla|kanal/i.test(`${p.title} ${p.typeName}`))
  } else if (mode === 'harsukh') {
    pool = allAvailableProperties.value.filter(p => /harsukh|h&r|suite/i.test(`${p.title} ${p.slug}`))
  } else if (mode === 'villas') {
    pool = allAvailableProperties.value.filter(p => ['house', 'villa'].includes(p.type) || /villa|house|turnkey/i.test(`${p.title} ${p.typeName}`))
  }

  const chosen = (pool.length >= 2 ? pool : allAvailableProperties.value).slice(0, 4)
  if (!chosen.length) return
  ui.compareList = chosen.map(p => p.id)
  try {
    localStorage.setItem('toplinkers_compare', JSON.stringify(ui.compareList))
  } catch (e) {}
}

const remove = (id) => {
  ui.toggleCompare(id)
}

const clearAll = () => {
  ui.compareList = []
  try {
    localStorage.removeItem('toplinkers_compare')
  } catch (e) {}
}

const submitComparisonQuery = async () => {
  querySubmitting.value = true
  const comparedTitles = compareProperties.value.map(p => p.title).join(' vs ')
  const leadData = {
    name: queryForm.value.name,
    phone: queryForm.value.phone,
    email: queryForm.value.email || '',
    city: 'Islamabad (Comparison Inquirer)',
    division: 'Comparison',
    project: comparedTitles || 'Flats & Plots Comparison',
    budget: 'Comparison Consultation',
    notes: queryForm.value.message || 'Client inquired via Compare Flats & Plots tool.',
    source: 'Compare Flats & Plots Page'
  }

  try {
    await adminStore.addLead(leadData)
  } catch (e) {}

  querySubmitting.value = false
  queryModalOpen.value = false
  queryForm.value = { name: '', phone: '', email: '', message: '' }

  ui.addToast({
    type: 'success',
    title: 'Inquiry Received',
    message: 'Thank you! Our property advisory team will review your comparison and call you shortly.'
  })
}

onMounted(async () => {
  document.title = 'Compare Flats & Plots | TopLinkers Real Estate Pakistan'
  if (propertiesStore.properties.length === 0) {
    await propertiesStore.fetchProperties()
  }
  if (ui.compareList.length === 0 && allAvailableProperties.value.length >= 2) {
    loadPreset('flats')
  }
})
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
  animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
