<template>
  <div class="relative -mt-10 sm:-mt-16 md:-mt-20 z-30 max-w-[1280px] mx-auto px-3 sm:px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Tabs on top: All, For Sale (active tab white, inactive navy) -->
      <div class="flex items-center space-x-1 sm:pl-2">
        <button
          type="button"
          :class="[
            'flex-1 sm:flex-initial text-center px-2.5 sm:px-6 py-2.5 sm:py-3 rounded-t-[6px] text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap',
            searchStatus === 'all'
              ? 'bg-white text-[#0F2A44] shadow-sm'
              : 'bg-[#0F2A44] text-white/80 hover:text-white'
          ]"
          @click="searchStatus = 'all'"
        >
          All Properties
        </button>
        <button
          type="button"
          :class="[
            'flex-1 sm:flex-initial text-center px-2.5 sm:px-6 py-2.5 sm:py-3 rounded-t-[6px] text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap',
            searchStatus === 'for-sale'
              ? 'bg-white text-[#0F2A44] shadow-sm'
              : 'bg-[#0F2A44] text-white/80 hover:text-white'
          ]"
          @click="searchStatus = 'for-sale'"
        >
          For Sale
        </button>
      </div>

      <!-- White Card with 4 Labeled Selects + Wide Cyan Search Button -->
      <div class="bg-white rounded-[6px] sm:rounded-tl-none p-4 sm:p-5 md:p-6 shadow-2xl border border-gray-100">
        <form @submit.prevent="submitSearch" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <!-- 1. Type -->
          <div>
            <label class="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1.5">
              Property Type
            </label>
            <div class="relative">
              <select
                v-model="searchType"
                class="w-full text-xs font-bold text-[#0F2A44] p-3 rounded-[4px] border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8] cursor-pointer appearance-none pr-8"
              >
                <option value="all">All Types</option>
                <option value="plot">Residential Plot</option>
                <option value="apartment">PHA & Luxury Flats</option>
                <option value="villa">Luxury Villa</option>
                <option value="commercial">Commercial Plaza/Shop</option>
                <option value="farmhouse">Farmhouse</option>
                <option value="penthouse">Penthouse</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                <ChevronDownIcon class="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <!-- 2. Where (City / Area) -->
          <div>
            <label class="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1.5">
              Where (Location)
            </label>
            <div class="relative">
              <select
                v-model="searchWhere"
                class="w-full text-xs font-bold text-[#0F2A44] p-3 rounded-[4px] border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8] cursor-pointer appearance-none pr-8"
              >
                <option value="all">All Islamabad & Rawalpindi</option>
                <option value="Gulberg">Gulberg Islamabad</option>
                <option value="Faisal">Faisal Town Phase II (FT-II)</option>
                <option value="TopCity">TopCity-1 & Residencia</option>
                <option value="PHA">PHA Flats (I-12 & I-16)</option>
                <option value="PECHS">PECHS Society</option>
                <option value="Blue">Blue World City</option>
                <option value="DHA">DHA Islamabad</option>
                <option value="Bahria">Bahria Town</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                <ChevronDownIcon class="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <!-- 3. Rooms -->
          <div>
            <label class="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1.5">
              Rooms / Beds
            </label>
            <div class="relative">
              <select
                v-model="searchRooms"
                class="w-full text-xs font-bold text-[#0F2A44] p-3 rounded-[4px] border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8] cursor-pointer appearance-none pr-8"
              >
                <option value="any">Any Bedrooms</option>
                <option value="1">1+ Bedroom</option>
                <option value="2">2+ Bedrooms (PHA Flat)</option>
                <option value="3">3+ Bedrooms (Family)</option>
                <option value="4">4+ Bedrooms (Luxury Villa)</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                <ChevronDownIcon class="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <!-- 4. Budget (PKR) -->
          <div>
            <label class="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1.5">
              Budget (Max PKR)
            </label>
            <div class="relative">
              <select
                v-model="searchBudget"
                class="w-full text-xs font-bold text-[#0F2A44] p-3 rounded-[4px] border border-gray-200 bg-white focus:outline-none focus:border-[#16B4E8] cursor-pointer appearance-none pr-8"
              >
                <option value="">Any Budget</option>
                <option value="3000000">Up to PKR 30 Lac (PECHS)</option>
                <option value="6000000">Up to PKR 60 Lac (PHA Flat)</option>
                <option value="10000000">Up to PKR 1 Crore</option>
                <option value="25000000">Up to PKR 2.5 Crore (TopCity)</option>
                <option value="50000000">Up to PKR 5 Crore (Villas)</option>
                <option value="100000000">PKR 10 Crore+ (Commercial)</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                <ChevronDownIcon class="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <!-- 5. Wide Cyan Search Button -->
          <div>
            <button
              type="submit"
              class="btn-arrow-slide w-full py-3.5 bg-[#16B4E8] hover:bg-[#119ecf] text-white text-xs font-black uppercase tracking-wider rounded-[4px] shadow transition-colors flex items-center justify-center group"
            >
              <span>Search Listings</span>
              <ArrowRightIcon class="arrow-icon w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronDownIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

const searchStatus = ref('all')
const searchType = ref('all')
const searchWhere = ref('all')
const searchRooms = ref('any')
const searchBudget = ref('')

const submitSearch = () => {
  const query = {}
  if (searchStatus.value !== 'all') query.status = searchStatus.value
  if (searchType.value !== 'all') query.type = searchType.value
  if (searchWhere.value !== 'all') query.city = searchWhere.value
  if (searchRooms.value !== 'any') query.beds = searchRooms.value
  if (searchBudget.value) query.maxPrice = searchBudget.value

  router.push({
    path: '/listings',
    query
  })
}
</script>
