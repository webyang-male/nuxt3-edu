//用户状态信息模块
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
    } else {
      console.log(error);
    }
  }
}
