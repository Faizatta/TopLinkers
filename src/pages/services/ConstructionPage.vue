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

    <!-- Hero Header -->
    <header class="bg-[#0F2A44] text-white py-14 md:py-20">
      <div class="max-w-[1280px] mx-auto px-4 text-center">
        <span class="text-xs font-black uppercase tracking-widest text-[#16B4E8] block mb-2">
          PEC-LICENSED ENGINEERING &amp; ARCHITECTURE
        </span>
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight">
          Turnkey House Construction &amp; Grey Structure Islamabad
        </h1>
        <p class="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
          From architectural 3D drawings and municipal approvals to turnkey grey structure and premium finishing, our Pakistan Engineering Council certified civil engineers build durable custom homes.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link
            to="/contact"
            class="bg-[#16B4E8] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#1199c7] transition shadow-md text-sm"
          >
            Request Free Cost Estimate
          </router-link>
          <a
            href="tel:+923349522157"
            class="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-xl transition text-sm border border-white/20"
          >
            Call Project Engineer
          </a>
        </div>
      </div>
    </header>

    <!-- Content Section -->
    <main class="max-w-[1280px] mx-auto px-4 py-16">
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
