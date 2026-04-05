<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-transparent selection:bg-primary/30 relative">

    <div class="fixed left-4 xl:left-8 top-1/4 h-1/2 hidden lg:flex flex-col items-center z-0 pointer-events-none">
      <div class="h-full w-px bg-foreground/20" />
    </div>

    <div class="fixed right-4 xl:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-0 pointer-events-none opacity-40">
      <div class="h-24 w-px bg-foreground mb-6" />
      <span class="text-xs font-serif tracking-[0.4em] uppercase text-foreground" style="writing-mode: vertical-rl;">
        Der Wille zur Macht
      </span>
    </div>

    <AppHeader />

    <main class="flex-1 w-full relative z-10 container mx-auto px-4 lg:px-16 py-8">
      <slot />
    </main>

    <AppFooter />

  </div>
</template>
