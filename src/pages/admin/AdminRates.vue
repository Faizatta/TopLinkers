<template>
  <div class="space-y-6">
    <!-- Top Action Bar -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm">
      <div>
        <h2 class="text-base font-bold text-[#0F2A44]">Market Rates &amp; Package Catalog</h2>
        <p class="text-xs text-slate-500 mt-0.5">
          Add new society cards or update live pricing across
          <router-link to="/services" target="_blank" class="text-[#16B4E8] font-semibold underline">/services</router-link>
          and
          <router-link to="/hr-sukh" target="_blank" class="text-[#16B4E8] font-semibold underline">/hr-sukh</router-link>
        </p>
      </div>

      <div class="flex items-center gap-2.5">
        <button
          @click="resetToDefaults"
          class="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
        >
          Reset Defaults
        </button>

        <button
          @click="saveAllRates"
          class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          Save &amp; Sync to Frontend
        </button>
      </div>
    </div>

    <!-- Success Feedback Alert -->
    <div v-if="saveSuccess" class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs flex items-center justify-between shadow-xs">
      <div>
        <span class="font-semibold text-[#0F2A44]">Live Rates saved and synced!</span> Public service pages now show the updated cards.
      </div>
      <router-link to="/services" target="_blank" class="text-xs font-semibold text-[#0F2A44] hover:underline">
        View Live Site &rarr;
      </router-link>
    </div>

    <!-- Navigation Tabs for Sections -->
    <div class="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
      <button
        @click="activeTab = 'moqa'"
        class="px-4 py-2 rounded-xl transition-all whitespace-nowrap"
        :class="activeTab === 'moqa' ? 'bg-[#0F2A44] text-white shadow-sm' : 'text-slate-600 hover:bg-white'"
      >
        1. 100% Cash Plots (Moqa) ({{ Object.keys(ratesForm.moqaPlots || {}).length }})
      </button>

      <button
        @click="activeTab = 'installments'"
        class="px-4 py-2 rounded-xl transition-all whitespace-nowrap"
        :class="activeTab === 'installments' ? 'bg-[#0F2A44] text-white shadow-sm' : 'text-slate-600 hover:bg-white'"
      >
        2. Easy Installment Plans ({{ Object.keys(ratesForm.installmentPlans || {}).length }})
      </button>

      <button
        @click="activeTab = 'flats'"
        class="px-4 py-2 rounded-xl transition-all whitespace-nowrap"
        :class="activeTab === 'flats' ? 'bg-[#0F2A44] text-white shadow-sm' : 'text-slate-600 hover:bg-white'"
      >
        3. PHA Luxury Flats ({{ Object.keys(ratesForm.phaFlats || {}).length }})
      </button>

      <button
        @click="activeTab = 'solar'"
        class="px-4 py-2 rounded-xl transition-all whitespace-nowrap"
        :class="activeTab === 'solar' ? 'bg-[#0F2A44] text-white shadow-sm' : 'text-slate-600 hover:bg-white'"
      >
        4. Solar Packages ({{ Object.keys(ratesForm.solarPackages || {}).length }})
      </button>

      <button
        @click="activeTab = 'hrsukh'"
        class="px-4 py-2 rounded-xl transition-all whitespace-nowrap"
        :class="activeTab === 'hrsukh' ? 'bg-[#0F2A44] text-white shadow-sm' : 'text-slate-600 hover:bg-white'"
      >
        5. Harsukh Suites ({{ (ratesForm.hrSukhSuites || []).length }})
      </button>
    </div>

    <!-- TAB 1: MOQA KA PLOTS -->
    <div v-show="activeTab === 'moqa'" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
        <div>
          <h3 class="text-sm font-bold text-[#0F2A44]">Moqa Ka Plots (Cash Possession Societies)</h3>
          <p class="text-[11px] text-slate-500">Edit existing society plot rates or add new cash-possession housing societies.</p>
        </div>
        <button
          type="button"
          @click="openAddModal('moqa')"
          class="px-3.5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-xs"
        >
          <span>Add Moqa Society</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="(society, key) in ratesForm.moqaPlots"
          :key="key"
          class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3.5"
        >
          <div class="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
            <div class="flex-1 min-w-0">
              <input
                v-model="society.name"
                type="text"
                placeholder="Society Name"
                class="w-full text-sm font-bold text-[#0F2A44] bg-transparent border-b border-transparent focus:border-[#16B4E8] focus:outline-none pb-0.5"
              />
              <input
                v-model="society.description"
                type="text"
                placeholder="Short summary (e.g. Gated master-planned society)"
                class="w-full text-[11px] text-slate-500 bg-transparent border-b border-transparent focus:border-[#16B4E8] focus:outline-none mt-0.5"
              />
            </div>
            <div class="flex items-center gap-1.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-50 text-cyan-700">Moqa Plot</span>
              <button
                v-if="Object.keys(ratesForm.moqaPlots).length > 1"
                type="button"
                @click="removeMoqaSociety(key)"
                title="Remove society card"
                class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Badge Tag</label>
              <input v-model="society.tag" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">5 Marla Rate Range</label>
              <input v-model="society.m5" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">10 Marla Rate Range</label>
              <input v-model="society.m10" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">1 Kanal Rate Range</label>
              <input v-model="society.k1" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: INSTALLMENT PLANS -->
    <div v-show="activeTab === 'installments'" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
        <div>
          <h3 class="text-sm font-bold text-[#0F2A44]">Installment Plots &amp; Housing Societies</h3>
          <p class="text-[11px] text-slate-500">Manage installment booking down payments or add new installment projects.</p>
        </div>
        <button
          type="button"
          @click="openAddModal('installments')"
          class="px-3.5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-xs"
        >
          <span>Add Installment Project</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="(plan, key) in ratesForm.installmentPlans"
          :key="key"
          class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3.5"
        >
          <div class="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
            <div class="flex-1 min-w-0">
              <input
                v-model="plan.name"
                type="text"
                placeholder="Society Name"
                class="w-full text-sm font-bold text-[#0F2A44] bg-transparent border-b border-transparent focus:border-[#16B4E8] focus:outline-none pb-0.5"
              />
              <input
                v-model="plan.duration"
                type="text"
                placeholder="Plan Duration (e.g. 4-Year Quarterly Plan)"
                class="w-full text-[11px] text-slate-500 bg-transparent border-b border-transparent focus:border-[#16B4E8] focus:outline-none mt-0.5"
              />
            </div>
            <div class="flex items-center gap-1.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">Installments</span>
              <button
                v-if="Object.keys(ratesForm.installmentPlans).length > 1"
                type="button"
                @click="removeInstallmentSociety(key)"
                title="Remove installment project"
                class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-if="plan.m5">
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">5 Marla Down Payment</label>
              <input v-model="plan.m5.down" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold" />
            </div>
            <div v-if="plan.m7">
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">7 Marla Down Payment</label>
              <input v-model="plan.m7.down" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold" />
            </div>
            <div v-if="plan.m8">
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">8 Marla Down Payment</label>
              <input v-model="plan.m8.down" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold" />
            </div>
            <div v-if="plan.m10">
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">10 Marla Down Payment</label>
              <input v-model="plan.m10.down" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold" />
            </div>
            <div v-if="plan.k1">
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">1 Kanal Down Payment</label>
              <input v-model="plan.k1.down" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: PHA FLATS -->
    <div v-show="activeTab === 'flats'" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
        <div>
          <h3 class="text-sm font-bold text-[#0F2A44]">PHA Official Apartments &amp; Cash Flats</h3>
          <p class="text-[11px] text-slate-500">Edit existing PHA apartment types or add new apartment configurations.</p>
        </div>
        <button
          type="button"
          @click="openAddModal('flats')"
          class="px-3.5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-xs"
        >
          <span>Add Flat Category</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          v-for="(flat, key) in ratesForm.phaFlats"
          :key="key"
          class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3"
        >
          <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <input
              v-model="flat.name"
              type="text"
              placeholder="Flat Type Name (e.g. A-Type 1,650 Sq Ft)"
              class="flex-1 text-sm font-bold text-[#0F2A44] bg-transparent border-b border-transparent focus:border-[#16B4E8] focus:outline-none pb-0.5"
            />
            <button
              v-if="Object.keys(ratesForm.phaFlats).length > 1"
              type="button"
              @click="removePhaFlat(key)"
              title="Remove flat category"
              class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
          <div class="space-y-3">
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Rate Range</label>
              <input v-model="flat.rate" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Specs</label>
              <input v-model="flat.specs" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium" />
            </div>
          </div>
        </div>
      </div>

      <!-- Major Islamabad Projects & Categories Live Reference Table -->
      <div class="mt-8 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 class="text-sm font-bold text-[#0F2A44]">Major Islamabad Projects &amp; Categories (Public Matrix)</h4>
            <p class="text-[11px] text-slate-500">Live specification breakdown shown on Services page (/services#flats).</p>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#16B4E8]/10 text-[#0F2A44]">
            3 Verified Sectors
          </span>
        </div>

        <div class="space-y-3">
          <div
            v-for="(proj, idx) in (ratesForm.phaProjectsTable || adminStore.liveRates.phaProjectsTable)"
            :key="idx"
            class="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="font-bold text-xs text-[#0F2A44]">{{ proj.location }}</span>
                <span class="text-xs text-[#16B4E8] font-bold">&bull; {{ proj.categories }}</span>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-600 border border-slate-200">
                {{ proj.badge }}
              </span>
            </div>
            <p class="text-[11px] text-slate-600 leading-relaxed">{{ proj.specs }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 4: SOLAR PACKAGES -->
    <div v-show="activeTab === 'solar'" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
        <div>
          <h3 class="text-sm font-bold text-[#0F2A44]">Solar Energy &amp; Net Metering Packages</h3>
          <p class="text-[11px] text-slate-500">Edit kW pricing &amp; monthly savings or add new residential/commercial solar packages.</p>
        </div>
        <button
          type="button"
          @click="openAddModal('solar')"
          class="px-3.5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-xs"
        >
          <span>Add Solar Package</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          v-for="(pkg, key) in ratesForm.solarPackages"
          :key="key"
          class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3"
        >
          <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <input
              v-model="pkg.name"
              type="text"
              placeholder="Package Name (e.g. 15kW Hybrid)"
              class="flex-1 text-sm font-bold text-[#0F2A44] bg-transparent border-b border-transparent focus:border-[#16B4E8] focus:outline-none pb-0.5"
            />
            <button
              v-if="Object.keys(ratesForm.solarPackages).length > 1"
              type="button"
              @click="removeSolarPackage(key)"
              title="Remove solar package"
              class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
          <div class="space-y-3">
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Quote Estimate</label>
              <input v-model="pkg.quote" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Monthly Bill Savings</label>
              <input v-model="pkg.savings" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 5: HARSUKH FLAT SUITES -->
    <div v-show="activeTab === 'hrsukh'" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
        <div>
          <h3 class="text-sm font-bold text-[#0F2A44]">Harsukh Flat Suites &amp; Plans ({{ (ratesForm.hrSukhSuites || []).length }} Cards)</h3>
          <p class="text-[11px] text-slate-500">Add or edit flat suite cards displayed on /hr-sukh. Cards scroll cleanly when more than 3 are added.</p>
        </div>
        <button
          type="button"
          @click="openAddModal('hrsukh')"
          class="px-3.5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-xs"
        >
          <span>Add Flat Suite Card</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(suite, idx) in ratesForm.hrSukhSuites"
          :key="suite.id || idx"
          class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3 relative"
        >
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <span class="text-xs font-black uppercase text-[#16B4E8]">Suite #{{ idx + 1 }}</span>
            <button
              v-if="ratesForm.hrSukhSuites.length > 1"
              type="button"
              @click="removeSuiteCard(idx)"
              class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Remove suite card"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Badge Label</label>
              <input v-model="suite.badge" type="text" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Area / Size</label>
              <input v-model="suite.area" type="text" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs" />
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Suite Title</label>
            <input v-model="suite.title" type="text" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold" />
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Price</label>
              <input v-model="suite.price" type="text" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-[#16B4E8]" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Button Text</label>
              <input v-model="suite.ctaLabel" type="text" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs" />
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">Key Features (one per line)</label>
            <textarea
              :value="(suite.features || []).join('\n')"
              @input="suite.features = $event.target.value.split('\n')"
              rows="4"
              class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs"
            ></textarea>
          </div>

          <label class="flex items-center gap-2 text-xs font-semibold text-slate-700 pt-1 cursor-pointer">
            <input v-model="suite.featured" type="checkbox" class="rounded border-slate-300 text-[#16B4E8]" />
            <span>Highlight as Most Popular</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Popup Form Modal: Add Rate Card / Package (Syncs to Screen & Public Site) -->
    <div v-if="addModalOpen" @click.self="addModalOpen = false" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 class="text-base font-bold text-[#0F2A44]">{{ modalTitle }}</h3>
            <p class="text-xs text-slate-500">Enter details to add on screen and sync live to public pages.</p>
          </div>
          <button type="button" @click="addModalOpen = false" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="submitAddModal" class="space-y-3.5 pt-4">
          <!-- 1. Moqa Plot Form -->
          <template v-if="addModalType === 'moqa'">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Society Name *</label>
              <input v-model="draftItem.name" type="text" required placeholder="e.g. Bahria Enclave Islamabad" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Badge Tag</label>
              <input v-model="draftItem.tag" type="text" placeholder="e.g. Cash Possession" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
              <input v-model="draftItem.description" type="text" placeholder="e.g. Verified CDA/RDA gated community with instant possession." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">5 Marla Rate *</label>
                <input v-model="draftItem.m5" type="text" required placeholder="PKR 35 - 55 Lac" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">10 Marla Rate *</label>
                <input v-model="draftItem.m10" type="text" required placeholder="PKR 75 - 1.15 Cr" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">1 Kanal Rate *</label>
                <input v-model="draftItem.k1" type="text" required placeholder="PKR 1.5 - 2.2 Cr" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
            </div>
          </template>

          <!-- 2. Installment Project Form -->
          <template v-else-if="addModalType === 'installments'">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Society / Project Name *</label>
              <input v-model="draftItem.name" type="text" required placeholder="e.g. Capital Smart City" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Plan Duration *</label>
              <input v-model="draftItem.duration" type="text" required placeholder="e.g. 4-Year Quarterly Easy Plan" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Plan Description / Notes (Optional)</label>
              <input v-model="draftItem.description" type="text" placeholder="e.g. Flexible 16 quarterly installments with fast-track balloting." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">5 Marla Down Payment *</label>
                <input v-model="draftItem.m5Down" type="text" required placeholder="PKR 4.5 Lac" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">5 Marla Total Price</label>
                <input v-model="draftItem.m5Total" type="text" placeholder="PKR 28.5 Lac" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">10 Marla Down Payment *</label>
                <input v-model="draftItem.m10Down" type="text" required placeholder="PKR 8.5 Lac" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
              <div>
                <label class="block text-[11px] font-semibold text-slate-700 mb-1">1 Kanal Down Payment *</label>
                <input v-model="draftItem.k1Down" type="text" required placeholder="PKR 13.5 Lac" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
            </div>
          </template>

          <!-- 3. PHA Flat Category Form -->
          <template v-else-if="addModalType === 'flats'">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Flat Type Name *</label>
              <input v-model="draftItem.name" type="text" required placeholder="e.g. A-Type (1,750 Sq Ft)" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Rate Range *</label>
              <input v-model="draftItem.rate" type="text" required placeholder="e.g. PKR 1.55 - 1.85 Cr" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Specs *</label>
              <input v-model="draftItem.specs" type="text" required placeholder="e.g. 3 Bed • 4 Bath" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
          </template>

          <!-- 4. Solar Package Form -->
          <template v-else-if="addModalType === 'solar'">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Package Name *</label>
              <input v-model="draftItem.name" type="text" required placeholder="e.g. 15kW Hybrid Solar System" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Package Description / Notes (Optional)</label>
              <input v-model="draftItem.description" type="text" placeholder="e.g. Tier-1 Longi Bifacial panels with Huawei inverter & net metering warranty." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Quote Estimate *</label>
                <input v-model="draftItem.quote" type="text" required placeholder="e.g. PKR 1,650,000" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Monthly Bill Savings *</label>
                <input v-model="draftItem.savings" type="text" required placeholder="e.g. PKR 115k–145k / mo" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
              </div>
            </div>
          </template>

          <!-- 5. Harsukh Suite Card Form -->
          <template v-else-if="addModalType === 'hrsukh'">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Badge Label *</label>
                <input v-model="draftItem.badge" type="text" required placeholder="e.g. Duplex Suite" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Area / Size *</label>
                <input v-model="draftItem.area" type="text" required placeholder="e.g. 1,650 Sq Ft" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Suite Title *</label>
              <input v-model="draftItem.title" type="text" required placeholder="e.g. 3-Bed Grand Alpine Penthouse" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Price *</label>
                <input v-model="draftItem.price" type="text" required placeholder="e.g. PKR 2.40 Crore" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Button Text</label>
                <input v-model="draftItem.ctaLabel" type="text" placeholder="Book Suite" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Key Features (one per line)</label>
              <textarea v-model="draftItem.featuresText" rows="3" placeholder="3 Luxury Bedrooms + Lounge&#10;Private Mountain Terrace&#10;Heated Indoor Parking" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"></textarea>
            </div>
            <label class="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input v-model="draftItem.featured" type="checkbox" class="rounded border-slate-300 text-[#16B4E8]" />
              <span>Highlight as Most Popular</span>
            </label>
          </template>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button type="button" @click="addModalOpen = false" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0F2A44] hover:bg-[#16B4E8] text-white shadow-sm transition-colors">
              Add &amp; Sync Live
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { CheckIcon, CheckCircleIcon, ArrowTopRightOnSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()
const activeTab = ref('moqa')
const saveSuccess = ref(false)

// Clone rates from store into editable reactive form
const ratesForm = reactive(JSON.parse(JSON.stringify(adminStore.liveRates)))
if (!Array.isArray(ratesForm.hrSukhSuites)) {
  ratesForm.hrSukhSuites = []
}

// Unified Add Modal Form State
const addModalOpen = ref(false)
const addModalType = ref('moqa')
const draftItem = ref({})

const modalTitle = computed(() => {
  switch (addModalType.value) {
    case 'moqa': return 'Add Moqa Ka Plot Society'
    case 'installments': return 'Add Installment Plot Society'
    case 'flats': return 'Add PHA Flat Category'
    case 'solar': return 'Add Solar Energy Package'
    case 'hrsukh': return 'Add Harsukh Suite Plan'
    default: return 'Add Item'
  }
})

const openAddModal = (type) => {
  addModalType.value = type
  if (type === 'moqa') {
    draftItem.value = { name: '', tag: 'Cash Possession', description: '', m5: '', m10: '', k1: '' }
  } else if (type === 'installments') {
    draftItem.value = { name: '', duration: '4-Year Flexible Quarterly Plan', m5Down: '', m5Total: '', m10Down: '', k1Down: '' }
  } else if (type === 'flats') {
    draftItem.value = { name: '', rate: '', specs: '' }
  } else if (type === 'solar') {
    draftItem.value = { name: '', quote: '', savings: '' }
  } else if (type === 'hrsukh') {
    draftItem.value = {
      badge: 'New Suite',
      title: '',
      area: '',
      price: '',
      ctaLabel: 'Book Suite',
      featuresText: 'Spacious Mountain View Layout\nLuxury Attached Bathroom\nPrivate Scenic Balcony',
      featured: false
    }
  }
  addModalOpen.value = true
}

const submitAddModal = () => {
  const t = addModalType.value
  const d = draftItem.value

  if (t === 'moqa') {
    const key = 'society_' + Date.now()
    ratesForm.moqaPlots[key] = {
      name: d.name.trim(),
      description: (d.description || 'Verified housing society with immediate cash possession.').trim(),
      tag: (d.tag || 'Cash Possession').trim(),
      m5: d.m5.trim(),
      m10: d.m10.trim(),
      k1: d.k1.trim()
    }
    adminStore.saveLiveRates(ratesForm)
    adminStore.showToast(`Added "${d.name.trim()}" to Moqa Ka Plots.`)
  } else if (t === 'installments') {
    const key = 'plan_' + Date.now()
    ratesForm.installmentPlans[key] = {
      name: d.name.trim(),
      duration: d.duration.trim(),
      m5: { down: d.m5Down.trim(), total: (d.m5Total || 'On Request').trim(), quarterly: 'Quarterly Plan' },
      m8: { down: d.m5Down.trim(), total: (d.m5Total || 'On Request').trim(), quarterly: 'Quarterly Plan' },
      m10: { down: d.m10Down.trim(), total: 'On Request', quarterly: 'Quarterly Plan' },
      k1: { down: d.k1Down.trim(), total: 'On Request', quarterly: 'Quarterly Plan' }
    }
    adminStore.saveLiveRates(ratesForm)
    adminStore.showToast(`Added "${d.name.trim()}" to Installment Plans.`)
  } else if (t === 'flats') {
    const key = 'flat_' + Date.now()
    ratesForm.phaFlats[key] = {
      name: d.name.trim(),
      rate: d.rate.trim(),
      specs: d.specs.trim()
    }
    adminStore.saveLiveRates(ratesForm)
    adminStore.showToast(`Added "${d.name.trim()}" to PHA Flats.`)
  } else if (t === 'solar') {
    const key = 'kw_' + Date.now()
    ratesForm.solarPackages[key] = {
      name: d.name.trim(),
      quote: d.quote.trim(),
      savings: d.savings.trim()
    }
    adminStore.saveLiveRates(ratesForm)
    adminStore.showToast(`Added "${d.name.trim()}" to Solar Packages.`)
  } else if (t === 'hrsukh') {
    ratesForm.hrSukhSuites.push({
      id: 'suite-' + Date.now(),
      badge: (d.badge || 'Suite Plan').trim(),
      highlightTag: d.featured ? '★ Featured Pick' : '',
      title: d.title.trim(),
      area: d.area.trim(),
      price: d.price.trim(),
      featured: Boolean(d.featured),
      features: (d.featuresText || '').split('\n').map(s => s.trim()).filter(Boolean),
      ctaLabel: (d.ctaLabel || 'Book Suite').trim()
    })
    adminStore.saveLiveRates(ratesForm)
    adminStore.showToast(`Added "${d.title.trim()}" to Harsukh Suites.`)
  }

  addModalOpen.value = false
}

const removeMoqaSociety = async (key) => {
  const name = ratesForm.moqaPlots[key]?.name || 'this society'
  const ok = await adminStore.requestConfirm({
    title: `Delete ${name}?`,
    message: `Are you sure you want to remove "${name}" from Moqa Ka Plots?`,
    confirmText: 'Delete Card'
  })
  if (!ok) return
  delete ratesForm.moqaPlots[key]
  adminStore.saveLiveRates(ratesForm)
  adminStore.showToast(`Removed "${name}" from Moqa Ka Plots.`, 'info')
}

const removeInstallmentSociety = async (key) => {
  const name = ratesForm.installmentPlans[key]?.name || 'this project'
  const ok = await adminStore.requestConfirm({
    title: `Delete ${name}?`,
    message: `Are you sure you want to remove "${name}" from Installment Plans?`,
    confirmText: 'Delete Card'
  })
  if (!ok) return
  delete ratesForm.installmentPlans[key]
  adminStore.saveLiveRates(ratesForm)
  adminStore.showToast(`Removed "${name}" from Installment Plans.`, 'info')
}

const removePhaFlat = async (key) => {
  const name = ratesForm.phaFlats[key]?.name || 'this flat category'
  const ok = await adminStore.requestConfirm({
    title: `Delete ${name}?`,
    message: `Are you sure you want to remove "${name}" from PHA Luxury Flats?`,
    confirmText: 'Delete Category'
  })
  if (!ok) return
  delete ratesForm.phaFlats[key]
  adminStore.saveLiveRates(ratesForm)
  adminStore.showToast(`Removed "${name}" from PHA Flats.`, 'info')
}

const removeSolarPackage = async (key) => {
  const name = ratesForm.solarPackages[key]?.name || 'this solar package'
  const ok = await adminStore.requestConfirm({
    title: `Delete ${name}?`,
    message: `Are you sure you want to remove "${name}" from Solar Packages?`,
    confirmText: 'Delete Package'
  })
  if (!ok) return
  delete ratesForm.solarPackages[key]
  adminStore.saveLiveRates(ratesForm)
  adminStore.showToast(`Removed "${name}" from Solar Packages.`, 'info')
}

const removeSuiteCard = async (idx) => {
  const title = ratesForm.hrSukhSuites[idx]?.title || 'this suite card'
  const ok = await adminStore.requestConfirm({
    title: `Delete ${title}?`,
    message: `Are you sure you want to remove "${title}" from Harsukh Flat Suites?`,
    confirmText: 'Delete Suite'
  })
  if (!ok) return
  ratesForm.hrSukhSuites.splice(idx, 1)
  adminStore.saveLiveRates(ratesForm)
  adminStore.showToast(`Removed "${title}" from Harsukh Suites.`, 'info')
}

const saveAllRates = () => {
  adminStore.saveLiveRates(ratesForm)
  saveSuccess.value = true
  adminStore.showToast('Live market rates saved & synced to frontend!')
  setTimeout(() => {
    saveSuccess.value = false
  }, 4000)
}

const resetToDefaults = async () => {
  const ok = await adminStore.requestConfirm({
    title: 'Reset All Live Market Rates?',
    message: 'This will restore all societies, flat types, solar packages, and Harsukh suites back to default values.',
    confirmText: 'Reset Defaults'
  })
  if (ok) {
    localStorage.removeItem('toplinkers_live_rates')
    adminStore.showToast('Market rates reset to defaults.', 'info')
    window.location.reload()
  }
}
</script>
