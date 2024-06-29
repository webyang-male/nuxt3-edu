import { createDiscreteApi } from "naive-ui";
export default defineNuxtPlugin((nuxtApp) => {
  const bar = ref(null);
  nuxtApp.hook("app:mounted", (e) => {
    if (!bar.value) {
      const { loadingBar } = createDiscreteApi(["loadingBar"]);
      bar.value = loadingBar;
    }
    // console.log("app:mounted");
  });
  nuxtApp.hook("page:start", (e) => {
    bar.value?.start();
    // console.log("page:start");
  });
  nuxtApp.hook("page:finish", (e) => {
    setTimeout(() => {
      bar.value?.finish();
    }, 150);
    // console.log("page:finish");
  });
  nuxtApp.hook("app:error", (e) => {
    // console.log("app:error");
    if (process.client) {
      setTimeout(() => {
        bar.value?.finish();
      }, 150);
    }
  });
});
