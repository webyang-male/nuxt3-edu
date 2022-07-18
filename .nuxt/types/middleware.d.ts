import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "E:/webPractice/nuxt3-edussr/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}