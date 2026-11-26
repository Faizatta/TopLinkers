<template>
  <div class="min-h-screen lg:h-screen w-full lg:overflow-hidden bg-[#F8FAFC] text-slate-800 flex flex-col lg:flex-row font-sans antialiased">
    <!-- Mobile Header -->
    <header class="lg:hidden sticky top-0 flex-shrink-0 bg-[#0B192C] text-white px-4 py-3 flex items-center justify-between shadow-sm z-40">
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
        type="button"
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
      class="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
    ></div>

    <!-- Responsive Collapsible SaaS Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 lg:static h-full flex-shrink-0 bg-[#0B192C] text-white flex flex-col z-50 transition-all duration-200 ease-in-out border-r border-slate-800/80',
        sidebarCollapsed ? 'lg:w-[74px] w-64' : 'w-64',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Top Brand Header -->
      <div class="flex-shrink-0 px-4 py-4 border-b border-white/10 flex items-center justify-between gap-2">
        <div class="flex items-center gap-3 min-w-0">
          <img
            src="/toplinkers-logo.jpg"
            alt="TopLinkers Logo"
            class="h-9 w-9 rounded-xl object-contain bg-white p-1 shadow-sm flex-shrink-0"
          />
          <div v-if="!sidebarCollapsed" class="min-w-0">
            <h1 class="font-bold text-white tracking-tight text-sm leading-tight truncate">TopLinkers</h1>
            <p class="text-[11px] text-slate-400 font-medium leading-tight mt-0.5 truncate">Executive Admin</p>
          </div>
        </div>
        <button
          type="button"
          @click="toggleCollapse"
          class="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
          :title="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          aria-label="Toggle sidebar width"
        >
          <ChevronDoubleLeftIcon v-if="!sidebarCollapsed" class="w-4 h-4" />
          <ChevronDoubleRightIcon v-else class="w-4 h-4" />
        </button>
      </div>

      <!-- Grouped Navigation Links -->
      <nav class="flex-1 px-2.5 py-3.5 space-y-4 overflow-y-auto overscroll-contain" style="-webkit-overflow-scrolling: touch;">
        <!-- Overview (Direct) -->
        <div v-if="adminStore.canAccessModule('dashboard')">
          <router-link
            to="/admin/dashboard"
            @click="mobileSidebarOpen = false"
            :title="sidebarCollapsed ? 'Executive Dashboard' : ''"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors duration-150"
            :class="[
              $route.path === '/admin/dashboard'
                ? 'bg-white/10 text-white font-bold border-l-2 border-[#16B4E8]'
                : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium',
              sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''
            ]"
          >
            <HomeIcon class="w-4 h-4 flex-shrink-0" :class="$route.path === '/admin/dashboard' ? 'text-[#16B4E8]' : 'text-slate-400'" />
            <span v-show="!sidebarCollapsed" class="flex-1 truncate">Executive Dashboard</span>
          </router-link>
        </div>

        <!-- Expandable Navigation Groups -->
        <div v-for="group in visibleNavGroups" :key="group.key" class="space-y-1">
          <!-- Group Header (hidden when collapsed) -->
          <button
            v-if="!sidebarCollapsed"
            type="button"
            @click="toggleGroup(group.key)"
            class="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>{{ group.label }}</span>
            <ChevronDownIcon
              class="w-3.5 h-3.5 transition-transform duration-150"
              :class="{ '-rotate-90': collapsedGroups[group.key] }"
            />
          </button>
          <div v-else class="border-t border-white/10 mx-2 my-1"></div>

          <!-- Group Items -->
          <div v-show="sidebarCollapsed || !collapsedGroups[group.key]" class="space-y-0.5">
            <router-link
              v-for="item in group.items"
              :key="item.to"
              :to="item.to"
              @click="mobileSidebarOpen = false"
              :title="sidebarCollapsed ? item.label : ''"
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors duration-150"
              :class="[
                isRouteActive(item)
                  ? 'bg-white/10 text-white font-bold border-l-2 border-[#16B4E8]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium',
                sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''
              ]"
            >
              <component
                :is="item.icon"
                class="w-4 h-4 flex-shrink-0"
                :class="isRouteActive(item) ? 'text-[#16B4E8]' : 'text-slate-400'"
              />
              <span v-show="!sidebarCollapsed" class="flex-1 truncate">{{ item.label }}</span>
              <span
                v-if="!sidebarCollapsed && item.badge && item.badge() > 0"
                class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#16B4E8]/20 text-cyan-200"
              >
                {{ item.badge() }}
              </span>
            </router-link>
          </div>
        </div>
      </nav>

      <!-- Bottom Avatar Profile Trigger & Popover Menu -->
      <div ref="profileMenuRef" class="flex-shrink-0 relative p-2.5 border-t border-white/10 bg-[#081322]">
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
            class="absolute bottom-full left-2.5 mb-2 w-56 rounded-xl bg-[#10243B] border border-white/15 shadow-2xl overflow-hidden z-50"
          >
            <div class="px-3.5 py-2.5 border-b border-white/10">
              <p class="text-xs font-semibold text-white truncate">
                {{ adminStore.adminUser?.name || 'TopLinkers Admin' }}
              </p>
              <p class="text-[11px] text-slate-400 truncate">
                {{ adminStore.adminUser?.email || 'admin@toplinkers.com' }}
              </p>
            </div>
            <div class="p-1.5 space-y-0.5">
              <router-link
                to="/admin/settings"
                @click="profileMenuOpen = false; mobileSidebarOpen = false"
                class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Cog6ToothIcon class="w-4 h-4 text-slate-400" />
                <span>Account &amp; Settings</span>
              </router-link>
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

        <button
          type="button"
          @click.stop="profileMenuOpen = !profileMenuOpen"
          class="w-full flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/5 transition-colors text-left focus:outline-none"
          :class="sidebarCollapsed ? 'lg:justify-center' : ''"
          aria-haspopup="true"
          :aria-expanded="profileMenuOpen"
        >
          <div class="relative flex-shrink-0">
            <img
              v-if="adminStore.adminUser?.avatar"
              :src="adminStore.adminUser.avatar"
              alt="Admin Avatar"
              class="w-8 h-8 rounded-full object-cover border border-white/20"
            />
            <div
              v-else
              class="w-8 h-8 rounded-full bg-[#16B4E8]/20 border border-[#16B4E8]/40 flex items-center justify-center text-[#38BDF8]"
            >
              <UserIcon class="w-4 h-4" />
            </div>
            <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#081322]"></span>
          </div>
          <div v-show="!sidebarCollapsed" class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-white truncate">
              {{ adminStore.adminUser?.name || 'TopLinkers Admin' }}
            </p>
            <p class="text-[10px] text-slate-400 truncate">
              {{ adminStore.adminUser?.role || 'Super Admin' }}
            </p>
          </div>
          <ChevronUpDownIcon v-show="!sidebarCollapsed" class="w-4 h-4 text-slate-400 flex-shrink-0" />
        </button>
      </div>
    </aside>

    <!-- Main Workspace Wrapper -->
    <div class="flex-1 flex flex-col min-w-0 lg:h-full lg:overflow-hidden">
      <!-- Top Action Bar with Breadcrumb -->
      <header class="flex-shrink-0 bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 z-30">
        <div class="min-w-0">
          <!-- Breadcrumb Navigation -->
          <nav class="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-0.5" aria-label="Breadcrumb">
            <router-link to="/admin/dashboard" class="hover:text-[#0F2A44] transition-colors">Admin</router-link>
            <span>/</span>
            <span v-if="currentBreadcrumb.group" class="text-slate-500">{{ currentBreadcrumb.group }}</span>
            <span v-if="currentBreadcrumb.group">/</span>
            <span class="text-[#0F2A44] font-semibold truncate">{{ currentBreadcrumb.page }}</span>
          </nav>
          <h2 class="text-base sm:text-lg font-bold text-[#0F2A44] tracking-tight truncate">{{ currentTitle }}</h2>
        </div>

        <div class="flex items-center gap-2.5 w-full sm:w-auto">
          <a
            href="/"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
          >
            <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5 text-slate-400" />
            <span class="hidden sm:inline">Live Site</span>
          </a>
          <button
            v-if="adminStore.canAccessModule('leads')"
            type="button"
            @click="openAddLeadModal = true"
            class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-2xs"
          >
            <PlusIcon class="w-3.5 h-3.5" />
            <span>Add Walk-in Lead</span>
          </button>
        </div>
      </header>

      <!-- Center Router View -->
      <main class="flex-1 lg:overflow-y-auto p-3.5 sm:p-6 lg:p-7 overscroll-contain" style="-webkit-overflow-scrolling: touch;">
        <router-view />
      </main>
    </div>

    <!-- Modal: Add Walk-in / Phone Lead -->
    <AdminModal
      v-model="openAddLeadModal"
      title="Log New Client Lead / Inquiry"
      subtitle="Direct phone call or walk-in client inquiry"
      size="md"
    >
      <form id="walkin-lead-form" @submit.prevent="submitManualLead" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Client Full Name *</label>
          <input
            v-model="newLeadForm.name"
            type="text"
            required
            placeholder="e.g. Malik Jahangir Awan"
            class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone *</label>
            <input
              v-model="newLeadForm.phone"
              type="tel"
              required
              placeholder="0334-9522157"
              class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Email (Optional)</label>
            <input
              v-model="newLeadForm.email"
              type="email"
              placeholder="client@gmail.com"
              class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Client City / Country</label>
            <input
              v-model="newLeadForm.city"
              type="text"
              placeholder="Islamabad / Overseas UK"
              class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Division *</label>
            <select
              v-model="newLeadForm.division"
              required
              class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44] bg-white"
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
          <label class="block text-xs font-semibold text-slate-700 mb-1">Specific Project / Category</label>
          <input
            v-model="newLeadForm.project"
            type="text"
            placeholder="e.g. PECHS 10 Marla Moqa Plot / 20kW Solar"
            class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Budget</label>
            <input
              v-model="newLeadForm.budget"
              type="text"
              placeholder="PKR 85 Lac"
              class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
            <select
              v-model="newLeadForm.priority"
              class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44] bg-white"
            >
              <option value="High">High Priority (Ready Cash)</option>
              <option value="Medium">Medium</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Discussion Notes / Inquiry Details</label>
          <textarea
            v-model="newLeadForm.notes"
            rows="3"
            placeholder="Client visited head office. Requested site visit for Saturday..."
            class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
          ></textarea>
        </div>
      </form>

      <template #footer>
        <button
          type="button"
          @click="openAddLeadModal = false"
          class="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200/70 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="walkin-lead-form"
          class="px-4 py-2 rounded-lg text-xs font-semibold bg-[#0F2A44] hover:bg-slate-800 text-white shadow-2xs transition-colors"
        >
          Save Lead to CRM
        </button>
      </template>
    </AdminModal>

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
        class="fixed bottom-5 right-5 z-[9999] max-w-sm w-auto min-w-[260px] rounded-xl px-4 py-3 shadow-2xl border flex items-center gap-3"
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
        class="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-slate-900/55 backdrop-blur-xs"
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
              class="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="adminStore.resolveConfirm(true)"
              class="px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-2xs transition-colors"
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
  NewspaperIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  UserIcon,
  PlusIcon,
  Bars3Icon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'
import AdminModal from '../../components/admin/AdminModal.vue'

const router = useRouter()
const route = useRoute()
const adminStore = useAdminStore()

const mobileSidebarOpen = ref(false)
const sidebarCollapsed = ref(localStorage.getItem('toplinkers_sidebar_collapsed') === '1')
const collapsedGroups = ref({})
const openAddLeadModal = ref(false)
const profileMenuOpen = ref(false)
const profileMenuRef = ref(null)

const toggleCollapse = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem('toplinkers_sidebar_collapsed', sidebarCollapsed.value ? '1' : '0')
}

const toggleGroup = (key) => {
  collapsedGroups.value[key] = !collapsedGroups.value[key]
}

const navGroups = [
  {
    key: 'crm',
    label: 'CRM & Sales',
    items: [
      {
        module: 'leads',
        to: '/admin/leads',
        match: ['/admin/leads'],
        label: 'Leads & Inquiries',
        icon: UsersIcon,
        badge: () => adminStore.newLeadsCount
      },
      {
        module: 'reviews',
        to: '/admin/reviews',
        match: ['/admin/reviews'],
        label: 'Client Reviews',
        icon: ChatBubbleBottomCenterTextIcon
      }
    ]
  },
  {
    key: 'catalog',
    label: 'Catalog & Content',
    items: [
      {
        module: 'services',
        to: '/admin/services',
        match: ['/admin/services'],
        label: 'Services CMS',
        icon: Squares2X2Icon
      },
      {
        module: 'properties',
        to: '/admin/properties',
        match: ['/admin/properties'],
        label: 'Properties Manager',
        icon: BuildingOffice2Icon
      },
      {
        module: 'rates',
        to: '/admin/rates',
        match: ['/admin/rates'],
        label: 'Live Market Rates',
        icon: CurrencyDollarIcon
      },
      {
        module: 'blogs',
        to: '/admin/blogs',
        match: ['/admin/blogs', '/admin/articles'],
        label: 'Articles & Blogs',
        icon: NewspaperIcon,
        badge: () => adminStore.blogs.length
      }
    ]
  },
  {
    key: 'system',
    label: 'Team & System',
    items: [
      {
        module: 'team',
        to: '/admin/team',
        match: ['/admin/team'],
        label: 'Owner & Employees',
        icon: IdentificationIcon
      },
      {
        module: 'roles',
        to: '/admin/roles',
        match: ['/admin/roles', '/admin/users'],
        label: 'Users & Permissions',
        icon: ShieldCheckIcon
      },
      {
        module: 'settings',
        to: '/admin/settings',
        match: ['/admin/settings'],
        label: 'Settings & Profile',
        icon: Cog6ToothIcon,
        alwaysAllow: true
      }
    ]
  }
]

const visibleNavGroups = computed(() =>
  navGroups
    .map(g => ({
      ...g,
      items: g.items.filter(item => item.alwaysAllow || adminStore.canAccessModule(item.module))
    }))
    .filter(g => g.items.length > 0)
)

const isRouteActive = (item) => {
  return (item.match || [item.to]).some(prefix => route.path.startsWith(prefix))
}

const handleOutsideClick = (e) => {
  if (profileMenuOpen.value && profileMenuRef.value && !profileMenuRef.value.contains(e.target)) {
    profileMenuOpen.value = false
  }
}

onMounted(async () => {
  document.addEventListener('click', handleOutsideClick)
  const valid = await adminStore.checkServerSession()
  if (!valid) {
    router.replace('/admin/login')
  }
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

const currentBreadcrumb = computed(() => {
  if (route.path.includes('/admin/dashboard')) return { group: '', page: 'Executive Dashboard' }
  if (route.path.includes('/admin/leads')) return { group: 'CRM & Sales', page: 'Leads & Inquiries' }
  if (route.path.includes('/admin/reviews')) return { group: 'CRM & Sales', page: 'Client Reviews' }
  if (route.path.includes('/admin/services')) return { group: 'Catalog & Content', page: 'Services CMS' }
  if (route.path.includes('/admin/properties')) return { group: 'Catalog & Content', page: 'Properties Manager' }
  if (route.path.includes('/admin/rates')) return { group: 'Catalog & Content', page: 'Live Market Rates' }
  if (route.path.includes('/admin/blogs')) return { group: 'Catalog & Content', page: 'Articles & Blogs' }
  if (route.path.includes('/admin/team')) return { group: 'Team & System', page: 'Owner & Employees' }
  if (route.path.includes('/admin/roles') || route.path.includes('/admin/users')) return { group: 'Team & System', page: 'Users & Permissions' }
  if (route.path.includes('/admin/settings')) return { group: 'Team & System', page: 'Settings & Profile' }
  return { group: '', page: 'Portal' }
})

const currentTitle = computed(() => {
  if (route.path.includes('/admin/dashboard')) return 'Executive Dashboard & Overview'
  if (route.path.includes('/admin/leads')) return 'Lead Generation & CRM Portal'
  if (route.path.includes('/admin/rates')) return 'Live Market Rates & Details Editor'
  if (route.path.includes('/admin/properties')) return 'Properties & Inventory Management'
  if (route.path.includes('/admin/team')) return 'CEOs, Agents & Engineers Manager'
  if (route.path.includes('/admin/roles') || route.path.includes('/admin/users')) return 'Users, Roles & Permissions'
  if (route.path.includes('/admin/reviews')) return 'Client Reviews & Testimonials'
  if (route.path.includes('/admin/blogs')) return 'Blog Articles & Market Insights'
  if (route.path.includes('/admin/services')) return 'Services & Page CMS'
  if (route.path.includes('/admin/settings')) return 'Account & System Settings'
  return 'TopLinkers Executive Portal'
})

const submitManualLead = () => {
  adminStore.addLead({ ...newLeadForm.value })
  openAddLeadModal.value = false
  adminStore.showToast('Walk-in lead saved to CRM.')
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
