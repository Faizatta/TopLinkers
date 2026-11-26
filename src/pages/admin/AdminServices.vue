<template>
  <div class="space-y-6">
    <AdminPageHeader
      title="Services & Page CMS"
      subtitle="Manage every service division, page section, gallery image, CTA, and SEO setting on /services."
      live-url="/services"
      live-label="Preview Live /services"
    >
      <template #actions>
        <button
          type="button"
          @click="openCreateService"
          class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-2xs"
        >
          + Add New Service
        </button>
      </template>
    </AdminPageHeader>

    <!-- Dashboard Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <AdminStatCard label="Total Services" :value="stats.total" tone="slate" />
      <AdminStatCard label="Published" :value="stats.published" tone="emerald" />
      <AdminStatCard label="Draft" :value="stats.draft" tone="amber" />
      <AdminStatCard label="Disabled" :value="stats.disabled" tone="rose" />
      <AdminStatCard
        label="Active Sections"
        :value="`${stats.sections_enabled} / ${stats.sections_total}`"
        tone="sky"
        class="col-span-2 sm:col-span-1"
      />
    </div>

    <!-- Error / Loading Banner -->
    <div v-if="errorMsg" class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between">
      <span>{{ errorMsg }}</span>
      <button type="button" @click="loadAll" class="underline font-bold">Retry</button>
    </div>

    <!-- Module Sub-Tabs -->
    <div class="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 w-full sm:w-fit overflow-x-auto">
      <button
        type="button"
        @click="activeTab = 'services'"
        :class="activeTab === 'services' ? 'bg-[#0F2A44] text-white' : 'text-slate-600 hover:bg-slate-50'"
        class="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition"
      >
        Services ({{ services.length }})
      </button>
      <button
        type="button"
        @click="activeTab = 'sections'"
        :class="activeTab === 'sections' ? 'bg-[#0F2A44] text-white' : 'text-slate-600 hover:bg-slate-50'"
        class="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition"
      >
        Page Sections ({{ sections.length }})
      </button>
      <button
        type="button"
        @click="activeTab = 'seo'"
        :class="activeTab === 'seo' ? 'bg-[#0F2A44] text-white' : 'text-slate-600 hover:bg-slate-50'"
        class="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition"
      >
        Page SEO Settings
      </button>
    </div>

    <!-- ===================================================== -->
    <!-- TAB 1: SERVICES LISTING                               -->
    <!-- ===================================================== -->
    <div v-if="activeTab === 'services'" class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div class="flex flex-col sm:flex-row gap-2.5 flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search services by title, location..."
            class="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 w-full sm:w-64 focus:outline-none focus:border-[#16B4E8]"
          />
          <select v-model="statusFilter" class="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white">
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="disabled">Disabled</option>
          </select>
          <select v-model="categoryFilter" class="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white">
            <option value="all">All Categories</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
        </div>
        <div class="text-xs text-slate-500 font-medium">
          Showing {{ paginatedServices.length }} of {{ filteredServices.length }}
        </div>
      </div>

      <div v-if="loading" class="p-10 text-center text-xs text-slate-500">Loading services...</div>
      <div v-else-if="paginatedServices.length === 0" class="p-10 text-center text-xs text-slate-500">
        No services match your filters.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <th class="py-3 px-4">Order</th>
              <th class="py-3 px-4">Service</th>
              <th class="py-3 px-4">Category</th>
              <th class="py-3 px-4">Features / Gallery</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="(svc, idx) in paginatedServices" :key="svc.id" class="hover:bg-slate-50/70">
              <td class="py-3 px-4 whitespace-nowrap">
                <div class="flex items-center gap-1">
                  <button type="button" @click="moveService(idx, -1)" :disabled="idx === 0" class="p-1 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-100" title="Move Up">&uarr;</button>
                  <button type="button" @click="moveService(idx, 1)" :disabled="idx === paginatedServices.length - 1" class="p-1 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-100" title="Move Down">&darr;</button>
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <img
                    v-if="svc.main_image"
                    :src="svc.main_image"
                    :alt="svc.main_image_alt || svc.title"
                    class="w-12 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0 bg-slate-100"
                  />
                  <div class="min-w-0">
                    <div class="font-extrabold text-[#0F2A44] truncate max-w-xs">{{ svc.title }}</div>
                    <div class="text-[11px] text-slate-400 truncate max-w-xs">/{{ svc.slug }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4 text-slate-600 font-semibold whitespace-nowrap">
                {{ svc.category_name || 'General' }}
              </td>
              <td class="py-3 px-4 text-slate-500 whitespace-nowrap">
                {{ (svc.features || []).length }} features &bull; {{ (svc.gallery || []).length }} photos
              </td>
              <td class="py-3 px-4 whitespace-nowrap">
                <select
                  :value="svc.status"
                  @change="quickStatusChange(svc, $event.target.value)"
                  class="px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer"
                  :class="{
                    'bg-emerald-50 text-emerald-700 border-emerald-200': svc.status === 'published',
                    'bg-amber-50 text-amber-700 border-amber-200': svc.status === 'draft',
                    'bg-rose-50 text-rose-700 border-rose-200': svc.status === 'disabled'
                  }"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="disabled">Disabled</option>
                </select>
              </td>
              <td class="py-3 px-4 text-right whitespace-nowrap space-x-1.5">
                <button type="button" @click="openEditService(svc)" class="px-2.5 py-1.5 rounded-lg bg-[#0F2A44] hover:bg-[#16B4E8] text-white font-bold transition">Edit</button>
                <button type="button" @click="handleDuplicate(svc)" class="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition">Duplicate</button>
                <a :href="svc.cta_link || '/services'" target="_blank" class="inline-block px-2.5 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-[#0F2A44] font-bold transition">Preview</a>
                <button type="button" @click="handleDeleteService(svc)" class="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="p-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <button type="button" @click="currentPage--" :disabled="currentPage <= 1" class="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 font-bold">Previous</button>
        <span class="font-semibold text-slate-600">Page {{ currentPage }} of {{ totalPages }}</span>
        <button type="button" @click="currentPage++" :disabled="currentPage >= totalPages" class="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 font-bold">Next</button>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- TAB 2: PAGE SECTIONS MANAGER                          -->
    <!-- ===================================================== -->
    <div v-if="activeTab === 'sections'" class="space-y-4">
      <div class="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
        <div>
          <h2 class="text-sm font-extrabold text-[#0F2A44]">Page Sections &amp; Content Blocks</h2>
          <p class="text-xs text-slate-500">Reorder, enable/disable, or edit Hero, Intro, Spotlight, Why Choose Us, Stats, Process Steps, Contact CTA, or custom banners.</p>
        </div>
        <button type="button" @click="openCreateSection" class="px-3.5 py-2 rounded-xl bg-[#16B4E8] text-[#0F2A44] text-xs font-black uppercase tracking-wider">
          + Add Section
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="(sec, idx) in sections"
          :key="sec.id"
          class="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
        >
          <div class="flex items-start gap-3 min-w-0">
            <div class="flex flex-col gap-1">
              <button type="button" @click="moveSection(idx, -1)" :disabled="idx === 0" class="px-1.5 py-0.5 text-[10px] rounded border border-slate-200 disabled:opacity-30">&uarr;</button>
              <button type="button" @click="moveSection(idx, 1)" :disabled="idx === sections.length - 1" class="px-1.5 py-0.5 text-[10px] rounded border border-slate-200 disabled:opacity-30">&darr;</button>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-black uppercase text-slate-600">{{ sec.section_type }}</span>
                <span class="text-xs font-extrabold text-[#0F2A44] truncate">{{ sec.title || sec.section_key }}</span>
                <span class="text-[10px] font-mono text-slate-400">({{ sec.section_key }})</span>
              </div>
              <p class="text-xs text-slate-500 mt-1 line-clamp-1">{{ sec.subtitle || sec.description }}</p>
              <div class="text-[11px] text-[#16B4E8] font-bold mt-1">{{ (sec.blocks || []).length }} content blocks</div>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-wrap flex-shrink-0">
            <button
              type="button"
              @click="toggleSectionEnabled(sec)"
              :class="sec.is_enabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'"
              class="px-2.5 py-1.5 rounded-lg text-xs font-bold border"
            >
              {{ sec.is_enabled ? 'Enabled' : 'Disabled' }}
            </button>
            <button type="button" @click="openEditSection(sec)" class="px-3 py-1.5 rounded-lg bg-[#0F2A44] text-white text-xs font-bold">Edit Section</button>
            <button type="button" @click="openBlocksModal(sec)" class="px-3 py-1.5 rounded-lg bg-cyan-50 text-[#0F2A44] border border-cyan-200 text-xs font-bold">
              Blocks ({{ (sec.blocks || []).length }})
            </button>
            <button
              v-if="!coreSectionKeys.includes(sec.section_key)"
              type="button"
              @click="handleDeleteSection(sec)"
              class="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- TAB 3: PAGE SEO SETTINGS                              -->
    <!-- ===================================================== -->
    <div v-if="activeTab === 'seo'" class="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 max-w-3xl">
      <div>
        <h2 class="text-base font-extrabold text-[#0F2A44]">/services Page SEO &amp; Open Graph</h2>
        <p class="text-xs text-slate-500">Controls document title, meta description, canonical URL, and social sharing cards.</p>
      </div>

      <div class="grid grid-cols-1 gap-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 mb-1">SEO Title</label>
          <input v-model="pageSeoForm.seo_title" type="text" class="w-full px-3.5 py-2 rounded-xl border border-slate-200" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Meta Description</label>
          <textarea v-model="pageSeoForm.meta_description" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></textarea>
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Canonical URL</label>
          <input v-model="pageSeoForm.canonical_url" type="text" class="w-full px-3.5 py-2 rounded-xl border border-slate-200" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">OG Title</label>
            <input v-model="pageSeoForm.og_title" type="text" class="w-full px-3.5 py-2 rounded-xl border border-slate-200" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">OG Image URL</label>
            <div class="flex gap-2">
              <input v-model="pageSeoForm.og_image" type="text" class="flex-1 px-3 py-2 rounded-xl border border-slate-200" />
              <label class="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer whitespace-nowrap">
                Upload
                <input type="file" accept="image/*" class="hidden" @change="uploadSingleImage($event, (url) => pageSeoForm.og_image = url)" />
              </label>
            </div>
          </div>
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">OG Description</label>
          <textarea v-model="pageSeoForm.og_description" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-slate-200"></textarea>
        </div>
      </div>

      <!-- SERP Preview -->
      <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
        <div class="text-[10px] font-bold uppercase text-slate-400">Google Search Preview</div>
        <div class="text-sm font-bold text-blue-700 truncate">{{ pageSeoForm.seo_title || 'Services | TopLinkers' }}</div>
        <div class="text-[11px] text-emerald-700 truncate">{{ pageSeoForm.canonical_url || 'https://toplinkersgroup.com/services' }}</div>
        <div class="text-xs text-slate-600 line-clamp-2">{{ pageSeoForm.meta_description }}</div>
      </div>

      <div class="flex justify-end">
        <button type="button" @click="savePageSeo" :disabled="saving" class="px-5 py-2.5 rounded-xl bg-[#0F2A44] hover:bg-[#16B4E8] text-white text-xs font-black uppercase tracking-wider">
          {{ saving ? 'Saving...' : 'Save Page SEO' }}
        </button>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- MODAL: CREATE / EDIT SERVICE                          -->
    <!-- ===================================================== -->
    <div v-if="serviceModalOpen" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto" @click.self="serviceModalOpen = false">
      <div class="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        <div class="px-6 py-4 bg-[#0F2A44] text-white flex items-center justify-between flex-shrink-0">
          <div>
            <h3 class="text-base font-black">{{ editingServiceId ? 'Edit Service' : 'Create New Service' }}</h3>
            <p class="text-[11px] text-slate-300">Complete service details, media, features, CTA, and SEO.</p>
          </div>
          <button type="button" @click="serviceModalOpen = false" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-lg">&times;</button>
        </div>

        <!-- Modal Sub-Tabs -->
        <div class="px-6 pt-3 pb-2 border-b border-slate-100 flex items-center gap-2 overflow-x-auto flex-shrink-0 bg-slate-50">
          <button
            v-for="t in ['basic', 'media', 'features', 'cta', 'seo']"
            :key="t"
            type="button"
            @click="serviceModalTab = t"
            :class="serviceModalTab === t ? 'bg-[#0F2A44] text-white' : 'bg-white text-slate-600 border border-slate-200'"
            class="px-3 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap"
          >
            {{ t === 'cta' ? 'CTA & Links' : t }}
          </button>
        </div>

        <div class="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          <!-- Subtab: Basic & Rich Description -->
          <template v-if="serviceModalTab === 'basic'">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Service Title *</label>
                <input v-model="svcForm.title" type="text" required class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Slug (URL)</label>
                <input v-model="svcForm.slug" type="text" placeholder="auto-generated-from-title" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Category</label>
                <select v-model="svcForm.category_id" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
                  <option :value="null">None</option>
                  <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Status</label>
                  <select v-model="svcForm.status" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">Display Order</label>
                  <input v-model.number="svcForm.display_order" type="number" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
                </div>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Short Description</label>
              <textarea v-model="svcForm.short_description" rows="2" class="w-full px-3 py-2 rounded-xl border border-slate-200"></textarea>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="font-bold text-slate-700">Full Description (Rich Text)</label>
                <div class="flex items-center gap-1">
                  <button type="button" @click="applyRichFormat('bold')" class="px-2 py-0.5 rounded border border-slate-200 font-bold">B</button>
                  <button type="button" @click="applyRichFormat('italic')" class="px-2 py-0.5 rounded border border-slate-200 italic">I</button>
                  <button type="button" @click="applyRichFormat('insertUnorderedList')" class="px-2 py-0.5 rounded border border-slate-200">List</button>
                  <button type="button" @click="insertRichLink" class="px-2 py-0.5 rounded border border-slate-200">Link</button>
                </div>
              </div>
              <div
                ref="richEditorRef"
                contenteditable="true"
                @input="svcForm.full_description = $event.target.innerHTML"
                class="min-h-[130px] p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#16B4E8] prose prose-sm max-w-none"
                v-html="richEditorInitialHtml"
              ></div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Location Details</label>
                <input v-model="svcForm.location_details" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Pricing Information (Optional)</label>
                <input v-model="svcForm.pricing_info" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
            </div>
          </template>

          <!-- Subtab: Media & Gallery -->
          <template v-if="serviceModalTab === 'media'">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div class="font-extrabold text-[#0F2A44]">Main Service Image</div>
              <div class="flex flex-col sm:flex-row gap-4 items-start">
                <img v-if="svcForm.main_image" :src="svcForm.main_image" :alt="svcForm.main_image_alt" class="w-36 h-24 rounded-xl object-cover border border-slate-200 bg-white" />
                <div class="flex-1 space-y-2 w-full">
                  <div class="flex gap-2">
                    <input v-model="svcForm.main_image" type="text" placeholder="/uploads/services/... or /images/..." class="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white" />
                    <label class="px-3 py-2 rounded-xl bg-[#0F2A44] text-white font-bold cursor-pointer whitespace-nowrap">
                      Upload Image
                      <input type="file" accept="image/*" class="hidden" @change="uploadSingleImage($event, (url) => svcForm.main_image = url)" />
                    </label>
                    <button v-if="svcForm.main_image" type="button" @click="removeMainImage" class="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 font-bold">Delete</button>
                  </div>
                  <input v-model="svcForm.main_image_alt" type="text" placeholder="SEO Alt Text for Main Image" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white" />
                </div>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-extrabold text-[#0F2A44]">Service Gallery (Drag &amp; Drop to Reorder)</div>
                  <div class="text-[11px] text-slate-500">Max 5MB per image. Supports multiple uploads.</div>
                </div>
                <label class="px-3.5 py-2 rounded-xl bg-[#16B4E8] text-[#0F2A44] font-black cursor-pointer">
                  + Upload Gallery Images
                  <input type="file" accept="image/*" multiple class="hidden" @change="uploadGalleryImages" />
                </label>
              </div>

              <div v-if="svcForm.gallery.length === 0" class="text-slate-400 text-center py-4">No gallery images yet.</div>
              <div v-else class="space-y-2">
                <div
                  v-for="(g, idx) in svcForm.gallery"
                  :key="idx"
                  draggable="true"
                  @dragstart="dragGalleryIdx = idx"
                  @dragover.prevent
                  @drop="dropGalleryItem(idx)"
                  class="flex flex-col sm:flex-row items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 cursor-move"
                >
                  <span class="text-slate-400 font-bold px-1">::</span>
                  <img :src="g.image_url" :alt="g.alt_text" class="w-16 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0" />
                  <input v-model="g.alt_text" type="text" placeholder="Alt text" class="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 w-full" />
                  <input v-model="g.caption" type="text" placeholder="Caption" class="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 w-full" />
                  <button type="button" @click="removeGalleryItem(idx)" class="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold">Remove</button>
                </div>
              </div>
            </div>
          </template>

          <!-- Subtab: Features, Benefits & Specs -->
          <template v-if="serviceModalTab === 'features'">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-[#0F2A44]">Service Features &amp; Highlights</span>
                <button type="button" @click="svcForm.features.push({ title: '', description: '', highlight_badge: '', icon: 'CheckCircleIcon' })" class="px-3 py-1.5 rounded-lg bg-[#16B4E8] text-[#0F2A44] font-bold">+ Add Feature</button>
              </div>
              <div v-for="(f, idx) in svcForm.features" :key="idx" class="p-3 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <input v-model="f.title" type="text" placeholder="Feature Title" class="sm:col-span-4 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white" />
                <input v-model="f.description" type="text" placeholder="Description" class="sm:col-span-5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white" />
                <input v-model="f.highlight_badge" type="text" placeholder="Badge" class="sm:col-span-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white" />
                <button type="button" @click="svcForm.features.splice(idx, 1)" class="sm:col-span-1 text-rose-600 font-bold">X</button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-[#0F2A44]">Benefits</span>
                  <button type="button" @click="svcForm.benefits.push('')" class="text-[#16B4E8] font-bold">+ Add</button>
                </div>
                <div v-for="(b, idx) in svcForm.benefits" :key="idx" class="flex gap-2">
                  <input v-model="svcForm.benefits[idx]" type="text" class="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200" />
                  <button type="button" @click="svcForm.benefits.splice(idx, 1)" class="text-rose-600 font-bold px-2">X</button>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-[#0F2A44]">Specifications</span>
                  <button type="button" @click="svcForm.specifications.push('')" class="text-[#16B4E8] font-bold">+ Add</button>
                </div>
                <div v-for="(sp, idx) in svcForm.specifications" :key="idx" class="flex gap-2">
                  <input v-model="svcForm.specifications[idx]" type="text" class="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200" />
                  <button type="button" @click="svcForm.specifications.splice(idx, 1)" class="text-rose-600 font-bold px-2">X</button>
                </div>
              </div>
            </div>
          </template>

          <!-- Subtab: CTA & Links -->
          <template v-if="serviceModalTab === 'cta'">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Division Key</label>
                <input v-model="svcForm.division_key" type="text" placeholder="plot, flats, construction, solar, or custom" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Icon Name</label>
                <input v-model="svcForm.icon" type="text" placeholder="BuildingOffice2Icon" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">CTA Button Text</label>
                <input v-model="svcForm.cta_text" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">CTA Destination URL</label>
                <input v-model="svcForm.cta_link" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">WhatsApp Number</label>
                <input v-model="svcForm.whatsapp_number" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">WhatsApp Prefilled Message</label>
                <input v-model="svcForm.whatsapp_text" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Related Services</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label
                  v-for="other in services.filter(s => s.id !== editingServiceId)"
                  :key="other.id"
                  class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 cursor-pointer"
                >
                  <input type="checkbox" :value="other.id" v-model="svcForm.related_service_ids" />
                  <span class="font-semibold">{{ other.title }}</span>
                </label>
              </div>
            </div>
          </template>

          <!-- Subtab: SEO Settings -->
          <template v-if="serviceModalTab === 'seo'">
            <div class="space-y-3">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Service SEO Title</label>
                <input v-model="svcForm.seo.seo_title" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Service Meta Description</label>
                <textarea v-model="svcForm.seo.meta_description" rows="2" class="w-full px-3 py-2 rounded-xl border border-slate-200"></textarea>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Canonical URL</label>
                <input v-model="svcForm.seo.canonical_url" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">OG Title</label>
                  <input v-model="svcForm.seo.og_title" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
                </div>
                <div>
                  <label class="block font-bold text-slate-700 mb-1">OG Image</label>
                  <input v-model="svcForm.seo.og_image" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
          <button type="button" @click="serviceModalOpen = false" class="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600">Cancel</button>
          <div class="flex items-center gap-2">
            <button type="button" @click="saveService(true)" :disabled="saving" class="px-4 py-2 rounded-xl bg-[#16B4E8] text-[#0F2A44] text-xs font-black">
              {{ saving ? 'Saving...' : 'Save & Preview' }}
            </button>
            <button type="button" @click="saveService(false)" :disabled="saving" class="px-5 py-2 rounded-xl bg-[#0F2A44] text-white text-xs font-black">
              {{ saving ? 'Saving...' : 'Save Service' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- MODAL: EDIT / CREATE PAGE SECTION                     -->
    <!-- ===================================================== -->
    <div v-if="sectionModalOpen" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto" @click.self="sectionModalOpen = false">
      <div class="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div class="px-6 py-4 bg-[#0F2A44] text-white flex items-center justify-between">
          <h3 class="text-base font-black">{{ editingSectionId ? 'Edit Page Section' : 'Add Page Section' }}</h3>
          <button type="button" @click="sectionModalOpen = false" class="w-8 h-8 rounded-full bg-white/10">&times;</button>
        </div>
        <div class="p-6 overflow-y-auto space-y-3 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Section Type</label>
              <select v-model="secForm.section_type" class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
                <option value="hero">Hero</option>
                <option value="intro">Introduction</option>
                <option value="spotlight">Spotlight Banner</option>
                <option value="division">Division Header</option>
                <option value="features">Why Choose Us / Features</option>
                <option value="stats">Statistics / Counters</option>
                <option value="steps">Process Steps</option>
                <option value="contact">Contact &amp; CTA</option>
                <option value="banner">Supporting Banner</option>
                <option value="custom">Custom Section</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Badge Text</label>
              <input v-model="secForm.badge_text" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Section Title</label>
            <input v-model="secForm.title" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Subtitle</label>
            <input v-model="secForm.subtitle" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Description</label>
            <textarea v-model="secForm.description" rows="3" class="w-full px-3 py-2 rounded-xl border border-slate-200"></textarea>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Hero / Section Image</label>
              <div class="flex gap-1.5">
                <input v-model="secForm.hero_image" type="text" class="flex-1 px-3 py-2 rounded-xl border border-slate-200" />
                <label class="px-3 py-2 rounded-xl bg-slate-100 font-bold cursor-pointer">
                  Upload
                  <input type="file" accept="image/*" class="hidden" @change="uploadSingleImage($event, (url) => secForm.hero_image = url)" />
                </label>
              </div>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Background Image</label>
              <div class="flex gap-1.5">
                <input v-model="secForm.background_image" type="text" class="flex-1 px-3 py-2 rounded-xl border border-slate-200" />
                <label class="px-3 py-2 rounded-xl bg-slate-100 font-bold cursor-pointer">
                  Upload
                  <input type="file" accept="image/*" class="hidden" @change="uploadSingleImage($event, (url) => secForm.background_image = url)" />
                </label>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Primary CTA Text</label>
              <input v-model="secForm.cta_text" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Primary CTA URL</label>
              <input v-model="secForm.cta_link" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Secondary CTA Text</label>
              <input v-model="secForm.secondary_cta_text" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Secondary CTA URL</label>
              <input v-model="secForm.secondary_cta_link" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input v-model="secForm.contact_phone" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">WhatsApp Number</label>
              <input v-model="secForm.whatsapp_number" type="text" class="w-full px-3 py-2 rounded-xl border border-slate-200" />
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button type="button" @click="sectionModalOpen = false" class="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold">Cancel</button>
          <button type="button" @click="saveSection" :disabled="saving" class="px-5 py-2 rounded-xl bg-[#0F2A44] text-white text-xs font-black">Save Section</button>
        </div>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- MODAL: MANAGE SECTION CONTENT BLOCKS                  -->
    <!-- ===================================================== -->
    <div v-if="blocksModalOpen && activeSectionForBlocks" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto" @click.self="blocksModalOpen = false">
      <div class="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div class="px-6 py-4 bg-[#0F2A44] text-white flex items-center justify-between">
          <div>
            <h3 class="text-base font-black">Content Blocks — {{ activeSectionForBlocks.title }}</h3>
            <p class="text-[11px] text-slate-300">Add, edit, reorder, or remove blocks inside this section.</p>
          </div>
          <button type="button" @click="blocksModalOpen = false" class="w-8 h-8 rounded-full bg-white/10">&times;</button>
        </div>
        <div class="p-6 overflow-y-auto space-y-4 text-xs">
          <!-- Existing Blocks -->
          <div v-for="(blk, idx) in activeSectionForBlocks.blocks" :key="blk.id" class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input v-model="blk.title" type="text" placeholder="Block Title" class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-bold" />
              <input v-model="blk.subtitle" type="text" placeholder="Subtitle / Metric Label" class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white" />
              <input v-model="blk.badge" type="text" placeholder="Badge" class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white" />
            </div>
            <textarea v-model="blk.description" rows="2" placeholder="Description" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"></textarea>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
              <input v-model="blk.link_text" type="text" placeholder="Link Text" class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white" />
              <input v-model="blk.link_url" type="text" placeholder="Link URL" class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white" />
              <div class="flex items-center justify-end gap-1.5">
                <button type="button" @click="moveBlock(idx, -1)" :disabled="idx === 0" class="px-2 py-1 rounded border border-slate-200 bg-white">&uarr;</button>
                <button type="button" @click="moveBlock(idx, 1)" :disabled="idx === activeSectionForBlocks.blocks.length - 1" class="px-2 py-1 rounded border border-slate-200 bg-white">&darr;</button>
                <button type="button" @click="saveBlock(blk)" class="px-2.5 py-1 rounded bg-[#0F2A44] text-white font-bold">Save</button>
                <button type="button" @click="removeBlock(blk.id)" class="px-2.5 py-1 rounded bg-rose-50 text-rose-700 font-bold">Delete</button>
              </div>
            </div>
          </div>

          <!-- Add New Block -->
          <div class="p-4 rounded-xl border-2 border-dashed border-cyan-300 bg-cyan-50/40 space-y-2">
            <div class="font-extrabold text-[#0F2A44]">+ Add New Content Block</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input v-model="newBlock.title" type="text" placeholder="Title *" class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white" />
              <input v-model="newBlock.subtitle" type="text" placeholder="Subtitle" class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white" />
              <input v-model="newBlock.badge" type="text" placeholder="Badge" class="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white" />
            </div>
            <textarea v-model="newBlock.description" rows="2" placeholder="Description" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"></textarea>
            <div class="flex justify-end">
              <button type="button" @click="addNewBlock" class="px-4 py-2 rounded-xl bg-[#16B4E8] text-[#0F2A44] font-black">Add Block</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/admin'
import AdminPageHeader from '../../components/admin/AdminPageHeader.vue'
import AdminStatCard from '../../components/admin/AdminStatCard.vue'
import {
  fetchAdminServicesDashboard,
  createService,
  updateService,
  deleteService,
  duplicateService,
  reorderServices,
  createSection,
  updateSection,
  deleteSection,
  reorderSections,
  createSectionBlock,
  updateSectionBlock,
  deleteSectionBlock,
  reorderSectionBlocks,
  updatePageSeo,
  uploadServiceImage,
  deleteServiceImage
} from '../../services/servicesCmsApi'

const adminStore = useAdminStore()
const loading = ref(true)
const saving = ref(false)
const errorMsg = ref('')
const activeTab = ref('services')

const services = ref([])
const categories = ref([])
const sections = ref([])
const stats = ref({ total: 0, published: 0, draft: 0, disabled: 0, sections_total: 0, sections_enabled: 0 })

const coreSectionKeys = ['hero', 'intro', 'harsukh_spotlight', 'division_plot', 'division_flats', 'division_construction', 'division_solar', 'why_choose_us', 'stats_counters', 'process_steps', 'contact_cta']

// Filters & Pagination
const searchQuery = ref('')
const statusFilter = ref('all')
const categoryFilter = ref('all')
const currentPage = ref(1)
const pageSize = 10

const filteredServices = computed(() => {
  return services.value.filter(s => {
    if (statusFilter.value !== 'all' && s.status !== statusFilter.value) return false
    if (categoryFilter.value !== 'all' && s.category_id !== categoryFilter.value) return false
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      return (s.title || '').toLowerCase().includes(q) ||
        (s.short_description || '').toLowerCase().includes(q) ||
        (s.location_details || '').toLowerCase().includes(q)
    }
    return true
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredServices.value.length / pageSize)))
const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredServices.value.slice(start, start + pageSize)
})

// Page SEO Form
const pageSeoForm = ref({
  seo_title: '',
  meta_description: '',
  canonical_url: 'https://toplinkersgroup.com/services',
  og_title: '',
  og_description: '',
  og_image: ''
})

async function loadAll() {
  loading.value = true
  errorMsg.value = ''
  try {
    const data = await fetchAdminServicesDashboard()
    services.value = data.services
    categories.value = data.categories
    sections.value = data.sections
    stats.value = data.stats
    if (data.pageSeo) {
      pageSeoForm.value = {
        seo_title: data.pageSeo.seo_title || '',
        meta_description: data.pageSeo.meta_description || '',
        canonical_url: data.pageSeo.canonical_url || 'https://toplinkersgroup.com/services',
        og_title: data.pageSeo.og_title || '',
        og_description: data.pageSeo.og_description || '',
        og_image: data.pageSeo.og_image || ''
      }
    }
  } catch (err) {
    errorMsg.value = err.message || 'Failed to load Services CMS data'
  } finally {
    loading.value = false
  }
}

onMounted(loadAll)

// Service Modal State
const serviceModalOpen = ref(false)
const serviceModalTab = ref('basic')
const editingServiceId = ref(null)
const richEditorRef = ref(null)
const richEditorInitialHtml = ref('')
const dragGalleryIdx = ref(null)

const blankServiceForm = () => ({
  title: '',
  slug: '',
  category_id: categories.value[0]?.id || null,
  division_key: 'custom',
  short_description: '',
  full_description: '',
  main_image: '',
  main_image_alt: '',
  icon: 'BuildingOffice2Icon',
  benefits: [],
  specifications: [],
  location_details: '',
  pricing_info: '',
  cta_text: 'Inquire Now',
  cta_link: '/contact',
  whatsapp_number: '923349522157',
  whatsapp_text: '',
  related_service_ids: [],
  display_order: services.value.length + 1,
  status: 'published',
  features: [],
  gallery: [],
  seo: { seo_title: '', meta_description: '', canonical_url: '', og_title: '', og_description: '', og_image: '' }
})

const svcForm = ref(blankServiceForm())

function openCreateService() {
  editingServiceId.value = null
  svcForm.value = blankServiceForm()
  richEditorInitialHtml.value = ''
  serviceModalTab.value = 'basic'
  serviceModalOpen.value = true
}

function openEditService(svc) {
  editingServiceId.value = svc.id
  svcForm.value = {
    title: svc.title || '',
    slug: svc.slug || '',
    category_id: svc.category_id ?? null,
    division_key: svc.division_key || 'custom',
    short_description: svc.short_description || '',
    full_description: svc.full_description || '',
    main_image: svc.main_image || '',
    main_image_alt: svc.main_image_alt || '',
    icon: svc.icon || 'BuildingOffice2Icon',
    benefits: [...(svc.benefits || [])],
    specifications: [...(svc.specifications || [])],
    location_details: svc.location_details || '',
    pricing_info: svc.pricing_info || '',
    cta_text: svc.cta_text || 'Inquire Now',
    cta_link: svc.cta_link || '/contact',
    whatsapp_number: svc.whatsapp_number || '923349522157',
    whatsapp_text: svc.whatsapp_text || '',
    related_service_ids: [...(svc.related_service_ids || [])],
    display_order: svc.display_order || 1,
    status: svc.status || 'published',
    features: (svc.features || []).map(f => ({ ...f })),
    gallery: (svc.gallery || []).map(g => ({ ...g })),
    seo: { ...(svc.seo || { seo_title: '', meta_description: '', canonical_url: '', og_title: '', og_description: '', og_image: '' }) }
  }
  richEditorInitialHtml.value = svc.full_description || ''
  serviceModalTab.value = 'basic'
  serviceModalOpen.value = true
}

function applyRichFormat(cmd) {
  if (typeof document !== 'undefined') {
    document.execCommand(cmd, false, null)
    if (richEditorRef.value) svcForm.value.full_description = richEditorRef.value.innerHTML
  }
}

function insertRichLink() {
  const url = typeof window !== 'undefined' ? window.prompt('Enter URL (e.g. https://... or /listings):') : ''
  if (url) {
    document.execCommand('createLink', false, url)
    if (richEditorRef.value) svcForm.value.full_description = richEditorRef.value.innerHTML
  }
}

async function uploadSingleImage(event, setter) {
  const file = event.target.files?.[0]
  if (!file) return
  try {
    const res = await uploadServiceImage(file)
    setter(res.url)
    adminStore.showToast('Image uploaded successfully')
  } catch (err) {
    adminStore.showToast(err.message, 'error')
  } finally {
    event.target.value = ''
  }
}

async function removeMainImage() {
  const old = svcForm.value.main_image
  svcForm.value.main_image = ''
  await deleteServiceImage(old).catch(() => {})
}

async function uploadGalleryImages(event) {
  const files = Array.from(event.target.files || [])
  for (const file of files) {
    try {
      const res = await uploadServiceImage(file)
      svcForm.value.gallery.push({
        image_url: res.url,
        alt_text: svcForm.value.title || 'Service image',
        caption: '',
        display_order: svcForm.value.gallery.length + 1
      })
    } catch (err) {
      adminStore.showToast(err.message, 'error')
    }
  }
  event.target.value = ''
}

function dropGalleryItem(targetIdx) {
  if (dragGalleryIdx.value === null || dragGalleryIdx.value === targetIdx) return
  const arr = [...svcForm.value.gallery]
  const [moved] = arr.splice(dragGalleryIdx.value, 1)
  arr.splice(targetIdx, 0, moved)
  svcForm.value.gallery = arr.map((g, i) => ({ ...g, display_order: i + 1 }))
  dragGalleryIdx.value = null
}

async function removeGalleryItem(idx) {
  const [removed] = svcForm.value.gallery.splice(idx, 1)
  if (removed?.image_url) {
    await deleteServiceImage(removed.image_url).catch(() => {})
  }
}

async function saveService(openPreview = false) {
  if (!svcForm.value.title.trim()) {
    adminStore.showToast('Service title is required', 'error')
    return
  }
  saving.value = true
  try {
    if (editingServiceId.value) {
      await updateService(editingServiceId.value, svcForm.value)
      adminStore.showToast('Service updated')
    } else {
      await createService(svcForm.value)
      adminStore.showToast('Service created')
    }
    serviceModalOpen.value = false
    await loadAll()
    if (openPreview && typeof window !== 'undefined') {
      window.open('/services', '_blank')
    }
  } catch (err) {
    adminStore.showToast(err.message, 'error')
  } finally {
    saving.value = false
  }
}

async function quickStatusChange(svc, status) {
  try {
    await updateService(svc.id, { status })
    adminStore.showToast(`Status updated to ${status}`)
    await loadAll()
  } catch (err) {
    adminStore.showToast(err.message, 'error')
  }
}

async function handleDuplicate(svc) {
  try {
    await duplicateService(svc.id)
    adminStore.showToast('Service duplicated as draft')
    await loadAll()
  } catch (err) {
    adminStore.showToast(err.message, 'error')
  }
}

async function handleDeleteService(svc) {
  const ok = await adminStore.requestConfirm({
    title: `Delete "${svc.title}"?`,
    message: 'This will permanently delete this service along with its gallery images, features, and SEO settings.',
    confirmText: 'Delete Service'
  })
  if (!ok) return
  try {
    await deleteService(svc.id)
    adminStore.showToast('Service deleted')
    await loadAll()
  } catch (err) {
    adminStore.showToast(err.message, 'error')
  }
}

async function moveService(idx, delta) {
  const list = [...services.value]
  const target = idx + delta
  if (target < 0 || target >= list.length) return
  const [item] = list.splice(idx, 1)
  list.splice(target, 0, item)
  services.value = list
  await reorderServices(list.map((s, i) => ({ id: s.id, display_order: i + 1 })))
}

// Section Modal State
const sectionModalOpen = ref(false)
const editingSectionId = ref(null)
const secForm = ref({
  section_type: 'custom',
  title: '',
  subtitle: '',
  badge_text: '',
  description: '',
  hero_image: '',
  background_image: '',
  image_alt: '',
  cta_text: '',
  cta_link: '',
  secondary_cta_text: '',
  secondary_cta_link: '',
  contact_phone: '',
  whatsapp_number: '',
  whatsapp_text: ''
})

function openCreateSection() {
  editingSectionId.value = null
  secForm.value = { section_type: 'custom', title: '', subtitle: '', badge_text: '', description: '', hero_image: '', background_image: '', image_alt: '', cta_text: '', cta_link: '', secondary_cta_text: '', secondary_cta_link: '', contact_phone: '', whatsapp_number: '', whatsapp_text: '' }
  sectionModalOpen.value = true
}

function openEditSection(sec) {
  editingSectionId.value = sec.id
  secForm.value = { ...sec }
  sectionModalOpen.value = true
}

async function saveSection() {
  saving.value = true
  try {
    if (editingSectionId.value) {
      await updateSection(editingSectionId.value, secForm.value)
      adminStore.showToast('Section updated')
    } else {
      await createSection(secForm.value)
      adminStore.showToast('Section created')
    }
    sectionModalOpen.value = false
    await loadAll()
  } catch (err) {
    adminStore.showToast(err.message, 'error')
  } finally {
    saving.value = false
  }
}

async function toggleSectionEnabled(sec) {
  try {
    await updateSection(sec.id, { is_enabled: sec.is_enabled ? 0 : 1 })
    await loadAll()
  } catch (err) {
    adminStore.showToast(err.message, 'error')
  }
}

async function moveSection(idx, delta) {
  const list = [...sections.value]
  const target = idx + delta
  if (target < 0 || target >= list.length) return
  const [item] = list.splice(idx, 1)
  list.splice(target, 0, item)
  sections.value = list
  await reorderSections(list.map((s, i) => ({ id: s.id, display_order: i + 1 })))
}

async function handleDeleteSection(sec) {
  const ok = await adminStore.requestConfirm({
    title: `Delete Section "${sec.title}"?`,
    message: 'This will permanently delete the page section and all content blocks inside it.',
    confirmText: 'Delete Section'
  })
  if (!ok) return
  await deleteSection(sec.id)
  adminStore.showToast('Section deleted.', 'info')
  await loadAll()
}

// Section Blocks Modal
const blocksModalOpen = ref(false)
const activeSectionForBlocks = ref(null)
const newBlock = ref({ title: '', subtitle: '', badge: '', description: '' })

function openBlocksModal(sec) {
  activeSectionForBlocks.value = sec
  newBlock.value = { title: '', subtitle: '', badge: '', description: '' }
  blocksModalOpen.value = true
}

async function addNewBlock() {
  if (!newBlock.value.title.trim()) return
  await createSectionBlock({
    section_id: activeSectionForBlocks.value.id,
    ...newBlock.value,
    display_order: (activeSectionForBlocks.value.blocks || []).length + 1
  })
  newBlock.value = { title: '', subtitle: '', badge: '', description: '' }
  await loadAll()
  activeSectionForBlocks.value = sections.value.find(s => s.id === activeSectionForBlocks.value.id) || null
}

async function saveBlock(blk) {
  await updateSectionBlock(blk.id, blk)
  adminStore.showToast('Block updated')
}

async function removeBlock(blockId) {
  await deleteSectionBlock(blockId)
  await loadAll()
  activeSectionForBlocks.value = sections.value.find(s => s.id === activeSectionForBlocks.value.id) || null
}

async function moveBlock(idx, delta) {
  const list = [...activeSectionForBlocks.value.blocks]
  const target = idx + delta
  if (target < 0 || target >= list.length) return
  const [item] = list.splice(idx, 1)
  list.splice(target, 0, item)
  activeSectionForBlocks.value.blocks = list
  await reorderSectionBlocks(list.map((b, i) => ({ id: b.id, display_order: i + 1 })))
}

// Page SEO
async function savePageSeo() {
  saving.value = true
  try {
    await updatePageSeo(pageSeoForm.value)
    adminStore.showToast('Page SEO updated')
  } catch (err) {
    adminStore.showToast(err.message, 'error')
  } finally {
    saving.value = false
  }
}
</script>
