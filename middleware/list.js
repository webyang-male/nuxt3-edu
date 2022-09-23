// 公共列表页中间件
const t = {
  course: "课程",
  column: "专栏",
  live: "直播",
  book: "电子书",
  group: "拼团",
  flashsale: "秒杀",
};

export default defineNuxtRouteMiddleware((to, from) => {
  const { type, page } = to.params;
  if (Object.keys(t).includes(type) && !isNaN(+page)) {
    const title = t[type] + "列表";
    useHead({ title });
    to.meta.title = title;
    return true;
  }
  return abortNavigation("页面不存在");
});
