import https from 'node:https';

const urls = [
  'https://toplinkersgroup.com/',
  'https://toplinkersgroup.com/about',
  'https://toplinkersgroup.com/services',
  'https://toplinkersgroup.com/listings',
  'https://toplinkersgroup.com/contact',
  'https://toplinkersgroup.com/privacy-policy',
  'https://toplinkersgroup.com/blog',
  'https://toplinkersgroup.com/team',
  'https://toplinkersgroup.com/listings?type=plot&city=PECHS&maxPrice=3000000',
  'https://toplinkersgroup.com/non-existent-page-test-404'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => { if (data.length < 500) data += chunk; });
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          isHtml: (res.headers['content-type'] || '').includes('text/html'),
          hasApp: data.includes('id="app"') || data.includes('TopLinkers')
        });
      });
    });
    req.on('error', (err) => {
      resolve({ url, error: err.message });
    });
    req.end();
  });
}

async function run() {
  for (const u of urls) {
    const result = await checkUrl(u);
    console.log(JSON.stringify(result));
  }
}

run();
