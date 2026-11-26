<template>
  <div class="space-y-5">
    <AdminPageHeader
      title="Client Reviews & Testimonials"
      subtitle="Manage verified client testimonials displayed on the TopLinkers homepage."
      :badge="`${filteredReviews.length} reviews`"
      live-url="/"
    >
      <template #actions>
        <button
          type="button"
          @click="openModal()"
          class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-2xs"
        >
          + Add Client Review
        </button>
      </template>
    </AdminPageHeader>

    <!-- Search Bar -->
    <div class="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="relative flex-1 max-w-md">
        <MagnifyingGlassIcon class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search client reviews by name, project, or quote..."
          class="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0F2A44] focus:bg-white"
        />
      </div>

      <select
        v-model="ratingFilter"
        class="w-full sm:w-40 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#0F2A44]"
      >
        <option value="all">All Ratings</option>
        <option :value="5">5 Stars Only</option>
        <option :value="4">4 Stars &amp; Above</option>
      </select>
    </div>

    <!-- Reviews List (Mobile Cards + Desktop Table) -->
    <div v-if="filteredReviews.length > 0" class="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      <!-- Mobile Cards -->
      <div class="md:hidden divide-y divide-slate-100">
        <div
          v-for="review in paginatedReviews"
          :key="`mobile-rev-${review.id}`"
          class="p-4 space-y-2.5"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-[#0F2A44] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                {{ getFirstLetter(review.name) }}
              </div>
              <div class="min-w-0">
                <div class="font-bold text-[#0F2A44] text-xs truncate">{{ review.name }}</div>
                <div class="text-[11px] text-slate-500 truncate">{{ review.role || review.location }}</div>
              </div>
            </div>
            <div class="flex items-center gap-0.5 text-amber-500 flex-shrink-0">
              <StarIcon v-for="s in (review.rating || 5)" :key="s" class="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          <span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {{ review.project || 'TopLinkers Advisory' }}
          </span>
          <p class="text-xs text-slate-600 italic line-clamp-3">"{{ review.quote }}"</p>

          <div class="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              @click="openModal(review)"
              class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium"
            >
              Edit
            </button>
            <button
              type="button"
              @click="confirmDeleteReview(review)"
              class="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Desktop Table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <th class="py-3 px-5">Client</th>
              <th class="py-3 px-5">Project</th>
              <th class="py-3 px-5">Rating</th>
              <th class="py-3 px-5">Review Quote</th>
              <th class="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-xs">
            <tr
              v-for="review in paginatedReviews"
              :key="review.id"
              class="hover:bg-slate-50/70 transition-colors"
            >
              <td class="py-3.5 px-5 align-middle">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-slate-200">
                    {{ getFirstLetter(review.name) }}
                  </div>
                  <div class="min-w-0">
                    <div class="font-bold text-[#0F2A44] text-xs truncate">{{ review.name }}</div>
                    <div class="text-[11px] text-slate-500 truncate">{{ review.role || review.location }}</div>
                  </div>
                </div>
              </td>

              <td class="py-3.5 px-5 align-middle whitespace-nowrap">
                <span class="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  {{ review.project || 'TopLinkers Advisory' }}
                </span>
              </td>

              <td class="py-3.5 px-5 align-middle whitespace-nowrap">
                <div class="flex items-center gap-0.5 text-amber-500">
                  <StarIcon v-for="s in (review.rating || 5)" :key="s" class="w-3.5 h-3.5 fill-current" />
                </div>
              </td>

              <td class="py-3.5 px-5 align-middle max-w-md text-slate-600">
                <p class="line-clamp-2 italic text-xs">"{{ review.quote }}"</p>
              </td>

              <td class="py-3.5 px-5 align-middle">
                <div class="flex items-center justify-end gap-1.5 whitespace-nowrap">
                  <button
                    type="button"
                    @click="openModal(review)"
                    class="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    @click="confirmDeleteReview(review)"
                    class="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-500 text-xs font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AdminPagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :total-items="filteredReviews.length"
      />
    </div>

    <AdminEmptyState
      v-else
      title="No Client Reviews Found"
      description="No testimonials match your current search or rating filter."
      :icon="ChatBubbleBottomCenterTextIcon"
    >
      <template #action>
        <button
          type="button"
          @click="searchQuery = ''; ratingFilter = 'all'"
          class="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
        >
          Reset Filters
        </button>
        <button
          type="button"
          @click="openModal()"
          class="px-3.5 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold"
        >
          + Add Client Review
        </button>
      </template>
    </AdminEmptyState>

    <!-- Modal: Add / Edit Review -->
    <AdminModal
      v-model="modalOpen"
      :title="editingReview ? 'Edit Client Review' : 'Add Client Review'"
      subtitle="Saves to backend and updates homepage reviews live."
      size="md"
    >
      <form id="review-modal-form" @submit.prevent="submitReviewForm" class="space-y-3.5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Client Name *</label>
            <input v-model="form.name" type="text" required placeholder="e.g. Tariq Mahmood" class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Role / Title</label>
            <input v-model="form.role" type="text" placeholder="e.g. Home Buyer — G-11" class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">City / Location</label>
            <input v-model="form.location" type="text" placeholder="Islamabad" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Project Tag</label>
            <input v-model="form.project" type="text" placeholder="TopCity-1 (10 Marla)" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
            <select v-model="form.rating" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-[#0F2A44]">
              <option :value="5">5 Stars</option>
              <option :value="4">4 Stars</option>
              <option :value="3">3 Stars</option>
              <option :value="2">2 Stars</option>
              <option :value="1">1 Star</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Client Review Quote *</label>
          <textarea v-model="form.quote" rows="4" required placeholder="Write the client's testimonial..." class="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0F2A44]"></textarea>
        </div>
      </form>

      <template #footer>
        <button type="button" @click="modalOpen = false" class="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200/70">
          Cancel
        </button>
        <button type="submit" form="review-modal-form" class="px-5 py-2 rounded-lg text-xs font-semibold bg-[#0F2A44] hover:bg-slate-800 text-white shadow-2xs transition-colors">
          {{ editingReview ? 'Save Changes' : 'Add Review' }}
        </button>
      </template>
    </AdminModal>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { MagnifyingGlassIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'
import { useAdminStore } from '../../stores/admin'
import AdminPageHeader from '../../components/admin/AdminPageHeader.vue'
import AdminPagination from '../../components/admin/AdminPagination.vue'
import AdminEmptyState from '../../components/admin/AdminEmptyState.vue'
import AdminModal from '../../components/admin/AdminModal.vue'

const adminStore = useAdminStore()
const searchQuery = ref('')
const ratingFilter = ref('all')
const page = ref(1)
const pageSize = ref(10)
const modalOpen = ref(false)
const editingReview = ref(null)

const form = ref({
  name: '',
  role: '',
  location: 'Islamabad',
  project: '',
  rating: 5,
  quote: ''
})

const filteredReviews = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return adminStore.reviews.filter((r) => {
    if (ratingFilter.value !== 'all' && Number(r.rating || 5) < Number(ratingFilter.value)) {
      return false
    }
    if (!q) return true
    return (
      r.name?.toLowerCase().includes(q) ||
      r.project?.toLowerCase().includes(q) ||
      r.quote?.toLowerCase().includes(q)
    )
  })
})

const paginatedReviews = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredReviews.value.slice(start, start + pageSize.value)
})

watch([searchQuery, ratingFilter], () => {
  page.value = 1
})

const getFirstLetter = (name) => {
  if (!name) return 'T'
  const match = String(name).trim().match(/[a-zA-Z]/)
  return match ? match[0].toUpperCase() : String(name).trim().charAt(0).toUpperCase()
}

const openModal = (review = null) => {
  if (review) {
    editingReview.value = review
    form.value = { ...review }
  } else {
    editingReview.value = null
    form.value = {
      name: '',
      role: 'Verified Property Buyer',
      location: 'Islamabad',
      project: '',
      rating: 5,
      quote: ''
    }
  }
  modalOpen.value = true
}

const submitReviewForm = async () => {
  const saved = await adminStore.saveReview({
    ...(editingReview.value || {}),
    ...form.value
  })
  modalOpen.value = false
  adminStore.showToast(editingReview.value ? `Updated review by ${saved.name}.` : `Added review by ${saved.name}.`)
}

const confirmDeleteReview = async (review) => {
  const ok = await adminStore.requestConfirm({
    title: 'Delete Client Review?',
    message: `Are you sure you want to delete the review by "${review.name}"?`,
    confirmText: 'Delete Review'
  })
  if (ok) {
    await adminStore.deleteReview(review.id)
    adminStore.showToast(`Removed review by ${review.name}.`, 'info')
  }
}
</script>
