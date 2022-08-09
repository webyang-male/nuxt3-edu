//用户模块
export function useLoginApi(body) {
  return useHttpPost("login", "/login", {
    body,
  });
}

export function useGetinfoApi() {
  return useHttpGet("getinfo", "/getinfo", {
    $: true,
  });
}
//注册
export function useRegApi(body) {
  return useHttpPost("reg", "/reg", {
    body,
  });
}

//用户退出
export function useLogoutApi() {
  return useHttpPost("logout", "/logout");
}

//获取手机验证码
export function useGetCaptchaApi(phone) {
  return useHttpPost("GetCaptcha", "/get_captcha", {
    body: {
      phone,
    },
  });
}
