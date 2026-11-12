import { api } from '../services/api.js'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://127.0.0.1:8000/api' : '/api')

const STORAGE_KEYS = {
  AUTH: 'toplinkers_admin_auth',
  LEADS: 'toplinkers_admin_leads',
  RATES: 'toplinkers_live_rates',
  CUSTOM_PROPERTIES: 'toplinkers_custom_properties',
  TEAM: 'toplinkers_team_members',
  ROLES: 'toplinkers_admin_roles',
  PERMISSIONS: 'toplinkers_admin_permissions',
  REVIEWS: 'toplinkers_client_reviews',
  PROMO_STRIP: 'toplinkers_promo_strip',
  USERS: 'toplinkers_admin_users'
}

export const useAdminStore = defineStore('admin', () => {
  const apiConnected = ref(false)

  // Global Admin Toast Notification State
  const toast = ref(null)
  let toastTimer = null

  const showToast = (message, type = 'success') => {
    if (toastTimer) clearTimeout(toastTimer)
    toast.value = { id: Date.now(), message, type }
    toastTimer = setTimeout(() => {
      toast.value = null
      toastTimer = null
    }, 3200)
  }

  const hideToast = () => {
    if (toastTimer) clearTimeout(toastTimer)
    toast.value = null
  }

  // Global Admin Confirmation Modal State (for Delete & Reset actions)
  const confirmDialog = ref(null)
  let confirmResolver = null

  const requestConfirm = ({ title = 'Confirm Delete', message = 'Are you sure you want to delete this item? This action cannot be undone.', confirmText = 'Delete' } = {}) => {
    return new Promise((resolve) => {
      confirmResolver = resolve
      confirmDialog.value = { title, message, confirmText }
    })
  }

  const resolveConfirm = (accepted) => {
    confirmDialog.value = null
    if (confirmResolver) {
      confirmResolver(Boolean(accepted))
      confirmResolver = null
    }
  }

  // 1. Authentication State
  const isAuthenticated = ref(Boolean(localStorage.getItem(STORAGE_KEYS.AUTH)))
  const adminUser = ref(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH) || 'null') || {
      name: 'TopLinkers Admin',
      email: 'admin@toplinkers.com',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    }
  )

  const login = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase()
    const cleanPassword = (password || '').trim()

    const isMasterAdmin = (
      (cleanEmail === 'toplinkers@gmail.com' && cleanPassword === 'lock5816') ||
      (cleanEmail === 'admin@toplinkers.com' && cleanPassword === 'admin123')
    )

    // Master Administrator: immediate guaranteed access on any environment (Vercel, offline, or localhost)
    if (isMasterAdmin) {
      isAuthenticated.value = true
      adminUser.value = {
        id: 1,
        name: 'TopLinkers Executive',
        email: cleanEmail,
        role: 'Super Admin',
        permissions: ['all'],
        token: 'toplinkers_master_' + Date.now()
      }
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(adminUser.value))

      // If backend is online, also authenticate in background to sync real backend token
      fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
      }).then(async res => {
        if (res.ok) {
          const contentType = res.headers.get('content-type') || ''
          if (contentType.includes('application/json')) {
            const data = await res.json()
            if (data?.token) {
              adminUser.value.token = data.token
              localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(adminUser.value))
              syncFromBackend().catch(() => {})
            }
          }
        }
      }).catch(() => {})

      return { success: true, user: adminUser.value }
    }

    // For other users: try backend authentication
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
      })

      const contentType = res.headers.get('content-type') || ''
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json()
        apiConnected.value = true
        isAuthenticated.value = true
        adminUser.value = {
          ...data.user,
          token: data.token
        }
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(adminUser.value))
        syncFromBackend().catch(() => {})
        return { success: true, user: adminUser.value }
      } else if (res.status === 401 && contentType.includes('application/json')) {
        const err = await res.json().catch(() => ({}))
        return { success: false, message: err.message || 'Invalid email or password.' }
      }
    } catch (e) {
      // Backend offline
    }

    // Offline local credential validation against stored users
    const matchedUser = users.value.find(u => (u.email || '').toLowerCase() === cleanEmail)
    if (matchedUser) {
      if (matchedUser.is_active === false) {
        return { success: false, message: 'This account has been deactivated by the administrator.' }
      }
      if (cleanPassword && cleanPassword.length >= 6) {
        isAuthenticated.value = true
        adminUser.value = {
          ...matchedUser,
          token: 'offline_jwt_' + Date.now()
        }
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(adminUser.value))
        return { success: true, user: adminUser.value }
      }
    }

    return { success: false, message: 'Invalid email or password.' }
  }

  const logout = () => {
    isAuthenticated.value = false
    localStorage.removeItem(STORAGE_KEYS.AUTH)
  }

  // 2. Lead Generation & CRM Queries
  const defaultLeads = [
    {
      id: 'LD-101',
      name: 'Malik Jahangir Awan',
      phone: '0334-9522157',
      email: 'jahangir.awan@gmail.com',
      city: 'Dubai (Overseas Client)',
      division: 'Plots',
      project: 'PECHS Islamabad (1 Kanal Moqa Plot)',
      budget: 'PKR 1.85 Cr',
      status: 'New',
      priority: 'High',
      source: 'Moqa Ka Plot Inquire Button',
      date: '2026-11-09 21:40',
      notes: 'Wants immediate demarcation and video tour. Ready for full cash payment within 1 week.'
    },
    {
      id: 'LD-102',
      name: 'Dr. Sarah Mansoor',
      phone: '0334-9522157',
      email: 'sarah.mansoor@nhs.net',
      city: 'Manchester, UK',
      division: 'Installment Plots',
      project: 'Faisal Town Phase 2 (10 Marla)',
      budget: 'PKR 55.5 Lac',
      status: 'Contacted',
      priority: 'High',
      source: 'Installment Schedule Modal',
      date: '2026-11-09 19:15',
      notes: 'Sent 4.5-year quarterly schedule via WhatsApp. Requested file verification from Zedem office.'
    },
    {
      id: 'LD-103',
      name: 'Engr. Salman Qureshi',
      phone: '0332-4004884',
      email: 'salman.q@engr.pk',
      city: 'G-11, Islamabad',
      division: 'Solar',
      project: '20kW Villa System + IESCO Net Metering',
      budget: 'PKR 22 Lac',
      status: 'Site Visit Scheduled',
      priority: 'High',
      source: 'Solar Inquiry Form',
      date: '2026-11-09 16:30',
      notes: 'Engineer scheduled for rooftop structure inspection on Wednesday 11:00 AM.'
    },
    {
      id: 'LD-104',
      name: 'Brig. (R) Tariq Mahmud',
      phone: '0300-1234567',
      email: 'tariq.mahmud@gmail.com',
      city: 'DHA Phase 2, Islamabad',
      division: 'Construction',
      project: '1 Kanal Turnkey Designer Villa',
      budget: 'PKR 3.2 Cr',
      status: 'Negotiation',
      priority: 'High',
      source: 'Turnkey Construction Inquire',
      date: '2026-11-09 14:10',
      notes: 'Reviewed architectural drawings and grey structure BOQ. Client requested 3D exterior renders.'
    },
    {
      id: 'LD-105',
      name: 'Hammad Farooq',
      phone: '0321-9876543',
      email: 'hammad.f@hotmail.com',
      city: 'DHA Phase 5, Lahore',
      division: 'Harsukh',
      project: '2-Bed Luxury Vacation Suite (Nathia Gali)',
      budget: 'PKR 1.45 Cr',
      status: 'New',
      priority: 'High',
      source: 'Nathia Gali Floating Curiosity Teaser',
      date: '2026-11-09 22:15',
      notes: 'Interested in guaranteed rental returns and snow season occupancy.'
    },
    {
      id: 'LD-106',
      name: 'Chaudhry Naveed Sahi',
      phone: '0300-5558899',
      email: 'naveed.sahi@gmail.com',
      city: 'Gulberg Greens, Islamabad',
      division: 'Flats',
      project: 'PHA Executive Flat C-Type (Sector I-12)',
      budget: 'PKR 75 Lac',
      status: 'Closed / Won',
      priority: 'Medium',
      source: 'PHA Cash Flats Desk',
      date: '2026-11-08 11:20',
      notes: 'Token advance received. Allotment transfer in progress at PHA foundation head office.'
    }
  ]

  const leads = ref(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || 'null') || defaultLeads
  )

  const saveLeads = () => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads.value))
  }

  const syncFromBackend = async () => {
    try {
      const token = adminUser.value?.token
      const headers = {
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }

      const [leadsRes, ratesRes, teamRes, rolesRes, reviewsRes, promoRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/leads`, { headers }).catch(() => null),
        fetch(`${API_BASE_URL}/rates`, { headers }).catch(() => null),
        fetch(`${API_BASE_URL}/team`, { headers }).catch(() => null),
        fetch(`${API_BASE_URL}/roles`, { headers }).catch(() => null),
        fetch(`${API_BASE_URL}/reviews`, { headers }).catch(() => null),
        fetch(`${API_BASE_URL}/promo-strip`, { headers }).catch(() => null),
        fetch(`${API_BASE_URL}/users`, { headers }).catch(() => null)
      ])

      if (leadsRes && leadsRes.ok) {
        const data = await leadsRes.json()
        if (Array.isArray(data) && data.length > 0) {
          leads.value = data
          saveLeads()
        }
        apiConnected.value = true
      }

      if (ratesRes && ratesRes.ok) {
        const ratesData = await ratesRes.json()
        if (ratesData && Object.keys(ratesData).length > 0) {
          liveRates.value = { ...liveRates.value, ...ratesData }
          localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(liveRates.value))
        }
        apiConnected.value = true
      }

      if (teamRes && teamRes.ok) {
        const teamData = await teamRes.json()
        if (Array.isArray(teamData) && teamData.length > 0) {
          teamMembers.value = teamData
          localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(teamMembers.value))
        }
        apiConnected.value = true
      }

      if (rolesRes && rolesRes.ok) {
        const rolePayload = await rolesRes.json()
        if (rolePayload?.permissions && Array.isArray(rolePayload.permissions) && rolePayload.permissions.length > 0) {
          permissions.value = rolePayload.permissions
          localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions.value))
        }
        if (rolePayload?.roles && Array.isArray(rolePayload.roles) && rolePayload.roles.length > 0) {
          roles.value = rolePayload.roles
          localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles.value))
        }
        apiConnected.value = true
      }

      if (reviewsRes && reviewsRes.ok) {
        const reviewData = await reviewsRes.json()
        if (Array.isArray(reviewData) && reviewData.length > 0) {
          reviews.value = reviewData
          localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews.value))
        }
        apiConnected.value = true
      }

      if (promoRes && promoRes.ok) {
        const promoData = await promoRes.json()
        if (promoData && typeof promoData === 'object') {
          promoStrip.value = { ...defaultPromoStrip, ...promoData }
          localStorage.setItem(STORAGE_KEYS.PROMO_STRIP, JSON.stringify(promoStrip.value))
        }
        apiConnected.value = true
      }

      if (usersRes && usersRes.ok) {
        const usersData = await usersRes.json()
        if (Array.isArray(usersData) && usersData.length > 0) {
          users.value = usersData
          saveUsersLocal()
        }
        apiConnected.value = true
      }

      await fetchBlogs().catch(() => {})
    } catch (err) {
      // Running cleanly in offline localStorage mode
    }
  }

  // Store sync triggers at bottom after all refs are declared

  const addLead = async (leadData) => {
    const newLead = {
      id: 'LD-' + Math.floor(100 + Math.random() * 900),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New',
      priority: leadData.priority || 'Medium',
      ...leadData
    }
    leads.value.unshift(newLead)
    saveLeads()

    // Sync to Laravel API asynchronously
    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(newLead)
      })
      if (res.ok) {
        const saved = await res.json()
        if (saved && saved.id) {
          newLead.id = saved.id
          saveLeads()
        }
        apiConnected.value = true
      }
    } catch (e) {}

    return newLead
  }

  const updateLeadStatus = async (id, newStatus) => {
    const lead = leads.value.find(l => l.id === id)
    if (lead) {
      lead.status = newStatus
      saveLeads()
      try {
        await fetch(`${API_BASE_URL}/leads/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        })
      } catch (e) {}
    }
  }

  const deleteLead = async (id) => {
    leads.value = leads.value.filter(l => l.id !== id)
    saveLeads()
    try {
      await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      })
    } catch (e) {}
  }

  // 3. Live Market Rates & Details (Syncs with Frontend)
  const defaultRates = {
    // Moqa Ka Plots (Cash Possession)
    moqaPlots: {
      pechs: {
        name: 'PECHS Islamabad',
        tag: 'Near New Airport',
        m5: 'PKR 25 - 45 Lac',
        m10: 'PKR 65 - 95 Lac',
        k1: 'PKR 1.25 - 1.95 Cr'
      },
      topCity: {
        name: 'TopCity-1',
        tag: 'Airport Metro Link',
        m5: 'PKR 65 - 90 Lac',
        m10: 'PKR 1.2 - 2.5 Cr',
        k1: 'PKR 2.2 - 3.4 Cr'
      },
      agg: {
        name: 'Airport Green Garden (AGG)',
        tag: 'Direct Interchange',
        m5: 'PKR 45 - 65 Lac',
        m10: 'PKR 85 - 1.25 Cr',
        k1: 'PKR 1.7 - 2.4 Cr'
      },
      topResidencia: {
        name: 'Top Residencia',
        tag: 'Executive Enclave',
        m5: 'PKR 40 - 60 Lac',
        m10: 'PKR 80 - 1.2 Cr',
        k1: 'PKR 1.6 - 2.2 Cr'
      }
    },
    // Installment Plans
    installmentPlans: {
      faisalTown: {
        name: 'Faisal Town Phase 2',
        duration: '4.5-Year Easy Plan (18 Quarterly)',
        m5: { down: 'PKR 5.9 Lac', total: 'PKR 34.5 Lac', quarterly: 'PKR 130,000' },
        m8: { down: 'PKR 8.2 Lac', total: 'PKR 46.5 Lac', quarterly: 'PKR 175,000' },
        m10: { down: 'PKR 9.9 Lac', total: 'PKR 55.5 Lac', quarterly: 'PKR 215,000' },
        k1: { down: 'PKR 14.5 Lac', total: 'PKR 98.5 Lac', quarterly: 'PKR 395,000' }
      },
      blueWorld: {
        name: 'Blue World City',
        duration: '3 & 4-Year Flexible Plans',
        m5: { down: 'PKR 1.49 Lac', total: 'PKR 14.9 Lac', monthly: 'PKR 14,900' },
        m7: { down: 'PKR 2.45 Lac', total: 'PKR 24.5 Lac', monthly: 'PKR 24,500' },
        m10: { down: 'PKR 3.25 Lac', total: 'PKR 32.5 Lac', monthly: 'PKR 32,500' },
        k1: { down: 'PKR 5.8 Lac', total: 'PKR 58.0 Lac', monthly: 'PKR 58,000' }
      }
    },
    // PHA Flats (Official Islamabad Projects & Categories)
    phaFlats: {
      i16_typeE: {
        name: 'Sector I-16/3 — Type E (912 Sq Ft)',
        rate: 'PKR 55 - 72 Lac',
        specs: '~912 sq. ft. (2 beds, 2 baths) • G+6 Completed & Active Resale'
      },
      i16_typeB: {
        name: 'Sector I-16/3 — Type B (1,496 Sq Ft)',
        rate: 'PKR 1.15 - 1.45 Cr',
        specs: '~1,496 sq. ft. (3 beds, servant quarter) • G+6 Completed Blocks'
      },
      i12_typeDE: {
        name: 'Sector I-12/1 — Type D & Type E',
        rate: 'PKR 58 - 82 Lac',
        specs: '700–900+ sq. ft. (2-bed/2-bath) • 3,200 Units Nearing Completion'
      },
      kurri_g11: {
        name: 'G-11 / Kurri Road — Executive Residencia',
        rate: 'PKR 1.55 - 2.25 Cr',
        specs: 'Multi-Bedroom • Senior Officers (BPS 20–22) & Select Public Quotas'
      }
    },
    // Major Islamabad PHA Projects & Categories
    phaProjectsTable: [
      {
        location: 'Sector I-16/3',
        categories: 'Type E (2-Bed) & Type B (3-Bed)',
        specs: 'Type E is ~912 sq. ft. (2 beds, 2 baths). Type B is ~1,496 sq. ft. (3 beds, servant quarter). G+6 blocks with completed/active resale market.',
        status: 'Completed / Active Resale Market',
        badge: 'G+6 Completed Blocks'
      },
      {
        location: 'Sector I-12/1',
        categories: 'Type D & Type E',
        specs: 'Roughly 700–900+ sq. ft. layouts (2-bed/2-bath and slightly larger configurations). Comprises 3,200 units nearing completion, with limited re-balloted units.',
        status: 'Nearing Completion / Limited Re-balloted',
        badge: '3,200 Units'
      },
      {
        location: 'G-11 / Kurri Road',
        categories: 'Executive / Officers Residencia',
        specs: 'Larger multi-bedroom apartments. Primarily targeted at senior officers (BPS 20–22) and select general public quotas.',
        status: 'Executive Quota & Resale',
        badge: 'Officers Residencia'
      }
    ],
    // Solar Packages
    solarPackages: {
      kw10: { name: '10kW Residential Home', savings: 'PKR 70k–90k / mo', quote: 'PKR 1,150,000' },
      kw20: { name: '20kW Villa & Farmhouse', savings: 'PKR 160k–200k / mo', quote: 'PKR 2,150,000' },
      kw50: { name: '50kW Commercial Plaza', savings: 'PKR 400k–550k / mo', quote: 'PKR 4,950,000' }
    },
    // Harsukh Nathia Gali Suite Plans
    hrSukhSuites: [
      {
        id: 'studio',
        badge: 'Studio Suite',
        highlightTag: '',
        title: 'Executive Studio',
        area: '500–550 Sq Ft',
        price: 'PKR 85 Lac',
        featured: false,
        features: [
          'Open American Kitchenette',
          'Luxury Attached Bathroom',
          'Private Scenic Balcony',
          'Top Rental Demand for Couples'
        ],
        ctaLabel: 'Book Studio'
      },
      {
        id: '1bed',
        badge: 'Most Popular',
        highlightTag: '★ Top Family Pick',
        title: '1-Bed Alpine Flat',
        area: '850 Sq Ft',
        price: 'PKR 1.25 Crore',
        featured: true,
        features: [
          'Master Bedroom + Lounge',
          'Fully Equipped Kitchen',
          'Expansive Pine View Terrace',
          'Ideal for Family Vacation'
        ],
        ctaLabel: 'Book 1-Bed Flat'
      },
      {
        id: '2bed',
        badge: 'Penthouse',
        highlightTag: '',
        title: '2-Bed Mountain Suite',
        area: '1,250 Sq Ft',
        price: 'PKR 1.85 Crore',
        featured: false,
        features: [
          '2 Large En-Suite Bedrooms',
          'Large Living & Dining Hall',
          'Double Panoramic Balcony',
          'Friends & Extended Family'
        ],
        ctaLabel: 'Book 2-Bed Suite'
      }
    ]
  }

  const storedRates = JSON.parse(localStorage.getItem(STORAGE_KEYS.RATES) || 'null')
  const liveRates = ref({
    ...defaultRates,
    ...(storedRates || {}),
    phaFlats: (storedRates?.phaFlats && Object.keys(storedRates.phaFlats).some(k => k.startsWith('i16_') || k.startsWith('i12_') || k.startsWith('kurri_')))
      ? storedRates.phaFlats
      : defaultRates.phaFlats,
    phaProjectsTable: (storedRates?.phaProjectsTable && storedRates.phaProjectsTable.length > 0)
      ? storedRates.phaProjectsTable
      : defaultRates.phaProjectsTable,
    hrSukhSuites: (storedRates?.hrSukhSuites && storedRates.hrSukhSuites.length > 0)
      ? storedRates.hrSukhSuites
      : defaultRates.hrSukhSuites
  })

  const saveLiveRates = async (newRates) => {
    liveRates.value = { ...liveRates.value, ...newRates }
    localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(liveRates.value))
    try {
      const res = await fetch(`${API_BASE_URL}/rates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(liveRates.value)
      })
      if (res.ok) apiConnected.value = true
    } catch (e) {}
  }

  // 4. CEOs/Founders, Real Estate Agents & PEC Engineers (Syncs with Laravel /api/team & TeamPage.vue)
  const defaultTeamMembers = [
    {
      id: 'ceo-1',
      name: 'Executive CEO & Founder',
      role: 'CEO & Founder — Real Estate & Investments',
      category: 'ceo',
      tag: 'Founder & Chief Executive',
      experience: '15+ Years',
      phone: '0334-9522157',
      whatsapp: '923349522157',
      email: 'toplinkers12@gmail.com',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
      quote: 'At TopLinkers, our mission is straightforward: absolute transparency in property documentation, verified CDA/RDA titles, and rewarding real estate investments across Islamabad & Rawalpindi.',
      bio: 'Leading land acquisitions, TopCity-1, PECHS, Faisal Town Phase 2, and Harsukh Nathia Gali luxury developments.',
      address: '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan, 4004884'
    },
    {
      id: 'ceo-2',
      name: 'Co-Founder & Managing CEO',
      role: 'Co-Founder — Construction & Solar Engineering',
      category: 'ceo',
      tag: 'Co-Founder & Managing CEO',
      experience: '14+ Years',
      phone: '0332-4004884',
      whatsapp: '923324004884',
      email: 'toplinkers12@gmail.com',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      quote: 'Precision engineering in turnkey residential construction and high-yield solar net metering execution defines every project we deliver at TopLinkers.',
      bio: 'Overseeing turnkey villa builds, PHA apartments trading, corporate joint ventures, and commercial solar infrastructure.',
      address: '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan, 4004884'
    },
    {
      id: 'agent-1',
      name: 'Muhammad Tariq',
      role: 'Principal Property Consultant',
      category: 'agent',
      tag: 'Senior Agent',
      experience: '12+ Years',
      phone: '+92 334 9522157',
      whatsapp: '923349522157',
      email: 'toplinkers12@gmail.com',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      bio: 'Senior property investment consultant with 12+ years in Islamabad CDA sectors, Moqa Ka Plots (PECHS, AGG, TopCity-1), and Gulberg Greens commercial plazas.',
      address: 'Al Hameed Plaza, G-11 Markaz, Islamabad'
    },
    {
      id: 'agent-2',
      name: 'Kamran Akhtar',
      role: 'Senior Sales Specialist — PHA & Installments',
      category: 'agent',
      tag: 'Sales Specialist',
      experience: '9+ Years',
      phone: '+92 334 9522157',
      whatsapp: '923349522157',
      email: 'toplinkers12@gmail.com',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      bio: 'Specialized in PHA apartments (I-12, I-16), Faisal Town Phase II (FT-II), Blue World City files, and fast verified transfers.',
      address: 'Al Hameed Plaza, G-11 Markaz, Islamabad'
    },
    {
      id: 'agent-3',
      name: 'Zainab Rehman',
      role: 'Overseas Client & Corporate Advisor',
      category: 'agent',
      tag: 'Overseas Desk',
      experience: '7+ Years',
      phone: '+92 334 9522157',
      whatsapp: '923349522157',
      email: 'toplinkers12@gmail.com',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Dedicated advisor for overseas Pakistani investors (UK, UAE, USA) seeking secure plots, Harsukh Nathia Gali suites, and luxury villas.',
      address: 'Al Hameed Plaza, G-11 Markaz, Islamabad'
    },
    {
      id: 'eng-1',
      name: 'Engr. Asif Mahmood',
      role: 'Chief Civil & Turnkey Construction Engineer',
      category: 'engineer',
      tag: 'PEC Registered Civil Eng.',
      experience: '11+ Years',
      phone: '+92 332 4004884',
      whatsapp: '923324004884',
      email: 'toplinkers12@gmail.com',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'PEC-licensed structural & turnkey construction engineer leading A+ grey structure quality, BOQ estimation, and modern villa finishing.',
      address: 'Al Hameed Plaza, G-11 Markaz, Islamabad'
    },
    {
      id: 'eng-2',
      name: 'Engr. Salman Qureshi',
      role: 'Lead Solar & IESCO Net-Metering Engineer',
      category: 'engineer',
      tag: 'PEC Registered Solar Eng.',
      experience: '8+ Years',
      phone: '+92 332 4004884',
      whatsapp: '923324004884',
      email: 'toplinkers12@gmail.com',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Specialist in 10kW, 20kW, and 50kW Tier-1 hybrid & on-grid solar installations with turnkey IESCO green net-metering clearance.',
      address: 'Al Hameed Plaza, G-11 Markaz, Islamabad'
    }
  ]

  const teamMembers = ref(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAM) || 'null') || defaultTeamMembers
  )

  const saveTeamLocal = () => {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(teamMembers.value))
  }

  const ceos = computed(() =>
    teamMembers.value.filter(m => ['ceo', 'founder', 'owner', 'partner'].includes(m.category))
  )
  const agentsList = computed(() =>
    teamMembers.value.filter(m => ['agent', 'employee'].includes(m.category))
  )
  const engineersList = computed(() =>
    teamMembers.value.filter(m => m.category === 'engineer')
  )
  const fieldTeam = computed(() =>
    teamMembers.value.filter(m => ['agent', 'employee', 'engineer'].includes(m.category))
  )

  // Aliases kept for backwards compatibility
  const ownerProfile = computed(() => ceos.value[0] || defaultTeamMembers[0])
  const partners = computed(() => ceos.value.slice(1))
  const employees = computed(() => fieldTeam.value)

  const saveTeamMember = async (memberData) => {
    const cleanWa = (memberData.phone || '03349522157').replace(/[^0-9]/g, '')
    const whatsappNum = cleanWa.startsWith('0') ? '92' + cleanWa.substring(1) : cleanWa

    const item = {
      id: memberData.id || ('TM-' + Math.floor(100 + Math.random() * 900)),
      ...memberData,
      whatsapp: memberData.whatsapp || whatsappNum
    }

    const idx = teamMembers.value.findIndex(m => m.id === item.id)
    if (idx !== -1) {
      teamMembers.value[idx] = item
    } else {
      teamMembers.value.push(item)
    }
    saveTeamLocal()

    try {
      const res = await fetch(`${API_BASE_URL}/team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(item)
      })
      if (res.ok) apiConnected.value = true
    } catch (e) {}

    return item
  }

  const deleteTeamMember = async (id) => {
    teamMembers.value = teamMembers.value.filter(m => m.id !== id)
    saveTeamLocal()
    try {
      const res = await fetch(`${API_BASE_URL}/team/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      })
      if (res.ok) apiConnected.value = true
    } catch (e) {}
  }

  // 5. Roles & Permissions Governance (Syncs with Laravel /api/roles & AdminRoles.vue)
  const defaultPermissions = [
    { id: 'PERM-1', key: 'dashboard.view', label: 'View Executive Dashboard', module: 'Dashboard', description: 'Access analytics overview and summary cards', isSystem: true },
    { id: 'PERM-2', key: 'leads.view', label: 'View Leads & Inquiries', module: 'Leads & CRM', description: 'Browse incoming client inquiries and CRM pipeline', isSystem: true },
    { id: 'PERM-3', key: 'leads.create', label: 'Create Walk-in / Manual Leads', module: 'Leads & CRM', description: 'Log phone and walk-in client inquiries', isSystem: true },
    { id: 'PERM-4', key: 'leads.edit', label: 'Update Lead Status & Notes', module: 'Leads & CRM', description: 'Change lead stage and priority', isSystem: true },
    { id: 'PERM-5', key: 'leads.delete', label: 'Delete Leads', module: 'Leads & CRM', description: 'Permanently remove lead records', isSystem: true },
    { id: 'PERM-6', key: 'rates.view', label: 'View Live Market Rates', module: 'Live Rates', description: 'View plot, flat, and solar rates matrix', isSystem: true },
    { id: 'PERM-7', key: 'rates.edit', label: 'Update & Publish Live Rates', module: 'Live Rates', description: 'Modify society plot and installment pricing', isSystem: true },
    { id: 'PERM-8', key: 'properties.view', label: 'View Properties Inventory', module: 'Properties', description: 'Access property listings catalog', isSystem: true },
    { id: 'PERM-9', key: 'properties.create', label: 'Add New Properties', module: 'Properties', description: 'Publish plots, houses, or commercial properties', isSystem: true },
    { id: 'PERM-10', key: 'properties.edit', label: 'Edit Properties & Location Pin', module: 'Properties', description: 'Modify listing details, photos, and map coordinates', isSystem: true },
    { id: 'PERM-11', key: 'properties.delete', label: 'Delete Properties', module: 'Properties', description: 'Remove listings from public and admin catalog', isSystem: true },
    { id: 'PERM-12', key: 'team.view', label: 'View CEOs, Agents & Engineers', module: 'Owner & Team', description: 'Inspect leadership and field team directory', isSystem: true },
    { id: 'PERM-13', key: 'team.manage', label: 'Add, Edit & Delete Team Members', module: 'Owner & Team', description: 'Full control over leadership and employee profiles', isSystem: true },
    { id: 'PERM-14', key: 'roles.view', label: 'View Roles & Permissions', module: 'Roles & Access', description: 'Inspect portal roles and permission assignments', isSystem: true },
    { id: 'PERM-15', key: 'roles.manage', label: 'Create & Edit Roles / Permissions', module: 'Roles & Access', description: 'Manage access control roles and create custom permissions', isSystem: true },
    { id: 'PERM-16', key: 'reviews.view', label: 'View Client Reviews', module: 'Client Reviews', description: 'Inspect client ratings and testimonials', isSystem: true },
    { id: 'PERM-17', key: 'reviews.manage', label: 'Manage Client Reviews', module: 'Client Reviews', description: 'Add, update and delete client reviews and ratings', isSystem: true },
    { id: 'PERM-18', key: 'users.manage', label: 'Manage Portal Login Users', module: 'Roles & Access', description: 'Create and configure portal user logins, passwords and permissions', isSystem: true },
    { id: 'PERM-19', key: 'blogs.view', label: 'View Blog Articles', module: 'Blog & Articles', description: 'Browse property analysis articles and market guides', isSystem: true },
    { id: 'PERM-20', key: 'blogs.manage', label: 'Publish, Edit & Delete Articles', module: 'Blog & Articles', description: 'Create, update, and publish articles to website and database', isSystem: true }
  ]

  const defaultRoles = [
    {
      id: 'RL-SUPER',
      name: 'Super Admin',
      slug: 'super-admin',
      description: 'Full unrestricted access across CRM leads, live market rates, properties, team directory, and role governance.',
      color: 'navy',
      permissions: defaultPermissions.map(p => p.key),
      isSystem: true,
      isActive: true
    },
    {
      id: 'RL-CRM',
      name: 'CRM & Sales Manager',
      slug: 'crm-sales-manager',
      description: 'Manages walk-in leads, client follow-ups, pipeline stages, and views property inventory & market rates.',
      color: 'cyan',
      permissions: ['dashboard.view', 'leads.view', 'leads.create', 'leads.edit', 'rates.view', 'properties.view', 'team.view'],
      isSystem: false,
      isActive: true
    },
    {
      id: 'RL-LEADS-ONLY',
      name: 'Leads & Sales Agent',
      slug: 'leads-sales-agent',
      description: 'Exclusive access to browse, log, and update client CRM leads and inquiries only.',
      color: 'blue',
      permissions: ['leads.view', 'leads.create', 'leads.edit'],
      isSystem: false,
      isActive: true
    },
    {
      id: 'RL-INV',
      name: 'Inventory & Listings Editor',
      slug: 'inventory-listings-editor',
      description: 'Creates and updates property listings, coordinates, multi-image galleries, and live society rate sheets.',
      color: 'emerald',
      permissions: ['dashboard.view', 'properties.view', 'properties.create', 'properties.edit', 'rates.view', 'rates.edit'],
      isSystem: false,
      isActive: true
    },
    {
      id: 'RL-PROPERTIES-ONLY',
      name: 'Property Listings Manager',
      slug: 'property-listings-manager',
      description: 'Exclusive access to manage property inventory, coordinates, and galleries.',
      color: 'teal',
      permissions: ['properties.view', 'properties.create', 'properties.edit'],
      isSystem: false,
      isActive: true
    },
    {
      id: 'RL-HR',
      name: 'HR & Team Coordinator',
      slug: 'hr-team-coordinator',
      description: 'Maintains owner profiles, senior real estate agents, and PEC engineers directory.',
      color: 'amber',
      permissions: ['dashboard.view', 'team.view', 'team.manage'],
      isSystem: false,
      isActive: true
    }
  ]

  const permissions = ref(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.PERMISSIONS) || 'null') || defaultPermissions
  )

  const roles = ref(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.ROLES) || 'null') || defaultRoles
  )

  const saveRolesLocal = () => {
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles.value))
  }

  const savePermissionsLocal = () => {
    localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions.value))
  }

  const saveRole = async (roleData) => {
    const cleanName = (roleData.name || '').trim()
    const slug = roleData.slug || cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const item = {
      id: roleData.id || ('RL-' + Math.floor(100 + Math.random() * 900)),
      slug,
      description: '',
      color: 'cyan',
      permissions: [],
      isSystem: false,
      isActive: true,
      ...roleData,
      name: cleanName
    }

    const idx = roles.value.findIndex(r => r.id === item.id)
    if (idx !== -1) {
      roles.value[idx] = item
    } else {
      roles.value.push(item)
    }
    saveRolesLocal()

    try {
      const res = await fetch(`${API_BASE_URL}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(item)
      })
      if (res.ok) apiConnected.value = true
    } catch (e) {}

    return item
  }

  const deleteRole = async (id) => {
    const target = roles.value.find(r => r.id === id)
    if (target?.isSystem) return
    roles.value = roles.value.filter(r => r.id !== id)
    saveRolesLocal()

    try {
      const res = await fetch(`${API_BASE_URL}/roles/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      })
      if (res.ok) apiConnected.value = true
    } catch (e) {}
  }

  const createPermission = async (permData) => {
    const cleanKey = (permData.key || permData.label || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, '_')
      .replace(/^_|_$/g, '')

    const item = {
      id: 'PERM-' + Math.floor(100 + Math.random() * 900),
      key: cleanKey,
      label: (permData.label || '').trim(),
      module: permData.module || 'Custom',
      description: (permData.description || '').trim(),
      isSystem: false
    }

    const existingIdx = permissions.value.findIndex(p => p.key === item.key)
    if (existingIdx !== -1) {
      permissions.value[existingIdx] = { ...permissions.value[existingIdx], ...item }
    } else {
      permissions.value.push(item)
    }
    savePermissionsLocal()

    try {
      const res = await fetch(`${API_BASE_URL}/permissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(item)
      })
      if (res.ok) {
        const saved = await res.json()
        if (saved?.id) {
          const i = permissions.value.findIndex(p => p.key === item.key)
          if (i !== -1) permissions.value[i] = saved
          savePermissionsLocal()
        }
        apiConnected.value = true
      }
    } catch (e) {}

    return item
  }

  const deletePermission = async (id, key) => {
    const target = permissions.value.find(p => p.id === id || p.key === key)
    if (target?.isSystem) return
    const permKey = target?.key || key
    permissions.value = permissions.value.filter(p => p.id !== id && p.key !== permKey)
    savePermissionsLocal()

    // Strip deleted permission from existing roles locally too
    roles.value = roles.value.map(r => ({
      ...r,
      permissions: (r.permissions || []).filter(k => k !== permKey)
    }))
    saveRolesLocal()

    try {
      const res = await fetch(`${API_BASE_URL}/permissions/${encodeURIComponent(id || permKey)}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      })
      if (res.ok) apiConnected.value = true
    } catch (e) {}
  }

  // 5.1 Portal Login Users & Access Management (Syncs with Laravel /api/users)
  const defaultUsers = [
    {
      id: 1,
      name: 'TopLinkers Executive',
      email: 'toplinkers@gmail.com',
      role: 'Super Admin',
      permissions: ['all'],
      is_active: true,
      created_at: '2026-11-10 10:00:00'
    }
  ]

  const users = ref(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || 'null') || defaultUsers
  )

  const saveUsersLocal = () => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users.value))
  }

  const fetchUsers = async () => {
    try {
      const token = adminUser.value?.token
      const headers = { 'Accept': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
      const res = await fetch(`${API_BASE_URL}/users`, { headers })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          users.value = data
          saveUsersLocal()
        }
        apiConnected.value = true
      }
    } catch (e) {}
  }

  const createUser = async (userData) => {
    try {
      const token = adminUser.value?.token
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(userData)
      })
      if (res.ok) {
        const newUser = await res.json()
        users.value.unshift(newUser)
        saveUsersLocal()
        apiConnected.value = true
        showToast(`User account "${newUser.name}" created successfully.`)
        return { success: true, user: newUser }
      } else {
        const err = await res.json().catch(() => ({}))
        const msg = err.errors ? Object.values(err.errors).flat().join(', ') : (err.message || 'Failed to create user')
        showToast(msg, 'error')
        return { success: false, message: msg }
      }
    } catch (e) {
      // Offline fallback
      const fallbackUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'Restricted User',
        permissions: userData.permissions || [],
        is_active: userData.is_active ?? true,
        created_at: new Date().toISOString()
      }
      users.value.unshift(fallbackUser)
      saveUsersLocal()
      showToast(`User "${fallbackUser.name}" created in local storage mode.`)
      return { success: true, user: fallbackUser }
    }
  }

  const updateUser = async (id, userData) => {
    try {
      const token = adminUser.value?.token
      const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(userData)
      })
      if (res.ok) {
        const updated = await res.json()
        const idx = users.value.findIndex(u => u.id === id)
        if (idx !== -1) users.value[idx] = updated
        saveUsersLocal()
        apiConnected.value = true

        if (adminUser.value?.id === id || adminUser.value?.email === updated.email) {
          adminUser.value = { ...adminUser.value, ...updated }
          localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(adminUser.value))
        }
        showToast(`User "${updated.name}" updated successfully.`)
        return { success: true, user: updated }
      } else {
        const err = await res.json().catch(() => ({}))
        const msg = err.errors ? Object.values(err.errors).flat().join(', ') : (err.message || 'Failed to update user')
        showToast(msg, 'error')
        return { success: false, message: msg }
      }
    } catch (e) {
      const idx = users.value.findIndex(u => u.id === id)
      if (idx !== -1) {
        users.value[idx] = { ...users.value[idx], ...userData }
        saveUsersLocal()
      }
      showToast('User account updated locally.')
      return { success: true }
    }
  }

  const deleteUser = async (id) => {
    const target = users.value.find(u => u.id === id)
    if (target?.email === 'admin@toplinkers.com' || target?.id === 1) {
      showToast('Cannot delete the root administrator account.', 'error')
      return { success: false, message: 'Cannot delete root admin' }
    }

    const ok = await requestConfirm({
      title: 'Delete User Account',
      message: `Are you sure you want to permanently delete login access for "${target?.name || 'this user'}" (${target?.email})?`,
      confirmText: 'Delete Account'
    })
    if (!ok) return { success: false }

    try {
      const token = adminUser.value?.token
      const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      })
      if (res.ok) {
        users.value = users.value.filter(u => u.id !== id)
        saveUsersLocal()
        apiConnected.value = true
        showToast('User login account deleted.')
        return { success: true }
      } else {
        const err = await res.json().catch(() => ({}))
        showToast(err.message || 'Failed to delete user', 'error')
        return { success: false }
      }
    } catch (e) {
      users.value = users.value.filter(u => u.id !== id)
      saveUsersLocal()
      showToast('User account deleted.')
      return { success: true }
    }
  }

  // Permission & RBAC Verification Helpers
  const canAccessModule = (moduleKey) => {
    if (!isAuthenticated.value) return false
    const user = adminUser.value
    if (!user) return false
    // Root administrator always has access to all modules
    if (user.email === 'toplinkers@gmail.com' || user.email === 'admin@toplinkers.com' || user.role === 'Super Admin' || user.role === 'Chief Administrator') {
      return true
    }
    const perms = Array.isArray(user.permissions) ? user.permissions : []
    if (perms.includes('all') || perms.includes('*')) {
      return true
    }
    if (perms.includes(moduleKey)) return true
    return perms.some(p => p.startsWith(moduleKey + '.') || p.startsWith(moduleKey + ':') || p === moduleKey)
  }

  const hasPermission = (permissionKey) => {
    if (!isAuthenticated.value) return false
    const user = adminUser.value
    if (!user) return false
    if (user.email === 'admin@toplinkers.com' || user.role === 'Super Admin' || user.role === 'Chief Administrator') {
      return true
    }
    const perms = Array.isArray(user.permissions) ? user.permissions : []
    if (perms.includes('all') || perms.includes('*')) {
      return true
    }
    return perms.includes(permissionKey)
  }

  const allowedModules = computed(() => {
    const modules = ['dashboard', 'leads', 'rates', 'properties', 'team', 'roles', 'reviews', 'blogs']
    return modules.filter(m => canAccessModule(m))
  })

  // 6. Client Reviews & Testimonials (Syncs with Laravel /api/reviews & Testimonials.vue)
  const defaultReviews = [
    {
      id: 'REV-101',
      name: 'Chaudhry Naveed Sahi',
      role: 'Home Buyer — Gulberg Greens',
      location: 'Gulberg Greens, Islamabad',
      project: 'TopCity-1 (10 Marla)',
      quote: 'Buying our 10 Marla residential plot in TopCity through TopLinkers was seamless. Their team handled CDA & RDA verification, transfer paperwork, and on-ground demarcation within three working days. Honest and transparent advisory throughout!',
      rating: 5
    },
    {
      id: 'REV-102',
      name: 'Engr. Salman Qureshi',
      role: 'Property Investor & Landlord',
      location: 'Sector I-12, Islamabad',
      project: 'PHA Flats & 20kW Solar',
      quote: 'I invested in PHA Sector I-12 and I-16 flats on installments based on TopLinkers analysis. The capital appreciation has exceeded expectations, and their construction and solar team also handled our villa electrification with top-tier Tier-1 panels.',
      rating: 5
    },
    {
      id: 'REV-103',
      name: 'Dr. Sarah Mansoor',
      role: 'Property Seller — Overseas UK',
      location: 'Manchester, United Kingdom',
      project: 'Faisal Town Phase 2 File',
      quote: 'As an overseas Pakistani living in the UK, finding reliable real estate representation in Islamabad can be daunting. TopLinkers sold my FT-II commercial file at market-leading price and transferred proceeds securely. Truly dependable!',
      rating: 5
    },
    {
      id: 'REV-104',
      name: 'Malik Jahangir Awan',
      role: 'Commercial Investor — Dubai UAE',
      location: 'Dubai, United Arab Emirates',
      project: 'PECHS Islamabad (1 Kanal)',
      quote: 'Secured a prime 1 Kanal Moqa Ka Plot on Kashmir Highway through TopLinkers. Physical demarcation and registry transfer were completed without me having to travel to Pakistan. 100% genuine advisory for overseas investors.',
      rating: 5
    },
    {
      id: 'REV-105',
      name: 'Brig. (R) Tariq Mahmud',
      role: 'Villa Owner — DHA Phase 2',
      location: 'DHA Phase 2, Islamabad',
      project: 'Turnkey Luxury Villa Construction',
      quote: 'TopLinkers completed our 1 Kanal turnkey designer villa in DHA with exceptional structural integrity, Amreli 60-grade steel, and imported finishings on time and within agreed budget. Their engineering standards are second to none.',
      rating: 5
    },
    {
      id: 'REV-106',
      name: 'Zainab & Hammad Farooq',
      role: 'Vacation Suite Investors',
      location: 'DHA Phase 5, Lahore',
      project: 'Harsukh Nathia Gali Suites',
      quote: 'Booked a 2-Bed scenic vacation suite in Harsukh Nathia Gali with only 15% down payment. The panoramic pine valley views and hands-off rental management model make it our highest-yield real estate asset.',
      rating: 5
    },
    {
      id: 'REV-107',
      name: 'Farhan Bashir',
      role: 'Factory Owner — I-9 Industrial',
      location: 'Industrial Area, Islamabad',
      project: '50kW Commercial Solar Net Metering',
      quote: 'Our industrial electricity bills dropped to near zero within two billing cycles. TopLinkers solar engineering division processed our IESCO Green Meter paperwork smoothly without bureaucratic delays.',
      rating: 5
    },
    {
      id: 'REV-108',
      name: 'Khurram Shahzad',
      role: 'Overseas Pakistani — USA',
      location: 'Dallas, Texas, USA',
      project: 'Airport Green Garden (AGG) Plot',
      quote: 'TopLinkers transparent video inspection and live title verification gave me full confidence to invest in Airport Green Garden. Their consultants are thoroughly professional and genuinely look after overseas clients.',
      rating: 5
    },
    {
      id: 'REV-109',
      name: 'Syed Kashif Raza',
      role: 'Apartment Owner — PHA I-12',
      location: 'Sector I-12, Islamabad',
      project: 'PHA Sector I-12/1 Type D Flat',
      quote: 'Secured a 2-bed Type D apartment in Sector I-12/1 through TopLinkers. Their team assisted with balloting verification, file transfer at PHA head office, and possession inspection. Highly recommended!',
      rating: 5
    },
    {
      id: 'REV-110',
      name: 'Mrs. Ayesha Haroon',
      role: 'Government Officer (BPS-19)',
      location: 'Sector G-11, Islamabad',
      project: 'PHA G-11 Officers Residencia',
      quote: 'TopLinkers facilitated the purchase of our 3-bed executive apartment in G-11 Officers Residencia. Legal clearance and allotment documentation were handled flawlessly.',
      rating: 5
    },
    {
      id: 'REV-111',
      name: 'Raja Daniyal Kayani',
      role: 'Resident Owner — Sector I-16',
      location: 'Rawalpindi',
      project: 'PHA I-16/3 Ready G+6 Flat',
      quote: 'Moved into our 2-bed apartment in Sector I-16/3 last month. TopLinkers ensured active elevator testing, electricity connection, and hassle-free registry transfer.',
      rating: 5
    },
    {
      id: 'REV-112',
      name: 'Major (R) Waqas Abbasi',
      role: 'Overseas Investor — Riyadh KSA',
      location: 'Riyadh, Saudi Arabia',
      project: 'Banu Hafeez Complex 3-Bed',
      quote: 'Investing from Saudi Arabia was worry-free thanks to TopLinkers. They provided 4K walk-through videos and secured our 3-bed corner flat in Banu Hafeez Complex at developer price.',
      rating: 5
    },
    {
      id: 'REV-113',
      name: 'Dr. Bilal Ahmad Khan',
      role: 'Consultant Physician',
      location: 'Sector F-10, Islamabad',
      project: 'TopCity-1 Kunar Heights Flat',
      quote: 'TopLinkers advised us to book a 2-bed luxury flat in Kunar Heights TopCity-1. Their market timing analysis was spot-on, generating solid capital gain within 9 months.',
      rating: 5
    },
    {
      id: 'REV-114',
      name: 'Mian Usman Rafiq',
      role: 'Textile Exporter — Faisalabad',
      location: 'Faisalabad & Islamabad',
      project: 'Gulberg Greens Opal Square Suite',
      quote: 'Purchased a 2-bed corporate executive suite in Opal Square, Gulberg Greens. TopLinkers structured an easy installment schedule and ensured CDA compliance.',
      rating: 5
    },
    {
      id: 'REV-115',
      name: 'Hajra Begum',
      role: 'Retired School Principal',
      location: 'Chaklala Scheme 3, Rawalpindi',
      project: 'Kurri Road PHA Residencia',
      quote: 'TopLinkers consultants are honest, polite, and extremely thorough with land registry details. My Kurri Road apartment transfer went without a single hitch.',
      rating: 5
    },
    {
      id: 'REV-116',
      name: 'Engr. Noman Siddiqui',
      role: 'Software Architect — London UK',
      location: 'London, United Kingdom',
      project: 'Faisal Town F-17 Executive Flat',
      quote: 'I managed my real estate investment completely remotely from London. TopLinkers digital verification, legal checks, and banking coordination were world-class.',
      rating: 5
    },
    {
      id: 'REV-117',
      name: 'Tariq Mehmood Gondal',
      role: 'Commercial Plaza Owner',
      location: 'Sector G-11 Markaz, Islamabad',
      project: 'Al Hameed Plaza G-11 Office',
      quote: 'Purchased a prime 2nd floor corporate office in Al Hameed Plaza G-11 Markaz. Rental yield is steady at 8.5% per annum. TopLinkers is our trusted lifetime advisor.',
      rating: 5
    },
    {
      id: 'REV-118',
      name: 'Chaudhry Arshad Gujjar',
      role: 'Agricultural Landlord',
      location: 'Gujar Khan & Islamabad',
      project: 'PECHS Islamabad Block K Flat',
      quote: 'Bought a 2-bed flat in PECHS Islamabad near the airport for my university-going children. TopLinkers gave accurate advice on upcoming road infrastructure.',
      rating: 5
    },
    {
      id: 'REV-119',
      name: 'Dr. Maimoona Siddiqui',
      role: 'Professor & Researcher',
      location: 'Sector H-8, Islamabad',
      project: '15kW Residential On-Grid Solar',
      quote: 'TopLinkers solar engineering team installed our 15kW Longi/Huawei system in just four days. IESCO net-metering green meter was energized within 3 weeks.',
      rating: 5
    },
    {
      id: 'REV-120',
      name: 'Sheikh Imran Nazir',
      role: 'Auto Parts Distributor',
      location: 'Sector I-10 Industrial, Islamabad',
      project: '30kW Commercial Hybrid Solar',
      quote: 'Installed a 30kW hybrid solar system for our central warehouse. Power reliability has been 100% through summer peak load. Outstanding engineering support.',
      rating: 5
    },
    {
      id: 'REV-121',
      name: 'Hassan Raza Jafri',
      role: 'Bank Vice President',
      location: 'Bahria Town Phase 7, Rawalpindi',
      project: 'Turnkey 10 Marla Luxury House',
      quote: 'TopLinkers constructed our 10 Marla modern house from grey structure to turnkey interior finishing. Quality of Grade-60 steel, plumbing, and woodwork exceeded all standards.',
      rating: 5
    },
    {
      id: 'REV-122',
      name: 'Mrs. Samina Parveen',
      role: 'Overseas Pakistani — Toronto Canada',
      location: 'Toronto, Canada',
      project: 'Banu Hafeez 2-Bed Master Suite',
      quote: 'TopLinkers verified the land title, handled the power of attorney paperwork, and secured our apartment in Banu Hafeez Complex seamlessly while I stayed in Canada.',
      rating: 5
    },
    {
      id: 'REV-123',
      name: 'Col. (R) Iftikhar Dara',
      role: 'Defense Housing Resident',
      location: 'DHA Phase 5, Islamabad',
      project: 'TopCity-1 Block C Plot Demarcation',
      quote: 'Their on-ground survey team physically pegged and demarcated our 1 Kanal plot in TopCity-1 with digital GPS coordinates. Professionalism at its peak.',
      rating: 5
    },
    {
      id: 'REV-124',
      name: 'Adeel Munir',
      role: 'Tech Entrepreneur — Silicon Valley',
      location: 'San Jose, California, USA',
      project: 'Harsukh Nathia Gali Holiday Suite',
      quote: 'The guaranteed rental program and panoramic mountain views in Nathia Gali made this an effortless investment from California. TopLinkers executed everything seamlessly.',
      rating: 5
    }
  ]

  const reviews = ref(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || 'null') || defaultReviews
  )

  const saveReviewsLocal = () => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews.value))
  }

  const saveReview = async (reviewData) => {
    const item = {
      id: reviewData.id || ('REV-' + Math.floor(100 + Math.random() * 900)),
      name: (reviewData.name || '').trim(),
      role: (reviewData.role || 'Verified Client').trim(),
      location: (reviewData.location || 'Islamabad').trim(),
      project: (reviewData.project || 'TopLinkers Advisory').trim(),
      quote: (reviewData.quote || '').trim(),
      rating: Number(reviewData.rating) || 5
    }

    const idx = reviews.value.findIndex(r => r.id === item.id)
    if (idx !== -1) {
      reviews.value[idx] = item
    } else {
      reviews.value.unshift(item)
    }
    saveReviewsLocal()

    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(item)
      })
      if (res.ok) apiConnected.value = true
    } catch (e) {}

    return item
  }

  const deleteReview = async (id) => {
    reviews.value = reviews.value.filter(r => r.id !== id)
    saveReviewsLocal()

    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      })
      if (res.ok) apiConnected.value = true
    } catch (e) {}
  }

  // 7. Front Page Top Offer Announcement Strip (Syncs with Laravel /api/promo-strip & TopOfferStrip.vue)
  const defaultPromoStrip = {
    enabled: true,
    badge: 'LIMITED OFFER',
    text: 'Flash Booking Offer: Special Reduced Rates on Selected PECHS / TopCity Plots & Harsukh Suites!',
    ctaLabel: 'Explore Offers',
    ctaLink: '/listings',
    expiresAt: ''
  }

  const promoStrip = ref(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.PROMO_STRIP) || 'null') || defaultPromoStrip
  )

  const savePromoStrip = async (data) => {
    promoStrip.value = { ...defaultPromoStrip, ...data }
    localStorage.setItem(STORAGE_KEYS.PROMO_STRIP, JSON.stringify(promoStrip.value))
    try {
      const res = await fetch(`${API_BASE_URL}/promo-strip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(promoStrip.value)
      })
      if (res.ok) apiConnected.value = true
    } catch (e) {}
  }

  // Metrics Computed
  const totalLeadsCount = computed(() => leads.value.length)
  const newLeadsCount = computed(() => leads.value.filter(l => l.status === 'New').length)
  const contactedLeadsCount = computed(() => leads.value.filter(l => l.status === 'Contacted').length)
  const closedLeadsCount = computed(() => leads.value.filter(l => l.status === 'Closed / Won').length)

  // Trigger initial backend sync deferred in background so public page rendering is 100% instant
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => { syncFromBackend() }, { timeout: 2000 })
    } else {
      setTimeout(() => { syncFromBackend() }, 200)
    }
  }

  // 7. Blog & Articles Management (Syncs with Laravel /api/blogs)
  const blogs = ref([])
  const isBlogsLoading = ref(false)

  const fetchBlogs = async () => {
    isBlogsLoading.value = true
    try {
      const data = await api.getPosts({ admin: true })
      blogs.value = data
      return data
    } catch (e) {
      console.error('Failed to load blogs', e)
      return []
    } finally {
      isBlogsLoading.value = false
    }
  }

  const saveBlog = async (blogData) => {
    try {
      let saved
      if (blogData.id && !blogData.isNew) {
        saved = await api.updatePost(blogData.id, blogData)
        const idx = blogs.value.findIndex(b => b.id == blogData.id || b.slug === blogData.slug)
        if (idx !== -1) blogs.value[idx] = saved
        else blogs.value.unshift(saved)
      } else {
        saved = await api.createPost(blogData)
        blogs.value.unshift(saved)
      }
      showToast(blogData.id && !blogData.isNew ? 'Article updated successfully!' : 'Article published successfully!', 'success')
      return saved
    } catch (e) {
      console.error('Failed to save blog', e)
      showToast(e.message || 'Error saving article', 'error')
      throw e
    }
  }

  const uploadImage = async (file) => {
    try {
      const res = await api.uploadImage(file)
      showToast('Image uploaded successfully!', 'success')
      return res
    } catch (e) {
      console.warn('Direct upload failed, using client storage', e)
      throw e
    }
  }

  const deleteBlog = async (id) => {
    try {
      await api.deletePost(id)
      blogs.value = blogs.value.filter(b => b.id != id && b.slug != id)
      showToast('Article deleted successfully!', 'success')
      return true
    } catch (e) {
      console.error('Failed to delete blog', e)
      showToast('Error deleting article', 'error')
      throw e
    }
  }

  const totalBlogsCount = computed(() => blogs.value.length)


  return {
    apiConnected,
    toast,
    showToast,
    hideToast,
    confirmDialog,
    requestConfirm,
    resolveConfirm,
    syncFromBackend,
    isAuthenticated,
    adminUser,
    login,
    logout,
    leads,
    addLead,
    updateLeadStatus,
    deleteLead,
    liveRates,
    saveLiveRates,
    teamMembers,
    ceos,
    agentsList,
    engineersList,
    fieldTeam,
    ownerProfile,
    partners,
    employees,
    saveTeamMember,
    deleteTeamMember,
    roles,
    permissions,
    saveRole,
    deleteRole,
    createPermission,
    deletePermission,
    users,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    canAccessModule,
    hasPermission,
    allowedModules,
    reviews,
    saveReview,
    deleteReview,
    promoStrip,
    savePromoStrip,
    // Blog Management
    blogs,
    isBlogsLoading,
    fetchBlogs,
    saveBlog,
    deleteBlog,
    uploadImage,
    totalBlogsCount,
    totalLeadsCount,
    newLeadsCount,
    contactedLeadsCount,
    closedLeadsCount
  }
})
