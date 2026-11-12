<template>
  <div class="blog-post-page pt-28 sm:pt-32 md:pt-36 pb-16 bg-[#F6F8FA] min-h-screen">
    <div class="max-w-[1000px] mx-auto px-4">
      <!-- Breadcrumb -->
      <nav class="flex items-center text-xs text-gray-500 gap-2 mb-6" aria-label="Breadcrumb">
        <router-link to="/" class="hover:text-[#16B4E8]">Home</router-link>
        <span>/</span>
        <router-link to="/blog" class="hover:text-[#16B4E8]">Blog</router-link>
        <span>/</span>
        <span class="text-gray-900 font-semibold truncate">{{ post ? post.title : 'Post Details' }}</span>
      </nav>

      <div v-if="loading" class="bg-white rounded-xl p-8 shadow-card space-y-4">
        <div class="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div class="h-64 bg-gray-200 rounded animate-pulse w-full"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
      </div>

      <div v-else-if="!post" class="bg-white rounded-xl p-12 text-center shadow-card border border-gray-100">
        <h2 class="text-xl font-bold text-[#0F2A44] mb-2">Article Not Found</h2>
        <p class="text-xs text-gray-500 mb-6">The blog post you requested could not be located.</p>
        <router-link
          to="/blog"
          class="inline-block px-5 py-2.5 bg-[#16B4E8] text-white text-xs font-bold uppercase rounded"
        >
          Back to Blog List
        </router-link>
      </div>

      <article v-else class="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100">
        <!-- Featured Image -->
        <div class="relative h-[340px] sm:h-[420px] md:h-[460px] w-full overflow-hidden bg-gray-900">
          <img
            :src="post.image"
            :alt="post.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
          
          <div class="absolute bottom-6 left-6 right-6 text-white space-y-2.5">
            <span class="inline-block bg-[#16B4E8] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded shadow">
              {{ post.category }}
            </span>
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {{ post.title }}
            </h1>
            <div class="flex items-center gap-4 text-xs text-gray-300 pt-2 flex-wrap">
              <span class="flex items-center gap-1.5 font-bold text-white">
                <img
                  :src="post.authorPhoto"
                  :alt="post.author"
                  loading="lazy"
                  decoding="async"
                  width="24"
                  height="24"
                  class="w-6 h-6 rounded-full object-cover border border-white/40"
                />
                {{ post.author }}
              </span>
              <span>&bull;</span>
              <span>{{ post.date }}</span>
              <span>&bull;</span>
              <span>{{ post.readTime }}</span>
            </div>
          </div>
        </div>

        <!-- Post Content Body -->
        <div class="p-6 sm:p-10 space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
          <p class="text-base sm:text-lg font-medium text-[#0F2A44] leading-relaxed border-l-4 border-[#16B4E8] pl-4 italic bg-blue-50/40 py-2 rounded-r-lg">
            {{ post.summary }}
          </p>

          <div class="space-y-4 font-normal text-gray-600">
            <p class="text-gray-800 leading-relaxed font-normal">
              {{ post.content }}
            </p>

            <p>
              Navigating the twin cities real estate sector requires up-to-date verifiable market intelligence. At TopLinkers, our on-ground advisory team monitors policy directives from the Capital Development Authority (CDA), Rawalpindi Development Authority (RDA), and Federal Government Employees Housing Authority (FGEHA) to guide buyers and investors towards secure equity appreciation.
            </p>

            <h3 class="text-xl font-bold text-[#0F2A44] pt-4">Key Investment Highlights & On-Ground Reality</h3>
            <p>
              Whether considering high-yield commercial floors in Gulberg Islamabad, residential plots in Faisal Town Phase 2, or turnkey apartments like the PHA I-12 and I-16 developments, analyzing utility availability, possession timelines, and developer track records is essential.
            </p>

            <div class="bg-[#F6F8FA] p-6 rounded-xl border border-gray-200 space-y-3">
              <h4 class="text-sm font-bold text-[#0F2A44] uppercase tracking-wider">TopLinkers Verified Advisory Points:</h4>
              <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-600">
                <li>Check NOC clearance directly with CDA/RDA before depositing down payments.</li>
                <li>Compare payment schedules with actual development milestones achieved on site.</li>
                <li>For high-consumption properties, factor in 10kW to 50kW solar net metering payback windows.</li>
                <li>Verify transfer fees, registry costs, and FBR withholding tax brackets under active budget laws.</li>
              </ul>
            </div>

            <!-- Direct Advisory Callout Box -->
            <div class="mt-8 p-6 bg-gradient-to-r from-[#0F2A44] to-[#143452] text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
              <div>
                <h4 class="text-base font-bold text-white mb-1">Need Verified Advice on This Topic?</h4>
                <p class="text-xs text-gray-300">
                  Speak directly with Syed Usman Hammad and TopLinkers consultants for personalized guidance.
                </p>
              </div>
              <a
                :href="`https://wa.me/923349522157?text=${encodeURIComponent(`Hello TopLinkers, I was reading your article '${post.title}' and would like to ask a few questions.`)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="px-5 py-2.5 bg-[#25D366] hover:bg-[#1fb355] text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 flex-shrink-0 shadow"
              >
                <span>WhatsApp Advisory Desk</span>
              </a>
            </div>
          </div>

          <!-- Tags & Flyer Button -->
          <div class="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-bold text-gray-400 uppercase">Tags:</span>
              <span class="text-xs px-2.5 py-1 bg-gray-100 rounded text-gray-600 font-medium">Islamabad Real Estate</span>
              <span class="text-xs px-2.5 py-1 bg-gray-100 rounded text-gray-600 font-medium">TopLinkers Advisory</span>
              <span class="text-xs px-2.5 py-1 bg-gray-100 rounded text-gray-600 font-medium">{{ post.category }}</span>
            </div>

            <button
              type="button"
              class="px-4 py-2 bg-[#0F2A44] text-white text-xs font-bold uppercase rounded flex items-center gap-2 hover:bg-[#16B4E8] transition-colors"
              @click="ui.openFlyerModal"
            >
              <span>View Project Flyer & Floor Plans</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>

          <!-- Author Bio Box -->
          <div class="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              :src="post.authorPhoto"
              :alt="post.author"
              loading="lazy"
              decoding="async"
              width="64"
              height="64"
              class="w-16 h-16 rounded-full object-cover border-2 border-[#16B4E8] flex-shrink-0"
            />
            <div class="text-center sm:text-left">
              <h4 class="text-sm font-bold text-[#0F2A44]">{{ post.author }}</h4>
              <p class="text-xs text-[#16B4E8] font-semibold mb-1">Senior Property Consultant @ TopLinkers</p>
              <p class="text-xs text-gray-500">
                Specializing in CDA sector plot transfers, PHA flat allocations, and commercial high-rises across Gulberg and Faisal Town Phase 2.
              </p>
            </div>
          </div>
        </div>
      </article>

      <!-- Related Articles Section -->
      <div v-if="relatedPosts.length > 0" class="mt-12 space-y-6">
        <h3 class="text-lg font-bold text-[#0F2A44]">Related Market Guides</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <router-link
            v-for="rel in relatedPosts"
            :key="rel.id"
            :to="`/blog/${rel.slug}`"
            class="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between group"
          >
            <div>
              <div class="text-[10px] font-bold text-[#16B4E8] uppercase tracking-wider mb-1">
                {{ rel.category }}
              </div>
              <h4 class="text-xs font-bold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors leading-snug line-clamp-2">
                {{ rel.title }}
              </h4>
            </div>
            <div class="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100 flex justify-between items-center">
              <span>{{ rel.readTime }}</span>
              <span class="text-[#16B4E8] font-bold">&rarr;</span>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Back to all posts link -->
      <div class="mt-10 text-center">
        <router-link
          to="/blog"
          class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2A44] hover:text-[#16B4E8] transition-colors"
        >
          &larr; Back to all Market Updates
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../services/api'
import { useUiStore } from '../stores/ui'

const route = useRoute()
const ui = useUiStore()
const post = ref(null)
const allPosts = ref([])
const loading = ref(true)

const relatedPosts = computed(() => {
  if (!post.value) return []
  return allPosts.value.filter(p => p.id !== post.value.id).slice(0, 3)
})

const loadPost = async () => {
  loading.value = true
  const slug = route.params.slug
  allPosts.value = await api.getPosts()
  post.value = allPosts.value.find(p => p.slug === slug) || allPosts.value[0] || null
  if (post.value) {
    document.title = `${post.value.title} | TopLinkers Blog`

    // Inject BlogPosting Schema.org JSON-LD for Google Rich Snippets
    const existing = document.getElementById('seo-blogpost-jsonld')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.id = 'seo-blogpost-jsonld'
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.value.title,
      description: post.value.summary,
      image: post.value.image,
      datePublished: post.value.date,
      author: {
        '@type': 'Person',
        name: post.value.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Top Linkers Real Estate, Construction & Solar',
        logo: {
          '@type': 'ImageObject',
          url: 'https://toplinkers.com/toplinkers-logo.jpg'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://toplinkers.com/blog/${post.value.slug}`
      }
    })
    document.head.appendChild(script)
  }
  loading.value = false
}

onMounted(loadPost)
watch(() => route.params.slug, loadPost)

onUnmounted(() => {
  const existing = document.getElementById('seo-blogpost-jsonld')
  if (existing) existing.remove()
})
</script>