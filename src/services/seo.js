/**
 * Top Linkers Real Estate, Construction & Solar
 * Advanced Technical & Dynamic SEO Service
 */

const BASE_URL = 'https://toplinkers.com'
const DEFAULT_IMAGE = 'https://toplinkers.com/toplinkers-logo.jpg'

const setMetaTag = (attrName, attrValue, content) => {
  if (!content) return
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attrName, attrValue)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

const setCanonicalUrl = (path) => {
  // Normalize canonical URL: strip query parameters like ?page, ?utm_*, ?ref
  const cleanPath = path === '/' ? '/' : path.replace(/\/+$/, '')
  const fullCanonical = `${BASE_URL}${cleanPath}`

  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', fullCanonical)
}

const setJsonLdScript = (id, data) => {
  const existing = document.getElementById(id)
  if (existing) existing.remove()

  if (!data) return

  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.text = JSON.stringify(data)
  document.head.appendChild(script)
}

export const updateSEOMeta = (to) => {
  if (typeof document === 'undefined') return

  const isDarkAdmin = to.path.startsWith('/admin')
  const is404 = to.name === 'NotFound' || to.path === '/404'
  const title = to.meta?.title || 'TopLinkers | Premier Real Estate, Turnkey Construction & Solar | Islamabad'
  const description =
    to.meta?.description ||
    'Verified CDA sector plots in TopCity & PECHS, cash possession Moqa Ka Plots, PHA flats in I-12 & I-16, Harsukh Nathia Gali luxury suites, turnkey house construction & solar net metering in Islamabad.'
  const keywords =
    to.meta?.keywords ||
    'Top Linkers, real estate Islamabad, plots in Islamabad, Moqa Ka Plot, TopCity-1, PECHS, PHA flats I-12, PHA flats I-16, Harsukh Nathia Gali, turnkey construction, solar net metering'
  const ogImage = to.meta?.ogImage || DEFAULT_IMAGE
  const fullUrl = `${BASE_URL}${to.path}`

  // 1. Update Document Title
  document.title = title

  // 2. Primary Meta Tags
  setMetaTag('name', 'description', description)
  setMetaTag('name', 'keywords', keywords)

  // 3. Robots: Noindex for Admin & 404, Index & Follow for Public
  if (isDarkAdmin || is404) {
    setMetaTag('name', 'robots', 'noindex, nofollow')
  } else {
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
  }

  // 4. Open Graph / Facebook & WhatsApp Previews
  setMetaTag('property', 'og:site_name', 'Top Linkers Real Estate & Marketing')
  setMetaTag('property', 'og:title', title)
  setMetaTag('property', 'og:description', description)
  setMetaTag('property', 'og:url', fullUrl)
  setMetaTag('property', 'og:image', ogImage)
  setMetaTag('property', 'og:type', to.path.startsWith('/property/') ? 'product' : 'website')
  setMetaTag('property', 'og:locale', 'en_PK')

  // 5. Twitter Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:title', title)
  setMetaTag('name', 'twitter:description', description)
  setMetaTag('name', 'twitter:image', ogImage)
  setMetaTag('name', 'twitter:url', fullUrl)

  // 6. Clean Canonical URL
  setCanonicalUrl(to.path)

  // 7. Dynamic JSON-LD Structured Data Markups
  if (!isDarkAdmin && !is404) {
    // A. BreadcrumbList Schema
    const breadcrumbs = [{ name: 'Home', url: '/' }]
    if (to.path === '/listings') {
      breadcrumbs.push({ name: 'Properties', url: '/listings' })
    } else if (to.path === '/hr-sukh') {
      breadcrumbs.push({ name: 'Harsukh Residencies', url: '/hr-sukh' })
    } else if (to.path === '/services') {
      breadcrumbs.push({ name: 'Services & Advisory', url: '/services' })
    } else if (to.path === '/team') {
      breadcrumbs.push({ name: 'Leadership & Team', url: '/team' })
    } else if (to.path === '/about') {
      breadcrumbs.push({ name: 'About Us', url: '/about' })
    } else if (to.path === '/contact') {
      breadcrumbs.push({ name: 'Contact & Office', url: '/contact' })
    } else if (to.path === '/compare') {
      breadcrumbs.push({ name: 'Compare Properties', url: '/compare' })
    } else if (to.path === '/create-listing') {
      breadcrumbs.push({ name: 'List Property', url: '/create-listing' })
    } else if (to.path === '/blog') {
      breadcrumbs.push({ name: 'Market Blog', url: '/blog' })
    } else if (to.path.startsWith('/blog/')) {
      breadcrumbs.push({ name: 'Market Blog', url: '/blog' })
      breadcrumbs.push({ name: title.replace(' | TopLinkers Blog', '').replace(' | TopLinkers', ''), url: to.path })
    } else if (to.path.startsWith('/property/')) {
      breadcrumbs.push({ name: 'Properties', url: '/listings' })
      breadcrumbs.push({ name: title.replace(' | TopLinkers', '').replace(' | TopLinkers Real Estate Islamabad', ''), url: to.path })
    }
    setJsonLdScript('seo-breadcrumb-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
      }))
    })

    // B. Route-Specific Deep Schemas
    if (to.path === '/') {
      // Home: WebSite with SearchAction (Rich Google Sitelinks Searchbox)
      setJsonLdScript('seo-route-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Top Linkers Real Estate, Construction & Solar',
        description: 'Verified CDA/RDA plots in TopCity & PECHS, PHA apartments in I-12 & I-16, Harsukh Nathia Gali luxury suites, turnkey house construction & solar net metering in Islamabad.',
        publisher: {
          '@id': `${BASE_URL}/#organization`
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE_URL}/listings?keyword={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      })
    } else if (to.path === '/services') {
      // Services Page: Professional Service Schema Catalog
      setJsonLdScript('seo-route-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Real Estate Brokerage, Turnkey Construction & Solar Net Metering',
        provider: {
          '@id': `${BASE_URL}/#organization`
        },
        areaServed: [
          { '@type': 'City', name: 'Islamabad' },
          { '@type': 'City', name: 'Rawalpindi' },
          { '@type': 'Place', name: 'Nathia Gali' }
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Top Linkers Core Divisions',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Verified Moqa Ka Plots & Installments',
                description: 'On-ground possession plots in TopCity-1, PECHS, AGG, and 4.5-year installment plans in Faisal Town Phase 2.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'PHA Government Apartments Trading',
                description: 'Allotment transfers for PHA Sector I-12 and Sector I-16 2-bed and 3-bed executive apartments.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Turnkey Residential Villa Construction',
                description: 'PEC-licensed architectural design, A+ grey structure execution, and luxury turnkey house finishes.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Tier-1 Solar Net Metering Systems',
                description: '10kW, 20kW, and 50kW hybrid and on-grid solar solutions with turnkey IESCO green-meter approval.'
              }
            }
          ]
        }
      })
    } else if (to.path === '/hr-sukh') {
      // Harsukh Nathia Gali: RealEstateListing / Apartment Schema
      setJsonLdScript('seo-route-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: 'Harsukh Residencies Nathia Gali',
        description: 'Managed luxury hillside holiday suites in Kuza Gali / Nathia Gali offering 20%+ projected annual rental yield on 3-year easy installment plans.',
        url: `${BASE_URL}/hr-sukh`,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: 3500000,
          highPrice: 12500000,
          priceCurrency: 'PKR',
          offerCount: '24',
          availability: 'https://schema.org/InStock'
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Nathia Gali / Kuza Gali',
          addressRegion: 'Khyber Pakhtunkhwa',
          addressCountry: 'PK'
        }
      })
    } else if (to.path === '/contact') {
      // Contact Page: ContactPoint & Head Office Schema
      setJsonLdScript('seo-route-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact TopLinkers Real Estate, Construction & Solar',
        url: `${BASE_URL}/contact`,
        mainEntity: {
          '@type': 'RealEstateAgent',
          name: 'Top Linkers Head Office',
          telephone: '+92-334-9522157',
          email: 'toplinkers12@gmail.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz',
            addressLocality: 'Islamabad',
            addressRegion: 'Federal Capital',
            postalCode: '4004884',
            addressCountry: 'PK'
          }
        }
      })
    } else if (to.path === '/blog') {
      // Blog Catalog Schema
      setJsonLdScript('seo-route-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${BASE_URL}/blog/#blog`,
        name: 'TopLinkers Real Estate Blog & Market Intelligence',
        description: 'Expert analysis on CDA sector plot ballots, TopCity & PECHS rates, PHA flat prices in I-12 / I-16, turnkey construction costs and solar net metering in Pakistan.',
        url: `${BASE_URL}/blog`,
        publisher: {
          '@id': `${BASE_URL}/#organization`
        }
      })
    } else {
      // Remove stale route jsonld on other pages
      const old = document.getElementById('seo-route-jsonld')
      if (old) old.remove()
    }
  } else {
    // Dark admin or 404
    const b = document.getElementById('seo-breadcrumb-jsonld')
    if (b) b.remove()
    const r = document.getElementById('seo-route-jsonld')
    if (r) r.remove()
  }
}
