<template>
  <section class="py-20 md:py-28 bg-white overflow-hidden">
    <div class="max-w-[1280px] mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Left Column -->
        <div class="lg:col-span-6 space-y-6">
          <SectionHeading
            eyebrow="ABOUT TOPLINKERS"
            title="Making Real Estate Simpler"
            highlight="Simpler"
            align="left"
          />

          <p class="text-sm md:text-base text-gray-600 leading-relaxed font-normal">
            At TopLinkers Real Estate & Marketing, we bring transparency, technical precision, and full regulatory compliance to property buying and building in Pakistan. we specialize in high-growth CDA and RDA housing projects, turnkey architectural construction, and green solar energy transitions.
          </p>

          <!-- Checklist with cyan check-circle icons -->
          <div class="space-y-3.5 pt-2">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-[#16B4E8]/15 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              </div>
              <span class="text-xs sm:text-sm font-bold text-[#0F2A44]">Fully verified titles with zero litigation risk</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-[#16B4E8]/15 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              </div>
              <span class="text-xs sm:text-sm font-bold text-[#0F2A44]">Powerful search, interactive map & PHA flat layouts</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-[#16B4E8]/15 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              </div>
              <span class="text-xs sm:text-sm font-bold text-[#0F2A44]">Dedicated turnkey construction & solar engineering team</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-[#16B4E8]/15 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              </div>
              <span class="text-xs sm:text-sm font-bold text-[#0F2A44]">Regular market updates, price alerts & dedicated WhatsApp support</span>
            </div>
          </div>

          <!-- "Learn More About Us ->" Button -->
          <div class="pt-4">
            <router-link
              to="/about"
              class="btn-arrow-slide inline-flex items-center px-7 py-3.5 bg-[#16B4E8] hover:bg-[#119ecf] text-white text-xs font-black uppercase tracking-wider rounded-[4px] shadow transition-colors group"
            >
              <span>Learn More About Us</span>
              <svg class="arrow-icon w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Right Column: Large Rounded Interior Photo with Navy Overlay Card -->
        <div class="lg:col-span-6 relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              :srcset="responsiveSrcset('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', [600, 800, 1000])"
              sizes="(max-width: 1023px) 100vw, 600px"
              alt="Luxury Interior by TopLinkers"
              loading="lazy"
              decoding="async"
              width="1000"
              height="520"
              class="w-full h-[290px] sm:h-[400px] md:h-[520px] object-cover"
            />
          </div>

          <!-- Navy overlay card at bottom-right -->
          <div class="absolute bottom-3 right-3 sm:-bottom-6 sm:right-6 bg-[#0F2A44] text-white p-4 sm:p-6 rounded-xl shadow-2xl border-2 border-[#16B4E8]/40 max-w-[235px] sm:max-w-[280px]">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-lg bg-[#16B4E8] flex items-center justify-center text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div class="text-3xl font-black text-[#16B4E8]">
                <CountUp :end="1000" suffix="+" />
              </div>
            </div>
            <h3 class="text-sm font-bold text-white">Happy Customers</h3>
            <p class="text-[11px] text-gray-300 font-light mt-0.5">
              Across Pakistan & overseas expats investing in safe real estate.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeading from '../ui/SectionHeading.vue'
import CountUp from '../ui/CountUp.vue'
import { responsiveSrcset } from '../../utils/images'
</script>
