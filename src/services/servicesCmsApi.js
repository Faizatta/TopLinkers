import { API_BASE_URL } from './api'

const isJson = (res) => (res.headers.get('content-type') || '').includes('json')

function getAdminHeaders(extra = {}) {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('toplinkers_admin_token') : ''
  return {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra
  }
}

async function parseResponse(res, fallback) {
  if (res.ok && isJson(res)) return res.json()
  const body = isJson(res) ? await res.json().catch(() => ({})) : {}
  throw new Error(body.error || body.message || `${fallback} (HTTP ${res.status})`)
}

// Public endpoints (only published services & enabled sections)
export async function fetchPublicServicesCms() {
  const ts = Date.now()
  const [servicesRes, categoriesRes, sectionsRes, seoRes] = await Promise.all([
    fetch(`${API_BASE_URL}/services?_t=${ts}`, { headers: { Accept: 'application/json' } }),
    fetch(`${API_BASE_URL}/service-categories?_t=${ts}`, { headers: { Accept: 'application/json' } }),
    fetch(`${API_BASE_URL}/service-sections?_t=${ts}`, { headers: { Accept: 'application/json' } }),
    fetch(`${API_BASE_URL}/service-seo?entity_type=page&entity_id=0&_t=${ts}`, { headers: { Accept: 'application/json' } })
  ])

  const [services, categories, sections, pageSeo] = await Promise.all([
    parseResponse(servicesRes, 'Failed to load services'),
    parseResponse(categoriesRes, 'Failed to load service categories'),
    parseResponse(sectionsRes, 'Failed to load page sections'),
    parseResponse(seoRes, 'Failed to load page SEO')
  ])

  return { services, categories, sections, pageSeo }
}

// Admin endpoints
export async function fetchAdminServicesDashboard(params = {}) {
  const q = new URLSearchParams({ admin: '1', _t: String(Date.now()), ...params })
  const [svcRes, catRes, secRes, seoRes] = await Promise.all([
    fetch(`${API_BASE_URL}/services?${q.toString()}`, { headers: getAdminHeaders() }),
    fetch(`${API_BASE_URL}/service-categories?admin=1&_t=${Date.now()}`, { headers: getAdminHeaders() }),
    fetch(`${API_BASE_URL}/service-sections?admin=1&_t=${Date.now()}`, { headers: getAdminHeaders() }),
    fetch(`${API_BASE_URL}/service-seo?entity_type=page&entity_id=0&_t=${Date.now()}`, { headers: getAdminHeaders() })
  ])

  const [svcPayload, categories, sections, pageSeo] = await Promise.all([
    parseResponse(svcRes, 'Failed to load admin services'),
    parseResponse(catRes, 'Failed to load categories'),
    parseResponse(secRes, 'Failed to load sections'),
    parseResponse(seoRes, 'Failed to load page SEO')
  ])

  return {
    services: svcPayload.services || [],
    stats: svcPayload.stats || { total: 0, published: 0, draft: 0, disabled: 0, sections_total: 0, sections_enabled: 0 },
    categories,
    sections,
    pageSeo
  }
}

export async function createService(payload) {
  const res = await fetch(`${API_BASE_URL}/services`, {
    method: 'POST',
    headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload)
  })
  return parseResponse(res, 'Failed to create service')
}

export async function updateService(id, payload) {
  const res = await fetch(`${API_BASE_URL}/services/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload)
  })
  return parseResponse(res, 'Failed to update service')
}

export async function deleteService(id) {
  const res = await fetch(`${API_BASE_URL}/services/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAdminHeaders()
  })
  return parseResponse(res, 'Failed to delete service')
}

export async function duplicateService(id) {
  const res = await fetch(`${API_BASE_URL}/services/${encodeURIComponent(id)}/duplicate`, {
    method: 'POST',
    headers: getAdminHeaders()
  })
  return parseResponse(res, 'Failed to duplicate service')
}

export async function reorderServices(items) {
  const res = await fetch(`${API_BASE_URL}/services/reorder`, {
    method: 'POST',
    headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ items })
  })
  return parseResponse(res, 'Failed to reorder services')
}

// Sections & Blocks
export async function createSection(payload) {
  const res = await fetch(`${API_BASE_URL}/service-sections`, {
    method: 'POST',
    headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload)
  })
  return parseResponse(res, 'Failed to create section')
}

export async function updateSection(id, payload) {
  const res = await fetch(`${API_BASE_URL}/service-sections/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload)
  })
  return parseResponse(res, 'Failed to update section')
}

export async function deleteSection(id) {
  const res = await fetch(`${API_BASE_URL}/service-sections/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAdminHeaders()
  })
  return parseResponse(res, 'Failed to delete section')
}

export async function reorderSections(items) {
  const res = await fetch(`${API_BASE_URL}/service-sections/reorder`, {
    method: 'POST',
    headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ items })
  })
  return parseResponse(res, 'Failed to reorder sections')
}

export async function createSectionBlock(payload) {
  const res = await fetch(`${API_BASE_URL}/service-section-blocks`, {
    method: 'POST',
    headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload)
  })
  return parseResponse(res, 'Failed to create section block')
}

export async function updateSectionBlock(id, payload) {
  const res = await fetch(`${API_BASE_URL}/service-section-blocks/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload)
  })
  return parseResponse(res, 'Failed to update section block')
}

export async function deleteSectionBlock(id) {
  const res = await fetch(`${API_BASE_URL}/service-section-blocks/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAdminHeaders()
  })
  return parseResponse(res, 'Failed to delete section block')
}

export async function reorderSectionBlocks(items) {
  const res = await fetch(`${API_BASE_URL}/service-section-blocks/reorder`, {
    method: 'POST',
    headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ items })
  })
  return parseResponse(res, 'Failed to reorder section blocks')
}

// SEO
export async function updatePageSeo(payload) {
  const res = await fetch(`${API_BASE_URL}/service-seo`, {
    method: 'PUT',
    headers: getAdminHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ entity_type: 'page', entity_id: 0, ...payload })
  })
  return parseResponse(res, 'Failed to update page SEO')
}

// Media Upload with client-side validation (5MB max, image formats)
export async function uploadServiceImage(file) {
  if (!file) throw new Error('No image selected')
  const maxBytes = 5 * 1024 * 1024
  if (file.size > maxBytes) {
    throw new Error('Image exceeds 5MB limit. Please compress or choose a smaller file.')
  }
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml']
  if (file.type && !allowed.includes(file.type)) {
    throw new Error('Unsupported image format. Use JPG, PNG, WebP, AVIF, GIF, or SVG.')
  }
  const form = new FormData()
  form.append('image', file)
  const res = await fetch(`${API_BASE_URL}/services-upload`, {
    method: 'POST',
    headers: getAdminHeaders(),
    body: form
  })
  return parseResponse(res, 'Image upload failed')
}

export async function deleteServiceImage(url) {
  if (!url || !url.startsWith('/uploads/services/')) return { success: true }
  const res = await fetch(`${API_BASE_URL}/services-upload?url=${encodeURIComponent(url)}`, {
    method: 'DELETE',
    headers: getAdminHeaders()
  })
  return parseResponse(res, 'Failed to delete image')
}
