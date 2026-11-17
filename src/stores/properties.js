import { defineStore } from 'pinia'
import { api } from '../services/api'

export const usePropertiesStore = defineStore('properties', {
  state: () => ({
    properties: [],
    total: 0,
    loading: false,
    error: null,
    currentProperty: null,
    featuredProperties: [],
    viewMode: 'grid', // 'grid' | 'list'
    page: 1,
    perPage: 6,
    filters: {
      keyword: '',
      status: 'all', // 'all', 'for-rent', 'for-sale'
      beds: 'any',
      baths: 'any',
      minPrice: '',
      maxPrice: '',
      type: 'all',
      city: 'all',
      minArea: '',
      maxArea: '',
      features: [],
      sort: 'newest'
    }
  }),

  getters: {
    paginatedProperties: (state) => {
      const totalP = Math.max(1, Math.ceil(state.properties.length / state.perPage))
      const safePage = Math.min(Math.max(1, state.page), totalP)
      const start = (safePage - 1) * state.perPage
      return state.properties.slice(start, start + state.perPage)
    },
    totalPages: (state) => Math.ceil(state.properties.length / state.perPage) || 1,
    hasActiveFilters: (state) => {
      const f = state.filters
      return !!(
        f.keyword ||
        (f.status && f.status !== 'all') ||
        (f.beds && f.beds !== 'any') ||
        (f.baths && f.baths !== 'any') ||
        f.minPrice ||
        f.maxPrice ||
        (f.type && f.type !== 'all') ||
        (f.city && f.city !== 'all') ||
        f.minArea ||
        f.maxArea ||
        (f.features && f.features.length > 0)
      )
    }
  },

  actions: {
    async fetchProperties() {
      this.loading = true
      this.error = null
      try {
        const response = await api.getProperties(this.filters)
        this.properties = response.data || []
        this.total = response.total !== undefined ? response.total : this.properties.length
        const totalP = Math.max(1, Math.ceil(this.properties.length / this.perPage))
        if (this.page > totalP) {
          this.page = 1
        }
      } catch (err) {
        this.error = 'Failed to load properties. Please try again.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async fetchPropertyBySlug(slug) {
      this.loading = true
      this.error = null
      try {
        const property = await api.getPropertyBySlug(slug)
        this.currentProperty = property
        return property
      } catch (err) {
        this.error = 'Property not found.'
        console.error(err)
        return null
      } finally {
        this.loading = false
      }
    },

    async fetchFeaturedProperties(limit = 6) {
      try {
        const featured = await api.getFeaturedProperties(limit)
        this.featuredProperties = featured
        return featured
      } catch (err) {
        console.error('Failed to load featured properties:', err)
        return []
      }
    },

    setFilter(key, value) {
      this.filters[key] = value
      this.page = 1
    },

    resetFilters() {
      this.filters = {
        keyword: '',
        status: 'all',
        beds: 'any',
        baths: 'any',
        minPrice: '',
        maxPrice: '',
        type: 'all',
        city: 'all',
        minArea: '',
        maxArea: '',
        features: [],
        sort: 'newest'
      }
      this.page = 1
    },

    toggleFeature(feature) {
      const idx = this.filters.features.indexOf(feature)
      if (idx > -1) {
        this.filters.features.splice(idx, 1)
      } else {
        this.filters.features.push(feature)
      }
      this.page = 1
    },

    syncFromQuery(query) {
      this.filters.keyword = query.keyword || ''
      this.filters.status = query.status || 'all'
      this.filters.beds = query.beds || 'any'
      this.filters.baths = query.baths || 'any'
      this.filters.minPrice = query.minPrice || ''
      this.filters.maxPrice = query.maxPrice || ''
      this.filters.type = query.type || 'all'
      this.filters.city = query.city || 'all'
      this.filters.minArea = query.minArea || ''
      this.filters.maxArea = query.maxArea || ''
      this.filters.sort = query.sort || 'newest'
      if (query.features) {
        this.filters.features = Array.isArray(query.features) ? query.features : [query.features]
      } else {
        this.filters.features = []
      }
      this.page = query.page ? (parseInt(query.page, 10) || 1) : 1
    },

    toQueryObject() {
      const query = {}
      const f = this.filters
      if (f.keyword) query.keyword = f.keyword
      if (f.status && f.status !== 'all') query.status = f.status
      if (f.beds && f.beds !== 'any') query.beds = f.beds
      if (f.baths && f.baths !== 'any') query.baths = f.baths
      if (f.minPrice) query.minPrice = f.minPrice
      if (f.maxPrice) query.maxPrice = f.maxPrice
      if (f.type && f.type !== 'all') query.type = f.type
      if (f.city && f.city !== 'all') query.city = f.city
      if (f.minArea) query.minArea = f.minArea
      if (f.maxArea) query.maxArea = f.maxArea
      if (f.sort && f.sort !== 'newest') query.sort = f.sort
      if (f.features && f.features.length) query.features = f.features
      if (this.page > 1) query.page = this.page
      return query
    }
  }
})
