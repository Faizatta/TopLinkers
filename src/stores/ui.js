import { defineStore } from 'pinia'

const FAVORITES_KEY = 'toplinkers_favorites'
const COMPARE_KEY = 'toplinkers_compare'
const SAVED_SEARCHES_KEY = 'toplinkers_saved_searches'

function safeGetStorage(key, fallback = []) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (err) {
    console.warn(`Error reading localStorage for key ${key}:`, err)
    return fallback
  }
}

function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn(`Error saving localStorage for key ${key}:`, err)
  }
}

export const useUiStore = defineStore('ui', {
  state: () => ({
    favorites: safeGetStorage(FAVORITES_KEY, []),
    compareList: safeGetStorage(COMPARE_KEY, []),
    savedSearches: safeGetStorage(SAVED_SEARCHES_KEY, []),
    toasts: [],
    // Modals
    isAuthModalOpen: false,
    authModalTab: 'login',
    isLightboxOpen: false,
    lightboxImages: [],
    lightboxActiveIndex: 0,
    isShareModalOpen: false,
    shareTargetUrl: '',
    shareTargetTitle: '',
    // H&R Suites / Flyer Plan Pop-up modal
    isFlyerModalOpen: false,
    isWhatsAppOpen: false
  }),

  getters: {
    favoritesCount: (state) => state.favorites.length,
    compareCount: (state) => state.compareList.length,
    savedSearchesCount: (state) => state.savedSearches.length,
    isFavorite: (state) => (id) => state.favorites.includes(id),
    isInCompare: (state) => (id) => state.compareList.includes(id)
  },

  actions: {
    toggleFavorite(id) {
      const index = this.favorites.indexOf(id)
      if (index > -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(id)
      }
      safeSetStorage(FAVORITES_KEY, this.favorites)
    },

    toggleCompare(property) {
      const id = typeof property === 'string' ? property : property.id
      const index = this.compareList.indexOf(id)

      if (index > -1) {
        this.compareList.splice(index, 1)
      } else {
        if (this.compareList.length >= 4) {
          this.addToast({
            type: 'warning',
            title: 'Compare Limit Reached',
            message: 'You can compare up to 4 properties simultaneously.'
          })
          return false
        }
        this.compareList.push(id)
      }
      safeSetStorage(COMPARE_KEY, this.compareList)
      return true
    },

    removeCompare(id) {
      const index = this.compareList.indexOf(id)
      if (index > -1) {
        this.compareList.splice(index, 1)
        safeSetStorage(COMPARE_KEY, this.compareList)
      }
    },

    clearCompare() {
      this.compareList = []
      safeSetStorage(COMPARE_KEY, [])
      this.addToast({
        type: 'info',
        title: 'Compare Cleared',
        message: 'All properties removed from comparison list.'
      })
    },

    // Saved Searches
    saveSearch(searchParams) {
      const queryStr = JSON.stringify(searchParams)
      const existing = this.savedSearches.find(s => s.queryStr === queryStr)
      if (existing) {
        this.addToast({
          type: 'info',
          title: 'Already Saved',
          message: 'This search alert is already saved.'
        })
        return
      }
      const newSearch = {
        id: Date.now(),
        createdAt: new Date().toLocaleDateString(),
        params: searchParams,
        queryStr
      }
      this.savedSearches.push(newSearch)
      safeSetStorage(SAVED_SEARCHES_KEY, this.savedSearches)
      this.addToast({
        type: 'success',
        title: 'Search Alert Saved',
        message: 'You will receive updates matching these property filters.'
      })
    },

    removeSavedSearch(id) {
      this.savedSearches = this.savedSearches.filter(s => s.id !== id)
      safeSetStorage(SAVED_SEARCHES_KEY, this.savedSearches)
    },

    // Toasts
    addToast({ type = 'info', title = '', message = '', duration = 4000 }) {
      const id = Date.now() + Math.random().toString(36).substring(2, 9)
      this.toasts.push({ id, type, title, message })
      if (duration > 0) {
        setTimeout(() => {
          this.removeToast(id)
        }, duration)
      }
    },

    removeToast(id) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    },

    // Lightbox
    openLightbox(images = [], index = 0) {
      this.lightboxImages = images
      this.lightboxActiveIndex = index
      this.isLightboxOpen = true
    },

    closeLightbox() {
      this.isLightboxOpen = false
    },

    setLightboxIndex(index) {
      if (index >= 0 && index < this.lightboxImages.length) {
        this.lightboxActiveIndex = index
      }
    },

    // Auth modal
    openAuthModal(tab = 'login') {
      this.authModalTab = tab
      this.isAuthModalOpen = true
    },

    closeAuthModal() {
      this.isAuthModalOpen = false
    },

    // Share modal
    openShareModal(title, url) {
      this.shareTargetTitle = title
      this.shareTargetUrl = url || window.location.href
      this.isShareModalOpen = true
    },

    closeShareModal() {
      this.isShareModalOpen = false
    },

    // Flyer / Floor plans pop-up modal
    openFlyerModal() {
      this.isFlyerModalOpen = true
    },

    closeFlyerModal() {
      this.isFlyerModalOpen = false
    }
  }
})
