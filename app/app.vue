<script setup lang="ts">
const siteDescription =
  "Catatan rasa penasaran IT: kenapa sesuatu ada, kenapa dibuat, dan kenapa berjalan seperti itu.";

useHead({
  htmlAttrs: {
    lang: "id",
  },
  bodyAttrs: {
    class: "min-h-screen bg-background text-foreground font-sans antialiased",
  },
});

useSeoMeta({
  titleTemplate: "%s %separator %siteName",
  description: siteDescription,
  ogType: "website",
  ogDescription: siteDescription,
  ogImage: "/og-image.png",
  twitterCard: "summary_large_image",
  twitterDescription: siteDescription,
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <main>
        <NuxtPage />
      </main>
    </NuxtLayout>
  </div>
</template>
