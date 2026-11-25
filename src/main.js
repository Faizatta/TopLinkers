import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'
import { initLenis } from './services/lenis'
import { initWebMCP } from './services/webmcp'

// Expose WebMCP tools to in-browser AI agents upon user interaction or long idle
if (typeof window !== 'undefined') {
  let mcpDone = false
  const runMCP = () => {
    if (mcpDone) return
    mcpDone = true
    cleanupMCP()
    initWebMCP()
  }
  const mcpEvts = ['pointerdown', 'scroll', 'touchstart', 'keydown']
  const cleanupMCP = () => {
    mcpEvts.forEach(e => window.removeEventListener(e, runMCP))
    if (mcpTimer) clearTimeout(mcpTimer)
  }
  mcpEvts.forEach(e => window.addEventListener(e, runMCP, { once: true, passive: true }))
  const mcpTimer = setTimeout(runMCP, 8000)
}

// Enable standard hardware-accelerated scroll restoration
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'auto'
}

// After a new deployment, a tab opened on the previous build may request lazy chunks
// that no longer exist. Reload once to pick up the new build instead of breaking.
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    const key = 'toplinkers_chunk_reload_at'
    try {
      // At most one automatic reload per 30 seconds, so a genuinely missing
      // chunk can never cause a reload loop.
      const last = Number(sessionStorage.getItem(key) || 0)
      if (Date.now() - last < 30000) return
      sessionStorage.setItem(key, String(Date.now()))
    } catch (e) {
      return
    }
    event.preventDefault()
    window.location.reload()
  })
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

// Initialize native smooth scroll engine
initLenis()
