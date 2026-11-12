<template>
  <Modal v-model="ui.isAuthModalOpen" maxWidth="md">
    <div class="p-2">
      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-6">
        <button
          type="button"
          :class="[
            'flex-1 pb-3 text-sm font-semibold tracking-wide transition-colors relative',
            ui.authModalTab === 'login'
              ? 'text-[#0B3B66]'
              : 'text-gray-400 hover:text-gray-600'
          ]"
          @click="ui.authModalTab = 'login'"
        >
          Sign In
          <span
            v-if="ui.authModalTab === 'login'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00AEEF]"
          ></span>
        </button>
        <button
          type="button"
          :class="[
            'flex-1 pb-3 text-sm font-semibold tracking-wide transition-colors relative',
            ui.authModalTab === 'register'
              ? 'text-[#0B3B66]'
              : 'text-gray-400 hover:text-gray-600'
          ]"
          @click="ui.authModalTab = 'register'"
        >
          Create Account
          <span
            v-if="ui.authModalTab === 'register'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00AEEF]"
          ></span>
        </button>
      </div>

      <!-- Login Form -->
      <form v-if="ui.authModalTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Email Address</label>
          <input
            v-model="loginEmail"
            type="email"
            required
            placeholder="name@example.com"
            class="w-full text-sm p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
          />
        </div>
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="text-xs font-semibold uppercase text-gray-700">Password</label>
            <a href="#" class="text-xs text-[#00AEEF] hover:underline" @click.prevent="forgotPassword">Forgot password?</a>
          </div>
          <input
            v-model="loginPassword"
            type="password"
            required
            placeholder="Enter your password"
            class="w-full text-sm p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
          />
        </div>
        <div class="flex items-center">
          <input id="remember" type="checkbox" class="rounded border-gray-300 text-[#00AEEF] focus:ring-[#00AEEF]" />
          <label for="remember" class="ml-2 text-xs text-gray-600">Remember me on this browser</label>
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-3 bg-[#00AEEF] hover:bg-[#0098d3] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
        >
          {{ isSubmitting ? 'Signing in...' : 'Sign In To Account' }}
        </button>
      </form>

      <!-- Register Form -->
      <form v-else @submit.prevent="handleRegister" class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">First Name</label>
            <input
              v-model="regFirstName"
              type="text"
              required
              placeholder="Marcus"
              class="w-full text-sm p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Last Name</label>
            <input
              v-model="regLastName"
              type="text"
              required
              placeholder="Vance"
              class="w-full text-sm p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
            />
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Email Address</label>
          <input
            v-model="regEmail"
            type="email"
            required
            placeholder="name@example.com"
            class="w-full text-sm p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">I am registering as</label>
          <select
            v-model="regRole"
            class="w-full text-sm p-2.5 rounded border border-gray-200 bg-white focus:outline-none focus:border-[#00AEEF]"
          >
            <option value="buyer">Home Buyer / Investor</option>
            <option value="tenant">Tenant</option>
            <option value="agent">Licensed Real Estate Agent</option>
            <option value="landlord">Owner / Landlord</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Password</label>
          <input
            v-model="regPassword"
            type="password"
            required
            placeholder="At least 8 characters"
            class="w-full text-sm p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
          />
        </div>
        <div class="flex items-start">
          <input id="terms" type="checkbox" required class="mt-0.5 rounded border-gray-300 text-[#00AEEF] focus:ring-[#00AEEF]" />
          <label for="terms" class="ml-2 text-xs text-gray-600">
            I agree to TopLiker's Terms of Service and Privacy Policy.
          </label>
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-3 bg-[#F26B21] hover:bg-[#d95a14] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
        >
          {{ isSubmitting ? 'Creating account...' : 'Create TopLiker Account' }}
        </button>
      </form>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '../ui/Modal.vue'
import { useUiStore } from '../../stores/ui'

const ui = useUiStore()

const loginEmail = ref('')
const loginPassword = ref('')

const regFirstName = ref('')
const regLastName = ref('')
const regEmail = ref('')
const regRole = ref('buyer')
const regPassword = ref('')

const isSubmitting = ref(false)

const handleLogin = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    ui.closeAuthModal()
    ui.addToast({
      type: 'success',
      title: 'Welcome Back!',
      message: `Signed in as ${loginEmail.value || 'Client'}.`
    })
  }, 400)
}

const handleRegister = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    ui.closeAuthModal()
    ui.addToast({
      type: 'success',
      title: 'Account Created',
      message: `Welcome to TopLiker, ${regFirstName.value}! Your profile is ready.`
    })
  }, 400)
}

const forgotPassword = () => {
  ui.addToast({
    type: 'info',
    title: 'Password Reset',
    message: 'A password reset link has been dispatched to your email address.'
  })
}
</script>
