const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeHeroImages() {
  console.log('Optimizing hero images with in-memory buffers...');
  
  // 1. Target hero LCP: hero-moqa-plot
  const sourceHeroPath = path.resolve(__dirname, '../public/images/hero-moqa-plot.webp');
  if (fs.existsSync(sourceHeroPath)) {
    const inputBuf = fs.readFileSync(sourceHeroPath);

    // Mobile AVIF & WebP
    const mAvif = await sharp(inputBuf)
      .resize({ width: 768, withoutEnlargement: true })
      .avif({ quality: 65, effort: 6 })
      .toBuffer();
    fs.writeFileSync(path.resolve(__dirname, '../public/images/hero-moqa-plot-m.avif'), mAvif);

    const mWebp = await sharp(inputBuf)
      .resize({ width: 768, withoutEnlargement: true })
      .webp({ quality: 75, effort: 6 })
      .toBuffer();
    fs.writeFileSync(path.resolve(__dirname, '../public/images/hero-moqa-plot-m.webp'), mWebp);

    // Desktop AVIF & WebP
    const dAvif = await sharp(inputBuf)
      .resize({ width: 1600, withoutEnlargement: true })
      .avif({ quality: 68, effort: 6 })
      .toBuffer();
    fs.writeFileSync(path.resolve(__dirname, '../public/images/hero-moqa-plot.avif'), dAvif);

    const dWebp = await sharp(inputBuf)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    fs.writeFileSync(sourceHeroPath, dWebp);
  }

  // Optimize other hero slides
  const heroNames = ['hero-pha-flats', 'hero-construction', 'hero-harsukh', 'hero-real-estate', 'hero-solar'];
  for (const name of heroNames) {
    const webpFile = path.resolve(__dirname, `../public/images/${name}.webp`);
    if (fs.existsSync(webpFile)) {
      const inputBuf = fs.readFileSync(webpFile);

      // Mobile
      const mAvif = await sharp(inputBuf)
        .resize({ width: 768, withoutEnlargement: true })
        .avif({ quality: 65, effort: 5 })
        .toBuffer();
      fs.writeFileSync(path.resolve(__dirname, `../public/images/${name}-m.avif`), mAvif);

      const mWebp = await sharp(inputBuf)
        .resize({ width: 768, withoutEnlargement: true })
        .webp({ quality: 75, effort: 5 })
        .toBuffer();
      fs.writeFileSync(path.resolve(__dirname, `../public/images/${name}-m.webp`), mWebp);

      // Desktop
      const dAvif = await sharp(inputBuf)
        .resize({ width: 1600, withoutEnlargement: true })
        .avif({ quality: 68, effort: 5 })
        .toBuffer();
      fs.writeFileSync(path.resolve(__dirname, `../public/images/${name}.avif`), dAvif);
    }
  }

  // Optimize Banu Hafeez images
  const bhDir = path.resolve(__dirname, '../public/images/banu-hafeez');
  if (fs.existsSync(bhDir)) {
    const bhFiles = fs.readdirSync(bhDir).filter(f => f.endsWith('.webp') && !f.endsWith('.tmp'));
    for (const file of bhFiles) {
      const fullPath = path.join(bhDir, file);
      const inputBuf = fs.readFileSync(fullPath);
      const outBuf = await sharp(inputBuf)
        .resize({ width: 1280, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toBuffer();
      fs.writeFileSync(fullPath, outBuf);
    }
  }

  // Clean up any stray .tmp files
  ['../public/images', '../public/images/banu-hafeez'].forEach(d => {
    const dir = path.resolve(__dirname, d);
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).filter(f => f.endsWith('.tmp')).forEach(f => {
        try { fs.unlinkSync(path.join(dir, f)); } catch (e) {}
      });
    }
  });

  console.log('✅ Image optimization complete!');
}

optimizeHeroImages().catch(err => {
  console.error('Image optimization error:', err);
  process.exit(1);
});
