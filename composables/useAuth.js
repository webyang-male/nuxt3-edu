//用户状态信息模块
import { createDiscreteApi } from "naive-ui";
export const useUser = () => useState("user", () => null);

// 更新用户信息
export async function useRefreshUserInfo() {
  const token = useCookie("token");
  const user = useUser();
  // 用户已登录，直接获取用户信息
  if (token.value) {
    let { data, error } = await useGetinfoApi();

    if (data.value) {
      user.value = data.value;
    }
  }
}

//退出登录
export async function useLogout() {
  await useLogoutApi();
  const user = useUser();
  user.value = null;

  const token = useCookie("token");
  if (token.value) {
    token.value = null;
  }

  const { message } = createDiscreteApi(["message"]);
  message.success("退出登录成功");
  //回到首页
  const route = useRoute();
  if (route.path != "/") {
    navigateTo("/", { replace: true });
  }
}

//限定用户登录且绑定手机号才能进行操作
export function useHasAuth(callback = null) {
  const route = useRoute();
  const user = useUser();
  const token = useCookie("token");
  //未登录
  if (!token.value) {
    const { message } = createDiscreteApi(["message"]);
    message.error("请先登录");
    return navigateTo("/login?from=" + route.fullPath);
  }

  //未绑定手机号
  const phone = user.value?.phone;
  if (!phone && route.name != "bindphone") {
    message.error("请先绑定手机号");
    return navigateTo("/bindphone?from=" + route.fullPath);
  }
  if (callback && typeof callback == "function") {
    callback();
  }
}
