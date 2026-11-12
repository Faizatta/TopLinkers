<template>
  <section class="py-16 md:py-20 bg-white">
    <div class="max-w-[1280px] mx-auto px-4">
      <!-- Full-width rounded banner with dark photo background & overlay -->
      <div
        class="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center text-white shadow-2xl bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80');"
      >
        <!-- Dark Navy Overlay -->
        <div class="absolute inset-0 bg-[#0F2A44]/90 backdrop-blur-xs"></div>

        <div class="relative z-10 max-w-2xl mx-auto space-y-4">
          <span class="text-xs font-black uppercase tracking-widest text-[#16B4E8]">
            TOPLINKERS REAL ESTATE ADVISORY
          </span>

          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Ready To Find Your Dream Home in Pakistan?
          </h2>

          <p class="text-xs sm:text-sm text-gray-200 font-light leading-relaxed max-w-xl mx-auto">
            Speak directly with our authorized consultants in Opal Square, Gulberg Islamabad for ready PHA flats, Faisal Town Phase 2, TopCity-1, and turnkey construction quotes.
          </p>

          <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
            <router-link
              to="/listings"
              class="btn-arrow-slide px-8 py-3.5 bg-[#16B4E8] hover:bg-[#119ecf] text-white text-xs font-black uppercase tracking-wider rounded-[4px] shadow-lg transition-all flex items-center group"
            >
              <span>Start Exploring</span>
              <svg class="arrow-icon w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>

            <a
              href="https://wa.me/923235963375"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-[4px] shadow transition-colors flex items-center gap-2"
            >
              <span>WhatsApp Us: 0323-5963375</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
