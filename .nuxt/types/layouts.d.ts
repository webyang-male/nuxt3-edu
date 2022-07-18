import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "E:/webPractice/nuxt3-edussr/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}