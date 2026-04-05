<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

useSeoMeta({
  title: "Home",
  description:
    "Refleksi dan eksplorasi IT tentang kenapa sesuatu ada, kenapa dibuat, dan kenapa berjalan seperti itu.",
});

const { data: latestArticles } = await useAsyncData("latest-articles", () => {
  return queryCollection("content").order("path", "DESC").limit(3).all();
});
</script>

<template>
  <div class="space-y-0 relative">
    <section
      class="py-24 sm:py-32 relative overflow-hidden flex flex-col justify-center min-h-[85vh]"
    >
      <div
        class="absolute -right-[15%] top-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse"
        style="animation-duration: 8s"
      ></div>
      <div
        class="absolute left-[-10%] bottom-[-20%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
      ></div>

      <div class="container mx-auto px-4 lg:px-16 relative z-10 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          <div
            class="lg:col-span-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both"
          >
            <h1
              class="text-[14vw] sm:text-[12vw] lg:text-[9.5vw] font-serif font-light tracking-tighter text-foreground leading-[0.85] mix-blend-darken dark:mix-blend-lighten"
            >
              Mindful<br />
              <span class="italic text-primary/90 block ml-[5vw] lg:ml-[10vw]"
                >living.</span
              >
            </h1>
          </div>

          <div
            class="lg:col-span-4 pb-4 lg:pb-8 animate-in fade-in slide-in-from-right-12 duration-1000 delay-300 fill-mode-both"
          >
            <div class="border-l border-primary/30 pl-8 space-y-8">
              <p
                class="text-base sm:text-lg font-sans max-w-sm font-light text-foreground/60 leading-relaxed tracking-wider"
              >
                A minimalist sanctuary for writers and readers.
              </p>

              <NuxtLink to="/blog" class="inline-flex items-center gap-6 group">
                <span
                  class="text-xs font-sans font-medium tracking-[0.3em] uppercase text-foreground group-hover:text-primary transition-colors"
                  >Begin exploring</span
                >
                <span
                  class="relative flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500 overflow-hidden"
                >
                  <span
                    class="absolute w-12 h-px bg-foreground/30 group-hover:w-24 group-hover:bg-primary transition-all duration-700 ease-out group-hover:translate-x-4"
                  ></span>
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-32 container mx-auto px-4 lg:px-16 relative z-10">
      <div
        class="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-border/40 pb-8 animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        <h2
          class="text-4xl sm:text-5xl lg:text-7xl font-serif font-light tracking-tight text-foreground/90"
        >
          Curated
        </h2>
        <NuxtLink
          to="/blog"
          class="text-xs font-sans uppercase tracking-[0.2em] text-foreground/50 hover:text-primary transition-colors mt-4 md:mt-0 group flex items-center gap-3"
        >
          Full Collection
          <span
            class="w-8 h-px bg-foreground/30 group-hover:w-12 group-hover:bg-primary transition-all duration-300"
          ></span>
        </NuxtLink>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
        <NuxtLink
          v-for="(article, index) in latestArticles"
          :key="article.path"
          :to="article.path"
          class="group block animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both"
          :style="`animation-delay: ${index * 200}ms`"
        >
          <Card
            class="border-0 rounded-none shadow-none bg-transparent h-full flex flex-col relative overflow-visible"
          >
            <div
              class="w-full aspect-4/5 overflow-hidden relative bg-muted/20 mb-8 rounded-xl shadow-2xl shadow-primary/5 group-hover:shadow-primary/20 transition-all duration-700"
            >
              <img
                v-if="article.image"
                :src="article.image"
                class="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                :alt="article.title"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <span
                  class="text-xs font-serif tracking-widest text-foreground/10 uppercase"
                  >Aesthetic Void</span
                >
              </div>

              <div class="absolute top-6 left-6 flex gap-2 flex-wrap z-20">
                <Badge
                  v-for="tag in article.tags?.slice(0, 2)"
                  :key="tag"
                  variant="outline"
                  class="border flex items-center border-white/20 bg-black/20 text-white backdrop-blur-xl rounded-full text-[10px] font-medium uppercase py-1.5 px-4 tracking-[0.2em] pointer-events-none"
                >
                  {{ tag }}
                </Badge>
              </div>
              <div
                class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
              ></div>
            </div>

            <CardHeader
              class="p-0 flex-1 relative z-10 group-hover:-translate-y-2 transition-transform duration-500 ease-out"
            >
              <span
                class="text-foreground/40 font-sans tracking-[0.2em] text-[10px] mb-4 block uppercase"
                >{{ article.date }}</span
              >
              <CardTitle
                class="text-3xl font-serif font-light leading-tight group-hover:text-primary transition-colors duration-500 text-foreground/90"
              >
                {{ article.title }}
              </CardTitle>
            </CardHeader>
          </Card>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
