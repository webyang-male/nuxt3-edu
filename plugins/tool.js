//定义全局点击跳转功能插件
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("commonOpen", (item) => {
    if (item.type == "webview") {
      window.open(item.url);
    }
  });
});
