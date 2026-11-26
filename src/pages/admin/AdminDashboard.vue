<template>
  <div class="space-y-6">
    <!-- Top Dashboard Header & Quick Actions -->
    <div class="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-sky-50 text-[#0F2A44] border border-sky-200">
            Live Backend Connected
          </span>
          <span class="text-xs text-slate-400">Al Hameed Plaza, G-11 Markaz</span>
        </div>
        <h1 class="text-lg sm:text-xl font-bold tracking-tight text-[#0F2A44] mt-1.5">
          Welcome back, {{ adminStore.adminUser?.name || 'Chief Administrator' }}
        </h1>
        <p class="text-slate-500 text-xs mt-0.5 max-w-2xl">
          Real-time overview of services, properties, client enquiries, and active website campaigns.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <router-link
          v-if="adminStore.canAccessModule('services')"
          to="/admin/services"
          class="px-3.5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-2xs"
        >
          Manage Services
        </router-link>
        <router-link
          v-if="adminStore.canAccessModule('properties')"
          to="/admin/properties"
          class="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
        >
          Properties
        </router-link>
        <router-link
          v-if="adminStore.canAccessModule('rates')"
          to="/admin/rates"
          class="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
        >
          Live Rates
        </router-link>
        <router-link
          v-if="adminStore.canAccessModule('leads')"
          to="/admin/leads"
          class="px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
        >
          All Leads ({{ adminStore.totalLeadsCount }})
        </router-link>
      </div>
    </div>

    <!-- Dashboard Section Tabs -->
    <div class="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 w-full sm:w-fit overflow-x-auto shadow-2xs">
      <button
        type="button"
        @click="dashboardTab = 'overview'"
        class="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
        :class="dashboardTab === 'overview' ? 'bg-[#0F2A44] text-white' : 'text-slate-600 hover:bg-slate-50'"
      >
        Overview &amp; Analytics
      </button>
      <button
        type="button"
        @click="dashboardTab = 'campaigns'"
        class="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
        :class="dashboardTab === 'campaigns' ? 'bg-[#0F2A44] text-white' : 'text-slate-600 hover:bg-slate-50'"
      >
        Campaigns &amp; Popups
      </button>
      <button
        type="button"
        @click="dashboardTab = 'faqs'"
        class="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
        :class="dashboardTab === 'faqs' ? 'bg-[#0F2A44] text-white' : 'text-slate-600 hover:bg-slate-50'"
      >
        Service FAQs ({{ adminStore.faqs?.length || 0 }})
      </button>
    </div>

    <!-- ===================================================================== -->
    <!-- TAB 1: REAL-DATA OVERVIEW & ANALYTICS                                 -->
    <!-- ===================================================================== -->
    <div v-show="dashboardTab === 'overview'" class="space-y-6">
      <!-- Real KPI Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Services"
          :value="serviceStats.total"
          :hint="`${serviceStats.published} Published • ${serviceStats.draft} Draft`"
          tone="sky"
          :icon="Squares2X2Icon"
        />
        <AdminStatCard
          label="Total Projects & Listings"
          :value="propertiesStore.properties.length"
          :hint="`${featuredPropertiesCount} Featured on site`"
          tone="slate"
          :icon="BuildingOffice2Icon"
        />
        <AdminStatCard
          label="Total Enquiries"
          :value="adminStore.totalLeadsCount"
          :hint="`${adminStore.newLeadsCount} Pending attention`"
          :tone="adminStore.newLeadsCount > 0 ? 'amber' : 'emerald'"
          :icon="UsersIcon"
        />
        <AdminStatCard
          label="Blogs & Reviews"
          :value="adminStore.blogs.length"
          :hint="`${adminStore.reviews.length} Client testimonials`"
          tone="emerald"
          :icon="NewspaperIcon"
        />
      </div>

      <!-- Real-Data Charts: Enquiries by Division & Pipeline Status -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-sm font-bold text-[#0F2A44]">Enquiries by Division</h2>
              <p class="text-[11px] text-slate-500">Live distribution from CRM leads</p>
            </div>
            <router-link to="/admin/leads" class="text-xs font-semibold text-[#16B4E8] hover:underline">
              Open CRM &rarr;
            </router-link>
          </div>
          <div class="space-y-3">
            <div v-for="row in leadsByDivision" :key="row.label" class="space-y-1">
              <div class="flex items-center justify-between text-xs">
                <span class="font-medium text-slate-700">{{ row.label }}</span>
                <span class="font-bold text-[#0F2A44]">{{ row.count }} ({{ row.pct }}%)</span>
              </div>
              <div class="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div class="h-full rounded-full bg-[#0F2A44] transition-all duration-300" :style="{ width: `${row.pct}%` }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-sm font-bold text-[#0F2A44]">Recently Updated Services</h2>
              <p class="text-[11px] text-slate-500">Latest changes synced to /services</p>
            </div>
            <router-link to="/admin/services" class="text-xs font-semibold text-[#16B4E8] hover:underline">
              Manage CMS &rarr;
            </router-link>
          </div>
          <div v-if="recentServices.length > 0" class="divide-y divide-slate-100">
            <div v-for="svc in recentServices" :key="svc.id" class="py-2.5 flex items-center justify-between gap-3">
              <div class="min-w-0">
                <p class="text-xs font-semibold text-[#0F2A44] truncate">{{ svc.title }}</p>
                <p class="text-[11px] text-slate-400 truncate">/{{ svc.slug }}</p>
              </div>
              <span
                class="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize flex-shrink-0"
                :class="svc.status === 'published'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : svc.status === 'draft'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'"
              >
                {{ svc.status }}
              </span>
            </div>
          </div>
          <p v-else class="text-xs text-slate-400 py-6 text-center">No services loaded yet.</p>
        </div>
      </div>
    </div>

    <!-- ===================================================================== -->
    <!-- TAB 2: CAMPAIGNS, STRIP & POPUPS                                      -->
    <!-- ===================================================================== -->
    <div v-show="dashboardTab === 'campaigns'" class="space-y-6">

    <!-- Front Page Top Offer Strip Manager -->
    <div class="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">Front Page Top Offer Strip</h2>
          <p class="text-xs text-slate-500 mt-0.5">Announcement banner shown at the top of the website for campaigns</p>
        </div>

        <label 
          :class="promoForm.enabled ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-100 border-slate-300 text-slate-600'"
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border cursor-pointer text-xs font-bold transition-all shadow-xs select-none"
        >
          <input
            v-model="promoForm.enabled"
            @change="savePromo"
            type="checkbox"
            class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
          />
          <span>{{ promoForm.enabled ? '✓ Strip Active on Front Page' : '✗ Strip OFF (Hidden from Website)' }}</span>
        </label>
      </div>

      <form @submit.prevent="savePromo" class="space-y-3">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div class="md:col-span-3">
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Offer Badge</label>
            <input v-model="promoForm.badge" type="text" placeholder="e.g. LIMITED OFFER" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0F2A44]" />
          </div>

          <div class="md:col-span-9">
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Offer Announcement Message *</label>
            <input v-model="promoForm.text" type="text" required placeholder="e.g. Special Rate Offer: Book selected PECHS / TopCity plots at discounted cash rates." class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Button Label</label>
            <input v-model="promoForm.ctaLabel" type="text" placeholder="e.g. Claim Offer" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs" />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Target Page</label>
            <select v-model="promoForm.ctaLink" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white">
              <option value="/listings">Properties Listings (/listings)</option>
              <option value="/services">Services &amp; Rates (/services)</option>
              <option value="/hr-sukh">Harsukh Nathia Gali (/hr-sukh)</option>
              <option value="/contact">Contact Desk (/contact)</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Offer Expiry (Optional)</label>
            <input v-model="promoForm.expiresAt" type="datetime-local" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs" />
          </div>
        </div>

        <div class="flex items-center justify-end pt-2">
          <button type="submit" class="px-5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs">
            Save Announcement Strip
          </button>
        </div>
      </form>
    </div>

    <!-- High-ROI Spotlight Investment Popup Manager (Backend ON / OFF & Custom Property) -->
    <div class="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black uppercase tracking-wider text-white bg-[#0F2A44] px-2 py-0.5 rounded">
              High-ROI Feature
            </span>
            <h2 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">
              Spotlight Investment Popup Manager
            </h2>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Floating curiosity popup (like Harsukh / High-ROI plots) that pops up on website screen. Toggle ON/OFF and select the featured property.
          </p>
        </div>

        <!-- Master ON / OFF Switch -->
        <label
          :class="spotlightForm.enabled ? 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-500/20' : 'bg-slate-100 border-slate-300 text-slate-600'"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-xs font-bold transition-all shadow-xs select-none flex-shrink-0"
        >
          <input
            v-model="spotlightForm.enabled"
            @change="saveSpotlight"
            type="checkbox"
            class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
          />
          <span>{{ spotlightForm.enabled ? '✓ Spotlight Popup ACTIVE on Screen' : '✗ Spotlight Popup OFF (Hidden from Visitors)' }}</span>
        </label>
      </div>

      <!-- Quick 1-Click Property Presets -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-[11px] font-bold text-slate-600 uppercase">
            Quick 1-Click Presets:
          </label>
          <span class="text-[10px] text-slate-400">Click to quickly load details into form</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            v-for="preset in spotlightPresets"
            :key="preset.key"
            type="button"
            @click="applySpotlightPreset(preset.key)"
            class="p-2.5 rounded-xl border border-slate-200 hover:border-[#16B4E8] bg-slate-50 hover:bg-sky-50/50 text-left transition-all group"
          >
            <div class="flex items-center justify-between text-[10px] font-extrabold text-[#0F2A44] group-hover:text-[#16B4E8]">
              <span class="truncate">{{ preset.name }}</span>
            </div>
            <span class="text-[9px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded mt-1 inline-block">
              {{ preset.badgeText }}
            </span>
          </button>
        </div>
      </div>

      <form @submit.prevent="saveSpotlight" class="space-y-4 pt-1">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Elevation Tag / Header *</label>
            <input v-model="spotlightForm.tag" type="text" required placeholder="e.g. Harsukh | Nathia Gali" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0F2A44]" />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">ROI / Highlight Badge</label>
            <input v-model="spotlightForm.badge" type="text" placeholder="e.g. 20%+ Rental ROI" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0F2A44]" />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Down Payment / Terms Tag</label>
            <input v-model="spotlightForm.downPayment" type="text" placeholder="e.g. 15% Down or 100% Cash Ready" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0F2A44]" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div class="md:col-span-5">
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Headline Hook / Title *</label>
            <input v-model="spotlightForm.title" type="text" required placeholder="e.g. Wake Up Above The Clouds?" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-[#0F2A44] focus:outline-none focus:border-[#0F2A44]" />
          </div>

          <div class="md:col-span-7">
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Subtitle / Teaser Hook *</label>
            <input v-model="spotlightForm.subtitle" type="text" required placeholder="e.g. Luxury pine-valley suites at 8,200 ft. Tap to explore ->" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Target Page URL / Route</label>
            <input v-model="spotlightForm.link" type="text" required placeholder="e.g. /hr-sukh, /services/apartments-flats, /services/residential-plots" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0F2A44]" />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Thumbnail Image URL</label>
            <input v-model="spotlightForm.image" type="text" required placeholder="https://..." class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]" />
          </div>
        </div>

        <!-- Live Preview Box -->
        <div class="p-3.5 bg-slate-900 rounded-xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <img :src="spotlightForm.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80'" alt="Preview" class="w-12 h-12 rounded-lg object-cover border border-white/20" />
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[9px] font-black uppercase text-[#16B4E8]">{{ spotlightForm.tag || 'Spotlight' }}</span>
                <span class="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded">{{ spotlightForm.badge || '20%+ ROI' }}</span>
              </div>
              <p class="text-xs font-black truncate max-w-sm text-white mt-0.5">{{ spotlightForm.title || 'Headline' }}</p>
              <p class="text-[10px] text-slate-300 truncate max-w-sm">{{ spotlightForm.subtitle || 'Subtitle' }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 flex-shrink-0">
            <span class="text-[10px] text-slate-400">Links to: <code class="text-cyan-300 font-mono">{{ spotlightForm.link || '/hr-sukh' }}</code></span>
            <button
              type="submit"
              class="px-5 py-2.5 rounded-xl bg-[#16B4E8] hover:bg-[#119ecf] text-[#0F2A44] text-xs font-black uppercase tracking-wider transition-all shadow"
            >
              Save Spotlight Popup
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- FEATURED BUILDING / PROJECT SPOTLIGHT (POPUP 2 & DETAILS MODAL) -->
    <!-- Separate from Harsukh: User can upload building picture directly from browser, configure details modal & dedicated page -->
    <div class="bg-white rounded-xl p-6 border-2 border-amber-400/30 shadow-xs space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black uppercase tracking-wider text-[#0F2A44] bg-amber-400 px-2.5 py-0.5 rounded shadow-xs">
              Popup 2 &bull; Separate Feature
            </span>
            <h2 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">
              Custom Building / Plaza Spotlight Manager (Popup 2)
            </h2>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Independent 2nd popup with instant modal view and dedicated details page. Upload building pictures directly from your browser/computer, set price, down payment, ROI, and specifications.
          </p>
        </div>

        <!-- Master ON / OFF Switch for Popup 2 -->
        <label
          :class="customBuildingForm.enabled ? 'bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-500/20' : 'bg-slate-100 border-slate-300 text-slate-600'"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-xs font-bold transition-all shadow-xs select-none flex-shrink-0"
        >
          <input
            v-model="customBuildingForm.enabled"
            @change="saveCustomBuildingToggle"
            type="checkbox"
            class="rounded text-amber-500 focus:ring-amber-400 w-4 h-4 cursor-pointer"
          />
          <span>{{ customBuildingForm.enabled ? '✓ Building Popup 2 ACTIVE on Screen' : '✗ Building Popup 2 OFF (Hidden from Visitors)' }}</span>
        </label>
      </div>

      <!-- Quick 1-Click Building Presets -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-[11px] font-bold text-slate-600 uppercase">
            Quick 1-Click Building Presets:
          </label>
          <span class="text-[10px] text-slate-400">Click to quickly load commercial plaza / executive apartments</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            v-for="bPreset in buildingPresets"
            :key="bPreset.key"
            type="button"
            @click="applyBuildingPreset(bPreset.key)"
            class="p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/50 text-left transition-all group"
          >
            <div class="flex items-center justify-between text-[10px] font-extrabold text-[#0F2A44] group-hover:text-amber-600">
              <span class="truncate">{{ bPreset.name }}</span>
            </div>
            <span class="text-[9px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.2 rounded mt-1 inline-block">
              {{ bPreset.badge }}
            </span>
          </button>
        </div>
      </div>

      <form @submit.prevent="saveCustomBuilding" class="space-y-4 pt-1">
        <!-- Grid 1: Basic Identifiers -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Building / Plaza Name *</label>
            <input v-model="customBuildingForm.name" type="text" required placeholder="e.g. Faisal Heights Luxury Apartments" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-[#0F2A44] focus:outline-none focus:border-amber-500" />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Elevation Tag / Location *</label>
            <input v-model="customBuildingForm.tag" type="text" required placeholder="e.g. G-11 Markaz | Islamabad" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500" />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">ROI / Highlight Badge</label>
            <input v-model="customBuildingForm.badge" type="text" placeholder="e.g. 18% Expected Yield" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500" />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Down Payment / Terms Tag</label>
            <input v-model="customBuildingForm.downPayment" type="text" placeholder="e.g. 20% Down or 2.5-Yr Plan" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500" />
          </div>
        </div>

        <!-- Grid 2: Pricing, Phone & Route -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Price Range</label>
            <input v-model="customBuildingForm.price" type="text" placeholder="e.g. PKR 1.45 Cr – 3.20 Cr" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500" />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Direct Advisory Phone</label>
            <input v-model="customBuildingForm.phone" type="text" placeholder="0334-9522157" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500" />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Target Dedicated Page / Route</label>
            <input v-model="customBuildingForm.link" type="text" placeholder="/featured-building" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500" />
          </div>
        </div>

        <!-- Grid 3: Headline & Subtitle -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div class="md:col-span-5">
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Headline Hook / Title *</label>
            <input v-model="customBuildingForm.title" type="text" required placeholder="e.g. Executive Luxury Suites & Penthouses" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-[#0F2A44] focus:outline-none focus:border-amber-500" />
          </div>

          <div class="md:col-span-7">
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Subtitle / Teaser Hook *</label>
            <input v-model="customBuildingForm.subtitle" type="text" required placeholder="e.g. Modern architecture with dedicated basement parking, fast elevators & backup power generator" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-amber-500" />
          </div>
        </div>

        <!-- Direct Browser File Picker & Image Upload Area -->
        <div class="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/40 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <label class="block text-[11px] font-bold text-[#0F2A44] uppercase">
                Building Picture (Upload Directly From Your Browser / Computer)
              </label>
              <p class="text-[10px] text-slate-500">
                Select any photo from your computer (JPG, PNG, WebP). It will be saved directly to the server and shown on the popup &amp; details page.
              </p>
            </div>
            <button
              type="button"
              @click="triggerBuildingImagePicker"
              :disabled="isUploadingBuildingImage"
              class="px-4 py-2 rounded-xl bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              <span>{{ isUploadingBuildingImage ? 'Uploading Image...' : 'Browse Computer / Browser' }}</span>
            </button>
            <input
              type="file"
              ref="buildingImageInput"
              accept="image/*"
              class="hidden"
              @change="onBuildingImagePicked"
            />
          </div>

          <!-- Dual Mode: File Preview & Fallback Image URL Input -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div class="md:col-span-8">
              <label class="block text-[10px] font-semibold text-slate-500 uppercase mb-0.5">Or Paste Direct Image URL</label>
              <input
                v-model="customBuildingForm.image"
                type="text"
                placeholder="https://... or /uploads/blogs/..."
                class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-amber-500 bg-white"
              />
            </div>

            <div class="md:col-span-4 flex items-center gap-3">
              <div class="relative w-14 h-14 rounded-lg overflow-hidden border border-amber-300 shadow-sm bg-slate-900 flex-shrink-0">
                <img :src="customBuildingForm.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80'" alt="Preview" class="w-full h-full object-cover" />
              </div>
              <div class="text-[11px] leading-tight">
                <span class="font-bold text-[#0F2A44] block">Building Picture</span>
                <span class="text-[10px] text-emerald-600 font-semibold block">✓ Ready for Popup</span>
                <button
                  type="button"
                  @click="triggerBuildingImagePicker"
                  class="text-[10px] text-amber-700 hover:underline font-bold mt-0.5 block"
                >
                  Change Photo &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Project Overview & Features -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Project Description *</label>
            <textarea
              v-model="customBuildingForm.description"
              rows="3"
              required
              placeholder="Detailed description of the building project, specifications, elevator, parking, Margalla view..."
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Features &amp; Amenities (Comma Separated)</label>
            <textarea
              v-model="customBuildingForm.featuresText"
              rows="3"
              placeholder="e.g. Prime Markaz location, Dedicated basement parking, High-speed elevators, 24/7 armed security, Power backup generator"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>
        </div>

        <!-- Optional Site / Project Walkthrough Video URL & Browser Upload -->
        <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                v-model="customBuildingForm.showVideo"
                class="w-4 h-4 rounded text-[#16B4E8] focus:ring-[#16B4E8] border-slate-300 cursor-pointer"
              />
              <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-600 text-white text-[9px]">▶</span>
                <span>Show Project Video Walkthrough on Website</span>
              </span>
            </label>
            <span
              class="text-[10px] px-2 py-0.5 rounded-full font-bold"
              :class="customBuildingForm.showVideo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'"
            >
              {{ customBuildingForm.showVideo ? '✓ Video Enabled' : '✗ Video Hidden' }}
            </span>
          </div>

          <!-- Shown only when checkbox is checked -->
          <div v-if="customBuildingForm.showVideo" class="p-3 bg-white rounded-xl border border-slate-200/80 space-y-2.5">
            <!-- Option 1: Browser File Upload -->
            <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60">
              <div>
                <span class="text-[11px] font-bold text-slate-700 block">Option 1: Add Video from Browser / Device</span>
                <span class="text-[10px] text-slate-500">Pick MP4 / WebM / MOV file directly from your computer</span>
              </div>
              <div>
                <input
                  type="file"
                  accept="video/*"
                  class="hidden"
                  id="custom-building-video-file"
                  @change="handleBuildingVideoFileUpload"
                />
                <label
                  for="custom-building-video-file"
                  class="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
                >
                  <span>📁 Choose Video from Browser</span>
                </label>
              </div>
            </div>

            <!-- Attached file indicator if any -->
            <div v-if="customBuildingForm.videoFileName || (customBuildingForm.videoUrl && (customBuildingForm.videoUrl.startsWith('data:') || customBuildingForm.videoUrl.startsWith('blob:')))" class="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
              <span class="truncate max-w-sm font-semibold flex items-center gap-1.5">
                <span>🎥 Attached Video:</span>
                <span>{{ customBuildingForm.videoFileName || 'Selected Video File' }}</span>
              </span>
              <button
                type="button"
                @click="clearBuildingVideoFile"
                class="text-[11px] text-rose-600 font-bold hover:underline ml-2"
              >
                Remove
              </button>
            </div>

            <!-- Option 2: Enter Video URL -->
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">Option 2: OR Enter Video URL (YouTube, Vimeo, or MP4 link)</label>
              <div class="flex items-center gap-2">
                <input
                  v-model="customBuildingForm.videoUrl"
                  type="url"
                  placeholder="e.g. https://www.youtube.com/watch?v=... or direct MP4 link"
                  class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-amber-500 bg-white"
                />
                <button
                  v-if="customBuildingForm.videoUrl"
                  type="button"
                  @click="previewVideo(customBuildingForm.videoUrl, customBuildingForm.title || customBuildingForm.name)"
                  class="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <span>▶ Test Video</span>
                </button>
              </div>
            </div>
          </div>

          <p v-else class="text-[10px] text-slate-400 italic">
            Video is unchecked. No video button or player will be shown on the website for this featured building.
          </p>
        </div>

        <!-- Live Preview Bar with Test Modal & Save Actions -->
        <div class="p-3.5 bg-gradient-to-r from-[#0B1D30] via-[#0F2A44] to-[#142D42] rounded-xl text-white flex flex-col lg:flex-row items-center justify-between gap-4 border border-amber-400/30">
          <div class="flex items-center gap-3">
            <img :src="customBuildingForm.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80'" alt="Preview" class="w-12 h-12 rounded-lg object-cover border border-amber-400/40 flex-shrink-0" />
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[9px] font-black uppercase text-amber-300">{{ customBuildingForm.tag || 'Building Spotlight' }}</span>
                <span class="text-[9px] font-extrabold text-[#0F2A44] bg-amber-400 px-1.5 py-0.2 rounded">{{ customBuildingForm.badge || '18% Yield' }}</span>
                <span class="text-[9px] font-bold text-emerald-400">{{ customBuildingForm.downPayment || '20% Down' }}</span>
              </div>
              <p class="text-xs font-black truncate max-w-sm text-white mt-0.5">{{ customBuildingForm.title || customBuildingForm.name }}</p>
              <p class="text-[10px] text-slate-300 truncate max-w-sm">{{ customBuildingForm.subtitle || 'Modern architecture with basement parking' }}</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            <!-- Test / Preview Modal Button -->
            <button
              type="button"
              @click="openBuildingPreviewModal"
              class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
            >
              <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <span>Test / Preview Modal</span>
            </button>

            <!-- Link to Dedicated Page -->
            <router-link
              to="/featured-building"
              target="_blank"
              class="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold border border-white/10 transition-all"
            >
              View Page &rarr;
            </router-link>

            <button
              type="submit"
              class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0F2A44] text-xs font-black uppercase tracking-wider transition-all shadow-md"
            >
              Save Building Spotlight
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>

    <!-- Live Rates Glance Box -->
    <div v-show="dashboardTab === 'overview'" class="bg-white rounded-xl p-6 border border-slate-200/90 shadow-2xs">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">
            Live Rates Overview
          </h2>
          <p class="text-xs text-slate-400 mt-0.5">Synchronized with public services pages</p>
        </div>
        <router-link to="/admin/rates" class="text-xs font-semibold text-[#16B4E8] hover:underline">
          Manage All Rates &rarr;
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div class="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
          <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>{{ adminStore.liveRates.moqaPlots?.pechs?.name || 'PECHS Islamabad' }}</span>
            <span class="text-[10px] text-slate-500 font-mono">Cash</span>
          </div>
          <div class="text-xs text-slate-600 space-y-1">
            <div class="flex justify-between"><span>5 Marla:</span> <strong class="text-slate-900">{{ adminStore.liveRates.moqaPlots?.pechs?.m5 }}</strong></div>
            <div class="flex justify-between"><span>10 Marla:</span> <strong class="text-slate-900">{{ adminStore.liveRates.moqaPlots?.pechs?.m10 }}</strong></div>
            <div class="flex justify-between"><span>1 Kanal:</span> <strong class="text-slate-900">{{ adminStore.liveRates.moqaPlots?.pechs?.k1 }}</strong></div>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
          <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>{{ adminStore.liveRates.moqaPlots?.topCity?.name || 'TopCity-1' }}</span>
            <span class="text-[10px] text-slate-500 font-mono">Cash</span>
          </div>
          <div class="text-xs text-slate-600 space-y-1">
            <div class="flex justify-between"><span>5 Marla:</span> <strong class="text-slate-900">{{ adminStore.liveRates.moqaPlots?.topCity?.m5 }}</strong></div>
            <div class="flex justify-between"><span>10 Marla:</span> <strong class="text-slate-900">{{ adminStore.liveRates.moqaPlots?.topCity?.m10 }}</strong></div>
            <div class="flex justify-between"><span>1 Kanal:</span> <strong class="text-slate-900">{{ adminStore.liveRates.moqaPlots?.topCity?.k1 }}</strong></div>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
          <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>{{ adminStore.liveRates.installmentPlans?.faisalTown?.name || 'Faisal Town Phase 2' }}</span>
            <span class="text-[10px] text-slate-500 font-mono">Installments</span>
          </div>
          <div class="text-xs text-slate-600 space-y-1">
            <div class="flex justify-between"><span>5.56 Marla Down:</span> <strong class="text-slate-900">{{ adminStore.liveRates.installmentPlans?.faisalTown?.m5?.down }}</strong></div>
            <div class="flex justify-between"><span>10 Marla Down:</span> <strong class="text-slate-900">{{ adminStore.liveRates.installmentPlans?.faisalTown?.m10?.down }}</strong></div>
            <div class="flex justify-between"><span>1 Kanal Down:</span> <strong class="text-slate-900">{{ adminStore.liveRates.installmentPlans?.faisalTown?.k1?.down }}</strong></div>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
          <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Solar Energy Systems</span>
            <span class="text-[10px] text-slate-500 font-mono">Net Meter</span>
          </div>
          <div class="text-xs text-slate-600 space-y-1">
            <div class="flex justify-between"><span>10kW Home:</span> <strong class="text-slate-900">{{ adminStore.liveRates.solarPackages?.kw10?.quote }}</strong></div>
            <div class="flex justify-between"><span>20kW Villa:</span> <strong class="text-slate-900">{{ adminStore.liveRates.solarPackages?.kw20?.quote }}</strong></div>
            <div class="flex justify-between"><span>50kW Commercial:</span> <strong class="text-slate-900">{{ adminStore.liveRates.solarPackages?.kw50?.quote }}</strong></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Service FAQs & Knowledge Base Manager -->
    <div v-show="dashboardTab === 'faqs'" class="bg-white rounded-xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black uppercase tracking-wider text-white bg-[#0F2A44] px-2 py-0.5 rounded">
              Service FAQs
            </span>
            <h2 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">
              Service FAQs &amp; Knowledge Base Manager
            </h2>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Edit, add, or toggle frequently asked questions displayed on public service pages (Plots, Flats, Construction, Solar, Real Estate).
          </p>
        </div>

        <button
          type="button"
          @click="openAddFaqModal"
          class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs flex-shrink-0"
        >
          <span>+ Add New FAQ</span>
        </button>
      </div>

      <!-- Service Division Tabs -->
      <div class="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
        <button
          v-for="srv in faqServices"
          :key="srv.key"
          type="button"
          @click="activeFaqService = srv.key"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 select-none"
          :class="activeFaqService === srv.key ? 'bg-[#0F2A44] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
        >
          <span>{{ srv.label }}</span>
          <span
            class="text-[10px] px-2 py-0.5 rounded-full font-bold"
            :class="activeFaqService === srv.key ? 'bg-[#16B4E8] text-[#0F2A44]' : 'bg-slate-200 text-slate-600'"
          >
            {{ getServiceFaqCount(srv.key) }}
          </span>
        </button>
      </div>

      <!-- FAQ Items List for Active Service -->
      <div class="space-y-3">
        <div
          v-for="(faq, idx) in currentServiceFaqs"
          :key="faq.id"
          class="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-2.5"
        >
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                <span class="text-[10px] font-mono text-slate-400 font-bold">#{{ idx + 1 }}</span>
                <span
                  class="text-[9px] font-black uppercase px-2 py-0.5 rounded"
                  :class="faq.active !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
                >
                  {{ faq.active !== false ? 'Live on Service Page' : 'Disabled (Hidden)' }}
                </span>
                <span class="text-[10px] text-slate-400 font-mono">Order: {{ faq.order || (idx + 1) }}</span>
              </div>
              <h4 class="text-xs sm:text-sm font-bold text-[#0F2A44] leading-snug">{{ faq.question }}</h4>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">{{ faq.answer }}</p>
            </div>

            <div class="flex items-center gap-2 flex-shrink-0 self-end sm:self-start">
              <button
                type="button"
                @click="toggleFaqActive(faq)"
                class="px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors"
                :class="faq.active !== false ? 'border-slate-200 hover:bg-slate-100 text-slate-600' : 'border-emerald-300 bg-emerald-50 text-emerald-700'"
              >
                {{ faq.active !== false ? 'Disable' : 'Enable' }}
              </button>
              <button
                type="button"
                @click="startEditFaq(faq)"
                class="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                @click="removeFaq(faq.id)"
                class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div v-if="currentServiceFaqs.length === 0" class="text-center py-8 text-xs text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          No FAQs configured for this service division yet. Click "+ Add New FAQ" to create one.
        </div>
      </div>
    </div>

    <!-- Recent Inquiries Table -->
    <div v-show="dashboardTab === 'overview'" class="bg-white rounded-xl p-6 border border-slate-200/90 shadow-2xs">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">Recent Client Inquiries</h2>
          <p class="text-xs text-slate-500 mt-0.5">Captured from website inquiry forms and WhatsApp desk</p>
        </div>
        <router-link to="/admin/leads" class="text-xs font-semibold text-[#16B4E8] hover:underline">
          View All Inquiries &rarr;
        </router-link>
      </div>

      <div class="overflow-x-auto mt-4">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200/70">
              <th class="py-3 px-3">Client</th>
              <th class="py-3 px-3">Division &amp; Project</th>
              <th class="py-3 px-3">Budget</th>
              <th class="py-3 px-3">Status</th>
              <th class="py-3 px-3">Date</th>
              <th class="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="lead in adminStore.leads.slice(0, 5)" :key="lead.id" class="hover:bg-slate-50/70 transition-colors">
              <td class="py-3 px-3">
                <div class="font-bold text-slate-900">{{ lead.name }}</div>
                <div class="text-[11px] text-slate-500 mt-0.5">
                  <span>{{ lead.phone }}</span>
                  <span v-if="lead.city" class="text-slate-400">&bull; {{ lead.city }}</span>
                </div>
              </td>
              <td class="py-3 px-3">
                <span class="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 mb-0.5 border border-slate-200">
                  {{ lead.division }}
                </span>
                <div class="text-slate-700 truncate max-w-xs">{{ lead.project }}</div>
              </td>
              <td class="py-3 px-3 font-semibold text-slate-800">
                {{ lead.budget || 'Open / Discussion' }}
              </td>
              <td class="py-3 px-3">
                <span 
                  class="px-2.5 py-1 rounded-full text-[10px] font-semibold inline-block border"
                  :class="{
                    'bg-slate-50 text-amber-800 border-amber-200': lead.status === 'New',
                    'bg-slate-50 text-blue-800 border-blue-200': lead.status === 'Contacted',
                    'bg-slate-50 text-purple-800 border-purple-200': lead.status === 'Site Visit Scheduled',
                    'bg-slate-50 text-emerald-800 border-emerald-200': lead.status === 'Closed / Won'
                  }"
                >
                  {{ lead.status }}
                </span>
              </td>
              <td class="py-3 px-3 text-slate-400 font-mono text-[11px]">
                {{ lead.date }}
              </td>
              <td class="py-3 px-3 text-right">
                <a 
                  :href="`https://wa.me/${cleanPhone(lead.phone)}?text=${encodeURIComponent(`Assalam o Alaikum ${lead.name}, thank you for contacting TopLinkers regarding ${lead.project}. How can we assist you today?`)}`"
                  target="_blank"
                  class="inline-flex items-center px-3 py-1 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white font-medium text-[11px] transition-colors shadow-xs"
                >
                  WhatsApp
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add / Edit FAQ Modal Dialog -->
    <div
      v-if="faqModalOpen"
      class="fixed inset-0 z-50 bg-[#0F2A44]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      @click.self="faqModalOpen = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-4 animate-scale-up">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8]">Service Knowledge Base</span>
            <h3 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">
              {{ editingFaqId ? 'Edit Service FAQ' : 'Add New Service FAQ' }}
            </h3>
          </div>
          <button
            type="button"
            @click="faqModalOpen = false"
            class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="saveFaqForm" class="space-y-3.5">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Target Service Division *</label>
            <select
              v-model="faqForm.service"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-[#0F2A44] focus:outline-none focus:border-[#0F2A44]"
            >
              <option value="plots">Plots Land Guide (TopCity, AGG, PECHS, Faisal Town)</option>
              <option value="flats">PHA Flats &amp; Luxury Suites (I-12, I-16, G-11, Harsukh)</option>
              <option value="construction">Turnkey House Construction &amp; Architecture</option>
              <option value="solar">Tier-1 Solar Net Metering (IESCO)</option>
              <option value="real-estate">Real Estate Advisory &amp; Verified Brokerage</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Question Headline *</label>
            <input
              v-model="faqForm.question"
              type="text"
              required
              placeholder="e.g. What documents are required for cash plot transfer?"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-[#0F2A44] focus:outline-none focus:border-[#0F2A44]"
            />
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Answer Text *</label>
            <textarea
              v-model="faqForm.answer"
              rows="4"
              required
              placeholder="Provide a clear, detailed, and reassuring response for clients..."
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#0F2A44]"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Display Sort Order</label>
              <input
                v-model.number="faqForm.order"
                type="number"
                min="1"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0F2A44]"
              />
            </div>

            <div class="flex items-end pb-1">
              <label class="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700">
                <input
                  v-model="faqForm.active"
                  type="checkbox"
                  class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
                <span>Active on Public Page</span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              @click="faqModalOpen = false"
              class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2 rounded-xl bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-bold transition-colors shadow-xs"
            >
              {{ editingFaqId ? 'Save Changes' : 'Publish FAQ Live' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Interactive Building Details Modal Preview for Admin -->
    <BuildingDetailsModal
      :is-open="showBuildingPreviewModal"
      :building="customBuildingPreviewData"
      @close="showBuildingPreviewModal = false"
    />

    <!-- Video Walkthrough Preview Lightbox for Admin -->
    <SiteVideoModal
      :is-open="previewModalOpen"
      :video-url="previewVideoUrl"
      :title="previewVideoTitle"
      subtitle="Testing project site video walkthrough before publishing"
      @close="previewModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {
  CurrencyDollarIcon,
  UsersIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  Squares2X2Icon,
  BuildingOffice2Icon,
  NewspaperIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'
import { usePropertiesStore } from '../../stores/properties'
import { fetchAdminServicesDashboard } from '../../services/servicesCmsApi'
import AdminStatCard from '../../components/admin/AdminStatCard.vue'
import BuildingDetailsModal from '../../components/ui/BuildingDetailsModal.vue'
import SiteVideoModal from '../../components/common/SiteVideoModal.vue'

const adminStore = useAdminStore()
const propertiesStore = usePropertiesStore()
const dashboardTab = ref('overview')

const serviceStats = ref({ total: 0, published: 0, draft: 0 })
const recentServices = ref([])

const featuredPropertiesCount = computed(() =>
  (propertiesStore.properties || []).filter(p => p.featured).length
)

const leadsByDivision = computed(() => {
  const list = adminStore.leads || []
  const total = list.length || 1
  const counts = {}
  for (const item of list) {
    const div = item.division || 'General'
    counts[div] = (counts[div] || 0) + 1
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, count]) => ({
      label,
      count,
      pct: Math.round((count / total) * 100)
    }))
})

onMounted(async () => {
  if (!propertiesStore.properties?.length && typeof propertiesStore.fetchProperties === 'function') {
    propertiesStore.fetchProperties().catch(() => {})
  }
  if (adminStore.canAccessModule('services')) {
    try {
      const cms = await fetchAdminServicesDashboard()
      if (cms?.stats) {
        serviceStats.value = {
          total: cms.stats.total ?? 0,
          published: cms.stats.published ?? 0,
          draft: cms.stats.draft ?? 0
        }
      }
      if (Array.isArray(cms?.services)) {
        recentServices.value = [...cms.services]
          .sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')))
          .slice(0, 5)
      }
    } catch {
      // Non-fatal
    }
  }
})

const promoForm = ref({ ...adminStore.promoStrip })

watch(
  () => adminStore.promoStrip,
  (val) => {
    if (val) promoForm.value = { ...val }
  },
  { deep: true }
)

// Spotlight Popup State and Quick Presets
const spotlightForm = ref({ ...adminStore.spotlightPopup })

watch(
  () => adminStore.spotlightPopup,
  (val) => {
    if (val) spotlightForm.value = { ...val }
  },
  { deep: true }
)

const spotlightPresets = [
  {
    key: 'harsukh',
    name: 'Harsukh Nathia Gali',
    badgeText: '20%+ Rental ROI',
    tag: 'Harsukh | Nathia Gali',
    badge: '20%+ Rental ROI',
    downPayment: '15% Down',
    planText: '3-Yr Plan',
    title: 'Wake Up Above The Clouds?',
    subtitle: 'Luxury pine-valley suites at 8,200 ft. Tap to explore ->',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
    link: '/hr-sukh'
  },
  {
    key: 'topcity',
    name: 'TopCity-1 Moqa Plot',
    badgeText: 'Cash Ready',
    tag: 'TopCity-1 | Airport Gate',
    badge: 'Immediate Possession',
    downPayment: '100% Cash Ready',
    planText: 'Block B Demarcated',
    title: 'Own On-Ground Land at Airport Gate',
    subtitle: 'Direct registry & ready demarcation in prime TopCity-1 ->',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=300&q=80',
    link: '/services/residential-plots#cash'
  },
  {
    key: 'faisal_town',
    name: 'Faisal Town Phase 2',
    badgeText: 'Installment File',
    tag: 'Faisal Town II | Motorway',
    badge: 'High Growth ROI',
    downPayment: 'Rs. 595,000 Down',
    planText: '4.5-Yr Plan',
    title: 'High-ROI Motorway Interchange Plots',
    subtitle: 'Zedem International project with flexible quarterly files ->',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=300&q=80',
    link: '/services/residential-plots#installments'
  },
  {
    key: 'faisal_heights',
    name: 'Faisal Heights Suites',
    badgeText: 'F-18 Luxury',
    tag: 'Faisal Heights | Sector F-18',
    badge: 'Zedem International',
    downPayment: 'Flexible Plan',
    planText: 'Studio to 4-Bed Lofts',
    title: 'Executive Luxury Suites & Lofts',
    subtitle: 'Modern architecture with dedicated parking, gym, pool & rooftop garden ->',
    image: '/images/faisal-heights/fh-main.webp',
    link: '/services/apartments-flats'
  }
]

const applySpotlightPreset = (presetKey) => {
  const p = spotlightPresets.find(item => item.key === presetKey)
  if (!p) return
  spotlightForm.value.tag = p.tag
  spotlightForm.value.badge = p.badge
  spotlightForm.value.downPayment = p.downPayment
  spotlightForm.value.planText = p.planText
  spotlightForm.value.title = p.title
  spotlightForm.value.subtitle = p.subtitle
  spotlightForm.value.image = p.image
  spotlightForm.value.link = p.link
  adminStore.showToast(`Loaded preset: ${p.name}`)
}

const saveSpotlight = async () => {
  await adminStore.saveSpotlightPopup({ ...spotlightForm.value })
  if (spotlightForm.value.enabled) {
    adminStore.showToast('Spotlight Popup is now ACTIVE on website screen!')
  } else {
    adminStore.showToast('Spotlight Popup is now TURNED OFF (Hidden from website)!')
  }
}

// Video Preview Modal State for Admin Walkthrough Testing
const previewModalOpen = ref(false)
const previewVideoUrl = ref('')
const previewVideoTitle = ref('')

const previewVideo = (url, title) => {
  if (!url) return
  previewVideoUrl.value = url
  previewVideoTitle.value = title || 'Project Site Video Walkthrough'
  previewModalOpen.value = true
}

// =========================================================================
// CUSTOM BUILDING / PROJECT SPOTLIGHT (POPUP 2 & DETAILS MODAL)
// =========================================================================
const formatFeaturesForForm = (feats) => {
  if (Array.isArray(feats)) return feats.join(', ')
  return feats || ''
}

const customBuildingForm = ref({
  enabled: adminStore.customBuilding?.enabled ?? false,
  name: adminStore.customBuilding?.name || 'Faisal Heights Luxury Apartments',
  tag: adminStore.customBuilding?.tag || 'Sector F-18, Faisal Town | Zedem International',
  badge: adminStore.customBuilding?.badge || 'Studio to 4-Bed Lofts',
  downPayment: adminStore.customBuilding?.downPayment || 'Flexible Plan',
  price: adminStore.customBuilding?.price || 'Market & Installment Rates',
  location: adminStore.customBuilding?.location || 'Sector F-18, Faisal Town, Islamabad',
  title: adminStore.customBuilding?.title || 'Faisal Heights — Luxury Residential Living in F-18',
  subtitle: adminStore.customBuilding?.subtitle || 'Premier luxury residential tower project by Zedem International / Faisal Town in Sector F-18, Islamabad.',
  description: adminStore.customBuilding?.description || 'Faisal Heights offers modern apartment living in Sector F-18, Faisal Town, Islamabad, near Srinagar Highway and M-1/M-2 Motorways. Developed by Zedem International, featuring studio, 1-bed, 2-bed, 3-bed, and 4-bed lofts with private pool, gym, café, and rooftop garden.',
  image: adminStore.customBuilding?.image || '/images/faisal-heights/fh-main.webp',
  link: adminStore.customBuilding?.link || '/featured-building',
  showVideo: adminStore.customBuilding?.showVideo === true,
  videoFileName: adminStore.customBuilding?.videoFileName || '',
  videoUrl: adminStore.customBuilding?.videoUrl || '',
  featuresText: formatFeaturesForForm(adminStore.customBuilding?.features || [
    'NOC Approved by Zedem International / Faisal Town',
    'Sector F-18 Prime Location near Srinagar Highway',
    'Exclusive Residents Swimming Pool & Modern Equipped Gym',
    'Dedicated Basement Parking Floors',
    'High-Speed Elevators Serving All Residential Floors',
    '24/7 CCTV Surveillance & Backup Generator'
  ]),
  phone: adminStore.customBuilding?.phone || '0334-9522157',
  whatsappMsg: adminStore.customBuilding?.whatsappMsg || 'Hello TopLinkers, I am inquiring about Faisal Heights Luxury Apartments in Sector F-18, Faisal Town.'
})

watch(
  () => adminStore.customBuilding,
  (val) => {
    if (val) {
      customBuildingForm.value = {
        ...val,
        featuresText: formatFeaturesForForm(val.features)
      }
    }
  },
  { deep: true }
)

const buildingPresets = [
  {
    key: 'faisal_heights',
    name: 'Faisal Heights Luxury Apartments',
    tag: 'Sector F-18, Faisal Town | Zedem International',
    badge: 'Studio to 4-Bed Lofts',
    downPayment: 'Flexible Plan',
    price: 'Market & Installment Rates',
    location: 'Sector F-18, Faisal Town, Islamabad',
    title: 'Faisal Heights — Luxury Residential Living in F-18',
    subtitle: 'Modern luxury residential tower by Zedem International / Faisal Town in Sector F-18, Islamabad.',
    description: 'Faisal Heights offers modern apartment living in Sector F-18, Faisal Town, Islamabad, near Srinagar Highway. Developed by Zedem International, this residential project features studio, 1-bed, 2-bed, 3-bed and 4-bed lofts with contemporary layouts, private pool, gym, café, and rooftop garden.',
    image: '/images/faisal-heights/fh-main.webp',
    link: '/featured-building',
    videoUrl: '',
    features: 'Prime Location in Sector F-18, Faisal Town, Islamabad, Modern Earthquake-Resistant Structural Design*, Dedicated Basement Parking Floors, Modern Passenger & Service Elevators, 24/7 CCTV Surveillance & Security Arrangements, Backup Power Generator'
  },
  {
    key: 'airport_plaza',
    name: 'Airport Commercial Complex',
    tag: 'TopCity-1 | Airport Gate',
    badge: '22% Commercial ROI',
    downPayment: '25% Down',
    price: 'PKR 85 Lac – 2.40 Cr',
    location: 'Main Blvd, TopCity-1 Airport Corridor',
    title: 'Prime Commercial Shops & Executive Offices',
    subtitle: 'High footfall airport corridor retail outlets with 3-year installment flexibility',
    description: 'Strategically located on the main entrance avenue of TopCity-1 near New Islamabad Airport. Ground floor retail shops and upper-floor corporate office suites with glass facades and modern high-speed infrastructure.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    link: '/featured-building',
    videoUrl: '',
    features: 'Main Boulevard frontage, 24/7 generator backup, High-speed capsule elevators, Dedicated corporate lobby, Underground parking, 100% legal RDA approved'
  },
  {
    key: 'margalla_suites',
    name: 'Margalla Executive Suites',
    tag: 'Sector D-12 | Margalla',
    badge: 'Margalla Hill View',
    downPayment: '30% Down',
    price: 'PKR 1.80 Cr – 3.90 Cr',
    location: 'Sector D-12/1 Islamabad',
    title: 'Scenic Panorama Luxury Residences',
    subtitle: 'Boutique hill-view apartments adjoining the Margalla Hills National Park',
    description: 'Experience tranquil luxury living in Sector D-12 Islamabad. Exclusive boutique suites with floor-to-ceiling glass windows, smart home automation, Italian kitchenettes, and uninterrupted panoramic views of the Margallas.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    link: '/featured-building',
    videoUrl: '',
    features: 'Direct Margalla views, Smart home automation, Italian fitted kitchens, Rooftop barbecue terrace, 24/7 manned security, Dedicated covered parking'
  },
  {
    key: 'al_hameed_tower',
    name: 'Al-Hameed Business Tower',
    tag: 'G-11 Markaz | Islamabad',
    badge: 'Corporate Ready',
    downPayment: '100% Cash / Swift',
    price: 'PKR 2.10 Cr – 4.50 Cr',
    location: 'Al Hameed Plaza, G-11 Markaz Islamabad',
    title: 'Grade-A Corporate Headquarters & Offices',
    subtitle: 'Ready-to-move corporate executive offices with dedicated fiber optic & parking',
    description: 'Premier commercial business hub in G-11 Markaz Islamabad. Fully completed Grade-A corporate office suites suitable for multinational companies, software houses, engineering consultancies, and financial firms.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    link: '/featured-building',
    videoUrl: '',
    features: 'Centrally air-conditioned lobby, Redundant high-speed fiber internet, Dual commercial elevators, Secure access control, Ample plaza visitor parking, Bank and pharmacy on ground floor'
  }
]

const applyBuildingPreset = (presetKey) => {
  const p = buildingPresets.find(item => item.key === presetKey)
  if (!p) return
  customBuildingForm.value.name = p.name
  customBuildingForm.value.tag = p.tag
  customBuildingForm.value.badge = p.badge
  customBuildingForm.value.downPayment = p.downPayment
  customBuildingForm.value.price = p.price
  customBuildingForm.value.location = p.location
  customBuildingForm.value.title = p.title
  customBuildingForm.value.subtitle = p.subtitle
  customBuildingForm.value.description = p.description
  customBuildingForm.value.image = p.image
  customBuildingForm.value.link = p.link || '/featured-building'
  customBuildingForm.value.showVideo = true
  customBuildingForm.value.videoFileName = ''
  customBuildingForm.value.videoUrl = p.videoUrl || ''
  customBuildingForm.value.featuresText = p.features
  adminStore.showToast(`Loaded building preset: ${p.name}`)
}

// Browser Video File Upload & Clear Handlers for Featured Building
const handleBuildingVideoFileUpload = (event) => {
  const file = event.target?.files?.[0]
  if (!file) return

  const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|ogg|mov|m4v)$/i.test(file.name)
  if (!isVideo) {
    adminStore.showToast('Please select a valid video file (.mp4, .webm, .mov, etc.)', 'error')
    return
  }

  const sizeMb = (file.size / (1024 * 1024)).toFixed(1)
  customBuildingForm.value.videoFileName = `${file.name} (${sizeMb} MB)`
  customBuildingForm.value.showVideo = true

  if (file.size <= 8 * 1024 * 1024) {
    const reader = new FileReader()
    reader.onload = (e) => {
      customBuildingForm.value.videoUrl = e.target.result
      adminStore.showToast(`Video loaded: ${file.name} (${sizeMb} MB)`)
    }
    reader.onerror = () => {
      adminStore.showToast('Failed to read video file', 'error')
    }
    reader.readAsDataURL(file)
  } else {
    customBuildingForm.value.videoUrl = URL.createObjectURL(file)
    adminStore.showToast(`Video attached from browser (${sizeMb} MB). Ready for testing!`, 'info')
  }

  if (event.target) event.target.value = ''
}

const clearBuildingVideoFile = () => {
  customBuildingForm.value.videoUrl = ''
  customBuildingForm.value.videoFileName = ''
  customBuildingForm.value.showVideo = false
  adminStore.showToast('Video cleared and hidden on website.', 'info')
}

// Browser File Picker & Image Upload Handler
const buildingImageInput = ref(null)
const isUploadingBuildingImage = ref(false)

const triggerBuildingImagePicker = () => {
  buildingImageInput.value?.click()
}

const onBuildingImagePicked = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  // 1. Instant local preview from browser memory via FileReader
  const reader = new FileReader()
  reader.onload = (e) => {
    if (e.target?.result) {
      customBuildingForm.value.image = e.target.result
    }
  }
  reader.readAsDataURL(file)

  // 2. Upload file directly to server backend
  isUploadingBuildingImage.value = true
  try {
    const uploadedUrl = await adminStore.uploadImage(file)
    if (uploadedUrl) {
      customBuildingForm.value.image = uploadedUrl
      adminStore.showToast('Building picture uploaded & linked successfully!')
    }
  } catch (err) {
    adminStore.showToast('Photo selected from browser! Saving with spotlight form.')
  } finally {
    isUploadingBuildingImage.value = false
    // Reset file input so re-selecting same file triggers @change
    if (event.target) event.target.value = ''
  }
}

// Admin Preview Modal State
const showBuildingPreviewModal = ref(false)

const customBuildingPreviewData = computed(() => {
  const feats = customBuildingForm.value.featuresText
    ? customBuildingForm.value.featuresText.split(',').map(s => s.trim()).filter(Boolean)
    : []
  return {
    ...customBuildingForm.value,
    features: feats
  }
})

const openBuildingPreviewModal = () => {
  showBuildingPreviewModal.value = true
}

const saveCustomBuildingToggle = async () => {
  await saveCustomBuilding()
}

const saveCustomBuilding = async () => {
  const feats = customBuildingForm.value.featuresText
    ? customBuildingForm.value.featuresText.split(',').map(s => s.trim()).filter(Boolean)
    : []

  const payload = {
    ...customBuildingForm.value,
    features: feats
  }

  await adminStore.saveCustomBuilding(payload)

  if (customBuildingForm.value.enabled) {
    adminStore.showToast('Building Spotlight (Popup 2) is now ACTIVE on website!')
  } else {
    adminStore.showToast('Building Spotlight (Popup 2) is now TURNED OFF!')
  }
}

const savePromo = async () => {
  await adminStore.savePromoStrip({ ...promoForm.value })
  if (promoForm.value.enabled) {
    adminStore.showToast('Top offer strip is now ACTIVE on the front page!')
  } else {
    adminStore.showToast('Top offer strip is now HIDDEN from the front page!')
  }
}

const cleanPhone = (phone) => {
  if (!phone) return '923349522157'
  const digits = phone.replace(/[^0-9]/g, '')
  if (digits.startsWith('0')) return '92' + digits.substring(1)
  return digits
}

// ==========================================
// Service FAQs Manager Logic
// ==========================================
const activeFaqService = ref('plots')
const faqServices = [
  { key: 'plots', label: 'Plots Land FAQs' },
  { key: 'flats', label: 'PHA Flats FAQs' },
  { key: 'construction', label: 'Construction FAQs' },
  { key: 'solar', label: 'Solar Net Metering FAQs' },
  { key: 'real-estate', label: 'Real Estate FAQs' }
]

const currentServiceFaqs = computed(() => adminStore.getAllFaqsByService(activeFaqService.value))
const getServiceFaqCount = (key) => adminStore.getAllFaqsByService(key).length

const faqModalOpen = ref(false)
const editingFaqId = ref(null)
const faqForm = ref({
  service: 'plots',
  question: '',
  answer: '',
  order: 1,
  active: true
})

const openAddFaqModal = () => {
  editingFaqId.value = null
  faqForm.value = {
    service: activeFaqService.value,
    question: '',
    answer: '',
    order: currentServiceFaqs.value.length + 1,
    active: true
  }
  faqModalOpen.value = true
}

const startEditFaq = (faq) => {
  editingFaqId.value = faq.id
  faqForm.value = { ...faq }
  faqModalOpen.value = true
}

const saveFaqForm = async () => {
  if (!faqForm.value.question?.trim() || !faqForm.value.answer?.trim()) {
    adminStore.showToast('Please provide both question and answer', 'error')
    return
  }
  if (editingFaqId.value) {
    await adminStore.updateFaq(editingFaqId.value, { ...faqForm.value })
    adminStore.showToast('FAQ updated successfully!')
  } else {
    await adminStore.addFaq({ ...faqForm.value })
    adminStore.showToast('New FAQ added and published live!')
  }
  faqModalOpen.value = false
}

const toggleFaqActive = async (faq) => {
  await adminStore.updateFaq(faq.id, { active: faq.active === false ? true : false })
  adminStore.showToast(`FAQ status updated!`)
}

const removeFaq = async (id) => {
  const confirmed = await adminStore.requestConfirm({
    title: 'Delete FAQ',
    message: 'Are you sure you want to delete this FAQ from the live service page?'
  })
  if (confirmed) {
    await adminStore.deleteFaq(id)
    adminStore.showToast('FAQ deleted.')
  }
}
</script>
