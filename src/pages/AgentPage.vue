<template>
  <div class="agent-page py-12">
    <div class="max-w-[1170px] mx-auto px-4">
      <!-- 1. DETAIL VIEW: Single Agent Profile -->
      <div v-if="currentAgent" class="space-y-10">
        <!-- Agent Header Card -->
        <div class="bg-white rounded-lg p-8 shadow-subtle border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div class="relative flex-shrink-0">
            <img
              :src="currentAgent.photo"
              :alt="currentAgent.name"
              class="w-36 h-36 rounded-full object-cover border-4 border-gray-50 shadow-md"
            />
            <span
              v-if="currentAgent.verified"
              class="absolute bottom-1 right-1 bg-[#F26B21] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow uppercase"
            >
              Verified
            </span>
          </div>

          <div class="flex-1 text-center md:text-left">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
              <div>
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900">{{ currentAgent.name }}</h1>
                <p class="text-sm font-semibold text-[#00AEEF]">{{ currentAgent.role }}</p>
                <p class="text-xs text-gray-400">{{ currentAgent.company }}</p>
              </div>

              <!-- Rating badge -->
              <div class="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded text-xs font-bold text-yellow-800 self-center md:self-start">
                <svg class="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>{{ currentAgent.rating }} / 5.0</span>
                <span class="text-gray-400 font-normal">({{ currentAgent.reviewCount }} reviews)</span>
              </div>
            </div>

            <p class="text-xs text-gray-600 leading-relaxed max-w-2xl mt-4 font-light">
              {{ currentAgent.bio }}
            </p>

            <!-- Contact quick links -->
            <div class="mt-6 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-4 text-xs">
              <a
                :href="`tel:${currentAgent.phone.replace(/[^0-9]/g, '')}`"
                class="flex items-center gap-1.5 text-gray-700 hover:text-[#00AEEF] font-semibold"
              >
                <svg class="w-4 h-4 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{{ currentAgent.phone }}</span>
              </a>

              <a
                :href="`mailto:${currentAgent.email}`"
                class="flex items-center gap-1.5 text-gray-700 hover:text-[#00AEEF] font-semibold"
              >
                <svg class="w-4 h-4 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{{ currentAgent.email }}</span>
              </a>

              <a
                :href="`https://wa.me/${currentAgent.whatsapp}`"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 px-3 py-1 bg-[#25D366] text-white font-bold rounded shadow-sm hover:bg-[#20ba59]"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        <!-- Agent's Listings Grid -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span class="w-2.5 h-2.5 bg-[#00AEEF] rounded-full"></span>
            Exclusive Listings by {{ currentAgent.name }} ({{ agentProperties.length }})
          </h2>

          <div v-if="agentProperties.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PropertyCard
              v-for="prop in agentProperties"
              :key="prop.id"
              :property="prop"
            />
          </div>
          <div v-else class="text-sm text-gray-500 bg-white p-8 rounded text-center">
            No active public listings currently assigned to this advisor.
          </div>
        </div>
      </div>

      <!-- 2. DIRECTORY VIEW: All Verified Agents -->
      <div v-else>
        <div class="text-center mb-12">
          <h1 class="section-title">TopLiker Verified Realtors & Brokers</h1>
          <p class="section-subtitle">
            Our advisors bring institutional knowledge, local mastery, and confidential concierge advisory to every transaction.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="agent in allAgents"
            :key="agent.id"
            class="bg-white rounded-lg p-6 shadow-subtle hover:shadow-lift transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group"
          >
            <div class="relative mb-5">
              <img
                :src="agent.photo"
                :alt="agent.name"
                class="w-28 h-28 rounded-full object-cover border-4 border-gray-50 shadow-md group-hover:border-cyan-100 transition-colors"
              />
              <span
                v-if="agent.verified"
                class="absolute bottom-1 right-1 bg-[#F26B21] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow uppercase"
              >
                Verified
              </span>
            </div>

            <h3 class="text-lg font-bold text-[#00AEEF] hover:text-[#0098d3] transition-colors mb-1">
              <router-link :to="`/agent/${agent.slug}`">
                {{ agent.name }}
              </router-link>
            </h3>

            <p class="text-xs font-semibold text-gray-700 mb-0.5">{{ agent.role }}</p>
            <p class="text-[11px] text-gray-400 mb-3">{{ agent.company }}</p>
            <p class="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-6 font-light">
              {{ agent.bio }}
            </p>

            <div class="mt-auto pt-4 border-t border-gray-100 w-full flex items-center justify-between">
              <span class="text-[11px] text-gray-400">{{ agent.listingsCount }} Listings</span>
              <router-link
                :to="`/agent/${agent.slug}`"
                class="text-xs font-bold text-[#0B3B66] hover:text-[#00AEEF] transition-colors flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View Profile</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../services/api'
import PropertyCard from '../components/property/PropertyCard.vue'

const route = useRoute()

const allAgents = ref([])
const currentAgent = ref(null)
const agentProperties = ref([])

const loadData = async () => {
  const slug = route.params.slug
  if (slug) {
    const found = await api.getAgentBySlug(slug)
    currentAgent.value = found
    if (found) {
      document.title = `${found.name} | TopLiker Real Estate Advisor`
      agentProperties.value = await api.getAgentProperties(found.id)
    }
  } else {
    document.title = 'TopLiker Realtors & Verified Agents'
    currentAgent.value = null
    allAgents.value = await api.getAgents()
  }
}

onMounted(loadData)
watch(() => route.params.slug, loadData)
</script>
