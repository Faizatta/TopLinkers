<template>
  <div class="hr-sukh-page pt-20 bg-[#F8FAFC] min-h-screen pb-16 sm:pb-20 select-none">
    <!-- 1. Hero Cover Banner with Alpine Misty Mountains -->
    <div class="relative min-h-[520px] sm:h-[540px] md:h-[600px] bg-gray-900 overflow-hidden flex items-end">
      <LocalPicture
        name="hero-harsukh"
        alt="Harsukh Residencies Nathia Gali Luxury Hillside Vacation Suites"
        sizes="100vw"
        loading="eager"
        fetchpriority="high"
        mobile-crop
        picture-class="absolute inset-0 block w-full h-full"
        img-class="w-full h-full object-cover transform scale-105"
      />
      <!-- Dramatic Dark Forest Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#0F2A44] via-[#0F2A44]/70 to-[#0F2A44]/30"></div>

      <!-- Hero Header Content -->
      <div class="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-10 sm:pb-16 w-full text-white z-10">
        <div class="max-w-3xl space-y-3.5">
          <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span class="bg-[#E53935] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              HOT SELLING IN NATHIA GALI
            </span>
            <span class="bg-[#16B4E8] text-[#0F2A44] text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded shadow-md">
              High Tourism ROI &bull; Vacation Asset
            </span>
            <span class="bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              3-Year Installments
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Harsukh Residencies — Kuza Gali &amp; Nathia Gali
          </h1>

          <p class="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl font-medium">
            Developed by <strong class="text-white">Almaymaar</strong> along the Murree–Nathia Gali Road beside Ayubia National Park. Timber-and-stone furnished mountain suites &amp; Glasshouse penthouses with thermal terrace pools, skywalk bridge, and hands-off holiday rental returns.
          </p>

          <!-- Direct Actions (Mobile full-width stack, desktop inline) -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <a
              :href="whatsappBookingUrl"
              target="_blank"
              class="px-6 sm:px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Instant WhatsApp Booking</span>
            </a>

            <a
              href="#pricing"
              class="px-6 py-3.5 bg-white/10 hover:bg-white hover:text-[#0F2A44] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-colors border border-white/30 backdrop-blur-md text-center"
            >
              View Floor Plans &amp; Prices &darr;
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Main Body Grid -->
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20">
      <!-- 4 Key Fast-Facts Highlights (Optimized Mobile Grid) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 bg-white rounded-2xl p-3.5 sm:p-6 shadow-xl border border-gray-100 mb-8 sm:mb-12">
        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Residences</span>
          <span class="text-base sm:text-2xl font-black text-[#16B4E8] block mt-0.5">446–1,801</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Sq Ft (Studio to 3-Bed)</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Developer</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">Almaymaar</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Timber &amp; Stone Craft</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Location</span>
          <span class="text-base sm:text-2xl font-black text-[#6CC24A] block mt-0.5">Kuza Gali</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Beside Ayubia Nat. Park</span>
        </div>

        <div class="text-center p-3 sm:p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <span class="text-[10px] sm:text-xs text-gray-400 font-bold uppercase block">Galyat Peaks</span>
          <span class="text-base sm:text-2xl font-black text-[#0F2A44] block mt-0.5">8,200+ Ft</span>
          <span class="text-[9px] sm:text-[10px] text-gray-500 block mt-0.5">Miranjani &amp; Pipeline Trail</span>
        </div>
      </div>

      <!-- 2b. Interactive Residence Showcase (Interior / Floor Plan / 3D Model + Room Dimensions) -->
      <ResidenceShowcase @request-price="handleRequestUnitPrice" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left 8 Columns: Details, Gallery, Floor Plans & ROI -->
        <div class="lg:col-span-8 space-y-8 sm:space-y-10">
          <!-- Overview & Official Project Highlights Card -->
          <div class="bg-white rounded-2xl p-5 sm:p-8 shadow-card border border-gray-100 space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 class="text-lg sm:text-2xl font-extrabold text-[#0F2A44] flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-[#16B4E8] rounded-full flex-shrink-0"></span>
                <span>Harsukh Residencies — Resort Amenities &amp; Pine Sanctuary</span>
              </h2>
              <span class="text-[10px] font-black uppercase tracking-wider text-[#0F2A44] bg-[#16B4E8]/15 border border-[#16B4E8]/30 px-2.5 py-1 rounded-full self-start sm:self-auto">
                Kuza Gali • 34.0163° N, 73.3928° E
              </span>
            </div>

            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Positioned in <strong>Kuza Gali</strong> at the scenic junction connecting <strong>Ayubia Road</strong> and <strong>Abbottabad Road</strong>, <strong>Harsukh Residencies by Almaymaar</strong> blends modern timber-and-stone mountain chalets with full-service hospitality. Residents enjoy direct access to <strong>Ayubia National Park</strong>, the historic 4 km <strong>Pipeline Track</strong>, Dunga Gali, and treks up <strong>Miranjani Peak (2,992 m)</strong>.
            </p>

            <!-- Hospitality & Resort Amenities Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 text-xs">
              <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <span class="font-extrabold text-[#0F2A44] block">Thermal Pools &amp; Sauna</span>
                <p class="text-[11px] text-gray-500 leading-relaxed">Indoor heated pool, scenic terrace pool, sauna &amp; fitness gym.</p>
              </div>
              <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <span class="font-extrabold text-[#0F2A44] block">Skywalk Bridge</span>
                <p class="text-[11px] text-gray-500 leading-relaxed">Signature elevated skywalk connecting pine-view residential wings.</p>
              </div>
              <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <span class="font-extrabold text-[#0F2A44] block">Dining &amp; Coffee Lounge</span>
                <p class="text-[11px] text-gray-500 leading-relaxed">On-site restaurant, open-air courtyard dining &amp; residents lounge.</p>
              </div>
              <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <span class="font-extrabold text-[#0F2A44] block">Timber &amp; Stone Finishes</span>
                <p class="text-[11px] text-gray-500 leading-relaxed">Furnished apartments with wide valley balconies &amp; central heating.</p>
              </div>
              <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <span class="font-extrabold text-[#0F2A44] block">Basement Parking &amp; Security</span>
                <p class="text-[11px] text-gray-500 leading-relaxed">Heated indoor parking, standby generators &amp; multi-tier security.</p>
              </div>
              <div class="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <span class="font-extrabold text-[#0F2A44] block">Managed Short-Stay ROI</span>
                <p class="text-[11px] text-gray-500 leading-relaxed">Turnkey tourism rental desk targeting high year-round occupancy.</p>
              </div>
            </div>
          </div>

          <!-- Floor Plans & Suite Configurations -->
          <div id="pricing" class="bg-white rounded-2xl p-5 sm:p-8 shadow-card border border-gray-100 space-y-6 scroll-mt-28">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8]">Apartment Layouts</span>
                <h3 class="text-lg sm:text-2xl font-extrabold text-[#0F2A44] mt-1">Available Flat Suites &amp; Plans</h3>
              </div>

              <!-- Horizontal Scroll Navigation (Shown on mobile when >1 plan, and desktop when >3 plans) -->
              <div v-if="suitePlans.length > 1" class="flex items-center gap-2 self-end sm:self-auto" :class="suitePlans.length <= 3 ? 'sm:hidden' : ''">
                <span class="text-[11px] font-semibold text-gray-500 mr-1">{{ activeSuiteIndex + 1 }} / {{ suitePlans.length }} Layouts</span>
                <button
                  type="button"
                  @click="scrollSuites(-1)"
                  aria-label="Scroll flat suites left"
                  class="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 hover:bg-[#0F2A44] hover:text-white text-gray-600 flex items-center justify-center transition-colors active:scale-95 shadow-2xs"
                >
                  <ChevronLeftIcon class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  @click="scrollSuites(1)"
                  aria-label="Scroll flat suites right"
                  class="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 hover:bg-[#0F2A44] hover:text-white text-gray-600 flex items-center justify-center transition-colors active:scale-95 shadow-2xs"
                >
                  <ChevronRightIcon class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Mobile Horizontal Scroll Indicator & Layout Jump Dots -->
            <div v-if="suitePlans.length > 1" class="flex sm:hidden items-center justify-between pt-1 pb-0.5 text-xs">
              <span class="text-[11px] font-extrabold text-[#16B4E8] flex items-center gap-1.5 uppercase tracking-wider">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>Swipe Layouts Horizontally</span>
              </span>
              <div class="flex items-center gap-1.5">
                <button
                  v-for="(suite, sIdx) in suitePlans"
                  :key="`dot-${sIdx}`"
                  type="button"
                  @click="scrollToSuiteIndex(sIdx)"
                  :class="[
                    'h-2 rounded-full transition-all duration-300 cursor-pointer',
                    activeSuiteIndex === sIdx ? 'w-5 bg-[#16B4E8]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  ]"
                  :aria-label="`Go to ${suite.title}`"
                />
              </div>
            </div>

            <!-- Scrollable Snap Track (Preserves Horizontal Card Layout, Distinct Mobile Scrollbar) -->
            <div
              ref="suitesTrackRef"
              @scroll.passive="onSuitesScroll"
              class="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 suites-scroll-track"
            >
              <div
                v-for="suite in suitePlans"
                :key="suite.id || suite.title"
                :class="[
                  'w-[84%] sm:w-[47%] lg:w-[calc((100%-2.5rem)/3)] flex-shrink-0 snap-start rounded-2xl p-5 flex flex-col justify-between transition-all',
                  suite.featured
                    ? 'bg-blue-50/40 border-2 border-[#16B4E8] shadow-md'
                    : 'bg-gray-50 border border-gray-200 hover:border-[#16B4E8]'
                ]"
              >
                <div>
                  <div class="flex items-center justify-between gap-2">
                    <span
                      :class="[
                        'text-[9px] font-black uppercase px-2 py-0.5 rounded',
                        suite.featured
                          ? 'text-white bg-[#16B4E8]'
                          : suite.badge?.toLowerCase().includes('penthouse')
                            ? 'text-[#0F2A44] bg-gray-200'
                            : 'text-[#16B4E8] bg-blue-50'
                      ]"
                    >
                      {{ suite.badge || 'Suite Plan' }}
                    </span>
                    <span v-if="suite.highlightTag" class="text-[10px] font-bold text-[#6CC24A]">
                      {{ suite.highlightTag }}
                    </span>
                  </div>

                  <h4 class="text-base font-bold text-[#0F2A44] mt-2">{{ suite.title }}</h4>
                  <p class="text-xs text-gray-500 mt-1">{{ suite.area }}</p>
                  <div
                    :class="suite.featured ? 'text-[#0F2A44]' : 'text-[#16B4E8]'"
                    class="text-lg font-black mt-3"
                  >
                    {{ suite.price }}
                  </div>

                  <ul
                    :class="suite.featured ? 'border-blue-100' : 'border-gray-200'"
                    class="text-xs text-gray-600 mt-4 space-y-1.5 border-t pt-3"
                  >
                    <li v-for="(feat, fIdx) in (suite.features || []).filter(Boolean)" :key="fIdx">
                      &bull; {{ feat }}
                    </li>
                  </ul>
                </div>

                <a
                  :href="`${whatsappBookingUrl}%20-%20${encodeURIComponent(suite.title)}`"
                  target="_blank"
                  :class="[
                    'w-full mt-6 py-2.5 text-xs uppercase rounded-xl text-center transition-colors block',
                    suite.featured
                      ? 'bg-[#16B4E8] hover:bg-[#0F2A44] text-white font-black shadow'
                      : 'bg-white hover:bg-[#16B4E8] hover:text-white text-[#0F2A44] border border-gray-200 font-bold shadow-2xs'
                  ]"
                >
                  {{ suite.ctaLabel || `Book ${suite.title}` }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right 4 Columns: Sticky Advisory & Booking Form -->
        <div id="hrsukh-inquiry-form" class="lg:col-span-4 scroll-mt-28">
          <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-gray-100 lg:sticky lg:top-28 space-y-5">
            <div class="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div class="w-12 h-12 rounded-xl bg-[#0F2A44] text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                HS
              </div>
              <div>
                <h4 class="text-sm font-bold text-[#0F2A44]">Harsukh Project Desk</h4>
                <p class="text-[11px] text-[#16B4E8] font-bold">TopLinkers Exclusive Marketing</p>
                <p class="text-[10px] text-gray-400">2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad (4004884)</p>
              </div>
            </div>

            <!-- Instant WhatsApp CTA -->
            <a
              :href="whatsappBookingUrl"
              target="_blank"
              class="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Chat With Harsukh Desk</span>
            </a>

            <!-- Form -->
            <form @submit.prevent="submitInquiry" class="space-y-3">
              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-1">Your Full Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="e.g. Tariq Khan"
                  class="w-full text-xs p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#16B4E8] bg-gray-50 focus:bg-white"
                />
              </div>

              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-1">WhatsApp / Mobile Number</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="03XX-XXXXXXX"
                  class="w-full text-xs p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#16B4E8] bg-gray-50 focus:bg-white"
                />
              </div>

              <div>
                <label for="hrsukh-suite" class="block text-[11px] font-bold text-gray-600 mb-1">Interested Suite Layout</label>
                <select
                  id="hrsukh-suite"
                  v-model="form.suite"
                  class="w-full text-xs p-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#16B4E8]"
                >
                  <option
                    v-for="suite in suitePlans"
                    :key="suite.id || suite.title"
                    :value="suite.id || suite.title"
                  >
                    {{ suite.title }} ({{ suite.price }})
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-gray-600 mb-1">Description / Requirements Note (Optional)</label>
                <textarea
                  v-model="form.notes"
                  rows="2"
                  placeholder="e.g. Preferred floor, installment plan duration, or family requirements..."
                  class="w-full text-xs p-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#16B4E8]"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitted"
                class="w-full py-3 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 mt-2"
              >
                <span>{{ isSubmitted ? 'Inquiry Sent!' : 'Request Official Brochure' }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useAdminStore } from '../stores/admin'
import ResidenceShowcase from '../components/hrsukh/ResidenceShowcase.vue'
import LocalPicture from '../components/ui/LocalPicture.vue'
import { scrollTo } from '../services/lenis'

const adminStore = useAdminStore()
const whatsappBookingUrl = `https://wa.me/923349522157?text=${encodeURIComponent('Hello TopLinkers, I am inquiring about Harsukh Luxury Hillside Flats in Nathia Gali')}`

const suitesTrackRef = ref(null)

const suitePlans = computed(() => {
  const storeSuites = adminStore.liveRates?.hrSukhSuites
  if (Array.isArray(storeSuites) && storeSuites.length > 0) {
    return storeSuites
  }
  return [
    {
      id: 'studio',
      badge: 'Unit G-1 • Ground Floor',
      highlightTag: '',
      title: 'The Studio',
      area: '446 Sq Ft',
      price: 'Price on Request',
      featured: false,
      features: [
        'Sleeping & Seating Lounge',
        'Kitchenette & Dining for 2',
        'Sliding Glass Pine Doors',
        '15% Down Payment Entry'
      ],
      ctaLabel: 'Inquire Studio G-1'
    },
    {
      id: '1bed',
      badge: 'Unit V5-10 • Valley Floor 05',
      highlightTag: '★ Popular Choice',
      title: 'Valley View (1-Bed)',
      area: '692 Sq Ft',
      price: 'Price on Request',
      featured: true,
      features: [
        'Living Room (12\'-5" × 11\'-10")',
        'Bedroom (12\'-6" × 11\'-0") + Closet',
        'Kitchenette & Bath (7\'-1" × 7\'-0")',
        'Long Balcony (13\'-4" × 3\'-9")'
      ],
      ctaLabel: 'Inquire Valley View'
    },
    {
      id: '2bed',
      badge: 'Unit F2-15 • Second Floor',
      highlightTag: '',
      title: 'The Two Bedroom',
      area: '1,427 Sq Ft',
      price: 'Price on Request',
      featured: false,
      features: [
        '2 Bedrooms + 2 En-Suite Baths',
        'Living & Dining (19\'-4" × 11\'-11")',
        'Full Kitchen (11\'-9" × 6\'-10")',
        'Terrace (16\'-0" × 7\'-0") & Balcony'
      ],
      ctaLabel: 'Inquire 2-Bedroom'
    },
    {
      id: 'penthouse',
      badge: 'Unit F3-6 • Third Floor',
      highlightTag: '★ Luxury Crown',
      title: 'The Glasshouse Penthouse',
      area: '1,633 Sq Ft',
      price: 'Price on Request',
      featured: false,
      features: [
        '3 Bedrooms & Sloping Glass Roof',
        'Private Panoramic Roof Terrace',
        'Plunge Pool Configuration',
        'Exclusive Galyat Ridge Views'
      ],
      ctaLabel: 'Inquire Penthouse'
    },
    {
      id: '3bed',
      badge: 'Unit F2-14 • Second Floor',
      highlightTag: '',
      title: 'The Three Bedroom',
      area: '1,801 Sq Ft',
      price: 'Price on Request',
      featured: false,
      features: [
        '3 Bedrooms & 3 Full Bathrooms',
        'Combined Living & Dining Hall',
        '2 Scenic Balconies + Terrace',
        'Prime Extended Family Sanctuary'
      ],
      ctaLabel: 'Inquire 3-Bedroom'
    }
  ]
})

const activeSuiteIndex = ref(0)

const onSuitesScroll = () => {
  if (!suitesTrackRef.value) return
  const track = suitesTrackRef.value
  const card = track.firstElementChild
  const cardWidth = card ? (card.getBoundingClientRect().width + 16) : 280
  const index = Math.round(track.scrollLeft / cardWidth)
  activeSuiteIndex.value = Math.min(Math.max(index, 0), suitePlans.value.length - 1)
}

const scrollToSuiteIndex = (idx) => {
  if (!suitesTrackRef.value) return
  const track = suitesTrackRef.value
  const card = track.children[idx]
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
    activeSuiteIndex.value = idx
  }
}

const scrollSuites = (dir) => {
  if (!suitesTrackRef.value) return
  const track = suitesTrackRef.value
  const card = track.firstElementChild
  const step = card ? (card.getBoundingClientRect().width + 16) : Math.max(280, Math.round(track.clientWidth * 0.8))
  track.scrollBy({ left: dir * step, behavior: 'smooth' })
}

const form = ref({
  name: '',
  phone: '',
  suite: '1bed',
  notes: ''
})

const isSubmitted = ref(false)

const handleRequestUnitPrice = (unit) => {
  if (unit?.id) {
    form.value.suite = unit.id
  }
  scrollTo('#hrsukh-inquiry-form', { offset: -90, duration: 1.2 })
  adminStore.showToast(`Selected ${unit?.name || 'Suite'} (${unit?.code || ''}) — enter your details for official pricing.`)
}

const submitInquiry = () => {
  const chosen = suitePlans.value.find(s => (s.id || s.title) === form.value.suite) || suitePlans.value[0]
  const suiteName = chosen ? `${chosen.title} (${chosen.price})` : '1-Bed Alpine Flat (PKR 1.25 Cr)'
  const noteDetails = form.value.notes?.trim() ? ` | Client Note: ${form.value.notes.trim()}` : ''
  adminStore.addLead({
    name: form.value.name || 'Harsukh Client',
    phone: form.value.phone,
    city: 'Nathia Gali Inquiry',
    division: 'Harsukh',
    project: `Harsukh Nathia Gali - ${suiteName}`,
    budget: chosen?.price || 'PKR 1.25 Cr',
    priority: 'High',
    source: 'Harsukh Brochure Form',
    notes: `Requested official brochure & payment plan for ${suiteName}.${noteDetails}`
  })
  isSubmitted.value = true
  const waNote = form.value.notes?.trim() ? ` Note/Requirements: ${form.value.notes.trim()}` : ''
  window.open(`https://wa.me/923349522157?text=${encodeURIComponent(`Hello TopLinkers, my name is ${form.value.name} (${form.value.phone}). I would like to request the brochure and payment plan for Harsukh Nathia Gali (${suiteName}).${waNote}`)}`, '_blank')
}

onMounted(() => {
  document.title = 'Harsukh Residencies Nathia Gali | Hillside Vacation Suites & 20%+ ROI | TopLinkers'
  scrollTo(0, { immediate: true })
})
</script>

<style scoped>
.suites-scroll-track {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #16B4E8 #E2E8F0;
}
.suites-scroll-track::-webkit-scrollbar {
  height: 8px;
  display: block;
}
.suites-scroll-track::-webkit-scrollbar-track {
  background: #F1F5F9;
  border-radius: 9999px;
  margin: 0 4px;
}
.suites-scroll-track::-webkit-scrollbar-thumb {
  background: #16B4E8;
  border-radius: 9999px;
  border: 2px solid #F1F5F9;
}
.suites-scroll-track::-webkit-scrollbar-thumb:hover {
  background: #0F2A44;
}
</style>
