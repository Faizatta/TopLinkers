<template>
  <div class="space-y-6">
    <!-- Header & Action Bar -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-[#0F2A44] tracking-tight flex items-center gap-2">
          <span>Blog &amp; Market Insights</span>
          <span 
            v-if="adminStore.isBlogsLoading" 
            class="inline-block w-3.5 h-3.5 border-2 border-[#16B4E8] border-t-transparent rounded-full animate-spin"
            title="Syncing with backend..."
          ></span>
        </h1>
        <p class="text-xs text-slate-500 mt-0.5">
          Publish, edit, and curate property analysis articles — changes sync directly to backend API and live on 
          <router-link to="/blog" target="_blank" class="text-[#16B4E8] font-semibold underline hover:text-[#0F2A44]">/blog</router-link>
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          @click="refreshBlogs"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-xs"
          :disabled="adminStore.isBlogsLoading"
        >
          <svg class="w-3.5 h-3.5" :class="{ 'animate-spin': adminStore.isBlogsLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>

        <button 
          type="button"
          @click="openCreateModal"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Article</span>
        </button>
      </div>
    </div>

    <!-- Metrics Cards Row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Total Articles</p>
          <p class="text-2xl font-bold text-[#0F2A44] mt-1">{{ adminStore.blogs.length }}</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Published</p>
          <p class="text-2xl font-bold text-emerald-600 mt-1">{{ publishedCount }}</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Drafts</p>
          <p class="text-2xl font-bold text-amber-600 mt-1">{{ draftCount }}</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
      </div>

      <div class="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Total Views</p>
          <p class="text-2xl font-bold text-[#16B4E8] mt-1">{{ totalViewsCount }}</p>
        </div>
        <div class="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/80 shadow-xs space-y-3">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <!-- Search Input -->
        <div class="relative flex-1">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles by title, author, slug or summary..."
            class="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B4E8] focus:border-transparent"
          />
        </div>

        <!-- Status Filter Select -->
        <div class="flex items-center gap-2">
          <select
            v-model="statusFilter"
            class="text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
        <button
          type="button"
          @click="selectedCategory = ''"
          :class="[
            'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
            selectedCategory === '' ? 'bg-[#0F2A44] text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          ]"
        >
          All Categories ({{ adminStore.blogs.length }})
        </button>

        <button
          v-for="cat in availableCategories"
          :key="cat"
          type="button"
          @click="selectedCategory = (selectedCategory === cat ? '' : cat)"
          :class="[
            'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
            selectedCategory === cat ? 'bg-[#16B4E8] text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Articles Table / Empty State -->
    <div class="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div v-if="adminStore.isBlogsLoading && adminStore.blogs.length === 0" class="p-12 text-center text-slate-400">
        <div class="inline-block w-8 h-8 border-3 border-[#16B4E8] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p class="text-sm font-medium text-slate-600">Loading articles from backend...</p>
      </div>

      <div v-else-if="filteredBlogs.length === 0" class="p-12 text-center text-slate-400">
        <svg class="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p class="text-sm font-semibold text-slate-700">No articles found</p>
        <p class="text-xs text-slate-500 mt-1">Try adjusting your search filters or click "New Article" to create your first blog post.</p>
        <button
          @click="openCreateModal"
          class="mt-4 px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
        >
          Create First Article
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px] tracking-wider">
              <th class="py-3 px-4">Article</th>
              <th class="py-3 px-4">Category</th>
              <th class="py-3 px-4">Author</th>
              <th class="py-3 px-4">Date / Read</th>
              <th class="py-3 px-4">Views</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="post in filteredBlogs" 
              :key="post.id || post.slug"
              class="hover:bg-slate-50/70 transition-colors"
            >
              <!-- Thumbnail & Title -->
              <td class="py-3.5 px-4">
                <div class="flex items-center gap-3">
                  <img
                    :src="post.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'"
                    :alt="post.title"
                    class="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0 bg-slate-100"
                  />
                  <div class="min-w-0 max-w-xs md:max-w-md">
                    <h3 class="font-bold text-slate-900 truncate hover:text-[#16B4E8] cursor-pointer" @click="editPost(post)">
                      {{ post.title }}
                    </h3>
                    <p class="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                      /blog/{{ post.slug }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Category -->
              <td class="py-3.5 px-4 whitespace-nowrap">
                <span 
                  class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                  :class="getCategoryBadgeClass(post.category)"
                >
                  {{ post.category }}
                </span>
              </td>

              <!-- Author -->
              <td class="py-3.5 px-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <img
                    :src="post.author_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'"
                    :alt="post.author"
                    class="w-6 h-6 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p class="font-medium text-slate-800 leading-tight">{{ post.author }}</p>
                    <p class="text-[10px] text-slate-400 leading-tight">{{ post.author_role || 'Contributor' }}</p>
                  </div>
                </div>
              </td>

              <!-- Date & Read Time -->
              <td class="py-3.5 px-4 whitespace-nowrap text-slate-500">
                <p class="font-medium text-slate-700">{{ post.date || post.published_at || 'Recently' }}</p>
                <p class="text-[11px] text-slate-400">{{ post.read_time || post.readTime || '5 min read' }}</p>
              </td>

              <!-- Views -->
              <td class="py-3.5 px-4 whitespace-nowrap text-slate-600 font-mono font-medium">
                {{ post.views || 0 }}
              </td>

              <!-- Status Toggle -->
              <td class="py-3.5 px-4 whitespace-nowrap">
                <button
                  type="button"
                  @click="togglePublishStatus(post)"
                  :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all',
                    post.is_published
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                  ]"
                  title="Click to toggle status"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="post.is_published ? 'bg-emerald-500' : 'bg-amber-500'"></span>
                  <span>{{ post.is_published ? 'Published' : 'Draft' }}</span>
                </button>
              </td>

              <!-- Actions -->
              <td class="py-3.5 px-4 whitespace-nowrap text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <router-link
                    :to="`/blog/${post.slug}`"
                    target="_blank"
                    class="p-1.5 text-slate-400 hover:text-[#16B4E8] rounded-md hover:bg-slate-100 transition-colors"
                    title="View live page"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </router-link>

                  <button
                    type="button"
                    @click="editPost(post)"
                    class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    @click="confirmDeletePost(post)"
                    class="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                    title="Delete post"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create / Edit Modal -->
    <div 
      v-if="modalOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      @click.self="modalOpen = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden my-auto">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div>
            <h2 class="text-base font-bold text-[#0F2A44]">
              {{ isEditing ? 'Edit Blog Article' : 'Create New Blog Article' }}
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">
              Articles are stored in the backend SQLite database and served via REST API.
            </p>
          </div>
          <button
            type="button"
            @click="modalOpen = false"
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body Form -->
        <form @submit.prevent="submitForm" class="flex-1 overflow-y-auto p-6 space-y-5">
          <!-- Title & Auto-Slug -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">
              Article Title <span class="text-rose-500">*</span>
            </label>
            <input
              v-model="formData.title"
              type="text"
              required
              placeholder="e.g., CDA Sector I-12 Balloting Date Announced: Complete Price Analysis"
              class="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
              @input="onTitleChange"
            />
          </div>

          <!-- URL Slug & Category -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="block text-xs font-semibold text-slate-700">
                  URL Slug <span class="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  @click="generateSlugFromTitle"
                  class="text-[10px] text-[#16B4E8] hover:underline font-semibold"
                >
                  Regenerate from Title
                </button>
              </div>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-mono text-xs">
                  /blog/
                </span>
                <input
                  v-model="formData.slug"
                  type="text"
                  required
                  placeholder="cda-sector-i-12-balloting-date"
                  class="w-full pl-16 pr-3.5 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">
                Category <span class="text-rose-500">*</span>
              </label>
              <select
                v-model="formData.category"
                required
                class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
              >
                <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
          </div>

          <!-- Author Info -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">
                Author Name <span class="text-rose-500">*</span>
              </label>
              <input
                v-model="formData.author"
                type="text"
                required
                placeholder="e.g. M. Arshad"
                class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Author Role</label>
              <input
                v-model="formData.author_role"
                type="text"
                placeholder="e.g. Senior CDA Consultant"
                class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Read Time</label>
              <input
                v-model="formData.read_time"
                type="text"
                placeholder="e.g. 5 min read"
                class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
              />
            </div>
          </div>

          <!-- Cover Image & Author Photo Upload Section -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
            <!-- Cover Image (7 cols on lg) -->
            <div class="lg:col-span-7 space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-semibold text-slate-700">
                  Cover Image <span class="text-rose-500">*</span>
                </label>
                <!-- Switcher: Browse from Device vs URL -->
                <div class="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px]">
                  <button
                    type="button"
                    @click="coverImageMode = 'browse'"
                    :class="coverImageMode === 'browse' ? 'bg-white text-[#0F2A44] font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-700'"
                    class="px-2.5 py-1 rounded-md transition-all flex items-center gap-1"
                  >
                    <svg class="w-3 h-3 text-[#16B4E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Browse from System</span>
                  </button>
                  <button
                    type="button"
                    @click="coverImageMode = 'url'"
                    :class="coverImageMode === 'url' ? 'bg-white text-[#0F2A44] font-semibold shadow-xs' : 'text-slate-500 hover:text-slate-700'"
                    class="px-2.5 py-1 rounded-md transition-all flex items-center gap-1"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span>Image URL / Presets</span>
                  </button>
                </div>
              </div>

              <!-- Hidden input for Cover Image file browse -->
              <input
                ref="coverFileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleCoverFileSelected"
              />

              <!-- BROWSE MODE: DROPZONE OR PREVIEW -->
              <div v-if="coverImageMode === 'browse'">
                <!-- If Image exists, show interactive preview card -->
                <div v-if="formData.image" class="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs">
                  <img
                    :src="formData.image"
                    alt="Article cover"
                    class="w-full h-36 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  
                  <!-- Bottom info / action overlay -->
                  <div class="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-center justify-between gap-2">
                    <div class="min-w-0 text-white">
                      <p class="text-[11px] font-semibold truncate">{{ coverFileMeta.name || 'Cover Image Selected' }}</p>
                      <p class="text-[9px] text-cyan-300 flex items-center gap-1">
                        <span v-if="coverFileMeta.size">{{ coverFileMeta.size }} &bull; </span>
                        <span>Click "Change" to browse another</span>
                      </p>
                    </div>

                    <div class="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        @click="triggerCoverBrowse"
                        class="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white/90 hover:bg-white text-slate-800 transition-colors shadow-xs flex items-center gap-1"
                        title="Browse another picture from your computer"
                      >
                        <svg class="w-3 h-3 text-[#16B4E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Change</span>
                      </button>
                      <button
                        type="button"
                        @click="removeCoverImage"
                        class="p-1 text-white/80 hover:text-rose-400 hover:bg-black/40 rounded-md transition-colors"
                        title="Remove cover image"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Uploading spinner overlay -->
                  <div v-if="isUploadingCover" class="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white text-xs gap-2">
                    <span class="w-4 h-4 border-2 border-[#16B4E8] border-t-transparent rounded-full animate-spin"></span>
                    <span>Uploading &amp; optimizing image...</span>
                  </div>
                </div>

                <!-- Empty state dropzone -->
                <div
                  v-else
                  @click="triggerCoverBrowse"
                  @dragover.prevent="isCoverDragOver = true"
                  @dragleave.prevent="isCoverDragOver = false"
                  @drop.prevent="handleCoverDrop"
                  :class="isCoverDragOver ? 'border-[#16B4E8] bg-cyan-50/50 scale-[1.01]' : 'border-slate-300 hover:border-[#16B4E8] bg-slate-50/70 hover:bg-cyan-50/20'"
                  class="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center group"
                >
                  <div class="w-10 h-10 rounded-full bg-cyan-50 text-[#16B4E8] flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-[#16B4E8] group-hover:text-white transition-all shadow-xs">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="space-y-0.5">
                    <p class="text-xs font-semibold text-[#0F2A44] group-hover:text-[#16B4E8] transition-colors flex items-center justify-center gap-1.5">
                      <span>Click to browse picture from your system</span>
                    </p>
                    <p class="text-[11px] text-slate-500">or drag and drop your image file here</p>
                    <p class="text-[10px] text-slate-400 pt-1">PNG, JPG, WEBP, GIF up to 10MB &bull; Instant live preview</p>
                  </div>
                </div>
              </div>

              <!-- URL / PRESETS MODE -->
              <div v-else class="space-y-2">
                <input
                  v-model="formData.image"
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
                />
                <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span class="text-[10px] text-slate-400">Presets:</span>
                  <button
                    v-for="(pImg, idx) in imagePresets"
                    :key="idx"
                    type="button"
                    @click="selectPreset(pImg.url)"
                    class="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-cyan-50 hover:text-[#16B4E8] text-slate-700 transition-colors border border-slate-200"
                  >
                    {{ pImg.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Author Photo (5 cols on lg) -->
            <div class="lg:col-span-5 space-y-2">
              <label class="block text-xs font-semibold text-slate-700">
                Author Profile Photo
              </label>

              <!-- Hidden input for Author file browse -->
              <input
                ref="authorFileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAuthorFileSelected"
              />

              <div class="p-3 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
                <div class="flex items-center gap-3">
                  <div class="relative group shrink-0">
                    <img
                      :src="formData.author_photo || 'https://via.placeholder.com/64?text=Author'"
                      class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                      alt="Author avatar"
                    />
                    <button
                      type="button"
                      @click="triggerAuthorBrowse"
                      class="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                      title="Upload photo from system"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs font-semibold text-[#0F2A44] truncate">{{ formData.author || 'Author' }}</p>
                    <p class="text-[10px] text-slate-500 truncate">{{ formData.author_role || 'Specialist' }}</p>
                    <button
                      type="button"
                      @click="triggerAuthorBrowse"
                      class="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#16B4E8] hover:underline"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Browse from System</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] text-slate-400 mb-0.5">Or paste photo URL:</label>
                  <input
                    v-model="formData.author_photo"
                    type="text"
                    placeholder="https://..."
                    class="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Summary / Excerpt -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">
              Short Summary / Excerpt <span class="text-rose-500">*</span>
            </label>
            <textarea
              v-model="formData.summary"
              rows="2"
              required
              placeholder="A brief 1-2 sentence overview of the article shown on cards and Google search previews..."
              class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
            ></textarea>
          </div>

          <!-- Full Content -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-semibold text-slate-700">
                Full Article Content <span class="text-rose-500">*</span>
              </label>
              <span class="text-[10px] text-slate-400">Supports HTML &amp; standard paragraphs</span>
            </div>
            <textarea
              v-model="formData.content"
              rows="8"
              required
              placeholder="Write the full body of the article here. Use paragraphs, bullet points, and headings..."
              class="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B4E8] font-mono leading-relaxed"
            ></textarea>
          </div>

          <!-- Tags & Publishing Options -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Tags (Comma-separated)</label>
              <input
                v-model="tagsInput"
                type="text"
                placeholder="e.g. PHA, I-12 Flats, CDA, Balloting"
                class="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B4E8]"
              />
            </div>

            <div class="flex items-center gap-6 pt-5">
              <label class="inline-flex items-center gap-2 cursor-pointer">
                <input
                  v-model="formData.is_published"
                  type="checkbox"
                  class="w-4 h-4 text-[#16B4E8] rounded border-slate-300 focus:ring-[#16B4E8]"
                />
                <span class="text-xs font-semibold text-slate-800">Publish Immediately</span>
              </label>
            </div>
          </div>
        </form>

        <!-- Modal Footer -->
        <div class="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            @click="modalOpen = false"
            class="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            @click="submitForm"
            :disabled="isSubmitting"
            class="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#0F2A44] hover:bg-slate-800 rounded-lg transition-colors shadow-xs disabled:opacity-50"
          >
            <span v-if="isSubmitting" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>{{ isEditing ? 'Save Changes' : 'Publish Article' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()

// State
const searchQuery = ref('')
const statusFilter = ref('all')
const selectedCategory = ref('')
const modalOpen = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const tagsInput = ref('')

// Cover Image & File Browsing State
const coverFileInput = ref(null)
const authorFileInput = ref(null)
const coverImageMode = ref('browse') // 'browse' | 'url'
const isUploadingCover = ref(false)
const isUploadingAuthor = ref(false)
const coverFileMeta = ref({ name: '', size: '' })
const isCoverDragOver = ref(false)

// Categories
const availableCategories = [
  'PHA Housing',
  'Market Trends',
  'Solar Solutions',
  'Commercial Realty',
  'Affordable Plots',
  'Construction',
  'CDA Updates'
]

// Preset images for convenience
const imagePresets = [
  { label: 'Modern House', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'PHA Flats', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Solar Rooftop', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Islamabad Views', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' }
]

// Default form state
const defaultForm = () => ({
  id: null,
  title: '',
  slug: '',
  category: 'PHA Housing',
  author: 'TopLinkers Editorial Desk',
  author_role: 'Real Estate Research Analyst',
  author_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  image: '',
  read_time: '5 min read',
  summary: '',
  content: '',
  tags: [],
  is_published: true
})

const formData = ref(defaultForm())

// Lifecycle
onMounted(async () => {
  if (adminStore.blogs.length === 0) {
    await adminStore.fetchBlogs()
  }
})

const refreshBlogs = async () => {
  await adminStore.fetchBlogs()
}

// Metrics
const publishedCount = computed(() => {
  return adminStore.blogs.filter(b => b.is_published !== false && b.is_published !== 0).length
})

const draftCount = computed(() => {
  return adminStore.blogs.filter(b => b.is_published === false || b.is_published === 0).length
})

const totalViewsCount = computed(() => {
  return adminStore.blogs.reduce((acc, b) => acc + (Number(b.views) || 0), 0)
})

// Filtered Blogs
const filteredBlogs = computed(() => {
  return adminStore.blogs.filter(b => {
    // Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const titleMatch = b.title?.toLowerCase().includes(q)
      const slugMatch = b.slug?.toLowerCase().includes(q)
      const authorMatch = b.author?.toLowerCase().includes(q)
      const summaryMatch = b.summary?.toLowerCase().includes(q)
      if (!titleMatch && !slugMatch && !authorMatch && !summaryMatch) return false
    }

    // Status filter
    if (statusFilter.value === 'published') {
      if (b.is_published === false || b.is_published === 0) return false
    } else if (statusFilter.value === 'draft') {
      if (b.is_published !== false && b.is_published !== 0) return false
    }

    // Category filter
    if (selectedCategory.value) {
      if (b.category !== selectedCategory.value) return false
    }

    return true
  })
})

// Badge colors
const getCategoryBadgeClass = (category) => {
  switch (category) {
    case 'PHA Housing':
      return 'bg-blue-50 text-blue-700 border border-blue-200'
    case 'Market Trends':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    case 'Solar Solutions':
      return 'bg-amber-50 text-amber-700 border border-amber-200'
    case 'Commercial Realty':
      return 'bg-purple-50 text-purple-700 border border-purple-200'
    case 'Affordable Plots':
      return 'bg-cyan-50 text-cyan-700 border border-cyan-200'
    case 'Construction':
      return 'bg-rose-50 text-rose-700 border border-rose-200'
    default:
      return 'bg-slate-100 text-slate-700 border border-slate-200'
  }
}

// Slug Generator
const slugify = (text) => {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const onTitleChange = () => {
  if (!isEditing.value || !formData.value.slug) {
    formData.value.slug = slugify(formData.value.title)
  }
}

const generateSlugFromTitle = () => {
  formData.value.slug = slugify(formData.value.title)
}

// Image Browsing & Upload Handlers
const triggerCoverBrowse = () => {
  if (coverFileInput.value) coverFileInput.value.click()
}

const handleCoverFileSelected = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  await processCoverFile(file)
}

const handleCoverDrop = async (e) => {
  isCoverDragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  await processCoverFile(file)
}

const formatFileSize = (bytes) => {
  if (!bytes) return ''
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const processCoverFile = async (file) => {
  if (!file.type.startsWith('image/')) {
    adminStore.showToast('Please select a valid image file (PNG, JPG, WEBP, GIF).', 'error')
    return
  }

  coverFileMeta.value = {
    name: file.name,
    size: formatFileSize(file.size)
  }

  // Instant local preview via FileReader
  const reader = new FileReader()
  reader.onload = async (event) => {
    formData.value.image = event.target.result

    // Concurrently upload to backend server storage
    try {
      isUploadingCover.value = true
      const uploadRes = await adminStore.uploadImage(file)
      if (uploadRes && uploadRes.url) {
        formData.value.image = uploadRes.url
      }
    } catch (err) {
      console.warn('Backend image upload endpoint not reachable; keeping base64 preview', err)
    } finally {
      isUploadingCover.value = false
    }
  }
  reader.readAsDataURL(file)
}

const removeCoverImage = () => {
  formData.value.image = ''
  coverFileMeta.value = { name: '', size: '' }
  if (coverFileInput.value) coverFileInput.value.value = ''
}

const selectPreset = (url) => {
  formData.value.image = url
  coverFileMeta.value = { name: 'Preset Cover Image', size: '' }
}

const triggerAuthorBrowse = () => {
  if (authorFileInput.value) authorFileInput.value.click()
}

const handleAuthorFileSelected = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    adminStore.showToast('Please select a valid image file for author photo.', 'error')
    return
  }

  const reader = new FileReader()
  reader.onload = async (event) => {
    formData.value.author_photo = event.target.result
    try {
      isUploadingAuthor.value = true
      const uploadRes = await adminStore.uploadImage(file)
      if (uploadRes && uploadRes.url) {
        formData.value.author_photo = uploadRes.url
      }
    } catch (err) {
      console.warn('Backend author upload skipped, keeping base64', err)
    } finally {
      isUploadingAuthor.value = false
    }
  }
  reader.readAsDataURL(file)
}

// Modal open handlers
const openCreateModal = () => {
  isEditing.value = false
  formData.value = defaultForm()
  coverFileMeta.value = { name: '', size: '' }
  coverImageMode.value = 'browse'
  if (coverFileInput.value) coverFileInput.value.value = ''
  if (authorFileInput.value) authorFileInput.value.value = ''
  tagsInput.value = 'PHA, CDA Islamabad, Property News'
  modalOpen.value = true
}

const editPost = (post) => {
  isEditing.value = true
  formData.value = {
    id: post.id,
    title: post.title || '',
    slug: post.slug || '',
    category: post.category || 'PHA Housing',
    author: post.author || 'TopLinkers Editorial Desk',
    author_role: post.author_role || post.authorRole || 'Real Estate Research Analyst',
    author_photo: post.author_photo || post.authorPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    image: post.image || '',
    read_time: post.read_time || post.readTime || '5 min read',
    summary: post.summary || '',
    content: post.content || '',
    tags: Array.isArray(post.tags) ? post.tags : [],
    is_published: post.is_published !== false && post.is_published !== 0
  }
  coverFileMeta.value = { name: post.image ? 'Current Article Cover' : '', size: '' }
  coverImageMode.value = post.image ? 'browse' : 'browse'
  tagsInput.value = Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || '')
  modalOpen.value = true
}

// Toggle Publish status
const togglePublishStatus = async (post) => {
  const newStatus = !(post.is_published !== false && post.is_published !== 0)
  try {
    await adminStore.saveBlog({
      ...post,
      is_published: newStatus
    })
  } catch (e) {
    console.error('Failed to update status', e)
  }
}

// Confirm Delete
const confirmDeletePost = async (post) => {
  const ok = await adminStore.requestConfirm({
    title: 'Delete Article',
    message: `Are you sure you want to permanently delete "${post.title}"? This cannot be undone.`,
    confirmText: 'Delete Article'
  })
  if (ok) {
    try {
      await adminStore.deleteBlog(post.id || post.slug)
    } catch (e) {
      console.error('Failed to delete article', e)
    }
  }
}

// Submit Form
const submitForm = async () => {
  if (!formData.value.title || !formData.value.slug || !formData.value.summary) {
    adminStore.showToast('Please fill all required fields.', 'error')
    return
  }

  if (!formData.value.image) {
    adminStore.showToast('Please browse or specify a cover image for the article.', 'error')
    return
  }

  isSubmitting.value = true
  try {
    const payload = {
      ...formData.value,
      tags: tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
    }
    await adminStore.saveBlog(payload)
    modalOpen.value = false
  } catch (e) {
    console.error(e)
  } finally {
    isSubmitting.value = false
  }
}
</script>
