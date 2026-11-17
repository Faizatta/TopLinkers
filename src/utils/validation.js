/**
 * Validation utilities for forms and user inputs.
 * Supports Pakistani local phone numbers (03xx-xxxxxxx, 03xxxxxxxxx)
 * and international phone numbers (+92..., +1..., etc.) with flexible spaces/dashes.
 */

export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false
  const trimmed = phone.trim()
  if (!trimmed) return false

  // Reject alphabetical characters
  if (/[a-zA-Z]/.test(trimmed)) return false

  // Strip common separators: spaces, dashes, dots, parentheses
  const cleaned = trimmed.replace(/[\s\-\.\(\)]/g, '')

  // Must consist of digits, optionally leading with '+'
  if (!/^\+?[0-9]{10,15}$/.test(cleaned)) return false

  // Pakistani formats: 03001234567, +923001234567, 00923001234567, 923001234567
  const isPk = /^(03[0-9]{9}|(\+92|0092|92)3[0-9]{9})$/.test(cleaned)
  // International format: 10 to 15 digits
  const isIntl = /^\+?[1-9][0-9]{9,14}$/.test(cleaned)

  return isPk || isIntl
}

export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  const trimmed = email.trim()
  if (!trimmed) return false
  // Robust RFC-compliant regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)
}

export function cleanText(text) {
  return typeof text === 'string' ? text.trim() : ''
}
