<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-[#0F2A44] tracking-tight">Properties &amp; Inventory Manager</h1>
        <p class="text-xs text-slate-500 mt-0.5">Manage public listings, cash/installment plot files, PHA flats, and photo galleries</p>
      </div>

      <button 
        @click="openCreateModal"
        class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
      >
        <span>Add New Property</span>
      </button>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3">
      <div class="flex-1 relative">
        <input 
          v-model="search" 
          type="text" 
          placeholder="Search by title, society, location or payment mode..." 
          class="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-[#16B4E8]"
        />
        <MagnifyingGlassIcon class="w-4 h-4 text-gray-400 absolute left-3 top-3" />
      </div>

      <div class="w-full sm:w-44">
        <select v-model="filterType" class="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#16B4E8]">
          <option value="All">All Property Types</option>
          <option value="plot">Plots & Files</option>
          <option value="apartment">Flats & Apartments</option>
          <option value="house">Houses & Villas</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      <div class="w-full sm:w-44">
        <select v-model="filterPayment" class="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#16B4E8]">
          <option value="All">All Payment Modes</option>
          <option value="cash">100% Cash / Ready</option>
          <option value="installments">Installment Plans</option>
          <option value="both">Cash & Installments</option>
        </select>
      </div>
    </div>

    <!-- Properties Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div 
        v-for="prop in filteredProperties" 
        :key="prop.id || prop.slug"
        class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
      >
        <!-- Property Image Preview -->
        <div class="relative h-44 bg-slate-100 overflow-hidden">
          <img 
            :src="prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'" 
            :alt="prop.title" 
            class="w-full h-full object-cover"
          />
          <div class="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
            <span v-if="prop.featured" class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#16B4E8] text-white shadow">FEATURED</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0F2A44] text-white shadow uppercase">{{ prop.typeName || prop.type }}</span>
          </div>

          <div class="absolute top-3 right-3 flex items-center gap-1">
            <span 
              v-if="prop.images && prop.images.length > 1"
              class="px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white backdrop-blur-sm inline-flex items-center gap-1"
            >
              <CameraIcon class="w-3 h-3" />
              <span>{{ prop.images.length }}</span>
            </span>
          </div>

          <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <span class="text-sm font-black bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
              PKR {{ formatPrice(prop.price) }}
            </span>
            <span 
              class="text-[10px] font-bold px-2 py-1 rounded-lg uppercase shadow"
              :class="getPaymentBadgeClass(prop)"
            >
              {{ getPaymentLabel(prop) }}
            </span>
          </div>
        </div>

        <!-- Property Card Body -->
        <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
          <!-- Active Sale Strip on Admin Card -->
          <div
            v-if="prop.offerEnabled && isPropertyOfferActive(prop)"
            class="p-2 rounded-xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-[#0F2A44]/15 border border-amber-300 flex items-center justify-between text-[11px]"
          >
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="px-1.5 py-0.5 rounded bg-amber-400 text-[#0F2A44] text-[9px] font-black uppercase tracking-wider shrink-0">
                {{ prop.offerLabel || 'SALE' }}
              </span>
              <div class="flex items-baseline gap-1 text-[11px] truncate">
                <span class="line-through text-slate-400 text-[10px]">PKR {{ formatPrice(prop.price) }}</span>
                <span class="font-black text-emerald-700">&rarr; PKR {{ formatPrice(prop.offerPrice) }}</span>
              </div>
            </div>
            <span class="text-[9.5px] font-mono text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
              ⏱️ {{ getOfferRemainingLabel(prop.offerExpiresAt) }}
            </span>
          </div>

          <div>
            <div v-if="prop.society || prop.city" class="text-[10px] font-bold uppercase tracking-wider text-[#16B4E8] mb-0.5">
              {{ prop.society || prop.city }}
            </div>
            <h3 class="font-bold text-[#0F2A44] text-sm line-clamp-1">{{ prop.title }}</h3>
            <p class="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <MapPinIcon class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span class="truncate">{{ prop.address || prop.location?.address || prop.location || 'Islamabad' }}</span>
            </p>
          </div>

          <div class="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
            <span v-if="(prop.beds || prop.bedrooms) > 0">{{ prop.beds || prop.bedrooms }} Beds</span>
            <span v-if="(prop.baths || prop.bathrooms) > 0">{{ prop.baths || prop.bathrooms }} Baths</span>
            <span>{{ prop.marla || prop.area || (prop.sqft ? prop.sqft + ' Sq Ft' : 'Standard Size') }}</span>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
            <router-link 
              :to="`/property/${prop.slug}`" 
              target="_blank"
              class="text-xs font-bold text-[#16B4E8] hover:underline flex items-center gap-1"
            >
              <span>Preview Live</span>
              <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
            </router-link>

            <div class="flex items-center gap-1.5">
              <button 
                @click="editProperty(prop)" 
                class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Edit
              </button>
              <button 
                @click="deleteProperty(prop.id || prop.slug)" 
                class="p-1 rounded-lg text-rose-500 hover:bg-rose-50"
                title="Delete property"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Add / Edit Property -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h3 class="text-lg font-extrabold text-[#0F2A44]">{{ isEditing ? 'Edit Property Details' : 'Add New Property' }}</h3>
            <p class="text-[11px] text-gray-500">Configure society, plot/flat type, cash vs. installment terms, and multi-photo gallery</p>
          </div>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100">✕</button>
        </div>

        <form @submit.prevent="saveProperty" class="space-y-4 pt-4">
          <!-- Title -->
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Property Title *</label>
            <input 
              v-model="propertyForm.title" 
              type="text" 
              required 
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#16B4E8]" 
              placeholder="e.g. TopCity-1 10 Marla Moqa Plot / PHA C-Type Flat" 
            />
          </div>

          <!-- Society & Main Type -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Society / Project *</label>
              <select 
                v-model="propertyForm.society" 
                @change="onSocietyChange"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#16B4E8]"
              >
                <option value="PECHS Islamabad">PECHS Islamabad</option>
                <option value="TopCity-1">TopCity-1</option>
                <option value="Airport Green Garden (AGG)">Airport Green Garden (AGG)</option>
                <option value="Top Residencia">Top Residencia</option>
                <option value="Faisal Town (FT-I & FT-II)">Faisal Town (FT-I & FT-II)</option>
                <option value="Blue World City">Blue World City</option>
                <option value="PHA Flats (I-12 / I-16)">PHA Flats (Sector I-12 / I-16)</option>
                <option value="Banu Hafeez Residences">Banu Hafeez Residences</option>
                <option value="Harsukh (Nathia Gali)">Harsukh (Nathia Gali)</option>
                <option value="Gulberg Greens">Gulberg Greens, Islamabad</option>
                <option value="DHA Islamabad">DHA Islamabad</option>
                <option value="Bahria Town">Bahria Town Islamabad/Rwp</option>
                <option value="Other">Other Sector / Custom Location</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Property Type *</label>
              <select 
                v-model="propertyForm.type" 
                @change="onTypeChange"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#16B4E8]"
              >
                <option value="plot">Plot / File</option>
                <option value="apartment">Flat / Apartment</option>
                <option value="house">House / Villa</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>

          <!-- Sub-Type Category & Purpose -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">
                {{ propertyForm.type === 'plot' ? 'Type of Plot *' : propertyForm.type === 'apartment' ? 'Flat / Unit Type *' : 'Category *' }}
              </label>
              <select 
                v-model="propertyForm.typeName" 
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#16B4E8]"
              >
                <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Price (PKR) *</label>
              <input 
                v-model="propertyForm.price" 
                type="number" 
                required 
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#16B4E8]" 
                placeholder="8500000" 
              />
            </div>
          </div>

          <!-- Payment Mode: Cash vs Installment -->
          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <label class="block text-xs font-bold text-[#0F2A44] uppercase">Payment Plan Mode (Cash or Installment) *</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                @click="propertyForm.paymentMode = 'cash'"
                class="py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5"
                :class="propertyForm.paymentMode === 'cash' ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
              >
                <CurrencyDollarIcon class="w-4 h-4" />
                <span>100% Cash / Ready</span>
              </button>

              <button
                type="button"
                @click="propertyForm.paymentMode = 'installments'"
                class="py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5"
                :class="propertyForm.paymentMode === 'installments' ? 'bg-[#16B4E8] text-white border-[#16B4E8] shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
              >
                <CalendarDaysIcon class="w-4 h-4" />
                <span>Easy Installments</span>
              </button>

              <button
                type="button"
                @click="propertyForm.paymentMode = 'both'"
                class="py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5"
                :class="propertyForm.paymentMode === 'both' ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'"
              >
                <SparklesIcon class="w-4 h-4" />
                <span>Cash &amp; Installments</span>
              </button>
            </div>

            <!-- Installment Details when Installments or Both is selected -->
            <div v-if="propertyForm.paymentMode !== 'cash'" class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label class="block text-[11px] font-bold text-gray-600 uppercase mb-1">Down Payment / Booking</label>
                <input 
                  v-model="propertyForm.downPayment" 
                  type="text" 
                  class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs" 
                  placeholder="e.g. 15% Booking / PKR 5.9 Lac" 
                />
              </div>
              <div>
                <label class="block text-[11px] font-bold text-gray-600 uppercase mb-1">Installment Schedule</label>
                <input 
                  v-model="propertyForm.installmentPlan" 
                  type="text" 
                  class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs" 
                  placeholder="e.g. 3-Year Monthly / 4.5-Yr Quarterly" 
                />
              </div>
            </div>
          </div>

          <!-- Location & Area -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Sector / Exact Address *</label>
              <input 
                v-model="propertyForm.location" 
                type="text" 
                required 
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#16B4E8]" 
                placeholder="e.g. Main Club Road Elevation, Nathia Gali" 
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Size / Area (Marla or Sq Ft) *</label>
              <input 
                v-model="propertyForm.area" 
                type="text" 
                required 
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#16B4E8]" 
                placeholder="e.g. 10 Marla or 850 Sq Ft" 
              />
            </div>
          </div>

          <!-- INTERACTIVE MAP PIN PICKER -->
          <div class="p-3.5 rounded-xl border border-gray-200 bg-slate-50/80 space-y-2.5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label class="block text-xs font-extrabold text-[#0F2A44] uppercase flex items-center gap-1.5">
                  <MapPinIcon class="w-4 h-4 text-[#16B4E8]" />
                  <span>Set Exact Map Pin Location</span>
                </label>
                <p class="text-[11px] text-gray-500">Click anywhere on the map or drag the blue pin to set exact GPS coordinates</p>
              </div>
              <span class="text-[10px] font-mono bg-white border border-gray-200 px-2 py-1 rounded-lg text-[#0F2A44] font-bold">
                {{ Number(propertyForm.lat).toFixed(4) }}, {{ Number(propertyForm.lng).toFixed(4) }}
              </span>
            </div>

            <!-- Search Location Input -->
            <div class="flex items-center gap-2">
              <input 
                v-model="mapSearchQuery" 
                type="text" 
                @keydown.enter.prevent="searchMapLocation"
                class="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs focus:outline-none focus:border-[#16B4E8]" 
                placeholder="Search map location (e.g. TopCity-1 Islamabad, G-11 Markaz, Nathia Gali)..." 
              />
              <button 
                type="button" 
                @click="searchMapLocation"
                :disabled="searchingMap"
                class="px-3.5 py-2 rounded-xl bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-bold transition-colors whitespace-nowrap"
              >
                {{ searchingMap ? 'Searching...' : 'Find on Map' }}
              </button>
            </div>

            <!-- Leaflet Map Container -->
            <div class="relative w-full h-52 rounded-xl overflow-hidden border border-gray-200 bg-slate-200 z-0">
              <div ref="pickerMapEl" class="w-full h-full"></div>
            </div>

            <!-- Manual Lat/Lng Coordinates Row -->
            <div class="grid grid-cols-2 gap-3 pt-0.5">
              <div>
                <label class="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">Latitude (Lat)</label>
                <input 
                  v-model.number="propertyForm.lat" 
                  @change="syncPinToCoords"
                  type="number" 
                  step="any" 
                  class="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-mono" 
                />
              </div>
              <div>
                <label class="block text-[10px] font-bold text-gray-500 uppercase mb-0.5">Longitude (Lng)</label>
                <input 
                  v-model.number="propertyForm.lng" 
                  @change="syncPinToCoords"
                  type="number" 
                  step="any" 
                  class="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-mono" 
                />
              </div>
            </div>
          </div>

          <!-- Bedrooms, Bathrooms, Listing Status -->
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Bedrooms</label>
              <input v-model.number="propertyForm.bedrooms" type="number" min="0" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs" placeholder="0" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Bathrooms</label>
              <input v-model.number="propertyForm.bathrooms" type="number" min="0" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs" placeholder="0" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Listing Status</label>
              <select v-model="propertyForm.purpose" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white">
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
            </div>
          </div>

          <!-- BROWSER MULTI-IMAGE UPLOADER + URL ADDER -->
          <div class="p-4 rounded-xl border-2 border-dashed border-cyan-200 bg-cyan-50/30 space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label class="block text-xs font-extrabold text-[#0F2A44] uppercase">
                  Property Gallery Photos ({{ propertyForm.images.length }} selected)
                </label>
                <p class="text-[11px] text-gray-500">Select multiple images directly from your computer/mobile browser or paste URLs</p>
              </div>

              <label class="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-bold transition-colors shadow-sm flex-shrink-0">
                <PhotoIcon class="w-4 h-4" />
                <span>Browse Multi-Images</span>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  class="hidden" 
                  @change="handleMultiImageUpload"
                />
              </label>
            </div>

            <!-- Processing Indicator -->
            <div v-if="uploadingImages" class="text-xs font-semibold text-[#16B4E8] flex items-center gap-2">
              <span class="animate-spin inline-block w-3.5 h-3.5 border-2 border-[#16B4E8] border-t-transparent rounded-full"></span>
              <span>Optimizing selected images...</span>
            </div>

            <!-- Selected Photos Grid -->
            <div v-if="propertyForm.images.length > 0" class="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              <div 
                v-for="(imgUrl, index) in propertyForm.images" 
                :key="index"
                class="relative group rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[4/3] shadow-xs"
              >
                <img :src="imgUrl" alt="Preview" class="w-full h-full object-cover" />

                <!-- Cover Badge -->
                <span 
                  v-if="index === 0" 
                  class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#16B4E8] text-white text-[9px] font-black uppercase shadow"
                >
                  Cover
                </span>

                <!-- Hover Actions -->
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                  <button
                    v-if="index !== 0"
                    type="button"
                    @click="setAsCover(index)"
                    class="px-2 py-1 rounded bg-white text-[#0F2A44] text-[10px] font-bold hover:bg-[#16B4E8] hover:text-white"
                    title="Make cover photo"
                  >
                    Cover
                  </button>
                  <button
                    type="button"
                    @click="removeImage(index)"
                    class="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center hover:bg-rose-700"
                    title="Remove photo"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <!-- Or Add URL manually -->
            <div class="flex items-center gap-2 pt-1">
              <input 
                v-model="extraImageUrl" 
                type="url" 
                class="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs focus:outline-none focus:border-[#16B4E8]" 
                placeholder="Or paste image URL (https://...) and click Add" 
              />
              <button 
                type="button" 
                @click="addImageUrl"
                class="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
              >
                + Add URL
              </button>
            </div>
          </div>

          <!-- Property Sale & Discount Deal Strip Section (Live on Card) -->
          <div class="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50/70 to-rose-50/40 p-4 space-y-3.5 shadow-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-200/80">
              <div>
                <h4 class="text-xs font-black text-[#0F2A44] uppercase tracking-wider flex items-center gap-1.5">
                  <span class="text-base">🏷️</span>
                  <span>Property Sale &amp; Discount Deal Strip (On Cards)</span>
                </h4>
                <p class="text-[11px] text-slate-500">Configure discount sale strip on cards for flats, plots &amp; villas. Shows previous rate, current rate, discount savings %, and timer.</p>
              </div>
              <label class="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0F2A44] bg-white px-3 py-1.5 rounded-xl border border-amber-300 shadow-xs">
                <input type="checkbox" v-model="propertyForm.offerEnabled" class="rounded text-[#16B4E8] w-4 h-4" />
                <span>{{ propertyForm.offerEnabled ? '✓ Sale Deal Active' : 'Enable Sale Deal' }}</span>
              </label>
            </div>

            <div v-if="propertyForm.offerEnabled" class="space-y-3 pt-1">
              <!-- Preset Badges -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-[11px] font-bold text-gray-700 uppercase">Sale Badge Headline</label>
                  <span class="text-[10px] text-slate-400">Click preset to apply</span>
                </div>
                <div class="flex flex-wrap gap-1.5 mb-2">
                  <button
                    v-for="preset in ['🔥 FLASH SALE', '🏷️ EXCLUSIVE DISCOUNT', '⏱️ LIMITED TIME DEAL', '🚨 PRICE DROP', '✨ INVESTOR SPECIAL']"
                    :key="preset"
                    type="button"
                    @click="propertyForm.offerLabel = preset"
                    :class="propertyForm.offerLabel === preset ? 'bg-[#0F2A44] text-white border-[#0F2A44]' : 'bg-white text-slate-700 border-gray-200 hover:bg-amber-100/60'"
                    class="px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors"
                  >
                    {{ preset }}
                  </button>
                </div>
                <input
                  v-model="propertyForm.offerLabel"
                  type="text"
                  placeholder="e.g. 🔥 FLASH SALE"
                  class="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-[#0F2A44]"
                />
              </div>

              <!-- Rates Comparison & Calculation -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white/80 rounded-xl border border-amber-200">
                <div>
                  <label class="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Previous Rate (Original Demand)</label>
                  <div class="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600">
                    <span class="line-through">PKR {{ formatPrice(propertyForm.price) }}</span>
                    <span class="text-[10px] text-slate-400 font-normal">Set above in Demand Price</span>
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">Current Rate (Discounted Sale Rate) *</label>
                  <input
                    v-model.number="propertyForm.offerPrice"
                    type="number"
                    min="0"
                    placeholder="e.g. 7800000"
                    class="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white text-xs font-black text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <!-- Savings Calculation Notification -->
                <div class="sm:col-span-2 pt-1">
                  <div
                    v-if="propertyForm.offerPrice > 0 && propertyForm.offerPrice < propertyForm.price"
                    class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center justify-between"
                  >
                    <span>✓ Client Saves: PKR {{ formatPrice(propertyForm.price - propertyForm.offerPrice) }} ({{ Math.round(((propertyForm.price - propertyForm.offerPrice) / propertyForm.price) * 1000) / 10 }}% Direct Discount)</span>
                    <span class="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-black uppercase">Active Savings</span>
                  </div>
                  <div
                    v-else-if="propertyForm.offerPrice >= propertyForm.price && propertyForm.offerPrice > 0"
                    class="text-[11px] font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200"
                  >
                    ⚠️ Current discounted rate should be lower than previous rate (PKR {{ formatPrice(propertyForm.price) }}) for a valid discount deal.
                  </div>
                </div>
              </div>

              <!-- Deal Expiration & Presets -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-[11px] font-bold text-gray-700 uppercase">Discount Deal Expiration Timer</label>
                  <div class="flex items-center gap-1 text-[10px]">
                    <span class="text-slate-400">Quick set:</span>
                    <button type="button" @click="setOfferPresetHours(24)" class="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-amber-200 font-bold text-slate-700 border border-slate-200">+24h</button>
                    <button type="button" @click="setOfferPresetDays(3)" class="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-amber-200 font-bold text-slate-700 border border-slate-200">+3d</button>
                    <button type="button" @click="setOfferPresetDays(7)" class="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-amber-200 font-bold text-slate-700 border border-slate-200">+7d</button>
                    <button type="button" @click="setOfferPresetDays(14)" class="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-amber-200 font-bold text-slate-700 border border-slate-200">+14d</button>
                  </div>
                </div>
                <input
                  v-model="propertyForm.offerExpiresAt"
                  type="datetime-local"
                  class="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-mono"
                />
              </div>

              <!-- LIVE STRIP PREVIEW -->
              <div class="pt-1">
                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Live Card Strip Preview (As Shown on Public Cards)</label>
                <div class="rounded-xl bg-gradient-to-r from-[#0F2A44] via-rose-950 to-amber-950 text-white p-2.5 border border-amber-500/40 shadow-xs flex flex-col gap-1.5">
                  <div class="flex items-center justify-between text-[11px]">
                    <div class="flex items-center gap-1.5">
                      <span class="px-1.5 py-0.5 rounded bg-amber-400 text-[#0F2A44] text-[9px] font-black uppercase tracking-wider">
                        {{ propertyForm.offerLabel || 'SPECIAL DEAL' }}
                      </span>
                      <span class="text-amber-300 font-bold text-[10px]">
                        Save PKR {{ formatPrice(Math.max(0, propertyForm.price - (propertyForm.offerPrice || 0))) }} ({{ propertyForm.offerPrice && propertyForm.offerPrice < propertyForm.price ? Math.round(((propertyForm.price - propertyForm.offerPrice) / propertyForm.price) * 100) : 0 }}% OFF)
                      </span>
                    </div>
                    <span class="text-[10px] font-mono text-amber-200 bg-black/40 px-2 py-0.5 rounded-full border border-amber-400/20">
                      ⏱️ {{ propertyForm.offerExpiresAt ? 'Active Countdown' : 'Limited Time' }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                    <div class="flex items-baseline gap-1.5">
                      <span class="text-[9px] text-slate-300 uppercase">Prev:</span>
                      <span class="text-slate-300 text-xs line-through font-semibold">PKR {{ formatPrice(propertyForm.price) }}</span>
                      <span class="text-amber-400 font-black text-xs sm:text-sm">&rarr; Now: PKR {{ formatPrice(propertyForm.offerPrice || 0) }}</span>
                    </div>
                    <span class="text-[10px] font-extrabold text-cyan-300 bg-white/10 px-2 py-0.5 rounded">Check Deal &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Description / Notes -->
          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Description & Property Notes</label>
            <textarea
              v-model="propertyForm.description"
              rows="3"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#16B4E8]"
              placeholder="Enter comprehensive property highlights, architectural notes, legal status, or custom seller description..."
            ></textarea>
          </div>

          <!-- Toggles -->
          <div class="flex flex-wrap items-center gap-5 pt-1">
            <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input type="checkbox" v-model="propertyForm.featured" class="rounded text-[#16B4E8]" />
              <span>Mark as Featured on Homepage Carousel</span>
            </label>

            <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input type="checkbox" v-model="propertyForm.hotOffer" class="rounded text-rose-500" />
              <span>Hot Offer Badge</span>
            </label>
          </div>

          <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" @click="showModal = false" class="px-4 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#16B4E8] hover:bg-[#139ecb] text-white shadow-md transition-all">Save Property & Sync Live</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  CameraIcon,
  MapPinIcon,
  TrashIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  SparklesIcon,
  PhotoIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'
import L from '../../utils/leaflet'
import propertiesData from '../../data/properties.json'
import { useAdminStore } from '../../stores/admin'
import { API_BASE_URL } from '../../services/api'
import { isPropertyOfferActive, getOfferRemainingLabel, calculateDiscount, formatPkrAmount } from '../../utils/offer'

const adminStore = useAdminStore()

const OVERRIDES_KEY = 'toplinkers_property_overrides'
const CUSTOM_KEY = 'toplinkers_custom_properties'
const DELETED_KEY = 'toplinkers_deleted_properties'

const search = ref('')
const filterType = ref('All')
const filterPayment = ref('All')
const showModal = ref(false)
const isEditing = ref(false)
const uploadingImages = ref(false)
const extraImageUrl = ref('')

// Map Picker State
const pickerMapEl = ref(null)
const mapSearchQuery = ref('')
const searchingMap = ref(false)
let pickerMap = null
let pickerMarker = null

const societyCoords = {
  'PECHS Islamabad': [33.5912, 72.8364],
  'TopCity-1': [33.5819, 72.8453],
  'Airport Green Garden (AGG)': [33.5754, 72.8511],
  'Top Residencia': [33.5882, 72.8289],
  'Faisal Town (FT-I & FT-II)': [33.5681, 72.8615],
  'Blue World City': [33.4312, 72.8914],
  'PHA Flats (I-12 / I-16)': [33.6215, 72.9718],
  'Banu Hafeez Residences': [33.6685, 72.9965],
  'Harsukh (Nathia Gali)': [34.0163, 73.3928],
  'Gulberg Greens': [33.5986, 73.1539],
  'DHA Islamabad': [33.5245, 73.0956],
  'Bahria Town': [33.5419, 73.1182],
  'Other': [33.6844, 73.0479]
}

// Load merged properties from propertiesData + overrides + custom - deleted
const loadMergedProperties = () => {
  const custom = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]')
  const overrides = JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}')
  const deleted = JSON.parse(localStorage.getItem(DELETED_KEY) || '[]')

  const baseMapped = propertiesData
    .filter(p => !deleted.includes(p.id) && !deleted.includes(p.slug))
    .map(p => (overrides[p.slug] ? { ...p, ...overrides[p.slug] } : p))

  return [...custom, ...baseMapped]
}

const allProperties = ref(loadMergedProperties())

const categoryMap = {
  plot: [
    'Moqa Ka Plot (Cash Possession)',
    'Installment Plot File',
    'Residential Plot',
    'Commercial Plot',
    'Corner / Main Boulevard Plot',
    'Farmhouse Plot'
  ],
  apartment: [
    'PHA C-Type (1,100 Sq Ft)',
    'PHA D-Type (870 Sq Ft)',
    'PHA B-Type (1,496 Sq Ft)',
    'PHA Executive Type',
    'Banu Hafeez Apartment',
    'Harsukh Hillside Suite',
    'Hillside Suites',
    'Luxury Apartment'
  ],
  house: [
    'Turnkey Designer Villa',
    'Grey Structure House',
    'Double-Story House',
    'Luxury Villa'
  ],
  commercial: [
    'Commercial Plaza',
    'Retail Shop',
    'Corporate Office Floor',
    'Commercial Plot'
  ]
}

const propertyForm = ref({
  id: '',
  slug: '',
  title: '',
  society: 'PECHS Islamabad',
  type: 'plot',
  typeName: 'Moqa Ka Plot (Cash Possession)',
  paymentMode: 'cash',
  downPayment: '',
  installmentPlan: '',
  price: 6500000,
  purpose: 'for-sale',
  location: '',
  lat: 33.5912,
  lng: 72.8364,
  area: '10 Marla',
  bedrooms: 0,
  bathrooms: 0,
  images: [],
  featured: true,
  hotOffer: false,
  description: ''
})

const availableCategories = computed(() => {
  const list = categoryMap[propertyForm.value.type] || categoryMap.plot
  // Keep current typeName if editing an existing custom label
  if (propertyForm.value.typeName && !list.includes(propertyForm.value.typeName)) {
    return [propertyForm.value.typeName, ...list]
  }
  return list
})

const onTypeChange = () => {
  const list = categoryMap[propertyForm.value.type] || categoryMap.plot
  propertyForm.value.typeName = list[0]
}

const onSocietyChange = () => {
  const coords = societyCoords[propertyForm.value.society]
  if (coords) {
    propertyForm.value.lat = coords[0]
    propertyForm.value.lng = coords[1]
    syncPinToCoords()
  }
}

const initPickerMap = () => {
  if (!pickerMapEl.value) return
  if (pickerMap) {
    pickerMap.remove()
    pickerMap = null
    pickerMarker = null
  }

  const lat = Number(propertyForm.value.lat) || 33.6844
  const lng = Number(propertyForm.value.lng) || 73.0479

  pickerMap = L.map(pickerMapEl.value, {
    scrollWheelZoom: true
  }).setView([lat, lng], 14)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(pickerMap)

  const pinIcon = L.divIcon({
    className: 'admin-picker-pin',
    html: `<div style="background-color: #16B4E8; border: 3px solid #0F2A44; width: 28px; height: 28px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 4px 10px rgba(0,0,0,0.4);"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28]
  })

  pickerMarker = L.marker([lat, lng], {
    icon: pinIcon,
    draggable: true
  }).addTo(pickerMap)

  // Dragging pin updates coordinates
  pickerMarker.on('dragend', () => {
    const pos = pickerMarker.getLatLng()
    propertyForm.value.lat = Number(pos.lat.toFixed(6))
    propertyForm.value.lng = Number(pos.lng.toFixed(6))
  })

  // Clicking map moves pin & updates coordinates
  pickerMap.on('click', (e) => {
    const { lat: newLat, lng: newLng } = e.latlng
    propertyForm.value.lat = Number(newLat.toFixed(6))
    propertyForm.value.lng = Number(newLng.toFixed(6))
    if (pickerMarker) {
      pickerMarker.setLatLng([newLat, newLng])
    }
  })
}

const syncPinToCoords = () => {
  const lat = Number(propertyForm.value.lat)
  const lng = Number(propertyForm.value.lng)
  if (!isNaN(lat) && !isNaN(lng) && pickerMap && pickerMarker) {
    pickerMarker.setLatLng([lat, lng])
    pickerMap.flyTo([lat, lng], 14, { duration: 0.6 })
  }
}

const searchMapLocation = async () => {
  const q = mapSearchQuery.value.trim()
  if (!q) return
  searchingMap.value = true
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ', Pakistan')}&limit=1`)
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
      const lat = Number(parseFloat(data[0].lat).toFixed(6))
      const lng = Number(parseFloat(data[0].lon).toFixed(6))
      propertyForm.value.lat = lat
      propertyForm.value.lng = lng
      syncPinToCoords()
    }
  } catch (e) {
    // Offline fallback
  } finally {
    searchingMap.value = false
  }
}

watch(showModal, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    setTimeout(() => {
      initPickerMap()
      if (pickerMap) pickerMap.invalidateSize()
    }, 80)
  } else if (pickerMap) {
    pickerMap.remove()
    pickerMap = null
    pickerMarker = null
  }
})

onUnmounted(() => {
  if (pickerMap) {
    pickerMap.remove()
    pickerMap = null
  }
})

const detectPaymentMode = (prop) => {
  if (prop.paymentMode) return prop.paymentMode
  const combined = `${prop.pricePerSqft || ''} ${prop.pricePostfix || ''} ${prop.title || ''}`.toLowerCase()
  if (combined.includes('installment') && combined.includes('cash')) return 'both'
  if (combined.includes('installment')) return 'installments'
  return 'cash'
}

const getPaymentLabel = (prop) => {
  const mode = detectPaymentMode(prop)
  if (mode === 'installments') return 'Installments'
  if (mode === 'both') return 'Cash & Installments'
  return '100% Cash'
}

const getPaymentBadgeClass = (prop) => {
  const mode = detectPaymentMode(prop)
  if (mode === 'installments') return 'bg-[#16B4E8] text-white'
  if (mode === 'both') return 'bg-[#0F2A44] text-white'
  return 'bg-emerald-600 text-white'
}

const filteredProperties = computed(() => {
  return allProperties.value.filter(p => {
    if (search.value) {
      const q = search.value.toLowerCase()
      const addr = p.address || (typeof p.location === 'string' ? p.location : p.location?.address) || ''
      const match = p.title?.toLowerCase().includes(q) ||
                    addr.toLowerCase().includes(q) ||
                    (p.society || p.city || '').toLowerCase().includes(q) ||
                    (p.typeName || '').toLowerCase().includes(q)
      if (!match) return false
    }
    if (filterType.value !== 'All' && p.type !== filterType.value) return false
    if (filterPayment.value !== 'All' && detectPaymentMode(p) !== filterPayment.value) return false
    return true
  })
})

const formatPrice = (price) => {
  if (!price) return 'Price on Request'
  const num = Number(price)
  if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Crore`
  if (num >= 100000) return `${(num / 100000).toFixed(1)} Lac`
  return num.toLocaleString()
}

// Resize & convert image file from browser to lightweight base64 JPEG
const compressImageFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_W = 1000
        let width = img.width
        let height = img.height
        if (width > MAX_W) {
          height = Math.round((height * MAX_W) / width)
          width = MAX_W
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.onerror = () => resolve(e.target.result)
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

const handleMultiImageUpload = async (event) => {
  const files = Array.from(event.target.files || [])
  if (!files.length) return
  uploadingImages.value = true
  try {
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue
      const dataUrl = await compressImageFile(file)
      propertyForm.value.images.push(dataUrl)
    }
  } finally {
    uploadingImages.value = false
    event.target.value = ''
  }
}

const addImageUrl = () => {
  const url = extraImageUrl.value.trim()
  if (url) {
    propertyForm.value.images.push(url)
    extraImageUrl.value = ''
  }
}

const setAsCover = (idx) => {
  const [selected] = propertyForm.value.images.splice(idx, 1)
  propertyForm.value.images.unshift(selected)
}

const removeImage = (idx) => {
  propertyForm.value.images.splice(idx, 1)
}

const setOfferPresetDays = (days) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const pad = n => String(n).padStart(2, '0')
  propertyForm.value.offerExpiresAt = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const setOfferPresetHours = (hours) => {
  const d = new Date()
  d.setHours(d.getHours() + hours)
  const pad = n => String(n).padStart(2, '0')
  propertyForm.value.offerExpiresAt = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const openCreateModal = () => {
  isEditing.value = false
  extraImageUrl.value = ''
  mapSearchQuery.value = ''
  propertyForm.value = {
    id: 'prop-' + Date.now(),
    slug: 'property-' + Date.now(),
    title: '',
    society: 'PECHS Islamabad',
    type: 'plot',
    typeName: 'Moqa Ka Plot (Cash Possession)',
    paymentMode: 'cash',
    downPayment: '',
    installmentPlan: '',
    price: 6500000,
    purpose: 'for-sale',
    location: 'Kashmir Highway, Islamabad',
    lat: 33.5912,
    lng: 72.8364,
    area: '10 Marla',
    bedrooms: 0,
    bathrooms: 0,
    images: [],
    featured: true,
    hotOffer: false,
    offerEnabled: false,
    offerLabel: 'LIMITED OFFER',
    offerPrice: 0,
    offerExpiresAt: '',
    description: ''
  }
  showModal.value = true
}

const editProperty = (prop) => {
  isEditing.value = true
  extraImageUrl.value = ''
  mapSearchQuery.value = ''
  const soc = prop.society || prop.city || prop.areaName || 'PECHS Islamabad'
  const fallbackCoords = societyCoords[soc] || [33.6844, 73.0479]
  propertyForm.value = {
    id: prop.id || prop.slug,
    slug: prop.slug,
    title: prop.title || '',
    society: soc,
    type: prop.type || 'plot',
    typeName: prop.typeName || (categoryMap[prop.type || 'plot']?.[0] || 'Moqa Ka Plot (Cash Possession)'),
    paymentMode: detectPaymentMode(prop),
    downPayment: prop.downPayment || prop.pricePostfix || '',
    installmentPlan: prop.installmentPlan || (detectPaymentMode(prop) !== 'cash' ? prop.pricePerSqft || '' : ''),
    price: prop.price || 0,
    purpose: prop.status || prop.purpose || 'for-sale',
    location: prop.address || (typeof prop.location === 'string' ? prop.location : prop.location?.address) || 'Islamabad',
    lat: Number(prop.lat) || fallbackCoords[0],
    lng: Number(prop.lng) || fallbackCoords[1],
    area: prop.marla || prop.area || (prop.sqft ? `${prop.sqft} Sq Ft` : '10 Marla'),
    bedrooms: prop.beds ?? prop.bedrooms ?? 0,
    bathrooms: prop.baths ?? prop.bathrooms ?? 0,
    images: Array.isArray(prop.images) && prop.images.length > 0 ? [...prop.images] : (prop.image ? [prop.image] : []),
    featured: Boolean(prop.featured),
    hotOffer: Boolean(prop.hotOffer),
    offerEnabled: Boolean(prop.offerEnabled),
    offerLabel: prop.offerLabel || 'LIMITED OFFER',
    offerPrice: Number(prop.offerPrice) || 0,
    offerExpiresAt: prop.offerExpiresAt || '',
    description: prop.description || ''
  }
  showModal.value = true
}

const saveProperty = () => {
  const finalImages = propertyForm.value.images.length > 0
    ? [...propertyForm.value.images]
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80']

  const parsedSqft = parseInt(String(propertyForm.value.area).replace(/[^0-9]/g, ''), 10) || 1250
  const formattedPrice = `PKR ${formatPrice(propertyForm.value.price)}`
  const paymentNote =
    propertyForm.value.paymentMode === 'installments'
      ? (propertyForm.value.installmentPlan || 'Easy Installment Plan')
      : propertyForm.value.paymentMode === 'both'
        ? (propertyForm.value.installmentPlan || 'Cash & Easy Installments')
        : '100% Cash / Ready Possession'

  const existingBase = propertiesData.find(d => d.slug === propertyForm.value.slug || d.id === propertyForm.value.id)

  const item = {
    ...(existingBase || {}),
    id: propertyForm.value.id,
    slug: propertyForm.value.slug || (propertyForm.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()),
    propertyId: existingBase?.propertyId || ('TL-' + Math.floor(100 + Math.random() * 900)),
    title: propertyForm.value.title,
    society: propertyForm.value.society,
    city: propertyForm.value.society,
    areaName: propertyForm.value.society,
    type: propertyForm.value.type,
    typeName: propertyForm.value.typeName,
    paymentMode: propertyForm.value.paymentMode,
    downPayment: propertyForm.value.downPayment,
    installmentPlan: propertyForm.value.installmentPlan,
    price: Number(propertyForm.value.price),
    priceFormatted: formattedPrice,
    pricePerSqft: paymentNote,
    pricePostfix: propertyForm.value.downPayment || '',
    status: propertyForm.value.purpose,
    purpose: propertyForm.value.purpose,
    address: propertyForm.value.location,
    location: propertyForm.value.location,
    lat: Number(propertyForm.value.lat) || 33.6844,
    lng: Number(propertyForm.value.lng) || 73.0479,
    area: propertyForm.value.area,
    marla: propertyForm.value.area,
    sqft: parsedSqft,
    beds: Number(propertyForm.value.bedrooms) || 0,
    baths: Number(propertyForm.value.bathrooms) || 0,
    bedrooms: Number(propertyForm.value.bedrooms) || 0,
    bathrooms: Number(propertyForm.value.bathrooms) || 0,
    images: finalImages,
    featured: Boolean(propertyForm.value.featured),
    hotOffer: Boolean(propertyForm.value.hotOffer),
    offerEnabled: Boolean(propertyForm.value.offerEnabled),
    offerLabel: propertyForm.value.offerEnabled ? (propertyForm.value.offerLabel || 'LIMITED OFFER') : '',
    offerPrice: propertyForm.value.offerEnabled ? Number(propertyForm.value.offerPrice || 0) : 0,
    offerExpiresAt: propertyForm.value.offerEnabled ? (propertyForm.value.offerExpiresAt || '') : '',
    description: propertyForm.value.description || existingBase?.description || `${propertyForm.value.title} in ${propertyForm.value.society}. Available on ${paymentNote}. Area: ${propertyForm.value.area}.`
  }

  // Save in local state
  const existingIndex = allProperties.value.findIndex(p => (p.id && p.id === item.id) || p.slug === item.slug)
  if (existingIndex !== -1) {
    allProperties.value[existingIndex] = item
  } else {
    allProperties.value.unshift(item)
  }

  // Persist overrides for base properties OR custom list for newly created properties
  if (existingBase) {
    const overrides = JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}')
    overrides[existingBase.slug] = item
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides))
  } else {
    const custom = allProperties.value.filter(p => !propertiesData.some(d => d.slug === p.slug))
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom))
  }

  // Also sync to Laravel backend API silently
  try {
    fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        slug: item.slug,
        title: item.title,
        price: item.price,
        type: item.type,
        purpose: item.purpose,
        location: item.address,
        area: item.area,
        bedrooms: item.beds,
        bathrooms: item.baths,
        image: item.images[0]?.startsWith('http') ? item.images[0] : null,
        featured: item.featured,
        offer_enabled: item.offerEnabled,
        offer_label: item.offerLabel,
        offer_price: item.offerPrice,
        offer_expires_at: item.offerExpiresAt,
        description: item.description
      })
    }).catch(() => {})
  } catch (e) {}

  showModal.value = false
  adminStore.showToast(isEditing.value ? `Updated "${item.title}" successfully.` : `Published "${item.title}" to listings.`)
}

const deleteProperty = async (idOrSlug) => {
  const ok = await adminStore.requestConfirm({
    title: 'Delete Property Listing?',
    message: 'Are you sure you want to delete this property from listings? This cannot be undone.',
    confirmText: 'Delete Property'
  })
  if (ok) {
    allProperties.value = allProperties.value.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug)

    const isBase = propertiesData.some(d => d.id === idOrSlug || d.slug === idOrSlug)
    if (isBase) {
      const deleted = JSON.parse(localStorage.getItem(DELETED_KEY) || '[]')
      if (!deleted.includes(idOrSlug)) deleted.push(idOrSlug)
      localStorage.setItem(DELETED_KEY, JSON.stringify(deleted))
    } else {
      const custom = allProperties.value.filter(p => !propertiesData.some(d => d.slug === p.slug))
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom))
    }
    adminStore.showToast('Property removed from listings.', 'info')
  }
}
</script>
