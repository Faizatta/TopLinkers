/**
 * Static Pre-Rendering Build Script for TopLinkers
 * Generates static HTML files for all public routes with route-specific:
 * - <title> (50-60 characters)
 * - <meta name="description"> (140-155 characters)
 * - Self-referencing <link rel="canonical">
 * - Page-specific OpenGraph and Twitter cards
 * - Semantic crawlable initial HTML with single <h1>, descriptive <h2>, paragraphs & internal links
 * - Route-specific Schema.org JSON-LD structured data
 * Writes both dist/path.html and dist/path/index.html for 100% server compatibility without redirects.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../dist')
const templatePath = path.resolve(distDir, 'index.html')

const BASE_URL = 'https://toplinkersgroup.com'

const staticRoutes = [
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
          Top Linkers delivers end-to-end real estate, construction, and green energy solutions across Islamabad and Rawalpindi:
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
          <div style="border:1px solid #E2E8F0;border-radius:8px;padding:16px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;"><a href="/services/real-estate" style="color:#0F2A44;text-decoration:none;">1. Real Estate Advisory &amp; Brokerage</a></h3>
            <p style="font-size:13px;color:#64748B;line-height:1.5;">Legal CDA title verification, registry transfers, and transparent deals across Islamabad sectors.</p>
          </div>
          <div style="border:1px solid #E2E8F0;border-radius:8px;padding:16px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;"><a href="/services/residential-plots" style="color:#0F2A44;text-decoration:none;">2. Residential Plots &amp; Installments</a></h3>
            <p style="font-size:13px;color:#64748B;line-height:1.5;">On-ground possession Moqa Ka Plots in TopCity-1, PECHS, and Faisal Town Phase 2.</p>
          </div>
          <div style="border:1px solid #E2E8F0;border-radius:8px;padding:16px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;"><a href="/services/apartments-flats" style="color:#0F2A44;text-decoration:none;">3. Apartments &amp; PHA Flats</a></h3>
            <p style="font-size:13px;color:#64748B;line-height:1.5;">PHA Sector I-12 and I-16 executive flats, plus luxury vacation suites in Harsukh Nathia Gali.</p>
          </div>
          <div style="border:1px solid #E2E8F0;border-radius:8px;padding:16px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;"><a href="/services/construction" style="color:#0F2A44;text-decoration:none;">4. Turnkey Construction</a></h3>
            <p style="font-size:13px;color:#64748B;line-height:1.5;">PEC-licensed architectural design, grey structure building, and premium turnkey villa finishes.</p>
          </div>
          <div style="border:1px solid #E2E8F0;border-radius:8px;padding:16px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;"><a href="/services/solar" style="color:#0F2A44;text-decoration:none;">5. Solar Solutions &amp; Net Metering</a></h3>
            <p style="font-size:13px;color:#64748B;line-height:1.5;">10kW, 20kW &amp; 50kW Tier-1 on-grid solar systems with turnkey IESCO green-meter approvals.</p>
          </div>
        </div>
      </section>
    `
  },
  {
    path: '/services/real-estate',
    title: 'Real Estate Advisory & Property Brokerage | TopLinkers',
    description: 'TopLinkers offers verified property advisory in Islamabad. Buy, sell, and verify CDA sector files with complete legal diligence. Contact our consultants.',
    h1: 'Real Estate Advisory & Property Brokerage in Islamabad',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Institutional Diligence &amp; Land Title Verification</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Navigating Islamabad's property market requires rigorous scrutiny of master plans, layout approvals, and transfer legalities. Top Linkers conducts thorough legal due diligence with the Capital Development Authority (CDA), Rawalpindi Development Authority (RDA), and Federal Government Employees Housing Authority (FGEHA).
        </p>
        <p style="font-size:14px;color:#64748B;">
          Browse our <a href="/listings" style="color:#16B4E8;font-weight:700;">Verified Property Listings</a> or consult our <a href="/team" style="color:#16B4E8;font-weight:700;">Senior Advisory Desk</a>.
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
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Cash Possession \'Moqa Ka Plots\' &amp; Easy Installment Plans</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Top Linkers holds exclusive inventories of ready-to-build, on-ground possession plots across Islamabad\'s most sought-after growth corridors. Whether you require a 5 Marla, 10 Marla, or 1 Kanal plot in TopCity-1 (Kashmir Highway / Airport Corridor), PECHS Islamabad (near Islamabad International Airport), Airport Green Garden (AGG), or flexible 4.5-year installment files in Faisal Town Phase 2.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Check out our <a href="/listings" style="color:#16B4E8;font-weight:700;">Latest Plot Inventories</a> or view our <a href="/contact" style="color:#16B4E8;font-weight:700;">Booking Desk</a>.
        </p>
      </section>
    `
  },
  {
    path: '/services/apartments-flats',
    title: 'PHA Flats & Luxury Apartments Islamabad | TopLinkers Deals',
    description: 'Buy ready and under-construction PHA apartments in I-12 and I-16, plus Harsukh Nathia Gali luxury vacation suites. Inquire with TopLinkers today.',
    h1: 'Apartments, PHA Government Flats & Luxury Vacation Suites',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Affordable Urban Apartments &amp; High-Yield Holiday Suites</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          From budget-friendly urban living to high-yield vacation real estate, Top Linkers is a market leader in apartment trading. We specialize in official allotment file transfers for Pakistan Housing Authority (PHA) Sector I-12 and Sector I-16 2-bed and 3-bed executive apartments. In addition, we are the exclusive marketing partner for Harsukh Residencies in Nathia Gali.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Learn more about <a href="/hr-sukh" style="color:#16B4E8;font-weight:700;">Harsukh Nathia Gali Vacation Suites</a> or see <a href="/listings" style="color:#16B4E8;font-weight:700;">Available PHA Flats</a>.
        </p>
      </section>
    `
  },
  {
    path: '/services/construction',
    title: 'Turnkey Construction & Architectural Design | TopLinkers',
    description: 'PEC-licensed turnkey home construction in Islamabad & Rawalpindi. Premium grey structure & luxury finishes with fixed transparent cost per sqft.',
    h1: 'PEC-Licensed Turnkey Civil Construction & Architecture',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Engineered House Construction with Guaranteed Milestones</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Building a luxury home in Islamabad requires professional project management, strict adherence to seismic codes, and transparent procurement. Top Linkers provides comprehensive turnkey construction backed by Pakistan Engineering Council (PEC) registered civil engineers.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Request a customized <a href="/contact" style="color:#16B4E8;font-weight:700;">Construction Cost Estimate</a> or speak with our engineers.
        </p>
      </section>
    `
  },
  {
    path: '/services/solar',
    title: 'Solar Solutions & IESCO Net Metering | TopLinkers Energy',
    description: 'Slash electricity bills with 10kW, 20kW & 50kW Tier-1 solar systems in Islamabad. Turnkey IESCO green net metering approvals by TopLinkers.',
    h1: 'Commercial & Residential Solar Solutions with IESCO Net Metering',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Zero Electricity Bills with Tier-1 Solar Net Metering</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Rising electricity tariffs make solar energy one of the highest-ROI investments for Pakistani homeowners and businesses. Top Linkers Solar Division delivers customized 10kW, 20kW, and 50kW on-grid and hybrid photovoltaic systems utilizing Tier-1 monocrystalline bifacial panels.
        </p>
        <p style="font-size:14px;color:#64748B;">
          Calculate your savings and <a href="/contact" style="color:#16B4E8;font-weight:700;">Book a Free Solar Site Assessment</a>.
        </p>
      </section>
    `
  },
  {
    path: '/listings',
    title: 'Property Listings Islamabad | Verified Plots & Flats | TopLinkers',
    description: 'Explore verified plots in TopCity, PECHS & Faisal Town, PHA flats in I-12 & I-16, and commercial properties in Islamabad. Filter by price and location.',
    h1: 'Verified Property Listings & Real Estate Portfolios in Islamabad',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Search CDA Plots, PHA Apartments &amp; Commercial Plazas</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Every property listed with Top Linkers has undergone preliminary ownership, layout, and registry verification. Explore residential plots in TopCity-1, PECHS, and Faisal Town Phase 2, PHA executive apartments in Sector I-12 and I-16, and commercial storefronts.
        </p>
      </section>
    `
  },
  {
    path: '/team',
    title: 'Leadership & Team | TopLinkers Real Estate & Engineering',
    description: 'Meet Syed Usman Hammad and TopLinkers experienced team of property consultants, PEC civil engineers and solar project managers in Islamabad.',
    h1: 'Executive Leadership & Advisory Team at TopLinkers',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Experienced Property Consultants &amp; Licensed Engineers</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Top Linkers is spearheaded by Chief Executive Syed Usman Hammad, alongside seasoned property consultants, civil engineers, and solar energy technicians. We combine local market knowledge with institutional standards.
        </p>
      </section>
    `
  },
  {
    path: '/contact',
    title: 'Contact TopLinkers | G-11 Markaz Islamabad Head Office',
    description: 'Contact Top Linkers head office at Al Hameed Plaza, G-11 Markaz Islamabad. Call 0334-9522157 or WhatsApp our property, construction and solar advisory desks.',
    h1: 'Contact TopLinkers Real Estate, Turnkey Construction & Solar',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Visit Our Corporate Offices in G-11 Markaz Islamabad</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Head Office: 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan.<br/>
          Direct Lines &amp; WhatsApp: 0334-9522157 / 0332-4004884<br/>
          Email: toplinkers12@gmail.com
        </p>
      </section>
    `
  },
  {
    path: '/hr-sukh',
    title: 'Harsukh Residencies Nathia Gali | Luxury Holiday Suites',
    description: 'Own luxury vacation suites in Kuza Gali / Nathia Gali with 20%+ annual rental yield. 15% booking & 3-year installments with TopLinkers.',
    h1: 'Harsukh Residencies Nathia Gali: Luxury Hillside Vacation Suites',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Vacation in the Clouds, Earn While You Sleep</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Located at Kuza Gali, just minutes from main Nathia Gali, Harsukh Residencies offers panoramic mountain suites with hotel-standard servicing, 15% down payment, and a 3-year flexible installment plan projected to yield 20%+ annual tourist rental returns.
        </p>
      </section>
    `
  },
  {
    path: '/blog',
    title: 'Real Estate Blog & Market Intelligence | TopLinkers Islamabad',
    description: 'Expert real estate insights on CDA sector plot ballots, TopCity & PECHS rates, PHA flat prices in I-12 / I-16, turnkey construction costs and solar net metering in Pakistan.',
    h1: 'TopLinkers Real Estate Blog & Market Intelligence Reports',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Twin Cities Property Intelligence &amp; Practical Guides</h2>
        <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:16px;">
          Essential research on CDA sectors, DHA Islamabad, Bahria Town, Faisal Town Phase 2, TopCity-1, PHA apartments, house construction costs, and solar ROI.
        </p>
        <ul style="line-height:2;color:#475569;font-size:14px;">
          <li><a href="/blog/cda-sector-c-14-c-15-development-updates-2026" style="color:#16B4E8;font-weight:700;">CDA Sector C-14 &amp; C-15 Development Updates 2026: Margalla Avenue Connectivity</a></li>
          <li><a href="/blog/pha-flats-i12-i16-investment-guide" style="color:#16B4E8;font-weight:700;">Complete Guide to PHA Flats in Sector I-12 &amp; I-16: Prices &amp; Yields</a></li>
          <li><a href="/blog/topcity1-faisal-town2-motorway-growth" style="color:#16B4E8;font-weight:700;">TopCity-1 vs Faisal Town Phase II: 10 Marla Plot Analysis</a></li>
          <li><a href="/blog/solar-energy-pakistan-homes-roi" style="color:#16B4E8;font-weight:700;">Installing 10kW, 20kW &amp; 50kW Solar Systems: Slashing WAPDA Bills</a></li>
          <li><a href="/blog/gulberg-greens-commercial-plazas-appraisal" style="color:#16B4E8;font-weight:700;">Commercial Real Estate in Gulberg Islamabad: Opal Square &amp; D-Markaz</a></li>
          <li><a href="/blog/pechs-affordable-housing-islamabad" style="color:#16B4E8;font-weight:700;">PECHS Islamabad: Affordable 5 Marla Plots Starting from PKR 25 Lac</a></li>
          <li><a href="/blog/turnkey-construction-cost-per-sqft-islamabad" style="color:#16B4E8;font-weight:700;">Turnkey Construction Costs in Islamabad &amp; Rawalpindi (2026 Material Rates)</a></li>
        </ul>
      </section>
    `
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | TopLinkers Real Estate Pakistan',
    description: 'Terms and conditions governing real estate advisory, construction contracts, and solar net metering services with Top Linkers Islamabad.',
    h1: 'Terms and Conditions of Service: TopLinkers Islamabad',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:18px;font-weight:700;color:#0F2A44;margin-bottom:12px;">Standard Commercial &amp; Consulting Terms</h2>
        <p style="font-size:14px;line-height:1.7;color:#334155;margin-bottom:12px;">
          By utilizing the advisory, marketing, turnkey construction, or solar electrification services of Top Linkers, clients agree to standard contractual terms outlined herein.
        </p>
      </section>
    `
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | TopLinkers Real Estate, Construction & Solar',
    description: 'Read the privacy policy of TopLinkers regarding data protection, lead inquiries, client records, and confidentiality in Islamabad, Pakistan.',
    h1: 'Privacy Policy & Data Protection: TopLinkers Islamabad',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:18px;font-weight:700;color:#0F2A44;margin-bottom:12px;">Our Commitment to Client Privacy</h2>
        <p style="font-size:14px;line-height:1.7;color:#334155;margin-bottom:12px;">
          Top Linkers is committed to maintaining strict confidentiality of all client data, property ownership documentation, contact records, and transactional agreements.
        </p>
      </section>
    `
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer | TopLinkers Real Estate, Construction & Solar',
    description: 'Official legal disclaimer regarding property market rates, CDA transfer verifications, construction timelines, and solar yields with TopLinkers.',
    h1: 'Legal Disclaimer: TopLinkers Real Estate, Construction & Solar',
    content: `
      <section style="margin-bottom:24px;">
        <h2 style="font-size:18px;font-weight:700;color:#0F2A44;margin-bottom:12px;">Market Rate &amp; Construction Disclaimer</h2>
        <p style="font-size:14px;line-height:1.7;color:#334155;margin-bottom:12px;">
          Real estate market valuations, CDA ballot schedules, and construction material pricing are subject to market volatility. All transactions are executed through official registrar and authority procedures.
        </p>
      </section>
    `
  }
]

// Load dynamic blog posts from posts.json
const postsFilePath = path.resolve(__dirname, '../src/data/posts.json')
let dynamicBlogRoutes = []
if (fs.existsSync(postsFilePath)) {
  const posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'))
  dynamicBlogRoutes = posts.map(p => ({
    path: `/blog/${p.slug}`,
    title: `${p.title.length > 55 ? p.title.substring(0, 55) + '...' : p.title} | TopLinkers`,
    description: p.summary.length > 155 ? p.summary.substring(0, 152) + '...' : p.summary,
    h1: p.title,
    isArticle: true,
    articleData: p,
    content: `
      <article style="margin-bottom:24px;">
        <div style="background:#E0F2FE;border-left:4px solid #16B4E8;padding:12px 16px;margin-bottom:20px;border-radius:0 8px 8px 0;">
          <p style="font-size:15px;color:#0F2A44;font-weight:600;margin:0;">${p.summary}</p>
        </div>
        <div style="font-size:14px;color:#64748B;margin-bottom:16px;">
          <span>By <strong>${p.author}</strong></span> &bull; <span>${p.date}</span> &bull; <span>Category: ${p.category}</span>
        </div>
        <p style="font-size:15px;line-height:1.8;color:#334155;margin-bottom:16px;">
          ${p.content}
        </p>
        <p style="font-size:14px;color:#64748B;">
          For verified property transactions, plot title checks, or construction consultations related to this topic, contact TopLinkers at <strong>0334-9522157</strong> or visit our office at Al Hameed Plaza, G-11 Markaz Islamabad.
        </p>
        <div style="margin-top:24px;">
          <a href="/blog" style="color:#16B4E8;font-weight:700;">&larr; Back to all Market Updates</a>
        </div>
      </article>
    `
  }))
}

const allRoutes = [...staticRoutes, ...dynamicBlogRoutes]

function prerender() {
  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Base template ${templatePath} does not exist. Run vite build first.`)
    process.exit(1)
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8')

  console.log(`🚀 Pre-rendering ${allRoutes.length} public routes with SEO metadata & crawlable HTML...`)

  for (const r of allRoutes) {
    let html = baseHtml
    const fullCanonical = `${BASE_URL}${r.path}`

    // 1. Update <title>
    html = html.replace(/<title>.*?<\/title>/i, `<title>${r.title}</title>`)

    // 2. Update <meta name="description">
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="description" content="${r.description}" />`)

    // 3. Update Canonical <link rel="canonical">
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

    // 6. Article JSON-LD for blog posts
    if (r.isArticle && r.articleData) {
      const articleJsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": ${JSON.stringify(r.articleData.title)},
      "description": ${JSON.stringify(r.articleData.summary)},
      "image": ${JSON.stringify(r.articleData.image)},
      "datePublished": ${JSON.stringify(r.articleData.date)},
      "author": {
        "@type": "Person",
        "name": ${JSON.stringify(r.articleData.author)}
      },
      "publisher": {
        "@type": "Organization",
        "name": "Top Linkers Real Estate, Construction & Solar",
        "logo": {
          "@type": "ImageObject",
          "url": "https://toplinkersgroup.com/toplinkers-logo.jpg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${fullCanonical}"
      }
    }
    </script>`
      html = html.replace('</head>', `${articleJsonLd}\n  </head>`)
    }

    // 7. Infiltrate Semantic Fallback inside <div id="app">...</div>
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
          <a href="/blog" style="color:#fff;text-decoration:none;font-weight:600;">Blog</a>
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
            <a href="/listings" style="color:#0F2A44;font-weight:700;">Verified Properties</a>
            <a href="/blog" style="color:#0F2A44;font-weight:700;">Market Insights Blog</a>
            <a href="/contact" style="color:#0F2A44;font-weight:700;">Contact Us</a>
            <a href="/terms-and-conditions" style="color:#0F2A44;font-weight:700;">Terms &amp; Conditions</a>
            <a href="/privacy-policy" style="color:#0F2A44;font-weight:700;">Privacy Policy</a>
            <a href="/disclaimer" style="color:#0F2A44;font-weight:700;">Legal Disclaimer</a>
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

    // Write file to target destinations:
    // 1. root index.html
    // 2. dist/path.html (for direct Apache rewrite without trailing slash redirect)
    // 3. dist/path/index.html (for directory compatibility)
    if (r.path === '/') {
      fs.writeFileSync(templatePath, html, 'utf-8')
      console.log(`  ✅ Pre-rendered: / -> dist/index.html`)
    } else {
      const cleanPath = r.path.replace(/^\//, '')
      
      // Target A: dist/path/index.html
      const folderTargetDir = path.join(distDir, cleanPath)
      fs.mkdirSync(folderTargetDir, { recursive: true })
      const folderTargetFile = path.join(folderTargetDir, 'index.html')
      fs.writeFileSync(folderTargetFile, html, 'utf-8')

      // Target B: dist/path.html
      const singleTargetFile = path.join(distDir, `${cleanPath}.html`)
      const singleTargetDir = path.dirname(singleTargetFile)
      fs.mkdirSync(singleTargetDir, { recursive: true })
      fs.writeFileSync(singleTargetFile, html, 'utf-8')

      console.log(`  ✅ Pre-rendered: ${r.path} -> dist/${cleanPath}.html & dist/${cleanPath}/index.html`)
    }
  }

  console.log(`🎉 Pre-rendering completed successfully for all ${allRoutes.length} routes!`)
}

prerender()
