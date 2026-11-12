<template>
  <div class="min-h-screen bg-[#0B192C] flex items-center justify-center p-4 relative font-sans">
    <div class="w-full max-w-md relative z-10">
      <!-- Brand Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-8 sm:p-10">
        <!-- Logo and Title -->
        <div class="text-center mb-8">
          <img
            src="/toplinkers-logo.jpg"
            alt="TopLinkers Logo"
            class="h-14 w-14 mx-auto rounded-xl object-contain bg-white p-1 border border-slate-200 mb-4"
          />
          <h1 class="text-xl font-bold text-[#0F2A44] tracking-tight">Executive Admin Portal</h1>
          <p class="text-xs text-slate-500 mt-1 font-medium">TopLinkers Real Estate, Construction &amp; Solar</p>
          <div class="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
            <span>Secure Enterprise Login</span>
          </div>
        </div>

        <!-- Error alert -->
        <div v-if="errorMessage" class="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Official Email</label>
            <input 
              v-model="email" 
              type="email" 
              required 
              placeholder="admin@toplinkers.com"
              class="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0F2A44] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
            <div class="relative">
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                required 
                placeholder="••••••••"
                class="w-full pl-3.5 pr-10 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#0F2A44] focus:bg-white transition-colors"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-xs font-medium"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full py-2.5 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>{{ loading ? 'Authenticating...' : 'Sign In to Portal' }}</span>
          </button>
        </form>

        <!-- Back to Website Link -->
        <div class="mt-6 text-center">
          <router-link to="/" class="text-xs text-gray-400 hover:text-[#16B4E8] transition-colors inline-flex items-center gap-1">
            <span>← Return to Public Website</span>
          </router-link>
        </div>
      </div>

      <!-- Trust Footer -->
      <p class="text-center text-xs text-slate-400 mt-6">
        Protected Executive System • 256-bit SSL Security • TopLinkers Pakistan
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'

const router = useRouter()
const adminStore = useAdminStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  
  const result = await adminStore.login(email.value, password.value)
  loading.value = false
  
  if (result.success) {
    const canDash = adminStore.canAccessModule('dashboard')
    if (canDash) {
      router.push('/admin/dashboard').catch(err => console.error('Router push error:', err))
    } else {
      const firstAllowed = adminStore.allowedModules[0]
      router.push(firstAllowed ? `/admin/${firstAllowed}` : '/admin/leads')
    }
  } else {
    errorMessage.value = result.message || 'Authentication failed. Please verify email and password.'
  }
}
</script>
