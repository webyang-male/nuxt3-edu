import { createDiscreteApi } from "naive-ui";
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  // 已登录，强制重定向到首页
  if (token.value) {
    // 客户端渲染
    if (process.client) {
      const { message } = createDiscreteApi(["message"]);
      message.error("请勿重复登录");
    }
    return "/";
  }
});
