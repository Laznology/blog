<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'     
import { Button } from '@/components/ui/button'

useSeoMeta({
  title: 'Blog',
  description: 'Discover stories, thinking, and expertise.',
})

const { data: articles } = await useAsyncData('blog-articles', () =>
  queryCollection('content').select('title', 'description', 'path', 'date').order('date', 'DESC').all()
)
</script>

<template>
  <div class="container mx-auto px-4 py-16 space-y-12">
    <div>
      <h1 class="text-4xl font-bold tracking-tight mb-2">Our Blog</h1>
      <h2 class="text-lg text-muted-foreground font-normal">Discover stories, thinking, and expertise.</h2>        
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="articles && articles.length > 0">    
      <Card v-for="article in articles" :key="article.path" class="flex flex-col hover:shadow-lg transition">
        <CardHeader>
          <CardTitle>{{ article.title }}</CardTitle>
          <CardDescription v-if="article.description">{{ article.description }}</CardDescription>    
        </CardHeader>
        <CardContent class="mt-auto pt-6">
          <Button as-child variant="link" class="p-0">
            <NuxtLink :to="article.path">Read More &rarr;</NuxtLink>
          </Button>
        </CardContent>
      </Card>
    </div>
    <div v-else class="text-center py-24 text-muted-foreground">
      No blog posts found.
    </div>
  </div>
</template>
