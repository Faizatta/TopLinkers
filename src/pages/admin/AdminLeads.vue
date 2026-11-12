<template>
  <div class="space-y-5">
    <!-- Filter Toolbar & Actions -->
    <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <!-- Search & Filters -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
          <div class="relative">
            <MagnifyingGlassIcon class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search name, phone, project..."
              class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/15"
            />
          </div>

          <select
            v-model="selectedDivision"
            class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#16B4E8]"
          >
            <option value="All">All Divisions</option>
            <option value="Plots">Moqa Ka Plots</option>
            <option value="Installment Plots">Installment Files</option>
            <option value="Flats">PHA Luxury Flats</option>
            <option value="Solar">Solar Power Energy</option>
            <option value="Construction">Construction Turnkey</option>
            <option value="Harsukh">Harsukh (Nathia Gali)</option>
          </select>

          <select
            v-model="selectedStatus"
            class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#16B4E8]"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="Negotiation">Negotiation / Token</option>
            <option value="Closed / Won">Closed / Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <!-- Utility Action Buttons -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            @click="exportToCSV"
            class="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            @click="openAddModal = true"
            class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>New Lead</span>
          </button>
        </div>
      </div>

      <!-- Clean Status Pipeline Tabs -->
      <div class="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-slate-100 text-xs">
        <button
          v-for="st in statusPills"
          :key="st.key"
          @click="selectedStatus = st.key"
          class="px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-1.5"
          :class="selectedStatus === st.key ? 'bg-[#0F2A44] text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'"
        >
          <span>{{ st.label }}</span>
          <span
            class="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
            :class="selectedStatus === st.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'"
          >
            {{ getStatusCount(st.key) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Clean Executive CRM Table -->
    <div v-if="filteredLeads.length > 0" class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th class="py-3.5 px-4">Client &amp; Contact</th>
              <th class="py-3.5 px-4">Project &amp; Division</th>
              <th class="py-3.5 px-4">Budget</th>
              <th class="py-3.5 px-4">Pipeline Status</th>
              <th class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 text-xs">
            <tr
              v-for="lead in filteredLeads"
              :key="lead.id"
              class="hover:bg-slate-50/70 transition-colors"
            >
              <!-- Client & Contact -->
              <td class="py-3.5 px-4 align-middle">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-[#0F2A44] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {{ getInitials(lead.name) }}
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-[#0F2A44] text-sm truncate">{{ lead.name }}</span>
                      <span
                        v-if="lead.priority === 'High'"
                        class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-50 text-rose-600 border border-rose-200"
                      >
                        High
                      </span>
                    </div>
                    <div class="text-[11px] text-slate-500 flex flex-wrap items-center gap-1.5 mt-0.5">
                      <span class="font-medium text-slate-700">{{ lead.phone }}</span>
                      <span v-if="lead.city">&bull; {{ lead.city }}</span>
                      <span v-if="lead.date" class="text-slate-400">&bull; {{ lead.date }}</span>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Project & Division -->
              <td class="py-3.5 px-4 align-middle">
                <div class="space-y-1">
                  <div class="flex items-center gap-1.5">
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-50 text-[#0F2A44] border border-sky-100">
                      {{ lead.division }}
                    </span>
                    <span class="font-semibold text-slate-800 truncate max-w-[230px]">
                      {{ lead.project || 'General Inquiry' }}
                    </span>
                  </div>
                  <p class="text-[11px] text-slate-400 truncate max-w-[280px]">
                    {{ lead.notes || lead.source || 'Website Inquiry' }}
                  </p>
                </div>
              </td>

              <!-- Budget -->
              <td class="py-3.5 px-4 align-middle whitespace-nowrap">
                <span class="font-bold text-[#0F2A44]">{{ lead.budget || 'Open Discussion' }}</span>
              </td>

              <!-- Status Selector -->
              <td class="py-3.5 px-4 align-middle">
                <select
                  :value="lead.status"
                  @change="handleStatusChange(lead.id, $event.target.value)"
                  class="px-2.5 py-1.5 rounded-lg border text-xs font-semibold focus:outline-none focus:border-[#16B4E8] cursor-pointer"
                  :class="statusSelectClass(lead.status)"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Site Visit Scheduled">Site Visit</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed / Won">Closed / Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </td>

              <!-- Crisp Action Buttons -->
              <td class="py-3.5 px-4 align-middle">
                <div class="flex items-center justify-end gap-1.5 whitespace-nowrap">
                  <button
                    type="button"
                    @click="viewingLead = lead"
                    class="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                  >
                    Details
                  </button>

                  <a
                    :href="`https://wa.me/${cleanPhone(lead.phone)}?text=${encodeURIComponent(`Assalam o Alaikum ${lead.name}, thank you for your inquiry with TopLinkers Real Estate regarding ${lead.project}.`)}`"
                    target="_blank"
                    class="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                  >
                    WhatsApp
                  </a>

                  <a
                    :href="`tel:${cleanPhone(lead.phone)}`"
                    class="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                  >
                    Call
                  </a>

                  <button
                    type="button"
                    @click="confirmDelete(lead.id)"
                    class="px-2 py-1 rounded-md border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-400 text-xs transition-colors"
                    title="Delete lead"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm">
      <div class="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
        <InboxIcon class="w-7 h-7" />
      </div>
      <h3 class="text-sm font-bold text-slate-800">No Inquiries Found</h3>
      <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">No client leads match your current filter. Clear filters or log a new inquiry.</p>
    </div>

    <!-- Modal: View Full Lead Details -->
    <div v-if="viewingLead" @click.self="viewingLead = null" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div class="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-bold text-[#0F2A44]">{{ viewingLead.name }}</h3>
              <span class="text-xs font-mono text-slate-400">#{{ viewingLead.id }}</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">{{ viewingLead.phone }} &bull; {{ viewingLead.city || 'Islamabad' }}</p>
          </div>
          <button @click="viewingLead = null" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span class="block text-[10px] font-bold uppercase text-slate-400">Division &amp; Project</span>
            <span class="font-semibold text-[#0F2A44] mt-0.5 block">{{ viewingLead.division }} — {{ viewingLead.project }}</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span class="block text-[10px] font-bold uppercase text-slate-400">Budget / Terms</span>
            <span class="font-semibold text-[#0F2A44] mt-0.5 block">{{ viewingLead.budget || 'Open Discussion' }}</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span class="block text-[10px] font-bold uppercase text-slate-400">Lead Source</span>
            <span class="font-medium text-slate-700 mt-0.5 block">{{ viewingLead.source || 'Website Form' }}</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span class="block text-[10px] font-bold uppercase text-slate-400">Logged Date</span>
            <span class="font-mono text-slate-700 mt-0.5 block">{{ viewingLead.date }}</span>
          </div>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <span class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Inquiry Notes</span>
          <p class="text-slate-700 leading-relaxed">{{ viewingLead.notes || 'No notes recorded.' }}</p>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
          <a
            :href="`tel:${cleanPhone(viewingLead.phone)}`"
            class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <PhoneIcon class="w-4 h-4" />
            <span>Call Client</span>
          </a>
          <a
            :href="`https://wa.me/${cleanPhone(viewingLead.phone)}?text=${encodeURIComponent(`Assalam o Alaikum ${viewingLead.name}, thank you for your inquiry with TopLinkers Real Estate regarding ${viewingLead.project}.`)}`"
            target="_blank"
            class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <ChatBubbleLeftRightIcon class="w-4 h-4" />
            <span>WhatsApp Direct</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Modal: Add Manual Lead -->
    <div v-if="openAddModal" @click.self="openAddModal = false" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 class="text-base font-bold text-[#0F2A44]">Create New Lead</h3>
          <button @click="openAddModal = false" class="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="submitLead" class="space-y-3.5 pt-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Client Full Name *</label>
            <input v-model="form.name" type="text" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs" placeholder="e.g. Tariq Mehmood" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp *</label>
              <input v-model="form.phone" type="tel" required class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs" placeholder="0300-1234567" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">City / Country</label>
              <input v-model="form.city" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs" placeholder="Islamabad" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Division *</label>
              <select v-model="form.division" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white">
                <option value="Plots">Moqa Ka Plots</option>
                <option value="Installment Plots">Installment Files</option>
                <option value="Flats">PHA Flats</option>
                <option value="Solar">Solar Power</option>
                <option value="Construction">Construction</option>
                <option value="Harsukh">Harsukh</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Priority</label>
              <select v-model="form.priority" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white">
                <option value="High">High Priority</option>
                <option value="Medium">Medium</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Project Name</label>
            <input v-model="form.project" type="text" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs" placeholder="PECHS 10 Marla / TopCity" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Discussion Notes</label>
            <textarea v-model="form.notes" rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs" placeholder="Details of the conversation..."></textarea>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button type="button" @click="openAddModal = false" class="px-4 py-2 text-xs font-semibold text-slate-500">Cancel</button>
            <button type="submit" class="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0F2A44] hover:bg-[#16B4E8] text-white transition-colors">Save Lead</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  ArrowDownTrayIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  InboxIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()

const searchQuery = ref('')
const selectedDivision = ref('All')
const selectedStatus = ref('All')
const openAddModal = ref(false)
const viewingLead = ref(null)

const form = ref({
  name: '',
  phone: '',
  email: '',
  city: 'Islamabad',
  division: 'Plots',
  project: '',
  budget: '',
  priority: 'High',
  source: 'Admin Portal',
  notes: ''
})

const statusPills = [
  { key: 'All', label: 'All Inquiries' },
  { key: 'New', label: 'New' },
  { key: 'Contacted', label: 'Contacted' },
  { key: 'Site Visit Scheduled', label: 'Site Visits' },
  { key: 'Negotiation', label: 'Negotiation' },
  { key: 'Closed / Won', label: 'Closed' }
]

const statusSelectClass = (status) => {
  switch (status) {
    case 'New': return 'text-amber-800 bg-amber-50 border-amber-200'
    case 'Contacted': return 'text-blue-800 bg-blue-50 border-blue-200'
    case 'Site Visit Scheduled': return 'text-purple-800 bg-purple-50 border-purple-200'
    case 'Negotiation': return 'text-indigo-800 bg-indigo-50 border-indigo-200'
    case 'Closed / Won': return 'text-emerald-800 bg-emerald-50 border-emerald-200'
    default: return 'text-slate-600 bg-slate-50 border-slate-200'
  }
}

const getStatusCount = (key) => {
  if (key === 'All') return adminStore.leads.length
  return adminStore.leads.filter(l => l.status === key).length
}

const filteredLeads = computed(() => {
  return adminStore.leads.filter(lead => {
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      const match =
        lead.name?.toLowerCase().includes(q) ||
        lead.phone?.toLowerCase().includes(q) ||
        lead.project?.toLowerCase().includes(q) ||
        lead.city?.toLowerCase().includes(q) ||
        lead.notes?.toLowerCase().includes(q)
      if (!match) return false
    }

    if (selectedDivision.value !== 'All' && lead.division !== selectedDivision.value) {
      return false
    }

    if (selectedStatus.value !== 'All' && lead.status !== selectedStatus.value) {
      return false
    }

    return true
  })
})

const getInitials = (name) => {
  if (!name) return 'TL'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase()
}

const cleanPhone = (phone) => {
  if (!phone) return '923235963375'
  const digits = phone.replace(/[^0-9]/g, '')
  if (digits.startsWith('0')) return '92' + digits.substring(1)
  return digits
}

const handleStatusChange = (id, status) => {
  adminStore.updateLeadStatus(id, status)
  adminStore.showToast(`Lead status updated to "${status}".`)
}

const confirmDelete = async (id) => {
  const ok = await adminStore.requestConfirm({
    title: 'Delete Lead Inquiry?',
    message: 'Are you sure you want to permanently remove this client inquiry from CRM?',
    confirmText: 'Delete Lead'
  })
  if (ok) {
    adminStore.deleteLead(id)
    adminStore.showToast('Lead removed from CRM.', 'info')
  }
}

const submitLead = () => {
  adminStore.addLead({ ...form.value })
  openAddModal.value = false
  adminStore.showToast('New lead saved to CRM.')
  form.value = {
    name: '',
    phone: '',
    email: '',
    city: 'Islamabad',
    division: 'Plots',
    project: '',
    budget: '',
    priority: 'High',
    source: 'Admin Portal',
    notes: ''
  }
}

const exportToCSV = () => {
  const headers = ['ID', 'Name', 'Phone', 'Email', 'City', 'Division', 'Project', 'Budget', 'Status', 'Priority', 'Date', 'Notes']
  const rows = adminStore.leads.map(l => [
    l.id,
    `"${l.name || ''}"`,
    `"${l.phone || ''}"`,
    `"${l.email || ''}"`,
    `"${l.city || ''}"`,
    `"${l.division || ''}"`,
    `"${l.project || ''}"`,
    `"${l.budget || ''}"`,
    `"${l.status || ''}"`,
    `"${l.priority || ''}"`,
    `"${l.date || ''}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`
  ])

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `TopLinkers_Leads_${new Date().toISOString().substring(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  adminStore.showToast('Leads exported to CSV.')
}
</script>
