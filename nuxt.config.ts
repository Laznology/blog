import tailwindcss from "@tailwindcss/vite";

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL;
const siteEnv = process.env.NUXT_SITE_ENV || "production";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
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
  sitemap: { zeroRuntime: false },
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
