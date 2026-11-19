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

    <!-- 1. Hero Cover Banner with Atmospheric Backdrop (Harsukh-Style) -->
    <div class="relative min-h-[500px] sm:h-[540px] md:h-[600px] bg-gray-900 overflow-hidden flex items-end">
      <img
        src="/images/hero-real-estate.webp"
        alt="Real Estate Advisory & Verified Brokerage Islamabad"
        class="absolute inset-0 block w-full h-full object-cover transform scale-105"
        loading="eager"
        fetchpriority="high"
      />
      <!-- Dramatic Atmospheric Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/75 to-[#0F2A44]/35"></div>

      <!-- Hero Header Content -->
      <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-10 sm:pb-16 w-full text-white z-10">
        <div class="max-w-3xl space-y-3.5">
          <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span class="bg-[#16B4E8] text-[#0F2A44] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              TOPLINKERS PORTFOLIO
            </span>
            <span class="bg-[#10B981] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              RESIDENTIAL &amp; COMMERCIAL
            </span>
            <span class="bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              100% VERIFIED TITLE
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Real Estate Advisory &amp; Verified Brokerage Islamabad
          </h1>

          <p class="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl font-medium">
            Operating from Al Hameed Plaza, G-11 Markaz, Top Linkers provides institutional <strong class="text-white">CDA and RDA title diligence</strong>, biometric transfer coordination, and transparent commercial &amp; residential portfolio management.
          </p>

          <!-- Direct Actions -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <a
              href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20Real%20Estate%20Advisory%20and%20Verified%20Properties."
              target="_blank"
              class="px-6 sm:px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Instant WhatsApp Advisory</span>
            </a>

            <router-link
              to="/listings"
              class="px-6 sm:px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl border border-white/20 transition-all flex items-center justify-center"
            >
              Browse Active Inventory
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Floating 4-Metric Fast-Facts Highlights Dock (Harsukh-Style Overlapping Bar) -->
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 bg-white rounded-2xl p-3.5 sm:p-6 shadow-xl border border-gray-100 mb-8 sm:mb-12">
        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Verified Inventory</span>
          <span class="text-base sm:text-2xl font-black text-[#16B4E8] block mt-0.5">500+ Assets</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">100% Legal Ownership</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Core Sectors</span>
          <span class="text-base sm:text-2xl font-black text-emerald-600 block mt-0.5">I-12, I-16, TopCity</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">G-11 Markaz Advisory</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">High-ROI Assets</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">18–25% Yield</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Vacation Mountain Suites</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Legal Diligence</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">Zero File Traps</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Biometric Registry Transfer</span>
        </div>
      </div>
    </div>

    <!-- Core Services Breakdown -->
    <main class="max-w-[1280px] mx-auto px-4 pb-16">
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
                <a href="mailto:toplinkers69@gmail.com" class="hover:text-[#16B4E8]">toplinkers69@gmail.com</a>
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
import { computed } from 'vue'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()
const faqs = computed(() => adminStore.getFaqsByService('real-estate'))
</script>
