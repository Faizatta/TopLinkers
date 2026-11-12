/**
 * Native High-Performance Smooth Scroll Engine
 * Delivers zero-latency, hardware-accelerated 60/120fps scrolling.
 * Eliminates synthetic event hijacking on mouse wheels, trackpads, and mobile touch.
 */

let bodyScrollLockCount = 0

/**
 * Initialize native smooth scrolling
 */
export function initLenis() {
  if (typeof window === 'undefined') return null
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'auto'
  }
  return {
    isStopped: false,
    scrollTo,
    stop: stopLenis,
    start: startLenis,
    destroy: destroyLenis
  }
}

/**
 * Get active scroll instance (maintains compatibility with existing imports)
 */
export function getLenis() {
  return initLenis()
}

/**
 * Hardware-accelerated native smooth scroll to target coordinate, selector or element
 * @param {string|HTMLElement|number} target
 * @param {object} options
 */
export function scrollTo(target, options = {}) {
  if (typeof window === 'undefined') return

  const immediate = Boolean(options.immediate)
  const behavior = immediate ? 'instant' : 'smooth'
  const offset = options.offset || 0

  if (typeof target === 'number') {
    window.scrollTo({
      top: Math.max(0, target + offset),
      left: 0,
      behavior
    })
    return
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el) {
    const headerHeight = 85
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset + offset - headerHeight

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior
    })
  }
}

/**
 * Safely lock body scroll for modals without freezing browser event loops
 */
export function stopLenis() {
  if (typeof document === 'undefined') return
  bodyScrollLockCount++
  if (bodyScrollLockCount === 1) {
    document.body.style.overflow = 'hidden'
  }
}

/**
 * Safely unlock body scroll
 */
export function startLenis() {
  if (typeof document === 'undefined') return
  bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1)
  if (bodyScrollLockCount === 0) {
    document.body.style.overflow = ''
  }
}

/**
 * Teardown handler
 */
export function destroyLenis() {
  bodyScrollLockCount = 0
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}
