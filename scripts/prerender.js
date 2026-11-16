/**
 * Static Pre-Rendering Build Script for TopLinkers
 * Generates static HTML files for all public routes with route-specific:
 * - <title> (50-60 characters)
 * - <meta name="description"> (140-155 characters)
 * - Self-referencing <link rel="canonical">
 * - Page-specific OpenGraph and Twitter cards
 * - Semantic crawlable initial HTML with single <h1>, descriptive <h2>, paragraphs & internal links
 * Fully compatible with Vue 3 client-side hydration on Hostinger and Vercel.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../dist')
const templatePath = path.resolve(distDir, 'index.html')

const BASE_URL = 'https://toplinkersgroup.com'

const routes = [
  {
    path: '/',
    title: 'TopLinkers | Real Estate, Construction & Solar Islamabad',
    description: 'Verified CDA sector plots, PHA flats, turnkey home construction & solar net metering in Islamabad. Contact TopLinkers for trusted property deals.',
    h1: 'TopLinkers | Premier Real Estate, Turnkey Construction & Solar in Islamabad',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Verified Real Estate &amp; Engineering Portfolios</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Top Linkers is an authorized property agency, turnkey civil construction contractor, and Tier-1 solar net metering company headquartered in G-11 Markaz, Islamabad. We specialize in CDA/RDA verified plot transfers, cash possession Moqa Ka Plots, PHA flats in I-12 &amp; I-16, turnkey villa building, and commercial solar electrification.
        </p>
        <ul style="line-height:2;color:#475569;font-size:14px;">
          <li><strong>Verified Plots:</strong> <a href="/services/residential-plots" style="color:#16B4E8;font-weight:700;">TopCity-1, PECHS, and Faisal Town Phase 2</a></li>
          <li><strong>Government Flats:</strong> <a href="/services/apartments-flats" style="color:#16B4E8;font-weight:700;">PHA Sector I-12 and I-16 Apartment Deals</a></li>
          <li><strong>Turnkey Construction:</strong> <a href="/services/construction" style="color:#16B4E8;font-weight:700;">PEC-Licensed Grey Structure &amp; A+ Finishing</a></li>
          <li><strong>Solar Net Metering:</strong> <a href="/services/solar" style="color:#16B4E8;font-weight:700;">10kW, 20kW &amp; 50kW On-Grid Solar Systems</a></li>
          <li><strong>Vacation Suites:</strong> <a href="/hr-sukh" style="color:#16B4E8;font-weight:700;">Harsukh Residencies Nathia Gali (20%+ Yield)</a></li>
        </ul>
      </section>
    `
  },
  {
    path: '/about',
    title: 'About Us | TopLinkers Real Estate & Engineering Islamabad',
    description: 'Learn about TopLinkers history, PEC-licensed engineering standards, 15+ years of CDA sector advisory & corporate offices in G-11 Markaz Islamabad.',
    h1: 'About TopLinkers Real Estate, Turnkey Construction & Solar',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">15+ Years of Verified Property Diligence in Islamabad</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Founded and led by Syed Usman Hammad, Top Linkers operates from 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad. Our multidisciplinary firm integrates real estate brokerage, civil engineering construction, and renewable solar electrification under one institutional roof.
        </p>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          We serve local Pakistani homeowners, commercial plaza investors, and overseas Pakistanis seeking transparent, scam-free land title verification and engineered building execution.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Explore our <a href="/team" style="color:#16B4E8;font-weight:700;">Executive Advisory Team</a> or <a href="/services" style="color:#16B4E8;font-weight:700;">Core Engineering Divisions</a>.
        </p>
      </section>
    `
  },
  {
    path: '/services',
    title: 'Services | Real Estate, Construction & Solar TopLinkers',
    description: 'Comprehensive real estate & engineering: verified plots, PHA flats, turnkey house building & solar net metering in Islamabad. Contact our team.',
    h1: 'Integrated Real Estate, Construction & Solar Services in Islamabad',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Our Specialized Engineering &amp; Advisory Divisions</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Top Linkers provides specialized end-to-end solutions for property investors and builders across Pakistan. Visit our dedicated service portals below:
        </p>
        <ul style="line-height:2.2;color:#475569;font-size:15px;">
          <li><a href="/services/real-estate" style="color:#16B4E8;font-weight:800;">1. Real Estate Advisory &amp; Brokerage Desk</a> — Institutional CDA/RDA document verification and title search.</li>
          <li><a href="/services/residential-plots" style="color:#16B4E8;font-weight:800;">2. Residential &amp; Commercial Plots</a> — TopCity-1, PECHS, Faisal Town Phase 2, and cash possession plots.</li>
          <li><a href="/services/apartments-flats" style="color:#16B4E8;font-weight:800;">3. PHA Apartments &amp; Luxury Flats</a> — PHA Sector I-12/I-16 and Harsukh Nathia Gali luxury suites.</li>
          <li><a href="/services/construction" style="color:#16B4E8;font-weight:800;">4. Turnkey House Construction</a> — PEC-licensed architects, grey structure, and luxury A+ home finishing.</li>
          <li><a href="/services/solar" style="color:#16B4E8;font-weight:800;">5. Tier-1 Solar Net Metering</a> — 10kW to 50kW commercial solar systems with IESCO green meter approvals.</li>
        </ul>
      </section>
    `
  },
  {
    path: '/services/real-estate',
    title: 'Real Estate Advisory & Property Brokerage | TopLinkers',
    description: 'TopLinkers offers verified property advisory in Islamabad. Buy, sell, and verify CDA sector files with complete legal diligence. Contact our consultants.',
    h1: 'Real Estate Advisory & Verified Brokerage in Islamabad',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Institutional Due Diligence &amp; Property Advisory</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Our Islamabad real estate advisory desk eliminates non-possession file traps. We verify non-encumbrance certificates (NEC), examine original allotment documents, coordinate biometric seller transfers at registrar offices, and manage overseas power of attorney transactions.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Ready to purchase or sell property? <a href="/contact" style="color:#16B4E8;font-weight:700;">Schedule an Appointment with Syed Usman Hammad</a> or view our <a href="/listings" style="color:#16B4E8;font-weight:700;">Current Property Listings</a>.
        </p>
      </section>
    `
  },
  {
    path: '/services/residential-plots',
    title: 'Residential & Commercial Plots Islamabad | TopLinkers Deals',
    description: 'Explore verified residential plots in TopCity-1, PECHS, and Faisal Town Phase 2 with cash possession and CDA/RDA approvals. Call TopLinkers today.',
    h1: 'Verified Residential & Commercial Plots in Islamabad & Rawalpindi',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Prime Land Portfolio with Immediate Cash Possession</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Browse verified residential and commercial plots in TopCity-1 (10 Marla and 1 Kanal), PECHS Islamabad (5 Marla and 10 Marla), and Faisal Town Phase 2. Every plot in our inventory is backed by on-ground demarcation, utility NOCs, and direct owner pricing.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Looking for immediate construction? Ask about our <a href="/contact" style="color:#16B4E8;font-weight:700;">Moqa Ka Plot Inventory</a>.
        </p>
      </section>
    `
  },
  {
    path: '/services/apartments-flats',
    title: 'PHA Flats & Luxury Apartments Islamabad | TopLinkers Deals',
    description: 'Buy ready and under-construction PHA apartments in I-12 and I-16, plus Harsukh Nathia Gali luxury vacation suites. Inquire with TopLinkers today.',
    h1: 'PHA Apartments & Luxury Vacation Suites in Islamabad & Nathia Gali',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Government PHA Apartments &amp; Alpine Holiday Chalets</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Top Linkers is an authorized dealer for Pakistan Housing Authority (PHA) apartments in Sector I-12 and Sector I-16, offering ready-to-move and installment units. In addition, our flagship Harsukh Residencies project in Nathia Gali offers fully furnished hillside suites with 20%+ annual rental returns.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Learn more about <a href="/hr-sukh" style="color:#16B4E8;font-weight:700;">Harsukh Residencies Nathia Gali</a> or <a href="/contact" style="color:#16B4E8;font-weight:700;">Request Floor Plans</a>.
        </p>
      </section>
    `
  },
  {
    path: '/services/construction',
    title: 'Turnkey House Construction Islamabad | TopLinkers Building',
    description: 'PEC-licensed turnkey home construction, modern architectural design & grey structure execution in Islamabad. Request your construction estimate now.',
    h1: 'Turnkey House Construction & Grey Structure Engineering Islamabad',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Engineered Turnkey Homes with Milestone-Based Contracts</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Top Linkers Construction builds premium custom residences, villas, and commercial plazas in Islamabad and Rawalpindi. We provide architectural 3D drawings, CDA building approvals, seismic structural vetting, Grade 60 rebar execution, and luxury A+ interior finishing.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Request a customized <a href="/contact" style="color:#16B4E8;font-weight:700;">Bill of Quantities (BOQ)</a> or call our engineering desk at +92-334-9522157.
        </p>
      </section>
    `
  },
  {
    path: '/services/solar',
    title: 'Solar Net Metering & Tier-1 Panels Islamabad | TopLinkers',
    description: 'Authorized on-grid and hybrid solar installations (10kW, 20kW, 50kW) with IESCO net metering approval in Islamabad. Reduce electricity bills by 85%.',
    h1: 'Tier-1 Solar Net Metering & Renewable Energy Solutions Islamabad',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Eliminate WAPDA Peak Tariffs with IESCO Net Metering</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Top Linkers Solar delivers complete residential and commercial solar electrification. We install Tier-1 N-Type TOPCon bifacial solar panels and European inverters, backed by 25-year performance warranties and turnkey IESCO bidirectional net metering approvals.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Ready to save up to 88% on electricity bills? <a href="/contact" style="color:#16B4E8;font-weight:700;">Request a Free Solar Feasibility Audit</a>.
        </p>
      </section>
    `
  },
  {
    path: '/listings',
    title: 'Verified Properties for Sale & Rent | TopLinkers Deals',
    description: 'Browse verified residential plots, commercial shops, PHA apartments, and luxury villas for sale in Islamabad & Rawalpindi. Verified ownership.',
    h1: 'Verified Properties for Sale & Rent in Islamabad & Rawalpindi',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Verified Property Inventory in Prime CDA &amp; RDA Sectors</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Browse our live real estate database featuring 5 Marla, 10 Marla, and 1 Kanal residential plots, commercial shops, PHA executive flats in I-12 and I-16, and turnkey luxury villas across TopCity-1, PECHS, and Faisal Town Phase 2.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Looking for a specific plot or budget? <a href="/contact" style="color:#16B4E8;font-weight:700;">Contact our Property Matching Desk</a>.
        </p>
      </section>
    `
  },
  {
    path: '/team',
    title: 'Leadership & Advisory Team | TopLinkers Islamabad',
    description: 'Meet TopLinkers founders, CEO Syed Usman Hammad, property investment consultants, and PEC-licensed civil & solar engineers in Islamabad.',
    h1: 'Executive Leadership, Consultants & Engineers | TopLinkers',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Multidisciplinary Real Estate &amp; Engineering Executives</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Top Linkers is steered by experienced property directors, legal title attorneys, and Pakistan Engineering Council (PEC) certified structural and solar engineers based in G-11 Markaz, Islamabad.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Visit our head office or <a href="/contact" style="color:#16B4E8;font-weight:700;">Connect with our Advisors</a>.
        </p>
      </section>
    `
  },
  {
    path: '/contact',
    title: 'Contact TopLinkers | G-11 Markaz Office Islamabad',
    description: 'Get in touch with TopLinkers real estate, construction, and solar consultants. Visit our office in G-11 Markaz Islamabad or call +92-334-9522157.',
    h1: 'Contact TopLinkers Real Estate, Construction & Solar',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Corporate Head Office in G-11 Markaz, Islamabad</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          <strong>Address:</strong> 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad (Postal Code: 44000), Pakistan.<br>
          <strong>Direct Phone:</strong> +92-334-9522157<br>
          <strong>Official Email:</strong> toplinkers12@gmail.com<br>
          <strong>Business Hours:</strong> Monday – Saturday: 9:00 AM – 8:00 PM (PKT)
        </p>
        <p style="font-size:14px;color:#64748B;">
          Reach out today for verified property transactions, construction estimates, or solar net metering feasibilities.
        </p>
      </section>
    `
  },
  {
    path: '/hr-sukh',
    title: 'Harsukh Residencies Nathia Gali | Luxury Alpine Suites',
    description: 'Invest in luxury vacation suites in Nathia Gali at 8,200 ft elevation with 20%+ rental yield and 3-year installments. Book your suite today.',
    h1: 'Harsukh Residencies Nathia Gali Luxury Alpine Suites',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Premium Mountain Suites with Guaranteed Rental Yield</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Harsukh Residencies is an ultra-exclusive alpine residential resort situated at 8,200 feet above sea level in Nathia Gali. Offering panoramic Himalayan pine views, central climate control, 24/7 security, heated indoor amenities, and a fully managed hotel rental pool delivering 20%+ projected annual returns on 3-year easy installments.
        </p>
        <p style="font-size:14px;color:#64748B;">
          <a href="/contact" style="color:#16B4E8;font-weight:700;">Inquire for Booking &amp; Payment Schedules</a>.
        </p>
      </section>
    `
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | TopLinkers Real Estate Islamabad',
    description: 'Read the official terms and conditions for Top Linkers Real Estate, Turnkey Construction & Solar advisory services in Islamabad, Pakistan.',
    h1: 'Terms & Conditions of Service | TopLinkers',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Legal Disclaimer &amp; Advisory Terms</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          All property files, plot numbers, prices, and construction specifications displayed on TopLinkers are subject to formal verification with respective municipal and development authorities (CDA, RDA, PHA, IESCO). Real estate transactions are governed by the laws of the Islamic Republic of Pakistan.
        </p>
      </section>
    `
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | TopLinkers Real Estate Islamabad',
    description: 'Learn how Top Linkers collects, protects, and handles personal data submitted through our property inquiry forms and consultation desk.',
    h1: 'Privacy Policy | TopLinkers Real Estate, Construction & Solar',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">User Privacy &amp; Data Protection</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Top Linkers values your privacy. Contact details provided through our property consultation forms are utilized strictly to facilitate real estate inquiries, construction estimates, and solar feasibilities. We do not sell or disclose client records to third-party marketing brokers.
        </p>
      </section>
    `
  },
  {
    path: '/disclaimer',
    title: 'Legal Disclaimer | TopLinkers Real Estate Islamabad',
    description: 'Important legal notices and regulatory disclaimers regarding real estate listings, building estimates, and solar energy yields from TopLinkers.',
    h1: 'Regulatory & Legal Disclaimer | TopLinkers',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Independent Advisory Verification</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Property buyers are strongly advised to conduct in-person physical inspections and legal title verification at respective societal registrars before transferring non-refundable deposits. Top Linkers acts as an independent advisory and brokerage firm.
        </p>
      </section>
    `
  }
]

function prerender() {
  if (!fs.existsSync(distDir)) {
    console.error(`❌ Dist directory not found at ${distDir}. Run vite build first.`)
    process.exit(1)
  }

  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template index.html not found at ${templatePath}.`)
    process.exit(1)
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8')
  console.log(`🚀 Starting static pre-rendering for ${routes.length} routes...`)

  for (const r of routes) {
    const fullCanonical = `${BASE_URL}${r.path === '/' ? '/' : r.path}`
    let html = baseHtml

    // 1. Update Title
    html = html.replace(/<title>.*?<\/title>/s, `<title>${r.title}</title>`)

    // 2. Update Meta Description
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="description" content="${r.description}" />`)

    // 3. Update Canonical Link
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i,
      `<link rel="canonical" href="${fullCanonical}" />`)

    // 4. Update OpenGraph Tags
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:title" content="${r.title}" />`)
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:description" content="${r.description}" />`)
    html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:url" content="${fullCanonical}" />`)

    // 5. Update Twitter Tags
    html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="twitter:title" content="${r.title}" />`)
    html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="twitter:description" content="${r.description}" />`)
    html = html.replace(/<meta\s+name=["']twitter:url["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="twitter:url" content="${fullCanonical}" />`)

    // 6. Infiltrate Semantic Fallback inside <div id="app">...</div>
    const semanticFallback = `
    <div id="app">
      <header style="background:#0F2A44;color:#fff;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <a href="/" aria-label="TopLinkers Home" style="display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff;font-weight:900;font-size:20px;">
          <img src="/toplinkers-logo-sm.png" alt="Top Linkers" width="40" height="40" style="background:#fff;border-radius:4px;padding:2px;" />
          <span><span style="color:#E53935;">Top</span> Linkers</span>
        </a>
        <nav aria-label="Primary Navigation" style="display:flex;gap:16px;flex-wrap:wrap;font-size:14px;">
          <a href="/about" style="color:#16B4E8;text-decoration:none;font-weight:700;">About Us</a>
          <a href="/services" style="color:#fff;text-decoration:none;font-weight:600;">Services</a>
          <a href="/listings" style="color:#fff;text-decoration:none;font-weight:600;">Properties</a>
          <a href="/team" style="color:#fff;text-decoration:none;font-weight:600;">Team</a>
          <a href="/contact" style="color:#fff;text-decoration:none;font-weight:600;">Contact</a>
        </nav>
      </header>

      <main style="max-width:1200px;margin:32px auto;padding:0 20px;">
        <h1 style="font-size:30px;font-weight:900;color:#0F2A44;margin-bottom:16px;line-height:1.25;">
          ${r.h1}
        </h1>
        <p style="font-size:16px;line-height:1.6;color:#334155;margin-bottom:24px;">
          ${r.description}
        </p>
        ${r.content}
        <section style="background:#F1F5F9;border-radius:8px;padding:20px;border:1px solid #CBD5E1;margin-top:32px;">
          <h2 style="font-size:16px;font-weight:700;color:#0F2A44;margin-bottom:8px;">Essential Company &amp; Legal Verification</h2>
          <p style="font-size:13px;color:#64748B;margin-bottom:12px;">
            Head Office: 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad | Phone: +92-334-9522157
          </p>
          <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:13px;">
            <a href="/about" style="color:#0F2A44;font-weight:700;">About TopLinkers</a>
            <a href="/services" style="color:#0F2A44;font-weight:700;">All Services</a>
            <a href="/contact" style="color:#0F2A44;font-weight:700;">Contact Us</a>
            <a href="/terms-and-conditions" style="color:#0F2A44;font-weight:700;">Terms &amp; Conditions</a>
            <a href="/privacy-policy" style="color:#0F2A44;font-weight:700;">Privacy Policy</a>
            <a href="/llms.txt" style="color:#16B4E8;font-weight:700;">llms.txt (Agent Guide)</a>
          </div>
        </section>
      </main>

      <footer style="background:#081322;color:#94A3B8;padding:24px;text-align:center;font-size:13px;margin-top:48px;">
        <p>&copy; 2026 Top Linkers Real Estate, Construction &amp; Solar. Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan.</p>
      </footer>
    </div>
    `

    const appIndex = html.indexOf('<div id="app">')
    const bodyIndex = html.indexOf('</body>')
    if (appIndex !== -1 && bodyIndex !== -1) {
      html = html.substring(0, appIndex) + semanticFallback + '\n    ' + html.substring(bodyIndex)
    }

    // Write file to target destination
    if (r.path === '/') {
      fs.writeFileSync(templatePath, html, 'utf-8')
      console.log(`  ✅ Pre-rendered: / -> dist/index.html`)
    } else {
      const targetDir = path.join(distDir, r.path.replace(/^\//, ''))
      fs.mkdirSync(targetDir, { recursive: true })
      const targetFile = path.join(targetDir, 'index.html')
      fs.writeFileSync(targetFile, html, 'utf-8')
      console.log(`  ✅ Pre-rendered: ${r.path} -> ${path.relative(distDir, targetFile)}`)
    }
  }

  console.log(`🎉 Pre-rendering completed successfully for all routes!`)
}

prerender()
