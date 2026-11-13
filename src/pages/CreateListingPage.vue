<template>
  <div class="create-listing-page py-12">
    <div class="max-w-[1170px] mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-10">
        <h1 class="section-title">List Your Property on TopLinkers</h1>
        <p class="section-subtitle">
          Submit your plot, villa, apartment, or commercial property with TopLinkers for verified marketing and buyer matching.
        </p>
      </div>

      <!-- Multi-Step Progress Tracker Bar -->
      <div class="max-w-4xl mx-auto mb-10">
        <div class="flex items-center justify-between relative">
          <!-- Connector line -->
          <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
          <div
            class="absolute top-1/2 left-0 h-0.5 bg-[#00AEEF] -translate-y-1/2 z-0 transition-all duration-300"
            :style="{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }"
          ></div>

          <div
            v-for="(st, idx) in steps"
            :key="st.number"
            class="relative z-10 flex flex-col items-center group cursor-pointer"
            @click="goToStep(st.number)"
          >
            <div
              :class="[
                'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2',
                currentStep === st.number
                  ? 'bg-[#00AEEF] border-[#00AEEF] text-white shadow-md'
                  : currentStep > st.number
                  ? 'bg-[#0B3B66] border-[#0B3B66] text-white'
                  : 'bg-white border-gray-300 text-gray-500'
              ]"
            >
              <span v-if="currentStep > st.number">&check;</span>
              <span v-else>{{ st.number }}</span>
            </div>
            <span
              :class="[
                'text-[11px] font-semibold mt-2 whitespace-nowrap hidden sm:block',
                currentStep === st.number ? 'text-[#00AEEF]' : 'text-gray-500'
              ]"
            >
              {{ st.title }}
            </span>
          </div>
        </div>
      </div>

      <!-- Main Step Form Card -->
      <div class="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-subtle border border-gray-100">
        <form @submit.prevent="handleNext">
          <!-- STEP 1: Basic Info & Type -->
          <div v-show="currentStep === 1" class="space-y-5">
            <h2 class="text-base font-bold text-[#0B3B66] pb-2 border-b border-gray-100">
              Step 1: Property Identity & Categorization
            </h2>

            <div>
              <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Listing Title *</label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="e.g. Renovated Oceanfront Penthouse with Skyline Terrace"
                class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="create-listing-status" class="block text-xs font-semibold uppercase text-gray-700 mb-1">Listing Status *</label>
                <select
                  id="create-listing-status"
                  v-model="form.status"
                  required
                  class="w-full text-xs p-2.5 rounded border border-gray-200 bg-white focus:outline-none focus:border-[#00AEEF]"
                >
                  <option value="for-sale">For Sale</option>
                  <option value="for-rent">For Rent</option>
                </select>
              </div>

              <div>
                <label for="create-listing-type" class="block text-xs font-semibold uppercase text-gray-700 mb-1">Property Type *</label>
                <select
                  id="create-listing-type"
                  v-model="form.type"
                  required
                  class="w-full text-xs p-2.5 rounded border border-gray-200 bg-white focus:outline-none focus:border-[#00AEEF]"
                >
                  <option value="apartment">Apartment</option>
                  <option value="single-family-home">Single Family Home</option>
                  <option value="studio">Studio</option>
                  <option value="villa">Villa</option>
                  <option value="office">Office</option>
                  <option value="shop">Shop</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Description & Property Notes *</label>
              <textarea
                v-model="form.description"
                rows="4"
                required
                placeholder="Detailed architectural breakdown, views, high-end materials, concierge amenities, or special seller notes..."
                class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF] resize-none"
              ></textarea>
            </div>
          </div>

          <!-- STEP 2: Price & Terms -->
          <div v-show="currentStep === 2" class="space-y-5">
            <h2 class="text-base font-bold text-[#0B3B66] pb-2 border-b border-gray-100">
              Step 2: Pricing & Lease Conditions
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Listing Price ($ USD) *</label>
                <input
                  v-model.number="form.price"
                  type="number"
                  required
                  placeholder="e.g. 1500000"
                  class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Price Postfix</label>
                <input
                  v-model="form.pricePostfix"
                  type="text"
                  placeholder="e.g. /mo or leave blank for sale"
                  class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Security Deposit ($)</label>
                <input
                  v-model="form.securityDeposit"
                  type="number"
                  placeholder="e.g. 5000"
                  class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">HOA / Maintenance ($ / mo)</label>
                <input
                  v-model="form.hoaFee"
                  type="number"
                  placeholder="e.g. 650"
                  class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>
            </div>
          </div>

          <!-- STEP 3: Media Upload with Preview -->
          <div v-show="currentStep === 3" class="space-y-5">
            <h2 class="text-base font-bold text-[#0B3B66] pb-2 border-b border-gray-100">
              Step 3: High-Resolution Photos & Video Link
            </h2>

            <div>
              <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Add Image URL (Unsplash or CDN)</label>
              <div class="flex items-center gap-2">
                <input
                  v-model="newImageUrl"
                  type="url"
                  placeholder="e.g. https://images.unsplash.com/photo-example"
                  class="flex-1 text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
                <button
                  type="button"
                  class="px-4 py-2.5 bg-[#00AEEF] text-white text-xs font-bold rounded"
                  @click="addImage"
                >
                  Add Image
                </button>
              </div>
            </div>

            <!-- Upload drop area simulation -->
            <div class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <svg class="w-10 h-10 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-xs text-gray-600 font-medium">Drag & drop gallery images or use predefined demo photos</p>
              <div class="mt-3 flex justify-center gap-2">
                <button
                  type="button"
                  class="text-xs text-[#00AEEF] hover:underline"
                  @click="addSampleImages"
                >
                  Load 3 Sample High-Res Photos
                </button>
              </div>
            </div>

            <!-- Image Previews Grid -->
            <div>
              <div class="text-xs font-semibold uppercase text-gray-700 mb-2">Selected Photos ({{ form.images.length }})</div>
              <div class="grid grid-cols-3 gap-3">
                <div
                  v-for="(img, idx) in form.images"
                  :key="idx"
                  class="relative h-24 rounded overflow-hidden border border-gray-200 group"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                  <button
                    type="button"
                    class="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    @click="removeImage(idx)"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">YouTube Walkthrough URL</label>
              <input
                v-model="form.videoUrl"
                type="text"
                placeholder="https://www.youtube.com/embed/..."
                class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
              />
            </div>
          </div>

          <!-- STEP 4: Location -->
          <div v-show="currentStep === 4" class="space-y-5">
            <h2 class="text-base font-bold text-[#0B3B66] pb-2 border-b border-gray-100">
              Step 4: Location & Address
            </h2>

            <div>
              <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Street Address *</label>
              <input
                v-model="form.address"
                type="text"
                required
                placeholder="e.g. 1100 Brickell Bay Dr"
                class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="create-listing-city" class="block text-xs font-semibold uppercase text-gray-700 mb-1">City *</label>
                <select
                  id="create-listing-city"
                  v-model="form.city"
                  required
                  class="w-full text-xs p-2.5 rounded border border-gray-200 bg-white focus:outline-none focus:border-[#00AEEF]"
                >
                  <option value="miami">Miami, FL</option>
                  <option value="los-angeles">Los Angeles, CA</option>
                  <option value="chicago">Chicago, IL</option>
                  <option value="new-york">New York, NY</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">State / Province *</label>
                <input
                  v-model="form.state"
                  type="text"
                  required
                  placeholder="Florida"
                  class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">ZIP / Postal Code *</label>
                <input
                  v-model="form.zipCode"
                  type="text"
                  required
                  placeholder="33131"
                  class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>
            </div>
          </div>

          <!-- STEP 5: Details & Amenities -->
          <div v-show="currentStep === 5" class="space-y-5">
            <h2 class="text-base font-bold text-[#0B3B66] pb-2 border-b border-gray-100">
              Step 5: Architectural Specs & Features Checklist
            </h2>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Bedrooms</label>
                <input
                  v-model.number="form.beds"
                  type="number"
                  min="0"
                  placeholder="3"
                  class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Bathrooms</label>
                <input
                  v-model.number="form.baths"
                  type="number"
                  step="0.5"
                  min="1"
                  placeholder="3"
                  class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Area (Sq Ft) *</label>
                <input
                  v-model.number="form.sqft"
                  type="number"
                  required
                  placeholder="2450"
                  class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase text-gray-700 mb-1">Garage Spaces</label>
                <input
                  v-model.number="form.garages"
                  type="number"
                  min="0"
                  placeholder="2"
                  class="w-full text-xs p-2.5 rounded border border-gray-200 focus:outline-none focus:border-[#00AEEF]"
                />
              </div>
            </div>

            <!-- Features checklist -->
            <div>
              <label class="block text-xs font-semibold uppercase text-gray-700 mb-2">Included Amenities</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-gray-700">
                <label v-for="feat in availableFeatures" :key="feat" class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    :value="feat"
                    v-model="form.features"
                    class="rounded border-gray-300 text-[#00AEEF] focus:ring-[#00AEEF]"
                  />
                  <span>{{ feat }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- STEP 6: Review & Submit -->
          <div v-show="currentStep === 6" class="space-y-5">
            <h2 class="text-base font-bold text-[#0B3B66] pb-2 border-b border-gray-100">
              Step 6: Review Summary & Publish
            </h2>

            <div class="bg-gray-50 rounded-lg p-5 text-xs space-y-3">
              <div class="flex justify-between border-b border-gray-200 pb-2">
                <span class="text-gray-500">Title:</span>
                <span class="font-bold text-gray-900">{{ form.title }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-200 pb-2">
                <span class="text-gray-500">Status & Type:</span>
                <span class="font-bold text-gray-900">{{ form.status.toUpperCase() }} &bull; {{ form.type }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-200 pb-2">
                <span class="text-gray-500">Price:</span>
                <span class="font-bold text-[#00AEEF]">${{ form.price?.toLocaleString() }} {{ form.pricePostfix }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-200 pb-2">
                <span class="text-gray-500">Address:</span>
                <span class="font-bold text-gray-900">{{ form.address }}, {{ form.city }}</span>
              </div>
              <div class="flex justify-between border-b border-gray-200 pb-2">
                <span class="text-gray-500">Specs:</span>
                <span class="font-bold text-gray-900">{{ form.beds }} Beds &bull; {{ form.baths }} Baths &bull; {{ form.sqft }} Sq Ft</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Uploaded Photos:</span>
                <span class="font-bold text-gray-900">{{ form.images.length }} Photos</span>
              </div>
            </div>

            <div class="flex items-start gap-2 pt-2">
              <input
                id="listing-consent"
                type="checkbox"
                required
                v-model="agreement"
                class="mt-0.5 rounded border-gray-300 text-[#00AEEF] focus:ring-[#00AEEF]"
              />
              <label for="listing-consent" class="text-xs text-gray-600">
                I certify that I am the authorized owner or designated licensed agent for this property, and all represented specifications are accurate.
              </label>
            </div>
          </div>

          <!-- Bottom Step Navigation Buttons -->
          <div class="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
            <button
              v-if="currentStep > 1"
              type="button"
              class="px-5 py-2.5 border border-gray-300 text-gray-700 text-xs font-semibold rounded hover:bg-gray-50"
              @click="currentStep--"
            >
              &larr; Previous Step
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < 6"
              type="submit"
              class="px-6 py-2.5 bg-[#00AEEF] hover:bg-[#0098d3] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm"
            >
              Continue &rarr;
            </button>

            <button
              v-else
              type="button"
              :disabled="isSubmitting || !agreement"
              class="px-8 py-3 bg-[#F26B21] hover:bg-[#d95a14] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-md disabled:opacity-50"
              @click="submitFinalListing"
            >
              {{ isSubmitting ? 'Publishing Listing...' : 'Publish Listing Now' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../services/api'
import { useUiStore } from '../stores/ui'

const router = useRouter()
const ui = useUiStore()

const currentStep = ref(1)
const isSubmitting = ref(false)
const agreement = ref(true)
const newImageUrl = ref('')

const steps = [
  { number: 1, title: 'Basic Info' },
  { number: 2, title: 'Pricing' },
  { number: 3, title: 'Media' },
  { number: 4, title: 'Location' },
  { number: 5, title: 'Details' },
  { number: 6, title: 'Review' }
]

const availableFeatures = [
  'Air Conditioning',
  'Swimming Pool',
  'Central Heating',
  'Laundry Room',
  'Gym',
  'Alarm System',
  'Balcony',
  'Valet Parking',
  'WiFi',
  'High Ceilings',
  'Fireplace',
  'Wine Cellar'
]

const form = reactive({
  title: 'Waterfront Modern Villa with Pool',
  status: 'for-sale',
  type: 'villa',
  description: 'Spectacular contemporary residence featuring soaring ceilings, open-concept Italian chef kitchen, and private zero-edge pool overlooking lush tropical gardens.',
  price: 2450000,
  pricePostfix: '',
  securityDeposit: '',
  hoaFee: '',
  address: '450 Ocean Boulevard',
  city: 'miami',
  state: 'Florida',
  zipCode: '33139',
  beds: 4,
  baths: 4.5,
  sqft: 3800,
  garages: 2,
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  features: ['Air Conditioning', 'Swimming Pool', 'Central Heating', 'Gym', 'Balcony'],
  images: [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ]
})

onMounted(() => {
  document.title = 'List Your Property for Sale or Rent | TopLinkers Islamabad'
})

const goToStep = (step) => {
  if (step < currentStep.value) {
    currentStep.value = step
  }
}

const handleNext = () => {
  if (currentStep.value < 6) {
    currentStep.value++
  }
}

const addImage = () => {
  if (newImageUrl.value.trim()) {
    form.images.push(newImageUrl.value.trim())
    newImageUrl.value = ''
  }
}

const addSampleImages = () => {
  form.images.push(
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  )
}

const removeImage = (idx) => {
  form.images.splice(idx, 1)
}

const submitFinalListing = async () => {
  isSubmitting.value = true
  try {
    const res = await api.createListing(form)
    ui.addToast({
      type: 'success',
      title: 'Listing Published!',
      message: res.message
    })
    setTimeout(() => {
      router.push('/search')
    }, 600)
  } catch (err) {
    ui.addToast({
      type: 'error',
      title: 'Submission Failed',
      message: 'Could not submit listing.'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
