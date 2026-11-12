<template>
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="isVisible"
      class="top-offer-fully-sliding-strip bg-gradient-to-r from-[#071320] via-[#0E253D] to-[#071320] text-white border-b border-[#16B4E8]/25 mt-[66px] sm:mt-[80px] relative z-30 shadow-md select-none group"
    >
      <div class="w-full flex items-center py-2 sm:py-2.5">
        
        <!-- Left: Simple Clean Promotion Tag (Not a button) -->
        <div class="flex-shrink-0 flex items-center pl-3.5 sm:pl-6 pr-2 sm:pr-3 z-20">
          <div class="inline-flex items-center gap-1.5 text-amber-400 font-black text-[10px] sm:text-xs uppercase tracking-wider">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <SparklesIcon class="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span class="whitespace-nowrap">PROMOTIONS</span>
            <span class="text-white/25 font-light ml-1 hidden sm:inline">|</span>
          </div>
        </div>

        <!-- Center: Fully Sliding Continuous Infinite Marquee Viewport with Soft Fade Edges -->
        <div class="flex-1 overflow-hidden relative mask-fade-marquee h-7 sm:h-8 flex items-center">
          <div class="marquee-track flex items-center">
            <!-- First Set of Deals -->
            <div
              v-for="deal in allOffers"
              :key="`s1-${deal.id}`"
              @click="openDiscountForm(deal)"
              class="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 cursor-pointer hover:text-cyan-300 transition-colors flex-shrink-0 group/item"
              :title="`Click to claim voucher for ${deal.headline}`"
            >
              <span
                class="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider flex-shrink-0 shadow-xs"
                :class="deal.badgeClass || 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'"
              >
                {{ deal.badge }}
              </span>
              <span class="text-xs font-bold text-white group-hover/item:text-[#16B4E8] transition-colors whitespace-nowrap">
                {{ deal.headline }}
              </span>
              <span class="text-xs text-slate-300 whitespace-nowrap hidden md:inline">
                &bull; {{ deal.desc }}
              </span>
              <span
                v-if="deal.code"
                class="text-[9px] sm:text-[10px] font-mono text-cyan-300 bg-white/10 px-1.5 py-0.5 rounded border border-white/10 flex-shrink-0"
              >
                CODE: {{ deal.code }}
              </span>
              <span class="text-cyan-400/40 font-bold ml-2 sm:ml-4">&bull;</span>
            </div>

            <!-- Second Set of Deals (Exact Duplicate for 100% Seamless Infinite Loop) -->
            <div
              v-for="deal in allOffers"
              :key="`s2-${deal.id}`"
              @click="openDiscountForm(deal)"
              class="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 cursor-pointer hover:text-cyan-300 transition-colors flex-shrink-0 group/item"
              :title="`Click to claim voucher for ${deal.headline}`"
            >
              <span
                class="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider flex-shrink-0 shadow-xs"
                :class="deal.badgeClass || 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'"
              >
                {{ deal.badge }}
              </span>
              <span class="text-xs font-bold text-white group-hover/item:text-[#16B4E8] transition-colors whitespace-nowrap">
                {{ deal.headline }}
              </span>
              <span class="text-xs text-slate-300 whitespace-nowrap hidden md:inline">
                &bull; {{ deal.desc }}
              </span>
              <span
                v-if="deal.code"
                class="text-[9px] sm:text-[10px] font-mono text-cyan-300 bg-white/10 px-1.5 py-0.5 rounded border border-white/10 flex-shrink-0"
              >
                CODE: {{ deal.code }}
              </span>
              <span class="text-cyan-400/40 font-bold ml-2 sm:ml-4">&bull;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- ====================================================================== -->
  <!-- SLIDING DISCOUNT INQUIRY & VOUCHER CLAIM FORM (MODAL / SLIDE DRAWER)   -->
  <!-- ====================================================================== -->
  <transition name="slide-modal">
    <div
      v-if="showFormModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111D]/80 backdrop-blur-sm overflow-y-auto"
      @click.self="closeDiscountForm"
    >
      <div
        class="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden relative animate-popup-in"
      >
        <!-- Modal Top Color Header Strip -->
        <div class="bg-gradient-to-r from-[#0F2A44] via-[#123150] to-[#0F2A44] p-6 text-white relative">
          <!-- Close Button -->
          <button
            type="button"
            @click="closeDiscountForm"
            aria-label="Close discount form"
            class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <XMarkIcon class="w-4 h-4" />
          </button>

          <div class="flex items-center gap-2 mb-2">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-[#0F2A44] text-[10px] font-black uppercase tracking-wider">
              <SparklesIcon class="w-3.5 h-3.5 text-[#0F2A44]" />
              <span>OFFICIAL DISCOUNT VOUCHER</span>
            </span>
            <span class="text-[10px] text-cyan-300 font-mono font-bold">TOPLINKERS DIRECT</span>
          </div>

          <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            Claim Your Discount Deal
          </h3>
          <p class="text-xs text-slate-300 mt-1 leading-relaxed">
            Submit your details below to lock in verified direct pricing, cash discounts, and receive your voucher code on WhatsApp.
          </p>

          <!-- Current Selected Offer Highlight Card -->
          <div class="mt-4 p-3 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3">
            <div class="p-2 rounded-lg bg-[#16B4E8]/20 text-[#16B4E8] flex-shrink-0 mt-0.5">
              <TagIcon class="w-5 h-5 text-cyan-300" />
            </div>
            <div class="min-w-0">
              <p class="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                {{ selectedDealForForm?.badge || 'EXCLUSIVE OFFER' }}
              </p>
              <p class="text-xs sm:text-sm font-black text-white truncate">
                {{ selectedDealForForm?.headline }}
              </p>
              <p class="text-[11px] text-slate-200 mt-0.5">
                {{ selectedDealForForm?.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- Form Body or Success State -->
        <div class="p-6">
          <!-- SUCCESS CONFIRMATION -->
          <div v-if="claimSuccess" class="text-center py-4 space-y-4">
            <div class="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircleIcon class="w-8 h-8" />
            </div>

            <div>
              <h4 class="text-lg font-black text-[#0F2A44]">
                Discount Voucher Reserved!
              </h4>
              <p class="text-xs text-slate-500 mt-1">
                Your request has been registered in our executive system.
              </p>
            </div>

            <!-- Generated Voucher Code Card -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-sm mx-auto text-center space-y-1">
              <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Your Official Voucher Code
              </p>
              <p class="text-xl font-mono font-black text-[#16B4E8] tracking-widest">
                {{ generatedVoucherCode }}
              </p>
              <p class="text-[11px] text-slate-600 font-medium">
                {{ selectedDealForForm?.headline }}
              </p>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                :href="whatsappDirectUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>Chat On WhatsApp Now</span>
              </a>

              <button
                type="button"
                @click="closeDiscountForm"
                class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          <!-- INPUT FORM -->
          <form v-else @submit.prevent="handleClaimSubmit" class="space-y-4">
            <!-- Full Name -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">
                Full Name <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="claimForm.name"
                  type="text"
                  required
                  placeholder="e.g. Muhammad Farooq"
                  class="w-full pl-3.5 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20 transition-all text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            <!-- WhatsApp / Mobile Number -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp / Phone Number <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="claimForm.phone"
                  type="tel"
                  required
                  placeholder="0334-9522157 or +92..."
                  class="w-full pl-3.5 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20 transition-all text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            <!-- Deal Selection Dropdown -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">
                Selected Discount Deal
              </label>
              <select
                v-model="claimForm.dealId"
                class="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20 transition-all text-slate-800 bg-white"
                @change="onDealChange"
              >
                <option v-for="deal in allOffers" :key="deal.id" :value="deal.id">
                  {{ deal.badge }} — {{ deal.headline }}
                </option>
              </select>
            </div>

            <!-- Optional Note -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">
                Specific Sector / Requirement <span class="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                v-model="claimForm.notes"
                type="text"
                placeholder="e.g. Plot demarcation date, 1 Kanal budget, etc."
                class="w-full pl-3.5 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20 transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0F2A44] font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span v-if="isSubmitting">Processing Voucher...</span>
              <template v-else>
                <TicketIcon class="w-4 h-4 text-[#0F2A44]" />
                <span>Claim Official Discount Voucher</span>
                <ArrowRightIcon class="w-3.5 h-3.5 text-[#0F2A44]" />
              </template>
            </button>

            <!-- Trust Micro-Copy -->
            <p class="text-[10px] text-center text-slate-400">
              🔒 Direct executive deal verification &bull; Zero spam &bull; RDA/CDA verified transparency
            </p>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  SparklesIcon,
  TicketIcon,
  ArrowRightIcon,
  XMarkIcon,
  TagIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()
const dismissed = ref(false)

// 5 Curated TopLinkers Discount Offers
const defaultOffers = [
  {
    id: 'deal-plot',
    badge: '🔥 10% CASH OFF',
    badgeClass: 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0F2A44]',
    code: 'TOP-PLOT10',
    headline: 'Prime Moqa Ka Plot (TopCity-1 & PECHS)',
    desc: 'Special 10% Cash Rebate + Instant Possession & RDA/CDA Demarcation Transfer on Block B Plots!',
    ctaLink: '/property/corner-plot-topcity',
    ctaLabel: 'View Plot'
  },
  {
    id: 'deal-harsukh',
    badge: '🏔️ 15% DOWN PAYMENT',
    badgeClass: 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white',
    code: 'HARSUKH-20ROI',
    headline: 'Harsukh Hilltop Luxury Suites (Nathia Gali)',
    desc: '15% Booking + 3-Year Flexible Installments + Guaranteed 20%+ Annual Tourist Rental Yield!',
    ctaLink: '/hr-sukh',
    ctaLabel: 'Explore Harsukh'
  },
  {
    id: 'deal-solar',
    badge: '☀️ FREE 10kW SOLAR',
    badgeClass: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0F2A44]',
    code: 'SOLAR-NETMETER',
    headline: 'Turnkey A+ Villa Construction Package',
    desc: 'Free 10kW On-Grid Net Metering Solar System + Architectural Design on Full Villa Construction!',
    ctaLink: '/services#solar',
    ctaLabel: 'Solar Details'
  },
  {
    id: 'deal-pha',
    badge: '🏢 PKR 500,000 DISCOUNT',
    badgeClass: 'bg-gradient-to-r from-violet-400 to-purple-500 text-white',
    code: 'PHA-FLAT500',
    headline: 'Renovated PHA Luxury Flats (I-12 & I-16)',
    desc: 'Flat PKR 5 Lac Cash Discount on Ready Possession 3-Bed Executive Corner Flats with CDA Registry!',
    ctaLink: '/listings?category=pha-flats',
    ctaLabel: 'Browse Flats'
  },
  {
    id: 'deal-overseas',
    badge: '🌍 0% COMMISSION DEAL',
    badgeClass: 'bg-gradient-to-r from-rose-400 to-red-500 text-white',
    code: 'OVERSEAS-VIP',
    headline: 'Overseas Pakistani Investor Advisory',
    desc: '0% Brokerage Commission + Free Legal Title Verification & Remote Video Walkthroughs!',
    ctaLink: '/contact',
    ctaLabel: 'Contact Desk'
  }
]

// Merge with backend promoStrip if admin configured custom text
const promo = computed(() => adminStore.promoStrip || {})

const allOffers = computed(() => {
  const list = [...defaultOffers]
  // Only prepend admin promo if custom-edited by admin
  if (
    promo.value?.enabled &&
    promo.value?.text &&
    !promo.value.text.includes('Special Reduced Rates on Selected PECHS') &&
    promo.value.text.trim().length > 0
  ) {
    list.unshift({
      id: 'admin-promo',
      badge: promo.value.badge || '⚡ FLASH OFFER',
      badgeClass: 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0F2A44]',
      code: 'TOP-FLASH',
      headline: 'Special Limited-Time Announcement',
      desc: promo.value.text,
      ctaLink: promo.value.ctaLink || '/listings',
      ctaLabel: promo.value.ctaLabel || 'Explore'
    })
  }
  return list
})

const isVisible = computed(() => {
  return !dismissed.value
})

// ============================================================================
// SLIDING DISCOUNT CLAIM FORM (MODAL / DRAWER)
// ============================================================================
const showFormModal = ref(false)
const selectedDealForForm = ref(null)
const isSubmitting = ref(false)
const claimSuccess = ref(false)
const generatedVoucherCode = ref('')
const whatsappDirectUrl = ref('')

const claimForm = ref({
  name: '',
  phone: '',
  dealId: '',
  notes: ''
})

const openDiscountForm = (deal) => {
  selectedDealForForm.value = deal || allOffers.value[0]
  claimForm.value.dealId = selectedDealForForm.value.id
  claimSuccess.value = false
  showFormModal.value = true
}

const onDealChange = () => {
  const found = allOffers.value.find(d => d.id === claimForm.value.dealId)
  if (found) {
    selectedDealForForm.value = found
  }
}

const closeDiscountForm = () => {
  showFormModal.value = false
  claimSuccess.value = false
}

const handleClaimSubmit = async () => {
  if (!claimForm.value.name || !claimForm.value.phone) return
  isSubmitting.value = true

  const voucherNum = Math.floor(1000 + Math.random() * 9000)
  const code = `${selectedDealForForm.value?.code || 'TOP-DEAL'}-${voucherNum}`
  generatedVoucherCode.value = code

  // 1. Capture into adminStore.leads (non-blocking)
  try {
    adminStore.addLead({
      name: claimForm.value.name.trim(),
      phone: claimForm.value.phone.trim(),
      email: '',
      interest: selectedDealForForm.value?.headline || 'Discount Offer',
      budget: selectedDealForForm.value?.badge || 'Discount Voucher',
      location: 'Islamabad / Rawalpindi',
      source: `Discount Strip (${selectedDealForForm.value?.badge || 'Voucher'})`,
      priority: 'High',
      status: 'New',
      notes: `Claimed Voucher: ${code}. Notes: ${claimForm.value.notes || 'No extra notes'}`
    })
  } catch (e) {
    console.error('Lead capture error', e)
  }

  // 2. Prepare WhatsApp direct trigger
  const textMsg = `Assalam o Alaikum TopLinkers! I am claiming the discount for ${selectedDealForForm.value?.headline} (${selectedDealForForm.value?.badge}) with Voucher Code: ${code}. My name is ${claimForm.value.name} (${claimForm.value.phone}). Please verify my discount.`
  whatsappDirectUrl.value = `https://wa.me/923349522157?text=${encodeURIComponent(textMsg)}`

  isSubmitting.value = false
  claimSuccess.value = true
}

onMounted(() => {
  adminStore.syncFromBackend()
})
</script>

<style scoped>
/* 100% Seamless Infinite Sliding Marquee (Gentle, readable slow speed) */
@keyframes marquee-sliding {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-sliding 55s linear infinite;
  will-change: transform;
}

.top-offer-fully-sliding-strip:hover .marquee-track {
  animation-play-state: paused;
}

/* Soft Edge Fade Mask */
.mask-fade-marquee {
  mask-image: linear-gradient(to right, transparent 0%, black 25px, black calc(100% - 25px), transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 25px, black calc(100% - 25px), transparent 100%);
}

/* Modal Slide & Fade Transition */
.slide-modal-enter-active,
.slide-modal-leave-active {
  transition: all 0.3s ease-out;
}
.slide-modal-enter-from,
.slide-modal-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(-10px);
}
</style>
