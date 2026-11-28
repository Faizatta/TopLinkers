import propertiesData from '../data/properties.json'
import agentsData from '../data/agents.json'
import postsData from '../data/posts.json'
import typesData from '../data/types.json'
import locationsData from '../data/locations.json'
import testimonialsData from '../data/testimonials.json'

// Same API base as the admin store: an explicit VITE_API_URL, the local Laravel
// server during development, and a same-origin /api path in production.
// (A hard-coded http://127.0.0.1 URL points at each visitor's own machine in
// production, so those requests could never succeed and only logged errors.)
export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://127.0.0.1:8000/api' : '/api')

// Static hosting may answer an /api route with the SPA's index.html (HTTP 200).
const isJson = (res) => (res.headers.get('content-type') || '').includes('json')

// For write operations: return the JSON body, or throw a readable error (the API's
// own message when it sent one) instead of a raw JSON parse error.
async function jsonOrThrow(res, fallbackMessage) {
  if (res.ok && isJson(res)) return res.json()
  const body = isJson(res) ? await res.json().catch(() => ({})) : {}
  throw new Error(body.message || body.error || fallbackMessage)
}

const delay = (ms = 0) => (ms > 0 ? new Promise(resolve => setTimeout(resolve, ms)) : Promise.resolve())

import { onDataChanged } from '../utils/syncBus'

let serverPropertiesCache = null
let fetchInFlight = null
let lastPropertiesSync = 0

let serverTeamCache = null
let fetchTeamInFlight = null
let lastTeamSync = 0

const STALE_TTL_MS = 15000 // 15 seconds max before background re-validation

export function invalidatePropertiesCache() {
  serverPropertiesCache = null
  lastPropertiesSync = 0
  fetchInFlight = null
}

export function invalidateTeamCache() {
  serverTeamCache = null
  lastTeamSync = 0
  fetchTeamInFlight = null
}

export async function syncServerProperties({ force = false } = {}) {
  const isStale = (Date.now() - lastPropertiesSync) > STALE_TTL_MS
  if (!force && !isStale && serverPropertiesCache) return serverPropertiesCache
  if (fetchInFlight && !force) return fetchInFlight

  const url = `${API_BASE_URL}/properties?_t=${Date.now()}`
  try {
    fetchInFlight = fetch(url, {
      headers: { 'Accept': 'application/json', 'Cache-Control': 'no-cache' }
    })
      .then(res => (res.ok && isJson(res) ? res.json() : null))
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          serverPropertiesCache = data.map(p => {
            const base = propertiesData.find(d => d.slug === p.slug || d.id === p.id) || {}
            const rawPrice = Number(p.price || base.price || 0)
            const parsedSqft = Number(p.sqft) || parseInt(String(p.area || '').replace(/[^0-9]/g, ''), 10) || base.sqft || 0
            const typeLabel = p.type_name || base.typeName || (p.type === 'apartment' ? 'Flat / Apartment' : p.type === 'house' ? 'House / Villa' : p.type === 'commercial' ? 'Commercial' : 'Plot / File')
            return {
              ...base,
              id: p.id,
              propertyId: p.slug || ('TL-' + p.id),
              slug: p.slug,
              title: p.title,
              society: p.society || base.society || p.location || '',
              areaName: p.society || base.areaName || '',
              price: rawPrice,
              priceFormatted: p.price_formatted || base.priceFormatted || (rawPrice ? `PKR ${rawPrice.toLocaleString()}` : ''),
              pricePerSqft: p.payment_note || p.price_per_sqft || base.pricePerSqft || '100% Cash / Ready Possession',
              paymentMode: p.payment_mode || base.paymentMode || 'cash',
              downPayment: p.down_payment || base.downPayment || '',
              installmentPlan: p.installment_plan || base.installmentPlan || '',
              type: p.type || base.type || 'plot',
              typeName: typeLabel,
              purpose: p.purpose || base.purpose || 'for-sale',
              status: p.purpose || base.status || 'for-sale',
              address: p.location || base.address || 'Islamabad',
              city: p.society || (p.location?.includes('Rawalpindi') ? 'Rawalpindi' : (p.location?.includes('Nathia Gali') ? 'Murree & Galyat' : (base.city || 'Islamabad'))),
              area: p.area || base.area || '10 Marla',
              marla: p.area || base.marla || '',
              sqft: parsedSqft,
              lat: Number(p.lat || base.lat || 33.6844),
              lng: Number(p.lng || base.lng || 73.0479),
              beds: Number(p.bedrooms !== undefined ? p.bedrooms : (base.beds || 0)),
              baths: Number(p.bathrooms !== undefined ? p.bathrooms : (base.baths || 0)),
              images: Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.image ? [p.image, ...(base.images?.slice(1) || [])] : (base.images || ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'])),
              featured: Boolean(p.featured),
              hotOffer: Boolean(p.hot_offer ?? base.hotOffer),
              description: p.description || base.description || '',
              offerEnabled: Boolean(p.offer_enabled),
              offerLabel: p.offer_label || '',
              offerPrice: Number(p.offer_price || 0),
              offerExpiresAt: p.offer_expires_at || ''
            }
          })
          lastPropertiesSync = Date.now()
          try {
            localStorage.setItem('toplinkers_server_properties', JSON.stringify(serverPropertiesCache))
          } catch (e) {}
        }
        return serverPropertiesCache
      })
      .catch(() => serverPropertiesCache)
      .finally(() => {
        fetchInFlight = null
      })
    return fetchInFlight
  } catch (e) {
    return serverPropertiesCache
  }
}

export async function syncServerTeam({ force = false } = {}) {
  const isStale = (Date.now() - lastTeamSync) > STALE_TTL_MS
  if (!force && !isStale && serverTeamCache) return serverTeamCache
  if (fetchTeamInFlight && !force) return fetchTeamInFlight

  const url = `${API_BASE_URL}/team?_t=${Date.now()}`
  try {
    fetchTeamInFlight = fetch(url, {
      headers: { 'Accept': 'application/json', 'Cache-Control': 'no-cache' }
    })
      .then(res => (res.ok && isJson(res) ? res.json() : null))
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          serverTeamCache = data.map(m => {
            const rawSlug = (m.name || m.id || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            return {
              id: m.id || ('TM-' + m.db_id),
              slug: m.slug || rawSlug || m.id,
              name: m.name || '',
              role: m.role || '',
              category: m.category || 'agent',
              tag: m.tag || '',
              experience: m.experience || '',
              phone: m.phone || '0334-9522157',
              whatsapp: m.whatsapp || '923349522157',
              email: m.email || '',
              photo: m.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
              bio: m.bio || '',
              quote: m.quote || '',
              address: m.address || 'Al Hameed Plaza, G-11 Markaz, Islamabad',
              company: 'TopLinkers',
              verified: true,
              deals: m.deals || 180,
              specialty: m.tag || m.role || 'Property Advisory',
              isActive: m.isActive !== false
            }
          })
          lastTeamSync = Date.now()
          try {
            localStorage.setItem('toplinkers_server_team', JSON.stringify(serverTeamCache))
          } catch (e) {}
        }
        return serverTeamCache
      })
      .catch(() => serverTeamCache)
      .finally(() => {
        fetchTeamInFlight = null
      })
    return fetchTeamInFlight
  } catch (e) {
    return serverTeamCache
  }
}

if (typeof window !== 'undefined') {
  setTimeout(() => { syncServerProperties() }, 150)
  setTimeout(() => { syncServerTeam() }, 200)

  // Live Cross-Tab Synchronization Listener
  onDataChanged((event) => {
    if (event.topic === 'properties' || event.topic === 'all') {
      invalidatePropertiesCache()
      syncServerProperties({ force: true })
    }
    if (event.topic === 'team' || event.topic === 'all') {
      invalidateTeamCache()
      syncServerTeam({ force: true })
    }
  })
}

function getLivePropertyList() {
  try {
    const cachedServer = serverPropertiesCache || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('toplinkers_server_properties') || 'null') : null)
    if (Array.isArray(cachedServer) && cachedServer.length > 0) {
      const deleted = JSON.parse(localStorage.getItem('toplinkers_deleted_properties') || '[]')
      return cachedServer.filter(p => !deleted.includes(p.id) && !deleted.includes(p.slug))
    }

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

function getLiveTeamList() {
  try {
    const cachedServer = serverTeamCache || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('toplinkers_server_team') || 'null') : null)
    if (Array.isArray(cachedServer) && cachedServer.length > 0) {
      return cachedServer.filter(m => m.isActive !== false)
    }

    const adminTeam = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('toplinkers_team_members') || 'null') : null
    if (Array.isArray(adminTeam) && adminTeam.length > 0) {
      return adminTeam.filter(m => m.isActive !== false).map(m => {
        const rawSlug = (m.name || m.id || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        return {
          id: m.id,
          slug: m.slug || rawSlug || m.id,
          name: m.name,
          role: m.role,
          category: m.category,
          tag: m.tag,
          experience: m.experience,
          phone: m.phone,
          whatsapp: m.whatsapp,
          email: m.email,
          photo: m.photo,
          bio: m.bio,
          company: 'TopLinkers',
          verified: true,
          specialty: m.tag || m.role,
          deals: m.deals || 150,
          isActive: m.isActive !== false
        }
      })
    }

    return agentsData
  } catch (e) {
    return agentsData
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
    let list = getLivePropertyList()
    const decoded = decodeURIComponent(slug || '').toLowerCase().trim()

    // 1. Direct slug or id match
    let found = list.find(p => 
      p.slug === slug || 
      String(p.id) === String(slug) ||
      (p.slug && p.slug.toLowerCase().trim() === decoded) ||
      (p.id != null && String(p.id).toLowerCase().trim() === decoded) ||
      encodeURIComponent(p.slug || '') === slug
    )

    // 1b. If not found in local cache, force-sync from server database in case recently created/edited
    if (!found) {
      await syncServerProperties({ force: true }).catch(() => null)
      list = getLivePropertyList()
      found = list.find(p => 
        p.slug === slug || 
        String(p.id) === String(slug) ||
        (p.slug && p.slug.toLowerCase().trim() === decoded) ||
        (p.id != null && String(p.id).toLowerCase().trim() === decoded) ||
        encodeURIComponent(p.slug || '') === slug
      )
    }

    // 2. Common aliases fallback
    if (!found) {
      const aliases = {
        'executive-designer-villa-gulberg': 'faisal-town-phase-2-installment-plot',
        'spanish-luxury-villa-gulberg-greens': 'faisal-town-phase-2-installment-plot',
        'corner-plot-topcity': 'topcity1-10-marla-prime-plot',
        'topcity': 'topcity1-10-marla-prime-plot',
        'topcity-1': 'topcity1-10-marla-prime-plot',
        'top-city': 'topcity1-10-marla-prime-plot',
        'top-city-1': 'topcity1-10-marla-prime-plot',
        'topcity-block-b': 'topcity1-10-marla-prime-plot',
        'pha-flats-i12': 'pha-flats-i12-1-type-d-e-2bed',
        'pha-flats-i16': 'pha-flats-i16-3-type-b-3bed',
        'harsukh': 'hr-sukh-luxury-flats-nathia-gali',
        'hr-sukh': 'hr-sukh-luxury-flats-nathia-gali',
        'faisal-town': 'faisal-town-phase-2-installment-plot',
        'faisal-town-2': 'faisal-town-phase-2-installment-plot',
        'faisal-heights': 'faisal-heights-luxury-executive-apartment',
        'faisal-heights-luxury-executive-apartment': 'faisal-heights-luxury-executive-apartment',
        'faisal-heights-apartments': 'faisal-heights-luxury-executive-apartment',
        'pechs': 'pechs-islamabad-5-marla-plot',
        'pechs-5-marla': 'pechs-islamabad-5-marla-plot'
      }
      const targetSlug = aliases[decoded]
      if (targetSlug) {
        found = list.find(p => p.slug === targetSlug || String(p.id) === String(targetSlug))
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

    // 4. Fallback to properties.json static data if server data is still populating
    if (!found) {
      found = propertiesData.find(p =>
        p.slug === slug ||
        p.slug === decoded ||
        String(p.id) === String(slug) ||
        String(p.id) === String(decoded)
      )
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
    await syncServerTeam().catch(() => null)
    return getLiveTeamList()
  },

  async getAgentBySlug(slug) {
    if (!slug) return null
    await syncServerTeam().catch(() => null)
    const list = getLiveTeamList()
    const decoded = decodeURIComponent(slug).toLowerCase()
    return list.find(a =>
      (a.slug && a.slug.toLowerCase() === decoded) ||
      (a.id && a.id.toLowerCase() === decoded) ||
      (a.name && a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === decoded)
    ) || agentsData.find(a => a.slug === slug || a.id === slug) || null
  },

  async getAgentProperties(agentId) {
    return propertiesData.filter(p => p.agentId === agentId)
  },

  // Blog Posts (Live Laravel Backend with local fallback)
  async getPosts(options = {}) {
    const livePosts = await api.getLivePosts(options)
    return livePosts || [...postsData]
  },

  // Bundled articles, available synchronously, so pages can render them without
  // waiting for the network (no loading flash, no layout shift).
  getLocalPosts() {
    return [...postsData]
  },

  // Articles from the live backend, or null when it is not reachable / not deployed.
  async getLivePosts(options = {}) {
    try {
      const url = `${API_BASE_URL}/blogs${options.admin ? '?admin=1' : ''}`
      const res = await fetch(url)
      if (res.ok && isJson(res)) {
        const livePosts = await res.json()
        if (Array.isArray(livePosts) && livePosts.length > 0) {
          return livePosts
        }
      }
    } catch (e) {
      // Backend unreachable
    }
    return null
  },

  async getPostBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${encodeURIComponent(slug)}`)
      if (res.ok && isJson(res)) {
        return await res.json()
      }
    } catch (e) {
      // Fallback to local postsData
    }
    return postsData.find(p => p.slug === slug || p.id === slug) || null
  },

  async uploadImage(file) {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('toplinkers_admin_token') : ''
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData
    })
    return jsonOrThrow(res, 'Failed to upload image')
  },

  async createPost(postData) {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('toplinkers_admin_token') : ''
    const res = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
      body: JSON.stringify(postData)
    })
    return jsonOrThrow(res, 'Failed to create blog post')
  },

  async updatePost(id, postData) {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('toplinkers_admin_token') : ''
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
      body: JSON.stringify(postData)
    })
    return jsonOrThrow(res, 'Failed to update blog post')
  },

  async deletePost(id) {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('toplinkers_admin_token') : ''
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    })
    return jsonOrThrow(res, 'Failed to delete blog post')
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
