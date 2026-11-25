const lighthouse = require('lighthouse').default || require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function runAudit(url = 'https://toplinkersgroup.com/', strategy = 'mobile') {
  console.log(`Starting programmatic Lighthouse audit for ${url} (${strategy})...`);
  
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu']
  });

  const isDesktop = strategy === 'desktop';
  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
    formFactor: isDesktop ? 'desktop' : 'mobile',
    screenEmulation: isDesktop ? {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    } : {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 1.75,
      disabled: false,
    },
    throttling: isDesktop ? {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    } : {
      rttMs: 150,
      throughputKbps: 1.6 * 1024,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 150,
      downloadThroughputKbps: 1.6 * 1024,
      uploadThroughputKbps: 750
    }
  };

  try {
    const runnerResult = await lighthouse(url, options);
    const lh = runnerResult.lhr;
    
    console.log('\n=======================================');
    console.log(`AUDIT RESULT: ${url} (${strategy.toUpperCase()})`);
    console.log(`Performance Score: ${Math.round(lh.categories.performance.score * 100)}/100`);
    console.log('=======================================');
    
    const audits = lh.audits;
    console.log('FCP:', audits['first-contentful-paint']?.displayValue);
    console.log('LCP:', audits['largest-contentful-paint']?.displayValue);
    console.log('Speed Index:', audits['speed-index']?.displayValue);
    console.log('TBT:', audits['total-blocking-time']?.displayValue);
    console.log('CLS:', audits['cumulative-layout-shift']?.displayValue);

    console.log('\n--- LCP Element ---');
    const lcpItem = audits['largest-contentful-paint-element']?.details?.items?.[0];
    if (lcpItem) {
      console.log('Node snippet:', lcpItem.node?.snippet);
      console.log('Selector:', lcpItem.node?.selector);
    }

    console.log('\n--- Top Opportunities (Potential Savings) ---');
    Object.values(audits)
      .filter(a => a.details && a.details.type === 'opportunity' && a.numericValue > 50)
      .sort((a, b) => b.numericValue - a.numericValue)
      .slice(0, 8)
      .forEach(o => {
        console.log(`• ${o.title}: ${o.displayValue || Math.round(o.numericValue) + 'ms'}`);
      });

    console.log('\n--- Diagnostics ---');
    [
      'render-blocking-resources',
      'unused-javascript',
      'unused-css-rules',
      'uses-text-compression',
      'third-party-summary',
      'bootup-time',
      'mainthread-work-breakdown',
      'server-response-time'
    ].forEach(k => {
      if (audits[k]) {
        console.log(`• ${audits[k].title}: ${audits[k].displayValue || (audits[k].score === 1 ? 'Passed' : audits[k].score)}`);
      }
    });

    fs.writeFileSync(`lh-${strategy}.json`, JSON.stringify(lh, null, 2));
    console.log(`Saved report to lh-${strategy}.json`);
  } catch (err) {
    console.error('Audit Error:', err);
  } finally {
    await chrome.kill();
  }
}

const targetUrl = process.argv[2] || 'https://toplinkersgroup.com/';
const strategy = process.argv[3] || 'mobile';
runAudit(targetUrl, strategy);
