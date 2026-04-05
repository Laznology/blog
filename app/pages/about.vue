<script setup lang="ts">
useSeoMeta({
  title: "Manifesto — laznology.",
  description:
    "Laz — developer yang mengejar rasa penasaran IT: kenapa sesuatu ada, kenapa dibuat, dan kenapa bekerja seperti itu.",
});
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-24 sm:py-32">
    <header class="mb-20">
      <p
        class="text-xs font-sans uppercase tracking-[0.3em] text-foreground/40 mb-6"
      >
        Manifesto
      </p>
      <h1
        class="text-5xl sm:text-7xl font-serif font-light leading-[1.05] tracking-wide text-foreground/90"
      >
        A quiet<br />obsession.
      </h1>
    </header>

    <div
      class="space-y-16 font-serif text-lg sm:text-xl font-light leading-loose text-foreground/70"
    >
      <section>
        <p>
          I am <span class="text-foreground/90 italic">Laz</span> — a developer
          who curious and love diving.
        </p>
      </section>

      <div class="w-12 h-px bg-primary/50" />

      <section>
        <p>This archive maybe will be documentation of my thoughts.</p>
      </section>

      <section class="pt-4 space-y-4">
        <h2
          class="text-base font-sans uppercase tracking-[0.2em] text-foreground/40 font-normal"
        >
          Find me elsewhere
        </h2>
        <ul class="space-y-3 font-sans text-base font-light">
          <li class="flex gap-4 items-center">
            <span
              class="text-foreground/30 text-xs uppercase tracking-widest w-16 shrink-0"
              >Web</span
            >
            <a
              href="https://laznology.dev"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground/70 border-b border-foreground/20 hover:text-primary hover:border-primary transition-colors pb-px"
              >laznology.dev</a
            >
          </li>
          <li class="flex gap-4 items-center">
            <span
              class="text-foreground/30 text-xs uppercase tracking-widest w-16 shrink-0"
              >Source</span
            >
            <a
              href="https://github.com/Laznology/blog"
              target="_blank"
              rel="noopener noreferrer"
              class="text-foreground/70 border-b border-foreground/20 hover:text-primary hover:border-primary transition-colors pb-px"
              >github.com/Laznology/blog</a
            >
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
