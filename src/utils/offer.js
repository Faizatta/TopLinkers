/**
 * Formats PKR price compactly (e.g. 8500000 -> "85 Lac", 12500000 -> "1.25 Cr").
 */
export function formatPkrAmount(amount) {
  const n = Number(amount) || 0
  if (n >= 10000000) return `${(n / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`
  if (n >= 100000) return `${(n / 100000).toFixed(2).replace(/\.00$/, '')} Lac`
  return n.toLocaleString()
}

/**
 * Checks whether a property's limited-time offer is currently active and valid.
 */
export function isPropertyOfferActive(property) {
  if (!property || !property.offerEnabled) return false
  const offerPrice = Number(property.offerPrice)
  if (!offerPrice || offerPrice <= 0) return false
  if (property.offerExpiresAt) {
    const exp = new Date(property.offerExpiresAt).getTime()
    if (!Number.isNaN(exp) && exp <= Date.now()) return false
  }
  return true
}

/**
 * Calculates discount details between regular price (previous rate) and offer price (current rate).
 */
export function calculateDiscount(regularPrice, offerPrice) {
  const reg = Number(regularPrice) || 0
  const cur = Number(offerPrice) || 0
  if (reg <= 0 || cur <= 0 || cur >= reg) {
    return {
      savings: 0,
      savingsFormatted: 'PKR 0',
      percent: 0,
      hasDiscount: false
    }
  }
  const savings = reg - cur
  const percent = Math.round((savings / reg) * 1000) / 10
  return {
    savings,
    savingsFormatted: `PKR ${formatPkrAmount(savings)}`,
    percent,
    hasDiscount: true
  }
}

/**
 * Returns a human-readable remaining time string if an expiry date is set.
 */
export function getOfferRemainingLabel(expiresAt) {
  if (!expiresAt) return 'Limited Time'
  const diff = new Date(expiresAt).getTime() - Date.now()
  if (Number.isNaN(diff) || diff <= 0) return 'Limited Time'
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  if (days > 0) return `${days}d ${hours}h left`
  if (hours > 0) return `${hours}h ${mins}m left`
  return `${Math.max(1, mins)}m left`
}

/**
 * Returns structured countdown units for real-time tickers.
 */
export function getDetailedCountdown(expiresAt) {
  if (!expiresAt) {
    return { days: 0, hours: 0, mins: 0, secs: 0, isExpired: false, label: 'Limited Time Deal' }
  }
  const diff = new Date(expiresAt).getTime() - Date.now()
  if (Number.isNaN(diff) || diff <= 0) {
    return { days: 0, hours: 0, mins: 0, secs: 0, isExpired: true, label: 'Deal Concluded' }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secs = Math.floor((diff % (1000 * 60)) / 1000)
  return {
    days,
    hours,
    mins,
    secs,
    isExpired: false,
    label: `${days}d ${hours}h ${mins}m left`
  }
}
