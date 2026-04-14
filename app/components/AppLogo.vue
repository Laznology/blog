<script setup lang="ts">
import { useWindowScroll, useWindowSize } from '@vueuse/core'

const { y } = useWindowScroll()
const { height } = useWindowSize()

const isAtBottom = computed(() => {
  if (typeof document === 'undefined') return false
  return y.value + height.value >= document.body.scrollHeight - 60
})
</script>

<template>
  <NuxtLink
    to="/"
    class="swipe"
    :class="{ 'to-bottom': isAtBottom }"
    aria-label="laznology - Go to homepage"
  >
    laznology<span class="text-primary font-bold">.</span>
  </NuxtLink>
</template>

<style scoped>
.swipe {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: hsl(var(--foreground) / 0.85);
  cursor: pointer;
  user-select: none;
  transform-origin: top left;
  transition: transform 0.5s cubic-bezier(0.78, 0, 0.22, 1);
}

.to-bottom {
  transform: translateY(calc(100dvh - 100% - 7.5rem)) translateX(100%);
}

@media (min-width: 1024px) {
  .to-bottom {
    transform: translateY(calc(100dvh - 100% - 8rem)) translateX(2rem);
  }
}
</style>
