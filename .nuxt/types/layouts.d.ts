import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "login"
declare module "E:/WebProject/Nuxt3SSR/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}