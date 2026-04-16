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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { List } from 'lucide-vue-next'

const route = useRoute()

const { data: currentPage } = await useAsyncData(
  'app-header-current-page',
  () => queryCollection('content').path(route.path).first(),
  {
    watch: [() => route.path],
  },
)

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  return paths.map((path, index) => ({
    name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
    path: '/' + paths.slice(0, index + 1).join('/'),
  }))
})

const tocLinks = computed(() => {
  return currentPage.value?.body?.toc?.links || []
})

const hasToc = computed(() => tocLinks.value.length > 0)

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
    :class="{ 'opacity-0 pointer-events-none -translate-y-full': isAtBottom }">
    <div class="container mx-auto px-4 lg:px-16 h-20 flex items-center justify-between gap-8">
      <span class="shrink-0 invisible text-2xl font-serif tracking-widest">ln.</span>
      <div class="flex flex-1 items-center justify-end gap-8">
        <nav
          class="hidden md:flex items-center gap-8 text-sm font-medium font-sans uppercase tracking-[0.2em] text-foreground/80">
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
      <div class="flex items-center justify-between gap-3">
        <Breadcrumb class="min-w-0">
          <BreadcrumbList class="min-w-0 overflow-x-auto whitespace-nowrap">
            <BreadcrumbItem>
              <BreadcrumbLink href="/"
                class="text-foreground/50 hover:text-primary transition-colors text-xs uppercase tracking-wider">Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <template v-for="(crumb, i) in breadcrumbs" :key="crumb.path">
              <BreadcrumbSeparator class="opacity-30" />
              <BreadcrumbItem>
                <BreadcrumbLink v-if="i < breadcrumbs.length - 1" :href="crumb.path"
                  class="text-foreground/50 hover:text-primary transition-colors text-xs uppercase tracking-wider">
                  {{ crumb.name }}
                </BreadcrumbLink>
                <BreadcrumbPage v-else class="text-foreground text-xs uppercase tracking-wider">
                  {{ crumb.name }}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>

        <DropdownMenu v-if="hasToc" class="sm:hidden">
          <DropdownMenuTrigger
            class="sm:hidden shrink-0 h-8 px-2.5 text-[11px] uppercase tracking-wider inline-flex items-center gap-2 rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]">
            <List class="size-3.5" />
            Contents
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" class="w-72 max-h-[60vh]">
            <DropdownMenuLabel>Table of contents</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <template v-for="link in tocLinks" :key="link.id">
              <a :href="`#${link.id}`"
                class="flex w-full rounded-sm px-2 py-1.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                {{ link.text.replace(/^[\d.]+\s*/, '') }}
              </a>
              <a v-for="child in link.children || []" :key="child.id" :href="`#${child.id}`"
                class="flex w-full rounded-sm px-2 py-1.5 pl-6 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                {{ child.text.replace(/^[\d.]+\s*/, '') }}
              </a>
            </template>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>
