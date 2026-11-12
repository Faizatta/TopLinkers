<template>
  <footer id="site-footer" class="bg-[#081322] text-white pt-14 pb-8 border-t border-white/10 select-none relative overflow-hidden">
    <!-- Subtle Ambient TopLinkers Glow -->
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-[#16B4E8]/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-[#E53935]/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
      <!-- Main Grid: Brand + Changing Headline & 4 Clean Navigation & Contact Columns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-7 pb-12 border-b border-white/10">
        
        <!-- ======================================================== -->
        <!-- Col 1: Brand & Animated Changing Headline (Video Design)  -->
        <!-- ======================================================== -->
        <div class="sm:col-span-2 md:col-span-3 lg:col-span-3 space-y-4">
          <!-- Logo & Brand Name -->
          <router-link to="/" class="inline-flex items-center gap-3 group">
            <img
              src="/toplinkers-logo.webp"
              alt="Top Linkers"
              loading="lazy"
              decoding="async"
              width="44"
              height="44"
              class="h-11 w-auto object-contain flex-shrink-0 bg-white/95 rounded p-1 shadow-sm group-hover:scale-105 transition-transform"
            />
            <div>
              <div class="text-xl font-black tracking-tight text-white leading-tight">
                <span class="text-[#E53935]">Top</span> <span class="text-white">Linkers</span>
              </div>
              <span class="text-[9px] font-bold uppercase tracking-widest text-[#16B4E8]">Real Estate &bull; Construction &bull; Solar</span>
            </div>
          </router-link>

          <!-- Typewriter Changing Headline (Let's find [phrase]) -->
          <div class="pt-2">
            <h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight min-h-[44px] flex flex-wrap items-baseline gap-x-2">
              <span>Let's find</span>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#16B4E8] via-[#4fd5ff] to-[#8ce9ff]">
                {{ currentText }}
              </span>
              <span class="inline-block w-0.5 h-6 bg-[#16B4E8] animate-pulse -mb-0.5"></span>
            </h3>

            <!-- Interactive Sublink -->
            <router-link
              to="/contact"
              class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#16B4E8] hover:text-[#6ee2ff] mt-2.5 transition-colors group"
            >
              <span>Sounds good? Let's connect</span>
              <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </router-link>
          </div>

          <p class="text-xs text-slate-400 leading-relaxed max-w-md pt-1">
            Islamabad and Rawalpindi's trusted real estate, turnkey building construction, and Tier-1 solar energy advisory firm with 100% verified documentation.
          </p>

          <!-- Social Media Icons -->
          <div class="flex items-center gap-2.5 pt-1">
            <a href="https://facebook.com/Top-Linkers" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#16B4E8] text-white/80 hover:text-white flex items-center justify-center transition-colors" title="Facebook /Top-Linkers">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="https://twitter.com/Linkerstop" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#16B4E8] text-white/80 hover:text-white flex items-center justify-center transition-colors" title="Twitter @Linkerstop">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.162c-.42.72-.66 1.561-.66 2.476 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.18 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
              </svg>
            </a>
            <a href="https://instagram.com/Top.Linkers" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#16B4E8] text-white/80 hover:text-white flex items-center justify-center transition-colors" title="Instagram @Top.Linkers">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- Col 2: Services & Portfolios                            -->
        <!-- ======================================================== -->
        <div class="sm:col-span-1 md:col-span-1 lg:col-span-2 space-y-3.5">
          <h4 class="text-xs font-black uppercase tracking-wider text-white">
            Services
          </h4>
          <ul class="space-y-2 text-xs text-slate-300">
            <li><router-link to="/services#plot" class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">Moqa Ka Plot (PECHS, FT-II)</router-link></li>
            <li><router-link to="/services#flats" class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">PHA Flats (I-12, I-16)</router-link></li>
            <li><router-link to="/hr-sukh" class="text-amber-300 font-semibold hover:text-amber-200 hover:translate-x-1 transition-all duration-200 inline-block">Harsukh Nathia Gali</router-link></li>
            <li><router-link to="/services#construction" class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">Turnkey Construction</router-link></li>
            <li><router-link to="/services#solar" class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">Solar Net Metering</router-link></li>
            <li><router-link to="/compare" class="text-cyan-300 font-semibold hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">Compare Flats &amp; Plots</router-link></li>
            <li><router-link to="/listings" class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">All Listings (40+)</router-link></li>
          </ul>
        </div>

        <!-- ======================================================== -->
        <!-- Col 3: Company Links                                     -->
        <!-- ======================================================== -->
        <div class="sm:col-span-1 md:col-span-1 lg:col-span-2 space-y-3.5">
          <h4 class="text-xs font-black uppercase tracking-wider text-white">
            Company
          </h4>
          <ul class="space-y-2 text-xs text-slate-300">
            <li><router-link to="/about" class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">About Us</router-link></li>
            <li><router-link to="/team" class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">Founders &amp; Agents</router-link></li>
            <li><router-link to="/team" class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">PEC Civil Engineers</router-link></li>
            <li><router-link to="/blog" class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">Market Blog &amp; Insights</router-link></li>
            <li><router-link to="/contact" class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block">Contact Us</router-link></li>
          </ul>
        </div>

        <!-- ======================================================== -->
        <!-- Col 4: Legal & Information Section                      -->
        <!-- ======================================================== -->
        <div class="sm:col-span-1 md:col-span-1 lg:col-span-2 space-y-3.5">
          <h4 class="text-xs font-black uppercase tracking-wider text-white">
            Legal &amp; Information
          </h4>
          <ul class="space-y-2 text-xs text-slate-300">
            <li>
              <router-link
                to="/privacy-policy"
                class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block"
              >
                Privacy Policy
              </router-link>
            </li>
            <li>
              <router-link
                to="/terms-and-conditions"
                class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block"
              >
                Terms &amp; Conditions
              </router-link>
            </li>
            <li>
              <router-link
                to="/disclaimer"
                class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block"
              >
                Disclaimer
              </router-link>
            </li>
            <li>
              <router-link
                to="/about"
                class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block"
              >
                About Us
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="hover:text-[#16B4E8] hover:translate-x-1 transition-all duration-200 inline-block"
              >
                Contact Us
              </router-link>
            </li>
          </ul>
        </div>

        <!-- ======================================================== -->
        <!-- Col 5: Get In Touch (Exact Reference Style + Location)   -->
        <!-- ======================================================== -->
        <div class="sm:col-span-2 md:col-span-3 lg:col-span-3 space-y-3.5">
          <h4 class="text-xs font-black uppercase tracking-wider text-white">
            Get in touch
          </h4>

          <ul class="space-y-2.5 text-xs text-slate-300">
            <!-- Email -->
            <li class="flex items-center gap-2">
              <EnvelopeIcon class="w-4 h-4 text-[#16B4E8] flex-shrink-0" />
              <a href="mailto:toplinkers12@gmail.com" class="hover:text-[#16B4E8] transition-colors">
                toplinkers12@gmail.com
              </a>
            </li>

            <!-- Direct Phones -->
            <li class="flex items-center gap-2">
              <PhoneIcon class="w-4 h-4 text-[#16B4E8] flex-shrink-0" />
              <div class="flex items-center gap-2 font-semibold text-white">
                <a href="tel:03349522157" class="hover:text-[#16B4E8] transition-colors">0334-9522157</a>
                <span class="text-slate-500">&bull;</span>
                <a href="tel:03324004884" class="hover:text-[#16B4E8] transition-colors">0332-4004884</a>
              </div>
            </li>

            <!-- Location -->
            <li class="flex items-start gap-2">
              <MapPinIcon class="w-4 h-4 text-[#16B4E8] flex-shrink-0 mt-0.5" />
              <a
                :href="googleMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="leading-snug hover:text-[#16B4E8] transition-colors"
                title="Click to open TopLinkers in Google Maps"
              >
                Top Linkers 2nd floor, 7th Office, Al Hameed Plaza, G11 Markaz, Islamabad., Islamabad, Pakistan, 4004884
              </a>
            </li>
          </ul>

          <!-- Interactive Location Map Card with Live Map Viewport & Google Maps Direct Link -->
          <div
            @click="openOfficeInGoogleMaps"
            class="rounded-xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0c1e34] to-[#071322] shadow-md mt-2 group cursor-pointer hover:border-[#16B4E8]/60 transition-all"
            title="Click map to open TopLinkers in Google Maps"
          >
            <div class="p-2.5 flex items-start justify-between gap-2.5 bg-[#091729] border-b border-white/10">
              <div class="flex items-start gap-2.5 min-w-0">
                <div class="w-7 h-7 rounded-lg bg-[#16B4E8]/15 text-[#16B4E8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#16B4E8] group-hover:text-white transition-colors">
                  <MapPinIcon class="w-3.5 h-3.5" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-[11px] font-bold text-white tracking-wide">Top Linkers Head Office</div>
                  <div class="text-[10px] text-slate-400 truncate">2nd floor, 7th Office, Al Hameed Plaza, G11 Markaz, Islamabad</div>
                </div>
              </div>
              <span class="text-[9px] font-bold text-cyan-300 opacity-80 group-hover:opacity-100 uppercase tracking-wider flex items-center gap-1 mt-1 flex-shrink-0">
                <span>Maps</span>
                <ArrowTopRightOnSquareIcon class="w-3 h-3" />
              </span>
            </div>

            <!-- Visible Live Mini Map Container -->
            <div class="relative w-full h-32 sm:h-36 bg-slate-900 overflow-hidden">
              <div ref="footerMapEl" class="w-full h-full z-10 cursor-pointer"></div>
              <!-- Hover hint overlay -->
              <div class="absolute inset-0 bg-[#0F2A44]/25 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none flex items-center justify-center">
                <span class="px-2.5 py-1 rounded-lg bg-[#0F2A44]/90 text-white text-[10px] font-bold shadow flex items-center gap-1 border border-[#16B4E8]/40">
                  <span>Open in Google Maps</span>
                  <ArrowTopRightOnSquareIcon class="w-3 h-3 text-[#16B4E8]" />
                </span>
              </div>
            </div>

            <!-- Direct Google Maps Action Link -->
            <a
              :href="googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop
              class="px-3 py-2 bg-[#091729] hover:bg-[#16B4E8] text-[10px] font-bold text-cyan-300 hover:text-[#0F2A44] flex items-center justify-between transition-colors border-t border-white/10"
            >
              <span class="inline-flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8] group-hover:bg-[#0F2A44] animate-pulse"></span>
                <span>Open in Google Maps</span>
              </span>
              <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      <!-- Bottom Copyright Bar -->
      <div class="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <p class="text-center md:text-left">
          &copy; {{ currentYear }} TopLinkers. Real estate, construction &amp; solar engineered for you.
        </p>

        <!-- Quick Legal Strip for AdSense Compliance -->
        <div class="flex items-center gap-3 text-[11px] text-slate-400">
          <router-link to="/privacy-policy" class="hover:text-[#16B4E8] transition-colors">Privacy Policy</router-link>
          <span>&bull;</span>
          <router-link to="/terms-and-conditions" class="hover:text-[#16B4E8] transition-colors">Terms &amp; Conditions</router-link>
          <span>&bull;</span>
          <router-link to="/disclaimer" class="hover:text-[#16B4E8] transition-colors">Disclaimer</router-link>
        </div>

        <div class="flex items-center gap-2">
          <span>Developed by</span>
          <a
            href="https://www.linkedin.com/in/faiz-atta/"
            target="_blank"
            rel="noopener noreferrer"
            title="Faiz Atta — LinkedIn Profile"
            class="text-[#16B4E8] hover:text-white font-bold transition-colors inline-flex items-center gap-1 underline underline-offset-2 decoration-[#16B4E8]/50 hover:decoration-white group/dev"
          >
            <span>Faiz Atta</span>
            <svg class="w-3 h-3 fill-current opacity-80 group-hover/dev:opacity-100 transition-opacity" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.53-1.53c0-.85-.68-1.53-1.53-1.53a1.53 1.53 0 0 0-1.53 1.53c0 .85.68 1.53 1.53 1.53m1.4 9.74v-8.37H5.06v8.37h2.8z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'

const currentYear = new Date().getFullYear()

// Exact Google Maps Address requested by user
const officeAddress = 'Top Linkers 2nd floor, 7th Office, Al Hameed Plaza, G11 Markaz, Islamabad., Islamabad, Pakistan, 4004884'
const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(officeAddress)

const openOfficeInGoogleMaps = () => {
  window.open(googleMapsUrl, '_blank', 'noopener,noreferrer')
}

// Footer Mini Location Map State
const footerMapEl = ref(null)
let footerMapInstance = null

const initFooterMap = () => {
  if (!footerMapEl.value || footerMapInstance) return
  // Al Hameed Plaza, G-11 Markaz, Islamabad Coordinates
  const g11Coord = [33.6685, 72.9965]

  try {
    footerMapInstance = L.map(footerMapEl.value, {
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
      dragging: !L.Browser.mobile,
      tap: !L.Browser.mobile
    }).setView(g11Coord, 15)

    // Open exact Google Maps on map click
    footerMapInstance.on('click', openOfficeInGoogleMaps)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(footerMapInstance)

    const officeIcon = L.divIcon({
      className: 'toplinkers-footer-pin cursor-pointer',
      html: `
        <div style="background-color: #0F2A44; color: #16B4E8; padding: 3px 7px; border-radius: 6px; font-weight: 800; font-size: 10px; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.5); border: 1.5px solid #16B4E8; display: flex; align-items: center; gap: 3px; cursor: pointer;">
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#16B4E8;"></span>
          <span style="color:#ffffff;">TopLinkers HQ</span>
        </div>
      `,
      iconSize: [100, 24],
      iconAnchor: [50, 12]
    })

    const marker = L.marker(g11Coord, { icon: officeIcon }).addTo(footerMapInstance)
    marker.on('click', openOfficeInGoogleMaps)

    setTimeout(() => {
      if (footerMapInstance) {
        footerMapInstance.invalidateSize()
      }
    }, 350)
  } catch (err) {
    console.error('Failed to init footer map', err)
  }
}

/** Phrases to cycle through (matching user video style) */
const phrases = [
  'your next plot.',
  'your dream home.',
  'your next investment.',
  'your luxury villa.',
  'your solar solution.'
]

const currentText = ref('')
const isDeleting = ref(false)
const phraseIndex = ref(0)
const charIndex = ref(0)
let timer = null

const typeLoop = () => {
  const currentPhrase = phrases[phraseIndex.value]

  if (isDeleting.value) {
    currentText.value = currentPhrase.substring(0, charIndex.value - 1)
    charIndex.value--
  } else {
    currentText.value = currentPhrase.substring(0, charIndex.value + 1)
    charIndex.value++
  }

  let speed = isDeleting.value ? 45 : 90

  if (!isDeleting.value && charIndex.value === currentPhrase.length) {
    speed = 2000 // pause when phrase is fully typed
    isDeleting.value = true
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false
    phraseIndex.value = (phraseIndex.value + 1) % phrases.length
    speed = 400 // pause before typing next phrase
  }

  timer = setTimeout(typeLoop, speed)
}

onMounted(() => {
  typeLoop()
  initFooterMap()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  if (footerMapInstance) {
    footerMapInstance.remove()
    footerMapInstance = null
  }
})
</script>
