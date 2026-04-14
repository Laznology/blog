<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error.statusCode === 404)

const heading = computed(() => is404.value ? 'Void.' : 'Fault.')
const sub = computed(() => is404.value
  ? 'The page you seek does not exist within this archive.'
  : 'Something broke in the machine. It was not supposed to.'
)

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background selection:bg-primary/30 relative overflow-hidden">

    <div class="fixed left-4 xl:left-8 top-1/4 h-1/2 hidden lg:flex flex-col items-center z-0 pointer-events-none">
      <div class="h-full w-px bg-foreground/10" />
    </div>

    <div class="flex-1 flex flex-col items-start justify-center container mx-auto px-4 lg:px-16 py-32">

      <p class="text-xs font-sans uppercase tracking-[0.3em] text-foreground/30 mb-8">
        {{ error.statusCode }} — Error
      </p>

      <h1 class="text-[clamp(5rem,18vw,14rem)] font-serif font-light leading-none tracking-tight text-foreground/90 mb-8">
        {{ heading }}
      </h1>

      <div class="w-12 h-px bg-primary mb-8" />

      <p class="text-lg sm:text-xl font-serif font-light text-foreground/50 max-w-md leading-relaxed mb-12">
        {{ sub }}
      </p>

      <button
        class="group inline-flex items-center gap-3 text-sm font-sans uppercase tracking-[0.2em] text-foreground/60 hover:text-primary transition-colors"
        @click="handleError"
      >
        <span class="w-8 h-px bg-foreground/40 group-hover:bg-primary group-hover:w-12 transition-all duration-300" />
        Return to archive
      </button>

    </div>
  </div>
</template>
