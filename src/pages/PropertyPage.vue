<template>
  <div class="property-detail-page pt-28 sm:pt-32 md:pt-36 pb-16 bg-[#F6F8FA] min-h-screen">
    <div v-if="loading" class="max-w-[1280px] mx-auto px-4 space-y-6">
      <Skeleton height="30px" width="300px" />
      <Skeleton height="50px" width="60%" />
      <Skeleton height="450px" width="100%" />
    </div>

    <div v-else-if="!property" class="max-w-[1280px] mx-auto px-4 py-20 text-center">
      <h2 class="text-2xl font-bold text-[#0F2A44] mb-2">Property Not Found</h2>
      <p class="text-sm text-gray-500 mb-6">The listing you are searching for may have been sold or transferred.</p>
      <router-link to="/listings" class="px-5 py-2.5 bg-[#16B4E8] text-white text-xs font-bold uppercase rounded">
        Browse Available Listings
      </router-link>
    </div>

    <div v-else class="max-w-[1280px] mx-auto px-4">
      <!-- Breadcrumb Navigation -->
      <div class="mb-4">
        <nav class="flex items-center text-xs text-gray-500 gap-2" aria-label="Breadcrumb">
          <router-link to="/" class="hover:text-[#16B4E8]">Home</router-link>
          <span>/</span>
          <router-link :to="`/listings?type=${property.type}`" class="hover:text-[#16B4E8]">
            {{ property.typeName }}
          </router-link>
          <span>/</span>
          <span class="text-[#0F2A44] font-bold truncate max-w-xs">{{ property.title }}</span>
        </nav>
      </div>

      <!-- Title, Address, Badges & Price in PKR -->
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
        <div>
          <!-- Badges -->
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <Badge v-if="property.featured" variant="featured">FEATURED</Badge>
            <Badge v-if="property.hotOffer" variant="hot">HOT OFFER</Badge>
            <span
              v-if="hasActiveOffer"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm border border-amber-300/35 whitespace-nowrap"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <ClockIcon class="w-3.5 h-3.5 text-amber-100 flex-shrink-0" />
              <span>{{ displayOfferLabel }} &bull; {{ offerRemaining }}</span>
            </span>
            <Badge :variant="property.status === 'for-rent' ? 'rent' : 'sale'">
              {{ property.status === 'for-rent' ? 'FOR RENT' : 'FOR SALE' }}
            </Badge>
            <span class="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">
              {{ property.typeName }}
            </span>
          </div>

          <h1 class="text-2xl md:text-3xl font-extrabold text-[#0F2A44] leading-tight">
            {{ property.title }}
          </h1>

          <p class="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <MapPinIcon class="w-4 h-4 text-[#16B4E8] flex-shrink-0" />
            <span>{{ property.address }}</span>
          </p>
        </div>

        <!-- Price in PKR on Right (Supports Active Offer vs Regular Price) -->
        <div class="text-left md:text-right">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            {{ hasActiveOffer ? 'Limited Offer Price' : 'Demand Price' }}
          </span>
          <div v-if="hasActiveOffer" class="flex items-baseline md:justify-end gap-2.5 flex-wrap">
            <span class="text-2xl md:text-3xl font-black text-amber-600 leading-tight">
              PKR {{ formatPkrAmount(property.offerPrice) }}
            </span>
            <span class="text-sm md:text-base font-bold text-gray-400 line-through">
              {{ property.priceFormatted || `PKR ${formatPkrAmount(property.price)}` }}
            </span>
          </div>
          <div v-else class="text-2xl md:text-3xl font-black text-[#16B4E8] leading-tight">
            {{ property.priceFormatted || `PKR ${property.price.toLocaleString()}` }}
          </div>
          <span class="text-xs font-medium text-gray-500 block mt-0.5">
            {{ hasActiveOffer ? `After offer: ${property.priceFormatted || `PKR ${formatPkrAmount(property.price)}`} • ${offerRemaining}` : property.pricePerSqft }}
          </span>
        </div>
      </div>

      <!-- Main Layout: 8 cols Left + 4 cols Sticky Advisory Desk Right -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left 8 Columns -->
        <div class="lg:col-span-8 space-y-6">
          <!-- 1. Media Gallery (Photos / Map) -->
          <PropertyGallery
            :images="property.images"
            :title="property.title"
            :address="property.address"
            :lat="property.lat || 33.6844"
            :lng="property.lng || 73.0479"
          />

          <!-- 2. Single Unified Property Details Card (Overview, Description, Specs & Features) -->
          <PropertySpecs :property="property" />

          <!-- Similar Properties (2 Cards) -->
          <div v-if="similarListings.length" class="pt-6 border-t border-gray-200">
            <h2 class="text-lg font-bold text-[#0F2A44] mb-4 flex items-center gap-2">
              <span class="w-2.5 h-2.5 bg-[#16B4E8] rounded-full"></span>
              Similar Properties in this Sector
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PropertyCard
                v-for="sim in similarListings"
                :key="sim.id"
                :property="sim"
              />
            </div>
          </div>
        </div>

        <!-- Right 4 Columns: Sticky TopLinkers Inquiry Card -->
        <div class="lg:col-span-4">
          <AgentContactCard
            :propertyTitle="property.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { MapPinIcon, ClockIcon } from '@heroicons/vue/24/outline'
import { api } from '../services/api'
import { isPropertyOfferActive, getOfferRemainingLabel, formatPkrAmount } from '../utils/offer'
import { scrollTo } from '../services/lenis'
import Badge from '../components/ui/Badge.vue'
import Skeleton from '../components/ui/Skeleton.vue'
import PropertyGallery from '../components/property/PropertyGallery.vue'
import PropertySpecs from '../components/property/PropertySpecs.vue'
import AgentContactCard from '../components/property/AgentContactCard.vue'
import PropertyCard from '../components/property/PropertyCard.vue'

const route = useRoute()

const property = ref(null)
const similarListings = ref([])
const loading = ref(true)

const hasActiveOffer = computed(() => isPropertyOfferActive(property.value))
const offerRemaining = computed(() => getOfferRemainingLabel(property.value?.offerExpiresAt))
const displayOfferLabel = computed(() => {
  const raw = property.value?.offerLabel || 'SPECIAL OFFER'
  return raw.replace(/^[\u{1F300}-\u{1F9FF}\s]+/u, '').trim() || raw
})

const updatePropertySEO = (prop) => {
  if (!prop || typeof document === 'undefined') return
  document.title = `${prop.title} | TopLinkers Real Estate Islamabad`

  const desc = prop.shortDescription || prop.description || `${prop.title} in ${prop.address || 'Islamabad'}. Available through Top Linkers Real Estate.`
  const img = prop.images?.[0] || 'https://toplinkers.com/toplinkers-logo.jpg'

  const setMeta = (name, val) => {
    let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
    if (el) el.setAttribute('content', val)
  }

  const canonicalUrl = `https://toplinkers.com/property/${encodeURIComponent(prop.slug)}`

  setMeta('description', desc)
  setMeta('og:title', `${prop.title} | TopLinkers`)
  setMeta('og:description', desc)
  setMeta('og:image', img)
  setMeta('og:url', canonicalUrl)
  setMeta('twitter:title', `${prop.title} | TopLinkers`)
  setMeta('twitter:description', desc)
  setMeta('twitter:image', img)

  let link = document.querySelector('link[rel="canonical"]')
  if (link) link.setAttribute('href', canonicalUrl)

  const existing = document.getElementById('seo-property-jsonld')
  if (existing) existing.remove()

  const script = document.createElement('script')
  script.id = 'seo-property-jsonld'
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': prop.type === 'apartment' ? 'Apartment' : prop.type === 'house' ? 'SingleFamilyResidence' : 'Product',
    'name': prop.title,
    'description': desc,
    'url': window.location.href,
    'image': prop.images || [img],
    'offers': {
      '@type': 'Offer',
      'price': prop.price,
      'priceCurrency': 'PKR',
      'availability': 'https://schema.org/InStock'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': prop.address || 'G-11 Markaz',
      'addressLocality': prop.city || 'Islamabad',
      'addressCountry': 'PK'
    }
  })
  document.head.appendChild(script)
}

const loadPropertyData = async (slug) => {
  loading.value = true
  try {
    const data = await api.getPropertyBySlug(slug)
    property.value = data
    if (data) {
      updatePropertySEO(data)
      // Fetch similar listings
      const all = await api.getProperties({ limit: 12 })
      similarListings.value = (all.data || all.properties || [])
        .filter(p => p.id !== data.id && (p.city === data.city || p.type === data.type))
        .slice(0, 2)
    }
  } catch (e) {
    console.error('Failed to load property details', e)
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      loadPropertyData(newSlug)
      scrollTo(0, { duration: 1.2 })
    }
  }
)

onMounted(() => {
  loadPropertyData(route.params.slug)
})

onUnmounted(() => {
  const existing = document.getElementById('seo-property-jsonld')
  if (existing) existing.remove()
})
</script>
