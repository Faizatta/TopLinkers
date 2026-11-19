<template>
  <div class="service-detail-page pt-20 bg-[#F6F8FA]">
    <!-- Breadcrumb Bar -->
    <nav aria-label="Breadcrumb" class="bg-white border-b border-gray-200 py-3">
      <div class="max-w-[1280px] mx-auto px-4 flex items-center gap-2 text-xs text-gray-500">
        <router-link to="/" class="hover:text-[#16B4E8] font-medium">Home</router-link>
        <span>/</span>
        <router-link to="/services" class="hover:text-[#16B4E8] font-medium">Services</router-link>
        <span>/</span>
        <span class="text-[#0F2A44] font-bold">Solar Solutions &amp; Net Metering</span>
      </div>
    </nav>

    <!-- 1. Hero Cover Banner with Atmospheric Backdrop (Harsukh-Style) -->
    <div class="relative min-h-[500px] sm:h-[540px] md:h-[600px] bg-gray-900 overflow-hidden flex items-end">
      <img
        src="/images/hero-solar.webp"
        alt="Tier-1 Solar Net Metering & Energy Systems Islamabad"
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
            <span class="bg-[#6CC24A] text-[#0F2A44] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              IESCO-AUTHORIZED SOLAR
            </span>
            <span class="bg-[#16B4E8] text-[#0F2A44] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              TIER-1 N-TYPE BIFACIAL
            </span>
            <span class="bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              ZERO ELECTRICITY BILLS
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Tier-1 Solar Net Metering &amp; Energy Systems Islamabad
          </h1>

          <p class="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl font-medium">
            Authorized on-grid, hybrid, and commercial solar electrification (10kW to 50kW+) with <strong class="text-white">Tier-1 N-Type TOPCon bifacial panels</strong>, European smart inverters, and guaranteed <strong class="text-white">IESCO bidirectional green meter</strong> installation.
          </p>

          <!-- Direct Actions -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <a
              href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20a%20Solar%20Net%20Metering%20System."
              target="_blank"
              class="px-6 sm:px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Instant WhatsApp Solar Quote</span>
            </a>

            <router-link
              to="/contact"
              class="px-6 sm:px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl border border-white/20 transition-all flex items-center justify-center"
            >
              Calculate Solar Savings
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Floating 4-Metric Fast-Facts Highlights Dock (Harsukh-Style Overlapping Bar) -->
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 bg-white rounded-2xl p-3.5 sm:p-6 shadow-xl border border-gray-100 mb-8 sm:mb-12">
        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">System Capacities</span>
          <span class="text-base sm:text-2xl font-black text-[#6CC24A] block mt-0.5">5kW to 50kW+</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Residential &amp; Commercial</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">ROI Payback</span>
          <span class="text-base sm:text-2xl font-black text-emerald-600 block mt-0.5">2.5–3.5 Yrs</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Rapid Capital Return</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Panel Lifespan</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">25–30 Years</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Tier-1 Bifacial N-Type</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Net Metering</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">IESCO Green</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Bidirectional Meter Execution</span>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <main class="max-w-[1280px] mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article class="lg:col-span-2 space-y-10">
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-2xl font-bold text-[#0F2A44] mb-4">Eliminate High WAPDA Electricity Bills Permanently</h2>
            <p class="text-gray-600 leading-relaxed text-sm mb-4">
              With escalating peak-unit electricity tariffs and surcharges across Pakistan, investing in an engineered Tier-1 solar net metering system offers an investment payback period under 2.5 to 3 years. Top Linkers Solar is an authorized renewable energy engineering contractor operating throughout Islamabad and Rawalpindi.
            </p>
            <p class="text-gray-600 leading-relaxed text-sm">
              We handle the entire lifecycle: structural roof load assessment, solar array shadow analysis, Tier-1 N-Type TOPCon bifacial modules, smart on-grid inverters (Huawei, Sungrow, Growatt, Solis), IESCO net metering document approvals, and green bidirectional meter commissioning.
            </p>
          </section>

          <!-- Core Solar Capacities -->
          <section class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-t-4 border-t-[#16B4E8]">
              <span class="text-xs font-black text-[#16B4E8] uppercase tracking-wider block mb-1">Residential 5 Marla / 10 Marla</span>
              <h3 class="font-bold text-[#0F2A44] text-lg mb-2">10kW On-Grid System</h3>
              <ul class="text-xs text-gray-600 space-y-1.5 mb-4 leading-relaxed">
                <li>• 16x 580W-600W Tier-1 Panels</li>
                <li>• 10kW Three-Phase On-Grid Inverter</li>
                <li>• Average 1,200 – 1,400 units/month</li>
                <li>• Complete IESCO Net Metering</li>
              </ul>
              <span class="text-xs font-bold text-[#0F2A44] block">Saves PKR 70,000 – 90,000/mo</span>
            </div>

            <div class="bg-white p-6 rounded-xl border border-gray-200 border-t-4 border-t-[#6CC24A]">
              <span class="text-xs font-black text-[#6CC24A] uppercase tracking-wider block mb-1">Executive 1 Kanal Home</span>
              <h3 class="font-bold text-[#0F2A44] text-lg mb-2">20kW Hybrid / On-Grid</h3>
              <ul class="text-xs text-gray-600 space-y-1.5 mb-4 leading-relaxed">
                <li>• 32x 600W Tier-1 Bifacial Panels</li>
                <li>• 20kW Inverter + Smart Dongle</li>
                <li>• Average 2,400 – 2,800 units/month</li>
                <li>• Zero export limit or net metering</li>
              </ul>
              <span class="text-xs font-bold text-[#6CC24A] block">Saves PKR 150,000 – 190,000/mo</span>
            </div>

            <div class="bg-white p-6 rounded-xl border border-gray-200 border-t-4 border-t-[#0F2A44]">
              <span class="text-xs font-black text-[#0F2A44] uppercase tracking-wider block mb-1">Commercial Plaza / Factory</span>
              <h3 class="font-bold text-[#0F2A44] text-lg mb-2">50kW+ Commercial Solar</h3>
              <ul class="text-xs text-gray-600 space-y-1.5 mb-4 leading-relaxed">
                <li>• 85+ High-Efficiency Modules</li>
                <li>• 50kW Dual-MPPT Industrial Inverter</li>
                <li>• High-voltage switchgear &amp; surge arrestors</li>
                <li>• Sub-station coordination &amp; IESCO NOC</li>
              </ul>
              <span class="text-xs font-bold text-[#0F2A44] block">Commercial Corporate Tariff Offset</span>
            </div>
          </section>

          <!-- TopLinkers Certified Solar Engineering Leadership (Engr Asad Ur Rehman & Team) -->
          <section class="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <span class="text-[10px] font-black uppercase tracking-wider text-[#6CC24A] bg-emerald-50 px-2.5 py-1 rounded-md">
                  PEC REGISTERED TECHNICAL DIVISION
                </span>
                <h2 class="text-xl sm:text-2xl font-black text-[#0F2A44] mt-2">
                  Certified Solar &amp; Net-Metering Engineers
                </h2>
                <p class="text-xs text-slate-500 mt-1">
                  Direct engineering oversight for load calculation, tier-1 inverters, and IESCO green meter approvals.
                </p>
              </div>
              <router-link
                to="/team"
                class="text-xs font-bold text-[#16B4E8] hover:text-[#0F2A44] transition-colors flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Full Engineering Directory</span>
                <span>&rarr;</span>
              </router-link>
            </div>

            <!-- Engineers Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Engr. Asad Ur Rehman -->
              <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 border border-slate-200/90 hover:border-[#16B4E8] transition-all flex flex-col justify-between space-y-4 group">
                <div class="flex items-start gap-4">
                  <div class="relative flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                      alt="Engr. Asad Ur Rehman - Solar Engineer TopLinkers"
                      class="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                    />
                    <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center text-white" title="PEC Active">
                      <svg class="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    </span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <span class="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded inline-block mb-1">
                      PEC Registered Solar Eng.
                    </span>
                    <h3 class="text-base font-black text-[#0F2A44] leading-tight">
                      Engr. Asad Ur Rehman
                    </h3>
                    <p class="text-xs font-bold text-[#16B4E8] mt-0.5 leading-snug">
                      Lead Solar Energy &amp; Photovoltaic Systems Engineer
                    </p>
                    <span class="text-[11px] font-semibold text-slate-500 block mt-0.5">
                      9+ Years Experience &bull; Energy Storage Specialist
                    </span>
                  </div>
                </div>

                <p class="text-xs text-slate-600 leading-relaxed font-normal">
                  Leads solar PV plant electrical architecture, rooftop structural stress testing, battery storage synchronizations, and utility-scale IESCO net-metering grid clearances.
                </p>

                <!-- Actions -->
                <div class="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <a
                    href="https://wa.me/923324004884?text=Hello%20Engr.%20Asad%20Ur%20Rehman,%20I%20need%20solar%20net%20metering%20engineering%20consultation"
                    target="_blank"
                    class="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>WhatsApp Engr. Asad</span>
                  </a>
                  <a
                    href="tel:+923324004884"
                    class="px-3 py-2 rounded-xl border border-slate-300 hover:border-[#0F2A44] text-[#0F2A44] text-xs font-bold transition-colors"
                  >
                    Call
                  </a>
                </div>
              </div>

              <!-- Engr. Salman Qureshi -->
              <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 border border-slate-200/90 hover:border-[#16B4E8] transition-all flex flex-col justify-between space-y-4 group">
                <div class="flex items-start gap-4">
                  <div class="relative flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                      alt="Engr. Salman Qureshi - Solar Engineer TopLinkers"
                      class="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                    />
                    <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center text-white" title="PEC Active">
                      <svg class="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                    </span>
                  </div>

                  <div class="min-w-0 flex-1">
                    <span class="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded inline-block mb-1">
                      PEC &amp; AEDB Certified
                    </span>
                    <h3 class="text-base font-black text-[#0F2A44] leading-tight">
                      Engr. Salman Qureshi
                    </h3>
                    <p class="text-xs font-bold text-[#16B4E8] mt-0.5 leading-snug">
                      Lead Solar &amp; IESCO Net-Metering Engineer
                    </p>
                    <span class="text-[11px] font-semibold text-slate-500 block mt-0.5">
                      10+ Years Experience &bull; IESCO Liaison
                    </span>
                  </div>
                </div>

                <p class="text-xs text-slate-600 leading-relaxed font-normal">
                  Expert in 10kW to 50kW on-grid inverter commissioning (Huawei, Sungrow, Growatt), bi-directional green meter documentation, and sub-station approvals.
                </p>

                <!-- Actions -->
                <div class="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <a
                    href="https://wa.me/923324004884?text=Hello%20Engr.%20Salman%20Qureshi,%20I%20am%20inquiring%20about%20IESCO%20solar%20net%20metering"
                    target="_blank"
                    class="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>WhatsApp Engr. Salman</span>
                  </a>
                  <a
                    href="tel:+923324004884"
                    class="px-3 py-2 rounded-xl border border-slate-300 hover:border-[#0F2A44] text-[#0F2A44] text-xs font-bold transition-colors"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- FAQs -->
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-xl font-bold text-[#0F2A44] mb-6">Frequently Asked Questions on Solar Net Metering</h2>
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
          <div class="bg-[#0F2A44] text-white p-6 rounded-2xl shadow-md">
            <h3 class="font-extrabold text-lg text-white mb-2">Request Solar Energy Audit</h3>
            <p class="text-xs text-gray-300 mb-6 leading-relaxed">
              Send a copy of your recent electricity bill to calculate your optimal system kilowatt rating and annual financial return.
            </p>
            <div class="space-y-3 text-xs mb-6">
              <div class="flex items-center gap-2">
                <MapPinIcon class="w-4 h-4 text-[#6CC24A] flex-shrink-0" />
                <span>Al Hameed Plaza, G-11 Markaz, Islamabad</span>
              </div>
              <div class="flex items-center gap-2">
                <PhoneIcon class="w-4 h-4 text-[#6CC24A] flex-shrink-0" />
                <a href="tel:+923349522157" class="hover:text-[#6CC24A] font-bold">+92-334-9522157</a>
              </div>
            </div>
            <router-link
              to="/contact"
              class="w-full block text-center bg-[#6CC24A] hover:bg-[#5db23c] text-white font-bold py-3 rounded-xl transition text-xs"
            >
              Get Free Solar Feasibility
            </router-link>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()
const faqs = computed(() => adminStore.getFaqsByService('solar'))
</script>
