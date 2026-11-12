<template>
  <div class="bg-white rounded-2xl shadow-card border border-gray-100 p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 divide-y divide-gray-100">
    <!-- 1. Key Highlights Grid -->
    <div>
      <h3 class="text-base font-bold text-[#0F2A44] mb-4 sm:mb-5 flex items-center gap-2">
        <span class="w-2.5 h-2.5 bg-[#16B4E8] rounded-full"></span>
        Property Overview & Key Specs
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
        <!-- Property Type -->
        <div class="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-[#16B4E8]/10 text-[#16B4E8] flex items-center justify-center flex-shrink-0">
            <HomeModernIcon class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <span class="block text-[10px] text-gray-400 uppercase font-black tracking-wider">Type</span>
            <span class="text-sm font-bold text-[#16B4E8] truncate block">{{ property.typeName }}</span>
          </div>
        </div>

        <!-- Bedrooms -->
        <div v-if="property.beds > 0" class="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-[#0F2A44]/5 text-[#0F2A44] flex items-center justify-center flex-shrink-0">
            <BuildingOffice2Icon class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <span class="block text-[10px] text-gray-400 uppercase font-black tracking-wider">Bedrooms</span>
            <span class="text-sm font-bold text-[#0F2A44]">{{ property.beds }} Beds</span>
          </div>
        </div>

        <!-- Bathrooms -->
        <div v-if="property.baths > 0" class="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-[#0F2A44]/5 text-[#0F2A44] flex items-center justify-center flex-shrink-0">
            <SparklesIcon class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <span class="block text-[10px] text-gray-400 uppercase font-black tracking-wider">Bathrooms</span>
            <span class="text-sm font-bold text-[#0F2A44]">{{ property.baths }} Baths</span>
          </div>
        </div>

        <!-- Area / Size -->
        <div class="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-[#0F2A44]/5 text-[#0F2A44] flex items-center justify-center flex-shrink-0">
            <ArrowsPointingOutIcon class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <span class="block text-[10px] text-gray-400 uppercase font-black tracking-wider">Area / Dimension</span>
            <span class="text-sm font-bold text-[#0F2A44]">{{ property.sqft?.toLocaleString() }} Sq Ft</span>
          </div>
        </div>

        <!-- City / Sector -->
        <div class="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-[#0F2A44]/5 text-[#0F2A44] flex items-center justify-center flex-shrink-0">
            <MapPinIcon class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <span class="block text-[10px] text-gray-400 uppercase font-black tracking-wider">City / Zone</span>
            <span class="text-sm font-bold text-[#0F2A44] truncate block">{{ property.cityName || 'Islamabad' }}</span>
          </div>
        </div>

        <!-- Status -->
        <div class="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-[#0F2A44]/5 text-[#0F2A44] flex items-center justify-center flex-shrink-0">
            <TagIcon class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <span class="block text-[10px] text-gray-400 uppercase font-black tracking-wider">Listing Status</span>
            <span class="text-sm font-bold text-[#0F2A44]">{{ property.status === 'for-rent' ? 'For Rent' : 'For Sale' }}</span>
          </div>
        </div>

        <!-- Verified Title -->
        <div class="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheckIcon class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <span class="block text-[10px] text-gray-400 uppercase font-black tracking-wider">Registry Transfer</span>
            <span class="text-sm font-bold text-[#6CC24A]">100% Clear</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Detailed Description -->
    <div class="pt-6">
      <h3 class="text-base font-bold text-[#0F2A44] mb-3 flex items-center gap-2">
        <span class="w-2.5 h-2.5 bg-[#16B4E8] rounded-full"></span>
        Property Overview & Sector Description
      </h3>
      <p class="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal whitespace-pre-line">
        {{ property.description }}
      </p>
    </div>

    <!-- 3. Verified Features & Amenities -->
    <div v-if="property.features && property.features.length" class="pt-6">
      <h3 class="text-base font-bold text-[#0F2A44] mb-4 flex items-center gap-2">
        <span class="w-2.5 h-2.5 bg-[#16B4E8] rounded-full"></span>
        Verified Features & Amenities
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div
          v-for="feat in property.features"
          :key="feat"
          class="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100"
        >
          <CheckIcon class="w-4 h-4 text-[#16B4E8] flex-shrink-0" />
          <span class="font-medium">{{ feat }}</span>
        </div>
      </div>
    </div>

    <!-- 4. Location Address -->
    <div class="pt-6">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-base font-bold text-[#0F2A44] flex items-center gap-2">
          <span class="w-2.5 h-2.5 bg-[#16B4E8] rounded-full"></span>
          Location & Neighborhood
        </h3>
        <a
          :href="`https://maps.google.com/?q=${encodeURIComponent(property.address + ' ' + (property.cityName || 'Islamabad'))}`"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-bold text-[#16B4E8] hover:underline flex items-center gap-1"
        >
          <span>Open in Google Maps</span>
          <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
        </a>
      </div>
      <p class="text-xs text-gray-500 flex items-center gap-1.5">
        <MapPinIcon class="w-4 h-4 text-gray-400 flex-shrink-0" />
        <span>{{ property.address }}, {{ property.cityName || 'Islamabad' }}, Pakistan</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import {
  CheckIcon,
  ArrowTopRightOnSquareIcon,
  MapPinIcon,
  HomeModernIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  ArrowsPointingOutIcon,
  TagIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

defineProps({
  property: {
    type: Object,
    required: true
  }
})
</script>
