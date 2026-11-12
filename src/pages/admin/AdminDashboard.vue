<template>
  <div class="space-y-6">
    <!-- Top Welcome Banner (Decent, Clean Corporate Slate-Navy) -->
    <div class="bg-[#0F2A44] rounded-xl p-6 sm:p-7 text-white border border-slate-700/60 shadow-xs">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div class="text-[11px] font-semibold text-cyan-300 uppercase tracking-wider mb-1.5">
            TopLinkers Executive Portal • Head Office CRM
          </div>
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Welcome, {{ adminStore.adminUser?.name || 'Chief Administrator' }}
          </h1>
          <p class="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Centralized portal for managing client inquiries, market rate schedules (Moqa plots, installment plans, PHA flats &amp; Solar), and inventory.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <router-link 
            to="/admin/blogs" 
            class="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Manage Articles
          </router-link>

          <router-link 
            to="/admin/rates" 
            class="px-3.5 py-2 rounded-lg bg-[#16B4E8] hover:bg-[#119ecf] text-[#0F2A44] font-bold text-xs transition-colors shadow-xs"
          >
            Update Live Rates
          </router-link>

          <router-link 
            to="/admin/leads" 
            class="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors border border-white/20"
          >
            View All Leads
          </router-link>
        </div>
      </div>
    </div>

    <!-- 3 Clean Executive Metric Cards (Decent, Minimalist, Non-Colory) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Total Leads -->
      <div class="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
        <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Inquiries</p>
        <p class="text-2xl font-bold text-slate-900 mt-1.5">{{ adminStore.totalLeadsCount }}</p>
        <p class="text-[11px] text-slate-500 mt-1">Verified CRM database</p>
      </div>

      <!-- Pending Attention -->
      <div class="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
        <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pending Attention</p>
        <p class="text-2xl font-bold text-slate-900 mt-1.5">{{ adminStore.newLeadsCount }}</p>
        <p class="text-[11px] text-amber-700 font-medium mt-1">Requires consultant action</p>
      </div>

      <!-- Pipeline Value -->
      <div class="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
        <p class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Estimated Pipeline</p>
        <p class="text-2xl font-bold text-slate-900 mt-1.5">PKR 14.8 Cr</p>
        <p class="text-[11px] text-slate-500 mt-1">Active client portfolio</p>
      </div>
    </div>

    <!-- Front Page Top Offer Strip Manager -->
    <div class="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wide">Front Page Top Offer Strip</h2>
          <p class="text-xs text-slate-500 mt-0.5">Announcement banner shown at the top of the website for campaigns</p>
        </div>

        <label class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold text-slate-700">
          <input v-model="promoForm.enabled" type="checkbox" class="rounded text-[#0F2A44] focus:ring-[#0F2A44]" />
          <span>Show Strip on Front Page</span>
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

    <!-- Live Rates Glance Box -->
    <div class="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs">
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

    <!-- Recent Inquiries Table -->
    <div class="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs">
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
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  CurrencyDollarIcon,
  UsersIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()

const promoForm = ref({ ...adminStore.promoStrip })

watch(
  () => adminStore.promoStrip,
  (val) => {
    if (val) promoForm.value = { ...val }
  },
  { deep: true }
)

const savePromo = async () => {
  await adminStore.savePromoStrip({ ...promoForm.value })
  adminStore.showToast('Front page offer strip updated & synced to backend!')
}

const cleanPhone = (phone) => {
  if (!phone) return '923235963375'
  const digits = phone.replace(/[^0-9]/g, '')
  if (digits.startsWith('0')) return '92' + digits.substring(1)
  return digits
}
</script>
