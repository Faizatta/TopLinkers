<template>
  <div class="service-detail-page pt-20 bg-[#F6F8FA]">
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
    <header class="bg-[#0F2A44] text-white py-14 md:py-20">
      <div class="max-w-[1280px] mx-auto px-4 text-center">
        <span class="text-xs font-black uppercase tracking-widest text-[#16B4E8] block mb-2">
          VERIFIED LAND &amp; SECTOR FILES
        </span>
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight">
          Residential &amp; Commercial Plots Islamabad &amp; Rawalpindi
        </h1>
        <p class="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
          Premium plots in TopCity-1, PECHS, Faisal Town Phase 2, and CDA Sectors with confirmed physical possession, utility clearance, and verified legal ownership.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link
            to="/listings?type=Plot"
            class="bg-[#16B4E8] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#1199c7] transition shadow-md text-sm"
          >
            Explore Plot Inventory
          </router-link>
          <router-link
            to="/contact"
            class="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-xl transition text-sm border border-white/20"
          >
            Request Rate Sheet
          </router-link>
        </div>
      </div>
    </header>

    <!-- Content Section -->
    <main class="max-w-[1280px] mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article class="lg:col-span-2 space-y-10">
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-2xl font-bold text-[#0F2A44] mb-4">Prime Plot Inventory with On-Ground Demarcation</h2>
            <p class="text-gray-600 leading-relaxed text-sm mb-4">
              Top Linkers manages a prime inventory of residential and commercial plots across Islamabad's highest-growth corridors. Whether you are building an immediate residence or seeking capital appreciation near the New Islamabad International Airport, our plots are verified for immediate registry and transfer.
            </p>
            <p class="text-gray-600 leading-relaxed text-sm">
              We specialize in cash possession "Moqa Ka Plot" deals where buyers receive instant on-ground possession, utility connection clearances, and verified boundary demarcation.
            </p>
          </section>

          <!-- Top Projects Grid -->
          <section class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#16B4E8]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">TopCity-1 (10 Marla &amp; 1 Kanal)</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                Direct access to Srinagar Highway and Airport Interchange. Fully developed blocks with underground electricity, gas, sewerage, and immediate house construction permissions.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#0F2A44]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">PECHS Islamabad (5, 7 &amp; 10 Marla)</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                Affordable, high-appreciation residential sectors with complete RDA approvals, paved road networks, and convenient proximity to CPEC Hakla Interchange.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#6CC24A]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">Faisal Town Phase 2</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                Flexible 4.5-year installment plans by Zedem International. High-liquidity files with verified computerized confirmation letters.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#E53935]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">CDA Developed Sectors</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                Direct owner files in G-11, G-13, G-14, and I-12 sectors with zero litigation, clean title records, and swift CDA headquarters transfers.
              </p>
            </div>
          </section>

          <!-- FAQs -->
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-xl font-bold text-[#0F2A44] mb-6">Frequently Asked Questions on Plot Buying</h2>
            <div class="space-y-4">
              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">What does "Moqa Ka Plot" mean?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  "Moqa Ka Plot" refers to land ready for physical possession immediately upon full payment, with boundary pillars installed and roads paved.
                </p>
              </div>
              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">Are there hidden transfer charges?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  No. We provide an exact upfront breakdown of societal transfer fee, CVT, stamp duty, FBR withholding taxes, and legal documentation costs.
                </p>
              </div>
            </div>
          </section>
        </article>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="bg-[#0F2A44] text-white p-6 rounded-2xl shadow-md">
            <h3 class="font-extrabold text-lg text-white mb-2">Inquire About Plots</h3>
            <p class="text-xs text-gray-300 mb-6 leading-relaxed">
              Get today's verified market rates and available plot numbers from our sales directors.
            </p>
            <div class="space-y-3 text-xs mb-6">
              <div class="flex items-center gap-2">
                <span class="text-[#16B4E8]">📍</span>
                <span>Al Hameed Plaza, G-11 Markaz, Islamabad</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#16B4E8]">📞</span>
                <a href="tel:+923349522157" class="hover:text-[#16B4E8] font-bold">+92-334-9522157</a>
              </div>
            </div>
            <router-link
              to="/contact"
              class="w-full block text-center bg-[#16B4E8] hover:bg-[#1199c7] text-white font-bold py-3 rounded-xl transition text-xs"
            >
              Get Plot Pricing
            </router-link>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
</script>
