// 搜索中间件校验
export default defineNuxtRouteMiddleware((to, from) => {
  let { type, page } = to.params;
  let { keyword } = to.query;

  if (!keyword) {
    return abortNavigation("搜索内容不可以为空！");
  }
  if (!["course", "column"].includes(type) || isNaN(+page)) {
    return abortNavigation("Code:404! 页面走丢了");
  }
});
