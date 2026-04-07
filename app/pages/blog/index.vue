<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

useSeoMeta({
  title: "The Archive",
  description:
    "Arsip tulisan seputar rasa penasaran IT: kenapa sesuatu ada, kenapa dibuat, dan kenapa berjalan seperti itu.",
});

defineOgImage('Hero.takumi', {
  title: "The Archive",
  description: "Arsip tulisan seputar rasa penasaran IT: kenapa sesuatu ada, kenapa dibuat, dan kenapa berjalan seperti itu.",
});

const { data: allArticles } = await useAsyncData("blog-archive", () => {
  return queryCollection("content").order("path", "DESC").all();
});

const activeTags = ref<string[]>([]);
const showFilters = ref(false);

const allTags = computed(() => {
  const tags = new Set<string>();
  allArticles.value?.forEach((article) => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach((t) => tags.add(t));
    }
  });
  return Array.from(tags).sort();
});

const filteredArticles = computed(() => {
  if (activeTags.value.length === 0) return allArticles.value || [];
  return (allArticles.value || []).filter((article) => {
    return article.tags?.some((tag) => activeTags.value.includes(tag));
  });
});

function toggleTag(tag: string) {
  const index = activeTags.value.indexOf(tag);
  if (index > -1) {
    activeTags.value.splice(index, 1);
  } else {
    activeTags.value.push(tag);
  }
}

function clearFilters() {
  activeTags.value = [];
}
</script>

<template>
  <div class="container mx-auto px-4 lg:px-16 py-16 sm:py-24 relative">
    <div
      class="border-b border-border/40 pb-12 mb-16 text-center max-w-3xl mx-auto"
    >
      <h1
        class="text-5xl sm:text-7xl font-serif font-light tracking-wide text-foreground/90"
      >
        The Archive.
      </h1>
      <p
        class="text-lg sm:text-xl font-sans mt-6 text-foreground/60 leading-relaxed font-light"
      >
        Arsip rasa penasaran IT: kenapa sesuatu ada, kenapa dibuat, dan kenapa
        berjalan seperti itu. Pilih konteks untuk memfokuskan bacaanmu.
      </p>
    </div>

    <div class="mb-24 flex flex-col items-center">
      <button
        @click="showFilters = !showFilters"
        class="text-xs font-sans uppercase tracking-[0.2em] transition-colors flex items-center gap-6 group"
        :class="
          showFilters || activeTags.length > 0
            ? 'text-primary'
            : 'text-foreground/50 hover:text-foreground'
        "
      >
        <span
          class="w-8 h-px bg-foreground/30 transition-all duration-500 ease-out"
          :class="{
            'w-16 bg-primary': showFilters || activeTags.length > 0,
            'group-hover:w-12 group-hover:bg-foreground/60':
              !showFilters && activeTags.length === 0,
          }"
        ></span>
        Context Filters
        {{ activeTags.length > 0 ? `(${activeTags.length})` : "" }}
        <span
          class="w-8 h-px bg-foreground/30 transition-all duration-500 ease-out"
          :class="{
            'w-16 bg-primary': showFilters || activeTags.length > 0,
            'group-hover:w-12 group-hover:bg-foreground/60':
              !showFilters && activeTags.length === 0,
          }"
        ></span>
      </button>

      <div
        class="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full max-w-3xl pt-0"
        :class="
          showFilters
            ? 'max-h-[800px] opacity-100 mt-12'
            : 'max-h-0 opacity-0 mt-0'
        "
      >
        <div class="flex flex-wrap justify-center gap-x-12 gap-y-6 pb-4">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="toggleTag(tag)"
            class="group flex items-center gap-3 transition-all duration-300"
          >
            <span
              class="flex items-center justify-center w-4 h-4 border transition-colors rounded-none"
              :class="
                activeTags.includes(tag)
                  ? 'border-primary bg-primary'
                  : 'border-border/60 group-hover:border-foreground/40'
              "
            >
              <svg
                v-if="activeTags.includes(tag)"
                class="w-3 h-3 text-background"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="square"
                  stroke-linejoin="miter"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>
            <span
              class="text-sm md:text-base font-serif italic tracking-wide transition-colors"
              :class="
                activeTags.includes(tag)
                  ? 'text-foreground/90'
                  : 'text-foreground/50 group-hover:text-foreground/80'
              "
            >
              {{ tag }}
            </span>
          </button>
        </div>
        <div v-if="activeTags.length > 0" class="flex justify-center mt-8">
          <button
            @click="clearFilters"
            class="text-[10px] font-sans uppercase tracking-[0.2em] text-foreground/40 hover:text-destructive transition-colors border-b border-transparent hover:border-destructive pb-1"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto space-y-16">
      <NuxtLink
        v-for="article in filteredArticles"
        :key="article.path"
        :to="article.path"
        class="group block"
      >
        <div
          class="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-b border-border/40 pb-16 hover:-translate-y-1 transition-transform duration-500"
        >
          <div
            class="w-full md:w-[35%] aspect-4/3 md:aspect-3/4 bg-muted/20 relative overflow-hidden shrink-0 shadow-xl shadow-primary/5 group-hover:shadow-primary/10 transition-shadow duration-700"
          >
            <img
              v-if="article.image"
              :src="article.image"
              class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
              :alt="article.title"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span
                class="text-[10px] font-serif tracking-widest text-foreground/20 uppercase"
                >Aesthetic Void</span
              >
            </div>
          </div>

          <div class="flex-1 w-full space-y-6 pt-2">
            <div
              class="flex justify-between items-center border-b border-border/30 pb-4"
            >
              <span
                class="text-foreground/50 font-sans tracking-[0.2em] text-[10px] uppercase"
                >{{ article.date }}</span
              >
              <div class="flex gap-2">
                <Badge
                  v-for="tag in article.tags?.slice(0, 1)"
                  :key="tag"
                  variant="outline"
                  class="text-[9px] font-sans uppercase tracking-[0.2em] text-primary/90 border-primary/20 bg-primary/5 rounded-full px-3 py-1"
                >
                  {{ tag }}
                </Badge>
              </div>
            </div>

            <h2
              class="text-3xl md:text-4xl font-serif font-light leading-snug group-hover:text-primary transition-colors duration-500 text-foreground/90"
            >
              {{ article.title }}
            </h2>

            <p
              class="text-base md:text-lg font-sans text-foreground/60 leading-loose line-clamp-3 font-light tracking-wide"
            >
              {{ article.description }}
            </p>

            <div class="pt-6">
              <span
                class="inline-flex items-center gap-4 text-xs font-sans uppercase tracking-[0.2em] text-foreground/40 group-hover:text-primary transition-colors"
              >
                Read entry
                <span
                  class="w-8 h-px bg-foreground/20 group-hover:w-16 group-hover:bg-primary transition-all duration-700"
                ></span>
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>

      <div
        v-if="filteredArticles.length === 0"
        class="col-span-full border border-dashed border-border/40 p-24 text-center mt-8"
      >
        <h2
          class="text-xl font-serif tracking-widest uppercase text-foreground/40 font-light"
        >
          No recordings found
        </h2>
      </div>
    </div>
  </div>
</template>
