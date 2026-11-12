<template>
  <div class="space-y-5">
    <!-- Top Search & Add Review Bar -->
    <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="relative flex-1 max-w-md">
        <MagnifyingGlassIcon class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search client reviews by name, project, or text..."
          class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#16B4E8]"
        />
      </div>

      <button
        type="button"
        @click="openModal()"
        class="px-4 py-2 rounded-lg bg-[#0F2A44] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
      >
        <span>Add Client Review</span>
      </button>
    </div>

    <!-- Reviews Table -->
    <div v-if="filteredReviews.length > 0" class="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div class="overflow-x-auto">
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
              v-for="review in filteredReviews"
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
                    class="px-2 py-1 rounded-md border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-400 text-xs transition-colors"
                    title="Delete review"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm text-xs text-slate-500">
      No matching client reviews found.
    </div>

    <!-- Modal: Add / Edit Review -->
    <div v-if="modalOpen" @click.self="modalOpen = false" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 class="text-base font-bold text-[#0F2A44]">
              {{ editingReview ? 'Edit Client Review' : 'Add Client Review' }}
            </h3>
            <p class="text-xs text-slate-500">Saves to Laravel backend and updates homepage reviews live.</p>
          </div>
          <button type="button" @click="modalOpen = false" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="submitReviewForm" class="space-y-3.5 pt-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Client Name *</label>
              <input v-model="form.name" type="text" required placeholder="e.g. Tariq Mahmood" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Role / Title</label>
              <input v-model="form.role" type="text" placeholder="e.g. Home Buyer — G-11" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">City / Location</label>
              <input v-model="form.location" type="text" placeholder="Islamabad" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Project Tag</label>
              <input v-model="form.project" type="text" placeholder="TopCity-1 (10 Marla)" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
              <select v-model="form.rating" class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white">
                <option :value="5">5 Stars</option>
                <option :value="4">4 Stars</option>
                <option :value="3">3 Stars</option>
                <option :value="2">2 Stars</option>
                <option :value="1">1 Star</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Client Review Quote / Description Note *</label>
            <textarea v-model="form.quote" rows="4" required placeholder="Write the client's testimonial or testimonial notes..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#16B4E8]"></textarea>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button type="button" @click="modalOpen = false" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl text-xs font-semibold bg-[#0F2A44] hover:bg-[#16B4E8] text-white shadow-sm transition-colors">
              {{ editingReview ? 'Save Changes' : 'Add Review' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()
const searchQuery = ref('')
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
  if (!q) return adminStore.reviews
  return adminStore.reviews.filter(
    r =>
      r.name?.toLowerCase().includes(q) ||
      r.project?.toLowerCase().includes(q) ||
      r.quote?.toLowerCase().includes(q)
  )
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
