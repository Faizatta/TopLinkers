import { onUnmounted } from 'vue'

/**
 * Runs a Swiper's autoplay only while the carousel is on screen.
 *
 * Every autoplay step re-orders looped slides and forces a layout. Carousels the
 * visitor can't see (scrolled away, or still below the fold) don't need to keep
 * doing that work: it just blocks the main thread. As soon as the carousel scrolls
 * into view autoplay starts again with its normal delay, so what the visitor sees
 * is unchanged.
 *
 * Usage: const { onSwiper } = useAutoplayWhenVisible();  <swiper @swiper="onSwiper">
 */
export function useAutoplayWhenVisible({ rootMargin = '0px' } = {}) {
  let observer = null

  const onSwiper = (swiper) => {
    if (typeof IntersectionObserver === 'undefined' || !swiper || !swiper.el) return
    if (observer) observer.disconnect()

    observer = new IntersectionObserver(([entry]) => {
      if (!entry || swiper.destroyed || !swiper.autoplay) return
      if (entry.isIntersecting) {
        if (!swiper.autoplay.running) swiper.autoplay.start()
      } else if (swiper.autoplay.running) {
        swiper.autoplay.stop()
      }
    }, { rootMargin })

    observer.observe(swiper.el)
  }

  onUnmounted(() => {
    if (observer) observer.disconnect()
    observer = null
  })

  return { onSwiper }
}
