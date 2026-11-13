<template>
  <!--
    One of the site's own photos in /images, served in modern formats at the right size:
    AVIF first, WebP fallback, with the pre-generated 800px variant for card-sized slots
    and (optionally) the centre crop for phones on full-bleed banners.
  -->
  <picture :class="pictureClass">
    <template v-if="mobileCrop">
      <source media="(max-width: 639px)" type="image/avif" :srcset="`/images/${name}-m.avif`" />
      <source media="(max-width: 639px)" type="image/webp" :srcset="`/images/${name}-m.webp`" />
    </template>
    <source type="image/avif" :srcset="`/images/${name}-800.avif 800w, /images/${name}.avif ${fullWidth}w`" :sizes="sizes" />
    <img
      :src="`/images/${name}.webp`"
      :srcset="`/images/${name}-800.webp 800w, /images/${name}.webp ${fullWidth}w`"
      :sizes="sizes"
      :alt="alt"
      :loading="loading"
      :fetchpriority="fetchpriority"
      decoding="async"
      :width="width"
      :height="height"
      :class="imgClass"
    />
  </picture>
</template>

<script setup>
defineProps({
  // Base file name in /images, e.g. 'hero-harsukh'
  name: { type: String, required: true },
  alt: { type: String, required: true },
  sizes: { type: String, default: '100vw' },
  loading: { type: String, default: 'lazy' },
  fetchpriority: { type: String, default: 'auto' },
  mobileCrop: { type: Boolean, default: false },
  // Width of the full-size source (the hero photos are 1376-1920px wide)
  fullWidth: { type: Number, default: 1440 },
  width: { type: [Number, String], default: 1440 },
  height: { type: [Number, String], default: 960 },
  imgClass: { type: [String, Array, Object], default: 'w-full h-full object-cover' },
  // Layout of the <picture> box itself (e.g. 'absolute inset-0' for background banners)
  pictureClass: { type: [String, Array, Object], default: 'block w-full h-full' }
})
</script>
