<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import AppSearch from '@/components/AppSearch.vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const route = useRoute()

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  return paths.map((path, index) => ({
    name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
    path: '/' + paths.slice(0, index + 1).join('/'),
  }))
})

const { y } = useWindowScroll()
const { height } = useWindowSize()
const isAtBottom = computed(() => {
  if (typeof document === 'undefined') return false
  return y.value + height.value >= document.body.scrollHeight - 60
})
</script>

<template>
  <div class="fixed top-0 left-0 z-50 pointer-events-none w-full">
    <div class="container mx-auto px-4 lg:px-16">
      <div class="h-20 flex items-center">
        <div class="pointer-events-auto">
          <AppLogo />
        </div>
      </div>
    </div>
  </div>

  <header
    class="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40 transition-all duration-500"
    :class="{ 'opacity-0 pointer-events-none -translate-y-full': isAtBottom }"
  >
    <div class="container mx-auto px-4 lg:px-16 h-20 flex items-center justify-between gap-8">
      <span class="shrink-0 invisible text-2xl font-serif tracking-widest">ln.</span>
      <div class="flex flex-1 items-center justify-end gap-8">
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium font-sans uppercase tracking-[0.2em] text-foreground/80">
          <NuxtLink to="/blog" class="hover:text-primary transition-colors">Archive</NuxtLink>
          <NuxtLink to="/about" class="hover:text-primary transition-colors">Manifesto</NuxtLink>
        </nav>
        <div class="w-full max-w-sm hidden sm:block">
          <AppSearch />
        </div>
      </div>
    </div>
    <div class="p-4 sm:hidden border-t border-border/50 bg-background/50 backdrop-blur">
      <AppSearch />
    </div>
  </header>

  <div class="bg-transparent py-4 border-b border-border/20">
    <div class="container mx-auto px-4 lg:px-16">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" class="text-foreground/50 hover:text-primary transition-colors text-xs uppercase tracking-wider">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <template v-for="(crumb, i) in breadcrumbs" :key="crumb.path">
            <BreadcrumbSeparator class="opacity-30" />
            <BreadcrumbItem>
              <BreadcrumbLink v-if="i < breadcrumbs.length - 1" :href="crumb.path" class="text-foreground/50 hover:text-primary transition-colors text-xs uppercase tracking-wider">
                {{ crumb.name }}
              </BreadcrumbLink>
              <BreadcrumbPage v-else class="text-foreground text-xs uppercase tracking-wider">
                {{ crumb.name }}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </div>
</template>
