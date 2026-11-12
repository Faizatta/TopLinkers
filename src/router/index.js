import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import { updateSEOMeta } from '../services/seo'
import { scrollTo } from '../services/lenis'

const AboutPage = () => import('../pages/AboutPage.vue')
const ServicesPage = () => import('../pages/ServicesPage.vue')
const TeamPage = () => import('../pages/TeamPage.vue')
const ListingsPage = () => import('../pages/ListingsPage.vue')
const PropertyPage = () => import('../pages/PropertyPage.vue')
const ContactPage = () => import('../pages/ContactPage.vue')
const FavoritesPage = () => import('../pages/FavoritesPage.vue')
const ComparePage = () => import('../pages/ComparePage.vue')
const CreateListingPage = () => import('../pages/CreateListingPage.vue')
const HRSukhPage = () => import('../pages/HRSukhPage.vue')
const BlogPage = () => import('../pages/BlogPage.vue')
const BlogPostPage = () => import('../pages/BlogPostPage.vue')
const PrivacyPolicyPage = () => import('../pages/PrivacyPolicyPage.vue')
const TermsConditionsPage = () => import('../pages/TermsConditionsPage.vue')
const DisclaimerPage = () => import('../pages/DisclaimerPage.vue')
const NotFoundPage = () => import('../pages/NotFoundPage.vue')

// Admin Executive Portal Views
const AdminLayout = () => import('../pages/admin/AdminLayout.vue')
const AdminLogin = () => import('../pages/admin/AdminLogin.vue')
const AdminDashboard = () => import('../pages/admin/AdminDashboard.vue')
const AdminLeads = () => import('../pages/admin/AdminLeads.vue')
const AdminRates = () => import('../pages/admin/AdminRates.vue')
const AdminProperties = () => import('../pages/admin/AdminProperties.vue')
const AdminTeam = () => import('../pages/admin/AdminTeam.vue')
const AdminRoles = () => import('../pages/admin/AdminRoles.vue')
const AdminReviews = () => import('../pages/admin/AdminReviews.vue')
const AdminBlogs = () => import('../pages/admin/AdminBlogs.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'TopLinkers | Premier Real Estate, Construction & Solar | Islamabad',
      description: 'Explore verified CDA sector plots in TopCity & PECHS, cash possession Moqa Ka Plots, PHA flats in I-12 & I-16, Harsukh Nathia Gali luxury suites, turnkey house construction and solar net metering in Islamabad.',
      keywords: 'Top Linkers, real estate Islamabad, plots in Islamabad, Moqa Ka Plot, TopCity-1, PECHS, PHA flats I-12, PHA flats I-16, Harsukh Nathia Gali, turnkey construction, solar net metering'
    }
  },
  {
    path: '/about',
    alias: '/about-us',
    name: 'About',
    component: AboutPage,
    meta: {
      title: 'About Us | TopLinkers Real Estate, Construction & Solar Islamabad',
      description: 'Learn about Top Linkers history, PEC-licensed engineering standards, 15+ years of verified CDA sector advisory, leadership by Syed Usman Hammad, and corporate offices in G-11 Markaz Islamabad.',
      keywords: 'About Top Linkers, real estate agency Islamabad, Syed Usman Hammad, Al Hameed Plaza G-11 Markaz, PEC licensed engineers Islamabad'
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: ServicesPage,
    meta: {
      title: 'Our Services: Plots, PHA Flats, Turnkey Construction & Solar | TopLinkers',
      description: 'Comprehensive real estate and engineering services: Moqa Ka Plots, PHA Sector I-12 & I-16 flats, turnkey A+ grey structure villa construction, and 10kW–50kW solar net metering.',
      keywords: 'Moqa Ka Plots, PHA flats I-12, PHA flats I-16, turnkey construction Islamabad, grey structure cost Pakistan, solar net metering Islamabad'
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamPage,
    meta: {
      title: 'Executive Leadership & Team | TopLinkers Real Estate & Engineering',
      description: 'Meet TopLinkers founders, CEO Syed Usman Hammad, senior property investment consultants, and PEC-licensed civil & solar net metering engineers.',
      keywords: 'Top Linkers team, Syed Usman Hammad CEO, real estate agents Islamabad, civil engineers Islamabad, solar engineers Islamabad'
    }
  },
  {
    path: '/agents',
    redirect: '/team'
  },
  {
    path: '/agent/:slug',
    redirect: '/team'
  },
  {
    path: '/listings',
    name: 'Listings',
    component: ListingsPage,
    meta: {
      title: 'Verified Properties for Sale & Rent in Islamabad | TopLinkers',
      description: 'Browse verified residential plots, commercial files, PHA flats in I-12 & I-16, luxury villas in Gulberg, and hillside suites in Nathia Gali with instant map search.',
      keywords: 'plots for sale Islamabad, apartments for sale Islamabad, PHA flats I-12, TopCity plots, PECHS plots, Gulberg Greens villas'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: ListingsPage,
    meta: {
      title: 'Search Verified Properties in Islamabad & Rawalpindi | TopLinkers',
      description: 'Instant property search with price filter, installment schedules, location matching, and verified registry checks across Islamabad and Galyat.',
      keywords: 'search property Islamabad, plot finder Islamabad, cheap plots Islamabad, installment plots'
    }
  },
  {
    path: '/property-type/:slug',
    name: 'PropertyType',
    component: ListingsPage,
    meta: {
      title: 'Properties by Category & Sector | TopLinkers',
      description: 'Filter verified plots, luxury flats, farmhouses, turnkey villas, and commercial properties by society and sector.'
    }
  },
  {
    path: '/property/:slug',
    name: 'PropertyDetail',
    component: PropertyPage,
    meta: {
      title: 'Property Details & Verified Allotment | TopLinkers',
      description: 'View full floor plans, legal title status, price breakdown, installment schedule, and high-resolution galleries for this verified property.'
    }
  },
  {
    path: '/hr-sukh',
    name: 'HRSukh',
    component: HRSukhPage,
    meta: {
      title: 'Harsukh Residencies Nathia Gali | Hillside Vacation Suites & 20%+ ROI',
      description: 'Discover Harsukh Residencies in Kuza Gali / Nathia Gali. Studio, 1-Bed & 2-Bed luxury hillside suites on 3-year easy installments with 20%+ projected rental returns.',
      keywords: 'Harsukh Nathia Gali, Harsukh Residencies, apartments in Nathia Gali, holiday home Nathia Gali, Murree flats for sale, Airbnb investment Pakistan',
      ogImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85'
    }
  },
  {
    path: '/harsukh',
    redirect: '/hr-sukh'
  },
  {
    path: '/nathiagali',
    redirect: '/hr-sukh'
  },
  {
    path: '/hr-suites',
    redirect: '/hr-sukh'
  },
  {
    path: '/contact',
    alias: '/contact-us',
    name: 'Contact',
    component: ContactPage,
    meta: {
      title: 'Contact TopLinkers | Head Office Al Hameed Plaza G-11 Markaz Islamabad',
      description: 'Visit Top Linkers head office in G-11 Markaz Islamabad or contact our advisory desk via phone at 0334-9522157 / 0332-4004884, WhatsApp, or direct office consultation.',
      keywords: 'Top Linkers contact, Al Hameed Plaza G-11 Markaz Islamabad, real estate office G-11 Islamabad, 0334-9522157, 0332-4004884'
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesPage,
    meta: {
      title: 'My Saved Properties & Portfolios | TopLinkers'
    }
  },
  {
    path: '/compare',
    name: 'Compare',
    component: ComparePage,
    meta: {
      title: 'Compare Real Estate Properties & Apartments | TopLinkers',
      description: 'Compare prices, square footage, bedrooms, payment plans, and location amenities side by side across verified plots, PHA flats, and Harsukh suites.'
    }
  },
  {
    path: '/create-listing',
    name: 'CreateListing',
    component: CreateListingPage,
    meta: {
      title: 'List Your Property for Sale or Rent | TopLinkers',
      description: 'Submit your plot, house, apartment, or commercial property with TopLinkers for immediate verification, professional marketing, and verified buyer matching.'
    }
  },
  // Real Estate Blog & Market Intelligence Routes (SEO Optimized)
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage,
    meta: {
      title: 'Real Estate Blog & Market Intelligence | TopLinkers Islamabad',
      description: 'Expert real estate insights on CDA sector plot ballots, TopCity & PECHS rates, PHA flat prices in I-12 / I-16, turnkey construction costs and solar net metering in Pakistan.',
      keywords: 'Islamabad real estate blog, CDA plot rates, PHA flats I-12 price, TopCity-1 plots, turnkey construction cost Islamabad, solar net metering guide, Faisal Town Phase 2'
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: BlogPostPage,
    meta: {
      title: 'Real Estate Analysis & Market Guide | TopLinkers',
      description: 'In-depth market report, legal verification checklist, and verified price updates by TopLinkers senior property and engineering consultants.'
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicyPage,
    meta: {
      title: 'Privacy Policy & Cookie Standards | TopLinkers Islamabad',
      description: 'Review TopLinkers Privacy Policy, cookie technologies, third-party integrations, data protection practices, and visitor privacy rights in Islamabad, Pakistan.',
      keywords: 'TopLinkers privacy policy, cookie policy, data protection Islamabad, privacy rights, real estate privacy'
    }
  },
  {
    path: '/terms-and-conditions',
    alias: ['/terms-conditions', '/terms'],
    name: 'TermsConditions',
    component: TermsConditionsPage,
    meta: {
      title: 'Terms & Conditions of Service | TopLinkers Pakistan',
      description: 'Official Terms & Conditions governing real estate advisory, turnkey construction estimates, solar net metering contracts, and website usage with TopLinkers.',
      keywords: 'TopLinkers terms and conditions, real estate agreement Islamabad, construction terms, intellectual property, governing law'
    }
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: DisclaimerPage,
    meta: {
      title: 'Legal & Advisory Disclaimer | TopLinkers Real Estate & Engineering',
      description: 'Important legal notices regarding real estate listings, title verification, investment risks, turnkey construction estimates, and solar net metering calculations.',
      keywords: 'TopLinkers disclaimer, real estate risk disclosure, title verification Islamabad, construction rate disclaimer, solar net metering disclaimer'
    }
  },
  // Executive Admin Portal Routes (Noindex for SEO safety)
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { title: 'Admin Portal Login | TopLinkers Executive Suite' }
  },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { title: 'Dashboard | TopLinkers Admin Portal' }
      },
      {
        path: 'leads',
        name: 'AdminLeads',
        component: AdminLeads,
        meta: { title: 'Leads & CRM | TopLinkers Admin Portal' }
      },
      {
        path: 'rates',
        name: 'AdminRates',
        component: AdminRates,
        meta: { title: 'Live Market Rates | TopLinkers Admin Portal' }
      },
      {
        path: 'properties',
        name: 'AdminProperties',
        component: AdminProperties,
        meta: { title: 'Properties Manager | TopLinkers Admin Portal' }
      },
      {
        path: 'team',
        name: 'AdminTeam',
        component: AdminTeam,
        meta: { title: 'Owner & Team Manager | TopLinkers Admin Portal' }
      },
      {
        path: 'roles',
        alias: ['users', '/admin/users'],
        name: 'AdminRoles',
        component: AdminRoles,
        meta: { title: 'Users, Roles & Permissions | TopLinkers Admin Portal' }
      },
      {
        path: 'reviews',
        name: 'AdminReviews',
        component: AdminReviews,
        meta: { title: 'Client Reviews | TopLinkers Admin Portal' }
      },
      {
        path: 'blogs',
        alias: ['articles', '/admin/articles'],
        name: 'AdminBlogs',
        component: AdminBlogs,
        meta: { title: 'Articles & Blogs | TopLinkers Admin Portal' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: { title: '404 - Page Not Found | TopLinkers' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        top: 85,
        behavior: 'smooth'
      }
    }
    return { top: 0, left: 0, behavior: 'instant' }
  }
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    const authData = localStorage.getItem('toplinkers_admin_auth')
    if (!authData) {
      return next('/admin/login')
    }

    try {
      const user = JSON.parse(authData)
      const isSuper = user?.email === 'toplinkers@gmail.com' ||
                      user?.email === 'admin@toplinkers.com' ||
                      user?.role === 'Super Admin' ||
                      user?.role === 'Chief Administrator' ||
                      (Array.isArray(user?.permissions) && (user.permissions.includes('all') || user.permissions.includes('*')))

      if (!isSuper) {
        const path = to.path
        let requiredModule = null
        if (path.startsWith('/admin/dashboard')) requiredModule = 'dashboard'
        else if (path.startsWith('/admin/leads')) requiredModule = 'leads'
        else if (path.startsWith('/admin/rates')) requiredModule = 'rates'
        else if (path.startsWith('/admin/properties')) requiredModule = 'properties'
        else if (path.startsWith('/admin/team')) requiredModule = 'team'
        else if (path.startsWith('/admin/roles') || path.startsWith('/admin/users')) requiredModule = 'roles'
        else if (path.startsWith('/admin/reviews')) requiredModule = 'reviews'

        const perms = Array.isArray(user?.permissions) ? user.permissions : []
        const modules = ['leads', 'rates', 'properties', 'team', 'roles', 'reviews', 'dashboard']
        const allowedModules = modules.filter(m => perms.includes(m) || perms.some(p => p.startsWith(m + '.')))

        if (requiredModule) {
          const canAccess = perms.includes(requiredModule) || perms.some(p => p.startsWith(requiredModule + '.'))
          if (!canAccess) {
            const redirectMod = allowedModules[0]
            if (redirectMod) {
              return next(`/admin/${redirectMod}`)
            }
            return next('/admin/login')
          }
        } else if (path === '/admin' || path === '/admin/') {
          const redirectMod = allowedModules[0] || 'leads'
          return next(`/admin/${redirectMod}`)
        }
      }
    } catch (e) {
      // JSON parse error on corrupted auth storage
      localStorage.removeItem('toplinkers_admin_auth')
      return next('/admin/login')
    }
  }
  next()
})

router.afterEach((to) => {
  updateSEOMeta(to)
})

export default router