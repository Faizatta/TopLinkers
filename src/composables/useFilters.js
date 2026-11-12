import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePropertiesStore } from '../stores/properties'

export function useFilters() {
  const router = useRouter()
  const route = useRoute()
  const store = usePropertiesStore()

  const filters = computed(() => store.filters)
  const hasActiveFilters = computed(() => store.hasActiveFilters)

  const applyFiltersAndNavigate = (targetPath = '/search') => {
    const query = store.toQueryObject()
    router.push({
      path: targetPath,
      query
    })
  }

  const resetAll = (navigate = false) => {
    store.resetFilters()
    if (navigate) {
      router.push({ path: '/search' })
    }
  }

  return {
    filters,
    hasActiveFilters,
    applyFiltersAndNavigate,
    resetAll,
    store
  }
}
