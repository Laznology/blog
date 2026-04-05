import tailwindcss from "@tailwindcss/vite";

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "https://laznology.dev";
const siteEnv = process.env.NUXT_SITE_ENV || "production";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: siteUrl,
    indexable: siteEnv === "production",
    name: "Laz Blog",
    description:
      "Catatan rasa penasaran IT: kenapa sesuatu ada, kenapa dibuat, dan kenapa berjalan seperti itu.",
    defaultLocale: "id",
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/about", "/blog", "/robots.txt", "/sitemap.xml"],
    },
  },
  features: {
    inlineStyles: false,
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
  runtimeConfig: {
    public: {
      githubUsername: process.env.NUXT_PUBLIC_GITHUB_USERNAME || "",
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "github-light",
            dark: "github-dark",
          },
        },
      },
    },
  },
  ogImage: {
    enabled: false,
  },
  devtools: { enabled: false },
  compatibilityDate: "latest",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "class-variance-authority",
        "reka-ui",
        "clsx",
        "tailwind-merge",
      ],
    },
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
