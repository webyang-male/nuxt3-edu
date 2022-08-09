// 全局用户信息中间件
export default defineNuxtRouteMiddleware(async (to,from)=>{
    await useRefreshUserInfo()
})