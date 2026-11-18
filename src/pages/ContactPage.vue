<template>
  <div class="contact-page pt-28 sm:pt-32 md:pt-36 pb-16 bg-[#F6F8FA] min-h-screen select-none">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center mb-8 sm:mb-12">
        <SectionHeading
          tag="h1"
          eyebrow="GET IN TOUCH"
          title="Contact TopLinkers Real Estate, Construction & Solar"
          highlight="TopLinkers"
          subtitle="Visit our office at Al Hameed Plaza, G-11 Markaz Islamabad or reach out directly via WhatsApp and phone."
          align="center"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <!-- Left: Office Location & Official Direct Contacts (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-gray-100">
            <!-- Header Brand -->
            <div class="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
              <img src="/toplinkers-logo-mark.webp" alt="Top Linkers" width="367" height="488" loading="lazy" decoding="async" class="h-11 w-auto object-contain flex-shrink-0" />
              <div>
                <h2 class="text-base sm:text-lg font-black leading-tight">
                  <span class="text-[#E53935]">Top</span> <span class="text-black">Linkers</span> <span class="text-[#0F2A44] font-bold text-sm">Head Office</span>
                </h2>
                <p class="text-[11px] text-[#16B4E8] font-bold">Real Estate, Construction &amp; Solar</p>
              </div>
            </div>

            <!-- Contacts Info List -->
            <div class="space-y-4 text-xs text-gray-600">
              <!-- Address -->
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-[#16B4E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPinIcon class="w-4 h-4" />
                </div>
                <div>
                  <span class="font-bold text-[#0F2A44] block text-xs uppercase tracking-wider">Registered Address</span>
                  <a
                    :href="googleMapsUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-700 hover:text-[#16B4E8] mt-1 leading-relaxed font-semibold block transition-colors"
                    title="Click to open TopLinkers in Google Maps"
                  >
                    Top Linkers 2nd floor, 7th Office, Al Hameed Plaza, G11 Markaz, Islamabad., Islamabad, Pakistan, 4004884
                  </a>
                </div>
              </div>

              <!-- Phones -->
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PhoneIcon class="w-4 h-4" />
                </div>
                <div class="flex-1">
                  <span class="font-bold text-[#0F2A44] block text-xs uppercase tracking-wider">Direct Lines &amp; WhatsApp Desks</span>
                  <div class="space-y-2 mt-2 font-bold text-gray-800">
                    <a
                      href="https://wa.me/923349522157?text=Hello%20TopLinkers,%20I%20have%20an%20inquiry%20regarding%20Plots%20and%20Flats"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between p-2.5 rounded-xl bg-green-50/70 hover:bg-green-100 text-green-800 transition-colors border border-green-200/50"
                    >
                      <div>
                        <span class="text-xs sm:text-sm font-extrabold block">0334-9522157</span>
                        <span class="text-[10px] text-gray-500 font-semibold block">Real Estate, Plots &amp; Allocations</span>
                      </div>
                      <span class="text-[10px] font-black uppercase text-green-700 bg-white px-2 py-0.5 rounded shadow-2xs">
                        WhatsApp &rarr;
                      </span>
                    </a>
                    <a
                      href="tel:03324004884"
                      class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-black transition-colors border border-gray-200"
                    >
                      <div>
                        <span class="text-xs sm:text-sm font-extrabold text-black block">0332-4004884</span>
                        <span class="text-[10px] text-gray-600 font-semibold block">Turnkey Construction &amp; Solar Solutions</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-[#16B4E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <EnvelopeIcon class="w-4 h-4" />
                </div>
                <div class="space-y-1">
                  <span class="font-bold text-[#0F2A44] block text-xs uppercase tracking-wider">Official Email Address</span>
                  <div class="pt-0.5">
                    <a href="mailto:toplinkers69@gmail.com" class="text-gray-800 hover:text-[#16B4E8] font-semibold text-xs sm:text-sm transition-colors block">
                      toplinkers69@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Office Map (Safe for Mobile Touch Scrolling) -->
          <div
            class="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 h-60 sm:h-72 relative cursor-pointer group hover:border-[#16B4E8]/60 transition-all"
            @click="openOfficeInGoogleMaps"
            title="Click map to open TopLinkers in Google Maps"
          >
            <div ref="contactMapEl" class="w-full h-full cursor-pointer"></div>
            <!-- Office Address Badge Floating on Map -->
            <a
              :href="googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop
              class="absolute bottom-3 left-3 right-3 z-[400] bg-white/95 hover:bg-[#0F2A44] hover:text-white backdrop-blur-md p-2.5 rounded-xl border border-gray-200/90 shadow flex items-center justify-between gap-1.5 text-[11px] font-bold text-[#0F2A44] transition-all group"
            >
              <div class="flex items-center gap-1.5 truncate">
                <MapPinIcon class="w-3.5 h-3.5 text-[#16B4E8] flex-shrink-0" />
                <span class="truncate">Top Linkers 2nd floor, 7th Office, Al Hameed Plaza, G11 Markaz, Islamabad (4004884)</span>
              </div>
              <span class="text-[10px] text-[#16B4E8] group-hover:text-cyan-300 font-extrabold whitespace-nowrap flex items-center gap-0.5">
                <span>Open in Google Maps</span>
                <span>&rarr;</span>
              </span>
            </a>
          </div>
        </div>

        <!-- Right: Inquiry Form with Division Dropdown (7 cols) -->
        <div class="lg:col-span-7">
          <div class="bg-white rounded-2xl p-5 sm:p-8 shadow-card border border-gray-100">
            <div class="border-b border-gray-100 pb-4 mb-5">
              <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8] bg-blue-50 px-2.5 py-0.5 rounded">
                Direct Consultation
              </span>
              <h2 class="text-lg sm:text-2xl font-extrabold text-[#0F2A44] mt-2">Send TopLinkers a Message</h2>
              <p class="text-xs text-gray-500 mt-1">
                Inquire about plots, PHA flat files, turnkey building construction, or solar net metering installations.
              </p>
            </div>

            <form @submit.prevent="submitForm" class="space-y-4">
              <!-- Row 1: Name and WhatsApp -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="contact-name" class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Your Full Name *</label>
                  <input
                    id="contact-name"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="e.g. Muhammad Tariq"
                    class="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#16B4E8] transition-colors"
                  />
                </div>
                <div>
                  <label for="contact-phone" class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Phone / WhatsApp *</label>
                  <input
                    id="contact-phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="0334-9522157 or +923349522157"
                    class="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#16B4E8] transition-colors"
                  />
                </div>
              </div>

              <!-- Row 2: Query Regarding (Division Dropdown) & Specific Project -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="contact-division" class="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                    Query Regarding Division *
                  </label>
                  <div class="relative">
                    <select
                      id="contact-division"
                      v-model="form.division"
                      required
                      class="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#16B4E8] appearance-none pr-8 cursor-pointer font-bold text-[#0F2A44]"
                    >
                      <option value="Plots & Land">Plots &amp; Land (Moqa Ka Plot / Installments)</option>
                      <option value="Flats & Apartments">Flats (PHA I-12 &amp; I-16, Banu Hafeez)</option>
                      <option value="Turnkey Construction">Turnkey Construction (Gray Structure &amp; A+)</option>
                      <option value="Solar Net Metering">Solar Net Metering (10kW, 20kW, 50kW)</option>
                      <option value="Harsukh Nathia Gali">Harsukh Luxury Flats (Nathia Gali)</option>
                      <option value="General Financial Consultation">General Investment &amp; Portfolio Advisory</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#16B4E8]">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="contact-project" class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Society or Location</label>
                  <div class="relative">
                    <select
                      id="contact-project"
                      v-model="form.project"
                      class="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#16B4E8] appearance-none pr-8 cursor-pointer font-medium text-[#0F2A44]"
                    >
                      <option value="General Inquiry">General Islamabad &amp; Rawalpindi</option>
                      <option value="PECHS Islamabad (Moqa Ka Plot)">PECHS Islamabad (Moqa Ka Plot)</option>
                      <option value="TopCity-1 & Residencia">TopCity-1 &amp; Residencia</option>
                      <option value="PHA Flats (Sector I-12 / I-16)">PHA Flats (Sector I-12 / I-16)</option>
                      <option value="Faisal Town Phase 2">Faisal Town Phase 2 (FT-II)</option>
                      <option value="Harsukh Nathia Gali Suites">Harsukh Residencies (Nathia Gali)</option>
                      <option value="Gulberg Islamabad">Gulberg Islamabad Plots/Villas</option>
                      <option value="Airport Green Garden (AGG)">Airport Green Garden (AGG)</option>
                      <option value="Turnkey Construction Contract">Turnkey Villa / House Construction</option>
                      <option value="10kW / 20kW / 50kW Solar System">10kW / 20kW / 50kW Solar Net Metering</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Row 3: Email Address -->
              <div>
                <label for="contact-email" class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Email Address *</label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="ali@example.com"
                  class="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#16B4E8] transition-colors"
                />
              </div>

              <!-- Row 4: Message or Query Details -->
              <div>
                <label for="contact-message" class="block text-xs font-bold uppercase text-gray-600 mb-1.5">Description / Requirements Note / Message *</label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  rows="4"
                  required
                  placeholder="Tell us your specific requirement: e.g. plot size (5M, 10M, 1 Kanal), budget, PHA flat floor choice, solar system size (10kW/20kW/50kW), or construction plan..."
                  class="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#16B4E8] transition-colors leading-relaxed"
                ></textarea>
              </div>

              <!-- Consent Checkbox (Explicitly Optional Marketing Consent) -->
              <div class="flex items-start gap-2 pt-1">
                <input
                  id="consent"
                  v-model="form.consent"
                  type="checkbox"
                  class="w-4 h-4 mt-0.5 text-[#16B4E8] rounded focus:ring-0 cursor-pointer flex-shrink-0"
                />
                <label for="consent" class="text-xs text-gray-500 cursor-pointer leading-normal">
                  I agree to receive verified property availability, payment schedules, and engineering details from TopLinkers via phone and WhatsApp (Optional).
                </label>
              </div>

              <!-- Submit Button -->
              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="submitting"
                  class="w-full py-3.5 sm:py-4 bg-[#16B4E8] hover:bg-[#0F2A44] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <svg v-if="submitting" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <span>{{ submitting ? 'Transmitting Request...' : 'Submit Inquiry to TopLinkers Desk' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'
import SectionHeading from '../components/ui/SectionHeading.vue'
import { api } from '../services/api'
import { useUiStore } from '../stores/ui'
import { useAdminStore } from '../stores/admin'
import L from '../utils/leaflet'

const ui = useUiStore()
const adminStore = useAdminStore()
const contactMapEl = ref(null)
const submitting = ref(false)

const officeAddress = 'Top Linkers 2nd floor, 7th Office, Al Hameed Plaza, G11 Markaz, Islamabad., Islamabad, Pakistan, 4004884'
const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(officeAddress)

const openOfficeInGoogleMaps = () => {
  window.open(googleMapsUrl, '_blank', 'noopener,noreferrer')
}

import { isValidPhone, isValidEmail } from '../utils/validation'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  division: 'Plots & Land',
  project: 'General Inquiry',
  message: '',
  consent: false
})

const submitForm = async () => {
  if (submitting.value) return

  // Trim whitespace
  const cleanName = (form.name || '').trim()
  const cleanPhone = (form.phone || '').trim()
  const cleanEmail = (form.email || '').trim()
  const cleanMsg = (form.message || '').trim()

  if (!cleanName) {
    ui.addToast({
      type: 'error',
      title: 'Name Required',
      message: 'Please enter your full name.'
    })
    return
  }

  if (!cleanPhone || !isValidPhone(cleanPhone)) {
    ui.addToast({
      type: 'error',
      title: 'Invalid Phone Number',
      message: 'Please enter a valid Pakistani or international phone number (e.g. 0334-9522157 or +923349522157).'
    })
    return
  }

  if (!cleanEmail || !isValidEmail(cleanEmail)) {
    ui.addToast({
      type: 'error',
      title: 'Invalid Email Address',
      message: 'Please provide a valid email address.'
    })
    return
  }

  if (!cleanMsg) {
    ui.addToast({
      type: 'error',
      title: 'Message Required',
      message: 'Please describe your inquiry or requirements.'
    })
    return
  }

  submitting.value = true
  try {
    await api.submitInquiry({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      division: form.division,
      project: form.project,
      message: cleanMsg,
      consent: form.consent,
      source: 'Contact Page Direct Form'
    })
    adminStore.addLead({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      city: 'Islamabad / Inquiry',
      division: form.division || 'Plots',
      project: form.project || 'General Consultation',
      budget: 'Discuss on Call',
      priority: 'High',
      source: 'Contact Page Form',
      notes: cleanMsg
    })
    ui.addToast({
      type: 'success',
      title: 'Inquiry Submitted',
      message: `Thank you ${cleanName}. Our ${form.division} advisory desk will contact you via WhatsApp shortly.`
    })
    form.name = ''
    form.phone = ''
    form.email = ''
    form.message = ''
  } catch (err) {
    ui.addToast({
      type: 'error',
      title: 'Submission Issue',
      message: 'Please reach out directly on WhatsApp at 0334-9522157 or 0332-4004884.'
    })
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  document.title = 'Contact TopLinkers | Head Office Al Hameed Plaza G-11 Markaz Islamabad'

  if (contactMapEl.value) {
    // Al Hameed Plaza, G-11 Markaz, Islamabad coordinates
    const g11Coord = [33.6685, 72.9965]

    const map = L.map(contactMapEl.value, {
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      tap: !L.Browser.mobile
    }).setView(g11Coord, 15)

    map.on('click', openOfficeInGoogleMaps)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    const officeIcon = L.divIcon({
      className: 'toplinkers-contact-pin cursor-pointer',
      html: `
        <div style="background-color: #0F2A44; color: white; padding: 6px 10px; border-radius: 8px; font-weight: 800; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 12px rgba(15,42,68,0.4); border: 2px solid #16B4E8; display: flex; align-items: center; gap: 4px; cursor: pointer;">
          <span>📍</span>
          <span>TopLinkers HQ (G-11)</span>
        </div>
      `,
      iconSize: [160, 36],
      iconAnchor: [80, 18]
    })

    const marker = L.marker(g11Coord, { icon: officeIcon }).addTo(map)
    marker.on('click', openOfficeInGoogleMaps)
    marker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; padding: 6px; max-width: 260px;">
        <strong style="color: #0F2A44; font-size: 13px;">Top Linkers Head Office</strong><br/>
        2nd Floor, 7th Office, Al Hameed Plaza<br/>
        G11 Markaz, Islamabad, Pakistan, 4004884<br/>
        <span style="color: #16B4E8; font-weight: bold;">0334-9522157 &bull; 0332-4004884</span><br/>
        <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block; margin-top: 6px; padding: 4px 8px; background: #0F2A44; color: #16B4E8; border-radius: 6px; font-weight: bold; text-decoration: none; font-size: 11px;">
          Open in Google Maps &rarr;
        </a>
      </div>
    `)
  }
})
</script>
