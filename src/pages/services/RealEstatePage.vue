<template>
  <div class="service-detail-page pt-20 bg-[#F6F8FA]">
    <!-- Breadcrumb Bar -->
    <nav aria-label="Breadcrumb" class="bg-white border-b border-gray-200 py-3">
      <div class="max-w-[1280px] mx-auto px-4 flex items-center gap-2 text-xs text-gray-500">
        <router-link to="/" class="hover:text-[#16B4E8] font-medium">Home</router-link>
        <span>/</span>
        <router-link to="/services" class="hover:text-[#16B4E8] font-medium">Services</router-link>
        <span>/</span>
        <span class="text-[#0F2A44] font-bold">Real Estate Advisory</span>
      </div>
    </nav>

    <!-- Hero Header -->
    <header class="bg-[#0F2A44] text-white py-14 md:py-20">
      <div class="max-w-[1280px] mx-auto px-4 text-center">
        <span class="text-xs font-black uppercase tracking-widest text-[#16B4E8] block mb-2">
          PROPERTY DESK &amp; PORTFOLIO CONSULTING
        </span>
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight">
          Real Estate Advisory &amp; Verified Brokerage Islamabad
        </h1>
        <p class="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
          Operating from Al Hameed Plaza, G-11 Markaz, Top Linkers provides institutional CDA and RDA title diligence, biometric transfer coordination, and transparent commercial &amp; residential portfolio management.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link
            to="/listings"
            class="bg-[#16B4E8] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#1199c7] transition shadow-md text-sm"
          >
            Browse Verified Properties
          </router-link>
          <router-link
            to="/contact"
            class="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-xl transition text-sm border border-white/20"
          >
            Speak with Syed Usman Hammad
          </router-link>
        </div>
      </div>
    </header>

    <!-- Core Services Breakdown -->
    <main class="max-w-[1280px] mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content (2 cols) -->
        <article class="lg:col-span-2 space-y-10">
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-2xl font-bold text-[#0F2A44] mb-4">Institutional Real Estate Diligence</h2>
            <p class="text-gray-600 leading-relaxed text-sm mb-4">
              Real estate acquisition in the Islamabad-Rawalpindi metropolitan region demands absolute legal diligence. From Capital Development Authority (CDA) sector transfers in G-11, F-10, and I-12 to Rawalpindi Development Authority (RDA) private housing societies, Top Linkers operates a dedicated verification desk.
            </p>
            <p class="text-gray-600 leading-relaxed text-sm">
              We eliminate non-possession file traps, verify land registry records (Fard, Intiqal, Allotment Letters), and ensure biometric verification is completed securely at the respective registrar offices.
            </p>
          </section>

          <!-- Core Real Estate Capabilities -->
          <section class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#16B4E8]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">CDA / RDA Sector Transfer Verification</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                Verification of non-encumbrance certificates (NEC), legal title chain, and complete outstanding dues reconciliation before funds transfer.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#0F2A44]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">Overseas Investor Concierge</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                Complete remote transaction handling for overseas Pakistanis in the UK, USA, Gulf, and Europe with embassy power-of-attorney execution.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#6CC24A]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">Commercial Plaza &amp; Retail Leasing</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                High-yield commercial shops, corporate office floors, and institutional tenant management in G-11 Markaz, Blue Area, and TopCity-1.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#E53935]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">Moqa Ka Plot Cash Possession</h3>
              <p class="text-xs text-gray-600 leading-relaxed">
                Direct on-ground demarcated plots with immediate building permission, ready utility infrastructure, and clear seller title.
              </p>
            </div>
          </section>

          <!-- Frequently Asked Questions -->
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-xl font-bold text-[#0F2A44] mb-6">Frequently Asked Questions</h2>
            <div class="space-y-4">
              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">How does TopLinkers verify CDA property documents?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  We cross-examine the original allotment letter, transfer letters, payment challans, and computerized CDA records to confirm genuine ownership and zero litigation.
                </p>
              </div>
              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">What are the agency commission terms for property sales?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  We operate with standard Islamabad Real Estate Association guidelines (1% standard brokerage on residential and commercial transactions) with zero hidden markups.
                </p>
              </div>
              <div>
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">Can overseas Pakistanis purchase property without traveling?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Yes, via attested Special Power of Attorney (SPA) from your local Pakistan Embassy/Consulate. Our corporate desk coordinates with the relevant authority.
                </p>
              </div>
            </div>
          </section>
        </article>

        <!-- Sidebar CTA (1 col) -->
        <aside class="space-y-6">
          <div class="bg-[#0F2A44] text-white p-6 rounded-2xl shadow-md">
            <h3 class="font-extrabold text-lg text-white mb-2">Book a Property Consultation</h3>
            <p class="text-xs text-gray-300 mb-6 leading-relaxed">
              Visit our head office in G-11 Markaz or request a callback with our senior advisory team.
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
              <div class="flex items-center gap-2">
                <span class="text-[#16B4E8]">✉️</span>
                <a href="mailto:toplinkers12@gmail.com" class="hover:text-[#16B4E8]">toplinkers12@gmail.com</a>
              </div>
            </div>
            <router-link
              to="/contact"
              class="w-full block text-center bg-[#16B4E8] hover:bg-[#1199c7] text-white font-bold py-3 rounded-xl transition text-xs"
            >
              Contact Advisory Desk
            </router-link>
          </div>

          <!-- Other Services Quick Links -->
          <div class="bg-white p-6 rounded-2xl border border-gray-200">
            <h4 class="font-bold text-sm text-[#0F2A44] mb-3">Explore Specialized Portfolios</h4>
            <ul class="space-y-2 text-xs">
              <li>
                <router-link to="/services/residential-plots" class="text-gray-600 hover:text-[#16B4E8] flex items-center justify-between">
                  <span>Residential &amp; Commercial Plots</span>
                  <span>→</span>
                </router-link>
              </li>
              <li>
                <router-link to="/services/apartments-flats" class="text-gray-600 hover:text-[#16B4E8] flex items-center justify-between">
                  <span>PHA Flats &amp; Luxury Suites</span>
                  <span>→</span>
                </router-link>
              </li>
              <li>
                <router-link to="/services/construction" class="text-gray-600 hover:text-[#16B4E8] flex items-center justify-between">
                  <span>Turnkey House Construction</span>
                  <span>→</span>
                </router-link>
              </li>
              <li>
                <router-link to="/services/solar" class="text-gray-600 hover:text-[#16B4E8] flex items-center justify-between">
                  <span>Tier-1 Solar Net Metering</span>
                  <span>→</span>
                </router-link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
// SEO and metadata handled via vue-router updateSEOMeta
</script>
