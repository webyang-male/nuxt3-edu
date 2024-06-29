export default defineNuxtRouteMiddleware(async (to, from) => {
  // 2024-1-5 添加 enforce = false 防止重复刷新用户信息
  await useRefreshUserInfo(false);
});
