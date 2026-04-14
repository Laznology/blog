<script setup lang="ts">
import { withBase } from 'ufo'
import { useRuntimeConfig, computed } from '#imports'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = useRuntimeConfig().app.baseURL
    if (_base && _base !== '/') {
      return withBase(props.src, _base)
    }
  }
  return props.src
})
</script>

<template>
  <figure class="my-12 flex flex-col items-center group">
    <NuxtImg
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      class="w-full h-auto object-cover border border-border/20 shadow-2xl shadow-primary/5 rounded-md filter hover:contrast-110 hover:-translate-y-1 transition-all duration-700 ease-out"
      sizes="sm:100vw md:768px lg:1024px"
      format="webp"
      loading="lazy"
    />
    <figcaption v-if="alt" class="mt-4 text-xs font-sans font-light tracking-[0.2em] text-foreground/40 uppercase group-hover:text-primary/70 transition-colors">
      {{ alt }}
    </figcaption>
  </figure>
</template>
