<template>
  <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-gray-100 space-y-5 select-none relative">
    <!-- 1. Header with Active Filters Count, Reset All, and optional Close Button -->
    <div class="flex items-center justify-between pb-3 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-[#16B4E8]/10 text-[#16B4E8] flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-[#0F2A44] leading-tight">Advanced Property Filters</h3>
          <span v-if="activeFilterCount > 0" class="text-[10px] text-[#16B4E8] font-bold">
            {{ activeFilterCount }} filter{{ activeFilterCount > 1 ? 's' : '' }} active
          </span>
          <span v-else class="text-[10px] text-gray-400">Refine by price, beds, and area</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          v-if="activeFilterCount > 0"
          type="button"
          class="text-xs font-bold text-[#E53935] hover:underline transition-colors"
          @click="resetAll"
        >
          Reset All
        </button>

        <button
          v-if="showClose"
          type="button"
          class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors text-base"
          title="Close filters"
          @click="$emit('close')"
        >
          &times;
        </button>
      </div>
    </div>

    <!-- 2. Status Segmented Tabs (All / For Sale / For Rent) -->
    <div>
      <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
        Purpose
      </label>
      <div class="grid grid-cols-2 bg-gray-100 p-1 rounded-xl gap-1">
        <button
          type="button"
          :class="[
            'py-2 text-xs font-bold rounded-lg transition-all text-center',
            filters.status === 'all'
              ? 'bg-white text-[#0F2A44] shadow-sm font-black'
              : 'text-gray-500 hover:text-[#0F2A44]'
          ]"
          @click="setStatus('all')"
        >
          All
        </button>
        <button
          type="button"
          :class="[
            'py-2 text-xs font-bold rounded-lg transition-all text-center',
            filters.status === 'for-sale'
              ? 'bg-white text-[#0F2A44] shadow-sm font-black'
              : 'text-gray-500 hover:text-[#0F2A44]'
          ]"
          @click="setStatus('for-sale')"
        >
          For Sale
        </button>
      </div>
    </div>

    <!-- 3. Keyword / Sector Search Input -->
    <div>
      <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
        Search Location or Sector
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input
          v-model="filters.keyword"
          type="text"
          placeholder="Sector I-12, Gulberg, TopCity, Nathia Gali..."
          class="w-full text-xs p-2.5 pl-9 pr-8 rounded-xl border border-gray-200 focus:outline-none focus:border-[#16B4E8] bg-gray-50/50 focus:bg-white transition-colors"
          @input="emitSearch"
        />
        <button
          v-if="filters.keyword"
          type="button"
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          @click="clearKeyword"
        >
          &times;
        </button>
      </div>
    </div>

    <!-- 4. Quick Property Type Chips (1-Tap Selection) -->
    <div>
      <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
        Property Type
      </label>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="t in typeOptions"
          :key="t.value"
          type="button"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5',
            filters.type === t.value
              ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-sm'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
          ]"
          @click="setType(t.value)"
        >
          <span>{{ t.icon }}</span>
          <span>{{ t.label }}</span>
        </button>
      </div>
    </div>

    <!-- 5. Popular Sectors & Locations (Quick 1-Tap Chips) -->
    <div>
      <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
        Top Sectors &amp; Societies
      </label>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="loc in popularLocations"
          :key="loc.value"
          type="button"
          :class="[
            'px-2.5 py-1 rounded-md text-[11px] font-bold transition-all border',
            filters.city === loc.value
              ? 'bg-[#16B4E8] text-white border-[#16B4E8] shadow-sm'
              : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
          ]"
          @click="setCity(loc.value)"
        >
          {{ loc.label }}
        </button>
      </div>
    </div>

    <!-- 6. Price Budget Presets (PKR) -->
    <div>
      <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
        Budget Range (PKR)
      </label>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        <button
          v-for="b in budgetPresets"
          :key="b.label"
          type="button"
          :class="[
            'px-2 py-2 rounded-lg text-[11px] font-bold transition-all border text-center',
            isBudgetSelected(b)
              ? 'bg-[#16B4E8] text-white border-[#16B4E8] shadow-sm'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
          ]"
          @click="applyBudgetPreset(b)"
        >
          {{ b.label }}
        </button>
      </div>

      <!-- Min/Max Dropdown Options -->
      <div class="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-gray-100">
        <div>
          <label class="block text-[10px] text-gray-400 font-bold mb-0.5">Min Price</label>
          <select
            v-model="filters.minPrice"
            class="w-full text-xs p-2 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#16B4E8]"
            @change="emitSearch"
          >
            <option value="">Any Min</option>
            <option value="2000000">PKR 20 Lac</option>
            <option value="5000000">PKR 50 Lac</option>
            <option value="10000000">PKR 1 Crore</option>
            <option value="20000000">PKR 2 Crore</option>
            <option value="50000000">PKR 5 Crore</option>
          </select>
        </div>
        <div>
          <label class="block text-[10px] text-gray-400 font-bold mb-0.5">Max Price</label>
          <select
            v-model="filters.maxPrice"
            class="w-full text-xs p-2 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-[#16B4E8]"
            @change="emitSearch"
          >
            <option value="">Any Max</option>
            <option value="5000000">PKR 50 Lac</option>
            <option value="10000000">PKR 1 Crore</option>
            <option value="25000000">PKR 2.5 Crore</option>
            <option value="50000000">PKR 5 Crore</option>
            <option value="150000000">PKR 15 Crore</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 7. Bedrooms Quick Pills -->
    <div>
      <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
        Bedrooms
      </label>
      <div class="grid grid-cols-5 bg-gray-100 p-1 rounded-xl gap-1">
        <button
          v-for="bed in ['any', '1', '2', '3', '4']"
          :key="bed"
          type="button"
          :class="[
            'py-1.5 text-xs font-bold rounded-lg transition-all text-center',
            filters.beds === bed
              ? 'bg-white text-[#0F2A44] shadow-sm font-black'
              : 'text-gray-500 hover:text-[#0F2A44]'
          ]"
          @click="setBeds(bed)"
        >
          {{ bed === 'any' ? 'Any' : `${bed}+` }}
        </button>
      </div>
    </div>

    <!-- 8. Land & Area Size Quick Filter (Marla / Kanal) -->
    <div>
      <label class="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
        Plot / Area Size
      </label>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="s in sizePresets"
          :key="s.label"
          type="button"
          :class="[
            'px-2.5 py-1 rounded-md text-[11px] font-bold transition-all border',
            isSizeSelected(s)
              ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-sm'
              : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
          ]"
          @click="applySizePreset(s)"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <!-- 9. Optional Features Dropdown Toggle -->
    <div class="pt-2 border-t border-gray-100">
      <button
        type="button"
        class="flex items-center justify-between w-full text-xs font-bold text-[#0F2A44] hover:text-[#16B4E8] py-1"
        @click="isFeaturesOpen = !isFeaturesOpen"
      >
        <span class="flex items-center gap-1.5">
          <span>Verified Utilities &amp; Features</span>
          <span v-if="filters.features && filters.features.length" class="text-[10px] text-[#16B4E8] font-bold">
            ({{ filters.features.length }})
          </span>
        </span>
        <svg :class="['w-3.5 h-3.5 transition-transform duration-200', isFeaturesOpen ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <div v-show="isFeaturesOpen" class="grid grid-cols-2 gap-2 pt-2.5 text-xs text-gray-600">
        <label v-for="feat in availableFeatures" :key="feat" class="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-gray-50">
          <input
            type="checkbox"
            :value="feat"
            v-model="filters.features"
            class="rounded border-gray-300 text-[#16B4E8] focus:ring-[#16B4E8]"
            @change="emitSearch"
          />
          <span class="text-[11px] text-gray-700">{{ feat }}</span>
        </label>
      </div>
    </div>

    <!-- 10. Sticky Confirmation Button (Instant View Results) -->
    <div class="pt-3 sticky bottom-0 bg-white/95 backdrop-blur-md pb-1 z-10 border-t border-gray-100 flex items-center gap-3">
      <button
        type="button"
        class="w-full py-3.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        @click="confirmAndClose"
      >
        <span>Confirm &amp; View Results</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  showClose: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['apply-search', 'reset-search', 'close'])

const isFeaturesOpen = ref(false)

const typeOptions = [
  { value: 'all', label: 'All Types', icon: '✦' },
  { value: 'plot', label: 'Plots', icon: '📐' },
  { value: 'apartment', label: 'Flats & Apartments', icon: '🏢' },
  { value: 'villa', label: 'Luxury Villas', icon: '🏰' },
  { value: 'commercial', label: 'Commercial', icon: '🏬' },
  { value: 'farmhouse', label: 'Farmhouses', icon: '🌳' }
]

const popularLocations = [
  { value: 'all', label: 'All Sectors' },
  { value: 'Gulberg', label: 'Gulberg Islamabad' },
  { value: 'TopCity', label: 'TopCity-1' },
  { value: 'PHA', label: 'PHA (I-12 / I-16)' },
  { value: 'PECHS', label: 'PECHS Society' },
  { value: 'Faisal', label: 'Faisal Town (FT-II)' },
  { value: 'Nathia', label: 'Nathia Gali' }
]

const budgetPresets = [
  { label: 'Any Budget', min: '', max: '' },
  { label: 'Under 50 Lac', min: '', max: 5000000 },
  { label: '50 Lac – 1.5 Cr', min: 5000000, max: 15000000 },
  { label: '1.5 Cr – 3 Cr', min: 15000000, max: 30000000 },
  { label: '3 Cr – 5 Cr', min: 30000000, max: 50000000 },
  { label: '5 Cr+', min: 50000000, max: '' }
]

const sizePresets = [
  { label: 'Any Size', min: '', max: '' },
  { label: '5 Marla (~1125 SqFt)', min: 800, max: 1350 },
  { label: '10 Marla (~2250 SqFt)', min: 1800, max: 2700 },
  { label: '1 Kanal (~4500 SqFt)', min: 4000, max: 5500 },
  { label: '2 Kanal+ (~9000 SqFt)', min: 8000, max: '' }
]

const availableFeatures = [
  '24/7 Security & CCTV',
  'Sui Gas Meter',
  'Underground Electricity',
  'Water Boring & Line',
  'High Speed Passenger Lifts',
  'Dedicated Car Parking',
  'Corner / Main Boulevard',
  'Park & Mosque Facing'
]

// Calculate active filter count
const activeFilterCount = computed(() => {
  let count = 0
  const f = props.filters
  if (f.keyword && f.keyword.trim()) count++
  if (f.status && f.status !== 'all') count++
  if (f.type && f.type !== 'all') count++
  if (f.city && f.city !== 'all') count++
  if (f.beds && f.beds !== 'any') count++
  if (f.minPrice || f.maxPrice) count++
  if (f.minArea || f.maxArea) count++
  if (f.features && f.features.length) count += f.features.length
  return count
})

const emitSearch = () => {
  emit('apply-search')
}

const confirmAndClose = () => {
  emit('apply-search')
  emit('close')
}

const setStatus = (status) => {
  props.filters.status = status
  emitSearch()
}

const setType = (type) => {
  props.filters.type = type
  emitSearch()
}

const setCity = (city) => {
  props.filters.city = city
  emitSearch()
}

const setBeds = (beds) => {
  props.filters.beds = beds
  emitSearch()
}

const clearKeyword = () => {
  props.filters.keyword = ''
  emitSearch()
}

const isBudgetSelected = (b) => {
  return props.filters.minPrice === b.min && props.filters.maxPrice === b.max
}

const applyBudgetPreset = (b) => {
  props.filters.minPrice = b.min
  props.filters.maxPrice = b.max
  emitSearch()
}

const isSizeSelected = (s) => {
  return props.filters.minArea === s.min && props.filters.maxArea === s.max
}

const applySizePreset = (s) => {
  props.filters.minArea = s.min
  props.filters.maxArea = s.max
  emitSearch()
}

const resetAll = () => {
  props.filters.keyword = ''
  props.filters.status = 'all'
  props.filters.type = 'all'
  props.filters.city = 'all'
  props.filters.beds = 'any'
  props.filters.minPrice = ''
  props.filters.maxPrice = ''
  props.filters.minArea = ''
  props.filters.maxArea = ''
  props.filters.features = []
  emit('reset-search')
}
</script>
