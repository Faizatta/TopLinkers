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

    <!-- Hero Header -->
    <header class="bg-[#0F2A44] text-white py-14 md:py-20">
      <div class="max-w-[1280px] mx-auto px-4 text-center">
        <span class="text-xs font-black uppercase tracking-widest text-[#6CC24A] block mb-2">
          IESCO-AUTHORIZED SOLAR NET METERING
        </span>
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight">
          Tier-1 Solar Net Metering &amp; Energy Systems Islamabad
        </h1>
        <p class="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
          Authorized on-grid, hybrid, and commercial solar electrification (10kW, 20kW, 50kW) with Tier-1 N-Type bifacial panels, European inverters, and guaranteed IESCO bidirectional green meter installation.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link
            to="/contact"
            class="bg-[#6CC24A] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#5db23c] transition shadow-md text-sm"
          >
            Calculate Solar Savings
          </router-link>
          <a
            href="tel:+923349522157"
            class="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-xl transition text-sm border border-white/20"
          >
            Speak to Solar Consultant
          </a>
        </div>
      </div>
    </header>

    <!-- Content Section -->
    <main class="max-w-[1280px] mx-auto px-4 py-16">
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

          <!-- FAQs -->
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-xl font-bold text-[#0F2A44] mb-6">Frequently Asked Questions on Solar Net Metering</h2>
            <div class="space-y-4">
              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">How long does IESCO net metering approval take?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Our dedicated liaison desk completes the process in approximately 3 to 5 weeks, including load sanctioning, site testing, inspector sign-off, and green bidirectional meter installation.
                </p>
              </div>
              <div>
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">What warranties are provided with solar hardware?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  We exclusively install Tier-1 panels with 12-year product warranties and 25 to 30-year linear power output performance guarantees, plus 5 to 10-year manufacturer inverter warranties.
                </p>
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
                <span class="text-[#6CC24A]">📍</span>
                <span>Al Hameed Plaza, G-11 Markaz, Islamabad</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[#6CC24A]">📞</span>
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
</script>
