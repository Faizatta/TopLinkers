/**
 * Responsive image helpers.
 *
 * The site's photos come from two places:
 *  - Unsplash URLs (`...?auto=format&fit=crop&w=1200&q=80`): the Unsplash CDN can
 *    resize the same photo on the fly, so we offer several widths of the *same*
 *    image and let the browser pick the smallest one that is still sharp.
 *  - Local hero photos in /images, which have pre-generated `-800` variants.
 *
 * Any other URL (admin uploads, data URIs, etc.) is returned untouched.
 */

const UNSPLASH = /^https:\/\/images\.unsplash\.com\//
const LOCAL_HERO = /^\/images\/(hero-[a-z-]+)\.webp$/

function originalWidth(url) {
  const m = /[?&]w=(\d+)/.exec(url)
  return m ? Number(m[1]) : null
}

/** Same Unsplash photo at a different width (keeps crop/format/quality params). */
export function unsplashAt(url, width) {
  if (typeof url !== 'string' || !UNSPLASH.test(url)) return url
  if (/[?&]w=\d+/.test(url)) return url.replace(/([?&]w=)\d+/, `$1${width}`)
  return url + (url.includes('?') ? '&' : '?') + `w=${width}`
}

/**
 * Build a `srcset` for an image URL.
 * `widths` are candidate widths; for Unsplash, widths larger than the URL's own
 * `w=` are dropped (we never request more than the original markup did).
 * Returns `undefined` when no responsive variants exist, so `:srcset` is omitted.
 */
export function responsiveSrcset(url, widths = [480, 800, 1200]) {
  if (typeof url !== 'string') return undefined

  if (UNSPLASH.test(url)) {
    const max = originalWidth(url)
    const list = [...new Set(widths.filter(w => !max || w <= max).concat(max ? [max] : []))]
      .sort((a, b) => a - b)
    if (list.length < 2) return undefined
    return list.map(w => `${unsplashAt(url, w)} ${w}w`).join(', ')
  }

  const local = LOCAL_HERO.exec(url)
  if (local) {
    return `/images/${local[1]}-800.webp 800w, ${url} 1440w`
  }

  return undefined
}
