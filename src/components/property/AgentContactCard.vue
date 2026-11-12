<template>
  <div class="bg-white rounded-2xl p-6 shadow-card border border-gray-100 sticky top-28 space-y-5">
    <!-- Header: Official Advisory Desk -->
    <div class="flex items-center gap-3.5 pb-4 border-b border-gray-100">
      <div class="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
        <img
          src="/toplinkers-logo.png"
          alt="Top Linkers"
          class="w-full h-full object-contain"
        />
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5">
          <h4 class="text-sm font-black truncate">
            <span class="text-[#E53935]">Top</span><span class="text-black">Linkers</span> <span class="text-[#0F2A44] font-bold">Advisory Desk</span>
          </h4>
          <span class="w-2 h-2 rounded-full bg-[#25D366]"></span>
        </div>
        <p class="text-[11px] text-[#16B4E8] font-semibold">Direct Consultant Desk</p>
        <p class="text-[10px] text-gray-400">Al Hameed Plaza, G-11 Markaz Islamabad</p>
      </div>
    </div>

    <!-- Direct Quick WhatsApp Button -->
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black uppercase tracking-wider rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
    >
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      <span>Instant WhatsApp Inquiry</span>
    </a>

    <!-- Contact Form -->
    <form @submit.prevent="sendMessage" class="space-y-3">
      <div>
        <label class="block text-[11px] font-bold text-gray-600 mb-1">Your Full Name</label>
        <input
          v-model="form.name"
          type="text"
          required
          placeholder="e.g. Tariq Khan"
          class="w-full text-xs p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#16B4E8] bg-gray-50 focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label class="block text-[11px] font-bold text-gray-600 mb-1">WhatsApp / Phone Number</label>
        <input
          v-model="form.phone"
          type="tel"
          required
          placeholder="03XX-XXXXXXX"
          class="w-full text-xs p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#16B4E8] bg-gray-50 focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label class="block text-[11px] font-bold text-gray-600 mb-1">Email Address</label>
        <input
          v-model="form.email"
          type="email"
          required
          placeholder="name@example.com"
          class="w-full text-xs p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#16B4E8] bg-gray-50 focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label class="block text-[11px] font-bold text-gray-600 mb-1">Inquiry Purpose</label>
        <select
          v-model="form.userRole"
          class="w-full text-xs p-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#16B4E8]"
        >
          <option value="buyer">Interested Buyer (Price & Availability)</option>
          <option value="investor">Overseas Investor / Installments</option>
          <option value="tenant">Rental Inquiry</option>
          <option value="construction">Construction & Solar Query</option>
        </select>
      </div>

      <div>
        <label class="block text-[11px] font-bold text-gray-600 mb-1">Description / Inquiry Note</label>
        <textarea
          v-model="form.message"
          rows="3"
          required
          placeholder="Describe your inquiry, preferred inspection timing, or special requirements..."
          class="w-full text-xs p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#16B4E8] bg-gray-50 focus:bg-white resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="isSending"
        class="w-full py-3 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 focus:outline-none mt-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>{{ isSending ? 'Sending Inquiry...' : 'Submit Inquiry' }}</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { api } from '../../services/api'
import { useUiStore } from '../../stores/ui'
import { useAdminStore } from '../../stores/admin'

const props = defineProps({
  agent: {
    type: Object,
    default: () => ({
      id: 'tl-advisory',
      name: 'TopLinkers Advisory Desk'
    })
  },
  propertyTitle: {
    type: String,
    default: 'this listing'
  }
})

const ui = useUiStore()
const adminStore = useAdminStore()
const isSending = ref(false)
const agentName = computed(() => props.agent?.name || 'TopLinkers Advisory Desk')

const form = reactive({
  name: '',
  phone: '',
  email: '',
  userRole: 'buyer',
  message: `Hello ${agentName.value}, I am interested in ${props.propertyTitle}. Please share verification details and payment terms.`,
  consent: true
})

const whatsappUrl = computed(() => {
  const phone = '923349522157'
  const text = encodeURIComponent(
    `Hello ${agentName.value}, I am inquiring about "${props.propertyTitle}". Could you please share plot/flat details and payment schedule?`
  )
  return `https://wa.me/${phone}?text=${text}`
})

const sendMessage = async () => {
  isSending.value = true
  try {
    await api.submitInquiry({
      agentId: props.agent?.id || 'tl-advisory',
      agentName: agentName.value,
      propertyTitle: props.propertyTitle,
      ...form
    })
    adminStore.addLead({
      name: form.name || 'Property Page Inquiry',
      phone: form.phone,
      email: form.email,
      city: 'Islamabad',
      division: form.userRole === 'construction' ? 'Construction' : 'Plots',
      project: props.propertyTitle,
      budget: 'Inquiring on Listing',
      priority: 'High',
      source: 'Property Detail Page Form',
      notes: form.message
    })
    ui.addToast({
      type: 'success',
      title: 'Inquiry Sent!',
      message: `Your inquiry has been routed to ${agentName.value}. An advisor will reply promptly.`
    })
    form.name = ''
    form.phone = ''
    form.email = ''
  } catch (err) {
    ui.addToast({
      type: 'error',
      title: 'Submission Failed',
      message: 'Could not send message. Please contact via WhatsApp directly.'
    })
  } finally {
    isSending.value = false
  }
}
</script>