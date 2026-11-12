import propertiesData from '../data/properties.json'
import agentsData from '../data/agents.json'
import postsData from '../data/posts.json'
import typesData from '../data/types.json'
import locationsData from '../data/locations.json'
import testimonialsData from '../data/testimonials.json'

const delay = (ms = 0) => (ms > 0 ? new Promise(resolve => setTimeout(resolve, ms)) : Promise.resolve())

function getLivePropertyList() {
  try {
    const custom = JSON.parse(localStorage.getItem('toplinkers_custom_properties') || '[]')
    const overrides = JSON.parse(localStorage.getItem('toplinkers_property_overrides') || '{}')
    const deleted = JSON.parse(localStorage.getItem('toplinkers_deleted_properties') || '[]')

    const baseMapped = propertiesData
      .filter(p => !deleted.includes(p.id) && !deleted.includes(p.slug))
      .map(p => (overrides[p.slug] ? { ...p, ...overrides[p.slug] } : p))

    return [...custom, ...baseMapped]
  } catch (e) {
    return [...propertiesData]
  }
}

export const api = {
  // Properties - Zero Artificial Latency for Instant First Paint
  async getProperties(params = {}) {
    let list = getLivePropertyList()

    // Location / Keyword search
    if (params.keyword && params.keyword.trim()) {
      const q = params.keyword.toLowerCase().trim()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.areaName?.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.propertyId.toLowerCase().includes(q)
      )
    }

    // Property ID exact filter
    if (params.propertyId && params.propertyId.trim()) {
      const pid = params.propertyId.toLowerCase().trim()
      list = list.filter(p => p.propertyId.toLowerCase().includes(pid))
    }

    // Status (for-rent, for-sale)
    if (params.status && params.status !== 'all') {
      list = list.filter(p => p.status === params.status)
    }

    // Property Type
    if (params.type && params.type !== 'all') {
      list = list.filter(p => p.type === params.type || p.typeName?.toLowerCase() === params.type.toLowerCase())
    }

    // City / Location
    if (params.city && params.city !== 'all') {
      const targetCity = params.city.toLowerCase()
      list = list.filter(p =>
        p.city.toLowerCase().includes(targetCity) ||
        p.areaName?.toLowerCase().includes(targetCity) ||
        p.address.toLowerCase().includes(targetCity)
      )
    }

    // Bedrooms
    if (params.beds && params.beds !== 'any') {
      const minBeds = parseInt(params.beds, 10)
      list = list.filter(p => p.beds >= minBeds)
    }

    // Bathrooms
    if (params.baths && params.baths !== 'any') {
      const minBaths = parseFloat(params.baths)
      list = list.filter(p => p.baths >= minBaths)
    }

    // Price range (PKR)
    if (params.minPrice) {
      const min = parseInt(params.minPrice, 10)
      if (!isNaN(min)) list = list.filter(p => p.price >= min)
    }
    if (params.maxPrice) {
      const max = parseInt(params.maxPrice, 10)
      if (!isNaN(max)) list = list.filter(p => p.price <= max)
    }

    // Area range
    if (params.minArea) {
      const minA = parseInt(params.minArea, 10)
      if (!isNaN(minA)) list = list.filter(p => p.sqft >= minA)
    }
    if (params.maxArea) {
      const maxA = parseInt(params.maxArea, 10)
      if (!isNaN(maxA)) list = list.filter(p => p.sqft <= maxA)
    }

    // Features Checklist
    if (params.features && params.features.length) {
      list = list.filter(p =>
        params.features.every(f => p.features && p.features.includes(f))
      )
    }

    // Sorting
    if (params.sort) {
      if (params.sort === 'price-asc') {
        list.sort((a, b) => a.price - b.price)
      } else if (params.sort === 'price-desc') {
        list.sort((a, b) => b.price - a.price)
      } else if (params.sort === 'newest') {
        list.sort((a, b) => (b.yearBuilt || 0) - (a.yearBuilt || 0))
      }
    }

    return {
      total: list.length,
      data: list
    }
  },

  async getPropertyBySlug(slug) {
    const list = getLivePropertyList()
    const decoded = decodeURIComponent(slug || '').toLowerCase().trim()

    // 1. Direct slug or id match
    let found = list.find(p => 
      p.slug === slug || 
      p.id === slug ||
      (p.slug && p.slug.toLowerCase().trim() === decoded) ||
      (p.id && p.id.toLowerCase().trim() === decoded) ||
      encodeURIComponent(p.slug || '') === slug
    )

    // 2. Common aliases fallback
    if (!found) {
      const aliases = {
        'executive-designer-villa-gulberg': 'executive-designer-villa-gulberg',
        'corner-plot-topcity': 'corner-plot-topcity',
        'pha-flats-i12': 'pha-flats-i12-c-type-2bed',
        'pha-flats-i16': 'pha-flats-i16-b-type-3bed',
        'harsukh': 'hr-sukh-luxury-flats-nathia-gali',
        'hr-sukh': 'hr-sukh-luxury-flats-nathia-gali'
      }
      const targetSlug = aliases[decoded]
      if (targetSlug) {
        found = list.find(p => p.slug === targetSlug || p.id === targetSlug)
      }
    }

    // 3. Fuzzy keyword match
    if (!found && decoded) {
      const words = decoded.split('-').filter(w => w.length > 3)
      if (words.length > 0) {
        found = list.find(p => {
          const titleLower = (p.title || '').toLowerCase()
          const slugLower = (p.slug || '').toLowerCase()
          return words.filter(w => titleLower.includes(w) || slugLower.includes(w)).length >= Math.ceil(words.length * 0.7)
        })
      }
    }

    return found || null
  },

  async getFeaturedProperties(limit = 8) {
    return getLivePropertyList().filter(p => p.featured).slice(0, limit)
  },

  async getSimilarProperties(propertyId, limit = 4) {
    const list = getLivePropertyList()
    const target = list.find(p => p.id === propertyId)
    if (!target) return list.slice(0, limit)
    return list
      .filter(p => p.id !== propertyId && (p.type === target.type || p.city === target.city))
      .slice(0, limit)
  },

  // Agents
  async getAgents() {
    return [...agentsData]
  },

  async getAgentBySlug(slug) {
    return agentsData.find(a => a.slug === slug || a.id === slug) || null
  },

  async getAgentProperties(agentId) {
    return propertiesData.filter(p => p.agentId === agentId)
  },

  // Blog Posts (Live Laravel Backend with local fallback)
  async getPosts(options = {}) {
    try {
      const url = `http://127.0.0.1:8000/api/blogs${options.admin ? '?admin=1' : ''}`
      const res = await fetch(url)
      if (res.ok) {
        const livePosts = await res.json()
        if (Array.isArray(livePosts) && livePosts.length > 0) {
          return livePosts
        }
      }
    } catch (e) {
      // Fallback to local postsData if backend is unreachable
    }
    return [...postsData]
  },

  async getPostBySlug(slug) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/blogs/${encodeURIComponent(slug)}`)
      if (res.ok) {
        return await res.json()
      }
    } catch (e) {
      // Fallback to local postsData
    }
    return postsData.find(p => p.slug === slug || p.id === slug) || null
  },

  async uploadImage(file) {
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch('http://127.0.0.1:8000/api/upload', {
      method: 'POST',
      body: formData
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || err.error || 'Failed to upload image')
    }
    return await res.json()
  },

  async createPost(postData) {
    const res = await fetch('http://127.0.0.1:8000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || 'Failed to create blog post')
    }
    return await res.json()
  },

  async updatePost(id, postData) {
    const res = await fetch(`http://127.0.0.1:8000/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || 'Failed to update blog post')
    }
    return await res.json()
  },

  async deletePost(id) {
    const res = await fetch(`http://127.0.0.1:8000/api/blogs/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) {
      throw new Error('Failed to delete blog post')
    }
    return await res.json()
  },

  // Types & Locations
  async getTypes() {
    return [...typesData]
  },

  async getLocations() {
    return [...locationsData]
  },

  // Testimonials
  async getTestimonials() {
    return [...testimonialsData]
  },

  // Form Submissions
  async submitInquiry(formData) {
    await delay(250)
    console.log('[TopLinkers API] Property Inquiry submitted:', formData)
    return {
      success: true,
      message: 'Inquiry successfully received. A TopLinkers consultant will call or WhatsApp you within 2 hours.'
    }
  },

  async submitContact(formData) {
    await delay(250)
    console.log('[TopLinkers API] Contact form message received:', formData)
    return {
      success: true,
      message: 'Thank you! Your message has been routed to our Gulberg Islamabad desk.'
    }
  },

  async submitNewsletter(email) {
    await delay(200)
    console.log('[TopLinkers API] Newsletter subscriber:', email)
    return {
      success: true,
      message: 'Subscribed successfully to TopLinkers Pakistan Property Bulletin!'
    }
  }
}

export default api
