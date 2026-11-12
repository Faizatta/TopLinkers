<template>
  <div class="terms-conditions-page pt-28 sm:pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
    <!-- Breadcrumb -->
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 mb-6">
      <nav class="flex items-center text-xs text-gray-500 gap-2" aria-label="Breadcrumb">
        <router-link to="/" class="hover:text-[#16B4E8] transition-colors">Home</router-link>
        <span>/</span>
        <span class="text-gray-400">Legal</span>
        <span>/</span>
        <span class="text-[#0F2A44] font-bold">Terms &amp; Conditions</span>
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
            <span>Legal &amp; Information &bull; Platform Governance</span>
          </div>

          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Terms &amp; Conditions
          </h1>

          <p class="text-xs sm:text-sm text-gray-300 mt-4 leading-relaxed font-normal">
            Please read these terms and conditions carefully before utilizing the TopLinkers website, digital listing portals, property investment tools, construction estimates, or solar net metering advisory services.
          </p>

          <div class="flex items-center gap-4 mt-6 text-xs text-slate-300">
            <span class="inline-flex items-center gap-1.5">
              <span class="text-gray-400">Last Modified:</span>
              <strong class="text-white">November 2026</strong>
            </span>
            <span>&bull;</span>
            <span class="inline-flex items-center gap-1.5">
              <span class="text-gray-400">Governing Law:</span>
              <strong class="text-white">Islamic Republic of Pakistan</strong>
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

          <!-- Quick Helpline -->
          <div class="bg-gradient-to-br from-[#0F2A44] to-[#143452] text-white p-5 rounded-2xl shadow-sm border border-white/10 space-y-3">
            <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8]">Have Questions?</span>
            <h3 class="text-sm font-bold">TopLinkers Office Desk</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              For commercial contracts, verified plot documentation, or engineering agreements, visit our office in G-11 Markaz.
            </p>
            <div class="pt-1 text-xs space-y-1.5">
              <div class="text-[#16B4E8] font-bold">toplinkers12@gmail.com</div>
              <div class="text-white">0334-9522157 / 0332-4004884</div>
            </div>
          </div>
        </aside>

        <!-- Right: Legal Terms Articles (8 cols) -->
        <main class="lg:col-span-8 space-y-8 text-gray-700 text-xs sm:text-sm leading-relaxed">
          <!-- 1. Acceptance of Terms -->
          <section id="acceptance" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 01</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              1. Acceptance &amp; Agreement to Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the website <strong>TopLinkers</strong> (located at <code>toplinkers.com</code>) or any associated subdomains, inquiry forms, and services, you agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you ("User", "Client", or "Visitor") and <strong>TopLinkers</strong>, located at 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan (4004884). If you do not agree to all terms herein, you must immediately discontinue using our website and services.
            </p>
          </section>

          <!-- 2. Intellectual Property & Copyright -->
          <section id="intellectual-property" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 02</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              2. Intellectual Property &amp; Copyright Ownership
            </h2>
            <p>
              All proprietary content featured on this website—including but not limited to text descriptions, architectural drawings, 3D renderings, floorplan graphics, photographic assets, brand logos, codebases, and marketing flyers—is the intellectual property of TopLinkers or its authorized project partners (e.g., Almaymaar for Harsukh Residencies), protected by copyright laws of Pakistan and international treaties.
            </p>
            <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-1">
              <strong class="text-[#0F2A44] block">Permitted Personal Use:</strong>
              <span>You are granted a non-exclusive, non-transferable, revocable license to view, download, or print property brochures and floorplans strictly for your personal, non-commercial evaluation of property investments or building services.</span>
            </div>
            <p class="pt-1">
              <strong>Restrictions:</strong> You may not modify, republish, distribute, mirror, reverse-engineer, systematically scrape, or exploit any materials from this website for commercial real estate marketing without explicit prior written authorization from TopLinkers.
            </p>
          </section>

          <!-- 3. User Conduct & Responsibilities -->
          <section id="user-conduct" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 03</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              3. User Responsibilities &amp; Permitted Conduct
            </h2>
            <p>
              When using our platform, interactive property search, comparison tools, and inquiry modals, you agree to:
            </p>
            <ul class="list-disc list-inside space-y-1.5 pl-1 text-gray-600">
              <li>Provide accurate, truthful, and verifiable contact details (name, valid phone number, email) when submitting inquiries.</li>
              <li>Refrain from transmitting fraudulent leads, commercial spam, bot requests, or malicious payloads designed to disrupt service availability.</li>
              <li>Respect our engineers, property consultants, and administrative team during professional consultations and site inspections.</li>
              <li>Refrain from attempting unauthorized access to administrative portals (such as <code>/admin</code>) or backend application interfaces.</li>
            </ul>
          </section>

          <!-- 4. Property Listings & Advisory Disclaimer -->
          <section id="property-listings" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 04</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              4. Property Listings, Prices &amp; Payment Schedules
            </h2>
            <p>
              TopLinkers acts as a professional advisory and brokerage firm facilitating real estate transactions in CDA sectors, TopCity-1, PECHS, Faisal Town Phase 2, PHA apartments (I-12 and I-16), and tourist vacation suites in Harsukh Nathia Gali:
            </p>
            <ul class="list-disc list-inside space-y-2 pl-1 text-gray-600">
              <li><strong>Informational Nature:</strong> Listing prices, installment schedules, unit availability, and down payments published on the website are provided for initial orientation and are subject to change based on society revisions, developer updates, and market demand.</li>
              <li><strong>Formal Execution:</strong> A property transaction is legally consummated only upon physical document verification, execution of formal allotment letters, transfer papers at the relevant society/CDA office, and registered payment instruments.</li>
              <li><strong>No Automatic Binding Sale:</strong> Submitting an inquiry form or clicking a WhatsApp consultation button does not constitute a reservation, allotment, or binding contract of purchase.</li>
            </ul>
          </section>

          <!-- 5. Engineering & Technical Service Quotations -->
          <section id="engineering-services" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 05</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              5. Turnkey Construction &amp; Solar Electrification Contracts
            </h2>
            <p>
              For engineering and construction operations undertaken by TopLinkers:
            </p>
            <ul class="list-disc list-inside space-y-2 pl-1 text-gray-600">
              <li><strong>Construction Rate Estimates:</strong> Quoted rates per square foot (such as Grey Structure or A+ Luxury Turnkey) are illustrative benchmarks based on prevailing raw material indices (cement, steel rebar, electrical conduit). Binding contractual rates are established via signed architectural contracts and Bill of Quantities (BOQ).</li>
              <li><strong>Solar Net Metering:</strong> Tier-1 solar package specifications (10kW, 20kW, 50kW) and monthly generation estimates depend on site solar irradiance, roof orientation, and IESCO net metering grid approval. TopLinkers engineers handle technical documentation and PEC approvals; final bi-directional meter activation is subject to utility scheduling.</li>
            </ul>
          </section>

          <!-- 6. Limitation of Liability -->
          <section id="liability" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 06</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law in Pakistan, TopLinkers, its executive leadership, founders, civil engineers, and sales consultants shall not be liable for any indirect, incidental, special, or consequential damages resulting from:
            </p>
            <ul class="list-disc list-inside space-y-1.5 pl-1 text-gray-600">
              <li>Any market price fluctuations or policy modifications enacted by CDA, RDA, PHA Foundation, or private housing authorities.</li>
              <li>Temporary technical website unavailability, internet connection latency, or server maintenance downtimes.</li>
              <li>Reliance on general website estimates prior to formal on-ground title deed and ledger verification.</li>
            </ul>
          </section>

          <!-- 7. External Links & Third-Party Platforms -->
          <section id="external-links" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 07</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              7. External Links &amp; Third-Party Services
            </h2>
            <p>
              Our website provides links to external third-party services including Google Maps, WhatsApp, external banking portals, and official social media profiles. TopLinkers does not exercise control over external platforms and assumes no responsibility for their operational standards, privacy terms, or content.
            </p>
          </section>

          <!-- 8. Governing Law & Jurisdiction -->
          <section id="governing-law" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 08</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              8. Governing Law &amp; Judicial Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by, construed, and enforced in accordance with the substantive laws of the <strong>Islamic Republic of Pakistan</strong>.
            </p>
            <p>
              Any disputes, controversies, or legal claims arising out of or relating to your use of this platform or services rendered by TopLinkers shall be subject to the exclusive jurisdiction of the competent courts of law located in <strong>Islamabad, Pakistan</strong>.
            </p>
          </section>

          <!-- 9. Contact for Legal Inquiries -->
          <section id="contact-terms" class="bg-gradient-to-r from-[#0F2A44] via-[#143452] to-[#0F2A44] text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4 scroll-mt-28">
            <h2 class="text-lg sm:text-xl font-extrabold text-white">
              9. Corporate Contact &amp; Contract Verification
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
              For questions concerning these Terms, formal project agreements, or corporate representation:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div class="bg-white/10 p-4 rounded-xl border border-white/15">
                <span class="text-slate-400 block text-[10px] uppercase tracking-wider">Written Communication</span>
                <strong class="text-white text-sm block mt-0.5">toplinkers12@gmail.com</strong>
                <span class="text-[#16B4E8] text-[11px] block mt-1">Official Legal &amp; Client Inquiries</span>
              </div>
              <div class="bg-white/10 p-4 rounded-xl border border-white/15">
                <span class="text-slate-400 block text-[10px] uppercase tracking-wider">Consultation Helpline</span>
                <strong class="text-white text-sm block mt-0.5">0334-9522157 &bull; 0332-4004884</strong>
                <span class="text-green-400 text-[11px] block mt-1">G-11 Markaz Corporate Office</span>
              </div>
            </div>

            <p class="text-[11px] text-gray-400 pt-2 border-t border-white/15">
              <strong>Office Address:</strong> TopLinkers, 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan, Postal Code 4004884.
            </p>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const sections = [
  { id: 'acceptance', title: '1. Acceptance & Agreement' },
  { id: 'intellectual-property', title: '2. Intellectual Property' },
  { id: 'user-conduct', title: '3. User Conduct' },
  { id: 'property-listings', title: '4. Property Listings & Pricing' },
  { id: 'engineering-services', title: '5. Construction & Solar Contracts' },
  { id: 'liability', title: '6. Limitation of Liability' },
  { id: 'external-links', title: '7. External Links' },
  { id: 'governing-law', title: '8. Governing Law (Islamabad)' },
  { id: 'contact-terms', title: '9. Corporate Contact' }
]
</script>
