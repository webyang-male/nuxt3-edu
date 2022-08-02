// 全局中间件
export default defineNuxtRouteMiddleware(async (to,from)=>{
    await useRefreshUserInfo()
})