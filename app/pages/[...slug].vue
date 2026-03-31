<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <article class="prose prose-lg dark:prose-invert mx-auto break-words">
      <h1 v-if="page" class="mb-8 font-extrabold tracking-tight">{{ page?.title }}</h1>
      <ContentRenderer v-if="page" :value="page" />
    </article>
  </div>
</template>
