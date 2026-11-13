<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none',
      isScrolled || !isHomePage
        ? 'bg-white/95 backdrop-blur-xl text-[#0F2A44] shadow-[0_4px_25px_rgba(15,42,68,0.08)] py-3 border-b border-gray-100'
        : 'bg-white/90 backdrop-blur-md text-[#0F2A44] shadow-sm py-3.5 border-b border-gray-100/60'
    ]"
  >
    <!-- Main Navigation Bar -->
    <div class="max-w-[1280px] mx-auto px-3 sm:px-4 flex items-center justify-between gap-2">
      <!-- Left: Logo without circle wrapper + Company Name & Subtitle -->
      <router-link to="/" class="flex items-center gap-2 sm:gap-3 focus:outline-none group min-w-0">
        <img
          src="/toplinkers-logo-sm.png"
          alt="Top Linkers"
          width="129"
          height="168"
          decoding="async"
          class="h-10 sm:h-12 md:h-14 w-auto object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        />
        <div class="flex flex-col min-w-0">
          <span class="text-base sm:text-xl font-black leading-tight tracking-tight truncate">
            <span class="text-[#E53935]">Top</span> <span class="text-black">Linkers</span>
          </span>
          <span class="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-gray-500 leading-none mt-0.5 truncate">
            Real Estate &bull; Construction &bull; Solar
          </span>
        </div>
      </router-link>

      <!-- Center: Navigation Links (Home, About, Services with dropdown, Listings, Our Team, Contact) -->
      <nav class="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
        <!-- 1. Home -->
        <router-link
          to="/"
          v-slot="{ isActive }"
          class="relative py-2 group/nav focus:outline-none"
        >
          <span
            :class="[
              'text-sm font-bold tracking-wide transition-colors duration-200',
              isActive
                ? 'text-[#16B4E8]'
                : 'text-[#0F2A44] group-hover/nav:text-[#16B4E8]'
            ]"
          >
            Home
          </span>
          <span
            :class="[
              'absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#16B4E8] to-[#6CC24A] transition-all duration-300 rounded-full',
              isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
            ]"
          ></span>
        </router-link>

        <!-- 2. About -->
        <router-link
          to="/about"
          v-slot="{ isActive }"
          class="relative py-2 group/nav focus:outline-none"
        >
          <span
            :class="[
              'text-sm font-bold tracking-wide transition-colors duration-200',
              isActive
                ? 'text-[#16B4E8]'
                : 'text-[#0F2A44] group-hover/nav:text-[#16B4E8]'
            ]"
          >
            About
          </span>
          <span
            :class="[
              'absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#16B4E8] to-[#6CC24A] transition-all duration-300 rounded-full',
              isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
            ]"
          ></span>
        </router-link>

        <!-- 3. Services Dropdown (Compact Text-Only) -->
        <div class="relative group/menu py-2">
          <router-link
            to="/services"
            v-slot="{ isActive }"
            class="flex items-center gap-1 focus:outline-none cursor-pointer"
          >
            <span
              :class="[
                'text-sm font-bold tracking-wide transition-colors duration-200',
                isActive
                  ? 'text-[#16B4E8]'
                  : 'text-[#0F2A44] group-hover/menu:text-[#16B4E8]'
              ]"
            >
              Services
            </span>
            <ChevronDownIcon class="w-3.5 h-3.5 text-gray-400 group-hover/menu:text-[#16B4E8] transition-transform duration-300 group-hover/menu:rotate-180" />
          </router-link>

          <span
            class="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#16B4E8] to-[#6CC24A] transition-all duration-300 group-hover/menu:w-full rounded-full"
          ></span>

          <!-- Compact Solid Text-Only Services Dropdown -->
          <div
            class="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-200 ease-out z-50"
          >
            <div class="bg-white rounded-xl shadow-[0_14px_40px_-8px_rgba(15,42,68,0.22)] border border-gray-100 p-1.5 space-y-0.5">
              <router-link
                to="/services#plot"
                class="block px-3 py-1.5 rounded-lg text-xs font-bold text-[#0F2A44] hover:text-[#16B4E8] hover:bg-slate-50 transition-colors"
              >
                Plot Services
              </router-link>

              <router-link
                to="/services#flats"
                class="block px-3 py-1.5 rounded-lg text-xs font-bold text-[#0F2A44] hover:text-[#16B4E8] hover:bg-slate-50 transition-colors"
              >
                PHA &amp; Flats
              </router-link>

              <router-link
                to="/services#construction"
                class="block px-3 py-1.5 rounded-lg text-xs font-bold text-[#0F2A44] hover:text-[#16B4E8] hover:bg-slate-50 transition-colors"
              >
                Construction Services
              </router-link>

              <router-link
                to="/services#solar"
                class="block px-3 py-1.5 rounded-lg text-xs font-bold text-[#0F2A44] hover:text-[#16B4E8] hover:bg-slate-50 transition-colors"
              >
                Solar Services
              </router-link>

              <router-link
                to="/hr-sukh"
                class="block px-3 py-1.5 rounded-lg text-xs font-bold text-[#0F2A44] hover:text-[#16B4E8] hover:bg-slate-50 transition-colors border-t border-gray-100 mt-0.5 pt-1.5"
              >
                Harsukh (Nathia Gali)
              </router-link>
            </div>
          </div>
        </div>

        <!-- 4. Compare Flats & Plots (Dedicated Standalone Feature) -->
        <router-link
          to="/compare"
          v-slot="{ isActive }"
          class="relative py-2 group/nav focus:outline-none"
        >
          <span
            :class="[
              'text-sm font-bold tracking-wide transition-colors duration-200 inline-flex items-center gap-1.5',
              isActive
                ? 'text-[#16B4E8]'
                : 'text-[#0F2A44] group-hover/nav:text-[#16B4E8]'
            ]"
          >
            <span>Compare Flats &amp; Plots</span>
          </span>
          <span
            :class="[
              'absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#16B4E8] to-[#6CC24A] transition-all duration-300 rounded-full',
              isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
            ]"
          ></span>
        </router-link>

        <!-- 4. Listings -->
        <router-link
          to="/listings"
          v-slot="{ isActive }"
          class="relative py-2 group/nav focus:outline-none"
        >
          <span
            :class="[
              'text-sm font-bold tracking-wide transition-colors duration-200',
              isActive
                ? 'text-[#16B4E8]'
                : 'text-[#0F2A44] group-hover/nav:text-[#16B4E8]'
            ]"
          >
            Listings
          </span>
          <span
            :class="[
              'absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#16B4E8] to-[#6CC24A] transition-all duration-300 rounded-full',
              isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
            ]"
          ></span>
        </router-link>

        <!-- 5. Our Team -->
        <router-link
          to="/team"
          v-slot="{ isActive }"
          class="relative py-2 group/nav focus:outline-none"
        >
          <span
            :class="[
              'text-sm font-bold tracking-wide transition-colors duration-200',
              isActive
                ? 'text-[#16B4E8]'
                : 'text-[#0F2A44] group-hover/nav:text-[#16B4E8]'
            ]"
          >
            Our Team
          </span>
          <span
            :class="[
              'absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#16B4E8] to-[#6CC24A] transition-all duration-300 rounded-full',
              isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
            ]"
          ></span>
        </router-link>

        <!-- 6. Blog -->
        <router-link
          to="/blog"
          v-slot="{ isActive }"
          class="relative py-2 group/nav focus:outline-none"
        >
          <span
            :class="[
              'text-sm font-bold tracking-wide transition-colors duration-200',
              isActive
                ? 'text-[#16B4E8]'
                : 'text-[#0F2A44] group-hover/nav:text-[#16B4E8]'
            ]"
          >
            Blog
          </span>
          <span
            :class="[
              'absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#16B4E8] to-[#6CC24A] transition-all duration-300 rounded-full',
              isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
            ]"
          ></span>
        </router-link>

        <!-- 7. Contact -->
        <router-link
          to="/contact"
          v-slot="{ isActive }"
          class="relative py-2 group/nav focus:outline-none"
        >
          <span
            :class="[
              'text-sm font-bold tracking-wide transition-colors duration-200',
              isActive
                ? 'text-[#16B4E8]'
                : 'text-[#0F2A44] group-hover/nav:text-[#16B4E8]'
            ]"
          >
            Contact
          </span>
          <span
            :class="[
              'absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#16B4E8] to-[#6CC24A] transition-all duration-300 rounded-full',
              isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
            ]"
          ></span>
        </router-link>
      </nav>

      <!-- Right: Mobile Hamburger -->
      <div class="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        <!-- Mobile Drawer Hamburger Icon -->
        <button
          type="button"
          class="lg:hidden p-2 text-[#0F2A44] hover:bg-gray-100 rounded-lg focus:outline-none transition-colors"
          aria-label="Toggle mobile menu"
          @click="mobileDrawerOpen = true"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Slide-in Drawer -->
    <Teleport to="body">
      <div v-if="mobileDrawerOpen" class="fixed inset-0 z-50 overflow-hidden lg:hidden">
        <!-- Backdrop Blur -->
        <div
          class="absolute inset-0 bg-[#0F2A44]/60 backdrop-blur-sm transition-opacity duration-300"
          @click="mobileDrawerOpen = false"
        ></div>

        <div class="fixed inset-y-0 right-0 max-w-full flex pl-8">
          <div class="w-screen max-w-xs bg-white text-[#0F2A44] h-full flex flex-col shadow-2xl border-l border-slate-100 overflow-y-auto" data-lenis-prevent>
            <!-- Drawer Header with Logo & Name -->
            <div class="flex items-center justify-between p-5 border-b border-slate-100 flex-shrink-0 bg-white sticky top-0 z-10">
              <router-link to="/" class="flex items-center gap-2.5 min-w-0" @click="mobileDrawerOpen = false">
                <img
                  src="/toplinkers-logo-sm.png"
                  alt="Top Linkers"
                  width="129"
                  height="168"
                  decoding="async"
                  class="h-10 w-auto object-contain flex-shrink-0"
                />
                <div class="flex flex-col min-w-0">
                  <span class="text-base font-black leading-tight truncate">
                    <span class="text-[#E53935]">Top</span> <span class="text-black">Linkers</span>
                  </span>
                  <span class="text-[8px] font-bold uppercase tracking-wider text-slate-500 leading-none mt-0.5 truncate">
                    Real Estate &bull; Construction &bull; Solar
                  </span>
                </div>
              </router-link>

              <button
                type="button"
                class="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close menu"
                @click="mobileDrawerOpen = false"
              >
                <XMarkIcon class="w-6 h-6" />
              </button>
            </div>

            <!-- Drawer Navigation Links -->
            <div class="p-5 flex-1 flex flex-col justify-between space-y-6">
              <nav class="flex flex-col space-y-1 text-sm font-semibold">
                <router-link
                  to="/"
                  class="px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-[#16B4E8] hover:bg-slate-50 flex items-center justify-between transition-colors"
                  :class="{ 'text-[#16B4E8] bg-slate-50 font-bold': $route.path === '/' }"
                  @click="mobileDrawerOpen = false"
                >
                  <span>Home</span>
                  <span class="text-xs text-slate-400">&rsaquo;</span>
                </router-link>

                <router-link
                  to="/about"
                  class="px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-[#16B4E8] hover:bg-slate-50 flex items-center justify-between transition-colors"
                  :class="{ 'text-[#16B4E8] bg-slate-50 font-bold': $route.path === '/about' }"
                  @click="mobileDrawerOpen = false"
                >
                  <span>About</span>
                  <span class="text-xs text-slate-400">&rsaquo;</span>
                </router-link>

                <!-- Services Collapsible Accordion -->
                <div class="rounded-xl border border-slate-100 overflow-hidden bg-slate-50/60">
                  <div
                    class="px-3.5 py-2.5 flex items-center justify-between cursor-pointer select-none text-slate-800 hover:text-[#16B4E8] transition-colors"
                    @click="mobileServicesOpen = !mobileServicesOpen"
                  >
                    <span class="font-bold flex items-center gap-2">
                      <span class="text-[#16B4E8]">&bull;</span>
                      <span>Services</span>
                    </span>
                    <ChevronDownIcon
                      class="w-4 h-4 text-slate-400 transition-transform duration-200"
                      :class="{ 'rotate-180 text-[#16B4E8]': mobileServicesOpen }"
                    />
                  </div>

                  <div v-show="mobileServicesOpen" class="px-3 pb-2.5 pt-1 space-y-1 text-xs border-t border-slate-100 bg-white">
                    <router-link
                      to="/services#plot"
                      class="block px-3 py-2 rounded-lg text-slate-700 hover:text-[#16B4E8] hover:bg-slate-50 font-medium transition-colors"
                      @click="mobileDrawerOpen = false"
                    >
                      Plot Services (TopCity, PECHS, CDA)
                    </router-link>
                    <router-link
                      to="/services#flats"
                      class="block px-3 py-2 rounded-lg text-slate-700 hover:text-[#16B4E8] hover:bg-slate-50 font-medium transition-colors"
                      @click="mobileDrawerOpen = false"
                    >
                      PHA &amp; Flats (I-12 &amp; I-16)
                    </router-link>
                    <router-link
                      to="/services#construction"
                      class="block px-3 py-2 rounded-lg text-slate-700 hover:text-[#16B4E8] hover:bg-slate-50 font-medium transition-colors"
                      @click="mobileDrawerOpen = false"
                    >
                      Construction &amp; Turnkey
                    </router-link>
                    <router-link
                      to="/services#solar"
                      class="block px-3 py-2 rounded-lg text-slate-700 hover:text-[#16B4E8] hover:bg-slate-50 font-medium transition-colors"
                      @click="mobileDrawerOpen = false"
                    >
                      Solar Net Metering Solutions
                    </router-link>
                    <router-link
                      to="/hr-sukh"
                      class="block px-3 py-2 rounded-lg text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors border-t border-slate-100 mt-1 pt-2"
                      @click="mobileDrawerOpen = false"
                    >
                      Harsukh Residencies (Nathia Gali) &rarr;
                    </router-link>
                  </div>
                </div>

                <router-link
                  to="/listings"
                  class="px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-[#16B4E8] hover:bg-slate-50 flex items-center justify-between transition-colors"
                  :class="{ 'text-[#16B4E8] bg-slate-50 font-bold': $route.path === '/listings' }"
                  @click="mobileDrawerOpen = false"
                >
                  <span>Listings &amp; Map</span>
                  <span class="text-xs text-slate-400">&rsaquo;</span>
                </router-link>

                <router-link
                  to="/compare"
                  class="px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-[#16B4E8] hover:bg-slate-50 flex items-center justify-between transition-colors"
                  :class="{ 'text-[#16B4E8] bg-slate-50 font-bold': $route.path === '/compare' }"
                  @click="mobileDrawerOpen = false"
                >
                  <span>Compare Flats &amp; Plots</span>
                  <span class="text-xs text-slate-400">&rsaquo;</span>
                </router-link>

                <router-link
                  to="/team"
                  class="px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-[#16B4E8] hover:bg-slate-50 flex items-center justify-between transition-colors"
                  :class="{ 'text-[#16B4E8] bg-slate-50 font-bold': $route.path === '/team' }"
                  @click="mobileDrawerOpen = false"
                >
                  <span>Our Team</span>
                  <span class="text-xs text-slate-400">&rsaquo;</span>
                </router-link>

                <router-link
                  to="/blog"
                  class="px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-[#16B4E8] hover:bg-slate-50 flex items-center justify-between transition-colors"
                  :class="{ 'text-[#16B4E8] bg-slate-50 font-bold': $route.path.startsWith('/blog') }"
                  @click="mobileDrawerOpen = false"
                >
                  <span>Market Blog &amp; Insights</span>
                  <span class="text-xs text-slate-400">&rsaquo;</span>
                </router-link>
              </nav>

              <!-- Drawer Bottom WhatsApp Action -->
              <div class="pt-4 border-t border-slate-100 flex-shrink-0">
                <a
                  href="https://wa.me/923349522157"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <svg class="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span class="tracking-wide">WhatsApp: 0334-9522157</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '../../stores/ui'
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const ui = useUiStore()

const isScrolled = ref(false)
const mobileDrawerOpen = ref(false)
const mobileServicesOpen = ref(true)

const isHomePage = computed(() => route.path === '/')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>