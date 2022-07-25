import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - Nuxt3 | 大赵同学",
      title: "nuxt3-ssr | 大赵同学",
      charset: "utf-8",
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        { name: "keywords", content: "vue3,nuxt3,ssr,大赵同学,zain" },
        { name: "description", content: "基于vue3的nuxt框架SSR教育demo站点" },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
  buildModules: ["nuxt-windicss"],
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
          ]
        : ["@juggle/resize-observer"],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
  },
});
