const lighthouse = require('lighthouse').default || require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function runSingle(url, strategy) {
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
    const res = await lighthouse(url, options);
    const audits = res.lhr.audits;
    return {
      score: Math.round(res.lhr.categories.performance.score * 100),
      fcp: parseFloat(audits['first-contentful-paint'].numericValue / 1000).toFixed(2),
      lcp: parseFloat(audits['largest-contentful-paint'].numericValue / 1000).toFixed(2),
      speedIndex: parseFloat(audits['speed-index'].numericValue / 1000).toFixed(2),
      tbt: Math.round(audits['total-blocking-time'].numericValue),
      cls: parseFloat(audits['cumulative-layout-shift'].numericValue).toFixed(3)
    };
  } finally {
    await chrome.kill();
  }
}

async function benchmark(strategy = 'mobile', runs = 3) {
  const url = 'http://localhost:4173/';
  console.log(`\n========================================`);
  console.log(`Running ${runs} benchmarks for ${url} on ${strategy.toUpperCase()}...`);
  console.log(`========================================`);
  const results = [];
  for (let i = 1; i <= runs; i++) {
    console.log(`[Run ${i}/${runs}] Auditing...`);
    const r = await runSingle(url, strategy);
    console.log(`  Score: ${r.score} | LCP: ${r.lcp}s | FCP: ${r.fcp}s | SpeedIndex: ${r.speedIndex}s | TBT: ${r.tbt}ms | CLS: ${r.cls}`);
    results.push(r);
  }

  // Median by score
  results.sort((a, b) => a.score - b.score);
  const median = results[Math.floor(results.length / 2)];
  console.log(`\n>>> MEDIAN RESULT (${strategy.toUpperCase()}):`);
  console.log(`>>> Performance Score: ${median.score}/100`);
  console.log(`>>> LCP: ${median.lcp}s`);
  console.log(`>>> FCP: ${median.fcp}s`);
  console.log(`>>> Speed Index: ${median.speedIndex}s`);
  console.log(`>>> TBT: ${median.tbt}ms`);
  console.log(`>>> CLS: ${median.cls}`);
  return median;
}

async function main() {
  await benchmark('desktop', 3);
  await benchmark('mobile', 3);
}

main().catch(console.error);
