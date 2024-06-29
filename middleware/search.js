export default defineNuxtRouteMiddleware((to, from) => {
  const { type, page } = to.params;
  const { keyword } = to.query;

  if (!keyword) {
    return abortNavigation("搜索关键词不能为空");
  }

  if (!(["course", "column"].includes(type)) || isNaN(+page)) {
    return abortNavigation("页面不存在");
  }
});
