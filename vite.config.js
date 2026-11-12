import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  esbuild: {
    legalComments: 'none'
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('leaflet')) return 'vendor-leaflet'
            if (id.includes('swiper')) return 'vendor-swiper'
            if (id.includes('lucide-vue-next') || id.includes('@heroicons')) return 'vendor-icons'
            if (id.includes('vue') || id.includes('pinia')) return 'vendor-vue'
          }
        }
      }
    }
  }
})
