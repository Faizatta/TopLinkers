import { computed } from 'vue'
import { useUiStore } from '../stores/ui'

export function useCompare() {
  const ui = useUiStore()

  const compareList = computed(() => ui.compareList)
  const compareCount = computed(() => ui.compareCount)

  const isInCompare = (id) => ui.isInCompare(id)
  const toggleCompare = (property) => ui.toggleCompare(property)
  const removeCompare = (id) => ui.removeCompare(id)
  const clearCompare = () => ui.clearCompare()

  return {
    compareList,
    compareCount,
    isInCompare,
    toggleCompare,
    removeCompare,
    clearCompare
  }
}
