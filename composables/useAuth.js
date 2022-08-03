//用户状态信息模块
import { createDiscreteApi } from "naive-ui";
export const useUser = () => useState("user", () => null);

//更新用户状态信息
export async function useRefreshUserInfo() {
  const token = useCookie("token");
  const user = useUser();
  //用户已登录状态下，获取用户信息
  if (token.value) {
    let { data, error } = await useGetinfoApi();

    if (data.value) {
      user.value = data.value;
      console.log("获取到用户信息");
    }
  }
}

//退出登录
export async function useLogout() {
  await useLogoutApi();
  const user = useUser();
  user.value = null;
  // console.log("用户退出");
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
