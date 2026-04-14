<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMagicKeys, useScrollLock, whenever } from '@vueuse/core'

const isOpen = ref(false)
const searchQuery = ref('')

const searchInput = ref<InstanceType<typeof Input> | null>(null)

const isMac = computed(() => {
  if (typeof navigator === 'undefined') return false
  return /mac/i.test(navigator.userAgent) && !/iphone|ipad/i.test(navigator.userAgent)
})

const bodyLock = useScrollLock(typeof document !== 'undefined' ? document.body : null)
watch(isOpen, (val) => { bodyLock.value = val })

const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.type === 'keydown' && e.key === 'k' && (e.ctrlKey || e.metaKey))
      e.preventDefault()
  },
})

whenever(() => keys.Ctrl_K?.value, () => isOpen.value ? closeSearch() : openSearch())
whenever(() => keys.Meta_K?.value, () => isOpen.value ? closeSearch() : openSearch())
whenever(() => keys.Escape?.value, () => { if (isOpen.value) closeSearch() })

const { data: allArticles } = await useAsyncData('search-articles', () => {
  return queryCollection('content').all()
})

const filteredArticles = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return (allArticles.value || []).filter(article => {
    const inTitle = article.title.toLowerCase().includes(query)
    const inDesc = article.description?.toLowerCase().includes(query) || false
    const inTags = article.tags?.some(tag => tag.toLowerCase().includes(query)) || false
    return inTitle || inDesc || inTags
  })
})

function openSearch() {
  isOpen.value = true
  nextTick(() => {
    const el = searchInput.value?.$el as HTMLInputElement | undefined
    el?.focus()
  })
}

function closeSearch() {
  isOpen.value = false
  searchQuery.value = ''
}

function highlight(text: string): string {
  if (!searchQuery.value || !text) return text
  const escaped = searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}
</script>

<template>
  <div>
    <Button
      variant="ghost"
      class="w-full justify-start text-foreground/50 hover:bg-transparent hover:text-foreground shadow-none rounded-none py-6 text-sm tracking-[0.2em] font-sans uppercase focus:ring-0 group transition-all"
      aria-label="Open search (Ctrl+K or Cmd+K)"
      @click="openSearch"
    >
      <Search class="mr-3 h-4 w-4 opacity-70 group-hover:text-primary transition-colors" />
      <span class="flex-1 text-left border-b border-transparent group-hover:border-foreground/30 pb-0.5 transition-all">Search Collection</span>
      <kbd class="ml-4 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded border border-border/50 text-foreground/30 group-hover:text-foreground/50 group-hover:border-foreground/30 transition-colors">
        <span>{{ isMac ? '⌘' : 'Ctrl' }}</span><span>K</span>
      </kbd>
    </Button>

    <ClientOnly>
      <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-99 bg-background/98 backdrop-blur-3xl transition-all duration-500 overflow-y-auto">
          <div class="min-h-screen py-20 px-4 sm:px-6 grid place-items-start">
            <div class="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-top-8 duration-500">
              <div class="flex items-center gap-4 border-b border-primary/20 pb-6 mb-8 relative">
                <Search class="h-6 w-6 text-primary/70 shrink-0" aria-hidden="true" />
                <Input 
                  ref="searchInput"
                  v-model="searchQuery" 
                  placeholder="Search the archive..." 
                  class="h-14 md:h-20 text-3xl md:text-5xl font-serif font-light bg-transparent border-0 rounded-none px-0 shadow-none focus-visible:ring-0 placeholder:text-foreground/20 text-foreground/90 selection:bg-primary/20"
                  aria-label="Search articles"
                  role="searchbox"
                  aria-autocomplete="list"
                  autofocus
                />
                <Button variant="ghost" size="icon" class="hidden md:flex h-12 w-12 text-foreground/40 hover:bg-transparent hover:text-foreground/90 rounded-full transition-all absolute right-0" aria-label="Close search (Escape)" @click="closeSearch">
                  <X class="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" class="md:hidden h-10 w-10 text-foreground/40" aria-label="Close search" @click="closeSearch">
                  <X class="h-6 w-6" />
                </Button>
              </div>

              <div v-if="searchQuery" class="space-y-2">
                <NuxtLink v-for="article in filteredArticles" :key="article.path" :to="article.path" class="block group" @click="closeSearch">
                  <div class="flex items-center gap-6 p-4 rounded-xl hover:bg-muted/30 border border-transparent hover:border-border/50 transition-all duration-300">
                    <div class="h-16 w-16 md:h-24 md:w-24 shrink-0 bg-muted/20 rounded-md overflow-hidden relative shadow-sm">
                      <img v-if="article.image" :src="article.image" class="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out" :alt="article.title" >
                      <div v-else class="w-full h-full flex items-center justify-center">
                        <span class="text-[8px] md:text-[10px] font-serif tracking-widest text-foreground/20 uppercase text-center">Void</span>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0 py-2">
                      <div class="flex gap-2 items-center mb-2">
                        <span class="text-[9px] md:text-[10px] font-sans tracking-[0.2em] text-primary/80 uppercase">{{ article.tags?.[0] || 'Archive' }}</span>
                      </div>
                      <h3 class="text-lg md:text-2xl font-serif font-light tracking-wide text-foreground/90 group-hover:text-primary transition-colors truncate" v-html="highlight(article.title)"></h3>
                      <p class="text-xs md:text-sm mt-1 md:mt-2 text-foreground/50 font-light truncate max-w-xl" v-html="highlight(article.description || '')"></p>
                    </div>
                  </div>
                </NuxtLink>
                
                <div v-if="filteredArticles.length === 0" class="text-center py-24">
                  <p class="text-2xl font-serif font-light text-foreground/40 italic">Nothing found within the void.</p>
                  <p class="text-sm font-sans tracking-widest text-foreground/30 uppercase mt-4">Try different keywords</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>
