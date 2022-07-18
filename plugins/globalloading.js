import { createDiscreteApi } from "naive-ui";

export default defineNuxtPlugin((nuxtApp) => {
  const bar = ref(null);

  nuxtApp.hook("app:mounted", (e) => {
    if (!bar.value) {
      const { loadingBar } = createDiscreteApi(["loadingBar"]);
      bar.value = loadingBar;
    }
  });
  nuxtApp.hook("page:start", (e) => {
    bar.value?.start();
  });
  nuxtApp.hook("page:finish", (e) => {
    setTimeout(() => bar.value?.finish(), 300);
  });
  nuxtApp.hook("app:error", (e) => {
    //判断是否在客户端
    if (process.client) {
      setTimeout(() => bar.value?.finish(), 300);
    }
  });
});
