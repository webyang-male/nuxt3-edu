//游客权限
import {
    createDiscreteApi
} from "naive-ui"

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("token");
    //已登录，强制重定向到首页
    if (token.value) {
        if (process.client) {
            const { message } = createDiscreteApi(["message"])
            message.warning("您已登录，请勿重复登录");
        }
        return "/";
    }
});
