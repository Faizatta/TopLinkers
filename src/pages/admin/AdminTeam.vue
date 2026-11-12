<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-[#0F2A44] tracking-tight">Executives, Agents &amp; Engineers</h1>
        <p class="text-xs text-slate-500 mt-0.5">
          Manage founders, consultants, and PEC engineers — updates reflect live on 
          <router-link to="/team" target="_blank" class="text-[#0F2A44] font-semibold underline">/team</router-link>
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button 
          @click="openModalForCategory('ceo')"
          class="px-3.5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
        >
          Add Founder / CEO
        </button>

        <button 
          @click="openModalForCategory('agent')"
          class="px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-xs"
        >
          Add Agent
        </button>

        <button 
          @click="openModalForCategory('engineer')"
          class="px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-xs"
        >
          Add Engineer
        </button>
      </div>
    </div>

    <!-- PART 1: CEOs & CO-FOUNDERS -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-600">
          Founders &amp; CEOs ({{ adminStore.ceos.length }})
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="ceo in adminStore.ceos" 
          :key="ceo.id"
          class="bg-[#0F2A44] text-white rounded-xl p-5 border border-slate-700/80 shadow-xs flex flex-col justify-between gap-4"
        >
          <div class="flex items-start gap-4">
            <img 
              :src="ceo.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'" 
              :alt="ceo.name" 
              class="w-16 h-16 rounded-xl object-cover border border-slate-600 shadow-sm flex-shrink-0"
            />
            <div class="min-w-0 flex-1 space-y-1">
              <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-cyan-200">
                {{ ceo.tag || 'Executive' }}
              </span>
              <h3 class="text-base font-bold truncate text-white">{{ ceo.name }}</h3>
              <p class="text-xs text-slate-300 font-medium truncate">{{ ceo.role }}</p>
              <p v-if="ceo.quote || ceo.bio" class="text-[11px] text-slate-300 italic line-clamp-2 mt-1">
                "{{ ceo.quote || ceo.bio }}"
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-slate-700/80 text-xs">
            <span class="text-slate-300 font-medium">
              {{ ceo.phone }}
            </span>
            <div class="flex items-center gap-2">
              <button 
                @click="editMember(ceo)"
                class="px-3 py-1.5 rounded-lg bg-white text-[#0F2A44] hover:bg-slate-100 font-medium text-xs transition-colors"
              >
                Edit
              </button>
              <button 
                v-if="adminStore.ceos.length > 1"
                @click="confirmDelete(ceo)"
                class="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-600 text-rose-200 hover:text-white font-medium text-xs transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PART 2: AGENTS & PEC ENGINEERS -->
    <div class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <h2 class="text-xs font-bold uppercase tracking-wider text-slate-600 mr-2">
            Agents &amp; Engineers ({{ filteredFieldTeam.length }})
          </h2>
          <button 
            @click="categoryFilter = 'all'"
            class="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
            :class="categoryFilter === 'all' ? 'bg-[#0F2A44] text-white font-semibold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
          >
            All ({{ adminStore.fieldTeam.length }})
          </button>
          <button 
            @click="categoryFilter = 'agent'"
            class="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
            :class="categoryFilter === 'agent' ? 'bg-[#0F2A44] text-white font-semibold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
          >
            Agents ({{ adminStore.agentsList.length }})
          </button>
          <button 
            @click="categoryFilter = 'engineer'"
            class="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
            :class="categoryFilter === 'engineer' ? 'bg-[#0F2A44] text-white font-semibold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
          >
            Engineers ({{ adminStore.engineersList.length }})
          </button>
        </div>

        <div class="relative w-full sm:w-64">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search agent or engineer..." 
            class="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
          />
          <MagnifyingGlassIcon class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="member in filteredFieldTeam" 
          :key="member.id"
          class="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-sm transition-shadow"
        >
          <div>
            <div class="flex items-center gap-3.5 mb-3">
              <img 
                :src="member.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'" 
                :alt="member.name"
                class="w-12 h-12 rounded-full object-cover border border-slate-200 flex-shrink-0"
              />
              <div class="min-w-0">
                <span 
                  class="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {{ member.category === 'engineer' ? 'PEC Engineer' : 'Real Estate Agent' }}
                </span>
                <h4 class="text-xs font-bold text-[#0F2A44] truncate mt-1">{{ member.name }}</h4>
                <p class="text-[11px] text-slate-500 truncate">{{ member.role }}</p>
              </div>
            </div>

            <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">{{ member.bio }}</p>
          </div>

          <div class="pt-3 border-t border-slate-100 space-y-2.5">
            <div class="flex items-center justify-between text-[11px] text-slate-600">
              <span class="font-medium text-slate-800">{{ member.phone }}</span>
              <span>{{ member.experience || '5+ Years' }} Exp</span>
            </div>

            <div class="flex items-center justify-between gap-2">
              <button 
                @click="editMember(member)"
                class="flex-1 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors text-center"
              >
                <span>Edit Details</span>
              </button>
              <button 
                @click="confirmDelete(member)"
                class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Add / Edit CEO, Agent or Engineer -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 class="text-lg font-extrabold text-[#0F2A44]">
              {{ isEditing ? `Edit ${categoryLabel(form.category)}` : `Add New ${categoryLabel(form.category)}` }}
            </h3>
            <p class="text-[11px] text-gray-500">Syncs directly with Laravel database and reflects live on /team</p>
          </div>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-700 p-1">✕</button>
        </div>

        <form @submit.prevent="submitMember" class="space-y-4 pt-4">
          <!-- Photo Upload Preview + Browser Picker -->
          <div class="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-gray-200">
            <img 
              :src="form.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'" 
              alt="Profile Preview" 
              class="w-16 h-16 rounded-full object-cover border-2 border-[#16B4E8] flex-shrink-0 bg-white"
            />
            <div class="flex-1 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <label class="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-bold transition-colors">
                  <FolderOpenIcon class="w-4 h-4" />
                  <span>Browse Photo from Device</span>
                  <input type="file" accept="image/*" class="hidden" @change="handlePhotoUpload" />
                </label>
                <span class="text-[11px] text-gray-400">or paste URL below</span>
              </div>
              <input v-model="form.photo" type="text" class="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs" placeholder="https://..." />
            </div>
          </div>

          <!-- Category & Badge Tag -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Team Category *</label>
              <select v-model="form.category" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs bg-white">
                <option value="ceo">CEO / Co-Founder (Top Section)</option>
                <option value="agent">Real Estate Agent / Consultant</option>
                <option value="engineer">Civil / Solar Engineer (PEC)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Badge Tag</label>
              <input v-model="form.tag" type="text" class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs" placeholder="e.g. Senior Agent / PEC Registered" />
            </div>
          </div>

          <!-- Name & Designation -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name *</label>
              <input v-model="form.name" type="text" required class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs" placeholder="e.g. Muhammad Tariq" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Designation / Title *</label>
              <input v-model="form.role" type="text" required class="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs" placeholder="e.g. Chief Civil Engineer" />
            </div>
          </div>

          <!-- Phone, Email & Experience -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Phone / WhatsApp *</label>
              <input v-model="form.phone" type="text" required class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs" placeholder="0323-5963375" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
              <input v-model="form.email" type="email" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs" placeholder="toplinkers12@gmail.com" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Experience</label>
              <input v-model="form.experience" type="text" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs" placeholder="10+ Years" />
            </div>
          </div>

          <!-- Bio / Specialization / Notes -->
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Specialization, Bio &amp; Profile Description Notes</label>
            <textarea v-model="form.bio" rows="2" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs" placeholder="Areas of expertise, career background, dossier notes..."></textarea>
          </div>

          <!-- Quote for CEOs -->
          <div v-if="form.category === 'ceo'">
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">CEO / Founder Vision Quote</label>
            <textarea v-model="form.quote" rows="2" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs" placeholder="Leadership statement..."></textarea>
          </div>

          <!-- Office Address -->
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Office Address</label>
            <input v-model="form.address" type="text" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs" placeholder="Al Hameed Plaza, G-11 Markaz, Islamabad" />
          </div>

          <!-- Social Links for CEO & Founder (Optional) -->
          <div v-if="form.category === 'ceo'" class="p-3.5 rounded-xl bg-slate-50 border border-gray-200 space-y-2.5">
            <span class="block text-[11px] font-black uppercase tracking-wider text-[#0F2A44]">
              Founder / CEO Social Profiles (Optional)
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label class="block text-[10px] font-bold text-gray-600 uppercase mb-1">Instagram</label>
                <input v-model="form.instagram" type="text" class="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs" placeholder="https://instagram.com/..." />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-gray-600 uppercase mb-1">Facebook</label>
                <input v-model="form.facebook" type="text" class="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs" placeholder="https://facebook.com/..." />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-gray-600 uppercase mb-1">LinkedIn</label>
                <input v-model="form.linkedin" type="text" class="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs" placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button type="button" @click="showModal = false" class="px-4 py-2 text-xs font-bold text-gray-500">Cancel</button>
            <button type="submit" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16B4E8] hover:bg-[#139ecb] text-white shadow-md">
              Save &amp; Sync to Backend
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  PhoneIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  FolderOpenIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()

const searchQuery = ref('')
const categoryFilter = ref('all')
const showModal = ref(false)
const isEditing = ref(false)

const form = ref({
  id: '',
  name: '',
  role: '',
  category: 'agent',
  tag: 'Senior Agent',
  experience: '5+ Years',
  phone: '0323-5963375',
  email: 'toplinkers12@gmail.com',
  photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  bio: '',
  quote: '',
  address: '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad',
  instagram: '',
  facebook: '',
  linkedin: ''
})

const filteredFieldTeam = computed(() => {
  return adminStore.fieldTeam.filter(member => {
    if (categoryFilter.value === 'agent' && !['agent', 'employee'].includes(member.category)) return false
    if (categoryFilter.value === 'engineer' && member.category !== 'engineer') return false
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      return member.name?.toLowerCase().includes(q) ||
             member.role?.toLowerCase().includes(q) ||
             member.phone?.toLowerCase().includes(q) ||
             member.bio?.toLowerCase().includes(q)
    }
    return true
  })
})

const categoryLabel = (cat) => {
  if (cat === 'ceo' || cat === 'owner' || cat === 'founder' || cat === 'partner') return 'CEO / Founder'
  if (cat === 'engineer') return 'PEC Engineer'
  return 'Real Estate Agent'
}

const openModalForCategory = (category) => {
  isEditing.value = false
  form.value = {
    id: (category === 'ceo' ? 'ceo-' : category === 'engineer' ? 'eng-' : 'agent-') + Date.now(),
    name: '',
    role: category === 'ceo' ? 'Co-Founder & CEO' : category === 'engineer' ? 'Registered Civil / Solar Engineer' : 'Property Investment Consultant',
    category,
    tag: category === 'ceo' ? 'Founder & CEO' : category === 'engineer' ? 'PEC Registered Engineer' : 'Verified Consultant',
    experience: '7+ Years',
    phone: '0323-5963375',
    email: 'toplinkers12@gmail.com',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: '',
    quote: '',
    address: '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad',
    instagram: '',
    facebook: '',
    linkedin: ''
  }
  showModal.value = true
}

const editMember = (member) => {
  isEditing.value = true
  const normCat = ['owner', 'partner', 'founder', 'ceo'].includes(member.category)
    ? 'ceo'
    : member.category === 'engineer'
      ? 'engineer'
      : 'agent'
  form.value = {
    instagram: '',
    facebook: '',
    linkedin: '',
    ...member,
    category: normCat
  }
  showModal.value = true
}

const compressImageFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_W = 600
        let width = img.width
        let height = img.height
        if (width > MAX_W) {
          height = Math.round((height * MAX_W) / width)
          width = MAX_W
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.onerror = () => resolve(e.target.result)
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

const handlePhotoUpload = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  form.value.photo = await compressImageFile(file)
  event.target.value = ''
}

const submitMember = async () => {
  const saved = await adminStore.saveTeamMember({ ...form.value })
  showModal.value = false
  adminStore.showToast(isEditing.value ? `${saved.name} updated successfully.` : `${saved.name} added to team.`)
}

const confirmDelete = async (member) => {
  const ok = await adminStore.requestConfirm({
    title: `Remove ${member.name}?`,
    message: `Are you sure you want to delete ${member.name} from the TopLinkers team directory?`,
    confirmText: 'Delete Member'
  })
  if (ok) {
    await adminStore.deleteTeamMember(member.id)
    adminStore.showToast(`${member.name} removed from team.`, 'info')
  }
}
</script>
