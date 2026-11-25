const https = require('https');

async function checkPSI(strategy = 'mobile') {
  console.log(`Auditing https://toplinkersgroup.com/ on ${strategy}...`);
  const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://toplinkersgroup.com/&strategy=${strategy}`;
  
  const res = await fetch(url);
  const data = await res.json();
  
  if (data.error) {
    console.error('PSI Error:', data.error);
    return;
  }
  
  const lh = data.lighthouseResult;
  console.log(`\n=== Lighthouse Results (${strategy.toUpperCase()}) ===`);
  console.log('Overall Score:', Math.round(lh.categories.performance.score * 100) + '/100');
  
  const audits = lh.audits;
  console.log('FCP:', audits['first-contentful-paint']?.displayValue);
  console.log('LCP:', audits['largest-contentful-paint']?.displayValue);
  console.log('Speed Index:', audits['speed-index']?.displayValue);
  console.log('TBT:', audits['total-blocking-time']?.displayValue);
  console.log('CLS:', audits['cumulative-layout-shift']?.displayValue);
  
  console.log('\n--- LCP Element ---');
  const lcpElem = audits['largest-contentful-paint-element']?.details?.items?.[0];
  if (lcpElem) {
    console.log('Node:', lcpElem.node?.snippet);
    console.log('Selector:', lcpElem.node?.selector);
  }
  
  console.log('\n--- Top Opportunities ---');
  const opps = Object.values(audits).filter(a => a.details && a.details.type === 'opportunity' && a.numericValue > 100);
  opps.sort((a, b) => b.numericValue - a.numericValue).slice(0, 10).forEach(o => {
    console.log(`• ${o.title}: ${o.displayValue || (Math.round(o.numericValue) + 'ms')}`);
  });
  
  console.log('\n--- Key Diagnostics ---');
  [
    'render-blocking-resources',
    'unused-javascript',
    'unused-css-rules',
    'uses-text-compression',
    'third-party-summary',
    'server-response-time',
    'network-rtt',
    'network-server-latency',
    'mainthread-work-breakdown',
    'bootup-time'
  ].forEach(k => {
    if (audits[k]) {
      const v = audits[k].displayValue !== undefined ? audits[k].displayValue : (audits[k].score === 1 ? 'PASS' : audits[k].score);
      console.log(`• ${audits[k].title}: ${v}`);
      if (audits[k].details?.items && audits[k].details.items.length > 0) {
        audits[k].details.items.slice(0, 3).forEach(item => {
          console.log(`    - ${item.url || item.groupLabel || item.entity || ''} (${item.totalBytes ? Math.round(item.totalBytes/1024) + ' KB' : ''} ${item.wastedBytes ? Math.round(item.wastedBytes/1024) + ' KB wasted' : ''} ${item.wastedMs ? Math.round(item.wastedMs) + 'ms wasted' : ''})`);
        });
      }
    }
  });
}

checkPSI(process.argv[2] || 'mobile');
