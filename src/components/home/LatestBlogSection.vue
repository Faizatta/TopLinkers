<template>
  <section class="py-16 bg-[#F6F8FA] border-t border-gray-200/60">
    <div class="max-w-[1280px] mx-auto px-4">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#16B4E8]/10 text-[#16B4E8] font-extrabold text-[10px] sm:text-xs uppercase tracking-widest rounded-full mb-3">
            <span>Market Intelligence &amp; Insights</span>
          </div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F2A44] tracking-tight">
            Latest Real Estate <span class="text-[#16B4E8]">Articles &amp; Guides</span>
          </h2>
          <p class="text-xs sm:text-sm text-gray-500 font-medium mt-1.5 max-w-2xl">
            In-depth analysis on CDA plot balloting, PHA flat payment schedules, turnkey building material rates, and Tier-1 solar net metering in Islamabad.
          </p>
        </div>

        <router-link
          to="/blog"
          class="inline-flex items-center gap-2 self-start md:self-end px-5 py-2.5 bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm flex-shrink-0"
        >
          <span>View All Articles</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>

      <!-- 3 Featured Blog Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <article
          v-for="post in featuredPosts"
          :key="post.id"
          class="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
        >
          <!-- Image Container -->
          <div class="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
            <img
              :src="post.image"
              :alt="post.title"
              loading="lazy"
              decoding="async"
              width="400"
              height="208"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <span class="absolute top-3 left-3 bg-[#0F2A44]/90 backdrop-blur-sm text-[#16B4E8] border border-white/10 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
              {{ post.category }}
            </span>
            <span class="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
              {{ post.readTime }}
            </span>
          </div>

          <!-- Card Content Body -->
          <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="text-[11px] font-semibold text-gray-400 mb-2">
                {{ post.date }}
              </div>

              <h3 class="text-base font-bold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors leading-snug mb-2.5">
                <router-link :to="`/blog/${post.slug}`" class="focus:outline-none">
                  {{ post.title }}
                </router-link>
              </h3>

              <p class="text-xs text-gray-500 line-clamp-3 leading-relaxed font-normal mb-4">
                {{ post.summary }}
              </p>
            </div>

            <!-- Footer: Author & Read Link -->
            <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  :src="post.authorPhoto"
                  :alt="post.author"
                  class="w-7 h-7 rounded-full object-cover border border-gray-200"
                />
                <span class="text-xs font-bold text-[#0F2A44]">{{ post.author }}</span>
              </div>

              <router-link
                :to="`/blog/${post.slug}`"
                class="inline-flex items-center gap-1 text-xs font-bold text-[#16B4E8] group-hover:translate-x-0.5 transition-transform"
              >
                <span>Read Guide</span>
                <span>&rarr;</span>
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import postsData from '../../data/posts.json'

const featuredPosts = computed(() => {
  return postsData.slice(0, 3)
})
</script>
