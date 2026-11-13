<template>
  <div class="blog-page pt-28 sm:pt-32 md:pt-36 pb-16 bg-[#F6F8FA] min-h-screen">
    <div class="max-w-[1280px] mx-auto px-4">
      <!-- Header -->
      <div class="mb-12 text-center">
        <SectionHeading
          tag="h1"
          eyebrow="PROPERTY INSIGHTS & REPORTS"
          title="TopLinkers Real Estate Blog & Market Updates"
          highlight="Market Updates"
          subtitle="Essential intelligence on CDA plot ballots, PHA flat payment schedules, and construction rates in Islamabad."
          align="center"
        />
      </div>

      <!-- Main Layout: 2/3 Blog Grid + 1/3 Sidebar -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left: Blog Posts Grid (8 cols) -->
        <div class="lg:col-span-8 space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article
              v-for="(post, index) in filteredPosts"
              :key="post.id"
              class="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              <div class="relative h-56 overflow-hidden bg-gray-100">
                <img
                  :src="post.image"
                  :srcset="responsiveSrcset(post.image, [400, 600, 900])"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px"
                  :alt="post.title"
                  :loading="index === 0 ? 'eager' : 'lazy'"
                  :fetchpriority="index === 0 ? 'high' : 'auto'"
                  decoding="async"
                  width="600"
                  height="224"
                  class="w-full h-full object-cover card-hover-zoom"
                />
                <div class="absolute top-3 left-3 bg-[#16B4E8] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                  {{ post.category }}
                </div>
              </div>

              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center text-[11px] text-gray-400 gap-2 mb-2">
                    <span>{{ post.date }}</span>
                    <span>&bull;</span>
                    <span>{{ post.readTime }}</span>
                  </div>

                  <h2 class="text-base font-bold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors leading-snug mb-3">
                    <router-link :to="`/blog/${post.slug}`">
                      {{ post.title }}
                    </router-link>
                  </h2>

                  <p class="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4 font-normal">
                    {{ post.summary }}
                  </p>
                </div>

                <div class="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <img :src="post.authorPhoto" :alt="post.author" class="w-6 h-6 rounded-full object-cover" />
                    <span class="font-bold text-[#0F2A44] text-[11px]">{{ post.author }}</span>
                  </div>

                  <router-link
                    :to="`/blog/${post.slug}`"
                    class="font-black text-[#16B4E8] hover:underline uppercase text-[11px] tracking-wider"
                  >
                    Read More &rarr;
                  </router-link>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Right: Blog Sidebar (4 cols) -->
        <aside class="lg:col-span-4 space-y-6">
          <!-- Search Widget -->
          <div class="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h2 class="text-xs font-black uppercase tracking-wider text-[#0F2A44] mb-3">Search Blog</h2>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search articles by keyword..."
                class="w-full text-xs p-2.5 pl-3 pr-8 rounded border border-gray-200 focus:outline-none focus:border-[#16B4E8]"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>
          </div>

          <!-- Categories Widget -->
          <div class="bg-white rounded-xl p-5 shadow-card border border-gray-100">
            <h2 class="text-xs font-black uppercase tracking-wider text-[#0F2A44] mb-3">Categories</h2>
            <ul class="space-y-2 text-xs">
              <li
                v-for="cat in categories"
                :key="cat"
                @click="selectedCategory = (selectedCategory === cat ? '' : cat)"
                :class="[
                  'flex items-center justify-between p-2 rounded cursor-pointer transition-colors',
                  selectedCategory === cat ? 'bg-[#16B4E8] text-white font-bold' : 'text-gray-600 hover:bg-[#F6F8FA]'
                ]"
              >
                <span>{{ cat }}</span>
                <span class="text-[10px]">&rsaquo;</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SectionHeading from '../components/ui/SectionHeading.vue'
import { api } from '../services/api'
import { useUiStore } from '../stores/ui'
import { responsiveSrcset } from '../utils/images'

const ui = useUiStore()
// Bundled articles render immediately; a live backend (when reachable) refreshes them.
// Waiting for the network first left the list empty, so the sidebar jumped down once
// the posts arrived (a large layout shift).
const posts = ref(api.getLocalPosts())
const searchQuery = ref('')
const selectedCategory = ref('')

const categories = [
  'PHA Housing',
  'Market Trends',
  'Solar Solutions',
  'Commercial Realty',
  'Affordable Plots',
  'Construction'
]

const filteredPosts = computed(() => {
  return posts.value.filter(p => {
    const matchCat = !selectedCategory.value || p.category === selectedCategory.value
    const matchQ = !searchQuery.value.trim() ||
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCat && matchQ
  })
})

onMounted(async () => {
  document.title = 'Real Estate Blog & Insights | TopLinkers Pakistan'
  const livePosts = await api.getLivePosts()
  if (livePosts) posts.value = livePosts
})
</script>
