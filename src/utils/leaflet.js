/**
 * Single entry point for Leaflet.
 *
 * Leaflet (~45 KB gzipped JS + its stylesheet) is only needed on pages that
 * actually show a map. Importing it through this module keeps the library and
 * its CSS out of the initial bundle: pages import it lazily (or as part of a
 * lazily loaded route).
 *
 * The stylesheet is injected *before* the app's own stylesheets, which is where the
 * original <link> to leaflet.css sat in index.html. That keeps the original cascade:
 * Tailwind utilities and the Leaflet overrides in main.css still win over Leaflet's
 * defaults, no matter when this module is loaded.
 */
import L from 'leaflet'
import leafletCss from 'leaflet/dist/leaflet.css?inline'

if (typeof document !== 'undefined' && !document.getElementById('leaflet-css')) {
  const style = document.createElement('style')
  style.id = 'leaflet-css'
  style.textContent = leafletCss
  const firstStylesheet = document.head.querySelector('link[rel="stylesheet"], style')
  document.head.insertBefore(style, firstStylesheet)
}

export default L
