<template>
  <div class="privacy-policy-page pt-28 sm:pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
    <!-- Breadcrumb -->
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 mb-6">
      <nav class="flex items-center text-xs text-gray-500 gap-2" aria-label="Breadcrumb">
        <router-link to="/" class="hover:text-[#16B4E8] transition-colors">Home</router-link>
        <span>/</span>
        <span class="text-gray-400">Legal</span>
        <span>/</span>
        <span class="text-[#0F2A44] font-bold">Privacy Policy</span>
      </nav>
    </div>

    <!-- Page Header Banner -->
    <header class="bg-[#0F2A44] text-white py-12 sm:py-16 mb-10 sm:mb-14 relative overflow-hidden">
      <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#16B4E8]/10 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#E53935]/10 blur-3xl pointer-events-none"></div>

      <div class="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#16B4E8] text-xs font-black uppercase tracking-wider mb-4 border border-white/15">
            <span class="w-1.5 h-1.5 rounded-full bg-[#16B4E8] animate-pulse"></span>
            <span>Legal &amp; Information &bull; Privacy Standards</span>
          </div>

          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Privacy Policy
          </h1>

          <p class="text-xs sm:text-sm text-gray-300 mt-4 leading-relaxed font-normal">
            Learn how TopLinkers Real Estate, Turnkey Construction &amp; Solar collects, utilizes, safeguards, and respects your personal data, browser cookies, analytics, and advertising choices across our digital platforms.
          </p>

          <div class="flex items-center gap-4 mt-6 text-xs text-slate-300">
            <span class="inline-flex items-center gap-1.5">
              <span class="text-gray-400">Effective Date:</span>
              <strong class="text-white">November 2026</strong>
            </span>
            <span>&bull;</span>
            <span class="inline-flex items-center gap-1.5">
              <span class="text-gray-400">Jurisdiction:</span>
              <strong class="text-white">Islamabad, Pakistan</strong>
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Container with Sticky Table of Contents -->
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        <!-- Left: Sticky Quick Navigation (Desktop 4 cols) -->
        <aside class="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
          <div class="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm">
            <h2 class="text-xs font-black uppercase tracking-wider text-[#0F2A44] mb-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#16B4E8]"></span>
              <span>Table of Contents</span>
            </h2>
            <nav class="space-y-1.5 text-xs">
              <a
                v-for="section in sections"
                :key="section.id"
                :href="`#${section.id}`"
                class="block py-1.5 px-2.5 rounded-lg text-gray-600 hover:text-[#0F2A44] hover:bg-gray-50 font-medium transition-colors"
              >
                {{ section.title }}
              </a>
            </nav>
          </div>

          <!-- Quick Contact Box -->
          <div class="bg-gradient-to-br from-[#0F2A44] to-[#143452] text-white p-5 rounded-2xl shadow-sm border border-white/10 space-y-3">
            <span class="text-[10px] font-black uppercase tracking-wider text-[#16B4E8]">Privacy Questions?</span>
            <h3 class="text-sm font-bold">Contact Our Compliance Desk</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              If you have inquiries regarding your personal data or cookie preferences, reach out to our team in Islamabad.
            </p>
            <div class="pt-1 text-xs space-y-1.5">
              <div class="text-[#16B4E8] font-bold">toplinkers12@gmail.com</div>
              <div class="text-white">0334-9522157 / 0332-4004884</div>
            </div>
          </div>
        </aside>

        <!-- Right: Legal Policy Articles (8 cols) -->
        <main class="lg:col-span-8 space-y-8 text-gray-700 text-xs sm:text-sm leading-relaxed">
          <!-- 1. Introduction -->
          <section id="introduction" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 01</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              1. Introduction &amp; Corporate Identity
            </h2>
            <p>
              This Privacy Policy applies to the digital platforms, web applications, listings, and customer relationship portals operated by <strong>TopLinkers</strong> (referred to herein as "TopLinkers", "we", "us", or "our"), having our registered corporate offices located at:
            </p>
            <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-200 font-medium text-xs text-gray-800">
              <strong>TopLinkers Head Office:</strong> 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan, Postal Code 4004884.
            </div>
            <p>
              TopLinkers provides verified real estate brokerage, turnkey villa and commercial building construction, and Tier-1 solar electrification services with IESCO net metering approvals across Islamabad, Rawalpindi, and the Galyat region. We are committed to transparency in our data processing practices and adhering to ethical standards of user privacy, digital advertising compliance, and data integrity.
            </p>
          </section>

          <!-- 2. Information We Collect -->
          <section id="information-collected" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 02</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              2. Information We Collect
            </h2>
            <p>
              When you interact with our website, we may collect information in two primary categories: information you provide voluntarily, and technical data collected automatically.
            </p>

            <h3 class="text-sm font-bold text-[#0F2A44] pt-2">A. Information Provided Voluntarily</h3>
            <ul class="list-disc list-inside space-y-1.5 pl-1 text-gray-600">
              <li><strong>Contact Particulars:</strong> Your full name, phone number, WhatsApp contact number, and email address submitted when filling out inquiry forms, requesting floor plans, or booking consultations.</li>
              <li><strong>Property &amp; Investment Criteria:</strong> Your intended purchase type (plots, PHA apartments, commercial plazas, turnkey construction, or Harsukh holiday suites), budget preferences, and preferred residential societies (such as PECHS, TopCity-1, Faisal Town Phase 2, or Sector I-12).</li>
              <li><strong>Communication Records:</strong> Messages, feedback, notes, and inquiries exchanged with our sales agents or civil engineers via WhatsApp Web click-to-chat, phone calls, or on-site visits.</li>
            </ul>

            <h3 class="text-sm font-bold text-[#0F2A44] pt-2">B. Technical &amp; Log Information Collected Automatically</h3>
            <ul class="list-disc list-inside space-y-1.5 pl-1 text-gray-600">
              <li><strong>Log Files:</strong> Internet Protocol (IP) addresses, browser type, operating system, internet service provider (ISP), date and time stamps, referring and exit pages, and click paths.</li>
              <li><strong>Device &amp; Usage Metrics:</strong> Device model, screen resolution, viewport dimensions, network latency, and interaction telemetry used strictly to optimize performance, eliminate layout shifts, and enhance navigation speed.</li>
            </ul>
          </section>

          <!-- 3. Cookies & Advertising Technologies -->
          <section id="cookies-advertising" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 03</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              3. Cookies, Web Beacons &amp; Advertising Technologies
            </h2>
            <p>
              Like most professional websites, TopLinkers utilizes "cookies" (small text files stored on your device) and similar tracking technologies to improve page responsiveness, retain user preferences (such as saved property comparisons or favorites), and analyze aggregate visitor trends.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                <strong class="text-xs text-[#0F2A44] block mb-1">Essential / Functional Cookies</strong>
                <span class="text-xs text-gray-600">Required for fundamental features including property comparisons, active search filters, authentication sessions, and modal interactions.</span>
              </div>
              <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                <strong class="text-xs text-[#0F2A44] block mb-1">Analytical &amp; Performance Cookies</strong>
                <span class="text-xs text-gray-600">Allow us to measure page load speeds, Core Web Vitals, visitor journeys, and identify navigational bottlenecks to improve responsiveness.</span>
              </div>
            </div>
            <p class="pt-1">
              You can choose to disable or selectively turn off our cookies or third-party cookies in your browser settings. However, doing so may affect how you are able to interact with features on our site, such as maintaining saved listings or submitting interactive inquiries.
            </p>
          </section>

          <!-- 4. Third-Party Integrations -->
          <section id="third-party-services" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 04</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              4. Third-Party Services &amp; Integrations
            </h2>
            <p>
              To offer a complete user experience, our website integrates specific third-party tools that operate under their respective privacy policies:
            </p>
            <ul class="list-disc list-inside space-y-2 pl-1 text-gray-600">
              <li><strong>Google Maps Embed:</strong> Provides interactive location mapping for our corporate headquarters at Al Hameed Plaza, G-11 Markaz Islamabad. Google may collect IP and geographical metrics in accordance with the Google Privacy Policy.</li>
              <li><strong>WhatsApp Click-to-Chat:</strong> Allows users to initiate immediate real-time property consultations. Interactions take place on WhatsApp servers and are governed by WhatsApp's privacy and encryption standards.</li>
              <li><strong>Social Media Links:</strong> Outbound links to TopLinkers profiles on Facebook, X (Twitter), and Instagram operate independently once you navigate away from our domain.</li>
            </ul>
          </section>

          <!-- 5. How We Use Collected Data -->
          <section id="data-usage" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 05</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              5. How We Use Your Information
            </h2>
            <p>
              TopLinkers uses the data collected strictly for legitimate business and client advisory operations:
            </p>
            <ul class="list-disc list-inside space-y-1.5 pl-1 text-gray-600">
              <li>To answer property inquiries, schedule on-ground plot visits, and share payment plans.</li>
              <li>To provide civil engineering cost estimates for grey structure and turnkey villa construction.</li>
              <li>To verify solar net metering feasibility (IESCO sanction load, roof dimensions, bill savings).</li>
              <li>To maintain website reliability, audit server performance, and prevent fraudulent lead spam.</li>
              <li><strong>No Data Brokering:</strong> We never sell, rent, or trade your personal information, phone numbers, or email addresses to marketing agencies or third-party telemarketers.</li>
            </ul>
          </section>

          <!-- 6. Data Security -->
          <section id="data-security" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 06</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              6. Data Protection &amp; Security Standards
            </h2>
            <p>
              We implement comprehensive technical, operational, and administrative measures to safeguard the security and integrity of your data:
            </p>
            <ul class="list-disc list-inside space-y-1.5 pl-1 text-gray-600">
              <li><strong>SSL / TLS Encryption:</strong> All client-to-server traffic is transmitted over secure 256-bit HTTPS protocols.</li>
              <li><strong>Access Control:</strong> Administrative access to inquiry leads and rates is restricted through authenticated role-based permissions and secure hashing.</li>
              <li><strong>Performance Optimization:</strong> Our servers utilize automated database indexing and client caching to ensure high performance without compromising data confidentiality.</li>
            </ul>
          </section>

          <!-- 7. User Rights -->
          <section id="user-rights" class="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4 scroll-mt-28">
            <div class="flex items-center gap-2 text-[#16B4E8] text-xs font-black uppercase tracking-wider">
              <span>Section 07</span>
            </div>
            <h2 class="text-lg sm:text-xl font-extrabold text-[#0F2A44]">
              7. Your Privacy Rights &amp; Data Control
            </h2>
            <p>
              As a visitor or client, you maintain the following rights regarding personal data provided to TopLinkers:
            </p>
            <ul class="list-disc list-inside space-y-1.5 pl-1 text-gray-600">
              <li><strong>Access &amp; Inquiries:</strong> You may request confirmation of whether TopLinkers holds any personal contact records submitted by you.</li>
              <li><strong>Correction &amp; Updates:</strong> You may request corrections to any outdated contact details or inquiry requests.</li>
              <li><strong>Deletion / Opt-Out:</strong> You may request that your phone number or email be expunged from our direct communication lists at any time by contacting our office.</li>
            </ul>
          </section>

          <!-- 8. Contact Section -->
          <section id="contact-compliance" class="bg-gradient-to-r from-[#0F2A44] via-[#143452] to-[#0F2A44] text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4 scroll-mt-28">
            <h2 class="text-lg sm:text-xl font-extrabold text-white">
              8. Privacy Questions &amp; Legal Compliance Contact
            </h2>
            <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, cookie management, or data protection practices, please contact TopLinkers directly:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div class="bg-white/10 p-4 rounded-xl border border-white/15">
                <span class="text-slate-400 block text-[10px] uppercase tracking-wider">Electronic Inquiries</span>
                <strong class="text-white text-sm block mt-0.5">toplinkers12@gmail.com</strong>
                <span class="text-[#16B4E8] text-[11px] block mt-1">General Legal &amp; Compliance Desk</span>
              </div>
              <div class="bg-white/10 p-4 rounded-xl border border-white/15">
                <span class="text-slate-400 block text-[10px] uppercase tracking-wider">Phone &amp; WhatsApp</span>
                <strong class="text-white text-sm block mt-0.5">0334-9522157 &bull; 0332-4004884</strong>
                <span class="text-green-400 text-[11px] block mt-1">Available Mon–Sat, 9:00 AM – 7:00 PM PKT</span>
              </div>
            </div>

            <p class="text-[11px] text-gray-400 pt-2 border-t border-white/15">
              <strong>Office Location:</strong> TopLinkers, 2nd Floor, 7th Office, Al Hameed Plaza, G-11 Markaz, Islamabad, Pakistan, 4004884.
            </p>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const sections = [
  { id: 'introduction', title: '1. Introduction & Identity' },
  { id: 'information-collected', title: '2. Information We Collect' },
  { id: 'cookies-advertising', title: '3. Cookies & Tracking Tech' },
  { id: 'third-party-services', title: '4. Third-Party Integrations' },
  { id: 'data-usage', title: '5. How We Use Data' },
  { id: 'data-security', title: '6. Data Protection Standards' },
  { id: 'user-rights', title: '7. Your Privacy Rights' },
  { id: 'contact-compliance', title: '8. Legal Contact' }
]
</script>
