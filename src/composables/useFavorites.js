import { computed } from 'vue'
import { useUiStore } from '../stores/ui'

export function useFavorites() {
  const ui = useUiStore()

  const favorites = computed(() => ui.favorites)
  const favoritesCount = computed(() => ui.favoritesCount)

  const isFavorite = (id) => ui.isFavorite(id)
  const toggleFavorite = (id, title) => ui.toggleFavorite(id, title)

  return {
    favorites,
    favoritesCount,
    isFavorite,
    toggleFavorite
  }
}
