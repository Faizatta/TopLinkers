/**
 * Run `callback` once the page has finished its critical loading work:
 * after the window `load` event, during the next idle period of the main thread.
 *
 * Used to defer non-essential UI (floating widgets, modals, the hero carousel's
 * extra slides, below-the-fold sections) so it doesn't compete with the first paint.
 *
 * - `timeout`: how long the browser may postpone the callback once loaded.
 * - `maxWait`: safety net if `load` is held up (e.g. a slow third-party image);
 *   the callback still runs after this many ms.
 *
 * Returns a cancel function.
 */
export function whenIdle(callback, { timeout = 1500, maxWait = 4000 } = {}) {
  if (typeof window === 'undefined') return () => {}

  let done = false
  let idleId = null
  let timerId = null
  let maxWaitId = null

  const fire = () => {
    if (done) return
    done = true
    cleanup()
    callback()
  }

  const schedule = () => {
    if (done) return
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(fire, { timeout })
    } else {
      timerId = window.setTimeout(fire, 200)
    }
  }

  function cleanup() {
    window.removeEventListener('load', schedule)
    if (idleId !== null && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
    if (timerId !== null) window.clearTimeout(timerId)
    if (maxWaitId !== null) window.clearTimeout(maxWaitId)
  }

  if (document.readyState === 'complete') {
    schedule()
  } else {
    window.addEventListener('load', schedule, { once: true })
    maxWaitId = window.setTimeout(schedule, maxWait)
  }

  return () => {
    done = true
    cleanup()
  }
}

/**
 * Like `whenIdle`, but also fires as soon as the visitor starts interacting
 * (scroll, touch, click or key press), so deferred content is already there
 * when they go looking for it.
 */
export function whenIdleOrInteraction(callback, options) {
  if (typeof window === 'undefined') return () => {}

  const events = ['scroll', 'pointerdown', 'touchstart', 'keydown', 'wheel']
  let done = false

  const fire = () => {
    if (done) return
    done = true
    stop()
    callback()
  }

  const cancelIdle = whenIdle(fire, options)
  events.forEach(e => window.addEventListener(e, fire, { passive: true, once: true }))

  function stop() {
    cancelIdle()
    events.forEach(e => window.removeEventListener(e, fire))
  }

  return () => {
    done = true
    stop()
  }
}
