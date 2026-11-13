<template>
  <section class="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden mb-8 sm:mb-12">
    <!-- Unit Selector Header Strip -->
    <div class="px-4 sm:px-8 pt-5 pb-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
      <div>
        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-[#16B4E8]">
          Interactive Residence Explorer
        </span>
        <h2 class="text-base sm:text-lg font-black text-[#0F2A44] mt-0.5">
          Explore Interiors, Floor Plans &amp; 3D Apartment Layouts
        </h2>
      </div>

      <!-- Residence Unit Tabs + Compare Modal Trigger -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full sm:flex-wrap suites-scroll-track">
        <button
          v-for="unit in units"
          :key="unit.id"
          type="button"
          @click="selectUnit(unit.id)"
          :class="[
            'px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all border flex-shrink-0 whitespace-nowrap',
            activeUnitId === unit.id
              ? 'bg-[#0F2A44] text-white border-[#0F2A44] shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:border-[#16B4E8] hover:text-[#0F2A44]'
          ]"
        >
          {{ unit.tabLabel }}
        </button>

        <button
          type="button"
          @click="openCompareModal"
          class="px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider border border-[#16B4E8] bg-[#16B4E8]/10 hover:bg-[#16B4E8] text-[#0F2A44] hover:text-white transition-all inline-flex items-center gap-1.5 shadow-xs flex-shrink-0 whitespace-nowrap"
        >
          <span>Compare</span>
        </button>
      </div>
    </div>

    <!-- Main Split Showcase: Left Visual Stage | Right Specs & Room Dimensions -->
    <div class="p-4 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
      <!-- LEFT (7 cols): Interactive Visual Stage (Interior | Floor Plan | 3D Model) -->
      <div class="lg:col-span-7">
        <div class="relative rounded-xl overflow-hidden bg-[#0F2A44] shadow-lg aspect-[4/3] sm:aspect-[16/11] w-full group">
          <!-- Top-Right 3-Mode View Switcher -->
          <div class="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 inline-flex items-center bg-[#0F2A44]/95 backdrop-blur-md p-1 rounded-lg shadow-md border border-white/15">
            <button
              v-for="mode in viewModes"
              :key="mode.id"
              type="button"
              @click="activeView = mode.id"
              :class="[
                'px-2.5 sm:px-3.5 py-1.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.12em] rounded-md transition-all',
                activeView === mode.id
                  ? 'bg-[#16B4E8] text-white shadow-sm'
                  : 'text-white/80 hover:text-white'
              ]"
            >
              {{ mode.label }}
            </button>
          </div>

          <!-- MODE 1: INTERIOR GALLERY -->
          <div v-if="activeView === 'interior'" class="relative w-full h-full">
            <img
              :src="activeUnit.image"
              :alt="activeUnit.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none"></div>

            <!-- Elevation / Fly-To Callout Toast Banner Inside Canvas -->
            <transition name="fade-up-soft">
              <div
                v-if="flyActive"
                class="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-[#0F2A44]/95 text-white px-3 py-1.5 rounded-lg border border-[#16B4E8]/50 shadow-md text-[11px] font-semibold flex items-center gap-2"
              >
                <span class="w-2 h-2 rounded-full bg-[#16B4E8] animate-ping"></span>
                <span>{{ activeUnit.floorLabel }} &bull; Pine Valley Panoramic Aspect</span>
              </div>
            </transition>

            <!-- Bottom-Left Suite Label -->
            <div class="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-2">
              <span class="px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-white text-xs font-bold tracking-wide">
                {{ activeUnit.bedBadge }}
              </span>
              <span class="hidden sm:inline-block px-2.5 py-1 rounded bg-white/20 backdrop-blur-sm text-white text-[11px] font-semibold">
                {{ activeUnit.sqft }} Sq Ft
              </span>
            </div>
          </div>

          <!-- MODE 2: ARCHITECTURAL FLOOR PLAN SVG -->
          <div
            v-else-if="activeView === 'floorplan'"
            class="w-full h-full bg-white p-4 sm:p-6 flex flex-col justify-between text-[#0F2A44] overflow-hidden"
          >
            <div class="flex items-center justify-between pr-44 sm:pr-56">
              <div>
                <span class="text-[9px] font-black uppercase tracking-widest text-[#16B4E8] block">Architectural Plan</span>
                <span class="text-xs font-extrabold text-[#0F2A44] truncate block max-w-[140px] sm:max-w-none">{{ activeUnit.code }} &bull; {{ activeUnit.sqft }} Sq Ft</span>
              </div>
            </div>

            <div class="flex-1 flex items-center justify-start sm:justify-center my-2 min-h-0 overflow-x-auto pb-1.5 suites-scroll-track">
              <svg viewBox="0 0 600 340" class="h-full min-w-[520px] sm:min-w-0 max-h-[250px] sm:max-h-[300px] flex-shrink-0" aria-label="Apartment architectural floor plan">
                <!-- Outer Structural Slab -->
                <rect x="20" y="20" width="560" height="300" rx="6" fill="#FFFFFF" stroke="#0F2A44" stroke-width="4" />

                <!-- Balcony Strip (Top Edge) -->
                <rect
                  x="24"
                  y="24"
                  width="552"
                  height="50"
                  :fill="highlightedRoom === 'Balcony' ? '#E0F7FE' : '#F1F5F9'"
                  stroke="#0F2A44"
                  stroke-width="1.5"
                  stroke-dasharray="5 3"
                  class="cursor-pointer transition-colors"
                  @click="highlightedRoom = 'Balcony'"
                />
                <text x="300" y="53" text-anchor="middle" fill="#0F2A44" font-size="11" font-weight="800">
                  {{ activeUnit.planLabels.balcony }}
                </text>

                <!-- Living Room -->
                <rect
                  x="24"
                  y="74"
                  width="240"
                  height="168"
                  :fill="highlightedRoom === 'Living Room' ? '#E0F7FE' : '#F8FAFC'"
                  stroke="#0F2A44"
                  stroke-width="2"
                  class="cursor-pointer transition-colors"
                  @click="highlightedRoom = 'Living Room'"
                />
                <text x="144" y="150" text-anchor="middle" fill="#0F2A44" font-size="13" font-weight="800">
                  {{ activeUnit.planLabels.livingTitle }}
                </text>
                <text x="144" y="168" text-anchor="middle" fill="#16B4E8" font-size="11" font-weight="700">
                  {{ activeUnit.planLabels.livingDim }}
                </text>

                <!-- Kitchenette (Bottom-Left) -->
                <rect
                  x="24"
                  y="242"
                  width="240"
                  height="74"
                  :fill="highlightedRoom === 'Kitchenette' ? '#E0F7FE' : '#F1F5F9'"
                  stroke="#0F2A44"
                  stroke-width="2"
                  class="cursor-pointer transition-colors"
                  @click="highlightedRoom = 'Kitchenette'"
                />
                <text x="144" y="284" text-anchor="middle" fill="#0F2A44" font-size="12" font-weight="700">
                  {{ activeUnit.planLabels.kitchen }}
                </text>

                <!-- Bedroom / Suite Zone -->
                <rect
                  x="264"
                  y="74"
                  width="210"
                  height="242"
                  :fill="highlightedRoom === 'Bedroom' ? '#E0F7FE' : '#FFFFFF'"
                  stroke="#0F2A44"
                  stroke-width="2"
                  class="cursor-pointer transition-colors"
                  @click="highlightedRoom = 'Bedroom'"
                />
                <text x="369" y="186" text-anchor="middle" fill="#0F2A44" font-size="13" font-weight="800">
                  {{ activeUnit.planLabels.bedroomTitle }}
                </text>
                <text x="369" y="204" text-anchor="middle" fill="#16B4E8" font-size="11" font-weight="700">
                  {{ activeUnit.planLabels.bedroomDim }}
                </text>

                <!-- Walk-in Closet & Attached Bath (Right) -->
                <rect
                  x="474"
                  y="74"
                  width="102"
                  height="108"
                  :fill="highlightedRoom === 'Closet' ? '#E0F7FE' : '#F8FAFC'"
                  stroke="#0F2A44"
                  stroke-width="2"
                  class="cursor-pointer transition-colors"
                  @click="highlightedRoom = 'Closet'"
                />
                <text x="525" y="124" text-anchor="middle" fill="#0F2A44" font-size="11" font-weight="800">CLOSET</text>
                <text x="525" y="140" text-anchor="middle" fill="#16B4E8" font-size="10" font-weight="700">
                  {{ activeUnit.planLabels.closetDim }}
                </text>

                <rect
                  x="474"
                  y="182"
                  width="102"
                  height="134"
                  :fill="highlightedRoom === 'Bathroom' ? '#E0F7FE' : '#F1F5F9'"
                  stroke="#0F2A44"
                  stroke-width="2"
                  class="cursor-pointer transition-colors"
                  @click="highlightedRoom = 'Bathroom'"
                />
                <text x="525" y="244" text-anchor="middle" fill="#0F2A44" font-size="11" font-weight="800">BATH</text>
                <text x="525" y="260" text-anchor="middle" fill="#16B4E8" font-size="10" font-weight="700">
                  {{ activeUnit.planLabels.bathDim }}
                </text>
              </svg>
            </div>

            <div class="flex items-center justify-between text-[10px] font-bold text-gray-500 pt-1 border-t border-gray-100">
              <span class="truncate">Tap room to highlight <span class="sm:hidden text-[#16B4E8] font-black">&bull; Scroll plan &harr;</span></span>
              <span class="uppercase tracking-wider flex-shrink-0">North &bull; Pine Facing</span>
            </div>
          </div>

          <!-- MODE 3: INTERACTIVE 3D ISOMETRIC WALKTHROUGH -->
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-[#0B192C] via-[#0F2A44] to-[#071320] text-white p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden cursor-grab active:cursor-grabbing"
            @pointerdown="startOrbit"
            @pointermove="moveOrbit"
            @pointerup="endOrbit"
            @pointerleave="endOrbit"
          >
            <div class="flex items-center justify-between z-10 pr-40 sm:pr-56">
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                <CubeIcon class="w-3.5 h-3.5" />
                <span>3D Dollhouse Preview</span>
              </div>
            </div>

            <!-- Interactive CSS 3D Isometric Cutaway Model -->
            <div class="flex-1 flex items-center justify-center perspective-3d">
              <div
                class="relative w-64 h-44 sm:w-80 sm:h-52 transition-transform duration-150 ease-out preserve-3d"
                :style="{ transform: `rotateX(${orbitX}deg) rotateZ(${orbitZ}deg)` }"
              >
                <!-- Floor Slab -->
                <div class="absolute inset-0 rounded-lg bg-slate-200 border-4 border-slate-400 shadow-[0_25px_50px_rgba(0,0,0,0.65)] grid grid-cols-12 grid-rows-6 gap-0.5 p-1">
                  <!-- Balcony Strip -->
                  <div class="col-span-12 row-span-1 bg-cyan-100 border border-cyan-400/40 rounded-xs flex items-center justify-center text-[8px] sm:text-[9px] font-black text-[#0F2A44]">
                    PANORAMIC BALCONY ({{ activeUnit.planLabels.balconyDim }})
                  </div>

                  <!-- Living Lounge -->
                  <div
                    :class="[
                      'col-span-5 row-span-3 rounded-xs border flex flex-col items-center justify-center p-1 text-center transition-colors',
                      highlightedRoom === 'Living Room' ? 'bg-[#16B4E8]/30 border-[#16B4E8]' : 'bg-white border-slate-300'
                    ]"
                  >
                    <span class="text-[8px] sm:text-[9px] font-black text-[#0F2A44]">LIVING</span>
                    <span class="text-[7px] sm:text-[8px] text-slate-600 font-semibold">{{ activeUnit.planLabels.livingDim }}</span>
                  </div>

                  <!-- Bedroom -->
                  <div
                    :class="[
                      'col-span-4 row-span-5 rounded-xs border flex flex-col items-center justify-center p-1 text-center transition-colors',
                      highlightedRoom === 'Bedroom' ? 'bg-[#16B4E8]/30 border-[#16B4E8]' : 'bg-[#F8FAFC] border-slate-300'
                    ]"
                  >
                    <span class="text-[8px] sm:text-[9px] font-black text-[#0F2A44]">BEDROOM</span>
                    <span class="text-[7px] sm:text-[8px] text-slate-600 font-semibold">{{ activeUnit.planLabels.bedroomDim }}</span>
                  </div>

                  <!-- Closet -->
                  <div
                    :class="[
                      'col-span-3 row-span-2 rounded-xs border flex flex-col items-center justify-center p-0.5 text-center transition-colors',
                      highlightedRoom === 'Closet' ? 'bg-[#16B4E8]/30 border-[#16B4E8]' : 'bg-slate-100 border-slate-300'
                    ]"
                  >
                    <span class="text-[8px] font-black text-[#0F2A44]">CLOSET</span>
                  </div>

                  <!-- Bathroom -->
                  <div
                    :class="[
                      'col-span-3 row-span-3 rounded-xs border flex flex-col items-center justify-center p-0.5 text-center transition-colors',
                      highlightedRoom === 'Bathroom' ? 'bg-[#16B4E8]/30 border-[#16B4E8]' : 'bg-cyan-50 border-slate-300'
                    ]"
                  >
                    <span class="text-[8px] font-black text-[#0F2A44]">BATH</span>
                  </div>

                  <!-- Kitchenette -->
                  <div
                    :class="[
                      'col-span-5 row-span-2 rounded-xs border flex flex-col items-center justify-center p-1 text-center transition-colors',
                      highlightedRoom === 'Kitchenette' ? 'bg-[#16B4E8]/30 border-[#16B4E8]' : 'bg-amber-50 border-slate-300'
                    ]"
                  >
                    <span class="text-[8px] sm:text-[9px] font-black text-[#0F2A44]">KITCHENETTE</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Drag / Reset Controls -->
            <div class="flex items-center justify-between text-[10px] text-cyan-300 font-medium z-10">
              <span>Drag anywhere to rotate 3D model</span>
              <button
                type="button"
                @click.stop="resetOrbit"
                class="px-2.5 py-1 rounded bg-white/15 hover:bg-white/25 text-white font-bold uppercase tracking-wider transition-colors"
              >
                Reset Angle
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT (5 cols): Unit Heading, 3 Stats, Scrollable Rooms & Dimensions + 2x2 Action Grid -->
      <div class="lg:col-span-5 space-y-5">
        <!-- Unit Identity -->
        <div>
          <span class="text-[11px] font-black uppercase tracking-[0.16em] text-[#16B4E8] block">
            {{ activeUnit.code }}
          </span>
          <h3 class="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0F2A44] mt-1">
            {{ activeUnit.name }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
            {{ activeUnit.description }}
          </p>
        </div>

        <!-- 3-Column Metrics Bar (Square Feet | Floor Code | Price) -->
        <div class="grid grid-cols-3 border-y border-gray-200 py-3.5 text-left bg-slate-50/50 rounded-lg px-2">
          <div class="pr-2 sm:pr-3 border-r border-gray-200">
            <div class="text-xl sm:text-2xl font-black text-[#0F2A44] leading-none">
              {{ activeUnit.sqft }}
            </div>
            <span class="block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 mt-1.5">
              Square Feet
            </span>
          </div>

          <div class="px-2 sm:px-4 border-r border-gray-200">
            <div class="text-xl sm:text-2xl font-black text-[#0F2A44] leading-none">
              {{ activeUnit.floorCode }}
            </div>
            <span class="block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 mt-1.5">
              {{ activeUnit.floorLabel }}
            </span>
          </div>

          <div class="pl-2 sm:pl-4">
            <div class="text-base sm:text-lg font-black text-[#0F2A44] leading-tight truncate">
              {{ activeUnit.priceLabel || '—' }}
            </div>
            <span class="block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 mt-1.5">
              {{ activeUnit.priceCaption }}
            </span>
          </div>
        </div>

        <!-- Collapsible Rooms & Dimensions Table -->
        <div>
          <button
            type="button"
            @click="roomsOpen = !roomsOpen"
            class="w-full flex items-center justify-between py-1 text-left group"
          >
            <span class="text-[11px] font-black uppercase tracking-[0.15em] text-[#0F2A44]">
              Rooms and Dimensions
            </span>
            <span class="text-[#16B4E8] group-hover:scale-110 transition-transform">
              <XMarkIcon v-if="roomsOpen" class="w-4 h-4" />
              <PlusIcon v-else class="w-4 h-4" />
            </span>
          </button>

          <div
            v-if="roomsOpen"
            class="mt-2 max-h-52 overflow-y-auto pr-2 divide-y divide-gray-100 rooms-scrollbar border-b border-gray-200"
          >
            <button
              v-for="room in activeUnit.rooms"
              :key="room.label"
              type="button"
              @click="focusRoom(room.label)"
              :class="[
                'w-full py-2.5 px-2 flex items-center justify-between text-xs text-left transition-colors rounded-md',
                highlightedRoom === room.label ? 'bg-[#16B4E8]/15 font-bold text-[#0F2A44]' : 'hover:bg-slate-50'
              ]"
            >
              <span class="text-gray-700 font-medium">{{ room.label }}</span>
              <span class="text-[#0F2A44] font-bold tabular-nums">{{ room.dimension }}</span>
            </button>
          </div>
        </div>

        <!-- Architectural Action Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            @click="enter3DWalkthrough"
            class="py-3 px-4 rounded-lg bg-[#16B4E8] hover:bg-[#0F2A44] text-white text-[11px] font-black uppercase tracking-[0.12em] transition-all flex items-center justify-center gap-2 shadow-sm sm:col-span-2"
          >
            <span>Walk Through in 3D</span>
            <CubeIcon class="w-4 h-4" />
          </button>

          <button
            type="button"
            @click="requestPrice"
            class="py-3 px-4 rounded-lg border-2 border-[#16B4E8] bg-white hover:bg-[#16B4E8] text-[#0F2A44] hover:text-white text-[11px] font-black uppercase tracking-[0.12em] transition-all flex items-center justify-center gap-1.5"
          >
            <span>Request the Price</span>
            <ArrowUpRightIcon class="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            @click="toggleCompareLayout(activeUnit.id)"
            :class="[
              'py-3 px-4 rounded-lg border text-[11px] font-black uppercase tracking-[0.12em] transition-all flex items-center justify-center gap-1.5',
              compareIds.includes(activeUnit.id)
                ? 'border-2 border-[#16B4E8] bg-[#16B4E8]/10 text-[#0F2A44]'
                : 'border border-gray-300 bg-white hover:border-[#0F2A44] text-gray-700 hover:text-[#0F2A44]'
            ]"
          >
            <span>{{ compareIds.includes(activeUnit.id) ? 'Compare Apartments' : 'Add to Compare' }}</span>
          </button>

          <button
            type="button"
            @click="shareUnit"
            class="py-3 px-4 rounded-lg border border-gray-300 bg-white hover:border-[#16B4E8] text-gray-700 hover:text-[#0F2A44] text-[11px] font-bold uppercase tracking-[0.12em] transition-all flex items-center justify-center gap-2 sm:col-span-2"
          >
            <ArrowUpTrayIcon class="w-3.5 h-3.5" />
            <span>Share Residence Layout</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- COMPARE APARTMENTS / FLATS / PLOTS MODAL (Up to 3 Layouts)     -->
    <!-- ============================================================== -->
    <transition name="fade-up-soft">
      <div
        v-if="showCompareModal"
        @click.self="showCompareModal = false"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0F2A44]/70 backdrop-blur-sm"
      >
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 text-[#0F2A44]">
          <!-- Modal Header -->
          <div class="px-5 sm:px-8 py-5 border-b border-gray-200 flex items-center justify-between gap-4 bg-slate-50/80">
            <h3 class="text-2xl sm:text-3xl font-black text-[#0F2A44] tracking-tight">
              Compare apartments
            </h3>
            <button
              type="button"
              @click="showCompareModal = false"
              aria-label="Close comparison dialog"
              class="w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-[#0F2A44] text-gray-500 hover:text-white flex items-center justify-center transition-colors"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <div class="p-5 sm:p-8 space-y-5">
            <!-- Sub-bar + Quick Add Layout/Flat/Plot Selector -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p class="text-xs sm:text-sm text-gray-600">
                Compare up to three layouts across Harsukh apartments, PHA flats, and plots.
              </p>

              <div v-if="availableToCompare.length && compareIds.length < 3" class="flex items-center gap-2 flex-wrap">
                <select
                  v-model="selectedAddId"
                  aria-label="Add a layout to compare"
                  @change="addFromDropdown"
                  class="text-xs font-bold text-[#0F2A44] bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#16B4E8] cursor-pointer"
                >
                  <option value="">+ Add Flat / Apartment / Plot...</option>
                  <option v-for="item in availableToCompare" :key="item.id" :value="item.id">
                    {{ item.name }} ({{ item.unitCode }})
                  </option>
                </select>
              </div>
            </div>

            <!-- Comparison Table -->
            <div class="border border-gray-200 rounded-xl bg-white overflow-x-auto shadow-xs">
              <table class="w-full text-left border-collapse text-xs sm:text-sm min-w-[520px]">
                <thead>
                  <tr class="bg-[#F6F8FA] border-b border-gray-200">
                    <th class="py-3.5 px-4 text-[11px] font-black uppercase tracking-[0.14em] text-gray-500 w-40">
                      Residence
                    </th>
                    <th
                      v-for="item in comparedItems"
                      :key="`head-${item.id}`"
                      class="py-3.5 px-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#0F2A44] border-l border-gray-200"
                    >
                      <div class="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          @click="jumpToLayout(item)"
                          class="inline-flex items-center gap-1 hover:text-[#16B4E8] text-left uppercase transition-colors"
                        >
                          <span>{{ item.name }}</span>
                          <ArrowUpRightIcon class="w-3.5 h-3.5 flex-shrink-0 text-[#16B4E8]" />
                        </button>

                        <!-- Small Red Cross Button (No Circle Fill) -->
                        <button
                          type="button"
                          @click="removeCompareLayout(item.id)"
                          class="p-0.5 text-red-600 hover:text-red-700 hover:opacity-80 transition-opacity flex items-center justify-center flex-shrink-0 cursor-pointer"
                          title="Remove from comparison"
                          aria-label="Remove"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-gray-100 text-[#0F2A44]">
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="py-3 px-4 font-bold text-gray-500">Type</td>
                    <td v-for="item in comparedItems" :key="`type-${item.id}`" class="py-3 px-4 border-l border-gray-100 font-semibold">
                      {{ item.bedBadge }}
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="py-3 px-4 font-bold text-gray-500">Supplied area</td>
                    <td v-for="item in comparedItems" :key="`area-${item.id}`" class="py-3 px-4 border-l border-gray-100 font-semibold">
                      {{ item.sqft.toLocaleString() }} sq ft
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="py-3 px-4 font-bold text-gray-500">Level</td>
                    <td v-for="item in comparedItems" :key="`lvl-${item.id}`" class="py-3 px-4 border-l border-gray-100">
                      {{ item.levelName }}
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="py-3 px-4 font-bold text-gray-500">Unit</td>
                    <td v-for="item in comparedItems" :key="`unit-${item.id}`" class="py-3 px-4 border-l border-gray-100 font-bold text-[#16B4E8]">
                      {{ item.unitCode }}
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="py-3 px-4 font-bold text-gray-500">Pricing</td>
                    <td v-for="item in comparedItems" :key="`price-${item.id}`" class="py-3 px-4 border-l border-gray-100 font-extrabold text-[#0F2A44]">
                      {{ item.pricingText }}
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="py-3 px-4 font-bold text-gray-500">Availability</td>
                    <td v-for="item in comparedItems" :key="`avail-${item.id}`" class="py-3 px-4 border-l border-gray-100">
                      {{ item.availabilityText }}
                    </td>
                  </tr>
                  <tr>
                    <td class="py-3.5 px-4 font-bold text-gray-500">Selection</td>
                    <td v-for="item in comparedItems" :key="`sel-${item.id}`" class="py-3.5 px-4 border-l border-gray-100">
                      <button
                        type="button"
                        @click="removeCompareLayout(item.id)"
                        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 text-[11px] font-bold uppercase transition-colors"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Bottom Actions -->
            <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                @click="showCompareModal = false"
                class="px-6 py-3.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-[11px] font-black uppercase tracking-[0.16em] rounded-lg inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                <span>Continue Exploring</span>
                <ArrowUpRightIcon class="w-3.5 h-3.5" />
              </button>

              <router-link
                to="/compare"
                @click="showCompareModal = false"
                class="text-xs font-bold text-[#16B4E8] hover:text-[#0F2A44] hover:underline inline-flex items-center gap-1 transition-colors"
              >
                <span>Open Full Property Compare Tool</span>
                <ArrowUpRightIcon class="w-3.5 h-3.5" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  XMarkIcon,
  PlusIcon,
  CubeIcon,
  ArrowUpRightIcon,
  ArrowUpTrayIcon,
  ScaleIcon
} from '@heroicons/vue/24/outline'
import { useAdminStore } from '../../stores/admin'

const emit = defineEmits(['request-price'])
const router = useRouter()
const adminStore = useAdminStore()

const viewModes = [
  { id: 'interior', label: 'Interior' },
  { id: 'floorplan', label: 'Floor Plan' },
  { id: '3d', label: '3D Model' }
]

const units = [
  {
    id: 'studio',
    tabLabel: 'The Studio (446 Sq Ft)',
    code: 'STUDIO, G-1',
    unitCode: 'G-1',
    name: 'The Studio',
    bedBadge: 'Studio Apartment',
    description: 'A ground-floor studio featuring an integrated sleeping area, cozy seating lounge, dining for two, kitchenette, and sliding glass doors opening onto pine slopes.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85',
    sqft: 446,
    floorCode: 'G01',
    floorLabel: 'GROUND FLOOR',
    levelName: 'Ground floor',
    priceLabel: 'On Request',
    priceCaption: '15% BOOKING DOWN',
    pricingText: 'On request (15% Down)',
    availabilityText: 'Ask the sales team',
    planLabels: {
      balcony: 'SLIDING GLASS PATIO • 10\'-6" × 4\'-0"',
      balconyDim: '10\'-6" × 4\'-0"',
      livingTitle: 'SLEEPING & LOUNGE',
      livingDim: '15\'-2" × 12\'-4"',
      kitchen: 'DINING FOR 2 & KITCHENETTE',
      bedroomTitle: 'SLIDING GLASS ZONE',
      bedroomDim: '11\'-0" × 9\'-6"',
      closetDim: '4\'-8" × 4\'-4"',
      bathDim: '6\'-8" × 6\'-2"'
    },
    rooms: [
      { label: 'Sleeping & Lounge Area', dimension: '15\'-2" × 12\'-4"' },
      { label: 'Kitchenette & Dining', dimension: 'Counter, hob & seating for 2' },
      { label: 'Wardrobe / Closet', dimension: '4\'-8" × 4\'-4"' },
      { label: 'Bathroom', dimension: '6\'-8" × 6\'-2"' },
      { label: 'Sliding Glass Balcony', dimension: '10\'-6" × 4\'-0"' }
    ]
  },
  {
    id: '1bed',
    tabLabel: 'Valley View (692 Sq Ft)',
    code: '1 BEDROOM, V5-10',
    unitCode: 'V5-10',
    name: 'Valley View',
    bedBadge: '1 Bedroom',
    description: 'A one-bedroom apartment with an open living room, a kitchenette and a long balcony framing Kuza Gali\'s pine valley.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    sqft: 692,
    floorCode: 'V05',
    floorLabel: 'VALLEY FLOOR 05',
    levelName: 'Valley floor 05',
    priceLabel: '—',
    priceCaption: 'PRICE ON REQUEST',
    pricingText: 'On request',
    availabilityText: 'Ask the sales team',
    planLabels: {
      balcony: 'LONG BALCONY • 13\'-4" × 3\'-9"',
      balconyDim: '13\'-4" × 3\'-9"',
      livingTitle: 'LIVING ROOM',
      livingDim: '12\'-5" × 11\'-10"',
      kitchen: 'KITCHENETTE (Counter & hob)',
      bedroomTitle: 'BEDROOM',
      bedroomDim: '12\'-6" × 11\'-0"',
      closetDim: '5\'-6" × 5\'-5"',
      bathDim: '7\'-1" × 7\'-0"'
    },
    rooms: [
      { label: 'Living Room', dimension: '12\'-5" × 11\'-10"' },
      { label: 'Kitchenette', dimension: 'Counter & hob' },
      { label: 'Closet', dimension: '5\'-6" × 5\'-5"' },
      { label: 'Bedroom', dimension: '12\'-6" × 11\'-0"' },
      { label: 'Bathroom', dimension: '7\'-1" × 7\'-0"' },
      { label: 'Balcony', dimension: '13\'-4" × 3\'-9"' }
    ]
  },
  {
    id: '2bed',
    tabLabel: 'Two Bedroom (1,427 Sq Ft)',
    code: '2 BEDROOM, F2-15',
    unitCode: 'F2-15',
    name: 'The Two Bedroom',
    bedBadge: '2 Bedrooms',
    description: 'Two spacious bedrooms, two en-suite bathrooms, an open living and dining room, fitted kitchen, entrance lobby, balcony, and a large mountain terrace.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    sqft: 1427,
    floorCode: 'F02',
    floorLabel: 'SECOND FLOOR',
    levelName: 'Second floor',
    priceLabel: '—',
    priceCaption: 'PRICE ON REQUEST',
    pricingText: 'On request',
    availabilityText: 'Ask the sales team',
    planLabels: {
      balcony: 'TERRACE (16\'-0" × 7\'-0") & BALCONY (14\'-0" × 4\'-6")',
      balconyDim: '16\'-0" × 7\'-0"',
      livingTitle: 'LIVING & DINING',
      livingDim: '19\'-4" × 11\'-11"',
      kitchen: 'KITCHEN • 11\'-9" × 6\'-10"',
      bedroomTitle: 'BED 1 (15\'-3"×10\'-0") • BED 2 (13\'-6"×13\'-2")',
      bedroomDim: '2 En-Suite Bedrooms',
      closetDim: '5\'-10" × 5\'-10"',
      bathDim: '7\'-3" × 5\'-6"'
    },
    rooms: [
      { label: 'Living & Dining', dimension: '19\'-4" × 11\'-11"' },
      { label: 'Kitchen', dimension: '11\'-9" × 6\'-10"' },
      { label: 'Lobby', dimension: '5\'-4" × 12\'-4½"' },
      { label: 'Bedroom 1', dimension: '15\'-3" × 10\'-0"' },
      { label: 'Bedroom 2', dimension: '13\'-6" × 13\'-2"' },
      { label: 'Bath 1', dimension: '7\'-3" × 5\'-6"' },
      { label: 'Bath 2', dimension: '5\'-6" × 8\'-0"' },
      { label: 'Closet', dimension: '5\'-10" × 5\'-10"' },
      { label: 'Balcony', dimension: '4\'-6" × 14\'-0"' },
      { label: 'Terrace', dimension: '16\'-0" × 7\'-0"' }
    ]
  },
  {
    id: 'penthouse',
    tabLabel: 'Glasshouse Penthouse (1,633 Sq Ft)',
    code: 'PENTHOUSE, F3-6',
    unitCode: 'F3-6',
    name: 'The Glasshouse Penthouse',
    bedBadge: 'Penthouse (3 Bed)',
    description: 'Signature third-floor penthouse crowned with a sloping alpine glass roof, three bedrooms, private panoramic terrace, and plunge pool configuration.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    sqft: 1633,
    floorCode: 'F03',
    floorLabel: 'THIRD FLOOR',
    levelName: 'Third floor',
    priceLabel: '—',
    priceCaption: 'PRICE ON REQUEST',
    pricingText: 'On request',
    availabilityText: 'Limited Penthouse',
    planLabels: {
      balcony: 'PRIVATE TERRACE & PLUNGE POOL DECK',
      balconyDim: 'Terrace + Pool',
      livingTitle: 'GLASSHOUSE LIVING HALL',
      livingDim: 'Sloping Glass Roof Atrium',
      kitchen: 'CHEF KITCHENETTE & DINING',
      bedroomTitle: '3 PENTHOUSE BEDROOMS',
      bedroomDim: 'Panoramic Galyat Ridge Views',
      closetDim: 'Walk-In',
      bathDim: '3 En-Suite'
    },
    rooms: [
      { label: 'Living Hall (Glass Roof)', dimension: 'Open Sloping Glass Atrium' },
      { label: 'Kitchen & Dining', dimension: 'Full Chef Counter' },
      { label: '3 En-Suite Bedrooms', dimension: 'Ridge & Pine Aspect' },
      { label: 'Private Roof Terrace', dimension: 'Panoramic Alpine Deck' },
      { label: 'Plunge Pool Zone', dimension: 'Integrated Thermal Deck' }
    ]
  },
  {
    id: '3bed',
    tabLabel: 'Three Bedroom (1,801 Sq Ft)',
    code: '3 BEDROOM, F2-14',
    unitCode: 'F2-14',
    name: 'The Three Bedroom',
    bedBadge: '3 Bedrooms',
    description: 'Our largest residence spanning 1,801 sq ft on the second floor with three bedrooms, three bathrooms, combined living & dining hall, two balconies, and a wide terrace.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    sqft: 1801,
    floorCode: 'F02',
    floorLabel: 'SECOND FLOOR',
    levelName: 'Second floor',
    priceLabel: '—',
    priceCaption: 'PRICE ON REQUEST',
    pricingText: 'On request',
    availabilityText: 'Ask the sales team',
    planLabels: {
      balcony: 'TWO BALCONIES & GRAND TERRACE',
      balconyDim: '2 Balconies + Terrace',
      livingTitle: 'COMBINED LIVING & DINING',
      livingDim: 'Grand Family Entertaining Hall',
      kitchen: 'FULL FAMILY KITCHEN',
      bedroomTitle: '3 EN-SUITE BEDROOMS',
      bedroomDim: 'Timber & Stone Finishes',
      closetDim: 'Walk-In',
      bathDim: '3 Full Baths'
    },
    rooms: [
      { label: 'Living & Dining Room', dimension: 'Combined Grand Hall' },
      { label: '3 Bedrooms', dimension: '3 En-Suite Suites' },
      { label: '3 Bathrooms', dimension: 'Premium Stone Fixtures' },
      { label: '2 Balconies', dimension: 'Dual Valley Views' },
      { label: 'Grand Terrace', dimension: 'Expansive Outdoor Deck' }
    ]
  }
]

const extraCompareCatalog = [
  {
    id: 'pha-i12',
    name: 'PHA Flat (Sector I-12)',
    bedBadge: '2-Bed PHA Flat',
    sqft: 1100,
    levelName: 'Sector I-12/1, Islamabad',
    unitCode: 'C-TYPE-I12',
    pricingText: 'PKR 68 Lac',
    availabilityText: 'Ready Cash Possession',
    route: '/listings?city=Islamabad&type=apartment'
  },
  {
    id: 'pechs-plot',
    name: 'Moqa Ka Plot (PECHS)',
    bedBadge: 'Residential Plot (10M)',
    sqft: 2500,
    levelName: 'Block E, PECHS Islamabad',
    unitCode: 'PECHS-10M',
    pricingText: 'PKR 78 Lac',
    availabilityText: 'Direct Transfer Ready',
    route: '/listings?type=plot'
  }
]

const activeUnitId = ref('1bed')
const activeView = ref('interior')
const roomsOpen = ref(true)
const highlightedRoom = ref('')
const flyActive = ref(false)
const showCompareModal = ref(false)
const compareIds = ref(['1bed', 'studio'])
const selectedAddId = ref('')

const allComparePool = computed(() => [...units, ...extraCompareCatalog])

const comparedItems = computed(() => {
  return compareIds.value
    .map((id) => allComparePool.value.find((item) => item.id === id))
    .filter(Boolean)
})

const availableToCompare = computed(() => {
  return allComparePool.value.filter((item) => !compareIds.value.includes(item.id))
})

const openCompareModal = () => {
  if (!compareIds.value.includes(activeUnitId.value)) {
    if (compareIds.value.length >= 3) {
      compareIds.value = [activeUnitId.value, ...compareIds.value.slice(0, 2)]
    } else {
      compareIds.value.unshift(activeUnitId.value)
    }
  }
  showCompareModal.value = true
}

const toggleCompareLayout = (id) => {
  if (compareIds.value.includes(id)) {
    showCompareModal.value = true
    return
  }
  if (compareIds.value.length >= 3) {
    adminStore.showToast('You can compare up to 3 layouts at once.', 'info')
    showCompareModal.value = true
    return
  }
  compareIds.value.push(id)
  adminStore.showToast('Added layout to Compare Apartments.')
  showCompareModal.value = true
}

const addFromDropdown = () => {
  if (!selectedAddId.value) return
  if (compareIds.value.length < 3 && !compareIds.value.includes(selectedAddId.value)) {
    compareIds.value.push(selectedAddId.value)
  }
  selectedAddId.value = ''
}

const removeCompareLayout = (id) => {
  compareIds.value = compareIds.value.filter((cid) => cid !== id)
}

const jumpToLayout = (item) => {
  showCompareModal.value = false
  if (item.route) {
    router.push(item.route)
    return
  }
  selectUnit(item.id)
}

// 3D Orbit state
const orbitX = ref(54)
const orbitZ = ref(-28)
let dragging = false
let lastX = 0
let lastY = 0

const activeUnit = computed(() => {
  return units.find((u) => u.id === activeUnitId.value) || units[0]
})

const selectUnit = (id) => {
  activeUnitId.value = id
  highlightedRoom.value = ''
  flyActive.value = false
}

const focusRoom = (roomLabel) => {
  highlightedRoom.value = highlightedRoom.value === roomLabel ? '' : roomLabel
  if (activeView.value === 'interior') {
    activeView.value = 'floorplan'
  }
}

const flyToApartment = () => {
  activeView.value = 'interior'
  flyActive.value = true
  adminStore.showToast(`Viewing ${activeUnit.value.name} (${activeUnit.value.code}) on ${activeUnit.value.floorLabel}`)
}

const enter3DWalkthrough = () => {
  activeView.value = '3d'
}

const startOrbit = (e) => {
  dragging = true
  lastX = e.clientX
  lastY = e.clientY
}

const moveOrbit = (e) => {
  if (!dragging) return
  const dx = e.clientX - lastX
  const dy = e.clientY - lastY
  lastX = e.clientX
  lastY = e.clientY
  orbitZ.value = Math.max(-75, Math.min(75, orbitZ.value + dx * 0.45))
  orbitX.value = Math.max(25, Math.min(72, orbitX.value - dy * 0.35))
}

const endOrbit = () => {
  dragging = false
}

const resetOrbit = () => {
  orbitX.value = 54
  orbitZ.value = -28
}

const requestPrice = () => {
  emit('request-price', activeUnit.value)
}

const shareUnit = async () => {
  const url = `${window.location.origin}/hr-sukh?unit=${activeUnit.value.id}`
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Harsukh — ${activeUnit.value.name} (${activeUnit.value.code})`,
        text: `${activeUnit.value.description} (${activeUnit.value.sqft} Sq Ft)`,
        url
      })
      return
    } catch {}
  }
  try {
    await navigator.clipboard.writeText(url)
    adminStore.showToast(`${activeUnit.value.name} link copied to clipboard!`)
  } catch {
    adminStore.showToast(`Share URL: ${url}`, 'info')
  }
}
</script>

<style scoped>
.suites-scroll-track {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #16B4E8 #E2E8F0;
}
.suites-scroll-track::-webkit-scrollbar {
  height: 6px;
  display: block;
}
.suites-scroll-track::-webkit-scrollbar-track {
  background: #F1F5F9;
  border-radius: 9999px;
}
.suites-scroll-track::-webkit-scrollbar-thumb {
  background: #16B4E8;
  border-radius: 9999px;
  border: 1.5px solid #F1F5F9;
}
.suites-scroll-track::-webkit-scrollbar-thumb:hover {
  background: #0F2A44;
}

.perspective-3d {
  perspective: 900px;
}
.preserve-3d {
  transform-style: preserve-3d;
}

.rooms-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.rooms-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.rooms-scrollbar::-webkit-scrollbar-thumb {
  background: #8B9B9C;
  border-radius: 9999px;
}

.fade-up-soft-enter-active,
.fade-up-soft-leave-active {
  transition: all 0.25s ease;
}
.fade-up-soft-enter-from,
.fade-up-soft-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
