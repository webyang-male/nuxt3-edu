//用户状态信息模块
export const useUser = () => useState("user", () => null);

export async function useRefreshUserInfo() {
  const token = useCookie("token");
  //用户已登录状态下，获取用户信息
  if (token.value) {
    let { data, error } = await useGetinfoApi();

    if (data.value) {
      const user = useUser();
      user.value = data.value;
    } else {
      console.log(error);
    }
  }
}
