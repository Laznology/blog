<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

useSeoMeta({
  title: 'Home',
  description: 'The Modern Publisher built with Nuxt 3, Tailwind CSS, and Shadcn Vue.',
})
</script>

<template>
    <div class="container mx-auto px-4 py-24 space-y-16">
        <!-- Hero Section -->
        <section class="text-center space-y-6">
            <h1 class="text-5xl font-extrabold tracking-tight lg:text-6xl">     
                The Modern Publisher
            </h1>
            <p class="text-xl text-muted-foreground max-w-[42rem] mx-auto">     
                Built with Nuxt 3, Tailwind CSS, and Shadcn Vue. Import components easily using pnpm and build amazing web experiences.
            </p>
            <div class="flex justify-center gap-4 pt-4">
                <Button as-child size="lg">
                    <NuxtLink to="/blog">Read Our Blog</NuxtLink>
                </Button>
                <Button as-child variant="outline" size="lg">
                    <NuxtLink to="/about">About Us</NuxtLink>
                </Button>
            </div>
        </section>

        <!-- Features Section -->
        <section class="pt-12">
            <h2 class="sr-only">Features</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Shadcn Vue</CardTitle>
                        <CardDescription>Beautifully designed components</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Accessible and customizable components that you can copy and paste into your apps.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Nuxt Content</CardTitle>
                        <CardDescription>Markdown based CMS</CardDescription>       
                    </CardHeader>
                    <CardContent>
                        Write your blog posts in Markdown, MDC and more effortlessly.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Tailwind CSS</CardTitle>
                        <CardDescription>Rapid UI development</CardDescription>     
                    </CardHeader>
                    <CardContent>
                        Utility-first CSS framework packed with classes that can be composed to build any design.
                    </CardContent>
                </Card>
            </div>
        </section>
    </div>
</template>
