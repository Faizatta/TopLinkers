import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Shared "lift above the footer" offset for the floating widgets (WhatsApp button,
 * Harsukh teaser, back-to-top).
 *
 * Each widget used to measure the footer on every scroll event, i.e. three forced
 * full-page layouts per scroll event. Now there is one listener and at most one
 * measurement per animation frame, shared by every widget that uses it.
 */
const bottomOffset = ref(24)
let subscribers = 0
let frame = 0

function measure() {
  frame = 0
  const footer = document.getElementById('site-footer')
  if (!footer) {
    bottomOffset.value = 24
    return
  }
  const rect = footer.getBoundingClientRect()
  const docHeight = document.documentElement.scrollHeight
  const isScrolledNearBottom = (window.scrollY + window.innerHeight) >= (docHeight - 600)

  if (isScrolledNearBottom && rect.top < window.innerHeight && rect.top > 0) {
    const overlap = window.innerHeight - rect.top
    bottomOffset.value = Math.max(24, overlap + 24)
  } else {
    bottomOffset.value = 24
  }
}

function scheduleMeasure() {
  if (!frame) frame = requestAnimationFrame(measure)
}

export function useFooterClearance() {
  onMounted(() => {
    if (subscribers++ === 0) {
      window.addEventListener('scroll', scheduleMeasure, { passive: true })
      window.addEventListener('resize', scheduleMeasure, { passive: true })
    }
    scheduleMeasure()
  })

  onUnmounted(() => {
    if (--subscribers === 0) {
      window.removeEventListener('scroll', scheduleMeasure)
      window.removeEventListener('resize', scheduleMeasure)
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }
  })

  return { bottomOffset, updateFooterClearance: scheduleMeasure }
}
