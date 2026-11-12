/**
 * Single entry point for Leaflet.
 *
 * Leaflet (~45 KB gzipped JS + its stylesheet) is only needed on pages that
 * actually show a map. Importing it through this module keeps the library and
 * its CSS out of the initial bundle: pages import it lazily (or as part of a
 * lazily loaded route), and the stylesheet is shipped with the same chunk.
 *
 * The overrides are imported after leaflet.css so they always win the cascade,
 * regardless of when the chunk is loaded.
 */
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './leaflet-overrides.css'

export default L
