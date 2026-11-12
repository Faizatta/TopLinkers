<template>
  <section class="max-w-[1280px] mx-auto px-4 mt-8 sm:mt-12">
    <router-link
      to="/hr-sukh"
      class="group block relative overflow-hidden bg-gradient-to-r from-[#0F2A44] via-[#163a5e] to-[#0F2A44] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl border border-[#16B4E8]/30 hover:border-[#16B4E8] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(22,180,232,0.25)] hover:-translate-y-0.5"
    >
      <!-- Background subtle misty pine image overlay with gradient -->
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        alt="Nathia Gali Pines"
        loading="lazy"
        decoding="async"
        width="600"
        height="120"
        class="absolute right-0 inset-y-0 w-2/5 md:w-1/2 object-cover object-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-700 pointer-events-none"
      />

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div class="flex items-start sm:items-center gap-4">
          <!-- Thumbnail with Hot Pulse -->
          <div class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gray-900 border border-white/20 flex-shrink-0 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80"
              alt="Harsukh Residencies"
              loading="lazy"
              decoding="async"
              width="80"
              height="80"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <span class="absolute top-1 left-1 bg-[#E53935] text-white text-[8px] font-black uppercase px-1.5 py-0.2 rounded shadow">
              HOT
            </span>
          </div>

          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="bg-[#E53935] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                TOP SPOTLIGHT PROJECT
              </span>
              <span class="text-xs text-[#16B4E8] font-bold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8] animate-ping"></span>
                <span>Kuza Gali • Nathia Gali</span>
              </span>
            </div>

            <h3 class="text-lg sm:text-2xl font-black text-white group-hover:text-[#16B4E8] transition-colors tracking-tight">
              Harsukh Residencies — Luxury Hillside Vacation &amp; High-Yield Flats
            </h3>

            <p class="text-xs sm:text-sm text-gray-200 font-medium line-clamp-1 max-w-2xl">
              <strong class="text-amber-300 font-bold">"Vacation in the Clouds, Earn While You Sleep"</strong> &bull; 15% Down Payment &bull; 3-Year Installments &bull; 20%+ Annual Tourist Rental Return.
            </p>
          </div>
        </div>

        <!-- CTA Pill Button -->
        <div class="flex items-center gap-3 self-start md:self-center flex-shrink-0">
          <div class="px-5 sm:px-6 py-3 bg-[#16B4E8] group-hover:bg-white text-[#0F2A44] text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2">
            <span>Explore Project &amp; Prices</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </div>
        </div>
      </div>
    </router-link>
  </section>
</template>

<script setup>
</script>
