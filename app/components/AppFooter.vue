<template>
  <footer
    class="mt-24 border-t border-border/50 bg-background/50 backdrop-blur-sm py-16 relative z-10"
  >
    <div
      class="container mx-auto px-4 lg:px-16 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center"
    >
      <div>
        <div class="h-10 sm:h-12" aria-hidden="true" />
        <p
          class="text-sm text-foreground/50 font-sans font-light tracking-wide max-w-md text-center md:text-left mt-1"
        >
          Give your minds a stage, not a cage.
        </p>
      </div>
      <div
        class="sm:text-right text-center text-xs font-sans text-foreground/40 uppercase tracking-[0.2em]"
      >
        <p>&copy; {{ new Date().getFullYear() }} laznology.</p>
        <p class="mt-3">
          <a
            href="https://github.com/Laznology/blog"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors duration-200"
          >
            Source Code
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
