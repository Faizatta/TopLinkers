const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const distDir = path.resolve(__dirname, '../dist');
const port = 4173;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  
  let filePath = path.join(distDir, reqPath);
  
  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    } else {
      filePath = path.join(distDir, 'index.html');
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const raw = fs.readFileSync(filePath);
  
  res.setHeader('Content-Type', contentType);
  if (reqPath.startsWith('/assets/') || ext === '.woff2' || ext === '.webp' || ext === '.avif') {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  }

  if (/\bbr\b/.test(acceptEncoding) && (ext === '.html' || ext === '.js' || ext === '.css' || ext === '.json')) {
    res.setHeader('Content-Encoding', 'br');
    zlib.brotliCompress(raw, (err, compressed) => {
      if (err) { res.end(raw); } else { res.end(compressed); }
    });
  } else if (/\bgzip\b/.test(acceptEncoding) && (ext === '.html' || ext === '.js' || ext === '.css' || ext === '.json')) {
    res.setHeader('Content-Encoding', 'gzip');
    zlib.gzip(raw, (err, compressed) => {
      if (err) { res.end(raw); } else { res.end(compressed); }
    });
  } else {
    res.end(raw);
  }
});

server.listen(port, () => {
  console.log(`Static preview server listening on http://localhost:${port}`);
});
