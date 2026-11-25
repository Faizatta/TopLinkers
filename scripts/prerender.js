/**
 * Comprehensive Static Pre-Rendering Build Script for TopLinkers Group
 * Generates static crawlable HTML files for all 90+ routes with route-specific:
 * - <title> (50-60 characters)
 * - <meta name="description"> (140-155 characters)
 * - Self-referencing canonical tag
 * - OpenGraph and Twitter cards
 * - Single, unique <h1> per page (eliminating duplicate H1s)
 * - Rich, in-depth content (350 - 1,200 words per page to eliminate thin content)
 * - Complete, crawlable property directory linking all 66 properties with internal links
 * - Cross-linked related properties on every single property detail page
 * - Full Schema.org JSON-LD structured data (RealEstateListing, BlogPosting, Organization)
 * Writes both dist/path.html and dist/path/index.html for 100% server compatibility without soft 404s.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../dist')
const templatePath = path.resolve(distDir, 'index.html')
// Preserve the pristine Vite SPA shell before homepage pre-rendering overwrites dist/index.html
const rawViteTemplate = fs.readFileSync(templatePath, 'utf-8')

const adminLoadingHtml = `<div id="app">
  <div style="min-height:100vh;background:#0B192C;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#fff;padding:20px;text-align:center;">
    <div style="background:#fff;padding:8px;border-radius:18px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.5);margin-bottom:20px;">
      <img src="/toplinkers-logo.jpg" alt="TopLinkers" width="60" height="60" style="display:block;border-radius:12px;object-fit:contain;" />
    </div>
    <div style="font-size:18px;font-weight:800;letter-spacing:0.5px;color:#fff;margin-bottom:6px;">TopLinkers Executive Portal</div>
    <div style="font-size:12px;color:#94A3B8;letter-spacing:0.5px;">Initializing secure management suite...</div>
    <div style="margin-top:24px;width:32px;height:32px;border:3px solid rgba(255,255,255,0.15);border-top-color:#16B4E8;border-radius:50%;animation:tl-spin 0.8s linear infinite;"></div>
    <style>@keyframes tl-spin { to { transform: rotate(360deg); } }</style>
  </div>
</div>`

const adminShellHtml = rawViteTemplate
  .replace('<title>TopLinkers | Real Estate, Construction &amp; Solar Islamabad</title>', '<title>TopLinkers Executive Suite | Secure Management Portal</title>')
  .replace('<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />', '<meta name="robots" content="noindex, nofollow" />')
  .replace('<link rel="canonical" href="https://toplinkersgroup.com/" />', '<link rel="canonical" href="https://toplinkersgroup.com/admin/login" />')
  .replace('<div id="app"></div>', adminLoadingHtml)

const BASE_URL = 'https://toplinkersgroup.com'

// 1. Core Static Content Routes with Rich, Non-Thin Content (400-800+ words each)
const staticRoutes = [
  {
    path: '/',
    title: 'TopLinkers | Real Estate, Construction & Solar Islamabad',
    description: 'Verified CDA sector plots, PHA flats, turnkey home construction & solar net metering in Islamabad. Contact TopLinkers for trusted property deals.',
    h1: 'TopLinkers | Premier Real Estate, Turnkey Construction & Solar in Islamabad',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Institutional Property Advisory &amp; Engineering Excellence in Islamabad</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Top Linkers is a premier real estate brokerage, PEC-licensed civil construction contractor, and Tier-1 solar net metering company headquartered at 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad. Spearheaded by Syed Usman Hammad, our multidisciplinary firm delivers institutional diligence, legal transparency, and end-to-end project execution for local homeowners, institutional investors, and overseas Pakistanis across the twin cities.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Our real estate portfolio specializes in CDA and RDA layout-verified residential and commercial plots, including cash possession Moqa Ka Plots in TopCity-1, PECHS Islamabad near New Islamabad International Airport, and Faisal Town Phase 2. We also maintain verified official inventory for Pakistan Housing Authority (PHA) Sector I-12 and Sector I-16 executive apartments, as well as luxury vacation suites at Harsukh Residencies in Nathia Gali with guaranteed 20%+ annual tourist rental yield.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Core Advisory &amp; Engineering Portfolios</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
          <div style="padding:14px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;margin-bottom:6px;"><a href="/services/residential-plots" style="color:#0F2A44;text-decoration:none;">1. Verified Plots &amp; Moqa Ka Plots</a></h3>
            <p style="font-size:13px;color:#64748B;line-height:1.6;">On-ground possession plots in TopCity-1, PECHS, and 4.5-year installment plans in Faisal Town Phase 2 with full CDA/RDA compliance.</p>
          </div>
          <div style="padding:14px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;margin-bottom:6px;"><a href="/services/apartments-flats" style="color:#0F2A44;text-decoration:none;">2. PHA Flats &amp; Holiday Suites</a></h3>
            <p style="font-size:13px;color:#64748B;line-height:1.6;">Official allotment transfers for Sector I-12 &amp; I-16 apartments, plus luxury mountain view suites in Harsukh Nathia Gali.</p>
          </div>
          <div style="padding:14px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;margin-bottom:6px;"><a href="/services/construction" style="color:#0F2A44;text-decoration:none;">3. PEC-Licensed Construction</a></h3>
            <p style="font-size:13px;color:#64748B;line-height:1.6;">Engineered grey structure building and premium turnkey finishes with seismic design and transparent fixed rates per square foot.</p>
          </div>
          <div style="padding:14px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;margin-bottom:6px;"><a href="/services/solar" style="color:#0F2A44;text-decoration:none;">4. Tier-1 Solar Net Metering</a></h3>
            <p style="font-size:13px;color:#64748B;line-height:1.6;">10kW, 20kW, and 50kW on-grid solar systems with turnkey IESCO green-meter approvals that permanently zero out your electricity bills.</p>
          </div>
        </div>
      </section>

      <section style="margin-bottom:28px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Why TopLinkers Is the Trusted Choice for Islamabad Real Estate</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:12px;">
          Property investment in Pakistan is fraught with file duplication, boundary disputes, and fraudulent layout approvals. At TopLinkers, every listing undergoes preliminary verification through official regulatory bodies including the Capital Development Authority (CDA), Rawalpindi Development Authority (RDA), and Federal Government Employees Housing Authority (FGEHA).
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Whether you are an overseas Pakistani seeking a safe 1 Kanal villa plot, a first-time homebuyer looking for an affordable 2-bed PHA flat in Sector I-12, or an investor seeking commercial storefronts with high rental yield, TopLinkers provides complete title verification and transparent escrow handling.
        </p>
        <p style="font-size:14px;color:#475569;">
          Explore our <a href="/listings" style="color:#16B4E8;font-weight:700;">Verified Property Listings</a>, read our <a href="/blog" style="color:#16B4E8;font-weight:700;">Market Intelligence Blog</a>, or schedule an in-person consultation with our <a href="/team" style="color:#16B4E8;font-weight:700;">Senior Advisory Desk</a>.
        </p>
      </section>
    `
  },
  {
    path: '/about',
    title: 'About Us | TopLinkers Real Estate & Engineering Islamabad',
    description: 'Learn about TopLinkers history, PEC-licensed engineering standards, 15+ years of CDA sector advisory & corporate offices in G-11 Markaz Islamabad.',
    h1: 'About TopLinkers Real Estate, Turnkey Construction & Solar',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">15+ Years of Verified Property Diligence in Islamabad</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Founded and led by Syed Usman Hammad, Top Linkers operates from 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad. What began as a boutique property consultancy has evolved into an integrated real estate brokerage, civil engineering construction firm, and renewable solar energy contractor serving clients throughout Islamabad, Rawalpindi, and overseas Pakistani communities in the UK, USA, UAE, and Canada.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Our multidisciplinary practice bridges the traditional divide between property brokerage, architectural design, structural engineering, and sustainable energy electrification. By housing PEC-registered civil engineers, certified legal transfer experts, and experienced solar project managers under one institutional roof, we provide clients with end-to-end certainty from initial land acquisition to turnkey structural delivery.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Our Core Operational Standards</h2>
        <ul style="line-height:2;color:#334155;font-size:14px;padding-left:20px;">
          <li><strong>Institutional Land Title Diligence:</strong> Complete title search, registry transfer verification, and CDA/RDA layout scrutiny to ensure 100% scam-free transactions.</li>
          <li><strong>PEC-Registered Civil Engineering:</strong> Turnkey house construction adhering strictly to building codes, seismic safety standards, and transparent bills of quantities (BOQ).</li>
          <li><strong>Tier-1 Renewable Solar Solutions:</strong> Turnkey supply, installation, and net metering certification with Islamabad Electric Supply Company (IESCO).</li>
          <li><strong>Overseas Client Concierge:</strong> Virtual video tours, power of attorney facilitation, digital transaction updates, and confidential portfolio management.</li>
        </ul>
      </section>

      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Corporate Headquarters in G-11 Markaz</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Our corporate office in Al Hameed Plaza, G-11 Markaz is conveniently located just off Srinagar Highway, providing easy access from Islamabad International Airport, Blue Area, and motorway corridors. We invite clients, investors, and homeowners to visit our advisory desks for personalized consultations.
        </p>
        <p style="font-size:14px;color:#475569;">
          Meet our <a href="/team" style="color:#16B4E8;font-weight:700;">Executive Advisory Team</a> or browse our <a href="/services" style="color:#16B4E8;font-weight:700;">Core Engineering Divisions</a>.
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
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Five Specialized Divisions Under One Institutional Roof</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Top Linkers provides institutional real estate advisory, architectural civil construction, and renewable energy solutions across Islamabad and Rawalpindi. Each division is led by specialized industry professionals to ensure unmatched diligence, regulatory compliance, and execution speed.
        </p>
      </section>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:20px;margin-bottom:32px;">
        <div style="border:1px solid #E2E8F0;border-radius:10px;padding:20px;background:#fff;">
          <h3 style="font-size:18px;font-weight:800;color:#0F2A44;margin-bottom:8px;"><a href="/services/real-estate" style="color:#0F2A44;text-decoration:none;">1. Real Estate Brokerage &amp; Diligence</a></h3>
          <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:12px;">Legal CDA title verification, allotment transfers, file verification, and power of attorney advisory for residential and commercial assets.</p>
          <a href="/services/real-estate" style="color:#16B4E8;font-weight:700;font-size:13px;">Read Full Service Guide &rarr;</a>
        </div>
        <div style="border:1px solid #E2E8F0;border-radius:10px;padding:20px;background:#fff;">
          <h3 style="font-size:18px;font-weight:800;color:#0F2A44;margin-bottom:8px;"><a href="/services/residential-plots" style="color:#0F2A44;text-decoration:none;">2. Residential Plots &amp; Moqa Ka Plots</a></h3>
          <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:12px;">Ready possession plots in TopCity-1, PECHS, and Faisal Town Phase 2 with full development NOCs and immediate possession clearance.</p>
          <a href="/services/residential-plots" style="color:#16B4E8;font-weight:700;font-size:13px;">Read Plot Opportunities &rarr;</a>
        </div>
        <div style="border:1px solid #E2E8F0;border-radius:10px;padding:20px;background:#fff;">
          <h3 style="font-size:18px;font-weight:800;color:#0F2A44;margin-bottom:8px;"><a href="/services/apartments-flats" style="color:#0F2A44;text-decoration:none;">3. PHA Government Flats &amp; Suites</a></h3>
          <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:12px;">Official allotment transfers for Sector I-12 and I-16 executive apartments, plus high-yield vacation suites at Harsukh Nathia Gali.</p>
          <a href="/services/apartments-flats" style="color:#16B4E8;font-weight:700;font-size:13px;">Explore Apartment Options &rarr;</a>
        </div>
        <div style="border:1px solid #E2E8F0;border-radius:10px;padding:20px;background:#fff;">
          <h3 style="font-size:18px;font-weight:800;color:#0F2A44;margin-bottom:8px;"><a href="/services/construction" style="color:#0F2A44;text-decoration:none;">4. Turnkey Construction &amp; Architecture</a></h3>
          <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:12px;">PEC-licensed grey structure building, seismic structural design, and A+ luxury turnkey finishes with transparent fixed square-foot contracts.</p>
          <a href="/services/construction" style="color:#16B4E8;font-weight:700;font-size:13px;">View Construction Specifications &rarr;</a>
        </div>
        <div style="border:1px solid #E2E8F0;border-radius:10px;padding:20px;background:#fff;">
          <h3 style="font-size:18px;font-weight:800;color:#0F2A44;margin-bottom:8px;"><a href="/services/solar" style="color:#0F2A44;text-decoration:none;">5. Solar Solutions &amp; Net Metering</a></h3>
          <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:12px;">Tier-1 on-grid solar systems (10kW, 20kW, 50kW) with turnkey IESCO net-metering approvals, zero electricity bills, and rapid ROI.</p>
          <a href="/services/solar" style="color:#16B4E8;font-weight:700;font-size:13px;">View Solar Net Metering Details &rarr;</a>
        </div>
      </div>
    `
  },
  {
    path: '/services/real-estate',
    title: 'Real Estate Advisory & Property Brokerage | TopLinkers',
    description: 'TopLinkers offers verified property advisory in Islamabad. Buy, sell, and verify CDA sector files with complete legal diligence. Contact our consultants.',
    h1: 'Real Estate Advisory & Property Brokerage in Islamabad',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Institutional Due Diligence &amp; Title Verification</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Navigating Islamabad's high-stakes property market requires rigorous scrutiny of master plans, layout approvals, boundary demarcations, and transfer legalities. Top Linkers provides comprehensive legal due diligence with the Capital Development Authority (CDA), Rawalpindi Development Authority (RDA), and Federal Government Employees Housing Authority (FGEHA).
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Our brokerage desk manages transactions from end to end: legal title verification, physical site inspections, seller identification checks, biometric transfer facilitation, and secure financial escrow. We represent buyers and sellers with total transparency, eliminating intermediary hidden margins.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Key Sectors &amp; Societies We Specialize In</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:14px;">
          Top Linkers maintains real-time transactional pricing data and verified owner files across prime twin cities growth corridors:
        </p>
        <ul style="line-height:2;color:#334155;font-size:14px;padding-left:20px;">
          <li><strong>Airport &amp; Motorway Corridor:</strong> TopCity-1, PECHS Islamabad, Mumtaz City, Faisal Town Phase 1 &amp; Phase 2, Airport Green Garden (AGG).</li>
          <li><strong>CDA Capital Sectors:</strong> Sector G-11, Sector I-12, Sector I-14, Sector I-16, Sector C-14, Sector C-15, and Sector D-12.</li>
          <li><strong>Executive Gated Communities:</strong> Gulberg Greens &amp; Residencia, DHA Islamabad (Phase 2 &amp; Phase 5), Bahria Town Phase 7 &amp; 8, Multi Gardens B-17.</li>
          <li><strong>Northern Holiday Destinations:</strong> Luxury serviced suites in Nathia Gali, Kuza Gali, and Murree.</li>
        </ul>
      </section>

      <p style="font-size:14px;color:#475569;">
        Browse our <a href="/listings" style="color:#16B4E8;font-weight:700;">Verified Property Listings</a> or schedule an appointment with our <a href="/team" style="color:#16B4E8;font-weight:700;">Senior Property Consultants</a>.
      </p>
    `
  },
  {
    path: '/services/residential-plots',
    title: 'Residential & Commercial Plots Islamabad | TopLinkers Deals',
    description: 'Explore verified residential plots in TopCity-1, PECHS, and Faisal Town Phase 2 with cash possession and CDA/RDA approvals. Call TopLinkers today.',
    h1: 'Verified Residential & Commercial Plots in Islamabad & Rawalpindi',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Cash Possession \'Moqa Ka Plots\' &amp; Flexible Installment Plans</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Top Linkers holds exclusive inventories of ready-to-build, on-ground possession plots across Islamabad\'s most sought-after growth corridors. Whether you require a 5 Marla, 10 Marla, or 1 Kanal plot in TopCity-1 (Kashmir Highway / Airport Corridor), PECHS Islamabad (near Islamabad International Airport), Airport Green Garden (AGG), or flexible 4.5-year installment files in Faisal Town Phase 2, we guarantee verified allotment papers with full regulatory clearance.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Our \'Moqa Ka Plot\' inventory represents vetted, below-market cash possession opportunities where buyers can physically inspect the land, verify utility infrastructure (underground electricity, water supply, sewage, paved roads), and take immediate building possession upon transfer.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Plot Categories &amp; Investment Parameters</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
          <div style="padding:14px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:15px;font-weight:700;color:#0F2A44;">TopCity-1 (Kashmir Highway Interchange)</h3>
            <p style="font-size:13px;color:#475569;margin-top:4px;">Direct access to Srinagar Highway and Metro Bus. 5 Marla, 10 Marla, and 1 Kanal plots in Block B, Block C, and Block D. Ideal for immediate luxury home building.</p>
          </div>
          <div style="padding:14px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:15px;font-weight:700;color:#0F2A44;">PECHS Islamabad (Near Airport Terminal)</h3>
            <p style="font-size:13px;color:#475569;margin-top:4px;">Affordable 5 Marla (125 sq yd) and 10 Marla plots starting from PKR 25 Lacs. Developed society with operational underground utilities and high capital appreciation potential.</p>
          </div>
          <div style="padding:14px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:15px;font-weight:700;color:#0F2A44;">Faisal Town Phase 2 (FT-II)</h3>
            <p style="font-size:13px;color:#475569;margin-top:4px;">Chaudhry Abdul Majeed\'s flagship master-planned community on Thalian Interchange. Flexible 4.5-year quarterly installment plans with low down payments.</p>
          </div>
        </div>
      </section>

      <p style="font-size:14px;color:#475569;">
        Check our <a href="/listings" style="color:#16B4E8;font-weight:700;">Active Plot Listings</a> or consult our <a href="/contact" style="color:#16B4E8;font-weight:700;">Plot Booking Desk</a>.
      </p>
    `
  },
  {
    path: '/services/apartments-flats',
    title: 'PHA Flats & Luxury Apartments Islamabad | TopLinkers Deals',
    description: 'Buy ready and under-construction PHA apartments in I-12 and I-16, plus Harsukh Nathia Gali luxury vacation suites. Inquire with TopLinkers today.',
    h1: 'Apartments, PHA Government Flats & Luxury Vacation Suites',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Affordable Urban Living &amp; High-Yield Vacation Suites</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          From budget-friendly urban living to high-yield vacation real estate, Top Linkers is a recognized leader in apartment trading. We specialize in official allotment file transfers for Pakistan Housing Authority (PHA) Sector I-12 and Sector I-16 executive apartments. In addition, we are the exclusive marketing partner for Harsukh Residencies in Nathia Gali.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          PHA apartments offer civil servants, overseas Pakistanis, and private investors government-backed apartment ownership in rapidly developing sectors with strong rental demand from university students, corporate employees, and families.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Available Apartment Configurations</h2>
        <ul style="line-height:2;color:#334155;font-size:14px;padding-left:20px;">
          <li><strong>PHA Sector I-12/1 Type D &amp; E (870 - 950 sq ft):</strong> 2-bedroom executive layouts featuring attached bathrooms, lounge, kitchen, and balcony. Available for cash possession starting from PKR 52 Lacs.</li>
          <li><strong>PHA Sector I-16/3 Type B (1,496 sq ft):</strong> 3-bedroom spacious family apartments with dedicated servant room and high-floor panoramic views. Ready for possession.</li>
          <li><strong>PHA Sector I-16/3 Type E (912 sq ft):</strong> Affordable 2-bedroom corner units with separate utility meters and dedicated elevators.</li>
          <li><strong>Harsukh Residencies Nathia Gali:</strong> Serviced luxury vacation suites with hotel management, 15% booking, and projected 20%+ annual tourist rental yield.</li>
        </ul>
      </section>

      <p style="font-size:14px;color:#475569;">
        Learn more about <a href="/hr-sukh" style="color:#16B4E8;font-weight:700;">Harsukh Nathia Gali Vacation Suites</a> or see <a href="/listings" style="color:#16B4E8;font-weight:700;">Available PHA Flat Listings</a>.
      </p>
    `
  },
  {
    path: '/services/construction',
    title: 'Turnkey Construction & Architectural Design | TopLinkers',
    description: 'PEC-licensed turnkey home construction in Islamabad & Rawalpindi. Premium grey structure & luxury finishes with fixed transparent cost per sqft.',
    h1: 'PEC-Licensed Turnkey Civil Construction & Architecture',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Engineered House Building with Guaranteed Milestones</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Building a luxury home in Islamabad requires professional project management, strict adherence to seismic codes, and transparent material procurement. Top Linkers provides comprehensive turnkey construction backed by Pakistan Engineering Council (PEC) registered civil engineers and architects.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          We manage the complete lifecycle: architectural 3D conceptualization, structural vetting, CDA/RDA building plan approvals, grey structure casting, electrical/plumbing conduit installation, and luxury turnkey finishes (imported porcelain tiles, solid teak woodwork, Grohe/Kohler sanitaryware, double-glazed soundproof glass).
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Construction Packages &amp; Transparent Rates</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
          <div style="padding:16px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;">A+ Grey Structure Construction</h3>
            <p style="font-size:13px;color:#64748B;margin:6px 0;">PKR 2,400 - 2,800 per sq ft</p>
            <p style="font-size:13px;color:#334155;line-height:1.5;">Deformed Grade-60 steel (Mughal/Amreli), OPC cement (Bestway/Fauji), premium red clay bricks, anti-termite chemical soil treatment, and underground water cistern.</p>
          </div>
          <div style="padding:16px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;">Turnkey Luxury Finishing Package</h3>
            <p style="font-size:13px;color:#64748B;margin:6px 0;">PKR 4,800 - 6,200 per sq ft</p>
            <p style="font-size:13px;color:#334155;line-height:1.5;">Imported designer Spanish porcelain tiles, bespoke kitchen cabinets with Corian/Quartz countertops, branded bathroom suites, solid ash wood doors, and smart lighting automation.</p>
          </div>
        </div>
      </section>

      <p style="font-size:14px;color:#475569;">
        Request a customized <a href="/contact" style="color:#16B4E8;font-weight:700;">Construction Cost Estimate</a> or consult our civil engineers.
      </p>
    `
  },
  {
    path: '/services/solar',
    title: 'Solar Energy Solution & Net Metering Islamabad | TopLinkers',
    description: 'Engineered solar energy solutions with Tier-1 panels, inverters & battery storage by PEC registered technical teams with net metering in Islamabad.',
    h1: 'Solar Energy Solution',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Eliminate High WAPDA Electricity Bills with Solar Energy Solutions</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          With escalating peak power tariffs, fuel price adjustments (FPA), and fixed capacity surcharges across Pakistan, investing in an engineered Tier-1 solar net-metering system delivers a rapid capital payback period of 2.2 to 3.2 years. TopLinkers Solar Division features PEC registered technical teams providing turnkey residential, commercial, and industrial photovoltaic installations throughout Islamabad and Rawalpindi.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          With over 50+ completed solar projects, 99% uptime with intelligent monitoring systems, and 20K+ tons of CO2 offset, we install BloombergNEF Tier-1 panels, smart inverters, and lithium energy storage batteries with full net-metering regulatory documentation and green meter commissioning.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">3 Primary Solar Architectures</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
          <div style="padding:14px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:15px;font-weight:700;color:#0F2A44;">1. Grid-Tied Solar Solution</h3>
            <p style="font-size:13px;color:#475569;margin-top:4px;">Direct grid-connected solar with bi-directional green meter export. Zero battery capital costs, fastest 2.2–3 year ROI, and 100% WAPDA bill elimination.</p>
          </div>
          <div style="padding:14px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:15px;font-weight:700;color:#0F2A44;">2. Hybrid Solar Solution</h3>
            <p style="font-size:13px;color:#475569;margin-top:4px;">Combines solar generation, grid net-metering export, and automated Lithium (LiFePO4) storage for 24/7 power resilience and instant 10ms UPS switchover.</p>
          </div>
          <div style="padding:14px;border:1px solid #E2E8F0;border-radius:8px;">
            <h3 style="font-size:15px;font-weight:700;color:#0F2A44;">3. Battery Energy Storage System (BESS)</h3>
            <p style="font-size:13px;color:#475569;margin-top:4px;">High-density modular lithium rack systems (10kWh to 200kWh+) for commercial peak-shaving, microgrid independence, and generator replacement.</p>
          </div>
        </div>
      </section>

      <section style="margin-bottom:28px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">7-Step Turnkey IESCO Net-Metering Workflow</h2>
        <ol style="font-size:14px;color:#334155;line-height:1.8;padding-left:20px;">
          <li><strong>Digital 3D Rooftop Survey:</strong> Shading modeling and structural load analysis.</li>
          <li><strong>Single Line Diagram (SLD):</strong> Engineering electrical design with PEC certification.</li>
          <li><strong>IESCO Application Submission:</strong> Formal filing with the relevant sub-division.</li>
          <li><strong>Tier-1 Equipment Verification:</strong> BNEF N-type TOPCon modules and smart inverters.</li>
          <li><strong>Precision Installation:</strong> Hot-dipped galvanized elevated mounting structures and chemical earthing.</li>
          <li><strong>IESCO Surveillance Inspection:</strong> Anti-islanding safety relay testing and lab calibration.</li>
          <li><strong>Green Meter Commissioning:</strong> Activation of bi-directional net-meter billing offset.</li>
        </ol>
      </section>

      <p style="font-size:14px;color:#475569;">
        Calculate your electricity savings and <a href="/contact" style="color:#16B4E8;font-weight:700;">Book a Free Solar Site Assessment</a> or WhatsApp our engineering desk at +92-334-9522157.
      </p>
    `
  },
  {
    path: '/listings',
    title: 'Property Listings Islamabad | Verified Plots & Flats | TopLinkers',
    description: 'Explore verified plots in TopCity, PECHS & Faisal Town, PHA flats in I-12 & I-16, and commercial properties in Islamabad. Filter by price and location.',
    h1: 'Verified Property Listings & Real Estate Portfolios in Islamabad',
    content: '' // Dynamically populated below with the complete 66-property index
  },
  {
    path: '/team',
    title: 'Leadership & Team | TopLinkers Real Estate & Engineering',
    description: 'Meet Syed Usman Hammad and TopLinkers experienced team of property consultants, PEC civil engineers and solar project managers in Islamabad.',
    h1: 'Executive Leadership & Advisory Team at TopLinkers',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Institutional Leadership, Local Mastery</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Top Linkers is spearheaded by Chief Executive Syed Usman Hammad, alongside seasoned property consultants, PEC-licensed civil engineers, and solar energy technicians. We combine 15+ years of twin cities market knowledge with institutional standards of legal diligence, technical rigor, and client transparency.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:16px;">Executive Management Desks</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;">
          <div style="border:1px solid #E2E8F0;border-radius:8px;padding:16px;">
            <h3 style="font-size:16px;font-weight:800;color:#0F2A44;">Syed Usman Hammad</h3>
            <p style="font-size:13px;color:#16B4E8;font-weight:700;">Chief Executive Officer &amp; Principal Broker</p>
            <p style="font-size:13px;color:#475569;margin-top:8px;line-height:1.6;">15+ years of proven leadership in Islamabad master-planned communities, CDA transfer protocols, and high-value commercial transactions.</p>
          </div>
          <div style="border:1px solid #E2E8F0;border-radius:8px;padding:16px;">
            <h3 style="font-size:16px;font-weight:800;color:#0F2A44;">Civil Engineering &amp; Architecture Wing</h3>
            <p style="font-size:13px;color:#16B4E8;font-weight:700;">PEC Registered Civil Engineers</p>
            <p style="font-size:13px;color:#475569;margin-top:8px;line-height:1.6;">Overseeing architectural vetting, structural seismic testing, construction supervision, and fixed-rate turnkey home delivery.</p>
          </div>
          <div style="border:1px solid #E2E8F0;border-radius:8px;padding:16px;">
            <h3 style="font-size:16px;font-weight:800;color:#0F2A44;">Solar Electrification &amp; Net Metering Wing</h3>
            <p style="font-size:13px;color:#16B4E8;font-weight:700;">IESCO Certified Solar Engineers</p>
            <p style="font-size:13px;color:#475569;margin-top:8px;line-height:1.6;">Delivering custom photovoltaic layouts, structural roof load testing, and expedited regulatory green-meter clearances.</p>
          </div>
        </div>
      </section>

      <p style="font-size:14px;color:#475569;">
        Schedule an advisory session with our <a href="/contact" style="color:#16B4E8;font-weight:700;">Consultants Desk</a> or visit us in G-11 Markaz.
      </p>
    `
  },
  {
    path: '/contact',
    title: 'Contact TopLinkers | G-11 Markaz Islamabad Head Office',
    description: 'Contact Top Linkers head office at Al Hameed Plaza, G-11 Markaz Islamabad. Call 0334-9522157 or WhatsApp our property, construction and solar advisory desks.',
    h1: 'Contact TopLinkers Real Estate, Turnkey Construction & Solar',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Visit Our Corporate Headquarters in G-11 Markaz Islamabad</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Top Linkers welcomes local homeowners, property buyers, sellers, corporate builders, and overseas Pakistani investors to our corporate headquarters located at 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad. Our advisory desks are open Monday through Saturday from 9:30 AM to 7:00 PM PKT.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Located immediately off Srinagar Highway (Kashmir Highway), our offices offer rapid, direct transit connectivity from Islamabad International Airport (18 minutes), Blue Area Islamabad (12 minutes), and the twin cities motorway interchanges (M-1 &amp; M-2). Ample plaza parking and elevator access are provided for client convenience.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:16px;">Direct Departmental Desks &amp; Communications</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;">
          <div style="padding:16px;background:#F8FAFC;border-radius:8px;border:1px solid #E2E8F0;">
            <p style="font-size:14px;font-weight:800;color:#0F2A44;margin-bottom:6px;">1. Real Estate Diligence Desk</p>
            <p style="font-size:13px;color:#475569;line-height:1.6;margin-bottom:8px;">CDA/RDA registry checks, Token Biyana escrow, and official allotment transfer facilitation for TopCity-1, PECHS, and PHA I-12 / I-16.</p>
            <p style="font-size:13px;color:#0F2A44;font-weight:700;">Phone: +92-334-9522157</p>
          </div>
          <div style="padding:16px;background:#F8FAFC;border-radius:8px;border:1px solid #E2E8F0;">
            <p style="font-size:14px;font-weight:800;color:#0F2A44;margin-bottom:6px;">2. Civil Engineering &amp; Construction Desk</p>
            <p style="font-size:13px;color:#475569;line-height:1.6;margin-bottom:8px;">PEC-licensed architectural design, grey structure milestone contracts, BOQ budgeting, and luxury turnkey villa finishes.</p>
            <p style="font-size:13px;color:#0F2A44;font-weight:700;">Phone: +92-332-4004884</p>
          </div>
          <div style="padding:16px;background:#F8FAFC;border-radius:8px;border:1px solid #E2E8F0;">
            <p style="font-size:14px;font-weight:800;color:#0F2A44;margin-bottom:6px;">3. Solar Net Metering &amp; Energy Desk</p>
            <p style="font-size:13px;color:#475569;line-height:1.6;margin-bottom:8px;">10kW to 500kW turnkey solar installations, Tier-1 TOPCon panels, hybrid battery storage (BESS), and IESCO green-meter approvals.</p>
            <p style="font-size:13px;color:#0F2A44;font-weight:700;">WhatsApp: +92-334-9522157</p>
          </div>
        </div>
      </section>

      <section style="margin-bottom:28px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Overseas Pakistani Advisory &amp; Digital Video Diligence</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          For overseas clients residing in the United Kingdom, United States, Canada, Saudi Arabia, and the United Arab Emirates, TopLinkers provides dedicated virtual consultations. Our senior consultants conduct live video walkthroughs of plots and building sites, verify official allotment records with housing directorates, and coordinate Power of Attorney (POA) registrations with embassy consular desks.
        </p>
        <p style="font-size:14px;color:#475569;">
          Official Email: <a href="mailto:toplinkers69@gmail.com" style="color:#16B4E8;font-weight:700;">toplinkers69@gmail.com</a> | Executive Secretariat: <a href="mailto:info@toplinkersgroup.com" style="color:#16B4E8;font-weight:700;">info@toplinkersgroup.com</a>
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
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Vacation in the Clouds, Earn While You Sleep</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Situated in scenic Kuza Gali just minutes from main Nathia Gali on the Murree-Abbottabad Highway, Harsukh Residencies is an exclusive mountain retreat offering hotel-serviced luxury apartments and vacation suites. Top Linkers is the authorized primary marketing and advisory partner.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          The project caters to investors seeking a hassle-free, fully managed tourist rental asset. With over 2.5 million tourists visiting the Galyat region annually during summer escapes and winter snow seasons, professional hotel management ensures steady rental revenue projected at 20%+ annual yield, alongside complimentary personal vacation stays for owners.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Each suite is designed with floor-to-ceiling panoramic glass windows capturing unobstructed pine forest valleys, snow-capped mountain ridges, and cloudscapes. The building features reinforced RCC earthquake-resistant engineering, thermal insulation, centralized biomass heating conduits, and heavy-duty backup power generators designed for rugged alpine climates.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Project Specifications &amp; Payment Structure</h2>
        <ul style="line-height:2.2;color:#334155;font-size:14px;padding-left:20px;">
          <li><strong>Suite Variants:</strong> Studio Executive Suites, 1-Bedroom Mountain View Suites, and 2-Bedroom Family Penthouses.</li>
          <li><strong>Booking Terms:</strong> 15% down payment with balance payable in 36 easy monthly installments.</li>
          <li><strong>Full Furnishing Option:</strong> Turnkey interior decor including heating, wooden flooring, panoramic double glazing, and designer fixtures.</li>
          <li><strong>Rental Management:</strong> On-site concierge, housekeeping, 24/7 security, backup generators, and digital income statements.</li>
          <li><strong>Access &amp; Connectivity:</strong> Direct frontage on main Murree-Nathia Gali road, 75 minutes scenic drive from Islamabad via Murree Expressway.</li>
        </ul>
      </section>

      <section style="margin-bottom:28px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Guaranteed Asset Security &amp; Ownership Verification</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          All land titles, building permissions, and environmental NOCs for Harsukh Residencies have been fully vetted by TopLinkers legal counsel. Buyers receive clear registry and sub-lease ownership titles with transparent quarterly financial reports on rental pool disbursements.
        </p>
        <p style="font-size:14px;color:#475569;">
          Contact our <a href="/contact" style="color:#16B4E8;font-weight:700;">Harsukh Booking Desk</a> to reserve your suite or schedule an accompanied site inspection in Kuza Gali.
        </p>
      </section>
    `
  },
  {
    path: '/featured-building',
    title: 'Banu Hafeez Residences TopCity-1 | Modern Apartments Islamabad',
    description: 'Banu Hafeez Residences offers modern 1, 2 & 3-bed apartment living in Block B, TopCity-1, Islamabad, near Srinagar Highway. Developed by Waheed Group of Companies.',
    h1: 'Banu Hafeez Residences — Modern Apartment Living in Block B, TopCity-1',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Comprehensive Project Description</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Banu Hafeez Residences offers modern apartment living in Block B, TopCity-1, Islamabad, near Srinagar Highway. Developed by Waheed Group of Companies, this residential project features thoughtfully designed 1-bed, 2-bed and 3-bed apartments, with spacious layouts, contemporary kitchens, balconies and terraces. Enjoy convenient access to Islamabad International Airport, major motorways and key destinations across the twin cities.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          TopCity-1 represents one of the most strategically positioned master-planned developments in the federal capital region. Situated at the confluence of Srinagar Highway, M-1 Motorway, and M-2 Motorway, residents benefit from direct access to the operational Metro Bus line, reducing commute times to Islamabad\'s central business districts to under 20 minutes.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Features &amp; Amenities</h2>
        <ul style="line-height:2.2;color:#334155;font-size:14px;padding-left:20px;">
          <li>Prime Location in Block B, TopCity-1, Islamabad adjoining the airport gate</li>
          <li>Modern Earthquake-Resistant Structural Design vetted by certified structural engineers</li>
          <li>Two Dedicated Basement Parking Floors with automated barrier entry</li>
          <li>High-speed Passenger &amp; Service Elevators with smart power failover</li>
          <li>24/7 CCTV Surveillance &amp; Gated Security Arrangements with central control desk</li>
          <li>Heavy-duty Standby Backup Generator for 100% uninterrupted common area and lift power</li>
          <li>Underground utility infrastructure: gas, electricity, high-speed fiber internet, and potable water filtration</li>
        </ul>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Unit Specifications &amp; Payment Breakdown</h2>
        <ul style="line-height:2.2;color:#334155;font-size:14px;padding-left:20px;">
          <li><strong>Units:</strong> 1, 2 &amp; 3 Bed Executive Apartments with ensuite bathrooms and private balconies</li>
          <li><strong>Down Payment:</strong> 15% Booking with immediate official allotment letter</li>
          <li><strong>Installments:</strong> 3-Year Flexible Quarterly Payment Plan</li>
          <li><strong>Possession:</strong> Planned within 2 Years with guaranteed structural delivery timeline</li>
          <li><strong>Rental Potential:</strong> High corporate and transit rental demand due to airport staff and multinational travelers</li>
        </ul>
      </section>

      <p style="font-size:14px;color:#475569;">
        Contact our <a href="/contact" style="color:#16B4E8;font-weight:700;">TopCity-1 Advisory Desk</a> to schedule a site visit or reserve your unit.
      </p>
    `
  },
  {
    path: '/blog',
    title: 'Real Estate Blog & Market Intelligence | TopLinkers Islamabad',
    description: 'Expert real estate insights on CDA sector plot ballots, TopCity & PECHS rates, PHA flat prices, turnkey construction costs and solar net metering in Pakistan.',
    h1: 'TopLinkers Real Estate Blog & Market Intelligence Reports',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Twin Cities Property Research &amp; Market Intelligence</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Top Linkers publishes data-driven research, regulatory updates, and pricing analysis covering Islamabad and Rawalpindi. Our publications empower investors, homeowners, and overseas Pakistanis with actionable market intelligence.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:16px;">Featured Research Reports &amp; Practical Guides</h2>
        <ul style="line-height:2.2;color:#334155;font-size:14px;">
          <li><a href="/blog/cda-sector-c-14-c-15-development-updates-2026" style="color:#16B4E8;font-weight:700;">CDA Sector C-14 &amp; C-15 Development Updates 2026: Margalla Avenue Connectivity &amp; Plot Ballot</a></li>
          <li><a href="/blog/pha-flats-i12-i16-investment-guide" style="color:#16B4E8;font-weight:700;">Complete Guide to PHA Flats in Sector I-12 &amp; I-16: Prices, Allotment Rules &amp; Rental Yields</a></li>
          <li><a href="/blog/topcity1-faisal-town2-motorway-growth" style="color:#16B4E8;font-weight:700;">TopCity-1 vs Faisal Town Phase II: 10 Marla Plot Analysis &amp; Capital Growth Forecast</a></li>
          <li><a href="/blog/solar-energy-pakistan-homes-roi" style="color:#16B4E8;font-weight:700;">Installing 10kW, 20kW &amp; 50kW Solar Systems: Slashing WAPDA Bills &amp; IESCO Net Metering</a></li>
          <li><a href="/blog/gulberg-greens-commercial-plazas-appraisal" style="color:#16B4E8;font-weight:700;">Commercial Real Estate in Gulberg Islamabad: Opal Square &amp; D-Markaz Yield Analysis</a></li>
          <li><a href="/blog/pechs-affordable-housing-islamabad" style="color:#16B4E8;font-weight:700;">PECHS Islamabad: Affordable 5 Marla Plots Starting from PKR 25 Lac Near Airport</a></li>
          <li><a href="/blog/turnkey-construction-cost-per-sqft-islamabad" style="color:#16B4E8;font-weight:700;">Turnkey Construction Costs in Islamabad &amp; Rawalpindi: 2026 Material Rates &amp; Grey Structure</a></li>
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
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">1. Scope of Advisory &amp; Brokerage Representation</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Top Linkers operates as an authorized real estate brokerage, PEC-registered civil construction contractor, and Tier-1 solar electrification firm in Islamabad, Pakistan. By accessing our website, submitting inquiries, or engaging our advisory services, clients enter into an agreement governed by the laws of the Islamic Republic of Pakistan and the regulatory jurisdiction of the Islamabad Capital Territory.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          All property listings, plot dimensions, and pricing estimates presented on this website are compiled with preliminary due diligence from official regulatory bodies including CDA, RDA, and FGEHA. Final transaction terms, earnest token payments (Biyana), and transfer schedules are formalized through written tripartite sale agreements.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">2. Construction &amp; Solar Contracting Terms</h2>
        <p style="font-size:14px;line-height:1.75;color:#334155;margin-bottom:12px;">
          Civil construction contracts executed through Top Linkers are bound by detailed Bills of Quantities (BOQ) with fixed milestone-based payments. Architectural alterations requested after structural pouring are subject to mutually agreed variance addendums.
        </p>
        <p style="font-size:14px;line-height:1.75;color:#334155;margin-bottom:12px;">
          Solar installations are warranted according to manufacturer specifications (25-year panel performance, 5-year inverter warranty). Turnkey IESCO green-meter net metering processing is subject to utility regulatory approvals and standard inspection timelines.
        </p>
      </section>

      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">3. Dispute Resolution &amp; Jurisdiction</h2>
        <p style="font-size:14px;line-height:1.75;color:#334155;">
          Any legal disputes arising from property transactions, construction milestones, or consulting engagements shall first be resolved through formal mediation at our corporate office in G-11 Markaz, Islamabad, prior to seeking judicial adjudication in the courts of Islamabad.
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
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Our Institutional Commitment to Client Confidentiality</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Top Linkers respects the privacy and confidentiality of our clients, property buyers, sellers, and overseas Pakistani investors. This Privacy Policy details our protocols regarding the collection, safeguarding, and use of personal data, property title documents, and transactional correspondence.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          We collect personal information solely to provide real estate diligence, transfer facilitation, construction cost estimations, and solar site feasibility reports. We never sell, lease, or monetize client data to third-party marketing companies.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Google AdSense &amp; DoubleClick DART Cookies Policy</h2>
        <p style="font-size:14px;line-height:1.75;color:#334155;margin-bottom:12px;">
          Google is a third-party vendor on our website. Google uses cookies, known as DART cookies, to serve advertisements to our site visitors based upon their visit to toplinkersgroup.com and other sites on the Internet.
        </p>
        <p style="font-size:14px;line-height:1.75;color:#334155;margin-bottom:12px;">
          Users may opt out of the use of the DART cookie and manage personalized advertising choices by visiting the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style="color:#16B4E8;font-weight:700;">Google Ad and Content Network Privacy Policy</a> or <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style="color:#16B4E8;font-weight:700;">Google Ads Settings</a>.
        </p>
        <p style="font-size:14px;line-height:1.75;color:#334155;margin-bottom:12px;">
          Additionally, you can opt out of third-party interest-based advertising via the <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style="color:#16B4E8;font-weight:700;">Digital Advertising Alliance (DAA)</a> or the <a href="http://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" style="color:#16B4E8;font-weight:700;">Network Advertising Initiative (NAI)</a>.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">GDPR &amp; CCPA Privacy Rights (EU &amp; California Visitors)</h2>
        <p style="font-size:14px;line-height:1.75;color:#334155;margin-bottom:12px;">
          Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA/CPRA), visitors possess clear legal rights to access, rectify, request erasure of their personal data, restrict data processing, and request data portability.
        </p>
        <p style="font-size:14px;line-height:1.75;color:#334155;">
          <strong>Do Not Sell My Personal Information:</strong> TopLinkers does not sell, barter, or transfer personal records to third parties. To exercise any data subject rights, contact toplinkers69@gmail.com.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Data Protection Protocols &amp; Security Standards</h2>
        <ul style="line-height:2;color:#334155;font-size:14px;padding-left:20px;">
          <li><strong>Document Storage Security:</strong> Property ownership documents, CNIC copies, and allotment letters submitted for CDA/RDA diligence are encrypted with 256-bit SSL protocols and restricted to authorized legal transfer officers.</li>
          <li><strong>Direct WhatsApp Communications:</strong> Inquiries initiated via our floating WhatsApp concierge or telephone lines connect directly to certified TopLinkers consultants.</li>
          <li><strong>Server-Side Administrative Access:</strong> The TopLinkers executive management portal is fortified with server-side HMAC session authentication and cryptographic cookies to prevent unauthorized data access.</li>
          <li><strong>Client Right of Erasure:</strong> Clients may request complete deletion of their inquiry records and contact details from our CRM database at any time by contacting privacy@toplinkersgroup.com.</li>
        </ul>
      </section>
    `
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer | TopLinkers Real Estate, Construction & Solar',
    description: 'Official legal disclaimer regarding property market rates, CDA transfer verifications, construction timelines, and solar yields with TopLinkers.',
    h1: 'Legal Disclaimer: TopLinkers Real Estate, Construction & Solar',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Regulatory &amp; Market Information Notice</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          The information, market analyses, property price estimates, and architectural renderings presented on toplinkersgroup.com are published for informational purposes. Real estate values in Islamabad and Rawalpindi are subject to economic conditions, regulatory changes by the Capital Development Authority (CDA) or Rawalpindi Development Authority (RDA), and infrastructure milestones.
        </p>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          While Top Linkers exercises meticulous due diligence in verifying property titles, layout approvals, and allotment authenticity, prospective purchasers are strongly advised to perform independent title searches and physically inspect properties prior to executing binding purchase contracts.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Official Property Title &amp; Allotment Verification Protocols</h2>
        <p style="font-size:14px;line-height:1.75;color:#334155;margin-bottom:12px;">
          All property listings on this website are subject to prior sale, lease, or price adjustments by the respective registered property owners without prior digital notice. TopLinkers verifies seller identification, CNIC authenticity, official society transfer letters, and registry records with housing authorities including CDA, RDA, and FGEHA.
        </p>
        <p style="font-size:14px;line-height:1.75;color:#334155;margin-bottom:12px;">
          Token payments (Biyana) should only be executed via verified crossed pay orders or bank drafts in the name of the legal title holder as recorded in official housing directorate records, accompanied by written tripartite sale agreements witnessed by licensed legal counsel.
        </p>
      </section>

      <section style="margin-bottom:28px;background:#fff;border-radius:10px;padding:24px;border:1px solid #E2E8F0;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Engineering &amp; Energy Projections</h2>
        <p style="font-size:14px;line-height:1.75;color:#334155;margin-bottom:12px;">
          Construction cost estimates per square foot represent market averages based on prevailing cement, steel, and labor rates in Islamabad and are finalized via formal project-specific engineering contracts bound by detailed Bills of Quantities (BOQ).
        </p>
        <p style="font-size:14px;line-height:1.75;color:#334155;">
          Solar energy production figures and financial payback periods are calculated based on Islamabad\'s average annual solar irradiance (5.2 peak sun hours/day) and standard IESCO net-metering regulations. Actual energy generation may vary depending on weather conditions, roof orientation, and shading.
        </p>
      </section>

      <section style="margin-bottom:24px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Legal Jurisdiction &amp; Dispute Resolution</h2>
        <p style="font-size:14px;line-height:1.75;color:#334155;">
          All business interactions, agency representations, and consulting contracts undertaken by TopLinkers are governed by the applicable laws of the Islamabad Capital Territory and the Islamic Republic of Pakistan. In case of legal queries, contact our legal transfer department at <a href="mailto:info@toplinkersgroup.com" style="color:#16B4E8;font-weight:700;">info@toplinkersgroup.com</a>.
        </p>
      </section>
    `
  },
  {
    path: '/compare',
    title: 'Compare Flats & Plots Islamabad | TopLinkers Tool',
    description: 'Compare verified CDA plots, PHA flats, and luxury suites side-by-side in Islamabad. Analyze price per sqft, amenities, location, and ROI with TopLinkers.',
    h1: 'Compare Verified Flats, Plots & Commercial Properties in Islamabad',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Side-by-Side Property Comparison &amp; Investment Due Diligence</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Use the TopLinkers Property Comparison Tool to evaluate multiple Islamabad and Rawalpindi real estate opportunities across key decision metrics: total demand price, price per square foot, bedroom/bathroom configurations, society development status, and projected rental yield.
        </p>
        <p style="font-size:14px;color:#475569;">
          Browse our <a href="/listings" style="color:#16B4E8;font-weight:700;">Verified Properties Directory</a> to select properties for side-by-side comparison.
        </p>
      </section>
    `
  },
  {
    path: '/favorites',
    title: 'Saved Properties | TopLinkers Client Portfolio',
    description: 'Review your saved plots, flats, and luxury suites in Islamabad. Contact TopLinkers directly to schedule property viewings or initiate title verification.',
    h1: 'Your Saved Properties & Shortlisted Portfolios',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Review and Inquire on Shortlisted Islamabad Real Estate</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Keep track of your favorite verified plots in TopCity-1, PECHS, PHA Sector I-12 and I-16 apartments, and luxury suites in Harsukh Nathia Gali. Contact our advisory desk with your shortlist to schedule site visits or verify allotment transfers.
        </p>
      </section>
    `
  },
  {
    path: '/create-listing',
    title: 'List Your Property | TopLinkers Islamabad Advisory',
    description: 'Sell or rent your property in Islamabad with TopLinkers. Connect with qualified buyers, verified CDA transfers, and institutional real estate marketing.',
    h1: 'List Your Property for Sale or Rent with TopLinkers Group',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Direct Access to Qualified Buyers &amp; Overseas Pakistani Investors</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Top Linkers provides property owners with institutional marketing, verified valuation appraisal, professional photo documentation, and direct buyer matchmaking across Islamabad, Rawalpindi, and overseas Pakistani diaspora networks.
        </p>
        <p style="font-size:14px;color:#475569;">
          Have questions before listing? Call our <a href="/contact" style="color:#16B4E8;font-weight:700;">Property Appraisal Desk</a> at +92-334-9522157.
        </p>
      </section>
    `
  },
  {
    path: '/search',
    title: 'Search Properties | Verified Plots & Flats Islamabad | TopLinkers',
    description: 'Search verified properties in Islamabad by price, sector, society, bedrooms and property type. TopLinkers brings you verified CDA/RDA listings.',
    h1: 'Search Verified Properties Across Islamabad & Rawalpindi',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Search Verified Real Estate Portfolios</h2>
        <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:16px;">
          Filter verified listings by location (TopCity-1, PECHS, Sector I-12, Sector I-16, Faisal Town, Nathia Gali), price range, and property category.
        </p>
        <p style="font-size:14px;color:#475569;">
          Explore the full catalog on our <a href="/listings" style="color:#16B4E8;font-weight:700;">Listings Directory</a>.
        </p>
      </section>
    `
  },
  {
    path: '/admin/login',
    title: 'Admin Portal Login | TopLinkers Executive Suite',
    description: 'Secure server-side administrative access to the TopLinkers Executive Management Suite in Islamabad. Authorized personnel and administrators only.',
    h1: 'TopLinkers Executive Suite: Portal Authentication',
    content: `
      <section style="margin-bottom:28px;">
        <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Authorized Executive Access</h2>
        <p style="font-size:14px;line-height:1.7;color:#334155;">
          This area is restricted to TopLinkers corporate personnel. Administrative sessions are authenticated via encrypted cryptographic tokens and server-side verification.
        </p>
      </section>
    `
  }
]

// 2. Load Blog Articles from posts.json
const blogFilePath = path.resolve(__dirname, '../src/data/posts.json')
let dynamicBlogRoutes = []
if (fs.existsSync(blogFilePath)) {
  try {
    const posts = JSON.parse(fs.readFileSync(blogFilePath, 'utf-8'))
    dynamicBlogRoutes = posts.map(post => ({
      path: `/blog/${post.slug}`,
      title: `${post.title.length > 55 ? post.title.substring(0, 55) + '...' : post.title} | TopLinkers`,
      description: post.summary?.length > 155 ? post.summary.substring(0, 152) + '...' : (post.summary || ''),
      h1: post.title,
      isArticle: true,
      articleData: post,
      ogImage: post.image || 'https://toplinkersgroup.com/toplinkers-logo.jpg',
      content: `
        <article style="margin-bottom:28px;">
          <div style="font-size:14px;color:#64748B;margin-bottom:16px;">
            Published on <strong>${post.date || '2026-11-17'}</strong> by <strong>${post.author || 'Syed Usman Hammad'}</strong> &bull; Category: <strong>${post.category || 'Market Intelligence'}</strong>
          </div>
          <p style="font-size:16px;line-height:1.75;color:#334155;margin-bottom:20px;font-weight:500;">
            ${post.summary || ''}
          </p>
          <div style="font-size:15px;line-height:1.8;color:#334155;margin-bottom:24px;">
            ${post.content || ''}
          </div>
          <section style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:22px;margin-top:28px;">
            <h3 style="font-size:17px;font-weight:800;color:#0F2A44;margin-bottom:8px;">Consult Our Senior Property Advisory Desk</h3>
            <p style="font-size:14px;color:#475569;margin-bottom:14px;line-height:1.6;">
              Top Linkers provides verified land title checks, CDA/RDA layout scrutiny, turnkey construction estimates, and Tier-1 solar net metering engineering across Islamabad and Rawalpindi.
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <a href="/contact" style="background:#0F2A44;color:#fff;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;">Schedule Advisory Session</a>
              <a href="/listings" style="background:#16B4E8;color:#0F2A44;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:800;text-decoration:none;">Browse Verified Properties</a>
            </div>
          </section>
        </article>
      `
    }))
    console.log(`  📚 Loaded ${dynamicBlogRoutes.length} blog articles for pre-rendering.`)
  } catch (e) {
    console.error('Failed to parse posts.json:', e.message)
  }
}

// 3. Load 66 Properties from properties.json
const propsFilePath = path.resolve(__dirname, '../src/data/properties.json')
let dynamicPropertyRoutes = []
let allProperties = []
if (fs.existsSync(propsFilePath)) {
  allProperties = JSON.parse(fs.readFileSync(propsFilePath, 'utf-8'))
  dynamicPropertyRoutes = allProperties.map((p, idx) => {
    const rawTitle = p.title || 'Verified Property Islamabad'
    const title = `${rawTitle.length > 55 ? rawTitle.substring(0, 55) + '...' : rawTitle} | TopLinkers`
    const rawDesc = p.shortDescription || p.description || `${rawTitle} in ${p.address || p.city || 'Islamabad'}. Verified CDA/RDA listing by TopLinkers.`
    const description = rawDesc.length > 155 ? rawDesc.substring(0, 152) + '...' : rawDesc
    const rawImg = p.images?.[0] || '/toplinkers-logo.jpg'
    const img = rawImg.startsWith('http') ? rawImg : `${BASE_URL}${rawImg.startsWith('/') ? '' : '/'}${rawImg}`

    // Cross-link 4 related properties to build strong internal crawl graph
    const related = allProperties
      .filter(other => other.id !== p.id && (other.type === p.type || other.city === p.city))
      .slice(0, 4)

    return {
      path: `/property/${p.slug}`,
      title,
      description,
      h1: rawTitle,
      isProperty: true,
      propertyData: p,
      ogImage: img,
      content: `
        <article style="margin-bottom:28px;">
          <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:20px;margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
              <span style="background:#16B4E8;color:#fff;font-size:12px;font-weight:800;padding:4px 10px;border-radius:4px;text-transform:uppercase;">
                ${p.status === 'for-rent' ? 'For Rent' : 'For Sale'} &bull; ${p.type}
              </span>
              <span style="font-size:24px;font-weight:900;color:#0F2A44;">
                PKR ${p.price?.toLocaleString()}
              </span>
            </div>
            <p style="font-size:14px;color:#64748B;margin:0 0 10px 0;">
              <strong>Location:</strong> ${p.address || p.city || 'Islamabad'} | <strong>Demand Rate:</strong> ${p.pricePerSqft || 'Verified'}
            </p>
            <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:13px;color:#334155;border-top:1px solid #E2E8F0;padding-top:10px;">
              ${p.beds ? `<span><strong>Bedrooms:</strong> ${p.beds}</span>` : ''}
              ${p.baths ? `<span><strong>Bathrooms:</strong> ${p.baths}</span>` : ''}
              ${p.area ? `<span><strong>Area:</strong> ${p.area}</span>` : ''}
              <span><strong>Verification:</strong> CDA/RDA Diligence Complete</span>
            </div>
          </div>

          <h2 style="font-size:20px;font-weight:800;color:#0F2A44;margin-bottom:12px;">Property Description &amp; Investor Highlights</h2>
          <p style="font-size:15px;line-height:1.8;color:#334155;margin-bottom:24px;">
            ${p.description || p.shortDescription || 'Prime verified real estate opportunity in Islamabad. Complete legal documentation and possession readiness verified by TopLinkers.'}
          </p>

          <section style="background:#fff;border-radius:10px;padding:20px;border:1px solid #E2E8F0;margin-bottom:28px;">
            <h3 style="font-size:16px;font-weight:700;color:#0F2A44;margin-bottom:8px;">Schedule an Inspection or Verification Briefing</h3>
            <p style="font-size:14px;color:#64748B;margin-bottom:14px;">Contact TopLinkers Head Office in G-11 Markaz to review original allotment papers, conduct physical boundary demarcation, and initiate secure transfer.</p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <a href="/contact" style="background:#0F2A44;color:#fff;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:700;text-decoration:none;">Book Official Inspection</a>
              <a href="/listings" style="background:#F1F5F9;color:#0F2A44;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:700;text-decoration:none;">&larr; Return to All Properties</a>
            </div>
          </section>

          <!-- Cross-Linked Related Properties (Strong Internal Link Discovery) -->
          <section style="margin-top:32px;border-top:1px solid #E2E8F0;padding-top:24px;">
            <h2 style="font-size:18px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Related Verified Properties in Islamabad</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:14px;">
              ${related.map(rel => `
                <div style="border:1px solid #E2E8F0;border-radius:8px;padding:12px;background:#fff;">
                  <a href="/property/${rel.slug}" style="font-size:14px;font-weight:700;color:#0F2A44;text-decoration:none;display:block;margin-bottom:6px;">
                    ${rel.title}
                  </a>
                  <p style="font-size:12px;color:#64748B;margin:0 0 4px 0;">${rel.address || rel.city}</p>
                  <p style="font-size:13px;font-weight:800;color:#16B4E8;margin:0;">PKR ${rel.price?.toLocaleString()}</p>
                </div>
              `).join('')}
            </div>
          </section>
        </article>
      `
    }
  })
  console.log(`  🏡 Loaded ${dynamicPropertyRoutes.length} properties for pre-rendering.`)
}

// 4. Populate Listings Page with Complete Crawlable Directory of All 66 Properties
const listingsRoute = staticRoutes.find(r => r.path === '/listings')
if (listingsRoute && allProperties.length > 0) {
  listingsRoute.content = `
    <section style="margin-bottom:28px;">
      <h2 style="font-size:22px;font-weight:800;color:#0F2A44;margin-bottom:14px;">Complete Directory of Verified Properties in Islamabad &amp; Rawalpindi</h2>
      <p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:20px;">
        Every listing in TopLinkers\' portfolio has undergone preliminary ownership, layout, and registry verification with the Capital Development Authority (CDA), Rawalpindi Development Authority (RDA), or Federal Government Employees Housing Authority (FGEHA). Explore our full on-ground plot inventories, government flats, and luxury vacation residences below:
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:16px;">
        ${allProperties.map(p => `
          <div style="border:1px solid #E2E8F0;border-radius:10px;padding:18px;background:#fff;display:flex;flex-col;justify-content:space-between;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span style="font-size:11px;font-weight:800;background:#E0F2FE;color:#0369A1;padding:2px 8px;border-radius:4px;text-transform:uppercase;">
                  ${p.type} &bull; ${p.status === 'for-rent' ? 'For Rent' : 'For Sale'}
                </span>
                <span style="font-size:16px;font-weight:900;color:#0F2A44;">
                  PKR ${p.price?.toLocaleString()}
                </span>
              </div>
              <h3 style="font-size:16px;font-weight:700;color:#0F2A44;margin-bottom:6px;line-height:1.35;">
                <a href="/property/${p.slug}" style="color:#0F2A44;text-decoration:none;">
                  ${p.title}
                </a>
              </h3>
              <p style="font-size:12px;color:#64748B;margin-bottom:8px;">
                📍 ${p.address || p.city || 'Islamabad'} ${p.pricePerSqft ? `&bull; ${p.pricePerSqft}` : ''}
              </p>
              <p style="font-size:13px;color:#334155;line-height:1.5;margin-bottom:12px;">
                ${p.description ? (p.description.length > 120 ? p.description.substring(0, 117) + '...' : p.description) : ''}
              </p>
            </div>
            <div style="border-top:1px solid #F1F5F9;padding-top:10px;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:12px;color:#64748B;">Verified Title</span>
              <a href="/property/${p.slug}" style="color:#16B4E8;font-weight:700;font-size:13px;text-decoration:none;">
                View Details &rarr;
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `
}

const disallowedPaths = new Set(['/404', '/compare', '/create-listing', '/favorites', '/search'])
const allRoutes = [...staticRoutes, ...dynamicBlogRoutes, ...dynamicPropertyRoutes]

export function prerender() {
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Build template not found at ${templatePath}. Run 'npm run build' first.`)
    return
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf-8')
  console.log(`🚀 Starting static pre-rendering for ${allRoutes.length} canonical routes...`)

  for (const r of allRoutes) {
    let html = baseTemplate

    // 1. Replace <title>
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${r.title}</title>`)

    // 2. Replace <meta name="description">
    html = html.replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${r.description}"`)

    // 3. Replace Canonical Link (Canonical normalization: /search points to /listings)
    const canonicalPath = r.path === '/search' ? '/listings' : (r.path === '/' ? '/' : r.path)
    const fullCanonical = `${BASE_URL}${canonicalPath}`
    html = html.replace(/<link rel="canonical" href="[^"]*"/i, `<link rel="canonical" href="${fullCanonical}"`)

    // 3B. Replace Robots Meta Directive (Explicit noindex for utility / client-side routes)
    const isNoIndex = disallowedPaths.has(r.path) || r.path.startsWith('/admin') || r.noindex === true
    if (isNoIndex) {
      html = html.replace(
        /<meta name="robots" content="[^"]*"/i,
        '<meta name="robots" content="noindex, follow" />'
      )
    } else {
      html = html.replace(
        /<meta name="robots" content="[^"]*"/i,
        '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />'
      )
    }

    // 4. Replace OpenGraph & Twitter tags
    html = html.replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${r.title}"`)
    html = html.replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${r.description}"`)
    html = html.replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="${fullCanonical}"`)
    if (r.ogImage) {
      html = html.replace(/<meta property="og:image" content="[^"]*"/i, `<meta property="og:image" content="${r.ogImage}"`)
      html = html.replace(/<meta name="twitter:image" content="[^"]*"/i, `<meta name="twitter:image" content="${r.ogImage}"`)
    }
    html = html.replace(/<meta name="twitter:title" content="[^"]*"/i, `<meta name="twitter:title" content="${r.title}"`)
    html = html.replace(/<meta name="twitter:description" content="[^"]*"/i, `<meta name="twitter:description" content="${r.description}"`)

    // 5. Infiltrate structured Schema.org JSON-LD for Blog & Property
    if (r.isArticle && r.articleData) {
      const articleJsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": ${JSON.stringify(r.articleData.title)},
      "description": ${JSON.stringify(r.description)},
      "image": ${JSON.stringify(r.articleData.image ? `${BASE_URL}${r.articleData.image}` : 'https://toplinkersgroup.com/toplinkers-logo.jpg')},
      "datePublished": ${JSON.stringify(r.articleData.date || '2026-11-17')},
      "author": {
        "@type": "Person",
        "name": ${JSON.stringify(r.articleData.author || 'Syed Usman Hammad')}
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

    if (r.isProperty && r.propertyData) {
      const p = r.propertyData
      const propType = p.type === 'apartment' ? 'Apartment' : (p.type === 'house' || p.type === 'villa') ? 'SingleFamilyResidence' : 'RealEstateListing'
      const propJsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${propType}",
      "name": ${JSON.stringify(p.title)},
      "description": ${JSON.stringify(r.description)},
      "url": "${fullCanonical}",
      "image": ${JSON.stringify(p.images?.[0] || 'https://toplinkersgroup.com/toplinkers-logo.jpg')},
      "offers": {
        "@type": "Offer",
        "price": ${p.price || 0},
        "priceCurrency": "PKR",
        "availability": "https://schema.org/InStock"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": ${JSON.stringify(p.address || 'G-11 Markaz')},
        "addressLocality": ${JSON.stringify(p.city || 'Islamabad')},
        "addressRegion": "Federal Capital",
        "addressCountry": "PK"
      }
    }
    </script>`
      html = html.replace('</head>', `${propJsonLd}\n  </head>`)
    }

    // BreadcrumbList JSON-LD for rich snippets on search results
    if (r.path !== '/') {
      const breadcrumbItems = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${BASE_URL}/`
        }
      ]

      if (r.isProperty && r.propertyData) {
        breadcrumbItems.push(
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Listings",
            "item": `${BASE_URL}/listings`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": r.propertyData.title,
            "item": fullCanonical
          }
        )
      } else if (r.isArticle && r.articleData) {
        breadcrumbItems.push(
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${BASE_URL}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": r.articleData.title,
            "item": fullCanonical
          }
        )
      } else if (r.path.startsWith('/services/')) {
        breadcrumbItems.push(
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": `${BASE_URL}/services`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": r.title.split('|')[0].trim(),
            "item": fullCanonical
          }
        )
      } else {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": r.title.split('|')[0].trim(),
          "item": fullCanonical
        })
      }

      const breadcrumbJsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": ${JSON.stringify(breadcrumbItems, null, 2)}
    }
    </script>`
      html = html.replace('</head>', `${breadcrumbJsonLd}\n  </head>`)
    }

    // 6. Crawlable Semantic Content injected directly inside <div id="app">
    // Gives search engine crawlers, bots, and speed auditors an immediate, full-page semantic DOM
    // with genuine <h1>, content sections, and internal links.
    // For the homepage, we include the authentic visual header and hero slide skeleton so that
    // the preloaded LCP picture element is present in the initial server HTML, giving sub-second LCP.
    let crawlableHtml
    if (r.path === '/') {
      crawlableHtml = `
    <div id="app">
      <div class="min-h-screen flex flex-col bg-[#F6F8FA] text-gray-800 font-sans w-full overflow-x-hidden">
        <header class="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md text-[#0F2A44] shadow-sm py-3.5 border-b border-gray-100/60 select-none">
          <div class="max-w-[1280px] mx-auto px-3 sm:px-4 flex items-center justify-between gap-2">
            <a href="/" class="flex items-center gap-2 sm:gap-3 focus:outline-none group min-w-0">
              <img src="/toplinkers-logo-mark.webp" alt="Top Linkers" width="367" height="488" loading="eager" fetchpriority="high" decoding="async" class="h-10 sm:h-12 md:h-14 w-auto object-contain flex-shrink-0" />
              <div class="flex flex-col min-w-0">
                <span class="text-base sm:text-xl font-black leading-tight tracking-tight truncate">
                  <span class="text-[#E53935]">Top</span> <span class="text-black">Linkers</span>
                </span>
                <span class="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-gray-500 leading-none mt-0.5 truncate">
                  Real Estate &bull; Construction &bull; Solar
                </span>
              </div>
            </a>
            <nav class="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
              <a href="/" class="text-sm font-bold text-[#16B4E8]">Home</a>
              <a href="/about" class="text-sm font-bold text-[#0F2A44] hover:text-[#16B4E8]">About</a>
              <a href="/services" class="text-sm font-bold text-[#0F2A44] hover:text-[#16B4E8]">Services</a>
              <a href="/listings" class="text-sm font-bold text-[#0F2A44] hover:text-[#16B4E8]">Properties</a>
              <a href="/team" class="text-sm font-bold text-[#0F2A44] hover:text-[#16B4E8]">Our Team</a>
              <a href="/blog" class="text-sm font-bold text-[#0F2A44] hover:text-[#16B4E8]">Blog</a>
              <a href="/contact" class="text-sm font-bold text-[#0F2A44] hover:text-[#16B4E8]">Contact</a>
            </nav>
            <div class="flex items-center gap-2.5">
              <a href="https://wa.me/923349522157" target="_blank" rel="noopener" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm">
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </header>

        <main class="flex-1 min-h-screen">
          <div class="home-page pt-[66px] sm:pt-[80px]">
            <h1 class="sr-only">${r.h1}</h1>
            <div class="top-offer-fully-sliding-strip bg-gradient-to-r from-[#071320] via-[#0E253D] to-[#071320] text-white border-b border-[#16B4E8]/25 relative z-30 shadow-md select-none group">
              <div class="w-full flex items-center py-2 sm:py-2.5">
                <div class="flex-shrink-0 flex items-center pl-3.5 sm:pl-6 pr-2 sm:pr-3 z-20">
                  <div class="inline-flex items-center gap-1.5 text-amber-400 font-black text-[10px] sm:text-xs uppercase tracking-wider">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span class="whitespace-nowrap">PROMOTIONS</span>
                    <span class="text-white/25 font-light ml-1 hidden sm:inline">|</span>
                  </div>
                </div>
                <div class="flex-1 overflow-hidden relative mask-fade-marquee h-7 sm:h-8 flex items-center">
                  <div class="marquee-track flex items-center">
                    <div class="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 flex-shrink-0">
                      <span class="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">TOPCITY-1</span>
                      <span class="text-xs font-bold text-white">Moqa Plot Possession Special</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="hero-swiper-container relative w-full h-[600px] sm:h-[660px] md:h-[740px] bg-gray-950 overflow-hidden select-none group">
              <div class="hero-slide hero-static absolute inset-0 z-[2] w-full h-full">
                <div class="absolute inset-0 w-full h-full overflow-hidden">
                  <picture class="block w-full h-full">
                    <source media="(max-width: 639px)" type="image/webp" srcset="/images/hero-moqa-plot-m.webp" width="768" height="512" />
                    <source media="(max-width: 639px)" type="image/avif" srcset="/images/hero-moqa-plot-m.avif" width="768" height="512" />
                    <source type="image/avif" srcset="/images/hero-moqa-plot.avif" width="1440" height="960" />
                    <img
                      src="/images/hero-moqa-plot-m.webp"
                      srcset="/images/hero-moqa-plot-m.webp 768w, /images/hero-moqa-plot.webp 1440w"
                      sizes="(max-width: 639px) 100vw, 1440px"
                      alt="Prime Moqa Ka Plot in TopCity-1 (Block B) - TopLinkers Islamabad"
                      loading="eager"
                      fetchpriority="high"
                      decoding="async"
                      width="768"
                      height="512"
                      class="slide-bg-image w-full h-full object-cover object-center"
                    />
                  </picture>
                  <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent sm:w-4/5 md:w-3/5 pointer-events-none"></div>
                  <div class="absolute inset-0 bg-black/45 sm:hidden pointer-events-none"></div>
                  <div class="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>
                </div>
                <div class="relative max-w-[1280px] mx-auto h-full px-4 sm:px-6 md:px-8 flex flex-col justify-center pb-32 sm:pb-40 md:pb-48 z-10 pointer-events-none">
                  <div class="max-w-xl text-left select-none pointer-events-auto">
                    <div class="slide-specs mb-2 sm:mb-3 flex flex-wrap items-center gap-2">
                      <span class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-white/95 uppercase drop-shadow">
                        <span class="w-2 h-2 rounded-full bg-[#16B4E8]"></span>
                        <span>10 Marla • Immediate Physical Possession • RDA Approved</span>
                      </span>
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#16B4E8] text-[#0F2A44] shadow-md">
                        Cash Moqa Ready
                      </span>
                    </div>
                    <h2 class="slide-title text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight text-white leading-[1.12] mb-2 sm:mb-3 drop-shadow-md">
                      Prime Moqa Ka Plot in TopCity-1 (Block B)
                    </h2>
                    <p class="slide-desc text-xs sm:text-sm md:text-base text-gray-200/90 font-normal leading-relaxed line-clamp-2 max-w-lg mb-4 sm:mb-5 drop-shadow">
                      Direct on-ground demarcated plot adjoining New Islamabad Airport gate &amp; Srinagar Highway. Immediate physical possession with swift registry transfer.
                    </p>
                    <div class="slide-price-cta flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                      <a href="/property/corner-plot-topcity" class="btn-arrow-slide px-6 sm:px-8 py-3 sm:py-3.5 bg-[#16B4E8] text-[#0F2A44] text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center">
                        <span>Explore Plot</span>
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="prerendered-content" style="max-width:1200px;margin:32px auto;padding:0 20px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
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
              <footer style="background:#081322;color:#94A3B8;padding:24px;text-align:center;font-size:13px;margin-top:48px;">
                <p>&copy; 2026 Top Linkers Real Estate, Construction &amp; Solar. Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan.</p>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>`
    } else {
      crawlableHtml = `
    <div id="app">
      <div class="prerendered-content" style="max-width:1200px;margin:32px auto;padding:0 20px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <h1 style="font-size:28px;font-weight:900;color:#0F2A44;margin-bottom:16px;line-height:1.25;">
          ${r.h1}
        </h1>
        <p style="font-size:15px;line-height:1.6;color:#334155;margin-bottom:24px;">
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
        <footer style="background:#081322;color:#94A3B8;padding:24px;text-align:center;font-size:13px;margin-top:48px;">
          <p>&copy; 2026 Top Linkers Real Estate, Construction &amp; Solar. Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan.</p>
        </footer>
      </div>
    </div>`
    }

    html = html.replace('<div id="app"></div>', crawlableHtml)

    // Write file to target destinations:
    // 1. root index.html (for '/')
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

  // Also pre-render custom 404 page into dist/404.html
  const public404 = path.resolve(__dirname, '../public/404.html')
  const dist404 = path.resolve(distDir, '404.html')
  if (fs.existsSync(public404)) {
    fs.copyFileSync(public404, dist404)
    console.log(`  📄 Verified and copied dist/404.html for Apache ErrorDocument.`)
  }

  // Provide dedicated executive admin SPA shells to eliminate homepage FOUC and layout clash on /admin
  const adminDir = path.resolve(distDir, 'admin')
  fs.mkdirSync(adminDir, { recursive: true })
  fs.writeFileSync(path.join(adminDir, 'index.html'), adminShellHtml, 'utf-8')
  fs.writeFileSync(path.resolve(distDir, 'admin.html'), adminShellHtml, 'utf-8')
  fs.writeFileSync(path.resolve(distDir, 'admin-shell.html'), adminShellHtml, 'utf-8')

  const adminDashboardDir = path.resolve(adminDir, 'dashboard')
  fs.mkdirSync(adminDashboardDir, { recursive: true })
  fs.writeFileSync(path.join(adminDashboardDir, 'index.html'), adminShellHtml, 'utf-8')
  fs.writeFileSync(path.resolve(adminDir, 'dashboard.html'), adminShellHtml, 'utf-8')

  const adminLoginDir = path.resolve(adminDir, 'login')
  fs.mkdirSync(adminLoginDir, { recursive: true })
  fs.writeFileSync(path.join(adminLoginDir, 'index.html'), adminShellHtml, 'utf-8')
  fs.writeFileSync(path.resolve(adminDir, 'login.html'), adminShellHtml, 'utf-8')
  console.log(`  🛡️ Configured dedicated executive admin shells for /admin, /admin/login, and /admin/dashboard.`)

  // Ensure public/api files and database are mirrored into dist/api
  const publicApiDir = path.resolve(__dirname, '../public/api')
  const distApiDir = path.resolve(distDir, 'api')
  if (fs.existsSync(publicApiDir)) {
    fs.cpSync(publicApiDir, distApiDir, { recursive: true })
    console.log(`  💾 Synchronized SQLite API Engine and database into dist/api.`)
  }

  // Synchronize sitemap.xml with canonical URLs (excluding admin, 404, and disallowed utility tools)
  const todayIso = new Date().toISOString().split('T')[0]
  const canonicalRoutes = allRoutes.filter(r => !r.path.startsWith('/admin') && !disallowedPaths.has(r.path))
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${canonicalRoutes.map(r => {
  const loc = `${BASE_URL}${r.path === '/' ? '/' : r.path}`
  const priority = r.path === '/' ? '1.0' :
    (r.path === '/hr-sukh' || r.path === '/listings' || r.path === '/services') ? '0.90' :
    (r.path === '/team' || r.path === '/about' || r.path === '/contact' || r.path === '/blog') ? '0.85' :
    (r.path.startsWith('/services/') || r.isArticle || r.isProperty) ? '0.80' : '0.70'
  const freq = (r.path === '/' || r.path === '/listings') ? 'daily' :
    (r.isProperty || r.isArticle || r.path === '/hr-sukh') ? 'weekly' : 'monthly'
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${todayIso}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}).join('\n')}
</urlset>
`
  const publicSitemap = path.resolve(__dirname, '../public/sitemap.xml')
  const distSitemap = path.resolve(distDir, 'sitemap.xml')
  fs.writeFileSync(publicSitemap, sitemapXml, 'utf-8')
  fs.writeFileSync(distSitemap, sitemapXml, 'utf-8')
  console.log(`  📄 Synchronized sitemap.xml with ${canonicalRoutes.length} canonical indexable URLs.`)

  // Ensure ads.txt, app-ads.txt, robots.txt and .htaccess are in dist
  const rootFilesToSync = ['ads.txt', 'app-ads.txt', 'robots.txt', '.htaccess']
  rootFilesToSync.forEach(file => {
    const src = path.resolve(__dirname, `../public/${file}`)
    const dst = path.resolve(distDir, file)
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dst)
    }
  })
  console.log(`  🛡️ Synchronized ads.txt, app-ads.txt, robots.txt, and .htaccess into dist.`)

  console.log(`🎉 Pre-rendering completed successfully for all ${allRoutes.length} routes!`)
}

prerender()
