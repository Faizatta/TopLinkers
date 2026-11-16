<template>
  <div class="service-detail-page pt-20 bg-[#F6F8FA]">
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
    <header class="bg-[#0F2A44] text-white py-14 md:py-20">
      <div class="max-w-[1280px] mx-auto px-4 text-center">
        <span class="text-xs font-black uppercase tracking-widest text-[#16B4E8] block mb-2">
          GOVERNMENT &amp; LUXURY APARTMENTS
        </span>
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight">
          PHA Apartments &amp; Luxury Vacation Suites Islamabad
        </h1>
        <p class="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
          Authorized deals in Pakistan Housing Authority (PHA) Sector I-12 and I-16 residential apartments, plus high-yield Harsukh Residencies alpine vacation suites in Nathia Gali.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link
            to="/listings?type=Flat"
            class="bg-[#16B4E8] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#1199c7] transition shadow-md text-sm"
          >
            Browse Available Apartments
          </router-link>
          <router-link
            to="/hr-sukh"
            class="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-xl transition text-sm border border-white/20"
          >
            Harsukh Nathia Gali Suites
          </router-link>
        </div>
      </div>
    </header>

    <!-- Content Section -->
    <main class="max-w-[1280px] mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article class="lg:col-span-2 space-y-10">
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-2xl font-bold text-[#0F2A44] mb-4">Affordable Government Flats &amp; Mountain Suites</h2>
            <p class="text-gray-600 leading-relaxed text-sm mb-4">
              Apartment living in Islamabad provides unparalleled security, minimal maintenance overhead, and rapid capital appreciation. Top Linkers is a recognized market authority for Pakistan Housing Authority (PHA) federal apartments in Sectors I-12 and I-16, catering to government officers, private sector professionals, and overseas investors.
            </p>
            <p class="text-gray-600 leading-relaxed text-sm">
              For lifestyle luxury and passive tourism revenue, our flagship Harsukh Residencies project in Nathia Gali delivers 20%+ annual rental yields managed by international hospitality operators.
            </p>
          </section>

          <!-- Core Apartment Categories -->
          <section class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#16B4E8]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">PHA Sector I-12 Apartments</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                Modern 2-bed and 3-bed family apartments located directly off Islamabad Expressway. Gated community with dedicated elevator towers and backup generators.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#0F2A44]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">PHA Sector I-16 Apartments</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                Budget-friendly executive apartments with easy quarterly installment transfers. Ideal entry-level investment with high rental occupancy.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#6CC24A]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">Harsukh Residencies Nathia Gali</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                Luxury alpine holiday suites at 8,200 ft elevation. Fully furnished 1 &amp; 2-bed chalets with central heating, infinity balconies, and 3-year installment plans.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#E53935]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">Banu Hafeez Luxury Suites</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                High-end modern apartments in central urban locations with subterranean parking, gymnasiums, and round-the-clock facility maintenance.
              </p>
            </div>
          </section>

          <!-- FAQs -->
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-xl font-bold text-[#0F2A44] mb-6">Frequently Asked Questions</h2>
            <div class="space-y-4">
              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">What is the transfer process for PHA flats?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Transfer takes place directly at the Ministry of Housing &amp; Works / PHA Foundation headquarters in Islamabad following biometric clearance and NDC issuance.
                </p>
              </div>
              <div>
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">Can I generate rental income from Harsukh suites?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Yes, Harsukh offers an optional managed rental pool where your suite is leased to vacation travelers, delivering guaranteed seasonal returns credited to your bank.
                </p>
              </div>
            </div>
          </section>
        </article>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="bg-[#0F2A44] text-white p-6 rounded-2xl shadow-md">
            <h3 class="font-extrabold text-lg text-white mb-2">Inquire About Apartments</h3>
            <p class="text-xs text-gray-300 mb-6 leading-relaxed">
              Contact our apartment desk for latest floor plans, floor-wise pricing, and installment payment schedules.
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
              Get Apartment Brochure
            </router-link>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
</script>
