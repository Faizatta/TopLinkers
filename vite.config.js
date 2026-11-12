import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    // Every component uses <script setup>; dropping the Options API code path
    // shrinks the Vue runtime that every page has to download and parse.
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
  esbuild: {
    legalComments: 'none'
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
    reportCompressedSize: false,
    // Only preload what the entry statically needs; lazy chunks (maps, carousels,
    // below-the-fold sections) are fetched when they are actually used.
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // Core runtime shared by every route.
          if (/\/node_modules\/(@vue|vue|vue-router|pinia)\//.test(id)) return 'vendor-vue'
          // Leaflet has no dependencies and is only reached through lazy imports.
          if (id.includes('/node_modules/leaflet/')) return 'vendor-leaflet'
          // Swiper and the icons are intentionally NOT grouped. Rolldown pulls a
          // group's dependencies into it (a "swiper" group would swallow the Vue
          // runtime and be preloaded on every page); left alone, they are split
          // into lazy chunks next to the components that use them.
        }
      }
    }
  }
})
