<template>
  <Modal v-model="ui.isShareModalOpen" title="Share Property" maxWidth="sm">
    <div class="space-y-4">
      <p class="text-xs text-gray-600">
        Share <span class="font-semibold text-gray-900">{{ ui.shareTargetTitle }}</span> with your family, clients or social networks.
      </p>

      <!-- URL Copy input -->
      <div class="flex items-center gap-2">
        <input
          type="text"
          readonly
          :value="ui.shareTargetUrl"
          class="flex-1 text-xs p-2.5 rounded border border-gray-200 bg-gray-50 text-gray-700 select-all"
        />
        <button
          type="button"
          class="px-3 py-2.5 bg-[#00AEEF] hover:bg-[#0098d3] text-white text-xs font-semibold rounded transition-colors"
          @click="copyLink"
        >
          Copy
        </button>
      </div>

      <!-- Social sharing shortcuts -->
      <div class="grid grid-cols-3 gap-2 pt-2">
        <button
          type="button"
          class="py-2 text-xs border border-gray-200 rounded hover:bg-gray-50 flex items-center justify-center gap-1.5 text-gray-700"
          @click="shareOn('facebook')"
        >
          Facebook
        </button>
        <button
          type="button"
          class="py-2 text-xs border border-gray-200 rounded hover:bg-gray-50 flex items-center justify-center gap-1.5 text-gray-700"
          @click="shareOn('twitter')"
        >
          Twitter
        </button>
        <button
          type="button"
          class="py-2 text-xs border border-gray-200 rounded hover:bg-gray-50 flex items-center justify-center gap-1.5 text-gray-700"
          @click="shareOn('whatsapp')"
        >
          WhatsApp
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import Modal from '../ui/Modal.vue'
import { useUiStore } from '../../stores/ui'

const ui = useUiStore()

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(ui.shareTargetUrl)
    ui.addToast({
      type: 'success',
      title: 'Link Copied',
      message: 'Property URL copied to your clipboard!'
    })
    ui.closeShareModal()
  } catch (err) {
    ui.addToast({
      type: 'info',
      title: 'Share Link',
      message: 'Please copy the link from the input box.'
    })
  }
}

const shareOn = (platform) => {
  const url = encodeURIComponent(ui.shareTargetUrl)
  const text = encodeURIComponent(ui.shareTargetTitle)
  let shareUrl = ''

  if (platform === 'facebook') {
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
  } else if (platform === 'twitter') {
    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
  } else if (platform === 'whatsapp') {
    shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }
}
</script>
