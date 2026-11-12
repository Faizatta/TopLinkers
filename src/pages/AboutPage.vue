<template>
  <div class="about-page pt-20 bg-[#F6F8FA]">
    <!-- Hero Banner -->
    <div class="bg-[#0F2A44] text-white py-16 md:py-20">
      <div class="max-w-[1280px] mx-auto px-4 text-center">
        <span class="text-xs font-black uppercase tracking-widest text-[#16B4E8] block mb-2">
          ABOUT TOPLINKERS
        </span>
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight">
          Pioneering Real Estate, Construction & Solar in Pakistan
        </h1>
        <p class="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
          Operating from 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad (4004884), Top Linkers provides institutional diligence, CDA-approved sector files, architectural turnkey construction, and commercial solar electrification.
        </p>
      </div>
    </div>

    <!-- About Main Block -->
    <AboutSection />

    <!-- Services Overview from Flyer (Real Estate, Turnkey Construction, Solar 10/20/50 kW) -->
    <section class="py-16 bg-white">
      <div class="max-w-[1280px] mx-auto px-4">
        <SectionHeading
          eyebrow="OUR THREE CORE DIVISIONS"
          title="Integrated Real Estate Services Under One Roof"
          highlight="Real Estate"
          subtitle="As noted on our official marketing brochure, we specialize in three core engineering and advisory divisions."
          align="center"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <!-- Division 1 -->
          <div class="bg-[#F6F8FA] p-8 rounded-xl border border-gray-200 border-t-4 border-t-[#16B4E8] hover:shadow-lg transition-all">
            <div class="w-12 h-12 rounded-lg bg-[#0F2A44] text-[#16B4E8] flex items-center justify-center mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <h3 class="text-lg font-bold text-[#0F2A44] mb-2">1. Real Estate & Marketing</h3>
            <p class="text-xs text-gray-600 leading-relaxed font-normal">
Specialized brokerage for Faisal Town Phase 2, TopCity-1 (10 Marla plots), PECHS (5 Marla PKR 25 Lac), and PHA Sector I-12 and I-16 government apartments with installment plans. change this line wooytprice            </p>
          </div>

          <!-- Division 2 -->
          <div class="bg-[#F6F8FA] p-8 rounded-xl border border-gray-200 border-t-4 border-t-[#0F2A44] hover:shadow-lg transition-all">
            <div class="w-12 h-12 rounded-lg bg-[#0F2A44] text-[#16B4E8] flex items-center justify-center mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
            <h3 class="text-lg font-bold text-[#0F2A44] mb-2">2. Turnkey Construction</h3>
            <p class="text-xs text-gray-600 leading-relaxed font-normal">
Professional construction and architectural services across Pakistan, delivering grey structures, contemporary and modern elevations, and premium interior finishing for residential and commercial projects with quality craftsmanship and expert execution.            </p>
          </div>

          <!-- Division 3 -->
          <div class="bg-[#F6F8FA] p-8 rounded-xl border border-gray-200 border-t-4 border-t-[#6CC24A] hover:shadow-lg transition-all">
            <div class="w-12 h-12 rounded-lg bg-[#0F2A44] text-[#6CC24A] flex items-center justify-center mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <h3 class="text-lg font-bold text-[#0F2A44] mb-2">3. Solar Energy Systems</h3>
            <p class="text-xs text-gray-600 leading-relaxed font-normal">
              Turnkey on-grid and hybrid solar installations categorized in 10kW, 20kW, and 50kW systems with IESCO / WAPDA Net Metering approvals and 25-year panel warranties.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Band -->
    <StatsBand />

    <!-- Team Grid -->
    <section class="py-16 bg-white">
      <div class="max-w-[1280px] mx-auto px-4">
        <SectionHeading
          eyebrow="LEADERSHIP & ADVISORS"
          title="Meet the TopLinkers Management Team"
          highlight="Team"
          subtitle="Experienced directors dedicated to safe and profitable client investments."
          align="center"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div
            v-for="agent in agents"
            :key="agent.id"
            class="bg-[#F6F8FA] rounded-xl p-6 text-center border border-gray-100 hover:shadow-md transition-all group"
          >
            <img :src="agent.photo" :alt="agent.name" class="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#16B4E8] mb-4" />
            <h4 class="text-base font-bold text-[#0F2A44] group-hover:text-[#16B4E8]">{{ agent.name }}</h4>
            <p class="text-xs text-[#16B4E8] font-semibold mt-0.5">{{ agent.role }}</p>
            <p class="text-[11px] text-gray-500 mt-2 line-clamp-3 font-light">{{ agent.bio }}</p>
            <div class="mt-4 pt-3 border-t border-gray-200 text-xs font-bold text-[#0F2A44]">
              {{ agent.phone }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <Testimonials />

    <!-- CTA -->
    <CtaBanner />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import AboutSection from '../components/home/AboutSection.vue'
import StatsBand from '../components/home/StatsBand.vue'
import Testimonials from '../components/home/Testimonials.vue'
import CtaBanner from '../components/home/CtaBanner.vue'
import { api } from '../services/api'

const agents = ref([])

onMounted(async () => {
  document.title = 'About Us | TopLinkers Real Estate, Construction & Solar Islamabad'
  agents.value = await api.getAgents()
})
</script>
