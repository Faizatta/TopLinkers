<template>
  <div
    :data-slug="property.slug"
    :class="[
      'group bg-white rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col w-full h-full cursor-pointer hover:-translate-y-1',
      layout === 'list' ? 'md:flex-row' : ''
    ]"
    @click="goToProperty"
    @mouseenter="$emit('hover-property', property.id)"
  >
    <!-- Card Media & Carousel Area -->
    <div
      :class="[
        'relative overflow-hidden bg-gray-900 select-none flex-shrink-0',
        layout === 'list' ? 'md:w-5/12 h-64 md:h-auto min-h-[240px]' : 'h-72'
      ]"
    >
      <!-- Carousel Images -->
      <div class="relative w-full h-full">
        <img
          :src="currentImage"
          :srcset="currentSrcset"
          :sizes="imageSizes"
          :alt="`${property.title} - ${property.address || property.city || 'Islamabad'}`"
          loading="lazy"
          decoding="async"
          width="400"
          height="288"
          class="w-full h-full object-cover card-hover-zoom"
        />

        <!-- Prev / Next Carousel Arrows (Appear on Hover) -->
        <div
          v-if="property.images && property.images.length > 1"
          class="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
        >
          <button
            type="button"
            class="pointer-events-auto w-7 h-7 rounded-full bg-black/60 hover:bg-[#16B4E8] text-white flex items-center justify-center transition-colors shadow"
            aria-label="Previous photo"
            @click.stop="prevImage"
          >
            <ChevronLeftIcon class="w-4 h-4" />
          </button>
          <button
            type="button"
            class="pointer-events-auto w-7 h-7 rounded-full bg-black/60 hover:bg-[#16B4E8] text-white flex items-center justify-center transition-colors shadow"
            aria-label="Next photo"
            @click.stop="nextImage"
          >
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>

        <!-- Top Badges Bar -->
        <div class="absolute top-3 inset-x-3 z-10 flex items-start justify-between gap-2 pointer-events-none">
          <!-- Left Badges: FEATURED, HOT OFFER & Limited Offer Tag -->
          <div class="flex flex-col gap-1.5 items-start max-w-[72%]">
            <div class="flex items-center gap-1.5 flex-wrap">
              <Badge v-if="property.featured" variant="featured" size="sm">FEATURED</Badge>
              <Badge v-if="property.hotOffer" variant="hot" size="sm">HOT OFFER</Badge>
            </div>

            <!-- Sleek Offer / Discount Tag (if active) -->
            <div
              v-if="hasActiveOffer"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md border border-amber-300/35 whitespace-nowrap"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <ClockIcon class="w-3 h-3 text-amber-100 flex-shrink-0" />
              <span>{{ displayOfferLabel }} &bull; {{ offerRemaining }}</span>
            </div>
          </div>

          <!-- Right Status Badge (FOR SALE / FOR RENT) -->
          <Badge
            :variant="property.status === 'for-rent' ? 'rent' : 'sale'"
            size="sm"
          >
            {{ property.status === 'for-rent' ? 'FOR RENT' : 'FOR SALE' }}
          </Badge>
        </div>

        <!-- Bottom of the image (on a dark gradient): Price + PKR/sqft -->
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-3.5 pt-9 flex items-end justify-between z-10">
          <div class="min-w-0 pr-2">
            <div class="flex items-baseline gap-2 flex-wrap">
              <span class="text-white font-extrabold text-base md:text-lg leading-tight tracking-tight">
                {{ displayPrice }}
              </span>
              <span
                v-if="hasActiveOffer && originalPriceFormatted"
                class="text-xs text-amber-200/80 line-through font-semibold"
                title="Regular Demand Rate"
              >
                {{ originalPriceFormatted }}
              </span>
            </div>
            <!-- Smaller line under it (PKR/sqft or /mo) -->
            <div class="text-[11px] text-gray-300 font-medium leading-none mt-1">
              {{ property.pricePerSqft }}
            </div>
          </div>

          <!-- View Details prompt on hover -->
          <router-link
            :to="`/property/${property.slug}`"
            class="flex-shrink-0 flex items-center text-xs font-bold text-white/90 group-hover:text-[#16B4E8] hover:text-[#16B4E8] transition-colors"
            @click.stop="goToProperty"
          >
            <span>View Details</span>
            <ArrowRightIcon class="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </router-link>
        </div>
      </div>
    </div>

    <!-- Card Body (Clicking anywhere navigates to property details) -->
    <div class="p-4 sm:p-5 flex flex-col justify-between flex-1">
      <div class="min-w-0">
        <!-- Title strictly 1 line for equal card height -->
        <router-link
          :to="`/property/${property.slug}`"
          class="text-[15px] font-bold text-[#0F2A44] group-hover:text-[#16B4E8] hover:text-[#16B4E8] transition-colors leading-snug truncate block"
          @click.stop="goToProperty"
        >
          {{ property.title }}
        </router-link>

        <!-- Full address strictly 1 line with map-pin in grey -->
        <p class="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5 min-w-0">
          <MapPinIcon class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span class="truncate flex-1 min-w-0">{{ property.address }}</span>
        </p>
      </div>

      <!-- Specs Row: Beds, Baths, Area in Sq Ft + Property Type in uppercase -->
      <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
        <div class="flex items-center gap-3">
          <div v-if="property.beds > 0" class="flex items-center gap-1" title="Bedrooms">
            <HomeModernIcon class="w-3.5 h-3.5 text-gray-400" />
            <span class="font-bold">{{ property.beds }}</span>
          </div>

          <div v-if="property.baths > 0" class="flex items-center gap-1" title="Bathrooms">
            <SparklesIcon class="w-3.5 h-3.5 text-gray-400" />
            <span class="font-bold">{{ property.baths }}</span>
          </div>

          <div class="flex items-center gap-1" title="Area in Square Feet / Marla">
            <ArrowsPointingOutIcon class="w-3.5 h-3.5 text-gray-400" />
            <span class="font-bold">{{ property.sqft?.toLocaleString() }} <span class="text-[10px] text-gray-400">SqFt</span></span>
          </div>
        </div>

        <!-- Property Type Badge -->
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <span class="text-[10px] font-extrabold uppercase tracking-wider text-[#16B4E8] bg-[#16B4E8]/10 px-2 py-0.5 rounded-full">
            {{ property.typeName }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  MapPinIcon,
  HomeModernIcon,
  SparklesIcon,
  ArrowsPointingOutIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'
import Badge from '../ui/Badge.vue'
import { isPropertyOfferActive, getOfferRemainingLabel, formatPkrAmount } from '../../utils/offer'
import { responsiveSrcset } from '../../utils/images'

const props = defineProps({
  property: {
    type: Object,
    required: true
  },
  layout: {
    type: String,
    default: 'grid' // 'grid' | 'list'
  }
})

defineEmits(['hover-property'])

const router = useRouter()
const activeImageIndex = ref(0)

const hasActiveOffer = computed(() => isPropertyOfferActive(props.property))
const offerRemaining = computed(() => getOfferRemainingLabel(props.property?.offerExpiresAt))
const displayOfferLabel = computed(() => {
  const raw = props.property?.offerLabel || 'SPECIAL OFFER'
  return raw.replace(/^[\u{1F300}-\u{1F9FF}\s]+/u, '').trim() || raw
})

const displayPrice = computed(() => {
  if (hasActiveOffer.value && props.property?.offerPrice) {
    return `PKR ${formatPkrAmount(props.property.offerPrice)}`
  }
  return props.property?.priceFormatted || (props.property?.price ? `PKR ${props.property.price.toLocaleString()}` : '')
})

const originalPriceFormatted = computed(() => {
  if (!hasActiveOffer.value || !props.property?.offerPrice) return null
  return props.property?.priceFormatted || (props.property?.price ? `PKR ${formatPkrAmount(props.property.price)}` : null)
})

// Cards render ~350-540px wide; offer right-sized versions of the same photo.
const currentSrcset = computed(() => responsiveSrcset(currentImage.value, [480, 800, 1200]))
const imageSizes = computed(() => props.layout === 'list'
  ? '(max-width: 767px) 92vw, 540px'
  : '(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 420px')

const currentImage = computed(() => {
  if (props.property.images && props.property.images.length > 0) {
    return props.property.images[activeImageIndex.value] || props.property.images[0]
  }
  return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
})

const prevImage = () => {
  if (!props.property.images?.length) return
  activeImageIndex.value = (activeImageIndex.value - 1 + props.property.images.length) % props.property.images.length
}

const nextImage = () => {
  if (!props.property.images?.length) return
  activeImageIndex.value = (activeImageIndex.value + 1) % props.property.images.length
}

const goToProperty = (e) => {
  if (e && e.target && e.target.closest('button')) {
    return
  }
  if (props.property && props.property.slug) {
    router.push(`/property/${props.property.slug}`)
  }
}
</script>