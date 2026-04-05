<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const githubUsername = computed(() =>
  String(runtimeConfig.public.githubUsername || "").trim(),
);
const githubAvatarUrl = computed(() => {
  if (!githubUsername.value) {
    return "";
  }
  return `https://github.com/${githubUsername.value}.png?size=128`;
});

const { data: page } = await useAsyncData("page-" + route.path, () => {
  return queryCollection("content").path(route.path).first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogImage: page.value?.image,
});

const tocLinks = computed(() => {
  return page.value?.body?.toc?.links || [];
});

const hasToc = computed(() => tocLinks.value.length > 0);

const displayAuthor = computed(() => {
  return page.value?.author || githubUsername.value || "Author";
});
</script>

<template>
  <div v-if="page" class="relative">
    <header
      class="py-20 sm:py-32 border-b border-border/40 relative bg-background/50 backdrop-blur-sm"
    >
      <div class="container mx-auto px-4 lg:px-16 max-w-4xl text-center">
        <div class="flex justify-center gap-3 flex-wrap mb-10">
          <Badge
            v-for="tag in page.tags"
            :key="tag"
            variant="outline"
            class="text-xs font-sans font-light tracking-widest uppercase rounded-full px-4 py-1 border border-border/60 text-foreground/60 hover:text-primary hover:border-primary/50 transition-all duration-300"
          >
            {{ tag }}
          </Badge>
        </div>

        <h1
          class="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide leading-tight mb-16 text-foreground/90"
        >
          {{ page.title }}
        </h1>

        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-8 border-t border-border/40 pt-12 mt-12 mx-auto px-8"
        >
          <div class="flex items-center gap-6">
            <Avatar
              class="h-16 w-16 border border-border/50 rounded-full shadow-sm"
            >
              <AvatarImage
                :src="githubAvatarUrl"
                :alt="displayAuthor"
                class="object-cover"
              />
              <AvatarFallback
                class="bg-muted text-lg font-serif font-light text-foreground/70"
              >
                {{ displayAuthor.substring(0, 2).toUpperCase() }}
              </AvatarFallback>
            </Avatar>
            <div class="text-left">
              <div
                class="text-sm font-sans tracking-widest uppercase text-foreground/80 mb-1"
              >
                {{ displayAuthor }}
              </div>
              <div class="text-foreground/40 font-mono text-xs tracking-wider">
                {{ page.date }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 lg:px-16 max-w-6xl py-16 sm:py-24">
      <div
        class="grid grid-cols-1 xl:grid-cols-5 gap-16 xl:gap-20 relative items-start"
      >
        <nav v-if="hasToc" class="hidden xl:block xl:col-span-1 sticky top-32">
          <h3
            class="text-xs font-sans uppercase tracking-[0.2em] text-foreground/40 mb-6 border-b border-border/30 pb-4"
          >
            Contents
          </h3>
          <ul class="space-y-4 font-sans font-light text-sm">
            <li v-for="link in tocLinks" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="text-foreground/60 hover:text-primary transition-colors block"
              >
                {{ link.text }}
              </a>
              <ul
                v-if="link.children"
                class="mt-3 ml-4 space-y-3 border-l border-border/30 pl-4"
              >
                <li v-for="child in link.children" :key="child.id">
                  <a
                    :href="`#${child.id}`"
                    class="text-foreground/40 hover:text-primary transition-colors block text-xs"
                  >
                    {{ child.text }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <article
          :class="{ 'xl:col-start-2': !hasToc }"
          class="xl:col-span-4 prose prose-lg md:prose-xl dark:prose-invert max-w-none font-serif leading-loose text-foreground/80 prose-headings:font-serif prose-headings:font-light prose-headings:tracking-wide prose-headings:text-foreground/90 prose-h2:text-4xl md:prose-h2:text-5xl prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-4 prose-h2:mt-24 prose-h3:text-2xl md:prose-h3:text-3xl prose-p:mb-10 prose-p:font-light prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/30 hover:prose-a:decoration-primary prose-blockquote:border-l-2 prose-blockquote:border-primary/50 prose-blockquote:bg-transparent prose-blockquote:pl-8 prose-blockquote:font-serif prose-blockquote:text-foreground/60 prose-blockquote:italic prose-img:border prose-img:border-border/20 prose-img:shadow-2xl prose-img:shadow-foreground/5 prose-img:rounded-md"
        >
          <ContentRenderer :value="page" />
        </article>
      </div>
    </div>
  </div>
</template>
