import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: "http://localhost:3000",
    name: "Laz Blog",
    description: "The Modern Publisher built with Nuxt, Tailwind and Shadcn.",
    defaultLocale: "id",
  },
  routeRules: {
    "/_nuxt/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
  },
  features: {
    inlineStyles: true,
  },
  experimental: {
    inlineSSRStyles: true,
    payloadExtraction: true,
    defaults: {
      nuxtLink: {
        prefetchOn: "interaction",
      },
    },
  },
  css: ["~/assets/css/tailwind.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/seo",
    "shadcn-nuxt",
    "@vueuse/nuxt",
  ],
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
});
