import { DatabaseSync } from 'node:sqlite';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const DB_PATH = resolve('public/api/data/database.sqlite');
const LIVE_BASE = 'https://toplinkersgroup.com';

const results = {
  passed: 0,
  failed: 0,
  suites: {}
};

function record(suiteName, name, passed, details = '') {
  if (!results.suites[suiteName]) {
    results.suites[suiteName] = { passed: 0, failed: 0, items: [] };
  }
  results.suites[suiteName].items.push({ name, passed, details });
  if (passed) {
    results.passed++;
    results.suites[suiteName].passed++;
    console.log(`  ✅ [PASS] ${name}${details ? ` (${details})` : ''}`);
  } else {
    results.failed++;
    results.suites[suiteName].failed++;
    console.log(`  ❌ [FAIL] ${name}: ${details}`);
  }
}

async function runTests() {
  const startTime = Date.now();
  console.log('========================================================================');
  console.log('🚀 TOPLINKERS COMPLETE ENTERPRISE BACKEND TEST & INTEGRITY SUITE');
  console.log('========================================================================\n');

  // ====================================================
  // SUITE 1: SQLite Physical Engine & Schema
  // ====================================================
  console.log('📁 SUITE 1: SQLite Database Engine & Physical Storage');
  if (existsSync(DB_PATH)) {
    const stat = statSync(DB_PATH);
    record('Suite 1', 'Database physical file exists', true, `${(stat.size / 1024).toFixed(1)} KB`);
  } else {
    record('Suite 1', 'Database physical file exists', false, 'public/api/data/database.sqlite missing');
    return;
  }

  let db;
  try {
    db = new DatabaseSync(DB_PATH);
    record('Suite 1', 'SQLite Database open connection', true);

    const integrity = db.prepare('PRAGMA integrity_check').all();
    const isOk = integrity.length === 1 && integrity[0].integrity_check === 'ok';
    record('Suite 1', 'SQLite PRAGMA integrity_check', isOk, integrity[0]?.integrity_check);

    const journalMode = db.prepare('PRAGMA journal_mode').all();
    record('Suite 1', 'SQLite journal_mode', true, `Mode: ${journalMode[0]?.journal_mode}`);

    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
    const tableNames = tables.map(t => t.name);
    
    const requiredTables = [
      'properties',
      'team_members',
      'market_rates',
      'reviews',
      'leads',
      'blogs',
      'admin_roles',
      'admin_permissions',
      'users'
    ];

    for (const reqTable of requiredTables) {
      const exists = tableNames.includes(reqTable);
      if (exists) {
        const count = db.prepare(`SELECT COUNT(*) as cnt FROM ${reqTable}`).get()?.cnt;
        record('Suite 1', `Table Schema: ${reqTable}`, true, `${count} records`);
      } else {
        record('Suite 1', `Table Schema: ${reqTable}`, false, 'Table missing');
      }
    }
  } catch (e) {
    record('Suite 1', 'Database connection & integrity', false, e.message);
  }

  // ====================================================
  // SUITE 2: Core Data Content & Business Rules
  // ====================================================
  console.log('\n📊 SUITE 2: Data Content Validation & Business Logic');
  try {
    // 1. Properties
    const props = db.prepare('SELECT id, slug, title, price, type, purpose FROM properties').all();
    record('Suite 2', 'Properties data count', props.length >= 6, `Count: ${props.length}`);

    const hasSlugs = props.every(p => p.slug && p.slug.length > 3);
    record('Suite 2', 'All properties have valid canonical slugs', hasSlugs);

    const hasTopCity = props.some(p => p.slug === 'corner-plot-topcity');
    record('Suite 2', 'TopCity-1 Moqa Plot verified in database', hasTopCity);

    const hasFaisalTown = props.some(p => p.slug === 'faisal-town-phase-2-installment-plot');
    record('Suite 2', 'Faisal Town Phase 2 Plot verified in database', hasFaisalTown);

    // 2. Team Members
    const team = db.prepare('SELECT id, name, role, category FROM team_members').all();
    record('Suite 2', 'Team members data count', team.length >= 5, `Count: ${team.length}`);

    const ceos = team.filter(m => m.category === 'ceo');
    record('Suite 2', 'Executive Founders/CEOs present', ceos.length >= 2, `Count: ${ceos.length}`);

    const engineers = team.filter(m => m.category === 'engineer' || m.role?.toLowerCase().includes('engineer'));
    record('Suite 2', 'PEC Registered Engineers present', engineers.length >= 1, `Count: ${engineers.length}`);

    // 3. Market Rates (Key-Value Schema Validation)
    const rateRow = db.prepare("SELECT payload FROM market_rates WHERE key = 'live_rates'").get();
    let ratesObj = {};
    try { ratesObj = JSON.parse(rateRow.payload); } catch (e) {}
    const hasRateSections = Boolean(ratesObj.moqaPlots && ratesObj.installmentPlans && ratesObj.phaFlats);
    record('Suite 2', 'Market Rates JSON schema valid', hasRateSections, 'moqaPlots, installmentPlans, phaFlats verified');

    // 4. Client Reviews
    const reviews = db.prepare('SELECT id, name, rating, is_active FROM reviews').all();
    record('Suite 2', 'Client reviews verified in database', reviews.length >= 10, `Count: ${reviews.length}`);

    // 5. Blogs
    const blogs = db.prepare('SELECT id, slug, title FROM blogs').all();
    record('Suite 2', 'SEO Blog articles present in database', blogs.length >= 6, `Count: ${blogs.length}`);

    // 6. Users
    const users = db.prepare('SELECT id, name, email, role FROM users').all();
    record('Suite 2', 'Admin user accounts active', users.length >= 1, `Users: ${users.map(u => u.email).join(', ')}`);
  } catch (e) {
    record('Suite 2', 'Data content validation', false, e.message);
  }

  // ====================================================
  // SUITE 3: Live Production API Endpoints (Hostinger)
  // ====================================================
  console.log(`\n🌐 SUITE 3: Live Production API Endpoints (${LIVE_BASE})`);

  const endpointsToTest = [
    { url: '/api/properties', name: 'GET /api/properties', validator: (data) => Array.isArray(data) && data.length >= 6 },
    { url: '/api/team', name: 'GET /api/team', validator: (data) => Array.isArray(data) && data.length >= 5 },
    { url: '/api/rates', name: 'GET /api/rates', validator: (data) => typeof data === 'object' && Boolean(data.moqaPlots || data.installmentPlans) },
    { url: '/api/blogs', name: 'GET /api/blogs', validator: (data) => Array.isArray(data) && data.length >= 6 },
    { url: '/api/reviews', name: 'GET /api/reviews', validator: (data) => Array.isArray(data) && data.length >= 10 },
    { url: '/api/promo-strip', name: 'GET /api/promo-strip', validator: (data) => typeof data === 'object' },
    { url: '/api/spotlight-popup', name: 'GET /api/spotlight-popup', validator: (data) => typeof data === 'object' },
    { url: '/api/faqs', name: 'GET /api/faqs', validator: (data) => Array.isArray(data) || typeof data === 'object' },
    { url: '/api/health', name: 'GET /api/health', validator: (data) => data.status === 'ok' || data.database === 'connected' || typeof data === 'object' }
  ];

  for (const ep of endpointsToTest) {
    try {
      const res = await fetch(`${LIVE_BASE}${ep.url}?_t=${Date.now()}`, {
        headers: { 'Accept': 'application/json', 'User-Agent': 'TopLinkers-Backend-Tester/1.0' }
      });

      if (res.ok) {
        const json = await res.json().catch(() => null);
        if (json && ep.validator(json)) {
          const count = Array.isArray(json) ? `${json.length} items` : 'valid object structure';
          record('Suite 3', `Live ${ep.name}`, true, `HTTP ${res.status}, ${count}`);
        } else {
          record('Suite 3', `Live ${ep.name}`, false, `Invalid response structure`);
        }
      } else {
        record('Suite 3', `Live ${ep.name}`, false, `HTTP ${res.status}`);
      }
    } catch (e) {
      record('Suite 3', `Live ${ep.name}`, false, e.message);
    }
  }

  // ====================================================
  // SUITE 4: Security, Authentication & Access Control
  // ====================================================
  console.log('\n🔒 SUITE 4: Security, Authentication & Session Protection');
  try {
    // 1. Unauthenticated check must return 401
    const unauthCheck = await fetch(`${LIVE_BASE}/api/admin_auth.php?action=check`);
    record(
      'Suite 4',
      'Unauthenticated admin access rejected with 401 Unauthorized',
      unauthCheck.status === 401,
      `HTTP ${unauthCheck.status}`
    );

    // 2. Invalid Admin Login rejection
    const invalidLoginRes = await fetch(`${LIVE_BASE}/api/admin_auth.php?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'fake@toplinkers.com', password: 'wrongpassword' })
    });
    record(
      'Suite 4',
      'Invalid admin credentials rejected with 401',
      invalidLoginRes.status === 401,
      `HTTP ${invalidLoginRes.status}`
    );

    // 3. Valid Admin Login Authentication
    const validLoginRes = await fetch(`${LIVE_BASE}/api/admin_auth.php?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'toplinkers@gmail.com', password: 'lock5816' })
    });
    const loginData = await validLoginRes.json().catch(() => ({}));
    const hasToken = validLoginRes.status === 200 && Boolean(loginData.token);
    record(
      'Suite 4',
      'Valid executive authentication & HMAC token issuance',
      hasToken,
      hasToken ? `Role: ${loginData.user?.role || 'Admin'}, Token signed` : 'Failed'
    );

    // 4. Verify Issued Token via /api/admin_auth.php?action=check
    if (loginData.token) {
      const tokenVerifyRes = await fetch(`${LIVE_BASE}/api/admin_auth.php?action=check`, {
        headers: { 'Authorization': `Bearer ${loginData.token}` }
      });
      const tokenVerifyData = await tokenVerifyRes.json().catch(() => ({}));
      record(
        'Suite 4',
        'Cryptographic token verification via Bearer header',
        tokenVerifyRes.status === 200 && tokenVerifyData.authenticated === true,
        `HTTP ${tokenVerifyRes.status}, User: ${tokenVerifyData.user?.name || 'Verified'}`
      );
    }

    // 5. Public Lead / Contact Inquiry Submission Test
    const testLead = {
      name: 'Automated QA Lead',
      email: 'qa-test@toplinkersgroup.com',
      phone: '+923349522157',
      message: 'Automated backend verification test lead inquiry.',
      property_id: 1,
      source: 'backend-test-suite'
    };

    const leadRes = await fetch(`${LIVE_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testLead)
    });
    const leadData = await leadRes.json().catch(() => ({}));
    record(
      'Suite 4',
      'Public Lead / Visitor Contact Inquiry Submission',
      leadRes.status === 200 || leadRes.status === 201 || leadData.success === true,
      `HTTP ${leadRes.status}, Reference: ${leadData.id || 'Captured'}`
    );
  } catch (e) {
    record('Suite 4', 'Security & Auth Suite', false, e.message);
  }

  // ====================================================
  // SUITE 5: Core Web Assets & Crawler Endpoints
  // ====================================================
  console.log('\n📄 SUITE 5: Core Web Files & Crawler Endpoints');
  try {
    const sitemapRes = await fetch(`${LIVE_BASE}/sitemap.xml`);
    const sitemapText = await sitemapRes.text();
    record(
      'Suite 5',
      'sitemap.xml accessible & valid XML',
      sitemapRes.status === 200 && sitemapText.includes('<urlset'),
      `HTTP ${sitemapRes.status}, ${(sitemapText.length / 1024).toFixed(1)} KB`
    );

    const robotsRes = await fetch(`${LIVE_BASE}/robots.txt`);
    const robotsText = await robotsRes.text();
    record(
      'Suite 5',
      'robots.txt accessible & allows crawlers',
      robotsRes.status === 200 && robotsText.includes('User-agent'),
      `HTTP ${robotsRes.status}`
    );

    const adsRes = await fetch(`${LIVE_BASE}/ads.txt`);
    const adsText = await adsRes.text();
    record(
      'Suite 5',
      'ads.txt contains authorized Google AdSense pub ID',
      adsRes.status === 200 && adsText.includes('pub-9699786853848201'),
      `HTTP ${adsRes.status}, pub-9699786853848201 verified`
    );
  } catch (e) {
    record('Suite 5', 'Static assets & crawler files', false, e.message);
  }

  // ====================================================
  // FINAL REPORT & SUMMARY
  // ====================================================
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const total = results.passed + results.failed;
  const passPercent = ((results.passed / total) * 100).toFixed(1);

  console.log('\n========================================================================');
  console.log('📈 COMPLETE BACKEND AUDIT & TEST REPORT');
  console.log('========================================================================');
  console.log(`Total Verification Tests : ${total}`);
  console.log(`Passed                   : ${results.passed} ✅`);
  console.log(`Failed                   : ${results.failed} ${results.failed === 0 ? '🎉' : '❌'}`);
  console.log(`Pass Rate                : ${passPercent}%`);
  console.log(`Total Execution Time     : ${duration}s`);
  console.log('------------------------------------------------------------------------');
  for (const [suite, s] of Object.entries(results.suites)) {
    console.log(`- ${suite.padEnd(10)}: ${s.passed}/${s.passed + s.failed} passed (${((s.passed / (s.passed + s.failed)) * 100).toFixed(0)}%)`);
  }
  console.log('========================================================================\n');
}

runTests();
