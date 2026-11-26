<template>
  <div class="space-y-6">
    <AdminPageHeader
      title="Account & System Settings"
      subtitle="Manage your administrator profile, password security, SEO defaults, and media configuration."
      live-url="/"
      live-label="View Website"
    />

    <!-- Settings Tabs -->
    <div class="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 w-full sm:w-fit overflow-x-auto shadow-2xs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        @click="activeTab = tab.key"
        class="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
        :class="activeTab === tab.key ? 'bg-[#0F2A44] text-white' : 'text-slate-600 hover:bg-slate-50'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- TAB 1: Profile & Security -->
    <div v-if="activeTab === 'profile'" class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Profile Summary Card -->
      <div class="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-xl bg-[#0F2A44] text-white font-bold text-base flex items-center justify-center flex-shrink-0">
            {{ initials }}
          </div>
          <div class="min-w-0">
            <h2 class="text-sm font-bold text-[#0F2A44] truncate">{{ adminStore.adminUser?.name || 'TopLinkers Admin' }}</h2>
            <p class="text-xs text-slate-500 truncate">{{ adminStore.adminUser?.email || 'admin@toplinkers.com' }}</p>
            <span class="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {{ adminStore.adminUser?.role || 'Super Admin' }}
            </span>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Session Status</span>
            <span class="font-semibold text-emerald-600">Authenticated</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Backend Sync</span>
            <span class="font-semibold" :class="adminStore.apiConnected ? 'text-emerald-600' : 'text-amber-600'">
              {{ adminStore.apiConnected ? 'Connected' : 'Local Fallback' }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Allowed Modules</span>
            <span class="font-semibold text-[#0F2A44]">{{ adminStore.allowedModules?.length || 'All' }}</span>
          </div>
        </div>
      </div>

      <!-- Profile & Password Update Form -->
      <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
        <h3 class="text-sm font-bold text-[#0F2A44]">Update Profile &amp; Password</h3>
        <p class="text-xs text-slate-500 mt-0.5 mb-4">
          Keep your account credentials secure. Leave the password fields blank if you only want to update your display name.
        </p>

        <form @submit.prevent="saveProfile" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Display Name *</label>
              <input
                v-model="profileForm.name"
                type="text"
                required
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0F2A44]"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Account Email</label>
              <input
                :value="adminStore.adminUser?.email || ''"
                type="email"
                disabled
                class="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-100">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
              <div class="relative">
                <input
                  v-model="profileForm.newPassword"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="•••••••• (min 6 characters)"
                  class="w-full pl-3 pr-12 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0F2A44]"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-500 hover:text-slate-800"
                >
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
              <input
                v-model="profileForm.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="Re-enter new password"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0F2A44]"
              />
            </div>
          </div>

          <div v-if="profileError" class="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {{ profileError }}
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button
              type="submit"
              :disabled="savingProfile"
              class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {{ savingProfile ? 'Saving...' : 'Save Account Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- TAB 2: Website & Campaigns -->
    <div v-if="activeTab === 'general'" class="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 class="text-sm font-bold text-[#0F2A44]">Website Modules &amp; Active Campaigns</h3>
          <p class="text-xs text-slate-500 mt-0.5">Live visibility status of front-end promotional strips and spotlight popups.</p>
        </div>
        <router-link
          to="/admin/dashboard"
          class="px-3.5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
        >
          Configure in Dashboard
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-[#0F2A44]">Top Offer Strip</span>
            <span
              class="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              :class="adminStore.promoStrip?.enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-200 text-slate-600'"
            >
              {{ adminStore.promoStrip?.enabled ? 'Active' : 'Hidden' }}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 line-clamp-2">{{ adminStore.promoStrip?.text || 'No announcement text configured.' }}</p>
        </div>

        <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-[#0F2A44]">Spotlight Popup</span>
            <span
              class="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              :class="adminStore.spotlightPopup?.enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-200 text-slate-600'"
            >
              {{ adminStore.spotlightPopup?.enabled ? 'Active' : 'Hidden' }}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 line-clamp-2">{{ adminStore.spotlightPopup?.tag || 'High-ROI Spotlight' }}</p>
        </div>

        <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-[#0F2A44]">Featured Building</span>
            <span
              class="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              :class="adminStore.customBuilding?.enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-200 text-slate-600'"
            >
              {{ adminStore.customBuilding?.enabled ? 'Active' : 'Hidden' }}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 line-clamp-2">{{ adminStore.customBuilding?.title || 'Featured Building Spotlight' }}</p>
        </div>
      </div>
    </div>

    <!-- TAB 3: SEO & Media -->
    <div v-if="activeTab === 'seo'" class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
        <div>
          <h3 class="text-sm font-bold text-[#0F2A44]">Services Page SEO Configuration</h3>
          <p class="text-xs text-slate-500 mt-0.5">Synced directly with the Services CMS database (`service_seo`).</p>
        </div>

        <form @submit.prevent="saveSeo" class="space-y-3.5">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Meta Title</label>
            <input
              v-model="seoForm.meta_title"
              type="text"
              placeholder="Services | TopLinkers Real Estate, Construction & Solar"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Meta Description</label>
            <textarea
              v-model="seoForm.meta_description"
              rows="3"
              placeholder="Concise search engine description..."
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Canonical URL</label>
              <input
                v-model="seoForm.canonical_url"
                type="text"
                placeholder="https://toplinkersgroup.com/services"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Robots Directive</label>
              <select
                v-model="seoForm.robots"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#0F2A44]"
              >
                <option value="index, follow">index, follow</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
          </div>

          <AdminMediaUpload v-model="seoForm.og_image" label="Social Share (OG) Image" />

          <div class="flex justify-end pt-2">
            <button
              type="submit"
              :disabled="savingSeo"
              class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {{ savingSeo ? 'Saving SEO...' : 'Save SEO Settings' }}
            </button>
          </div>
        </form>
      </div>

      <div class="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3 h-fit">
        <h3 class="text-sm font-bold text-[#0F2A44]">Media Upload Policy</h3>
        <ul class="space-y-2 text-xs text-slate-600">
          <li class="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span>Allowed Formats</span>
            <span class="font-semibold text-[#0F2A44]">JPG, PNG, WebP, GIF</span>
          </li>
          <li class="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span>Max File Size</span>
            <span class="font-semibold text-[#0F2A44]">5 MB</span>
          </li>
          <li class="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span>Storage Path</span>
            <span class="font-mono text-[11px] text-slate-500">/uploads/</span>
          </li>
          <li class="flex items-center justify-between py-1.5">
            <span>Security Check</span>
            <span class="font-semibold text-emerald-600">MIME + Header Verified</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/admin'
import { fetchAdminServicesDashboard, updatePageSeo } from '../../services/servicesCmsApi'
import AdminPageHeader from '../../components/admin/AdminPageHeader.vue'
import AdminMediaUpload from '../../components/admin/AdminMediaUpload.vue'

const adminStore = useAdminStore()
const activeTab = ref('profile')
const showPassword = ref(false)
const savingProfile = ref(false)
const profileError = ref('')
const savingSeo = ref(false)

const tabs = [
  { key: 'profile', label: 'Profile & Security' },
  { key: 'general', label: 'Website & Campaigns' },
  { key: 'seo', label: 'SEO & Media Policy' }
]

const profileForm = ref({
  name: adminStore.adminUser?.name || '',
  newPassword: '',
  confirmPassword: ''
})

const seoForm = ref({
  page_key: 'services',
  meta_title: '',
  meta_description: '',
  canonical_url: 'https://toplinkersgroup.com/services',
  og_image: '',
  robots: 'index, follow'
})

const initials = computed(() => {
  const n = (adminStore.adminUser?.name || 'TA').trim()
  return n.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || 'TA'
})

const saveProfile = async () => {
  profileError.value = ''
  if (profileForm.value.newPassword) {
    if (profileForm.value.newPassword.length < 6) {
      profileError.value = 'New password must be at least 6 characters long.'
      return
    }
    if (profileForm.value.newPassword !== profileForm.value.confirmPassword) {
      profileError.value = 'New password and confirmation do not match.'
      return
    }
  }

  savingProfile.value = true
  try {
    const currentEmail = (adminStore.adminUser?.email || '').toLowerCase()
    const matchedUser = (adminStore.users || []).find(u => (u.email || '').toLowerCase() === currentEmail)

    if (matchedUser && typeof adminStore.updateUser === 'function') {
      const payload = {
        ...matchedUser,
        name: profileForm.value.name.trim()
      }
      if (profileForm.value.newPassword) {
        payload.password = profileForm.value.newPassword
      }
      await adminStore.updateUser(matchedUser.id, payload)
    }

    if (adminStore.adminUser) {
      adminStore.adminUser.name = profileForm.value.name.trim()
      localStorage.setItem('toplinkers_admin_user', JSON.stringify(adminStore.adminUser))
    }

    profileForm.value.newPassword = ''
    profileForm.value.confirmPassword = ''
    adminStore.showToast('Account settings updated successfully.')
  } catch (err) {
    profileError.value = err?.message || 'Failed to update account settings.'
  } finally {
    savingProfile.value = false
  }
}

const saveSeo = async () => {
  savingSeo.value = true
  try {
    await updatePageSeo(seoForm.value)
    adminStore.showToast('SEO settings saved to database.')
  } catch (err) {
    adminStore.showToast(err?.message || 'Failed to save SEO settings.', 'error')
  } finally {
    savingSeo.value = false
  }
}

onMounted(async () => {
  try {
    const cms = await fetchAdminServicesDashboard()
    if (cms?.seo) {
      seoForm.value = { ...seoForm.value, ...cms.seo }
    }
  } catch {
    // Non-fatal if user lacks services permission
  }
})
</script>
