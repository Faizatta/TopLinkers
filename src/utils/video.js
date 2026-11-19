/**
 * Video URL Parser & Optimization Utility
 * Parses YouTube, Vimeo, and direct MP4/WebM videos into responsive embed URLs.
 */

export function parseVideoUrl(url) {
  if (!url || typeof url !== 'string') return null
  const clean = url.trim()
  if (!clean) return null

  // Direct MP4 / WebM / OGG video file
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(clean)) {
    return {
      type: 'direct',
      src: clean,
      embedUrl: clean,
      rawUrl: clean
    }
  }

  // YouTube match: watch?v=, youtu.be/, embed/, shorts/
  const ytMatch = clean.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  )
  if (ytMatch && ytMatch[1]) {
    const id = ytMatch[1]
    return {
      type: 'youtube',
      id,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      rawUrl: clean
    }
  }

  // Vimeo match
  const vimeoMatch = clean.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/i
  )
  if (vimeoMatch && vimeoMatch[3]) {
    const id = vimeoMatch[3]
    return {
      type: 'vimeo',
      id,
      embedUrl: `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`,
      thumbnail: null,
      rawUrl: clean
    }
  }

  // Generic valid HTTP/HTTPS URL
  if (/^https?:\/\//i.test(clean)) {
    return {
      type: 'iframe',
      id: null,
      embedUrl: clean,
      thumbnail: null,
      rawUrl: clean
    }
  }

  return null
}

export function hasValidVideo(url) {
  return Boolean(parseVideoUrl(url))
}
