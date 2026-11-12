<template>
  <div class="disclaimer-page pt-28 sm:pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
    <!-- Breadcrumb -->
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 mb-6">
      <nav class="flex items-center text-xs text-gray-500 gap-2" aria-label="Breadcrumb">
        <router-link to="/" class="hover:text-[#16B4E8] transition-colors">Home</router-link>
        <span>/</span>
        <span class="text-gray-400">Legal</span>
        <span>/</span>
        <span class="text-[#0F2A44] font-bold">Disclaimer</span>
      </nav>
    </div>

    <!-- Page Header Banner -->
    <header class="bg-[#0F2A44] text-white py-12 sm:py-16 mb-10 sm:mb-14 relative overflow-hidden">
      <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#16B4E8]/10 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#E53935]/10 blur-3xl pointer-events-none"></div>

      <div class="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#16B4E8] text-xs font-black uppercase tracking-wider mb-4 border border-white/15">
            <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
            <span>Legal &amp; Information &bull; Advisory Notice</span>
          </div>

          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Website &amp; Advisory Disclaimer
          </h1>

          <p class="text-xs sm:text-sm text-gray-300 mt-4 leading-relaxed font-normal">
            Important legal clarifications regarding the informational nature of our real estate portfolios, investment schedules, turnkey construction estimates, and solar net metering calculations in Islamabad, Rawalpindi, and Galyat.
          </p>

          <div class="flex items-center gap-4 mt-6 text-xs text-slate-300">
            <span class="inline-flex items-center gap-1.5">
              <span class="text-gray-400">Last Reviewed:</span>
              <strong class="text-white">November 2026</strong>
            </span>
            <span>&bull;</span>
            <span class="inline-flex items-center gap-1.5">
              <span class="text-gray-400">Entity:</span>
              <strong class="text-white">TopLinkers Pakistan</strong>
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Container with Sticky Table of Contents -->
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        <!-- Left: Sticky Quick Navigation (Desktop 4 cols) -->
        <aside class="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
          <div class="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm">
            <h2 class="text-xs font-black uppercase tracking-wider text-[#0F2A44] mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#16B4E8]"></span>
              <span>Table of Contents</span>
            </h2>
            <nav class="space-y-1.5 text-xs">
              <a
                v-for="section in sections"
                :key="section.id"
                :href="`#${section.id}`"
                class="block py-1.5 px-2.5 rounded-lg text-gray-600 hover:text-[#0F2A44] hover:bg-gray-50 font-medium transition-colors"
              >
                {{ section.title }}
              </a>
            </nav>
          </div>

          <!-- Diligence Advisory Box -->
          <div class="bg-gradient-to-br from-[#0F2A44] to-[#143452] text-white p-5 rounded-2xl shadow-sm border border-white/10 space-y-3">
            <span class="text-[10px] font-black uppercase tracking-wider text-amber-300">Independent Diligence</span>
            <h3 class="text-sm font-bold">Physical Document Check</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              We urge every property investor to execute physical title inspections and society ledger verification prior to financial transfers.
            </p>
            <div class="pt-1 text-xs space-y-1.5">
              <div class="text-[#16B4E8] font-bold">toplinkers12@gmail.com</div>
              <div class="text-white">0334-9522157 / 0332-4004884</div>
            </div>
          </div>
        </aside>

        <!-- Right: Legal Disclaimer Articles (8 cols) -->
        <main class="lg:col-span-8 space-y-8 text-gray-700 text-xs sm:text-sm leading-relaxed">
          <!-- 1. General Informational Nature -->
          <section id="informational-nature" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 01</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              1. General Informational Nature of Website Content
            </h2>
            <p>
              The information, listings, pricing guides, investment projections, calculators, and architectural models published on <strong>TopLinkers</strong> (located at <code>toplinkers.com</code>) are compiled and presented exclusively for general informational, educational, and initial advisory purposes.
            </p>
            <p>
              Nothing contained on this website constitutes formal legal counsel, binding financial underwriting, or a legally finalized sales contract. While TopLinkers makes every reasonable effort to keep pricing, CDA sector updates, and building material indices accurate and current, we make no express or implied representations regarding absolute completeness or real-time market accuracy.
            </p>
          </section>

          <!-- 2. Real Estate Advisory & Title Verification -->
          <section id="real-estate-disclaimer" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 02</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              2. Real Estate Listings, Plot Ballots &amp; Title Verification
            </h2>
            <p>
              TopLinkers acts as an advisory brokerage and marketing firm representing verified on-ground plots (Moqa Ka Plot), installment files (TopCity-1, PECHS, Faisal Town Phase 2), government apartments (PHA Sector I-12 and I-16), and luxury vacation suites (Harsukh Nathia Gali):
            </p>
            <ul class="list-disc list-inside space-y-2 pl-1 text-gray-600">
              <li><strong>Independent Title Verification:</strong> Prospective buyers must independently inspect on-ground possession, cross-verify allotment files at the relevant housing authority (CDA, RDA, or private society registrar), and satisfy themselves regarding title clarity prior to financial commitments.</li>
              <li><strong>Authority Approval &amp; Policy Revisions:</strong> Real estate development timelines, zoning regulations, possession handovers, and ballot schedules are determined by sovereign bodies (Capital Development Authority, Rawalpindi Development Authority, PHA Foundation) and housing society developers, not by TopLinkers.</li>
              <li><strong>Price Revisions:</strong> Published rates reflect prevailing market prices at the time of publication and are subject to immediate revision in response to open market demand and developer policy.</li>
            </ul>
          </section>

          <!-- 3. Investment Risk & ROI Estimates -->
          <section id="investment-risk" class="bg-white rounded-2xl p-6 sm:p-8 border-2 border-amber-300/60 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-amber-600 text-xs font-black uppercase tracking-wider">
              <span>Section 03 &bull; Financial Notice</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              3. Investment Risk &amp; No Guarantee of Financial Return
            </h2>
            <p>
              All property investments involve varying degrees of risk. Past appreciation rates in Islamabad sectors or Nathia Gali tourism corridors do not guarantee future capital gains or recurring cash flows:
            </p>
            <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2 text-xs text-amber-950">
              <strong class="block font-bold">Tourist Rental Yield Projections (e.g. Harsukh Nathia Gali):</strong>
              <p class="text-gray-700 leading-relaxed">
                Projected rental returns (such as 20%+ rental yield or PKR 25,000–40,000 nightly Airbnb estimates) are analytical projections based on seasonal Galyat tourist occupancy patterns, holiday demand, and comparative regional hospitality metrics. They do <strong>not</strong> constitute a guaranteed contractual dividend, debt instrument, or fixed-return financial deposit.
              </p>
            </div>
            <p class="pt-1">
              TopLinkers strongly recommends consulting an independent financial or legal advisor before committing significant capital to commercial, residential, or hospitality assets.
            </p>
          </section>

          <!-- 4. Turnkey Construction Cost Estimates -->
          <section id="construction-estimates" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 04</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              4. Turnkey Construction &amp; Material Index Disclaimers
            </h2>
            <p>
              Estimates published for turnkey residential villas, commercial plazas, and grey structure construction are benchmark estimates based on historical engineering data:
            </p>
            <ul class="list-disc list-inside space-y-2 pl-1 text-gray-600">
              <li><strong>Market Volatility:</strong> Construction rates in Pakistan are heavily influenced by national market indices for steel rebar (Grade 60), Fauji/DG Khan cement, brick kilns, electrical cables, and sanitary fixtures. Quoted rates on this website serve as starting references.</li>
              <li><strong>Site-Specific Factors:</strong> Actual construction costs vary depending on geotechnical soil testing, foundation depth, structural seismic zones, architectural elevations, and custom interior finishes.</li>
              <li><strong>Binding Engineering Contract:</strong> Official construction agreements are executed exclusively through customized Bill of Quantities (BOQ), verified structural drawings, and signed engineering contracts certified by our PEC-licensed civil engineers.</li>
            </ul>
          </section>

          <!-- 5. Solar Net Metering Disclaimers -->
          <section id="solar-estimates" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 05</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              5. Solar Energy Generation &amp; Net Metering Estimates
            </h2>
            <p>
              For our Tier-1 solar net metering packages (10kW, 20kW, 50kW):
            </p>
            <ul class="list-disc list-inside space-y-2 pl-1 text-gray-600">
              <li><strong>Irradiance &amp; Generation:</strong> Projected monthly unit generation (kWh) is calculated assuming standard Islamabad solar irradiance (approx. 4.8 to 5.2 peak sun hours/day). Actual energy yield depends on rooftop azimuth, tilt angle, shading from adjacent structures, seasonal cloud cover, and regular panel cleaning.</li>
              <li><strong>IESCO / WAPDA Grid Policy:</strong> Net metering approvals, distribution transformer sanction capacity, bi-directional green meter installation, and unit credit tariffs are governed strictly by IESCO (Islamabad Electric Supply Company) and NEPRA regulations. TopLinkers handles technical paperwork and engineering certification, but grid interconnection is subject to utility jurisdiction.</li>
            </ul>
          </section>

          <!-- 6. Third-Party Developer Projects -->
          <section id="developer-projects" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 06</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              6. Third-Party Developers &amp; External Projects
            </h2>
            <p>
              Certain hot-selling projects featured on this website—such as Harsukh Residencies (developed by <strong>Almaymaar</strong>) and government housing schemes (developed by <strong>PHA Foundation</strong>)—are owned and constructed by third-party corporate entities.
            </p>
            <p>
              TopLinkers acts as an authorized marketing, sales, and documentation partner. While we conduct rigorous due diligence before marketing any development, TopLinkers is not the principal developer of third-party schemes and cannot be held liable for third-party construction schedules, material variations, or developer-level delays.
            </p>
          </section>

          <!-- 7. Office Contact Details -->
          <section id="contact-disclaimer" class="bg-gradient-to-r from-[#0F2A44] via-[#143452] to-[#0F2A44] text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4 scroll-mt-28">
            <h2 class="text-lg sm:text-xl font-extrabold text-white">
              7. Consultation &amp; Office Verification
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
              For on-site plot inspections, structural consultation with our PEC engineers, or file verification, visit our corporate office:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div class="bg-white/10 p-4 rounded-xl border border-white/15">
                <span class="text-slate-400 block text-[10px] uppercase tracking-wider">Official Office</span>
                <strong class="text-white text-sm block mt-0.5">TopLinkers Head Office</strong>
                <span class="text-slate-300 text-[11px] block mt-1 leading-snug">
                  2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan, 4004884
                </span>
              </div>
              <div class="bg-white/10 p-4 rounded-xl border border-white/15">
                <span class="text-slate-400 block text-[10px] uppercase tracking-wider">Direct Verification Lines</span>
                <strong class="text-white text-sm block mt-0.5">0334-9522157 &bull; 0332-4004884</strong>
                <span class="text-[#16B4E8] text-[11px] block mt-1">toplinkers12@gmail.com</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const sections = [
  { id: 'informational-nature', title: '1. Informational Nature' },
  { id: 'real-estate-disclaimer', title: '2. Real Estate Title Check' },
  { id: 'investment-risk', title: '3. Investment & ROI Notice' },
  { id: 'construction-estimates', title: '4. Construction Rates' },
  { id: 'solar-estimates', title: '5. Solar Net Metering' },
  { id: 'developer-projects', title: '6. Third-Party Projects' },
  { id: 'contact-disclaimer', title: '7. Office Verification' }
]
</script>
