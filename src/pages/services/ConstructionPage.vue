<template>
  <div class="service-detail-page pt-20 bg-[#F6F8FA]">
    <!-- Breadcrumb Bar -->
    <nav aria-label="Breadcrumb" class="bg-white border-b border-gray-200 py-3">
      <div class="max-w-[1280px] mx-auto px-4 flex items-center gap-2 text-xs text-gray-500">
        <router-link to="/" class="hover:text-[#16B4E8] font-medium">Home</router-link>
        <span>/</span>
        <router-link to="/services" class="hover:text-[#16B4E8] font-medium">Services</router-link>
        <span>/</span>
        <span class="text-[#0F2A44] font-bold">Turnkey House Construction</span>
      </div>
    </nav>

    <!-- 1. Hero Cover Banner with Atmospheric Backdrop (Harsukh-Style) -->
    <div class="relative min-h-[500px] sm:h-[540px] md:h-[600px] bg-gray-900 overflow-hidden flex items-end">
      <img
        src="/images/hero-construction.webp"
        alt="Turnkey House Construction & Architecture Islamabad"
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
            <span class="bg-[#F59E0B] text-[#0F2A44] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              PEC-LICENSED CIVIL ENGINEERS
            </span>
            <span class="bg-[#16B4E8] text-[#0F2A44] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              TURNKEY &amp; GREY STRUCTURE
            </span>
            <span class="bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              12-MONTH WARRANTY
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Turnkey House Construction &amp; Architecture Islamabad
          </h1>

          <p class="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl font-medium">
            From architectural 3D drawings and municipal approvals to turnkey grey structure and luxury finishing, our <strong class="text-white">Pakistan Engineering Council certified civil engineers</strong> build earthquake-resistant custom homes.
          </p>

          <!-- Direct Actions -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <a
              href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20am%20inquiring%20about%20Turnkey%20House%20Construction%20in%20Islamabad."
              target="_blank"
              class="px-6 sm:px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Instant WhatsApp Consultation</span>
            </a>

            <router-link
              to="/contact"
              class="px-6 sm:px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl border border-white/20 transition-all flex items-center justify-center"
            >
              Request Free Cost Estimate
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Floating 4-Metric Fast-Facts Highlights Dock (Harsukh-Style Overlapping Bar) -->
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 bg-white rounded-2xl p-3.5 sm:p-6 shadow-xl border border-gray-100 mb-8 sm:mb-12">
        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Grey Structure</span>
          <span class="text-base sm:text-2xl font-black text-[#16B4E8] block mt-0.5">PKR 2,800+</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Per Sq Ft Milestone Plan</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Turnkey Finishing</span>
          <span class="text-base sm:text-2xl font-black text-amber-500 block mt-0.5">PKR 5,500+</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Luxury Imported Fitouts</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Quality Audit</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">100% Tested</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Grade-60 Steel &amp; OPC Cement</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Warranty</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">12-Month</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Post-Handover Structural Guarantee</span>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <main class="max-w-[1280px] mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article class="lg:col-span-2 space-y-10">
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-2xl font-bold text-[#0F2A44] mb-4">Precision Engineering &amp; Modern Architecture</h2>
            <p class="text-gray-600 leading-relaxed text-sm mb-4">
              Building a home in Islamabad requires high-grade materials, earthquake-resistant seismic engineering, and uncompromising project supervision. Top Linkers Construction delivers turnkey architectural and civil construction services across DHA, Bahria Town, CDA Sectors, and TopCity-1.
            </p>
            <p class="text-gray-600 leading-relaxed text-sm">
              We operate under transparent fixed-price milestone contracts. Whether you contract us for grey structure execution or complete A+ turnkey luxury finishing, our clients receive weekly video inspection logs, certified material lab tests, and guaranteed handover schedules.
            </p>
          </section>

          <!-- Core Packages Breakdown -->
          <section class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#16B4E8]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">Turnkey Grey Structure</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-3">
                Grade 60 steel (Mughal/Amreli), Bestway/Fauji OPC cement, solid kiln-burnt clay bricks, underground water tanks, and complete concealed PVC conduit plumbing.
              </p>
              <span class="inline-block bg-[#16B4E8]/10 text-[#16B4E8] font-bold text-[11px] px-2.5 py-1 rounded-md">
                Starting from PKR 2,800/sq.ft
              </span>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#0F2A44]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">Premium A+ Turnkey Finishing</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-3">
                Imported Spanish/Italian porcelain tiles, Ash/Oak wood solid doors, Grohe/Porta sanitary fittings, designer gypsum ceilings, and custom kitchens with Blum hardware.
              </p>
              <span class="inline-block bg-[#0F2A44]/10 text-[#0F2A44] font-bold text-[11px] px-2.5 py-1 rounded-md">
                Starting from PKR 5,500/sq.ft
              </span>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#6CC24A]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">Architectural &amp; 3D Elevation</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-3">
                Full architectural submission drawings, structural vetting, 3D photorealistic exterior elevations, interior layout schematics, and CDA/RDA building permit approvals.
              </p>
              <span class="inline-block bg-[#6CC24A]/10 text-[#6CC24A] font-bold text-[11px] px-2.5 py-1 rounded-md">
                Complete Drawing Set Included
              </span>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200 border-l-4 border-l-[#E53935]">
              <h3 class="font-bold text-[#0F2A44] text-base mb-2">Commercial Plaza Construction</h3>
              <p class="text-xs text-gray-600 leading-relaxed mb-3">
                Reinforced concrete framed structures (RCC) with post-tensioned slabs, glass curtain facades, double-basement parking, and fire safety compliance.
              </p>
              <span class="inline-block bg-[#E53935]/10 text-[#E53935] font-bold text-[11px] px-2.5 py-1 rounded-md">
                Institutional Milestones
              </span>
            </div>
          </section>

          <!-- FAQs -->
          <section class="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h2 class="text-xl font-bold text-[#0F2A44] mb-6">Frequently Asked Questions on Construction</h2>
            <div class="space-y-4">
              <div class="border-b border-gray-100 pb-4">
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">How do you ensure material quality during construction?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Every batch of rebar and cement is verified by our PEC-certified site engineers. Cylinder compression tests and soil density tests are conducted and shared in your client portal.
                </p>
              </div>
              <div>
                <h3 class="font-bold text-sm text-[#0F2A44] mb-1">What is the payment schedule for turnkey projects?</h3>
                <p class="text-xs text-gray-600 leading-relaxed">
                  Payments are divided across 10 transparent construction milestones (e.g., plinth beam, slab casting, masonry, plaster, finishing). You only pay after each phase is inspected and approved.
                </p>
              </div>
            </div>
          </section>
        </article>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="bg-[#0F2A44] text-white p-6 rounded-2xl shadow-md">
            <h3 class="font-extrabold text-lg text-white mb-2">Get Construction Quote</h3>
            <p class="text-xs text-gray-300 mb-6 leading-relaxed">
              Share your plot size (5 Marla, 10 Marla, 1 Kanal) and requirements for an itemized cost estimate.
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
              Request Bill of Quantities (BOQ)
            </router-link>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
</script>
