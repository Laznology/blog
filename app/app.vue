<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "id"
  },
  bodyAttrs: {
    class: "min-h-screen bg-background text-foreground font-sans antialiased"
  }
})

useSeoMeta({
  titleTemplate: "%s %separator %siteName",
  ogType: "website",
  ogImage: "/og-image.png",
  twitterCard: "summary_large_image",
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
