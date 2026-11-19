/**
 * TopLinkers Real-Time Cross-Tab / Cross-Window Synchronization Bus
 * Instantly broadcasts state changes (properties, team members, rates, blogs)
 * across all open browser tabs and windows without requiring page refresh.
 */

const CHANNEL_NAME = 'toplinkers_live_sync'
let channel = null

if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    channel = new BroadcastChannel(CHANNEL_NAME)
  } catch (e) {
    channel = null
  }
}

/**
 * Broadcast that data has been updated on the backend.
 * @param {'properties'|'team'|'rates'|'blogs'|'reviews'|'all'} topic
 * @param {any} payload
 */
export function notifyDataChanged(topic = 'all', payload = null) {
  const message = { topic, payload, timestamp: Date.now() }
  if (channel) {
    try {
      channel.postMessage(message)
    } catch (e) {}
  }
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('toplinkers_sync_event', JSON.stringify(message))
    } catch (e) {}
  }
}

/**
 * Listen for data change notifications from other tabs/windows or admin mutations.
 * @param {(event: { topic: string, payload: any, timestamp: number }) => void} callback
 * @returns {() => void} unsubscribe function
 */
export function onDataChanged(callback) {
  if (typeof window === 'undefined') return () => {}

  const handleMsg = (e) => {
    if (e?.data && typeof callback === 'function') {
      callback(e.data)
    }
  }

  const handleStorage = (e) => {
    if (e.key === 'toplinkers_sync_event' && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue)
        if (parsed && typeof callback === 'function') {
          callback(parsed)
        }
      } catch (err) {}
    }
  }

  if (channel) {
    channel.addEventListener('message', handleMsg)
  }
  window.addEventListener('storage', handleStorage)

  return () => {
    if (channel) {
      channel.removeEventListener('message', handleMsg)
    }
    window.removeEventListener('storage', handleStorage)
  }
}
