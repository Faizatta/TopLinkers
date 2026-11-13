<template>
  <div class="team-page pt-28 sm:pt-32 md:pt-36 pb-16 bg-[#F8FAFC] min-h-screen">
    <div class="max-w-[1260px] mx-auto px-4 sm:px-6">
      <!-- Page Title Header -->
      <div class="max-w-2xl mx-auto text-center mb-6 sm:mb-8 animate-fade-down">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#0F2A44] tracking-tight">
          Founders, Agents &amp; PEC Engineers
        </h1>
        <p class="text-xs sm:text-sm text-gray-500 mt-2.5 leading-relaxed">
          Led by visionary founders and powered by CDA/RDA property specialists and PEC-registered civil &amp; solar engineers across Islamabad &amp; Rawalpindi.
        </p>
      </div>

      <!-- ============================================================== -->
      <!-- ============================================================== -->
      <!-- PART 1 (TOP): EXECUTIVE BOARD & FOUNDERS LEADERSHIP SHOWCASE   -->
      <!-- CLEAN ELEGANT PRESENTATION DIRECTLY ON PAGE (NO BLUE BG BOX)   -->
      <!-- ============================================================== -->
      <section class="mb-14 sm:mb-16">
        <!-- Section Header Meta -->
        <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#16B4E8]/10 text-[#16B4E8] border border-[#16B4E8]/25 mb-3 shadow-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8]"></span>
            TOPLINKERS EXECUTIVE BOARD
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2A44] tracking-tight">
            Founding Leadership &amp; CEOs
          </h2>
          <p class="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
            Click any executive card to open their full strategic dossier, direct contact &amp; verified portfolio.
          </p>
        </div>

        <!-- The 2 Executive Cards Grid (Width-Wise Layout: 2 Across, Sized Generously) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 max-w-6xl mx-auto">
          <div
            v-for="(ceo, idx) in ceos"
            :key="ceo.id"
            @click="openMemberPopup(ceo)"
            class="group cursor-pointer flex flex-row items-center p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 hover:border-[#16B4E8]/60 shadow-md hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 relative gap-5 sm:gap-6 overflow-hidden"
            :style="{ animationDelay: `${idx * 140}ms` }"
          >
            <!-- Top Subtle Accent Gradient Bar on Hover -->
            <div
              class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              :class="idx === 0 ? 'from-[#16B4E8] to-blue-600' : 'from-amber-400 to-[#16B4E8]'"
            ></div>

            <!-- Left: Executive Portrait Photo (Prominent & Elegantly Sized) -->
            <div class="relative w-32 h-44 sm:w-44 sm:h-56 lg:w-48 lg:h-60 rounded-2xl overflow-hidden border border-gray-200/80 shadow-md group-hover:border-[#16B4E8]/50 flex-shrink-0 bg-slate-100">
              <img
                :src="ceo.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'"
                :alt="ceo.name"
                class="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              
              <!-- Subtle Hover Hint Badge -->
              <span class="absolute bottom-2 inset-x-2 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-[9px] sm:text-[10px] font-bold text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
                View Dossier &rarr;
              </span>
            </div>

            <!-- Right: Executive Information (Width-Wise, Generously Spaced) -->
            <div class="flex flex-col justify-between flex-1 min-w-0 py-1">
              <div>
                <!-- Top Tag Pill -->
                <div class="flex items-center gap-1.5 mb-2">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">
                    <span class="w-2 h-2 rounded-full" :class="idx === 0 ? 'bg-[#16B4E8]' : 'bg-amber-500'"></span>
                    <span>{{ ceo.tag || (idx === 0 ? 'Founder & Chief Executive' : 'Co-Founder & Managing CEO') }}</span>
                  </span>
                </div>

                <!-- Executive Name -->
                <h3 class="text-lg sm:text-2xl font-black text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors tracking-tight leading-snug">
                  {{ ceo.name }}
                </h3>

                <!-- Role / Title (No Truncate: Let full title display) -->
                <p class="text-xs sm:text-sm font-bold text-[#16B4E8] mt-1 tracking-wide leading-snug">
                  {{ ceo.role }}
                </p>

                <!-- Specialty / Scope Summary -->
                <p class="text-xs sm:text-[13px] text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {{ idx === 0 ? 'CDA/RDA Land Acquisitions, TopCity-1, PECHS & Harsukh luxury developments.' : 'PEC Registered Civil Engineer, turnkey construction, Grade-60 steel & solar net metering.' }}
                </p>
              </div>

              <!-- Action & Direct Contact Row (Clean & Direct) -->
              <div class="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
                <div class="flex items-center gap-2">
                  <!-- Executive Direct Phone Call -->
                  <a
                    :href="`tel:${cleanWa(ceo.phone)}`"
                    @click.stop
                    title="Executive Direct Line"
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-emerald-600 text-slate-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                  >
                    <PhoneIcon class="w-4 h-4" />
                  </a>

                  <!-- WhatsApp Direct Chat -->
                  <a
                    :href="`https://wa.me/${cleanWa(ceo.whatsapp || ceo.phone)}?text=${encodeURIComponent(`Assalam o Alaikum ${ceo.name}, I am contacting you directly from TopLinkers executive portal for advisory.`)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                    title="Direct WhatsApp"
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-[#25D366] text-slate-600 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                  >
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                  </a>

                  <!-- Social Links on Card (Just Icons) -->
                  <a
                    v-for="social in getMemberSocials(ceo)"
                    :key="social.key"
                    :href="social.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                    :title="social.label"
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                    :class="social.chipClass"
                  >
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path :d="social.svgPath" />
                    </svg>
                  </a>
                </div>

                <!-- Subtle View Dossier Link on Card (Desktop / Tablet) -->
                <span class="hidden sm:inline-flex text-[11px] sm:text-xs font-bold text-[#16B4E8] group-hover:translate-x-0.5 transition-transform items-center gap-1 whitespace-nowrap">
                  <span>Full Dossier</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ====================================================================== -->
      <!-- PART 2 (BELOW): 3D PERSPECTIVE GALLERY FOR AGENTS & PEC ENGINEERS      -->
      <!-- + CLICK CARD TO SHOW PHOTO ON LEFT & ANIMATED DETAILS ON RIGHT         -->
      <!-- ====================================================================== -->
      <section>
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-gray-200/80 gap-2">
          <div>
            <span class="inline-block text-[10px] font-black uppercase tracking-wider text-[#16B4E8] bg-[#16B4E8]/10 px-2.5 py-1 rounded-md mb-2">
              FIELD ADVISORS &amp; TECHNICAL DIVISION
            </span>
            <h2 class="text-xl sm:text-2xl font-extrabold text-[#0F2A44]">
              Real Estate Agents &amp; Registered Engineers
            </h2>
          </div>
        </div>

        <!-- Transparent Auto-Scrolling 3D Portrait Carousel (Click Image for Popup) -->
        <div
          class="select-none relative py-4"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
          @pointerdown="onPointerDown"
          @pointerup="onPointerUp"
        >
          <!-- 3D Perspective Fanned Carousel Viewport -->
          <div class="relative h-[330px] sm:h-[380px] flex items-center justify-center overflow-hidden perspective-stage px-4">
            <div
              v-for="(member, idx) in filteredMembers"
              :key="member.id"
              @click="handleCardClick(idx, member)"
              :style="getCard3DStyle(idx)"
              class="absolute w-52 sm:w-64 h-[270px] sm:h-[320px] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl group bg-white"
              :class="idx === activeIndex ? 'border-[#16B4E8] ring-4 ring-[#16B4E8]/20 shadow-2xl' : 'border-white hover:border-[#16B4E8]/60'"
            >
              <img
                :src="member.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'"
                :alt="member.name"
                class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                draggable="false"
              />

              <!-- Subtle Bottom Name Overlay on Hover / Active -->
              <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none"></div>
              <div class="absolute bottom-3 left-3.5 right-3.5 text-white">
                <h3 class="text-sm font-bold leading-tight truncate drop-shadow-sm">
                  {{ member.name }}
                </h3>
                <p class="text-[11px] text-white/85 truncate font-medium">{{ member.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ====================================================================== -->
    <!-- PROMINENT EXECUTIVE & SPECIALIST DOSSIER MODAL                         -->
    <!-- ====================================================================== -->
    <transition name="modal-fade">
      <div
        v-if="popupMember"
        @click.self="closeMemberPopup"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111D]/80 backdrop-blur-md overflow-y-auto"
      >
        <div
          class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full overflow-hidden relative animate-popup-in max-h-[88vh] flex flex-col"
          :class="isExecutive(popupMember) ? 'max-w-3xl' : 'max-w-2xl'"
        >
          <!-- Close Button -->
          <button
            type="button"
            @click="closeMemberPopup"
            aria-label="Close member details"
            class="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/90 hover:bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center shadow-md transition-colors"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>

          <div class="grid grid-cols-1 md:grid-cols-12 items-stretch overflow-y-auto flex-1">
            <!-- LEFT SIDE: High-Definition Portrait & Identity Badge -->
            <div class="md:col-span-5 relative h-56 sm:h-auto sm:min-h-[400px] bg-[#0B1B2B] overflow-hidden group flex flex-col justify-between p-5 sm:p-6">
              <img
                :src="popupMember.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'"
                :alt="popupMember.name"
                class="absolute inset-0 w-full h-full object-cover object-top filter brightness-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#08121E]/95 via-[#08121E]/30 to-black/20"></div>

              <!-- Top Left Category Pill -->
              <div class="relative z-10">
                <span
                  class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg inline-flex items-center gap-1.5"
                  :class="popupMember.category === 'engineer' ? 'bg-emerald-500 text-white' : isExecutive(popupMember) ? 'bg-[#0F2A44] text-[#16B4E8] border border-[#16B4E8]/40' : 'bg-[#16B4E8] text-white'"
                >
                  <ShieldCheckIcon class="w-3.5 h-3.5" />
                  <span>{{ popupMember.category === 'engineer' ? 'PEC Registered Engineer' : isExecutive(popupMember) ? 'Founding Executive' : 'Verified Property Agent' }}</span>
                </span>
              </div>

              <!-- Bottom Left Name & Title Overlay on Portrait -->
              <div class="relative z-10 pt-6 mt-auto">
                <span class="inline-block text-[9px] font-black tracking-widest text-[#16B4E8] uppercase mb-1">TopLinkers Official Profile</span>
                <p class="text-white text-base sm:text-lg font-black leading-tight drop-shadow-md">{{ popupMember.name }}</p>
                <p class="text-slate-300 text-xs font-semibold drop-shadow-sm mt-0.5">{{ popupMember.role }}</p>
              </div>
            </div>

            <!-- RIGHT SIDE: Prominent Executive Dossier Details -->
            <div class="md:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-4 sm:space-y-5 bg-white overflow-y-auto">
              <div class="space-y-4">
                <!-- Header Tags & Name -->
                <div>
                  <div class="flex flex-wrap items-center gap-2 mb-2 pr-10">
                    <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8] bg-[#16B4E8]/10 px-2.5 py-1 rounded-md">
                      {{ popupMember.tag || (isExecutive(popupMember) ? 'Executive Board Member' : 'TopLinkers Specialist') }}
                    </span>
                    <span v-if="!isExecutive(popupMember)" class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                      <ShieldCheckIcon class="w-3.5 h-3.5 text-emerald-600" />
                      <span>Licensed &amp; Verified</span>
                    </span>
                  </div>

                  <h3 class="text-2xl sm:text-3xl font-black text-[#0F2A44] tracking-tight leading-tight">
                    {{ popupMember.name }}
                  </h3>
                  <p class="text-sm font-extrabold text-[#16B4E8] mt-1">
                    {{ popupMember.role }}
                  </p>
                </div>

                <!-- Prominent Quote Banner -->
                <div v-if="popupMember.quote" class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-sky-50/50 border-l-4 border-[#16B4E8] border-y border-r border-slate-200/80 shadow-xs relative">
                  <p class="text-xs sm:text-sm text-slate-800 font-semibold italic leading-relaxed">
                    "{{ popupMember.quote }}"
                  </p>
                </div>

                <!-- Executive Biography (Prominent & Clear) -->
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {{ isExecutive(popupMember) ? 'Executive Profile & Strategic Leadership' : 'Professional Background' }}
                  </h4>
                  <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {{ popupMember.bio }}
                  </p>
                </div>

                <!-- Specialization Chips -->
                <div class="space-y-1.5">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Specialized Sectors &amp; Scope:
                  </h4>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="spec in getExecutiveSpecialties(popupMember)"
                      :key="spec"
                      class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0F2A44]/5 text-[#0F2A44] border border-[#0F2A44]/10"
                    >
                      {{ spec }}
                    </span>
                  </div>
                </div>

                <!-- Structured Verified Contact Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-[#16B4E8]/10 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
                      <PhoneIcon class="w-4 h-4" />
                    </div>
                    <div class="min-w-0">
                      <span class="block text-[10px] font-bold uppercase text-slate-400">Direct Phone Desk</span>
                      <a :href="`tel:${cleanWa(popupMember.phone)}`" class="text-xs font-bold text-[#0F2A44] hover:text-[#16B4E8] transition-colors block">
                        {{ popupMember.phone }}
                      </a>
                    </div>
                  </div>

                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-[#0F2A44]/5 text-[#0F2A44] flex items-center justify-center flex-shrink-0">
                      <EnvelopeIcon class="w-4 h-4" />
                    </div>
                    <div class="min-w-0">
                      <span class="block text-[10px] font-bold uppercase text-slate-400">Official Email</span>
                      <a :href="`mailto:${popupMember.email || 'toplinkers12@gmail.com'}`" class="text-xs font-bold text-[#0F2A44] hover:text-[#16B4E8] transition-colors truncate block">
                        {{ popupMember.email || 'toplinkers12@gmail.com' }}
                      </a>
                    </div>
                  </div>

                  <div class="sm:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-[#0F2A44]/5 text-[#0F2A44] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPinIcon class="w-4 h-4" />
                    </div>
                    <div class="min-w-0">
                      <span class="block text-[10px] font-bold uppercase text-slate-400">Head Office Consultation Desk</span>
                      <span class="text-xs font-semibold text-[#0F2A44] leading-snug block">
                        {{ popupMember.address || '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan, 4004884' }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Social Links if configured (Just Icons) -->
                <div v-if="getMemberSocials(popupMember).length" class="flex items-center gap-2 pt-1">
                  <a
                    v-for="social in getMemberSocials(popupMember)"
                    :key="social.key"
                    :href="social.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    :title="social.label"
                    :aria-label="social.label"
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                    :class="social.chipClass"
                  >
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path :d="social.svgPath" />
                    </svg>
                  </a>
                </div>
              </div>

              <!-- Direct Actions Footer -->
              <div class="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                <a
                  :href="`https://wa.me/${cleanWa(popupMember.whatsapp || popupMember.phone)}?text=${encodeURIComponent(`Assalam o Alaikum ${popupMember.name}, I am contacting you through your TopLinkers profile regarding a property inquiry.`)}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Chat Directly on WhatsApp</span>
                  <ArrowRightIcon class="w-4 h-4" />
                </a>

                <a
                  :href="`tel:${cleanWa(popupMember.phone)}`"
                  class="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <PhoneIcon class="w-4 h-4" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ShieldCheckIcon,
  XMarkIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../stores/admin'

const adminStore = useAdminStore()

const ceos = computed(() => adminStore.ceos)
const agentsList = computed(() => adminStore.agentsList)
const engineersList = computed(() => adminStore.engineersList)
const fieldTeam = computed(() => adminStore.fieldTeam)

const activeFilter = ref('all')
const activeIndex = ref(0)
const popupMember = ref(null)
const isHovered = ref(false)
const viewportWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const updateViewportWidth = () => {
  viewportWidth.value = window.innerWidth
}

const isExecutive = (member) => ['ceo', 'founder', 'owner', 'partner'].includes(member?.category)

const getExecutiveSpecialties = (member) => {
  if (member.id === 'ceo-1' || member.role?.toLowerCase().includes('real estate') || member.tag?.toLowerCase().includes('founder')) {
    return [
      'CDA & RDA Land Acquisitions',
      'Moqa Ka Plot Demarcation',
      'PECHS & TopCity-1 Investments',
      'Harsukh Nathia Gali Suites',
      'Overseas Client Portfolio Advisory'
    ]
  }
  return [
    'Turnkey Designer Villa Construction',
    'PEC Licensed Civil Engineering',
    'A+ Grey Structure & Finishing',
    '10kW–50kW Solar Net Metering',
    'PHA Sector I-12 & I-16 Transfers'
  ]
}

const SOCIAL_PLATFORMS = [
  {
    key: 'instagram',
    label: 'Instagram',
    baseUrl: 'https://instagram.com/',
    chipClass: 'bg-pink-50 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-pink-600 hover:text-white border-pink-100',
    svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
  },
  {
    key: 'facebook',
    label: 'Facebook',
    baseUrl: 'https://facebook.com/',
    chipClass: 'bg-blue-50 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border-blue-100',
    svgPath: 'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z'
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    baseUrl: 'https://linkedin.com/in/',
    chipClass: 'bg-sky-50 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border-sky-100',
    svgPath: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
  }
]

const formatSocialUrl = (url, baseUrl) => {
  const clean = String(url).trim()
  if (/^https?:\/\//i.test(clean)) return clean
  const stripped = clean.replace(/^[@/]+/, '')
  if (/^(www\.)?(instagram\.com|facebook\.com|fb\.com|linkedin\.com)/i.test(stripped)) {
    return `https://${stripped}`
  }
  return `${baseUrl}${stripped}`
}

const getMemberSocials = (member) => {
  if (!member) return []
  return SOCIAL_PLATFORMS
    .filter((platform) => Boolean(member[platform.key]?.trim()))
    .map((platform) => ({
      ...platform,
      href: formatSocialUrl(member[platform.key], platform.baseUrl)
    }))
}

let dragStartX = 0
let autoScrollTimer = null

const filteredMembers = computed(() => {
  if (activeFilter.value === 'agent') return agentsList.value
  if (activeFilter.value === 'engineer') return engineersList.value
  return fieldTeam.value
})

// 3D Perspective Math
const getCard3DStyle = (idx) => {
  const total = filteredMembers.value.length
  let offset = idx - activeIndex.value

  if (total > 2) {
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total
  }

  const abs = Math.abs(offset)

  if (abs > 2) {
    return {
      opacity: 0,
      pointerEvents: 'none',
      transform: `translateX(${offset * 180}px) scale(0.6)`,
      zIndex: 0
    }
  }

  const translateStep = viewportWidth.value < 640 ? 128 : 205
  const translateX = offset * translateStep
  const scale = offset === 0 ? 1.05 : Math.max(0.74, 1 - abs * 0.13)
  const rotateY = offset === 0 ? 0 : offset < 0 ? Math.min(26, abs * 14) : Math.max(-26, -abs * 14)
  const opacity = offset === 0 ? 1 : Math.max(0.35, 1 - abs * 0.25)
  const zIndex = 30 - abs * 5

  return {
    transform: `translateX(${translateX}px) scale(${scale}) perspective(1200px) rotateY(${rotateY}deg)`,
    opacity,
    zIndex
  }
}

const openMemberPopup = (member) => {
  popupMember.value = member
}

const closeMemberPopup = () => {
  popupMember.value = null
}

const handleCardClick = (idx, member) => {
  activeIndex.value = idx
  openMemberPopup(member)
}

const nextCard = () => {
  if (filteredMembers.value.length <= 1) return
  activeIndex.value = (activeIndex.value + 1) % filteredMembers.value.length
}

const prevCard = () => {
  if (filteredMembers.value.length <= 1) return
  activeIndex.value = (activeIndex.value - 1 + filteredMembers.value.length) % filteredMembers.value.length
}

const onPointerDown = (e) => {
  dragStartX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
}

const onPointerUp = (e) => {
  const endX = e.clientX || (e.changedTouches && e.changedTouches[0]?.clientX) || 0
  const diff = endX - dragStartX
  if (Math.abs(diff) > 40) {
    if (diff < 0) nextCard()
    else prevCard()
  }
}

const cleanWa = (num) => {
  if (!num) return '923349522157'
  const digits = String(num).replace(/[^0-9]/g, '')
  if (digits.startsWith('0')) return '92' + digits.substring(1)
  return digits
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && popupMember.value) {
    closeMemberPopup()
  }
}

watch(filteredMembers, (newList) => {
  if (activeIndex.value >= newList.length) {
    activeIndex.value = 0
  }
})

onMounted(() => {
  document.title = 'Our Founders, Agents & PEC Engineers | TopLinkers'
  window.addEventListener('resize', updateViewportWidth)
  window.addEventListener('keydown', handleKeyDown)

  autoScrollTimer = setInterval(() => {
    if (!isHovered.value && !popupMember.value && filteredMembers.value.length > 1) {
      nextCard()
    }
  }, 4000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateViewportWidth)
  window.removeEventListener('keydown', handleKeyDown)
  if (autoScrollTimer) clearInterval(autoScrollTimer)
})
</script>

<style scoped>
.perspective-stage {
  perspective: 1200px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes popupIn {
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(20px);
  }
  65% {
    opacity: 1;
    transform: scale(1.01) translateY(-2px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-popup-in {
  animation: popupIn 0.36s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
