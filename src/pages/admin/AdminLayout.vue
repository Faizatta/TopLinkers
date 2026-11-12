<template>
  <div class="h-screen w-full overflow-hidden bg-[#F8FAFC] text-slate-800 flex flex-col lg:flex-row font-sans antialiased">
    <!-- Mobile Header -->
    <header class="lg:hidden flex-shrink-0 bg-[#0B192C] text-white px-4 py-3 flex items-center justify-between shadow-sm z-40">
      <div class="flex items-center gap-2.5">
        <img
          src="/toplinkers-logo.jpg"
          alt="TopLinkers"
          class="h-8 w-8 rounded-lg object-contain bg-white p-0.5"
        />
        <div>
          <span class="font-bold text-white tracking-tight text-sm">TopLinkers</span>
          <span class="block text-[10px] text-slate-400 leading-none">Admin Portal</span>
        </div>
      </div>
      <button
        @click="mobileSidebarOpen = !mobileSidebarOpen"
        class="p-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white"
        aria-label="Toggle menu"
      >
        <Bars3Icon v-if="!mobileSidebarOpen" class="w-5 h-5" />
        <XMarkIcon v-else class="w-5 h-5" />
      </button>
    </header>

    <!-- Sidebar Backdrop for Mobile -->
    <div
      v-if="mobileSidebarOpen"
      @click="mobileSidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
    ></div>

    <!-- Fixed-Height Executive Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 lg:static h-full w-64 flex-shrink-0 bg-[#0B192C] text-white flex flex-col z-50 transition-transform duration-300 ease-in-out border-r border-slate-800/80',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Top Brand Header with TopLinkers Logo -->
      <div class="flex-shrink-0 px-5 py-4 border-b border-white/10 flex items-center gap-3">
        <img
          src="/toplinkers-logo.jpg"
          alt="TopLinkers Logo"
          class="h-10 w-10 rounded-xl object-contain bg-white p-1 shadow-sm flex-shrink-0"
        />
        <div class="min-w-0">
          <h1 class="font-bold text-white tracking-tight text-base leading-tight truncate">TopLinkers</h1>
          <p class="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">Executive Admin</p>
        </div>
      </div>

      <!-- Clean Navigation Links -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto overscroll-contain" style="-webkit-overflow-scrolling: touch;">
        <router-link
          v-if="adminStore.canAccessModule('dashboard')"
          to="/admin/dashboard"
          @click="mobileSidebarOpen = false"
          class="flex items-center px-3.5 py-2.5 rounded-lg text-xs transition-colors duration-150"
          :class="$route.path === '/admin/dashboard' ? 'bg-white/10 text-white font-bold border-l-2 border-[#16B4E8]' : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'"
        >
          <span class="flex-1">Executive Dashboard</span>
        </router-link>

        <router-link
          v-if="adminStore.canAccessModule('leads')"
          to="/admin/leads"
          @click="mobileSidebarOpen = false"
          class="flex items-center px-3.5 py-2.5 rounded-lg text-xs transition-colors duration-150"
          :class="$route.path.startsWith('/admin/leads') ? 'bg-white/10 text-white font-bold border-l-2 border-[#16B4E8]' : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'"
        >
          <span class="flex-1">Leads &amp; Inquiries</span>
          <span
            v-if="adminStore.newLeadsCount > 0"
            class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-slate-200"
          >
            {{ adminStore.newLeadsCount }}
          </span>
        </router-link>

        <router-link
          v-if="adminStore.canAccessModule('rates')"
          to="/admin/rates"
          @click="mobileSidebarOpen = false"
          class="flex items-center px-3.5 py-2.5 rounded-lg text-xs transition-colors duration-150"
          :class="$route.path.startsWith('/admin/rates') ? 'bg-white/10 text-white font-bold border-l-2 border-[#16B4E8]' : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'"
        >
          <span class="flex-1">Live Market Rates</span>
        </router-link>

        <router-link
          v-if="adminStore.canAccessModule('properties')"
          to="/admin/properties"
          @click="mobileSidebarOpen = false"
          class="flex items-center px-3.5 py-2.5 rounded-lg text-xs transition-colors duration-150"
          :class="$route.path.startsWith('/admin/properties') ? 'bg-white/10 text-white font-bold border-l-2 border-[#16B4E8]' : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'"
        >
          <span class="flex-1">Properties Manager</span>
        </router-link>

        <router-link
          v-if="adminStore.canAccessModule('team')"
          to="/admin/team"
          @click="mobileSidebarOpen = false"
          class="flex items-center px-3.5 py-2.5 rounded-lg text-xs transition-colors duration-150"
          :class="$route.path.startsWith('/admin/team') ? 'bg-white/10 text-white font-bold border-l-2 border-[#16B4E8]' : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'"
        >
          <span class="flex-1">Owner &amp; Employees</span>
        </router-link>

        <router-link
          v-if="adminStore.canAccessModule('roles')"
          to="/admin/roles"
          @click="mobileSidebarOpen = false"
          class="flex items-center px-3.5 py-2.5 rounded-lg text-xs transition-colors duration-150"
          :class="$route.path.startsWith('/admin/roles') || $route.path.startsWith('/admin/users') ? 'bg-white/10 text-white font-bold border-l-2 border-[#16B4E8]' : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'"
        >
          <span class="flex-1">Users &amp; Permissions</span>
        </router-link>

        <router-link
          v-if="adminStore.canAccessModule('reviews')"
          to="/admin/reviews"
          @click="mobileSidebarOpen = false"
          class="flex items-center px-3.5 py-2.5 rounded-lg text-xs transition-colors duration-150"
          :class="$route.path.startsWith('/admin/reviews') ? 'bg-white/10 text-white font-bold border-l-2 border-[#16B4E8]' : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'"
        >
          <span class="flex-1">Client Reviews</span>
        </router-link>

        <router-link
          v-if="adminStore.canAccessModule('blogs')"
          to="/admin/blogs"
          @click="mobileSidebarOpen = false"
          class="flex items-center px-3.5 py-2.5 rounded-lg text-xs transition-colors duration-150"
          :class="$route.path.startsWith('/admin/blogs') ? 'bg-white/10 text-white font-bold border-l-2 border-[#16B4E8]' : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'"
        >
          <span class="flex-1">Articles &amp; Blogs</span>
          <span
            v-if="adminStore.blogs.length > 0"
            class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-slate-200"
          >
            {{ adminStore.blogs.length }}
          </span>
        </router-link>
      </nav>

      <!-- Bottom Avatar Profile Trigger & Popover Logout Menu -->
      <div ref="profileMenuRef" class="flex-shrink-0 relative p-3 border-t border-white/10 bg-[#081322]">
        <!-- Dropdown Popover above Avatar -->
        <transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 translate-y-2 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-2 scale-95"
        >
          <div
            v-if="profileMenuOpen"
            class="absolute bottom-full left-3 right-3 mb-2 rounded-xl bg-[#10243B] border border-white/15 shadow-2xl overflow-hidden z-50"
          >
            <div class="px-3.5 py-2.5 border-b border-white/10">
              <p class="text-xs font-semibold text-white truncate">
                {{ adminStore.adminUser?.name || 'TopLinkers Admin' }}
              </p>
              <p class="text-[11px] text-slate-400 truncate">
                {{ adminStore.adminUser?.email || 'admin@toplinkers.com' }}
              </p>
            </div>
            <div class="p-1.5">
              <button
                type="button"
                @click="handleLogout"
                class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-500/20 transition-colors"
              >
                <ArrowRightOnRectangleIcon class="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </transition>

        <!-- Clickable Avatar Profile Row -->
        <button
          type="button"
          @click.stop="profileMenuOpen = !profileMenuOpen"
          class="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-left focus:outline-none"
          aria-haspopup="true"
          :aria-expanded="profileMenuOpen"
        >
          <div class="relative flex-shrink-0">
            <img
              v-if="adminStore.adminUser?.avatar"
              :src="adminStore.adminUser.avatar"
              alt="Admin Avatar"
              class="w-9 h-9 rounded-full object-cover border border-white/20"
            />
            <div
              v-else
              class="w-9 h-9 rounded-full bg-[#16B4E8]/20 border border-[#16B4E8]/40 flex items-center justify-center text-[#38BDF8]"
            >
              <UserIcon class="w-5 h-5" />
            </div>
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#081322]"></span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-white truncate">
              {{ adminStore.adminUser?.name || 'TopLinkers Admin' }}
            </p>
            <p class="text-[11px] text-slate-400 truncate">
              {{ adminStore.adminUser?.role || 'Super Admin' }}
            </p>
          </div>
          <ChevronUpDownIcon class="w-4 h-4 text-slate-400 flex-shrink-0" />
        </button>
      </div>
    </aside>

    <!-- Main Workspace Wrapper (Fixed Header + Scrollable Center Content) -->
    <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      <!-- Fixed Top Action Bar -->
      <header class="flex-shrink-0 bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-30">
        <div>
          <h2 class="text-lg font-bold text-[#0F2A44] tracking-tight">{{ currentTitle }}</h2>
          <p class="text-xs text-slate-500">Al Hameed Plaza, G-11 Markaz Islamabad</p>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto">
          <button
            v-if="adminStore.canAccessModule('leads')"
            @click="openAddLeadModal = true"
            class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>Add Walk-in Lead</span>
          </button>
        </div>
      </header>

      <!-- Scrollable Center Router View -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 overscroll-contain" style="-webkit-overflow-scrolling: touch;">
        <router-view />
      </main>
    </div>

    <!-- Modal: Add Walk-in / Phone Lead -->
    <div v-if="openAddLeadModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 class="text-lg font-bold text-[#0F2A44]">Log New Client Lead / Inquiry</h3>
            <p class="text-xs text-gray-500">Direct phone call or walk-in client inquiry</p>
          </div>
          <button @click="openAddLeadModal = false" class="text-gray-400 hover:text-gray-600 p-1">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="submitManualLead" class="space-y-4 pt-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Client Full Name *</label>
            <input 
              v-model="newLeadForm.name" 
              type="text" 
              required 
              placeholder="e.g. Malik Jahangir Awan" 
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">WhatsApp / Phone *</label>
              <input 
                v-model="newLeadForm.phone" 
                type="tel" 
                required 
                placeholder="0323-5963375" 
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Email (Optional)</label>
              <input 
                v-model="newLeadForm.email" 
                type="email" 
                placeholder="client@gmail.com" 
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Client City / Country</label>
              <input 
                v-model="newLeadForm.city" 
                type="text" 
                placeholder="Islamabad / Overseas UK" 
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Division *</label>
              <select 
                v-model="newLeadForm.division" 
                required
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20 bg-white"
              >
                <option value="Plots">Moqa Ka Plots</option>
                <option value="Installment Plots">Installment Files (Faisal Town / BWC)</option>
                <option value="Flats">PHA Luxury Apartments</option>
                <option value="Solar">Solar Power Energy</option>
                <option value="Construction">Construction Turnkey</option>
                <option value="Harsukh">Harsukh (Nathia Gali)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Specific Project / Category</label>
            <input 
              v-model="newLeadForm.project" 
              type="text" 
              placeholder="e.g. PECHS 10 Marla Moqa Plot / 20kW Solar" 
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Budget</label>
              <input 
                v-model="newLeadForm.budget" 
                type="text" 
                placeholder="PKR 85 Lac" 
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Priority</label>
              <select 
                v-model="newLeadForm.priority"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20 bg-white"
              >
                <option value="High">🔥 High Priority (Ready Cash)</option>
                <option value="Medium">⚡ Medium</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Discussion Notes / Inquiry Details</label>
            <textarea 
              v-model="newLeadForm.notes" 
              rows="3" 
              placeholder="Client visited head office. Requested site visit for Saturday..." 
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#16B4E8] focus:ring-2 focus:ring-[#16B4E8]/20"
            ></textarea>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button 
              type="button" 
              @click="openAddLeadModal = false" 
              class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-5 py-2 rounded-xl text-sm font-bold bg-[#16B4E8] text-white hover:bg-[#139ecb] shadow-md transition-all"
            >
              Save Lead to CRM
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Global Admin Action Toast Notification -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-3 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="adminStore.toast"
        :key="adminStore.toast.id"
        class="fixed bottom-5 right-5 z-[9999] max-w-sm w-auto min-w-[260px] rounded-2xl px-4 py-3 shadow-2xl border flex items-center gap-3"
        :class="adminStore.toast.type === 'error'
          ? 'bg-rose-950 text-white border-rose-700/60'
          : adminStore.toast.type === 'info'
            ? 'bg-[#0F2A44] text-white border-[#16B4E8]/40'
            : 'bg-[#0B192C] text-white border-emerald-500/40'"
      >
        <CheckCircleIcon
          v-if="adminStore.toast.type !== 'error'"
          class="w-5 h-5 text-emerald-400 flex-shrink-0"
        />
        <ExclamationCircleIcon
          v-else
          class="w-5 h-5 text-rose-400 flex-shrink-0"
        />
        <span class="text-xs font-semibold flex-1 leading-snug">{{ adminStore.toast.message }}</span>
        <button
          type="button"
          @click="adminStore.hideToast()"
          class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Dismiss notification"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </transition>

    <!-- Global Admin Delete Confirmation Modal -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="adminStore.confirmDialog"
        @click.self="adminStore.resolveConfirm(false)"
        class="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-slate-900/55 backdrop-blur-sm"
      >
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center flex-shrink-0">
              <ExclamationTriangleIcon class="w-5 h-5" />
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-base font-bold text-[#0F2A44]">{{ adminStore.confirmDialog.title }}</h3>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">{{ adminStore.confirmDialog.message }}</p>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              @click="adminStore.resolveConfirm(false)"
              class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="adminStore.resolveConfirm(true)"
              class="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors"
            >
              {{ adminStore.confirmDialog.confirmText || 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BuildingOffice2Icon,
  IdentificationIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowRightOnRectangleIcon,
  ChevronUpDownIcon,
  UserIcon,
  PlusIcon,
  Bars3Icon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const router = useRouter()
const route = useRoute()
const adminStore = useAdminStore()

const mobileSidebarOpen = ref(false)
const openAddLeadModal = ref(false)
const profileMenuOpen = ref(false)
const profileMenuRef = ref(null)

const handleOutsideClick = (e) => {
  if (profileMenuOpen.value && profileMenuRef.value && !profileMenuRef.value.contains(e.target)) {
    profileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

const newLeadForm = ref({
  name: '',
  phone: '',
  email: '',
  city: 'Islamabad',
  division: 'Plots',
  project: '',
  budget: '',
  priority: 'High',
  source: 'Head Office Walk-in / Call',
  notes: ''
})

const currentTitle = computed(() => {
  if (route.path.includes('/admin/dashboard')) return 'Executive Dashboard & Overview'
  if (route.path.includes('/admin/leads')) return 'Lead Generation & CRM Portal'
  if (route.path.includes('/admin/rates')) return 'Live Market Rates & Details Editor'
  if (route.path.includes('/admin/properties')) return 'Properties & Inventory Management'
  if (route.path.includes('/admin/team')) return 'CEOs, Agents & Engineers Manager'
  if (route.path.includes('/admin/roles')) return 'Roles & Permissions'
  if (route.path.includes('/admin/reviews')) return 'Client Reviews & Testimonials'
  if (route.path.includes('/admin/blogs')) return 'Blog Articles & Market Insights'
  return 'TopLinkers Executive Portal'
})

const submitManualLead = () => {
  adminStore.addLead({ ...newLeadForm.value })
  openAddLeadModal.value = false
  adminStore.showToast('Walk-in lead saved to CRM.')
  // Reset form
  newLeadForm.value = {
    name: '',
    phone: '',
    email: '',
    city: 'Islamabad',
    division: 'Plots',
    project: '',
    budget: '',
    priority: 'High',
    source: 'Head Office Walk-in / Call',
    notes: ''
  }
}

const handleLogout = () => {
  profileMenuOpen.value = false
  adminStore.logout()
  router.push('/admin/login')
}
</script>
